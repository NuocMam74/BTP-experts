import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { rawDb } from "@/lib/db/client";

export const runtime = "nodejs";

type SearchHit = {
  conversationId: string;
  conversationTitle: string | null;
  agentSlug: string;
  messageId: string;
  role: string;
  snippet: string;
  createdAt: number;
};

function buildFtsQuery(query: string): string {
  const terms = query
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2)
    .slice(0, 12);
  if (terms.length === 0) return "";
  return terms.map((t) => `"${t.replace(/"/g, '""')}"*`).join(" OR ");
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const agentSlug = searchParams.get("agentSlug") ?? null;
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10) || 20, 50);

  if (q.length < 2) {
    return NextResponse.json({ hits: [], query: q });
  }

  const ftsQuery = buildFtsQuery(q);
  if (!ftsQuery) {
    return NextResponse.json({ hits: [], query: q });
  }

  // Join FTS results with conversations table, filter by user (and optional agent).
  const baseSql = `
    SELECT
      c.id              AS conversationId,
      c.title           AS conversationTitle,
      c.agent_slug      AS agentSlug,
      m.id              AS messageId,
      m.role            AS role,
      snippet(messages_fts, 0, '<mark>', '</mark>', '…', 16) AS snippet,
      m.created_at      AS createdAt
    FROM messages_fts
    JOIN messages m ON m.id = messages_fts.message_id
    JOIN conversations c ON c.id = m.conversation_id
    WHERE messages_fts MATCH ?
      AND c.user_id = ?
      ${agentSlug ? "AND c.agent_slug = ?" : ""}
    ORDER BY bm25(messages_fts)
    LIMIT ?
  `;
  const args: unknown[] = [ftsQuery, session.user.id];
  if (agentSlug) args.push(agentSlug);
  args.push(limit);

  let rows: SearchHit[] = [];
  try {
    rows = rawDb.prepare(baseSql).all(...args) as SearchHit[];
  } catch {
    return NextResponse.json({ hits: [], query: q, error: "Requête FTS invalide" });
  }

  return NextResponse.json({ hits: rows, query: q });
}
