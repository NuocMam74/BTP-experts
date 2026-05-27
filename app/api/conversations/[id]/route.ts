import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db, schema } from "@/lib/db/client";

export const runtime = "nodejs";

async function ownConversation(conversationId: string, userId: string) {
  return db.query.conversations.findFirst({
    where: and(
      eq(schema.conversations.id, conversationId),
      eq(schema.conversations.userId, userId),
    ),
  });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const conv = await ownConversation(params.id, session.user.id);
  if (!conv) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await db.delete(schema.conversations).where(eq(schema.conversations.id, params.id));
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const conv = await ownConversation(params.id, session.user.id);
  if (!conv) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const body = (await req.json()) as {
    title?: string | null;
    projectId?: string | null;
    tags?: string[] | null;
  };

  const updates: Partial<typeof schema.conversations.$inferInsert> = {};
  if (body.title !== undefined) {
    updates.title = body.title ? body.title.slice(0, 200) : null;
  }
  if (body.projectId !== undefined) {
    updates.projectId = body.projectId;
  }
  if (body.tags !== undefined) {
    updates.tags = body.tags
      ? Array.from(new Set(body.tags.map((t) => t.trim()).filter(Boolean))).slice(0, 20)
      : null;
  }
  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ ok: true, noop: true });
  }
  await db
    .update(schema.conversations)
    .set(updates)
    .where(eq(schema.conversations.id, params.id));
  return NextResponse.json({ ok: true });
}
