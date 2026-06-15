import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

import { logger } from "@/lib/logger";

import type { AnnotationColor } from "./annotate";

// Same marking model as the image annotator, but applied as a VECTOR OVERLAY on
// the original PDF (pages preserved, output is a PDF). Coordinates are normalised
// (0..1) in SCREEN space (y grows downward, like the rasterised preview the model
// sees); we map them to PDF user space (y grows upward) per page.
export type PdfAnnotation = {
  type: "circle" | "rectangle" | "arrow" | "text";
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  color?: AnnotationColor;
  // 1-indexed page to draw on. Defaults to 1.
  page?: number;
};

const COLOR_RGB: Record<AnnotationColor, [number, number, number]> = {
  red: [0.937, 0.267, 0.267],
  blue: [0.149, 0.388, 0.922],
  green: [0.086, 0.639, 0.290],
  orange: [0.976, 0.451, 0.086],
  black: [0.067, 0.094, 0.153],
  yellow: [0.918, 0.702, 0.031],
  white: [1, 1, 1],
};

function clamp01(v: number): number {
  if (Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

// WinAnsi (the StandardFont encoding) can't encode every Unicode char the model
// might emit. Normalise the common typographic ones and drop anything else that
// would make drawText throw.
function sanitizeText(text: string): string {
  return text
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/[    ]/g, " ");
}

function drawLabel(
  page: PDFPage,
  font: PDFFont,
  text: string,
  xLeft: number,
  yTopScreenPdf: number, // pdf-space y of the label's TOP edge
  size: number,
  color: [number, number, number],
): void {
  const clean = sanitizeText(text);
  let width = 0;
  try {
    width = font.widthOfTextAtSize(clean, size);
  } catch {
    width = clean.length * size * 0.5;
  }
  const padding = size * 0.3;
  const boxH = size + padding * 2;
  const boxW = width + padding * 2;
  // White plate behind the text for contrast on busy plans.
  page.drawRectangle({
    x: xLeft,
    y: yTopScreenPdf - boxH,
    width: boxW,
    height: boxH,
    color: rgb(1, 1, 1),
    opacity: 0.85,
    borderColor: rgb(color[0], color[1], color[2]),
    borderWidth: Math.max(0.5, size * 0.06),
  });
  try {
    page.drawText(clean, {
      x: xLeft + padding,
      y: yTopScreenPdf - boxH + padding,
      size,
      font,
      color: rgb(color[0], color[1], color[2]),
    });
  } catch (err) {
    logger.warn({ err }, "pdf drawText failed; skipping label");
  }
}

// Draws the annotations on the original PDF and returns the modified bytes.
export async function overlayAnnotationsOnPdf(
  buffer: Buffer,
  annotations: PdfAnnotation[],
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pages = pdf.getPages();

  for (const a of annotations) {
    const pageIdx = Math.min(Math.max((a.page ?? 1) - 1, 0), pages.length - 1);
    const page = pages[pageIdx]!;
    const { width: W, height: H } = page.getSize();
    const color = COLOR_RGB[a.color ?? "red"];
    const stroke = Math.max(1.5, Math.min(W, H) * 0.004);
    const fontSize = Math.max(9, Math.min(W, H) * 0.018);

    const nx = clamp01(a.x);
    const ny = clamp01(a.y);
    const nw = clamp01(a.width);
    const nh = clamp01(a.height);

    // Screen→PDF: pdf_y = H - screen_y.
    const xPt = nx * W;
    const wPt = nw * W;
    const hPt = nh * H;
    const yTopPdf = H - ny * H; // top edge of the box in pdf space
    const yBotPdf = H - (ny + nh) * H; // bottom edge

    const c = rgb(color[0], color[1], color[2]);

    switch (a.type) {
      case "circle":
        page.drawEllipse({
          x: xPt + wPt / 2,
          y: yTopPdf - hPt / 2,
          xScale: Math.max(2, wPt / 2),
          yScale: Math.max(2, hPt / 2),
          borderColor: c,
          borderWidth: stroke,
          opacity: 0,
        });
        break;
      case "rectangle":
        page.drawRectangle({
          x: xPt,
          y: yBotPdf,
          width: wPt,
          height: hPt,
          borderColor: c,
          borderWidth: stroke,
          opacity: 0,
        });
        break;
      case "arrow": {
        const start = { x: xPt, y: yTopPdf };
        const end = { x: xPt + wPt, y: yBotPdf };
        page.drawLine({ start, end, thickness: stroke, color: c });
        const headLen = Math.max(8, stroke * 4);
        const angle = Math.atan2(end.y - start.y, end.x - start.x);
        for (const sign of [-1, 1]) {
          const a2 = angle + (sign * Math.PI) / 6;
          page.drawLine({
            start: end,
            end: { x: end.x - headLen * Math.cos(a2), y: end.y - headLen * Math.sin(a2) },
            thickness: stroke,
            color: c,
          });
        }
        break;
      }
      case "text":
        // No shape — the label is the whole annotation.
        break;
    }

    if (a.label && a.label.trim().length > 0) {
      const labelTop = a.type === "text" ? yTopPdf : yTopPdf + fontSize + stroke;
      drawLabel(page, font, a.label.trim(), xPt, Math.min(H, labelTop), fontSize, color);
    }
  }

  return pdf.save();
}

// --- PDF form (AcroForm) helpers --------------------------------------------

export type PdfFieldInfo = { name: string; type: string; options?: string[] };

function fieldType(field: { constructor: { name: string } }): string {
  // PDFTextField / PDFCheckBox / PDFDropdown / PDFRadioGroup / PDFOptionList…
  return field.constructor.name.replace(/^PDF/, "");
}

export async function listPdfFormFields(buffer: Buffer): Promise<PdfFieldInfo[]> {
  const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const form = pdf.getForm();
  return form.getFields().map((f) => {
    const info: PdfFieldInfo = { name: f.getName(), type: fieldType(f) };
    const maybe = f as unknown as { getOptions?: () => string[] };
    if (typeof maybe.getOptions === "function") {
      try {
        info.options = maybe.getOptions();
      } catch {
        /* ignore */
      }
    }
    return info;
  });
}

const TRUTHY = new Set(["true", "1", "oui", "yes", "x", "coché", "coche", "on"]);

export async function fillPdfFormFields(
  buffer: Buffer,
  values: Array<{ name: string; value: string }>,
  flatten = false,
): Promise<{
  pdf: Uint8Array;
  filled: string[];
  missing: string[];
  available: PdfFieldInfo[];
}> {
  const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const form = pdf.getForm();
  const fields = form.getFields();
  const byName = new Map(fields.map((f) => [f.getName(), f]));
  const available: PdfFieldInfo[] = fields.map((f) => ({ name: f.getName(), type: fieldType(f) }));

  const filled: string[] = [];
  const missing: string[] = [];

  for (const { name, value } of values) {
    const field = byName.get(name);
    if (!field) {
      missing.push(name);
      continue;
    }
    const type = fieldType(field);
    try {
      if (type === "TextField") {
        form.getTextField(name).setText(value);
      } else if (type === "CheckBox") {
        const box = form.getCheckBox(name);
        if (TRUTHY.has(value.trim().toLowerCase())) box.check();
        else box.uncheck();
      } else if (type === "Dropdown") {
        form.getDropdown(name).select(value);
      } else if (type === "RadioGroup") {
        form.getRadioGroup(name).select(value);
      } else if (type === "OptionList") {
        form.getOptionList(name).select(value);
      } else {
        missing.push(name);
        continue;
      }
      filled.push(name);
    } catch (err) {
      logger.warn({ err, name, type }, "pdf form fill failed for field");
      missing.push(name);
    }
  }

  try {
    form.updateFieldAppearances();
  } catch {
    /* best-effort */
  }
  if (flatten) {
    try {
      form.flatten();
    } catch (err) {
      logger.warn({ err }, "pdf form flatten failed");
    }
  }

  const out = await pdf.save();
  return { pdf: out, filled, missing, available };
}
