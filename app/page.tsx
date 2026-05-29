import { AgentCard } from "@/components/AgentCard";
import { listAgents } from "@/lib/agent-runtime/loadManifest";

export default async function HomePage() {
  const agents = await listAgents();
  const totalSkills = agents.reduce((sum, a) => sum + a.skills.length, 0);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="mb-12">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500"
            aria-hidden
          />
          Plateforme d&apos;agents BTP
        </div>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          Des experts métiers du bâtiment{" "}
          <span className="text-brand-500">à portée de chat</span>.
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Six agents IA spécialisés — architecture, MOEX, économie,
          géomètre, structure, comptabilité BTP — entraînés sur les
          référentiels français (DTU, Eurocodes, CCAG, RE2020, BOFIP).
          Posez une question, joignez un plan ou un PDF, recevez une
          analyse sourcée et un livrable prêt à transmettre.
        </p>

        <div className="mt-7 flex flex-wrap items-stretch gap-3">
          <HeroStat label="Agents" value={agents.length.toString()} />
          <HeroStat label="Compétences" value={totalSkills.toString()} />
          <HeroStat
            label="Formats livrés"
            value="PDF · DOCX · XLSX · PPTX"
            mono
          />
          <HeroStat label="Hébergement" value="100 % local" />
        </div>
      </section>

      <section id="agents" className="scroll-mt-24">
        <header className="mb-5 flex items-end justify-between gap-4 border-b border-border pb-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
              Catalogue
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Sélectionnez l&apos;agent dont vous avez besoin pour ouvrir une
              session d&apos;analyse.
            </p>
          </div>
          <div className="hidden text-[11px] text-muted-foreground sm:block">
            {agents.length} agent{agents.length > 1 ? "s" : ""} disponible
            {agents.length > 1 ? "s" : ""}
          </div>
        </header>

        {agents.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface-elevated p-12 text-center text-sm text-muted-foreground">
            Aucun agent enregistré. Ajoutez un manifest dans{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              agents/&lt;slug&gt;/manifest.json
            </code>
            .
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {agents.map((agent) => (
              <li key={agent.slug}>
                <AgentCard
                  slug={agent.slug}
                  name={agent.name}
                  tagline={agent.tagline}
                  skillsCount={agent.skills.length}
                  priceEur={agent.monthly_price_eur}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function HeroStat({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="card-elevated flex min-w-[140px] flex-col gap-0.5 rounded-lg px-4 py-3">
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <span
        className={`text-base font-semibold text-foreground ${
          mono ? "font-mono text-[12px] tracking-tight" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
