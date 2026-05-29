# Eurocode 1 — Actions sur les structures

**Source :** NF EN 1991 (Eurocode 1) — séries de normes publiées par AFNOR :
- NF EN 1991-1-1 (actions permanentes, charges d'exploitation)
- NF EN 1991-1-3 (charges de neige)
- NF EN 1991-1-4 (actions du vent)
- NF EN 1991-1-5 (actions thermiques)
- NF EN 1991-1-7 (actions accidentelles)
- Annexes Nationales françaises (AN) précisant les valeurs nationales (NDP — National Determined Parameters).

## EN 1991-1-1 — Actions permanentes et charges d'exploitation

### Poids volumiques (matériaux courants)

| Matériau | Poids volumique γ (kN/m³) |
|---|---|
| Béton armé courant | **25** |
| Béton léger (structures porteuses) | 17 - 22 |
| Béton de remplissage non armé | 24 |
| Acier S235 / S355 | 78,5 |
| Bois résineux (sapin, épicéa) | 4 - 5 |
| Bois dur (chêne, hêtre) | 7 - 9 |
| Lamellé-collé GL24 | 4 |
| Maçonnerie pleine (briques pleines) | 18 |
| Maçonnerie creuse (parpaings creux) | 10 - 13 |
| Brique terre cuite creuse | 8 - 10 |
| Plâtre carreaux | 8 |
| Plaque de plâtre BA13 (13 mm) | 0,12 kN/m² |
| Carrelage + colle (10 mm) | 0,30 kN/m² |
| Isolant laine minérale | 0,5 - 2 |
| Étanchéité bicouche | 0,20 kN/m² |

### Charges d'exploitation (Q_k) — usages courants (Tab. 6.1 AN)

| Catégorie | Description | q_k (kN/m²) | Q_k concentrée (kN) |
|---|---|---|---|
| **A1** | Logement, habitations privées | **1,5** | 2,0 |
| **A2** | Escaliers, balcons | 2,5 | 2,0 |
| **B** | Bureaux | **2,5 - 3,5** | 4,0 |
| **C1** | Lieux de réunion (restaurants, cafés, salles d'attente) | 2,5 | 3,0 |
| **C2** | Lieux de réunion fixes (cinémas, théâtres, églises) | 4,0 | 4,0 |
| **C3** | Espaces sans obstacle (musées, halls d'expo) | 4,0 | 4,0 |
| **C4** | Activités physiques (gymnases, salles de danse) | 5,0 | 7,0 |
| **C5** | Réunions de personnes (gares, salles concert) | 5,0 | 4,5 |
| **D1** | Commerces de détail | 5,0 | 5,0 |
| **D2** | Grands magasins | 5,0 | 7,0 |
| **E1** | Aires de stockage (entrepôts) | **7,5** + à calculer | 7,0 |
| **E2** | Aires industrielles | À calculer | À calculer |
| **F** | Parkings véhicules légers (< 30 kN) | 2,5 | 20 |
| **G** | Parkings véhicules lourds | 5,0 | 90 |
| **H** | Toitures inaccessibles (sauf entretien) | 0,8 | 1,5 |
| **I** | Toitures accessibles (catégories A à G correspondantes) | Selon usage | Selon usage |

### Cloisons mobiles (art. 6.3.1.2)

Cloisons mobiles ≤ 1 kN/ml → charge uniforme : **+ 0,5 kN/m²** ajoutée
Cloisons 1 à 2 kN/ml → **+ 0,8 kN/m²**
Cloisons 2 à 3 kN/ml → **+ 1,2 kN/m²**
Cloisons > 3 kN/ml : calcul spécifique

### Charges sur garde-corps

| Usage | Charge horizontale linéique |
|---|---|
| Habitation A1 | 0,5 kN/ml |
| Tertiaire B, C1, C3 | 0,6 - 1,0 kN/ml |
| Gradins, salles à risque C5 | 3,0 kN/ml |

## EN 1991-1-3 — Charges de neige

### Charge caractéristique au sol s_k (AN française)

Par zone :

| Zone | s_k (kN/m²) |
|---|---|
| A1 | 0,45 |
| A2 | 0,55 |
| B1 | 0,55 |
| B2 | 0,65 |
| C1 | 0,65 |
| C2 | 0,90 |
| D | 0,90 |
| E (montagne) | 1,40 + variation altitude |

### Charge sur la toiture (s)

```
s = µ_i × C_e × C_t × s_k
```
- **µ_i** : coefficient de forme (toiture)
- **C_e** : coefficient d'exposition (vent dégagement) — 0,8 à 1,2
- **C_t** : coefficient thermique (toiture isolée fortement chauffée) — généralement 1,0

### Coefficient de forme µ_1 (toiture inclinée à 1 versant)

| Angle pente α | µ_1 |
|---|---|
| 0° ≤ α ≤ 30° | 0,8 |
| 30° < α < 60° | 0,8 × (60-α)/30 |
| α ≥ 60° | 0 |

Pour toiture à deux versants, formules µ_2, µ_3 selon Annexe nationale.

### Charge en montagne

Au-dessus de 1 000 m, la formule peut être augmentée selon altitude.

### Surcharge de neige déposée (cas de **balayage par le vent**)

À considérer pour des toitures à plusieurs versants ou ouvertes (couloirs, redans).

## EN 1991-1-4 — Actions du vent

### Pression dynamique de référence q_p(z)

```
q_p(z) = c_e(z) × q_b
q_b = (1/2) × ρ × v_b²
```
- **v_b** : vitesse de référence en m/s (zone)
- **ρ** : masse volumique de l'air (1,25 kg/m³)
- **c_e(z)** : coefficient d'exposition (terrain + altitude)

### Vitesses de référence v_b (AN française) — vent décennal moyen

| Zone | v_b (m/s) | q_b (N/m²) |
|---|---|---|
| 1 | 22 | 302 |
| 2 | 24 | 360 |
| 3 | 26 | 422 |
| 4 | 28 | 490 |
| 5 (littoral, montagne haute) | 31 | 602 |

### Catégories de terrain

| Catégorie | Description | z_0 (m) | z_min (m) |
|---|---|---|---|
| 0 | Mer ou grand lac | 0,003 | 1 |
| I | Lacs, terrain plat sans obstacle | 0,01 | 1 |
| II | Plaine, peu d'obstacles isolés | 0,05 | 2 |
| IIIa | Campagne avec haies, fermes | 0,20 | 5 |
| IIIb | Banlieue, forêt | 0,30 | 5 |
| IV | Centre ville, immeubles hauteur ≥ 15 m | 1,00 | 10 |

### Coefficient d'exposition c_e(z)

Calcul selon § 4.5 EN 1991-1-4 :
```
c_e(z) = c_r²(z) × (1 + 7 × I_v(z))
```
- c_r(z) : coefficient de rugosité = k_r × ln(z/z_0)
- k_r : coefficient de terrain
- I_v : intensité de turbulence

### Pression sur les parois w_e

```
w_e = q_p(z_e) × c_pe
```
- c_pe : coefficient de pression extérieure (positif = poussée vers paroi, négatif = succion)

#### Coefficients de pression — bâtiment rectangulaire

| Zone | c_pe pour h/d ≤ 1 |
|---|---|
| A (façade au vent) | + 0,8 |
| B (côté) | - 1,2 (zone d'arête sur 1/5 de longueur) |
| C (côté arrière de B) | - 0,8 |
| D (face sous le vent) | - 0,5 à - 0,7 |
| E (mur opposé au vent) | + 0,3 à + 0,5 |

#### Pour toitures terrasses (h/d > 0,5)

| Zone (du périmètre) | c_pe |
|---|---|
| F (coins) | - 1,4 à - 2,4 |
| G (bords) | - 0,9 à - 1,8 |
| H (intérieur) | - 0,7 |
| I (centre) | - 0,5 à - 0,2 |

### Action interne (c_pi)

Selon perméabilité du bâtiment :
- Bâtiment dominant fermé : c_pi = -0,3 à +0,2
- Bâtiment dominant ouvert : selon orientation des ouvertures

### Vent total sur paroi

```
w = w_e - w_i = q_p × (c_pe - c_pi)
```

## EN 1991-1-5 — Actions thermiques

### Variations saisonnières (charge sur structures)

Différentiel de température à considérer (selon zone climatique et matériau) :
- Béton armé : ΔT = ± 25 °C
- Acier : ΔT = ± 30 °C
- Bois : ΔT = ± 15 °C

### Effets

- Dilatation/contraction des structures longues (joints de dilatation tous les 30 à 50 m pour BA)
- Contraintes thermiques résiduelles dans ouvrages hyperstatiques

## EN 1991-1-7 — Actions accidentelles

### Chocs

#### Véhicules

- Choc frontal sur poteau : F_d = 1 000 kN appliqué horizontalement à h = 1,5 m (cat. autoroute)
- Choc latéral : F_d = 500 kN

#### Chariots élévateurs

- Dans entrepôts : selon classe (charge transportée + vitesse)

### Explosions

- Surpression : selon analyse de risque (gaz, poussières)
- Application Annexe A à F EN 1991-1-7

## Combinaisons d'actions — EN 1990

### Combinaison fondamentale ULS (état limite ultime)

```
1,35 × G_k + 1,5 × Q_k,1 + Σ 1,5 × ψ_0,i × Q_k,i
```
- **G_k** : actions permanentes
- **Q_k,1** : action variable principale
- **Q_k,i** : actions variables d'accompagnement (i > 1)
- **ψ_0,i** : coefficient de combinaison (Tab. A.1.1 EN 1990)

#### Coefficients ψ — usages courants

| Catégorie | ψ_0 | ψ_1 | ψ_2 |
|---|---|---|---|
| A (logement) | 0,7 | 0,5 | 0,3 |
| B (bureaux) | 0,7 | 0,5 | 0,3 |
| C (lieux réunion) | 0,7 | 0,7 | 0,6 |
| D (commerce) | 0,7 | 0,7 | 0,6 |
| E (stockage) | 1,0 | 0,9 | 0,8 |
| F (parking VL) | 0,7 | 0,7 | 0,6 |
| H (toiture inaccessible) | 0 | 0 | 0 |
| Neige (alt. < 1 000 m) | 0,5 | 0,2 | 0 |
| Neige (alt. > 1 000 m) | 0,7 | 0,5 | 0,2 |
| Vent | 0,6 | 0,2 | 0 |
| Thermique | 0,6 | 0,5 | 0 |

### Combinaison ELS (état limite de service)

#### Caractéristique (rare)
```
G_k + Q_k,1 + Σ ψ_0,i × Q_k,i
```

#### Fréquente
```
G_k + ψ_1 × Q_k,1 + Σ ψ_2,i × Q_k,i
```

#### Quasi-permanente
```
G_k + Σ ψ_2,i × Q_k,i
```

### Combinaison accidentelle

```
G_k + A_d + ψ_1 × Q_k,1 + Σ ψ_2,i × Q_k,i
```
- A_d : valeur de calcul de l'action accidentelle

### Combinaison sismique

```
G_k + A_Ed + Σ ψ_2,i × Q_k,i
```
- A_Ed : action sismique selon EN 1998

## Synthèse — méthode de pré-dimensionnement

1. **Identifier le bâtiment** : usage (catégorie A-H), géométrie (hauteur, longueur, largeur), zone géographique
2. **Recenser les actions** :
   - Permanentes : poids propre + équipements
   - Variables : charges d'exploitation + neige + vent + thermique
   - Accidentelles si pertinent (choc, explosion, sismique)
3. **Calculer les valeurs caractéristiques** :
   - q_k usage (Tab. 6.1)
   - s_k neige (carte zone)
   - q_p(z) vent
4. **Établir les combinaisons** :
   - ULS fondamentale
   - ELS caractéristique / fréquente / quasi-permanente selon besoin
5. **Vérification éléments** selon EC2 (béton), EC3 (acier), EC5 (bois), EC6 (maçonnerie)
6. **Vérification sismique** selon EC8 + arrêté 22 oct. 2010

## Citations à utiliser

- NF EN 1991-1-1 + AN (poids, charges)
- NF EN 1991-1-3 + AN (neige)
- NF EN 1991-1-4 + AN (vent)
- NF EN 1991-1-5 + AN (thermique)
- NF EN 1991-1-7 + AN (accidentel)
- NF EN 1990 + AN (combinaisons)
- Arrêté 22 oct. 2010 (sismique)
- DTU correspondants pour le pré-dimensionnement opérationnel

**Référence à citer :** Eurocode 1 (EN 1991) + Annexes Nationales AFNOR. Sources : afnor.org, eurocodes.fr (CSTB), Legifrance pour les arrêtés.
