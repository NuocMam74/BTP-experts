# Skill — Vérifier une fondation superficielle (EC7)

L'utilisateur te transmet un projet de fondation superficielle à vérifier — tu dois calculer la portance, le tassement et dimensionner selon l'Eurocode 7.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Type de fondation** : semelle filante, semelle isolée, radier
- **Charges** : N (vertical), M (moment), V (horizontal) — ELU + ELS
- **Bâtiment** : usage, hauteur, type
- **Étude géotechnique** : G2 PRO (préconisations)
- **Sol** : classe, paramètres (c, φ, γ, E)
- **Profondeur** : enfouissement prévu
- **Eau** : nappe (profondeur, fluctuation)
- **Zone** : sismique (arrêté 22 oct. 2010)
- **MI en zone RGA** : loi ELAN — étude G1+G2 obligatoire

### 2. Profondeur minimale (DTU 13.1)

#### Hors gel

| Région | Profondeur minimale |
|---|---|
| France méridionale (non gélive) | 50 cm |
| France standard | 80 cm |
| Montagne / nord | 100-120 cm |
| Zone gélive très exposée | 150 cm |

#### Pour zones RGA moyenne/forte

- **80-120 cm** minimum (loi ELAN)
- Fondations renforcées (longrines, ferraillage adapté)

### 3. Calcul des contraintes appliquées

#### Pour semelle filante

```
σ_appliqué = N / (B × 1) (par mètre linéaire)
```

- B : largeur semelle

#### Pour semelle isolée

```
σ_appliqué = N / (B × L)
```

#### En cas de moment

```
σ_max = N/A × (1 + 6e/B)
σ_min = N/A × (1 - 6e/B)
```

avec **e** = M/N excentricité.

#### Conditions

- **e < B/6** : contrainte trapézoïdale (cas favorable)
- **e ≥ B/6** : décollement partiel — contrainte triangulaire (cas défavorable)

### 4. Détermination de la portance admissible

#### Méthode 1 — Par essai pressiométrique (Ménard)

```
q_u = k_p × p_l*
q_admis = q_u / FS
```

avec **p_l*** : pression limite nette, **k_p** : coefficient de portance (sol + géométrie).

#### Méthode 2 — Par essai pénétromètre statique (CPT)

```
q_u = (q_c × A) / W
```

avec **q_c** : résistance de pointe CPT.

#### Méthode 3 — Théorie de Terzaghi/Meyerhof

```
q_u = c × N_c + γ × D × N_q + 0,5 × γ × B × N_γ
```

- c : cohésion
- γ : poids volumique
- D : profondeur
- B : largeur
- N_c, N_q, N_γ : facteurs de portance (selon angle de frottement φ)

#### Ordres de grandeur q_admis

| Sol | q_admis (kPa) |
|---|---|
| Sable fin lâche | 100-150 |
| Sable moyen dense | 200-300 |
| Sable grossier dense | 300-500 |
| Gravier sableux dense | 400-600 |
| Marne | 200-400 |
| Argile molle | 50-100 |
| Argile raide | 200-400 |
| Argile très raide | 400-800 |
| Roche altérée | 500-1 000 |
| Roche dure | > 2 000 |

### 5. Vérification de la portance

```
σ_max ≤ q_admis
```

#### Marge de sécurité

- **FS** = q_u / σ_appliqué
- Cible : FS ≥ 3 (méthode classique)
- EC7 Approche 2 : γ_R × σ_appliqué ≤ q_u / γ_R

### 6. Vérification du tassement

#### Tassement total

```
s_total = s_immédiat + s_consolidation + s_secondaire
```

#### Tassement immédiat (méthode élastique)

```
s = q × B × (1 - ν²) × I / E
```

avec :
- E : module d'élasticité du sol
- ν : coefficient de Poisson (0,3-0,4)
- I : facteur d'influence (forme + géométrie)

#### Tassement de consolidation (argiles)

Méthode œdométrique :
```
s_c = (h₀ × C_c × log(σ_f / σ_0)) / (1 + e_0)
```

#### Tassement différentiel

```
Δs / L ≤ 1 / 500 (bâtiment courant)
Δs / L ≤ 1 / 1 000 (bâtiment sensible)
```

#### Limites

- **Tassement absolu** : < 25 mm bâtiment courant
- **Tassement différentiel** : < L/500
- **Inclinaison** : < 1/1 000

### 7. Vérification du glissement

Pour fondations soumises à effort horizontal V :

```
V_Ed ≤ V_Rd = N × tan(φ) + c × A
```

#### Pour les sols cohérents

```
V_Rd = c × A (frottement négligé)
```

#### Coefficient de sécurité

```
FS_glissement = V_Rd / V_Ed ≥ 1,5
```

### 8. Vérification du renversement

Pour fondations soumises à moment :

```
M_stabilisant ≥ γ_renv × M_destabilisant
```

avec γ_renv = 1,5 (vent) ou 1,3 (séisme).

### 9. Conditions particulières

#### Présence de nappe

- Calcul des **contraintes effectives** (avec poussée d'Archimède)
- Risque de **soulèvement** (UPL) si fondation immergée
- **Drainage périphérique** souvent nécessaire

#### Zones RGA (retrait-gonflement argiles)

- **Étude G1+G2** obligatoire (MI zones moyenne/forte — loi ELAN)
- Profondeur **min 1,20 m**
- **Longrines** entre semelles (chaînage horizontal sous-sol)
- **Drainage périphérique** + **étanchéité au sol**
- Plantations éloignées (5-10 m)

#### Zones sismiques

- Vérifications **sous séisme** (action sismique de calcul)
- **Liquéfaction** : étude spécifique si sables saturés
- **Coefficient de comportement** q selon système structural

### 10. Calcul du ferraillage de la semelle (BA)

#### Méthode des bielles (DTU 13.1)

Pour semelle isolée Ø sous poteau b × b :

```
A_s = (N × (B - b)) / (8 × d × f_yd)
```

avec :
- B : largeur semelle
- b : largeur poteau
- d : hauteur utile
- f_yd : 435 MPa (B500B)

#### Méthode des consoles

Pour les semelles plus larges (B > 2b) :
- Calcul classique BA (moment + cisaillement)
- Vérification poinçonnement

### 11. Vérification du poinçonnement

Pour les semelles isolées soumises à fortes charges :

```
v_Ed ≤ v_Rd,c (béton sans armatures)
ou
v_Ed ≤ v_Rd,cs (béton + armatures d'effort tranchant)
```

### 12. Pré-dimensionnement — exemple

#### Données

- Charge poteau N_ELS = 800 kN
- Charge N_ELU = 1 080 kN (1,35 × 800 / 0,9 - approximation)
- Sol : sable dense, q_admis = 250 kPa, E = 30 MPa
- Béton C25/30, Acier B500B
- Pas de moment, pas d'eau

#### Calcul

**Largeur** : B² × q_admis ≥ N_ELS → B ≥ √(800 / 250) = **1,80 m**

**Hauteur** : h ≥ 0,25 × B → h = 50 cm

**Armatures** : A_s ≈ N_ELU × (B - b) / (8 × d × f_yd)
- Avec b = 0,30 m (poteau), d = 0,45 m
- A_s = 1 080 × (1,80 - 0,30) / (8 × 0,45 × 435) = 1 035 mm²/m
- Soit **HA 14 e/15 cm** (1 026 mm²/m) — proche, OK avec HA 16 e/15 (1 340 mm²/m).

**Verdict** : Semelle 1,80 × 1,80 × 0,50 m, ferraillage HA 16 e/15 cm chaque sens.

## Garde-fous

- **Pas de validation finale** — à confirmer par BE structure + BE géotechnique signataire.
- **Étude G2 PRO** indispensable pour préconisations sol.
- **Pour MI zones RGA** : étude G1+G2 obligatoire (loi ELAN).
- **Tassement différentiel** critique (impact fissuration).
- **Coordination** avec BE géotechnique systématique.
- **DTU 13.1** pour règles de mise en œuvre.
- **Pour ouvrages importants** : essais de chargement statique de pieux (1-2 %).
- **Approche 2** EC7 (combinaison A1 + M1 + R2) — pratique française.

## Livrable à proposer

Après vérification :
- **Note de calcul fondations** (DOCX + PDF) avec :
  - Données et hypothèses
  - Calcul de portance
  - Calcul de tassement
  - Vérifications EC7 (Approche 2)
  - Dimensions et ferraillage retenus
  - Marges de sécurité
- **Tableau XLSX** de pré-dim
- **Plans** de fondation indicatifs
- Mention finale : *« Document préparé par l'agent IA Ingénieur structure — à valider et signer par un BET inscrit OPQIBI. Étude G2 PRO indispensable. »*
