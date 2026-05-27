import { tool } from "ai";
import { z } from "zod";

type Ratio = {
  destination: string;
  description: string;
  low: number;
  mid: number;
  high: number;
};

const RATIOS_EUR_PER_M2_SDP: Ratio[] = [
  {
    destination: "logement_collectif_standard",
    description: "Logement collectif neuf standard, R+3 à R+7, finitions standard",
    low: 1600,
    mid: 1900,
    high: 2300,
  },
  {
    destination: "logement_collectif_premium",
    description: "Logement collectif neuf premium, finitions haut de gamme",
    low: 2300,
    mid: 2700,
    high: 3200,
  },
  {
    destination: "maison_individuelle_groupee",
    description: "Maison individuelle groupée neuve, niveau standard",
    low: 1400,
    mid: 1700,
    high: 2100,
  },
  {
    destination: "bureaux_neufs_standard",
    description: "Bureaux neufs niveau standard, surface > 1000 m² SDP",
    low: 1700,
    mid: 2100,
    high: 2600,
  },
  {
    destination: "bureaux_neufs_premium_tertiaire_he",
    description: "Bureaux neufs premium / tertiaire HE, certifié BREEAM/HQE",
    low: 2400,
    mid: 2900,
    high: 3600,
  },
  {
    destination: "ecole_primaire_collegue",
    description: "École / collège neuf (ERP type R)",
    low: 1900,
    mid: 2300,
    high: 2800,
  },
  {
    destination: "etablissement_sante_ehpad",
    description: "EHPAD / résidence services seniors neuve",
    low: 2100,
    mid: 2600,
    high: 3100,
  },
  {
    destination: "entrepot_logistique_simple",
    description: "Entrepôt logistique simple, hauteur ≤ 10 m, dalle 5 T/m²",
    low: 500,
    mid: 700,
    high: 950,
  },
  {
    destination: "rehabilitation_lourde_logement",
    description: "Réhabilitation lourde de logement collectif (restructuration)",
    low: 1300,
    mid: 1700,
    high: 2200,
  },
  {
    destination: "renovation_energetique_logement",
    description: "Rénovation énergétique logement (isolation, menuiseries, ventilation)",
    low: 400,
    mid: 700,
    high: 1100,
  },
];

export const ratioM2Tool = tool({
  description:
    "Retourne une fourchette indicative de prix au m² SDP (€/m² HT, valeurs de marché 2024-2025) selon la destination d'un projet bâtiment. À utiliser pour donner un ordre de grandeur en phase faisabilité ou étude. Sources : observatoires SGI / OEAP / UNTEC, retours marché Capeb / FFB. NON contractuel — toujours valider sur opération comparable.",
  inputSchema: z.object({
    destination: z
      .enum(RATIOS_EUR_PER_M2_SDP.map((r) => r.destination) as [
        string,
        ...string[],
      ])
      .describe(
        "Type de destination du projet. Choisis la catégorie la plus proche.",
      ),
    surface_sdp_m2: z
      .number()
      .positive()
      .describe("Surface de Plancher du projet, en m² SDP"),
    region: z
      .enum(["idf", "lyon_grand_est", "ouest_atlantique", "sud", "autres"])
      .default("autres")
      .describe(
        "Région du projet — applique un coefficient de localisation (+15 % IDF, +5 % grandes métropoles, ±0 % autres).",
      ),
  }),
  execute: async ({ destination, surface_sdp_m2, region }) => {
    const ratio = RATIOS_EUR_PER_M2_SDP.find(
      (r) => r.destination === destination,
    );
    if (!ratio) {
      return {
        error: `Destination "${destination}" inconnue. Destinations disponibles : ${RATIOS_EUR_PER_M2_SDP.map((r) => r.destination).join(", ")}.`,
      };
    }

    const regionFactor =
      region === "idf"
        ? 1.15
        : region === "lyon_grand_est" ||
            region === "sud" ||
            region === "ouest_atlantique"
          ? 1.05
          : 1.0;

    const adjustedLow = ratio.low * regionFactor;
    const adjustedMid = ratio.mid * regionFactor;
    const adjustedHigh = ratio.high * regionFactor;

    return {
      destination_label: ratio.description,
      surface_sdp_m2,
      region,
      region_factor: regionFactor,
      ratio_eur_per_m2_sdp_ht: {
        low: Math.round(adjustedLow),
        mid: Math.round(adjustedMid),
        high: Math.round(adjustedHigh),
      },
      enveloppe_totale_eur_ht: {
        low: Math.round(adjustedLow * surface_sdp_m2),
        mid: Math.round(adjustedMid * surface_sdp_m2),
        high: Math.round(adjustedHigh * surface_sdp_m2),
      },
      hypotheses: [
        "Valeurs HT, hors VRD spécifiques, hors honoraires MOE, hors fondations spéciales",
        "Hors aléas géotechniques (G2 PRO requis pour ancrer)",
        "Région 'autres' = ratio de référence sans pondération",
        "Données indicatives 2024-2025 — à confronter à un retour marché récent (offres comparables, indices BT)",
      ],
      references: [
        "Observatoires SGI / OEAP — ratios bâtiment au m² SDP par destination",
        "UNTEC — méthodologie économique par phase de projet",
        "Index BT01 à BT55 (INSEE) pour la révision",
      ],
      warning:
        "Ces valeurs sont INDICATIVES. Aucune décision d'investissement, d'offre commerciale ou de financement ne doit être prise sur cette base seule.",
    };
  },
});
