import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import fs from "node:fs/promises";

import { auth } from "@/auth";
import { db, schema } from "@/lib/db/client";

export const runtime = "nodejs";

// Serves a user-uploaded document for in-app preview.
//   - default: streams the raw file INLINE (Content-Disposition: inline) so the
//     browser can render images / PDFs directly in an <img>/<iframe>.
//   - ?text=1: returns JSON { filename, kind, parsedText } for formats whose
//     preview is the extracted text (DOCX, XLSX, CSV, TXT…).
// Ownership is enforced through the parent conversation (documents have no
// userId of their own).
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const doc = await db.query.documents.findFirst({
    where: eq(schema.documents.id, params.id),
  });
  if (!doc) {
    return NextResponse.json({ error: "Document introuvable" }, { status: 404 });
  }

  // Verify the document's conversation belongs to the caller.
  const conv = await db.query.conversations.findFirst({
    where: and(
      eq(schema.conversations.id, doc.conversationId),
      eq(schema.conversations.userId, session.user.id),
    ),
  });
  if (!conv) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const meta = (doc.metadata ?? {}) as {
    kind?: string;
    pages?: number | null;
  };

  const url = new URL(req.url);
  if (url.searchParams.get("text") === "1") {
    return NextResponse.json({
      filename: doc.filename,
      kind: meta.kind ?? "unknown",
      pages: meta.pages ?? null,
      parsedText: doc.parsedText ?? null,
    });
  }

  let buffer: Buffer;
  try {
    buffer = await fs.readFile(doc.storagePath);
  } catch (err) {
    return NextResponse.json(
      {
        error: "Fichier introuvable sur disque",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 410 },
    );
  }

  const safeFilename = encodeURIComponent(doc.filename);

  // Only render bitmap images and PDFs inline in the browser. Everything else —
  // crucially SVG and HTML, which can carry executable script — is forced to
  // download (attachment) so an uploaded file can never run JS in our origin.
  // `nosniff` stops the browser from second-guessing the declared Content-Type.
  const mime = (doc.mimeType ?? "application/octet-stream").toLowerCase();
  const INLINE_SAFE = new Set([
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/webp",
    "image/bmp",
    "application/pdf",
  ]);
  const disposition = INLINE_SAFE.has(mime) ? "inline" : "attachment";

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": doc.mimeType ?? "application/octet-stream",
      "Content-Length": String(buffer.length),
      "Content-Disposition": `${disposition}; filename="${safeFilename}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
