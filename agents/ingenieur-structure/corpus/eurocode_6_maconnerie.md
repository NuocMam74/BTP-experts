# Eurocode 6 — Calcul des structures en maçonnerie

**Source :** NF EN 1996-1-1 et son Annexe Nationale française ; NF EN 1996-1-2 (calcul au feu) ; NF EN 1996-3 (calcul simplifié pour murs non armés) ; DTU 20.1 (maçonnerie petits éléments) ; DTU 20.13 (cloisons en maçonnerie) ; NF EN 771 (éléments de maçonnerie).

## Éléments de maçonnerie (NF EN 771)

### Catégories

| Catégorie | Description | Usage |
|---|---|---|
| Groupe 1 | Éléments pleins ou à très peu de creux (< 25 %) | Mur porteur lourd |
| Groupe 2 | Éléments creux verticaux (25-55 %) | Mur courant |
| Groupe 3 | Éléments creux horizontaux | Cloisons |
| Groupe 4 | Éléments à percements horizontaux | Cloisons légères |

### Types courants

| Type | Description | Masse vol. (kg/m³) | Classe résistance |
|---|---|---|---|
| **Parpaing creux 20** | Bloc béton 20×20×50 | 1 000-1 200 | B40 (4 MPa) |
| **Parpaing perforé 20** | Bloc béton perforé | 1 200-1 500 | B60 (6 MPa) |
| **Parpaing plein** | Bloc béton plein | 2 000-2 200 | B80-B120 |
| **Brique pleine** | Terre cuite pleine | 1 800-2 000 | 10-20 MPa |
| **Brique creuse 20** | Terre cuite creuse | 800-1 100 | 5-15 MPa |
| **Brique perforée 20** | Terre cuite perforée verticale | 1 200-1 500 | 10-20 MPa |
| **Béton cellulaire** | Bloc gazé léger | 400-700 | 2-5 MPa |
| **Pierre calcaire** | Pierre naturelle | 1 800-2 600 | 5-50 MPa |

## Mortiers (NF EN 998-2)

### Classes courantes

| Classe | f_m (MPa, mortier durci) | Usage |
|---|---|---|
| M1 | 1 | Murs intérieurs légers |
| M2,5 | 2,5 | Murs intérieurs / cloisons |
| **M5** | 5 | **Murs porteurs courants** |
| M10 | 10 | Murs porteurs lourds, charges importantes |
| M15 | 15 | Ouvrages exigeants |

### Types

- **Mortier de chaux NHL** : ouvrages patrimoniaux, perspirable
- **Mortier bâtard** : ciment + chaux, polyvalent
- **Mortier ciment** : pour mur sec ou imperméable

## Résistance caractéristique de la maçonnerie

### Formule générale (Tab. 3.3 EN 1996-1-1)

```
f_k = K × f_b^α × f_m^β
```

avec :
- **f_b** : résistance bloc
- **f_m** : résistance mortier
- **K, α, β** : coefficients selon type d'élément et de mortier

### Valeurs typiques f_k

| Bloc + Mortier | f_k (MPa) |
|---|---|
| Parpaing creux B40 + M5 | 2,5-3,0 |
| Parpaing perforé B60 + M5 | 4,0-5,0 |
| Brique creuse 10 MPa + M5 | 4,0-5,0 |
| Brique pleine 15 MPa + M5 | 6,0-8,0 |
| Brique perforée 15 MPa + M5 | 5,0-7,0 |

## Coefficients de sécurité (Tab. NA.1)

| Cas | γ_M |
|---|---|
| Maçonnerie classe 1 (mortier fabriqué) | 2,2 |
| Maçonnerie classe 2 (mortier en sac standard) | 2,5 |
| Maçonnerie classe 3 (mortier site) | 2,7 |

Soit :
```
f_d = f_k / γ_M
```

Exemple : f_k = 5 MPa, classe 2 → f_d = 5/2,5 = **2 MPa**

## Vérifications des murs porteurs

### 1. Mur porteur en compression simple

```
N_Ed ≤ N_Rd = f_d × A × Φ
```

- **A** : section nette du mur
- **Φ** : coefficient de réduction (élancement + excentricité)

### Coefficient Φ

#### Élancement h_ef / t_ef

- h_ef : hauteur effective (≤ h selon liaisons)
- t_ef : épaisseur effective

| h_ef / t_ef | Φ (e_k/t = 0,1) |
|---|---|
| 5 | 0,95 |
| 10 | 0,80 |
| 15 | 0,55 |
| 20 | 0,30 |
| 25 | 0,15 |

#### Élancement maximal

```
h_ef / t_ef ≤ 27 (mur de raidissement)
h_ef / t_ef ≤ 24 (mur intérieur ou avec percement)
```

### 2. Mur porteur avec moment + N

#### Excentricité

```
e = M / N
e_k = e + e_i (initial) + e_v (vent)
```

#### Vérification

```
N_Ed × (1 + e_k / t_ef) ≤ f_d × A × Φ
```

### 3. Cisaillement

#### Résistance

```
V_Rd = f_vd × t × l_c
```

avec :
- **f_vd** : résistance au cisaillement (≈ 0,1 × f_d + 0,4 × σ_n)
- **σ_n** : contrainte normale moyenne
- **t** : épaisseur mur
- **l_c** : longueur comprimée

## Pré-dimensionnement — ordres de grandeur

### Mur porteur simple en parpaing creux 20

- Hauteur d'étage 2,70 m
- Mortier M5
- f_k ≈ 3 MPa → f_d ≈ 1,2 MPa
- Φ ≈ 0,6 (élancement modéré)
- **Capacité par mètre linéaire** : 1,2 × 200 mm × 0,6 = **144 kN/m**

→ Pour bâtiment R+2 avec charges 100-120 kN/ml, parpaing creux 20 suffit.

### Mur porteur lourd en parpaing perforé 20

- f_k ≈ 5 MPa → f_d ≈ 2 MPa
- **Capacité** : 2 × 200 × 0,6 = **240 kN/m**

→ Pour bâtiment R+4 avec charges importantes.

### Mur porteur en brique pleine 20

- f_k ≈ 7 MPa → f_d ≈ 2,8 MPa
- **Capacité** : 2,8 × 200 × 0,6 = **336 kN/m**

→ Pour R+5 et plus.

### Mur en béton cellulaire 25

- f_k ≈ 1,8 MPa → f_d ≈ 0,7 MPa
- **Capacité** : 0,7 × 250 × 0,7 = **122 kN/m**

→ Pour MI ou R+1 maximum.

## Élancement et stabilité

### Élancement maximal mur isolé

```
h_ef ≤ 27 × t_ef
```

#### Exemple

Parpaing 20 cm → h_ef max = 5,4 m

### Raidisseurs verticaux

Pour augmenter la capacité :
- **Chaînages verticaux** BA tous les 5-6 m
- **Murs perpendiculaires** (raidisseurs)
- **Planchers** BA (raidissement horizontal)

### Limites en hauteur (DTU 20.1)

| Type | Hauteur max sans raidisseur |
|---|---|
| Parpaing creux 20 | 2,70 m (R+2 max sans EC6 calcul) |
| Parpaing perforé 20 | 3,00 m (R+3 sans calcul) |
| Brique creuse 20 | 2,70 m |
| Brique pleine 20 | 3,00 m |
| Béton cellulaire 25 | 2,70 m |

## Chaînages (obligation DTU 20.1 + sismique EC8)

### Chaînages horizontaux

- À chaque **plancher** + **acrotère**
- Section BA minimum 15 × 15 cm
- Armatures longitudinales : 4 HA 10 minimum
- Cadres HA 6 espacement 20 cm

### Chaînages verticaux

- À chaque **angle**
- À chaque **jonction** de murs
- À chaque **interruption** de mur > 5 m
- Section BA 15 × 15 cm minimum
- Armatures : 4 HA 10 minimum

### Chaînages sismiques (zones 2-5)

- Continuité **obligatoire** en plan
- Densité accrue (verticaux tous les 4 m)
- Liaison **renforcée** poutre-mur

## Linteaux

### Types

- **Linteau préfabriqué BA** : portée ≤ 1,80 m
- **Linteau coulé en place** : portée ≤ 2,50 m
- **Poutre BA** : portée > 2,50 m

### Pré-dimensionnement BA

| Portée | Hauteur poutre |
|---|---|
| 1,80 m | 20 cm |
| 2,50 m | 25 cm |
| 3,50 m | 35 cm |
| 5,00 m | 50 cm |

## Cloisons (DTU 20.13)

### Cloisons en maçonnerie traditionnelle

- **Brique creuse** ép. 50-75 mm
- **Carreaux de plâtre** ép. 50-100 mm
- **Béton cellulaire** ép. 75-100 mm

### Hauteur max (cloison non porteuse)

| Épaisseur | Hauteur max |
|---|---|
| 50 mm | 2,50 m |
| 70 mm | 3,00 m |
| 100 mm | 4,00 m |

## Comportement au feu (NF EN 1996-1-2)

### Résistance au feu typique

| Mur | SF |
|---|---|
| Parpaing creux 20 cm enduit | REI 60-90 |
| Parpaing perforé 20 cm enduit | REI 90-180 |
| Brique pleine 20 cm | REI 90-240 |
| Cloison brique 50 mm | EI 60 |
| Béton cellulaire 20 cm | REI 240 |

→ **REI 120-180** facilement atteint pour murs porteurs ≥ 20 cm avec enduit.

## Joints de dilatation

### Espacement maximal

| Matériau | Espacement |
|---|---|
| Maçonnerie courante | 20-30 m |
| Maçonnerie traditionnelle (pierre) | 30-50 m |
| Maçonnerie cellulaire | 15-25 m |

### Largeur

- Joint courant : 10-20 mm
- À combler avec mastic souple

## Synthèse — bonnes pratiques BE

1. **Choix du bloc** selon hauteur et charges (parpaing vs perforé vs brique)
2. **Choix du mortier** : M5 standard, M10 si charges importantes
3. **Élancement** vérifié : h_ef / t_ef ≤ 27
4. **Chaînages** systématiques (horizontaux + verticaux)
5. **Linteaux** dimensionnés selon portée
6. **Joints de dilatation** tous les 20-30 m
7. **Pré-dim** : ratios + ordres de grandeur, puis calcul détaillé
8. **Pour zones sismiques** : EC8 + dispositions constructives renforcées
9. **DTU 20.1** : respecter les règles de mise en œuvre
10. **Calcul simplifié** EN 1996-3 pour murs non armés bâtiment courant

## Citations à utiliser

- NF EN 1996-1-1 + AN française
- NF EN 1996-1-2 (feu)
- NF EN 1996-3 (calcul simplifié)
- NF EN 771 (éléments maçonnerie)
- NF EN 998-2 (mortier maçonnerie)
- DTU 20.1 (maçonnerie petits éléments)
- DTU 20.13 (cloisons maçonnerie)
- NF EN 1998-1 + AN (sismique)

**Référence à citer :** Eurocode 6 + DTU 20. Sources : afnor.org, eurocodes.fr (CSTB).
