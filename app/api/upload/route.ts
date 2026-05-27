import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { and, eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db, schema } from "@/lib/db/client";
import { describeKind, parseAttachment } from "@/lib/parsers";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_BYTES = 50 * 1024 * 1024;
const UPLOAD_LIMIT = 30;
const UPLOAD_WINDOW_MS = 60_000;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rateKey = `upload:${session.user.id}:${clientIp(req)}`;
  const limit = checkRateLimit(rateKey, UPLOAD_LIMIT, UPLOAD_WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: "Trop d'uploads — patientez quelques secondes.",
        retryAfterMs: limit.resetMs,
      },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil(limit.resetMs / 1000).toString(),
        },
      },
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const conversationId = formData.get("conversationId");
  const agentSlug = formData.get("agentSlug");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `Fichier > ${Math.round(MAX_BYTES / 1024 / 1024)} Mo` },
      { status: 413 },
    );
  }
  if (typeof agentSlug !== "string") {
    return NextResponse.json({ error: "agentSlug manquant" }, { status: 400 });
  }

  let convId: string;
  if (typeof conversationId === "string" && conversationId.length > 0) {
    const existing = await db.query.conversations.findFirst({
      where: and(
        eq(schema.conversations.id, conversationId),
        eq(schema.conversations.userId, session.user.id),
      ),
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Conversation introuvable" },
        { status: 404 },
      );
    }
    convId = existing.id;
  } else {
    convId = randomUUID();
    await db.insert(schema.conversations).values({
      id: convId,
      userId: session.user.id,
      agentSlug,
      title: file.name,
    });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadsDir = path.join(process.cwd(), "data", "uploads", convId);
  await fs.mkdir(uploadsDir, { recursive: true });
  const storagePath = path.join(uploadsDir, `${randomUUID()}-${file.name}`);
  await fs.writeFile(storagePath, buffer);

  const parseResult = await parseAttachment(
    buffer,
    file.name,
    file.type || "application/octet-stream",
  );

  const documentId = randomUUID();
  await db.insert(schema.documents).values({
    id: documentId,
    conversationId: convId,
    storagePath,
    filename: file.name,
    mimeType: file.type || "application/octet-stream",
    parsedText: parseResult.text,
    metadata: {
      pages: parseResult.pages,
      kind: parseResult.kind,
      sizeBytes: file.size,
    },
  });

  return NextResponse.json({
    documentId,
    conversationId: convId,
    filename: file.name,
    pages: parseResult.pages,
    parsed: parseResult.text !== null,
    kind: parseResult.kind,
    kindLabel: describeKind(parseResult.kind),
  });
}
