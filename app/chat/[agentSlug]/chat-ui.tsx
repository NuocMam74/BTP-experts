"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown, { type Components, type Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { AGENT_ACCENT, AgentIcon } from "@/components/AgentIcon";
import { DiagnosticsModal } from "@/components/LmStudioDiagnostics";
import type { AgentManifest } from "@/lib/agent-runtime/types";

type Citation = { source_ref: string; source_url: string | null };

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  activeTools?: ActiveTool[];
  createdAt?: string; // ISO timestamp — shown as HH:MM in the bubble
};

function formatTime(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

type ActiveTool = {
  id: string;
  name: string;
  label: string;
  status: "running" | "done";
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
  projectId: string | null;
  tags: string[] | null;
};

type ProjectSummary = {
  id: string;
  name: string;
  color: string | null;
};

type AgentRef = { slug: string; name: string };

type SearchHit = {
  conversationId: string;
  conversationTitle: string | null;
  agentSlug: string;
  messageId: string;
  role: string;
  snippet: string;
  createdAt: number;
};

const ACCEPT_ALL_FILES =
  ".pdf,.docx,.doc,.xlsx,.xls,.xlsm,.csv,.tsv,.txt,.md,.markdown,.json,.yaml,.yml,.xml,.html,.htm,.png,.jpg,.jpeg,.gif,.webp,.bmp,.svg,application/pdf,text/*,image/*,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function fileExt(filename: string): string {
  const lower = filename.toLowerCase();
  const idx = lower.lastIndexOf(".");
  if (idx === -1) return "FILE";
  return lower.slice(idx + 1).toUpperCase();
}

function skillActionText(label: string): string {
  const trimmed = label.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function toolLabel(name: string): string {
  switch (name) {
    case "rag_search":
      return "Recherche dans le corpus normatif";
    case "generer_rapport":
      return "Génération du livrable";
    case "calc_surfaces":
      return "Calcul de surfaces";
    case "calculer_cubatures":
      return "Calcul de cubatures";
    case "calculer_revision_prix":
      return "Calcul de révision de prix";
    case "calculer_tva_travaux":
      return "Calcul de TVA travaux";
    case "predim_beton_arme":
      return "Prédimensionnement béton armé";
    case "ratio_m2":
      return "Estimation au ratio m²";
    case "recuperer_plu":
      return "Récupération PLU (Géoportail-de-l'urbanisme)";
    default:
      return `Outil : ${name}`;
  }
}

// --- Markdown rendering (assistant messages) ---------------------------------
// GFM enables tables, strikethrough, task lists & autolinks. remark-math +
// rehype-katex render LaTeX (e.g. Eurocode formulas, m² written as \text{m}^2).
const CHAT_REMARK_PLUGINS = [remarkGfm, remarkMath];
const CHAT_REHYPE_PLUGINS: Options["rehypePlugins"] = [
  [rehypeKatex, { throwOnError: false, errorColor: "#ef4444" }],
];

// Models emit math with \( \) and \[ \] delimiters, which remark-math doesn't
// recognize (it expects $ and $$). Normalize them before rendering. Uses a
// replacer function so "$$" isn't interpreted as a special replacement pattern.
function normalizeMathDelimiters(md: string): string {
  return md
    .replace(/\\\[/g, () => "$$")
    .replace(/\\\]/g, () => "$$")
    .replace(/\\\(/g, () => "$")
    .replace(/\\\)/g, () => "$");
}

function mdNodeText(node: React.ReactNode): string {
  if (node == null || node === false || node === true) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(mdNodeText).join("");
  if (typeof node === "object" && "props" in node) {
    return mdNodeText(
      (node as { props?: { children?: React.ReactNode } }).props?.children,
    );
  }
  return "";
}

// A cell whose content is essentially a number (optionally with a unit/symbol)
// reads far better right-aligned with tabular figures — typical of chiffrages.
const NUMERIC_CELL = /^[-+]?\d[\d\s.,]*\s*(?:€|%|m²|m³|ml|m|U|k€|M€|TTC|HT)?$/i;
function isNumericCell(children: React.ReactNode): boolean {
  const t = mdNodeText(children).trim();
  return t.length > 0 && /\d/.test(t) && NUMERIC_CELL.test(t);
}

const CHAT_MARKDOWN_COMPONENTS: Components = {
  a: ({ node: _n, children, href, ...props }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  ),
  // Wrap tables so wide ones (DPGF, métré…) scroll horizontally instead of
  // overflowing or crushing the chat bubble.
  table: ({ node: _n, children, ...props }) => (
    <div className="prose-chat-table-wrap scrollbar-thin">
      <table {...props}>{children}</table>
    </div>
  ),
  th: ({ node: _n, children, style, ...props }) => (
    <th
      style={isNumericCell(children) ? { ...style, textAlign: "right" } : style}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ node: _n, children, style, ...props }) => (
    <td
      style={
        isNumericCell(children)
          ? { ...style, textAlign: "right", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }
          : style
      }
      {...props}
    >
      {children}
    </td>
  ),
};

// --- SSE parser: consumes a ReadableStream and yields {event, data} objects.
async function* parseSse(
  reader: ReadableStreamDefaultReader<Uint8Array>,
): AsyncGenerator<{ event: string; data: unknown }, void, unknown> {
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      if (buffer.trim().length > 0) {
        const parsed = parseSseBlock(buffer);
        if (parsed) yield parsed;
      }
      return;
    }
    buffer += decoder.decode(value, { stream: true });
    let sep: number;
    while ((sep = buffer.indexOf("\n\n")) !== -1) {
      const block = buffer.slice(0, sep);
      buffer = buffer.slice(sep + 2);
      const parsed = parseSseBlock(block);
      if (parsed) yield parsed;
    }
  }
}

function parseSseBlock(block: string): { event: string; data: unknown } | null {
  let event = "message";
  const dataLines: string[] = [];
  for (const line of block.split("\n")) {
    if (line.startsWith("event:")) event = line.slice(6).trim();
    else if (line.startsWith("data:")) dataLines.push(line.slice(5).trim());
  }
  if (dataLines.length === 0) return null;
  try {
    return { event, data: JSON.parse(dataLines.join("\n")) };
  } catch {
    return null;
  }
}

export function ChatUI({
  agent,
  allAgents,
  initialMessages,
  initialConversationId,
  initialProjectId,
  initialTags,
  projects: initialProjects,
  agentConversations,
}: {
  agent: AgentManifest;
  allAgents: AgentRef[];
  initialMessages: Message[];
  initialConversationId: string | null;
  initialProjectId: string | null;
  initialTags: string[];
  projects: ProjectSummary[];
  agentConversations: ConversationSummary[];
}) {
  const router = useRouter();
  const accent = AGENT_ACCENT[agent.slug] ?? AGENT_ACCENT.architecte!;
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const [docs, setDocs] = useState<UploadedDoc[]>([]);
  // Last successfully uploaded doc — shown as a confirmation banner in the thread.
  const [uploadNotice, setUploadNotice] = useState<UploadedDoc | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(
    initialConversationId,
  );
  const [projectId, setProjectId] = useState<string | null>(initialProjectId);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [projects, setProjects] = useState<ProjectSummary[]>(initialProjects);
  const [conversations, setConversations] = useState<ConversationSummary[]>(
    agentConversations,
  );
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHits, setSearchHits] = useState<SearchHit[] | null>(null);
  const [llmOnline, setLlmOnline] = useState<boolean | null>(null);
  const [llmError, setLlmError] = useState<string | null>(null);
  const [diagOpen, setDiagOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // True when the viewport is at the bottom — we only auto-scroll then, so the
  // user can scroll up to re-read previous content while generation continues.
  const autoScrollRef = useRef(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  // Last user prompt (kept so the regenerate button knows what to re-send)
  const lastUserPromptRef = useRef<string | null>(null);
  const lastSkillIdRef = useRef<string | null>(null);
  // In-flight request controller, so the user can stop a running generation.
  const abortRef = useRef<AbortController | null>(null);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
    autoScrollRef.current = true;
    setShowScrollToBottom(false);
  }, []);

  function handleMessagesScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const atBottom = distanceFromBottom < 80;
    autoScrollRef.current = atBottom;
    setShowScrollToBottom(!atBottom);
  }

  useEffect(() => {
    if (!autoScrollRef.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // useState only seeds from props on mount. After router.refresh() the server
  // sends fresh props but the state wouldn't update — so the history list and the
  // project list would never reflect new/updated conversations or projects.
  // Re-sync them whenever the server props change.
  useEffect(() => {
    setConversations(agentConversations);
  }, [agentConversations]);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  // When the server hands us a *different* conversation — clicking one in the
  // history, or starting a new one — resync the per-conversation state from props.
  // Skipped while streaming so a live response is never clobbered.
  useEffect(() => {
    if (isStreaming) return;
    setMessages(initialMessages);
    setConversationId(initialConversationId);
    setProjectId(initialProjectId);
    setTags(initialTags);
    setDocs([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialConversationId]);

  // Pick up a cross-agent mention seed (set by @mention router push).
  useEffect(() => {
    const url = new URL(window.location.href);
    const seed = url.searchParams.get("seed");
    if (seed) {
      setInput(seed);
      url.searchParams.delete("seed");
      router.replace(`${url.pathname}${url.search}`, { scroll: false });
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [input]);

  // LM Studio health probe: on mount + every 30s.
  useEffect(() => {
    let cancelled = false;
    async function poll() {
      try {
        const res = await fetch("/api/llm-status", { cache: "no-store" });
        if (!res.ok) {
          if (!cancelled) {
            setLlmOnline(false);
            setLlmError(`HTTP ${res.status}`);
          }
          return;
        }
        const json = (await res.json()) as { ok: boolean; error?: string };
        if (!cancelled) {
          setLlmOnline(json.ok);
          setLlmError(json.ok ? null : (json.error ?? "Hors-ligne"));
        }
      } catch (err) {
        if (!cancelled) {
          setLlmOnline(false);
          setLlmError(err instanceof Error ? err.message : String(err));
        }
      }
    }
    void poll();
    const id = setInterval(poll, 30_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Debounced FTS search across conversations
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchHits(null);
      return;
    }
    const t = setTimeout(async () => {
      try {
        const url = `/api/conversations/search?q=${encodeURIComponent(searchQuery)}&agentSlug=${agent.slug}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as { hits: SearchHit[] };
        setSearchHits(json.hits);
      } catch {
        // ignore
      }
    }, 250);
    return () => clearTimeout(t);
  }, [searchQuery, agent.slug]);

  async function streamResponse(opts: {
    userText: string;
    skillId?: string;
    regenerate?: boolean;
    assistantId: string;
  }) {
    const { assistantId } = opts;
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch(`/api/chat/${agent.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userText: opts.userText,
          conversationId,
          skillId: opts.skillId,
          regenerate: opts.regenerate,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `HTTP ${res.status}`);
      }
      if (!res.body) throw new Error("Réponse sans corps");

      const headerConvId = res.headers.get("X-Conversation-Id");
      if (headerConvId && headerConvId !== conversationId) {
        setConversationId(headerConvId);
        const url = new URL(window.location.href);
        url.searchParams.set("conversationId", headerConvId);
        router.replace(`${url.pathname}${url.search}`, { scroll: false });
      }

      const reader = res.body.getReader();
      let accumulated = "";
      for await (const { event, data } of parseSse(reader)) {
        if (event === "text") {
          const delta = (data as { delta?: string }).delta ?? "";
          accumulated += delta;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: accumulated } : m,
            ),
          );
        } else if (event === "tool-call") {
          const d = data as { id: string; name: string };
          setMessages((prev) =>
            prev.map((m) => {
              if (m.id !== assistantId) return m;
              const activeTools = [...(m.activeTools ?? [])];
              if (!activeTools.find((t) => t.id === d.id)) {
                activeTools.push({
                  id: d.id,
                  name: d.name,
                  label: toolLabel(d.name),
                  status: "running",
                });
              }
              return { ...m, activeTools };
            }),
          );
        } else if (event === "tool-result") {
          const d = data as { id: string; citations?: Citation[] };
          setMessages((prev) =>
            prev.map((m) => {
              if (m.id !== assistantId) return m;
              const activeTools = (m.activeTools ?? []).map((t) =>
                t.id === d.id ? { ...t, status: "done" as const } : t,
              );
              const citations = [...(m.citations ?? []), ...(d.citations ?? [])];
              // Deduplicate citations.
              const seen = new Set<string>();
              const deduped = citations.filter((c) => {
                const k = c.source_ref + "|" + (c.source_url ?? "");
                if (seen.has(k)) return false;
                seen.add(k);
                return true;
              });
              return { ...m, activeTools, citations: deduped };
            }),
          );
        } else if (event === "error") {
          const d = data as { message?: string };
          throw new Error(d.message ?? "Erreur du flux");
        }
      }

      // Refresh the sidebar in the background — title may have been generated.
      void refreshConversations();
    } catch (err) {
      const aborted =
        controller.signal.aborted ||
        (err instanceof Error && err.name === "AbortError");
      if (!aborted) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        // Keep a partial answer if any was streamed; only drop an empty bubble.
        setMessages((prev) => {
          const m = prev.find((x) => x.id === assistantId);
          if (m && m.content.trim().length > 0) return prev;
          return prev.filter((x) => x.id !== assistantId);
        });
      }
      // On abort the partial content is already in state — we keep it as-is.
    } finally {
      abortRef.current = null;
      // Stop any tool spinner left "running" on the (possibly partial) message.
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId && m.activeTools
            ? {
                ...m,
                activeTools: m.activeTools.map((t) =>
                  t.status === "running" ? { ...t, status: "done" as const } : t,
                ),
              }
            : m,
        ),
      );
      setIsStreaming(false);
      setActiveSkillId(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  async function refreshConversations() {
    // Cheap reload via router.refresh — pulls fresh server props.
    router.refresh();
  }

  async function send(userText: string, skillId?: string) {
    if (!userText.trim() || isStreaming) return;
    setError(null);
    setUploadNotice(null);

    // Detect @agent mention — if present, route to that agent's chat instead.
    const mentionMatch = userText.match(/^@([a-z0-9-]+)\s+(.+)$/i);
    if (mentionMatch) {
      const targetSlug = mentionMatch[1]!.toLowerCase();
      const rest = mentionMatch[2]!;
      const target = allAgents.find((a) => a.slug === targetSlug);
      if (target && target.slug !== agent.slug) {
        // Stash the prompt for the destination chat via querystring.
        const url = `/chat/${target.slug}?seed=${encodeURIComponent(rest)}`;
        router.push(url);
        return;
      }
    }

    lastUserPromptRef.current = userText;
    lastSkillIdRef.current = skillId ?? null;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: userText,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);
    if (skillId) setActiveSkillId(skillId);

    const assistantId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", createdAt: new Date().toISOString() },
    ]);

    await streamResponse({ userText, skillId, assistantId });
  }

  async function regenerate() {
    if (!lastUserPromptRef.current || isStreaming) return;
    setError(null);
    setIsStreaming(true);

    // Drop the last assistant message from local state.
    setMessages((prev) => {
      const idx = [...prev].reverse().findIndex((m) => m.role === "assistant");
      if (idx === -1) return prev;
      const realIdx = prev.length - 1 - idx;
      return prev.slice(0, realIdx);
    });

    const assistantId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", createdAt: new Date().toISOString() },
    ]);

    await streamResponse({
      userText: lastUserPromptRef.current,
      skillId: lastSkillIdRef.current ?? undefined,
      regenerate: true,
      assistantId,
    });
  }

  async function uploadFile(file: File) {
    setError(null);
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("agentSlug", agent.slug);
    if (conversationId) formData.append("conversationId", conversationId);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? `Upload HTTP ${res.status}`);
      }
      const data = (await res.json()) as UploadedDoc & { conversationId: string };
      if (data.conversationId !== conversationId) {
        setConversationId(data.conversationId);
        const url = new URL(window.location.href);
        url.searchParams.set("conversationId", data.conversationId);
        router.replace(`${url.pathname}${url.search}`, { scroll: false });
      }
      const uploaded: UploadedDoc = {
        documentId: data.documentId,
        filename: data.filename,
        pages: data.pages,
        parsed: data.parsed,
        kind: data.kind,
        kindLabel: data.kindLabel,
      };
      setDocs((prev) => [...prev, uploaded]);
      setUploadNotice(uploaded);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload échoué");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removeDoc(documentId: string) {
    setDocs((prev) => prev.filter((d) => d.documentId !== documentId));
    setUploadNotice((n) => (n?.documentId === documentId ? null : n));
  }

  function triggerSkill(skillId: string, label: string) {
    void send(skillActionText(label), skillId);
  }

  function startNewConversation() {
    setMessages([]);
    setConversationId(null);
    setDocs([]);
    setUploadNotice(null);
    setError(null);
    setProjectId(null);
    setTags([]);
    const url = new URL(window.location.href);
    url.searchParams.delete("conversationId");
    router.replace(`${url.pathname}${url.search}`, { scroll: false });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void uploadFile(file);
  }

  async function deleteConversation(id: string) {
    if (!confirm("Supprimer définitivement cette conversation ?")) return;
    const res = await fetch(`/api/conversations/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Suppression échouée");
      return;
    }
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (id === conversationId) startNewConversation();
  }

  async function renameConversation(id: string, currentTitle: string | null) {
    const next = prompt("Nouveau nom de la conversation :", currentTitle ?? "");
    if (next == null) return; // cancelled
    const trimmed = next.trim().slice(0, 200);
    if (!trimmed || trimmed === currentTitle) return;
    // Optimistic update.
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: trimmed } : c)),
    );
    const res = await fetch(`/api/conversations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: trimmed }),
    });
    if (!res.ok) {
      setError("Renommage échoué");
      return;
    }
    router.refresh();
  }

  async function updateConversationProject(newProjectId: string | null) {
    if (!conversationId) {
      setProjectId(newProjectId);
      return;
    }
    setProjectId(newProjectId);
    await fetch(`/api/conversations/${conversationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: newProjectId }),
    });
    router.refresh();
  }

  async function updateConversationTags(newTags: string[]) {
    setTags(newTags);
    if (!conversationId) return;
    await fetch(`/api/conversations/${conversationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tags: newTags }),
    });
    router.refresh();
  }

  async function createProject(name: string) {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) return null;
    const created = (await res.json()) as ProjectSummary;
    setProjects((prev) => [created, ...prev]);
    return created;
  }

  const skillSuggestions = useMemo(() => agent.skills.slice(0, 4), [agent.skills]);
  const slashOpen = input.startsWith("/") && input.length >= 1;
  const slashQuery = slashOpen ? input.slice(1).toLowerCase() : "";
  const slashMatches = slashOpen
    ? agent.skills.filter(
        (s) =>
          s.id.toLowerCase().includes(slashQuery) ||
          s.label.toLowerCase().includes(slashQuery),
      )
    : [];

  const mentionMatch = input.match(/(?:^|\s)@([a-z0-9-]*)$/i);
  const mentionOpen = Boolean(mentionMatch);
  const mentionQuery = mentionMatch?.[1]?.toLowerCase() ?? "";
  const mentionMatches = mentionOpen
    ? allAgents.filter(
        (a) =>
          a.slug !== agent.slug &&
          (a.slug.includes(mentionQuery) ||
            a.name.toLowerCase().includes(mentionQuery)),
      )
    : [];

  const completeSlash = useCallback(
    (skillId: string, label: string) => {
      setInput("");
      triggerSkill(skillId, label);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const completeMention = useCallback((slug: string) => {
    setInput((prev) => prev.replace(/@[a-z0-9-]*$/i, `@${slug} `));
    inputRef.current?.focus();
  }, []);

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
      <DiagnosticsModal open={diagOpen} onClose={() => setDiagOpen(false)} />

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

      <ConversationsSidebar
        agentSlug={agent.slug}
        agentName={agent.name}
        conversations={conversations}
        currentId={conversationId}
        onNewConversation={startNewConversation}
        onDelete={deleteConversation}
        onRename={renameConversation}
        accentColor={accent.color}
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        searchHits={searchHits}
        projects={projects}
      />

      <section className="card-elevated relative flex min-h-[70vh] flex-col overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5 lg:hidden">
          <button
            type="button"
            onClick={() => setHistoryOpen(true)}
            className="btn-ghost text-xs"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
            Historique ({conversations.length})
          </button>
          <button
            type="button"
            onClick={startNewConversation}
            className="btn-ghost text-xs"
          >
            + Nouvelle
          </button>
        </div>

        {/* LM Studio offline banner */}
        {llmOnline === false && (
          <div className="flex items-start gap-3 border-b border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-200">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="mt-0.5 h-4 w-4 shrink-0">
              <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex-1">
              <div className="font-semibold">LM Studio hors-ligne</div>
              <div className="mt-0.5 opacity-90">
                Démarrez le serveur local (port 1234 par défaut) et chargez votre modèle. Erreur : {llmError ?? "inconnue"}.{" "}
                <button
                  type="button"
                  onClick={() => setDiagOpen(true)}
                  className="underline hover:no-underline"
                >
                  Diagnostiquer
                </button>
                {" · "}
                <a
                  href="https://lmstudio.ai/docs/local-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  Voir la doc
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Project + tags bar (only when a conversation is open) */}
        {conversationId && (
          <ProjectTagsBar
            projects={projects}
            projectId={projectId}
            tags={tags}
            onProjectChange={updateConversationProject}
            onTagsChange={updateConversationTags}
            onCreateProject={createProject}
          />
        )}

        <div
          ref={scrollContainerRef}
          onScroll={handleMessagesScroll}
          className="scrollbar-thin relative flex-1 space-y-5 overflow-y-auto p-5 sm:p-6"
        >
          {messages.length === 0 ? (
            <EmptyState
              agent={agent}
              accentColor={accent.color}
              onSuggestionClick={(label, skillId) => triggerSkill(skillId, label)}
              suggestions={skillSuggestions}
              activeSkillId={activeSkillId}
              isStreaming={isStreaming}
              llmOffline={llmOnline === false}
            />
          ) : (
            messages.map((m, idx) => {
              const isLastAssistant =
                m.role === "assistant" && idx === messages.length - 1 && !isStreaming;
              return (
                <MessageBubble
                  key={m.id}
                  message={m}
                  agentName={agent.name}
                  agentSlug={agent.slug}
                  accentColor={accent.color}
                  onRegenerate={isLastAssistant ? regenerate : undefined}
                />
              );
            })
          )}

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              <span className="font-medium">Erreur :</span> {error}
            </div>
          )}
          {uploadNotice && (
            <div className="animate-slide-up rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              <div className="flex items-center gap-2 font-semibold">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Document prêt à être analysé
              </div>
              <ul className="mt-1.5 space-y-0.5 text-xs text-emerald-200/90">
                <li>✓ <span className="font-medium text-emerald-100">{uploadNotice.filename}</span> — uploadé</li>
                <li>
                  ✓{" "}
                  {uploadNotice.kind === "image"
                    ? "Image préparée pour l'analyse visuelle"
                    : uploadNotice.kind === "pdf" && !uploadNotice.parsed
                      ? "PDF (plan/scan) — pages préparées pour l'analyse visuelle"
                      : uploadNotice.parsed
                        ? `Contenu extrait${uploadNotice.pages ? ` · ${uploadNotice.pages} page(s)/feuille(s)` : ""}`
                        : "Fichier stocké (contenu non extractible automatiquement)"}
                </li>
                <li>✓ Prêt — pose ta question sur ce document, {agent.name} l&apos;analyse dans sa réponse.</li>
              </ul>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {showScrollToBottom && (
          <button
            type="button"
            onClick={() => scrollToBottom("smooth")}
            className="absolute bottom-28 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-foreground shadow-md transition hover:bg-accent"
            aria-label="Revenir en bas"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            Revenir en bas
            {isStreaming && (
              <span
                className="ml-1 h-1.5 w-1.5 animate-pulse-glow rounded-full"
                style={{ backgroundColor: accent.color }}
                aria-hidden
              />
            )}
          </button>
        )}

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
                    d.kind === "image"
                      ? "Image — analysée visuellement par le modèle"
                      : d.parsed
                        ? `${d.kindLabel ?? d.kind ?? ""}${d.pages ? ` · ${d.pages} page(s)` : ""}`
                        : (d.kindLabel ?? "Stocké · non lu")
                  }
                >
                  <span className="rounded bg-muted px-1 font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
                    {fileExt(d.filename)}
                  </span>
                  <span className="max-w-[180px] truncate">{d.filename}</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${d.parsed || d.kind === "image" ? "bg-emerald-500" : "bg-amber-500"}`}
                    title={d.kind === "image" ? "Analysée (vision)" : d.parsed ? "Lu" : "Non lu"}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => removeDoc(d.documentId)}
                    className="rounded p-0.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    aria-label={`Retirer ${d.filename}`}
                    title="Retirer"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <form
          className="relative border-t border-border/60 bg-surface/30 p-4"
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          {/* Slash command autocomplete */}
          {slashOpen && slashMatches.length > 0 && (
            <div className="absolute bottom-[calc(100%-4px)] left-4 right-4 z-10 mb-2 max-h-64 overflow-y-auto rounded-lg border border-border bg-surface-elevated p-1 shadow-lg">
              <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Compétences /
              </div>
              {slashMatches.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => completeSlash(s.id, s.label)}
                  className="block w-full rounded-md px-2 py-1.5 text-left text-xs hover:bg-accent"
                >
                  <span className="font-mono text-brand-400">/{s.id}</span>
                  <span className="ml-2 text-foreground/80">{s.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* @mention autocomplete */}
          {mentionOpen && mentionMatches.length > 0 && (
            <div className="absolute bottom-[calc(100%-4px)] left-4 right-4 z-10 mb-2 max-h-64 overflow-y-auto rounded-lg border border-border bg-surface-elevated p-1 shadow-lg">
              <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Mentionner un agent @
              </div>
              {mentionMatches.map((a) => (
                <button
                  key={a.slug}
                  type="button"
                  onClick={() => completeMention(a.slug)}
                  className="block w-full rounded-md px-2 py-1.5 text-left text-xs hover:bg-accent"
                >
                  <span className="font-mono text-brand-400">@{a.slug}</span>
                  <span className="ml-2 text-foreground/80">{a.name}</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isStreaming || isUploading}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background/60 text-muted-foreground transition hover:border-border/80 hover:text-foreground disabled:opacity-50"
              title="Joindre un fichier (PDF, Word, Excel, image…)"
            >
              {isUploading ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="m21 12-7.5 7.5a5 5 0 0 1-7-7L13 5a3 3 0 0 1 4 4l-7.5 7.5a1 1 0 0 1-1.5-1.5L15 8" />
                </svg>
              )}
            </button>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  if (slashOpen || mentionOpen) setInput("");
                } else if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              placeholder={`Posez votre question à ${agent.name}… (/ pour les compétences, @ pour mentionner un autre agent)`}
              rows={1}
              className="input-field max-h-40 min-h-[40px] flex-1 resize-none py-2.5 leading-tight"
              disabled={isStreaming}
            />
            {isStreaming ? (
              <button
                type="button"
                onClick={stopStreaming}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-500/10 px-3 font-medium text-red-300 transition hover:bg-red-500/20"
                title="Arrêter la génération (le texte déjà produit est conservé)"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
                Stop
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="btn-primary h-10 px-4"
                title="Envoyer (Entrée)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            )}
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
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px]">Entrée</kbd> envoyer
            </span>
            <span>
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px]">Maj+Entrée</kbd> saut de ligne
            </span>
            <span>
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px]">/</kbd> compétence
              <span className="mx-1">·</span>
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px]">@</kbd> mentionner un agent
            </span>
            <button
              type="button"
              onClick={() => setDiagOpen(true)}
              className="ml-auto inline-flex items-center gap-1 rounded px-1.5 py-0.5 transition hover:bg-muted hover:text-foreground"
              title="Vérifier que LM Studio communique avec l'application"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  llmOnline === false ? "bg-amber-500" : llmOnline ? "bg-emerald-500" : "bg-muted-foreground"
                }`}
                aria-hidden
              />
              Tester LM Studio
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function ProjectTagsBar({
  projects,
  projectId,
  tags,
  onProjectChange,
  onTagsChange,
  onCreateProject,
}: {
  projects: ProjectSummary[];
  projectId: string | null;
  tags: string[];
  onProjectChange: (id: string | null) => void;
  onTagsChange: (tags: string[]) => void;
  onCreateProject: (name: string) => Promise<ProjectSummary | null>;
}) {
  const [tagInput, setTagInput] = useState("");

  async function handleProjectChange(value: string) {
    if (value === "__new__") {
      const name = prompt("Nom du nouveau projet ?");
      if (!name?.trim()) return;
      const created = await onCreateProject(name.trim());
      if (created) onProjectChange(created.id);
      return;
    }
    onProjectChange(value === "" ? null : value);
  }

  function addTag(value: string) {
    const v = value.trim();
    if (!v) return;
    if (tags.includes(v)) return;
    onTagsChange([...tags, v]);
    setTagInput("");
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border/60 bg-surface/50 px-4 py-2 text-xs">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Projet</span>
        <select
          value={projectId ?? ""}
          onChange={(e) => void handleProjectChange(e.target.value)}
          className="rounded border border-border bg-background px-2 py-1 text-xs"
        >
          <option value="">— Aucun —</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
          <option value="__new__">+ Nouveau projet…</option>
        </select>
      </div>
      <div className="flex flex-1 flex-wrap items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Tags</span>
        {tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-elevated px-2 py-0.5 text-[11px]"
          >
            {t}
            <button
              type="button"
              onClick={() => onTagsChange(tags.filter((x) => x !== t))}
              className="text-muted-foreground hover:text-foreground"
              aria-label={`Retirer ${t}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addTag(tagInput);
            }
          }}
          onBlur={() => addTag(tagInput)}
          placeholder="+ tag"
          className="w-24 rounded border border-border bg-background px-2 py-1 text-xs"
        />
      </div>
    </div>
  );
}

function ConversationsSidebar({
  agentSlug,
  agentName,
  conversations,
  currentId,
  onNewConversation,
  onDelete,
  onRename,
  accentColor,
  open,
  onOpenChange,
  searchQuery,
  onSearchQueryChange,
  searchHits,
  projects,
}: {
  agentSlug: string;
  agentName: string;
  conversations: ConversationSummary[];
  currentId: string | null;
  onNewConversation: () => void;
  onDelete: (id: string) => void;
  onRename: (id: string, currentTitle: string | null) => void;
  accentColor: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  searchHits: SearchHit[] | null;
  projects: ProjectSummary[];
}) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const projectName = (id: string | null) =>
    id ? projects.find((p) => p.id === id)?.name : undefined;

  return (
    <>
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" style={{ color: accentColor }}>
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

          <div className="px-2 pt-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Rechercher (mot-clé, phrase…)"
              className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs"
            />
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Nouvelle conversation
            </button>
          </div>

          <div className="scrollbar-thin flex-1 overflow-y-auto p-2">
            {searchHits && searchHits.length > 0 ? (
              <ul className="space-y-1">
                <li className="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {searchHits.length} résultat{searchHits.length > 1 ? "s" : ""}
                </li>
                {searchHits.map((h) => (
                  <li key={h.messageId}>
                    <Link
                      href={`/chat/${h.agentSlug}?conversationId=${h.conversationId}`}
                      onClick={() => onOpenChange(false)}
                      className="block rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <div className="truncate font-medium text-foreground">
                        {h.conversationTitle ?? "Sans titre"}
                      </div>
                      <div
                        className="mt-0.5 text-[11px] opacity-80 [&_mark]:bg-brand-500/30 [&_mark]:text-foreground"
                        dangerouslySetInnerHTML={{ __html: h.snippet }}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : conversations.length === 0 ? (
              <p className="px-3 py-6 text-center text-xs text-muted-foreground">
                Aucune conversation pour {agentName}. Démarrez la première !
              </p>
            ) : (
              <ul className="space-y-0.5">
                {conversations.map((c) => {
                  const isActive = c.id === currentId;
                  const pName = projectName(c.projectId);
                  return (
                    <li key={c.id} className="relative">
                      <Link
                        href={`/chat/${agentSlug}?conversationId=${c.id}`}
                        onClick={() => onOpenChange(false)}
                        className={`block rounded-md px-3 py-2 pr-7 text-xs transition ${
                          isActive
                            ? "bg-brand-500/15 text-foreground ring-1 ring-brand-500/30"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                      >
                        <div className="truncate font-medium">
                          {c.title ?? "Sans titre"}
                        </div>
                        <div className="mt-0.5 flex items-center gap-1.5 text-[10px] opacity-70">
                          <span>
                            {new Date(c.createdAt).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}
                          </span>
                          {pName && (
                            <span className="rounded bg-brand-500/15 px-1 text-brand-300">
                              {pName}
                            </span>
                          )}
                          {c.tags && c.tags.length > 0 && (
                            <span className="truncate">#{c.tags.join(" #")}</span>
                          )}
                        </div>
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === c.id ? null : c.id);
                        }}
                        className="absolute right-1 top-1.5 rounded p-1 text-muted-foreground opacity-60 hover:bg-muted hover:text-foreground"
                        aria-label="Menu"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                          <circle cx="5" cy="12" r="1.5" />
                          <circle cx="12" cy="12" r="1.5" />
                          <circle cx="19" cy="12" r="1.5" />
                        </svg>
                      </button>
                      {openMenuId === c.id && (
                        <div
                          className="absolute right-1 top-9 z-20 w-40 rounded-md border border-border bg-surface-elevated p-1 shadow-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null);
                              onRename(c.id, c.title);
                            }}
                            className="block w-full rounded px-2 py-1.5 text-left text-xs text-foreground hover:bg-accent"
                          >
                            Renommer
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null);
                              onDelete(c.id);
                            }}
                            className="block w-full rounded px-2 py-1.5 text-left text-xs text-red-400 hover:bg-red-500/10"
                          >
                            Supprimer
                          </button>
                        </div>
                      )}
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
  onRegenerate,
}: {
  message: Message;
  agentName: string;
  agentSlug: string;
  accentColor: string;
  onRegenerate?: () => void;
}) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  if (isUser) {
    return (
      <div className="flex justify-end animate-slide-up">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-500/15 px-4 py-3 text-sm text-foreground ring-1 ring-brand-500/30">
          <div className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-brand-400/80">
            <span>Vous</span>
            {message.createdAt && (
              <span className="font-normal tabular-nums opacity-70">
                {formatTime(message.createdAt)}
              </span>
            )}
          </div>
          <div className="whitespace-pre-wrap leading-relaxed">
            {message.content || "…"}
          </div>
        </div>
      </div>
    );
  }

  const hasContent = Boolean(message.content);
  const hasActiveTools = (message.activeTools?.length ?? 0) > 0;

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
        <div className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span>{agentName}</span>
          {message.createdAt && (
            <span className="font-normal tabular-nums opacity-70">
              {formatTime(message.createdAt)}
            </span>
          )}
          {hasContent && (
            <div className="ml-auto flex items-center gap-1 normal-case">
              <button
                type="button"
                onClick={copy}
                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                title={copied ? "Copié !" : "Copier la réponse"}
                aria-label="Copier"
              >
                {copied ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-emerald-400">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
              {onRegenerate && (
                <button
                  type="button"
                  onClick={onRegenerate}
                  className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  title="Régénérer la réponse"
                  aria-label="Régénérer"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
        <div className="rounded-2xl rounded-tl-md border border-border bg-surface/60 px-4 py-3">
          {hasActiveTools && (
            <div className="mb-2 space-y-1.5">
              {message.activeTools!.map((t) => {
                // Document generation is the long one — show a prominent, reassuring
                // loading card so the user doesn't think the app froze/crashed.
                if (t.name === "generer_rapport" && t.status === "running") {
                  return (
                    <div
                      key={t.id}
                      className="flex items-center gap-3 rounded-lg border border-brand-500/30 bg-brand-500/10 px-3 py-2.5 text-xs text-brand-200"
                    >
                      <svg className="h-4 w-4 shrink-0 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                      </svg>
                      <div className="min-w-0">
                        <div className="font-semibold">Génération du document en cours…</div>
                        <div className="opacity-80">
                          Mise en forme du livrable — cela peut prendre un moment, ne ferme pas la page.
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={t.id} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    {t.status === "running" ? (
                      <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-emerald-400">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                    <span>{t.label}…</span>
                  </div>
                );
              })}
            </div>
          )}
          {hasContent ? (
            <div className="prose-chat">
              <ReactMarkdown
                remarkPlugins={CHAT_REMARK_PLUGINS}
                rehypePlugins={CHAT_REHYPE_PLUGINS}
                components={CHAT_MARKDOWN_COMPONENTS}
              >
                {normalizeMathDelimiters(message.content)}
              </ReactMarkdown>
            </div>
          ) : !hasActiveTools ? (
            <TypingIndicator color={accentColor} />
          ) : null}
        </div>
        {message.citations && message.citations.length > 0 && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="font-semibold uppercase tracking-wider">Sources :</span>
            {message.citations.map((c, i) => {
              const inner = (
                <span className="rounded border border-border bg-surface px-1.5 py-0.5 hover:border-foreground/30">
                  {c.source_ref}
                </span>
              );
              return c.source_url ? (
                <a
                  key={`${c.source_ref}-${i}`}
                  href={c.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                  title={c.source_url}
                >
                  {inner}
                </a>
              ) : (
                <span key={`${c.source_ref}-${i}`}>{inner}</span>
              );
            })}
          </div>
        )}
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
            style={{ backgroundColor: color, animationDelay: `${i * 0.15}s` }}
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
  llmOffline,
}: {
  agent: AgentManifest;
  accentColor: string;
  suggestions: AgentManifest["skills"];
  onSuggestionClick: (label: string, skillId: string) => void;
  activeSkillId: string | null;
  isStreaming: boolean;
  llmOffline: boolean;
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
      <h2 className="text-xl font-semibold">{agent.name}</h2>
      {agent.tagline && (
        <p className="mt-1 max-w-md text-sm" style={{ color: accentColor }}>
          {agent.tagline}
        </p>
      )}
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
        {llmOffline ? (
          <>
            <strong className="text-amber-300">LM Studio est hors-ligne.</strong>{" "}
            Démarrez le serveur local puis rechargez la page pour commencer.
          </>
        ) : (
          agent.presentation ??
          `👋 Bonjour, je suis votre ${agent.name}. ${agent.tagline}. Posez votre question ou joignez un document (plan, PDF, Excel, Word, image) — je suis prêt, j'attends votre demande.`
        )}
      </p>

      {suggestions.length > 0 && (
        <>
          <div className="mt-7 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Ce que je peux faire pour vous
          </div>
          <div className="grid w-full max-w-2xl gap-2 sm:grid-cols-2">
          {suggestions.map((s) => {
            const isActive = activeSkillId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSuggestionClick(s.label, s.id)}
                disabled={isStreaming || llmOffline}
                className={`card-hover flex items-center justify-between gap-3 rounded-md border px-3.5 py-2.5 text-left text-sm transition disabled:opacity-50 ${
                  isActive ? "border-foreground/40 bg-accent" : "border-border bg-surface-elevated"
                }`}
              >
                <span className="block flex-1 leading-snug">{s.label}</span>
                {isActive ? (
                  <svg className="h-3.5 w-3.5 shrink-0 animate-spin text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0 text-muted-foreground">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            );
          })}
          </div>
        </>
      )}
    </div>
  );
}
