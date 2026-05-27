import { describe, expect, it } from "vitest";

import { ratioM2Tool } from "@/lib/agent-runtime/tools/ratio_m2";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const run = (input: unknown) => ratioM2Tool.execute!(input as any, {} as any) as Promise<any>;

describe("ratio_m2", () => {
  it("returns the reference range and envelope without region weighting", async () => {
    const r = await run({
      destination: "logement_collectif_standard",
      surface_sdp_m2: 1000,
      region: "autres",
    });
    expect(r.region_factor).toBe(1.0);
    expect(r.ratio_eur_per_m2_sdp_ht).toEqual({ low: 1600, mid: 1900, high: 2300 });
    expect(r.enveloppe_totale_eur_ht.low).toBe(1_600_000);
    expect(r.enveloppe_totale_eur_ht.mid).toBe(1_900_000);
  });

  it("applies the +15% Île-de-France coefficient", async () => {
    const r = await run({
      destination: "logement_collectif_standard",
      surface_sdp_m2: 1000,
      region: "idf",
    });
    expect(r.region_factor).toBe(1.15);
    expect(r.ratio_eur_per_m2_sdp_ht.low).toBe(1840); // 1600 × 1.15
    expect(r.enveloppe_totale_eur_ht.low).toBe(1_840_000);
  });

  it("applies +5% to ouest_atlantique (grande métropole)", async () => {
    const r = await run({
      destination: "logement_collectif_standard",
      surface_sdp_m2: 1000,
      region: "ouest_atlantique",
    });
    expect(r.region_factor).toBe(1.05);
    expect(r.ratio_eur_per_m2_sdp_ht.low).toBe(1680); // 1600 × 1.05
  });
});
