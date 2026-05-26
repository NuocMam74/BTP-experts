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

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(
  req: Request,
  { params }: { params: { agentSlug: string } },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const agent = await loadAgent(params.agentSlug);
  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const entitlement = await checkEntitlement(session.user.id, agent.slug);
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
  };

  if (!body.userText || typeof body.userText !== "string") {
    return NextResponse.json({ error: "userText manquant" }, { status: 400 });
  }

  const userId = session.user.id;
  const conversationId = await ensureConversation({
    conversationId: body.conversationId ?? null,
    userId,
    agentSlug: agent.slug,
    titleFallback: body.userText.slice(0, 80),
  });

  await persistMessage({
    conversationId,
    role: "user",
    text: body.userText,
  });

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
            return `${header}\n\n_(Le contenu textuel de ce fichier n'a pas pu être extrait automatiquement. Demande à l'utilisateur de coller le contenu pertinent ou de fournir un PDF/XLSX/TXT.)_`;
          })
          .join("\n\n---\n\n")
      : undefined;

  let skillPrompt: string | undefined;
  if (body.skillId) {
    const loaded = await loadSkillPrompt(agent.slug, body.skillId);
    skillPrompt = loaded ?? undefined;
  }

  const result = streamAgentResponse({
    agent,
    messages: modelMessages,
    attachmentsContext,
    skillPrompt,
    userId: session.user.id,
    conversationId,
    onFinish: async ({ text }) => {
      if (text.trim().length > 0) {
        await persistMessage({
          conversationId,
          role: "assistant",
          text,
        });
      }
    },
  });

  return result.toTextStreamResponse({
    headers: {
      "X-Conversation-Id": conversationId,
    },
  });
}
