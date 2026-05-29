# Eurocode 8 — Calcul sismique des bâtiments

**Source :** NF EN 1998-1 et son Annexe Nationale française ; NF EN 1998-5 (fondations sous séisme) ; arrêté du 22 octobre 2010 modifié (zonage sismique français) ; Code de l'environnement art. R.563-1 et s. ; arrêté du 19 juillet 2011 (règles de construction parasismique pour les MI).

## Cadre réglementaire français

### Zonage sismique (arrêté 22 oct. 2010)

5 zones de sismicité en France métropolitaine :

| Zone | Aléa | Accélération a_gr (m/s²) |
|---|---|---|
| **1** | Très faible | 0,4 |
| **2** | Faible | 0,7 |
| **3** | Modérée | 1,1 |
| **4** | Moyenne | 1,6 |
| **5** | Forte | 3,0 (Antilles, Guyane) |

### Catégories d'importance (Tab. 5.1.1)

| Catégorie | Description | Coefficient γ_I |
|---|---|---|
| **I** | Ouvrages sans risque (mobilier urbain) | 0,8 |
| **II** | Bâtiments d'habitation et tertiaires courants | 1,0 |
| **III** | Établissements recevant du public, écoles, équipements importants | 1,2 |
| **IV** | Bâtiments à risque spécial (hôpitaux, secours, militaires) | 1,4 |

### Obligation d'application des règles parasismiques

| Catégorie / Zone | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **I** | Non | Non | Non | Non | Non |
| **II** | Non | Oui partielle | Oui | Oui | Oui |
| **III** | Non | Oui | Oui | Oui | Oui |
| **IV** | Oui | Oui | Oui | Oui | Oui |

#### Pour maisons individuelles

- **Cat. II + zones 1-2** : pas d'obligation EC8 (sauf cas particulier)
- **Cat. II + zones 3-4-5** : arrêté du 22 oct. 2010 + simplification possible MI selon arrêté 19 juill. 2011

## Action sismique

### Accélération de calcul

```
a_g = γ_I × a_gr
```

#### Exemple

- Zone 3 (modérée) : a_gr = 1,1 m/s²
- Bâtiment catégorie II : γ_I = 1,0
- **a_g** = 1,1 m/s²

### Classes de sol (Tab. 3.1)

| Classe | Description | V_s,30 (m/s) | N_SPT |
|---|---|---|---|
| **A** | Rocher | > 800 | — |
| **B** | Sol dense | 360-800 | > 50 |
| **C** | Sable, gravier compact | 180-360 | 15-50 |
| **D** | Sol meuble | < 180 | < 15 |
| **E** | Sol meuble sur rocher | C ou D sur A | — |

### Spectre de réponse élastique

L'EC8 définit un spectre de réponse en fonction de :
- Période propre T
- Amortissement (5 %)
- Classe de sol (S, T_B, T_C, T_D)

#### Spectre type pour zone 3, sol C

- a_g = 1,1 m/s²
- S = 1,15
- a_g × S = 1,27 m/s²
- T_B = 0,2 s, T_C = 0,6 s, T_D = 2,0 s

## Méthode des forces latérales (analyse statique équivalente)

### Conditions d'application (art. 4.3.3.2.1)

- Bâtiment **régulier en plan et en élévation**
- Première période propre **T₁ ≤ min(4 × T_C ; 2,0 s)**
- Comportement majoritaire du **mode fondamental**

### Calcul de la force tranchante de base

```
F_b = S_d(T₁) × m × λ
```

avec :
- **S_d(T₁)** : ordonnée du spectre de calcul
- **m** : masse totale du bâtiment
- **λ** : coefficient (0,85 si T₁ ≤ 2 × T_C, sinon 1,0)

### Spectre de calcul (avec coefficient de comportement q)

```
S_d(T₁) = a_g × S × (...) / q
```

avec **q** le **coefficient de comportement** (modélise la capacité ductile).

### Coefficients de comportement q (Tab. 5.1, 6.2, 7.2, 8.3, 9.6)

#### Béton armé

| Système | q (DCM) | q (DCH) |
|---|---|---|
| Murs ductiles | 3,0 | 4,5 |
| Murs porteurs voilés | 2,0 | 3,0 |
| Ossatures à risque sismique faible | 1,5 | 1,5 |

#### Acier

| Système | q (DCM) | q (DCH) |
|---|---|---|
| Portique ductile | 4,0 | 6,5 |
| Triangulation à barres centrées | 3,0 | 4,0 |
| Triangulation à barres excentrées (V) | 4,0 | 6,0 |

#### Bois

| Système | q |
|---|---|
| Console encastrée | 1,5 |
| MOB avec voiles contreventement | 2,0 |
| Portique ductile | 2,5 |
| Triangulation hyperstatique | 4,0 |
| Portique cloué hyperstatique dissipatif | 5,0 |

#### Maçonnerie

| Système | q |
|---|---|
| Maçonnerie chaînée non armée | 1,5 |
| Maçonnerie armée | 2,5 |

### Répartition de la force F_b par étage

```
F_i = F_b × (z_i × m_i) / Σ(z_j × m_j)
```

avec **z_i** : hauteur du niveau i, **m_i** : masse au niveau i.

## Analyse modale (spectrale)

### Conditions d'application

- Bâtiment **non régulier** (en plan ou élévation)
- T₁ > 2 × T_C
- Effets de plusieurs modes propres significatifs

### Méthode

1. **Calcul** des modes propres (T_n, déformée modale)
2. **Identification** des modes participant (masse modale > 90 % cumulée)
3. **Réponse modale** : pour chaque mode, calcul de la réponse
4. **Combinaison** des réponses (SRSS ou CQC) :
   - **SRSS** : √(Σ E_i²) — modes non couplés
   - **CQC** : pour modes couplés (recommandée)

## Vérifications fondamentales

### 1. Limitation des déplacements (ELS — art. 4.4.3.2)

#### Pour les bâtiments avec éléments fragiles

```
d_r ≤ 0,005 × h
```

#### Pour les bâtiments avec éléments ductiles

```
d_r ≤ 0,0075 × h
```

- d_r = déplacement relatif inter-étages
- h = hauteur d'étage

### 2. Effets de second ordre P-Δ (art. 4.4.2.2)

#### Coefficient θ

```
θ = P_tot × d_r / (V_tot × h)
```

| θ | Conséquence |
|---|---|
| ≤ 0,1 | Effets négligeables |
| 0,1 < θ ≤ 0,2 | Amplification (1/(1-θ)) |
| 0,2 < θ ≤ 0,3 | Analyse non linéaire requise |
| > 0,3 | Inacceptable — redimensionner |

### 3. Capacité dissipative

#### Pour structures DCM/DCH

- **Acier** : assemblages dissipatifs (rotules plastiques contrôlées)
- **Béton armé** : zones critiques (extrémités poutres/poteaux) avec armatures denses
- **Bois** : assemblages plastifiables (clous, vis, boulons en cisaillement)

#### Règle « strong column / weak beam »

Pour portiques BA :
```
Σ M_Rc ≥ 1,3 × Σ M_Rb
```

→ Les poteaux résistent plus que les poutres : rotules dans les poutres (sécurité).

## Combinaisons d'actions sismiques

### Combinaison ELU sismique (EN 1990)

```
G_k + A_Ed + Σ ψ_2,i × Q_k,i
```

avec :
- **G_k** : actions permanentes
- **A_Ed** : action sismique de calcul
- **ψ_2,i** : coefficients quasi-permanents

### Coefficients ψ_2 typiques (EN 1990 A.1.1)

| Action | ψ_2 |
|---|---|
| Logement A | 0,3 |
| Bureau B | 0,3 |
| Réunion C | 0,6 |
| Stockage E | 0,8 |
| Neige (alt. < 1 000 m) | 0 |
| Neige (alt. ≥ 1 000 m) | 0,2 |
| Vent | 0 |

## Dispositions constructives parasismiques

### Béton armé

- **Aciers** : B500B classe 2 (DCM) ou B500C classe 3 (DCH)
- **Armatures longitudinales** : continuité dans les nœuds
- **Cadres dans zones critiques** : espacement réduit (souvent 6-10 cm)
- **Recouvrement des aciers** majoré (1,5× la longueur d'ancrage)
- **Zones critiques** : extrémités poutres/poteaux sur 1,5× hauteur

### Acier

- **Assemblages dissipatifs** : conception fragmentée (semelles fines pour plastification)
- **Stabilité** des barres comprimées
- **Continuité** des éléments

### Bois

- **Voiles travaillants** en OSB minimum 12 mm
- **Fixations** denses (clous 1/10 cm en zones courantes, 1/5 cm en zones critiques)
- **Tirefonds Ø 10** sur lisse basse tous les 30 cm

### Maçonnerie

- **Chaînages** horizontaux et verticaux (BA)
- **Linteaux** BA
- **Hauteur** limitée (souvent ≤ R+2 en zone 4-5)

## Cas particulier des MI (arrêté 19 juill. 2011)

### Simplification

Pour MI en cat. II + zones 3-4 :
- **Règles forfaitaires** simplifiées
- **Pas de calcul** EC8 complet exigé
- **Dispositions constructives** :
  - Pas de mezzanine porteuse
  - Pas d'angle saillant > 25 %
  - Chaînages horizontaux + verticaux (BA)
  - Toiture liée à chaînage haut
  - Liaison murs-fondation par chaînage

## Effets locaux

### Liquéfaction

- **Sables saturés** soumis à séisme peuvent perdre toute résistance
- **Étude spécifique** si N_SPT < 20 et sol saturé
- **Mitigation** : pieux profonds, vibroflottation, drainage

### Tassements sismiques

- **Cumulés** au tassement statique
- **Estimation** : 1-5 cm pour bâtiment courant en zone 3-4

### Phénomène de battement

- Bâtiments **adjacents** peuvent entrer en collision
- **Distance** minimale entre bâtiments :
  ```
  d = √(d_b1² + d_b2²)
  ```

## Synthèse — bonnes pratiques BE

1. **Identifier la zone** sismique et la catégorie d'importance
2. **Vérifier l'obligation** d'application EC8
3. **Choix du système** structurel + coefficient q approprié
4. **Méthode** : statique équivalente (réguliers) ou modale (complexes)
5. **Vérifications déplacements** + P-Δ
6. **Dispositions constructives** parasismiques selon matériau
7. **Pour MI zones 3-4** : règles forfaitaires arrêté 2011
8. **Logiciels** : Robot, RFEM, Scia, Advance Design avec module sismique
9. **Coordination** avec architecte (régularité géométrique préférable)
10. **Cohérence** avec étude géotechnique (classe de sol)

## Citations à utiliser

- NF EN 1998-1 + AN française
- NF EN 1998-5 (fondations sous séisme)
- Arrêté 22 oct. 2010 modifié (zonage sismique)
- Arrêté 19 juill. 2011 (règles forfaitaires MI)
- Code env. art. R.563-1 et s. (zonage)
- BRGM — carte du zonage sismique
- DTU correspondants pour matériaux

**Référence à citer :** Eurocode 8 + arrêté 22 oct. 2010. Sources : afnor.org, eurocodes.fr (CSTB), BRGM.
