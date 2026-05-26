import type { NextAuthConfig } from "next-auth";

export const authConfig = {
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
