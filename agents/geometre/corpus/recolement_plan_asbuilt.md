# Récolement de chantier et plan as-built

**Source :** CCAG-Travaux 2021 art. 40 (DOE) ; Code de l'environnement L.554-1 et s. (anti-endommagement) ; décret 2011-1241 (DT-DICT) ; norme NF S 70-003 (précision plans topo) ; pratiques professionnelles géomètre-expert.

## Définition et objet

### Plan de récolement (« as-built »)

Plan topographique réalisé **à la fin du chantier**, représentant l'ouvrage **réellement construit** (vs. plans de PC ou EXE).

### Objectifs

1. **Vérification de conformité** au permis de construire
2. **Documentation** des modifications en cours de chantier
3. **Référence** pour les futures interventions (entretien, modification)
4. **Données réseaux** pour DT-DICT futures
5. **Mise à jour cadastrale** (DMPC) si modifications

## Types de plans de récolement

### A. Plan masse de récolement

- **Implantation** finale du bâtiment vs PC
- **Cotes** par rapport aux limites de propriété
- **Distances** entre bâtiment et obstacles
- **Géoréférencement** RGF93

### B. Plans d'étages de récolement

- **Plans intérieurs** indicés « PEX » (Plans d'EXécution)
- **Modifications** vs APD/PRO (ouverture déplacée, mur ajouté, etc.)
- **Réservations** : trémies, gaines techniques

### C. Coupes et élévations

- **Hauteurs** réelles
- **Niveaux** finis (TN, TPF, RDC, étages, faîtage)

### D. Plans réseaux enterrés

- **Eaux usées (EU)**
- **Eaux pluviales (EP)**
- **Eau potable**
- **Gaz**
- **Électricité** (courants forts et faibles)
- **Télécommunication / fibre**
- **Chauffage urbain** (le cas échéant)

### E. Plans réseaux apparents

- **Câbles** aériens
- **Conduits** apparents extérieurs (climatiseurs, gouttières)

## Méthode de levé

### Phase 1 : Préparation

- **Récupération** des plans EXE finaux + indices
- **Plans d'avancement** transmis par l'entreprise
- **Photos** de chantier à différentes phases (avant remblaiement)

### Phase 2 : Levé topographique

#### Géoréférencement

- **Système** : RGF93 Lambert 93 (obligatoire pour réglementation)
- **Altimétrie** : NGF-IGN69
- **Bornes IGN** ou stations RGP utilisées comme références

#### Modes de levé

| Mode | Précision | Application |
|---|---|---|
| **Tachéomètre** | ± 5-10 mm | Points précis (angles, repères) |
| **GPS RTK** | ± 10-30 mm plani / 20-40 mm alti | Levés étendus |
| **Drone photogrammétrique** | ± 30-100 mm | Toitures, façades, grandes surfaces |
| **Drone LiDAR** | ± 20-50 mm | Topo précis, mêmes zones |
| **Scanner 3D terrestre** | ± 2-10 mm | Intérieurs, façades, ouvrages complexes |

#### Densité de points

- **Mailles 1-2 m** pour terrain remblayé
- **Tous points caractéristiques** (angles, ruptures de pente)
- **Bordures et limites** détaillées

### Phase 3 : Levé des réseaux

#### Réseaux enterrés

##### Méthode A — Levé avant remblaiement

- **Méthode la plus précise** (cm)
- À planifier avec l'entreprise : levé après pose, avant remblaiement
- **Photos** datées + GPS de chaque point

##### Méthode B — Détection après remblaiement

- **Détecteur électromagnétique** (canalisations métalliques)
- **Géoradar** (canalisations non métalliques)
- **Précision** : ± 20-50 cm
- **Limites** : non détecté pour matériaux non métalliques sans gabarit

#### Identification des réseaux

- **Couleurs normalisées** (NF EN 752, NF P 98-332) :
  - **Bleu** : eau potable
  - **Jaune** : gaz
  - **Vert** : assainissement EU
  - **Marron** : assainissement EP
  - **Rouge** : électricité
  - **Vert clair** : communications

### Phase 4 : Traitement et restitution

#### Plans à produire

- **Plan masse** général au 1/200 ou 1/500
- **Plans d'étage** au 1/50 ou 1/100
- **Coupes** longitudinales et transversales
- **Élévations** des façades
- **Plans réseaux** spécifiques

#### Format

- **Papier** : 2 jeux minimum
- **Numérique** : DWG, DXF, PDF, IFC (BIM), SHP (SIG réseaux)

## DT-DICT compatible — Classe A

### Cadre légal (Code env. L.554-1 et s.)

Toute construction ou tranchée nécessite des **DT-DICT** :
- **DT** (Déclaration de Travaux) : MOA aux exploitants
- **DICT** (Déclaration d'Intention de Commencer Travaux) : entreprise
- Plateforme : **reseaux-et-canalisations.ineris.fr**

### Précision des plans réseaux

#### Classes de précision (arrêté 15 fév. 2012)

| Classe | Précision | Application |
|---|---|---|
| **A** | ± 40 cm | Plans **fiables** — préférée |
| **B** | ± 1,5 m | Plans **incertains** — moins fiable |
| **C** | > 1,5 m | Plans **non géoréférencés** — non fiable |

#### Conséquences

- **Classe A** : pas de marquage-piquetage préalable obligatoire
- **Classe B-C** : marquage-piquetage obligatoire avant tout terrassement
- **Sanctions** : amendes en cas d'endommagement d'un réseau classe A

### Pour les exploitants

Les exploitants doivent fournir des plans **classe A** pour leurs réseaux récents :
- **Réseaux neufs** : classe A obligatoire
- **Réseaux anciens** : amélioration progressive en classe A

### Mission du géomètre-expert

- **Lever** les réseaux après pose (avant remblaiement)
- **Géoréférencer** RGF93 + précision classe A
- **Format** SHP ou DWG transmettable aux exploitants
- **Vérification** par le GE (responsabilité)

## Vérification de conformité au PC

### Méthode

1. **Comparaison** plans de PC vs plans de récolement
2. **Identification** des écarts (positionnement, dimensions, hauteurs)
3. **Catégorisation** des écarts :
   - **Tolérables** (dans les tolérances NF P 11-301)
   - **Significatifs** : à mentionner dans le récolement
   - **Non-conformes** : peuvent compromettre la DAACT

### Tolérances NF P 11-301

| Élément | Tolérance |
|---|---|
| Position bâtiment (en plan) | ± 5 cm |
| Verticalité murs | ± 1 cm / étage |
| Hauteurs étages | ± 2 cm |
| Hauteur faîtage | ± 5 cm |
| Cotes finies (sol, plafond) | ± 5 mm |

### Conséquences en cas de non-conformité

- **Mention** au PV de récolement
- **Information** au MOA
- **Décision** : mise en conformité, dérogation, régularisation

## Documents annexes du récolement

### A. Notes de précision

- Méthode de levé
- Précision atteinte
- Écarts constatés vs PC
- Limites et incertitudes

### B. Carnet de levé

- Liste des points levés
- Codes et attributs
- Conditions de levé

### C. Photographies

- Datées et géolocalisées
- Points singuliers
- Avant / après pour comparaisons

### D. Fichiers numériques

- **DWG** (AutoCAD) ou DXF
- **PDF** pour consultation
- **IFC** (BIM) si maquette créée
- **SHP** pour SIG
- **Métadonnées** : système de coordonnées, précision, date

## DMPC consécutif au récolement

### Cas

Si la construction modifie le parcellaire ou si des bâtiments sont ajoutés/supprimés :
- **DMPC** établi par le GE
- **Déposé** au cadastre (DDFiP)
- **Mise à jour** de la matrice cadastrale + évaluation fiscale

### Procédure

(Cf. corpus dédié DMPC.)

## Plan masse pour DAACT

### Contenu

Le **plan masse de récolement** est souvent joint à la DAACT (Déclaration d'Achèvement et de Conformité des Travaux) :

- **Implantation** finale du bâtiment (cotes)
- **Distances** aux limites de propriété
- **Cohérence** avec PC accordé
- **Géoréférencement** RGF93

### Objet

- Permettre au **maire** de vérifier la conformité
- Faciliter le contrôle visuel par les services

## Coût et délai

### Coût indicatif

| Mission | Coût HT |
|---|---|
| Récolement MI simple | 800-2 000 € |
| Récolement logement collectif | 2 500-8 000 € |
| Récolement réseaux classe A | 1 500-5 000 € |
| Plans complets (masse + étages + coupes) | 3 000-10 000 € |
| BIM as-built | 4 000-15 000 € |

### Délai

- **Levé terrain** : 1-3 jours
- **Traitement** : 1-2 semaines
- **Plans finalisés** : 2-4 semaines

## Synthèse — bonnes pratiques GE

1. **Planifier le levé** des réseaux **avant remblaiement** (méthode A — précision maximale)
2. **Géoréférencement RGF93** systématique pour tous les plans
3. **Classe A** ciblée pour les réseaux (DT-DICT future)
4. **Comparaison** systématique vs PC pour identifier non-conformités
5. **Format numérique** complet (DWG, DXF, IFC, SHP)
6. **Notes de précision** annexées (méthode, écarts, limites)
7. **Liaison** avec MOE et MOA pour validation contradictoire
8. **DMPC** si modification cadastrale
9. **Conservation** dossier 10 ans
10. **DOE** : remise structurée (1 jeu papier + 1 numérique)

## Citations à utiliser

- CCAG-Travaux 2021 art. 40 (DOE)
- Code de l'environnement L.554-1 et s. (anti-endommagement)
- Décret 2011-1241 (DT-DICT)
- Arrêté 15 février 2012 (classes A/B/C)
- NF S 70-003 (précision plans topo)
- NF P 11-301 (tolérances exécution)
- Loi 46-942 du 7 mai 1946 (mission GE)

**Référence à citer :** CCAG + Code env. + arrêté 15 fév. 2012. Sources : Legifrance + reseaux-et-canalisations.ineris.fr.
