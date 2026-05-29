import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import fs from "node:fs/promises";
import type { ModelMessage } from "ai";

import { auth } from "@/auth";
import { db, schema } from "@/lib/db/client";
import { loadAgent } from "@/lib/agent-runtime/loadManifest";
import { streamAgentResponse } from "@/lib/agent-runtime/runConversation";
import { loadSkillPrompt } from "@/lib/agent-runtime/skills";
import { checkEntitlement } from "@/lib/billing/entitlements";
import { renderPdfToImageDataUrls } from "@/lib/parsers/pdf";
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

// Quantized local models occasionally degenerate into emitting the same
// paragraph 10–100+ times until the context window runs out. Detection rule:
// look at the trailing ~6 000 chars of the answer, split into "signatures"
// (trimmed lines, digits normalised so "70." / "71." collapse to "#."), and
// if any signature ≥40 chars appears ≥4 times → we're stuck in a loop.
const LOOP_TAIL_CHARS = 6000;
const LOOP_MIN_LINE_LEN = 40;
const LOOP_THRESHOLD = 4;
function detectRepetitionLoop(text: string): boolean {
  if (text.length < 800) return false;
  const tail = text.slice(-LOOP_TAIL_CHARS);
  const sigs = tail
    .split("\n")
    .map((l) => l.trim().toLowerCase().replace(/\d+/g, "#"))
    .filter((l) => l.length >= LOOP_MIN_LINE_LEN);
  if (sigs.length < LOOP_THRESHOLD * 2) return false;
  const counts = new Map<string, number>();
  for (const s of sigs) {
    const c = (counts.get(s) ?? 0) + 1;
    if (c >= LOOP_THRESHOLD) return true;
    counts.set(s, c);
  }
  return false;
}

// Pulls a human-readable message out of whatever the model/provider throws.
// AI SDK / LM Studio errors arrive as nested plain objects ({ error: { message } }),
// so a naive String(err) yields "[object Object]" — dig through common shapes.
function errorMessage(err: unknown, depth = 0): string {
  if (err == null) return "Erreur inconnue";
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  if (typeof err === "object" && depth < 4) {
    const o = err as Record<string, unknown>;
    if (typeof o.message === "string" && o.message.length > 0) return o.message;
    if (o.error != null) return errorMessage(o.error, depth + 1);
    try {
      const json = JSON.stringify(err);
      if (json && json !== "{}") return json;
    } catch {
      /* fall through */
    }
  }
  return String(err);
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
  const fullModelMessages = await toModelMessages(history);
  // Keep only the most recent turns: a long conversation would otherwise blow the
  // model's context window (16k tokens) once added to the system prompt + tool
  // schemas + RAG passages. The full history stays persisted/searchable in the DB.
  const MAX_HISTORY_MESSAGES = 20;
  const modelMessages =
    fullModelMessages.length > MAX_HISTORY_MESSAGES
      ? fullModelMessages.slice(-MAX_HISTORY_MESSAGES)
      : fullModelMessages;

  const docs = await db.query.documents.findMany({
    where: eq(schema.documents.conversationId, conversationId),
  });

  // Visual docs are fed to the model as image input (multimodal), attached to the
  // latest user turn. Requires a vision-capable model (e.g. Qwen2.5-VL).
  //  - images: sent directly;
  //  - PDFs with little/no extractable text (plans, scans): rendered to page images.
  // The conversation's visual docs stay attached on EVERY turn (capped) so the
  // agent keeps "seeing" the document across follow-up questions — not just on the
  // upload turn. The most recent docs are prioritised and the total is bounded to
  // protect the context window.
  const MAX_VISUAL_DOCS = 3;
  const visualDocs = docs
    .filter((d) => {
      const kind = (d.metadata as { kind?: string } | null)?.kind;
      return (
        kind === "image" ||
        (kind === "pdf" && (!d.parsedText || d.parsedText.trim().length < 200))
      );
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, MAX_VISUAL_DOCS);
  const imageParts = await buildImageParts(visualDocs);
  if (imageParts.length > 0) {
    attachImagesToLastUserMessage(modelMessages, imageParts);
  }

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
              return `${header}\n\n_(Image jointe à ce message en entrée visuelle — analyse-la directement. Lis les cotes/annotations lisibles ; si une dimension est ambiguë, demande confirmation à l'utilisateur avant de chiffrer.)_`;
            }
            if (kindLabel === "pdf") {
              return `${header}\n\n_(PDF sans texte exploitable — ses pages sont jointes à ce message en images (entrée visuelle). Analyse-les directement : lis les cotes/annotations lisibles ; si une dimension est ambiguë, demande confirmation avant de chiffrer.)_`;
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
  let assistantText = "";
  let persisted = false;

  // Persist whatever the assistant produced — exactly once — whether the stream
  // finishes, errors, or is aborted by the client ("Stop"). Guarantees a partial
  // answer is never lost.
  async function persistAssistant() {
    if (persisted) return;
    persisted = true;
    if (assistantText.trim().length === 0) return;
    const id = await persistMessage({
      conversationId,
      role: "assistant",
      text: assistantText,
    });
    if (aggregatedCitations.length > 0) {
      await db
        .update(schema.messages)
        .set({ toolCalls: { citations: aggregatedCitations } })
        .where(eq(schema.messages.id, id));
    }
  }

  // Internal controller so the route can also kill generation (e.g. when the
  // loop detector trips). Combined with the client signal so EITHER source
  // can abort.
  const loopAbort = new AbortController();
  const combinedSignal: AbortSignal =
    typeof (AbortSignal as unknown as { any?: unknown }).any === "function"
      ? (AbortSignal as unknown as {
          any: (signals: AbortSignal[]) => AbortSignal;
        }).any([req.signal, loopAbort.signal])
      : (() => {
          const c = new AbortController();
          const onAbort = () => c.abort();
          req.signal.addEventListener("abort", onAbort, { once: true });
          loopAbort.signal.addEventListener("abort", onAbort, { once: true });
          return c.signal;
        })();
  let loopTripped = false;

  const result = streamAgentResponse({
    agent,
    messages: modelMessages,
    attachmentsContext,
    skillPrompt,
    userId,
    conversationId,
    abortSignal: combinedSignal,
  });

  // Stream as SSE so the client can react to tool calls / citations live.
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const safeEnqueue = (chunk: Uint8Array) => {
        if (closed) return;
        try {
          controller.enqueue(chunk);
        } catch {
          /* controller already closed (client gone) */
        }
      };
      safeEnqueue(sseEncode("conversation", { id: conversationId }));
      try {
        for await (const part of result.fullStream) {
          switch (part.type) {
            case "text-delta": {
              const delta = (part as { text?: string; delta?: string }).text
                ?? (part as { delta?: string }).delta
                ?? "";
              if (delta) {
                assistantText += delta;
                safeEnqueue(sseEncode("text", { delta }));
                // Cheap to call (only scans the trailing window). If the model
                // is regurgitating the same paragraph, kill the request now —
                // partial output already streamed is kept and persisted.
                if (
                  !loopTripped &&
                  delta.includes("\n") &&
                  detectRepetitionLoop(assistantText)
                ) {
                  loopTripped = true;
                  logger.warn(
                    { agent: agent.slug, conversationId, chars: assistantText.length },
                    "repetition loop detected — aborting stream",
                  );
                  safeEnqueue(
                    sseEncode("text", {
                      delta:
                        "\n\n_⚠️ Génération interrompue : le modèle s'est mis à répéter le même passage. Réessayez ou reformulez votre demande._",
                    }),
                  );
                  assistantText +=
                    "\n\n_⚠️ Génération interrompue : le modèle s'est mis à répéter le même passage. Réessayez ou reformulez votre demande._";
                  loopAbort.abort();
                }
              }
              break;
            }
            // Fires as soon as the model STARTS emitting a tool call — before the
            // (potentially large/slow) arguments are fully generated. We surface it
            // immediately so the UI shows a loading state (e.g. "Génération du
            // document en cours…") instead of looking frozen.
            case "tool-input-start": {
              const p = part as { toolCallId?: string; toolName?: string };
              safeEnqueue(
                sseEncode("tool-call", {
                  id: p.toolCallId,
                  name: p.toolName,
                  input: null,
                }),
              );
              break;
            }
            case "tool-call": {
              const p = part as {
                toolCallId?: string;
                toolName?: string;
                input?: unknown;
              };
              safeEnqueue(
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
              safeEnqueue(
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
              safeEnqueue(sseEncode("error", { message: errorMessage(err) }));
              break;
            }
            // finish / start-step / finish-step / etc. — ignored client-side
            default:
              break;
          }
        }
        if (aggregatedCitations.length > 0) {
          safeEnqueue(
            sseEncode("citations", { citations: aggregatedCitations }),
          );
        }
        safeEnqueue(sseEncode("done", {}));
      } catch (err) {
        if (req.signal.aborted) {
          logger.info({ agent: agent.slug }, "chat stream aborted by client");
        } else if (loopTripped) {
          logger.info({ agent: agent.slug }, "chat stream stopped by loop guard");
        } else {
          logger.error({ err, agent: agent.slug }, "chat stream crashed");
          safeEnqueue(sseEncode("error", { message: errorMessage(err) }));
        }
      } finally {
        // Save the partial (or full) answer before closing — covers finish/error/abort.
        try {
          await persistAssistant();
        } catch (err) {
          logger.error({ err }, "failed to persist assistant message");
        }
        closed = true;
        try {
          controller.close();
        } catch {
          /* already closed */
        }
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

type ImagePart = { type: "image"; image: string };

// Turns visual attachments into base64 data-URL image parts the model can see:
// images are read directly; PDFs (plans/scans without text) are rendered to page
// images. Oversized images are skipped (logged) to protect the request payload.
async function buildImageParts(
  visualDocs: Array<{
    storagePath: string;
    mimeType: string | null;
    filename: string;
    metadata: unknown;
  }>,
): Promise<ImagePart[]> {
  const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
  const MAX_PDF_PAGES = 3;
  const parts: ImagePart[] = [];
  for (const doc of visualDocs) {
    const kind = (doc.metadata as { kind?: string } | null)?.kind;
    try {
      const buf = await fs.readFile(doc.storagePath);
      if (kind === "pdf") {
        const urls = await renderPdfToImageDataUrls(buf, MAX_PDF_PAGES);
        for (const url of urls) parts.push({ type: "image", image: url });
        continue;
      }
      if (buf.byteLength > MAX_IMAGE_BYTES) {
        logger.warn(
          { filename: doc.filename, bytes: buf.byteLength },
          "image too large for vision, skipped",
        );
        continue;
      }
      const mime = doc.mimeType ?? "image/jpeg";
      parts.push({ type: "image", image: `data:${mime};base64,${buf.toString("base64")}` });
    } catch (err) {
      logger.warn({ filename: doc.filename, err }, "failed to read attachment for vision");
    }
  }
  return parts;
}

// Appends the image parts to the most recent user message, converting its plain
// string content into a multimodal [text, ...images] array.
function attachImagesToLastUserMessage(
  messages: ModelMessage[],
  imageParts: ImagePart[],
): void {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m && m.role === "user") {
      const text = typeof m.content === "string" ? m.content : "";
      m.content = [{ type: "text", text }, ...imageParts];
      return;
    }
  }
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
