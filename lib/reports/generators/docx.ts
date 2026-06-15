import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  HeadingLevel,
  Packer,
  PageNumber,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

import type { ReportPayload } from "../types";
import {
  THEME,
  formatCellDisplay,
  frenchToday,
  isNumericValue,
  isTotalRow,
} from "./theme";

const FONT = THEME.fontBody;

export async function generateDocx(payload: ReportPayload): Promise<Buffer> {
  const children: (Paragraph | Table)[] = [];

  // --- Title block -----------------------------------------------------------
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 240, after: 80 },
      children: [
        new TextRun({ text: payload.title, bold: true, size: 40, color: THEME.primary }),
      ],
    }),
  );
  if (payload.subtitle) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [
          new TextRun({ text: payload.subtitle, italics: true, size: 24, color: THEME.muted }),
        ],
      }),
    );
  }
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: THEME.primary, space: 6 } },
      children: [
        new TextRun({ text: `Généré le ${frenchToday()}`, size: 18, color: THEME.muted }),
      ],
    }),
  );

  // --- Sections --------------------------------------------------------------
  if (payload.sections) {
    for (const section of payload.sections) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 280, after: 120 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: THEME.border, space: 4 } },
          children: [new TextRun({ text: section.heading, bold: true, color: THEME.primary, size: 28 })],
        }),
      );
      for (const block of parseMarkdownToBlocks(section.body_markdown)) {
        children.push(block);
      }
    }
  }

  // --- Standalone tables -----------------------------------------------------
  if (payload.tables) {
    for (const t of payload.tables) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 100 },
          children: [new TextRun({ text: t.name, bold: true, color: THEME.primary, size: 24 })],
        }),
      );
      children.push(buildTable(t.columns, t.rows));
      children.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun("")] }));
    }
  }

  const doc = new Document({
    creator: "Chatbot BTP",
    title: payload.title,
    styles: {
      default: {
        document: { run: { font: FONT, size: 22, color: THEME.text } },
      },
      paragraphStyles: [
        {
          id: "Normal",
          name: "Normal",
          run: { font: FONT, size: 22, color: THEME.text },
          paragraph: { spacing: { line: 276, after: 120 }, alignment: AlignmentType.JUSTIFIED },
        },
      ],
    },
    sections: [
      {
        properties: { page: { margin: { top: 1100, bottom: 1100, left: 1100, right: 1100 } } },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [new TextRun({ text: payload.title, size: 16, color: THEME.muted })],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                border: { top: { style: BorderStyle.SINGLE, size: 4, color: THEME.border, space: 4 } },
                children: [
                  new TextRun({ text: "Page ", size: 16, color: THEME.muted }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 16, color: THEME.muted }),
                  new TextRun({ text: " / ", size: 16, color: THEME.muted }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: THEME.muted }),
                  new TextRun({ text: "   ·   Document généré automatiquement — à valider par un professionnel", size: 14, color: THEME.muted }),
                ],
              }),
            ],
          }),
        },
        children,
      },
    ],
  });

  return Packer.toBuffer(doc);
}

// --- Markdown → docx blocks (paragraphs, lists, and pipe tables) -------------
function parseMarkdownToBlocks(md: string): (Paragraph | Table)[] {
  const out: (Paragraph | Table)[] = [];
  const lines = md.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!.trimEnd();

    // Markdown pipe table: a header row, a separator row, then data rows.
    if (isTableRow(line) && isSeparatorRow(lines[i + 1] ?? "")) {
      const tableLines: string[] = [line];
      i += 1; // skip separator
      let j = i + 1;
      while (j < lines.length && isTableRow(lines[j]!)) {
        tableLines.push(lines[j]!);
        j += 1;
      }
      i = j - 1;
      const { columns, rows } = parsePipeTable(tableLines);
      if (columns.length > 0) out.push(buildTable(columns, rows));
      continue;
    }

    if (line.length === 0) {
      out.push(new Paragraph({ spacing: { after: 60 }, children: [new TextRun("")] }));
      continue;
    }
    if (line.startsWith("### ")) {
      out.push(new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 160, after: 80 }, children: [new TextRun({ text: line.slice(4), bold: true, color: THEME.primaryDark, size: 22 })] }));
      continue;
    }
    if (line.startsWith("## ")) {
      out.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 }, children: [new TextRun({ text: line.slice(3), bold: true, color: THEME.primary, size: 24 })] }));
      continue;
    }
    if (line.startsWith("# ")) {
      out.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240, after: 120 }, children: [new TextRun({ text: line.slice(2), bold: true, color: THEME.primary, size: 28 })] }));
      continue;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      out.push(new Paragraph({ bullet: { level: 0 }, spacing: { after: 40 }, children: renderInline(line.slice(2)) }));
      continue;
    }
    const numbered = line.match(/^(\d+)\.\s+(.*)$/);
    if (numbered) {
      out.push(
        new Paragraph({
          spacing: { after: 40 },
          indent: { left: 360, hanging: 260 },
          children: [new TextRun({ text: `${numbered[1]}. `, bold: true }), ...renderInline(numbered[2]!)],
        }),
      );
      continue;
    }
    out.push(new Paragraph({ children: renderInline(line) }));
  }
  return out;
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
function parsePipeTable(tableLines: string[]): {
  columns: string[];
  rows: (string | number | null)[][];
} {
  const columns = splitPipeRow(tableLines[0]!);
  const rows = tableLines.slice(1).map((l) => splitPipeRow(l).map((c) => (c === "" ? null : c)));
  return { columns, rows };
}

// --- Styled table builder (shared by payload.tables + markdown tables) -------
function buildTable(
  columns: string[],
  rows: ReadonlyArray<ReadonlyArray<string | number | boolean | null>>,
): Table {
  const colCount = columns.length;
  const headerRow = new TableRow({
    tableHeader: true,
    children: columns.map(
      (col) =>
        new TableCell({
          width: { size: 100 / colCount, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, color: "auto", fill: THEME.tableHeaderFill },
          margins: { top: 60, bottom: 60, left: 80, right: 80 },
          children: [
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [new TextRun({ text: col, bold: true, color: THEME.headerText, size: 20 })],
            }),
          ],
        }),
    ),
  });

  const dataRows = rows.map((row, idx) => {
    const total = isTotalRow(row);
    const zebra = !total && idx % 2 === 1;
    const fill = total ? THEME.totalFill : zebra ? THEME.zebraFill : undefined;
    return new TableRow({
      children: columns.map((_, c) => {
        const cell = row[c] ?? null;
        const numeric = isNumericValue(cell);
        return new TableCell({
          width: { size: 100 / colCount, type: WidthType.PERCENTAGE },
          shading: fill ? { type: ShadingType.CLEAR, color: "auto", fill } : undefined,
          margins: { top: 50, bottom: 50, left: 80, right: 80 },
          children: [
            new Paragraph({
              alignment: numeric ? AlignmentType.RIGHT : AlignmentType.LEFT,
              children: [new TextRun({ text: formatCellDisplay(cell), bold: total, size: 20 })],
            }),
          ],
        });
      }),
    });
  });

  const single = { style: BorderStyle.SINGLE, size: 2, color: THEME.border };
  return new Table({
    rows: [headerRow, ...dataRows],
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: { top: single, bottom: single, left: single, right: single, insideHorizontal: single, insideVertical: single },
  });
}

function renderInline(text: string): TextRun[] {
  const out: TextRun[] = [];
  const regex = /(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_|`[^`]+`)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) out.push(new TextRun(text.slice(lastIndex, match.index)));
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
  if (lastIndex < text.length) out.push(new TextRun(text.slice(lastIndex)));
  return out.length > 0 ? out : [new TextRun(text)];
}
