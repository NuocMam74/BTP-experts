import { pingLmStudio } from "@/lib/llm/lmstudio";

export async function LlmStatusBadge({ compact = false }: { compact?: boolean }) {
  const status = await pingLmStudio();
  const baseUrl =
    process.env.OPENAI_API_BASE_URL ?? "http://localhost:1234/v1";

  if (status.ok) {
    const modelCount = status.models?.length ?? 0;
    return (
      <div className="badge badge-success" title={baseUrl}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        {compact ? (
          <>{modelCount} modèle{modelCount > 1 ? "s" : ""} en ligne</>
        ) : (
          <>
            LM Studio · {modelCount} modèle{modelCount > 1 ? "s" : ""} chargé
            {modelCount > 1 ? "s" : ""}
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
