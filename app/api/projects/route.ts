import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { desc, eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db, schema } from "@/lib/db/client";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await db
    .select()
    .from(schema.projects)
    .where(eq(schema.projects.userId, session.user.id))
    .orderBy(desc(schema.projects.createdAt));
  return NextResponse.json({ projects: rows });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as { name?: string; color?: string };
  const name = body.name?.trim();
  if (!name) {
    return NextResponse.json({ error: "name required" }, { status: 400 });
  }
  const id = randomUUID();
  await db.insert(schema.projects).values({
    id,
    userId: session.user.id,
    name: name.slice(0, 120),
    color: body.color?.slice(0, 24) ?? null,
  });
  return NextResponse.json({ id, name, color: body.color ?? null });
}
