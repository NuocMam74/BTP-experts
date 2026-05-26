import { tool } from "ai";
import { z } from "zod";

import { rawDb } from "@/lib/db/client";
import { embed, embeddingToBuffer, EmbeddingError } from "@/lib/llm/embeddings";

type KnnRow = { chunk_id: string; distance: number };
type ChunkRow = {
  id: string;
  source_ref: string;
  source_url: string | null;
  content: string;
};

export function makeRagSearchTool(namespace: string) {
  return tool({
    description:
      "Recherche sémantique dans le corpus normatif de l'agent (Eurocodes, CCH, arrêtés, DTU, BOFIP, méthodologies UNTEC, etc.). Retourne les passages les plus pertinents avec leur référence d'origine. À utiliser systématiquement avant toute affirmation réglementaire.",
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

      let queryVec;
      try {
        queryVec = await embed(query);
      } catch (err) {
        if (err instanceof EmbeddingError) {
          return {
            results: [],
            warning:
              "Recherche vectorielle indisponible : " +
              err.message +
              " Réponds en signalant à l'utilisateur que le RAG est temporairement indisponible et n'invente aucune référence.",
            query,
          };
        }
        throw err;
      }

      const queryBuf = embeddingToBuffer(queryVec);
      const overfetch = Math.min(Math.max(top_k * 5, 10), 50);

      const knnRows = rawDb
        .prepare(
          `SELECT chunk_id, distance
             FROM corpus_chunks_vec
             WHERE embedding MATCH ? AND k = ${overfetch}`,
        )
        .all(queryBuf) as KnnRow[];

      if (knnRows.length === 0) {
        return {
          results: [],
          warning: "Aucun passage similaire trouvé dans le corpus.",
          query,
        };
      }

      const chunkIds = knnRows.map((r) => r.chunk_id);
      const placeholders = chunkIds.map(() => "?").join(",");
      const chunks = rawDb
        .prepare(
          `SELECT id, source_ref, source_url, content
             FROM corpus_chunks
             WHERE id IN (${placeholders}) AND agent_namespace = ?`,
        )
        .all(...chunkIds, namespace) as ChunkRow[];

      const distanceById = new Map(knnRows.map((r) => [r.chunk_id, r.distance]));
      const results = chunks
        .map((c) => ({
          source_ref: c.source_ref,
          source_url: c.source_url,
          content: c.content,
          distance: distanceById.get(c.id) ?? Number.POSITIVE_INFINITY,
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, top_k);

      return {
        results,
        query,
        corpus_size: countRow.n,
        retrieved: results.length,
      };
    },
  });
}
