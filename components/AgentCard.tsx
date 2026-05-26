"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { AGENT_ACCENT, AgentIcon } from "@/components/AgentIcon";
import { AGENT_PRESENTATIONS } from "@/components/agentPresentations";

type AgentCardProps = {
  slug: string;
  name: string;
  tagline: string;
  skillsCount: number;
  priceEur: number;
};

const FORMAT_LABELS = ["PDF", "DOCX", "XLSX", "PPTX"];

export function AgentCard({
  slug,
  name,
  tagline,
  skillsCount,
  priceEur,
}: AgentCardProps) {
  const accent = AGENT_ACCENT[slug] ?? AGENT_ACCENT.architecte!;
  const presentation = AGENT_PRESENTATIONS[slug];
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const [navigating, startTransition] = useTransition();

  function openChat(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    startTransition(() => router.push(`/chat/${slug}`));
  }

  return (
    <article
      className={`card-elevated card-hover relative flex h-full flex-col overflow-hidden rounded-md ${
        navigating ? "opacity-70" : ""
      }`}
    >
      {/* Header card cliquable */}
      <Link
        href={`/chat/${slug}`}
        prefetch
        onClick={openChat}
        className="flex flex-1 flex-col p-5"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div
            className="inline-flex h-9 w-9 items-center justify-center rounded border"
            style={{
              color: accent.color,
              borderColor: `${accent.color}40`,
              backgroundColor: `${accent.color}10`,
            }}
          >
            <AgentIcon slug={slug} className="h-4 w-4" />
          </div>
          <div className="text-right">
            <div className="font-mono text-sm font-medium text-foreground">
              {priceEur} €
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              /mois
            </div>
          </div>
        </div>

        <h3 className="text-base font-semibold leading-snug text-foreground">
          {name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
          {tagline}
        </p>

        <dl className="mt-4 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Compétences</dt>
            <dd className="font-medium text-foreground">{skillsCount}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Formats</dt>
            <dd className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
              {FORMAT_LABELS.join(" · ")}
            </dd>
          </div>
        </dl>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
          <span className="text-muted-foreground">
            {navigating ? "Ouverture…" : "Ouvrir l’agent"}
          </span>
          {navigating ? (
            <svg
              className="h-3.5 w-3.5 animate-spin text-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-muted-foreground"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          )}
        </div>
      </Link>

      {/* Dropdown toggle */}
      {presentation && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setExpanded((v) => !v);
          }}
          aria-expanded={expanded}
          aria-controls={`presentation-${slug}`}
          className="flex w-full items-center justify-between gap-2 border-t border-border bg-surface px-5 py-2.5 text-[11px] font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
        >
          <span>{expanded ? "Masquer la fiche agent" : "Voir la fiche agent"}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      )}

      {/* Panel dropdown */}
      {presentation && expanded && (
        <div
          id={`presentation-${slug}`}
          className="border-t border-border bg-background"
        >
          <div className="space-y-4 p-5 text-[13px]">
            <Section label="Mission">
              <p className="leading-relaxed text-foreground/80">
                {presentation.mission}
              </p>
            </Section>

            <Section label="Objectifs">
              <ul className="space-y-1 text-foreground/80">
                {presentation.objectives.map((obj, i) => (
                  <li key={i} className="flex gap-2 leading-relaxed">
                    <span className="select-none text-muted-foreground">—</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section label="Cadre d'intervention">
              <ul className="space-y-1 text-foreground/80">
                {presentation.whenToUse.map((u, i) => (
                  <li key={i} className="flex gap-2 leading-relaxed">
                    <span className="select-none text-muted-foreground">·</span>
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section label="Référentiels mobilisés">
              <div className="flex flex-wrap gap-1">
                {presentation.referentials.map((ref) => (
                  <span
                    key={ref}
                    className="rounded border border-border bg-surface px-1.5 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {ref}
                  </span>
                ))}
              </div>
            </Section>

            <Section label="Livrables produits">
              <ul className="grid gap-1 sm:grid-cols-2 text-foreground/80">
                {presentation.deliverables.map((d, i) => (
                  <li
                    key={i}
                    className="rounded border border-border bg-surface px-2 py-1.5 text-[12px] leading-snug"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </Section>

            <div className="flex items-center gap-2 border-t border-border pt-4">
              <Link
                href={`/chat/${slug}`}
                prefetch
                onClick={openChat}
                className="btn-primary"
              >
                {navigating ? (
                  <>
                    Ouverture…
                    <svg
                      className="h-3.5 w-3.5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M21 12a9 9 0 1 1-6.219-8.56"
                        strokeLinecap="round"
                      />
                    </svg>
                  </>
                ) : (
                  "Démarrer une analyse"
                )}
              </Link>
              <Link href="/billing" className="btn-secondary">
                Activer ({priceEur} €/mois)
              </Link>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      {children}
    </div>
  );
}
