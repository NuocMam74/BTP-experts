# Skill — Produire un tableau de bord et une analyse de ratios de gestion BTP

L'utilisateur veut un **diagnostic de gestion** d'une entreprise BTP à partir de ses comptes : calculer les **soldes intermédiaires de gestion (SIG)**, les **ratios sectoriels** (activité, marge, productivité, point mort, carnet de commandes, BFR en jours, structure financière) et bâtir un **tableau de bord** de pilotage, en croisant la vue **globale** et la vue **analytique chantier**.

> ⚠️ **Les ordres de grandeur sectoriels sont indicatifs et à revérifier** (segment, taille, conjoncture — sources FFB/FNTP/centrale de bilans). Tu **prépares** l'analyse ; les décisions de gestion relèvent du dirigeant et de l'expert-comptable (DEC). Raisonner en **production** (avec en-cours), pas seulement en CA facturé.

## 1. Documents attendus

- **Liasses fiscales** (2050 à 2059 — bilan, CR, SIG 2052/2053) sur **3 exercices** (pour l'évolution).
- **Balance / grand-livre** (en-cours 33/34, FAE 418, RG 4117, avances 4191, 611/621/641/645).
- **Effectif** (ETP) et **heures** (vendues / réalisées) si disponibles.
- **Carnet de commandes** chiffré + **marges prévisionnelles**.
- **Suivi analytique** par chantier (budget/réalisé), si existant.
- **Échéancier** clients/fournisseurs (pour DSO/DPO).

Si absent, demande :
1. **Production** (CA travaux + variation d'en-cours) et **effectif ETP** ?
2. Recours à la **sous-traitance** (611) et à l'**intérim** (621) ?
3. **Carnet de commandes** (montant, mois de visibilité) ?
4. Méthode de reconnaissance : **avancement** ou **achèvement** ? (homogénéité)
5. Montant de la **RG immobilisée** (4117) et des **avances reçues** (4191) ?

## 2. Référentiels (`rag_search`)

- `rag_search("ratios gestion BTP SIG production EBE marge productivité point mort")` — corpus *ratios_gestion_tableaux_bord_btp*
- `rag_search("BFR en jours DSO DPO retenue de garantie 4117 avances 4191")`
- `rag_search("structure financière fonds de roulement trésorerie nette gearing CAF capacité remboursement")`
- `rag_search("carnet de commandes visibilité marge prévisionnelle BTP")`
- `rag_search("comptabilité analytique chantier déboursé sec coefficient de vente K écarts")` — corpus analytique
- `rag_search("perte à terminaison 1516 en-cours variation 7133 71355")`

## 3. Étape 1 — Reconstituer les SIG (raisonner en production)

```
Production = Production vendue (CA travaux) + Production stockée (var. en-cours 7133/71355) + Production immobilisée
Valeur ajoutée (VA) = Production − Achats consommés (matériaux, ST 611) − Autres charges externes (location, intérim 621)
EBE = VA + subv. exploitation − impôts/taxes − charges de personnel (641/645)
REX = EBE − dotations + reprises ± autres
CAF = Résultat net + dotations − reprises − PV cession + VNC cessions
```

> ⚠️ **Homogénéiser** la méthode de reconnaissance (avancement/achèvement) avant toute comparaison N/N-1 ou sectorielle.

## 4. Étape 2 — Calculer les ratios

### Activité / productivité
- Production / ETP ; **VA / ETP** (plus pertinent) ; charges de personnel / VA ; ST / production ; intérim / charges de personnel.

### Marge / rentabilité
- Taux de marge brute ; taux de VA ; **taux d'EBE** (clé, souvent modéré en BTP) ; marge nette ; **ROCE** ; **ROE**.

### Frais généraux / point mort
```
Taux de frais généraux = FG structure / déboursé sec (base du coefficient K)
Taux de MCV = (Production − charges variables) / Production
Seuil de rentabilité = Charges fixes / Taux de MCV
Point mort (jours) = (Seuil / Production) × 365
```

### Carnet de commandes
- Carnet (€) ; **carnet / production mensuelle = mois de visibilité** ; taux de transformation des devis ; **marge prévisionnelle** (à croiser avec la perte à terminaison 1516).

### BFR et délais
```
BFR = Stocks/en-cours + créances (situations, FAE 418, RG 4117) − dettes fourn. − avances (4191) − dettes fiscales/sociales
BFR en jours = (BFR / Production HT) × 360
DSO = (créances clients TTC / CA TTC) × 360 ; DPO = (dettes fourn. TTC / achats TTC) × 360
```

### Structure financière
- **FR**, **trésorerie nette = FR − BFR**, autonomie financière, **gearing**, **capacité de remboursement = dettes fin. / CAF**, couverture des frais financiers (EBE / frais fin.).

## 5. Étape 3 — Croiser global et analytique

> Le ratio **global masque** les compensations entre chantiers. Croiser systématiquement :
- Marge **par chantier** (budget/réalisé, écarts — coefficient de vente K, déboursé sec).
- Chantiers **en perte** → vérifier la **perte à terminaison (1516)**.
- Heures **vendues vs réalisées** (dérive de productivité).

## 6. Étape 4 — Lire les signaux (interprétation BTP)

| Constat | Interprétation BTP |
|---|---|
| Résultat positif mais **trésorerie négative** | BFR structurel élevé / forte croissance → tension |
| **CA en forte hausse** | BFR gonfle proportionnellement → vérifier couverture par le FR |
| **Taux d'EBE** qui s'érode | Chiffrage insuffisant (taux de FG mal estimé) ou dérive chantier |
| **DSO élevé** | Mandatement lent, RG 5 % immobilisée (4117), situations non validées |
| **Capacité de remboursement** dégradée | Parc matériel sur-financé par dette / LBO trop lourd |
| Carnet épais mais **mal margé** | Risque, pas un atout → perte à terminaison à anticiper |

## 7. Restitution structurée

```
## Tableau de bord de gestion — [Entreprise BTP]

### Réserve de fraîcheur
- Ordres de grandeur sectoriels indicatifs, à revérifier au [date] (source FFB/FNTP/centrale de bilans).

### SIG (N / N-1 / N-2)
| Agrégat | N | N-1 | N-2 |
| Production / VA / EBE / REX / CAF | | | |

### Ratios clés
| Ratio | Valeur | Évolution | Repère sectoriel (à revérifier) |
| Taux d'EBE | | | |
| VA / ETP | | | |
| BFR en jours / DSO / DPO | | | |
| Point mort (jours) | | | |
| Carnet (mois de visibilité) | | | |
| Gearing / capacité de remboursement | | | |

### Croisement analytique
- Chantiers en perte (1516) : [...] ; dérive heures vendues/réalisées : [...]

### Diagnostic & signaux
- [Trésorerie vs résultat ; croissance/BFR ; érosion de marge ; DSO]

### Plan d'action
1. [Réduire DSO / RG (caution GAPD)]
2. [Recadrer le taux de frais généraux / chiffrage]
3. [Piloter les chantiers déficitaires]
4. [Surveiller la couverture du BFR par le FR]

### Garde-fous
- Analyse de gestion ; décisions = dirigeant + DEC. Ordres de grandeur à revérifier.
```

## 8. Livrable (`generer_rapport`)

`generer_rapport({ titre: "Tableau de bord et analyse de ratios — [entreprise]", contenu, format: "xlsx" | "pdf" | "docx", agent: "expert-comptable-btp", metadata: { entité, exercices, date } })`

- **XLSX** : SIG, batterie de ratios (formules ouvertes), graphiques d'évolution, tableau de bord mensuel.
- **PDF/DOCX** : note de diagnostic + signaux + plan d'action.

## 9. Garde-fous spécifiques

- **Aucun ratio sectoriel "de référence" inventé** : citer la **source datée** (FFB/FNTP/centrale de bilans) ou mentionner "ordre de grandeur à revérifier".
- Raisonner en **production** (avec en-cours), **homogénéiser** la méthode de reconnaissance avant comparaison.
- Le **global masque les écarts entre chantiers** → croiser avec l'**analytique** (marge/chantier, perte à terminaison 1516).
- **Croissance forte = surveiller le BFR** (couverture par le FR) avant de conclure à la bonne santé.
- En BTP, **résultat ≠ trésorerie** : ne pas confondre rentabilité et liquidité.
- Tu **prépares** l'analyse ; les décisions de gestion relèvent du dirigeant et de l'expert-comptable (DEC).

## 10. Suites logiques à proposer

- Skill `suivre_analytique_chantier` (descendre la marge au chantier, budget/réalisé, écarts).
- Skill `optimiser_tresorerie_btp` (agir sur le BFR, DSO, RG, financements).
- Skill `valoriser_en_cours` / `reconnaissance_revenu_avancement` (fiabiliser production stockée et FAE).
- Skill `auditer_provisions_btp` (perte à terminaison sur chantiers déficitaires).
- Skill `evaluer_entreprise_btp` (si le diagnostic prépare une cession/transmission).
- Mise en place d'un **tableau de bord mensuel** + **plan de trésorerie glissant** (12 semaines).
