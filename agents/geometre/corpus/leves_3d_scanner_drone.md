# Levés 3D — scanner laser, drone (réglementation DGAC) et photogrammétrie

**Source :** réglementation européenne UAS (règlements d'exécution UE 2019/947 et délégué UE 2019/945, applicables depuis le 31 décembre 2020) ; code des transports et code de l'aviation civile (art. L.6111-1 et s., D.136-1 et s.) ; arrêtés français « espace » et « conception » du 3 décembre 2020 (scénarios nationaux S1-S3, transition vers les STS européens) ; portail **AlphaTango** (DGAC/DSAC) ; norme ISO 17123 (vérification des instruments géodésiques) ; pratique du géomètre-expert en levé 3D et scan-to-BIM. Les coûts et délais indiqués sont **à revérifier à la date de consultation**.

## Scanner laser 3D — principe

Le **scanner laser terrestre (LiDAR statique / TLS)** mesure des **millions de points** par balayage angulaire (distance par temps de vol ou déphasage), produisant un **nuage de points** (point cloud) dense, géoréférençable.

- **Densité** : du million au milliard de points selon la résolution paramétrée.
- **Portée** : quelques mètres à plusieurs centaines de mètres selon l'appareil.
- **Produits dérivés** : nuage colorisé (photo intégrée), maillage (mesh), plans 2D, coupes, modèle BIM (scan-to-BIM).
- **Usages** : relevé de façades et d'intérieurs, patrimoine, ouvrages d'art, industrie (tuyauterie), récolement, métré.

### Cibles et points de calage (GCP)

- **Cibles** (sphères, damiers, cibles plates réfléchissantes) : repères artificiels servant au **recalage** (assemblage des stations) et au **géoréférencement**.
- **GCP** (Ground Control Points, points d'appui au sol) : points levés en coordonnées connues (par GNSS ou station totale, en **RGF93 Lambert 93 / NGF-IGN69**) permettant de **caler** le nuage dans le référentiel légal.
- Règle pratique : prévoir **un recouvrement** suffisant entre stations et un **réseau de cibles** réparti (au moins 3 cibles communes non alignées entre deux stations).

### Recalage et géoréférencement

| Étape | Contenu |
|---|---|
| **Recalage (registration)** | Assemblage des stations entre elles : par **cibles**, par **nuage à nuage** (cloud-to-cloud / ICP), ou par **visée commune**. |
| **Géoréférencement** | Calage du nuage assemblé dans le **référentiel légal** (RGF93 Lambert 93 + NGF-IGN69) via les **GCP** levés au GNSS / station totale. |
| **Consolidation** | Contrôle des **résidus** de recalage (écart-type des cibles) et de l'erreur de géoréférencement. |

> Sans **géoréférencement** sur GCP en RGF93 Lambert 93, un nuage de points n'est qu'un modèle **relatif** : il ne peut pas servir de base à un document foncier opposable. Le calage dans le référentiel légal est indispensable (voir `plan_topographique_systemes_coordonnees.md`).

## Drone (UAS) — réglementation DGAC

Depuis le **31 décembre 2020**, l'usage des drones est régi par la **réglementation européenne** (règlements UE 2019/947 et 2019/945), qui distingue **trois catégories** selon le risque.

### Les trois catégories

| Catégorie | Niveau de risque | Principe |
|---|---|---|
| **Ouverte (Open)** | Faible | Sans autorisation préalable ; sous conditions strictes (poids, distance, hauteur ≤ 120 m, hors zones interdites, vol à vue VLOS) ; sous-catégories **A1 / A2 / A3**. |
| **Spécifique (Specific)** | Modéré | **Autorisation d'exploitation** ou **déclaration** selon scénario standard (STS / scénarios nationaux S1-S3) ; analyse de risque **SORA** sinon. |
| **Certifiée (Certified)** | Élevé | Régime proche de l'aviation habitée (transport de personnes, etc.) — hors usage géomètre courant. |

### Scénarios standard (catégorie spécifique)

Les **scénarios nationaux français S1-S3** (arrêtés du 3 décembre 2020), en vigueur pendant la transition, basculent vers les **STS européens** (STS-01 / STS-02) :

| Scénario FR | Vol | Zone | Équivalent UE |
|---|---|---|---|
| **S1** | À vue (VLOS), hors zone peuplée, ≤ 200 m de distance | Rural / non peuplé | ≈ STS-01 (VLOS) |
| **S2** | Hors vue (BVLOS) possible, hors zone peuplée | Rural étendu | ≈ STS-02 (BVLOS) |
| **S3** | À vue, **en agglomération** / zone peuplée | Urbain | (analyse de risque renforcée) |

> La plupart des **levés photogrammétriques de géomètre** relèvent de la **catégorie spécifique** (S1 ou S3 selon la zone), avec **déclaration d'activité** auprès de la DSAC.

### Obligations de l'exploitant et du télépilote

- **Enregistrement de l'exploitant** sur le portail **AlphaTango** (DGAC) ; numéro d'exploitant UAS apposé sur l'aéronef.
- **Déclaration d'activité particulière** (catégorie spécifique, scénarios) et **manuel d'exploitation** (MAP) tenus à jour.
- **Compétence du télépilote** : **attestation de suivi de formation** (théorique en ligne + pratique selon scénario) ; en catégorie ouverte, examens **A1/A3** et **A2** en ligne.
- **Signalement électronique et lumineux** du drone (≥ 800 g) ; **assurance RC** spécifique.
- Respect des **zones interdites / restreintes** (zones DGAC, aérodromes, sites sensibles — cartographie **Géoportail « restrictions drone »**), hauteur **≤ 120 m/sol**, et **protection des données** (RGPD) lors de prises de vues (voir `deontologie_contrat_oge.md`).

## Photogrammétrie SfM (Structure-from-Motion)

La **photogrammétrie** reconstruit un modèle 3D à partir de **photos se recouvrant** (recouvrement ≈ 70-80 % longitudinal, 60-70 % latéral) :

1. **Plan de vol** (grille / double grille, hauteur, GSD visé).
2. **Prise de vues** + relevé des **GCP** au GNSS (RGF93 Lambert 93) — ou **PPK/RTK embarqué** géoréférençant directement les clichés.
3. **Aérotriangulation (bundle adjustment)** : calcul des positions et orientations des caméras.
4. **Nuage de points dense** → **maillage** → **MNS/MNT** → **orthophoto** géoréférencée.
5. **Contrôle qualité** sur **points de contrôle indépendants (CP)** non utilisés au calage.

- **GSD** (Ground Sampling Distance) : taille du pixel au sol ; conditionne la précision (ex. GSD 2 cm → précision planimétrique de quelques cm).
- **GCP vs PPK** : les GCP au sol restent recommandés pour la **précision foncière** ; le PPK/RTK seul peut suffire pour des MNT et métrés courants.

## Restitution et scan-to-BIM

- **Restitution 2D** : plans de façades, coupes, plans de masse, profils en travers, à partir du nuage ou de l'orthophoto.
- **Scan-to-BIM** : modélisation d'objets BIM (murs, dalles, poteaux, réseaux) à partir du nuage, selon un **niveau de détail (LOD)** convenu avec le maître d'ouvrage.
- **Livrables types** : nuage (E57, LAS/LAZ, RCP), maillage (OBJ, FBX), MNT/MNS (GeoTIFF, ASC), orthophoto (GeoTIFF + TFW), modèle BIM (IFC, RVT).

## Précision indicative des méthodes

> Valeurs **indicatives** à confirmer par étalonnage (ISO 17123) et par les **points de contrôle** du chantier.

| Méthode | Précision planimétrique indicative | Précision altimétrique indicative | Remarques |
|---|---|---|---|
| **Station totale** | mm à cm | mm à cm | Référence terrain, ponctuel |
| **GNSS RTK** | 1-3 cm | 2-5 cm | Selon GDOP et base (voir `geodesie_terrain_compensation.md`) |
| **Scanner laser TLS** (géoréférencé GCP) | qq mm à 2 cm | qq mm à 2 cm | Selon portée, cibles, recalage |
| **Photogrammétrie drone + GCP** | 1-5 cm (≈ 1-2 × GSD) | 2-8 cm | Selon GSD, recouvrement, GCP |
| **Photogrammétrie drone PPK seul** | 3-10 cm | 5-15 cm | Sans GCP sol |
| **LiDAR aéroporté (drone)** | 3-10 cm | 5-15 cm | Sous couvert végétal (sol nu) |

## Articulation avec le foncier (limites)

- Les levés 3D (scanner, drone) sont des outils de **mesure et de représentation** très productifs, mais ils **ne fixent pas la limite juridique** : seule la limite **bornée contradictoirement** est opposable (monopole du géomètre-expert, ordonnance du 21 mai 1945).
- Le nuage et l'orthophoto **alimentent** le plan topographique et le récolement, à condition d'être **géoréférencés** en RGF93 Lambert 93 (voir `outils_fonciers_sig_oge.md`, `recolement_plan_asbuilt.md`).
- Les **coûts** (location/achat de matériel, traitement) et **délais** de production varient fortement selon l'emprise et la densité demandée — **à revérifier à la date de consultation**.

## Citations à utiliser

- Règlement d'exécution (UE) 2019/947 et règlement délégué (UE) 2019/945 (UAS — catégories ouverte / spécifique / certifiée)
- Arrêtés français du 3 décembre 2020 « espace » et « conception » (scénarios nationaux S1-S3, transition STS)
- Code des transports / code de l'aviation civile (art. L.6111-1 et s., D.136-1 et s.) ; portail AlphaTango (DGAC/DSAC)
- Norme ISO 17123 (vérification des instruments géodésiques)
- RGF93 Lambert 93 (EPSG:2154) / NGF-IGN69 (référentiels légaux — IGN)
- Ordonnance du 21 mai 1945 (monopole géomètre-expert)

**Référence à citer :** règlements UE 2019/947 et 2019/945 + arrêtés du 3 décembre 2020 (S1-S3 / STS) + AlphaTango (DGAC) + RGF93 Lambert 93. Sources : EUR-Lex + ecologie.gouv.fr (drones) + geodesie.ign.fr. Coûts/délais à revérifier à la date de consultation.
