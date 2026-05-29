# Skill — Établir un DMPC (Document Modificatif du Parcellaire Cadastral)

L'utilisateur te transmet une situation nécessitant une modification cadastrale (division, réunion, construction nouvelle, etc.) — tu dois préparer le DMPC à déposer au service du cadastre.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Nature de la modification** : division, réunion, modification de limite, construction, démolition, rectification d'erreur
- **Parcelles concernées** : section + n° + surface cadastrale
- **Propriétaire(s)** : identité + titre de propriété
- **Acte d'origine** : vente, donation, succession, partage
- **Plan cadastral** actuel (extrait)
- **PV de bornage** (si modification de limite)

### 2. Vérifier l'éligibilité de la modification

#### Cas nécessitant un DMPC

✅ Création de parcelles nouvelles (division)
✅ Réunion de parcelles (acquisition contiguës)
✅ Modification de limite (suite à bornage)
✅ Création de servitude
✅ Construction nouvelle ajoutée
✅ Démolition (suppression)
✅ Rectification d'erreur cadastrale

#### Documents prérequis

- ❓ Titre(s) de propriété
- ❓ Acte authentique d'origine (vente, etc.)
- ❓ PV de bornage si modification de limite
- ❓ DAACT si construction
- ❓ Déclaration de démolition / PD si suppression

### 3. Étude préliminaire

#### Cohérence cadastrale

- **Récupération** plan cadastral actuel (cadastre.gouv.fr)
- **Identification** parcelles concernées
- **Surfaces** cadastrales actuelles
- **Cohérence** avec actes notariés

#### Cohérence géométrique

- **Si modification de limite** : levé topographique + PV bornage
- **Vérification** cohérence avec parcelles voisines

### 4. Levé topographique de référence

#### Mode

- **Tachéomètre** ou **GPS RTK**
- **Géoréférencement** RGF93 Lambert 93
- **Précision** : ± 1-3 cm

#### Points levés

- Sommets de la limite à modifier
- Repères durables
- Cohérence avec bornes existantes

### 5. Établissement du DMPC

#### Structure type

```
DOCUMENT MODIFICATIF DU PARCELLAIRE CADASTRAL

Identifiant DMPC : ___
Date d'établissement : ___
Commune : ___ (Code INSEE : ___)
Section : ___

NATURE DE LA MODIFICATION :
☐ Division parcellaire
☐ Réunion parcellaire
☐ Modification de limite (suite à bornage)
☐ Création / suppression de bâtiment
☐ Servitude
☐ Rectification d'erreur

PARCELLES ANCIENNES :
N° parcelle | Surface cadastrale | Propriétaire
___         | ___ m²             | ___

PARCELLES NOUVELLES :
N° parcelle | Surface cadastrale | Propriétaire
___         | ___ m²             | ___
___         | ___ m²             | ___
___         | ___ m²             | ___

VÉRIFICATION DES SURFACES :
Σ surfaces nouvelles = Σ surfaces anciennes : ✅ Cohérent

PLAN ANNEXÉ :
- Échelle 1/200 (1/500 ou 1/1000 selon taille)
- Système : RGF93 Lambert 93
- Sommets de limite cotés (X, Y) en mètres
- Coordonnées du tableau dans le plan

TABLEAU DES SOMMETS :
Point | X (m)    | Y (m)
A     | _        | _
B     | _        | _
C     | _        | _
[etc.]

PROPRIÉTAIRE(S) :
___ (état civil complet, domicile)

TITRE(S) DE PROPRIÉTÉ :
- Acte du ___ reçu par Maître ___ Notaire à ___
- (Le cas échéant : références de publication au fichier immobilier)

CARTOUCHE :
Géomètre-expert : ___ (nom, prénom)
OGE n° : ___
Adresse : ___
Téléphone : ___
Cachet : [cachet OGE]
Signature : ___ Date : ___

ANNEXES :
1. Plan cadastral actuel (extrait)
2. Plan parcellaire après modification (à l'échelle)
3. Acte notarié d'origine
4. PV de bornage (le cas échéant)
5. Justificatifs propriété
6. DAACT ou DP de démolition (le cas échéant)
```

### 6. Vérifications finales

- ❓ Surfaces cohérentes (Σ nouvelles = Σ anciennes)
- ❓ Géoréférencement RGF93 vérifié
- ❓ Numérotation des nouvelles parcelles cohérente
- ❓ Identification des propriétaires correcte
- ❓ Tous les justificatifs annexés
- ❓ Cartouche complet (cachet OGE)

### 7. Dépôt au cadastre

#### Procédure

- **Destinataire** : Service du cadastre de la DDFiP territorialement compétente
- **Format** : papier + numérique (DXF/DWG/SHP géoréférencé)
- **Frais** : taxe forfaitaire (~ 50-150 € selon nature)

#### Suivi

- Délai d'instruction : **2-6 mois**
- Possibilité de **demande de corrections** par DGFiP
- **Validation** : nouvelle numérotation cadastrale

### 8. Actions parallèles ou successives

#### Acte notarié

- **Indispensable** pour publication au fichier immobilier
- Notaire à informer dès le dépôt DMPC
- **Acte notarié** souvent signé en parallèle (vente, partage)

#### Mise à jour de la matrice cadastrale

- **Automatique** après validation DMPC
- **Communication** au propriétaire (avis de mise à jour)
- **Évaluation** révisée (impact taxe foncière)

### 9. Cas particuliers

#### Division pour vente

- Bornage préalable nécessaire
- DMPC + acte de vente authentique notarial
- DAACT si bâtiment

#### Réunion de parcelles

- Acquisition des parcelles
- DMPC de réunion
- Acte notarié de réunion volontaire (volontaire pour le propriétaire)

#### Construction nouvelle (inscription au cadastre)

- DAACT
- DMPC pour ajout du bâtiment
- Évaluation révisée (taxe foncière augmentée)

#### Démolition

- DP de démolition ou PD
- DMPC pour suppression
- Évaluation révisée (taxe foncière diminuée)

#### Rectification d'erreur cadastrale

- Levé contradictoire
- DMPC simplifié
- Pas d'acte notarié si limite réelle inchangée

### 10. Coût et délai

| Type | Coût HT |
|---|---|
| DMPC simple | 800-2 000 € |
| DMPC complexe (lotissement) | 2 500-8 000 € |
| Rectification d'erreur | 1 200-3 500 € |
| Inscription bâtiment | 600-1 500 € |
| Suppression bâtiment | 400-1 000 € |

Délai total : étude + DMPC (2-4 sem) + validation cadastre (2-6 mois).

## Garde-fous

- **Cohérence des surfaces** vérifiée (somme cohérente).
- **Géoréférencement RGF93** systématique.
- **Format numérique** + papier.
- **Tous justificatifs** annexés.
- **Acte notarié** essentiel pour opposabilité aux tiers.
- **Suivi** du dépôt jusqu'à validation cadastre.
- **Communication** au notaire et propriétaire.
- **Conservation** dossier 10 ans.

## Livrable à proposer

Après préparation :
- **DMPC** (DOCX + PDF) prêt à déposer au cadastre
- **Plan parcellaire** modifié (DWG + DXF + PDF + SHP)
- **Tableau des sommets** (XLSX)
- **Modèle de courrier** au cadastre
- **Modèle de courrier** au notaire (acte authentique)
- **Note explicative** pour le propriétaire (DOCX)
- Mention finale : *« Document préparé par l'agent IA Géomètre — à valider et signer par le géomètre-expert inscrit à l'OGE. Acte notarié indispensable pour publication au fichier immobilier. »*
