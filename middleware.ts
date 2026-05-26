import NextAuth from "next-auth";

import { authConfig } from "./auth.config";

const { auth: nextAuthMiddleware } = NextAuth(authConfig);

export default nextAuthMiddleware((req) => {
  const isProtected =
    req.nextUrl.pathname === "/chat" ||
    req.nextUrl.pathname.startsWith("/chat/") ||
    req.nextUrl.pathname === "/billing" ||
    req.nextUrl.pathname.startsWith("/api/chat") ||
    req.nextUrl.pathname.startsWith("/api/upload") ||
    req.nextUrl.pathname.startsWith("/api/billing/checkout");

  if (isProtected && !req.auth) {
    const signinUrl = new URL("/signin", req.nextUrl);
    signinUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(signinUrl);
  }
});

export const config = {
  matcher: [
    "/chat",
    "/chat/:path*",
    "/billing",
    "/api/chat/:path*",
    "/api/upload/:path*",
    "/api/billing/checkout/:path*",
  ],
};
