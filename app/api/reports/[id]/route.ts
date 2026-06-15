import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import fs from "node:fs/promises";

import { auth } from "@/auth";
import { db, schema } from "@/lib/db/client";
import { getMimeType } from "@/lib/reports";
import type { ArtifactFormat } from "@/lib/reports/types";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const report = await db.query.reports.findFirst({
    where: and(
      eq(schema.reports.id, params.id),
      eq(schema.reports.userId, session.user.id),
    ),
  });
  if (!report) {
    return NextResponse.json({ error: "Rapport introuvable" }, { status: 404 });
  }

  let buffer: Buffer;
  try {
    buffer = await fs.readFile(report.storagePath);
  } catch (err) {
    return NextResponse.json(
      {
        error: "Fichier de rapport introuvable sur disque",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 410 },
    );
  }

  const safeFilename = encodeURIComponent(report.filename);

  // Image artifacts (annotated plans) are served inline so the chat can preview
  // them directly via Markdown `![…](/api/reports/<id>)`. Document formats keep
  // the attachment disposition to force a download — UNLESS `?preview=1`, used by
  // the in-chat preview card to render a PDF inside an <iframe>.
  const format = report.format as ArtifactFormat;
  const isImage = format === "png" || format === "jpg";
  const previewMode = new URL(req.url).searchParams.get("preview") === "1";
  const inlineForPreview = previewMode && (format === "pdf" || isImage);
  const disposition = isImage || inlineForPreview ? "inline" : "attachment";

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": getMimeType(format),
      "Content-Length": String(buffer.length),
      "Content-Disposition": `${disposition}; filename="${safeFilename}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
