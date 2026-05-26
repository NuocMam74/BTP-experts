export default function ChatLoading() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      {/* Breadcrumb skeleton */}
      <nav className="mb-5 flex items-center gap-2 text-xs">
        <Shimmer className="h-3 w-12" />
        <span className="text-muted-foreground">/</span>
        <Shimmer className="h-3 w-14" />
        <span className="text-muted-foreground">/</span>
        <Shimmer className="h-3 w-32" />
      </nav>

      {/* Header agent skeleton */}
      <div className="card-elevated mb-5 overflow-hidden rounded-2xl">
        <div className="relative px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <Shimmer className="h-12 w-12 rounded-xl" />
              <div className="space-y-2">
                <Shimmer className="h-6 w-56" />
                <Shimmer className="h-3.5 w-72" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Shimmer className="h-5 w-24 rounded-full" />
              <Shimmer className="h-5 w-20 rounded-full" />
              <Shimmer className="h-5 w-28 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Layout 2 colonnes (historique | chat) */}
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        {/* Sidebar conversations */}
        <aside className="card-elevated hidden rounded-2xl lg:block">
          <div className="border-b border-border/60 p-3">
            <Shimmer className="h-4 w-24" />
          </div>
          <div className="p-2">
            <Shimmer className="h-9 w-full rounded-lg" />
          </div>
          <div className="space-y-1 p-2">
            {[0, 1, 2, 3].map((i) => (
              <Shimmer key={i} className="h-12 w-full rounded-md" />
            ))}
          </div>
        </aside>

        {/* Chat principal */}
        <section className="card-elevated flex min-h-[70vh] flex-col overflow-hidden rounded-2xl">
          <div className="flex-1 space-y-4 p-6">
            <div className="flex items-center justify-center pt-12">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <svg
                  className="h-4 w-4 animate-spin text-brand-400"
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
                <span>Préparation de la conversation…</span>
              </div>
            </div>
          </div>
          <div className="border-t border-border/60 bg-surface/30 p-4">
            <div className="flex items-end gap-2">
              <Shimmer className="h-10 w-10 rounded-lg" />
              <Shimmer className="h-10 flex-1 rounded-lg" />
              <Shimmer className="h-10 w-12 rounded-lg" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Shimmer({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block animate-pulse-glow bg-muted/60 ${className}`}
      aria-hidden
    />
  );
}
