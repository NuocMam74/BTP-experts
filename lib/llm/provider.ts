import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";

// Resolution order:
//   1. agent.model override (set by manifest, e.g. "claude-sonnet-4-6")
//   2. LLM_PROVIDER env (`anthropic` | `lmstudio`, default `lmstudio`)
//   3. OPENAI_MODEL / ANTHROPIC_MODEL env per provider
//
// A model name starting with "claude-" always routes to Anthropic, regardless
// of LLM_PROVIDER. This lets per-agent overrides take effect even when the
// rest of the app stays on LM Studio.

const openai = createOpenAI({
  baseURL: process.env.OPENAI_API_BASE_URL ?? "http://localhost:1234/v1",
  apiKey: process.env.OPENAI_API_KEY ?? "lm-studio",
});

const anthropic = process.env.ANTHROPIC_API_KEY
  ? createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const DEFAULT_LMSTUDIO_MODEL = process.env.OPENAI_MODEL ?? "local-model";
const DEFAULT_ANTHROPIC_MODEL =
  process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";

export type Provider = "anthropic" | "lmstudio";

export function resolveProvider(agentModel?: string): Provider {
  if (agentModel?.startsWith("claude-")) return "anthropic";
  const env = process.env.LLM_PROVIDER?.toLowerCase();
  if (env === "anthropic") return "anthropic";
  return "lmstudio";
}

export function getModel(agentModel?: string): LanguageModel {
  const provider = resolveProvider(agentModel);
  if (provider === "anthropic") {
    if (!anthropic) {
      throw new Error(
        "ANTHROPIC_API_KEY manquant : impossible d'utiliser le provider Anthropic.",
      );
    }
    const modelId =
      agentModel && agentModel.startsWith("claude-")
        ? agentModel
        : DEFAULT_ANTHROPIC_MODEL;
    return anthropic(modelId);
  }
  // LM Studio (OpenAI-compatible)
  const modelId =
    agentModel && !agentModel.startsWith("claude-") && agentModel !== "local-model"
      ? agentModel
      : DEFAULT_LMSTUDIO_MODEL;
  // Force the Chat Completions API. Calling openai(modelId) defaults to the
  // Responses API (/v1/responses), which LM Studio does not implement — it
  // rejects tool calls with "Invalid type for 'input'" (invalid_union).
  return openai.chat(modelId);
}
