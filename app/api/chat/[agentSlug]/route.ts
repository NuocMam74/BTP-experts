import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db, schema } from "@/lib/db/client";
import { loadAgent } from "@/lib/agent-runtime/loadManifest";
import { streamAgentResponse } from "@/lib/agent-runtime/runConversation";
import { loadSkillPrompt } from "@/lib/agent-runtime/skills";
import { checkEntitlement } from "@/lib/billing/entitlements";
import {
  ensureConversation,
  loadConversationMessages,
  persistMessage,
  toModelMessages,
} from "@/lib/db/messages";
import { logger } from "@/lib/logger";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 300;

// 20 requests / minute / user — tight enough to block runaway loops, loose
// enough that a normal session never hits it.
const CHAT_LIMIT = 20;
const CHAT_WINDOW_MS = 60_000;

type Citation = {
  source_ref: string;
  source_url: string | null;
};

function sseEncode(event: string, data: unknown): Uint8Array {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  return new TextEncoder().encode(payload);
}

export async function POST(
  req: Request,
  { params }: { params: { agentSlug: string } },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const rateKey = `chat:${userId}:${clientIp(req)}`;
  const limit = checkRateLimit(rateKey, CHAT_LIMIT, CHAT_WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: "Trop de requêtes — patientez quelques secondes.",
        retryAfterMs: limit.resetMs,
      },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil(limit.resetMs / 1000).toString(),
          "X-RateLimit-Limit": limit.limit.toString(),
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  const agent = await loadAgent(params.agentSlug);
  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const entitlement = await checkEntitlement(userId, agent.slug);
  if (!entitlement.allowed) {
    return NextResponse.json(
      {
        error: "Pas d'abonnement actif pour cet agent.",
        reason: entitlement.reason,
        billingUrl: "/billing",
      },
      { status: 402 },
    );
  }

  const body = (await req.json()) as {
    userText: string;
    conversationId?: string | null;
    skillId?: string | null;
    regenerate?: boolean;
  };

  if (!body.userText || typeof body.userText !== "string") {
    return NextResponse.json({ error: "userText manquant" }, { status: 400 });
  }

  const conversationId = await ensureConversation({
    conversationId: body.conversationId ?? null,
    userId,
    agentSlug: agent.slug,
    titleFallback: body.userText.slice(0, 80),
  });

  // Regenerate flow: drop the last assistant message (and only that) without
  // re-inserting the user message — the prior user message is already in the
  // history.
  if (body.regenerate) {
    const all = await loadConversationMessages(conversationId, userId);
    const lastAssistant = [...all].reverse().find((m) => m.role === "assistant");
    if (lastAssistant) {
      await db
        .delete(schema.messages)
        .where(eq(schema.messages.id, lastAssistant.id));
    }
  } else {
    await persistMessage({
      conversationId,
      role: "user",
      text: body.userText,
    });
  }

  const history = await loadConversationMessages(conversationId, userId);
  const modelMessages = await toModelMessages(history);

  const docs = await db.query.documents.findMany({
    where: eq(schema.documents.conversationId, conversationId),
  });
  const attachmentsContext =
    docs.length > 0
      ? docs
          .map((doc) => {
            const meta = (doc.metadata ?? {}) as {
              kind?: string;
              pages?: number | null;
              sizeBytes?: number;
            };
            const kindLabel = meta.kind ?? "unknown";
            const headerInfo: string[] = [doc.filename, `type: ${kindLabel}`];
            if (meta.pages) headerInfo.push(`${meta.pages} page(s)/feuille(s)`);
            if (meta.sizeBytes)
              headerInfo.push(`${Math.round(meta.sizeBytes / 1024)} ko`);
            const header = `### ${headerInfo.join(" · ")}`;

            if (doc.parsedText) {
              const text = doc.parsedText.slice(0, 8000);
              return `${header}\n\n${text}`;
            }
            if (kindLabel === "image") {
              return `${header}\n\n_(Image — non lue automatiquement. Demande à l'utilisateur de décrire son contenu si nécessaire, ou propose d'utiliser un OCR.)_`;
            }
            return `${header}\n\n_(Le contenu textuel de ce fichier n'a pas pu être extrait automatiquement. Demande à l'utilisateur de coller le contenu pertinent ou de fournir un PDF/XLSX/DOCX/TXT.)_`;
          })
          .join("\n\n---\n\n")
      : undefined;

  let skillPrompt: string | undefined;
  if (body.skillId) {
    const loaded = await loadSkillPrompt(agent.slug, body.skillId);
    skillPrompt = loaded ?? undefined;
  }

  const aggregatedCitations: Citation[] = [];

  const result = streamAgentResponse({
    agent,
    messages: modelMessages,
    attachmentsContext,
    skillPrompt,
    userId,
    conversationId,
    onFinish: async ({ text }) => {
      if (text.trim().length > 0) {
        // Persist assistant text + collected citations (stored in toolCalls JSON
        // column for now — keeps the schema compact).
        const persistedCitations =
          aggregatedCitations.length > 0 ? aggregatedCitations : undefined;
        const id = await persistMessage({
          conversationId,
          role: "assistant",
          text,
        });
        if (persistedCitations) {
          await db
            .update(schema.messages)
            .set({ toolCalls: { citations: persistedCitations } })
            .where(eq(schema.messages.id, id));
        }
      }
    },
  });

  // Stream as SSE so the client can react to tool calls / citations live.
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(sseEncode("conversation", { id: conversationId }));
      try {
        for await (const part of result.fullStream) {
          switch (part.type) {
            case "text-delta": {
              const delta = (part as { text?: string; delta?: string }).text
                ?? (part as { delta?: string }).delta
                ?? "";
              if (delta) controller.enqueue(sseEncode("text", { delta }));
              break;
            }
            case "tool-call": {
              const p = part as {
                toolCallId?: string;
                toolName?: string;
                input?: unknown;
              };
              controller.enqueue(
                sseEncode("tool-call", {
                  id: p.toolCallId,
                  name: p.toolName,
                  input: p.input,
                }),
              );
              break;
            }
            case "tool-result": {
              const p = part as {
                toolCallId?: string;
                toolName?: string;
                output?: unknown;
              };
              const citations = extractCitations(p.toolName, p.output);
              if (citations.length > 0) {
                aggregatedCitations.push(...citations);
              }
              controller.enqueue(
                sseEncode("tool-result", {
                  id: p.toolCallId,
                  name: p.toolName,
                  citations,
                }),
              );
              break;
            }
            case "error": {
              const err = (part as { error?: unknown }).error;
              logger.warn({ err, agent: agent.slug }, "stream error part");
              controller.enqueue(
                sseEncode("error", {
                  message: err instanceof Error ? err.message : String(err),
                }),
              );
              break;
            }
            // finish / start-step / finish-step / etc. — ignored client-side
            default:
              break;
          }
        }
        if (aggregatedCitations.length > 0) {
          controller.enqueue(
            sseEncode("citations", { citations: aggregatedCitations }),
          );
        }
        controller.enqueue(sseEncode("done", {}));
      } catch (err) {
        logger.error({ err, agent: agent.slug }, "chat stream crashed");
        controller.enqueue(
          sseEncode("error", {
            message: err instanceof Error ? err.message : "Erreur inconnue",
          }),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Conversation-Id": conversationId,
    },
  });
}

function extractCitations(toolName: string | undefined, output: unknown): Citation[] {
  if (toolName !== "rag_search" || !output || typeof output !== "object") {
    return [];
  }
  const results = (output as { results?: unknown }).results;
  if (!Array.isArray(results)) return [];
  const cites: Citation[] = [];
  const seen = new Set<string>();
  for (const r of results) {
    if (!r || typeof r !== "object") continue;
    const ref = (r as { source_ref?: unknown }).source_ref;
    const url = (r as { source_url?: unknown }).source_url;
    if (typeof ref !== "string" || ref.length === 0) continue;
    const key = ref + "|" + (typeof url === "string" ? url : "");
    if (seen.has(key)) continue;
    seen.add(key);
    cites.push({ source_ref: ref, source_url: typeof url === "string" ? url : null });
  }
  return cites;
}
