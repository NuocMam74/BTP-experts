# Eurocode 4 — Calcul des structures mixtes acier-béton (NF EN 1994-1-1)

**Source :** NF EN 1994-1-1 (règles générales et règles pour les bâtiments) et son Annexe Nationale française ; NF EN 1994-1-2 (calcul du comportement au feu) ; en interaction avec NF EN 1992-1-1 (béton, EC2), NF EN 1993-1-1 (acier, EC3) et NF EN 1991 (actions, EC1). Connecteurs : NF EN ISO 13918 (goujons à tête). Bacs acier collaborants : Avis Techniques / DTA (CSTB) et NF EN 1993-1-3 (profils minces formés à froid).

## Principe des structures mixtes

Une structure **mixte** associe l'**acier de construction** (profilé, bac) et le **béton** de façon à ce que les deux matériaux travaillent **ensemble** grâce à une **connexion mécanique** transmettant le cisaillement à l'interface. Le béton reprend la **compression**, l'acier la **traction** ; le rendement matière est nettement supérieur à une solution acier seul ou BA seul.

| Élément mixte | Composition | Usage type |
|---|---|---|
| **Plancher collaborant** | Bac acier nervuré + dalle béton + connecteurs | Tertiaire, parkings, planchers de grande portée |
| **Poutre mixte** | Profilé acier (IPE/HEA/HEB/PRS) + dalle béton connectée | Poutres de plancher, bâtiments R+ |
| **Poteau mixte** | Profilé acier enrobé de béton ou tube rempli de béton (CFT) | Poteaux fortement chargés, exigence feu |

### Coefficients partiels (γ_M)

| Matériau / vérification | Coefficient | Valeur (AN) |
|---|---|---|
| Béton (ELU) | γ_C | 1,5 |
| Acier de construction | γ_M0 / γ_M1 | 1,0 |
| Armatures BA | γ_S | 1,15 |
| **Connecteurs (goujons)** | **γ_V** | **1,25** |
| Bac acier (tôle profilée) | γ_M0,ap | 1,0 |

## Largeur participante de dalle b_eff (art. 5.4.1.2)

La **largeur efficace** (participante) de la dalle béton collaborant avec la poutre acier en travée :

```
b_eff = b0 + Σ b_ei      avec   b_ei = min(Le/8 ; bi)
```
- **b0** : entraxe des connecteurs (rangées) ≈ 0 pour 1 file
- **Le** : portée équivalente entre points de moment nul (≈ 0,85 L en travée de rive ; 0,70 L en travée intermédiaire ; 0,25 (L1+L2) sur appui intermédiaire)
- **bi** : demi-distance à la poutre adjacente, limitée à la rive de dalle

Ordre de grandeur : pour une poutre L = 8 m, entraxe 2,5 m → b_eff ≈ 2 × (0,85 × 8 / 8) = 1,70 m (≤ entraxe).

## Poutres mixtes — vérifications

### Moment résistant plastique M_pl,Rd (art. 6.2.1.2)

Pour une **connexion complète** et une section de **classe 1 ou 2**, calcul plastique :
- Béton comprimé : N_c,f = 0,85 × f_cd × b_eff × h_c (h_c = épaisseur de béton au-dessus des nervures)
- Acier tendu : N_a = A_a × f_yd
- Position de l'axe neutre plastique (ANP) :
  - Si **N_c,f ≥ N_a** : ANP dans la dalle → toute la section acier est tendue.
  - Si **N_c,f < N_a** : ANP dans le profilé acier → une partie de l'acier est comprimée.

```
M_pl,Rd = N_a × (bras de levier entre centre de gravité acier tendu et résultante béton)
```

Le moment résistant mixte est typiquement **1,5 à 2,5 fois** celui du profilé acier seul, pour une hauteur identique.

### Effort tranchant (art. 6.2.2)

Repris par l'**âme du profilé acier** seul (le béton est négligé en sécurité) :
```
V_pl,Rd = A_v × f_yd / √3
```
Interaction M-V à vérifier si V_Ed > 0,5 × V_pl,Rd (réduction de f_yd de l'âme).

### Connexion acier-béton — connecteurs (art. 6.6)

#### Goujons à tête soudés (Nelson) — résistance d'un goujon P_Rd (art. 6.6.3.1)

```
P_Rd = min(P_Rd,1 ; P_Rd,2)

P_Rd,1 = 0,8 × f_u × (π × d²/4) / γ_V        (rupture du goujon acier)
P_Rd,2 = 0,29 × α × d² × √(f_ck × E_cm) / γ_V  (écrasement du béton)
```
- **d** : diamètre du fût du goujon (16, 19, 22, 25 mm courants ; **Ø 19 mm** le plus répandu)
- **f_u** : résistance ultime du goujon ≤ 500 MPa
- **α = 1,0** si h_sc/d > 4 (h_sc = hauteur du goujon)
- **γ_V = 1,25**

Ordre de grandeur : goujon Ø 19 h = 100 mm sur béton C25/30 → **P_Rd ≈ 70 à 80 kN/goujon**.

#### Connexion complète vs partielle (art. 6.6.1.2)

- **Connexion complète** : le nombre de connecteurs N_f sur la demi-portée (entre M=0 et M=max) reprend l'effort de cisaillement total V_l = min(N_c,f ; N_a). On atteint le M_pl,Rd plastique complet.
- **Connexion partielle** (degré η = N/N_f < 1) : moins de connecteurs ; le moment résistant est réduit (interpolation entre M_pl,a,Rd acier seul et M_pl,Rd complet). **Degré minimal η ≥ 0,4** (art. 6.6.1.2) pour poutres ductiles selon la portée.

```
Nombre de connecteurs (connexion complète) :  n = V_l / P_Rd
```

#### Réduction pour bac acier transversal (art. 6.6.4.2)

Si le bac collaborant a ses nervures **perpendiculaires** à la poutre, P_Rd est réduit par un facteur **k_t** :
```
k_t = (0,7/√n_r) × (b0/hp) × (h_sc/hp − 1) ≤ k_t,max
```
- n_r : nombre de goujons par nervure (1 ou 2)
- b0, hp : largeur moyenne et hauteur de nervure du bac

## Planchers collaborants à bac acier (art. 9)

### Principe

La **tôle profilée** (bac acier nervuré, ép. 0,75 à 1,25 mm, galvanisé) sert de :
1. **Coffrage** en phase de bétonnage (résiste au poids du béton frais + charges de chantier).
2. **Armature inférieure** en phase définitive (collaboration par adhérence/emboutissage ou ancrage d'extrémité).

### Vérifications spécifiques bac

| Phase | Vérification | Référence |
|---|---|---|
| **Coffrage (provisoire)** | Résistance + flèche du bac sous béton frais + 1,5 kN/m² chantier ; flèche ≤ L/180 ou 20 mm | EN 1993-1-3 + DTA |
| **Mixte (définitif)** | Cisaillement longitudinal (m-k ou méthode de connexion partielle τ_u,Rd) | Art. 9.7 |
| | Flexion section mixte (béton comprimé + tôle tendue) | Art. 9.7.2 |
| | Poinçonnement sous charge concentrée | Art. 9.7.4 |

### Dispositions courantes

- Épaisseur dalle totale : **h ≥ 80 mm** (et ≥ 90 mm si appui sur acier au feu) ; épaisseur béton au-dessus des nervures **h_c ≥ 40 mm**.
- Treillis soudé anti-fissuration en partie haute : **ST 25 C** minimum (≥ 0,2 % de A_c au-dessus des nervures pour planchers continus).
- Portées courantes sans étai : **2,5 à 3,5 m** (selon bac et épaisseur) ; avec étai intermédiaire : jusqu'à 5-6 m.
- Connexion à la poutre porteuse par goujons soudés **à travers le bac** (soudage à travers tôle ≤ 1,25 mm).

## Poteaux mixtes (art. 6.7)

### Types

| Type | Description |
|---|---|
| **Profilé enrobé** | H acier totalement enrobé de béton armé |
| **Profilé partiellement enrobé** | Béton entre les semelles d'un H |
| **Tube rempli (CFT)** | Tube acier (rond CHS ou rectangulaire RHS) rempli de béton |

### Méthode simplifiée (art. 6.7.3)

Domaine de validité : section bi-symétrique constante, **élancement réduit λ̄ ≤ 2,0**, **contribution de l'acier** δ = (A_a × f_yd)/N_pl,Rd entre **0,2 et 0,9**.

```
N_pl,Rd = A_a × f_yd + A_c × f_cd × (0,85 ou 1,0 pour tube) + A_s × f_sd
```
- 0,85 × f_cd pour profilés enrobés ; **1,0 × f_cd pour tubes remplis** (confinement)
- Flambement : N_b,Rd = χ × N_pl,Rd, avec χ d'après les courbes EC3 selon l'axe et le type.
- Effet de **confinement** supplémentaire pour les tubes circulaires courts (λ̄ ≤ 0,5).

### Avantages

- Forte capacité portante pour faible encombrement.
- **Résistance au feu** intrinsèque (béton protège l'acier) — souvent R60 à R120 sans protection rapportée.

## États limites de service (ELS) — retrait et fluage

### Coefficient d'équivalence n (homogénéisation)

Pour ramener le béton à de l'acier équivalent :
```
n0 = E_a / E_cm   (charges instantanées)   ≈ 210000 / 31000 ≈ 6,8 pour C25/30
n_L = n0 × (1 + ψ_L × φ_t)   (charges de longue durée, fluage)
```
- **φ_t** : coefficient de fluage du béton (EC2 §3.1.4), de l'ordre de 2 à 3.
- **ψ_L** : multiplicateur de fluage (1,1 charges permanentes ; 0,55 retrait ; 1,5 précontrainte imposée).

### Effets différés

- **Fluage** : redistribution des contraintes du béton vers l'acier dans le temps → augmentation de la flèche, réduction de la part béton.
- **Retrait** : raccourcissement du béton bridé par l'acier → contraintes de traction dans la dalle (risque de fissuration → treillis anti-retrait obligatoire) et flèche additionnelle.

### Vérifications ELS

- **Flèches** : combinaison caractéristique et quasi-permanente, en tenant compte du n_L (fluage). Limites L/250 (totale) ou L/350 à L/500 (cloisons fragiles, vibrations).
- **Fissuration de la dalle** : sur appuis (zones de moment négatif), w_max selon classe d'exposition (EC2 §7.3) ; armatures de continuité minimales.
- **Vibrations** des planchers de grande portée tertiaires : fréquence propre **f ≥ 3 à 4 Hz** souvent imposée (confort), critère parfois dimensionnant en mixte (planchers légers).

## Pré-dimensionnement — ordres de grandeur (indicatif, à confirmer par note de calcul)

### Poutres mixtes (plancher tertiaire ~ 5 à 7 kN/m² ELS)

| Portée L | Profilé acier (S355) + dalle collaborante | Élancement L/h global |
|---|---|---|
| 6 m | IPE 270 + dalle 12 cm | ~ 22 |
| 8 m | IPE 330 + dalle 12 cm | ~ 22 |
| 10 m | IPE 400 ou HEA 340 + dalle 13 cm | ~ 22 |
| 12 m | HEA 400 + dalle 14 cm | ~ 22 |
| 15 m | PRS + dalle 15 cm | ~ 20 |

> Pré-dimensionnement **indicatif (à confirmer par note de calcul)**. La flèche ELS et les vibrations sont souvent dimensionnantes en mixte.

### Planchers collaborants bac acier

| Épaisseur dalle | Portée sans étai | Portée avec 1 étai |
|---|---|---|
| 12 cm (bac 58-60 mm) | 2,8 à 3,2 m | 4,5 à 5,5 m |
| 14 cm (bac 73-80 mm) | 3,2 à 3,6 m | 5,5 à 6,5 m |

### Poteaux mixtes (tube rempli CFT, S355 + C30/37)

| Charge ELU N_Ed | Section tube indicative |
|---|---|
| 1 500 kN | Ø 244,5 × 8 mm rempli béton |
| 3 000 kN | Ø 323,9 × 10 mm rempli |
| 5 000 kN | □ 350 × 350 × 12,5 RHS rempli + 4 HA20 |

## Synthèse — bonnes pratiques BE mixte

1. **Vérifier la phase de coffrage** du bac (provisoire) **avant** la phase mixte — souvent oubliée.
2. **Dimensionner la connexion** (goujons) : nombre, espacement (e ≤ 6 h_dalle et ≤ 800 mm ; e_min ≥ 5 d) ; vérifier le **degré de connexion** η ≥ minimal.
3. **Tenir compte du retrait et du fluage** aux ELS (coefficient n_L) — impact flèche significatif.
4. **Armatures de continuité** sur appuis (moment négatif) et **treillis anti-fissuration** systématique.
5. **Vibrations** des planchers de grande portée : critère de confort à vérifier (f ≥ 3-4 Hz).
6. **Au feu** (EN 1994-1-2) : les poteaux mixtes ont une bonne tenue intrinsèque ; les poutres mixtes nécessitent souvent une protection (voir corpus sécurité incendie).
7. **Soudage des goujons à travers le bac** : limite d'épaisseur de tôle, galvanisation, contrôle de soudure (essai au coup de marteau / pliage).

## Citations à utiliser

- NF EN 1994-1-1 + AN française (structures mixtes — bâtiments)
- NF EN 1994-1-2 (calcul du comportement au feu des structures mixtes)
- NF EN 1992-1-1 (béton) et NF EN 1993-1-1 (acier) — matériaux constitutifs
- NF EN 1993-1-3 (profils minces — bac acier)
- NF EN ISO 13918 (goujons à tête soudés)
- Avis Techniques / DTA CSTB des bacs collaborants

**Référence à citer :** Eurocode 4 (NF EN 1994-1-1) + AN française, en interaction EC2/EC3. Sources : afnor.org, eurocodes.fr (CSTB).
