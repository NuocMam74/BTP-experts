import { describe, expect, it } from "vitest";

import {
  formatChartValue,
  niceMax,
  parseChartSpec,
} from "@/lib/charts/spec";

describe("parseChartSpec", () => {
  it("parses a valid bar chart", () => {
    const raw = JSON.stringify({
      type: "bar",
      title: "CA 2024",
      unit: "k€",
      labels: ["Jan", "Fév", "Mar"],
      series: [{ name: "CA", data: [120, 135, 98] }],
    });
    const spec = parseChartSpec(raw);
    expect(spec).not.toBeNull();
    expect(spec?.type).toBe("bar");
    expect(spec?.unit).toBe("k€");
    expect(spec?.labels).toEqual(["Jan", "Fév", "Mar"]);
    expect(spec?.series[0]?.data).toEqual([120, 135, 98]);
  });

  it("accepts line and pie types", () => {
    const base = { labels: ["a", "b"], series: [{ name: "s", data: [1, 2] }] };
    expect(parseChartSpec(JSON.stringify({ ...base, type: "line" }))?.type).toBe("line");
    expect(parseChartSpec(JSON.stringify({ ...base, type: "pie" }))?.type).toBe("pie");
  });

  it("coerces numeric strings in data", () => {
    const raw = JSON.stringify({
      type: "bar",
      labels: ["a", "b"],
      series: [{ name: "s", data: ["10", "20"] }],
    });
    expect(parseChartSpec(raw)?.series[0]?.data).toEqual([10, 20]);
  });

  it("returns null on malformed JSON (e.g. mid-stream)", () => {
    expect(parseChartSpec('{"type":"bar","labels":["a"')).toBeNull();
  });

  it("returns null on unknown chart type", () => {
    const raw = JSON.stringify({ type: "scatter", labels: ["a"], series: [{ data: [1] }] });
    expect(parseChartSpec(raw)).toBeNull();
  });

  it("returns null when labels are missing or empty", () => {
    expect(parseChartSpec(JSON.stringify({ type: "bar", series: [{ data: [1] }] }))).toBeNull();
    expect(
      parseChartSpec(JSON.stringify({ type: "bar", labels: [], series: [{ data: [1] }] })),
    ).toBeNull();
  });

  it("returns null when no usable series", () => {
    expect(parseChartSpec(JSON.stringify({ type: "bar", labels: ["a"], series: [] }))).toBeNull();
    expect(
      parseChartSpec(JSON.stringify({ type: "bar", labels: ["a"], series: [{ data: [] }] })),
    ).toBeNull();
  });
});

describe("niceMax", () => {
  it("rounds up to 1/2/5 × 10ⁿ", () => {
    expect(niceMax(7)).toBe(10);
    expect(niceMax(12)).toBe(20);
    expect(niceMax(35)).toBe(50);
    expect(niceMax(120)).toBe(200);
  });
  it("never returns 0 for non-positive input", () => {
    expect(niceMax(0)).toBe(1);
    expect(niceMax(-5)).toBe(1);
  });
});

describe("formatChartValue", () => {
  it("adds thousands separators and unit", () => {
    expect(formatChartValue(1234567)).toBe("1 234 567");
    expect(formatChartValue(120, "k€")).toBe("120 k€");
    expect(formatChartValue(1.5, "%")).toBe("1.5 %");
  });
});
