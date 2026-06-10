# Sécurité incendie des structures — Eurocodes feu et réglementation

**Source :** parties « feu » des Eurocodes — NF EN 1991-1-2 (actions thermiques en cas d'incendie), NF EN 1992-1-2 (béton — EC2 feu), NF EN 1993-1-2 (acier — EC3 feu), NF EN 1994-1-2 (mixte — EC4 feu), NF EN 1995-1-2 (bois — EC5 feu), NF EN 1996-1-2 (maçonnerie — EC6 feu) avec leurs Annexes Nationales françaises ; réglementation : arrêté du 25 juin 1980 modifié (ERP), arrêté du 31 janvier 1986 modifié (bâtiments d'habitation), Code du travail (établissements recevant des travailleurs), arrêté du 22 octobre 1969 / réglementation IGH (arrêté 30 décembre 2011), arrêté parkings.

## 1. Vocabulaire et critères de performance

### Distinction comportement au feu / réaction au feu

- **Réaction au feu** : participation du matériau au développement de l'incendie (classement Euroclasses A1 à F, fumées s, gouttelettes d). Concerne les **matériaux** (isolants, revêtements). Hors champ du calcul de structure.
- **Résistance au feu (comportement)** : aptitude d'un **élément de construction** à conserver pendant une durée définie ses fonctions. C'est l'objet du calcul de structure au feu.

### Critères R / E / I (classement européen, durée en minutes)

| Critère | Signification | Concerne |
|---|---|---|
| **R** (Résistance / stabilité) | Capacité portante maintenue | Tout élément porteur (poteau, poutre, dalle, voile) |
| **E** (Étanchéité aux flammes et gaz chauds) | Pas de passage de flammes/gaz | Parois séparatives |
| **I** (Isolation thermique) | Face non exposée < 140 °C (moy.) / 180 °C (point) | Parois séparatives |

Exemples : **R 60** (poteau stable 60 min), **REI 120** (mur séparatif coupe-feu 2 h), **EI 30** (cloison pare-flammes). Durées normalisées : 15, 30, 60, 90, 120, 180, 240 min.

### Correspondance avec l'ancienne terminologie française

| Ancien (PV français) | Eurocode | Signification |
|---|---|---|
| **SF** (Stable au Feu) | **R** | Stabilité seule |
| **PF** (Pare-Flammes) | **RE** ou **E** | Stabilité + étanchéité |
| **CF** (Coupe-Feu) | **REI** ou **EI** | Stabilité + étanchéité + isolation |

## 2. Action thermique — courbe ISO 834 (NF EN 1991-1-2)

### Courbe nominale température-temps normalisée (incendie conventionnel)

```
θg = 20 + 345 × log10(8 t + 1)   (°C, t en minutes)
```
- t = 30 min → θg ≈ 842 °C
- t = 60 min → θg ≈ 945 °C
- t = 120 min → θg ≈ 1049 °C

Autres courbes nominales : **courbe hydrocarbures** (θ → 1100 °C, plateaux), **courbe feu extérieur**. Modèles avancés : **courbes paramétriques** (annexe A EN 1991-1-2, prise en compte de la charge calorifique réelle, ventilation, parois) — réservés aux ingénieries de sécurité incendie (ISI).

### Combinaison d'actions en situation d'incendie (accidentelle, EN 1990 §6.4.3.3)

```
E_d,fi = Σ Gk + ψ1,1 × Qk,1 + Σ ψ2,i × Qk,i  (+ A_d effet indirect thermique)
```
Le **niveau de chargement** en incendie est réduit : on définit η_fi = E_d,fi / E_d ≈ **0,5 à 0,7** (souvent ~ 0,65 par défaut).

## 3. Méthodes de vérification (les 3 niveaux)

| Niveau | Méthode | Effort |
|---|---|---|
| **1 — Valeurs tabulées** | Sections et enrobages minimaux lus dans des tableaux (EC2/EC5/EC6 feu) | Simple, sécuritaire, sans calcul |
| **2 — Modèle de calcul simplifié** | Section réduite / résistance réduite à chaud (k_y,θ acier, isotherme 500 °C béton, section efficace bois) | Calcul à la main / tableur |
| **3 — Modèle de calcul avancé** | Analyse thermomécanique transitoire (EF), courbes réelles | ISI, logiciels (Safir, Ansys) |

## 4. Béton armé au feu (NF EN 1992-1-2)

### Méthode des valeurs tabulées (annexe / §5)

Le critère R est assuré par une **dimension minimale** de section et une **distance au nu (axis distance) a** des armatures (a = enrobage + Ø/2). Le béton perd sa résistance et son enrobage protège les aciers de l'échauffement.

#### Poteaux BA (méthode A, art. 5.3.2) — valeurs indicatives

| Résistance | Côté min b_min (mm) / distance a (mm) — chargement courant |
|---|---|
| **R 30** | 200 / 25 |
| **R 60** | 250 / 35  (ou 350 / 31) |
| **R 90** | 350 / 45  (ou 450 / 40) |
| **R 120** | 350 / 57  (ou 450 / 51) |

#### Poutres BA (sur appuis simples, art. 5.6) — largeur b_min / distance a

| Résistance | b_min (mm) / a (mm) |
|---|---|
| **R 30** | 80 / 25 |
| **R 60** | 120 / 40 |
| **R 90** | 150 / 55 |
| **R 120** | 200 / 65 |

#### Dalles pleines BA (appui simple, 1 sens, art. 5.7) — épaisseur h_s / distance a

| Résistance | h_s (mm) / a (mm) |
|---|---|
| **REI 30** | 60 / 10 |
| **REI 60** | 80 / 20 |
| **REI 90** | 100 / 30 |
| **REI 120** | 120 / 40 |

> Tableaux **indicatifs (à confirmer par note de calcul au feu)** : les valeurs exactes dépendent du chargement μ_fi, du type d'appui (encastré/continu réduit les exigences), du nombre de lits d'armatures.

### Méthode simplifiée — isotherme 500 °C (annexe B)

On néglige le béton porté à plus de 500 °C (réputé sans résistance) et on conserve la section de béton « froide » avec sa résistance pleine ; les armatures voient leur f_yk réduit selon leur température (coefficient k_s(θ)). On recalcule M_Rd,fi sur la section réduite.

### Phénomène d'éclatement (spalling)

Risque pour **bétons à hautes performances** (f_ck ≥ 55) et bétons humides : ajout de **fibres de polypropylène** (≥ 2 kg/m³) pour limiter l'écaillage. À signaler en BHP.

## 5. Acier de construction au feu (NF EN 1993-1-2)

### Réduction de la limite d'élasticité avec la température — k_y,θ

L'acier nu n'a **aucune protection thermique** : il s'échauffe vite (facteur de massiveté A_m/V). La résistance s'effondre vers **500-600 °C**.

| Température θ_a (°C) | k_y,θ = f_y,θ / f_y | k_E,θ = E_θ / E |
|---|---|---|
| 20 | 1,00 | 1,00 |
| 100 | 1,00 | 1,00 |
| 200 | 1,00 | 0,90 |
| 300 | 1,00 | 0,80 |
| 400 | 1,00 | 0,70 |
| **500** | **0,78** | 0,60 |
| **600** | **0,47** | 0,31 |
| 700 | 0,23 | 0,13 |
| 800 | 0,11 | 0,09 |
| 900 | 0,06 | 0,0675 |

### Température critique θ_a,cr (art. 4.2.4)

Température à laquelle l'élément atteint la ruine sous son chargement de calcul en incendie :
```
θ_a,cr = 39,19 × ln[1/(0,9674 × μ0^3,833) − 1] + 482   (°C)
```
- μ0 = E_fi,d / R_fi,d,0 : degré d'utilisation à froid en situation d'incendie.
- Pour μ0 ≈ 0,6 → **θ_a,cr ≈ 540 °C** (valeur usuelle de référence).

### Protection des profilés (pour atteindre R30 à R120)

| Protection | Résistance typique atteinte |
|---|---|
| Acier nu | R 15 (souvent < R30) |
| **Peinture intumescente** (gonfle à la chaleur) | R 30 à R 120 (selon épaisseur sèche) |
| **Flocage** (projeté, fibres/plâtre) | R 60 à R 240 |
| **Plaques** (plâtre, silicate, vermiculite) | R 60 à R 180 |
| **Caisson béton / enrobage** | R 120 à R 240 |

L'épaisseur de protection se dimensionne d'après le **facteur de massiveté A_p/V** et la température critique visée (tables ECCS / DTU 32, PV produit).

## 6. Bois au feu (NF EN 1995-1-2) — vitesse de carbonisation

Le bois se **carbonise** en surface ; la couche carbonisée protège le cœur (la « section résiduelle » garde ses caractéristiques mécaniques). On dimensionne sur la **section réduite**.

### Vitesse de carbonisation β (art. 3.4)

| Produit | β0 (mono-dimensionnel) | βn (avec arrondis) |
|---|---|---|
| Bois massif résineux ρ ≥ 290 | 0,65 mm/min | 0,80 mm/min |
| **Lamellé-collé résineux** ρ ≥ 290 | 0,65 mm/min | **0,70 mm/min** |
| Bois feuillu ρ ≥ 290 | 0,50 mm/min | 0,55 mm/min |
| Panneaux (LVL, contreplaqué) | selon norme | selon norme |

### Profondeur carbonisée et section efficace

```
d_char,n = βn × t          (profondeur carbonisée au temps t)
d_ef = d_char,n + k0 × d0   (avec d0 = 7 mm, couche dégradée non porteuse)
```
- Section résiduelle efficace = section initiale − d_ef sur les faces exposées.
- Méthode dite « **de la section efficace** » (réduction de section), ou « de la résistance réduite ».

Exemple : poutre LC exposée 3 faces, R 60 → d_char,n = 0,70 × 60 = 42 mm ; d_ef ≈ 42 + 7 = 49 mm par face exposée. Le gros bois lamellé-collé offre une **excellente résistance au feu intrinsèque** (lente carbonisation).

## 7. Maçonnerie au feu (NF EN 1996-1-2)

Vérification essentiellement par **valeurs tabulées** (épaisseur de mur en fonction de REI exigé et du taux de chargement). Un mur en blocs béton ou terre cuite de 15-20 cm enduit atteint couramment **REI 60 à REI 120**. La maçonnerie est bon isolant (critère I facilement satisfait).

## 8. Réglementation française — degrés exigés

### Bâtiments d'habitation (arrêté 31 janvier 1986)

| Famille | Description | Stabilité au feu structure | Planchers CF |
|---|---|---|---|
| **1ère famille** | Individuel R+1 max | — (SF non exigée structurelle, sauf locaux) | — |
| **2e famille** | Individuel groupé / collectif R+3 max | **SF 1/2 h (R 30)** | CF 1/2 h |
| **3e famille A** | Collectif ≤ R+7, ≤ 28 m, accès échelle | **SF 1 h (R 60)** | CF 1 h |
| **3e famille B** | Collectif ≤ 28 m, conditions accès non remplies | **SF 1 h (R 60)** | CF 1 h |
| **4e famille** | Plancher haut du dernier niveau entre 28 et 50 m | **SF 1 h 1/2 (R 90)** | CF 1 h 1/2 |

> Au-delà de 50 m → **IGH** (Immeuble de Grande Hauteur).

### ERP (arrêté 25 juin 1980 modifié, art. CO 12-13)

La stabilité au feu de la structure dépend du **nombre de niveaux** et de la **hauteur du plancher bas du dernier niveau**.

| Configuration ERP | Stabilité au feu (structure) | Planchers (CF) |
|---|---|---|
| Simple rez-de-chaussée | structure SF **1/2 h** (souvent) | — |
| Différence de hauteur ≤ 8 m | **SF 1 h (R 60)** | CF 1 h |
| Plancher bas dernier niveau ≤ 28 m | **SF 1 h** | CF 1 h |
| Plancher bas dernier niveau > 28 m | **SF 1 h 1/2 (R 90)** | CF 1 h 1/2 |

Selon la catégorie (1 à 5, effectif) et le type (J, L, M, N, O, P, R, S, U, etc.), des exigences renforcées s'appliquent (notamment type **J** = handicapés/âgés, **U** = santé, **R** = enseignement, **L** = salles).

### IGH (immeubles de grande hauteur, > 28 m habitation / > 50 m autres)

- Structure **SF 2 h (R 120)** minimum, recoupement en compartiments, désenfumage, sécurité renforcée.

### Parcs de stationnement couverts

- Structure généralement **SF 1 h 1/2 (R 90)** ; parfois R 60 ou R 120 selon configuration (largement ouvert, surface, niveaux). Planchers CF entre niveaux.

### Établissements recevant des travailleurs (Code du travail)

- Stabilité au feu **R 1/2 h à R 1 h** selon hauteur et nombre de niveaux (art. R.4216-x), planchers CF correspondants.

## 9. Procédure de vérification structure au feu (synthèse)

1. **Déterminer le degré réglementaire exigé** (R / REI et durée) selon le type de bâtiment (ERP/habitation/IGH/parking/code travail), la hauteur et l'effectif.
2. **Identifier la fonction de l'élément** (porteur → R ; séparatif → EI ; les deux → REI).
3. **Choisir la méthode** : valeurs tabulées (rapide) ou modèle simplifié.
4. **Béton** : vérifier section min + distance a des aciers (tableaux EC2-1-2). **Acier** : déterminer θ_a,cr et dimensionner la protection (intumescent/flocage/plaques). **Bois** : calculer la section résiduelle (β × t) et revérifier la résistance. **Mixte** : EC4-1-2 (poteaux souvent OK sans protection).
5. **Conclure** sur la conformité et, le cas échéant, prescrire la protection rapportée.

## 10. Garde-fous

- Le **classement réglementaire** (ERP/habitation/IGH) relève du **coordonnateur SSI / du bureau de contrôle / de la commission de sécurité** ; l'ingénieur structure vérifie la **tenue mécanique** de l'élément pour le degré exigé.
- Les **valeurs tabulées** sont **sécuritaires mais indicatives (à confirmer par note de calcul au feu)** : un modèle simplifié peut justifier des sections moindres.
- La **protection rapportée** (peinture intumescente, flocage) doit disposer d'un **PV d'essai / ETE** couvrant le facteur de massiveté et la durée visée — sa mise en œuvre et son épaisseur sèche sont contractuelles.
- L'**éclatement (spalling)** des BHP au feu doit être traité (fibres polypropylène).
- En **ISI (ingénierie de sécurité incendie)**, les courbes paramétriques/avancées remplacent l'ISO 834 — démarche soumise à l'avis du laboratoire agréé et de la commission.

## Citations à utiliser

- NF EN 1991-1-2 + AN (actions thermiques incendie)
- NF EN 1992-1-2 + AN (béton au feu) ; NF EN 1993-1-2 + AN (acier au feu)
- NF EN 1994-1-2 (mixte au feu) ; NF EN 1995-1-2 (bois au feu) ; NF EN 1996-1-2 (maçonnerie au feu)
- Arrêté 25 juin 1980 modifié (ERP) ; arrêté 31 janvier 1986 modifié (habitation) ; réglementation IGH (arrêté 30 décembre 2011)
- Code du travail art. R.4216-1 et suivants

**Référence à citer :** Eurocodes feu (parties 1-2) + AN françaises + réglementation ERP/habitation/IGH. Sources : afnor.org, eurocodes.fr (CSTB), legifrance.gouv.fr.
