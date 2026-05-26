import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as sqliteVec from "sqlite-vec";
import path from "node:path";
import fs from "node:fs";

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
  // eslint-disable-next-line no-console
  console.info(`[db] sqlite-vec loaded — version ${vecRow?.version ?? "unknown"}`);
}

sqlite.exec(`
  CREATE VIRTUAL TABLE IF NOT EXISTS corpus_chunks_vec
  USING vec0(
    chunk_id TEXT PRIMARY KEY,
    embedding FLOAT[1024]
  );
`);

export const db = drizzle(sqlite, { schema });
export { schema };
export const rawDb = sqlite;
