# DMPC et procédures cadastrales

**Source :** Code général des impôts art. 1402 et s. (cadastre) ; arrêté du 24 juillet 2008 sur le DMPC ; instruction DGFiP sur les modifications parcellaires ; loi 46-942 du 7 mai 1946 (monopole géomètre-expert).

## Vue d'ensemble du cadastre

### Cadre légal

Le **cadastre** est :
- Un **système d'information foncière** tenu par la **DGFiP** (Direction Générale des Finances Publiques)
- Fonction **fiscale** : sert de base à la taxe foncière
- Fonction **documentaire** : description des propriétés
- **Pas opposable juridiquement** comme document de propriété (jurisprudence constante)

### Documents cadastraux

| Document | Contenu |
|---|---|
| **Plan cadastral** | Cartographie des parcelles |
| **Matrice cadastrale** | Liste des propriétés par propriétaire (avec évaluation) |
| **Relevé de propriété** | Liste des parcelles d'un propriétaire |
| **Extrait de plan cadastral** | Plan partiel à fournir au PC, etc. |

### Accès

- **Cadastre.gouv.fr** : consultation gratuite + extraction PDF
- **PCI vecteur** : données SIG (DGFiP, accès professionnels)
- **Service du cadastre** : consultation des archives anciennes

## DMPC — Document Modificatif du Parcellaire Cadastral

### Définition

Le **DMPC** est l'acte par lequel un géomètre-expert **propose** au cadastre une modification de la limite ou de la composition d'une ou plusieurs parcelles.

### Cas nécessitant un DMPC

1. **Division parcellaire** (vente partielle, lotissement)
2. **Réunion** de parcelles (achat de plusieurs parcelles contiguës)
3. **Modification de limite** (suite à bornage)
4. **Création** de servitudes (passage, vue, écoulement)
5. **Constructions nouvelles** (ajout au cadastre)
6. **Démolitions** (suppression au cadastre)
7. **Rectifications** d'erreurs cadastrales

### Acteurs

| Acteur | Rôle |
|---|---|
| **Géomètre-expert** | Établit le DMPC (monopole loi 1946) |
| **Propriétaire** | Demandeur |
| **Notaire** | Acte authentique d'origine |
| **DGFiP — Service du cadastre** | Validation et inscription |

## Procédure DMPC

### 1. Étude préliminaire

- **Titres de propriété** du demandeur
- **Plans cadastraux** actuels
- **Bornage** préalable si modification de limite
- **Acte authentique** d'origine de la modification (vente, donation, succession, partage)

### 2. Levé topographique

- **Géoréférencement** RGF93 Lambert 93
- **Identification** des bornes (existantes ou nouvellement implantées)
- **Cotes** précises (cm)
- **Cohérence** avec plan cadastral existant

### 3. Établissement du DMPC

#### Contenu du DMPC

```
DOCUMENT MODIFICATIF DU PARCELLAIRE CADASTRAL

Identifiant DMPC : ___
Date : ___
Commune : ___ (n° INSEE)
Section : ___
Parcelles concernées :
- Parcelle ancienne ___ — surface cadastrale ___
- Parcelles nouvelles : ___

NATURE DE LA MODIFICATION :
☐ Division parcellaire (vente partielle, partage)
☐ Réunion parcellaire (acquisition contiguës)
☐ Modification de limite (suite à bornage)
☐ Création / suppression de bâtiment
☐ Servitude

PLAN ANNEXÉ :
Échelle ___ — Système RGF93 Lambert 93
Sommets de la limite cotés (X, Y) en mètres

CARTOUCHE :
Géomètre-expert : ___ (OGE n° ___)
Cachet et signature

ANNEXES :
- Acte notarié d'origine
- Bornage (si applicable)
- Plan cadastral avant / après
- Justificatif propriété
```

### 4. Dépôt au cadastre

- **Service du cadastre** de la DDFiP territorialement compétente
- **Forme** : papier + numérique (DXF, DWG ou SHP géoréférencé)
- **Frais** : taxe forfaitaire (~ 50-150 € selon nature)

### 5. Validation par le cadastre

#### Vérifications DGFiP

- **Cohérence** géographique
- **Cohérence** des surfaces (somme parcelles nouvelles = surface ancienne)
- **Documents** justificatifs (acte notarié)
- **Géoréférencement** correct

#### Délai

- **2-6 mois** typiquement
- Plus court si DMPC numérique conforme

#### Issues

- **Validation** : inscription au cadastre
- **Refus** : motivé, corrections demandées
- **Régularisation** : nouveau DMPC corrigé

### 6. Conséquences cadastrales

#### Émission de nouveaux identifiants

- **Nouveaux numéros** de parcelles (généralement A123 → A123a, A123b)
- **Matrice cadastrale** mise à jour
- **Évaluation** révisée (impact taxe foncière)

#### Publication

- **Communication** au propriétaire (avis de mise à jour)
- **Mise à jour** des relevés de propriété
- **Notification** au notaire (pour publication au fichier immobilier)

## Distinction DMPC vs. acte notarié

### DMPC

- **Cadastre seulement** (DGFiP)
- Document **technique** modifiant le plan cadastral
- **Pas opposable** aux tiers (cadastre indicatif)

### Acte notarié

- **Fichier immobilier** (publicité foncière)
- Document **juridique** créant ou modifiant les droits
- **Opposable** aux tiers après transcription

### Procédure combinée

Typiquement :
1. **Bornage** par GE → PV de bornage
2. **DMPC** déposé par GE → mise à jour cadastrale
3. **Acte notarié** par notaire → publication au fichier immobilier

Ces 3 étapes sont nécessaires pour que la modification soit **techniquement, fiscalement et juridiquement** complète.

## Cas pratiques fréquents

### 1. Division parcellaire pour vente

- Achat d'un terrain divisé en 2 lots
- **DMPC** par GE
- **Acte notarié** de division par notaire
- **Vente** authentique des lots

### 2. Achat de parcelles contiguës

- Acheter 2 parcelles voisines + les **réunir** en une seule
- **DMPC** de réunion
- **Acte notarié** d'acquisition
- **Demande** au propriétaire de réunion volontaire

### 3. Construction nouvelle

- Construction sur terrain nu → **DMPC** pour ajout du bâtiment
- Suivi de l'**achèvement** par DAACT
- **Évaluation** révisée par cadastre (impact taxe foncière)

### 4. Démolition

- Suppression d'un bâtiment → **DMPC** pour suppression
- Justificatif : déclaration de démolition / PD
- Évaluation révisée (taxe foncière réduite)

### 5. Modification de limite suite à bornage

- Bornage révèle que la limite réelle diffère du cadastre
- **DMPC** pour rectification
- Acte notarié de **cession** ou **acquisition** des bandes échangées (régularisation amiable)

## Erreurs cadastrales

### Détection

Lors d'un bornage ou levé topographique, le GE peut constater :
- **Limites cadastrales** différentes des limites réelles (parfois > 1 m)
- **Surfaces cadastrales** différentes des surfaces réelles
- **Numérotation** erronée

### Régularisation

#### Cas 1 — Erreur sans impact sur les limites de propriété

- **Demande de rectification** au cadastre
- DMPC simplifié

#### Cas 2 — Erreur révélant un empiétement

- **Acte notarié** de régularisation (acquisition à l'amiable)
- DMPC après acte
- Solution **amiable** privilégiée

#### Cas 3 — Litige préexistant

- **Bornage judiciaire** (cf. corpus dédié)
- Jugement transcrit
- DMPC suite à jugement

## Particularités selon zones

### Zones urbaines denses

- Parcelles **petites** (< 200 m²)
- **Mitoyenneté** fréquente
- DMPC souvent **lié à mutations** (ventes, successions)

### Zones rurales

- Parcelles **grandes** (souvent > 5 000 m²)
- **Découpages anciens** (cadastre napoléonien)
- **Erreurs** plus fréquentes (précision limitée)

### Zones de remembrement

- **AFAF** (Aménagement Foncier Agricole et Forestier)
- Modification massive du parcellaire
- DMPC **collectif** (procédure spécifique)

### Sites classés / SPR

- **Pas d'impact** sur le DMPC lui-même
- Mais les constructions futures soumises à avis ABF

## Coût et délai

### Coût indicatif

| Type | Coût HT |
|---|---|
| DMPC simple (1 division) | 800-2 000 € |
| DMPC complexe (lotissement) | 2 500-8 000 € |
| Rectification d'erreur cadastrale | 1 200-3 500 € |
| Inscription bâtiment nouveau | 600-1 500 € |
| Suppression bâtiment | 400-1 000 € |

### Délai

- **Étude + DMPC** par GE : 2-4 semaines
- **Validation** cadastre : 2-6 mois
- **Acte notarié** associé : 4-12 semaines selon notaire

## Rôle du géomètre-expert

### Monopole (loi 1946 art. 1)

> Le géomètre-expert est le seul professionnel habilité à établir le DMPC.

### Responsabilité

- **Civile** : RC pro
- **Décennale** : 10 ans pour fautes professionnelles
- **Discipline** : OGE peut sanctionner

### Honoraires

- **Libres** mais usages :
  - DMPC simple : 800-2 000 €
  - DMPC complexe (lotissement) : 2 500-8 000 €

## Synthèse — bonnes pratiques GE

1. **Étude documentaire** approfondie avant tout DMPC
2. **Bornage** préalable si modification de limite (PV signé)
3. **Géoréférencement RGF93** systématique
4. **Format numérique** (DWG, DXF, SHP) en plus du papier
5. **Cohérence** vérifiée (surfaces, identifiants, géométrie)
6. **Liaison** avec le notaire pour acte authentique
7. **Suivi** auprès du cadastre (relance si délai dépassé)
8. **Conservation** dossier 10 ans
9. **Communication** au client (étapes, délais, coûts)

## Citations à utiliser

- CGI art. 1402 et s. (cadastre)
- Arrêté du 24 juillet 2008 (DMPC)
- Loi 46-942 du 7 mai 1946 (monopole GE)
- Décret 55-22 du 4 janv. 1955 (publicité foncière)
- Code civil art. 646 (bornage)
- Jurisprudence Cass. 3e civ. (cadastre indicatif)

**Référence à citer :** CGI + loi 1946 + DGFiP. Sources : Legifrance + cadastre.gouv.fr + impots.gouv.fr + geometre-expert.fr.
