# Géodésie de terrain — GNSS, cheminement, compensation et nivellement

**Source :** référentiels légaux français **RGF93 / Lambert 93** (EPSG:2154, décret 2000-1276 du 26 décembre 2000 rendant le RGF93 obligatoire) et **NGF-IGN69** (altimétrie) ; réseau **RGP** (Réseau GNSS Permanent, IGN) et réseaux temps réel commerciaux ; normes **ISO 17123** (procédures de vérification des instruments géodésiques) ; arrêté du 16 septembre 2003 (classes de précision des travaux topographiques pour les marchés publics) ; théorie de la **compensation par moindres carrés** ; pratique du géomètre-expert. Les ordres de grandeur de précision sont **indicatifs**, à confirmer par étalonnage et contrôle de chantier.

## Référentiels légaux (rappel)

- **Planimétrie** : **RGF93 Lambert 93** (projection conique conforme, EPSG:2154), référentiel **obligatoire** depuis le décret 2000-1276 ; coniques conformes **CC42 à CC50** pour réduire la déformation linéaire en zones précises.
- **Altimétrie** : **NGF-IGN69** (France métropolitaine continentale), NGF-IGN78 (Corse).
- Voir le corpus `plan_topographique_systemes_coordonnees.md` pour le détail des systèmes.

## GNSS — modes d'observation

| Mode | Principe | Précision indicative | Usage |
|---|---|---|---|
| **Statique** | Observation longue (≥ 20-60 min) sur point fixe, post-traitement par rapport au RGP | **mm à cm** | Canevas de précision, points d'appui |
| **RTK** (Real Time Kinematic) | Corrections **temps réel** depuis une base / réseau (NTRIP) | **1-3 cm** (plani), 2-5 cm (alti) | Levé et implantation courants |
| **PPK** (Post-Processed Kinematic) | Cinématique **post-traitée** (trajectoire calculée après coup) | **1-3 cm** | Drone, mobile mapping, zones sans liaison radio |
| **Statique rapide** | Observation courte (5-20 min) | **cm** | Densification de canevas |

### GDOP / PDOP et conditions d'observation

- **DOP** (Dilution Of Precision) : facteur de **dégradation géométrique** lié à la **répartition des satellites** dans le ciel. Plus le DOP est bas, meilleure est la géométrie.
  - **GDOP** (géométrique, position + temps), **PDOP** (position 3D), **HDOP** (horizontal), **VDOP** (vertical).
  - Règle pratique : viser **PDOP < 4-6** ; au-delà, fiabilité dégradée (à confirmer selon le récepteur).
- **Durée d'observation** : plus la ligne de base est longue ou le DOP élevé, plus l'observation doit être **longue** (statique).
- **Masques et multitrajet** : éviter obstacles (bâti, végétation, surfaces réfléchissantes) ; angle de coupure (élévation) typiquement **10-15°**.
- **Multi-constellations** (GPS, GLONASS, Galileo, BeiDou) : améliore la disponibilité et le DOP.

## Cheminement / polygonale et fermeture

Un **cheminement (polygonale)** est une suite de stations reliées par mesures d'**angles** (station totale) et de **distances**, partant et se rattachant à des points connus (canevas).

- **Cheminement encadré** : rattaché à deux points connus aux extrémités (fermeture contrôlable).
- **Cheminement fermé (boucle)** : revient au point de départ.
- **Cheminement ouvert (antenne)** : non rattaché à l'arrivée — **à éviter** (pas de contrôle de fermeture).

### Erreur de fermeture

- **Fermeture angulaire** : écart entre la somme des angles mesurés et la valeur théorique ; tolérance fonction du nombre de stations et de la précision de l'instrument.
- **Fermeture planimétrique (linéaire)** : écart entre la position calculée d'arrivée et la position connue ; exprimée en valeur absolue (cm) ou **relative** (ex. 1/10 000 = écart de 1 m pour 10 km cheminés).
- Si la fermeture est dans la **tolérance**, l'écart est **réparti (compensé)** sur les stations ; sinon, recherche de **faute** (erreur grossière) avant tout calcul.

## Compensation par moindres carrés

La **compensation** ajuste un réseau **surabondant** (plus d'observations que d'inconnues) pour obtenir la **meilleure estimation** des coordonnées et **détecter les fautes**.

- **Principe** : minimiser la somme des **carrés des résidus pondérés** (V·P·Vᵀ minimal), chaque observation étant **pondérée** par l'inverse de sa variance (1/σ²).
- **Modèle** : observations = f(inconnues) + résidus ; résolution du système normal (Aᵀ·P·A)·X = Aᵀ·P·L.
- **Résultats** : coordonnées ajustées, **résidus** par observation, **précision a posteriori** (ellipses d'erreur, écarts-types), facteur unitaire de variance.
- **Contrôle de fiabilité** : tests statistiques (data snooping / Baarda) pour repérer les **observations aberrantes** ; **redondance** locale pour la détectabilité des fautes.
- **Stationnement libre (free station)** : la station n'est pas sur un point connu ; ses coordonnées et son orientation sont **calculées par relèvement** sur plusieurs points connus visés (moindres carrés sur 3 points connus minimum, davantage recommandé pour le contrôle).

> La compensation **n'améliore pas** une mauvaise mesure : elle **répartit** des écarts faibles et **révèle** les fautes. Une fermeture hors tolérance impose de **rechercher l'erreur**, pas de la compenser.

## Nivellement

### Nivellement direct (géométrique)

- Mesure de **dénivelées** par visées horizontales sur **mire** (niveau optique ou numérique).
- **Cheminement de nivellement** aller-retour ou encadré sur **repères NGF-IGN69**.
- **Précision** : du **mm** (nivellement de précision) au **cm** (nivellement ordinaire).
- **Tolérance de fermeture** (indicative) : de l'ordre de **n mm × √(distance en km)** ; ex. nivellement ordinaire ≈ ± (4 à 10) mm·√km, nivellement de précision ≈ ± (1 à 2) mm·√km (**à adapter** au cahier des charges).

### Nivellement indirect (trigonométrique)

- Altitude déduite de la **distance inclinée** et de l'**angle vertical** (station totale), avec correction de **sphéricité-réfraction**.
- **Précision** moindre que le nivellement direct sur longues portées ; pratique pour terrain accidenté et points inaccessibles.

## Canevas et classes de précision

- **Canevas** : ossature de points d'appui de précision (rattachés RGF93 / NGF) sur laquelle s'appuient les levés de détail.
- **Stationnement** : sur point de canevas connu (orientation par visée de référence) ou **libre** (relèvement).
- **Classes de précision** (arrêté du 16 septembre 2003, marchés publics) : les travaux sont rangés en **classes** selon l'écart-type toléré (planimétrie / altimétrie) ; le géomètre **annonce** la classe atteinte et la **contrôle** par mesures surabondantes.

> Ne pas confondre les **classes de précision topographique** (qualité d'un levé, arrêté 2003) avec les **classes A/B/C de précision des réseaux** (DT-DICT, NF S 70-003 — voir `dt_dict_reseaux.md`).

## Récapitulatif — précision indicative par méthode

| Travail | Méthode privilégiée | Précision indicative |
|---|---|---|
| Point d'appui / canevas | GNSS statique + compensation | mm à cm |
| Levé de détail planimétrique | RTK / station totale | 1-3 cm |
| Implantation d'ouvrage | Station totale (canevas) | mm à cm |
| Altimétrie de précision | Nivellement direct | mm |
| MNT de masse / terrassement | RTK / drone | cm à dm |

## Citations à utiliser

- Décret 2000-1276 du 26 décembre 2000 (RGF93 / Lambert 93 obligatoires)
- RGF93 Lambert 93 (EPSG:2154), coniques conformes CC42-CC50 ; NGF-IGN69 (altimétrie) — IGN
- Réseau GNSS Permanent (RGP, IGN) ; protocole NTRIP (RTK temps réel)
- Arrêté du 16 septembre 2003 (classes de précision des travaux topographiques, marchés publics)
- Normes ISO 17123 (vérification des instruments géodésiques)
- Méthode des moindres carrés ; test de Baarda (data snooping)

**Référence à citer :** RGF93 Lambert 93 (décret 2000-1276) + NGF-IGN69 + RGP IGN + arrêté du 16 septembre 2003 (classes) + moindres carrés. Sources : geodesie.ign.fr + Legifrance. Ordres de grandeur de précision indicatifs, à confirmer par étalonnage et contrôle de chantier.
