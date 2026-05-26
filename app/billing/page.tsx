import Link from "next/link";
import { redirect } from "next/navigation";

import { AGENT_ACCENT, AgentIcon } from "@/components/AgentIcon";
import { auth } from "@/auth";
import { db, schema } from "@/lib/db/client";
import { eq } from "drizzle-orm";
import { listAgents } from "@/lib/agent-runtime/loadManifest";
import { isStripeConfigured } from "@/lib/billing/stripe";

import { CheckoutButton } from "./checkout-button";

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin?callbackUrl=/billing");
  }

  const stripeEnabled = isStripeConfigured();

  const [agents, userAgents] = await Promise.all([
    listAgents(),
    db.query.userAgents.findMany({
      where: eq(schema.userAgents.userId, session.user.id),
    }),
  ]);

  const statusBySlug = new Map(
    userAgents.map((ua) => [
      ua.agentSlug,
      { status: ua.status, expiresAt: ua.currentPeriodEnd },
    ]),
  );

  const activeCount = userAgents.filter(
    (ua) => ua.status === "active" || ua.status === "trialing",
  ).length;
  const monthlyBudget = userAgents
    .filter((ua) => ua.status === "active" || ua.status === "trialing")
    .reduce((sum, ua) => {
      const agent = agents.find((a) => a.slug === ua.agentSlug);
      return sum + (agent?.monthly_price_eur ?? 0);
    }, 0);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Accueil
        </Link>
        <span>/</span>
        <span className="text-foreground">Abonnements</span>
      </nav>

      <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Abonnements</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Activez ou désactivez vos accès agent par agent.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <Stat label="Actifs" value={`${activeCount}/${agents.length}`} />
          <span className="text-border">|</span>
          <Stat label="Budget" value={`${monthlyBudget} € /mois`} />
          <span className="text-border">|</span>
          <Stat label="Mode" value={stripeEnabled ? "Production" : "Développement"} />
        </div>
      </header>

      {!stripeEnabled && (
        <div className="mb-6 rounded-md border border-border bg-surface-elevated p-4 text-sm">
          <p className="font-medium text-foreground">Mode développement</p>
          <p className="mt-1 text-muted-foreground">
            <code className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">
              STRIPE_SECRET_KEY
            </code>{" "}
            non configurée. Tous les agents sont accessibles librement. Définissez
            la variable dans{" "}
            <code className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">
              .env.local
            </code>{" "}
            pour activer la facturation.
          </p>
        </div>
      )}

      <ul className="grid gap-3 sm:grid-cols-2">
        {agents.map((agent) => {
          const ua = statusBySlug.get(agent.slug);
          const accent = AGENT_ACCENT[agent.slug] ?? AGENT_ACCENT.architecte!;
          const isActive = ua?.status === "active" || ua?.status === "trialing";

          return (
            <li
              key={agent.slug}
              className="card-elevated rounded-md p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className="inline-flex h-9 w-9 items-center justify-center rounded border"
                    style={{
                      color: accent.color,
                      borderColor: `${accent.color}40`,
                      backgroundColor: `${accent.color}10`,
                    }}
                  >
                    <AgentIcon slug={agent.slug} className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{agent.name}</h3>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                      {agent.tagline}
                    </p>
                  </div>
                </div>
                {ua &&
                  (isActive ? (
                    <span className="badge badge-success">{ua.status}</span>
                  ) : (
                    <span className="badge badge-error">{ua.status}</span>
                  ))}
              </div>

              <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
                <div>
                  <span className="font-mono text-base font-medium text-foreground">
                    {agent.monthly_price_eur} €
                  </span>
                  <span className="ml-1 text-xs text-muted-foreground">
                    / mois
                  </span>
                  {ua?.expiresAt && (
                    <div className="mt-0.5 text-[10px] text-muted-foreground">
                      Jusqu&apos;au{" "}
                      {new Date(ua.expiresAt).toLocaleDateString("fr-FR")}
                    </div>
                  )}
                </div>
                <div>
                  {stripeEnabled ? (
                    isActive ? (
                      <span className="btn-secondary cursor-default">Actif</span>
                    ) : (
                      <CheckoutButton agentSlug={agent.slug} />
                    )
                  ) : (
                    <Link href={`/chat/${agent.slug}`} className="btn-secondary">
                      Ouvrir
                    </Link>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="text-muted-foreground/80">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </span>
  );
}
