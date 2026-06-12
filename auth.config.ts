import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  // Self-hosted (LM Studio / on-prem, not Vercel): Auth.js v5 does NOT trust the
  // incoming Host header in production unless told to. Without this, `next start`
  // throws "UntrustedHost" on every /api/auth/session call, `auth()` returns null,
  // and protected pages fall through to notFound() (404). Required for any non-Vercel
  // deployment served over its own host (localhost, LAN, custom domain).
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
  providers: [],
  callbacks: {
    async session({ session, token }) {
      if (token.userId) {
        session.user.id = String(token.userId);
        (session.user as { fullName?: string | null }).fullName =
          (token.fullName as string | null) ?? null;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
