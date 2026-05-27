// Next.js instrumentation entry — loaded once at server boot.
// Used by Sentry to register the server/edge runtimes when SENTRY_DSN is set.

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export async function onRequestError(
  err: unknown,
  request: Parameters<NonNullable<typeof import("@sentry/nextjs").captureRequestError>>[1],
  errorContext: Parameters<NonNullable<typeof import("@sentry/nextjs").captureRequestError>>[2],
) {
  if (process.env.SENTRY_DSN) {
    const Sentry = await import("@sentry/nextjs");
    Sentry.captureRequestError(err, request, errorContext);
  }
}
