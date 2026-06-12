"use server";

import { AuthError } from "next-auth";
import { headers } from "next/headers";

import { signIn } from "@/auth";
import { checkRateLimit } from "@/lib/rate-limit";

export type SigninState = { error?: string };

function callerIp(): string {
  const h = headers();
  const xf = h.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}

export async function signinAction(
  _prev: SigninState,
  formData: FormData,
): Promise<SigninState> {
  // Throttle login attempts per IP to blunt credential-stuffing / brute force.
  const rl = checkRateLimit(`signin:${callerIp()}`, 10, 60_000);
  if (!rl.allowed) {
    return { error: "Trop de tentatives. Réessayez dans une minute." };
  }

  const email = formData.get("email");
  const password = formData.get("password");
  const callbackUrl =
    typeof formData.get("callbackUrl") === "string"
      ? (formData.get("callbackUrl") as string)
      : "/";

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl,
    });
    return {};
  } catch (err) {
    if (err instanceof AuthError) {
      if (err.type === "CredentialsSignin") {
        return { error: "Email ou mot de passe incorrect." };
      }
      return { error: "Erreur d'authentification." };
    }
    throw err;
  }
}
