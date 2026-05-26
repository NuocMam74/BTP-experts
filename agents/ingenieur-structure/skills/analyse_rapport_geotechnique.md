# Skill — Analyser un rapport géotechnique (G1 à G5)

L'utilisateur te transmet un **rapport géotechnique** (G1, G2, G3, G4 ou G5 selon la norme **NF P 94-500**) qu'il faut analyser pour en extraire les paramètres dimensionnants, vérifier sa cohérence avec la phase du projet et identifier les risques résiduels.

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **Rapport géotechnique** (PDF) émis par un bureau d'études géotechniques certifié — typiquement 30 à 100+ pages
- **Plan masse** et **plan de fondations envisagé** (si disponible)
- **Note de programme** (destination, hauteur, charges estimées)
- Parfois **rapport antérieur** sur la parcelle (G1 ancien, étude voisine)

Si le rapport n'est pas dans le contexte : demande
1. Mission géotechnique disponible (G1 ES, G1 PGC, G2 AVP, G2 PRO, G2 DCE/ACT, G3, G4, G5) ?
2. Date du rapport ?
3. Bureau d'études et qualification (USG, OPQIBI, etc.) ?
4. Phase du projet (faisabilité, esquisse, APS, APD, PRO, DCE, EXE, vie de l'ouvrage) ?
5. Type d'ouvrage (logement R+2 sur sous-sol, immeuble R+7, ERP, bâtiment industriel) ?

## 2. Référentiels (`rag_search` obligatoire)

Avant analyse, lance les requêtes :
- `rag_search("NF P 94-500 missions géotechniques G1 G2 G3 G4 G5")` — contenu attendu par mission
- `rag_search("EC7 NF EN 1997-1 calcul géotechnique")` — méthodes de calcul fondations
- `rag_search("DTU 13.1 fondations superficielles")` ou `rag_search("DTU 13.2 fondations profondes")` ou `rag_search("DTU 13.3 dallages")` selon contexte
- `rag_search("classes d'exposition XA agressivité sol béton")` — chimie du sol
- Si nappe : `rag_search("EC7 hydrogéologie nappe phréatique")`

## 3. Référentiel NF P 94-500 — Cadre des missions

| Mission | Phase projet | Contenu attendu |
|---|---|---|
| **G1 ES** (Étude de Site) | Avant achat / esquisse | Reconnaissance documentaire, contextes géologique/hydrogéologique, risques majeurs |
| **G1 PGC** (Principes Généraux de Construction) | Esquisse / APS | Hypothèses préliminaires de fondations, identification des aléas |
| **G2 AVP** (Avant-Projet) | APS / APD | Sondages, valeurs caractéristiques, types de fondations possibles |
| **G2 PRO** (Projet) | PRO | Dimensionnement avant-projet des fondations |
| **G2 DCE / ACT** | DCE / signature marché | Pièces écrites pour la consultation, suivi de l'attribution |
| **G3** (Étude et suivi d'exécution) | EXE | Étude d'exécution **par l'entreprise**, suivi |
| **G4** (Supervision géotechnique d'exécution) | EXE | Mission de **supervision** indépendante (MOA / MOE) |
| **G5** (Diagnostic) | Vie de l'ouvrage / sinistre | Diagnostic ouvrage existant |

**Règles fortes** :
- **G2 PRO obligatoire** pour les CCAP marchés publics et fortement recommandé en privé pour engager la conception.
- **G3 + G4 indissociables** : G3 est portée par l'entreprise, G4 par le MOA pour superviser. Les deux doivent coexister.
- **G1 ne dimensionne pas** : si seul un G1 est fourni en phase PRO ou EXE, c'est une **faute de mission** — exiger un G2 minimum.

## 4. Extraction des informations clés

### A — Contexte géologique et hydrogéologique

| Info | Où chercher | Action si absent |
|---|---|---|
| **Coupe lithologique** | Pages "Sondages" / "Profils" | Indispensable, sinon rapport incomplet |
| **Profondeur substratum** | Coupes sondages | Détermine type fondation |
| **Niveau de la nappe** | "Hydrogéologie" / piezomètres | Critique pour sous-sol et XS/XA |
| **Variations saisonnières nappe** | Mesures piezos sur durée | Demander |
| **Hétérogénéité terrain** | Comparaison sondages | Signaler |

### B — Paramètres mécaniques (par couche)

| Paramètre | Symbole | Usage |
|---|---|---|
| **Pression limite Ménard** | pl* (MPa) | Capacité portante fondations superficielles, calcul pieux |
| **Module pressiométrique** | EM (MPa) | Tassement et flambage pieux |
| **Cohésion non drainée** | cu (kPa) | Argiles, capacité portante immédiate |
| **Angle de frottement** | φ' (°) | Sables, capacité long terme |
| **Cohésion effective** | c' (kPa) | Sols cohérents long terme |
| **Poids volumique** | γ (kN/m³) | Pression géostatique |
| **Module Young** | E (MPa) | Tassements théoriques |
| **Coefficient consolidation** | cv (m²/s) | Cinétique tassement argile |
| **Tassement spécifique** | qs (kPa) | Pieux sous frottement latéral |
| **Résistance pointe** | qp (kPa ou MPa) | Pieux sous pointe |

### C — Recommandations de fondations

| Type | Quand l'employer | Contraintes |
|---|---|---|
| **Semelles superficielles** | Bon sol < 3 m, charge modérée | qadm souvent 0,1 à 0,4 MPa |
| **Radier général** | Sol homogène médiocre, sous-sol étanche, charges réparties | Tassement différentiel à maîtriser |
| **Pieux forés / battus** | Mauvais sol > 5 m + bon substratum | Longueur, diamètre, espacement |
| **Pieux frottement** | Pas de substratum porteur accessible | Capacité par frottement latéral |
| **Micropieux** | Reprise existant, accès difficile | Charges admissibles 20-50 t / micropieu |
| **Jet grouting / colonnes ballastées** | Renforcement sol mou | Méthode coûteuse |
| **Inclusions rigides** | Plate-forme remblai, dalles | Maille à dimensionner |
| **Puits courts** | Sol médiocre 2-4 m | Volume béton important |

### D — Risques et points d'attention

- **Agressivité chimique** (sulfates, chlorures) → classe d'exposition XA1, XA2, XA3 → impact sur **béton** (ciment CEM III/B ou HRS, type d'enrobage)
- **Présence d'argiles gonflantes** (smectites, montmorillonite) → risque retrait-gonflement (RG) → **fondations encastrées hors zone active** (généralement -1 m mini, voire -1,5 à -2 m en zone RG fort)
- **Présence de cavités** (gypse, marnières, anciennes carrières) → mission complémentaire
- **Risque de glissement** (pentes > 10°) → confortement
- **Risque sismique de sol** (sites S1, S2 selon EC8) → spectres de réponse spécifiques
- **Risque de liquéfaction** (sables saturés sous nappe en zone sismique) → étude complémentaire
- **Risque inondation, ruissellement, remontée nappe**
- **Sol pollué** (ICPE ancienne, hydrocarbures) → étude environnementale ICPE / Plan de Gestion

## 5. Procédure d'analyse

1. **Vérifier la cohérence mission ↔ phase projet** :
   - G1 ES / PGC → faisabilité / esquisse uniquement
   - G2 AVP / PRO → conception
   - G3 + G4 → exécution
   - Si **mission insuffisante**, signaler obligation contractuelle de monter en gamme.

2. **Extraire la lithologie** : nombre de couches, profondeurs, nature, caractéristiques mécaniques.

3. **Identifier le niveau de la nappe** :
   - Permanente ou saisonnière ?
   - Au-dessus de la cote de fondation ? Du dallage ?
   - Risque pour le sous-sol (cuvelage type 2 ou 3 selon NF P 11-221) ?

4. **Lister les recommandations de fondations** explicitées par le géotechnicien.

5. **Extraire les valeurs caractéristiques** (qadm, qcalc, tassement estimé, encastrement minimal).

6. **Identifier l'agressivité chimique** et la traduire en **classe d'exposition** XA correspondant à appliquer dans la conception béton.

7. **Lister les risques résiduels** mentionnés ou déductibles (RG, cavités, pentes, sismique, pollution).

8. **Vérifier la conformité au DTU** :
   - Fondations superficielles → DTU 13.1
   - Fondations profondes → DTU 13.2 (Mu 64, refonte 2012)
   - Dallages → DTU 13.3

## 6. Restitution structurée

```
## Analyse rapport géotechnique — [Projet]

### Identification
- **Bureau d'études géotech** : [nom, certification USG/OPQIBI]
- **Référence rapport** : [n° + date]
- **Mission** : G1 ES / G1 PGC / **G2 AVP** / G2 PRO / G2 DCE / G3 / G4 / G5
- **Phase projet utilisateur** : [APS / APD / PRO / DCE / EXE]
- **Cohérence mission ↔ phase** : ✅ / ⚠️ / ❌
- **Norme de référence** : NF P 94-500 (mise à jour 2013)

### Contexte
- **Géologie générale** : [formation, ère, contexte]
- **Lithologie** :
  | Profondeur | Nature | Notes |
  |---|---|---|
  | 0 à 1,5 m | Remblais hétérogènes | À décaper, non porteurs |
  | 1,5 à 4 m | Argile limoneuse marron | Compacité moyenne |
  | 4 à 10 m | Marnes consolidées | Substratum |
- **Nappe** : présente à [-X m / NGF Y], régime [permanent / saisonnier]
- **Risque RG** : [nul / faible / moyen / fort]
- **Sismique** : zone [n°], classe sol [A/B/C/D/E/S1/S2]
- **Agressivité** : classe XA[0/1/2/3]

### Paramètres mécaniques

| Couche | pl* (MPa) | EM (MPa) | c' (kPa) | φ' (°) | γ (kN/m³) |
|---|---|---|---|---|---|
| Argile limoneuse | 0,8 | 5 | 20 | 22 | 19 |
| Marne consolidée | 2,5 | 25 | 50 | 28 | 21 |

### Recommandations du géotechnicien
- **Type de fondations** : semelles superficielles ancrées dans marne, profondeur ≥ 4 m
- **Contrainte admissible** : qadm = 0,30 MPa ELS / 0,45 MPa ELU
- **Tassement estimé** : ≤ 2 cm
- **Encastrement minimum** : 4,5 m depuis TN, ou substratum confirmé
- **Cuvelage** : non requis (nappe à -5,5 m, plancher bas à -3 m)
- **Béton** : classe XA1 → CEM III/A 42,5 N ou CEM II/B-V 42,5 N PMES, E/C ≤ 0,55, classe résistance C30/37 mini

### Points d'attention identifiés
1. [Mission G2 AVP fournie alors que projet en phase DCE → demander G2 DCE]
2. [Variations saisonnières nappe non précisées — demander piezométrie sur 6 mois]
3. [Pas de mention d'analyse géochimique des sols pour XA → demander complément]
4. [Risque RG moyen → fondations ancrées hors zone active (1,5 m mini)]

### Conformité DTU
- **DTU 13.1** (semelles superficielles) : applicable, vérifier conditions ancrage et profondeur
- **DTU 21** (béton armé) : prévoir béton XA1 conforme

### Suites recommandées
1. Demander une mission **G2 PRO** complète si phase projet l'exige (norme NF P 94-500)
2. Anticiper la mission **G3 + G4** pour la phase EXE
3. Si risque RG : prévoir **étude G2 RG** complémentaire + soubassement avec joint de rupture si nécessaire
4. Si nappe et sous-sol envisagé : étudier **cuvelage** selon NF P 11-221

### Niveau de confiance
- [Élevé / Moyen / Faible — selon complétude du rapport et adéquation à la phase]
```

## 7. Garde-fous spécifiques

- Tu **ne te substitues pas** au géotechnicien — son rapport engage sa **responsabilité contractuelle** ; tu prépares la lecture pour l'ingénieur structure ou l'architecte utilisateur.
- Si la mission disponible est **inférieure** à ce qu'exige la phase (ex : G1 PGC en phase PRO), tu le **signales fermement** : exiger la **montée en gamme** car la couverture assurantielle (décennale) du BE structure peut être **discutée** sinon.
- Tu **rappelles** que la **G3** est portée par l'**entreprise** (avec son propre BE géotech) et la **G4** par le **MOA** (BE géotech indépendant) — les deux sont **complémentaires et obligatoires** en exécution.
- Pour les **fondations profondes** (pieux), la **G2 PRO** doit comporter les **calculs préliminaires** (capacité, longueur estimative) selon DTU 13.2 — sinon insuffisante.
- Pour les **terrains à risque RG** (zonage Géorisques), tu **rappelles** la **fiche d'information acquéreur** depuis loi ELAN (article L.125-5 code de l'environnement).
- Si **sol pollué suspecté** (friche industrielle, ICPE), tu **rappelles** que c'est hors champ NF P 94-500 et qu'une étude **Plan de Gestion** au sens méthodologie du Ministère est requise.
- Tu n'**inventes pas** de valeurs caractéristiques absentes du rapport : si un paramètre manque, tu le **listes** comme **complément à demander**.

## 8. Suites logiques à proposer

- Vérification de la **descente de charges** avec la skill `verifier_descente_charges` pour confronter les charges réelles aux contraintes admissibles
- Confirmation des **classes d'exposition** XA / XC / XS / XF pour le béton via la skill `analyse_plan_ferraillage`
- Si **fondations profondes**, demander une **note de calcul pieux** spécifique au BE structure
- Demander **mission G2 PRO ou G2 DCE** si manquante
- Anticiper l'**Atterterm** (acte de cession ou de garantie) si terrain en zone RG fort
- Vérification du **zonage sismique** avec la skill `zonage_sismique` pour conditions spectrales du sol
- Sur **zones inondables** : croiser avec PPRi (plan de prévention des risques inondation)
