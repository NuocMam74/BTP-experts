import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { chunkText } from "@/lib/agent-runtime/chunking";
import { listAgents } from "@/lib/agent-runtime/loadManifest";
import { rawDb } from "@/lib/db/client";
import {
  EMBEDDING_DIMENSIONS,
  EMBEDDING_MODEL,
  embedMany,
  embeddingToBuffer,
} from "@/lib/llm/embeddings";

const BATCH_SIZE = 8;

async function ingestAgent(slug: string): Promise<{
  slug: string;
  files: number;
  chunks: number;
}> {
  const corpusDir = path.join(process.cwd(), "agents", slug, "corpus");
  let entries: string[];
  try {
    entries = await fs.readdir(corpusDir);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      console.info(`[ingest] no corpus directory for agent "${slug}"`);
      return { slug, files: 0, chunks: 0 };
    }
    throw err;
  }

  const mdFiles = entries.filter((e) => e.toLowerCase().endsWith(".md"));
  if (mdFiles.length === 0) {
    console.info(`[ingest] no markdown files for agent "${slug}"`);
    return { slug, files: 0, chunks: 0 };
  }

  console.info(`[ingest] agent "${slug}" — wiping previous chunks…`);
  const tx = rawDb.transaction(() => {
    rawDb
      .prepare(
        `DELETE FROM corpus_chunks_vec
           WHERE chunk_id IN (
             SELECT id FROM corpus_chunks WHERE agent_namespace = ?
           )`,
      )
      .run(slug);
    rawDb
      .prepare("DELETE FROM corpus_chunks WHERE agent_namespace = ?")
      .run(slug);
  });
  tx();

  const insertChunk = rawDb.prepare(`
    INSERT INTO corpus_chunks (id, agent_namespace, source_ref, source_url, content, embedding, metadata, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, unixepoch())
  `);
  const insertVec = rawDb.prepare(`
    INSERT INTO corpus_chunks_vec (chunk_id, embedding)
    VALUES (?, ?)
  `);

  let totalChunks = 0;
  for (const file of mdFiles) {
    const filePath = path.join(corpusDir, file);
    const content = await fs.readFile(filePath, "utf8");
    const sourceRef = `${slug}/${file}`;
    const chunks = chunkText(content);
    console.info(
      `[ingest]   ${sourceRef} → ${chunks.length} chunk(s) (chars ${content.length})`,
    );

    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batch = chunks.slice(i, i + BATCH_SIZE);
      const embeddings = await embedMany(batch.map((c) => c.content));

      const writeBatch = rawDb.transaction(() => {
        batch.forEach((c, idx) => {
          const id = randomUUID();
          const buf = embeddingToBuffer(embeddings[idx]!);
          insertChunk.run(
            id,
            slug,
            sourceRef,
            null,
            c.content,
            buf,
            JSON.stringify({
              file,
              chunkIndex: c.index,
              charStart: c.charStart,
              charEnd: c.charEnd,
            }),
          );
          insertVec.run(id, buf);
        });
      });
      writeBatch();
      totalChunks += batch.length;
    }
  }

  return { slug, files: mdFiles.length, chunks: totalChunks };
}

async function main() {
  const argSlug = process.argv[2];
  console.info(
    `[ingest] embedding model "${EMBEDDING_MODEL}" (${EMBEDDING_DIMENSIONS}d)`,
  );

  let agentSlugs: string[];
  if (argSlug) {
    agentSlugs = [argSlug];
  } else {
    const all = await listAgents();
    agentSlugs = all.map((a) => a.slug);
  }

  const results = [];
  for (const slug of agentSlugs) {
    try {
      const r = await ingestAgent(slug);
      results.push(r);
    } catch (err) {
      console.error(`[ingest] FAILED for "${slug}":`, err);
      results.push({ slug, files: 0, chunks: 0, error: String(err) });
    }
  }

  console.info("\n[ingest] summary:");
  for (const r of results) {
    console.info(`  ${r.slug}: ${r.files} file(s), ${r.chunks} chunk(s)`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
