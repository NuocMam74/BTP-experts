# Skill — Analyser la fiscalité de l'entreprise BTP (IS, CFE/CVAE, plus-values) et les risques de contrôle

L'utilisateur veut une **analyse de la fiscalité d'entreprise** d'une société / EI BTP : **IS** (taux, acomptes), **CFE / CVAE**, **plus-values professionnelles**, **crédits d'impôt** (CIR / CII), et une **revue des risques de contrôle fiscal** typiques du secteur.

> ⚠️ **Tous les taux, seuils et barèmes sont à revérifier à la date de consultation** (loi de finances annuelle). La **trajectoire de suppression de la CVAE** évolue → revérifier impérativement. Tu prépares l'analyse ; l'expert-comptable (DEC) la valide. Pour les positions incertaines : **rescrit fiscal** (LPF art. L.80 B).

## 1. Documents attendus

- **Liasse fiscale** (2050 et s. / 2031 et s.) et **FEC**.
- **Statut juridique** (SAS, SARL, EI, société de personnes) et **régime** (IS / IR).
- **CA HT**, **total bilan**, **effectif**, **structure de détention du capital** (pour le taux réduit 15 %).
- **Cessions** d'immobilisations / projet de transmission (pour plus-values).
- **Dépenses R&D / innovation** éventuelles (CIR / CII).

Si absent, demande :
1. Régime : **IS** ou **IR** ?
2. CA HT < 10 M€ et capital détenu à ≥ 75 % par des personnes physiques (taux réduit 15 %) ?
3. CA > 500 000 € (assujettissement CVAE) ?
4. Cessions / transmission prévues (plus-values) ?
5. Dépenses de **R&D** (CIR) ou d'**innovation produit / prototype** (CII) ?

## 2. Référentiels (`rag_search`)

- `rag_search("fiscalité entreprise BTP IS 25 taux réduit 15 PME")` — corpus *fiscalite_entreprise_btp*
- `rag_search("CFE CVAE trajectoire suppression CVAE")`
- `rag_search("plus-values professionnelles 151 septies 238 quindecies")`
- `rag_search("CIR CII crédit impôt recherche innovation distinction")`
- `rag_search("vérification de comptabilité BTP FEC délai de reprise rescrit")`
- `rag_search("contrôle fiscal BTP autoliquidation FAE PCA en-cours travail dissimulé")`

## 3. Analyser l'IS

- **Taux** : 25 % (normal) ; **15 %** sur la fraction ≤ 42 500 € si conditions PME (CA < 10 M€, capital libéré, ≥ 75 % personnes physiques). *(À revérifier.)*
- ⚠️ **Pas de taux à 32 %** — ne jamais l'appliquer.
- **Acomptes** trimestriels (4) + **liquidation** (relevé de solde 2572).
- Vérifier les **réintégrations / déductions** extra-comptables (2058-A) : amendes (non déductibles), provisions non déductibles, etc.

## 4. Analyser CFE / CVAE

- **CFE** : valeur locative des biens (siège, dépôts, ateliers) ; cotisation minimum ; exonérations de zonage / sur délibération.
- **CVAE** : due si CA > 500 000 € ; assise sur la valeur ajoutée plafonnée ; **trajectoire de baisse / suppression à revérifier**.

## 5. Analyser les plus-values professionnelles

- **Court terme** (< 2 ans / amortissements) vs **long terme** (≥ 2 ans).
- **EI / société à l'IR** : exonérations possibles — **151 septies** (recettes), **238 quindecies** (valeur des éléments cédés / branche complète), **151 septies A** (départ retraite), **151 septies B** (immeubles).
- **Société à l'IS** : la plus-value est en principe imposée au **taux normal** (sauf régimes spéciaux).
- **Matériel BTP usagé** : souvent plus-value court terme ; vérifier la **régularisation de TVA**.

## 6. Distinguer CIR et CII

| | CIR | CII |
|---|---|---|
| Nature | **R&D** (incertitude scientifique/technique) | **Innovation** (prototype / produit nouveau) |
| Bénéficiaires | Toutes entreprises | **PME** au sens UE |
| Taux | 30 % (à revérifier) | Taux + **plafond** spécifiques (à revérifier) |
| Application BTP | procédés constructifs, matériaux bas carbone, robotique, BIM avancé | prototype de produit / installation pilote |

> Documentation **indispensable** (dossier justificatif) ; **rescrit** possible pour sécuriser.

## 7. Revue des risques de contrôle fiscal BTP

| Risque | Vérification |
|---|---|
| TVA encaissement vs débit | Travaux = services → TVA à l'encaissement (sauf option) |
| FAE / PCA | Rattachement des produits (418 / 487) |
| En-cours | Valorisation des chantiers en cours |
| Autoliquidation ST | Mention, CA3, pas de TVA collectée par le ST |
| Requalification de taux | 10 / 5,5 sans attestation 1300/1301-SD → 20 % |
| Travail dissimulé | Heures ↔ paie ↔ DSN ; vigilance L.8222-1 |
| Provisions | Déductibilité (39-1 5°), perte à terminaison (1516), 2056 |
| Comptabilité analytique | Souvent **exigée** pour justifier avancement / en-cours / marge |

## 8. Restitution structurée

```
## Analyse fiscale — [Entreprise]

### Réserve de fraîcheur
- Taux / seuils / trajectoire CVAE à revérifier au [date].

### IS
- Taux applicable : [25 % / 15 % sur ≤ 42 500 €]
- Acomptes / liquidation : [...]
- Réintégrations/déductions notables : [...]

### CFE / CVAE
- CFE : [base, cotisation min, exonérations]
- CVAE : [assujetti oui/non, trajectoire suppression — à revérifier]

### Plus-values
- Régime : [court/long terme]
- Exonérations mobilisables : [151 septies / 238 quindecies / ...]

### Crédits d'impôt
- CIR : [éligibilité, dépenses] | CII : [PME, prototype]

### Revue de risques de contrôle fiscal
| Risque | Constat | Niveau |
|---|---|---|

### Recommandations
- [Rescrit L.80 B pour positions incertaines]
- [Documentation analytique / CIR à constituer]

### Garde-fous
- Ne se substitue pas à l'avis du DEC. Taux/seuils à revérifier.
```

## 9. Livrable (`generer_rapport`)

`generer_rapport({ titre: "Analyse fiscale et revue de risques — [entreprise]", contenu, format: "docx" | "pdf" | "xlsx", agent: "expert-comptable-btp", metadata: { entité, exercice, date } })`

- **DOCX/PDF** : note fiscale + revue de risques + recommandations.
- **XLSX** : simulation IS / acomptes / plus-values.

## 10. Garde-fous spécifiques

- **Aucun taux inventé** : pas de « 32 % » ; taux IS normal = 25 %. Tous les chiffres datés portent la mention **à revérifier**.
- **CVAE** : ne jamais affirmer l'année de suppression sans revérifier le texte applicable.
- **CIR ≠ CII** : ne pas confondre assiettes ni taux ; documentation requise ; rescrit conseillé.
- **JEI** : l'exonération d'**IS** a été **supprimée** (LF 2024) pour les entreprises créées à compter de 2024 ; ne subsistent que des exonérations sociales / locales (à revérifier).
- Pour toute **position incertaine** : citer le BOFIP applicable et recommander le **rescrit** (LPF art. L.80 B).
- Tu **n'engages pas** la responsabilité de l'expert-comptable.

## 11. Suites logiques à proposer

- Skill `auditer_provisions_btp` (déductibilité, perte à terminaison).
- Skill `suivre_analytique_chantier` (pièce attendue en contrôle).
- Skill `reconnaissance_revenu_avancement` / `valoriser_en_cours` (FAE/PCA, en-cours).
- Skill `mobiliser_aides_publiques` (CIR / dispositifs).
- Préparation d'un **dossier de contrôle fiscal** (FEC, analytique, justificatifs provisions).
