import { sql } from "drizzle-orm";
import {
  blob,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  fullName: text("full_name"),
  organizationId: text("organization_id").references(() => organizations.id),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const organizations = sqliteTable("organizations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const agents = sqliteTable("agents", {
  slug: text("slug").primaryKey(),
  name: text("name").notNull(),
  tagline: text("tagline"),
  monthlyPriceEur: integer("monthly_price_eur").notNull(),
  stripePriceId: text("stripe_price_id"),
  manifest: text("manifest", { mode: "json" }).notNull(),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const userAgents = sqliteTable(
  "user_agents",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    agentSlug: text("agent_slug")
      .notNull()
      .references(() => agents.slug),
    status: text("status", {
      enum: ["active", "trialing", "past_due", "canceled"],
    }).notNull(),
    stripeSubscriptionId: text("stripe_subscription_id"),
    currentPeriodEnd: integer("current_period_end", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.agentSlug] }),
  }),
);

export const conversations = sqliteTable("conversations", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  agentSlug: text("agent_slug")
    .notNull()
    .references(() => agents.slug),
  title: text("title"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const messages = sqliteTable("messages", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  role: text("role", { enum: ["user", "assistant", "tool", "system"] }).notNull(),
  content: text("content", { mode: "json" }).notNull(),
  toolCalls: text("tool_calls", { mode: "json" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const documents = sqliteTable("documents", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  storagePath: text("storage_path").notNull(),
  filename: text("filename").notNull(),
  mimeType: text("mime_type"),
  parsedText: text("parsed_text"),
  metadata: text("metadata", { mode: "json" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const reports = sqliteTable("reports", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  conversationId: text("conversation_id").references(
    () => conversations.id,
    { onDelete: "set null" },
  ),
  agentSlug: text("agent_slug").references(() => agents.slug),
  format: text("format", {
    enum: ["md", "docx", "xlsx", "pdf", "pptx"],
  }).notNull(),
  title: text("title").notNull(),
  filename: text("filename").notNull(),
  storagePath: text("storage_path").notNull(),
  sizeBytes: integer("size_bytes"),
  metadata: text("metadata", { mode: "json" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const corpusChunks = sqliteTable("corpus_chunks", {
  id: text("id").primaryKey(),
  agentNamespace: text("agent_namespace").notNull(),
  sourceRef: text("source_ref").notNull(),
  sourceUrl: text("source_url"),
  content: text("content").notNull(),
  embedding: blob("embedding").notNull(),
  metadata: text("metadata", { mode: "json" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Agent = typeof agents.$inferSelect;
export type Conversation = typeof conversations.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Document = typeof documents.$inferSelect;
export type CorpusChunk = typeof corpusChunks.$inferSelect;
export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;
