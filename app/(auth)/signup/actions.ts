"use server";

import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db, schema } from "@/lib/db/client";
import { hashPassword } from "@/lib/auth/passwords";
import { signIn } from "@/auth";

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
