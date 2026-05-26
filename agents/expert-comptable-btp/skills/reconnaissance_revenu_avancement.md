# Skill — Reconnaissance du revenu à l'avancement (contrats de construction)

L'utilisateur doit déterminer comment **reconnaître le chiffre d'affaires et le résultat** d'un contrat de construction pluri-exercices selon la méthode **avancement** ou **achèvement**, conformément au **PCG** (français) et accessoirement à **IFRS 15 / IFRIC 15** pour les groupes consolidés.

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **Marché de travaux** signé (CCAP, acte d'engagement) + avenants
- **DPGF** et **bordereau** du marché
- **Situations de travaux** mensuelles (cumulées HT)
- **Comptes engagés** au titre du chantier (coûts directs : MO, MAT, matériel, sous-traitance ; coûts indirects : encadrement, frais généraux affectés)
- **Budget actualisé** (coût total estimé à terminaison)
- **Procès-verbaux** d'avancement ou de réception
- **Politique comptable** du cabinet ou de l'entreprise (méthode retenue, seuils)

Si pièces manquantes : demande
1. Méthode comptable retenue par l'entité : **avancement** ou **achèvement** ?
2. Référentiel applicable : **PCG français** (comptes individuels) ou **IFRS** (comptes consolidés groupe coté) ?
3. Date d'arrêté (annuel, semestriel, trimestriel) ?
4. Le chantier est-il **bénéficiaire** ou **déficitaire** estimé à terminaison ?
5. Statut administratif : **réception** prononcée ? Levée des réserves ? GPA en cours ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("PCG art. 622-1 622-7 contrats de construction")` — règles comptables françaises
- `rag_search("PCG art. 380-1 méthode à l'avancement")` — texte de référence
- `rag_search("ANC règlement 2014-03 PCG")` — règlement consolidé
- `rag_search("IFRS 15 produits issus des contrats avec les clients")` — référentiel IFRS
- `rag_search("IFRIC 15 contrats de construction de biens immobiliers")` — interprétation
- `rag_search("guide comptable FFB Capeb BTP")` — application sectorielle

## 3. Méthodes de reconnaissance — PCG français

### Méthode à l'**avancement** (recommandée)

Le résultat à l'avancement est **comptabilisé** au prorata des travaux exécutés. C'est la **méthode préférentielle** du PCG (art. 380-1) pour les contrats à long terme dès lors que :
- Le **coût final** peut être estimé avec une **fiabilité raisonnable**
- L'**avancement** peut être mesuré objectivement
- Le **résultat à terminaison** est **bénéficiaire** ou **équilibré** (sinon : provision pour perte à terminaison)

#### Mesure de l'avancement (% d'avancement)

3 méthodes principales :

| Méthode | Formule | Avantages | Limites |
|---|---|---|---|
| **Coûts engagés / coûts totaux estimés** | a = coûts engagés à date / coût total estimé à terminaison | Objective si comptabilité chantier rigoureuse | Sensible aux coûts engagés non productifs (achats anticipés) |
| **Avancement physique** | Mesure terrain (mètres réalisés, ouvrages livrés / total prévu) | Reflète réalité d'exécution | Subjective sur certains lots, à dater par MOE |
| **Jalons techniques** (milestone) | Reconnaissance par étapes contractuelles atteintes | Simple, vérifiable | Granularité grossière, peut décaler les revenus |

### Méthode à l'**achèvement** (admise, dérogatoire)

Le revenu n'est reconnu **qu'à la livraison** ou réception. Méthode autorisée par le PCG si :
- L'entité ne peut **pas estimer fiable** le coût final
- L'entité a fait ce choix de **politique comptable** (à mentionner en annexe)

⚠️ Méthode **plus prudente** mais **moins fidèle** à la performance opérationnelle. À éviter pour les groupes ou cabinets BTP de taille moyenne.

### Provision pour perte à terminaison (obligatoire)

Si le **résultat à terminaison** est **déficitaire**, la **perte totale prévue** doit être constatée **immédiatement** en provision (PCG art. 380-1 §2). Cas typique : chantier dérive en coûts, marché ne couvre plus le coût estimé.

## 4. Méthodes selon **IFRS 15** (groupes consolidés)

IFRS 15 remplace IAS 11 / IAS 18 depuis 2018. Approche **performance obligation** :
1. **Identifier le contrat** (et ses modifications)
2. **Identifier les obligations de performance** distinctes
3. **Déterminer le prix de transaction**
4. **Allouer le prix** aux différentes obligations
5. **Reconnaître le revenu** quand (ou au fur et à mesure) que l'obligation est satisfaite

**Reconnaissance progressive (over time)** si :
- Le client reçoit et consomme les bénéfices au fur et à mesure (services continus)
- Les actifs créés sont **sans usage alternatif** pour l'entité ET l'entité a **droit au paiement** pour les travaux effectués (cas classique des contrats de construction)
- Ou : l'actif a un usage alternatif mais le contrat impose une **performance progressive**

**Reconnaissance ponctuelle (point in time)** sinon, généralement à la livraison.

⚠️ **IFRIC 15** précise pour l'immobilier : si le contrat permet au client de modifier substantiellement le bien (VEFA en cours), reconnaissance **over time**. Si le bien est standard et livré clé en main, reconnaissance **point in time**.

## 5. Écritures comptables (PCG — méthode avancement)

### Schéma classique

À la **clôture**, on compare :
- **Facturation cumulée** (situations émises HT au client) en compte **418** (clients - factures à établir, ou directement 411 si déjà facturé)
- **Produit reconnu à l'avancement** = % avancement × prix marché HT

#### Cas 1 : Facturation < Produit reconnu à l'avancement
→ Constater un **produit à recevoir** : **compte 418** (Clients - Produits non encore facturés) en débit, **compte 70x** (CA) en crédit, pour le delta.

```
418 "Clients - Factures à établir"      D  X €
    70x "Production vendue"                  C  X €
```

#### Cas 2 : Facturation > Produit reconnu à l'avancement
→ Constater un **produit constaté d'avance** : **compte 487** (Produits constatés d'avance) en crédit, pour le delta.

```
70x "Production vendue"                  D  Y €
    487 "Produits constatés d'avance"        C  Y €
```

#### Cas 3 : Acompte reçu du client avant prestation
→ Compte **4191** "Clients - Avances et acomptes reçus sur commande"

```
512 "Banque"                            D  Z €
    4191 "Avances et acomptes reçus"        C  Z €
```

### Provision pour perte à terminaison

```
6816 "Dotation aux provisions pour risques et charges"     D  perte totale prévue
    1572 "Provision pour perte sur contrats"                  C  idem
```

## 6. Procédure de calcul du % d'avancement et du produit reconnu

1. **Coûts cumulés** engagés à la date d'arrêté = ΣCk (factures fournisseurs, paie chantier, frais affectés)
2. **Coût total estimé à terminaison** Ct = budget actualisé (intégrant prévisions d'aléas et imprévus)
3. **% avancement** a = ΣCk / Ct
4. **Produit à reconnaître** = a × Prix marché HT (avenants compris)
5. **Marge prévisionnelle à terminaison** = Prix marché HT – Ct
6. **Marge à comptabiliser à date** = a × Marge prévisionnelle (si bénéficiaire)
7. **Si marge prévisionnelle < 0** : provision intégrale pour perte à terminaison (sans pondération par avancement)
8. **Différentiel facturation/avancement** → 418 (factures à établir) ou 487 (PCA)

## 7. Restitution structurée

```
## Reconnaissance du revenu à l'avancement — [Chantier]

### Contexte
- **Chantier** : [référence + désignation]
- **Marché HT (avenants inclus)** : [€]
- **Date début / fin prévue** : [...]
- **Date d'arrêté comptable** : [JJ/MM/AAAA]
- **Méthode comptable retenue** : Avancement par coûts engagés (PCG art. 380-1)
- **Référentiel** : PCG individuel / IFRS 15 (selon contexte)

### Calcul du pourcentage d'avancement

| Élément | Montant (€ HT) |
|---|---|
| Coûts engagés cumulés à date | [ΣCk] |
| Coût total estimé à terminaison | [Ct] |
| **Pourcentage d'avancement** | **a = ΣCk / Ct = [%]** |

### Produit à reconnaître

| Élément | Montant (€ HT) |
|---|---|
| Prix du marché HT (avec avenants) | [P] |
| Produit reconnu à date = a × P | [a × P] |
| Facturation cumulée (situations émises) | [F] |
| **Différentiel** | [Produit reconnu – F] |

### Écritures comptables proposées

[Si Produit reconnu > Facturation]
```
418 "Clients - Factures à établir"      D  [Δ]
    704 ou 705 "Travaux / Production vendue"  C  [Δ]
```

[Si Facturation > Produit reconnu]
```
704 ou 705                              D  [Δ]
    487 "Produits constatés d'avance"        C  [Δ]
```

### Marge à terminaison
- Marge prévisionnelle totale = P – Ct = [€]
- **Si marge < 0 (perte prévisionnelle)** :
  - Provision pour perte à terminaison à constituer = | marge prévisionnelle | (en intégralité, indépendamment du % d'avancement)
  - Écriture : 6816 D / 1572 C
  - Justification PCG art. 380-1 § 2

### Annexe comptable
- Description du chantier et de la méthode retenue
- Tableau de réconciliation avancement / facturation
- Mention des provisions pour pertes constatées
- Engagement hors bilan : retenue de garantie 5 %

### Cohérence à vérifier
- [✅/⚠️] Coûts engagés tiennent compte des FAE (Factures à recevoir) au compte 408
- [✅/⚠️] Coût total estimé tient compte des avenants signés et notifiés
- [✅/⚠️] Pas de double comptabilisation (avances client 4191 vs facturation 411)
- [✅/⚠️] Retenue de garantie 5 % correctement comptabilisée (compte 4117 RG client)
- [✅/⚠️] Pas de produit à recevoir sur prestations non encore exécutées

### Niveau de confiance
- [Élevé / À valider — la méthode des coûts engagés sous-estime l'avancement si gros achats anticipés / approvisionnements]

### Suites
- Compte 1572 à reprendre l'année suivante si situation améliorée
- Annexe légale à compléter
- Validation par CAC si seuils contrôle légal atteints
```

## 8. Garde-fous spécifiques

- **Méthode des coûts engagés** : peut **biaiser** le % d'avancement si l'entreprise a fait des **achats anticipés** importants (matériel approvisionné mais pas posé). Recommander de **séparer** :
  - **Coûts engagés productifs** (travaux exécutés)
  - **Coûts engagés non productifs** (approvisionnements en stock, à exclure du numérateur)
- Si le marché contient des **réserves contractuelles importantes** ou des **litiges en cours**, **être prudent** sur le coût total estimé à terminaison : provisionner l'aléa.
- Si le chantier est en **dérive** (coût total estimé > prix marché), la **perte intégrale** doit être provisionnée **immédiatement**, indépendamment de l'avancement (PCG art. 380-1 § 2). **Pas de prorata**.
- Pour les **groupes consolidés IFRS** : application **IFRS 15 + IFRIC 15** — analyse plus fine des **performance obligations** (le contrat peut contenir plusieurs obligations distinctes : conception + construction + maintenance).
- Tu **rappelles** que la **méthode** doit être **constante** d'un exercice à l'autre (principe de permanence des méthodes, PCG art. 121-2). Un changement = retraitement rétroactif + mention en annexe.
- Le **CAC** (commissaire aux comptes) **scrute particulièrement** la reconnaissance du revenu à l'avancement (risque d'audit majeur). Documentation et justifications **doivent être robustes** (procès-verbaux, situations validées par MOE, etc.).
- Tu **n'engages pas** la responsabilité de l'expert-comptable utilisateur — tu prépares l'analyse, il valide.
- Pour les **marchés publics**, les **acomptes / situations validées par le MOE** sont une **source fiable** d'avancement physique (mais peuvent différer de l'avancement comptable selon délais d'instruction).

## 9. Suites logiques à proposer

- Skill `controle_situation_travaux` pour cohérence des situations émises et validées
- Mise en place d'un **fichier de suivi chantier** mensuel : coûts engagés / coût budget actualisé / % avancement / produit reconnu / écart cumulé
- Préparation des **annexes comptables** spécifiques BTP (FNAC — note méthodologique sur reconnaissance du revenu)
- Coordination avec le **CAC** dès la phase intérimaire pour valider la méthode
- Pour groupes consolidés : **note de cadrage IFRS 15** à actualiser si nouveau chantier hors normes
- Préparation des **provisions pour aléas** (compte 1518) si chantier complexe
- Skill `controle_paie_btp` pour vérifier la composante MO des coûts engagés
- Vérifier l'application correcte de la **retenue de garantie 5 %** (compte 4117) qui impacte la trésorerie sans impacter le résultat
