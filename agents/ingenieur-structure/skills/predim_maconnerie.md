# Skill — Pré-dimensionner un mur porteur en maçonnerie (EC6)

L'utilisateur te transmet un projet de mur porteur en maçonnerie — tu dois calculer la capacité portante selon l'Eurocode 6 et choisir le bloc adapté.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Hauteur d'étage**
- **Charges N** par mètre linéaire (G + Q sur le mur)
- **Type de bloc** envisagé : parpaing creux, parpaing perforé, brique, béton cellulaire
- **Mortier** : M5 standard, M10 si charges importantes
- **Classe d'exécution** : 1 (mortier fabriqué), 2 (sac standard), 3 (site)
- **Conditions d'extrémité** : encastré, articulé
- **Nombre d'étages** au-dessus
- **Zone sismique** : pour vérifier dispositions EC8

### 2. Calculer la charge appliquée

```
N_Ed = 1,35 × G_k + 1,5 × Q_k,1 + 1,5 × Σ ψ_0,i × Q_k,i
```

### 3. Choisir le type de bloc

#### Classes de résistance courantes

| Type | f_b (MPa) | f_k avec M5 (MPa) |
|---|---|---|
| Parpaing creux B40 | 4 | 2,5-3,0 |
| Parpaing perforé B60 | 6 | 4,0-5,0 |
| Parpaing plein B80 | 8 | 5,5-6,5 |
| Brique creuse 10 MPa | 10 | 4,0-5,0 |
| Brique pleine 15 MPa | 15 | 6,0-8,0 |
| Brique perforée 15 MPa | 15 | 5,0-7,0 |
| Béton cellulaire 5 MPa | 5 | 1,8-2,5 |

### 4. Calculer la résistance de calcul f_d

```
f_d = f_k / γ_M
```

#### Coefficients γ_M

| Classe d'exécution | γ_M |
|---|---|
| Classe 1 (mortier fabriqué) | 2,2 |
| Classe 2 (sac standard) | 2,5 |
| Classe 3 (site) | 2,7 |

#### Exemple

Parpaing perforé B60 + M5, classe 2 : f_k ≈ 5 MPa → f_d = 5/2,5 = **2,0 MPa**

### 5. Calculer le coefficient de réduction Φ

#### Élancement h_ef / t_ef

- **h_ef** : hauteur effective (≤ h selon liaisons)
- **t_ef** : épaisseur effective

#### Valeurs h_ef

| Conditions extrémités | h_ef |
|---|---|
| Encastré-encastré (planchers BA) | 0,75 × h |
| Encastré-articulé | 0,85 × h |
| Articulé-articulé (limites) | 1,0 × h |

#### Coefficient Φ (pour e_k/t ≤ 0,1)

| h_ef / t_ef | Φ |
|---|---|
| 5 | 0,95 |
| 10 | 0,80 |
| 15 | 0,55 |
| 20 | 0,30 |
| 25 | 0,15 |

#### Élancement maximal autorisé

```
h_ef / t_ef ≤ 27 (mur de raidissement)
h_ef / t_ef ≤ 24 (mur intérieur ou avec percement)
```

### 6. Vérification de la capacité

```
N_Ed ≤ N_Rd = f_d × A × Φ
```

avec **A** = épaisseur × longueur (section nette du mur).

#### Pour 1 mètre linéaire

```
N_Rd / ml = f_d × t × Φ
```

### 7. Exemples — pré-dim type

#### Cas 1 : Bâtiment R+2, charges 80 kN/ml par étage

- Charge sur mur RDC : 80 × 3 = 240 kN/ml
- N_ELU = 1,35 × 240 = 324 kN/ml

##### Test : Parpaing creux 20 + M5

- f_d = 1,2 MPa
- h = 2,70 m, h_ef = 0,75 × 2,70 = 2,03 m
- t_ef = 200 mm → h_ef/t_ef = 10,1 → Φ = 0,80
- **N_Rd** = 1,2 × 200 × 0,80 = **192 kN/m** → **insuffisant**

##### Test : Parpaing perforé 20 + M5

- f_d = 2,0 MPa
- Φ = 0,80
- **N_Rd** = 2,0 × 200 × 0,80 = **320 kN/m** → marginal

##### Test : Brique pleine 20 + M5

- f_d = 2,8 MPa
- Φ = 0,80
- **N_Rd** = 2,8 × 200 × 0,80 = **448 kN/m** → ✅ confortable

**Choix recommandé** : brique pleine 20 cm ou parpaing perforé 25 cm.

#### Cas 2 : MI R+1, charges 50 kN/ml

- Charge sur mur RDC : 50 × 2 = 100 kN/ml
- N_ELU = 1,35 × 100 = 135 kN/ml

##### Test : Parpaing creux 20 + M5

- **N_Rd** = 192 kN/m → ✅ OK

**Choix** : parpaing creux 20 cm (économique).

### 8. Vérifier l'excentricité

#### Si moment M (vent, dissymétrie charges)

```
e = M / N
```

- e/t > 0,33 → mur trop excentré (à éviter)
- 0,1 ≤ e/t ≤ 0,33 → Φ réduit
- e/t ≤ 0,1 → Φ standard

### 9. Vérifier le cisaillement (vent ou séisme)

```
V_Rd = f_vd × t × l_c
```

avec :
- f_vd = 0,1 × f_d + 0,4 × σ_n (contrainte normale moyenne)
- t : épaisseur
- l_c : longueur comprimée

### 10. Dispositions constructives

#### Chaînages

##### Horizontaux (obligatoires)

- À chaque **plancher** et **acrotère**
- Section BA min 15 × 15 cm
- Armatures longitudinales : 4 HA 10 min
- Cadres HA 6 espacement 20 cm

##### Verticaux (obligatoires)

- À chaque **angle**
- À chaque **jonction** de murs
- À chaque **interruption** > 5 m
- Section BA 15 × 15 cm
- Armatures : 4 HA 10 min

#### Linteaux

##### Pré-dim BA

| Portée | Hauteur poutre |
|---|---|
| 1,80 m | 20 cm |
| 2,50 m | 25 cm |
| 3,50 m | 35 cm |
| 5,00 m | 50 cm |

#### Joints de dilatation

- Espacement : 20-30 m (maçonnerie courante)
- Largeur : 10-20 mm, mastic souple

### 11. Pour zones sismiques (EC8)

#### Coefficient q

- Maçonnerie non armée chaînée : q = 1,5
- Maçonnerie armée : q = 2,5

#### Dispositions renforcées

- Chaînages plus denses (vertical tous les 4 m)
- Continuité **obligatoire** en plan
- Linteaux BA renforcés
- Hauteur **limitée** en zones 4-5 (souvent R+2 max)

#### Pour MI en zones 3-5

- Arrêté 19 juill. 2011 : règles forfaitaires
- Pas de mezzanine porteuse
- Liaison renforcée toiture-murs

### 12. Hauteur maximum en pratique

| Type de bloc | Sans calcul EC6 (DTU 20.1) | Avec calcul EC6 + chaînages |
|---|---|---|
| Parpaing creux 20 | R+2 (charges modérées) | R+4 (selon charges) |
| Parpaing perforé 20 | R+3 | R+5 |
| Brique pleine 20 | R+3 | R+6 |
| Béton cellulaire 25 | R+1 | R+2 |

## Garde-fous

- **Pas de validation finale** — pré-dim à confirmer par note de calcul EC6 signée par BET.
- **DTU 20.1** : règles de mise en œuvre obligatoires (cohésion mortier, joints, etc.).
- **Chaînages** systématiques (horizontaux + verticaux) — pas négocier.
- **Linteaux** dimensionnés selon portée et charges.
- **Joints de dilatation** tous les 20-30 m.
- **Pour zones sismiques** : EC8 + arrêté 22 oct. 2010.
- **Cohérence** avec descente de charges (EC1).
- **Pour gros chantiers** : essais de mortier au laboratoire (vérification f_m réel).

## Livrable à proposer

Après pré-dim :
- **Note de pré-dimensionnement maçonnerie** (DOCX + PDF) avec :
  - Données et hypothèses
  - Choix bloc + mortier + classe
  - Calculs EC6 (f_d, Φ, N_Rd)
  - Vérification capacité
  - Dispositions constructives (chaînages, linteaux)
- **Tableau XLSX** récapitulatif
- **Schémas** de chaînages typiques
- **Liste prescriptions DCE**
- Mention finale : *« Document préparé par l'agent IA Ingénieur structure — à valider par un BET inscrit OPQIBI. Pré-dim à confirmer par note de calcul EXE. DTU 20.1 obligatoire en exécution. »*
