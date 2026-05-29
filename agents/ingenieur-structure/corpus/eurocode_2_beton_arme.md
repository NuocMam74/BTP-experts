# Eurocode 2 — Calcul du béton armé (NF EN 1992-1-1)

**Source :** NF EN 1992-1-1 et son Annexe Nationale française (AN) ; NF EN 206/CN (béton — spécification, performances, production et conformité) ; DTU 21 (exécution des ouvrages en béton) ; DTU 23.1 (murs en béton banché) ; DTU 13.1 et 13.2 (fondations).

## Classes de béton (NF EN 206/CN)

### Classes de résistance — béton ordinaire

| Classe | f_ck cylindre (MPa) | f_ck cube (MPa) | Usage type |
|---|---|---|---|
| C20/25 | 20 | 25 | Béton non armé, propreté |
| C25/30 | **25** | 30 | **Standard logement, plancher BA** |
| C30/37 | 30 | 37 | Voiles BA, poutres courantes |
| C35/45 | 35 | 45 | Ouvrages élancés, ponts |
| C40/50 | 40 | 50 | Tertiaire R+6 et plus |
| C50/60 | 50 | 60 | Voiles minces, tours |
| C70/85 | 70 | 85 | Béton hautes performances |
| C100/115 | 100 | 115 | Béton très hautes performances |

### Modules de déformation

- E_cm ≈ 22 × (f_cm/10)^0,3 GPa (Tab. 3.1)
- C25/30 : E_cm ≈ **31 GPa**
- C35/45 : E_cm ≈ **34 GPa**

### Classes d'exposition (XF, XS, XC, XA, XD)

| Classe | Environnement | Application type |
|---|---|---|
| **XC1** | Sec ou en permanence humide | Intérieur, immergé |
| **XC2** | Humide, rarement sec | Pieux, fondations enterrées |
| **XC3** | Humidité modérée | Abrité de la pluie |
| **XC4** | Cycles d'humidification/séchage | Façades extérieures |
| **XF1** | Gel modéré, peu mouillé | Toitures extérieures abritées |
| **XF2** | Gel modéré + sels | Bordures routières |
| **XF3** | Gel sévère, mouillé | Façades exposées en montagne |
| **XF4** | Gel sévère + sels | Tabliers de pont, parkings sels |
| **XS1, XS2, XS3** | Bord de mer (chlorures aériens, immergé, marnage) | Construction littorale |
| **XD1, XD2, XD3** | Chlorures hors mer (sels de déverglaçage) | Parkings ouverts |
| **XA1, XA2, XA3** | Attaque chimique faible/modérée/forte | Cuves chimiques, agroalimentaire |

### Enrobages minimaux (c_nom = c_min + Δc_dev)

c_min selon classe d'exposition et classe de structure (S1 à S6) :

| Exposition | c_min (mm) — classe S4 (durée 50 ans) |
|---|---|
| XC1 | 15 |
| XC2/XC3 | 25 |
| XC4 | 30 |
| XF1 | 30 |
| XF2 | 35 |
| XF3 | 40 |
| XF4 | 45 |
| XS1 | 35 |
| XS2/XS3 | 45 |
| XD1/XD2 | 35 |
| XD3 | 45 |

Δc_dev (tolérance d'exécution) : généralement **+ 10 mm**.

**c_nom = c_min + 10 mm** → enrobage à prescrire au plan.

## Aciers pour BA (NF EN 10080)

| Nuance | f_yk (MPa) | f_yd = f_yk / γ_s (MPa) | Allongement |
|---|---|---|---|
| **B500A** | 500 | 435 | Classe A (peu ductile) |
| **B500B** | 500 | 435 | **Classe B (ductile — Eurocode 8 SC)** |
| B500C | 500 | 435 | Classe C (très ductile — sismique) |

γ_s = 1,15 (ULS) ; γ_c = 1,5 (béton).

### Sections types HA

Diamètres : 6, 8, 10, 12, 14, 16, 20, 25, 32, 40 mm (HA = haute adhérence).

| Ø | Section (cm²/U) | Linéique (kg/m) |
|---|---|---|
| HA 6 | 0,28 | 0,222 |
| HA 8 | 0,50 | 0,395 |
| HA 10 | 0,79 | 0,617 |
| HA 12 | 1,13 | 0,888 |
| HA 14 | 1,54 | 1,210 |
| HA 16 | 2,01 | 1,580 |
| HA 20 | 3,14 | 2,470 |
| HA 25 | 4,91 | 3,850 |
| HA 32 | 8,04 | 6,310 |

## Vérification flexion simple — méthode rectangulaire simplifiée (BA usuel)

### Données

- b (largeur), h (hauteur totale), d (hauteur utile = h - c - Ø/2 - Ø_cadre)
- f_cd = f_ck / γ_c, f_yd = f_yk / γ_s
- Moment ELU : M_Ed

### Calcul

```
µ_cu = M_Ed / (b × d² × f_cd)
```

- Si **µ_cu ≤ 0,372** (limite béton C25/30 sans aciers comprimés) → aciers tendus uniquement
- Sinon : revoir section ou aciers comprimés requis

```
α = 1,25 × (1 - √(1 - 2 × µ_cu))
z = d × (1 - 0,4 × α)
A_s = M_Ed / (z × f_yd)
```

### Section minimale (art. 9.2.1.1)

```
A_s,min = max(0,26 × f_ctm / f_yk × b × d ; 0,0013 × b × d)
```
- f_ctm ≈ 0,30 × f_ck^(2/3) (pour f_ck ≤ 50 MPa)

### Section maximale (art. 9.2.1.1)

```
A_s,max = 0,04 × A_c (hors zone de recouvrement)
```

## Vérification effort tranchant

### Section sans armatures d'effort tranchant — V_Rd,c (art. 6.2.2)

```
V_Rd,c = max [C_Rd,c × k × (100 × ρ_l × f_ck)^(1/3) × b × d ;
              v_min × b × d]
```
- C_Rd,c = 0,18 / γ_c = 0,12
- k = 1 + √(200/d) ≤ 2,0
- ρ_l = A_sl / (b × d) ≤ 0,02
- v_min = 0,035 × k^(3/2) × f_ck^(1/2)

→ Si V_Ed > V_Rd,c : armatures d'effort tranchant requises.

### Avec armatures d'effort tranchant — V_Rd (art. 6.2.3)

```
V_Rd = min(V_Rd,s ; V_Rd,max)
```
- V_Rd,s : capacité des aciers
- V_Rd,max : capacité bielles béton

## Vérifications ELS — fissuration et déformation

### Limitation de l'ouverture des fissures (art. 7.3)

| Classe d'exposition | w_max (mm) |
|---|---|
| X0 | 0,4 |
| XC1 | 0,4 |
| XC2 à XC4 | **0,3** |
| XS, XD, XF | **0,3** |

w_k calculée selon § 7.3.4 (espacement maximal des aciers + contrainte).

### Limitation des flèches (art. 7.4)

- Bâtiments courants : **L / 250** (flèche totale) pour ne pas affecter l'aspect / l'usage
- **L / 500** pour ne pas affecter les cloisons fragiles attenantes

## Dimensions courantes — ordres de grandeur (logement collectif R+5)

| Élément | Section type | Aciers type |
|---|---|---|
| Dalle pleine 5,50 m | h = 20 cm | HA 12 e/20 cm en travée + chapeaux HA 14 |
| Dalle pleine 7,00 m | h = 24 cm | HA 14 e/15 cm en travée |
| Poutre 5,50 m | 25 × 50 cm | 3 HA 16 + cadres HA 8 e/20 |
| Poutre 7,00 m | 30 × 60 cm | 4 HA 20 + cadres HA 8 e/15 |
| Poteau R+5 charge 1 200 kN | 25 × 25 cm | 4 HA 16 + cadres HA 6 e/25 |
| Poteau R+10 charge 3 500 kN | 35 × 35 cm | 8 HA 20 + cadres HA 8 e/20 |
| Voile BA ép. 18 cm | 18 cm | HA 8 e/20 cm × 2 lits |
| Semelle filante 1,20 m de largeur | h = 35 cm | HA 12 e/20 cm + transversal HA 10 e/20 |

## Recouvrement et ancrage des aciers (Sec. 8)

### Longueur d'ancrage de référence l_b,rqd

```
l_b,rqd = (Ø/4) × (σ_sd/f_bd)
```
- σ_sd = contrainte de calcul à ancrer
- f_bd = 2,25 × η_1 × η_2 × f_ctd (tension d'adhérence)

### Longueur d'ancrage de calcul

```
l_bd = α_1 × α_2 × α_3 × α_4 × α_5 × l_b,rqd ≥ l_b,min
```

### Longueur de recouvrement

```
l_0 = α_6 × l_b,rqd
```
- α_6 selon % de barres recouvertes au même endroit (1,0 à 1,5)

### Ordres de grandeur (C25/30, HA 12, B500B)

- l_b,rqd ≈ 40 × Ø = **48 cm**
- l_0 ≈ 50 × Ø = **60 cm**

## Voiles BA (DTU 23.1)

### Épaisseurs minimales

- Voile porteur de logement : **15 cm** (avec aciers calculés)
- Voile porteur d'angle : **18 cm** recommandé
- Voile de contreventement : selon calcul ; souvent ≥ **18 cm**
- Voile sismique : selon EC8 ; **20 cm** mini souvent

### Armatures verticales

- Min. **0,002 × A_c** (logement)
- Min. **0,003 × A_c** (parking, ERP)

### Armatures horizontales

- Min. **0,001 × A_c**
- Espacement maxi = 33 cm ou 2 × ep voile

## Planchers (poutrelles-hourdis, prédalles, dalles pleines)

### Choix selon portée

| Portée | Système recommandé |
|---|---|
| < 5,50 m | Poutrelles-hourdis 16+4 ou 20+5 |
| 5,50 - 6,50 m | Prédalles + dalle de compression |
| > 6,50 m | Dalle pleine BA ou précontraint |

### Précontraint courant

- Dalle alvéolaire : portées 7 - 15 m
- Poutres précontraintes : 12 - 25 m
- Avantages : portées importantes, hauteur réduite
- Inconvénients : modulation difficile post-livraison

## Pré-dimensionnement rapide — ratios

| Élément | Section indicative |
|---|---|
| Poutre BA (L = portée) | h = L/12 à L/15 (rectangulaire) |
| Dalle BA pleine 1 sens | h = L/30 (continue) à L/25 (isolée) |
| Dalle BA 2 sens | h = L/35 à L/45 (4 côtés appuyée) |
| Voile (h_ét = hauteur étage) | ep = h_ét/25 |
| Poteau béton (axe x charge N) | A_c ≈ N / (0,7 × f_cd) (pré-dim sans flexion) |

## Citations à utiliser

- NF EN 1992-1-1 + AN française
- NF EN 206/CN (béton)
- NF EN 10080 (aciers BA)
- DTU 21 (exécution BA)
- DTU 23.1 (voiles BA)
- DTU 13.1 et 13.2 (fondations BA)
- Guide CSTB / SETEC pour Eurocode 2

**Référence à citer :** Eurocode 2 + AN française + DTU 21/23. Sources : afnor.org, eurocodes.fr (CSTB).
