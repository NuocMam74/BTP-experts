"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

type ToastKind = "success" | "error" | "info" | "loading";

type ToastOptions = {
  description?: string;
  durationMs?: number;
};

type ToastItem = {
  id: string;
  kind: ToastKind;
  message: string;
  description?: string;
  durationMs: number; // 0 = pas d'auto-dismiss (loading)
  leaving: boolean;
};

type ToastApi = {
  success: (message: string, opts?: ToastOptions) => void;
  error: (message: string, opts?: ToastOptions) => void;
  info: (message: string, opts?: ToastOptions) => void;
  loading: (message: string, opts?: ToastOptions) => string;
  dismiss: (id?: string) => void;
};

type ConfirmOptions = {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
};

type PromptOptions = {
  title: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  confirmLabel?: string;
  multiline?: boolean;
};

type ConfirmDialogState = ConfirmOptions & {
  kind: "confirm";
  resolve: (value: boolean) => void;
};

type PromptDialogState = PromptOptions & {
  kind: "prompt";
  resolve: (value: string | null) => void;
};

type DialogState = ConfirmDialogState | PromptDialogState;

type ToastContextValue = {
  toast: ToastApi;
  confirm: (opts: ConfirmOptions) => Promise<boolean>;
  prompt: (opts: PromptOptions) => Promise<string | null>;
};

/* -------------------------------------------------------------------------- */
/*  Context                                                                    */
/* -------------------------------------------------------------------------- */

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 4000;
const ERROR_DURATION = 6000;
const EXIT_MS = 220; // doit rester aligné sur la transition CSS de sortie

/* -------------------------------------------------------------------------- */
/*  Provider                                                                   */
/* -------------------------------------------------------------------------- */

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [mounted, setMounted] = useState(false);

  // Timers d'auto-dismiss indexés par id de toast.
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const counter = useRef(0);

  useEffect(() => {
    setMounted(true);
    const map = timers.current;
    return () => {
      map.forEach((t) => clearTimeout(t));
      map.clear();
    };
  }, []);

  const nextId = useCallback(() => {
    counter.current += 1;
    return `toast-${counter.current}`;
  }, []);

  // Retire réellement le toast du DOM après l'animation de sortie.
  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t);
      timers.current.delete(id);
    }
  }, []);

  // Déclenche l'animation de sortie puis retire le toast.
  const dismiss = useCallback(
    (id?: string) => {
      const existing = timers.current.get(id ?? "");
      if (id && existing) {
        clearTimeout(existing);
        timers.current.delete(id);
      }
      setToasts((prev) => {
        if (id === undefined) {
          // tout fermer
          prev.forEach((t) => {
            const handle = setTimeout(() => remove(t.id), EXIT_MS);
            timers.current.set(t.id, handle);
          });
          return prev.map((t) => ({ ...t, leaving: true }));
        }
        if (!prev.some((t) => t.id === id)) return prev;
        const handle = setTimeout(() => remove(id), EXIT_MS);
        timers.current.set(id, handle);
        return prev.map((t) => (t.id === id ? { ...t, leaving: true } : t));
      });
    },
    [remove],
  );

  const push = useCallback(
    (kind: ToastKind, message: string, opts?: ToastOptions): string => {
      const id = nextId();
      const durationMs =
        kind === "loading"
          ? 0
          : opts?.durationMs ??
            (kind === "error" ? ERROR_DURATION : DEFAULT_DURATION);

      const item: ToastItem = {
        id,
        kind,
        message,
        description: opts?.description,
        durationMs,
        leaving: false,
      };

      setToasts((prev) => [...prev, item]);

      if (durationMs > 0) {
        const handle = setTimeout(() => dismiss(id), durationMs);
        timers.current.set(id, handle);
      }
      return id;
    },
    [nextId, dismiss],
  );

  const toast = useMemo<ToastApi>(
    () => ({
      success: (message, opts) => void push("success", message, opts),
      error: (message, opts) => void push("error", message, opts),
      info: (message, opts) => void push("info", message, opts),
      loading: (message, opts) => push("loading", message, opts),
      dismiss,
    }),
    [push, dismiss],
  );

  const confirm = useCallback(
    (opts: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        setDialog({ kind: "confirm", ...opts, resolve });
      }),
    [],
  );

  const prompt = useCallback(
    (opts: PromptOptions) =>
      new Promise<string | null>((resolve) => {
        setDialog({ kind: "prompt", ...opts, resolve });
      }),
    [],
  );

  const closeDialog = useCallback(() => setDialog(null), []);

  const value = useMemo<ToastContextValue>(
    () => ({ toast, confirm, prompt }),
    [toast, confirm, prompt],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <ToastRegion toasts={toasts} onDismiss={dismiss} />,
          document.body,
        )}
      {mounted &&
        dialog &&
        createPortal(
          <DialogHost dialog={dialog} onClose={closeDialog} />,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hooks publics                                                              */
/* -------------------------------------------------------------------------- */

function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error(
      "useToast/useConfirm/usePrompt doivent être utilisés dans <ToastProvider>.",
    );
  }
  return ctx;
}

export function useToast(): { toast: ToastApi } {
  return { toast: useToastContext().toast };
}

export function useConfirm(): (opts: ConfirmOptions) => Promise<boolean> {
  return useToastContext().confirm;
}

export function usePrompt(): (opts: PromptOptions) => Promise<string | null> {
  return useToastContext().prompt;
}

/* -------------------------------------------------------------------------- */
/*  Toasts — rendu                                                             */
/* -------------------------------------------------------------------------- */

function ToastRegion({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id?: string) => void;
}) {
  return (
    <div
      aria-live="polite"
      aria-relevant="additions"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-end gap-2 p-4 sm:bottom-4 sm:right-4 sm:left-auto sm:p-0"
    >
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id?: string) => void;
}) {
  return (
    <div
      role={toast.kind === "error" ? "alert" : "status"}
      className={[
        "card-elevated pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border p-4 shadow-card backdrop-blur transition-all duration-200 ease-out",
        toast.leaving
          ? "translate-y-1 scale-[0.98] opacity-0"
          : "translate-y-0 scale-100 opacity-100 animate-slide-up",
      ].join(" ")}
    >
      <span className="mt-0.5 shrink-0">
        <ToastIcon kind={toast.kind} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-snug text-foreground">
          {toast.message}
        </p>
        {toast.description && (
          <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground">
            {toast.description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Fermer la notification"
        className="-mr-1 -mt-1 shrink-0 rounded-md p-1 text-muted-foreground transition hover:bg-accent hover:text-foreground"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function ToastIcon({ kind }: { kind: ToastKind }) {
  if (kind === "success") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-emerald-500"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }
  if (kind === "error") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-red-500"
        aria-hidden="true"
      >
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    );
  }
  if (kind === "info") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-sky-500"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    );
  }
  // loading
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5 animate-spin text-muted-foreground"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dialogs — confirm / prompt                                                 */
/* -------------------------------------------------------------------------- */

function DialogHost({
  dialog,
  onClose,
}: {
  dialog: DialogState;
  onClose: () => void;
}) {
  if (dialog.kind === "confirm") {
    return <ConfirmDialog dialog={dialog} onClose={onClose} />;
  }
  return <PromptDialog dialog={dialog} onClose={onClose} />;
}

// Hook partagé : verrou du scroll + focus trap basique + Échap.
function useDialogShell(
  panelRef: React.RefObject<HTMLDivElement>,
  onEscape: () => void,
) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevActive = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onEscape();
        return;
      }
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        const active = document.activeElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevActive?.focus?.();
    };
  }, [panelRef, onEscape]);
}

function DialogOverlay({
  onClick,
  children,
  labelledBy,
  describedBy,
}: {
  onClick: () => void;
  children: React.ReactNode;
  labelledBy: string;
  describedBy?: string;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClick}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

function ConfirmDialog({
  dialog,
  onClose,
}: {
  dialog: ConfirmDialogState;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  const cancel = useCallback(() => {
    dialog.resolve(false);
    onClose();
  }, [dialog, onClose]);

  const accept = useCallback(() => {
    dialog.resolve(true);
    onClose();
  }, [dialog, onClose]);

  useDialogShell(panelRef, cancel);

  // Focus le bouton de confirmation à l'ouverture.
  useEffect(() => {
    const t = setTimeout(() => {
      panelRef.current
        ?.querySelector<HTMLButtonElement>("[data-autofocus]")
        ?.focus();
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <DialogOverlay
      onClick={cancel}
      labelledBy={titleId}
      describedBy={dialog.message ? descId : undefined}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="card-elevated relative z-10 w-full max-w-md overflow-hidden rounded-2xl shadow-2xl animate-slide-up"
      >
        <div className="px-6 py-5">
          <h2
            id={titleId}
            className="text-base font-semibold leading-snug text-foreground"
          >
            {dialog.title}
          </h2>
          {dialog.message && (
            <p
              id={descId}
              className="mt-2 text-[13px] leading-relaxed text-muted-foreground"
            >
              {dialog.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-border bg-surface px-6 py-4">
          <button type="button" onClick={cancel} className="btn-secondary">
            {dialog.cancelLabel ?? "Annuler"}
          </button>
          <button
            type="button"
            data-autofocus
            onClick={accept}
            className="btn-primary"
            style={
              dialog.danger
                ? {
                    color: "#ffffff",
                    background: "rgb(220, 38, 38)",
                    border: "1px solid rgb(220, 38, 38)",
                  }
                : undefined
            }
          >
            {dialog.confirmLabel ?? "Confirmer"}
          </button>
        </div>
      </div>
    </DialogOverlay>
  );
}

function PromptDialog({
  dialog,
  onClose,
}: {
  dialog: PromptDialogState;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const titleId = useId();
  const fieldId = useId();
  const [value, setValue] = useState(dialog.defaultValue ?? "");

  const cancel = useCallback(() => {
    dialog.resolve(null);
    onClose();
  }, [dialog, onClose]);

  const submit = useCallback(() => {
    const trimmed = value.trim();
    dialog.resolve(trimmed.length > 0 ? trimmed : null);
    onClose();
  }, [dialog, value, onClose]);

  useDialogShell(panelRef, cancel);

  // Focus auto + sélection du contenu pré-rempli.
  useEffect(() => {
    const t = setTimeout(() => {
      const el = inputRef.current;
      if (el) {
        el.focus();
        el.select();
      }
    }, 0);
    return () => clearTimeout(t);
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    // Entrée valide (sauf Shift+Entrée en multiline => nouvelle ligne).
    if (e.key === "Enter" && !(dialog.multiline && e.shiftKey)) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <DialogOverlay onClick={cancel} labelledBy={titleId}>
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="card-elevated relative z-10 w-full max-w-md overflow-hidden rounded-2xl shadow-2xl animate-slide-up"
      >
        <div className="px-6 py-5">
          <h2
            id={titleId}
            className="text-base font-semibold leading-snug text-foreground"
          >
            {dialog.title}
          </h2>
          {dialog.label && (
            <label
              htmlFor={fieldId}
              className="mt-3 block text-[13px] font-medium text-muted-foreground"
            >
              {dialog.label}
            </label>
          )}
          <div className={dialog.label ? "mt-1.5" : "mt-3"}>
            {dialog.multiline ? (
              <textarea
                id={fieldId}
                ref={(el) => {
                  inputRef.current = el;
                }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={dialog.placeholder}
                rows={4}
                className="input-field scrollbar-thin resize-y"
              />
            ) : (
              <input
                id={fieldId}
                ref={(el) => {
                  inputRef.current = el;
                }}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={dialog.placeholder}
                className="input-field"
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-border bg-surface px-6 py-4">
          <button type="button" onClick={cancel} className="btn-secondary">
            Annuler
          </button>
          <button type="button" onClick={submit} className="btn-primary">
            {dialog.confirmLabel ?? "Valider"}
          </button>
        </div>
      </div>
    </DialogOverlay>
  );
}
