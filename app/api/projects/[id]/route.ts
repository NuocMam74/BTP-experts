import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db, schema } from "@/lib/db/client";

export const runtime = "nodejs";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await db
    .delete(schema.projects)
    .where(
      and(
        eq(schema.projects.id, params.id),
        eq(schema.projects.userId, session.user.id),
      ),
    );
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as { name?: string; color?: string };
  const updates: { name?: string; color?: string | null } = {};
  if (body.name !== undefined) updates.name = body.name.slice(0, 120);
  if (body.color !== undefined) updates.color = body.color?.slice(0, 24) ?? null;
  await db
    .update(schema.projects)
    .set(updates)
    .where(
      and(
        eq(schema.projects.id, params.id),
        eq(schema.projects.userId, session.user.id),
      ),
    );
  return NextResponse.json({ ok: true });
}
