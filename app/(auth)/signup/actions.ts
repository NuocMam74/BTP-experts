"use server";

import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { z } from "zod";

import { db, schema } from "@/lib/db/client";
import { hashPassword } from "@/lib/auth/passwords";
import { signIn } from "@/auth";
import { checkRateLimit } from "@/lib/rate-limit";

function callerIp(): string {
  const h = headers();
  const xf = h.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}

const signupSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "8 caractères minimum"),
  fullName: z.string().min(2, "Nom requis").max(100),
});

export type SignupState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function signupAction(
  _prev: SignupState,
  formData: FormData,
): Promise<SignupState> {
  // Throttle account creation per IP to prevent automated mass sign-ups
  // (which would also burn local GPU/LLM resources).
  const rl = checkRateLimit(`signup:${callerIp()}`, 5, 60_000);
  if (!rl.allowed) {
    return { error: "Trop de tentatives. Réessayez dans une minute." };
  }

  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    fullName: formData.get("fullName"),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { email, password, fullName } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const existing = await db.query.users.findFirst({
    where: eq(schema.users.email, normalizedEmail),
  });
  if (existing) {
    return { error: "Un compte existe déjà avec cet email." };
  }

  const passwordHash = await hashPassword(password);
  await db.insert(schema.users).values({
    id: randomUUID(),
    email: normalizedEmail,
    passwordHash,
    fullName,
  });

  await signIn("credentials", {
    email: normalizedEmail,
    password,
    redirectTo: "/",
  });

  redirect("/");
}
