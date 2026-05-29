# Descente de charges — Méthodologie

**Source :** NF EN 1990 (combinaisons d'actions) et NF EN 1991 (actions) ; DTU 13.1 et 13.2 (fondations) ; pratique BE structure.

## Objectif d'une descente de charges (DC)

Calculer les **efforts** apportés à chaque élément porteur d'un bâtiment, du niveau le plus haut jusqu'aux **fondations**, pour :
- Dimensionner les **poteaux, voiles, poutres**
- Dimensionner les **fondations** (semelles, radiers, pieux)
- Vérifier la **portance du sol**
- Justifier la **stabilité d'ensemble** (renversement, glissement, soulèvement)

## Charges à intégrer

### Permanentes (G)

- **Poids propre** des éléments structurels (béton, acier, bois) selon EC1-1-1
- **Charges permanentes appliquées** : revêtements de sol, faux plafonds, isolation, cloisons fixes, étanchéité, équipements fixes (chaufferies, ascenseurs)

### Variables (Q)

- **Charges d'exploitation** selon catégorie d'usage (Tab. 6.1 EC1-1-1) :
  - Logement A1 : 1,5 kN/m²
  - Bureaux B : 2,5 - 3,5 kN/m²
  - Lieux de réunion C2-C5 : 4,0 - 5,0 kN/m²
- **Neige** S selon EC1-1-3
- **Vent** W selon EC1-1-4 (descendant uniquement pour la DC ; horizontal en stabilité)

### Accidentelles / sismiques

- Action sismique selon EC8 (en cas de zone sismique 2 et plus)
- Choc, explosion, séisme : combinaisons spécifiques

## Combinaisons à considérer

### ULS — combinaison fondamentale (la plus défavorable)

```
N_Ed = 1,35 × G + 1,5 × Q_1 + Σ 1,5 × ψ_0 × Q_i
```

### ELS — caractéristique

```
N_serv = G + Q_1 + Σ ψ_0 × Q_i
```

### ELS — quasi-permanente (déformations, fissuration)

```
N_qp = G + Σ ψ_2 × Q_i
```

→ La DC est généralement présentée en **ULS** (dimensionnement) et **ELS** (déformations, fondations).

## Méthode classique — bâtiment courant

### 1. Lecture des plans

- Plans d'architecte (DCE/PRO)
- Plans de coffrage structure
- Implantation des **poteaux, voiles, poutres, refends**
- Hauteurs entre niveaux
- Identification des **trémies, balcons, terrasses**

### 2. Surfaces d'influence

À chaque niveau, attribuer à chaque **élément porteur** sa **surface d'influence** (zone qu'il porte) :

- **Poteau axé** : zone rectangulaire centrée (1/2 portée vers chaque appui adjacent)
- **Poteau de rive** : zone réduite (1/2 portée intérieure + débord extérieur)
- **Poteau d'angle** : 1/4 d'une trame
- **Voile** : zone affectée selon plan de charge

### 3. Calcul des charges par niveau

Pour chaque élément porteur, à chaque niveau :

```
N_niveau = (G_dalle + Q_exp) × S_influence + N_voile_porteur + N_équipement
```

### 4. Sommation niveau par niveau

```
N_total_poteau = N_R+3 + N_R+2 + N_R+1 + N_RDC + N_poteau_propre_3niveaux
```

### 5. Fondation

À la base du poteau/voile, on obtient :

```
N_Ed (ULS) à transmettre à la semelle / pieu
N_serv (ELS) pour la vérification de la portance
```

## Exemple — descente de charge d'un poteau central (logement R+5)

### Données

- Bâtiment R+5 + combles aménagés en logement
- Trame 5,50 m × 6,00 m → surface d'influence S = 33 m²
- Poteau central 30 × 30 cm en C25/30
- Charges :
  - **G_dalle BA 22 cm** : 0,22 × 25 = 5,5 kN/m²
  - **G_revêtement** (carrelage + colle + chape) : 1,8 kN/m²
  - **G_cloisons mobiles** (forfait) : 0,5 kN/m²
  - **G_faux plafond + isolation** : 0,3 kN/m²
  - **G_total** = 8,1 kN/m²
  - **Q_logement A1** = 1,5 kN/m²

### Calcul par niveau

| Niveau | G + Q par m² | × S = | Q ULS sur niveau |
|---|---|---|---|
| Toiture (terrasse étanchée + équip.) | G = 6,5 + S = 0,9 (sk = 0,55 zone B2) | 33 m² × (1,35×6,5 + 1,5×0,9) = | 334 kN |
| R+5 plancher | 1,35×8,1 + 1,5×1,5 = 13,2 | 33 × 13,2 = | 436 kN |
| R+4 plancher | idem | | 436 kN |
| R+3 plancher | idem | | 436 kN |
| R+2 plancher | idem | | 436 kN |
| R+1 plancher | idem | | 436 kN |
| RDC plancher | idem | | 436 kN |
| **N_Ed à la base du poteau** | | | **2 950 kN** |
| Poids propre du poteau (h tot = 18 m) | 0,30 × 0,30 × 25 × 18 × 1,35 = | | + 55 kN |
| **N_Ed total** | | | **~ 3 005 kN** |

### Vérification du poteau RDC

Pré-dim BA :
```
A_c_requis ≈ N_Ed / (0,7 × f_cd) = 3 005 / (0,7 × 25/1,5 × 10³) = 0,257 m²
```
Soit poteau ~ 51 × 51 cm — supérieur à 30 × 30 cm prévu. **Le poteau doit être redimensionné** : soit augmenter la section, soit augmenter la classe de béton, soit ajouter des aciers comprimés (calcul détaillé).

### Vérification de la fondation

- Sol porteur (G2 PRO) : portance ELS admissible q_admis = 0,2 MPa = 200 kN/m²
- N_serv ≈ N_Ed / 1,35 ≈ 2 230 kN
- Section semelle requise = 2 230 / 200 = 11,1 m² → soit semelle de **3,40 × 3,40 m**, hauteur ≈ 80 cm

## Coefficients de réduction (charges variables — α_n art. 6.3.1.2 EC1-1-1)

Pour les bâtiments à plusieurs niveaux, la probabilité que toutes les charges d'exploitation soient maximales simultanément est faible.

### Coefficient α_A pour les grandes surfaces (cat. A à E)

```
α_A = 5/7 × ψ_0 + A_0/A ≤ 1,0
```
- A_0 = 10 m²
- A : surface d'influence considérée
- Pour A = 33 m² (exemple) et A_0 = 10 m² : α_A ≈ 0,80

### Coefficient α_n pour les bâtiments à plusieurs étages

```
α_n = (2 + (n - 2) × ψ_0) / n
```
- n : nombre d'étages au-dessus de l'élément (incluant lui-même)
- Pour n = 6 étages et ψ_0 = 0,7 : α_n = (2 + 4 × 0,7) / 6 ≈ 0,80

### Application

À la base d'un poteau de R+5 : multiplier la charge variable cumulée par α_n ≈ 0,80.

Sur l'exemple :
- Q totale brute : 6 × 33 × 1,5 = 297 kN
- Q réduite : 297 × 0,8 = **237 kN**
- Économie : 60 kN sur le poteau (réduction du surdimensionnement)

## Stabilité d'ensemble

### Renversement (sous vent ou séisme)

```
Stabilité vérifiée si : Σ Moments stabilisants ≥ γ_renv × Σ Moments destabilisants
```
- Moments stabilisants = G × bras de levier
- Moments destabilisants = W (vent) × hauteur × surface
- γ_renv ≥ 1,5 (sous vent)

### Glissement

Vérifié par les frottements sol/fondation + butées de palplanches éventuelles.

### Soulèvement

Pour bâtiment léger (hangar) ou en cas de vent ascensionnel : poids minimal de fondation + ancrages.

## Documents de sortie

### Note de descente de charge

Doit comporter :
- Hypothèses (charges G, Q, neige, vent — sources EC1)
- Surfaces d'influence par poteau et niveau
- Tableau par niveau avec récap des charges
- N_Ed final à la base + N_serv
- Réactions sur fondations (semelle, pieu)
- Note de pré-dimensionnement du poteau/voile/fondation associée

### Plan de descente de charge

- Plan par niveau avec les charges descendant à chaque poteau/voile
- Couleur ou symboles pour distinguer ULS / ELS
- Référencement aux fondations

## Méthode informatisée

### Logiciels courants

| Logiciel | Domaine |
|---|---|
| **Robot Structural Analysis** (Autodesk) | Calcul EF général BA / acier / bois |
| **RFEM / RSTAB** (Dlubal) | Calcul EF avancé |
| **Scia Engineer** (Nemetschek) | Multi-matériau |
| **Cypecad** | BA bâtiment courant |
| **Arche** (Graitec) | Bâtiments BA, descente charges automatique |
| **PythagorMU**, **Effel** | Outils pré-dim |

### Avantages

- Vérification multi-combinaisons automatique
- Plans de ferraillage générés
- Détection automatique des incohérences
- Couplage avec **BIM** (IFC) pour intégration architecte → structure

## Points de vigilance

1. **Trémies** : oubliées dans certains calculs simplifiés (escaliers, gaines techniques) → réduction de la surface d'influence à corriger.
2. **Effet poutre-tirant** : charges concentrées de longue portée (5 m+) à reporter correctement.
3. **Reprise de charges** : prendre en compte les **dévoiements** structurels (poteaux interrompus, poutres de transfert).
4. **Voiles continus** : descente de charges vs. distribution sur fondations en radier.
5. **Charges asymétriques** : excentrement → moment additionnel sur la fondation.
6. **Sol hétérogène** : varier la contrainte admissible selon les zones (G2 PRO).
7. **Eau** : prise en compte des poussées hydrostatiques sur murs enterrés (DTU 14.1).

## Citations à utiliser

- NF EN 1990 (combinaisons)
- NF EN 1991-1-1 (charges permanentes, exploitation, art. 6.3.1.2 - coefficients α_A et α_n)
- NF EN 1991-1-3 (neige) et 1-4 (vent)
- NF EN 1992-1-1 (BA — vérification poteaux/voiles)
- DTU 13.1 (fondations superficielles) et 13.2 (fondations profondes)
- DTU 14.1 (étanchéité parois enterrées)

**Référence à citer :** Eurocodes EN 1990 et EN 1991 + DTU 13. Sources : afnor.org, eurocodes.fr (CSTB).
