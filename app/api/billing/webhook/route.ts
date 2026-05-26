import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import type Stripe from "stripe";

import { db, schema } from "@/lib/db/client";
import { getStripeClient } from "@/lib/billing/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = getStripeClient();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe non configuré" },
      { status: 503 },
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET non configuré" },
      { status: 503 },
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Signature Stripe manquante" },
      { status: 400 },
    );
  }

  const payload = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      {
        error: `Signature webhook invalide : ${err instanceof Error ? err.message : String(err)}`,
      },
      { status: 400 },
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const sess = event.data.object as Stripe.Checkout.Session;
      const userId = sess.metadata?.userId;
      const agentSlug = sess.metadata?.agentSlug;
      const subscriptionId =
        typeof sess.subscription === "string" ? sess.subscription : null;

      if (userId && agentSlug && subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        await upsertUserAgent({
          userId,
          agentSlug,
          status: mapStripeStatus(subscription.status),
          subscriptionId,
          currentPeriodEnd: extractPeriodEnd(subscription),
        });
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.userId;
      const agentSlug = sub.metadata?.agentSlug;
      if (userId && agentSlug) {
        await upsertUserAgent({
          userId,
          agentSlug,
          status: mapStripeStatus(sub.status),
          subscriptionId: sub.id,
          currentPeriodEnd: extractPeriodEnd(sub),
        });
      }
      break;
    }
    default:
      // Ignore other events
      break;
  }

  return NextResponse.json({ received: true });
}

type UpsertUserAgent = {
  userId: string;
  agentSlug: string;
  status: "active" | "trialing" | "past_due" | "canceled";
  subscriptionId: string;
  currentPeriodEnd: Date | null;
};

async function upsertUserAgent(args: UpsertUserAgent) {
  const existing = await db.query.userAgents.findFirst({
    where: and(
      eq(schema.userAgents.userId, args.userId),
      eq(schema.userAgents.agentSlug, args.agentSlug),
    ),
  });

  if (existing) {
    await db
      .update(schema.userAgents)
      .set({
        status: args.status,
        stripeSubscriptionId: args.subscriptionId,
        currentPeriodEnd: args.currentPeriodEnd,
      })
      .where(
        and(
          eq(schema.userAgents.userId, args.userId),
          eq(schema.userAgents.agentSlug, args.agentSlug),
        ),
      );
  } else {
    await db.insert(schema.userAgents).values({
      userId: args.userId,
      agentSlug: args.agentSlug,
      status: args.status,
      stripeSubscriptionId: args.subscriptionId,
      currentPeriodEnd: args.currentPeriodEnd,
    });
  }
}

function mapStripeStatus(
  status: Stripe.Subscription.Status,
): "active" | "trialing" | "past_due" | "canceled" {
  switch (status) {
    case "active":
      return "active";
    case "trialing":
      return "trialing";
    case "past_due":
    case "unpaid":
    case "incomplete":
    case "incomplete_expired":
      return "past_due";
    case "canceled":
    case "paused":
    default:
      return "canceled";
  }
}

function extractPeriodEnd(sub: Stripe.Subscription): Date | null {
  const item = sub.items?.data?.[0];
  const end =
    (item as unknown as { current_period_end?: number } | undefined)
      ?.current_period_end ??
    (sub as unknown as { current_period_end?: number }).current_period_end;
  return typeof end === "number" ? new Date(end * 1000) : null;
}
