import { createCanvas, loadImage } from "@napi-rs/canvas";

import { logger } from "@/lib/logger";

import { renderPdfPageToPngBuffer } from "./pdf";

// One marking the model asks us to draw on a plan/image. All coordinates are
// NORMALISED (0..1) relative to the rendered image's width/height, because the
// model does not know the pixel dimensions of the document — we scale them to
// the real size here.
//
//  - circle / rectangle : the shape is drawn to fit the box (x, y, width, height).
//  - arrow              : drawn from (x, y) to (x + width, y + height); set a thin
//                         box to get a near-horizontal/vertical arrow.
//  - text               : `label` is drawn at (x, y) (top-left anchor).
export type Annotation = {
  type: "circle" | "rectangle" | "arrow" | "text";
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  color?: AnnotationColor;
};

export type AnnotationColor =
  | "red"
  | "blue"
  | "green"
  | "orange"
  | "black"
  | "yellow"
  | "white";

const COLOR_HEX: Record<AnnotationColor, string> = {
  red: "#ef4444",
  blue: "#2563eb",
  green: "#16a34a",
  orange: "#f97316",
  black: "#111827",
  yellow: "#eab308",
  white: "#ffffff",
};

export type AnnotateInput = {
  buffer: Buffer;
  // "image" → raster loaded directly; "pdf" → the chosen page is rastered first.
  kind: "image" | "pdf";
  // 1-indexed PDF page to annotate (ignored for images).
  page?: number;
  annotations: Annotation[];
};

// Draws the requested annotations onto the document and returns a PNG buffer
// (plus the output pixel size). Throws if the source cannot be rastered.
export async function annotateDocument(input: AnnotateInput): Promise<{
  png: Buffer;
  width: number;
  height: number;
}> {
  let rasterBuffer: Buffer | null = input.buffer;

  if (input.kind === "pdf") {
    rasterBuffer = await renderPdfPageToPngBuffer(input.buffer, input.page ?? 1);
    if (!rasterBuffer) {
      throw new Error(
        "Impossible de rasteriser la page PDF demandée (page hors limites ou rendu indisponible).",
      );
    }
  }

  const image = await loadImage(rasterBuffer);
  const width = image.width;
  const height = image.height;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, width, height);

  // Scale stroke + font to the image so markings stay legible on large plans.
  const minDim = Math.min(width, height);
  const lineWidth = Math.max(3, Math.round(minDim * 0.005));
  const fontSize = Math.max(14, Math.round(minDim * 0.022));

  for (const a of input.annotations) {
    const color = COLOR_HEX[a.color ?? "red"];
    const px = clamp01(a.x) * width;
    const py = clamp01(a.y) * height;
    const pw = clamp01(a.width) * width;
    const ph = clamp01(a.height) * height;

    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    switch (a.type) {
      case "circle":
        drawEllipse(ctx, px, py, pw, ph);
        break;
      case "rectangle":
        ctx.strokeRect(px, py, pw, ph);
        break;
      case "arrow":
        drawArrow(ctx, px, py, px + pw, py + ph, lineWidth);
        break;
      case "text":
        // No shape — the label below is the whole annotation.
        break;
    }

    if (a.label && a.label.trim().length > 0) {
      // Anchor the label above the shape (for text annotations, at the point).
      const labelX = px;
      const labelY = a.type === "text" ? py : Math.max(0, py - lineWidth);
      drawLabel(ctx, a.label.trim(), labelX, labelY, fontSize, color);
    }

    ctx.restore();
  }

  const png = canvas.toBuffer("image/png");
  logger.info(
    { width, height, annotations: input.annotations.length },
    "image annotated",
  );
  return { png, width, height };
}

function clamp01(v: number): number {
  if (Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

function drawEllipse(
  ctx: ReturnType<ReturnType<typeof createCanvas>["getContext"]>,
  x: number,
  y: number,
  w: number,
  h: number,
): void {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const rx = Math.max(2, w / 2);
  const ry = Math.max(2, h / 2);
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();
}

function drawArrow(
  ctx: ReturnType<ReturnType<typeof createCanvas>["getContext"]>,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  lineWidth: number,
): void {
  const head = Math.max(10, lineWidth * 4);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  // Arrowhead.
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - head * Math.cos(angle - Math.PI / 6),
    y2 - head * Math.sin(angle - Math.PI / 6),
  );
  ctx.lineTo(
    x2 - head * Math.cos(angle + Math.PI / 6),
    y2 - head * Math.sin(angle + Math.PI / 6),
  );
  ctx.closePath();
  ctx.fill();
}

function drawLabel(
  ctx: ReturnType<ReturnType<typeof createCanvas>["getContext"]>,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: string,
): void {
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textBaseline = "bottom";
  const padding = Math.round(fontSize * 0.3);
  const metrics = ctx.measureText(text);
  const boxW = metrics.width + padding * 2;
  const boxH = fontSize + padding * 2;
  const boxY = Math.max(0, y - boxH);
  // White plate behind the text for contrast on busy plans, with a coloured
  // outline matching the marking.
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillRect(x, boxY, boxW, boxH);
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1, Math.round(fontSize * 0.08));
  ctx.strokeRect(x, boxY, boxW, boxH);
  ctx.fillStyle = color;
  ctx.fillText(text, x + padding, boxY + boxH - padding);
}
