import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: [
      "better-sqlite3",
      "sqlite-vec",
      "pino",
      "pino-pretty",
      "thread-stream",
      // Native .node binary — must be require()d at runtime, not webpack-bundled
      // (used by lib/parsers/pdf.ts to render PDF pages to images for vision).
      "@napi-rs/canvas",
      // pdfkit reads its AFM font files via `fs.readFileSync(__dirname + '/data/*.afm')`.
      // Bundled by webpack, __dirname points into .next/ where those files don't exist
      // → ENOENT on every PDF report. Externalize so it's required from node_modules.
      "pdfkit",
      "fontkit",
    ],
    serverActions: { bodySizeLimit: "25mb" },
  },
};

// Sentry is opt-in: when SENTRY_DSN is unset we export the bare config.
// withSentryConfig is still safe to call without a DSN (it just no-ops the
// source-map upload), but skipping it keeps the build dependency-free for
// users who don't want Sentry at all.
const config = process.env.SENTRY_DSN
  ? withSentryConfig(nextConfig, {
      silent: true,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      tunnelRoute: "/monitoring",
      disableLogger: true,
    })
  : nextConfig;

export default config;
