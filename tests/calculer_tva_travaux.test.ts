import { describe, expect, it } from "vitest";

import { calculerTvaTravauxTool } from "@/lib/agent-runtime/tools/calculer_tva_travaux";

async function run(input: Record<string, unknown>) {
  const execute = calculerTvaTravauxTool.execute!;
  const result = await execute(input as never, {} as never);
  return result as Record<string, unknown>;
}

describe("calculer_tva_travaux", () => {
  it("applies 20% on new construction", async () => {
    const r = await run({
      nature_travaux: "construction_neuve",
      type_local: "habitation",
      age_local: "neuf_a_construire",
      attestation_client_signee: false,
      sous_traitance_btp: false,
    });
    expect(r.taux_tva).toBe(20);
  });

  it("applies 10% on improvement in habitation > 2 years with attestation", async () => {
    const r = await run({
      nature_travaux: "amelioration_entretien",
      type_local: "habitation",
      age_local: "plus_de_2_ans",
      attestation_client_signee: true,
      sous_traitance_btp: false,
    });
    expect(r.taux_tva).toBe(10);
  });

  it("falls back to 20% without attestation even when other conditions met", async () => {
    const r = await run({
      nature_travaux: "amelioration_entretien",
      type_local: "habitation",
      age_local: "plus_de_2_ans",
      attestation_client_signee: false,
      sous_traitance_btp: false,
    });
    expect(r.taux_tva).toBe(20);
    expect(String(r.regime)).toContain("attestation client manquante");
  });

  it("applies 5,5% on eligible energy renovation in dwelling > 2 years", async () => {
    const r = await run({
      nature_travaux: "renovation_energetique_eligible",
      type_local: "habitation",
      age_local: "plus_de_2_ans",
      attestation_client_signee: true,
      sous_traitance_btp: false,
    });
    expect(r.taux_tva).toBe(5.5);
  });

  it("forces 20% in professional premises regardless of age", async () => {
    const r = await run({
      nature_travaux: "amelioration_entretien",
      type_local: "professionnel",
      age_local: "plus_de_2_ans",
      attestation_client_signee: true,
      sous_traitance_btp: false,
    });
    expect(r.taux_tva).toBe(20);
  });

  it("returns autoliquidation regime for sous-traitance BTP", async () => {
    const r = await run({
      nature_travaux: "amelioration_entretien",
      type_local: "habitation",
      age_local: "plus_de_2_ans",
      attestation_client_signee: true,
      sous_traitance_btp: true,
    });
    expect(r.regime).toBe("AUTOLIQUIDATION");
  });

  it("reconstruction lourde is 20% even on dwelling > 2 years", async () => {
    const r = await run({
      nature_travaux: "reconstruction_lourde",
      type_local: "habitation",
      age_local: "plus_de_2_ans",
      attestation_client_signee: true,
      sous_traitance_btp: false,
    });
    expect(r.taux_tva).toBe(20);
  });

  it("fourniture seule sans pose is always 20%", async () => {
    const r = await run({
      nature_travaux: "fourniture_seule_sans_pose",
      type_local: "habitation",
      age_local: "plus_de_2_ans",
      attestation_client_signee: true,
      sous_traitance_btp: false,
    });
    expect(r.taux_tva).toBe(20);
  });
});
