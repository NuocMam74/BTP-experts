# BIM et extraction de quantités depuis la maquette (QTO)

**Source :** Référentiels BIM français — convention de niveaux de développement (NF EN ISO 19650-1 et -2 ; norme NF EN 17412-1 sur le besoin d'information / Level of Information Need) ; cahier des charges BIM / charte BIM et convention BIM de projet (CCO/CCT BIM) ; format d'échange ouvert **IFC** (ISO 16739) ; pratiques d'économistes BIM (UNTEC, Mediaconstruct/buildingSMART France). Tout ratio de fiabilité = **ordre de grandeur, à actualiser à la date de consultation** et à la maturité BIM réelle du projet.

> Principe : la maquette numérique permet **d'extraire** des quantités (QTO — Quantity Take-Off), elle ne **remplace pas le métreur**. La fiabilité du métré BIM dépend strictement du **niveau de développement géométrique et informationnel** des objets, et des **conventions de modélisation** négociées en amont. Une quantité extraite d'une maquette non auditée n'a **aucune valeur contractuelle** par défaut.

---

## 1. Vocabulaire des niveaux de détail / développement

Plusieurs cadres coexistent ; l'économiste doit savoir lequel s'applique au projet (à fixer dans la **convention BIM**).

| Notion | Définition | Portée |
|---|---|---|
| **LOD** (Level of Detail / Development, origine US-AIA) | Niveau de développement d'un objet, combinant géométrie et information. Échelle **LOD 100 → 500**. | Le plus répandu en langage courant |
| **LOG** (Level of Geometry) | Précision **géométrique** de l'objet (forme, dimensions, position). | Composante de la quantité |
| **LOI** (Level of Information) | Richesse **informationnelle / sémantique** (propriétés, matériau, performance). | Composante du chiffrage qualitatif |
| **ND / NDI** (Niveau de Détail / d'Information, usage FR) | Transposition francophone LOD/LOI. | Convention BIM FR |
| **LOIN** (Level of Information Need, NF EN 17412-1) | Approche par **besoin** : on ne modélise QUE ce qui sert l'usage visé (juste suffisant). | Cadre normatif récent |

### Échelle LOD et exploitabilité pour le métré

| LOD | Contenu géométrique | Exploitation économiste | Précision de chiffrage associée |
|---|---|---|---|
| **LOD 100** | Symbole / volume générique (masse), pas d'objet réel | Ratios €/m² SDP, grandes masses | Faisabilité / ESQ (± 25-30 %) |
| **LOD 200** | Objet générique approximatif (dimensions, position indicatives) | Compte sommaire décomposé par lot | APS (± 15-20 %) |
| **LOD 300** | Objet précis (géométrie, dimensions, raccordements exacts) | **Métré exploitable** par lot, DQE | APD/PRO (± 10-15 % → ± 5 %) |
| **LOD 350** | LOD 300 + interfaces entre systèmes (réservations, jonctions) | Métré + détection de clashs, sujétions d'interface | PRO/DCE |
| **LOD 400** | Objet de fabrication / pose (détail exécution) | Métré d'exécution, préfabrication | EXE / fabricant |
| **LOD 500** | Objet **tel que construit** (DOE / as-built) | Métré exploitation, GEM, LCC, DOE numérique | Exploitation / patrimoine |

> Règle d'or : **on ne chiffre fermement qu'à partir du LOD 300**. En dessous, l'extraction donne des **ordres de grandeur** qu'il faut requalifier au ratio. Au-dessus du LOD 350, attention : un objet « bien dessiné » peut rester **mal renseigné** (LOI faible) → la quantité géométrique est juste mais le **type/prix** n'est pas qualifiable.

---

## 2. Le métré BIM : ce que la maquette donne « tout seul »

L'extraction automatique fiable concerne surtout les **quantités géométriques de volumes et surfaces** d'objets bien modélisés :

| Catégorie d'objet | Quantité extraite nativement | Fiabilité (si LOD ≥ 300) |
|---|---|---|
| Murs / voiles | Surface, volume, longueur, épaisseur | Élevée |
| Dalles / planchers | Surface, volume, épaisseur | Élevée |
| Poteaux / poutres | Volume, longueur, section | Élevée |
| Menuiseries (portes/fenêtres) | Comptage U par type, dimensions tableau | Élevée (comptage) |
| Revêtements de sol / plafonds | Surface par pièce (si pièces définies) | Moyenne à élevée |
| Espaces / pièces (IfcSpace) | Surface utile, volume, périmètre | Élevée si zonage propre |

> L'IFC porte des **propriétés de quantité normalisées** appelées **Base Quantities** (ensembles `Qto_WallBaseQuantities`, `Qto_SlabBaseQuantities`, etc.) : `NetVolume`, `GrossVolume`, `NetArea`, `GrossArea`, `Length`, `Width`, `Height`. L'économiste doit savoir **lequel** il extrait — `Net` (déduction faite des ouvertures/intersections) ou `Gross` (brut) — car l'écart peut être significatif (cf. déduction des baies, intersections mur/dalle comptées une ou deux fois).

---

## 3. Ce qui se métré ENCORE manuellement (limites du QTO)

La maquette ne dispense pas du métreur pour :

- **Coffrage** : la plupart des modeleurs ne sortent pas la **surface coffrante développée** (2 faces de voile, sous-faces, rives). C'est une quantité de **moyen** à reconstituer (cf. `metre_detaille_par_lot.md`).
- **Aciers / ferraillage** : sauf maquette structure LOD 400 avec armatures modélisées, le **tonnage** se calcule par ratio kg/m³ ou note de structure — pas extrait nativement.
- **Terrassements** : cubature déblai/remblai (profils, fruit de talus, foisonnement) reste un calcul topographique, rarement fiable dans la maquette bâtiment.
- **Sujétions et petits ouvrages** : calfeutrements, joints, scellements, raccords, finitions de tableaux, habillages — souvent **non modélisés** ou modélisés sans LOI suffisant.
- **Recouvrements / pertes / développés** : tuiles (pureau), zinguerie (développé de bande), enrobements — relèvent du **déboursé matière**, pas de la géométrie de l'objet.
- **Objets modélisés en « générique »** (familles non typées, masses, proxys IFC `IfcBuildingElementProxy`) : géométrie sans sémantique → **non chiffrables** sans requalification manuelle.
- **Réseaux MEP partiels** : si le BE fluides n'a pas modélisé au bon LOD, les ml de réseaux et le comptage de terminaux restent à compléter.
- **Lots non modélisés** : VRD, espaces verts, équipements, signalétique, mobilier sont fréquemment **hors maquette**.

> Conséquence économique : un **chiffrage 100 % BIM n'existe pas**. La part fiabilisée par la maquette en bâtiment courant est de l'ordre de **40 à 70 %** du coût travaux (gros œuvre, clos-couvert, menuiseries, cloisons), le reste étant complété au métré manuel / ratio (**ordre de grandeur, à actualiser** selon maturité BIM et lots modélisés).

---

## 4. Structuration des propriétés de quantité (QTO) et conventions

### Convention BIM / charte BIM

La **convention BIM** (déclinaison projet du cahier des charges BIM du MOA) fixe contractuellement :

- Les **usages BIM** retenus (dont « extraction de quantités / estimation »).
- Le **niveau de développement attendu par objet et par phase** (matrice LOD/LOI ou tableau de besoin d'information NF EN 17412-1).
- Les **conventions de modélisation** : règles de découpe des objets (un mur par niveau ? mur traversant ?), gestion des **intersections** (qui « gagne » à la jonction mur/dalle pour éviter le double comptage), **système de classification**.
- La **structuration des propriétés** : property sets attendus, unités, valeurs autorisées.
- Le **format et la fréquence des livraisons** (IFC, fréquence, responsabilité du modeleur).

### Systèmes de classification (rattachement quantité ↔ poste de prix)

Pour qu'une quantité serve au chiffrage, chaque objet doit porter un **code de classification** permettant de le rattacher à un lot / poste DPGF :

- **Uniformat / Omniclass** (origine US) ;
- **Uniclass 2015** (UK) ;
- en France, rattachement fréquent à une **nomenclature de lots** (CCTP/DPGF) ou à des classifications type **ISO 12006-2**.

> Sans classification, la maquette donne des **m³ de béton** mais pas le **poste DPGF** correspondant. Le mapping « propriété maquette → ligne de bordereau » est le cœur du travail de l'économiste BIM.

---

## 5. Rôle de l'économiste BIM

- **Rédige / co-rédige** le volet « estimation » de la convention BIM : exige le **LOD/LOI** dont il a besoin **par phase** (sinon la maquette est inexploitable pour chiffrer).
- **Audite la maquette** avant extraction : objets génériques, doublons, intersections, propriétés manquantes, unités. Une maquette non auditée = quantités non fiables.
- **Extrait et requalifie** les quantités (QTO), comble les manques au métré manuel (coffrage, aciers, sujétions), **trace** ce qui vient de la maquette vs ce qui est ajouté.
- **Mappe** les quantités sur la **DPGF / bibliothèque de prix** (sous-détails, Batiprix édition N) → DQE.
- **Met à jour** l'estimation à chaque livraison de maquette (du LOD 200 APS au LOD 300 PRO), en suivant la **dérive d'enveloppe** (cf. `estimation_phases_moe_cout_objectif.md`).
- **Exploite la détection de clashs / interfaces** (LOD 350) pour anticiper les sujétions d'interface et fiabiliser les provisions.

---

## 6. Limites, garde-fous et fiabilité du métré BIM

- Une quantité extraite **n'engage pas** tant qu'elle n'est pas **auditée** et **requalifiée** : « garbage in, garbage out ».
- **Net vs Gross** : toujours vérifier quelle Base Quantity est extraite (déductions d'ouvertures, intersections) — source classique d'écart de 5 à 15 %.
- **Double comptage** aux jonctions (mur/dalle, dalle/poutre) selon les règles de priorité de modélisation : à cadrer en convention BIM.
- **Objets non typés / proxys** : à isoler et requalifier manuellement, ne jamais chiffrer en l'état.
- La **maquette ne fait pas foi contractuellement** sauf clause expresse ; les pièces écrites (CCTP, DPGF) **priment** en cas de contradiction maquette/écrit (à préciser au marché et à la convention BIM).
- Le **niveau de fiabilité** doit être affiché comme pour tout chiffrage : la précision reste celle de la **phase** (LOD 200 ≈ APS ± 15-20 %, LOD 300 ≈ APD/PRO ± 5-15 %), pas « plus précise parce que c'est du BIM ».

**Référence à citer :** NF EN ISO 19650-1/-2 (organisation de l'information BIM), NF EN 17412-1 (Level of Information Need), ISO 16739 (IFC), convention/charte BIM du projet, property sets `Qto_*` (Base Quantities IFC). Source : buildingSMART France / Mediaconstruct + UNTEC. Tout taux de fiabilité = ordre de grandeur à actualiser selon la maturité BIM du projet.
