import { describe, expect, it } from "vitest";

import { calculerRevisionPrixTool } from "@/lib/agent-runtime/tools/calculer_revision_prix";

type ToolOutput = {
  error?: string;
  coefficient_revision?: number;
  prix_revise_ht_eur?: number;
  ecart_pourcent?: number;
};

async function run(input: Record<string, unknown>): Promise<ToolOutput> {
  const execute = calculerRevisionPrixTool.execute!;
  const result = await execute(input as never, {} as never);
  return result as ToolOutput;
}

describe("calculer_revision_prix", () => {
  it("returns coefficient 1.0 when indices have not moved", async () => {
    const r = await run({
      prix_initial_ht: 100000,
      part_fixe: 0.125,
      terms: [
        {
          symbol: "BT01",
          weight: 0.875,
          index_at_m0: 120,
          index_at_m: 120,
        },
      ],
    });
    expect(r.coefficient_revision).toBe(1);
    expect(r.prix_revise_ht_eur).toBe(100000);
    expect(r.ecart_pourcent).toBe(0);
  });

  it("computes a positive revision when indices rise", async () => {
    const r = await run({
      prix_initial_ht: 100000,
      part_fixe: 0.125,
      terms: [
        {
          symbol: "BT01",
          weight: 0.875,
          index_at_m0: 100,
          index_at_m: 110,
        },
      ],
    });
    // coefficient = 0.125 + 0.875 * 110/100 = 0.125 + 0.9625 = 1.0875
    expect(r.coefficient_revision).toBeCloseTo(1.0875, 4);
    expect(r.prix_revise_ht_eur).toBeCloseTo(108750, 1);
  });

  it("rejects formulas whose weights do not sum to 1", async () => {
    const r = await run({
      prix_initial_ht: 100000,
      part_fixe: 0.125,
      terms: [
        {
          symbol: "BT01",
          weight: 0.5,
          index_at_m0: 100,
          index_at_m: 110,
        },
      ],
    });
    expect(r.error).toBeDefined();
    expect(String(r.error)).toContain("Incohérence");
  });

  it("supports multi-index formulas with weighted sum", async () => {
    const r = await run({
      prix_initial_ht: 200000,
      part_fixe: 0.15,
      terms: [
        {
          symbol: "BT01",
          weight: 0.5,
          index_at_m0: 100,
          index_at_m: 110,
        },
        {
          symbol: "BT45",
          weight: 0.35,
          index_at_m0: 100,
          index_at_m: 105,
        },
      ],
    });
    // 0.15 + 0.5 * 1.10 + 0.35 * 1.05 = 0.15 + 0.55 + 0.3675 = 1.0675
    expect(r.coefficient_revision).toBeCloseTo(1.0675, 4);
    expect(r.prix_revise_ht_eur).toBeCloseTo(213500, 1);
  });
});
