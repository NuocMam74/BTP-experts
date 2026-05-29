# Méthodes de calcul de cubatures (terrassements)

**Source :** Pratiques professionnelles géomètre-expert ; norme NF P 11-300 (classement des matériaux meubles et rocheux pour terrassements) ; fascicule 2 du CCTG-TP (terrassements généraux) ; jurisprudence des marchés publics et privés.

## Vocabulaire

| Terme | Définition |
|---|---|
| **Cubature** | Volume calculé entre deux surfaces (TN et plate-forme projetée) |
| **TN** (Terrain Naturel) | Surface topographique avant intervention |
| **TPF** (Terrain Projeté Fini) | Surface projetée finale |
| **Déblais** | Volume à enlever (TN > TPF) |
| **Remblais** | Volume à apporter (TPF > TN) |
| **Foisonnement** | Augmentation de volume après extraction (~ 15 à 30 % selon nature) |
| **Compactage** | Réduction volume après mise en œuvre (~ inverse foisonnement) |
| **Solde matériaux** | Différence entre déblais et remblais (export ou import) |

## Coefficient de foisonnement — ordres de grandeur (NF P 11-300)

| Matériau | Cf (foisonnement) | Cc (compactage) |
|---|---|---|
| Terre végétale | 1,15 - 1,25 | 0,90 - 0,95 |
| Argile sèche | 1,15 - 1,30 | 0,90 |
| Argile saturée | 1,15 - 1,25 | 0,85 - 0,90 |
| Limon | 1,15 - 1,25 | 0,88 |
| Sable | 1,10 - 1,20 | 0,92 |
| Grave naturelle | 1,20 - 1,25 | 0,95 |
| Marne | 1,30 - 1,40 | 0,85 |
| Roche concassée | 1,35 - 1,50 | 0,80 - 0,90 |
| Rocher massif tiré à l'explosif | 1,50 - 1,80 | — |

Formule pratique :
```
Vol. transport = Vol. en place × Cf
Vol. compacté final = Vol. transport / Cc
```

## Méthode 1 : Calcul par profils en travers

### Principe

Utilisée pour les **ouvrages linéaires** (routes, tranchées, digues).

1. Lever en TN sur des profils transversaux régulièrement espacés
2. Tracer les profils projetés (TPF) au même endroit
3. Calculer la **surface** (en m²) de déblai et de remblai sur chaque profil
4. Multiplier par la **distance** entre profils consécutifs

### Formules

#### Formule des trapèzes (méthode classique)

Entre 2 profils P_i et P_(i+1) distants de L :
```
V = L × (S_i + S_(i+1)) / 2
```
avec S_i = surface mesurée au profil P_i.

#### Formule de Simpson (plus précise)

Pour 3 profils espacés régulièrement de L :
```
V = (2L / 6) × (S_1 + 4 × S_2 + S_3) = (L/3) × (S_1 + 4 S_2 + S_3)
```

#### Formule du « prismatoïde »

Plus précise mais complexe :
```
V = (L/6) × (S_1 + 4 × S_milieu + S_2)
```

### Espacement des profils

| Configuration | Espacement type |
|---|---|
| Profils en alignement droit | 20 à 25 m |
| Profils en courbe | 10 à 15 m |
| Profils en raccordement | 5 à 10 m |
| Profils en zones de variation forte | 3 à 5 m |

→ Augmenter la densité des profils dans les zones de fort dénivelé ou de raccordement.

## Méthode 2 : Calcul par carroyage (grilles régulières)

### Principe

Utilisée pour les **plateformes** et zones étendues sans direction privilégiée (parkings, lotissements, dépôts).

1. Découper la zone en **mailles régulières** carrées (5 × 5 m, 10 × 10 m, 20 × 20 m selon précision recherchée)
2. À chaque **nœud** de la grille, mesurer altitude TN et altitude TPF
3. Calculer la **différence altimétrique** Δh = TPF - TN à chaque nœud
4. Multiplier par la surface unitaire de la maille

### Formules

#### Méthode du centre de maille

Pour chaque maille de surface S = a × b :
```
V_maille = a × b × (Δh1 + Δh2 + Δh3 + Δh4) / 4
```
avec Δh_i = différences aux 4 nœuds.

#### Méthode des moyennes pondérées

Sur l'ensemble de la zone, somme des V_maille en distinguant déblais (Δh > 0) et remblais (Δh < 0).

### Précision

- Mailles 5 × 5 m : précision ± 2 à 5 %
- Mailles 10 × 10 m : précision ± 5 à 10 %
- Mailles 20 × 20 m : précision ± 10 à 20 %

→ Le pas doit être adapté à la **variabilité altimétrique** du terrain.

## Méthode 3 : MNT et calcul numérique (3D)

### Principe

Utilisée pour les projets actuels (avec logiciels Mensura, AutoCAD Civil 3D, Covadis, Atlas).

1. Créer un **MNT** (Modèle Numérique de Terrain) à partir des points levés
   - Source : tachéométrie, GPS RTK, drone LiDAR ou photogrammétrique, scanner 3D
   - Maillage **TIN** (Triangulated Irregular Network)
2. Modéliser le **TPF** (projet)
3. **Comparer les deux surfaces** : calcul automatique des volumes déblais/remblais
4. Restitution sous forme de **cartes de cubature** + **profils en travers** automatiques

### Avantages

- Précision élevée (± 1 à 3 %)
- Mise à jour rapide en cas de modification du projet
- Génération automatique de **plans d'implantation** et de **cartes d'avancement**

### Précision selon mode de levé

| Mode | Précision plani | Précision alti |
|---|---|---|
| Tachéomètre classique | ± 5 à 10 mm | ± 5 à 10 mm |
| GPS RTK | ± 10 à 30 mm | ± 20 à 40 mm |
| GPS PPK post-traité | ± 5 à 15 mm | ± 10 à 30 mm |
| Drone photogrammétrique (avec GCP) | ± 30 à 100 mm | ± 30 à 100 mm |
| Drone LiDAR | ± 20 à 50 mm | ± 30 à 50 mm |
| Scanner 3D terrestre | ± 2 à 10 mm | ± 2 à 10 mm |

## Calcul du solde de matériaux

### Bilan terre

```
Volume déblai en place = D
Volume remblai en place après compactage = R
Volume remblai à apporter en transport (avant compactage) = R × Cc⁻¹
Solde matériaux (transport) = (D × Cf) - (R × Cc⁻¹)
                  > 0 : EXPORT (évacuation décharge ou réemploi externe)
                  < 0 : IMPORT (apport extérieur)
```

### Exemple

Projet : déblai 12 000 m³ en place, remblai 8 000 m³ en place.
Matériau : argile dense, Cf = 1,20, Cc = 0,88.

- Déblai en transport = 12 000 × 1,20 = **14 400 m³**
- Remblai à apporter en transport = 8 000 / 0,88 = **9 091 m³**
- **Solde** = 14 400 - 9 091 = **5 309 m³ à exporter**

### Optimisation : réemploi sur site

Si l'argile est apte au réemploi (tests GTR — NF P 11-300) :
- Réemploi du déblai en remblai (économie d'apport)
- Solde réduit aux excédents non utilisés

## Notion de plate-forme et de fond de forme

### Fond de forme

- Niveau **après** terrassement et **avant** mise en œuvre de la couche de forme ou des fondations.
- C'est sur ce niveau que se mesure la cubature **brute**.

### Couche de forme

- Couche de transition entre le fond de forme et la **couche d'assise** (chaussée, dallage).
- Épaisseur : 30 à 70 cm selon nature du sol et trafic.
- À chiffrer séparément (matériau d'apport noble).

### Couche d'assise

- Béton de propreté, grave traitée au liant hydraulique (GTLH), grave non traitée (GNT)
- Chiffrée à part en m³ ou m² × épaisseur

## Spécificités terrassements en milieu urbain

- **Sondages préalables** : sondages géotechniques (G2 PRO) + recherches de réseaux (DT-DICT obligatoire) avant tout terrassement.
- **Stabilisation des talus** : pente max selon nature (3/2 pour terre, 1/1 pour rocher) ou soutènement (palplanches, parois berlinoises).
- **Évacuation contrôlée** : bons de pesée + bordereaux de suivi des déchets (BSD) si pollués.
- **Décapage de la terre végétale** : 20 à 40 cm en moyenne, à stocker pour réutilisation paysagère (compte spécifique).

## Critères de validation d'un calcul cubature

### Auto-contrôle

1. **Cohérence** : ordre de grandeur cohérent avec emprise et dénivelé moyen ?
2. **Vérification croisée** : recalcul par 2 méthodes (profils + carroyage) → écart < 5 %
3. **Densité de points** : suffisante pour caractériser le terrain ?
4. **Points singuliers** : levés (talus, fossés, ouvrages existants) ?

### Contre-expertise

- En cas de litige (réclamation entreprise sur quantité), recours possible à un géomètre tiers
- Métrage contradictoire avant et après terrassement (relevé final)

## Citations à utiliser

- NF P 11-300 (Classification des matériaux pour terrassements)
- Fascicule 2 du CCTG-TP (Terrassements généraux)
- DTU 12 (Terrassements pour le bâtiment)
- Guide technique LCPC-SETRA — Réalisation des remblais et des couches de forme (GTR, sept. 2000)
- Norme NF EN ISO 17892 (essais géotechniques de laboratoire)
- Loi 46-942 du 7 mai 1946 (mission du géomètre-expert)

**Référence à citer :** NF P 11-300, GTR LCPC-SETRA, pratique géomètre-expert. Sources : AFNOR, SETRA, OGE (Ordre des Géomètres-Experts).
