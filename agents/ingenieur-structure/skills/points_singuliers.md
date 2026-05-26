# Skill — Détecter et qualifier les points singuliers structure

L'utilisateur te transmet des **plans de coffrage / ferraillage / EXE** ou des **carnets de détails** sur lesquels tu dois identifier et analyser les **points singuliers** : jonctions, reprises, ancrages, scellements, joints, appuis. Ce sont les zones où **80 % des sinistres** structurels se concentrent.

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **Plans de coffrage et ferraillage** complets ou partiels (PDF, DWG)
- **Carnets de détails** (jonctions poteau-poutre, voile-dalle, fixation charpente, ancrages)
- **CCTP structure**
- **Note de calcul** précisant matériaux, classes d'exposition, charges
- **Plan de joints** et **plan des reprises de bétonnage** (PRB) si déjà produit
- Plans **EXE** (étude d'exécution) — c'est là que les points singuliers prennent leur forme définitive

Si pas de carnet de détails fourni : demande
1. Système constructif (BA coulé en place, préfabriqué, MOB, mixte) ?
2. Hauteur du bâtiment et longueur en plan (impacte joints de dilatation) ?
3. Zone climatique et exposition (gel/dégel, soleil direct) ?
4. Zone sismique (impacte armatures de continuité) ?
5. Sous-sol et niveau de la nappe (reprises, étanchéité) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("EC2 §8 ancrages recouvrements crochets")`
- `rag_search("EC2 §9 dispositions constructives nœuds")`
- `rag_search("EC2 §10 éléments préfabriqués")`
- `rag_search("DTU 21 reprises de bétonnage exécution")`
- `rag_search("DTU 20.1 joints maçonnerie")`
- `rag_search("CSTB recommandations professionnelles joints dilatation")`
- Sismique : `rag_search("EC8 §5 nœuds béton armé ductilité DCM DCH")`

## 3. Typologie des points singuliers à analyser

### A — Joints de dilatation / fractionnement

**Définition** : interruption volontaire de la structure pour absorber les déformations thermiques, retrait, tassement différentiel.

| Type | Espacement courant | Largeur |
|---|---|---|
| Joint de dilatation BA chauffé | 25 à 30 m | 2 à 4 cm |
| Joint de dilatation BA non chauffé | 15 à 25 m | 2 à 4 cm |
| Joint de retrait dallage | 5 à 6 m (carrés) | 5 mm scie |
| Joint sismique | selon EC8 § 4.3.5 (gap > 4 cm) | selon mouvement relatif |
| Joint de fractionnement carrelage | tous les 60 m² ou 8 m | 5-8 mm |

**Vérifications** :
- Espacement réel ≤ exigence EC2 §2 + AN française
- Continuité du joint **à travers tous les éléments** (planchers, voiles, façades, étanchéité)
- Joint **traversant** (pas d'élément qui ferme partiellement le joint)
- Présence de **bandes glissantes**, **profil de joint** type Polysolt / Servidec selon contexte
- Pour joints sismiques : largeur ≥ √(d1² + d2²) entre 2 bâtiments adjacents (EC8 § 4.4.2.7)

### B — Reprises de bétonnage (RB)

**Définition** : interface entre 2 phases de bétonnage successives. Zone potentiellement fragile.

**Vérifications** :
- **Localisation** des reprises **prévues au plan PRB** (et non improvisées sur chantier)
- Reprises **en zone de moment faible** (à proximité de mi-portée, pas aux appuis)
- **Préparation de surface** prescrite (repiquage, brossage métallique, eau, barbotine de liaison ou résine epoxy)
- **Aciers de couture** dimensionnés selon EC2 §6.2.5 (cisaillement à l'interface) :
  ```
  vRdi = c × fctd + μ × σn + ρ × fyd × (μ × sin α + cos α)
  ```
- Reprises sur **voiles haute hauteur** : tous les 3 à 4 m maxi en hauteur
- **Étanchéité** des reprises sous nappe (waterstop type bentonite hydrophile, PVC, EPDM)
- Conformité DTU 21 §6.1

### C — Nœuds poteau-poutre et nœuds de voile

**Vérifications EC2 §J / EC8 §5.6** :
- Présence d'**armatures transversales suffisantes** dans le nœud (= mêmes ou plus que les zones de confinement adjacentes)
- **Continuité des aciers longitudinaux** des poutres dans le poteau (ancrage droit ou crochet selon contexte)
- **Aciers de chaînage horizontal** (EC2 §9.10) :
  - Ftie,per = (20 + 4 × no) × Ai × γ avec no = nombre d'étages, Ai = espacement entre chaînages, γ = 0,07 kN/m
  - **Minimum 70 kN** pour bâtiment courant
- **Aciers de chaînage vertical** dans poteaux d'angle des bâtiments
- Zone sismique : longueur de confinement critique lcr selon EC8 §5.6
- Aciers de **frettage des nœuds extérieurs** (EC8 §5.6.3) en DCH

### D — Ancrages et scellements

**Types** :
| Type | Usage typique | Norme |
|---|---|---|
| Tige filetée scellée chimique | Reprise charpente, garde-corps, ancrage ponctuel | NF EN 1992-4 + ATE/ETE |
| Goujon HSL / chimique | Fixation lourde façade, équipement | ATE/ETE chevilles |
| Scellement carottage | Reprise armatures en existant | ATE/ETE produit |
| Ancrage typique poutre acier sur béton | Plaque + tiges d'ancrage | EC3 §6.2 + EC2 §J |
| Cheville à expansion / béton précomprimé | Charges modérées | Limitation EC2 §J |

**Vérifications** :
- **Profondeur d'ancrage** suffisante (hef selon ATE/ETE produit)
- **Distance aux bords** ≥ ccr (avoid pull-out cone overlap)
- **Espacement entre ancrages** ≥ scr
- **Classe d'exposition** compatible avec produit (chimique ne convient pas toujours à XA, gel humide, immersion)
- **Catégorie** d'ancrage (1 = sécurité / 2 = confort) ; ETE produit
- Calcul **EC 1992-4** ou **EC 1992-1-1 annexe J**

### E — Appuis (glissants, fixes, ponctuels)

**Pour planchers, poutres préfabriquées, charpentes** :
- **Longueur d'appui mini** : DTU 23.2 voile (5 cm BA, 6,5 cm maçonnerie creuse, 7 cm pleine), DTU 31.3 pour bois
- **Plot anti-vibratoire** ou **appui néoprène** : type, dimension, contrainte admissible
- **Appui glissant** entre 2 éléments à dilatations différentes : conforme au plan ?
- **Garde-corps en console** : moment et ancrage spécifique
- **Charpentes métalliques sur béton** : platine de répartition + boulons HR ou tiges scellées

### F — Trémies, gaines, percements

**Vérifications EC2 §9.2.1.2** :
- Percement diamètre **≥ 10 cm** dans poutre : armatures complémentaires (chevêtres, étriers de cousinage)
- Percement en **partie tendue** : armatures de renfort obligatoires
- Percement **à proximité de l'appui** (< h de la face d'appui) à proscrire
- **Trémies dans voile** : encadrement par armatures cadrant et longitudinales (2 à 4 HA selon dimensions)
- Trémies > 1/3 hauteur du voile : justification par calcul EF (éléments finis)

### G — Encastrements, consoles, porte-à-faux

- **Aciers chapeaux** longueur ≥ 0,5 × L (porte-à-faux) ; ancrage dans la portée opposée
- **Console** : moment maximum à l'encastrement, **acier supérieur** dominant
- **Vérification flèche** ELS quasi-permanente — porte-à-faux limite L/250
- **Vérification stabilité** au renversement si porte-à-faux > 1,5 m

### H — Pieux et liaisons pieu-semelle

- **Encastrement dans semelle** : aciers d'attente longueur ≥ 50 ϕ
- **Frettage tête de pieu** : cadres rapprochés sur 1 m
- **Diamètre / armature longitudinale** selon DTU 13.2

## 4. Procédure d'analyse

1. **Vérifier l'existence d'un plan des joints de dilatation** : si bâtiment > 25 m linéaire et pas de joint → alerte rouge.
2. **Vérifier le plan des reprises de bétonnage** : si absent → demander avant coulage.
3. **Identifier les nœuds critiques** sur plan (poteaux d'angle, poteaux supportant gros porte-à-faux, voiles porteurs avec trémies).
4. **Examiner les carnets de détails** un à un et pointer les **manquants** courants :
   - Joint sismique entre 2 corps de bâtiment adjacents
   - Détail traversée parking ↔ habitation (étanchéité + thermique)
   - Détail trémie ascenseur (sous-face dalle, voile, désolidarisation acoustique)
   - Détail nez de balcon (rupture thermique type Schöck Isokorb)
   - Reprise terrasse-acrotère avec étanchéité relevée
   - Détail palier escalier (désolidarisation acoustique en habitation)
5. **Vérifier ancrages charpente** sur béton (à classer en catégorie sécurité 1).
6. **Vérifier chaînages horizontaux et verticaux** (continuité, sections, ancrages).

## 5. Restitution structurée

```
## Points singuliers — [Bâtiment / Phase]

### Synthèse rapide
- **Plan PRB** (reprises de bétonnage) : ✅ fourni / ❌ manquant
- **Plan joints de dilatation** : ✅ / ❌
- **Carnets de détails fournis** : [liste, X / Y attendus]
- **Détails manquants identifiés** : [liste]

### Analyse par point

#### 1. Joints de dilatation et sismiques
- Espacement réel : [m] (max EC2 [m]) → ✅ / ⚠️
- Continuité joint dans tous les éléments : ✅ / ⚠️ / ❌
- Largeur de joint sismique : [cm] vs [exigence] → ✅ / ❌
- Recommandation : [...]

#### 2. Reprises de bétonnage
- Localisation par rapport aux moments : ✅ / ⚠️
- Préparation de surface prescrite : ✅ / ❌
- Aciers de couture : ✅ / ⚠️
- Étanchéité sous nappe : ✅ / N.A. / ⚠️

#### 3. Nœuds poteau-poutre et chaînages
- Continuité aciers longitudinaux : ✅ / ⚠️
- Chaînage horizontal Ftie,per ≥ 70 kN : ✅ / ❌
- Aciers de frettage zones critiques EC8 (si sismique) : ✅ / ❌ / N.A.

#### 4. Ancrages et scellements
- Référence ETE produit présente : ✅ / ❌
- Profondeur hef et distances bords : ✅ / ⚠️
- Classe d'exposition compatible : ✅ / ⚠️
- Catégorie 1 sécurité pour ancrages structurels : ✅ / ❌

#### 5. Trémies et percements
- Trémies dans poutres > ϕ 10 cm encadrées : ✅ / ❌
- Trémies dans voiles encadrées : ✅ / ❌
- Percements en partie tendue : ✅ / ⚠️

#### 6. Détails spécifiques manquants
- [Liste exhaustive des détails attendus mais absents]
- [Renvoi à carnets standards CSTB / NF P 03-001]

### Points bloquants ❌
- [Description + impact + action attendue]

### Points à corriger ⚠️
- [Description + recommandation]

### Niveau de confiance
- [Élevé / À valider avec carnets complets / À confirmer par BE]
```

## 6. Garde-fous spécifiques

- Tu **ne valides pas** les détails — c'est le **BE structure signataire** et le **bureau de contrôle** qui les valident.
- Pour les **ancrages chimiques en sécurité (catégorie 1)** : l'**ETE** (Évaluation Technique Européenne) du produit doit être **disponible** ; sans elle, l'ancrage est **non valide** pour usage structurel (NF EN 1992-4).
- Pour les **bâtiments en zone sismique 3+** ou catégorie d'importance III/IV, les exigences EC8 sur les **nœuds** et **chaînages** sont **prioritaires** sur EC2 standard.
- Pour les **bâtiments collectifs en habitation**, les **désolidarisations acoustiques** (planchers flottants, escaliers, gaines techniques) sont obligatoires (loi acoustique 1996, arrêté 30 juin 1999) — leur **carnet de détail acoustique** doit exister.
- Pour les **bâtiments à grande longueur** (> 30 m) : absence de joint de dilatation = quasi-certitude de fissuration en service.
- Tu **rappelles** que **l'absence d'un détail** ne signifie pas qu'il est libre à l'entreprise : la **norme** ou le **DTU correspondant** s'applique de fait, mais en cas de litige, c'est le BE et le MOE qui sont en faute de **conception**.
- Pour les **points singuliers ABF** (insertion sur existant, monument historique), prévoir des **carnets dédiés** validés par l'ABF.

## 7. Suites logiques à proposer

- Établissement / mise à jour du **plan PRB** (reprises de bétonnage) avant le démarrage du coulage
- Demande au BE structure des **carnets manquants** avant le **DCE** ou la phase **EXE**
- Saisine du **bureau de contrôle** pour validation des détails critiques (ancrages catégorie 1, nœuds sismiques, joints de dilatation)
- Mise au point des **détails acoustiques** avec un **BE acoustique** si bâtiment d'habitation collective
- Demande d'**ETE** des produits chimiques d'ancrage à l'entreprise avant approvisionnement
- Croiser avec la skill `analyse_plan_ferraillage` pour cohérence aciers / détails singuliers
- Coordonner avec la skill `verifier_descente_charges` pour les zones de fortes charges concentrées (consoles, porte-à-faux)
