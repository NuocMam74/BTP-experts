import ExcelJS from "exceljs";
import JSZip from "jszip";
import mammoth from "mammoth";

import { logger } from "@/lib/logger";

import { parsePdfBuffer } from "./pdf";

export type ParseResult = {
  text: string | null;
  pages: number | null;
  kind: ParsedKind;
};

export type ParsedKind =
  | "pdf"
  | "docx"
  | "text"
  | "markdown"
  | "xlsx"
  | "csv"
  | "json"
  | "pptx"
  | "odt"
  | "ods"
  | "rtf"
  | "image"
  | "unknown";

const TEXT_EXT = new Set([
  ".txt",
  ".md",
  ".markdown",
  ".log",
  ".csv",
  ".tsv",
  ".json",
  ".yaml",
  ".yml",
  ".xml",
  ".html",
  ".htm",
]);

const IMAGE_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".bmp",
  ".svg",
  ".tif",
  ".tiff",
]);

export async function parseAttachment(
  buffer: Buffer,
  filename: string,
  mimeType: string,
): Promise<ParseResult> {
  const lower = filename.toLowerCase();
  const ext = lower.slice(lower.lastIndexOf("."));

  // PDF
  if (mimeType === "application/pdf" || ext === ".pdf") {
    try {
      const { text, pages } = await parsePdfBuffer(buffer);
      return { text, pages, kind: "pdf" };
    } catch (err) {
      logger.warn({ filename, err }, "pdf parse failed");
      return { text: null, pages: null, kind: "pdf" };
    }
  }

  // DOCX (mammoth) — note: .doc binaire ancien non géré.
  if (
    ext === ".docx" ||
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    try {
      const result = await mammoth.extractRawText({ buffer });
      const text = result.value?.trim() || null;
      return { text, pages: null, kind: "docx" };
    } catch (err) {
      logger.warn({ filename, err }, "docx parse failed");
      return { text: null, pages: null, kind: "docx" };
    }
  }

  // XLSX
  if (
    ext === ".xlsx" ||
    ext === ".xlsm" ||
    mimeType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    try {
      const wb = new ExcelJS.Workbook();
      await wb.xlsx.load(buffer as unknown as ArrayBuffer);
      const parts: string[] = [];
      wb.eachSheet((sheet) => {
        parts.push(`## Feuille : ${sheet.name}`);
        sheet.eachRow((row, rowNumber) => {
          const cells: string[] = [];
          row.eachCell((cell) => {
            const v = cell.value;
            if (v == null) {
              cells.push("");
            } else if (typeof v === "object" && "result" in v) {
              cells.push(String((v as { result?: unknown }).result ?? ""));
            } else {
              cells.push(String(v));
            }
          });
          parts.push(`${rowNumber}: ${cells.join(" | ")}`);
        });
        parts.push("");
      });
      return { text: parts.join("\n"), pages: wb.worksheets.length, kind: "xlsx" };
    } catch (err) {
      logger.warn({ filename, err }, "xlsx parse failed");
      return { text: null, pages: null, kind: "xlsx" };
    }
  }

  // PPTX (PowerPoint) — read slide texts from the OOXML zip.
  if (
    ext === ".pptx" ||
    mimeType ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    try {
      const text = await parsePptx(buffer);
      return { text, pages: null, kind: "pptx" };
    } catch (err) {
      logger.warn({ filename, err }, "pptx parse failed");
      return { text: null, pages: null, kind: "pptx" };
    }
  }

  // ODT / ODP (OpenDocument text/presentation) — text from content.xml.
  if (
    ext === ".odt" ||
    ext === ".odp" ||
    mimeType === "application/vnd.oasis.opendocument.text" ||
    mimeType === "application/vnd.oasis.opendocument.presentation"
  ) {
    try {
      const text = await parseOpenDocument(buffer);
      return { text, pages: null, kind: "odt" };
    } catch (err) {
      logger.warn({ filename, err }, "odt parse failed");
      return { text: null, pages: null, kind: "odt" };
    }
  }

  // ODS (OpenDocument spreadsheet) — cell text from content.xml.
  if (
    ext === ".ods" ||
    mimeType === "application/vnd.oasis.opendocument.spreadsheet"
  ) {
    try {
      const text = await parseOpenDocument(buffer);
      return { text, pages: null, kind: "ods" };
    } catch (err) {
      logger.warn({ filename, err }, "ods parse failed");
      return { text: null, pages: null, kind: "ods" };
    }
  }

  // RTF — strip control words to recover plain text.
  if (ext === ".rtf" || mimeType === "application/rtf" || mimeType === "text/rtf") {
    try {
      return { text: parseRtf(buffer.toString("latin1")), pages: null, kind: "rtf" };
    } catch (err) {
      logger.warn({ filename, err }, "rtf parse failed");
      return { text: null, pages: null, kind: "rtf" };
    }
  }

  // CSV (parsing simple)
  if (ext === ".csv" || mimeType === "text/csv") {
    const text = buffer.toString("utf8");
    return { text, pages: null, kind: "csv" };
  }

  // Text / Markdown / JSON / YAML / etc.
  if (TEXT_EXT.has(ext) || mimeType.startsWith("text/")) {
    const text = buffer.toString("utf8");
    const kind: ParsedKind =
      ext === ".md" || ext === ".markdown"
        ? "markdown"
        : ext === ".json"
          ? "json"
          : "text";
    return { text, pages: null, kind };
  }

  // Image — pas de parsing, juste métadonnée
  if (IMAGE_EXT.has(ext) || mimeType.startsWith("image/")) {
    return { text: null, pages: null, kind: "image" };
  }

  // Tout autre (incluant le .doc binaire ancien) : stocké sans extraction.
  return { text: null, pages: null, kind: "unknown" };
}

export function describeKind(kind: ParsedKind): string {
  switch (kind) {
    case "pdf":
      return "PDF";
    case "docx":
      return "Word";
    case "xlsx":
      return "Excel";
    case "csv":
      return "CSV";
    case "markdown":
      return "Markdown";
    case "json":
      return "JSON";
    case "text":
      return "Texte";
    case "pptx":
      return "PowerPoint";
    case "odt":
      return "OpenDocument";
    case "ods":
      return "OpenDocument (tableur)";
    case "rtf":
      return "RTF";
    case "image":
      return "Image (non lue automatiquement)";
    case "unknown":
      return "Document (parsing non disponible)";
  }
}

// Decode the 5 predefined XML entities found in OOXML/ODF text nodes.
function decodeXmlEntities(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

// PPTX: concatenate the <a:t> runs of every slide, slide by slide (ordered).
async function parsePptx(buffer: Buffer): Promise<string | null> {
  const zip = await JSZip.loadAsync(buffer);
  const slidePaths = Object.keys(zip.files)
    .filter((p) => /^ppt\/slides\/slide\d+\.xml$/.test(p))
    .sort((a, b) => {
      const na = Number(a.match(/slide(\d+)\.xml$/)?.[1] ?? 0);
      const nb = Number(b.match(/slide(\d+)\.xml$/)?.[1] ?? 0);
      return na - nb;
    });
  const parts: string[] = [];
  for (let i = 0; i < slidePaths.length; i++) {
    const xml = await zip.file(slidePaths[i]!)!.async("string");
    const runs = [...xml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map((m) =>
      decodeXmlEntities(m[1]!),
    );
    if (runs.length > 0) {
      parts.push(`## Diapositive ${i + 1}`, runs.join("\n"), "");
    }
  }
  const text = parts.join("\n").trim();
  return text.length > 0 ? text : null;
}

// ODF (odt/odp/ods): pull text from content.xml. Tags are stripped, with a
// newline emitted at paragraph / table-row boundaries so structure survives.
async function parseOpenDocument(buffer: Buffer): Promise<string | null> {
  const zip = await JSZip.loadAsync(buffer);
  const entry = zip.file("content.xml");
  if (!entry) return null;
  const xml = await entry.async("string");
  const withBreaks = xml
    .replace(/<\/text:p>/g, "\n")
    .replace(/<\/text:h>/g, "\n")
    .replace(/<\/table:table-row>/g, "\n")
    .replace(/<text:tab\/>/g, "\t")
    .replace(/<table:table-cell[^>]*>/g, " ");
  const stripped = withBreaks.replace(/<[^>]+>/g, "");
  const text = decodeXmlEntities(stripped)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return text.length > 0 ? text : null;
}

// RTF: minimal de-tokenizer — drop groups/control words, keep text + escaped
// chars. Good enough to recover the prose for the model to work from.
function parseRtf(rtf: string): string | null {
  let s = rtf
    .replace(/\\'[0-9a-fA-F]{2}/g, " ") // hex-escaped bytes → space (lossy but safe)
    .replace(/\\par[d]?\b/g, "\n")
    .replace(/\\tab\b/g, "\t")
    .replace(/\\[a-zA-Z]+-?\d* ?/g, "") // control words
    .replace(/[{}]/g, "")
    .replace(/\\\*/g, "");
  s = s.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  return s.length > 0 ? s : null;
}
