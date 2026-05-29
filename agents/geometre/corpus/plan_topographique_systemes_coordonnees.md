# Plans topographiques, systèmes de coordonnées et nivellement

**Source :** Décret 2006-272 du 3 mars 2006 (référentiel géographique national) ; circulaires IGN ; loi 46-942 du 7 mai 1946 (mission géomètre-expert).

## Systèmes géodésiques officiels

### Référentiel obligatoire — RGF93 (décret 2006-272)

Depuis le **3 mars 2006**, le **Réseau Géodésique Français 1993 (RGF93)** est le référentiel officiel pour les **plans réglementaires** en France métropolitaine.

- Ellipsoïde : **GRS80**
- Méridien d'origine : Greenwich
- Réalisation : compatible WGS84 (différence cm)

### Anciens systèmes (encore présents sur plans anciens)

| Système | Ellipsoïde | Statut |
|---|---|---|
| **NTF** (Nouvelle Triangulation Française) | Clarke 1880 IGN | Officiel jusqu'en 2006 |
| **ED50** (European Datum 1950) | Hayford 1909 | Système intermédiaire |
| **WGS84** | WGS84 | Standard GPS (≈ RGF93) |

### Conversion NTF → RGF93

- Translation moyenne : Δλ ≈ -2 à -5 m en France métropolitaine
- Les logiciels topo et SIG appliquent la transformation par **grille IGN officielle** (GR3DF97A)
- À noter sur le **plan** quand on convertit

## Projections cartographiques

### Lambert 93 (projection nationale)

- **Tangente** au parallèle 46° 30' N
- Couverture France métropolitaine entière
- Coordonnées **(X, Y)** en mètres
- Origine : Δx = 700 000 m, Δy = 6 600 000 m (pour éviter négatifs)

Exemple : Tour Eiffel ≈ **(648 237, 6 862 285)** en Lambert 93.

### Lambert CC9 zones (9 zones régionales)

- Couverture par bandes parallèles successives
- **CC42 à CC50** (de 42° N à 50° N)
- Distorsion locale **minimisée** par rapport au Lambert 93 unique
- Préconisé pour plans **locaux** (cadastre, topo de précision)

### Lambert IV — Corse

- Projection spécifique pour la Corse
- Différente de Lambert 93 (qui s'arrête au sud de la métropole)

### UTM (Universal Transverse Mercator)

- Système international par fuseaux de 6° de longitude
- France métropolitaine : **UTM 30 N**, **31 N**, **32 N**
- Coordonnées **(X, Y)** en mètres
- Fréquemment utilisé pour fichiers GPS bruts (avant conversion)

## Nivellement — Référentiel altimétrique

### IGN69 (référence officielle métropolitaine)

- Réseau **NGF-IGN69** (Nivellement Général de la France, ajustement 1969)
- Origine : **marégraphe de Marseille**
- Couverture : France métropolitaine + Corse (IGN78)

### Anciens systèmes

| Système | Origine | Statut |
|---|---|---|
| **NGF-Bourdaloue (Lallemand)** | Marégraphe Marseille (1855) | Désuet |
| **NGF-IGN69** | Marégraphe Marseille (1969) | Actuel métropolitain |
| **IGN78** | Corse | Actuel Corse |

### Conversion historique

- Décalages mesurés ponctuellement par les services topo
- IGN69 - Bourdaloue : ~ +0,50 à +1,20 m selon zone

### Hauteur orthométrique vs. hauteur ellipsoïdale

- **Hauteur orthométrique (H)** : référée au **géoïde** (niveau moyen des mers)
- **Hauteur ellipsoïdale (h)** : référée à l'**ellipsoïde** (modèle mathématique)
- **N = h - H** = ondulation du géoïde
- En France : N ≈ 44 à 53 m (croît du sud-ouest au nord-est)

Les **récepteurs GPS** mesurent h (ellipsoïde) ; le **modèle de géoïde RAF20** est appliqué pour obtenir H (NGF).

## Précision des plans topographiques

### Classes de tolérance (NF S 70-003 — guide pour la précision des plans)

| Classe | Application | Tolérance plani | Tolérance alti |
|---|---|---|---|
| **A** | Plans de précision (cadastre, projet de précision) | ± 10 mm | ± 10 mm |
| **B** | Plans de projet (PA, PC) | ± 30 mm | ± 30 mm |
| **C** | Plans de réseaux, état initial | ± 100 mm | ± 100 mm |
| **D** | Plans d'esquisse, plans masse | ± 250 mm | ± 250 mm |

### Mention sur le plan

Tout plan topo doit indiquer :
- **Système géodésique** (RGF93, NTF…) — XYZ
- **Projection** (Lambert 93, Lambert CC4x, UTM…) — XY
- **Référentiel altimétrique** (NGF-IGN69, IGN78…) — Z
- **Date du levé**
- **Mode de levé** (tachéo, GPS, drone, scanner)
- **Précision attendue** (classe A/B/C/D)
- **Échelle**, **orientation Nord**
- **Nom et signature** du géomètre-expert

## Plans cadastraux

### Présentation

Plans tenus par la **Direction Générale des Finances Publiques** (DGFiP), accessibles sur **cadastre.gouv.fr** (consultation gratuite, extraction PDF).

### Différents types

| Plan | Contenu |
|---|---|
| **Plan minute** | Plan d'origine (1808 et après) — précision historique |
| **Plan rénové** | Mis à jour par mensuration récente (variable selon commune) |
| **Plan napoléonien** | Plan d'origine napoléonien (jusqu'au début XXᵉ siècle) |
| **Plan informatisé** | Plan cadastral numérisé (PCI) accessible en ligne |
| **PCI vecteur** | Données SIG du cadastre (DGFiP — abonnement, accès géomètre-expert) |

### Précision limite du cadastre

Le plan cadastral **n'est pas un document juridique** au sens du bornage. Il est **indicatif** pour la délimitation foncière (jurisprudence constante). Le bornage contradictoire (loi 1946) seul est juridique.

→ La **superficie cadastrale** d'une parcelle peut différer de la **superficie réelle** mesurée par le géomètre-expert.

## Réseaux géodésiques opérationnels

### Réseau de bornes IGN

- Triangulation du **1ᵉʳ ordre** : ~ 5 000 sites en France métropolitaine
- Bornes en pierre + plaques de céramique
- Coordonnées RGF93 + altitude NGF-IGN69 publiées sur **geodesie.ign.fr**

### Réseau de nivellement IGN

- ~ 350 000 bornes de nivellement (« repères de nivellement »)
- Triangulation altimétrique très dense (1ᵉʳ, 2ᵉ, 3ᵉ ordres)
- Bornes scellées (souvent murs de bâtiments anciens, ponts)

### Réseaux GNSS permanents (PPP / RTK)

- **RGP** (Réseau GNSS Permanent — IGN) : station de référence ouverte, données téléchargeables
- **Teria, Orpheon, SAT-INFO** : services commerciaux RTK temps réel (NRTK)
- Précision RTK : ± 1 à 3 cm en plani, ± 2 à 5 cm en alti

## Bonnes pratiques de plan topographique professionnel

### Cartouche obligatoire

Doit comporter :
- Identification du géomètre-expert (nom + n° d'inscription OGE)
- Date du levé + visa
- Système géodésique + projection + référentiel altimétrique
- Échelle (numérique + barre graphique)
- Norme et précision
- Émetteur de la demande (MOA) + objet du plan
- Numéro de dossier interne

### Symbologie standardisée

- **Charte graphique OGE** ou normes internes du cabinet
- Symboles harmonisés pour mobilier urbain, végétation, ouvrages, réseaux
- Levé en couches **DWG** (AutoCAD) ou **DXF** + **SHP** (SIG) — facilitant l'export multiformat

### Géoréférencement obligatoire

- **Tous les plans réglementaires** (PA, PC, DP) doivent être en RGF93 Lambert 93
- **Plans de bornage** : RGF93 + référence cadastrale + bornes IGN proches

## Cas particulier — relevé d'urbanisme local (« plan masse »)

Plan masse pour PC d'une maison individuelle :
- Échelle 1/200 ou 1/500
- Doit comporter :
  - Limites de la parcelle (cotées)
  - Implantation projetée (cotée par rapport aux limites)
  - Distances entre projet et constructions voisines / limites de propriété
  - Cotes altimétriques (TN + TPF)
  - Accès, stationnements
  - Réseaux raccordés
  - Végétation (arbres existants/projetés)
- Géoréférencement : RGF93 obligatoire

## Documents annexes au plan topo professionnel

1. **Note de précision** (méthode, contrôles, écarts)
2. **Carnet de levé** (points levés, codes, attributs)
3. **Fichiers numériques** : DWG, DXF, SHP, PDF, KML
4. **Photographies** géolocalisées des points singuliers
5. **Rapport de bornage** (si associé)

## Citations à utiliser

- Décret 2006-272 du 3 mars 2006 (RGF93)
- Loi 46-942 du 7 mai 1946 (mission géomètre-expert)
- Norme NF S 70-003 (précision des plans topo)
- Décret 1939 (NGF Lallemand puis IGN69)
- Circulaires IGN sur la projection Lambert 93 et CC zones

**Référence à citer :** Décret RGF93, IGN, OGE. Sources : Legifrance + ign.fr + geodesie.ign.fr + geometre-expert.fr.
