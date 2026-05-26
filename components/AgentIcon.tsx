type AgentIconProps = {
  slug: string;
  className?: string;
};

const ICONS: Record<string, React.ReactNode> = {
  architecte: (
    <>
      {/* compas + plan */}
      <path d="M12 2v20" />
      <path d="M5 22 12 8l7 14" />
      <circle cx="12" cy="6" r="2" />
    </>
  ),
  moex: (
    <>
      {/* casque chantier */}
      <path d="M3 18h18" />
      <path d="M5 18a7 7 0 0 1 14 0" />
      <path d="M12 5v6" />
      <path d="M9 11h6" />
    </>
  ),
  economiste: (
    <>
      {/* €  +  graphe */}
      <path d="M3 18h18" />
      <path d="M5 14l4-4 4 3 6-7" />
      <circle cx="5" cy="14" r="0.5" fill="currentColor" />
    </>
  ),
  geometre: (
    <>
      {/* équerre */}
      <path d="M4 4v16h16" />
      <path d="M4 4l8 8" />
      <path d="M12 12h8" />
    </>
  ),
  "ingenieur-structure": (
    <>
      {/* poutre + cadres */}
      <path d="M3 7h18" />
      <path d="M3 17h18" />
      <path d="M6 7v10" />
      <path d="M12 7v10" />
      <path d="M18 7v10" />
    </>
  ),
  "expert-comptable-btp": (
    <>
      {/* calculatrice */}
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M4 9h16" />
      <path d="M9 14h.01M12 14h.01M15 14h.01M9 18h.01M12 18h.01M15 18h.01" />
    </>
  ),
};

export function AgentIcon({ slug, className = "h-5 w-5" }: AgentIconProps) {
  const path = ICONS[slug] ?? (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </>
  );
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {path}
    </svg>
  );
}

export const AGENT_ACCENT: Record<string, { color: string; from: string; to: string }> = {
  architecte: { color: "#818cf8", from: "from-indigo-500/20", to: "to-indigo-500/0" },
  moex: { color: "#fbbf24", from: "from-amber-500/20", to: "to-amber-500/0" },
  economiste: { color: "#34d399", from: "from-emerald-500/20", to: "to-emerald-500/0" },
  geometre: { color: "#c084fc", from: "from-violet-500/20", to: "to-violet-500/0" },
  "ingenieur-structure": {
    color: "#f87171",
    from: "from-red-500/20",
    to: "to-red-500/0",
  },
  "expert-comptable-btp": {
    color: "#22d3ee",
    from: "from-cyan-500/20",
    to: "to-cyan-500/0",
  },
};
