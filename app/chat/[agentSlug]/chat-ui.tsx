"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { AGENT_ACCENT, AgentIcon } from "@/components/AgentIcon";
import type { AgentManifest } from "@/lib/agent-runtime/types";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type UploadedDoc = {
  documentId: string;
  filename: string;
  pages: number | null;
  parsed: boolean;
  kind?: string;
  kindLabel?: string;
};

type ConversationSummary = {
  id: string;
  title: string | null;
  createdAt: string;
};

const ACCEPT_ALL_FILES =
  ".pdf,.docx,.doc,.xlsx,.xls,.xlsm,.csv,.tsv,.txt,.md,.markdown,.json,.yaml,.yml,.xml,.html,.htm,.png,.jpg,.jpeg,.gif,.webp,.bmp,.svg,application/pdf,text/*,image/*,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function fileExt(filename: string): string {
  const lower = filename.toLowerCase();
  const idx = lower.lastIndexOf(".");
  if (idx === -1) return "FILE";
  return lower.slice(idx + 1).toUpperCase();
}

// Court verbe d'action déduit du label de la skill pour un message utilisateur naturel
function skillActionText(label: string): string {
  const trimmed = label.trim();
  // Si déjà à l'impératif (commence par un verbe), on garde
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function ChatUI({
  agent,
  initialMessages,
  initialConversationId,
  agentConversations,
}: {
  agent: AgentManifest;
  initialMessages: Message[];
  initialConversationId: string | null;
  agentConversations: ConversationSummary[];
}) {
  const router = useRouter();
  const accent = AGENT_ACCENT[agent.slug] ?? AGENT_ACCENT.architecte!;
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const [docs, setDocs] = useState<UploadedDoc[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(
    initialConversationId,
  );
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  // Auto-resize du textarea
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [input]);

  async function send(userText: string, skillId?: string) {
    if (!userText.trim() || isStreaming) return;
    setError(null);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: userText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);
    if (skillId) setActiveSkillId(skillId);

    const assistantId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    try {
      const res = await fetch(`/api/chat/${agent.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userText,
          conversationId,
          skillId,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `HTTP ${res.status}`);
      }
      if (!res.body) throw new Error("Réponse sans corps");

      const newConvId = res.headers.get("X-Conversation-Id");
      if (newConvId && newConvId !== conversationId) {
        setConversationId(newConvId);
        const url = new URL(window.location.href);
        url.searchParams.set("conversationId", newConvId);
        router.replace(`${url.pathname}${url.search}`, { scroll: false });
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: accumulated } : m,
          ),
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setIsStreaming(false);
      setActiveSkillId(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  async function uploadFile(file: File) {
    setError(null);
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("agentSlug", agent.slug);
    if (conversationId) formData.append("conversationId", conversationId);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? `Upload HTTP ${res.status}`);
      }
      const data = (await res.json()) as UploadedDoc & {
        conversationId: string;
      };
      if (data.conversationId !== conversationId) {
        setConversationId(data.conversationId);
        const url = new URL(window.location.href);
        url.searchParams.set("conversationId", data.conversationId);
        router.replace(`${url.pathname}${url.search}`, { scroll: false });
      }
      setDocs((prev) => [
        ...prev,
        {
          documentId: data.documentId,
          filename: data.filename,
          pages: data.pages,
          parsed: data.parsed,
          kind: data.kind,
          kindLabel: data.kindLabel,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload échoué");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removeDoc(documentId: string) {
    setDocs((prev) => prev.filter((d) => d.documentId !== documentId));
  }

  function triggerSkill(skillId: string, label: string) {
    // Message utilisateur court et naturel — pas de "Lance la procédure"
    void send(skillActionText(label), skillId);
  }

  function startNewConversation() {
    setMessages([]);
    setConversationId(null);
    setDocs([]);
    setError(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("conversationId");
    router.replace(`${url.pathname}${url.search}`, { scroll: false });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      void uploadFile(file);
    }
  }

  const skillSuggestions = useMemo(
    () => agent.skills.slice(0, 4),
    [agent.skills],
  );

  return (
    <div
      className="grid gap-4 lg:grid-cols-[280px_1fr]"
      onDragEnter={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={(e) => {
        if (e.currentTarget === e.target) setIsDragging(false);
      }}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      {isDragging && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-sm">
          <div className="rounded-md border border-dashed border-foreground/40 bg-surface-elevated p-8 text-center">
            <div className="text-sm font-semibold">Déposer le fichier</div>
            <div className="mt-1 text-xs text-muted-foreground">
              PDF, Word, Excel, CSV, texte, Markdown, image
            </div>
          </div>
        </div>
      )}

      {/* LEFT — Conversations */}
      <ConversationsSidebar
        agentSlug={agent.slug}
        agentName={agent.name}
        conversations={agentConversations}
        currentId={conversationId}
        onNewConversation={startNewConversation}
        accentColor={accent.color}
        open={historyOpen}
        onOpenChange={setHistoryOpen}
      />

      {/* CENTER — Chat */}
      <section className="card-elevated flex min-h-[70vh] flex-col overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5 lg:hidden">
          <button
            type="button"
            onClick={() => setHistoryOpen(true)}
            className="btn-ghost text-xs"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
            Historique ({agentConversations.length})
          </button>
          <button
            type="button"
            onClick={startNewConversation}
            className="btn-ghost text-xs"
          >
            + Nouvelle
          </button>
        </div>

        <div className="scrollbar-thin flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
          {messages.length === 0 ? (
            <EmptyState
              agent={agent}
              accentColor={accent.color}
              onSuggestionClick={(label, skillId) =>
                triggerSkill(skillId, label)
              }
              suggestions={skillSuggestions}
              activeSkillId={activeSkillId}
              isStreaming={isStreaming}
            />
          ) : (
            messages.map((m) => (
              <MessageBubble
                key={m.id}
                message={m}
                agentName={agent.name}
                agentSlug={agent.slug}
                accentColor={accent.color}
              />
            ))
          )}

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              <span className="font-medium">Erreur :</span> {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Pièces jointes en contexte */}
        {docs.length > 0 && (
          <div className="border-t border-border bg-surface px-4 py-2">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {docs.length} pièce{docs.length > 1 ? "s" : ""} jointe{docs.length > 1 ? "s" : ""}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {docs.map((d) => (
                <span
                  key={d.documentId}
                  className="inline-flex items-center gap-1.5 rounded border border-border bg-surface-elevated py-1 pl-1.5 pr-1 text-xs"
                  title={
                    d.parsed
                      ? `${d.kindLabel ?? d.kind ?? ""}${d.pages ? ` · ${d.pages} page(s)` : ""}`
                      : (d.kindLabel ?? "Stocké · non lu")
                  }
                >
                  <span className="rounded bg-muted px-1 font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
                    {fileExt(d.filename)}
                  </span>
                  <span className="max-w-[180px] truncate">{d.filename}</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${d.parsed ? "bg-emerald-500" : "bg-amber-500"}`}
                    title={d.parsed ? "Lu" : "Non lu"}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => removeDoc(d.documentId)}
                    className="rounded p-0.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    aria-label={`Retirer ${d.filename}`}
                    title="Retirer"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <form
          className="border-t border-border/60 bg-surface/30 p-4"
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isStreaming || isUploading}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background/60 text-muted-foreground transition hover:border-border/80 hover:text-foreground disabled:opacity-50"
              title="Joindre un fichier (PDF, Word, Excel, image…)"
            >
              {isUploading ? (
                <svg
                  className="h-4 w-4 animate-spin"
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
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m21 12-7.5 7.5a5 5 0 0 1-7-7L13 5a3 3 0 0 1 4 4l-7.5 7.5a1 1 0 0 1-1.5-1.5L15 8" />
                </svg>
              )}
            </button>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              placeholder={`Posez votre question à ${agent.name}…`}
              rows={1}
              className="input-field max-h-40 min-h-[40px] flex-1 resize-none py-2.5 leading-tight"
              disabled={isStreaming}
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              className="btn-primary h-10 px-4"
              title="Envoyer (Entrée)"
            >
              {isStreaming ? (
                <svg
                  className="h-4 w-4 animate-spin"
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
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPT_ALL_FILES}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void uploadFile(f);
              }}
              className="hidden"
            />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
            <span>
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px]">
                Entrée
              </kbd>{" "}
              envoyer
            </span>
            <span>
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px]">
                Maj+Entrée
              </kbd>{" "}
              saut de ligne
            </span>
            <span>
              Format de livrable (PDF / DOCX / XLSX / PPTX) détecté
              automatiquement dans la requête.
            </span>
          </div>
        </form>
      </section>
    </div>
  );
}

function ConversationsSidebar({
  agentSlug,
  agentName,
  conversations,
  currentId,
  onNewConversation,
  accentColor,
  open,
  onOpenChange,
}: {
  agentSlug: string;
  agentName: string;
  conversations: ConversationSummary[];
  currentId: string | null;
  onNewConversation: () => void;
  accentColor: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <>
      {/* Backdrop mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}
      <aside
        className={`card-elevated fixed left-0 top-0 z-40 h-full w-72 rounded-none transition-transform lg:static lg:z-0 lg:h-auto lg:translate-x-0 lg:rounded-2xl ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                style={{ color: accentColor }}
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <h3 className="text-sm font-semibold">Historique</h3>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="btn-ghost text-xs lg:hidden"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
          <div className="p-2">
            <button
              type="button"
              onClick={() => {
                onNewConversation();
                onOpenChange(false);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-500/30 bg-brand-500/10 px-3 py-2 text-sm font-medium text-brand-300 transition hover:bg-brand-500/20"
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
                <path d="M12 5v14M5 12h14" />
              </svg>
              Nouvelle conversation
            </button>
          </div>
          <div className="scrollbar-thin flex-1 overflow-y-auto p-2">
            {conversations.length === 0 ? (
              <p className="px-3 py-6 text-center text-xs text-muted-foreground">
                Aucune conversation pour {agentName}. Démarrez la première !
              </p>
            ) : (
              <ul className="space-y-0.5">
                {conversations.map((c) => {
                  const isActive = c.id === currentId;
                  return (
                    <li key={c.id}>
                      <Link
                        href={`/chat/${agentSlug}?conversationId=${c.id}`}
                        onClick={() => onOpenChange(false)}
                        className={`block rounded-md px-3 py-2 text-xs transition ${
                          isActive
                            ? "bg-brand-500/15 text-foreground ring-1 ring-brand-500/30"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                      >
                        <div className="truncate font-medium">
                          {c.title ?? "Sans titre"}
                        </div>
                        <div className="mt-0.5 text-[10px] opacity-70">
                          {new Date(c.createdAt).toLocaleString("fr-FR", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="border-t border-border/60 p-3">
            <Link
              href="/chat"
              className="block rounded-md px-2.5 py-1.5 text-center text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              Voir toutes mes conversations →
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}


function MessageBubble({
  message,
  agentName,
  agentSlug,
  accentColor,
}: {
  message: Message;
  agentName: string;
  agentSlug: string;
  accentColor: string;
}) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end animate-slide-up">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-500/15 px-4 py-3 text-sm text-foreground ring-1 ring-brand-500/30">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-brand-400/80">
            Vous
          </div>
          <div className="whitespace-pre-wrap leading-relaxed">
            {message.content || "…"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 animate-slide-up">
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ring-1 ring-inset"
        style={{
          color: accentColor,
          borderColor: `${accentColor}40`,
          backgroundColor: `${accentColor}15`,
          ['--tw-ring-color' as string]: `${accentColor}25`,
        }}
      >
        <AgentIcon slug={agentSlug} className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {agentName}
        </div>
        <div className="rounded-2xl rounded-tl-md border border-border bg-surface/60 px-4 py-3">
          {message.content ? (
            <div className="prose-chat">
              <ReactMarkdown
                components={{
                  a: ({ href, children, ...props }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            <TypingIndicator color={accentColor} />
          )}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-1.5 py-1.5">
      <span className="text-xs text-muted-foreground">L&apos;agent réfléchit</span>
      <span className="flex items-center gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-pulse-glow rounded-full"
            style={{
              backgroundColor: color,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </span>
    </div>
  );
}

function EmptyState({
  agent,
  accentColor,
  suggestions,
  onSuggestionClick,
  activeSkillId,
  isStreaming,
}: {
  agent: AgentManifest;
  accentColor: string;
  suggestions: AgentManifest["skills"];
  onSuggestionClick: (label: string, skillId: string) => void;
  activeSkillId: string | null;
  isStreaming: boolean;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center py-12 text-center">
      <div
        className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border ring-1 ring-inset"
        style={{
          color: accentColor,
          borderColor: `${accentColor}50`,
          backgroundColor: `${accentColor}15`,
          ['--tw-ring-color' as string]: `${accentColor}30`,
        }}
      >
        <AgentIcon slug={agent.slug} className="h-8 w-8" />
      </div>
      <h2 className="text-lg font-semibold">Démarrer une analyse</h2>
      <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
        Posez une question, joignez un document depuis la barre de saisie, ou
        sélectionnez une compétence ci-dessous.
      </p>

      {suggestions.length > 0 && (
        <div className="mt-8 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
          {suggestions.map((s) => {
            const isActive = activeSkillId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSuggestionClick(s.label, s.id)}
                disabled={isStreaming}
                className={`card-hover flex items-center justify-between gap-3 rounded-md border px-3.5 py-2.5 text-left text-sm transition disabled:opacity-50 ${
                  isActive ? "border-foreground/40 bg-accent" : "border-border bg-surface-elevated"
                }`}
              >
                <span className="block flex-1 leading-snug">{s.label}</span>
                {isActive ? (
                  <svg
                    className="h-3.5 w-3.5 shrink-0 animate-spin text-foreground"
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
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
