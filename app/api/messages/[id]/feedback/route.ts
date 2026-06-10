import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db, rawDb, schema } from "@/lib/db/client";

export const runtime = "nodejs";

type Vote = "up" | "down" | null;

/**
 * Records (or clears) a 👍/👎 on an assistant message.
 * Body: { vote: "up" | "down" | null }  — null clears the vote.
 * One verdict per message (upsert).
 */
export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  let vote: Vote;
  try {
    const body = (await req.json()) as { vote?: unknown };
    if (body.vote === "up" || body.vote === "down" || body.vote === null) {
      vote = body.vote;
    } else {
      return NextResponse.json({ error: "vote invalide" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Corps JSON invalide" }, { status: 400 });
  }

  // Ownership: the message must belong to a conversation owned by the user.
  const message = await db.query.messages.findFirst({
    where: eq(schema.messages.id, params.id),
  });
  if (!message) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const conv = await db.query.conversations.findFirst({
    where: and(
      eq(schema.conversations.id, message.conversationId),
      eq(schema.conversations.userId, userId),
    ),
  });
  if (!conv) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (vote === null) {
    rawDb
      .prepare("DELETE FROM message_feedback WHERE message_id = ?")
      .run(params.id);
    return NextResponse.json({ ok: true, vote: null });
  }

  rawDb
    .prepare(
      `INSERT INTO message_feedback (message_id, user_id, vote)
         VALUES (?, ?, ?)
       ON CONFLICT(message_id)
         DO UPDATE SET vote = excluded.vote, created_at = unixepoch()`,
    )
    .run(params.id, userId, vote);

  return NextResponse.json({ ok: true, vote });
}
