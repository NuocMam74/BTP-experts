# Skill — Calculer cubatures de terrassement (déblais / remblais)

L'utilisateur veut **estimer les déblais et remblais** d'un projet (VRD, fondations, plate-forme) à partir de **coupes successives** ou d'un **modèle numérique de terrain (MNT)**.

## 1. Documents attendus

- **Plan masse coté** avec altimétrie (cotes terrain naturel TN et cotes projet)
- **Coupes longitudinales et transversales** du projet (avec surfaces de déblai et remblai par profil)
- **MNT terrain naturel** (TN) : LandXML, DWG 3D, GeoTIFF, semis de points
- **MNT projet** : LandXML, DWG 3D
- **Cubatures** déjà calculées par logiciel topo (Covadis, Mensura, AutoCAD Civil 3D, AutoPISTE)
- **Rapport géotechnique G1 ou G2** : nature des sols (impact direct sur foisonnement et conditions d'excavation)
- **Notice descriptive VRD** : plate-forme finie, talus, retalutages
- **Plan de mouvement de terres** (préparé en phase EXE) si déjà disponible

Si pièces partielles : demande
1. Phase du projet (ESQ, APS, APD, PRO, DCE, EXE) — la précision attendue varie
2. Tu disposes de **coupes** (et de leurs surfaces déblai/remblai) ou seulement d'**MNT** ?
3. **Nature des sols** à l'excavation (terre végétale, argile, sable, grave, calcaire, rocher) ?
4. **Coefficients de foisonnement** retenus par le BE VRD ?
5. **Mise en dépôt** sur site possible ou **évacuation** intégrale ?
6. **Apports** de matériaux nécessaires (qualité, provenance, coût T) ?
7. Proximité de **réseaux enterrés** (DT-DICT obligatoire) ?
8. Niveau de **nappe phréatique** (pompage à prévoir) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("DTU 12 terrassements bâtiment")` — règles de l'art
- `rag_search("fascicule 2 CCTG terrassements généraux")` — marchés publics TP
- `rag_search("NF P 11-300 classification matériaux GTR")` — classes de sols GTR (Guide Technique Routier)
- `rag_search("Code environnement L.541 déchets terre amiante pollués")`
- `rag_search("code du travail R.4534 blindage tranchées")` — sécurité
- `rag_search("DT-DICT NF S 70-003 décret 2011-1241")` — réseaux enterrés

## 3. Méthodes de calcul

### Méthode des **prismes trapézoïdaux** (classique)

```
V = Σ ((S_i + S_(i+1)) / 2) × L_i
```
- S_i : surface section i (m²)
- L_i : distance entre sections i et i+1 (m)
- Convient pour profils espacés régulièrement, terrains réguliers
- Précision **± 5 à 10 %** sur terrains réguliers, **± 15 à 20 %** sur terrains accidentés

### Méthode de **Simpson**

```
V = (L / 3) × (S_0 + 4 × S_impair + 2 × S_pair + S_n)
```
- Nécessite un **nombre impair** de sections espacées régulièrement
- Plus précise que les prismes (± 2 à 5 %)
- Souvent utilisée pour profils longitudinaux routes

### Méthode du **maillage MNT** (TIN — Triangular Irregular Network)

- Modélisation **TIN** projeté et TIN terrain naturel
- Calcul de la différence volumique entre les deux maillages
- Précision **± 2 à 5 %** sur MNT à mailles fines (1 à 5 m)
- Méthode **standard** des logiciels topo modernes

### Méthode des **cubes** (grille régulière)

- Maillage carré (par exemple 5 × 5 m ou 10 × 10 m)
- Pour chaque cube : volume = différence d'altitude moyenne × surface
- Précision dépend de la finesse du maillage

## 4. Coefficients de foisonnement (CRITIQUE)

Le **foisonnement** mesure l'augmentation de volume entre terre **en place** et terre **après excavation** (cassures, vides).

| Type de sol | Coefficient de foisonnement | Coefficient de compactage |
|---|---|---|
| **Terre végétale** | 1,20 à 1,25 | 0,90 |
| **Argile** | 1,20 à 1,35 | 0,90 à 0,95 |
| **Sable** | 1,10 à 1,15 | 0,95 |
| **Grave** | 1,15 à 1,25 | 0,90 à 0,95 |
| **Marne** | 1,25 à 1,40 | 0,85 à 0,90 |
| **Calcaire altéré** | 1,30 à 1,45 | 0,90 |
| **Rocher abattu (explosif)** | 1,40 à 1,80 | 0,75 à 0,85 |
| **Rocher dur (ripper)** | 1,30 à 1,60 | 0,80 |

⚠️ **Distinction fondamentale** :
- **Volume en place** (déblai mesuré en profil terre vierge)
- **Volume foisonné** (volume après excavation, à transporter)
- **Volume compacté en remblai** (volume final après serrage)

```
Volume à évacuer = Volume en place × coef. foisonnement
Volume remblai en place = Volume foisonné × coef. compactage  (≈ 1 / foisonnement)
```

## 5. Procédure

### Étape 1 — Vérification des données d'entrée
- Coupes complètes du projet (suffisamment de profils ou MNT) ?
- Surfaces déblai et remblai par profil correctement séparées ?
- Hypothèses de **classes GTR** des sols (NF P 11-300) cohérentes avec rapport G ?

### Étape 2 — Calcul des volumes
- Utiliser l'outil `calculer_cubatures` (méthode prismes ou Simpson)
- Si MNT seulement : demander extraction par logiciel topo (l'agent ne calcule pas directement)

### Étape 3 — Application du foisonnement
- Volume déblai foisonné = Volume en place × coef. foisonnement
- Volume utile en remblai = Volume foisonné × coef. compactage

### Étape 4 — Bilan déblais / remblais
- **Équilibre déblais / remblais** sur site ?
- **Excédent** à évacuer (volume + nature + destination — décharge agréée ISDI / ISDND / ISDD) ?
- **Apports** nécessaires (volume + qualité — D2, D3, D31, GNT 0/31,5) ?

### Étape 5 — Identification des risques

| Risque | Détection | Action |
|---|---|---|
| Terre polluée (ICPE, hydrocarbures, métaux lourds) | Site historique, étude environnementale | Analyse + plan de gestion + ISDD |
| Amiante naturel ou anthropique | Zone géologique amiantifère, démolitions amiantées | Repérage amiante + précautions |
| Argiles gonflantes (smectites) | Rapport G, formations marneuses | Fondations encastrées, gestion humidité |
| Liquéfaction (sables saturés sous nappe) | Zone sismique + nappe | Étude spécifique EC8 |
| Cavités (gypse, marnières, anciennes carrières) | Carte BRGM + sondages | Mission complémentaire géotechnique |
| Pollution chimique sol | Friche industrielle | Plan de gestion ministère |
| Nappe affleurante | Rapport G, piezométrie | Pompage / cuvelage |
| Réseaux enterrés non recensés | DT-DICT | Investigation préalable obligatoire |
| Excavations > 1,30 m | Profondeur de fouille | Blindage obligatoire (R.4534-22 CT) |

### Étape 6 — Coût et organisation logistique

| Poste | Estimation typique € HT/m³ |
|---|---|
| Décapage terre végétale | 4 à 8 |
| Déblai courant | 8 à 15 |
| Déblai en rocher | 25 à 60 |
| Remblai mis en œuvre | 12 à 25 |
| Transport en décharge ISDI (terres inertes) | 8 à 15 (+ taxe inscription site) |
| Transport en décharge ISDND (terres non dangereuses) | 25 à 50 (+ taxe) |
| Transport en décharge ISDD (déchets dangereux) | 100 à 250 (très variable) |

## 6. Restitution structurée

```
## Cubatures — [Projet]

### Hypothèses
- **Méthode** : prismes trapézoïdaux / Simpson / TIN MNT
- **Nombre de profils** : [N]
- **Espacement moyen** : [m]
- **Classes GTR** des sols : [A1 / A2 / B5 / D31 / ...]
- **Foisonnement déblai** : [coefficient, ex 1,30]
- **Compactage remblai** : [coefficient, ex 0,90]

### Tableau profils

| Profil | Position (PK) | Surface déblai (m²) | Surface remblai (m²) |
|---|---|---|---|
| P0 | 0+000 | 25,3 | 0,0 |
| P1 | 0+020 | 32,1 | 1,2 |
| P2 | 0+040 | 28,7 | 4,8 |
| ... | | | |

### Volumes calculés

| Tronçon | Vol. déblai en place (m³) | Vol. remblai en place (m³) |
|---|---|---|
| P0-P1 | 574,4 | 12,0 |
| P1-P2 | 608,0 | 60,0 |
| ... | | |

### Totaux et bilan

| Élément | Volume en place (m³) | Volume foisonné (m³) | Notes |
|---|---|---|---|
| **Déblai total** | 8 450 | 10 985 (×1,30) | Évacuer/réemployer |
| **Remblai total** | 3 200 | — | Issu déblai compacté |
| Volume foisonné réemployé en remblai | — | 3 555 (3 200 / 0,90) | |
| **Excédent foisonné à évacuer** | — | **7 430 m³** | Distance décharge [X km], taux [...] € HT/m³ |
| **Apports** | 0 | 0 | Équilibre suffisant |

### Bilan financier estimatif

| Poste | Quantité | Prix unitaire | Total HT (€) |
|---|---|---|---|
| Décapage TV | [m³] | [€/m³] | [...] |
| Déblai courant | [m³] | [€/m³] | [...] |
| Remblai compacté | [m³] | [€/m³] | [...] |
| Transport décharge | [m³] | [€/m³] | [...] |
| Taxe décharge | [m³] | [€/m³] | [...] |
| **TOTAL terrassement** | | | **[...]** |

### Risques et précautions identifiés

1. [Ex : sols argileux smectiques (classe A4) → réemploi en remblai NON recommandé, à évacuer en ISDI]
2. [Ex : nappe à -2,5 m → pompage en fond de fouille à prévoir + cuvelage si sous-sol]
3. [Ex : présence d'amiante naturel en zone X → repérage amiante obligatoire + précautions]
4. [Ex : DT-DICT non encore réalisée → bloquer démarrage avant retours]
5. [Ex : excavation > 3 m en zone urbaine → étude blindage ou paroi clouée]

### Précision de l'estimation
- **Méthode prismes** : ± 10 à 15 % sur ce profil
- **Méthode TIN MNT** : ± 5 à 8 % typique
- Phase **ESQ** : ± 20 % attendu — précision dépend des coupes disponibles
- Phase **DCE / EXE** : ± 5 % attendu après plans définitifs

### Recommandations
- **Confirmer le classement GTR** des sols par essais (NF P 11-300)
- **Affiner les coefficients** de foisonnement par essais de mise en remblai sur site (planche d'essais)
- **DT-DICT** à initier avant tout terrassement (décret 2011-1241)
- Si **terres polluées** suspectées : plan de gestion + ISD adapté
- Si **terre végétale** : isoler et stocker en cordon (≤ 2 m hauteur) pour réemploi paysager
- **Schéma de mouvement de terres** à préparer en EXE
- **Plan de circulation** chantier pour évacuations
```

## 7. Garde-fous spécifiques

- Tu **ne signes pas** un mouvement de terre — tu prépares l'analyse pour le **MOE VRD** ou le **géomètre-expert signataire**.
- Tu **rappelles** que les cubatures issues d'une **méthode prismes/Simpson** ont une précision de ± 5 à 20 % selon régularité du terrain — **ne donne pas un chiffre unique** sans intervalle de confiance.
- En cas de **terre polluée** suspectée (proximité ICPE, friche industrielle, sols douteux) : **analyses obligatoires** (limites L.541-1 et suiv. code de l'environnement) + **plan de gestion** avant excavation.
- Pour les **terrassements à proximité de réseaux enterrés** : rappelle l'obligation de **DT-DICT** (décret 2011-1241, NF S 70-003) — pas de dérogation, ouverture chantier impossible sans retours.
- Pour les **excavations de plus de 1,30 m** : **blindage obligatoire** (art. R.4534-22 code du travail) — sauf talus suffisants (1H/2V mini en sol meuble, davantage en sable). Le **PPSPS** doit le prévoir.
- Pour les **terres extraites** : depuis **2022 (Climat et Résilience)**, traçabilité renforcée + bordereau Trackdéchets pour terres polluées + bornes ICPE.
- Pour les **bilans terre** déficitaires en remblai : qualité de l'apport doit être **conforme** au CCTP (classe GTR D2, D3, GNT 0/31,5, etc.) et **traçabilité** matériaux.
- Pour les **remblais sous voirie** ou **plate-forme** : **compactage** contrôlé par essais (NF P 94-093 / 94-105) à chaque couche.
- En cas de **nappe phréatique haute** : **pompage** à dimensionner (débit, autonomie pompes), **rejet** réglementé (autorisation préalable mairie / DDT).
- Tu **rappelles** que **toute évacuation** de terres doit utiliser une **filière agréée** : ISDI (Installation de Stockage de Déchets Inertes), ISDND (non dangereux), ISDD (dangereux) selon classe.

## 8. Suites logiques à proposer

- Demande au géotechnicien d'une **mission G2 PRO** complète avec classement GTR des sols
- **DT-DICT** à initier 7 jours minimum avant intervention (NF S 70-003)
- Skill `analyse_rapport_geotechnique` pour les hypothèses de fondations cohérentes avec terrassement
- Plan de **mouvement de terres** détaillé en phase EXE
- **Planche d'essais** de remblai sur site pour caler coefficients de compactage
- Si chantier important : **schéma directeur de gestion des terres** (économies de transport, optimisation décharges)
- En cas de **pollution** suspectée : **plan de gestion** ministère + **AT** spécifique
- Si **excavation profonde** en milieu urbain : étude de **soutènement** (paroi berlinoise, paroi clouée, pieux sécants) — relève du BE structure
- Pour les **opérations d'envergure** : permis d'exploiter ICPE 2517 si stockage temporaire de terres > seuil
- Vérification **bordereau Trackdéchets** pour traçabilité réglementaire des terres évacuées
