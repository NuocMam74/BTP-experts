# Skill — Analyser et structurer un DCE

L'utilisateur veut **analyser un Dossier de Consultation des Entreprises (DCE)** avant lancement / remise d'offre : vérifier la **complétude** des pièces, la **cohérence CCTP ↔ DPGF**, et lever les **drapeaux rouges** (descriptifs flous, omissions, ambiguïtés) qui généreront des réclamations ou des écarts de chiffrage.

## 1. Documents attendus

- **Règlement de consultation (RC)** + **Acte d'engagement (AE)**.
- **CCAP** (clauses administratives : prix, révision, délais, pénalités, paiement, garanties).
- **CCTP** par lot (prescriptions techniques).
- **DPGF / DQE / BPU** (pièces à chiffrer).
- **Plans** (architecte, structure, fluides) + **CCTG** visé le cas échéant.
- **Rapports** géotechnique, RAAT amiante, diagnostics (PEMD, CREP) si réhabilitation/démolition.

Si pièces partielles, demande : marché **public** (CCAG-Travaux) ou **privé** (NF P 03-001) ? Type de marché (PGF / prix unitaires / mixte) ? **Allotissement** (lot unique / TCE / lots séparés) ? Phase (DCE complet / consultation partielle) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("pièces du DCE CCAP CCTP DPGF RC AE structure")`
- `rag_search("cohérence CCTP DPGF omissions doublons drapeaux rouges")`
- `rag_search("CCAG-Travaux 2021 consistance des travaux prix")`
- `rag_search("unités de mesurage par lot")` — pour contrôler les unités DPGF
- `rag_search("ou équivalent marque commande publique drapeau")`

## 3. Procédure

### Étape 1 — Inventaire et complétude des pièces

- Vérifier la **présence** de toutes les pièces (RC, AE, CCAP, CCTP, DPGF/DQE/BPU, plans, diagnostics).
- Vérifier la **hiérarchie des pièces** (ordre de priorité défini au CCAP/RC) et signaler les **contradictions inter-pièces**.
- Vérifier la cohérence de l'**allotissement** (découpage des lots vs corps d'état réels).

### Étape 2 — Cohérence CCTP ↔ DPGF (cœur de l'analyse)

- **Chaque poste DPGF** doit pointer un **article CCTP** (et inversement, chaque ouvrage CCTP doit être chiffrable dans la DPGF).
- Détecter :
  - **Omissions** : ouvrage décrit au CCTP mais **absent** de la DPGF (→ perte sèche en PGF).
  - **Doublons** : prestation comptée **deux fois**.
  - **Incohérences d'unités** : unité DPGF non conforme à la nomenclature lot (cf. corpus unités).
  - **Quantités incohérentes** avec les plans / le métré.

### Étape 3 — Drapeaux rouges CCTP / administratifs

- **« ou équivalent »** manquant après une marque (entorse commande publique).
- Renvoi à un **plan « à fournir ultérieurement »** → chiffrage sur hypothèse, réserve à émettre.
- **Absence de classement** (Euroclasses feu, UPEC, performances R/Rw/Uw).
- **Pas de DTU/CCTG** visé → présomption de règles de l'art.
- **CCTP générique** « copié-collé » non adapté au projet.
- **Variantes interdites** + zones d'ambiguïté → risque de réclamations.
- **CCAP** : régime de prix (ferme/révisable + formule + M0), retenue de garantie, avance, pénalités, délais — cohérence et complétude.

### Étape 4 — Synthèse et recommandations

- Lister les **questions à poser au MOA/MOE** (voie DCE / questions-réponses) **avant** remise d'offre.
- Hiérarchiser les risques (bloquant / majeur / mineur) et proposer des **hypothèses de chiffrage** explicites pour les points non levés.

## 4. Restitution structurée

```
## Analyse de DCE — [Projet]

### Complétude des pièces
| Pièce | Présente | Observation |
|---|---|---|
| RC / AE | | |
| CCAP | | régime prix, révision, garanties |
| CCTP par lot | | |
| DPGF / DQE / BPU | | |
| Plans | | |
| Diagnostics (géotech, RAAT, PEMD…) | | |

### Cohérence CCTP ↔ DPGF
| Anomalie | Lot / poste | Type (omission/doublon/unité/quantité) | Gravité | Action |
|---|---|---|---|---|

### Drapeaux rouges
| Drapeau | Localisation | Risque | Recommandation |
|---|---|---|---|

### Questions à poser (avant offre)
1. [...]
2. [...]

### Hypothèses de chiffrage prises (points non levés)
- [...]

### Verdict
- DCE : [exploitable / exploitable sous réserves / incomplet]
- Risques majeurs : [...]
```

→ Propose `generer_rapport({ titre, contenu, format: "docx", agent: "economiste" })` (note d'analyse DCE) ou **XLSX** (matrice de cohérence CCTP↔DPGF).

## 5. Garde-fous spécifiques

- Tu **ne chiffres pas** un poste à descriptif flou sans **poser une hypothèse explicite** et la signaler.
- Tu **ne corriges pas silencieusement** une incohérence DPGF/plan — tu la **signales** et demandes arbitrage MOA/MOE.
- Tu **rappelles** qu'en marché à **prix global et forfaitaire**, toute **omission** non décelée reste à la charge du titulaire (d'où l'importance du contrôle CCTP↔DPGF).
- Tu **vérifies** la présence du « **ou équivalent** » et signales toute mention de marque sans équivalence (commande publique).
- Tu **renvoies** au CCAP pour le régime de **révision** (formule, indice, M0) et ne supposes pas un prix ferme par défaut.
- Tu **n'engages pas** la responsabilité de l'économiste — analyse d'aide à la décision.

## 6. Suites logiques à proposer

- Skill `chiffrer_dpgf` une fois les incohérences levées.
- Skill `metre_quantitatif` pour recaler les quantités douteuses.
- Skill `reviser_prix` pour anticiper la clause de révision du CCAP.
- Skill `comparer_offres` après réception des offres (analyse ACT).
- **Liste de questions** formalisée à transmettre au MOA/MOE avant remise des offres.
