import OpenAI from "openai";

const baseURL = process.env.OPENAI_API_BASE_URL ?? "http://localhost:1234/v1";
const apiKey = process.env.OPENAI_API_KEY ?? "lm-studio";

export const llm = new OpenAI({
  baseURL,
  apiKey,
});

export const DEFAULT_MODEL =
  process.env.OPENAI_MODEL ?? "local-model";

export async function pingLmStudio(): Promise<{
  ok: boolean;
  models?: string[];
  error?: string;
}> {
  try {
    const res = await llm.models.list();
    return { ok: true, models: res.data.map((m) => m.id) };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
