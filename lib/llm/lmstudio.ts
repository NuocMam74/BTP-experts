import OpenAI from "openai";

const baseURL = process.env.OPENAI_API_BASE_URL ?? "http://localhost:1234/v1";
const apiKey = process.env.OPENAI_API_KEY ?? "lm-studio";

export const llm = new OpenAI({
  baseURL,
  apiKey,
});

export const DEFAULT_MODEL = process.env.OPENAI_MODEL ?? "local-model";

export const LM_STUDIO_BASE_URL = baseURL;

export type LmStudioStatus = {
  ok: boolean;
  models?: string[];
  error?: string;
  baseURL: string;
};

type CacheEntry = { value: LmStudioStatus; expires: number };
let cache: CacheEntry | null = null;
let inflight: Promise<LmStudioStatus> | null = null;

const TTL_OK_MS = 30_000;
const TTL_KO_MS = 5_000;

async function probe(): Promise<LmStudioStatus> {
  try {
    const res = await llm.models.list();
    return { ok: true, models: res.data.map((m) => m.id), baseURL };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
      baseURL,
    };
  }
}

export async function pingLmStudio(force = false): Promise<LmStudioStatus> {
  const now = Date.now();
  if (!force && cache && cache.expires > now) return cache.value;
  if (inflight) return inflight;

  inflight = (async () => {
    const result = await probe();
    cache = {
      value: result,
      expires: now + (result.ok ? TTL_OK_MS : TTL_KO_MS),
    };
    inflight = null;
    return result;
  })();
  return inflight;
}

export function invalidateLmStudioStatus(): void {
  cache = null;
}
