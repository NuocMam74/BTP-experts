import { NextResponse } from "next/server";
import { generateText } from "ai";

import { auth } from "@/auth";
import { pingLmStudio } from "@/lib/llm/lmstudio";
import { getModel } from "@/lib/llm/provider";
import { resolveProvider } from "@/lib/llm/provider";

export const runtime = "nodejs";
export const maxDuration = 60;

// Minimum context window the agent system prompts (+ tool schemas, ~5k tokens)
// need to run without truncation errors.
const MIN_CONTEXT = 8192;

type Step = {
  id: string;
  label: string;
  status: "ok" | "warn" | "error";
  detail: string;
};

function errMsg(err: unknown, depth = 0): string {
  if (err == null) return "Erreur inconnue";
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  if (typeof err === "object" && depth < 4) {
    const o = err as Record<string, unknown>;
    if (typeof o.message === "string" && o.message.length > 0) return o.message;
    if (o.error != null) return errMsg(o.error, depth + 1);
    try {
      const json = JSON.stringify(err);
      if (json && json !== "{}") return json;
    } catch {
      /* ignore */
    }
  }
  return String(err);
}

// LM Studio's native REST API (host root, not the /v1 OpenAI path) exposes the
// loaded context length per model — the OpenAI-compatible endpoint does not.
async function loadedContext(
  baseURL: string,
  modelId: string,
): Promise<{ loaded: number | null; max: number | null }> {
  const root = baseURL.replace(/\/v1\/?$/, "");
  try {
    const res = await fetch(`${root}/api/v0/models`, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return { loaded: null, max: null };
    const json = (await res.json()) as {
      data?: Array<{
        id?: string;
        state?: string;
        loaded_context_length?: number;
        max_context_length?: number;
      }>;
    };
    const entry = json.data?.find((m) => m.id === modelId);
    return {
      loaded: entry?.loaded_context_length ?? null,
      max: entry?.max_context_length ?? null,
    };
  } catch {
    return { loaded: null, max: null };
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const configuredModel = process.env.OPENAI_MODEL ?? "local-model";
  const provider = resolveProvider();
  const steps: Step[] = [];

  // 1 — Connectivity: can we reach the server and list models?
  const ping = await pingLmStudio(true);
  if (provider === "anthropic") {
    // For Anthropic there is no local server to probe; report and run the live test only.
    steps.push({
      id: "provider",
      label: "Provider",
      status: "ok",
      detail: "Anthropic (API distante) — pas de serveur local à vérifier.",
    });
  } else if (ping.ok) {
    steps.push({
      id: "connectivity",
      label: "Connexion à LM Studio",
      status: "ok",
      detail: `Joignable sur ${ping.baseURL} · ${ping.models?.length ?? 0} modèle(s) disponible(s).`,
    });
  } else {
    steps.push({
      id: "connectivity",
      label: "Connexion à LM Studio",
      status: "error",
      detail: `Injoignable sur ${ping.baseURL}. ${ping.error ?? ""} Démarrez le serveur local (port 1234).`.trim(),
    });
    // No point continuing if the server is down.
    return NextResponse.json({ ok: false, provider, configuredModel, steps });
  }

  // 2 — Is the configured model among the available ones?
  if (provider === "lmstudio") {
    const available = ping.models ?? [];
    if (available.includes(configuredModel)) {
      steps.push({
        id: "model",
        label: "Modèle configuré",
        status: "ok",
        detail: `« ${configuredModel} » est disponible.`,
      });
    } else {
      steps.push({
        id: "model",
        label: "Modèle configuré",
        status: "warn",
        detail: `« ${configuredModel} » n'apparaît pas dans la liste (${available.join(", ") || "vide"}). Vérifiez OPENAI_MODEL dans .env.local.`,
      });
    }

    // 3 — Loaded context length (the cause of n_keep > n_ctx errors).
    const ctx = await loadedContext(ping.baseURL, configuredModel);
    if (ctx.loaded == null) {
      steps.push({
        id: "context",
        label: "Longueur de contexte",
        status: "warn",
        detail:
          "Impossible de lire la longueur de contexte chargée. Le modèle est peut-être chargé à la demande au 1er appel.",
      });
    } else if (ctx.loaded < MIN_CONTEXT) {
      steps.push({
        id: "context",
        label: "Longueur de contexte",
        status: "error",
        detail: `Contexte chargé = ${ctx.loaded} tokens (< ${MIN_CONTEXT} requis). Les prompts des agents seront tronqués. Rechargez : lms load ${configuredModel} -c 16384 -y`,
      });
    } else {
      steps.push({
        id: "context",
        label: "Longueur de contexte",
        status: "ok",
        detail: `Contexte chargé = ${ctx.loaded} tokens${ctx.max ? ` (max ${ctx.max})` : ""}.`,
      });
    }
  }

  // 4 — End-to-end test: run a real completion through the app's own provider.
  const start = Date.now();
  try {
    const result = await generateText({
      model: getModel(),
      system: "Tu es un assistant de test. Réponds en un seul mot.",
      prompt: "Réponds exactement: PONG",
      // Keep the round trip tiny.
      maxOutputTokens: 16,
      temperature: 0,
    });
    const ms = Date.now() - start;
    const reply = result.text.trim();
    steps.push({
      id: "completion",
      label: "Test de génération",
      status: reply.length > 0 ? "ok" : "warn",
      detail:
        reply.length > 0
          ? `Réponse reçue en ${ms} ms : « ${reply.slice(0, 60)} ».`
          : `Réponse vide reçue en ${ms} ms.`,
    });
  } catch (err) {
    steps.push({
      id: "completion",
      label: "Test de génération",
      status: "error",
      detail: errMsg(err),
    });
  }

  const ok = steps.every((s) => s.status === "ok");
  return NextResponse.json({ ok, provider, configuredModel, steps });
}
