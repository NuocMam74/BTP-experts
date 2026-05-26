import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db, schema } from "@/lib/db/client";
import { loadAgent } from "@/lib/agent-runtime/loadManifest";
import { APP_BASE_URL, getStripeClient } from "@/lib/billing/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripe = getStripeClient();
  if (!stripe) {
    return NextResponse.json(
      { error: "Facturation non configurée (STRIPE_SECRET_KEY manquant)" },
      { status: 503 },
    );
  }

  const body = (await req.json()) as { agentSlug?: string };
  if (!body.agentSlug) {
    return NextResponse.json({ error: "agentSlug manquant" }, { status: 400 });
  }

  const agent = await loadAgent(body.agentSlug);
  if (!agent) {
    return NextResponse.json({ error: "Agent inconnu" }, { status: 404 });
  }

  if (!agent.stripe_price_id) {
    return NextResponse.json(
      {
        error: `Agent "${agent.slug}" n'a pas de stripe_price_id dans son manifest.`,
      },
      { status: 400 },
    );
  }

  const user = await db.query.users.findFirst({
    where: eq(schema.users.id, session.user.id),
  });
  if (!user) {
    return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email,
    line_items: [{ price: agent.stripe_price_id, quantity: 1 }],
    success_url: `${APP_BASE_URL}/billing?success=1&agent=${agent.slug}`,
    cancel_url: `${APP_BASE_URL}/billing?canceled=1&agent=${agent.slug}`,
    subscription_data: {
      metadata: {
        userId: user.id,
        agentSlug: agent.slug,
      },
    },
    metadata: {
      userId: user.id,
      agentSlug: agent.slug,
    },
  });

  return NextResponse.json({ url: checkout.url });
}
