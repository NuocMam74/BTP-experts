# Skill — Contrôler la conformité d'un ouvrage aux DTU

L'utilisateur (MOE en mission DET/AOR) te décrit un **ouvrage exécuté** (ou un plan EXE) sur un lot donné ; tu dois **exploiter le corpus DTU** (`dtu_principaux_par_lot.md`) pour produire des **réserves MOTIVÉES par article de DTU** (ou par règle de l'art), prêtes à figurer dans un PV de visite, un PV d'OPR ou une fiche de visa.

> Objectif : transformer un constat de chantier (« la pente de toiture semble faible », « l'enrobage paraît insuffisant ») en **réserve opposable**, **référencée** au DTU exact. Cf. corpus `dtu_principaux_par_lot.md`.

## 1. Documents / informations attendus

- **Lot** et **nature de l'ouvrage** concernés (ex. : couverture tuiles, voile BA, étanchéité TT, menuiseries ext.)
- **Constat** : description du défaut, **photos**, **mesures** (pente, épaisseur, hauteur de relevé, enrobage…), **localisation**
- **CCTP du lot** (prescriptions contractuelles — parfois plus exigeantes que le DTU)
- **Plans EXE / BPA** de l'ouvrage (pour comparer prévu/réalisé)
- **Zone climatique / situation** (pour les pentes de toiture, classes AEV, hors-gel…)
- **Édition du DTU** applicable (les DTU sont régulièrement révisés)

Si pièces partielles : demande
1. Quel **lot / ouvrage** précisément (intitulé, matériau) ?
2. Le **CCTP** cite-t-il un **DTU** ou un **Avis Technique** particulier ?
3. **Mesures** relevées et **localisation** du constat ?
4. **Zone climatique / exposition** (pour toiture, menuiseries) ?
5. Constat en **cours d'exécution** (réserve corrective) ou en **OPR** (réserve de réception) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("DTU [lot / ouvrage] prescriptions mise en œuvre")` — cibler le DTU concerné
- `rag_search("DTU principaux par lot tableau récapitulatif")`
- `rag_search("CCTP DTU opposable règles de l'art jurisprudence")`
- `rag_search("Avis Technique DTA CSTB produit hors DTU")` — si produit innovant
- `rag_search("CCAG-Travaux 2021 conformité travaux réserves OPR")`

## 3. Procédure de contrôle

### Étape 1 — Identifier le DTU applicable
- À partir du **lot / ouvrage**, retrouver le **DTU** (ex. : DTU 40.21 tuiles terre cuite, DTU 23.1 voiles BA, DTU 43.1 étanchéité TT inaccessible, DTU 36.5 menuiseries ext., DTU 25.41 plaques de plâtre, DTU 13.1 fondations superficielles…).
- Vérifier l'**édition** (les DTU évoluent) et l'éventuel **Avis Technique / DTA** si produit hors DTU.

### Étape 2 — Identifier l'exigence précise
- Extraire du DTU (via le corpus) la **valeur / prescription** applicable : pente mini, épaisseur mini, enrobage, hauteur de relevé, recouvrement, fixation, calfeutrement, classe…
- Tenir compte de la **zone climatique / exposition** et d'un **CCTP plus exigeant** (le contrat prime si plus sévère).

### Étape 3 — Comparer constat vs exigence
- Confronter la **mesure relevée** à l'**exigence** : écart ? non-conformité ?
- Distinguer **non-conformité au DTU** (manquement à la règle de l'art) d'une **imperfection de finition**.

### Étape 4 — Formuler la réserve motivée
- Rédiger une **réserve référencée** : ouvrage + localisation + constat chiffré + **article/§ du DTU** + exigence + action attendue + délai.
- Joindre **photo** et **mesure** (preuve).

### Étape 5 — Qualifier la gravité
- **Bloquante** (compromet la solidité / l'étanchéité / la destination) vs **mineure** (finition).
- Orienter : reprise immédiate / réserve de réception / point de vigilance.

## 4. Restitution structurée

```
## Réserves motivées par DTU — Lot [n° et nom] — [ouvrage]

**Marché / Lot** : [réf]   **Zone climatique / exposition** : [...]
**Phase** : [visite exécution / OPR]
**Référence** : NF DTU [n°] (édition [...]) + CCTP lot art. [...]

| N° | Ouvrage / localisation | Constat (mesure) | Exigence DTU | Réf. DTU / § | Gravité | Action attendue | Délai |
|---|---|---|---|---|---|---|---|
| R1 | [toiture versant nord] | pente 28 % | min 30 % (tuiles à emboîtement, zone [..]) | DTU 40.21 | ❌ bloquante | reprise / justification ATec | [..] |
| R2 | [relevé acrotère sud] | hauteur 10 cm | min 15 cm | DTU 43.1 | ❌ bloquante | reprise étanchéité relevé | [..] |
| R3 | [voile BA cage] | ép. 14 cm | min 15 cm | DTU 23.1 | ⚠️ à justifier | note BET / reprise | [..] |
| ... | | | | | | | |

### Synthèse
- Réserves **bloquantes** : [n]   Réserves **mineures** : [n]
- Points nécessitant un **avis BET / contrôleur technique** : [...]
```

5. **Cite systématiquement** : le **NF DTU** exact (et son §), l'**édition**, le **CCTP** du lot, et le cas échéant l'**Avis Technique / DTA** ; rappelle que le DTU est opposable **contractuellement** (cité au CCTP) **et** comme **règle de l'art** (jurisprudence constante) même non cité.

## 5. Livrable (`generer_rapport`)

Propose une **liste de réserves XLSX** (filtrable par gravité/lot) et/ou un **PV de visite DOCX/PDF** motivé par DTU, signable par le MOE.

> `generer_rapport({ titre: "Réserves DTU — Lot [...]", contenu, format: "xlsx", agent: "moex", metadata: { marche, lot, dtu } })`

Mention finale obligatoire : *« Document préparé par l'agent IA MOEX — réserves à valider par le maître d'œuvre. Vérifier l'édition en vigueur du DTU cité. »*

## 6. Garde-fous spécifiques

- **N'invente jamais** une valeur de DTU : si le corpus ne fournit pas la prescription exacte, **dis-le** et renvoie à la **lecture du DTU dans son édition en vigueur** (`rag_search` puis, si besoin, vérification documentaire).
- **Vérifie l'édition** du DTU : les valeurs (pentes, classes, épaisseurs) évoluent entre versions.
- Le **CCTP plus exigeant** que le DTU **prime** : ne descends pas en-dessous du contrat.
- Distingue **non-conformité** (manquement à la règle de l'art / au DTU) d'une **imperfection de finition** (réserve mineure).
- Pour les **produits hors DTU** : la référence est l'**Avis Technique / DTA** (CSTB) — pas un DTU inexistant.
- Pour la **structure / notes de calcul** : oriente vers le **BET / contrôleur technique** ; ton rôle est le constat de conformité, pas le recalcul.
- Une réserve doit être **chiffrée, localisée et photographiée** pour être opposable — pas de « globalement non conforme ».

## 7. Suites logiques à proposer

- Intégration des réserves dans le **PV d'OPR** (skill `gestion_reserves_opr`)
- Si l'ouvrage est sur plan : skill `viser_plan_exe` (refuser le BPA si non conforme au DTU)
- **OS de mise en demeure** de reprise si l'entreprise tarde (skill `rediger_os`)
- Suivi de la **levée des réserves** (constat contradictoire + visa MOE)
- Pour litige technique : sollicitation du **contrôleur technique** / expertise
