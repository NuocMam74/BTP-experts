import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

import { db, schema } from "@/lib/db/client";

import { generateDocx } from "./generators/docx";
import { generateMarkdown } from "./generators/md";
import { generatePdf } from "./generators/pdf";
import { generatePptx } from "./generators/pptx";
import { generateXlsx } from "./generators/xlsx";
import type { ArtifactFormat, ReportFormat, ReportPayload } from "./types";

const REPORTS_DIR = path.join(process.cwd(), "data", "reports");

const MIME_TYPE: Record<ArtifactFormat, string> = {
  md: "text/markdown; charset=utf-8",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  pdf: "application/pdf",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  png: "image/png",
  jpg: "image/jpeg",
};

const EXTENSION: Record<ArtifactFormat, string> = {
  md: "md",
  docx: "docx",
  xlsx: "xlsx",
  pdf: "pdf",
  pptx: "pptx",
  png: "png",
  jpg: "jpg",
};

export type GeneratedReport = {
  id: string;
  filename: string;
  format: ArtifactFormat;
  sizeBytes: number;
  downloadUrl: string;
  mimeType: string;
};

export async function generateReport(args: {
  userId: string;
  agentSlug?: string;
  conversationId?: string;
  payload: ReportPayload;
}): Promise<GeneratedReport> {
  const { userId, agentSlug, conversationId, payload } = args;
  let buffer: Buffer;

  switch (payload.format) {
    case "md":
      buffer = generateMarkdown(payload);
      break;
    case "docx":
      buffer = await generateDocx(payload);
      break;
    case "xlsx":
      buffer = await generateXlsx(payload);
      break;
    case "pdf":
      buffer = await generatePdf(payload);
      break;
    case "pptx":
      buffer = await generatePptx(payload);
      break;
  }

  const id = randomUUID();
  const safeTitle = slugify(payload.title);
  const filename = `${safeTitle}.${EXTENSION[payload.format]}`;

  const userDir = path.join(REPORTS_DIR, userId, id);
  await fs.mkdir(userDir, { recursive: true });
  const storagePath = path.join(userDir, filename);
  await fs.writeFile(storagePath, buffer);

  await db.insert(schema.reports).values({
    id,
    userId,
    conversationId: conversationId ?? null,
    agentSlug: agentSlug ?? null,
    format: payload.format,
    title: payload.title,
    filename,
    storagePath,
    sizeBytes: buffer.length,
    metadata: {
      sections: payload.sections?.length ?? 0,
      tables: payload.tables?.length ?? 0,
      slides: payload.slides?.length ?? 0,
    },
  });

  return {
    id,
    filename,
    format: payload.format,
    sizeBytes: buffer.length,
    downloadUrl: `/api/reports/${id}`,
    mimeType: MIME_TYPE[payload.format],
  };
}

// Stores a pre-rendered binary artifact (e.g. an annotated plan PNG produced by
// `annoter_image`) through the same reports table + /api/reports download layer
// as generated reports. The bytes are written as-is — no section/table/slide
// generation. Returns the same shape as generateReport so callers/UI treat it
// uniformly (and the chat route's fabricated-link reconciliation covers it).
export async function saveBinaryReport(args: {
  userId: string;
  agentSlug?: string;
  conversationId?: string;
  format: ArtifactFormat;
  title: string;
  buffer: Buffer;
  metadata?: Record<string, unknown>;
}): Promise<GeneratedReport> {
  const { userId, agentSlug, conversationId, format, title, buffer, metadata } =
    args;

  const id = randomUUID();
  const safeTitle = slugify(title);
  const filename = `${safeTitle}.${EXTENSION[format]}`;

  const userDir = path.join(REPORTS_DIR, userId, id);
  await fs.mkdir(userDir, { recursive: true });
  const storagePath = path.join(userDir, filename);
  await fs.writeFile(storagePath, buffer);

  await db.insert(schema.reports).values({
    id,
    userId,
    conversationId: conversationId ?? null,
    agentSlug: agentSlug ?? null,
    format,
    title,
    filename,
    storagePath,
    sizeBytes: buffer.length,
    metadata: metadata ?? {},
  });

  return {
    id,
    filename,
    format,
    sizeBytes: buffer.length,
    downloadUrl: `/api/reports/${id}`,
    mimeType: MIME_TYPE[format],
  };
}

export function getMimeType(format: ArtifactFormat): string {
  return MIME_TYPE[format];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "rapport";
}
