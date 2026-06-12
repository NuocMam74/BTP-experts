import { withSentryConfig } from "@sentry/nextjs";

// Content-Security-Policy. Pragmatic, not maximal: Next.js App Router injects
// inline bootstrap scripts (no nonce wired up) and KaTeX/Tailwind inject inline
// styles, so 'unsafe-inline' is required for script/style or the app breaks.
// data:/blob: are allowed for images, fonts and the PDF-preview iframe.
// connect-src 'self' is enough — the browser only talks to our own API (the IGN
// PLU calls happen server-side). If something legitimate gets blocked, relax the
// specific directive here (or remove this header) rather than disabling all CSP.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self' blob: data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
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
