import { and, asc, desc, eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import type { ModelMessage } from "ai";

import { db, schema } from "./client";

export type Citation = {
  source_ref: string;
  source_url: string | null;
};

// Downloadable deliverable produced in a turn, persisted alongside the assistant
// message so its preview card survives a reload. `payload` (doc generators only)
// holds the structured content used to render the inline preview.
export type StoredReport = {
  toolId: string;
  tool: string;
  format?: string;
  filename?: string;
  downloadUrl?: string;
  payload?: unknown;
};

export type StoredMessage = {
  id: string;
  conversationId: string;
  role: "user" | "assistant" | "tool" | "system";
  content: { text: string };
  citations?: Citation[];
  reports?: StoredReport[];
  createdAt: Date;
};

export async function ensureConversation({
  conversationId,
  userId,
  agentSlug,
  titleFallback,
}: {
  conversationId?: string | null;
  userId: string;
  agentSlug: string;
  titleFallback: string;
}): Promise<string> {
  if (conversationId) {
    const existing = await db.query.conversations.findFirst({
      where: and(
        eq(schema.conversations.id, conversationId),
        eq(schema.conversations.userId, userId),
      ),
    });
    if (existing) return existing.id;
  }
  const id = randomUUID();
  await db.insert(schema.conversations).values({
    id,
    userId,
    agentSlug,
    title: titleFallback.slice(0, 120),
  });
  return id;
}

export async function persistMessage(args: {
  conversationId: string;
  role: "user" | "assistant" | "tool" | "system";
  text: string;
}): Promise<string> {
  const id = randomUUID();
  await db.insert(schema.messages).values({
    id,
    conversationId: args.conversationId,
    role: args.role,
    content: { text: args.text },
  });
  return id;
}

export async function loadConversationMessages(
  conversationId: string,
  userId: string,
): Promise<StoredMessage[]> {
  const conv = await db.query.conversations.findFirst({
    where: and(
      eq(schema.conversations.id, conversationId),
      eq(schema.conversations.userId, userId),
    ),
  });
  if (!conv) return [];
  const rows = await db.query.messages.findMany({
    where: eq(schema.messages.conversationId, conversationId),
    orderBy: [asc(schema.messages.createdAt)],
  });
  return rows
    .filter(
      (r): r is typeof r & { role: StoredMessage["role"] } =>
        r.role === "user" ||
        r.role === "assistant" ||
        r.role === "tool" ||
        r.role === "system",
    )
    .map((row) => {
      const tc = row.toolCalls as
        | { citations?: Citation[]; reports?: StoredReport[] }
        | null;
      return {
        id: row.id,
        conversationId: row.conversationId,
        role: row.role,
        content: row.content as { text: string },
        citations: tc?.citations,
        reports: tc?.reports,
        createdAt: row.createdAt,
      };
    });
}

export async function toModelMessages(
  stored: StoredMessage[],
): Promise<ModelMessage[]> {
  return stored
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content.text,
    }));
}

export async function listUserConversations(userId: string) {
  return db
    .select({
      id: schema.conversations.id,
      title: schema.conversations.title,
      agentSlug: schema.conversations.agentSlug,
      createdAt: schema.conversations.createdAt,
    })
    .from(schema.conversations)
    .where(eq(schema.conversations.userId, userId))
    .orderBy(desc(schema.conversations.createdAt))
    .limit(50);
}
