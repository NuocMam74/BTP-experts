import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

import type { ReportPayload } from "../types";

export async function generateDocx(payload: ReportPayload): Promise<Buffer> {
  const children: (Paragraph | Table)[] = [];

  children.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: payload.title, bold: true, size: 36 })],
    }),
  );

  if (payload.subtitle) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: payload.subtitle, italics: true, size: 22 }),
        ],
      }),
    );
  }

  children.push(new Paragraph({ children: [new TextRun(" ")] }));

  if (payload.sections) {
    for (const section of payload.sections) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: section.heading, bold: true })],
        }),
      );
      const blocks = parseMarkdownToBlocks(section.body_markdown);
      for (const block of blocks) {
        children.push(block);
      }
    }
  }

  if (payload.tables) {
    for (const t of payload.tables) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: t.name, bold: true })],
        }),
      );
      const headerRow = new TableRow({
        children: t.columns.map(
          (col) =>
            new TableCell({
              width: { size: 100 / t.columns.length, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: col, bold: true })],
                }),
              ],
            }),
        ),
      });
      const dataRows = t.rows.map(
        (row) =>
          new TableRow({
            children: row.map(
              (cell) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun(cell === null ? "" : String(cell)),
                      ],
                    }),
                  ],
                }),
            ),
          }),
      );
      children.push(
        new Table({
          rows: [headerRow, ...dataRows],
          width: { size: 100, type: WidthType.PERCENTAGE },
        }),
      );
      children.push(new Paragraph({ children: [new TextRun(" ")] }));
    }
  }

  const doc = new Document({
    creator: "Chatbot BTP",
    title: payload.title,
    sections: [{ children }],
  });

  return Packer.toBuffer(doc);
}

function parseMarkdownToBlocks(md: string): Paragraph[] {
  const out: Paragraph[] = [];
  const lines = md.split(/\r?\n/);
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.length === 0) {
      out.push(new Paragraph({ children: [new TextRun(" ")] }));
      continue;
    }
    if (line.startsWith("### ")) {
      out.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [new TextRun({ text: line.slice(4), bold: true })],
        }),
      );
      continue;
    }
    if (line.startsWith("## ")) {
      out.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: line.slice(3), bold: true })],
        }),
      );
      continue;
    }
    if (line.startsWith("# ")) {
      out.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: line.slice(2), bold: true })],
        }),
      );
      continue;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      out.push(
        new Paragraph({
          bullet: { level: 0 },
          children: renderInline(line.slice(2)),
        }),
      );
      continue;
    }
    out.push(new Paragraph({ children: renderInline(line) }));
  }
  return out;
}

function renderInline(text: string): TextRun[] {
  const out: TextRun[] = [];
  const regex = /(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_|`[^`]+`)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) {
      out.push(new TextRun(text.slice(lastIndex, match.index)));
    }
    const token = match[0];
    if (token.startsWith("**") || token.startsWith("__")) {
      out.push(new TextRun({ text: token.slice(2, -2), bold: true }));
    } else if (token.startsWith("`")) {
      out.push(new TextRun({ text: token.slice(1, -1), font: "Consolas" }));
    } else {
      out.push(new TextRun({ text: token.slice(1, -1), italics: true }));
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) {
    out.push(new TextRun(text.slice(lastIndex)));
  }
  return out.length > 0 ? out : [new TextRun(text)];
}
