import { LRUCache } from "lru-cache";

import type { AgentManifest, LoadedAgent } from "./types";

const TTL_MS = 5 * 60 * 1000;

export const loadedAgentCache = new LRUCache<string, LoadedAgent>({
  max: 32,
  ttl: TTL_MS,
});

export const listAgentsCache = new LRUCache<string, AgentManifest[]>({
  max: 1,
  ttl: TTL_MS,
});

export function invalidateAgent(slug: string): void {
  loadedAgentCache.delete(slug);
  listAgentsCache.clear();
}

export function invalidateAllAgents(): void {
  loadedAgentCache.clear();
  listAgentsCache.clear();
}
