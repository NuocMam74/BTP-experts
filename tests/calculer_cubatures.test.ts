import { describe, expect, it } from "vitest";

import { calculerCubaturesTool } from "@/lib/agent-runtime/tools/calculer_cubatures";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const run = (input: unknown) => calculerCubaturesTool.execute!(input as any, {} as any) as Promise<any>;

describe("calculer_cubatures", () => {
  it("applies the trapezoidal prism method between two sections", async () => {
    const r = await run({
      sections: [
        { station: "C1", surface_deblai_m2: 10, surface_remblai_m2: 5 },
        { station: "C2", surface_deblai_m2: 20, surface_remblai_m2: 5 },
      ],
      distance_entre_coupes_m: 50,
      coefficient_foisonnement_deblai: 1.25,
    });
    // moy déblai = (10+20)/2 = 15 → ×50 = 750 ; moy remblai = 5 → ×50 = 250
    expect(r.totaux.deblai_en_place_m3).toBe(750);
    expect(r.totaux.remblai_en_place_m3).toBe(250);
    expect(r.totaux.deblai_foisonne_m3).toBe(937.5); // 750 × 1.25
    expect(r.totaux.equilibre_m3).toBe(500);
    expect(r.totaux.equilibre_label).toContain("excédent");
  });

  it("sums multiple troncons and detects a remblai deficit", async () => {
    const r = await run({
      sections: [
        { station: "A", surface_deblai_m2: 0, surface_remblai_m2: 10 },
        { station: "B", surface_deblai_m2: 0, surface_remblai_m2: 30 },
        { station: "C", surface_deblai_m2: 0, surface_remblai_m2: 10 },
      ],
      distance_entre_coupes_m: 20,
      coefficient_foisonnement_deblai: 1.25,
    });
    // remblai: (10+30)/2×20 + (30+10)/2×20 = 400 + 400 = 800 ; déblai 0
    expect(r.totaux.deblai_en_place_m3).toBe(0);
    expect(r.totaux.remblai_en_place_m3).toBe(800);
    expect(r.totaux.equilibre_m3).toBe(-800);
    expect(r.totaux.equilibre_label).toContain("déficit");
    expect(r.hypotheses.nb_troncons).toBe(2);
  });
});
