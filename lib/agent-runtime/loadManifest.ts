import fs from "node:fs/promises";
import path from "node:path";

import { withSharedGuardrails } from "./preambule";
import {
  agentManifestSchema,
  type AgentManifest,
  type LoadedAgent,
} from "./types";

const AGENTS_DIR = path.join(process.cwd(), "agents");

export async function listAgents(): Promise<AgentManifest[]> {
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
        // eslint-disable-next-line no-console
        console.warn(
          `[agents] invalid manifest for "${slug}": ${parsed.error.message}`,
        );
      }
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
        // eslint-disable-next-line no-console
        console.warn(`[agents] failed to load "${slug}":`, err);
      }
    }
  }
  return manifests.sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

export async function loadAgent(slug: string): Promise<LoadedAgent | null> {
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

  return { ...manifest, systemPrompt, rootPath };
}
