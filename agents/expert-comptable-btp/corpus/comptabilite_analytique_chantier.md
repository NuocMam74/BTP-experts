# Comptabilité analytique de chantier (gestion par affaire) — BTP

**Source :** Plan Comptable Général (PCG) — comptabilité analytique / comptes de la classe 9 (comptabilité de gestion, hors plan obligatoire mais usuelle) ; doctrine de gestion BTP (FFB, CAPEB, OEC) ; articulation avec le PCG (classes 6 et 7). La comptabilité analytique n'est pas normée par le PCG comme la comptabilité générale : les comptes de classe 9 ci-dessous relèvent d'une **pratique de gestion** et non d'une obligation légale. **Coefficients et ordres de grandeur à revérifier selon l'entreprise.**

## 1. Pourquoi une analytique de chantier en BTP

L'entreprise du bâtiment travaille **par affaire** (par chantier). Le résultat global du compte de résultat ne dit rien de la **marge chantier par chantier**. La comptabilité analytique vise à :

- Connaître le **prix de revient réel** de chaque chantier.
- Comparer **budget (déboursé d'étude) et réalisé** (déboursé constaté).
- Identifier les **chantiers déficitaires** (et déclencher, le cas échéant, une **provision pour perte à terminaison** — voir corpus *reconnaissance_revenu_avancement*).
- Alimenter le calcul de l'**avancement par les coûts** (voir corpus *en_cours_methode_achevement* et la reconnaissance du revenu à l'avancement).
- Construire les **devis** par application de coefficients fiables.

## 2. Structure des coûts d'un chantier

### 2.1 Le déboursé sec

Le **déboursé sec** = somme des **coûts directs** de production du chantier, **avant** frais généraux et marge.

| Poste | Contenu | Comptes généraux usuels |
|---|---|---|
| **Main-d'œuvre (MO) de production** | Salaires bruts chargés des ouvriers de chantier (heures productives × coût horaire chargé) | 641 / 645 |
| **Matériaux (MAT)** | Achats incorporés à l'ouvrage (béton, acier, menuiserie…) | 601 / 602 / 604 |
| **Matériel** | Location de matériel, amortissement / coût d'usage du matériel propre, carburant, petit outillage | 613 (locations) / 615 / 681 |
| **Sous-traitance (ST)** | Travaux confiés à des sous-traitants (souvent en **autoliquidation**) | 611 / 604 |
| **Frais de chantier** | Installation de chantier, base vie, échafaudage, sécurité, gardiennage, nettoyage, évacuation, fluides chantier | 61x / 62x affectés |

> Le **coût horaire de MO chargé** intègre : salaire brut + charges patronales + **cotisation CIBTP (congés payés + intempéries)** + indemnités de déplacement (zones) + éventuelle prime. Le calcul du coût horaire productif tient compte des **heures réellement productives** (déduction des congés, intempéries, jours fériés, formation). À revérifier par entreprise.

### 2.2 Du déboursé sec au prix de vente

```
Déboursé sec (coûts directs)
   + Frais généraux affectés (× coefficient de frais généraux)
   = Prix de revient (coût de revient complet)
   + Marge (bénéfice + aléas)
   = Prix de vente HT
```

#### Coefficient de frais généraux

```
Coefficient FG = Frais généraux annuels / Déboursé sec annuel (ou MO, selon méthode)
```
Les **frais généraux** (frais de structure non affectables directement à un chantier : siège, encadrement non productif, assurances, frais administratifs, amortissements du siège) sont répartis sur les chantiers via un **coefficient**.

#### Coefficient de vente (K)

Le **coefficient de vente K** transforme directement le **déboursé sec** en **prix de vente** :

```
Prix de vente = Déboursé sec × K
K = (1 + taux de frais généraux) × (1 + taux de marge)
```

> Exemple d'école (à revérifier / recalibrer par entreprise) : déboursé sec 100, frais généraux 20 %, marge 12 % → K ≈ 1,20 × 1,12 ≈ **1,344**. Le devis ressort à 134,40 pour 100 de déboursé sec.

## 3. Les comptes de la classe 9 (comptabilité de gestion)

La pratique BTP mobilise les comptes réfléchis et analytiques (classe 9 du PCG, comptabilité de gestion — **facultative**) :

| Compte | Usage |
|---|---|
| **90 — Comptes de reclassement** | Reprise des charges/produits par nature |
| **91 — Comptes de reclassement des charges et produits** | Reclassement préalable à l'affectation |
| **92 — Comptes de coûts (sections / chantiers)** | Affectation des coûts aux **sections analytiques** (chantiers, affaires) |
| **93 — Comptes des coûts de production / coûts de revient** | Calcul du coût de production puis de revient par chantier |
| **94 — Stocks (analytique)** | En-cours et stocks analytiques |
| **96 / 97 — Écarts** | Écarts sur coûts (préétabli vs réel) |

En comptabilité générale, la contrepartie de la production stockée / refacturée interne passe par le **791 « Transferts de charges d'exploitation »** (refacturation interne, frais de chantier transférés) et, pour la production immobilisée, le **72**.

> Beaucoup de PME BTP n'utilisent pas la classe 9 mais une **analytique extra-comptable** (logiciel de gestion de chantier, axe analytique du logiciel comptable). Le principe (ventilation par chantier) reste identique.

## 4. Ventilation des coûts par chantier

Chaque pièce comptable doit porter un **code chantier (code affaire)** pour être ventilée :

| Source | Ventilation |
|---|---|
| **Heures** (pointage / badgeuse / relevés) | MO ventilée par chantier × coût horaire chargé |
| **Factures fournisseurs** (matériaux) | Bon de livraison rattaché au chantier |
| **Sous-traitance** | Facture ST rattachée au chantier (vérifier autoliquidation) |
| **Matériel** | Location affectée ; matériel propre via un **taux d'usage interne** (€/h ou €/jour) refacturé au chantier |
| **Frais de chantier** | Installation, base vie, sécurité affectés au chantier concerné |

## 5. Suivi budget / réalisé et analyse des écarts

### 5.1 Le principe

Pour chaque chantier, on confronte en permanence :

| Élément | Définition |
|---|---|
| **Déboursé d'étude (budget)** | Déboursé sec prévu au moment du devis / marché |
| **Déboursé constaté (réalisé)** | Coûts réellement engagés à date |
| **Reste à dépenser (RAD)** | Estimation des coûts restant à engager pour terminer |
| **Coût total prévisionnel à terminaison** | Déboursé constaté + RAD |
| **Marge prévisionnelle à terminaison** | Prix de vente du marché − coût total prévisionnel à terminaison |

### 5.2 Décomposition des écarts

```
Écart total = Réalisé − Budget
            = Écart de quantité (heures / matériaux consommés vs prévus)
            + Écart de prix / coût (coût unitaire réel vs prévu)
```

| Type d'écart | Exemple BTP |
|---|---|
| **Écart sur MO** | Heures réelles > heures budgétées (sous-productivité, intempéries, reprises) ; coût horaire réel ≠ prévu |
| **Écart sur matériaux** | Hausse des prix (acier, énergie) ; surconsommation / casse / vol |
| **Écart sur sous-traitance** | Avenants ST, travaux supplémentaires |
| **Écart sur frais de chantier** | Allongement du délai → base vie / grue plus longtemps |

> Un **écart défavorable récurrent** signale soit un **devis sous-estimé**, soit une **dérive d'exécution**. Si le coût total prévisionnel à terminaison **dépasse** le prix du marché → **perte à terminaison** à provisionner immédiatement (PCG art. 380-3, compte **1516**).

## 6. Articulation avec la marge et la reconnaissance du revenu

- L'**avancement par les coûts** (méthode dominante en BTP) = déboursé constaté / coût total prévisionnel à terminaison. Il s'appuie **directement** sur l'analytique de chantier.
- La **marge à comptabiliser** à la clôture = % avancement × marge prévisionnelle à terminaison (si bénéficiaire) — voir corpus *reconnaissance_revenu_avancement*.
- Garde-fou : ne pas inclure dans les coûts engagés les **approvisionnements stockés non encore posés** (ils gonflent artificiellement l'avancement).

## 7. Tableau de bord chantier (modèle)

| Chantier | Marché HT | Déboursé étude | Déboursé constaté | RAD | Coût total prév. | Marge prév. | % avanct (coûts) | CA reconnu | Alerte |
|---|---|---|---|---|---|---|---|---|---|
| C-001 | 1 200 000 | 950 000 | 520 000 | 440 000 | 960 000 | +240 000 | 54 % | 648 000 | OK |
| C-002 | 800 000 | 650 000 | 500 000 | 360 000 | 860 000 | **−60 000** | — | — | ⚠️ perte à provisionner |

## 8. Points de vigilance et contrôle fiscal

- L'administration, en **vérification de comptabilité** d'une entreprise BTP, demande fréquemment la **comptabilité analytique de chantier** (suivi des coûts, calcul de l'avancement, valorisation des en-cours). Son absence fragilise la justification des en-cours, des FAE/PCA et des provisions pour perte à terminaison.
- Cohérence à maintenir : **heures analytiques ↔ paie / DSN** ; **achats analytiques ↔ comptabilité générale** ; **avancement analytique ↔ produits comptabilisés**.

## 9. Citations à utiliser

- PCG — comptes de la classe 9 (comptabilité de gestion, facultative) ; comptes 791, 72
- PCG art. 380-1 à 380-3 (contrats à long terme — articulation avec l'avancement)
- Doctrine de gestion BTP (FFB / CAPEB / OEC) — déboursé sec, coefficient de vente
- Convention collective Bâtiment + CIBTP (coût horaire chargé)

**Référence à citer :** PCG (classes 6, 7 et 9) + doctrine de gestion BTP. La comptabilité analytique n'est pas une obligation légale (hors cas particuliers) mais un **outil de pilotage** et une **pièce attendue en contrôle fiscal**. Coefficients à revérifier par entreprise.
