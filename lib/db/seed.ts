import { sql } from "drizzle-orm";

import { listAgents } from "@/lib/agent-runtime/loadManifest";

import { db, schema } from "./client";

let didSeed = false;

export async function seedAgentsFromFilesystem() {
  if (didSeed) return;
  didSeed = true;

  const manifests = await listAgents();
  if (manifests.length === 0) return;

  for (const manifest of manifests) {
    await db
      .insert(schema.agents)
      .values({
        slug: manifest.slug,
        name: manifest.name,
        tagline: manifest.tagline,
        monthlyPriceEur: manifest.monthly_price_eur,
        stripePriceId: manifest.stripe_price_id ?? null,
        manifest,
        isActive: true,
      })
      .onConflictDoUpdate({
        target: schema.agents.slug,
        set: {
          name: manifest.name,
          tagline: manifest.tagline,
          monthlyPriceEur: manifest.monthly_price_eur,
          manifest,
        },
      });
  }

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info(`[seed] synced ${manifests.length} agent(s) from filesystem`);
  }
}

export async function isDbReady(): Promise<boolean> {
  try {
    await db.run(sql`SELECT 1`);
    return true;
  } catch {
    return false;
  }
}
