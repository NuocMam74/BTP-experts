# Eurocode 5 — Calcul des structures en bois (NF EN 1995-1-1)

**Source :** NF EN 1995-1-1 et son Annexe Nationale française ; NF EN 14081 (classement des bois résineux) ; NF EN 14080 (lamellé-collé) ; DTU 31.1 (charpente bois) ; DTU 31.2 (constructions à ossature bois) ; DTU 31.3 (charpentes industrialisées) ; DTU 51.3 (planchers bois) ; arrêté 22 oct. 2010 (sismique).

## Classes de service et durée des charges

### Classes de service (art. 2.3.1.3)

| Classe | Environnement | Humidité moyenne du bois |
|---|---|---|
| **1** | Intérieur chauffé (T ≥ 20 °C, HR < 65 %) | ≤ 12 % |
| **2** | Intérieur non chauffé / abris (HR jusqu'à 85 %) | ≤ 20 % |
| **3** | Extérieur ou conditions humides | > 20 % |

### Classes de durée des charges (art. 2.3.1.2)

| Classe | Durée typique | k_mod (résineux) C1-C2 | k_mod C3 |
|---|---|---|---|
| **Permanente** (G) | > 10 ans | 0,60 | 0,50 |
| **Long terme** | 6 mois - 10 ans | 0,70 | 0,55 |
| **Moyen terme** (Q usage) | 1 semaine - 6 mois | 0,80 | 0,65 |
| **Court terme** (neige, vent) | < 1 semaine | 0,90 | 0,70 |
| **Instantanée** (accidentel) | Quelques sec | 1,10 | 0,90 |

→ Le **k_mod** réduit la capacité du bois selon les conditions cumulées (humidité × durée).

## Classes de résistance (NF EN 338 — résineux et feuillus)

### Bois résineux

| Classe | f_m,k (MPa, flexion) | f_t,0,k (traction axiale) | f_c,0,k (compression axiale) | E_0,mean (MPa) | ρ_k (kg/m³) |
|---|---|---|---|---|---|
| C18 | 18 | 11 | 18 | 9 000 | 320 |
| C24 | **24** | 14 | 21 | **11 000** | 350 |
| C30 | 30 | 18 | 23 | 12 000 | 380 |
| C40 | 40 | 24 | 27 | 14 000 | 400 |

**C24** est la classe de référence pour la **charpente traditionnelle** française.

### Lamellé-collé GL (NF EN 14080)

| Classe | f_m,k (MPa) | f_t,0,k | f_c,0,k | E_0,mean | ρ_k |
|---|---|---|---|---|---|
| GL24h (homogène) | 24 | 19,2 | 24 | 11 500 | 385 |
| **GL24c** (combiné) | 24 | 16,5 | 21,5 | **11 000** | 365 |
| GL28h | 28 | 22,3 | 28 | 12 600 | 425 |
| GL30c | 30 | 19,5 | 24,5 | 13 600 | 390 |
| GL32h | 32 | 25,6 | 32 | 14 200 | 440 |

### Bois feuillus

| Classe | f_m,k (MPa) | ρ_k |
|---|---|---|
| D24 (peuplier) | 24 | 485 |
| D30 (chêne français) | **30** | **530** |
| D40 (chêne, hêtre âgé) | 40 | 590 |
| D60 | 60 | 700 |

## Coefficients de sécurité (Tab. 2.3 + AN)

| Matériau | γ_M |
|---|---|
| Bois massif | **1,30** |
| Lamellé-collé (GL) | **1,25** |
| LVL, panneaux | 1,20 |
| Liaisons (assembleurs métalliques) | 1,30 |
| Situations accidentelles | 1,00 |

### Formule générale ELU

```
σ_d = f_k × k_mod / γ_M
```

Exemple — C24, classe service 1, charge court terme (vent) :
- f_m,d = 24 × 0,9 / 1,3 = **16,6 MPa**

## Vérifications usuelles

### 1. Flexion simple (art. 6.1.6)

```
σ_m,d / f_m,d ≤ 1,0
```
avec σ_m,d = M_Ed / W

### 2. Cisaillement (art. 6.1.7)

```
τ_d / f_v,d ≤ 1,0
```
- f_v,k : résistance au cisaillement (C24 : 4 MPa)

### 3. Compression axiale + flambement (art. 6.3.2)

```
σ_c,0,d / (k_c × f_c,0,d) ≤ 1,0
```
- k_c : coefficient de flambement, calculé selon l'élancement

### 4. Flexion biaxiale + compression

Formule d'interaction (art. 6.3.2(3)) — vérification multi-cas.

### 5. ELS — limitation des flèches (art. 7.2)

| Composante | Flèche limite |
|---|---|
| w_inst (flèche instantanée sous charge totale) | L/300 |
| w_fin (flèche finale, fluage inclus) | L/200 - L/250 |
| w_net,fin (flèche nette finale après contre-flèche) | L/250 - L/300 |

#### Coefficient de fluage k_def

| Classe service | k_def — bois massif/GL |
|---|---|
| 1 | 0,60 |
| 2 | 0,80 |
| 3 | 2,00 |

```
w_fin = w_inst × (1 + k_def)
```

## Assemblages — règles fondamentales

### Types d'assemblages courants

| Type | Description |
|---|---|
| **Boulons** | Ø 12 à 24 mm — perçage anti-fendage |
| **Tirefonds (TF)** | Vis bois Ø 8 à 20 mm — pré-perçage 70 % Ø |
| **Connecteurs métalliques** (Bulldog, Geka) | Disque dentelé pris dans l'assemblage |
| **Clous lisses / annelés** | Ø 2,8 à 6 mm |
| **Vis structure** (HBS, ASSY VG) | Ø 6 à 14 mm — sans pré-perçage souvent |
| **Plaques perforées** (sabots, étriers) | Acier galvanisé |
| **Assemblages traditionnels** (mortaise-tenon, queue d'aronde) | Charpente patrimoniale |
| **Goujons collés** | Liaisons à fortes charges, lamellé-collé |

### Distances aux rives (art. 8.5.1)

Pour boulons (parallèles au fil) :
- Distance à l'extrémité chargée : ≥ 7 d (compression) ou 12 d (traction)
- Distance à la rive parallèle : ≥ 3 d
- Espacement entre boulons : ≥ 4 d (parallèle au fil), 4 d (perpendiculaire)

### Capacité d'un boulon — formule Johansen (mode rupture mixte)

Pour assemblage bois-bois (double cisaillement) :
```
F_v,Rk = min de plusieurs modes de rupture (a-g) selon EC5 § 8.2
```

## Structures types — pré-dimensionnement rapide

### Charpente fermette industrialisée

- Entraxe : 60 cm typique
- Portée commune : 4 à 12 m
- Bois C24, sections 36 × 97 mm (membrures), 36 × 75 mm (diagonales)
- Connecteurs métalliques estampés

### Charpente traditionnelle

- Pannes : portée 4 - 5 m, section 100 × 180 mm en C24
- Chevrons : portée 3 - 4 m, section 50 × 80 mm
- Liteaux : section 40 × 40 mm

### Plancher bois (DTU 51.3)

| Portée | Section solive (C24, e/60) |
|---|---|
| 3,00 m | 50 × 200 |
| 4,00 m | 75 × 220 |
| 5,00 m | 75 × 240 + entraxe 50 cm |
| 6,00 m | 100 × 280 |

### Ossature bois (MOB, DTU 31.2)

- Montants : section 45 × 145 mm (pour mur isolé 145 mm laine), entraxe 40 ou 60 cm
- Lisses haute et basse : 45 × 145 mm
- Voiles travaillants : panneau OSB ép. 12 mm (contreventement)
- Liaison à la dalle : tirefonds Ø 10 mm tous les 30 cm

### Poutre lamellé-collé (GL24c)

| Portée | Section type | Charge admise |
|---|---|---|
| 8 m | 100 × 360 | ~ 3 kN/m |
| 10 m | 100 × 480 | ~ 3 kN/m |
| 12 m | 140 × 580 | ~ 3 kN/m |
| 15 m | 160 × 720 | ~ 3 kN/m |
| 18 m | 200 × 900 | ~ 3 kN/m |

## Durabilité — classes d'emploi (NF EN 335)

| Classe | Risque | Application |
|---|---|---|
| **1** | Pas d'humidité | Charpente intérieur sec |
| **2** | Humidité occasionnelle | Charpente couverte non chauffée |
| **3.1** | Humidité fréquente — bois protégé | Bardages, ossature MOB protégée |
| **3.2** | Humidité fréquente — bois exposé | Menuiseries extérieures, terrasses |
| **4** | Contact sol/eau douce | Pieux bois, palissades enterrées |
| **5** | Eau salée | Quais, pieux en eau de mer |

→ Traitement préventif (autoclave, lazure, bois rétifiés) selon classe d'emploi.

### Bois naturellement durables (classe 4 sans traitement)

- Chêne (duramen)
- Mélèze (duramen)
- Douglas (duramen, France)
- Châtaignier (duramen)
- Robinier (acacia)
- Bois exotiques : ipé, teck, padouk, iroko

## Sismique — règles particulières (EC5 § 9 + EC8)

### Comportement ductile

Les structures bois peuvent être conçues en :
- **Classe DCM** (ductilité moyenne) : pas d'exigences particulières
- **Classe DCH** (ductilité haute) : assemblages capables de plastifier (q = 4 à 5)

### Coefficient de comportement q (EC8 Tab. 8.1)

| Système | q |
|---|---|
| Console encastrée | 1,5 |
| Structure MOB avec voiles contreventement | 2,0 |
| Portique MOB ductile (assemblages plastifiables) | 2,5 |
| Triangulation hyperstatique | 4,0 |
| Portique cloué hyperstatique avec assemblages dissipatifs | 5,0 |

## Comportement au feu (NF EN 1995-1-2)

### Méthode de la section réduite

```
d_ef = d_char,n + k_0 × d_0
```
- d_char,n : profondeur carbonisée (calculée selon vitesse β_n)
- d_0 : couche affaiblie (7 mm forfait)
- k_0 : coefficient d'incrément

### Vitesses de carbonisation β_n (Tab. 3.1)

| Matériau | β_n (mm/min) |
|---|---|
| Résineux ρ ≥ 290 kg/m³ | 0,80 |
| Feuillus ρ ≥ 290 kg/m³ | 0,55 |
| Lamellé-collé GL | 0,70 |

### Stabilité au feu

| Cible | Carbonisation après 60 min |
|---|---|
| SF 30 min | 30 × 0,80 = 24 mm |
| SF 60 min | 60 × 0,80 = 48 mm |
| SF 90 min | 90 × 0,80 = 72 mm |

→ Choix de **section nominale** suffisante pour conserver la section structurelle après combustion (méthode de la « section réduite »).

## Citations à utiliser

- NF EN 1995-1-1 + AN française
- NF EN 1995-1-2 (feu)
- NF EN 14081 (classement résineux), NF EN 338 (classes résistance)
- NF EN 14080 (lamellé-collé)
- NF EN 335 (classes d'emploi durabilité)
- DTU 31.1 (charpente bois)
- DTU 31.2 (MOB - ossature bois)
- DTU 31.3 (charpentes industrialisées)
- DTU 51.3 (planchers bois)
- Arrêté 22 oct. 2010 (sismique)

**Référence à citer :** Eurocode 5 + AN française + DTU 31. Sources : afnor.org, eurocodes.fr (CSTB), FCBA.
