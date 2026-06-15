import { extractText, getDocumentProxy } from "unpdf";

import { logger } from "@/lib/logger";

export async function parsePdfBuffer(buffer: Buffer): Promise<{
  text: string;
  pages: number;
}> {
  const data = new Uint8Array(buffer);
  const pdf = await getDocumentProxy(data);
  const { text, totalPages } = await extractText(pdf, { mergePages: true });
  return { text, pages: totalPages };
}

// Renders a SINGLE PDF page (1-indexed) to a raw PNG buffer. Used by the image
// annotation pipeline, which needs to raster a plan delivered as a PDF before
// drawing on it. Returns null if the page is out of range or rendering fails.
export async function renderPdfPageToPngBuffer(
  buffer: Buffer,
  pageNumber = 1,
  scale = 2,
): Promise<Buffer | null> {
  const { renderPageAsImage, getDocumentProxy: getProxy } = await import("unpdf");
  const proxy = await getProxy(Uint8Array.from(buffer));
  if (pageNumber < 1 || pageNumber > proxy.numPages) return null;
  try {
    const render = renderPageAsImage as unknown as (
      data: Uint8Array,
      page: number,
      opts: Record<string, unknown>,
    ) => Promise<ArrayBuffer | Uint8Array>;
    const png = await render(Uint8Array.from(buffer), pageNumber, {
      scale,
      canvasImport: () => import("@napi-rs/canvas"),
    });
    const bytes = png instanceof Uint8Array ? png : new Uint8Array(png);
    return Buffer.from(bytes);
  } catch (err) {
    logger.warn({ pageNumber, err }, "pdf single-page render failed");
    return null;
  }
}

// Renders the first `maxPages` pages of a PDF to PNG data-URLs so a vision model
// can "see" them. Used for plans/scans that carry no extractable text.
// Uses @napi-rs/canvas (prebuilt, no native build step) as the canvas backend.
export async function renderPdfToImageDataUrls(
  buffer: Buffer,
  maxPages = 3,
): Promise<string[]> {
  const { renderPageAsImage, getDocumentProxy: getProxy } = await import("unpdf");
  // numPages first (uses its own copy — pdf.js detaches the buffer it parses).
  const proxy = await getProxy(Uint8Array.from(buffer));
  const total = Math.min(proxy.numPages, maxPages);
  const urls: string[] = [];
  for (let page = 1; page <= total; page++) {
    try {
      // @napi-rs/canvas is a prebuilt, API-compatible backend for unpdf's renderer.
      // We retype renderPageAsImage to avoid a compile-time dependency on the
      // `canvas` package types (unpdf types `canvasImport` against `typeof import("canvas")`).
      const render = renderPageAsImage as unknown as (
        data: Uint8Array,
        page: number,
        opts: Record<string, unknown>,
      ) => Promise<ArrayBuffer | Uint8Array>;
      const png = await render(Uint8Array.from(buffer), page, {
        scale: 2,
        canvasImport: () => import("@napi-rs/canvas"),
      });
      const bytes = png instanceof Uint8Array ? png : new Uint8Array(png);
      urls.push(`data:image/png;base64,${Buffer.from(bytes).toString("base64")}`);
    } catch (err) {
      logger.warn({ page, err }, "pdf page render failed");
    }
  }
  return urls;
}
