"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

import { signinAction, type SigninState } from "./actions";

const initialState: SigninState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary w-full justify-center"
    >
      {pending ? (
        <>
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
          </svg>
          Connexion…
        </>
      ) : (
        "Se connecter"
      )}
    </button>
  );
}

export default function SigninPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const [state, action] = useFormState(signinAction, initialState);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem-3rem)] max-w-md flex-col justify-center px-6 py-10">
      <div className="card-elevated rounded-md p-8">
        <h1 className="text-xl font-semibold tracking-tight">Connexion</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Accédez à vos agents et conversations.
        </p>

        <form action={action} className="mt-6 space-y-4">
          <input type="hidden" name="callbackUrl" value={callbackUrl} />

          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="input-field"
              placeholder="vous@cabinet.fr"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          {state.error && (
            <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {state.error}
            </div>
          )}

          <SubmitButton />
        </form>

        <div className="mt-6 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link href="/signup" className="font-medium text-foreground hover:underline">
            Créer un compte
          </Link>
        </div>
      </div>
    </main>
  );
}
