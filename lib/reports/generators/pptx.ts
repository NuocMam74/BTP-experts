import PptxGenJS from "pptxgenjs";

import type { ReportPayload } from "../types";
import { THEME, frenchToday } from "./theme";

const PRIMARY = THEME.primary;
const ACCENT = THEME.accent;

export async function generatePptx(payload: ReportPayload): Promise<Buffer> {
  const pres = new PptxGenJS();
  pres.author = "Chatbot BTP";
  pres.title = payload.title;
  pres.layout = "LAYOUT_WIDE";

  // Master applied to every content slide: top accent bar, footer rule, page nb.
  pres.defineSlideMaster({
    title: "BTP_MASTER",
    background: { color: "FFFFFF" },
    objects: [
      { rect: { x: 0, y: 0, w: "100%", h: 0.18, fill: { color: PRIMARY } } },
      { rect: { x: 0, y: 7.2, w: "100%", h: 0.02, fill: { color: THEME.border } } },
      {
        text: {
          text: payload.title,
          options: { x: 0.5, y: 7.18, w: 9, h: 0.3, fontSize: 9, color: THEME.muted, align: "left" },
        },
      },
    ],
    slideNumber: { x: 12.4, y: 7.18, w: 0.6, h: 0.3, fontSize: 9, color: THEME.muted },
  });

  // --- Title slide -----------------------------------------------------------
  const titleSlide = pres.addSlide();
  titleSlide.background = { color: PRIMARY };
  titleSlide.addShape(pres.ShapeType.rect, { x: 0, y: 3.55, w: "100%", h: 0.06, fill: { color: ACCENT } });
  titleSlide.addText(payload.title, {
    x: 0.6, y: 2.2, w: 12.13, h: 1.4, fontSize: 40, bold: true, align: "center", color: "FFFFFF",
  });
  if (payload.subtitle) {
    titleSlide.addText(payload.subtitle, {
      x: 0.6, y: 3.7, w: 12.13, h: 0.8, fontSize: 18, italic: true, align: "center", color: "DCE3F7",
    });
  }
  titleSlide.addText(`Généré le ${frenchToday()}`, {
    x: 0.6, y: 6.6, w: 12.13, h: 0.4, fontSize: 11, align: "center", color: "AEBCE0",
  });

  // --- Content slides --------------------------------------------------------
  const addContentSlide = () => pres.addSlide({ masterName: "BTP_MASTER" });

  const heading = (slide: PptxGenJS.Slide, text: string) => {
    slide.addText(text, { x: 0.5, y: 0.45, w: 12.13, h: 0.7, fontSize: 24, bold: true, color: PRIMARY });
    slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.15, w: 2.2, h: 0.05, fill: { color: ACCENT } });
  };

  if (payload.slides && payload.slides.length > 0) {
    for (const s of payload.slides) {
      const slide = addContentSlide();
      heading(slide, s.title);
      if (s.bullets.length > 0) {
        slide.addText(
          s.bullets.map((b) => ({ text: b, options: { bullet: { indent: 18 }, paraSpaceAfter: 6 } })),
          { x: 0.6, y: 1.5, w: 12, h: 5.4, fontSize: 16, color: THEME.text, valign: "top" },
        );
      }
      if (s.note_speaker) slide.addNotes(s.note_speaker);
    }
  } else if (payload.sections) {
    for (const section of payload.sections) {
      const slide = addContentSlide();
      heading(slide, section.heading);
      const bullets = section.body_markdown
        .split(/\r?\n/)
        .map((l) => l.replace(/^[-*]\s+/, "").replace(/^#+\s+/, "").replace(/[*`_]/g, "").trim())
        .filter((l) => l.length > 0);
      if (bullets.length > 0) {
        slide.addText(
          bullets.map((b) => ({ text: b, options: { bullet: { indent: 18 }, paraSpaceAfter: 5 } })),
          { x: 0.6, y: 1.5, w: 12, h: 5.4, fontSize: 14, color: THEME.text, valign: "top" },
        );
      }
    }
  }

  // --- Table slides ----------------------------------------------------------
  if (payload.tables && payload.tables.length > 0) {
    for (const t of payload.tables) {
      const slide = addContentSlide();
      heading(slide, t.name);
      const tableRows: PptxGenJS.TableRow[] = [];
      tableRows.push(
        t.columns.map((c) => ({
          text: c,
          options: { bold: true, color: "FFFFFF", fill: { color: PRIMARY }, valign: "middle" },
        })),
      );
      t.rows.forEach((row, idx) => {
        const isTotal = typeof row[0] === "string" && /total/i.test(row[0] as string);
        tableRows.push(
          row.map((cell) => ({
            text: cell === null ? "" : String(cell),
            options: {
              bold: isTotal,
              fill: { color: isTotal ? THEME.totalFill : idx % 2 === 1 ? THEME.zebraFill : "FFFFFF" },
            },
          })),
        );
      });
      slide.addTable(tableRows, {
        x: 0.5, y: 1.5, w: 12.13, fontSize: 11, color: THEME.text, valign: "middle",
        border: { type: "solid", color: THEME.border, pt: 0.5 },
        autoPage: true, autoPageRepeatHeader: true, newSlideStartY: 0.5,
      });
    }
  }

  const result = await pres.write({ outputType: "nodebuffer" });
  if (result instanceof Buffer) return result;
  if (typeof result === "string") return Buffer.from(result, "binary");
  if (result instanceof Uint8Array) return Buffer.from(result);
  throw new Error("Type de sortie pptxgenjs inattendu");
}
