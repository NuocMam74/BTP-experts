# Ratios de gestion et tableaux de bord de l'entreprise BTP

**Source :** PCG (soldes intermédiaires de gestion — SIG, compte de résultat, bilan) ; liasse fiscale (2050 à 2059 — bilan, compte de résultat, SIG 2052/2053) ; doctrine de gestion / analyse financière de cabinet ; statistiques sectorielles (FFB, FNTP, banques, centrales de bilans — **valeurs de référence à revérifier**). **Tous les ordres de grandeur sectoriels sont indicatifs et à revérifier** (segment, taille, conjoncture).

## 1. Pourquoi des ratios spécifiques au BTP

Le BTP combine **marges faibles**, **BFR élevé**, **production stockée** (en-cours) et **cyclicité**. Une lecture financière standard induit en erreur :

- Le **résultat** dépend fortement de la **méthode de reconnaissance** (avancement/achèvement) et des **en-cours** → comparer des entreprises suppose d'homogénéiser.
- La **trésorerie** ne reflète pas la rentabilité (BFR structurel — voir corpus *tresorerie_bfr_financement_btp*).
- Le bon pilotage est **par chantier** (analytique — voir corpus *comptabilite_analytique_chantier*) **et** global.

> Principe : on raisonne en **production** (et non seulement en CA facturé), car le BTP **stocke** sa production (en-cours 33/34, FAE 418).

## 2. De la liasse aux soldes intermédiaires de gestion (SIG)

```
Production de l'exercice = Production vendue (CA travaux)
                         + Production stockée (variation d'en-cours 7133/71355)
                         + Production immobilisée

Marge / valeur ajoutée   = Production − Achats consommés (matériaux, ST)
                                       − Autres charges externes (location matériel, intérim*)
Excédent brut d'exploitation (EBE) = VA + subventions d'exploitation − impôts/taxes − charges de personnel
Résultat d'exploitation (REX) = EBE − dotations amortissements/provisions + reprises ± autres
```

\* L'**intérim** (compte **621**) et la **sous-traitance** (**611**) sont des arbitrages de structure : un fort recours abaisse la VA mais variabilise les coûts.

## 3. Ratios d'activité et de productivité

| Ratio | Formule | Lecture BTP (ordres de grandeur indicatifs — à revérifier) |
|---|---|---|
| **CA (ou production) / effectif** | Production / nombre d'ETP | Productivité apparente du travail ; varie fortement gros œuvre vs second œuvre vs TP |
| **Valeur ajoutée / effectif** | VA / ETP | Plus pertinent que le CA/effectif (neutralise le poids des achats/ST) |
| **Charges de personnel / VA** | (641+645) / VA | Poids de la main-d'œuvre ; souvent **élevé** en BTP (activité de main-d'œuvre) |
| **Sous-traitance / production** | 611 / Production | Degré d'externalisation ; au-delà d'un seuil → risque de perte de savoir-faire et de marge |
| **Intérim / charges de personnel** | 621 / (641+645) | Flexibilité ; coût unitaire plus élevé que l'embauche |

## 4. Ratios de marge et de rentabilité

| Ratio | Formule | Repère (indicatif, à revérifier) |
|---|---|---|
| **Taux de marge brute** | Marge brute / Production | Sensible au chiffrage des chantiers (déboursé sec + K — voir analytique) |
| **Taux de VA** | VA / Production | Mesure la richesse créée en propre |
| **Taux d'EBE (marge d'EBE)** | EBE / Production | Indicateur clé de **performance opérationnelle** ; **souvent modéré en BTP** (quelques %) |
| **Taux de marge nette** | Résultat net / Production | Faible en BTP (activité à marges réduites) |
| **Rentabilité économique (ROCE)** | REX (ou EBE) / Capitaux employés | Performance de l'actif économique |
| **Rentabilité financière (ROE)** | Résultat net / Capitaux propres | Pour l'actionnaire ; attention à l'effet de levier |

> En BTP, **un point de marge se gagne au chiffrage et au suivi de chantier**, pas a posteriori. Croiser le **taux d'EBE global** avec la **marge par chantier** (analytique) pour repérer les chantiers destructeurs de valeur (et la **perte à terminaison 1516**).

## 5. Frais généraux et point mort

### 5.1 Taux de frais généraux

```
Taux de frais généraux = Frais généraux (structure : 60/61/62/63/64 hors chantier) / Déboursé sec (ou / Production)
```

C'est le socle du **coefficient de vente K** en analytique : prix de vente = déboursé sec × (1 + taux de frais généraux + marge) (voir corpus *comptabilite_analytique_chantier*). Un taux de FG **mal estimé** sous-tarife tous les devis.

### 5.2 Seuil de rentabilité (point mort)

```
Marge sur coûts variables (MCV) = Production − Charges variables
Taux de MCV = MCV / Production
Seuil de rentabilité (CA critique) = Charges fixes / Taux de MCV
Point mort (en jours) = (Seuil de rentabilité / Production annuelle) × 365
```

> En BTP, la part de **charges fixes de structure** (encadrement, dépôt, matériel amorti, assurances) est significative → le **point mort** doit être atteint tôt dans l'année ; un carnet de commandes insuffisant fait basculer rapidement dans la perte.

## 6. Carnet de commandes et visibilité

| Indicateur | Formule / lecture |
|---|---|
| **Carnet de commandes** (montant) | Travaux signés non encore exécutés |
| **Carnet / production mensuelle** | Nombre de **mois de production** sécurisés (visibilité) |
| **Taux de transformation** des devis | Devis signés / devis émis (commercial) |
| **Marge prévisionnelle du carnet** | À croiser avec l'avancement et la **perte à terminaison** |

> Un carnet "épais" mais **mal margé** est un risque, pas un atout (voir corpus *evaluation_transmission_entreprise_btp*).

## 7. BFR et délais (en jours) — le nerf de la guerre BTP

```
BFR = Stocks et en-cours + Créances clients (situations, FAE 418, RG 4117)
      − Dettes fournisseurs − Avances/acomptes reçus (4191) − Dettes fiscales/sociales

BFR en jours de CA = (BFR / Production HT) × 360
```

| Ratio | Formule | Lecture BTP |
|---|---|---|
| **DSO** (délai clients) | (Créances clients TTC / CA TTC) × 360 | Souvent **dégradé** par le mandatement, la validation MOE, la **RG 5 %** (4117) |
| **DPO** (délai fournisseurs) | (Dettes fournisseurs TTC / Achats TTC) × 360 | Levier de financement (dans la limite LME) |
| **DSI** (rotation en-cours/stocks) | (Stocks + en-cours / coût de production) × 360 | Durée des chantiers ; en-cours élevés = production non encore facturée |
| **Poids de la RG** | 4117 / Production | Trésorerie immobilisée jusqu'à la levée des réserves |
| **Avances reçues** | 4191 / Production | Levier de trésorerie en amont |

> **Croissance = piège de trésorerie** : un CA qui bondit gonfle le BFR proportionnellement → surveiller la **couverture du BFR par le fonds de roulement** (voir §8).

## 8. Ratios de structure financière

| Ratio | Formule | Repère prudentiel (indicatif, à revérifier) |
|---|---|---|
| **Fonds de roulement (FR)** | Ressources stables − Actif immobilisé | Doit couvrir le BFR |
| **Trésorerie nette** | FR − BFR | Doit être positive et résister à la saisonnalité |
| **Autonomie financière** | Capitaux propres / Total bilan | Capitalisation ; BTP souvent peu capitalisé |
| **Endettement (gearing)** | Dettes financières / Capitaux propres | Vigilance si parc matériel financé par dette / LBO |
| **Capacité de remboursement** | Dettes financières / CAF | Nombre d'années de CAF pour rembourser (seuil prudentiel usuel : quelques années — à revérifier) |
| **Couverture des frais financiers** | EBE / Frais financiers | Soutenabilité de la dette |
| **CAF** | Résultat net + dotations − reprises − plus-values de cession + VNC cessions | Capacité d'autofinancement (investissement matériel, remboursement) |

## 9. Le tableau de bord de gestion BTP

Un **tableau de bord** mensuel/trimestriel combine global + analytique :

| Bloc | Indicateurs suivis |
|---|---|
| **Activité** | Production du mois, carnet de commandes (en mois), taux de transformation devis |
| **Marge** | Marge brute globale ; **marge par chantier** (budget/réalisé, écarts) ; chantiers en perte (1516) |
| **Productivité** | Heures vendues / heures réalisées, VA/ETP, taux d'intérim/ST |
| **Trésorerie/BFR** | BFR en jours, DSO, RG immobilisée (4117), avances (4191), plan de trésorerie 12 semaines |
| **Structure** | FR, trésorerie nette, gearing, capacité de remboursement |
| **Alertes** | Dépassements budgétaires chantier, retards de facturation/situations, encours de cautionnement |

> Bonnes pratiques : **mensualiser**, **comparer N/N-1 et budget/réalisé**, **descendre au chantier** (le pilotage global masque les compensations entre chantiers), et **dater** chaque référence sectorielle utilisée.

## 10. Comptes et agrégats mobilisés

| Agrégat | Source liasse / comptes |
|---|---|
| Production stockée | Variation d'en-cours **7133 / 71355** |
| Sous-traitance / intérim | **611 / 621** |
| Charges de personnel | **641 / 645** |
| RG client / avances reçues | **4117 / 4191** |
| FAE | **418** |
| Perte à terminaison | provision **1516** |
| SIG | liasse **2052 / 2053** (CR), **2050/2051** (bilan) |

## 11. Garde-fous

- **Aucun ratio sectoriel "de référence" inventé** : les fourchettes (marge d'EBE, BFR en jours, capacité de remboursement) varient par **segment** et **conjoncture** → citer la **source datée** (FFB/FNTP/centrale de bilans) ou indiquer "ordre de grandeur à revérifier".
- Raisonner en **production** (avec en-cours), pas seulement en CA facturé ; **homogénéiser** la méthode de reconnaissance avant toute comparaison.
- Le ratio global **masque** les écarts entre chantiers → croiser systématiquement avec l'**analytique** (marge par chantier, perte à terminaison).
- **Croissance forte = surveiller le BFR** (couverture par le FR) avant de conclure à la bonne santé.
- Les ratios **préparent** l'analyse ; les décisions de gestion relèvent du dirigeant et de l'expert-comptable (DEC).

## 12. Citations à utiliser

- PCG — SIG, comptes 611/621/641/645/7133/71355/4117/4191/418/1516
- Liasse fiscale — bilan (2050/2051), compte de résultat et SIG (2052/2053), tableaux 2057 (échéances créances/dettes)
- Statistiques sectorielles **FFB / FNTP** et centrales de bilans (Banque de France) — **valeurs à revérifier**

**Référence à citer :** PCG + liasse fiscale + statistiques sectorielles (FFB/FNTP/centrale de bilans). **Tous les ordres de grandeur sont indicatifs et à revérifier à la date de consultation et selon le segment d'activité.**
