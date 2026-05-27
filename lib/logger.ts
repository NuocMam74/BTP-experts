import pino, { type Logger } from "pino";

const isDev = process.env.NODE_ENV !== "production";

// Pino is intentionally configured without a transport: pino transports use
// worker threads (`thread-stream`) which Next.js's webpack bundling cannot
// resolve reliably (it tries to require `.next/server/vendor-chunks/lib/worker.js`).
// Plain JSON to stdout is fast, predictable, and works in both `next dev` and
// `next start`. For pretty output in dev, pipe through pino-pretty:
//   npm run dev | npx pino-pretty

export const logger: Logger = pino({
  level: process.env.LOG_LEVEL ?? (isDev ? "debug" : "info"),
  base: { app: "chatbot-btp" },
});

export function childLogger(bindings: Record<string, unknown>): Logger {
  return logger.child(bindings);
}
