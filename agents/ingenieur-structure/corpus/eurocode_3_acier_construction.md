# Eurocode 3 — Calcul des structures en acier

**Source :** NF EN 1993-1-1 et son Annexe Nationale française ; NF EN 1993-1-8 (assemblages) ; NF EN 1993-1-10 (matériaux et résilience) ; NF EN 10025 (aciers de construction) ; DTU 32.1 (charpentes acier) ; DTU 32.2 (constructions à ossature métallique d'habitation et tertiaire).

## Aciers de construction (NF EN 10025)

### Classes de résistance

| Désignation | f_yk (MPa) | f_uk (MPa) | Usage |
|---|---|---|---|
| **S235** | 235 | 360 | Bâtiment courant |
| **S275** | 275 | 410 | Bâtiment moyen |
| **S355** | **355** | 470 | **Référence pour structures dimensionnées** |
| S420 | 420 | 520 | Ouvrages exigeants |
| S460 | 460 | 540 | Ponts, ouvrages d'art |

### Caractéristiques mécaniques

- **Module d'élasticité** : E = 210 000 MPa
- **Coefficient de Poisson** : ν = 0,3
- **Densité** : ρ = 7 850 kg/m³ = **78,5 kN/m³**
- **Coefficient de dilatation** : α = 12 × 10⁻⁶ /°C

### Coefficients de sécurité (Tab. 2.1)

| Vérification | γ_M0 | γ_M1 | γ_M2 |
|---|---|---|---|
| Section (résistance) | 1,00 | — | — |
| Flambement (stabilité) | — | 1,00 | — |
| Section nette tendue (boulons) | — | — | 1,25 |

#### Formule générale ELU

```
σ_d = f_yk / γ_M
```

- S275, vérification section : f_d = 275 / 1,00 = **275 MPa**
- S275, vérification flambement : f_d = 275 / 1,00 = 275 MPa

## Sections types et classification

### Profilés courants

| Désignation | Description | Usage typique |
|---|---|---|
| **IPE** | Profilé en I européen, semelles parallèles | Poutres |
| **HEA, HEB, HEM** | Profilé en H européen | Poteaux + poutres lourdes |
| **UPN, UPE** | Profilé en U | Pannes, lisses, encadrements |
| **L (cornière)** | Profilé en L | Triangulations, accessoires |
| **T** | Profilé en T | Reprises de portiques |
| **Carrés / rectangulaires creux (RHS, SHS)** | Profilé creux | Poteaux, treillis |
| **Tubes ronds (CHS)** | Tube circulaire | Poteaux fins, treillis |

### Classification des sections (art. 5.5)

Selon **élancement** local (rapport largeur/épaisseur) :

| Classe | Comportement |
|---|---|
| **Classe 1** | Plastification complète + rotation plastique (analyse plastique possible) |
| **Classe 2** | Plastification complète (mais rotation limitée) |
| **Classe 3** | Voilement local avant plastification complète (analyse élastique) |
| **Classe 4** | Voilement local avant atteindre la résistance plastique (section efficace) |

### Élancement limite

Pour une **semelle comprimée** d'IPE/HEA/HEB :

```
c / t ≤ 9 × ε (classe 1)
c / t ≤ 10 × ε (classe 2)
c / t ≤ 14 × ε (classe 3)
```

avec **ε** = √(235 / f_yk).

Pour S275 : ε = √(235/275) = 0,924

## Vérifications usuelles

### 1. Traction simple (section)

```
N_Ed ≤ N_pl,Rd = A × f_yk / γ_M0
```

#### Pour boulons (section nette)

```
N_Ed ≤ N_u,Rd = 0,9 × A_net × f_uk / γ_M2
```

### 2. Compression simple — flambement (art. 6.3.1)

#### Élancement réduit

```
λ̄ = √(A × f_yk / N_cr)
```

avec **N_cr** = π² × E × I / L_fk² (charge critique d'Euler)

#### Coefficient de flambement χ

D'après les courbes de flambement (a, b, c, d, a₀) selon section et type de matériau :

| λ̄ | χ (courbe c, typique IPE/HEA) |
|---|---|
| 0,2 | 1,00 |
| 0,5 | 0,95 |
| 1,0 | 0,70 |
| 1,5 | 0,40 |
| 2,0 | 0,22 |

#### Vérification

```
N_Ed ≤ N_b,Rd = χ × A × f_yk / γ_M1
```

### 3. Flexion simple (section)

```
M_Ed ≤ M_pl,Rd = W_pl × f_yk / γ_M0
```

Pour les sections élastiques (classe 3-4) :

```
M_Ed ≤ M_el,Rd = W_el × f_yk / γ_M0
```

### 4. Cisaillement

```
V_Ed ≤ V_pl,Rd = A_v × f_yk / (√3 × γ_M0)
```

où **A_v** est l'aire de cisaillement (souvent l'âme du profilé).

### 5. Flambement latéral (LTB) — poutres fléchies (art. 6.3.2)

Pour poutre en flexion non latéralement maintenue :

```
M_Ed ≤ M_b,Rd = χ_LT × W_pl × f_yk / γ_M1
```

avec **χ_LT** coefficient de réduction par flambement latéral, calculé selon élancement λ̄_LT.

### 6. Interaction N + M + V (flexion composée)

Pour les sections de classe 1 et 2 (art. 6.2.9.1) :

```
M_N,y,Rd = M_pl,y,Rd × (1 - n) / (1 - 0,5 × a)
```

avec **n** = N_Ed / N_pl,Rd et **a** dépendant de la section.

## Assemblages (NF EN 1993-1-8)

### Types d'assemblages

| Type | Description |
|---|---|
| **Boulonnés** | Boulons HR (haute résistance) — précontraints ou non |
| **Soudés** | Cordons d'angle ou à pleine pénétration |
| **Mixte** | Boulons + soudures |

### Boulons HR

#### Classes (Tab. 3.1 EN 1993-1-8)

| Classe | f_yb (MPa) | f_ub (MPa) |
|---|---|---|
| 4.6 | 240 | 400 |
| 5.6 | 300 | 500 |
| 6.8 | 480 | 600 |
| **8.8** | **640** | **800** |
| **10.9** | **900** | **1000** |

Classes **8.8** et **10.9** dominantes en construction métallique.

#### Diamètres courants

M12, **M16**, **M20**, **M24**, M27, M30, M36

### Vérifications des boulons

#### Cisaillement (art. 3.4)

```
F_v,Rd = α_v × f_ub × A_s / γ_M2
```

- α_v = 0,6 pour classes 4.6, 5.6, 8.8
- α_v = 0,5 pour classes 6.8, 10.9

#### Pression diamétrale (art. 3.6)

```
F_b,Rd = k_1 × α_b × f_uk × d × t / γ_M2
```

Coefficients dépendant de la position du boulon.

#### Traction

```
F_t,Rd = 0,9 × f_ub × A_s / γ_M2
```

### Soudures

#### Cordons d'angle (a = épaisseur de gorge)

Résistance par mètre de cordon :

```
F_w,Rd = (f_uk / (√3 × β_w × γ_M2)) × a
```

avec **β_w** coefficient de corrélation (β_w = 0,85 pour S275, 0,90 pour S355).

#### Soudures à pleine pénétration

Résistance = résistance de la section traversée (acier).

### Tolérances de mise en œuvre (NF EN 1090)

- **Catégories d'exécution** : EXC1 à EXC4 (la plus exigeante : ponts)
- **Bâtiment courant** : EXC2

## Pré-dimensionnement — ordres de grandeur

### Poutres IPE / HEA en S275

| Portée L | Section poutre (charge perm. ~ 5 kN/m) | Charge max admissible |
|---|---|---|
| 4 m | IPE 200 | 25 kN/m |
| 6 m | IPE 240 | 18 kN/m |
| 8 m | IPE 300 | 16 kN/m |
| 10 m | IPE 360 | 13 kN/m |
| 12 m | IPE 400 ou HEA 280 | 10 kN/m |
| 15 m | HEA 360 ou poutre PRS | Selon charge |

### Poteaux HEA / HEB en S275

| Hauteur | Charge N | Section poteau |
|---|---|---|
| 3 m | 500 kN | HEA 160 |
| 3 m | 1 000 kN | HEA 200 |
| 5 m | 1 500 kN | HEB 240 |
| 5 m | 3 000 kN | HEB 300 |
| 8 m | 2 000 kN | HEB 320 |
| 8 m | 5 000 kN | HEB 400 |

### Triangulations (treillis)

- **Membrures** : IPE, HEA ou tubes
- **Diagonales** : tubes RHS, CHS, ou cornières
- **Trame** : tous les 1,5-3 m

## Charpente type — bâtiment industriel

### Portique simple à 2 montants + 2 traverses

- **Portée** : 12-30 m
- **Espacement portiques** : 5-7 m
- **Hauteur** : 6-12 m

#### Pré-dimensionnement (portée 20 m, hauteur 8 m, espacement 6 m)

- Charge toiture : 0,5 kN/m² (poids propre + isolation + couverture) + 0,5 kN/m² (neige) = 1,0 kN/m²
- Charge linéique par traverse : 1,0 × 6 m = 6 kN/m
- Moment au faîtage : ~ M = 6 × 20² / 8 = 300 kN·m
- **Traverse** : IPE 500 ou HEA 360 (S275)
- **Montants** : HEB 280 (S275)

### Pannes (sablières + faîtière)

- IPE 100-180 selon entraxe (1-3 m)
- Liaison portique avec assemblages boulonnés

## Calcul incendie (NF EN 1993-1-2)

### Méthode simplifiée

- **Température critique** : ~ 530°C (S275 sans isolation)
- **Stabilité au feu** : sans protection, SF 15 min seulement
- **Avec protection** :
  - Peinture intumescente : SF 30-90 min
  - Plâtre + plaques de plâtre : SF 60-180 min
  - Béton enrobant : SF 120-240 min

### Coefficient de réduction de résistance avec T°

| Température | k_y,θ |
|---|---|
| 100°C | 1,00 |
| 200°C | 1,00 |
| 300°C | 1,00 |
| 400°C | 1,00 |
| 500°C | 0,78 |
| 600°C | 0,47 |
| 700°C | 0,23 |
| 800°C | 0,11 |
| 900°C | 0,06 |

## Synthèse — bonnes pratiques BE

1. **Classification des sections** : vérification systématique (classe 1-4)
2. **Vérifications complètes** : section + flambement + interactions
3. **Assemblages dimensionnés** : pas négliger (souvent le maillon faible)
4. **Calcul incendie** : protection si bâtiment soumis à SF
5. **Pré-dimensionnement** : ratios + ordres de grandeur, puis calcul détaillé
6. **Logiciels** : Robot, RFEM, Scia, Advance Design pour vérifications complètes
7. **Plans EXE** : indications soudures + serrage boulons
8. **Mise en œuvre EXC2** pour bâtiment courant (NF EN 1090)

## Citations à utiliser

- NF EN 1993-1-1 + AN française (acier — règles générales)
- NF EN 1993-1-8 + AN (assemblages)
- NF EN 1993-1-2 (calcul feu)
- NF EN 1993-1-10 (résilience)
- NF EN 10025 (aciers de construction)
- NF EN 1090 (mise en œuvre, classes EXC)
- DTU 32.1 (charpentes acier)
- DTU 32.2 (OEM)

**Référence à citer :** Eurocode 3 + AN française + DTU 32. Sources : afnor.org, eurocodes.fr (CSTB).
