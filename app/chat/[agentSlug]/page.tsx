import Link from "next/link";
import { notFound } from "next/navigation";
import { and, desc, eq } from "drizzle-orm";

import { AGENT_ACCENT, AgentIcon } from "@/components/AgentIcon";
import { auth } from "@/auth";
import { loadAgent } from "@/lib/agent-runtime/loadManifest";
import { db, schema } from "@/lib/db/client";
import { loadConversationMessages } from "@/lib/db/messages";

import { ChatUI } from "./chat-ui";

export default async function ChatPage({
  params,
  searchParams,
}: {
  params: { agentSlug: string };
  searchParams: { conversationId?: string };
}) {
  const session = await auth();
  if (!session?.user?.id) {
    notFound();
  }

  const agent = await loadAgent(params.agentSlug);
  if (!agent) notFound();

  let initialMessages: Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
  }> = [];
  let initialConversationId: string | null = null;

  if (searchParams.conversationId) {
    const stored = await loadConversationMessages(
      searchParams.conversationId,
      session.user.id,
    );
    if (stored.length > 0) {
      initialConversationId = searchParams.conversationId;
      initialMessages = stored
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({
          id: m.id,
          role: m.role as "user" | "assistant",
          content: m.content.text,
        }));
    }
  }

  // Historique des conversations pour CET agent
  const agentConversations = await db
    .select({
      id: schema.conversations.id,
      title: schema.conversations.title,
      createdAt: schema.conversations.createdAt,
    })
    .from(schema.conversations)
    .where(
      and(
        eq(schema.conversations.userId, session.user.id),
        eq(schema.conversations.agentSlug, agent.slug),
      ),
    )
    .orderBy(desc(schema.conversations.createdAt))
    .limit(30);

  const accent = AGENT_ACCENT[agent.slug] ?? AGENT_ACCENT.architecte!;

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Accueil
        </Link>
        <span>/</span>
        <Link href="/#agents" className="hover:text-foreground">
          Agents
        </Link>
        <span>/</span>
        <span className="text-foreground">{agent.name}</span>
      </nav>

      {/* Agent header */}
      <div className="card-elevated mb-5 overflow-hidden rounded-2xl">
        <div
          className="relative px-6 py-5"
          style={{
            background: `linear-gradient(135deg, ${accent.color}18 0%, transparent 70%)`,
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ring-1 ring-inset"
                style={{
                  color: accent.color,
                  borderColor: `${accent.color}40`,
                  backgroundColor: `${accent.color}15`,
                  ['--tw-ring-color' as string]: `${accent.color}25`,
                }}
              >
                <AgentIcon slug={agent.slug} className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  {agent.name}
                </h1>
                <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                  {agent.tagline}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="badge border-border bg-surface text-muted-foreground">
                {agent.skills.length} compétences
              </span>
              <span className="badge border-border bg-surface text-muted-foreground">
                {agent.monthly_price_eur} €/mois
              </span>
              <span className="badge badge-tech">
                Corpus · {agent.corpus_namespace}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ChatUI
        agent={{
          slug: agent.slug,
          name: agent.name,
          tagline: agent.tagline,
          version: agent.version,
          model: agent.model,
          monthly_price_eur: agent.monthly_price_eur,
          accepted_documents: agent.accepted_documents,
          skills: agent.skills,
          tools: agent.tools,
          corpus_namespace: agent.corpus_namespace,
          system_prompt_path: agent.system_prompt_path,
        }}
        initialMessages={initialMessages}
        initialConversationId={initialConversationId}
        agentConversations={agentConversations.map((c) => ({
          id: c.id,
          title: c.title,
          createdAt: c.createdAt.toISOString(),
        }))}
      />
    </main>
  );
}
