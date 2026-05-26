import { tool } from "ai";
import { z } from "zod";

export const calculerTvaTravauxTool = tool({
  description:
    "Détermine le taux de TVA applicable à des travaux de bâtiment en France (20 % / 10 % / 5,5 %) selon la nature des travaux, le type de local, son âge, et la présence éventuelle d'attestation 1300-SD ou 1301-SD. Restitue le taux, la base légale (article CGI + BOFIP), et les pièces justificatives à conserver.",
  inputSchema: z.object({
    nature_travaux: z
      .enum([
        "construction_neuve",
        "reconstruction_lourde",
        "amelioration_entretien",
        "renovation_energetique_eligible",
        "transformation_local_en_logement",
        "fourniture_seule_sans_pose",
      ])
      .describe(
        "Nature des travaux. 'reconstruction_lourde' = démolition >50% gros œuvre. 'renovation_energetique_eligible' = équipement listé arrêté DGEC.",
      ),
    type_local: z
      .enum(["habitation", "professionnel", "mixte_majoritaire_habitation"])
      .describe(
        "Type de local. 'mixte_majoritaire_habitation' = local à usage mixte dont l'habitation est majoritaire.",
      ),
    age_local: z
      .enum([
        "moins_de_2_ans",
        "plus_de_2_ans",
        "neuf_a_construire",
        "non_applicable",
      ])
      .describe(
        "Âge du local au moment des travaux. 'neuf_a_construire' = construction nouvelle. 'non_applicable' = travaux qui ne dépendent pas de l'âge (ex: fourniture seule).",
      ),
    attestation_client_signee: z
      .boolean()
      .describe(
        "Le client a-t-il signé l'attestation 1300-SD ou 1301-SD AVANT le début des travaux ?",
      ),
    sous_traitance_btp: z
      .boolean()
      .default(false)
      .describe(
        "S'agit-il d'une prestation de sous-traitance entre entreprises BTP (B2B) ? Si oui, régime d'autoliquidation art. 283 nonies CGI applicable.",
      ),
  }),
  execute: async ({
    nature_travaux,
    type_local,
    age_local,
    attestation_client_signee,
    sous_traitance_btp,
  }) => {
    if (sous_traitance_btp) {
      const eligibleAutoliq =
        nature_travaux !== "fourniture_seule_sans_pose";
      return {
        regime: eligibleAutoliq ? "AUTOLIQUIDATION" : "TAUX NORMAL 20 %",
        taux_facture_sous_traitant: eligibleAutoliq ? "HT (0 % TVA collectée)" : "20 %",
        explication: eligibleAutoliq
          ? "Sous-traitance BTP entre assujettis : le sous-traitant facture HT avec mention 'Autoliquidation — article 283 nonies du CGI'. Le donneur d'ordre autoliquide la TVA sur sa CA3 (collectée + déductible simultanément, effet financier neutre)."
          : "La fourniture pure sans pose n'entre pas dans le champ de l'autoliquidation BTP — taux normal 20 %.",
        references: [
          "CGI art. 283 nonies — autoliquidation TVA en sous-traitance BTP",
          "BOFIP BOI-TVA-DECLA-10-20-30 — modalités déclaratives",
          "CGI annexe III art. 242 nonies A — définition des travaux de BTP",
        ],
        pieces_justificatives: eligibleAutoliq
          ? [
              "Contrat de sous-traitance ou bon de commande détaillé",
              "Facture sous-traitant HT avec mention 'Autoliquidation art. 283 nonies CGI'",
              "DC4 (marchés publics) ou agrément MOA (marchés privés) — loi 75-1334",
              "Conservation 5 ans (LPF art. L.102 B)",
            ]
          : [
              "Facture standard avec TVA 20 %",
              "Conservation 5 ans (LPF art. L.102 B)",
            ],
        warning_loi_1975:
          "Vérifier l'agrément du sous-traitant par le MOA (DC4 ou agrément exprès en privé) avant tout paiement. Sans agrément et sans caution en marché privé, le contrat de sous-traitance est NUL d'ordre public (Cass. ch. mixte 18 déc. 1992).",
      };
    }

    if (nature_travaux === "fourniture_seule_sans_pose") {
      return {
        taux_tva: 20,
        regime: "TAUX NORMAL 20 %",
        explication:
          "La fourniture seule (sans pose) reste au taux normal de TVA 20 %, quel que soit le type de local ou son âge.",
        references: ["CGI art. 278 — taux normal de TVA"],
        pieces_justificatives: [
          "Facture standard avec TVA 20 %",
          "Conservation 5 ans (LPF art. L.102 B)",
        ],
      };
    }

    if (nature_travaux === "construction_neuve" || age_local === "neuf_a_construire") {
      return {
        taux_tva: 20,
        regime: "TAUX NORMAL 20 %",
        explication:
          "Construction neuve : taux normal 20 %. Le taux réduit ne s'applique qu'aux logements achevés depuis plus de 2 ans (CGI art. 279-0 bis et 278-0 bis A).",
        references: ["CGI art. 278 — taux normal de TVA"],
        pieces_justificatives: [
          "Facture standard avec TVA 20 %",
          "Permis de construire ou déclaration préalable",
          "Conservation 5 ans (LPF art. L.102 B)",
        ],
      };
    }

    if (nature_travaux === "reconstruction_lourde") {
      return {
        taux_tva: 20,
        regime: "TAUX NORMAL 20 %",
        explication:
          "Reconstruction lourde (démolition de plus de 50 % du gros œuvre, ou surélévation augmentant la SDP de plus de 50 %) : assimilable à une construction neuve, taux normal 20 %.",
        references: [
          "CGI art. 278",
          "BOFIP BOI-TVA-LIQ-30-20-90-10 — critères de reconstruction",
        ],
        pieces_justificatives: [
          "Facture standard avec TVA 20 %",
          "Permis de construire / déclaration préalable",
          "Notice descriptive justifiant l'ampleur des travaux",
        ],
        warning:
          "Cas limite : si la qualification 'reconstruction' vs 'amélioration' est ambiguë (50 % du gros œuvre est un seuil sensible), recommander un rescrit fiscal (LPF art. L.80 B) avant la facturation.",
      };
    }

    if (
      type_local !== "habitation" &&
      type_local !== "mixte_majoritaire_habitation"
    ) {
      return {
        taux_tva: 20,
        regime: "TAUX NORMAL 20 %",
        explication:
          "Travaux dans un local à usage professionnel : taux normal 20 %. Les taux réduits 10 % et 5,5 % ne s'appliquent qu'aux locaux à usage d'habitation.",
        references: ["CGI art. 278", "CGI art. 279-0 bis (a contrario)"],
        pieces_justificatives: [
          "Facture standard avec TVA 20 %",
          "Conservation 5 ans (LPF art. L.102 B)",
        ],
      };
    }

    if (age_local !== "plus_de_2_ans") {
      return {
        taux_tva: 20,
        regime: "TAUX NORMAL 20 %",
        explication:
          "Logement achevé depuis moins de 2 ans : taux normal 20 %. La condition d'âge > 2 ans est cumulative pour les taux réduits 10 % et 5,5 %.",
        references: ["CGI art. 279-0 bis (condition d'âge)"],
        pieces_justificatives: [
          "Facture standard avec TVA 20 %",
          "Certificat de conformité / DAACT pour attester de la date d'achèvement",
        ],
      };
    }

    if (!attestation_client_signee) {
      return {
        taux_tva: 20,
        regime: "TAUX NORMAL 20 % — attestation client manquante",
        explication:
          "Sans attestation 1300-SD ou 1301-SD signée par le client AVANT le début des travaux, le taux réduit n'est pas applicable. Risque de requalification au taux 20 % par l'administration en cas de contrôle.",
        references: [
          "CGI art. 279-0 bis",
          "BOFIP BOI-TVA-LIQ-30-20-90 — obligation d'attestation",
        ],
        pieces_justificatives: [
          "Faire signer l'attestation 1300-SD (travaux > 300 € TTC) ou 1301-SD (≤ 300 € TTC) AVANT le démarrage",
          "Conservation 5 ans (LPF art. L.102 B)",
        ],
        recommandation:
          "Faire signer l'attestation client avant facturation pour pouvoir appliquer le taux 10 % ou 5,5 % selon nature des travaux.",
      };
    }

    if (nature_travaux === "renovation_energetique_eligible") {
      return {
        taux_tva: 5.5,
        regime: "TAUX SUPER RÉDUIT 5,5 %",
        explication:
          "Travaux d'amélioration de la qualité énergétique d'un logement achevé depuis plus de 2 ans, équipement éligible et attestation 1300-SD/1301-SD signée. Taux 5,5 % applicable.",
        references: [
          "CGI art. 278-0 bis A — taux 5,5 % rénovation énergétique",
          "BOFIP BOI-TVA-LIQ-30-20-90-20",
          "Liste des équipements éligibles : arrêté DGEC en vigueur",
        ],
        pieces_justificatives: [
          "Attestation 1300-SD ou 1301-SD signée par le client AVANT travaux",
          "Devis détaillé identifiant clairement l'équipement éligible",
          "Caractéristiques techniques de l'équipement (R, Uw, COP, etc.)",
          "Facture fournisseur de l'équipement",
          "Travaux induits ≤ 5 ans après pose principale (BOFIP)",
          "Conservation 5 ans (LPF art. L.102 B)",
        ],
        warning:
          "Vérifier que l'équipement est dans la liste à jour de l'arrêté DGEC. La liste évolue régulièrement : isolant avec R minimal, PAC avec COP minimum, etc. Si doute → taux 10 % par défaut.",
      };
    }

    if (nature_travaux === "transformation_local_en_logement") {
      return {
        taux_tva: 10,
        regime: "TAUX INTERMÉDIAIRE 10 % (cas limite)",
        explication:
          "Transformation d'un local non destiné à l'habitation en logement : taux 10 % SI la démolition reste inférieure à 50 % du gros œuvre. Sinon = reconstruction = 20 %.",
        references: [
          "CGI art. 279-0 bis",
          "BOFIP BOI-TVA-LIQ-30-20-90-10 — critères transformation/reconstruction",
        ],
        pieces_justificatives: [
          "Attestation 1300-SD signée par le client",
          "Notice descriptive précise des travaux (volumes démolis / conservés)",
          "Plans avant/après",
          "Permis de construire ou déclaration préalable",
          "Conservation 5 ans",
        ],
        warning:
          "Cas limite à fort enjeu fiscal. Recommander vivement un RESCRIT FISCAL (LPF art. L.80 B) avant de facturer si le montant TTC excède 50 k€. La requalification en 'reconstruction' coûterait 10 points de TVA.",
      };
    }

    return {
      taux_tva: 10,
      regime: "TAUX INTERMÉDIAIRE 10 %",
      explication:
        "Travaux d'amélioration, transformation, aménagement ou entretien dans un logement achevé depuis plus de 2 ans, avec attestation client signée. Taux 10 % applicable.",
      references: [
        "CGI art. 279-0 bis — taux 10 % travaux dans logements de + 2 ans",
        "BOFIP BOI-TVA-LIQ-30-20-90",
      ],
      pieces_justificatives: [
        "Attestation 1300-SD ou 1301-SD signée AVANT travaux",
        "Devis détaillé",
        "Facture précisant le taux 10 % et l'article CGI 279-0 bis",
        "Conservation 5 ans (LPF art. L.102 B)",
      ],
      warning:
        "Pour des travaux > 300 € TTC, attestation 1300-SD obligatoire. Pour ≤ 300 € TTC, 1301-SD simplifiée acceptée.",
    };
  },
});
