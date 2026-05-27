import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as sqliteVec from "sqlite-vec";
import path from "node:path";
import fs from "node:fs";

import { logger } from "@/lib/logger";

import * as schema from "./schema";

const DB_PATH =
  process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "app.db");

function ensureDir(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

ensureDir(DB_PATH);

const sqlite = new Database(DB_PATH);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

sqliteVec.load(sqlite);

const vecRow = sqlite
  .prepare("SELECT vec_version() as version")
  .get() as { version: string } | undefined;
if (process.env.NODE_ENV !== "production") {
  logger.info({ vec: vecRow?.version }, "sqlite-vec loaded");
}

sqlite.exec(`
  CREATE VIRTUAL TABLE IF NOT EXISTS corpus_chunks_vec
  USING vec0(
    chunk_id TEXT PRIMARY KEY,
    embedding FLOAT[1024]
  );
`);

// --- Idempotent bootstrap for tables added after the initial drizzle migrations.
// Keeps the local-first SQLite app self-healing without forcing the user to run
// db:generate every time.
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    color TEXT,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  );
`);

// Add columns to conversations if missing (project_id, tags JSON).
function columnExists(table: string, column: string): boolean {
  const cols = sqlite
    .prepare(`PRAGMA table_info(${table})`)
    .all() as Array<{ name: string }>;
  return cols.some((c) => c.name === column);
}

if (!columnExists("conversations", "project_id")) {
  sqlite.exec(`ALTER TABLE conversations ADD COLUMN project_id TEXT REFERENCES projects(id) ON DELETE SET NULL;`);
}
if (!columnExists("conversations", "tags")) {
  sqlite.exec(`ALTER TABLE conversations ADD COLUMN tags TEXT;`);
}

// --- FTS5 virtual table for full-text search across messages.
// Stores message_id, conversation_id, user_id, agent_slug as unindexed columns
// for cheap filtering, and content as the indexed FTS column. We mirror inserts
// from messages via triggers below.
sqlite.exec(`
  CREATE VIRTUAL TABLE IF NOT EXISTS messages_fts USING fts5(
    content,
    message_id UNINDEXED,
    conversation_id UNINDEXED,
    role UNINDEXED,
    tokenize = 'unicode61 remove_diacritics 2'
  );
`);

// Triggers: keep FTS index in sync with messages table.
// content is stored as JSON {"text":"..."} so we extract via json_extract.
sqlite.exec(`
  CREATE TRIGGER IF NOT EXISTS messages_fts_insert AFTER INSERT ON messages
  BEGIN
    INSERT INTO messages_fts(content, message_id, conversation_id, role)
    VALUES (
      COALESCE(json_extract(NEW.content, '$.text'), ''),
      NEW.id,
      NEW.conversation_id,
      NEW.role
    );
  END;

  CREATE TRIGGER IF NOT EXISTS messages_fts_delete AFTER DELETE ON messages
  BEGIN
    DELETE FROM messages_fts WHERE message_id = OLD.id;
  END;

  CREATE TRIGGER IF NOT EXISTS messages_fts_update AFTER UPDATE ON messages
  BEGIN
    DELETE FROM messages_fts WHERE message_id = OLD.id;
    INSERT INTO messages_fts(content, message_id, conversation_id, role)
    VALUES (
      COALESCE(json_extract(NEW.content, '$.text'), ''),
      NEW.id,
      NEW.conversation_id,
      NEW.role
    );
  END;
`);

// --- FTS5 over corpus_chunks (BM25 side of hybrid search).
sqlite.exec(`
  CREATE VIRTUAL TABLE IF NOT EXISTS corpus_chunks_fts USING fts5(
    content,
    chunk_id UNINDEXED,
    agent_namespace UNINDEXED,
    source_ref UNINDEXED,
    tokenize = 'unicode61 remove_diacritics 2'
  );

  CREATE TRIGGER IF NOT EXISTS corpus_chunks_fts_insert AFTER INSERT ON corpus_chunks
  BEGIN
    INSERT INTO corpus_chunks_fts(content, chunk_id, agent_namespace, source_ref)
    VALUES (NEW.content, NEW.id, NEW.agent_namespace, NEW.source_ref);
  END;

  CREATE TRIGGER IF NOT EXISTS corpus_chunks_fts_delete AFTER DELETE ON corpus_chunks
  BEGIN
    DELETE FROM corpus_chunks_fts WHERE chunk_id = OLD.id;
  END;

  CREATE TRIGGER IF NOT EXISTS corpus_chunks_fts_update AFTER UPDATE ON corpus_chunks
  BEGIN
    DELETE FROM corpus_chunks_fts WHERE chunk_id = OLD.id;
    INSERT INTO corpus_chunks_fts(content, chunk_id, agent_namespace, source_ref)
    VALUES (NEW.content, NEW.id, NEW.agent_namespace, NEW.source_ref);
  END;
`);

// Backfill FTS tables on first boot if they are empty but messages/chunks already exist.
function backfillIfEmpty(ftsTable: string, sourceTable: string, contentExpr: string, columns: string) {
  const count = sqlite
    .prepare(`SELECT COUNT(*) as n FROM ${ftsTable}`)
    .get() as { n: number };
  const sourceCount = sqlite
    .prepare(`SELECT COUNT(*) as n FROM ${sourceTable}`)
    .get() as { n: number };
  if (count.n === 0 && sourceCount.n > 0) {
    sqlite.exec(
      `INSERT INTO ${ftsTable}(${columns}) SELECT ${contentExpr} FROM ${sourceTable};`,
    );
    logger.info({ ftsTable, rows: sourceCount.n }, "FTS backfilled");
  }
}

backfillIfEmpty(
  "messages_fts",
  "messages",
  "COALESCE(json_extract(content, '$.text'), ''), id, conversation_id, role",
  "content, message_id, conversation_id, role",
);
backfillIfEmpty(
  "corpus_chunks_fts",
  "corpus_chunks",
  "content, id, agent_namespace, source_ref",
  "content, chunk_id, agent_namespace, source_ref",
);

export const db = drizzle(sqlite, { schema });
export { schema };
export const rawDb = sqlite;
