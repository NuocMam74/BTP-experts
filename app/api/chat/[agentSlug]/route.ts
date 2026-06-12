import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import fs from "node:fs/promises";
import type { ModelMessage } from "ai";

import { auth } from "@/auth";
import { db, schema } from "@/lib/db/client";
import { loadAgent } from "@/lib/agent-runtime/loadManifest";
import { streamAgentResponse } from "@/lib/agent-runtime/runConversation";
import { loadSkillPrompt } from "@/lib/agent-runtime/skills";
import { isVisionEnabled } from "@/lib/llm/provider";
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
// paragraph 10–100+ times until the context window runs out. We must catch that
// WITHOUT tripping on legitimate enumerations — BTP answers are full of repeated
// labels (room by room, DPGF line by line) where only the numbers change.
//
// Detection rule: a real loop repeats a block of lines VERBATIM and ADJACENTLY.
// We look at the trailing window, take the trimmed non-blank lines (keeping their
// exact text, digits included), and check whether the last N lines are an exact
// repeat of the N lines just before them, for 3 consecutive blocks. An item list
// fails this (room names / numbers differ), a degenerate loop passes it.
const LOOP_TAIL_CHARS = 6000;
const LOOP_REPEATS = 3; // how many adjacent identical blocks signal a loop
const LOOP_MAX_PERIOD = 50; // max block size (in lines) to test
const LOOP_MIN_BLOCK_CHARS = 40; // ignore trivial repeats ("---", a short word)
function detectRepetitionLoop(text: string): boolean {
  if (text.length < 1000) return false;
  const tail = text.slice(-LOOP_TAIL_CHARS);
  const lines = tail
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const n = lines.length;
  if (n < LOOP_REPEATS) return false;

  const maxPeriod = Math.min(LOOP_MAX_PERIOD, Math.floor(n / LOOP_REPEATS));
  for (let p = 1; p <= maxPeriod; p++) {
    let identical = true;
    // Compare the last `p` lines against the `p` lines preceding each earlier block.
    for (let r = 1; r < LOOP_REPEATS && identical; r++) {
      for (let i = 0; i < p; i++) {
        if (lines[n - 1 - i] !== lines[n - 1 - i - p * r]) {
          identical = false;
          break;
        }
      }
    }
    if (identical) {
      const blockChars = lines.slice(n - p).join("\n").length;
      if (blockChars >= LOOP_MIN_BLOCK_CHARS) return true;
    }
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
  const visionEnabled = isVisionEnabled(agent.model);
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
  // Only attach images when the model can actually see them. With a text-only
  // model, attaching the image makes it hallucinate; instead we leave it out and
  // the attachmentsContext below tells the agent it cannot read the visual.
  const imageParts = visionEnabled ? await buildImageParts(visualDocs) : [];
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
              return visionEnabled
                ? `${header}\n\n_(Image jointe à ce message en entrée visuelle — analyse-la directement. Lis les cotes/annotations lisibles ; si une dimension est ambiguë, demande confirmation à l'utilisateur avant de chiffrer.)_`
                : `${header}\n\n_(Image jointe, mais le modèle actuellement chargé ne lit pas les images. Ne devine pas son contenu : explique à l'utilisateur qu'il faut charger un modèle de vision (ex. Qwen2.5-VL) dans LM Studio et activer OPENAI_VISION=true, ou décrire l'image / fournir un PDF-texte/XLSX/DOCX.)_`;
            }
            if (kindLabel === "pdf") {
              return visionEnabled
                ? `${header}\n\n_(PDF sans texte exploitable — ses pages sont jointes à ce message en images (entrée visuelle). Analyse-les directement : lis les cotes/annotations lisibles ; si une dimension est ambiguë, demande confirmation avant de chiffrer.)_`
                : `${header}\n\n_(PDF sans texte exploitable (scan/plan). Le modèle actuellement chargé ne lit pas les images : ne devine pas son contenu. Explique à l'utilisateur qu'il faut charger un modèle de vision (ex. Qwen2.5-VL) et activer OPENAI_VISION=true, ou fournir une version texte.)_`;
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
  // Real downloadable reports produced by the `generer_rapport` tool THIS turn.
  // Used to reconcile the assistant's text: a quantized local model sometimes
  // fabricates a "/api/reports/<uuid>" download link without actually calling the
  // tool, which 404s. We only trust links that correspond to a real generation.
  const generatedReports: GeneratedReportRef[] = [];
  let assistantText = "";
  let persisted = false;
  // Durable id of the persisted assistant message — sent to the client in the
  // "done" event so it can attach 👍/👎 feedback to the right message.
  let assistantMessageId: string | null = null;

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
    assistantMessageId = id;
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
              const report = extractReport(p.toolName, p.output);
              if (report) generatedReports.push(report);
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
        // Reconcile any report download links the model wrote against the reports
        // actually generated this turn. Fabricated links (hallucinated UUIDs) are
        // rewritten to a real one when a report exists, or struck through with a
        // note when none was generated — so the user never gets a dead 404 link.
        const reconciled = reconcileReportLinks(assistantText, generatedReports);
        if (reconciled !== assistantText) {
          assistantText = reconciled;
          safeEnqueue(sseEncode("replace", { text: assistantText }));
        }
        if (aggregatedCitations.length > 0) {
          safeEnqueue(
            sseEncode("citations", { citations: aggregatedCitations }),
          );
        }
        // Persist BEFORE signaling done so the client receives the durable
        // message id (for 👍/👎 feedback). Idempotent — the finally block's call
        // becomes a no-op on the success path.
        try {
          await persistAssistant();
        } catch (err) {
          logger.error({ err }, "failed to persist assistant before done");
        }
        safeEnqueue(sseEncode("done", { messageId: assistantMessageId }));
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

type GeneratedReportRef = { url: string; filename: string };

// Pull the real download URL out of a `generer_rapport` tool result.
function extractReport(
  toolName: string | undefined,
  output: unknown,
): GeneratedReportRef | null {
  if (toolName !== "generer_rapport" || !output || typeof output !== "object") {
    return null;
  }
  const o = output as { download_url?: unknown; filename?: unknown };
  if (typeof o.download_url !== "string" || o.download_url.length === 0) {
    return null;
  }
  return {
    url: o.download_url,
    filename: typeof o.filename === "string" ? o.filename : "document",
  };
}

// Matches a Markdown link whose href is a report download endpoint.
const MD_REPORT_LINK_RE =
  /\[([^\]]*)\]\((\/api\/reports\/[0-9a-fA-F-]{36})\)/g;
// Matches a bare report URL (not wrapped in a Markdown link).
const BARE_REPORT_URL_RE = /\/api\/reports\/[0-9a-fA-F-]{36}/g;

// Ensures every report download link in the answer points to a report that was
// actually generated this turn. Local models occasionally invent a plausible
// link without calling the tool — those would 404. Strategy:
//   - link URL matches a real generation  → keep as-is;
//   - link URL is fabricated but ≥1 real report exists → rewrite to the real one;
//   - link is fabricated and NO report was generated → strike it through + note.
function reconcileReportLinks(
  text: string,
  reports: GeneratedReportRef[],
): string {
  if (!text || !text.includes("/api/reports/")) return text;
  const realUrls = new Set(reports.map((r) => r.url));

  let out = text.replace(MD_REPORT_LINK_RE, (full, label: string, url: string) => {
    if (realUrls.has(url)) return full;
    if (reports.length > 0) {
      const r = reports[0]!;
      const safeLabel = label?.trim() ? label : `📥 Télécharger ${r.filename}`;
      return `[${safeLabel}](${r.url})`;
    }
    const safeLabel = label?.trim() ? label : "le document";
    return `~~${safeLabel}~~ _(document non généré — relancez la demande)_`;
  });

  // Catch any stray bare URLs the regex above didn't cover.
  out = out.replace(BARE_REPORT_URL_RE, (url) => {
    if (realUrls.has(url)) return url;
    return reports.length > 0 ? reports[0]!.url : url;
  });

  return out;
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
