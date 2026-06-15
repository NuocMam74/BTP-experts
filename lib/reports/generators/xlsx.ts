import ExcelJS from "exceljs";

import type { ReportPayload } from "../types";
import { THEME, argb, isNumericValue, isTotalRow } from "./theme";

const THIN = { style: "thin" as const, color: { argb: argb(THEME.border) } };
const ALL_BORDERS = { top: THIN, bottom: THIN, left: THIN, right: THIN };

export async function generateXlsx(payload: ReportPayload): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Chatbot BTP";
  wb.created = new Date();
  wb.title = payload.title;

  // --- Synthèse sheet (narrative) -------------------------------------------
  if (payload.sections && payload.sections.length > 0) {
    const synth = wb.addWorksheet("Synthèse", {
      views: [{ showGridLines: false }],
    });
    synth.getCell("A1").value = payload.title;
    synth.getCell("A1").font = { size: 18, bold: true, color: { argb: argb(THEME.primary) } };
    synth.mergeCells("A1:D1");

    let row = 2;
    if (payload.subtitle) {
      synth.getCell(`A${row}`).value = payload.subtitle;
      synth.getCell(`A${row}`).font = { italic: true, color: { argb: argb(THEME.muted) } };
      synth.mergeCells(`A${row}:D${row}`);
      row += 1;
    }
    row += 1;

    for (const section of payload.sections) {
      synth.getCell(`A${row}`).value = section.heading;
      synth.getCell(`A${row}`).font = { size: 13, bold: true, color: { argb: argb(THEME.primary) } };
      row += 1;
      for (const line of section.body_markdown.split(/\r?\n/)) {
        const cell = synth.getCell(`A${row}`);
        cell.value = line.replace(/[*`_#]/g, "");
        cell.alignment = { wrapText: true, vertical: "top" };
        synth.mergeCells(`A${row}:D${row}`);
        row += 1;
      }
      row += 1;
    }
    synth.getColumn(1).width = 110;
  }

  // --- One styled sheet per table -------------------------------------------
  if (payload.tables && payload.tables.length > 0) {
    for (const t of payload.tables) {
      const sheetName = (t.name.slice(0, 30) || "Tableau").replace(/[\\/*[\]?:]/g, "_");
      const ws = wb.addWorksheet(sheetName, { views: [{ state: "frozen", ySplit: 1 }] });

      // Column meta: width from content + euro detection for number format.
      const widths = t.columns.map((c) => c.length + 4);
      const euroCol = t.columns.map((c) => /€|montant|prix|total|ht|ttc|tva/i.test(c));

      // Header (row 1 — kept exactly here so round-trip tests stay valid).
      ws.columns = t.columns.map((col) => ({ header: col, key: col }));
      const header = ws.getRow(1);
      header.font = { bold: true, color: { argb: argb(THEME.headerText) }, size: 11 };
      header.height = 20;
      header.eachCell((cell) => {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: argb(THEME.tableHeaderFill) } };
        cell.alignment = { vertical: "middle", horizontal: "left", wrapText: true };
        cell.border = ALL_BORDERS;
      });

      // Data rows.
      t.rows.forEach((row, rIdx) => {
        const obj: Record<string, string | number | boolean | null> = {};
        t.columns.forEach((col, i) => {
          obj[col] = (row[i] ?? null) as string | number | boolean | null;
        });
        const added = ws.addRow(obj);
        const total = isTotalRow(row);
        added.eachCell((cell, colNumber) => {
          const raw = row[colNumber - 1] ?? null;
          cell.border = ALL_BORDERS;
          if (typeof raw === "number") {
            cell.numFmt = euroCol[colNumber - 1] ? '#,##0.00\\ "€"' : "#,##0.##";
            cell.alignment = { horizontal: "right" };
          } else if (isNumericValue(raw)) {
            cell.alignment = { horizontal: "right" };
          }
          if (total) {
            cell.font = { bold: true };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: argb(THEME.totalFill) } };
          } else if (rIdx % 2 === 1) {
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: argb(THEME.zebraFill) } };
          }
          const len = cell.value == null ? 0 : String(cell.value).length;
          if (len + 2 > widths[colNumber - 1]!) widths[colNumber - 1] = len + 2;
        });
      });

      // Apply widths (clamped) + autofilter.
      t.columns.forEach((_, i) => {
        ws.getColumn(i + 1).width = Math.max(12, Math.min(55, widths[i]!));
      });
      ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: ws.rowCount, column: t.columns.length } };
    }
  }

  if (wb.worksheets.length === 0) {
    const ws = wb.addWorksheet("Document");
    ws.getCell("A1").value = payload.title;
    ws.getCell("A1").font = { size: 16, bold: true, color: { argb: argb(THEME.primary) } };
  }

  const buf = await wb.xlsx.writeBuffer();
  return Buffer.from(buf);
}
