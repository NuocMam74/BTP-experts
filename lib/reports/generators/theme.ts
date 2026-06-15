// Shared visual identity for every generated deliverable (docx / pdf / xlsx /
// pptx). Keeping the palette + small helpers in one place makes the output
// consistent and easy to rebrand.

// Hex WITHOUT leading '#'. Suits exceljs (ARGB) and pptxgenjs which want bare
// hex; pdfkit/docx callers prepend '#' where needed.
export const THEME = {
  primary: "1F3A93", // deep professional blue (headings, table headers)
  primaryDark: "152C6E",
  accent: "2563EB",
  text: "1A2233",
  muted: "6B7280",
  headerText: "FFFFFF",
  tableHeaderFill: "1F3A93",
  zebraFill: "F4F6FB", // very light blue-grey for alternating rows
  totalFill: "E6ECFA", // slightly stronger for total rows
  border: "C7CDD9",
  rule: "1F3A93",
  fontBody: "Calibri",
  fontHead: "Calibri",
} as const;

export function hex(c: string): string {
  return `#${c}`;
}

export function argb(c: string): string {
  return `FF${c}`;
}

// Heuristic: a "total / sous-total" row should stand out (bold + fill). We test
// the first cell because that's where "TOTAL", "Sous-total", "TOTAL GÉNÉRAL"…
// live in BTP deliverables.
export function isTotalRow(
  row: ReadonlyArray<string | number | boolean | null>,
): boolean {
  const first = row[0];
  if (typeof first !== "string") return false;
  return /\b(sous[-\s]?total|total)\b/i.test(first);
}

// A value is "numeric" if it's a real number or a string that is purely a number
// (optionally with spaces, %, €, thousands separators). Used for right-aligning
// figure columns.
export function isNumericValue(v: string | number | boolean | null): boolean {
  if (typeof v === "number") return true;
  if (typeof v !== "string") return false;
  const t = v.trim();
  if (t.length === 0) return false;
  return /^[-+]?[\d  .,]+\s*(%|€|m²|m³|ml|k€)?$/.test(t) && /\d/.test(t);
}

// French-style number for DISPLAY in pdf/docx (xlsx keeps raw numbers + numFmt).
// 1234.5 -> "1 234,5". Leaves non-numbers untouched.
export function formatCellDisplay(v: string | number | boolean | null): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "number") {
    // fr-FR uses a narrow no-break space (U+202F) as the thousands separator,
    // which the standard PDF/Helvetica font has no glyph for (renders as a box).
    // Normalise every exotic space to a plain ASCII space for safe rendering.
    return v
      .toLocaleString("fr-FR", { maximumFractionDigits: 2 })
      .replace(/[\u202F\u00A0\u2009\u2007]/g, " ");
  }
  return String(v);
}

// Today in long French form, e.g. "15 juin 2026". Safe in app code (these
// generators are not workflow scripts).
export function frenchToday(): string {
  return new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
