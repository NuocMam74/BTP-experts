"use client";

import { useEffect, useState } from "react";

export type PreviewDoc = {
  documentId: string;
  filename: string;
  kind?: string;
  pages?: number | null;
};

const IMAGE_KINDS = new Set(["image"]);

// Modal preview of an uploaded document.
//   - images  → rendered inline via the raw document endpoint
//   - pdf     → embedded in an <iframe> (browser-native PDF viewer)
//   - others  → extracted text fetched from ?text=1, shown monospaced
export function DocumentPreview({
  doc,
  onClose,
}: {
  doc: PreviewDoc;
  onClose: () => void;
}) {
  const isImage = IMAGE_KINDS.has(doc.kind ?? "");
  const isPdf = doc.kind === "pdf";
  const rawUrl = `/api/documents/${doc.documentId}`;

  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(!isImage && !isPdf);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (isImage || isPdf) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`${rawUrl}?text=1`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return (await res.json()) as { parsedText: string | null };
      })
      .then((data) => {
        if (cancelled) return;
        setText(data.parsedText);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Erreur de chargement");
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [rawUrl, isImage, isPdf]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Aperçu de ${doc.filename}`}
    >
      <div
        className="card-elevated flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate text-sm font-semibold">{doc.filename}</span>
            {doc.pages ? (
              <span className="shrink-0 text-xs text-muted-foreground">
                · {doc.pages} page(s)/feuille(s)
              </span>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <a
              href={rawUrl}
              download={doc.filename}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              title="Télécharger"
              aria-label="Télécharger"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </a>
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
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-background/40">
          {isImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={rawUrl}
              alt={doc.filename}
              className="mx-auto max-h-full max-w-full object-contain"
            />
          )}
          {isPdf && (
            <iframe
              src={rawUrl}
              title={doc.filename}
              className="h-[80vh] w-full border-0"
            />
          )}
          {!isImage && !isPdf && (
            <div className="p-5">
              {loading && (
                <div className="flex items-center gap-2 py-6 text-sm text-muted-foreground">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                  </svg>
                  Chargement du contenu…
                </div>
              )}
              {error && (
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
                  Impossible d&apos;afficher le contenu : {error}
                </div>
              )}
              {!loading && !error && (
                <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-foreground/90">
                  {text && text.trim().length > 0
                    ? text
                    : "(Aucun texte extrait pour ce fichier.)"}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
