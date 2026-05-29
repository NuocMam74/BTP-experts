# Skill — Implanter un bâtiment et piqueter le chantier

L'utilisateur te transmet un projet à implanter — tu dois préparer l'implantation conforme au PC et au PV de bornage, et rédiger le PV d'implantation.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Chantier** : adresse + références cadastrales
- **MOA, MOE, entreprise** titulaire
- **PC accordé** : n° + date + plans cotés
- **PV de bornage** (si existant) ou plan parcellaire
- **PLU** : règles d'implantation (alignement, recul, prospect)
- **Étude G2 PRO** : préconisations fondations
- **Type de bâtiment** : MI, collectif, industriel

### 2. Étude préalable

#### Documents requis

- ❓ PC accordé (notamment PC2 plan masse + PC4 plan de coupe)
- ❓ Notice descriptive PC
- ❓ PV de bornage récent (limite confirmée)
- ❓ PLU : règles d'implantation applicables
- ❓ Servitudes mentionnées au titre

#### Vérifications

- ❓ Cohérence PC vs PLU (reculs respectés)
- ❓ Pas d'empiétement potentiel sur limite
- ❓ Cohérence avec étude géotechnique (cotes altimétriques)
- ❓ DT-DICT lancés par MOA (réseaux à proximité)

### 3. Reconnaissance du site

#### Visite terrain

- ❓ Identification des bornes existantes
- ❓ Repères durables (poteaux EDF, regards, bouches incendie)
- ❓ Constructions existantes et alignement
- ❓ Accès chantier
- ❓ Topographie (relief, courbes de niveau)
- ❓ Risques visibles (réseaux apparents, sols meubles)

### 4. Levé topographique

#### Mode et précision

- **Tachéomètre** ou **GPS RTK**
- **Géoréférencement** RGF93 Lambert 93
- **Altimétrie** NGF-IGN69
- **Précision** : ± 1-3 cm (classe A)

#### Points levés

- Bornes existantes
- Constructions environnantes
- Repères naturels et artificiels
- Cotes altimétriques TN

### 5. Calcul des cotes d'implantation

À partir du plan PC, le GE calcule les **coordonnées précises** :
- 4 angles du bâtiment (parallélépipède simple)
- Axes principaux (axes structurels, refends porteurs)
- Voiles porteurs
- Réservations (trémies, escaliers, ascenseurs)
- Réseaux enterrés à respecter

Conversion : cotes relatives PC → cotes absolues sur terrain.

### 6. Piquetage sur site

#### Matériel

- **Piquets** en bois ou acier
- **Chaises d'implantation** (encadrement bois autour du bâtiment, avec offset 1-2 m)
- **Fils tendus** entre piquets (alignements)
- **Clous d'arpenteur** pour cotes durables
- **Peinture** de chantier (couleurs distinctes par niveau)

#### Implantation primaire

- **Piquets de référence** aux 4 angles
- **Chaises d'implantation** en périphérie
- **Axes marqués** sur les chaises (clous)
- **Photos** datées + GPS

#### Implantation secondaire

- Réservations
- Refends structurels
- Murs porteurs
- Cotes altimétriques (TN, fond de fouille, niveau 0)

### 7. Vérification croisée

Avant validation :
- ❓ Cotes des bornes vérifiées par mesurage direct
- ❓ Cohérence avec PV de bornage
- ❓ Reculs PLU respectés (cotes mesurées vs règles)
- ❓ Alignement avec voirie (si exigé)
- ❓ Cohérence avec plans EXE (axes structurels)

### 8. Rédaction du PV d'implantation

```
PROCÈS-VERBAL D'IMPLANTATION

Date : ___
Chantier : ___ (adresse + références cadastrales)

PARTIES :
- Maître d'ouvrage : ___
- Maître d'œuvre : ___
- Entreprise titulaire : ___
- Géomètre-expert : ___ (OGE n° ___)

DOCUMENTS DE RÉFÉRENCE :
- Permis de construire n° ___ délivré le ___
- PV de bornage du ___ (si applicable)
- Étude G2 PRO du ___
- Levé topographique du ___

RÉFÉRENTIEL :
- Plani : RGF93 Lambert 93
- Alti : NGF-IGN69

POINTS IMPLANTÉS :

Point | Description       | X (m)    | Y (m)    | Z (m)
A     | Angle NO bâtiment | _        | _        | _
B     | Angle NE bâtiment | _        | _        | _
C     | Angle SE bâtiment | _        | _        | _
D     | Angle SO bâtiment | _        | _        | _
E     | Axe refend 1      | _        | _        | _
F     | Axe refend 2      | _        | _        | _
[etc.]

CHAISES D'IMPLANTATION :
Posées en périphérie, axes marqués par clous d'arpenteur.
Offset 1,5 m du bâtiment pour préserver pendant terrassement.

COTES ALTIMÉTRIQUES :
- TN référence : Z = ___
- Fond de fouille prévu : Z = ___
- Niveau 0 RDC : Z = ___

CONTRÔLES :
- Cotes vérifiées par mesurage croisé
- Tolérance respectée : ± 2 cm (plani), ± 5 cm (alti)
- Reculs PLU vérifiés :
   - Limite Nord : ___ m (PLU : min ___ m) → OK
   - Limite Est : ___ m → OK
   - [etc.]

ANNEXES :
- Plan d'implantation au 1/100 (géoréférencé)
- Photos datées des piquets et chaises
- Tableau des coordonnées

SIGNATURES :
GE : ___
Entreprise : ___
MOE : ___
MOA : ___ (le cas échéant)
```

### 9. Suivi pendant le chantier

#### Implantation par phases

| Phase | Implantation requise |
|---|---|
| Terrassement | Emprise + cotes fond de fouille |
| Fondations | Axes semelles + cotes altimétriques |
| Élévation murs | Axes murs porteurs + altitudes planchers |
| Toiture | Cotes faîtage + pentes |
| Réseaux | Tracés EU/EP + cotes regards |

#### Vérifications successives

- Pré-terrassement
- Post-terrassement (fond de fouille)
- Béton de propreté
- Élévation R+0, R+1, etc.
- Réception

### 10. Tolérances NF P 11-301

| Élément | Tolérance |
|---|---|
| Position bâtiment | ± 5 cm |
| Verticalité murs | ± 1 cm/étage |
| Hauteurs étages | ± 2 cm |
| Hauteur faîtage | ± 5 cm |
| Cotes finies | ± 5 mm |

## Garde-fous

- **PV de bornage préalable** indispensable (sinon : risque empiétement).
- **DT-DICT** lancés par MOA + entreprise avant terrassement.
- **Reculs PLU** vérifiés (pas de tolérance, risque démolition).
- **Géoréférencement RGF93** obligatoire (cohérence DT-DICT).
- **PV d'implantation** signé contradictoirement (preuve opposable).
- **Conservation** 10 ans (responsabilité décennale).
- **En cas de doute** : suspension de l'implantation jusqu'à clarification.

## Livrable à proposer

Après préparation :
- **PV d'implantation** (DOCX + PDF) prêt à signer
- **Plan d'implantation** géoréférencé (DWG + DXF + PDF)
- **Tableau des coordonnées** (XLSX)
- **Photos** datées et géolocalisées des piquets et chaises
- **Note de précision** méthodologique (DOCX)
- Mention finale : *« Document préparé par l'agent IA Géomètre — à valider et signer par le géomètre-expert inscrit à l'OGE. Conformité au PC et au PV de bornage vérifiée. »*
