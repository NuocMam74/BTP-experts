import PDFDocument from "pdfkit";

import type { ReportPayload } from "../types";

export async function generatePdf(payload: ReportPayload): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        info: {
          Title: payload.title,
          Author: "Chatbot BTP",
        },
      });

      const chunks: Buffer[] = [];
      doc.on("data", (chunk: Buffer) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      doc.fontSize(22).font("Helvetica-Bold").text(payload.title, { align: "center" });
      if (payload.subtitle) {
        doc.moveDown(0.3);
        doc
          .fontSize(12)
          .font("Helvetica-Oblique")
          .text(payload.subtitle, { align: "center" });
      }
      doc.moveDown(1.5);

      if (payload.sections) {
        for (const section of payload.sections) {
          doc.fontSize(15).font("Helvetica-Bold").text(section.heading);
          doc.moveDown(0.3);
          renderMarkdownBlocks(doc, section.body_markdown);
          doc.moveDown(0.8);
        }
      }

      if (payload.tables) {
        for (const t of payload.tables) {
          if (doc.y > doc.page.height - 200) doc.addPage();
          doc.fontSize(13).font("Helvetica-Bold").text(t.name);
          doc.moveDown(0.3);
          renderTable(doc, t.columns, t.rows);
          doc.moveDown(0.8);
        }
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

function renderMarkdownBlocks(
  doc: PDFKit.PDFDocument,
  md: string,
): void {
  const lines = md.split(/\r?\n/);
  doc.fontSize(11).font("Helvetica");
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.length === 0) {
      doc.moveDown(0.3);
      continue;
    }
    if (line.startsWith("### ")) {
      doc.moveDown(0.3);
      doc.fontSize(12).font("Helvetica-Bold").text(line.slice(4));
      doc.fontSize(11).font("Helvetica");
      continue;
    }
    if (line.startsWith("## ")) {
      doc.moveDown(0.4);
      doc.fontSize(13).font("Helvetica-Bold").text(line.slice(3));
      doc.fontSize(11).font("Helvetica");
      continue;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      doc.text("• " + stripInlineMd(line.slice(2)), {
        indent: 10,
      });
      continue;
    }
    doc.text(stripInlineMd(line));
  }
}

function stripInlineMd(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

function renderTable(
  doc: PDFKit.PDFDocument,
  columns: string[],
  rows: (string | number | boolean | null)[][],
): void {
  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const colWidth = pageWidth / columns.length;
  const startX = doc.page.margins.left;
  const rowHeight = 18;

  // Header
  let y = doc.y;
  if (y + rowHeight * 2 > doc.page.height - doc.page.margins.bottom) {
    doc.addPage();
    y = doc.y;
  }
  doc.fillColor("#e0e7ff").rect(startX, y, pageWidth, rowHeight).fill();
  doc.fillColor("#000").font("Helvetica-Bold").fontSize(10);
  columns.forEach((col, i) => {
    doc.text(col, startX + i * colWidth + 4, y + 4, {
      width: colWidth - 8,
      lineBreak: false,
      ellipsis: true,
    });
  });
  y += rowHeight;

  // Rows
  doc.font("Helvetica");
  for (const row of rows) {
    if (y + rowHeight > doc.page.height - doc.page.margins.bottom) {
      doc.addPage();
      y = doc.page.margins.top;
    }
    doc.strokeColor("#cccccc").rect(startX, y, pageWidth, rowHeight).stroke();
    row.forEach((cell, i) => {
      doc.text(cell === null ? "" : String(cell), startX + i * colWidth + 4, y + 4, {
        width: colWidth - 8,
        lineBreak: false,
        ellipsis: true,
      });
    });
    y += rowHeight;
  }
  doc.y = y + 4;
}
