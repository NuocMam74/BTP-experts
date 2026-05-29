# Planning de chantier — OPC, GANTT et méthode PERT

**Source :** Loi MOP / CCP L.2410 et s. (mission OPC) ; arrêté 21 déc. 1993 (éléments de mission) ; bonnes pratiques de l'AOPC (Association des OPC) ; CCAG-Travaux art. 19.

## OPC — Ordonnancement, Pilotage, Coordination

### Définition (décret 93-1268)

L'**OPC** est un **élément de mission complémentaire** à la mission de base de maîtrise d'œuvre (cf. élément G du décret 93-1268).

Sa fonction :
- **Ordonnancer** : définir la séquence d'enchaînement des travaux entre lots
- **Piloter** : suivre l'exécution et alerter sur les écarts
- **Coordonner** : gérer les **interfaces** techniques entre entreprises

### Qui assure l'OPC ?

| Option | Avantage | Inconvénient |
|---|---|---|
| Mission OPC distincte (cabinet OPC dédié) | Indépendance, expertise | Coût supplémentaire (1,5-3 % travaux) |
| OPC intégré au MOE | Continuité de la mission | Risque de conflit MOE/OPC |
| OPC confié au gros œuvre | Économique | Conflit d'intérêt potentiel |

### Distinction OPC / MOE

| Mission | MOE (DET) | OPC |
|---|---|---|
| Lecture des marchés | ✓ | ✓ |
| Validation technique | ✓ | — |
| Rédaction des OS | ✓ | — |
| Visa situations | ✓ | — |
| Planning enclenché | — | ✓ |
| Planning de chantier détaillé | — | ✓ |
| Gestion interfaces | — | ✓ |
| Réunions de chantier | ✓ | ✓ |
| Réunions OPC dissociées | — | ✓ |

## Types de planning

### 1. Planning prévisionnel (phase APD/PRO)

- Établi en phase études
- Décomposition en grandes phases (terrassement, GO, second œuvre, finitions)
- **Échelle** : mensuelle
- **Forme** : GANTT simple
- Sert à dimensionner le délai contractuel

### 2. Planning enclenché (avant démarrage)

- Réalisé après notification du marché, avant ouverture chantier
- **Échelle** : hebdomadaire
- Détail par lot
- Validé par le titulaire (signature contradictoire)
- **Annexé au marché** par avenant

### 3. Planning de chantier détaillé

- Mise à jour mensuelle
- **Échelle** : journalière
- Détail par poste (béton, étanchéité, etc.)
- Mise à jour à chaque réunion OPC

### 4. Planning de récolement

- Établi à la fin du chantier
- Comparaison **planning prévu / réel**
- Identification des causes d'écarts (justifie ou non l'application de pénalités)

## Méthode GANTT (diagramme à barres)

### Principe

- Axe horizontal : temps (jours, semaines, mois)
- Axe vertical : tâches (lots, postes)
- Barres horizontales = durée de chaque tâche

### Avantages

- **Lisibilité** immédiate
- **Visualisation** des durées + chevauchements
- Adapté aux **non-experts**

### Limites

- Ne montre pas explicitement les **dépendances** entre tâches
- Difficile à mettre à jour manuellement sur grand chantier

### Logiciels

- **MS Project** (référence)
- **Primavera P6**
- **Asana**, **Wrike**, **Smartsheet**
- **GanttProject**, **ProjectLibre** (open source)
- Outils BIM 4D : **Synchro**, **Navisworks Simulate**

## Méthode PERT (Program Evaluation Review Technique)

### Principe

- Modélisation **graphique** par **nœuds et arcs**
- Identification du **chemin critique** : séquence de tâches dont tout retard impacte la durée totale du projet

### Étapes

#### 1. Décomposer en tâches

Lister toutes les tâches élémentaires du chantier avec :
- Durée prévue
- Tâches **prédécesseurs** (à terminer avant)

#### 2. Construire le réseau

Chaque nœud représente un **événement** (début/fin de tâche).
Chaque arc représente une **tâche** avec sa durée.

#### 3. Calculer les dates au plus tôt (forward pass)

Pour chaque nœud, date au plus tôt = max(date_fin_prédécesseurs).

#### 4. Calculer les dates au plus tard (backward pass)

À partir de la fin, remonter en arrière : date au plus tard = min(date_début_successeurs - durée_tâche).

#### 5. Identifier le chemin critique

Tâches dont **date au plus tôt = date au plus tard** (marge nulle).

→ Tout retard sur le chemin critique = retard du projet entier.

### Exemple simplifié — chantier 10 mois

```
Tâche A : Terrassement (1 mois)
Tâche B : Fondations (2 mois) — après A
Tâche C : Gros œuvre (4 mois) — après B
Tâche D : Charpente (1 mois) — après C
Tâche E : Couverture (1 mois) — après D
Tâche F : Étanchéité (2 mois) — après C, peut chevaucher D, E
Tâche G : Menuiseries ext. (1 mois) — après E (mise hors d'eau)
Tâche H : Second œuvre (3 mois) — après G
Tâche I : Finitions (2 mois) — après H
Tâche J : Réception (1 mois) — après I
```

Chemin critique : A → B → C → D → E → G → H → I → J = 16 mois.

Si la tâche F prend 3 mois au lieu de 2, **aucun impact** sur la durée totale (marge libre).
Si la tâche C prend 5 mois, **+1 mois** sur la durée totale (retard du chemin critique).

## Étapes clés de planification

### 1. Mois préliminaires (M-3 à M0)

| Tâche | Acteur |
|---|---|
| Études EXE, PEX, BIM | MOE / Entreprises |
| Demandes DT-DICT | MOA |
| Constitution PGC, DIUO | CSPS |
| Études fondations spéciales (G2 AVP) | BET géotech |
| Adjudication marchés | MOA |
| Préparation base vie | Gros œuvre |
| Permis de feu (le cas échéant) | Coordinateur sécurité |

### 2. Démarrage chantier (M0)

- OS de démarrage notifié au titulaire
- Affichage du panneau de chantier (PC)
- Installation base vie
- Préparation des terrains (clôture, pancartes, accès)

### 3. Phases de gros œuvre (M1 à M4-6 selon projet)

- Terrassement
- Fondations (semelles, radiers, pieux)
- Élévation des murs porteurs
- Planchers
- Charpente
- Couverture (mise hors d'eau)

### 4. Phases de second œuvre (M5-7 à M8-10)

- Étanchéité toiture-terrasse
- Menuiseries extérieures (mise hors d'air)
- Cloisons / doublages
- Plomberie
- Électricité
- Chauffage / Ventilation / Climatisation

### 5. Finitions (M9-10 à M11-12)

- Carrelage
- Parquets
- Peinture
- Sanitaires
- VRD finalisé (espaces verts, voiries)

### 6. Clôture (M12)

- Essais et mises en service
- OPR
- Réception
- DOE / DIUO / DAACT

## Réunions OPC

### Réunions de chantier (hebdomadaires)

- Animées par le MOE (DET)
- Participants : MOE, OPC, titulaires, MOA (selon contexte)
- Ordre du jour :
  - Avancement par lot
  - Réception des supports
  - Points de blocage
  - Coordination interlots
  - Plan d'actions

### Réunions OPC dissociées (bimensuelles)

- Animées par l'OPC
- Centrées sur la **coordination** et la **planification**
- Mise à jour du planning détaillé
- Anticipation des phases suivantes

### Comptes rendus

- Rédigés par le MOE (CR de chantier) ou l'OPC (CR OPC)
- **Diffusés sous 8 jours**
- **Émission obligatoire** d'un projet contradictoire avec les acteurs

## Avancement et reporting

### Tableau de bord type

| Indicateur | Formule | Cible |
|---|---|---|
| **Avancement physique** | % travaux exécutés (PEC) | Vs planning |
| **Avancement financier** | Σ situations payées / marché | Vs avancement physique |
| **Délai consommé** | Jours écoulés / délai total | Vs avancement physique |
| **Nombre de réserves levées** | Tableau réserves | Tendance à la baisse |
| **Incidents sécurité** | Accidents / pré-accidents | Zéro |
| **Carnet de TS** | Cumul travaux supplémentaires | Plafond 50 % marché |

### Détection d'écarts

- **Avancement réel < planning** : alerte précoce
- **Surcoûts > budget** : revue mensuelle avec MOA
- **Réserves en hausse** : qualité d'exécution dégradée

## Gestion des interfaces

### Méthode

- Cartographie des **points de contact** entre lots :
  - Gros œuvre ↔ Menuiseries extérieures (réservations)
  - Plomberie ↔ Cloisons (saignées, gaines)
  - Élec ↔ Plâtrerie (boîtes encastrées)
  - CVC ↔ Faux plafonds (passages gaines)

- **Fiches d'interface** : qui prépare, qui réceptionne, à quel jalon

### Exemple — interface GO / Menuiseries ext.

| Action | Acteur | Délai |
|---|---|---|
| Plan de calepinage menuiseries | BE / Architecte | M-2 |
| Métré des baies + réservations | OPC | M-1 |
| Coffrage GO avec dimensions correctes | Gros œuvre | M0 |
| Réception support (dimensions, équerre) | OPC + Menuiseries | M+0,5 |
| Réserves le cas échéant | OPC | M+0,5 |
| Pose menuiseries après séchage GO | Menuiseries | M+1 |

## Outils BIM 4D — planning enrichi

### Principe

- Maquette **BIM 3D** + **dimension temporelle** = BIM 4D
- Chaque élément 3D associé à une **tâche** du planning
- **Simulation visuelle** de l'avancement

### Logiciels

- **Synchro 4D** (Bentley)
- **Navisworks Simulate** (Autodesk)
- **Vico Office** (Trimble)
- **iTWO** (RIB)

### Avantages

- Détection des **conflits temporels** (deux tâches simultanées sur la même zone)
- Visualisation du chantier au fil du temps
- Communication facilitée avec MOA, entreprises

### Inconvénients

- Coût (logiciel + temps de modélisation)
- Nécessite une **maquette BIM** existante
- Maintenance régulière

## Synthèse — bonnes pratiques MOEX/OPC

1. **Établir le planning enclenché** avant démarrage (signé par titulaire).
2. **Réunion OPC** dissociée de la réunion de chantier (2x/mois minimum).
3. **Mettre à jour** le planning chaque semaine, l'enclenché chaque mois.
4. **Détecter** les dérives sur le chemin critique en alerte précoce.
5. **Anticiper** les phases sensibles (mise hors d'eau / hors d'air, raccordements).
6. **Documenter** : tout retard mentionné au CR + analyse causale.
7. **Calculer le décompte des intempéries** chaque mois pour justifier prolongations.
8. **Synthétiser** mensuellement au MOA : avancement, alertes, actions.

## Citations à utiliser

- Décret 93-1268 + arrêté 21 déc. 1993 (éléments de mission, dont OPC)
- CCP L.2410-1 et s. (issu loi MOP)
- CCAG-Travaux 2021 art. 19 (délai), 28 (sécurité)
- AOPC (Association des OPC) — bonnes pratiques

**Référence à citer :** Loi MOP / décret 93-1268 + AOPC. Sources : Legifrance, aopc.fr.
