import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { pingLmStudio } from "@/lib/llm/lmstudio";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const status = await pingLmStudio();
  return NextResponse.json(status);
}
