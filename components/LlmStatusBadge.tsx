import { pingLmStudio } from "@/lib/llm/lmstudio";

// Embedding model IDs are noisy and never used for chat — we want the badge
// to show the *chat* model so the user sees what's actually answering.
function isEmbeddingModel(id: string): boolean {
  const lower = id.toLowerCase();
  return (
    lower.includes("embed") ||
    lower.includes("embedding") ||
    /(^|[-/])bge[-/]/.test(lower) ||
    lower.endsWith("-bge") ||
    lower.includes("e5-")
  );
}

// LM Studio model IDs are long ("qwen/qwen2.5-vl-32b-instruct"). Strip the
// org prefix and trailing quantization tags so the badge stays compact.
function prettifyModelId(id: string): string {
  let s = id.includes("/") ? id.split("/").pop()! : id;
  s = s.replace(/[-_](gguf|mlx|q\d+_\w+|fp\d+|bf16|i?int\d+)$/i, "");
  return s;
}

export async function LlmStatusBadge({ compact = false }: { compact?: boolean }) {
  const status = await pingLmStudio();
  const baseUrl =
    process.env.OPENAI_API_BASE_URL ?? "http://localhost:1234/v1";

  if (status.ok) {
    const allModels = status.models ?? [];
    const chatModels = allModels.filter((m) => !isEmbeddingModel(m));
    const configured = process.env.OPENAI_MODEL;
    const active =
      (configured && allModels.find((m) => m === configured)) ??
      chatModels[0] ??
      allModels[0];
    const label = active ? prettifyModelId(active) : "modèle chargé";
    const title = active
      ? `Modèle actif : ${active}\n${allModels.length} modèle(s) sur ${baseUrl}`
      : baseUrl;

    return (
      <div className="badge badge-success max-w-[260px]" title={title}>
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        {compact ? (
          <span className="truncate font-mono text-[11px]">{label}</span>
        ) : (
          <>
            <span className="hidden sm:inline">LM Studio · </span>
            <span className="truncate font-mono text-[11px]">{label}</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="badge badge-warning" title={baseUrl}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
      </span>
      {compact ? "LM Studio hors-ligne" : <>LM Studio injoignable</>}
    </div>
  );
}
