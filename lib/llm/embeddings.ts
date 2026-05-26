import { llm } from "./lmstudio";

export const EMBEDDING_MODEL =
  process.env.EMBEDDING_MODEL ?? "text-embedding-bge-m3";

export const EMBEDDING_DIMENSIONS = Number(
  process.env.EMBEDDING_DIMENSIONS ?? 1024,
);

export class EmbeddingError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "EmbeddingError";
  }
}

export async function embed(text: string): Promise<Float32Array> {
  return (await embedMany([text]))[0]!;
}

export async function embedMany(texts: string[]): Promise<Float32Array[]> {
  if (texts.length === 0) return [];

  let res;
  try {
    res = await llm.embeddings.create({
      model: EMBEDDING_MODEL,
      input: texts,
    });
  } catch (err) {
    throw new EmbeddingError(
      `Embedding via LM Studio a échoué — vérifie qu'un modèle d'embedding "${EMBEDDING_MODEL}" est chargé. Détail : ${err instanceof Error ? err.message : String(err)}`,
      { cause: err },
    );
  }

  const out: Float32Array[] = [];
  for (const item of res.data) {
    if (item.embedding.length !== EMBEDDING_DIMENSIONS) {
      throw new EmbeddingError(
        `Le modèle a renvoyé ${item.embedding.length} dimensions, attendu ${EMBEDDING_DIMENSIONS}. ` +
          `Adapte EMBEDDING_DIMENSIONS ou change de modèle.`,
      );
    }
    out.push(Float32Array.from(item.embedding));
  }
  return out;
}

export function embeddingToBuffer(vec: Float32Array): Buffer {
  return Buffer.from(vec.buffer, vec.byteOffset, vec.byteLength);
}
