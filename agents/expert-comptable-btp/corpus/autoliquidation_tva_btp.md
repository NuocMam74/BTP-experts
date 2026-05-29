# Autoliquidation de la TVA dans le BTP

**Source :** Code général des impôts (CGI) art. 283-2 nonies ; loi 2013-1278 du 29 déc. 2013 (création) ; BOI-TVA-DECLA-10-10-20 (doctrine fiscale BOFIP) ; ordonnance 2021-1190 du 15 sept. 2021.

## Principe

L'autoliquidation est un mécanisme par lequel **le client (donneur d'ordre)** déclare et acquitte lui-même la TVA, à la place du **fournisseur (sous-traitant)**.

Dans le BTP, le dispositif vise les travaux réalisés par un **sous-traitant** pour le compte d'un **entrepreneur principal**.

## Cadre légal

- **Création** : art. 25 de la loi de finances rectificative pour 2013 (loi 2013-1278 du 29 décembre 2013), modifiant l'art. 283 du CGI.
- **Entrée en vigueur** : **1ᵉʳ janvier 2014**.
- Objectif : lutter contre la fraude TVA dans la sous-traitance BTP (carrousels, sociétés éphémères).

## Champ d'application (art. 283-2 nonies CGI)

### Conditions cumulatives

1. **Travaux concernés** : travaux de **construction**, y compris ceux de **réparation**, **nettoyage**, **entretien**, **transformation** et **démolition** effectués en relation avec un bien immobilier.
2. **Régime de sous-traitance** : opération réalisée par un **sous-traitant** au sens de la loi 75-1334 du 31 déc. 1975 (sous-traitant déclaré au MO, payé par le MO ou par le titulaire).
3. Les deux parties (sous-traitant et donneur d'ordre) sont assujetties à la TVA en France.

### Travaux explicitement concernés (BOI-TVA-DECLA-10-10-20)

| Catégorie | Inclus |
|---|---|
| Construction | Construction neuve, extension, surélévation |
| Démolition | Travaux préparatoires, déconstruction sélective |
| Rénovation / réhabilitation | Réfection, restauration, transformation |
| Réparation | Maçonnerie, plomberie, électricité… |
| Entretien | Nettoyage de façades, ravalement |
| Travaux annexes | Plomberie, électricité, peinture, étanchéité, couverture, isolation, menuiseries, carrelage, parquet, escaliers, ascenseurs, antennes, climatisation, alarme, etc. |
| Installations dans / sur un immeuble | Si elles le rendent partie intégrante |

### Travaux explicitement exclus

| Catégorie | Exclus |
|---|---|
| Production / livraison de matériaux sans pose | Vente pure : régime normal |
| Prestations immatérielles | Études, plans, ingénierie pure : régime normal |
| Travaux sur biens mobiliers | Régime normal |
| Locations d'engins avec opérateur **sans intervention sur l'ouvrage** | Régime normal |
| Travaux sur ouvrages **propres** au sous-traitant (pour son propre usage) | Régime normal |
| Travaux pour particulier | Pas d'autoliquidation (pas de sous-traitance entre pros uniquement) |

### Cas limites — pratique

- **Sous-traitance de rang 2 et plus** : autoliquidation également applicable (le rang 2 facture HT au rang 1, lui-même autoliquidant).
- **Location de matériel avec chauffeur intervenant sur l'ouvrage** : autoliquidation.
- **Travaux mixtes** (vente + pose) : autoliquidation sur la part « pose », régime normal sur la part « livraison de bien » — sauf si la pose est accessoire (BOI-TVA-CHAMP-10-10-50-30 § 70).

## Mécanisme déclaratif et facturation

### Mention obligatoire sur la facture du sous-traitant

> *« Autoliquidation »* (art. 242 nonies A annexe II CGI)

Toute facture émise par le sous-traitant doit :
- Être **émise sans TVA** (HT)
- Porter la mention **« Autoliquidation »**
- Mentionner l'art. 283 du CGI
- Renvoyer au taux de TVA applicable (5,5 %, 10 % ou 20 %) que le donneur d'ordre devra autoliquider

### Déclaration côté donneur d'ordre

Le donneur d'ordre porte le montant HT facturé par le sous-traitant :
- En **TVA collectée** sur la ligne dédiée de la **CA3** : ligne 2 « Autres opérations imposables » avec mention du taux applicable
- Et **simultanément en TVA déductible** sur la ligne correspondante

→ Effet : neutre en trésorerie pour le donneur d'ordre, mais déclaratif obligatoire.

### Déclaration côté sous-traitant

Le sous-traitant déclare son chiffre d'affaires HT autoliquidé sur la ligne :
- CA3 : ligne 5 « Opérations non imposables » avec mention spécifique
- Ne facture pas la TVA et ne la reverse pas

### Schéma type — chantier de 100 k€ HT en cascade

```
MOA (particulier ou pro) ──── CA3 normale TVA 20 % ───→ Entreprise principale (EP)
                                                          │
                                                          │ paie 120 k€ TTC
                                                          │
                                                          ▼
Entreprise principale ─── facture HT « Autoliquidation » ─── Sous-traitant (ST) 100 k€ HT
                                                          │
                                                          │ paie 100 k€ HT
                                                          │
                              ┌───────────────────────────┘
                              │
                              ▼
EP déclare : +20 k€ TVA collectée, +20 k€ TVA déductible (neutre)
ST déclare : 100 k€ CA HT autoliquidé (pas de TVA reversée)
```

## Sanctions en cas de non-respect

### Côté sous-traitant

- Facturation avec TVA alors que régime d'autoliquidation applicable :
  - TVA facturée par erreur → demandée à régularisation auprès du fournisseur
  - Le donneur d'ordre n'a **PAS** le droit de déduire cette TVA (art. 271 CGI)
- **Amende de 5 %** des sommes pour la facture qui aurait dû mentionner l'autoliquidation (art. 1788 A 4° CGI) — applicable même en cas de bonne foi.

### Côté donneur d'ordre

- **Non-déclaration en TVA collectée + déductible** :
  - **Amende de 5 %** sur le montant de la TVA omise (art. 1788 A 4° CGI)
  - Plafond : 50 % de la TVA déductible
- **Solidarité de paiement** : le donneur d'ordre est responsable de la déclaration et du paiement de la TVA (art. 283-2 nonies)

### Vérification par la DGFiP

Lors d'un contrôle :
- Examen des factures sous-traitants (bonne mention « Autoliquidation »)
- Vérification de la cohérence CA3 (ligne autoliquidation = montants des factures sous-traitants)
- Recoupement avec **DC4** déclarés par le titulaire

## Cas particuliers et zones de vigilance

### 1. Travaux en groupement (cotraitance)

- Pas de sous-traitance entre cotraitants → **pas d'autoliquidation** entre eux.
- Chacun facture le MO en TVA normale.

### 2. Contrats de location-vente (crédit-bail immobilier)

- Si refacturation à l'utilisateur, traitement spécifique selon montage.

### 3. Marchés publics

- Le sous-traitant déclaré au DC4 facture le titulaire en HT « Autoliquidation ».
- Si paiement direct du MO au sous-traitant (clause art. 6 loi 1975), le **MO continue à payer en HT** au sous-traitant, et le **titulaire autoliquide** la TVA (BOI 2018).

### 4. Sous-traitance partielle

- Si une facture sous-traitant comporte une part « fourniture pure » (matériaux livrés sans pose), seule la part « travaux » est autoliquidée.
- Recommandation : émettre 2 factures distinctes pour clarté fiscale.

### 5. Auto-entrepreneur sous-traitant

- L'AE soumis au régime de la franchise en base TVA (CA < seuil — 2024 : 36 800 € prestations de services) **ne facture pas de TVA** → pas d'autoliquidation.
- L'AE dépassant le seuil → factures HT « Autoliquidation ».

### 6. Entreprise étrangère (UE / hors UE)

- Si sous-traitant établi à l'étranger réalisant des travaux en France : régime d'autoliquidation également applicable (art. 283 2° CGI — services localisés en France).
- Vérifier représentant fiscal éventuel.

## Procédure de régularisation a posteriori

Si le sous-traitant a facturé avec TVA par erreur :
1. **Émission d'un avoir** par le sous-traitant
2. **Émission d'une nouvelle facture** HT avec mention « Autoliquidation »
3. **Régularisation CA3** côté sous-traitant et côté donneur d'ordre (corrections sur la déclaration en cours)
4. **Délai de prescription** : 3 ans (art. L.169 LPF)

## Checklist d'audit pour un expert-comptable

Lors d'une **revue analytique BTP**, vérifier :

1. **Liste des sous-traitants** déclarés (DC4 marchés publics ; déclaration MO marchés privés).
2. **Échantillon de factures sous-traitants** :
   - Mention « Autoliquidation » présente
   - Renvoi au taux applicable
   - Aucune TVA facturée
3. **CA3 du donneur d'ordre** :
   - Ligne d'autoliquidation correctement remplie (TVA collectée + déductible)
4. **CA3 du sous-traitant** :
   - Ligne CA HT autoliquidé correctement remplie
5. **Cohérence comptable** :
   - Compte fournisseurs sous-traitants — chèque ou virement pour le montant HT
   - Pas d'écriture TVA déductible isolée sur la facture sous-traitant
6. **Comparaison déclaratifs** EP vs. ST : cohérence des montants pour audit interne.

## Distinction avec d'autres mécanismes voisins

| Mécanisme | Champ | TVA |
|---|---|---|
| **Autoliquidation BTP sous-traitance** | Travaux immobiliers entre pro et sous-traitant | Collectée + déductible chez DO |
| **Autoliquidation déchets ferreux** | Livraison de déchets ferreux et non-ferreux | Idem mécanisme général |
| **Autoliquidation acquisitions intracommunautaires** | Achat intra-UE de biens | Mécanisme distinct |
| **Reverse charge prestation de services** | Services localisés en France rendus par prestataire UE/étranger | Idem |

## Citations à utiliser

- CGI art. 283-2 nonies (création autoliquidation BTP)
- CGI art. 271 (droit à déduction)
- CGI art. 242 nonies A annexe II (mentions obligatoires)
- CGI art. 1788 A 4° (sanction 5 %)
- LPF art. L.169 (prescription)
- BOI-TVA-DECLA-10-10-20 (doctrine BOFIP)
- Loi 75-1334 du 31 déc. 1975 (sous-traitance)
- Loi 2013-1278 du 29 déc. 2013 (loi de finances rectificative)

**Référence à citer :** CGI art. 283-2 nonies + BOI-TVA-DECLA-10-10-20. Sources : Legifrance + BOFIP-impots.gouv.fr.
