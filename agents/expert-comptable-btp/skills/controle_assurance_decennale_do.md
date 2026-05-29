# Skill — Contrôler les assurances décennale et dommages-ouvrage

L'utilisateur te transmet un dossier d'entreprise BTP, un dossier d'opération de construction, ou un audit de chantier — tu dois vérifier la conformité des assurances obligatoires (RC décennale + DO).

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Type d'opération** : neuf / rénovation / extension
- **MOA** : particulier, promoteur, collectivité, entreprise
- **Constructeurs** : architecte, BE, entreprises (préciser lots)
- **Date d'ouverture du chantier**
- **Date de réception** (si applicable)
- **Période sous audit** : exercice annuel, dossier en cours

### 2. Contrôle RC Décennale (côté constructeur)

#### Vérification pour chaque intervenant

Pour chaque architecte, BE, entreprise, demande :
- **Attestation RC décennale** **nominative**, **datée**, **non périmée**
- **Identité** : raison sociale, n° SIREN
- **Activités déclarées et garanties** : doit couvrir les **prestations effectuées** sur le chantier
- **Montant des garanties** : plafond suffisant (généralement 1 à 2 M€)
- **Période de validité** : couvrant la **date d'ouverture** du chantier

#### Drapeaux rouges

| Anomalie | Risque |
|---|---|
| Attestation **non nominative** (au nom d'un autre établissement) | Non-couverture |
| Activité non garantie (ex : entreprise GO faisant de la charpente non déclarée) | Non-couverture sur ces travaux |
| Période **échue** | Pas de couverture |
| Mention « **sous réserve de paiement** » | Risque de résiliation |
| **Différence** entre attestation et statuts | Investigation |
| **Garantie spéciale exigée** (HEC, marines, façades légères) sans mention | Non-couverture sur ces ouvrages |

#### Réponse du client

Si une entreprise refuse de fournir son attestation : **risque grave** pour le MOA. Réponse formelle (LRAR) demandant l'attestation comme **condition d'ouverture** ou de **paiement** du chantier.

### 3. Contrôle DO (côté MOA)

#### Si MOA personne physique propriétaire occupant

- **Pas d'obligation** légale (mais fortement encouragée)
- Vérifier la décision documentée du MOA
- **Risque** : en cas de **revente** du bien dans les 10 ans, le MOA devient **caution solidaire** des constructeurs

#### Si MOA = promoteur, collectivité, entreprise

- **DO obligatoire** souscrite **avant ouverture du chantier** (art. L.242-1 C. assurances)
- **Sanction** : art. L.243-3 — 75 000 € + 6 mois prison (PP) ; 375 000 € (PM) + interdictions professionnelles
- Vérifier la police complète :
  - **Souscripteur** : MOA / promoteur
  - **Bénéficiaire** : MOA + acquéreurs successifs (subrogation conventionnelle)
  - **Objet** : description précise de l'ouvrage
  - **Date d'ouverture** des travaux et **délai prévisionnel**
  - **Prime** payée intégralement
  - **Date d'effet** : avant l'ouverture du chantier

### 4. Comptabilisation des primes

#### RC Décennale (entreprise)

```
6162 Assurance obligatoire dommages-construction       X €
    401 Fournisseurs (assureur)                            X €
```

→ Charge déductible l'exercice.

#### DO (promoteur)

Pour un promoteur (VEFA) :
```
335 Stocks de produits en cours (chantier)             X €
    401 Fournisseurs (assureur)                            X €
```

→ **Capitalisation** dans le coût de revient du projet (charge à intégrer aux frais d'opération).

#### Étalement éventuel

Si paiement unique pour une couverture 10 ans :
- Position **comptable** : étalement possible sur 10 ans (compte 481)
- Position **fiscale** : déductibilité l'exercice de paiement (BOI-IS-BASE-30-30 § 240)

→ **Choix de méthode** à documenter en annexe.

### 5. Provisions pour sinistres potentiels

#### Conditions de constitution (art. 322 PCG)

Une provision pour risque de mise en jeu décennale est admissible si :
- **Sinistre identifié** (assignation, déclaration de désordre)
- **Probabilité** suffisante (pas simplement éventuel)
- **Montant chiffrable** ou raisonnable
- **Franchise** restant à charge ou montant non couvert

Écritures :
```
6815 Dotation aux provisions                            X €
    1511 Provisions pour litiges                            X €
```

#### Annexe (R.123-197 C. com.)

Mentionner :
- Nature des sinistres décennaux en cours
- Volume cumulé des chantiers sous garantie (au moins ordre de grandeur)
- Provisions constituées (et nature)
- Engagements hors bilan éventuels

### 6. Recoupement avec la sinistralité

#### Pour une entreprise sous audit

Demander à l'entreprise :
- Le **registre des sinistres** déclarés (sur 10 ans)
- Les **avenants** RC décennale (changement de couverture)
- Les **résiliations** éventuelles par l'assureur (signal d'alerte majeur)

#### Hausse des primes ou refus d'assureur

Si l'entreprise n'arrive plus à se faire assurer :
- **Recours possibles** au **BCT (Bureau Central de Tarification)** — art. L.252-1 C. assurances
- L'assureur désigné par le BCT est obligé de prendre en charge la garantie

### 7. Pour chaque non-conformité

- **Cite** l'article applicable (Code des assurances L.241-1, L.242-1, L.243-3)
- **Décris** le manquement (attestation manquante, activité non couverte, période échue)
- **Quantifie le risque** (montant des travaux non couverts en cas de sinistre)
- **Recommande** une régularisation :
  - Demande d'attestation à jour
  - Avenant à la police pour ajouter une activité
  - Recours BCT si refus d'assurance
  - Provision comptable en attendant

## Garde-fous

- **Pas de validation finale** — le contrôle ne vaut pas certification de validité par l'assureur.
- **Rester prudent** sur l'interprétation des attestations : en cas de doute, demander confirmation **écrite** à l'assureur.
- **Période de couverture** : décennale = 10 ans à compter de la réception, donc une attestation valide à l'ouverture suffit. Mais l'**entreprise doit rester assurée** chaque année pendant son activité (sinon nouvelle prime à payer chaque exercice).
- **Sous-traitants** : leur RC décennale est aussi obligatoire ; l'entreprise principale a un **devoir de vérification** (responsabilité in solidum).

## Livrable à proposer

Après contrôle, propose un **Rapport d'audit assurance décennale & DO** (format DOCX + PDF) :
- Synthèse exécutive (verdict global : conforme / partiellement / non conforme)
- Tableau par intervenant avec verdict détaillé
- Liste des non-conformités hiérarchisées (majeures / mineures)
- Recommandations chiffrées
- Annexes : copies des attestations contrôlées
- Mention finale : *« Document préparé par l'agent IA Expert-comptable BTP — à valider et signer par l'expert-comptable inscrit à l'OEC. Ne se substitue pas à une mission de commissariat aux comptes ou à un avis d'assureur. »*
