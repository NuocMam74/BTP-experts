import fs from "node:fs/promises";
import path from "node:path";

import { logger } from "@/lib/logger";

import { listAgentsCache, loadedAgentCache } from "./manifestCache";
import { withSharedGuardrails } from "./preambule";
import {
  agentManifestSchema,
  type AgentManifest,
  type LoadedAgent,
} from "./types";

const AGENTS_DIR = path.join(process.cwd(), "agents");
const LIST_KEY = "__list__";

export async function listAgents(): Promise<AgentManifest[]> {
  const cached = listAgentsCache.get(LIST_KEY);
  if (cached) return cached;

  let entries: string[];
  try {
    entries = await fs.readdir(AGENTS_DIR);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }

  const manifests: AgentManifest[] = [];
  for (const slug of entries) {
    const manifestPath = path.join(AGENTS_DIR, slug, "manifest.json");
    try {
      const raw = await fs.readFile(manifestPath, "utf8");
      const parsed = agentManifestSchema.safeParse(JSON.parse(raw));
      if (parsed.success) {
        manifests.push(parsed.data);
      } else {
        logger.warn(
          { slug, error: parsed.error.message },
          "agent manifest invalid",
        );
      }
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
        logger.warn({ slug, err }, "failed to load agent manifest");
      }
    }
  }
  const sorted = manifests.sort((a, b) =>
    a.name.localeCompare(b.name, "fr"),
  );
  listAgentsCache.set(LIST_KEY, sorted);
  return sorted;
}

export async function loadAgent(slug: string): Promise<LoadedAgent | null> {
  const cached = loadedAgentCache.get(slug);
  if (cached) return cached;

  const rootPath = path.join(AGENTS_DIR, slug);
  const manifestPath = path.join(rootPath, "manifest.json");

  let raw: string;
  try {
    raw = await fs.readFile(manifestPath, "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }

  const manifest = agentManifestSchema.parse(JSON.parse(raw));
  const systemPromptPath = path.resolve(rootPath, manifest.system_prompt_path);
  const rawSystemPrompt = await fs.readFile(systemPromptPath, "utf8");
  const systemPrompt = withSharedGuardrails(rawSystemPrompt);

  const loaded: LoadedAgent = { ...manifest, systemPrompt, rootPath };
  loadedAgentCache.set(slug, loaded);
  return loaded;
}
