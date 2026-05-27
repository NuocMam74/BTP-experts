import ExcelJS from "exceljs";
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
    case "image":
      return "Image (non lue automatiquement)";
    case "unknown":
      return "Document (parsing non disponible)";
  }
}
