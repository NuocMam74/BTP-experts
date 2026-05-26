import Link from "next/link";
import { redirect } from "next/navigation";

import { AGENT_ACCENT, AgentIcon } from "@/components/AgentIcon";
import { auth } from "@/auth";
import { listAgents } from "@/lib/agent-runtime/loadManifest";
import { listUserConversations } from "@/lib/db/messages";

export default async function ConversationsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin?callbackUrl=/chat");
  }

  const [conversations, agents] = await Promise.all([
    listUserConversations(session.user.id),
    listAgents(),
  ]);
  const agentNameBySlug = new Map(agents.map((a) => [a.slug, a.name]));

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Accueil
        </Link>
        <span>/</span>
        <span className="text-foreground">Conversations</span>
      </nav>

      <header className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Mes conversations
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {conversations.length} conversation
            {conversations.length !== 1 && "s"} avec vos agents.
          </p>
        </div>
        <Link href="/#agents" className="btn-secondary">
          + Nouvelle conversation
        </Link>
      </header>

      {conversations.length === 0 ? (
        <div className="rounded-md border border-dashed border-border p-10 text-center">
          <h2 className="text-base font-semibold">Aucune conversation</h2>
          <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
            Sélectionnez un agent depuis le catalogue pour démarrer une
            analyse.
          </p>
          <Link href="/" className="btn-secondary mt-5 inline-flex">
            Voir les agents
          </Link>
        </div>
      ) : (
        <ul className="space-y-2.5">
          {conversations.map((c) => {
            const accent =
              AGENT_ACCENT[c.agentSlug] ?? AGENT_ACCENT.architecte!;
            return (
              <li key={c.id}>
                <Link
                  href={`/chat/${c.agentSlug}?conversationId=${c.id}`}
                  className="card-elevated card-hover flex items-center gap-4 rounded-xl px-4 py-3.5"
                >
                  <div
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ring-1 ring-inset"
                    style={{
                      color: accent.color,
                      borderColor: `${accent.color}40`,
                      backgroundColor: `${accent.color}15`,
                      ['--tw-ring-color' as string]: `${accent.color}25`,
                    }}
                  >
                    <AgentIcon slug={c.agentSlug} className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">
                      {c.title ?? "Sans titre"}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {agentNameBySlug.get(c.agentSlug) ?? c.agentSlug}
                    </div>
                  </div>
                  <div className="hidden text-right text-xs text-muted-foreground sm:block">
                    {new Date(c.createdAt).toLocaleString("fr-FR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0 text-muted-foreground"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
