"use client";

import { useCallback, useEffect, useState } from "react";

type StepStatus = "ok" | "warn" | "error";

type Step = {
  id: string;
  label: string;
  status: StepStatus;
  detail: string;
};

type DiagnoseResult = {
  ok: boolean;
  provider: string;
  configuredModel: string;
  steps: Step[];
};

const STATUS_STYLES: Record<StepStatus, { ring: string; dot: string; text: string }> = {
  ok: { ring: "border-emerald-500/30 bg-emerald-500/5", dot: "bg-emerald-500", text: "text-emerald-300" },
  warn: { ring: "border-amber-500/30 bg-amber-500/5", dot: "bg-amber-500", text: "text-amber-300" },
  error: { ring: "border-red-500/30 bg-red-500/5", dot: "bg-red-500", text: "text-red-300" },
};

function StatusIcon({ status }: { status: StepStatus }) {
  const cls = "h-4 w-4 shrink-0";
  if (status === "ok") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={`${cls} text-emerald-400`}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }
  if (status === "warn") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${cls} text-amber-400`}>
        <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={`${cls} text-red-400`}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function DiagnosticsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnoseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/llm-status/diagnose", { cache: "no-store" });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `HTTP ${res.status}`);
      }
      setResult((await res.json()) as DiagnoseResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec du diagnostic");
    } finally {
      setLoading(false);
    }
  }, []);

  // Run automatically each time the modal opens.
  useEffect(() => {
    if (open) void run();
  }, [open, run]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Diagnostic LM Studio"
    >
      <div
        className="card-elevated w-full max-w-lg overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-brand-400">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <h3 className="text-sm font-semibold">Diagnostic LM Studio</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Fermer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4">
          {result && (
            <div
              className={`mb-3 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                result.ok
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-200"
              }`}
            >
              <span className="font-semibold">
                {result.ok ? "Communication OK" : "Problème détecté"}
              </span>
              <span className="ml-auto text-xs opacity-80">
                {result.provider === "anthropic" ? "Anthropic" : `Modèle : ${result.configuredModel}`}
              </span>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-2 py-6 text-sm text-muted-foreground">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
              </svg>
              Test de la communication en cours…
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}

          {result && !loading && (
            <ul className="space-y-2">
              {result.steps.map((s) => {
                const style = STATUS_STYLES[s.status];
                return (
                  <li
                    key={s.id}
                    className={`flex items-start gap-3 rounded-lg border px-3 py-2.5 ${style.ring}`}
                  >
                    <span className="mt-0.5">
                      <StatusIcon status={s.status} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className={`text-xs font-semibold ${style.text}`}>{s.label}</div>
                      <div className="mt-0.5 break-words text-xs text-muted-foreground">
                        {s.detail}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border/60 px-5 py-3">
          <button
            type="button"
            onClick={() => void run()}
            disabled={loading}
            className="btn-ghost text-xs disabled:opacity-50"
          >
            Relancer le test
          </button>
          <button type="button" onClick={onClose} className="btn-primary h-8 px-3 text-xs">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
