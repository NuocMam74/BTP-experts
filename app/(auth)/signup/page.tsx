"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

import { signupAction, type SignupState } from "./actions";

const initialState: SignupState = {};

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
          Création…
        </>
      ) : (
        "Créer le compte"
      )}
    </button>
  );
}

export default function SignupPage() {
  const [state, action] = useFormState(signupAction, initialState);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem-3rem)] max-w-md flex-col justify-center px-6 py-10">
      <div className="card-elevated rounded-md p-8">
        <h1 className="text-xl font-semibold tracking-tight">Création de compte</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Accès immédiat aux agents en mode développement.
        </p>

        <form action={action} className="mt-6 space-y-4">
          <div>
            <label htmlFor="fullName" className="mb-1.5 block text-xs font-medium">
              Nom complet
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              className="input-field"
              placeholder="Jean Dupont"
            />
            {state.fieldErrors?.fullName?.[0] && (
              <p className="mt-1 text-[11px] text-red-400">
                {state.fieldErrors.fullName[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium">
              Email professionnel
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
            {state.fieldErrors?.email?.[0] && (
              <p className="mt-1 text-[11px] text-red-400">
                {state.fieldErrors.email[0]}
              </p>
            )}
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
              minLength={8}
              autoComplete="new-password"
              className="input-field"
              placeholder="8 caractères minimum"
            />
            {state.fieldErrors?.password?.[0] && (
              <p className="mt-1 text-[11px] text-red-400">
                {state.fieldErrors.password[0]}
              </p>
            )}
          </div>

          {state.error && (
            <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {state.error}
            </div>
          )}

          <SubmitButton />
        </form>

        <div className="mt-6 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          Déjà un compte ?{" "}
          <Link href="/signin" className="font-medium text-foreground hover:underline">
            Se connecter
          </Link>
        </div>
      </div>
    </main>
  );
}
