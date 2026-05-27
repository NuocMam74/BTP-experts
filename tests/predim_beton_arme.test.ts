import { describe, expect, it } from "vitest";

import { predimBetonArmeTool } from "@/lib/agent-runtime/tools/predim_beton_arme";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const run = (input: unknown) => predimBetonArmeTool.execute!(input as any, {} as any) as Promise<any>;

describe("predim_beton_arme", () => {
  it("dimensions an isostatic beam per EC2 (l/h=14) with correct ELU combination", async () => {
    const r = await run({
      type_element: "poutre_isostatique",
      portee_m: 6,
      charge_exploitation_kN_m2: 2.5,
      charge_permanente_additionnelle_kN_m2: 1.5,
      classe_beton: "C25/30",
    });
    // h_min = 600/14 = 42.86 cm, arrondi au pas de 5 → 45 cm
    expect(r.pre_dimensionnement.hauteur_minimale_cm).toBeCloseTo(42.9, 1);
    expect(r.pre_dimensionnement.hauteur_proposee_cm).toBe(45);
    expect(r.pre_dimensionnement.largeur_minimale_cm_si_poutre).toBe(25);
    // poids propre = 25 × 0.45 × 0.3 = 3.375 ; G_tot = 4.875 ; ELU = 1.35×4.875 + 1.5×2.5
    expect(r.sollicitations_estimees.combinaison_ELU_kN_m2_ou_kN_m).toBeCloseTo(10.33, 2);
    // As,min EC2 §9.2.1.1 : ρ = max(0.26·fctm/fyk, 0.0013), fctm=0.3·25^(2/3)
    expect(r.armatures_minimales.ratio_min_rho).toBeCloseTo(0.0013, 4);
  });

  it("dimensions a continuous slab (l/h=30) with no beam width", async () => {
    const r = await run({
      type_element: "dalle_pleine_continue",
      portee_m: 5,
      charge_exploitation_kN_m2: 1.5,
      charge_permanente_additionnelle_kN_m2: 1.5,
      classe_beton: "C25/30",
    });
    // h_min = 500/30 = 16.67 cm → 20 cm
    expect(r.pre_dimensionnement.hauteur_proposee_cm).toBe(20);
    expect(r.pre_dimensionnement.largeur_minimale_cm_si_poutre).toBeNull();
    // poids propre dalle = 25 × 0.20 = 5 ; G_tot = 6.5 ; ELU = 1.35×6.5 + 1.5×1.5 = 11.025
    expect(r.sollicitations_estimees.combinaison_ELU_kN_m2_ou_kN_m).toBeCloseTo(11.03, 2);
  });
});
