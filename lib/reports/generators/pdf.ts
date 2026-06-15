import PDFDocument from "pdfkit";

import type { ReportPayload } from "../types";
import {
  THEME,
  formatCellDisplay,
  frenchToday,
  hex,
  isNumericValue,
  isTotalRow,
} from "./theme";

type Cell = string | number | boolean | null;

export async function generatePdf(payload: ReportPayload): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 56,
        bufferPages: true,
        info: { Title: payload.title, Author: "Chatbot BTP" },
      });

      const chunks: Buffer[] = [];
      doc.on("data", (chunk: Buffer) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // --- Title block -------------------------------------------------------
      doc.fillColor(hex(THEME.primary)).fontSize(24).font("Helvetica-Bold").text(payload.title, { align: "center" });
      if (payload.subtitle) {
        doc.moveDown(0.3).fillColor(hex(THEME.muted)).fontSize(12).font("Helvetica-Oblique").text(payload.subtitle, { align: "center" });
      }
      doc.moveDown(0.3).fillColor(hex(THEME.muted)).fontSize(9).font("Helvetica").text(`Généré le ${frenchToday()}`, { align: "center" });
      doc.moveDown(0.4);
      const ruleY = doc.y;
      doc.strokeColor(hex(THEME.primary)).lineWidth(1.5)
        .moveTo(doc.page.margins.left, ruleY).lineTo(doc.page.width - doc.page.margins.right, ruleY).stroke();
      doc.moveDown(1);

      // --- Sections ----------------------------------------------------------
      if (payload.sections) {
        for (const section of payload.sections) {
          ensureSpace(doc, 60);
          doc.fillColor(hex(THEME.primary)).fontSize(15).font("Helvetica-Bold").text(section.heading);
          const hy = doc.y + 2;
          doc.strokeColor(hex(THEME.border)).lineWidth(0.7)
            .moveTo(doc.page.margins.left, hy).lineTo(doc.page.width - doc.page.margins.right, hy).stroke();
          doc.moveDown(0.5);
          renderMarkdownBlocks(doc, section.body_markdown);
          doc.moveDown(0.8);
        }
      }

      // --- Standalone tables -------------------------------------------------
      if (payload.tables) {
        for (const t of payload.tables) {
          ensureSpace(doc, 80);
          doc.fillColor(hex(THEME.primary)).fontSize(13).font("Helvetica-Bold").text(t.name);
          doc.moveDown(0.4);
          renderTable(doc, t.columns, t.rows);
          doc.moveDown(0.9);
        }
      }

      // --- Footer page numbers (after all content is laid out) ---------------
      const range = doc.bufferedPageRange();
      for (let i = 0; i < range.count; i++) {
        doc.switchToPage(range.start + i);
        const y = doc.page.height - doc.page.margins.bottom + 18;
        doc.strokeColor(hex(THEME.border)).lineWidth(0.5)
          .moveTo(doc.page.margins.left, y - 6).lineTo(doc.page.width - doc.page.margins.right, y - 6).stroke();
        doc.fillColor(hex(THEME.muted)).fontSize(8).font("Helvetica").text(
          `Page ${i + 1} / ${range.count}   ·   Document généré automatiquement — à valider par un professionnel`,
          doc.page.margins.left,
          y,
          { align: "center", width: doc.page.width - doc.page.margins.left - doc.page.margins.right, lineBreak: false },
        );
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

function ensureSpace(doc: PDFKit.PDFDocument, needed: number): void {
  if (doc.y + needed > doc.page.height - doc.page.margins.bottom) doc.addPage();
}

function renderMarkdownBlocks(doc: PDFKit.PDFDocument, md: string): void {
  const lines = md.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!.trimEnd();

    // Pipe table inside body text.
    if (isTableRow(line) && isSeparatorRow(lines[i + 1] ?? "")) {
      const tableLines = [line];
      i += 1;
      let j = i + 1;
      while (j < lines.length && isTableRow(lines[j]!)) {
        tableLines.push(lines[j]!);
        j += 1;
      }
      i = j - 1;
      const columns = splitPipeRow(tableLines[0]!);
      const rows = tableLines.slice(1).map((l) => splitPipeRow(l).map((c) => (c === "" ? null : c)) as Cell[]);
      doc.moveDown(0.3);
      renderTable(doc, columns, rows);
      doc.moveDown(0.4);
      continue;
    }

    doc.fillColor(hex(THEME.text)).fontSize(10.5).font("Helvetica");
    if (line.length === 0) {
      doc.moveDown(0.35);
      continue;
    }
    if (line.startsWith("### ")) {
      ensureSpace(doc, 30);
      doc.moveDown(0.25).fillColor(hex(THEME.primaryDark)).fontSize(11.5).font("Helvetica-Bold").text(stripInlineMd(line.slice(4)));
      continue;
    }
    if (line.startsWith("## ")) {
      ensureSpace(doc, 34);
      doc.moveDown(0.35).fillColor(hex(THEME.primary)).fontSize(12.5).font("Helvetica-Bold").text(stripInlineMd(line.slice(3)));
      continue;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      doc.text("•  " + stripInlineMd(line.slice(2)), { indent: 12, align: "justify" });
      continue;
    }
    const numbered = line.match(/^(\d+)\.\s+(.*)$/);
    if (numbered) {
      doc.text(`${numbered[1]}.  ${stripInlineMd(numbered[2]!)}`, { indent: 12, align: "justify" });
      continue;
    }
    doc.text(stripInlineMd(line), { align: "justify" });
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

// --- Table with wrapping cells, zebra striping, bold totals ------------------
function renderTable(doc: PDFKit.PDFDocument, columns: string[], rows: Cell[][]): void {
  const tableWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const startX = doc.page.margins.left;
  const colWidth = tableWidth / columns.length;
  const padX = 5;
  const padY = 4;
  const fontSize = 9;

  const drawHeader = () => {
    const cellW = colWidth - padX * 2;
    doc.font("Helvetica-Bold").fontSize(fontSize);
    let h = 0;
    for (const col of columns) h = Math.max(h, doc.heightOfString(col, { width: cellW }));
    const rowH = h + padY * 2;
    let y = doc.y;
    doc.fillColor(hex(THEME.tableHeaderFill)).rect(startX, y, tableWidth, rowH).fill();
    doc.fillColor(hex(THEME.headerText));
    columns.forEach((col, i) => {
      doc.text(col, startX + i * colWidth + padX, y + padY, { width: cellW, align: "left" });
    });
    drawGrid(doc, startX, y, tableWidth, rowH, columns.length, colWidth);
    doc.y = y + rowH;
  };

  drawHeader();

  doc.font("Helvetica").fontSize(fontSize);
  rows.forEach((row, idx) => {
    const total = isTotalRow(row);
    const cellW = colWidth - padX * 2;
    doc.font(total ? "Helvetica-Bold" : "Helvetica");
    const texts = columns.map((_, c) => formatCellDisplay(row[c] ?? null));
    let h = 0;
    texts.forEach((tx) => (h = Math.max(h, doc.heightOfString(tx || " ", { width: cellW }))));
    const rowH = h + padY * 2;

    if (doc.y + rowH > doc.page.height - doc.page.margins.bottom) {
      doc.addPage();
      drawHeader();
      doc.font(total ? "Helvetica-Bold" : "Helvetica").fontSize(fontSize);
    }

    const y = doc.y;
    const fill = total ? THEME.totalFill : idx % 2 === 1 ? THEME.zebraFill : null;
    if (fill) doc.fillColor(hex(fill)).rect(startX, y, tableWidth, rowH).fill();

    doc.fillColor(hex(THEME.text));
    columns.forEach((_, c) => {
      const cell = row[c] ?? null;
      const align = isNumericValue(cell) ? "right" : "left";
      doc.text(texts[c]!, startX + c * colWidth + padX, y + padY, { width: cellW, align });
    });
    drawGrid(doc, startX, y, tableWidth, rowH, columns.length, colWidth);
    doc.y = y + rowH;
  });

  // pdfkit leaves doc.x at the last cell's x after the loops above; reset it to
  // the left margin so following paragraphs/headings span the full page width
  // instead of collapsing into a narrow right-hand column.
  doc.x = doc.page.margins.left;
}

function drawGrid(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  height: number,
  cols: number,
  colWidth: number,
): void {
  doc.strokeColor(hex(THEME.border)).lineWidth(0.5);
  doc.rect(x, y, width, height).stroke();
  for (let c = 1; c < cols; c++) {
    doc.moveTo(x + c * colWidth, y).lineTo(x + c * colWidth, y + height).stroke();
  }
}

function isTableRow(line: string): boolean {
  const t = line.trim();
  return t.startsWith("|") && t.endsWith("|") && t.length > 2;
}
function isSeparatorRow(line: string): boolean {
  const t = line.trim();
  return /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?$/.test(t);
}
function splitPipeRow(line: string): string[] {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}
