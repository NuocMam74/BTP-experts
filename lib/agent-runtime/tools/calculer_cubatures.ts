import { tool } from "ai";
import { z } from "zod";

const sectionSchema = z.object({
  station: z
    .string()
    .describe(
      "Identifiant de la coupe (ex: 'PK 0+020' ou 'C1', 'C2', …)",
    ),
  surface_deblai_m2: z
    .number()
    .min(0)
    .describe("Surface de déblai sur la coupe, en m²"),
  surface_remblai_m2: z
    .number()
    .min(0)
    .describe("Surface de remblai sur la coupe, en m²"),
});

export const calculerCubaturesTool = tool({
  description:
    "Calcule les volumes de déblai et remblai d'un projet de terrassement à partir d'une série de coupes successives. Utilise la méthode des prismes trapézoïdaux : V = Σ ((S_i + S_(i+1)) / 2) × L_i. Restitue déblai en place, déblai foisonné, remblai et équilibre.",
  inputSchema: z.object({
    sections: z
      .array(sectionSchema)
      .min(2)
      .describe(
        "Liste des coupes successives (au moins 2). Doivent être données dans l'ordre de progression du linéaire.",
      ),
    distance_entre_coupes_m: z
      .number()
      .positive()
      .describe(
        "Distance moyenne entre deux coupes successives en mètres (espacement régulier supposé pour la méthode trapézoïdale).",
      ),
    coefficient_foisonnement_deblai: z
      .number()
      .min(1.0)
      .max(1.6)
      .default(1.25)
      .describe(
        "Coefficient de foisonnement des déblais (1,15 sable, 1,25 argile, 1,35 marnes, 1,45 roches concassées)",
      ),
  }),
  execute: async ({
    sections,
    distance_entre_coupes_m,
    coefficient_foisonnement_deblai,
  }) => {
    let totalDeblai = 0;
    let totalRemblai = 0;
    const detail: Array<{
      from: string;
      to: string;
      moyenne_deblai_m2: number;
      moyenne_remblai_m2: number;
      volume_deblai_m3: number;
      volume_remblai_m3: number;
    }> = [];

    for (let i = 0; i < sections.length - 1; i += 1) {
      const a = sections[i]!;
      const b = sections[i + 1]!;
      const moyDeblai = (a.surface_deblai_m2 + b.surface_deblai_m2) / 2;
      const moyRemblai = (a.surface_remblai_m2 + b.surface_remblai_m2) / 2;
      const volDeblai = moyDeblai * distance_entre_coupes_m;
      const volRemblai = moyRemblai * distance_entre_coupes_m;

      totalDeblai += volDeblai;
      totalRemblai += volRemblai;

      detail.push({
        from: a.station,
        to: b.station,
        moyenne_deblai_m2: round2(moyDeblai),
        moyenne_remblai_m2: round2(moyRemblai),
        volume_deblai_m3: round2(volDeblai),
        volume_remblai_m3: round2(volRemblai),
      });
    }

    const deblaiFoisonne = totalDeblai * coefficient_foisonnement_deblai;
    const equilibre = totalDeblai - totalRemblai;

    return {
      methode: "Prismes trapézoïdaux — V = Σ ((S_i + S_(i+1)) / 2) × L",
      hypotheses: {
        nb_coupes: sections.length,
        nb_troncons: sections.length - 1,
        distance_entre_coupes_m,
        coefficient_foisonnement_deblai,
      },
      detail,
      totaux: {
        deblai_en_place_m3: round2(totalDeblai),
        deblai_foisonne_m3: round2(deblaiFoisonne),
        remblai_en_place_m3: round2(totalRemblai),
        equilibre_m3: round2(equilibre),
        equilibre_label:
          equilibre > 0.01
            ? "excédent — à évacuer hors site"
            : equilibre < -0.01
              ? "déficit — apport de terres nécessaire"
              : "équilibré",
      },
      precision_attendue: "±5 à 10 % sur terrain régulier, jusqu'à ±20 % sur terrain accidenté",
      recommandations: [
        "Caler le foisonnement sur la nature réelle des sols (rapport G1 ou G2 NF P 94-500)",
        "Vérifier la qualité géotechnique avant terrassement (présence d'argile gonflante, nappe phréatique)",
        "Pour les déblais > 1,30 m, prévoir un blindage (art. R.4534-22 code du travail)",
        "Si proximité de réseaux : émettre DT-DICT (décret 2011-1241)",
      ],
    };
  },
});

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
