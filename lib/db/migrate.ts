import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "node:path";

import { db } from "./client";

const migrationsFolder = path.join(process.cwd(), "drizzle");

migrate(db, { migrationsFolder });

// eslint-disable-next-line no-console
console.info(`[migrate] applied migrations from ${migrationsFolder}`);
