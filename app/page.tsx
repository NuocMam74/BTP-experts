import { AgentCard } from "@/components/AgentCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { listAgents } from "@/lib/agent-runtime/loadManifest";

export default async function HomePage() {
  const agents = await listAgents();
  const totalSkills = agents.reduce((sum, a) => sum + a.skills.length, 0);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      {/* ---- HERO ---------------------------------------------------------- */}
      <section className="relative mb-14 overflow-hidden rounded-3xl border border-border bg-surface-elevated/40 px-6 py-14 sm:px-10 sm:py-16">
        {/* Aurora halos */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div
            className="aurora-blob animate-aurora"
            style={{
              top: "-18%",
              left: "8%",
              width: "42%",
              height: "120%",
              background:
                "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.55), transparent 65%)",
            }}
          />
          <div
            className="aurora-blob animate-aurora"
            style={{
              top: "-10%",
              right: "2%",
              width: "38%",
              height: "120%",
              background:
                "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.45), transparent 65%)",
              animationDelay: "-8s",
            }}
          />
          <div
            className="aurora-blob animate-aurora"
            style={{
              bottom: "-30%",
              left: "38%",
              width: "34%",
              height: "100%",
              background:
                "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.32), transparent 65%)",
              animationDelay: "-15s",
            }}
          />
          {/* Blueprint grid overlay */}
          <div className="bg-grid-fine absolute inset-0 opacity-60 [mask-image:radial-gradient(80%_80%_at_50%_0%,#000,transparent)]" />
        </div>

        <div className="relative">
          <div className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-border bg-surface-elevated/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
            </span>
            Plateforme d&apos;agents BTP · 100 % local
          </div>

          <h1
            className="mt-5 max-w-3xl animate-fade-up text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-6xl"
            style={{ animationDelay: "60ms" }}
          >
            Des experts métiers du bâtiment{" "}
            <span className="text-gradient">à portée de chat</span>.
          </h1>

          <p
            className="mt-5 max-w-2xl animate-fade-up text-[15px] leading-relaxed text-muted-foreground sm:text-base"
            style={{ animationDelay: "120ms" }}
          >
            Six agents IA spécialisés — architecture, MOEX, économie, géomètre,
            structure, comptabilité BTP — entraînés sur les référentiels français
            (DTU, Eurocodes, CCAG, RE2020, BOFIP). Posez une question, joignez un
            plan ou un PDF, recevez une analyse sourcée et un livrable prêt à
            transmettre.
          </p>

          <div
            className="mt-7 flex animate-fade-up flex-wrap gap-3"
            style={{ animationDelay: "180ms" }}
          >
            <a href="#agents" className="btn-primary">
              Explorer le catalogue
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
            <a href="#agents" className="btn-secondary">
              {agents.length} agents disponibles
            </a>
          </div>

          <div
            className="mt-9 grid animate-fade-up grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-stretch"
            style={{ animationDelay: "240ms" }}
          >
            <HeroStat label="Agents experts">
              <AnimatedCounter value={agents.length} />
            </HeroStat>
            <HeroStat label="Compétences">
              <AnimatedCounter value={totalSkills} />
            </HeroStat>
            <HeroStat label="Formats livrés" mono>
              PDF · DOCX · XLSX · PPTX
            </HeroStat>
            <HeroStat label="Hébergement">100 % local</HeroStat>
          </div>
        </div>
      </section>

      {/* ---- CATALOGUE ----------------------------------------------------- */}
      <section id="agents" className="scroll-mt-24">
        <header className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-3">
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
            {agents.map((agent, i) => (
              <li key={agent.slug}>
                <AgentCard
                  slug={agent.slug}
                  name={agent.name}
                  tagline={agent.tagline}
                  skillsCount={agent.skills.length}
                  priceEur={agent.monthly_price_eur}
                  index={i}
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
  children,
  mono,
}: {
  label: string;
  children: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="card-spot flex min-w-[140px] flex-col gap-0.5 rounded-xl px-4 py-3">
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <span
        className={`text-lg font-semibold text-foreground ${
          mono ? "font-mono text-[12px] tracking-tight" : "tabular-nums"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
