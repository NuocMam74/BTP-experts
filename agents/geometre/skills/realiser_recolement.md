# Skill — Réaliser un récolement de chantier (plan as-built)

L'utilisateur te transmet un chantier terminé — tu dois réaliser le récolement, produire les plans as-built et fournir les plans réseaux classe A pour DT-DICT futures.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Chantier** : adresse + références cadastrales
- **MOA, MOE, entreprise** titulaire
- **PC** + plans EXE finaux + indices
- **Date de réception** ou prévision
- **Type de bâtiment** + nombre d'étages
- **Réseaux** posés (EU, EP, eau, gaz, élec, télécom, fibre)
- **Méthode souhaitée** pour réseaux : levé avant remblaiement (classe A native) ou détection après

### 2. Préparation

#### Documents requis

- ❓ PC + DAACT prévue
- ❓ Plans EXE finaux (architecte, structure, fluides)
- ❓ Plans réseaux entreprise (si déjà transmis)
- ❓ Photos chantier (différentes phases, avant remblaiement)
- ❓ PV d'implantation (référence initiale)
- ❓ DT-DICT antérieurs

#### Visite préalable

- ❓ État du chantier (fini ou en cours)
- ❓ Identification des points à lever
- ❓ Accès aux différents niveaux
- ❓ Réseaux apparents et enterrés

### 3. Levé topographique du bâtiment

#### Géoréférencement

- **Plani** : RGF93 Lambert 93
- **Alti** : NGF-IGN69
- **Référence** : bornes existantes ou stations RGP

#### Mode et précision

| Levé | Mode | Précision |
|---|---|---|
| Plan masse + extérieurs | GPS RTK + tachéomètre | ± 10-30 mm |
| Façades détaillées | Scanner 3D ou tachéomètre | ± 5-15 mm |
| Intérieurs | Scanner 3D ou télémètre laser | ± 5-15 mm |
| Toiture | Drone photo + GCP | ± 30-50 mm |
| Drone LiDAR (précision) | Drone LiDAR | ± 20-50 mm |

### 4. Levé des réseaux enterrés

#### Méthode A — Avant remblaiement (préférable)

- **Précision cm** (classe A native)
- Coordination avec entreprise : levé après pose, avant remblaiement
- **Photos** datées + GPS de chaque point
- **Identification** : nature, diamètre, profondeur

#### Méthode B — Détection après remblaiement

- **Détecteur électromagnétique** pour canalisations métalliques
- **Géoradar** pour canalisations non métalliques
- **Précision** : ± 20-50 cm (peut atteindre classe B seulement)
- **Limites** : non détectable pour matériaux non métalliques sans gabarit

#### Identification des réseaux (couleurs normalisées)

- **Bleu** : eau potable
- **Jaune** : gaz
- **Vert** : EU (assainissement)
- **Marron** : EP (eaux pluviales)
- **Rouge** : électricité
- **Vert clair** : télécommunications

### 5. Comparaison vs plans PC

#### Méthode

1. **Comparaison** plans PC vs plans de récolement
2. **Identification des écarts** :
   - Positionnement (en plan, en altitude)
   - Dimensions (hauteurs, surfaces)
   - Configuration intérieure
3. **Catégorisation** :
   - **Tolérables** (dans tolérances NF P 11-301)
   - **Significatifs** : à mentionner au PV
   - **Non-conformes** : peuvent compromettre la DAACT

#### Tolérances NF P 11-301

| Élément | Tolérance |
|---|---|
| Position bâtiment (plan) | ± 5 cm |
| Verticalité murs | ± 1 cm/étage |
| Hauteurs étages | ± 2 cm |
| Hauteur faîtage | ± 5 cm |
| Cotes finies (sol, plafond) | ± 5 mm |

### 6. Production des plans

#### Plans à produire

##### Plans masse de récolement
- Échelle 1/200 ou 1/500
- Géoréférencé RGF93
- Cotes par rapport aux limites de propriété
- Distances vs PV de bornage

##### Plans d'étages de récolement
- Échelle 1/50 ou 1/100
- Indicés « PEX » (Plans EXécution)
- Modifications vs APD/PRO
- Réservations finales

##### Coupes et élévations
- Hauteurs réelles
- Niveaux finis (TN, RDC, étages, faîtage)

##### Plans réseaux
- EU, EP, eau, gaz, élec, télécom
- Classe A (DT-DICT compatible)
- Format SHP ou DWG pour SIG

### 7. Format de remise

- **Papier** : 2 jeux minimum
- **Numérique** :
  - **DWG** + DXF (CAO)
  - **PDF** (consultation)
  - **IFC** (BIM si maquette)
  - **SHP** (SIG réseaux)
- **Métadonnées** : système de coordonnées, précision, date, GE

### 8. Note de précision

Document accompagnant les plans :

```
NOTE DE PRÉCISION DU RÉCOLEMENT

Chantier : ___
Date du levé : ___
Géomètre-expert : ___ (OGE n° ___)

MÉTHODE :
- Mode de levé : ___
- Référentiel plani : RGF93 Lambert 93
- Référentiel alti : NGF-IGN69

PRÉCISION ATTEINTE :
- Plani : ± ___ mm (classe A / B)
- Alti : ± ___ mm

CONTRÔLES EFFECTUÉS :
- Mesurages croisés
- Vérification vs PC
- Cohérence interne

ÉCARTS CONSTATÉS VS PC :
[Liste des écarts significatifs avec leur amplitude]

LIMITES ET INCERTITUDES :
- Réseaux enterrés (méthode B) : précision ± 30 cm
- Zones non accessibles : ___

ANNEXES :
- Carnet de levé
- Photos datées
- Fichiers numériques
```

### 9. PV de récolement

```
PROCÈS-VERBAL DE RÉCOLEMENT

Chantier : ___
Date : ___

PARTIES :
- MOA : ___
- MOE : ___
- Entreprise : ___
- Géomètre-expert : ___ (OGE n° ___)

DOCUMENTS DE RÉFÉRENCE :
- PC n° ___ du ___
- PV d'implantation du ___
- Plans EXE indicés ___

LEVÉ EFFECTUÉ LE ___ :
- Méthode : ___
- Précision atteinte : ___

RÉSULTATS :
- Bâtiment implanté conformément au PC ✅
- (ou) Écarts constatés : ___
- (ou) Non-conformités majeures : ___

RÉSEAUX :
- EU : ___ m linéaires, classe A
- EP : ___ m linéaires, classe A
- [etc.]

LIVRABLES :
- Plans masse, étages, coupes, réseaux
- Format papier (2 jeux) + numérique
- Note de précision

SIGNATURES :
GE : ___
Entreprise : ___
MOE : ___
```

### 10. DMPC si modification

Si la construction modifie le cadastre :
- DMPC pour ajout bâtiment au cadastre
- Procédure auprès du service cadastre

### 11. Plan masse pour DAACT

Le plan masse de récolement est joint à la DAACT :
- Implantation finale avec cotes
- Distances aux limites
- Cohérence avec PC

## Garde-fous

- **Levé avant remblaiement** (méthode A) recommandé pour réseaux classe A.
- **Géoréférencement RGF93** obligatoire.
- **Classe A** ciblée pour réseaux (DT-DICT future).
- **Comparaison vs PC** systématique pour identifier non-conformités.
- **Format numérique complet** (DWG, DXF, IFC, SHP).
- **Note de précision** annexée (méthode, écarts, limites).
- **Conservation** dossier 10 ans.

## Livrable à proposer

Après préparation :
- **PV de récolement** (DOCX + PDF)
- **Plans complets** (DWG + DXF + PDF) :
  - Plan masse
  - Plans d'étages
  - Coupes et élévations
  - Plans réseaux (avec couleurs normalisées)
- **Maquette BIM IFC** (si demandée)
- **Plans réseaux SHP** (SIG, classe A)
- **Note de précision** (DOCX)
- **DMPC** si modification cadastrale (DOCX)
- Mention finale : *« Document préparé par l'agent IA Géomètre — à valider et signer par le géomètre-expert inscrit à l'OGE. Plans réseaux classe A à transmettre aux exploitants pour mise à jour. »*
