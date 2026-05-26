"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";

export type SigninState = { error?: string };

export async function signinAction(
  _prev: SigninState,
  formData: FormData,
): Promise<SigninState> {
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
