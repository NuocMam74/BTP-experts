import { describe, expect, it } from "vitest";
import ExcelJS from "exceljs";

import { generateMarkdown } from "@/lib/reports/generators/md";
import { generateDocx } from "@/lib/reports/generators/docx";
import { generateXlsx } from "@/lib/reports/generators/xlsx";
import { generatePdf } from "@/lib/reports/generators/pdf";
import { generatePptx } from "@/lib/reports/generators/pptx";
import type { ReportPayload } from "@/lib/reports/types";

const payload = (format: ReportPayload["format"]): ReportPayload => ({
  title: "Chiffrage maison RDC",
  subtitle: "Projet test — 2026",
  format,
  sections: [
    { heading: "Objet", body_markdown: "Estimation au ratio.\n\n- point 1\n- point 2" },
    { heading: "Hypothèses", body_markdown: "Ratio **1500 €/m²**." },
  ],
  tables: [
    {
      name: "Chiffrage",
      columns: ["Pièce", "Surface (m²)", "Total (€)"],
      rows: [
        ["Cuisine", 14.8, 22200],
        ["Séjour", 43.64, 65460],
        ["TOTAL", 58.44, 87660],
      ],
    },
  ],
  slides: [
    { title: "Synthèse", bullets: ["Surface 58,44 m²", "Budget 87 660 € HT"] },
  ],
});

const isZip = (b: Buffer) => b.length > 4 && b[0] === 0x50 && b[1] === 0x4b; // "PK"

describe("report generators", () => {
  it("markdown renders sections and a GFM table with the total row", () => {
    const buf = generateMarkdown(payload("md"));
    const text = buf.toString("utf8");
    expect(text).toContain("# Chiffrage maison RDC");
    expect(text).toContain("| Pièce | Surface (m²) | Total (€) |");
    expect(text).toContain("| TOTAL | 58.44 | 87660 |");
  });

  it("docx produces a valid (zip) non-empty document", async () => {
    const buf = await generateDocx(payload("docx"));
    expect(buf.length).toBeGreaterThan(1000);
    expect(isZip(buf)).toBe(true);
  });

  it("pdf produces a valid (%PDF) non-empty document", async () => {
    const buf = await generatePdf(payload("pdf"));
    expect(buf.length).toBeGreaterThan(1000);
    expect(buf.subarray(0, 4).toString("latin1")).toBe("%PDF");
  });

  it("pptx produces a valid (zip) non-empty presentation", async () => {
    const buf = await generatePptx(payload("pptx"));
    expect(buf.length).toBeGreaterThan(1000);
    expect(isZip(buf)).toBe(true);
  });

  it("xlsx preserves the table data faithfully (round-trip)", async () => {
    const buf = await generateXlsx(payload("xlsx"));
    expect(isZip(buf)).toBe(true);
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(buf as unknown as ArrayBuffer);
    const ws = wb.getWorksheet("Chiffrage");
    expect(ws).toBeTruthy();
    // Header row + 3 data rows
    expect(ws!.rowCount).toBe(4);
    // Total row values intact (numbers stay numbers)
    const totalRow = ws!.getRow(4);
    expect(totalRow.getCell(1).value).toBe("TOTAL");
    expect(totalRow.getCell(3).value).toBe(87660);
  });
});
