"use client";

import {
  formatChartValue as fmt,
  niceMax,
  parseChartSpec,
  type ChartSeries as Series,
  type ParsedChart,
} from "@/lib/charts/spec";

// Renders a ```chart fenced code block (JSON spec) as an inline SVG chart.
// No external dependency — bar / line / pie drawn by hand so the bundle stays
// lean and there are no SSR/version pitfalls. Parsing/validation lives in
// lib/charts/spec.ts (pure, unit-tested).
//
// Expected JSON spec emitted by the agent:
//   {
//     "type": "bar" | "line" | "pie",
//     "title": "Chiffre d'affaires 2024",
//     "unit": "k€",                       // optional, shown on values/axis
//     "labels": ["Jan", "Fev", "Mar"],
//     "series": [ { "name": "CA", "data": [12, 15, 9] } ]
//   }
// Multiple series are supported for bar/line; pie uses the first series only.

const PALETTE = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#a855f7",
  "#ec4899",
  "#84cc16",
];

export function ChartBlock({ raw }: { raw: string }) {
  const spec = parseChartSpec(raw);
  if (!spec) {
    // Not parseable (yet) — show the raw JSON so nothing is lost.
    return (
      <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-3 text-xs">
        <code>{raw}</code>
      </pre>
    );
  }

  return (
    <figure className="my-3 rounded-xl border border-border bg-surface-elevated p-3">
      {spec.title && (
        <figcaption className="mb-2 text-center text-xs font-semibold text-foreground/90">
          {spec.title}
        </figcaption>
      )}
      {spec.type === "pie" ? <PieChart spec={spec} /> : <AxisChart spec={spec} />}
    </figure>
  );
}

// Shared bar/line renderer (cartesian axes).
function AxisChart({ spec }: { spec: ParsedChart }) {
  const W = 640;
  const H = 320;
  const padL = 56;
  const padR = 16;
  const padT = 12;
  const padB = 56;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const allVals = spec.series.flatMap((s) => s.data).filter((n) => Number.isFinite(n));
  const rawMax = Math.max(0, ...allVals);
  const rawMin = Math.min(0, ...allVals);
  const max = niceMax(rawMax === rawMin ? rawMax + 1 : rawMax);
  const min = rawMin < 0 ? -niceMax(-rawMin) : 0;
  const span = max - min || 1;

  const yOf = (v: number) => padT + plotH - ((v - min) / span) * plotH;
  const n = spec.labels.length;
  const slot = plotW / n;

  const ticks = 4;
  const gridLines = Array.from({ length: ticks + 1 }, (_, i) => min + (span * i) / ticks);

  const isLine = spec.type === "line";

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img">
        {/* gridlines + y labels */}
        {gridLines.map((g, i) => {
          const y = yOf(g);
          return (
            <g key={i}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="currentColor" strokeOpacity={0.12} />
              <text x={padL - 6} y={y + 3} textAnchor="end" className="fill-muted-foreground" fontSize={10}>
                {fmt(g, spec.unit)}
              </text>
            </g>
          );
        })}

        {/* x labels */}
        {spec.labels.map((lab, i) => (
          <text
            key={i}
            x={padL + slot * i + slot / 2}
            y={H - padB + 16}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize={10}
          >
            {lab.length > 10 ? `${lab.slice(0, 9)}…` : lab}
          </text>
        ))}

        {isLine
          ? spec.series.map((s, si) => {
              const color = PALETTE[si % PALETTE.length];
              const pts = s.data.map((v, i) => `${padL + slot * i + slot / 2},${yOf(v)}`).join(" ");
              return (
                <g key={si}>
                  <polyline points={pts} fill="none" stroke={color} strokeWidth={2} />
                  {s.data.map((v, i) => (
                    <circle key={i} cx={padL + slot * i + slot / 2} cy={yOf(v)} r={3} fill={color} />
                  ))}
                </g>
              );
            })
          : spec.series.map((s, si) => {
              const color = PALETTE[si % PALETTE.length];
              const groupW = slot * 0.7;
              const barW = groupW / spec.series.length;
              return (
                <g key={si}>
                  {s.data.map((v, i) => {
                    const x = padL + slot * i + (slot - groupW) / 2 + barW * si;
                    const y0 = yOf(0);
                    const y1 = yOf(v);
                    return (
                      <rect
                        key={i}
                        x={x}
                        y={Math.min(y0, y1)}
                        width={Math.max(1, barW - 1)}
                        height={Math.abs(y1 - y0)}
                        fill={color}
                        rx={1}
                      />
                    );
                  })}
                </g>
              );
            })}
      </svg>
      <Legend series={spec.series} />
    </div>
  );
}

function PieChart({ spec }: { spec: ParsedChart }) {
  const data = spec.series[0]?.data ?? [];
  const labels = spec.labels;
  const total = data.reduce((a, b) => a + (Number.isFinite(b) ? Math.max(0, b) : 0), 0) || 1;
  const cx = 110;
  const cy = 110;
  const r = 100;
  let angle = -Math.PI / 2;
  const slices = data.map((v, i) => {
    const frac = Math.max(0, v) / total;
    const start = angle;
    const end = angle + frac * Math.PI * 2;
    angle = end;
    const large = end - start > Math.PI ? 1 : 0;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`;
    return { d, color: PALETTE[i % PALETTE.length], pct: frac * 100, label: labels[i] ?? "", value: v };
  });

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <svg viewBox="0 0 220 220" className="h-44 w-44 shrink-0" role="img">
        {slices.map((s, i) => (
          <path key={i} d={s.d} fill={s.color} stroke="var(--surface-elevated, #1a1a1a)" strokeWidth={1} />
        ))}
      </svg>
      <ul className="space-y-1 text-xs">
        {slices.map((s, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
            <span className="text-foreground/90">{s.label}</span>
            <span className="text-muted-foreground">
              {fmt(s.value, spec.unit)} · {s.pct.toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Legend({ series }: { series: Series[] }) {
  if (series.length <= 1 && !series[0]?.name) return null;
  return (
    <ul className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px]">
      {series.map((s, i) => (
        <li key={i} className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
          />
          <span className="text-muted-foreground">{s.name || `Série ${i + 1}`}</span>
        </li>
      ))}
    </ul>
  );
}
