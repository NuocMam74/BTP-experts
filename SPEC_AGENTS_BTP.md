# SPEC — Plateforme Chatbot BTP multi-agents

> Document destiné à **Claude Code** pour l'implémentation d'une plateforme SaaS proposant des agents conversationnels spécialisés par métier du BTP, vendus à l'unité par abonnement.

---

## 1. Vision produit

**Une seule application coquille** + **N agents modulaires** activables par licence Stripe.

- L'utilisateur arrive sur une page d'accueil listant les agents disponibles (ceux qu'il a achetés sont actifs, les autres sont en mode "essai / acheter").
- Il sélectionne un agent → entre dans un thread dédié → uploade ses documents techniques → discute.
- Chaque agent = **1 system prompt + 1 corpus RAG + N skills outillées + 1 modèle LLM**.
- **Pas d'orchestration multi-agents.** Un thread = un agent = un LLM call (avec RAG et tool use).

**Stack cible recommandée** (adaptable) : Next.js 14 (App Router) + TypeScript + Supabase (Auth, Postgres, Storage) + pgvector pour le RAG + Stripe + Anthropic Claude Sonnet 4.5 comme LLM par défaut.

---

## 2. Architecture & structure de répertoires

```
btp-agents/
├── apps/
│   └── web/                          # Next.js (shell utilisateur)
│       ├── app/
│       │   ├── (auth)/
│       │   ├── agents/               # Liste & sélection d'agents
│       │   ├── chat/[agentSlug]/     # UI conversationnelle
│       │   └── billing/              # Stripe customer portal
│       └── components/
│
├── packages/
│   ├── agent-runtime/                # Moteur générique d'agent
│   │   ├── src/
│   │   │   ├── loadManifest.ts       # Charge agent.json
│   │   │   ├── buildSystemPrompt.ts
│   │   │   ├── rag.ts                # Recherche pgvector
│   │   │   ├── tools/                # Skills exécutables (calculs, métrés…)
│   │   │   └── runConversation.ts
│   │   └── package.json
│   │
│   ├── document-parser/              # Parsing PDF / DWG / DOCX / XLSX
│   │   ├── pdf.ts                    # pdf-parse + pdfplumber côté worker Python
│   │   ├── dwg.ts                    # via librecad / oda-file-converter
│   │   └── ocr.ts                    # tesseract pour scans
│   │
│   └── shared-types/
│
├── agents/                           # ★ UN DOSSIER PAR AGENT
│   ├── architecte/
│   │   ├── manifest.json             # Métadonnées + skills + tools
│   │   ├── system.md                 # System prompt
│   │   ├── corpus/                   # Sources normatives à indexer
│   │   │   ├── cch_articles.md
│   │   │   ├── pmr_accessibilite.md
│   │   │   ├── erp_securite_incendie.md
│   │   │   └── re2020_conception.md
│   │   ├── skills/                   # Prompts spécialisés par tâche
│   │   │   ├── verifier_pmr.md
│   │   │   ├── analyser_plu.md
│   │   │   └── calculer_surfaces.md
│   │   └── examples/                 # Few-shot conversations
│   │
│   ├── moex/
│   ├── economiste/
│   ├── geometre/
│   ├── ingenieur-structure/
│   └── expert-comptable-btp/
│
├── infra/
│   ├── supabase/
│   │   └── migrations/
│   └── ingest/                       # Scripts d'indexation corpus → pgvector
│       └── ingestCorpus.ts
│
└── README.md
```

---

## 3. Schéma du manifest agent

Chaque agent doit déclarer un `manifest.json` conforme :

```json
{
  "slug": "architecte",
  "name": "Architecte DPLG / HMONP",
  "tagline": "Analyse PLU, conformité PMR & incendie, surfaces réglementaires",
  "version": "1.0.0",
  "model": "claude-sonnet-4-5",
  "stripe_price_id": "price_xxx",
  "monthly_price_eur": 49,
  "accepted_documents": [
    "pdf:plans_archi", "pdf:notice_pc", "pdf:cctp_archi",
    "pdf:plu", "dwg:plans", "ifc:maquette_bim"
  ],
  "skills": [
    { "id": "verifier_pmr", "label": "Vérifier conformité PMR" },
    { "id": "analyser_plu", "label": "Analyser un PLU pour faisabilité" },
    { "id": "calculer_surfaces", "label": "Calculer SDP / ST / SHAB / Carrez" },
    { "id": "verifier_erp", "label": "Vérifier classement & règles ERP" }
  ],
  "tools": [
    { "name": "calc_surfaces", "type": "javascript_function" },
    { "name": "rag_search", "type": "vector_search", "namespace": "architecte" }
  ],
  "corpus_namespace": "architecte",
  "system_prompt_path": "./system.md"
}
```

---

## 4. Spécification détaillée par agent

> Pour chaque agent, fournir : **identité**, **référentiels normatifs (corpus RAG)**, **skills**, **documents acceptés**, **system prompt synthétique**, **exemple de sortie attendue**.

---

### 4.1 — Architecte (DPLG / HMONP)

**Promesse client.** *"Uploade ton PLU, tes plans et ta notice PC : je te sors les non-conformités PMR, incendie et urbanisme, et je calcule tes surfaces réglementaires."*

#### Référentiels normatifs (corpus RAG à indexer)

| Référentiel | Source | Usage |
|---|---|---|
| Code de l'urbanisme | Legifrance | Faisabilité, PC, PA, DP |
| Code de la construction et de l'habitation (CCH) | Legifrance | Surfaces (R.111-22), responsabilités (L.111-13) |
| Arrêté 8 déc. 2014 (accessibilité ERP) | Legifrance | PMR — ERP existants |
| Arrêté 20 avril 2017 (accessibilité ERP neufs) | Legifrance | PMR — ERP neufs |
| Arrêté 24 déc. 2015 (accessibilité logements) | Legifrance | PMR — habitation |
| Arrêté 25 juin 1980 modifié (sécurité ERP) | Legifrance | Règlement de sécurité incendie ERP |
| Arrêté 31 janvier 1986 (sécurité habitation) | Legifrance | Sécurité incendie habitation 1re-4e famille |
| Arrêté 30 déc. 2011 (IGH) | Legifrance | Immeubles de grande hauteur |
| RE2020 — arrêté 4 août 2021 | Legifrance | Volet conception (Bbio, Cep, Ic) |
| Loi du 3 janvier 1977 sur l'architecture | Legifrance | Recours obligatoire à l'architecte (seuils) |
| Code de déontologie des architectes | Ordre des architectes | Devoirs professionnels |
| Loi MOP / Ordonnance 2018-1074 | Legifrance | Missions (ESQ, APS, APD, PRO, ACT, EXE, DET, AOR) |
| Norme NF P 03-001 | AFNOR | CCAG marchés privés |
| Code civil art. 1792 et suivants | Legifrance | Garanties (parfait achèvement, biennale, décennale) |

#### Skills (capacités outillées)

1. **`verifier_pmr`** — Analyse plans + notice → liste des non-conformités PMR avec article de référence et photo/coupe attendue. Sortie structurée : `{article, exigence, constaté, conformité, recommandation}`.
2. **`analyser_plu`** — Extraction des règles d'urbanisme applicables à une parcelle (zonage, emprise au sol, hauteur, recul, stationnement, espaces verts) + diagnostic de faisabilité d'un programme donné.
3. **`calculer_surfaces`** — Distingue **SDP** (surface de plancher, R.111-22 CCH), **ST** (surface taxable), **SHAB** (surface habitable, art. R.156-1 CCH), **Surface Carrez** (loi 1996 — copropriété), **Surface Boutin** (loi 2009 — locations meublées). Outil JS dédié.
4. **`verifier_erp`** — Détermine le **type** (J, L, M, N, O, P, R, S, T, U, V, W, X, Y) et la **catégorie** (1 à 5) selon effectifs déclarés. Liste les obligations correspondantes.
5. **`analyser_re2020`** — Lit attestation Bbio/Cep/Ic, vérifie le respect des seuils 2022/2025/2028/2031 selon la date de PC déposé.
6. **`rediger_notice_pc`** — Aide à la rédaction de la notice descriptive (Cerfa 13409) à partir d'un programme.

#### Documents acceptés

- Plans architecte (PDF, DWG) APS / APD / PRO / DCE
- Notice PC, formulaire Cerfa 13406/13409
- Règlement de PLU (PDF)
- CCTP architecte
- Attestation RE2020 / étude thermique
- Carnets de détails

#### System prompt (extrait clé — fichier `system.md`)

```
Tu es un agent spécialisé en architecture, formé selon les exigences DPLG / HMONP françaises.

Tu agis comme un assistant pour un architecte praticien qui te transmet des documents
techniques de projet. Ton rôle est de :
- Détecter les non-conformités réglementaires (urbanisme, PMR, incendie, RE2020)
- Calculer rigoureusement les surfaces selon le bon référentiel
- Citer systématiquement l'article du code, l'arrêté ou la norme applicable
- Signaler les zones d'ambiguïté nécessitant interprétation humaine (ABF, dérogation, etc.)

Tu n'inventes JAMAIS un article de code. Si tu n'as pas la référence exacte dans ton
corpus, tu le dis explicitement et tu indiques où l'utilisateur peut chercher.

Format de réponse pour les analyses réglementaires :
- Pour chaque point : [Article / Arrêté] → Exigence → Constat → Conformité → Recommandation
- Distingue clairement ERP existant / ERP neuf / habitation collective / maison individuelle

Tu connais les missions loi MOP et tu sais à quelle phase un document analysé correspond
(ESQ/APS/APD/PRO/DCE/EXE).
```

#### Exemple de sortie attendue (skill `verifier_pmr`)

```
## Analyse PMR — Plan RDC v3 du 12/03/2026

**Document analysé** : plan_RDC_v3.pdf, ERP type W catégorie 3 (effectif public 280 pers.)

### Non-conformités détectées (3)

1. **Sanitaires PMR** — Art. 12 §I arrêté 20 avril 2017
   - Exigence : au moins un cabinet adapté par sexe à chaque niveau accessible
   - Constat : un seul WC PMR mutualisé au RDC, dimensions 1,40 × 1,70 m
   - Conformité : ❌ Non conforme (dimensions OK mais mutualisation non admise pour ERP > 100 pers.)
   - Recommandation : prévoir 1 WC PMR homme + 1 WC PMR femme

2. **Cheminement extérieur** — Art. 2 §II arrêté 20 avril 2017
   - Exigence : pente ≤ 5 %, palier de repos tous les 10 m si pente > 4 %
   - Constat : rampe d'accès parking à 6,2 % sur 14 m sans palier
   - Conformité : ❌ Non conforme
   - Recommandation : reprendre profil ou ajouter palier intermédiaire

3. [...]
```

---

### 4.2 — Maître d'œuvre d'exécution (MOEX)

**Promesse client.** *"Pilote ton chantier : je détecte les incohérences DCE / réalité, j'analyse tes comptes-rendus, je sécurise tes OS et tes situations de travaux."*

#### Référentiels normatifs

| Référentiel | Source | Usage |
|---|---|---|
| CCAG-Travaux (arrêté 30 mars 2021) | Legifrance | Marchés publics travaux |
| Norme NF P 03-001 | AFNOR | CCAG marchés privés |
| Loi MOP / Ordonnance 2018-1074 | Legifrance | Missions MOE |
| Code de la commande publique | Legifrance | Marchés publics |
| DTU (tous lots) | CSTB | Règles de l'art par corps d'état |
| Code du travail L.4532 (CSPS) | Legifrance | Coordination SPS |
| Loi 75-1334 (sous-traitance) | Legifrance | DC4, paiement direct, action directe |
| Index BT et TP (INSEE) | INSEE | Révision et actualisation de prix |
| Code civil art. 1792-2304 | Legifrance | Garanties, réception, responsabilité |

#### Skills

1. **`controle_coherence_dce`** — Compare CCTP, DPGF et plans pour détecter incohérences (quantités, descriptifs, références produits).
2. **`analyse_cr_chantier`** — Extrait actions, retards, points bloquants et alertes d'un compte-rendu hebdomadaire.
3. **`rediger_os`** — Génère un ordre de service conforme (CCAG-Travaux art. 3.8) — démarrer/interrompre/reprendre/modifier.
4. **`controle_situation_travaux`** — Vérifie cohérence avancement physique / financier / retenue de garantie 5 % / révision de prix avec index BT.
5. **`gestion_reserves_opr`** — Structure les listes de réserves OPR et suit leur levée (J + 30, prolongations, refus).
6. **`controle_sous_traitance`** — Vérifie complétude DC4 (loi 1975) : acceptation conditions de paiement, agrément, caution.

#### Documents acceptés

- DCE complet (CCAP, CCTP, DPGF, plans)
- Comptes-rendus hebdomadaires
- OS, avenants, mémoires en réclamation
- Situations de travaux mensuelles
- DC4 et déclarations de sous-traitance
- PV d'OPR, de réception, listes de réserves

#### System prompt (extrait clé)

```
Tu es un Maître d'Œuvre d'Exécution (MOEX) expérimenté, formé à la mission DET/AOR
selon la loi MOP.

Tu lis les documents de chantier avec un œil de pilote opérationnel :
- Tu détectes les écarts entre le DCE et la réalité d'exécution
- Tu identifies les responsabilités (entreprise / MOA / MOE / sous-traitant)
- Tu connais les délais réglementaires (réception, GPA, biennale, décennale)
- Tu maîtrises la chronologie d'un chantier (préparation, exécution, OPR, réception)

Tu cites systématiquement l'article du CCAG-Travaux (public) ou de la NF P 03-001 (privé)
selon le contexte du marché. Si tu ne sais pas si le marché est public ou privé,
tu poses la question avant d'invoquer un article.
```

---

### 4.3 — Économiste de la construction

**Promesse client.** *"Donne-moi tes CCTP et tes plans : je sors un métré quantitatif, je chiffre, je compare aux offres reçues et je détecte les écarts marché."*

#### Référentiels normatifs

| Référentiel | Source | Usage |
|---|---|---|
| Norme NF P 03-001 | AFNOR | Bases de marchés privés |
| Bordereaux Batiprix | Groupe Moniteur | Prix unitaires actualisés |
| Bordereaux Capeb / FFB | Capeb, FFB | Prix unitaires artisans |
| Index BT01 à BT55 | INSEE | Indices Bâtiment |
| Index TP01 à TP12 | INSEE | Indices Travaux publics |
| CCAG-Travaux art. 10 (révision/actualisation) | Legifrance | Formules de révision |
| Méthode UNTEC | UNTEC | Sous-détails de prix |
| Ratios SGI / OEAP | Observatoires | Ratios au m² SDP par destination |
| DTU (tous) | CSTB | Bases de descriptifs |

#### Skills

1. **`metre_quantitatif`** — À partir de plans (PDF cotés ou DWG), produit un métré quantitatif par lot, par ouvrage élémentaire.
2. **`chiffrer_dpgf`** — Renseigne une DPGF vide à partir d'un CCTP et de bordereaux de prix.
3. **`sous_detail_prix`** — Décompose un prix unitaire en **déboursé sec** (MO, MAT, MAT' fournitures, MAT'' matériel), **frais de chantier**, **frais généraux**, **bénéfices et aléas**.
4. **`comparer_offres`** — Analyse comparative tableau d'offres : écarts au moyennage, postes anormalement bas/élevés, complétude.
5. **`reviser_prix`** — Applique formule de révision (CCAG art. 10.4.3) avec index BT au mois M-3 ou contractuel.
6. **`ratio_m2`** — Estimation rapide au m² SDP selon destination (logement collectif, bureaux, école, ERP type R, etc.).

#### Documents acceptés

- CCTP tous lots
- DPGF vide ou renseignée
- Plans (PDF cotés, DWG)
- Offres entreprises (mémoire technique + DPGF)
- Bordereaux fournisseurs
- Situations de travaux

#### System prompt (extrait clé)

```
Tu es un économiste de la construction (UNTEC), expert en métré, chiffrage et analyse
économique de projets bâtiment.

Tu connais les unités de mesurage par lot (m³ pour terrassement, m² pour étanchéité,
ml pour acrotères, U pour ouvertures, etc.). Tu ne confonds jamais quantité ouvrage et
quantité matière (ex : m² de mur fini ≠ m² de cloison brute).

Quand tu chiffres, tu indiques toujours :
- La source du prix (Batiprix édition N, retour marché, sous-détail)
- L'année / le mois de référence
- Les hypothèses prises (région, hauteur sous plafond, accessibilité chantier…)

Tu signales explicitement quand un poste est sous-estimé selon ratios marché ou quand
un descriptif CCTP est trop flou pour chiffrer sans hypothèse.
```

---

### 4.4 — Géomètre-expert

**Promesse client.** *"Uploade tes plans topo, ton cadastre et tes titres : je vérifie tes limites, je calcule tes surfaces légales, j'analyse tes servitudes et tes cubatures."*

#### Référentiels normatifs

| Référentiel | Source | Usage |
|---|---|---|
| Ordonnance 21 mai 1945 modifiée | Legifrance | Statut du géomètre-expert |
| Code de l'urbanisme art. L.442 (lotissement) | Legifrance | PA, déclaration préalable de division |
| Code civil art. 646, 690-710 | Legifrance | Bornage, servitudes |
| Loi Carrez (loi 96-1107) | Legifrance | Surfaces privatives en copropriété |
| Loi Boutin (loi 2009-323) | Legifrance | Surfaces habitables (location) |
| Loi ALUR (2014) | Legifrance | Mesurage en copropriété |
| Norme NF S 70-003-1/2/3 | AFNOR | DT-DICT (réseaux enterrés) |
| Référentiel Lambert 93 | IGN | Projection cartographique légale |
| Référentiel NGF-IGN69 | IGN | Altimétrie |
| Code rural et de la pêche maritime | Legifrance | Servitudes rurales |
| Décret 2011-1241 (DT-DICT) | Legifrance | Travaux à proximité de réseaux |

#### Skills

1. **`analyser_bornage`** — Vérifie cohérence PV de bornage / cadastre / titre de propriété. Détecte les empiètements potentiels.
2. **`calculer_surfaces_legales`** — Distingue **Carrez** (copropriété, > 1,80 m sous plafond), **Boutin** (habitable, exclut combles non aménagés), **utile**, **brute**. Outil JS dédié.
3. **`analyse_servitudes`** — Détecte et qualifie servitudes (passage, vue, tour d'échelle, écoulement des eaux, non aedificandi) à partir de titres et plans.
4. **`division_parcellaire`** — Vérifie faisabilité d'une division (PA ou DP selon contexte PLU + zone), conformité aux règles d'accès et raccordement.
5. **`cubatures_terrassement`** — À partir d'un MNT projet et MNT terrain naturel, calcule déblais / remblais / équilibre.
6. **`dt_dict`** — Aide à la rédaction et au suivi DT-DICT, identification des exploitants concernés via guichet unique.

#### Documents acceptés

- Plans topographiques (PDF, DWG)
- Extraits cadastraux (matrice, plan)
- PV de bornage
- Titres de propriété, actes notariés
- Plans de division
- Rapports DT-DICT, retours exploitants
- MNT (LandXML, DWG 3D)

#### System prompt (extrait clé)

```
Tu es un géomètre-expert inscrit à l'Ordre, expert en topographie, foncier et urbanisme
opérationnel.

Tu manipules avec rigueur les référentiels :
- Lambert 93 (EPSG:2154) pour la planimétrie en France métropolitaine
- NGF-IGN69 pour l'altimétrie
- RGF93 pour le géodésique

Pour toute surface mesurée, tu précises explicitement le mode de mesurage (loi Carrez,
Boutin, surface utile, SDP au sens R.111-22 CCH) et tu rappelles les exclusions
(hauteur < 1,80 m, balcons, terrasses, caves, etc.).

Tu connais les seuils PA / DP selon art. R.421-19 et R.421-23 du code de l'urbanisme,
et tu sais distinguer une opération de lotissement d'une simple division.
```

---

### 4.5 — Ingénieur structure (béton armé, charpente métallique, bois)

**Promesse client.** *"Uploade tes notes de calcul, plans de coffrage / ferraillage et rapport géotechnique : je vérifie ta descente de charges, ta cohérence Eurocodes et tes points singuliers."*

#### Référentiels normatifs (corpus prioritaire)

| Référentiel | Source | Usage |
|---|---|---|
| **Eurocode 0 (NF EN 1990)** + AN française | CEN / AFNOR | Bases de calcul, combinaisons d'actions |
| **Eurocode 1 (NF EN 1991)** + AN | CEN / AFNOR | Actions : poids propre, exploitation, neige, vent, thermique, accidentelles |
| **Eurocode 2 (NF EN 1992)** + AN | CEN / AFNOR | Béton armé et précontraint |
| **Eurocode 3 (NF EN 1993)** + AN | CEN / AFNOR | Charpente acier |
| **Eurocode 5 (NF EN 1995)** + AN | CEN / AFNOR | Charpente bois |
| **Eurocode 6 (NF EN 1996)** + AN | CEN / AFNOR | Maçonnerie |
| **Eurocode 7 (NF EN 1997)** + AN | CEN / AFNOR | Géotechnique |
| **Eurocode 8 (NF EN 1998)** + AN | CEN / AFNOR | Sismique |
| Arrêté 22 octobre 2010 (sismique) | Legifrance | Zonage sismique France + catégories d'importance |
| DTU 13.1, 13.2, 13.3 | CSTB | Fondations superficielles, profondes, dallages |
| DTU 21 | CSTB | Exécution des ouvrages en béton |
| DTU 23.1, 23.2 | CSTB | Murs en béton banché, parois et murs en BA |
| DTU 31.1, 31.2, 31.3, 31.4 | CSTB | Charpentes en bois (traditionnelle, MOB, lamellé-collé, trad. bois) |
| DTU 32.1, 32.2 | CSTB | Charpentes métalliques (acier, alu) |
| Norme NF P 94-500 | AFNOR | Missions géotechniques G1 → G5 |
| Règles PS-MI 89 / CP-MI Antilles | Legifrance | Sismique maisons individuelles (alternative simplifiée à EC8) |
| BAEL 91 / BPEL 91 | (résiduel) | Calcul aux états-limites — référence historique |

#### Skills

1. **`verifier_descente_charges`** — Reconstitue une descente de charges depuis la toiture jusqu'aux fondations, vérifie cohérence avec note de calcul fournie. Combinaisons ELU/ELS selon EC0.
2. **`controle_note_calcul`** — Lit une note de calcul (PDF), identifie les hypothèses (matériaux, classes d'exposition, durée d'utilisation, catégorie d'importance), vérifie cohérence avec Eurocodes applicables.
3. **`analyse_plan_ferraillage`** — Lit un plan de ferraillage, vérifie sections minimales d'armatures (EC2 §9), enrobage selon classe d'exposition (XC, XD, XS, XF, XA), longueurs d'ancrage et de recouvrement.
4. **`predim_poutre_poteau_dalle`** — Pré-dimensionnement rapide (élancement, taux d'armature, descente) selon EC2/EC3/EC5. Outil JS dédié pour calculs.
5. **`analyse_rapport_geotechnique`** — Lit un rapport G1/G2/G3/G4/G5, extrait : contraintes admissibles, tassements estimés, niveau de la nappe, agressivité du sol (classes XA), recommandations de fondations.
6. **`zonage_sismique`** — Détermine zone sismique (1-5) + catégorie d'importance (I-IV) selon arrêté 22/10/2010 et destination du bâtiment. Indique si EC8 ou PS-MI applicable.
7. **`points_singuliers`** — Détecte sur plans : joints de dilatation (espacement EC2 §2 / DTU 21), reprises de bétonnage, scellements, ancrages, appuis glissants.

#### Documents acceptés

- Notes de calcul (PDF) — Robot, Advance, Graitec, calculs manuels
- Plans de coffrage et ferraillage (PDF, DWG)
- Rapports géotechniques G1 à G5 (PDF, norme NF P 94-500)
- Plans EXE structure
- CCTP structure / béton / charpente

#### System prompt (extrait clé)

```
Tu es un ingénieur structure expérimenté, formé aux Eurocodes 0 à 8 avec leurs annexes
nationales françaises.

Tu maîtrises les trois grandes filières : béton armé / charpente métallique / charpente
bois. Tu sais reconnaître la filière à partir des plans et adapter tes vérifications.

Pour TOUTE vérification, tu indiques :
1. La référence normative précise (ex : EC2 §9.2.1.1 — section minimale d'armature
   tendue d'une poutre)
2. L'hypothèse implicite que tu prends si elle n'est pas dans le document
3. Le niveau de confiance de ton analyse (élevé / à valider / à confirmer par un calcul)

Tu n'effectues JAMAIS un calcul de dimensionnement définitif pour la signature : tu
proposes des vérifications et pré-dimensionnements indicatifs, et tu rappelles que la
note de calcul finale engage la responsabilité décennale du BET signataire.

Tu connais les missions géotechniques NF P 94-500 (G1 ES, G1 PGC, G2 AVP, G2 PRO,
G2 DCE/ACT, G3, G4, G5) et tu vérifies que la mission fournie correspond à la phase
du projet.
```

#### Exemple de sortie attendue (skill `controle_note_calcul`)

```
## Contrôle note de calcul — Bât. A — Indice C

**Bureau d'études** : XYZ Ingénierie
**Date** : 14/02/2026
**Logiciel** : Robot Structural Analysis 2024

### Hypothèses extraites

| Item | Valeur déclarée | Vérification |
|---|---|---|
| Béton | C25/30 | ✅ Cohérent classe d'exposition XC1 (intérieur sec) |
| Acier HA | B500B | ✅ Standard EC2 |
| Classe d'exposition | XC1 | ⚠️ À confirmer pour façades extérieures (XC4 attendu) |
| Catégorie d'importance | II | ✅ Logement collectif courant |
| Zone sismique | 2 (faible) | ✅ Strasbourg (zone 3 — modérée). **Incohérence détectée.** |
| Durée d'utilisation | 50 ans | ✅ Catégorie 4 EC0 |

### Points d'attention

1. **Zonage sismique** — Strasbourg est en zone 3 selon arrêté 22/10/2010 (et non zone 2).
   Combinaisons sismiques à reprendre. Impact potentiel sur chaînages et armatures
   de continuité.

2. **Classe d'exposition façades** — XC4 (gel-dégel humide) recommandé pour façades
   non protégées. Enrobage mini 30 mm (vs 15 mm pour XC1).

3. [...]
```

---

### 4.6 — Expert-comptable spécialisé BTP

**Promesse client.** *"Donne-moi tes situations, marchés et factures sous-traitants : je sécurise ta TVA travaux, ton autoliquidation BTP, ton avancement et ta loi 1975."*

#### Référentiels normatifs

| Référentiel | Source | Usage |
|---|---|---|
| Code général des impôts art. 278-0 bis A | Legifrance | TVA 5,5 % rénovation énergétique |
| CGI art. 279-0 bis | Legifrance | TVA 10 % travaux logements de + 2 ans |
| CGI art. 283 nonies | Legifrance | Autoliquidation TVA sous-traitance BTP |
| BOFIP — BOI-TVA-LIQ | impots.gouv.fr | Doctrine TVA travaux |
| Loi 75-1334 du 31 déc. 1975 | Legifrance | Sous-traitance, paiement direct, action directe |
| CCAG-Travaux (arrêté 30 mars 2021) | Legifrance | Retenue de garantie, caution, GAPD |
| Code de la commande publique | Legifrance | Marchés publics |
| Plan comptable général (PCG) | ANC | Cadre comptable général |
| Guide comptable des entreprises de BTP | FFB / Capeb | Spécificités sectorielles |
| IFRS 15 / IFRIC 15 | IFRS Foundation | Reconnaissance produits — contrats de construction |
| Convention collective Bâtiment (ouvriers, ETAM, cadres) | Legifrance | Paie, indemnités déplacement, congés payés caisse |
| Loi PACTE / ordonnances | Legifrance | Seuils contrôle légal, CAC |

#### Skills

1. **`calculer_tva_travaux`** — Détermine taux applicable (20 % / 10 % / 5,5 %) selon nature des travaux, âge du logement, attestation client (formulaire 1300-SD ou 1301-SD).
2. **`controle_autoliquidation_btp`** — Vérifie qu'une facture de sous-traitant BTP est en autoliquidation (HT, mention "Autoliquidation — article 283 nonies du CGI") et que le donneur d'ordre a bien collecté/déduit la TVA.
3. **`reconnaissance_revenu_avancement`** — Calcule pourcentage d'avancement (méthode coûts engagés / coûts totaux estimés ou avancement physique) et propose écriture comptable (compte 418 facturation à établir / 419 acompte client).
4. **`controle_situation_travaux`** — Vérifie : cumul + situation = montant marché, retenue garantie 5 %, révision selon formule contractuelle, TVA correctement appliquée, cohérence avec DPGF.
5. **`controle_sous_traitance_1975`** — Vérifie DC4 (marchés publics) ou contrat de sous-traitance (privé) : agrément MOA, conditions de paiement acceptées, caution personnelle ou délégation de paiement (loi 1975 art. 14).
6. **`compte_prorata`** — Ventile les charges communes de chantier (eau, électricité, gardiennage, bennes) entre lots selon clé contractuelle (norme NF P 03-001 annexe A).
7. **`controle_paie_btp`** — Vérifie : grilles de salaire conventionnelles, indemnités de panier, indemnités de trajet / déplacement (zones 1 à 5), congés payés via caisse CIBTP.

#### Documents acceptés

- Situations de travaux mensuelles (PDF, XLSX)
- Factures fournisseurs et sous-traitants
- DC4 et contrats de sous-traitance
- Marchés et avenants (CCAP)
- Cautions bancaires, GAPD
- Balance, grand livre, FEC
- Bulletins de paie, DSN

#### System prompt (extrait clé)

```
Tu es un expert-comptable spécialisé BTP (mémorialiste DEC, expérience cabinet
généraliste avec portefeuille bâtiment / TP / sous-traitance).

Tu maîtrises les spécificités sectorielles :
- TVA travaux à 3 taux (20 / 10 / 5,5) avec attestations client obligatoires pour
  taux réduits sur logements de + 2 ans
- Autoliquidation TVA en sous-traitance BTP (art. 283 nonies CGI) : tu sais distinguer
  les cas d'application (BTP au sens annexe III article 242 nonies A) et les exceptions
  (fournitures, matériel, sociétés intra-groupe étrangères, etc.)
- Reconnaissance de revenu à l'avancement vs achèvement
- Compte prorata (NF P 03-001 annexe A) — gestion des charges communes de chantier
- Loi 75-1334 sur la sous-traitance — agrément, paiement direct, action directe

Tu n'inventes JAMAIS un taux de TVA, une référence CGI ou un article de loi. Si le cas
soumis est limite, tu cites le BOFIP applicable et tu rappelles que le rescrit fiscal
est l'outil pour sécuriser.

Tu connais les seuils de contrôle légal des comptes (CAC obligatoire, dispense) selon
seuils PACTE.
```

---

## 5. Implémentation Claude Code — étapes recommandées

### Phase 1 — Fondations (1-2 sprints)

1. Initialiser monorepo Turborepo + Next.js 14 + TS strict.
2. Mettre en place Supabase (Auth + Postgres + pgvector + Storage).
3. Migrations SQL :
   - `agents` (catalogue avec metadata)
   - `user_agents` (entitlements via Stripe)
   - `conversations`, `messages`
   - `documents` (uploadés par l'utilisateur, lié à conversation)
   - `corpus_chunks` (vector_id, agent_namespace, source, content, embedding)
4. Stripe : produits + prix par agent + webhook pour `checkout.session.completed`.
5. Implémenter `packages/agent-runtime` :
   - `loadManifest(slug)` lit `agents/<slug>/manifest.json` + `system.md`
   - `runConversation(agent, userMessage, attachments)` — appel Anthropic avec tools
6. Implémenter `packages/document-parser` (PDF en priorité — pdf-parse + OCR fallback).

### Phase 2 — Premier agent vendable (1 sprint)

**Choisir l'agent à livrer en premier.** Recommandation : **Économiste** ou **Expert-comptable BTP**.
- Économiste = corpus borné (Batiprix, index INSEE) + ROI client immédiat (chiffrage)
- Expert-comptable BTP = corpus très précis (CGI, BOFIP) + douleur récurrente (autoliquidation)

Pour cet agent :
1. Constituer le corpus dans `agents/<slug>/corpus/` (sources publiques en priorité — Legifrance, BOFIP, INSEE).
2. Pipeline d'ingestion : `infra/ingest/ingestCorpus.ts` → chunks de 800 tokens avec overlap 100 → embeddings via `text-embedding-3-large` ou `voyage-3` → insertion pgvector avec namespace de l'agent.
3. Implémenter 2-3 skills outillés (`tools/`) en JS pur (calcul TVA, métré simple, etc.).
4. UI chat avec sélecteur de skill rapide (boutons préfabriqués qui injectent un prompt de skill).
5. Tests end-to-end : 10 cas réels par skill.

### Phase 3 — Industrialisation des 5 autres agents (1 sprint par agent)

Pour chaque agent, la procédure est répétable :
1. Constituer le `manifest.json` (copier d'un agent existant et adapter).
2. Rédiger `system.md` (gabarit + spécialisation).
3. Indexer le corpus dans pgvector avec `corpus_namespace` propre.
4. Implémenter les skills outillés spécifiques (calculs, parsing spécialisé).
5. Préparer 5 conversations few-shot d'exemple dans `examples/`.
6. Tests sur jeux de documents réels fournis par utilisateur expert métier.

### Phase 4 — Commercialisation

- Landing par agent (`/agents/architecte`, `/agents/economiste`…) avec démo interactive avant achat (3 messages gratuits).
- Customer portal Stripe pour gérer abonnements.
- Onboarding personnalisé par agent (vidéo 90 s + 2 documents d'exemple à uploader).

---

## 6. Schéma de base de données (extrait)

```sql
-- Agents (catalogue)
create table agents (
  slug text primary key,
  name text not null,
  tagline text,
  monthly_price_eur integer not null,
  stripe_price_id text not null,
  manifest jsonb not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Entitlements utilisateur
create table user_agents (
  user_id uuid references auth.users(id),
  agent_slug text references agents(slug),
  status text check (status in ('active','past_due','canceled','trialing')),
  stripe_subscription_id text,
  current_period_end timestamptz,
  primary key (user_id, agent_slug)
);

-- Conversations
create table conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  agent_slug text references agents(slug),
  title text,
  created_at timestamptz default now()
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  role text check (role in ('user','assistant','tool')),
  content jsonb not null,        -- support multimodal
  tool_calls jsonb,
  created_at timestamptz default now()
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  storage_path text not null,
  filename text not null,
  mime_type text,
  parsed_text text,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Corpus RAG (pgvector)
create extension if not exists vector;

create table corpus_chunks (
  id uuid primary key default gen_random_uuid(),
  agent_namespace text not null,    -- "architecte", "economiste", …
  source_ref text not null,         -- "EC2 §9.2.1.1", "CGI art. 279-0 bis", …
  source_url text,
  content text not null,
  embedding vector(1024) not null,
  metadata jsonb,
  created_at timestamptz default now()
);

create index corpus_chunks_embedding_idx
  on corpus_chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create index corpus_chunks_namespace_idx on corpus_chunks (agent_namespace);
```

---

## 7. Garde-fous métier (à implémenter dans tous les agents)

Chaque `system.md` doit inclure ces principes communs :

1. **Pas d'engagement de responsabilité** — l'agent assiste, il ne signe pas. Toute analyse doit rappeler que l'avis final relève du professionnel humain.
2. **Citation obligatoire** — toute affirmation réglementaire doit pointer un article / arrêté / norme. Si la source n'est pas dans le corpus, le dire.
3. **Aveu d'incertitude** — l'agent doit indiquer son niveau de confiance (élevé / à valider / à confirmer).
4. **Pas d'invention de jurisprudence** — refus catégorique d'inventer un arrêt ou une décision de cour.
5. **Date de référence** — l'agent rappelle que la réglementation évolue ; sa base de connaissance a une date de mise à jour à afficher.

---

## 8. Variables d'environnement (`.env.example`)

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Anthropic
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-sonnet-4-5

# Embeddings (Voyage ou OpenAI)
VOYAGE_API_KEY=
EMBEDDING_MODEL=voyage-3

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Storage
NEXT_PUBLIC_APP_URL=
```

---

## 9. Annexe — Liste consolidée des référentiels à indexer en priorité

### Sources Legifrance (API publique gratuite)
- Code de l'urbanisme
- Code de la construction et de l'habitation
- Code civil (art. 1792 et suiv., 646, 690-710)
- Code général des impôts (TVA travaux)
- Code de la commande publique
- Arrêtés PMR (8 déc. 2014, 20 avril 2017, 24 déc. 2015)
- Règlement de sécurité ERP (arrêté 25 juin 1980)
- Arrêté sismique (22 oct. 2010)
- CCAG-Travaux (arrêté 30 mars 2021)
- Loi 75-1334 (sous-traitance)
- Loi MOP / Ordonnance 2018-1074

### Sources AFNOR (payantes — acquérir licences)
- Eurocodes 0 à 9 + annexes nationales françaises
- NF P 03-001 (CCAG marchés privés)
- NF P 94-500 (missions géotechniques)
- NF S 70-003-1/2/3 (DT-DICT)

### Sources CSTB (payantes — acquérir licences)
- DTU par lot (13.x, 21, 23.x, 31.x, 32.x, 43.x, 52.x, etc.)
- Avis techniques pertinents

### Sources publiques diverses
- BOFIP (impots.gouv.fr — TVA travaux, autoliquidation)
- INSEE (index BT et TP)
- IGN (référentiels Lambert 93, NGF-IGN69)

### Bordereaux de prix (payants)
- Batiprix (Groupe Moniteur)
- Capeb / FFB

---

**FIN DU SPEC.**
Toute clarification, ambiguïté ou choix technique non tranché dans ce document doit
être remonté à l'utilisateur avant implémentation. Privilégier des PR petites et
fréquentes, agent par agent, plutôt qu'un big bang.
