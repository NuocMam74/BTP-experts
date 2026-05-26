import { describe, expect, it } from "vitest";

import { calcSurfacesTool } from "@/lib/agent-runtime/tools/calc_surfaces";

type ToolOutput = {
  totals: { sdp_m2: number; shab_m2: number; carrez_m2: number };
  detail: Array<{
    name: string;
    counted_sdp: number;
    counted_shab: number;
    counted_carrez: number;
    note: string;
  }>;
};

async function run(rooms: unknown): Promise<ToolOutput> {
  const execute = calcSurfacesTool.execute!;
  const result = await execute(
    { rooms } as never,
    {} as never,
  );
  return result as ToolOutput;
}

describe("calc_surfaces", () => {
  it("includes a normal living room in SDP, SHAB and Carrez", async () => {
    const r = await run([
      {
        name: "Salon",
        area_m2: 20,
        ceiling_height_m: 2.5,
        is_living_space: true,
        is_private_copro: true,
        area_under_180cm_m2: 0,
      },
    ]);

    expect(r.totals.sdp_m2).toBe(20);
    expect(r.totals.shab_m2).toBe(20);
    expect(r.totals.carrez_m2).toBe(20);
  });

  it("excludes a garage from SHAB and Carrez (non-living, non-private)", async () => {
    const r = await run([
      {
        name: "Garage",
        area_m2: 18,
        ceiling_height_m: 2.4,
        is_living_space: false,
        is_private_copro: false,
        area_under_180cm_m2: 0,
      },
    ]);

    expect(r.totals.sdp_m2).toBe(18);
    expect(r.totals.shab_m2).toBe(0);
    expect(r.totals.carrez_m2).toBe(0);
  });

  it("excludes a balcony from Carrez but not SDP", async () => {
    const r = await run([
      {
        name: "Balcon",
        area_m2: 6,
        ceiling_height_m: 2.5,
        is_living_space: false,
        is_private_copro: false,
        area_under_180cm_m2: 0,
      },
    ]);
    expect(r.totals.sdp_m2).toBe(6);
    expect(r.totals.carrez_m2).toBe(0);
  });

  it("excludes Carrez when ceiling height is below 1.80 m", async () => {
    const r = await run([
      {
        name: "Cave aménagée",
        area_m2: 10,
        ceiling_height_m: 1.7,
        is_living_space: true,
        is_private_copro: true,
        area_under_180cm_m2: 0,
      },
    ]);
    expect(r.totals.sdp_m2).toBe(10);
    expect(r.totals.carrez_m2).toBe(0);
  });

  it("deducts the area under 1.80 m from SHAB and Carrez", async () => {
    const r = await run([
      {
        name: "Comble aménagé",
        area_m2: 30,
        ceiling_height_m: 2.2,
        is_living_space: true,
        is_private_copro: true,
        area_under_180cm_m2: 8,
      },
    ]);
    expect(r.totals.sdp_m2).toBe(30);
    expect(r.totals.shab_m2).toBe(22);
    expect(r.totals.carrez_m2).toBe(22);
  });

  it("aggregates a realistic apartment correctly", async () => {
    const r = await run([
      {
        name: "Salon",
        area_m2: 25,
        ceiling_height_m: 2.5,
        is_living_space: true,
        is_private_copro: true,
        area_under_180cm_m2: 0,
      },
      {
        name: "Chambre 1",
        area_m2: 14,
        ceiling_height_m: 2.5,
        is_living_space: true,
        is_private_copro: true,
        area_under_180cm_m2: 0,
      },
      {
        name: "Salle de bain",
        area_m2: 6,
        ceiling_height_m: 2.5,
        is_living_space: true,
        is_private_copro: true,
        area_under_180cm_m2: 0,
      },
      {
        name: "Balcon",
        area_m2: 4,
        ceiling_height_m: 2.5,
        is_living_space: false,
        is_private_copro: false,
        area_under_180cm_m2: 0,
      },
      {
        name: "Cave en sous-sol",
        area_m2: 3,
        ceiling_height_m: 2.2,
        is_living_space: false,
        is_private_copro: false,
        area_under_180cm_m2: 0,
      },
    ]);

    expect(r.totals.sdp_m2).toBe(52);
    expect(r.totals.shab_m2).toBe(45);
    expect(r.totals.carrez_m2).toBe(45);
  });

  it("annotates each room with the reason for exclusions", async () => {
    const r = await run([
      {
        name: "Cellier",
        area_m2: 3,
        ceiling_height_m: 2.4,
        is_living_space: false,
        is_private_copro: true,
        area_under_180cm_m2: 0,
      },
    ]);
    expect(r.detail[0]!.note).toContain("non-habitable");
  });
});
