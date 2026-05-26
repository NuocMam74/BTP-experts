import { and, eq } from "drizzle-orm";

import { db, schema } from "@/lib/db/client";
import { isStripeConfigured } from "./stripe";

export type EntitlementStatus =
  | { allowed: true; reason: "stripe_disabled" }
  | { allowed: true; reason: "active_subscription"; expiresAt: Date | null }
  | { allowed: true; reason: "trialing"; expiresAt: Date | null }
  | { allowed: false; reason: "no_subscription" }
  | { allowed: false; reason: "past_due"; expiresAt: Date | null }
  | { allowed: false; reason: "canceled"; expiresAt: Date | null };

export async function checkEntitlement(
  userId: string,
  agentSlug: string,
): Promise<EntitlementStatus> {
  if (!isStripeConfigured()) {
    return { allowed: true, reason: "stripe_disabled" };
  }

  const row = await db.query.userAgents.findFirst({
    where: and(
      eq(schema.userAgents.userId, userId),
      eq(schema.userAgents.agentSlug, agentSlug),
    ),
  });

  if (!row) return { allowed: false, reason: "no_subscription" };

  switch (row.status) {
    case "active":
      return {
        allowed: true,
        reason: "active_subscription",
        expiresAt: row.currentPeriodEnd,
      };
    case "trialing":
      return {
        allowed: true,
        reason: "trialing",
        expiresAt: row.currentPeriodEnd,
      };
    case "past_due":
      return {
        allowed: false,
        reason: "past_due",
        expiresAt: row.currentPeriodEnd,
      };
    case "canceled":
      return {
        allowed: false,
        reason: "canceled",
        expiresAt: row.currentPeriodEnd,
      };
    default:
      return { allowed: false, reason: "no_subscription" };
  }
}
