import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db, schema } from "@/lib/db/client";
import { loadConversationMessages } from "@/lib/db/messages";
import { loadAgent } from "@/lib/agent-runtime/loadManifest";
import { generateReport } from "@/lib/reports";
import type { ReportFormat, ReportPayload, Section } from "@/lib/reports/types";

export const runtime = "nodejs";

const ALLOWED_FORMATS = new Set<ReportFormat>(["md", "pdf"]);

function isExportFormat(value: string): value is ReportFormat {
  return ALLOWED_FORMATS.has(value as ReportFormat);
}

function shortTimestamp(date: Date): string {
  // Horodatage court FR : "10/06/2026 14:32"
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function roleLabel(
  role: "user" | "assistant" | "tool" | "system",
  agentName: string,
): string {
  switch (role) {
    case "user":
      return "Vous";
    case "assistant":
      return agentName;
    case "tool":
      return "Outil";
    case "system":
      return "Système";
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    // Vérification d'appartenance (404 si la conversation n'existe pas / n'appartient pas à l'utilisateur).
    const conversation = await db.query.conversations.findFirst({
      where: and(
        eq(schema.conversations.id, params.id),
        eq(schema.conversations.userId, userId),
      ),
    });
    if (!conversation) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Format demandé (défaut "md"), rejet de tout autre format.
    const url = new URL(req.url);
    const requestedFormat = url.searchParams.get("format") ?? "md";
    if (!isExportFormat(requestedFormat)) {
      return NextResponse.json(
        { error: "Format invalide. Formats acceptés : md, pdf." },
        { status: 400 },
      );
    }
    const format: ReportFormat = requestedFormat;

    const messages = await loadConversationMessages(params.id, userId);

    // Nom lisible de l'agent via le manifest (fallback sur le slug).
    const agent = await loadAgent(conversation.agentSlug);
    const agentName = agent?.name ?? conversation.agentSlug;

    // Titre du document (fallback + bornes imposées par reportPayloadSchema : 1..200).
    const rawTitle = conversation.title?.trim();
    const title = (rawTitle && rawTitle.length > 0 ? rawTitle : "Conversation").slice(
      0,
      200,
    );

    // Une section par message : heading = "Vous"/nom agent + horodatage, corps = texte Markdown.
    const sections: Section[] = messages.map((message) => {
      const heading = `${roleLabel(message.role, agentName)} — ${shortTimestamp(
        message.createdAt,
      )}`;
      const text = message.content?.text ?? "";
      // body_markdown ne doit pas être vide pour rester lisible.
      const body_markdown = text.trim().length > 0 ? text : "_(message vide)_";
      return { heading, body_markdown };
    });

    if (sections.length === 0) {
      sections.push({
        heading: "Conversation vide",
        body_markdown: "_Aucun message dans cette conversation._",
      });
    }

    const payload: ReportPayload = {
      title,
      subtitle: `Export de conversation — ${agentName}`,
      format,
      sections,
    };

    const report = await generateReport({
      userId,
      agentSlug: conversation.agentSlug,
      conversationId: conversation.id,
      payload,
    });

    return NextResponse.json({
      downloadUrl: report.downloadUrl,
      filename: report.filename,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Échec de l'export de la conversation",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
