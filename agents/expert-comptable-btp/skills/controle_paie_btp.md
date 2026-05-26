# Skill — Contrôler la paie BTP

L'utilisateur te transmet des **bulletins de paie**, un **livre de paie** ou une **DSN** d'entreprise BTP (bâtiment ou travaux publics). Tu dois vérifier les **spécificités sectorielles** : convention collective BTP, indemnités de petits déplacements, congés payés via caisse CIBTP, intempéries, indemnité de panier, primes spécifiques.

## 1. Documents attendus

- **Bulletins de paie** d'un ou plusieurs salariés
- **DSN mensuelles** (déclaration sociale nominative)
- **Contrat de travail** + convention collective applicable (Ouvriers / ETAM / Cadres)
- **Convention collective nationale** : code IDCC selon catégorie :
  - **IDCC 1596** : Ouvriers du Bâtiment (entreprises ≤ 10 salariés)
  - **IDCC 1597** : Ouvriers du Bâtiment (entreprises > 10 salariés)
  - **IDCC 2609** : ETAM du Bâtiment
  - **IDCC 2420** : Cadres du Bâtiment
  - **IDCC 1702** : Ouvriers TP
  - **IDCC 2614** : ETAM TP
  - **IDCC 3212** : Cadres TP
- **Grille de salaire** conventionnelle en vigueur
- **Tableaux des zones** de déplacement (1 à 5 selon distance)
- **Affectation chantier** des salariés (pour calcul indemnités déplacement)
- **Caisse CIBTP** affiliée (Congés Intempéries BTP)
- **Plan de roulement** congés payés

Si pièces partielles : demande
1. Bâtiment (BAT) ou Travaux publics (TP) ?
2. Effectif (≤ 10 ou > 10) — détermine IDCC ouvriers BAT ?
3. Région d'implantation (les zones de déplacement et certaines grilles varient régionalement) ?
4. Caisse CIBTP affiliée (Île-de-France, Sud-Est, Grand Nord-Ouest, etc.) ?
5. Période concernée (les valeurs évoluent annuellement) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("convention collective bâtiment IDCC 1596 1597 ouvriers")`
- `rag_search("convention collective ETAM bâtiment IDCC 2609")`
- `rag_search("convention collective cadres bâtiment IDCC 2420")`
- `rag_search("convention collective TP IDCC 1702 ouvriers")`
- `rag_search("indemnités petits déplacements BTP zone 1 à 5")` — barème actualisé
- `rag_search("CIBTP congés payés cotisations BTP")`
- `rag_search("intempéries BTP indemnisation caisse")`
- `rag_search("code du travail durée du travail BTP heures supplémentaires")`

## 3. Spécificités BTP de la paie

### A — Cotisation supplémentaire CIBTP (Congés Intempéries BTP)

Les entreprises BTP **cotisent** à une **caisse de congés payés** (CIBTP). Spécificité française unique aux secteurs BTP, transport, dockers et spectacle.

- Le salarié **n'a pas droit aux congés payés** directement par l'employeur — c'est la caisse CIBTP qui les **lui paye**
- L'employeur **cotise** mensuellement sur la base des **salaires bruts** (taux variable selon caisse régionale, généralement **20 % du brut**)
- Le salarié, lors de sa **prise de congés**, demande l'indemnité auprès de la caisse CIBTP
- Caisse CIBTP **également** : congés intempéries en BTP gros œuvre

⚠️ Points de vigilance :
- Sur le **bulletin de paie** : pas de poste "congés payés" payé par l'employeur (sauf indemnité compensatrice fin de contrat)
- La **DSN** déclare bien la cotisation CIBTP
- En cas de **rupture du contrat**, indemnité compensatrice de congés payés est **demandée à la caisse** par le salarié (l'employeur lui remet un certificat de travail à transmettre)

### B — Indemnités de petits déplacements

Pour les **ouvriers du Bâtiment** travaillant sur chantier loin de l'entreprise :

| Indemnité | Définition | Régime |
|---|---|---|
| **Indemnité de trajet** | Compensation du temps de trajet entre entreprise/domicile et chantier | Non soumise à cotisations dans les limites du barème ACOSS |
| **Indemnité de transport** | Frais de transport vers chantier | Idem |
| **Indemnité de repas (panier)** | Repas pris hors entreprise | Non soumise dans la limite du barème URSSAF (env. 10 €/jour 2025) |

**Zones de déplacement** (1 à 5) :
| Zone | Distance siège - chantier | Indemnités cumulées indicatives |
|---|---|---|
| 1A / 1B | 0 à 10 km | Faible |
| 2 | 10 à 20 km | Modérée |
| 3 | 20 à 30 km | Plus élevée |
| 4 | 30 à 40 km | Élevée |
| 5 | 40 à 50 km | Très élevée |
| > 50 km | Grands déplacements | Régime différent (logement, etc.) |

⚠️ Le **barème indemnités** est défini par la **convention régionale** (par exemple barèmes mis à jour annuellement par les fédérations régionales FFB).

⚠️ Doivent être **chiffrées et apparaître sur le bulletin de paie**.

### C — Grandes déplacements

Si **distance > 50 km** ou **durée séjour > 24 h** :
- **Indemnité grand déplacement** : forfait hébergement + repas
- Régime fiscal et social spécifique (limites URSSAF actualisées annuellement)
- Si **logement fourni** par l'entreprise : indemnité réduite (panier seul)

### D — Heures supplémentaires et durée du travail

**BTP** :
- Durée légale **35 h/semaine** (code du travail) mais nombreuses entreprises BTP en **38 h ou 39 h/semaine** par accord d'entreprise ou convention collective
- Heures supplémentaires majorées **+ 25 %** (heures 36 à 43) puis **+ 50 %** (au-delà)
- Possibilité **annualisation** (= modulation du temps de travail, dépassements compensés)
- **Repos compensateur obligatoire** au-delà de 41 h en moyenne sur 12 semaines
- **Contingent annuel** d'heures supplémentaires : 220 h (conventionnel BTP, peut être différent par accord)

### E — Intempéries

Les **ouvriers du Bâtiment** sont indemnisés en cas d'**arrêt pour intempérie** :
- Indemnisation **par la caisse CIBTP** (déclaration par employeur)
- Conditions : intempéries reconnues, durée minimum, présence sur chantier
- Pas de jour de carence
- Calcul : **75 %** du salaire de base (depuis 2024)

### F — Prime de transport (loi 2022)

Différente de l'indemnité kilométrique :
- **Prime forfaitaire** versée mensuellement (jusqu'à 400 €/an exonérés en 2024-2025) pour transports personnels
- **Cumul** possible avec abonnement transport public (jusqu'à 700 €/an pour le cumul total exonéré)

### G — Salaire minimum conventionnel et grille

| Niveau | Position | Salaire mini horaire 2025 (indicatif) |
|---|---|---|
| Ouvriers BAT | Niveau I (manœuvre) | 12,15 €/h |
| Ouvriers BAT | Niveau II (compagnon) | 12,75 €/h |
| Ouvriers BAT | Niveau III (compagnon professionnel) | 13,50 €/h |
| Ouvriers BAT | Niveau IV (Maître ouvrier) | 14,50 €/h |
| ETAM | Niveau B (technicien débutant) | 1 950 € brut/mois |
| ETAM | Niveau E (technicien confirmé) | 2 600 € brut/mois |
| Cadres | Position A | 35 000 € brut/an (forfait jours possible) |

⚠️ Les **grilles** sont **régionales** et **actualisées annuellement** : utiliser `rag_search` pour les valeurs en vigueur.

## 4. Procédure de contrôle

### Étape 1 — Identification du régime applicable
- Bâtiment (BAT) ou Travaux publics (TP) ?
- Effectif (pour IDCC ouvriers BAT 1596 ou 1597) ?
- Catégorie professionnelle (Ouvrier / ETAM / Cadre) ?
- Caisse CIBTP régionale (déterminée par siège ou résidence salarié selon caisse) ?

### Étape 2 — Vérification du salaire de base
- Coefficient hiérarchique cohérent avec poste réel ?
- Taux horaire ≥ **minimum conventionnel** ?
- Taux horaire ≥ **SMIC** (12,03 € brut/h au 01/01/2025) ?

### Étape 3 — Vérification des indemnités BTP
- **Indemnités de petits déplacements** correctement calculées (zone, jours travaillés) ?
- **Indemnités de repas / panier** appliquées ?
- **Prime de transport** (si entreprise > 11 salariés ou volontaire) ?
- **Indemnités CSE** ou avantages comparables ?

### Étape 4 — Vérification des cotisations sociales
- **CIBTP** correctement déclarée (taux régional) ?
- **PROBTP** (mutuelle, prévoyance, retraite supplémentaire) : taux et assiettes ?
- **Formation professionnelle** (FAFCEA ouvriers BAT, OPPBTP) ?
- **OPPBTP** : 0,11 % de la masse salariale brute, prévention BTP ?
- **Caisse de retraite complémentaire AGIRC-ARRCO** (commune à toutes branches mais souvent via ProBTP)

### Étape 5 — Vérification heures supplémentaires
- Décompte correct (35 h, 36-43 h à +25 %, > 43 h à +50 %) ?
- Si **annualisation** : décompte annuel cohérent ?
- **Repos compensateur** comptabilisé ?
- **Heures de nuit, dimanche, jours fériés** : majorations spécifiques ?

### Étape 6 — Vérification congés payés
- Pas de poste "congés payés" payé par l'employeur (sauf solde de tout compte) ?
- Cotisation **CIBTP congés** déclarée ?
- En cas de rupture : **certificat de travail** mentionne droits acquis vs caisse ?

### Étape 7 — Vérification des éléments de fin de paie
- **Cotisations PROBTP retraite complémentaire** : taux corrects ?
- **Mutuelle santé entreprise** (obligation légale 2016) ?
- **Prévoyance BTP** : taux conventionnel ?
- **Versement transport** (territoires concernés) ?
- **Taxe d'apprentissage**, contribution unique formation professionnelle ?

### Étape 8 — Vérification DSN
- Tous les **salariés** déclarés ?
- Toutes les **rubriques BTP** (CIBTP, OPPBTP, PROBTP) présentes ?
- **Cohérence** brut DSN vs total bulletins ?
- **Cohérence** prélèvement à la source (PAS) ?

## 5. Restitution structurée

```
## Contrôle paie BTP — [Période ou salarié(s)]

### Identification
- **Entreprise** : [nom + SIRET]
- **Effectif** : [N salariés]
- **Branche** : BAT / TP
- **IDCC applicable** : [...]
- **Caisse CIBTP régionale** : [...]
- **Période contrôlée** : [MM/AAAA ou plage]

### Bulletins contrôlés
[Liste salariés ou échantillon]

### Salaire de base

| Salarié | Cat. | Coef. | Taux horaire | Min. conv. | Conformité |
|---|---|---|---|---|---|
| MARTIN | OUV-N3 | 230 | 13,80 € | 13,50 € | ✅ |
| DUPONT | ETAM-D | 285 | 16,50 € | 16,20 € | ✅ |

### Indemnités BTP

| Salarié | Zone | Indemnité trajet | Indemnité transport | Panier | Total mois | Conformité |
|---|---|---|---|---|---|---|
| MARTIN | 3 | 4,50 €/j | 6,20 €/j | 10,90 €/j | 462,00 € | ✅ |

### Heures supplémentaires

| Salarié | H normales | HS +25 % | HS +50 % | Conformité |
|---|---|---|---|---|
| MARTIN | 151,67 | 8,67 | 0 | ✅ |

### Cotisations spécifiques BTP

| Cotisation | Taux constaté | Taux attendu | Conformité |
|---|---|---|---|
| CIBTP congés | 20,30 % | [taux caisse] | ✅ |
| OPPBTP | 0,11 % | 0,11 % | ✅ |
| PROBTP prévoyance | 1,38 % | 1,38 % | ✅ |
| Versement transport | [%] | [si applicable] | ✅ / N.A. |

### Points d'attention

1. [Ex : salarié X — taux horaire 12,75 € pour un compagnon professionnel = en-dessous du minimum conventionnel niveau III BAT (13,50 €) → régularisation]
2. [Ex : indemnité de panier non versée alors que travail hors entreprise → à appliquer rétroactivement (5 ans LPF)]
3. [Ex : 12 heures supplémentaires non majorées → recalcul + bulletin rectificatif]
4. [Ex : CIBTP non déclarée en DSN → bloquant, rattrapage + pénalités]
5. [Ex : mutuelle santé entreprise absente pour salarié Y embauché 2024 → obligation depuis 2016]

### Synthèse
- **Conformité globale** : ✅ / ⚠️ / ❌
- **Points à régulariser** : N items
- **Risque prud'hommes / contrôle URSSAF** : faible / modéré / élevé

### Suites recommandées
- Bulletin rectificatif (mois)
- Avenant contrat de travail (si modification durable)
- Régularisation cotisations CIBTP / PROBTP
- Déclaration DSN rectificative
- Information du salarié
```

## 6. Garde-fous spécifiques

- La paie BTP est **techniquement complexe** : indemnités multiples, caisse CIBTP, intempéries, conventions régionales. **Ne tente jamais une réponse générique** — adapter à la **convention régionale** précise et l'**année** en cours.
- Les **barèmes** (indemnités, minimums conventionnels, plafonds URSSAF) **évoluent annuellement** : utiliser `rag_search` pour les valeurs en vigueur, ne pas citer de mémoire.
- **Caisse CIBTP** : son omission est un **manquement social grave** (URSSAF) — cotisations à régulariser sur **3 ans** (prescription) + majorations.
- **Heures supplémentaires non payées** : prescription **3 ans** prud'homales (art. L.3245-1 CT). Risque financier important si carence répétée.
- **Mutuelle santé entreprise obligatoire** (ANI 2013, art. L.911-7 CSS) — sauf cas de dispense limitatifs.
- Pour les **gros déplacements** (chantiers > 50 km), vérifier que les **logements** et **frais** sont correctement remboursés / exonérés (limites URSSAF actualisées).
- Pour les **apprentis et contrats de professionnalisation** : barèmes spécifiques (% du SMIC ou minimum conventionnel selon âge et année formation).
- Pour les **travailleurs détachés** (étrangers UE) : règles **transposition directive 96/71** + **SIPSI** (déclaration préalable détachement) — **vérifier**.
- Pour les **forfaits jours** des cadres : convention collective doit le **permettre** (CN cadres BAT 218 jours/an max).
- En cas de **contrôle URSSAF** annoncé : préparer **dossier paie** avec tous les bulletins, livre de paie, DSN, attestations CIBTP, justificatifs indemnités. Délai de redressement : **3 ans** + année en cours.
- Tu **n'engages pas** la responsabilité de l'expert-comptable utilisateur — tu fournis une **analyse critique** qu'il valide.

## 7. Suites logiques à proposer

- Vérification d'un **échantillon** plus large de bulletins en cas de constat d'anomalie systémique
- Coordination avec un **avocat en droit social** si litige prud'hommal en cours ou imminent
- Audit **interne paie BTP** annuel pour anticiper les contrôles URSSAF
- Mise à jour du **paramétrage logiciel paie** (rubriques CIBTP, PROBTP, OPPBTP, zones de déplacement) selon évolutions conventionnelles
- Formation des **collaborateurs paie** sur les spécificités BTP (les éditeurs logiciels et la FFB proposent des formations)
- Régularisation des **DSN** sur la période de prescription (3 ans)
- Pour les **groupes** : politique standardisée paie + harmonisation des rubriques entre filiales BAT et TP
- Skill `reconnaissance_revenu_avancement` pour intégrer correctement la **MO chantier** dans les coûts engagés
- Vérification de l'**affiliation caisse CIBTP** dès l'embauche du 1er salarié BTP
