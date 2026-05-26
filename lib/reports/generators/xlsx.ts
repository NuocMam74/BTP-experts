import ExcelJS from "exceljs";

import type { ReportPayload } from "../types";

export async function generateXlsx(payload: ReportPayload): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Chatbot BTP";
  wb.created = new Date();
  wb.title = payload.title;

  if (payload.sections && payload.sections.length > 0) {
    const synth = wb.addWorksheet("Synthèse");
    synth.getCell("A1").value = payload.title;
    synth.getCell("A1").font = { size: 16, bold: true };
    synth.mergeCells("A1:D1");

    let row = 2;
    if (payload.subtitle) {
      synth.getCell(`A${row}`).value = payload.subtitle;
      synth.getCell(`A${row}`).font = { italic: true };
      synth.mergeCells(`A${row}:D${row}`);
      row += 1;
    }
    row += 1;

    for (const section of payload.sections) {
      synth.getCell(`A${row}`).value = section.heading;
      synth.getCell(`A${row}`).font = { size: 13, bold: true };
      row += 1;
      const bodyLines = section.body_markdown.split(/\r?\n/);
      for (const line of bodyLines) {
        synth.getCell(`A${row}`).value = line;
        synth.getCell(`A${row}`).alignment = { wrapText: true };
        synth.mergeCells(`A${row}:D${row}`);
        row += 1;
      }
      row += 1;
    }

    synth.getColumn(1).width = 100;
  }

  if (payload.tables && payload.tables.length > 0) {
    for (const t of payload.tables) {
      const sheetName = t.name.slice(0, 30).replace(/[\\\/\*\[\]\?:]/g, "_");
      const ws = wb.addWorksheet(sheetName);

      ws.columns = t.columns.map((col) => ({
        header: col,
        key: col,
        width: Math.max(12, Math.min(50, col.length + 5)),
      }));
      ws.getRow(1).font = { bold: true };
      ws.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE0E7FF" },
      };

      for (const row of t.rows) {
        const obj: Record<string, string | number | boolean | null> = {};
        t.columns.forEach((col, i) => {
          obj[col] = (row[i] ?? null) as
            | string
            | number
            | boolean
            | null;
        });
        ws.addRow(obj);
      }

      ws.autoFilter = {
        from: { row: 1, column: 1 },
        to: { row: ws.rowCount, column: t.columns.length },
      };
    }
  }

  if (wb.worksheets.length === 0) {
    const ws = wb.addWorksheet("Document");
    ws.getCell("A1").value = payload.title;
    ws.getCell("A1").font = { size: 16, bold: true };
  }

  const buf = await wb.xlsx.writeBuffer();
  return Buffer.from(buf);
}
