import { tool } from "ai";
import { z } from "zod";

const termSchema = z.object({
  symbol: z
    .string()
    .min(1)
    .describe(
      "Symbole de l'index dans la formule (ex: BT01, TP01, BT45). Doit correspondre à un index INSEE publié.",
    ),
  weight: z
    .number()
    .min(0)
    .max(1)
    .describe(
      "Coefficient pondérateur de cet index dans la partie révisable. La somme des weights de tous les termes + part_fixe doit valoir 1.",
    ),
  index_at_m0: z
    .number()
    .positive()
    .describe("Valeur de l'index au mois M0 (mois d'établissement des prix)"),
  index_at_m: z
    .number()
    .positive()
    .describe("Valeur de l'index au mois M-3 par rapport à l'exécution"),
});

export const calculerRevisionPrixTool = tool({
  description:
    "Calcule un coefficient de révision et un prix révisé selon la formule paramétrique du CCAG-Travaux art. 10.5. Formule générique : P = P0 × (a + Σ b_i × I_i(n) / I_i(0)), où a est la part fixe, b_i les pondérations des index, et I_i(n)/I_i(0) le rapport des index entre le mois de référence et le mois 0. Utiliser les index BT (bâtiment) ou TP (travaux publics) publiés par l'INSEE, valeurs du mois M-3 par défaut (CCAG art. 10.4.3).",
  inputSchema: z.object({
    prix_initial_ht: z
      .number()
      .positive()
      .describe("Prix initial HT au mois M0 (en euros)"),
    part_fixe: z
      .number()
      .min(0)
      .max(1)
      .default(0.125)
      .describe(
        "Part fixe 'a' de la formule (typiquement 0.125 = 12.5 %, valeur par défaut CCAG)",
      ),
    terms: z
      .array(termSchema)
      .min(1)
      .describe(
        "Liste des termes révisables (un par index utilisé dans la formule)",
      ),
  }),
  execute: async ({ prix_initial_ht, part_fixe, terms }) => {
    const sumWeights = terms.reduce((s, t) => s + t.weight, 0);
    const total = part_fixe + sumWeights;

    if (Math.abs(total - 1) > 0.01) {
      return {
        error:
          `Incohérence dans la formule : part fixe (${part_fixe.toFixed(3)}) + somme des pondérations (${sumWeights.toFixed(3)}) = ${total.toFixed(3)}. ` +
          "Cette somme doit valoir 1 (à 1 % près). Vérifie le CCAP du marché pour les valeurs exactes des coefficients.",
      };
    }

    let revisableContribution = 0;
    const detail: Array<{
      symbol: string;
      weight: number;
      ratio: number;
      contribution: number;
    }> = [];

    for (const term of terms) {
      const ratio = term.index_at_m / term.index_at_m0;
      const contribution = term.weight * ratio;
      revisableContribution += contribution;
      detail.push({
        symbol: term.symbol,
        weight: term.weight,
        ratio: round4(ratio),
        contribution: round4(contribution),
      });
    }

    const coefficient = part_fixe + revisableContribution;
    const prix_revise = prix_initial_ht * coefficient;
    const ecart_eur = prix_revise - prix_initial_ht;
    const ecart_pct = (coefficient - 1) * 100;

    return {
      formula:
        "P = P0 × (a + Σ b_i × I_i(M) / I_i(M0)) — CCAG-Travaux art. 10.5",
      inputs: {
        prix_initial_ht_eur: prix_initial_ht,
        part_fixe,
      },
      terms_detail: detail,
      coefficient_revision: round4(coefficient),
      prix_revise_ht_eur: round2(prix_revise),
      ecart_eur_ht: round2(ecart_eur),
      ecart_pourcent: round2(ecart_pct),
      reference: "CCAG-Travaux 2021 (arrêté 30 mars 2021), art. 10.4 et 10.5",
      warning:
        "Vérifier que les index utilisés sont bien ceux du mois M-3 par rapport au mois d'exécution (CCAG art. 10.4.3) et que la formule appliquée est celle du CCAP. Les valeurs INSEE doivent être confirmées sur insee.fr.",
    };
  },
});

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}
