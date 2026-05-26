import Link from "next/link";

import { auth, signOut } from "@/auth";

export async function HeaderUserBadge() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div className="flex items-center gap-2 text-[13px]">
        <Link href="/signin" className="btn-ghost">
          Connexion
        </Link>
        <Link href="/signup" className="btn-primary">
          Inscription
        </Link>
      </div>
    );
  }

  const initials = (session.user.fullName ?? session.user.email ?? "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
      className="flex items-center gap-2 text-[13px]"
    >
      <div
        className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface text-[11px] font-semibold text-foreground"
        title={session.user.fullName ?? session.user.email ?? undefined}
      >
        {initials}
      </div>
      <button
        type="submit"
        className="btn-ghost"
        title="Se déconnecter"
        aria-label="Se déconnecter"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M16 17l5-5-5-5" />
          <path d="M21 12H9" />
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        </svg>
      </button>
    </form>
  );
}
