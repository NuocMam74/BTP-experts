import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import fs from "node:fs/promises";

import { auth } from "@/auth";
import { db, schema } from "@/lib/db/client";
import { getMimeType } from "@/lib/reports";
import type { ReportFormat } from "@/lib/reports/types";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const report = await db.query.reports.findFirst({
    where: and(
      eq(schema.reports.id, params.id),
      eq(schema.reports.userId, session.user.id),
    ),
  });
  if (!report) {
    return NextResponse.json({ error: "Rapport introuvable" }, { status: 404 });
  }

  let buffer: Buffer;
  try {
    buffer = await fs.readFile(report.storagePath);
  } catch (err) {
    return NextResponse.json(
      {
        error: "Fichier de rapport introuvable sur disque",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 410 },
    );
  }

  const safeFilename = encodeURIComponent(report.filename);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": getMimeType(report.format as ReportFormat),
      "Content-Length": String(buffer.length),
      "Content-Disposition": `attachment; filename="${safeFilename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
