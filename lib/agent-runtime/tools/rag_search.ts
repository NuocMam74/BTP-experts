import { tool } from "ai";
import { z } from "zod";

import { rawDb } from "@/lib/db/client";
import { embed, embeddingToBuffer, EmbeddingError } from "@/lib/llm/embeddings";

type KnnRow = { chunk_id: string; distance: number };
type FtsRow = { chunk_id: string; bm25: number };
type ChunkRow = {
  id: string;
  source_ref: string;
  source_url: string | null;
  content: string;
};

// Escape an FTS5 MATCH query: split into terms and quote each one so that
// punctuation in user queries doesn't break the MATCH grammar.
function buildFtsQuery(query: string): string {
  const terms = query
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2)
    .slice(0, 12);
  if (terms.length === 0) return "";
  return terms.map((t) => `"${t.replace(/"/g, '""')}"*`).join(" OR ");
}

// Reciprocal Rank Fusion: combines two ranked lists.
// Tuned for k=60 (standard).
function rrf(rankedLists: Array<Array<string>>, k = 60): Map<string, number> {
  const scores = new Map<string, number>();
  for (const list of rankedLists) {
    list.forEach((id, idx) => {
      const prev = scores.get(id) ?? 0;
      scores.set(id, prev + 1 / (k + idx + 1));
    });
  }
  return scores;
}

export function makeRagSearchTool(namespace: string) {
  return tool({
    description:
      "Recherche hybride (sémantique + lexicale BM25) dans le corpus normatif de l'agent (Eurocodes, CCH, arrêtés, DTU, BOFIP, méthodologies UNTEC, etc.). Retourne les passages les plus pertinents avec leur référence d'origine. À utiliser systématiquement avant toute affirmation réglementaire.",
    inputSchema: z.object({
      query: z
        .string()
        .min(3)
        .describe(
          "La requête en langage naturel — formuler comme une question normative précise.",
        ),
      top_k: z
        .number()
        .int()
        .min(1)
        .max(10)
        .default(5)
        .describe("Nombre de passages à retourner"),
    }),
    execute: async ({ query, top_k }) => {
      const countRow = rawDb
        .prepare(
          "SELECT COUNT(*) as n FROM corpus_chunks WHERE agent_namespace = ?",
        )
        .get(namespace) as { n: number };

      if (countRow.n === 0) {
        return {
          results: [],
          warning: `Corpus de l'agent "${namespace}" pas encore indexé. Aucun passage normatif disponible — préviens explicitement l'utilisateur dans ta réponse et n'invente aucune référence.`,
          query,
        };
      }

      const overfetch = Math.min(Math.max(top_k * 5, 10), 50);

      // --- Vector branch.
      let vecIds: string[] = [];
      let vecDistance = new Map<string, number>();
      let vectorWarning: string | undefined;
      try {
        const queryVec = await embed(query);
        const queryBuf = embeddingToBuffer(queryVec);
        const knnRows = rawDb
          .prepare(
            `SELECT chunk_id, distance
               FROM corpus_chunks_vec
               WHERE embedding MATCH ? AND k = ${overfetch}`,
          )
          .all(queryBuf) as KnnRow[];
        vecIds = knnRows.map((r) => r.chunk_id);
        vecDistance = new Map(knnRows.map((r) => [r.chunk_id, r.distance]));
      } catch (err) {
        if (err instanceof EmbeddingError) {
          vectorWarning =
            "Branche sémantique indisponible (embeddings hors-ligne) : " +
            err.message;
        } else {
          throw err;
        }
      }

      // --- BM25 branch (FTS5).
      const ftsQuery = buildFtsQuery(query);
      let ftsIds: string[] = [];
      if (ftsQuery.length > 0) {
        try {
          const ftsRows = rawDb
            .prepare(
              `SELECT chunk_id, bm25(corpus_chunks_fts) as bm25
                 FROM corpus_chunks_fts
                 WHERE corpus_chunks_fts MATCH ? AND agent_namespace = ?
                 ORDER BY bm25
                 LIMIT ?`,
            )
            .all(ftsQuery, namespace, overfetch) as FtsRow[];
          ftsIds = ftsRows.map((r) => r.chunk_id);
        } catch {
          // FTS may not support the query — silently skip the lexical branch.
        }
      }

      if (vecIds.length === 0 && ftsIds.length === 0) {
        return {
          results: [],
          warning:
            vectorWarning ??
            "Aucun passage similaire trouvé dans le corpus.",
          query,
        };
      }

      // --- RRF fusion of the two ranked lists.
      const fused = rrf([vecIds, ftsIds]);
      const orderedIds = [...fused.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, top_k * 2)
        .map(([id]) => id);

      if (orderedIds.length === 0) {
        return { results: [], warning: vectorWarning, query };
      }

      const placeholders = orderedIds.map(() => "?").join(",");
      const chunks = rawDb
        .prepare(
          `SELECT id, source_ref, source_url, content
             FROM corpus_chunks
             WHERE id IN (${placeholders}) AND agent_namespace = ?`,
        )
        .all(...orderedIds, namespace) as ChunkRow[];

      const chunkById = new Map(chunks.map((c) => [c.id, c]));
      const results = orderedIds
        .map((id) => chunkById.get(id))
        .filter((c): c is ChunkRow => Boolean(c))
        .slice(0, top_k)
        .map((c) => ({
          source_ref: c.source_ref,
          source_url: c.source_url,
          content: c.content,
          distance: vecDistance.get(c.id),
        }));

      return {
        results,
        query,
        corpus_size: countRow.n,
        retrieved: results.length,
        mode: vecIds.length > 0 && ftsIds.length > 0 ? "hybrid" : vecIds.length > 0 ? "vector" : "lexical",
        warning: vectorWarning,
      };
    },
  });
}
