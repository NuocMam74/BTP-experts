import PptxGenJS from "pptxgenjs";

import type { ReportPayload } from "../types";

export async function generatePptx(payload: ReportPayload): Promise<Buffer> {
  const pres = new PptxGenJS();
  pres.author = "Chatbot BTP";
  pres.title = payload.title;
  pres.layout = "LAYOUT_WIDE";

  // Slide titre
  const titleSlide = pres.addSlide();
  titleSlide.addText(payload.title, {
    x: 0.5,
    y: 2.0,
    w: 12,
    h: 1.5,
    fontSize: 36,
    bold: true,
    align: "center",
  });
  if (payload.subtitle) {
    titleSlide.addText(payload.subtitle, {
      x: 0.5,
      y: 3.6,
      w: 12,
      h: 0.8,
      fontSize: 18,
      italic: true,
      align: "center",
      color: "666666",
    });
  }

  // Slides contenu
  if (payload.slides && payload.slides.length > 0) {
    for (const s of payload.slides) {
      const slide = pres.addSlide();
      slide.addText(s.title, {
        x: 0.5,
        y: 0.3,
        w: 12,
        h: 0.8,
        fontSize: 24,
        bold: true,
        color: "1f3a93",
      });
      if (s.bullets.length > 0) {
        slide.addText(
          s.bullets.map((b) => ({ text: b, options: { bullet: true } })),
          {
            x: 0.5,
            y: 1.3,
            w: 12,
            h: 5.5,
            fontSize: 16,
            valign: "top",
          },
        );
      }
      if (s.note_speaker) {
        slide.addNotes(s.note_speaker);
      }
    }
  } else if (payload.sections) {
    for (const section of payload.sections) {
      const slide = pres.addSlide();
      slide.addText(section.heading, {
        x: 0.5,
        y: 0.3,
        w: 12,
        h: 0.8,
        fontSize: 24,
        bold: true,
        color: "1f3a93",
      });
      const bullets = section.body_markdown
        .split(/\r?\n/)
        .map((l) => l.replace(/^[-*]\s+/, "").trim())
        .filter((l) => l.length > 0);
      if (bullets.length > 0) {
        slide.addText(
          bullets.map((b) => ({ text: b, options: { bullet: true } })),
          {
            x: 0.5,
            y: 1.3,
            w: 12,
            h: 5.5,
            fontSize: 14,
            valign: "top",
          },
        );
      }
    }
  }

  if (payload.tables && payload.tables.length > 0) {
    for (const t of payload.tables) {
      const slide = pres.addSlide();
      slide.addText(t.name, {
        x: 0.5,
        y: 0.3,
        w: 12,
        h: 0.8,
        fontSize: 22,
        bold: true,
        color: "1f3a93",
      });
      const tableRows: PptxGenJS.TableRow[] = [];
      tableRows.push(
        t.columns.map((c) => ({
          text: c,
          options: { bold: true, fill: { color: "E0E7FF" } },
        })),
      );
      for (const row of t.rows) {
        tableRows.push(
          row.map((cell) => ({
            text: cell === null ? "" : String(cell),
          })),
        );
      }
      slide.addTable(tableRows, {
        x: 0.5,
        y: 1.3,
        w: 12,
        fontSize: 11,
        border: { type: "solid", color: "CCCCCC", pt: 1 },
      });
    }
  }

  const result = await pres.write({ outputType: "nodebuffer" });
  if (result instanceof Buffer) return result;
  if (typeof result === "string") return Buffer.from(result, "binary");
  if (result instanceof Uint8Array) return Buffer.from(result);
  throw new Error("Type de sortie pptxgenjs inattendu");
}
