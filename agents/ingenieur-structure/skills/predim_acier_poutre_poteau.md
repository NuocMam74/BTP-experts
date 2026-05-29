# Skill — Pré-dimensionner poutres et poteaux acier (EC3)

L'utilisateur te transmet un élément acier à pré-dimensionner — tu dois calculer la section minimale selon l'Eurocode 3, avec vérification flambement.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Élément** : poutre, poteau, traverse de portique
- **Géométrie** : portée (poutre), hauteur (poteau)
- **Charges** : permanentes G, exploitation Q, neige S, vent W
- **Acier** : S235, **S275** (référence), S355
- **Conditions d'extrémité** : encastré-encastré, articulé-articulé, etc.
- **Stabilité latérale** (LTB) : maintenue ou non
- **Site** : sismique (catégorie d'importance + zone)

### 2. Combinaisons d'actions ELU

```
N_Ed ou M_Ed = 1,35 × G_k + 1,5 × Q_k,1 + 1,5 × Σ ψ_0,i × Q_k,i
```

Calcul des **enveloppes max** des sollicitations.

### 3. Pré-dimensionnement d'une poutre

#### Choix initial du profilé

D'après la **portée L** :
```
h ≈ L / 25 à L / 30 (poutre simplement appuyée)
h ≈ L / 35 à L / 45 (poutre continue)
```

Exemple : L = 6 m → h ≈ 200-240 mm → **IPE 240**

#### Calcul du moment ELU

Pour poutre uniformément chargée :
```
M_Ed = q_ELU × L² / 8
```

#### Vérification résistance (classe 1-2)

```
M_pl,Rd = W_pl × f_yk / γ_M0
```

Avec γ_M0 = 1,0, vérifier :
```
M_Ed ≤ M_pl,Rd
```

#### Vérification flèche ELS

```
δ = (5 × q_ELS × L⁴) / (384 × E × I) ≤ L / 250 (ou L/500 si cloisons fragiles)
```

#### Vérification flambement latéral (LTB)

Si poutre **non maintenue** latéralement :
- Calculer λ̄_LT
- Lire χ_LT dans courbes (a, b, c, d)
- Vérifier : M_Ed ≤ χ_LT × W_pl × f_yk / γ_M1

### 4. Pré-dimensionnement d'un poteau

#### Choix initial

D'après **charge N**, prendre :
```
A ≈ N / (200 MPa) (estimation rapide S275)
```

Exemple : N = 1 000 kN → A ≈ 5 000 mm² → **HEA 160** (A = 38,8 cm²) trop petit, prendre **HEA 200**

#### Calcul de la charge ELU

```
N_Ed = 1,35 × G + 1,5 × Q
```

#### Vérification résistance (sans flambement)

```
N_pl,Rd = A × f_yk / γ_M0
```

#### Vérification flambement

##### Longueur de flambement L_fk

| Conditions | L_fk |
|---|---|
| Articulé-articulé | L |
| Articulé-encastré | 0,7 × L |
| Encastré-encastré (avec déplacement) | L |
| Encastré-encastré (sans déplacement) | 0,5 × L |
| Encastré-libre (poteau encastré en pied, libre en tête) | 2 × L |

##### Élancement réduit

```
λ̄ = √(A × f_yk / N_cr) = (L_fk / i) × √(f_yk / E) / π
```

avec **i** : rayon de giration (i = √(I/A))

##### Coefficient χ

D'après les courbes (IPE/HEA en flexion : courbe b ; H profil : courbe c) :

| λ̄ | χ (courbe b) | χ (courbe c) |
|---|---|---|
| 0,2 | 1,00 | 1,00 |
| 0,5 | 0,90 | 0,85 |
| 1,0 | 0,55 | 0,49 |
| 1,5 | 0,30 | 0,28 |
| 2,0 | 0,18 | 0,17 |

##### Vérification

```
N_Ed ≤ N_b,Rd = χ × A × f_yk / γ_M1
```

### 5. Pré-dimensionnement d'une triangulation

#### Choix initial

- **Membrures** : IPE / HEA (selon charge)
- **Diagonales** : tubes RHS, CHS ou cornières

#### Calcul charges dans barres

Méthode des nœuds (équilibre) → N_Ed dans chaque barre.

#### Vérification barre tendue

```
N_Ed ≤ N_pl,Rd = A × f_yk / γ_M0
```

#### Vérification barre comprimée

Idem poteau (avec flambement χ).

### 6. Pré-dimensionnement d'un portique simple

#### Géométrie

- 2 montants + 2 traverses + faîtière
- Encastrement en pied ou articulation

#### Charges

- **Toiture** : G + Q (neige) → q_uniforme sur les traverses
- **Vent** : pression sur la face exposée

#### Pré-dim selon portée

| Portée (m) | Traverse (S275) | Montant (S275) |
|---|---|---|
| 10 | IPE 360 | HEA 220 |
| 15 | IPE 450 | HEA 280 |
| 20 | IPE 550 (ou PRS) | HEA 320 |
| 25 | PRS 700 | HEA 400 |
| 30 | PRS 900 | HEB 500 |

### 7. Tableau de synthèse — exemple complet

#### Données

- Poutre IPE 240 (S275)
- Portée 6 m
- Charges : G = 5 kN/m, Q = 3 kN/m
- Sans LTB (maintenue)

#### Calculs

| Calcul | Valeur |
|---|---|
| q_ELU = 1,35 × 5 + 1,5 × 3 = | **11,25 kN/m** |
| M_Ed = 11,25 × 6² / 8 = | **50,6 kN·m** |
| IPE 240 : W_pl,y = 366,6 cm³ | |
| M_pl,Rd = 366,6 × 275 / 1,0 = | **100,8 kN·m** |
| M_Ed / M_pl,Rd = 50,6 / 100,8 = | **0,50** → ✅ |
| q_ELS = 5 + 3 = 8 kN/m | |
| I = 3 892 cm⁴ ; E = 210 000 MPa | |
| δ = 5 × 8 × 6⁴ × 10⁹ / (384 × 210 000 × 3 892 × 10⁴) = | **8,3 mm** |
| L / 250 = 6 000 / 250 = | **24 mm** → ✅ |

**Verdict** : IPE 240 OK. Marge ~ 50 %.

### 8. Vérifications complémentaires

#### Vérification cisaillement

```
V_Ed ≤ V_pl,Rd = A_v × f_yk / (√3 × γ_M0)
```

#### Vérification interaction (flexion + N + V)

Si N_Ed est faible (< 10 % de N_pl,Rd), interaction négligeable.

#### Vérification flambement latéral (LTB)

Pour poutre non maintenue latéralement : χ_LT < 1.

### 9. Drapeaux rouges fréquents

| Symptôme | Action |
|---|---|
| Profilé trop petit (M_Ed / M_Rd > 1) | Augmenter section |
| Flèche > limite | Augmenter inertie ou diminuer portée |
| LTB non vérifié | Maintenir poutre ou augmenter section |
| Flambement défavorable | Réduire élancement (raidisseurs) |
| Classes 3-4 (voilement local) | Section réduite efficace |
| Interaction non vérifiée | Calcul complet avec flexion composée |

### 10. Assemblages

Pré-dimensionner aussi les assemblages :
- **Boulonné** : classe 8.8 ou 10.9, Ø 16-24 mm
- **Soudé** : cordons d'angle (a = 5-12 mm)
- Vérification résistance assemblage ≥ résistance barre

### 11. Dispositions parasismiques (zone 3-5)

- **Coefficient q** : 4-6,5 (DCH) selon système
- **Assemblages dissipatifs**
- **Continuité** des barres
- **Stabilité** des barres comprimées renforcée

## Garde-fous

- **Pas de validation finale** — pré-dimensionnement à confirmer par note de calcul EXE signée par BET inscrit OPQIBI.
- **Coefficients γ_M** vérifiés (γ_M0 = 1,0 ; γ_M1 = 1,0 ; γ_M2 = 1,25).
- **Combinaisons d'actions** exhaustives (toutes Q variables).
- **Annexe nationale française** appliquée (peut différer de l'EC3 général).
- **Logiciels** professionnels recommandés pour calculs détaillés (Robot, RFEM, Scia).
- **DTU 32.1** pour les charpentes acier.
- **Pour sismique** : EC8 + arrêté 22 oct. 2010.

## Livrable à proposer

Après pré-dimensionnement :
- **Note de pré-dimensionnement** (DOCX + PDF) avec :
  - Données et hypothèses
  - Calculs étape par étape
  - Vérifications EC3
  - Choix du profilé retenu
  - Marges de sécurité
- **Tableau de synthèse** (XLSX)
- **Croquis** d'assemblage type
- Mention finale : *« Document préparé par l'agent IA Ingénieur structure — à valider et signer par un BET inscrit OPQIBI. Pré-dimensionnement à confirmer par note de calcul EXE. »*
