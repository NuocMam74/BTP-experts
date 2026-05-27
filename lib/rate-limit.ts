// Sliding-window in-memory rate limiter — process-local.
// Suitable for single-instance Next.js. Replace with Redis if scaled out.

type Bucket = {
  hits: number[];
};

const buckets = new Map<string, Bucket>();

// Best-effort housekeeping to avoid unbounded growth.
const MAX_KEYS = 5000;

function gc(now: number, windowMs: number) {
  if (buckets.size < MAX_KEYS) return;
  for (const [key, b] of buckets) {
    b.hits = b.hits.filter((t) => now - t < windowMs);
    if (b.hits.length === 0) buckets.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetMs: number;
  limit: number;
};

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { hits: [] };
    buckets.set(key, bucket);
    gc(now, windowMs);
  }
  // Drop expired hits.
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);
  if (bucket.hits.length >= limit) {
    const oldest = bucket.hits[0] ?? now;
    return {
      allowed: false,
      remaining: 0,
      resetMs: Math.max(0, windowMs - (now - oldest)),
      limit,
    };
  }
  bucket.hits.push(now);
  return {
    allowed: true,
    remaining: limit - bucket.hits.length,
    resetMs: windowMs,
    limit,
  };
}

export function clientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}
