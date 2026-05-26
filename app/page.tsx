import { AgentCard } from "@/components/AgentCard";
import { listAgents } from "@/lib/agent-runtime/loadManifest";

export default async function HomePage() {
  const agents = await listAgents();
  const totalSkills = agents.reduce((sum, a) => sum + a.skills.length, 0);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Catalogue d&apos;agents
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Agents IA spécialisés par métier du bâtiment et des travaux publics.
            Sélectionnez un agent pour démarrer une analyse.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Stat label="Agents" value={agents.length.toString()} />
          <span className="text-border">|</span>
          <Stat label="Compétences" value={totalSkills.toString()} />
          <span className="text-border">|</span>
          <Stat label="Formats" value="PDF · DOCX · XLSX · PPTX" mono />
        </div>
      </header>

      <section id="agents">
        {agents.length === 0 ? (
          <div className="rounded-md border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            Aucun agent enregistré. Ajoutez un manifest dans{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
              agents/&lt;slug&gt;/manifest.json
            </code>
            .
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

      <section className="mt-10 grid gap-3 sm:grid-cols-3">
        <InfoBlock
          title="Sources sourcées"
          body="Codes, arrêtés, normes, DTU, Eurocodes et BOFIP indexés en local. Chaque affirmation pointe l'article exact."
        />
        <InfoBlock
          title="Analyse de documents"
          body="PDF, Word, Excel, CSV, texte, Markdown, image. Le contenu textuel est extrait et utilisé en contexte."
        />
        <InfoBlock
          title="Livrables exportables"
          body="Rapports, notes, tableaux et présentations générés à la demande, prêts pour transmission MOA."
        />
      </section>
    </main>
  );
}

function Stat({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="text-muted-foreground/80">{label}</span>
      <span
        className={`font-medium text-foreground ${mono ? "font-mono text-[11px]" : ""}`}
      >
        {value}
      </span>
    </span>
  );
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md border border-border bg-surface-elevated p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
        {body}
      </p>
    </div>
  );
}
