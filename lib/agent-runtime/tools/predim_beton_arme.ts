import { tool } from "ai";
import { z } from "zod";

export const predimBetonArmeTool = tool({
  description:
    "Pré-dimensionnement INDICATIF d'une poutre ou d'une dalle en béton armé selon Eurocode 2 (élancement, hauteur, section d'armatures minimales). À utiliser uniquement comme première approche en phase faisabilité ou APS. Ne remplace JAMAIS une note de calcul EXE signée par un BET. Hypothèses simplifiées : béton C25/30 minimum, acier B500B, classe d'exposition XC1.",
  inputSchema: z.object({
    type_element: z
      .enum(["poutre_isostatique", "poutre_continue", "dalle_pleine_isostatique", "dalle_pleine_continue"])
      .describe(
        "Type d'élément à pré-dimensionner. 'Poutre isostatique' = appui simple aux 2 extrémités. 'Poutre continue' = sur plusieurs appuis. 'Dalle pleine isostatique' = portée dans 1 sens, 2 appuis. 'Dalle pleine continue' = sur 4 appuis.",
      ),
    portee_m: z
      .number()
      .min(0.5)
      .max(20)
      .describe("Portée de calcul (entre nus d'appuis) en mètres"),
    charge_exploitation_kN_m2: z
      .number()
      .min(0)
      .max(50)
      .describe(
        "Charge d'exploitation (Q_k) sur l'élément en kN/m². Habitation : 1,5. Bureaux : 2,5. Lieux rassemblement : 4,0. Stockage : selon usage.",
      ),
    charge_permanente_additionnelle_kN_m2: z
      .number()
      .min(0)
      .max(20)
      .default(1.5)
      .describe(
        "Charges permanentes additionnelles au poids propre (chape + revêtement + cloisons partielles), typiquement 1,5 à 2,5 kN/m² en logement",
      ),
    classe_beton: z
      .enum(["C25/30", "C30/37", "C35/45"])
      .default("C25/30")
      .describe("Classe de résistance du béton selon EC2"),
  }),
  execute: async ({
    type_element,
    portee_m,
    charge_exploitation_kN_m2,
    charge_permanente_additionnelle_kN_m2,
    classe_beton,
  }) => {
    let elancementMax: number;
    let labelType: string;

    switch (type_element) {
      case "poutre_isostatique":
        elancementMax = 14;
        labelType = "Poutre isostatique (appuis simples)";
        break;
      case "poutre_continue":
        elancementMax = 18;
        labelType = "Poutre continue (sur appuis multiples)";
        break;
      case "dalle_pleine_isostatique":
        elancementMax = 25;
        labelType = "Dalle pleine isostatique (portée 1 sens)";
        break;
      case "dalle_pleine_continue":
        elancementMax = 30;
        labelType = "Dalle pleine continue (sur 4 appuis)";
        break;
    }

    const hauteurMinimaleCm = (portee_m * 100) / elancementMax;
    const hauteurProposeeCm = Math.ceil(hauteurMinimaleCm / 5) * 5;
    const hauteurProposeeM = hauteurProposeeCm / 100;

    const poidsProprePropose =
      type_element.startsWith("dalle")
        ? 25 * hauteurProposeeM
        : 25 * hauteurProposeeM * 0.3;

    const chargesPermanentesTotales =
      poidsProprePropose + charge_permanente_additionnelle_kN_m2;

    const combinaisonELU =
      1.35 * chargesPermanentesTotales + 1.5 * charge_exploitation_kN_m2;

    const fck = Number(classe_beton.split("/")[0]!.replace("C", ""));
    const fctm = 0.3 * Math.pow(fck, 2 / 3);
    const minRatio = Math.max(
      0.26 * (fctm / 500),
      0.0013,
    );

    const dCm = hauteurProposeeCm - 3.5;
    const armatureMinimaleCm2PerM = type_element.startsWith("dalle")
      ? minRatio * 100 * dCm
      : minRatio * 30 * dCm;

    return {
      type_element: labelType,
      hypotheses: {
        portee_m,
        charge_exploitation_kN_m2,
        charge_permanente_additionnelle_kN_m2,
        classe_beton,
        elancement_max_l_sur_h: elancementMax,
        acier: "B500B",
        classe_exposition_supposee: "XC1 (intérieur sec)",
      },
      pre_dimensionnement: {
        hauteur_minimale_cm: round1(hauteurMinimaleCm),
        hauteur_proposee_cm: hauteurProposeeCm,
        largeur_minimale_cm_si_poutre: type_element.startsWith("poutre")
          ? 25
          : null,
      },
      sollicitations_estimees: {
        poids_propre_kN_m2_ou_kN_m: round2(poidsProprePropose),
        charges_permanentes_totales_kN_m2_ou_kN_m: round2(
          chargesPermanentesTotales,
        ),
        combinaison_ELU_kN_m2_ou_kN_m: round2(combinaisonELU),
      },
      armatures_minimales: {
        ratio_min_rho: round4(minRatio),
        section_indicative_cm2_par_m: round2(armatureMinimaleCm2PerM),
        note: "Section MINIMALE selon EC2 §9.2.1.1 — un calcul à l'ELU réel peut conduire à une section plus importante.",
      },
      references: [
        "EC2 (NF EN 1992-1-1) + Annexe nationale française",
        "EC2 §7.4.2 — élancements limites pour éviter calcul flèche détaillé",
        "EC2 §9.2.1.1 — section minimale d'armature tendue",
        "EC2 §4.4 — enrobage selon classe d'exposition",
        "EC0 (NF EN 1990) — combinaisons d'actions",
      ],
      avertissements: [
        "Pré-dimensionnement INDICATIF — à confirmer par une note de calcul EXE complète.",
        "Hypothèse de classe d'exposition XC1 — si extérieur ou local humide, refaire avec XC3/XC4 et enrobage majoré.",
        "Pas de prise en compte sismique — si zone 3+ et catégorie II+, refaire avec EC8.",
        "La note de calcul EXE engage la responsabilité décennale du BET signataire.",
      ],
    };
  },
});

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}
function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}
