# En-cours de production et méthode à l'achèvement — BTP

**Source :** Plan Comptable Général (PCG) — art. 380-1 à 380-3 (contrats à long terme) ; PCG titre III (stocks et en-cours, comptes de classe 3) ; règlement ANC 2014-03 (PCG) et recommandation ANC 2020-01 (contrats à long terme) ; CGI art. 38, 2 bis (rattachement des produits — travaux) ; BOI-BIC-PDSTK (produits et stocks). **Comptes et règles à revérifier à la date de consultation.**

## 1. Position du problème

Pour un contrat de construction pluri-exercices, deux méthodes de reconnaissance du résultat coexistent (PCG art. 380-1) :

- **Méthode à l'avancement** (préférentielle) : CA et résultat reconnus au prorata de l'avancement (voir corpus *reconnaissance_revenu_avancement*).
- **Méthode à l'achèvement** : le **résultat** n'est constaté qu'à l'**achèvement** du contrat ; **avant** l'achèvement, les coûts engagés sont **stockés en en-cours** (et donc neutralisés au résultat via la variation de stock).

Ce corpus détaille la **méthode à l'achèvement** et le **mécanisme des en-cours**.

## 2. La méthode à l'achèvement

### 2.1 Principe

Tant que le contrat n'est pas achevé :

- Les **charges** engagées (MO, matériaux, ST, frais de chantier) sont enregistrées normalement en classe 6.
- Aucune (ou peu de) **vente** n'est constatée au résultat (sauf situations facturées, qui sont alors neutralisées) : les coûts sont **immobilisés en en-cours** (classe 3) via une **production stockée**, de sorte que le **résultat du contrat reste nul** jusqu'à l'achèvement.

À l'**achèvement** (réception) :
- Le CA total est constaté.
- Les en-cours sont **soldés** (déstockés).
- Le **résultat** du contrat apparaît en une fois.

### 2.2 Conditions d'application (PCG art. 380-1)

La méthode à l'achèvement est **admise** lorsque l'entreprise **ne peut pas estimer de façon fiable** le résultat à terminaison, ou par **choix de politique comptable** (à mentionner en annexe et appliquer de façon permanente — PCG art. 121-2). Elle est **plus prudente** mais **moins représentative** de la performance.

### 2.3 Provision pour perte à terminaison : obligatoire même à l'achèvement

⚠️ Même en méthode à l'achèvement, si le **coût total à terminaison** estimé **dépasse** le prix de marché, la **perte totale prévisible** doit être **provisionnée immédiatement** (PCG art. 380-3, compte **1516 « Provisions pour pertes sur contrats »**). La prudence prime sur le report du résultat.

## 3. Les en-cours de production (stocks — classe 3)

### 3.1 Comptes concernés

| Compte | Libellé | Usage BTP |
|---|---|---|
| **33** | En-cours de production de **biens** | Chantiers de production de biens (préfabrication, ouvrages) |
| **34** | En-cours de production de **services** | Chantiers de prestations de travaux / services |
| **35** | Stocks de produits (finis / intermédiaires) | Éléments produits stockés |

> Le choix 33 vs 34 dépend de la qualification de l'opération (production de biens vs prestation de services). Les travaux du BTP sont souvent qualifiés de **prestations de services** → compte **34**. À apprécier au cas par cas.

### 3.2 Comptes de variation (classe 7)

La **variation des en-cours** est enregistrée en produits (classe 7, comptes de production stockée) :

| Compte | Libellé |
|---|---|
| **7133** | Variation des en-cours de production de **biens** |
| **71355** (ou 7134/7135 selon plan) | Variation des en-cours de production de **services** |

> La **production stockée** est un **produit** (crédit) lorsque l'en-cours **augmente**, et une **charge** (débit, variation négative) lorsque l'en-cours **diminue / se solde**. Elle a pour effet de **neutraliser** les charges de la classe 6 tant que le chantier n'est pas achevé.

## 4. Écritures — méthode à l'achèvement

### 4.1 Constitution / augmentation de l'en-cours à la clôture N

On valorise l'en-cours = **coût de production** des travaux exécutés et non encore achevés.

```
34  En-cours de production de services            D   X €
    71355  Variation des en-cours de services         C   X €
```

→ Effet : les coûts de la classe 6 sont compensés par un produit (production stockée) → **résultat du chantier ≈ 0** à la clôture N.

### 4.2 Reprise / solde de l'en-cours à l'achèvement (N+1)

À l'achèvement, l'en-cours de l'exercice précédent est **annulé** (extourne) :

```
71355  Variation des en-cours de services         D   X €
    34  En-cours de production de services            C   X €
```

Et le **CA total** est constaté :

```
4111 / 418  Client                                D   Prix marché HT
    704  Travaux                                       C   Prix marché HT
```

→ Le **résultat** du contrat apparaît à l'achèvement : Prix de marché − coûts totaux.

### 4.3 Acomptes / situations reçus avant achèvement

Les **acomptes** et **situations** facturés avant achèvement ne constituent pas un produit définitif : ils transitent par le **4191 « Avances et acomptes reçus sur commandes »** (ou en produits constatés d'avance selon traitement), pour ne pas anticiper le résultat.

## 5. Valorisation de l'en-cours (coût de production)

L'en-cours est valorisé au **coût de production** (PCG) — et non au prix de vente :

```
Coût de production de l'en-cours =
      Coût des matières et fournitures incorporées
    + Charges directes de production (MO chantier, ST, matériel)
    + Quote-part de charges indirectes de production (frais de chantier, encadrement de production)
```

**Exclus** du coût de production :
- Les **charges administratives** générales (sauf conditions particulières).
- Les **charges financières** (sauf option d'incorporation des coûts d'emprunt pour les cycles longs, sous conditions).
- Les **frais de commercialisation**.
- La **marge** (l'en-cours n'inclut pas de bénéfice — différence fondamentale avec la méthode à l'avancement).

> L'**inventaire de chantier** (relevé physique des travaux exécutés non facturés + approvisionnements sur chantier) est la base de la valorisation. Il s'appuie sur l'analytique de chantier (voir corpus *comptabilite_analytique_chantier*).

## 6. Inventaire de chantier (procédure)

1. **Recenser** les chantiers ouverts à la clôture.
2. Pour chaque chantier, **mesurer l'avancement physique** (relevé contradictoire avec le conducteur de travaux).
3. **Valoriser** les travaux exécutés non encore facturés au **coût de production**.
4. **Distinguer** approvisionnements stockés sur chantier (matériaux livrés non posés) → stock de matières (classe 3, sous-compte matières), à ne pas confondre avec l'en-cours de production.
5. **Rapprocher** des coûts comptabilisés (cohérence analytique ↔ générale).
6. **Documenter** (note d'inventaire par chantier, visa du conducteur de travaux).

## 7. Comparaison achèvement vs avancement

| Critère | Méthode à l'**achèvement** | Méthode à l'**avancement** |
|---|---|---|
| Reconnaissance du résultat | À la réception, en une fois | Au prorata de l'avancement, chaque clôture |
| En-cours valorisé | **Au coût de production** (sans marge) | Pas d'en-cours « bénéficiaire » ; on reconnaît le CA et la marge à l'avancement (compte **418** pour le produit non facturé) |
| Représentativité | Faible (résultat décalé) | Élevée (reflète la performance) |
| Prudence | Plus prudente | Préférentielle PCG, mais exige une estimation fiable |
| Perte à terminaison | **Provisionnée immédiatement** (1516) | **Provisionnée immédiatement** (1516) |
| Annexe | Méthode à mentionner | Méthode à mentionner |

> **Point clé** : dans les **deux** méthodes, la **perte à terminaison** se provisionne immédiatement. La différence porte sur la reconnaissance du **bénéfice** : différée à l'achèvement (achèvement) vs étalée (avancement).

## 8. Aspects fiscaux

- Le **rattachement des produits** des travaux suit l'art. 38, 2 bis du CGI : pour les travaux donnant lieu à réception, la date de rattachement est celle de la **réception** ; à défaut de réception, l'imposition suit l'**avancement**.
- La méthode à l'achèvement est **admise fiscalement** dans les conditions du PCG, sous réserve de la **provision pour perte** et de la **permanence des méthodes**.
- Les **en-cours** figurent à l'actif (variation au compte de résultat) : leur **sous-évaluation** minore le résultat imposable → point de contrôle fiscal classique (FAE/PCA, en-cours).

## 9. Citations à utiliser

- PCG art. 380-1 à 380-3 (contrats à long terme, perte à terminaison)
- PCG — comptes 33, 34, 35 (en-cours et stocks) ; 7133, 71355 (variation des en-cours)
- Règlement ANC 2014-03 ; recommandation ANC 2020-01
- CGI art. 38, 2 bis (rattachement des produits — travaux)
- BOI-BIC-PDSTK (produits, stocks et en-cours)

**Référence à citer :** PCG + ANC + CGI art. 38. Sources : anc.fr + Legifrance + BOFIP. Comptes et règles à revérifier à la date de consultation.
