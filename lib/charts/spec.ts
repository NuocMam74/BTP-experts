// Pure parsing/validation for the ```chart fenced blocks emitted by agents.
// Kept free of React so it can be unit-tested and reused by the SVG renderer.

export type ChartType = "bar" | "line" | "pie";

export type ChartSeries = { name: string; data: number[] };

export type ParsedChart = {
  type: ChartType;
  title?: string;
  unit?: string;
  labels: string[];
  series: ChartSeries[];
};

type RawSpec = {
  type?: unknown;
  title?: unknown;
  unit?: unknown;
  labels?: unknown;
  series?: unknown;
};

// Parses + validates raw fence text. Returns null when it isn't a usable chart
// (still streaming, malformed JSON, empty data…) so callers can fall back to
// rendering the raw text instead of throwing.
export function parseChartSpec(raw: string): ParsedChart | null {
  let spec: RawSpec;
  try {
    spec = JSON.parse(raw) as RawSpec;
  } catch {
    return null;
  }
  if (!spec || typeof spec !== "object") return null;

  const type: ChartType | null =
    spec.type === "line" || spec.type === "pie" || spec.type === "bar"
      ? spec.type
      : null;
  if (!type) return null;

  if (!Array.isArray(spec.labels) || spec.labels.length === 0) return null;
  const labels = spec.labels.map((l) => String(l));

  let series: ChartSeries[] = [];
  if (Array.isArray(spec.series)) {
    series = spec.series
      .map((s) => {
        const o = (s ?? {}) as { name?: unknown; data?: unknown };
        const data = Array.isArray(o.data) ? o.data.map((n) => Number(n)) : [];
        return { name: o.name != null ? String(o.name) : "", data };
      })
      .filter((s) => s.data.length > 0 && s.data.some((n) => Number.isFinite(n)));
  }
  if (series.length === 0) return null;

  return {
    type,
    title: spec.title != null ? String(spec.title) : undefined,
    unit: spec.unit != null ? String(spec.unit) : undefined,
    labels,
    series,
  };
}

// Rounds a max up to a "nice" value (1/2/5 × 10ⁿ) for readable gridlines.
export function niceMax(v: number): number {
  if (v <= 0) return 1;
  const exp = Math.floor(Math.log10(v));
  const base = Math.pow(10, exp);
  const f = v / base;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
  return nice * base;
}

// Formats a number with thin-space thousands separators and an optional unit.
export function formatChartValue(n: number, unit?: string): string {
  const v = Number.isInteger(n) ? n.toString() : n.toFixed(1);
  const spaced = v.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return unit ? `${spaced} ${unit}` : spaced;
}
