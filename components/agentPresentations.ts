export type AgentPresentation = {
  mission: string;
  objectives: string[];
  whenToUse: string[];
  referentials: string[];
  deliverables: string[];
};

export const AGENT_PRESENTATIONS: Record<string, AgentPresentation> = {
  architecte: {
    mission:
      "Agent spécialisé en architecture, formé selon les exigences DPLG / HMONP françaises. Il assiste l'architecte praticien dans l'analyse réglementaire d'un projet — du PLU au permis de construire, en passant par la conformité PMR, incendie et RE2020.",
    objectives: [
      "Détecter les non-conformités réglementaires (urbanisme, PMR, incendie, RE2020)",
      "Calculer rigoureusement les surfaces selon le bon référentiel (SDP, ST, SHAB, Carrez, Boutin)",
      "Citer systématiquement l'article du code, l'arrêté ou la norme applicable",
      "Signaler les zones d'ambiguïté nécessitant interprétation humaine (ABF, dérogation, etc.)",
    ],
    whenToUse: [
      "Vérifier la faisabilité d'une opération sur une parcelle PLU",
      "Contrôler la conformité PMR d'un ERP existant ou neuf",
      "Déterminer le type et la catégorie d'un ERP, lister ses obligations",
      "Calculer les surfaces réglementaires d'un logement ou bâtiment",
      "Aider à rédiger la notice descriptive du permis de construire",
      "Vérifier une attestation RE2020 (Bbio, Cep, Ic, DH)",
    ],
    referentials: [
      "Code de l'urbanisme",
      "CCH (Code de la construction et de l'habitation)",
      "Arrêté PMR 20 avril 2017 et 8 décembre 2014",
      "Arrêté ERP 25 juin 1980",
      "RE2020 (arrêté 4 août 2021)",
      "Loi du 3 janvier 1977 sur l'architecture",
      "Loi MOP / Ordonnance 2018-1074",
    ],
    deliverables: [
      "Rapport d'analyse PMR avec tableau de non-conformités",
      "Note de faisabilité PLU avec verdict et démarches",
      "Tableau de surfaces par pièce et niveau",
      "Notice descriptive PC prête à signer",
      "Présentation insertion paysagère pour MOA",
    ],
  },

  moex: {
    mission:
      "Maître d'œuvre d'exécution (MOEX) expérimenté, formé à la mission DET/AOR selon la loi MOP. Il pilote l'exécution du chantier avec un œil de pilote opérationnel : détection d'écarts DCE/réalité, gestion des situations, OS, réserves OPR et sous-traitance.",
    objectives: [
      "Détecter les écarts entre le DCE et la réalité d'exécution",
      "Identifier les responsabilités (entreprise / MOA / MOE / sous-traitant)",
      "Connaître les délais réglementaires (préavis OS, GPA, biennale, décennale)",
      "Maîtriser la chronologie chantier (préparation, OPR, réception, GPA)",
      "Citer systématiquement le CCAG-Travaux (public) ou la NF P 03-001 (privé)",
    ],
    whenToUse: [
      "Rédiger un OS conforme (démarrage, modification, suspension, mise en demeure)",
      "Contrôler une situation de travaux mensuelle (cumul, révision, retenue de garantie)",
      "Analyser un compte-rendu de chantier (actions, retards, alertes)",
      "Contrôler la cohérence DCE (CCTP / DPGF / plans)",
      "Structurer la liste des réserves OPR et leur levée",
      "Calculer une révision de prix (indices BT/TP M-3)",
      "Vérifier une déclaration de sous-traitance (DC4, loi 1975)",
    ],
    referentials: [
      "CCAG-Travaux (arrêté 30 mars 2021)",
      "NF P 03-001 (marchés privés)",
      "DTU par lot",
      "Loi 75-1334 sur la sous-traitance",
      "Code du travail L.4532 (CSPS)",
      "Indices BT et TP (INSEE)",
    ],
    deliverables: [
      "Ordre de Service formel prêt à signer",
      "Tableau de contrôle de situation + recommandation de paiement",
      "Synthèse hebdomadaire chantier avec actions / alertes",
      "Mémoire en réclamation structuré (art. 50 CCAG)",
      "Reporting COPIL chantier (avancement, budget, planning, risques)",
    ],
  },

  economiste: {
    mission:
      "Économiste de la construction (formation UNTEC), expert en métré, chiffrage et analyse économique. Il appuie l'OPC et le MOE avec rigueur méthodologique : sources de prix tracées, hypothèses explicites, fourchettes d'incertitude par phase.",
    objectives: [
      "Maîtriser les unités de mesurage par lot (m³, m², ml, U, ens.)",
      "Distinguer quantité ouvrage et quantité matière",
      "Décomposer un prix unitaire (DS, FC, FG, BA selon méthode UNTEC)",
      "Indiquer systématiquement source du prix, mois de référence, hypothèses",
      "Signaler les postes sous-estimés ou les descriptifs CCTP trop flous",
    ],
    whenToUse: [
      "Produire un métré quantitatif à partir de plans cotés",
      "Chiffrer une DPGF poste par poste",
      "Décomposer un prix unitaire (sous-détail UNTEC)",
      "Comparer des offres entreprises (écarts, postes anormaux, complétude)",
      "Réviser un prix selon formule contractuelle et indices BT/TP",
      "Donner une estimation rapide au m² SDP (phase ESQ / APS)",
    ],
    referentials: [
      "NF P 03-001 (marchés privés)",
      "CCAG-Travaux art. 10 (révision/actualisation)",
      "Bordereaux Batiprix édition annuelle",
      "Méthode UNTEC (sous-détail de prix)",
      "Index BT01-BT55 et TP01-TP12 (INSEE)",
      "Ratios SGI / OEAP / UNTEC",
    ],
    deliverables: [
      "Métré détaillé par lot et ouvrage (XLSX)",
      "DPGF chiffrée poste par poste",
      "Sous-détail UNTEC (MO / MAT / FC / FG / BA)",
      "Tableau comparatif d'offres + analyse écarts",
      "Note de cadrage budget avec fourchettes",
      "Présentation budget COPIL avec scénarios",
    ],
  },

  geometre: {
    mission:
      "Géomètre-expert inscrit à l'Ordre (statut ordonnance 21 mai 1945), expert en topographie, foncier et urbanisme opérationnel. Il prépare les analyses qu'un OGE signera : bornages, surfaces légales, servitudes, divisions et DT-DICT.",
    objectives: [
      "Manipuler avec rigueur les référentiels Lambert 93, NGF-IGN69, RGF93",
      "Préciser pour toute surface mesurée le mode de mesurage et les exclusions",
      "Vérifier la cohérence titre / cadastre / mesurage",
      "Identifier les servitudes apparentes et cachées",
      "Connaître les seuils PA / DP pour les divisions parcellaires",
    ],
    whenToUse: [
      "Analyser un PV de bornage (amiable ou judiciaire)",
      "Calculer les surfaces légales (Carrez, Boutin, SHAB, SDP)",
      "Détecter et qualifier les servitudes d'une parcelle",
      "Vérifier la faisabilité d'une division parcellaire (PA, DP, modification cadastrale)",
      "Calculer les cubatures de terrassement (déblais / remblais)",
      "Préparer et suivre une procédure DT-DICT (réseaux enterrés)",
    ],
    referentials: [
      "Code civil art. 646 (bornage), 690-710 (servitudes), 2272 (prescription)",
      "Loi 96-1107 Carrez et loi 2009-323 Boutin",
      "Code de l'urbanisme (R.421-19, L.442)",
      "Norme NF S 70-003 (DT-DICT)",
      "Référentiels IGN Lambert 93 et NGF-IGN69",
      "Décret 2011-1241 (anti-endommagement)",
    ],
    deliverables: [
      "Rapport d'analyse foncière avec tableau cohérence",
      "Attestation de surfaces signable par OGE",
      "Note de servitudes + plan d'assiette",
      "Note de faisabilité de division parcellaire",
      "Tableau cubatures + bilan déblais / remblais",
      "Dossier DT-DICT complet avec récépissés",
    ],
  },

  "ingenieur-structure": {
    mission:
      "Ingénieur structure expérimenté, formé aux Eurocodes 0 à 8 avec leurs annexes nationales françaises. Il maîtrise les trois grandes filières (béton armé, charpente métallique, charpente bois) et accompagne le BE structure dans ses vérifications.",
    objectives: [
      "Indiquer pour toute vérification la référence normative précise (EC + AN)",
      "Préciser les hypothèses implicites (matériaux, classes d'exposition, durée d'utilisation)",
      "Déclarer un niveau de confiance (élevé / à valider / à confirmer par calcul)",
      "Ne jamais effectuer un calcul de dimensionnement définitif pour signature",
      "Vérifier la cohérence mission géotechnique ↔ phase projet",
    ],
    whenToUse: [
      "Vérifier une descente de charges (combinaisons ELU/ELS EC0)",
      "Contrôler une note de calcul (hypothèses, méthodes, conformité Eurocodes)",
      "Analyser un plan de ferraillage (sections, enrobages, ancrages EC2)",
      "Pré-dimensionner une poutre, un poteau, une dalle, un voile",
      "Analyser un rapport géotechnique G1 à G5 (NF P 94-500)",
      "Déterminer zone et catégorie sismique (EC8, arrêté 22/10/2010)",
      "Détecter les points singuliers (joints, reprises, ancrages, nœuds)",
    ],
    referentials: [
      "Eurocodes 0 à 8 + Annexes Nationales françaises",
      "DTU 13 (fondations), 21 (BA), 23 (voiles), 31 (bois), 32 (acier)",
      "NF P 94-500 (missions géotechniques G1 à G5)",
      "Arrêté 22 octobre 2010 (zonage sismique)",
      "Code civil art. 1792 (garantie décennale)",
    ],
    deliverables: [
      "Tableau descente de charges niveau par niveau + bilan ELU",
      "Rapport critique de note de calcul avec points d'attention",
      "Rapport de contrôle plan de ferraillage EC2",
      "Note de pré-dimensionnement + tableau sections",
      "Synthèse géotechnique avec recommandations de fondations",
      "Note de classement sismique EC8 + spectre de réponse",
    ],
  },

  "expert-comptable-btp": {
    mission:
      "Expert-comptable spécialisé BTP (formation DEC, portefeuille bâtiment / TP / sous-traitance). Il maîtrise les spécificités sectorielles : TVA travaux à 3 taux, autoliquidation sous-traitance, paie BTP via CIBTP, reconnaissance du revenu à l'avancement.",
    objectives: [
      "Ne jamais inventer un taux de TVA, une référence CGI ou un article",
      "Citer la référence textuelle (article CGI, CCAG, NF, BOFIP)",
      "Identifier le régime applicable (marché public CCAG vs privé NF P 03-001)",
      "Poser les questions de qualification avant de répondre",
      "Restituer une réponse structurée (situation, qualification, chiffré, références)",
    ],
    whenToUse: [
      "Déterminer le taux de TVA travaux (20 / 10 / 5,5 %)",
      "Vérifier l'autoliquidation BTP (art. 283 nonies CGI)",
      "Contrôler une situation de travaux côté comptable",
      "Vérifier une déclaration de sous-traitance (loi 75-1334)",
      "Ventiler un compte prorata de chantier (NF P 03-001 annexe A)",
      "Reconnaître le revenu à l'avancement (PCG / IFRS 15)",
      "Contrôler la paie BTP (CIBTP, indemnités déplacement, conventions)",
    ],
    referentials: [
      "CGI articles TVA travaux (278, 279-0 bis, 278-0 bis A, 283 nonies)",
      "BOFIP TVA-LIQ et BOI-TVA-DECLA",
      "Loi 75-1334 sur la sous-traitance",
      "CCAG-Travaux et NF P 03-001",
      "Conventions collectives BTP (IDCC 1596/1597/2609/2420/1702/2614/3212)",
      "PCG + IFRS 15 / IFRIC 15",
    ],
    deliverables: [
      "Note d'analyse TVA avec référence CGI et attestation à joindre",
      "Note de contrôle d'autoliquidation + écritures CA3",
      "Tableau de calcul % avancement + écritures comptables",
      "Note d'analyse sous-traitance loi 1975 + check-list vigilance",
      "Tableau de ventilation compte prorata par lot",
      "Tableau de contrôle paie BTP + bulletins corrigés",
    ],
  },
};
