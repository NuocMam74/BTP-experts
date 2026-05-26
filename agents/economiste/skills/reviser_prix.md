# Skill — Réviser un prix (formule contractuelle + indices BT/TP)

L'utilisateur veut réviser des prix de marché en cours d'exécution (situation de travaux à actualiser, prix d'avenant à révisé).

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **CCAP du marché** — y figurent : la formule de révision, le mois M0, les index applicables, la part fixe (a).
- **Marché signé** (acte d'engagement) — précise le montant initial HT.
- **Situation de travaux** à réviser.
- **Avenant** ou **OS** introduisant des prix nouveaux à intégrer dans la révision.
- **Valeurs INSEE des indices BT / TP** des mois concernés (M0 et M-3).

Si pas de CCAP : pose ces questions :
1. Marché **public** (CCAG-Travaux) ou **privé** (NF P 03-001 / contrat) ?
2. Prix **ferme**, **ferme actualisable** ou **révisable** ?
3. Mois M0 défini au CCAP ?
4. **Formule** de révision (généralement de type `P = P0 × (a + b × BT(n)/BT(0))`) ?
5. **Indices** spécifiques par lot ?
6. **Part fixe (a)** : valeur (souvent 0,125) ?

## 2. Extraction des informations clés

| Information | Où chercher | Si absente |
|---|---|---|
| Type de prix | CCAP — clause "prix" | Demander à l'utilisateur |
| Mois M0 | CCAP — clause "mois zéro" | Souvent = mois précédant signature de l'acte d'engagement |
| Formule complète | CCAP — clause "révision" | Par défaut : `P = P0 × (a + b × BT01(M)/BT01(0))` |
| Part fixe (a) | Formule | Souvent 0,125 |
| Index utilisés | Formule | BT01 (bâtiment) ou TP01 (TP) par défaut |
| Mois d'exécution | Situation de travaux | À renseigner |
| Valeurs index M0 | INSEE | https://www.insee.fr/fr/statistiques/series/103174706 |
| Valeurs index M-3 | INSEE | Mois précédent de 3 mois le mois d'exécution |

## 3. Vérifications normatives (`rag_search` obligatoire)

- `rag_search("CCAG-Travaux article 10 révision actualisation")` — règles publiques
- `rag_search("formule paramétrique révision prix CCAG")` — pour syntaxe
- `rag_search("indices BT TP INSEE série complète")` — pour méthodologie

## 4. Procédure d'analyse

1. **Identifier le régime de prix** :
   - **Ferme** → pas de révision, mais éventuelle actualisation si délai > 3 mois entre M0 et début exécution.
   - **Ferme actualisable** → coefficient d'actualisation calculé au démarrage des travaux uniquement, indices M-3 / M0.
   - **Révisable** → coefficient de révision calculé chaque mois de l'exécution.

2. **Identifier la formule** depuis le CCAP. Forme courante :
   ```
   P = P0 × (a + b1 × I1(M)/I1(0) + b2 × I2(M)/I2(0) + …)
   ```
   avec `a + Σ bi = 1`.

3. **Identifier les valeurs des index** pour les mois concernés :
   - **M0** : mois de référence (établissement des prix)
   - **M-3** : mois précédant de 3 mois le mois d'exécution (CCAG art. 10.4.3)

4. **Calculer le coefficient** en utilisant l'outil **`calculer_revision_prix`**.

5. **Appliquer le coefficient** au prix initial (ou aux situations cumulées).

6. **Vérifier la cohérence** :
   - Coefficient typiquement dans une plage 0,95 à 1,15 sur 12-24 mois (inflation normale)
   - Coefficient anormalement haut (> 1,20) ou bas (< 0,95) → recoupement valeurs INSEE

## 5. Restitution structurée

```
## Révision de prix — [Marché / Lot / Situation n° X]

### Cadre contractuel
- **Marché** : [référence]
- **Régime de prix** : [ferme / ferme actualisable / révisable]
- **Mois M0** : [MM/AAAA]
- **Formule** : P = P0 × (a + b₁ × BT01(M)/BT01(0) + …)
- **Part fixe a** : [valeur]
- **Index** : [BT01 = bâtiment / TP01 = travaux publics / autre]
- **Référence : CCAG-Travaux art. 10**

### Valeurs des index utilisées (INSEE)

| Index | M0 ([MM/AAAA]) | M-3 par rapport à exécution ([MM/AAAA]) | Ratio I(M-3)/I(M0) |
|---|---|---|---|
| BT01 | [valeur] | [valeur] | [...] |

### Coefficient de révision
- **Formule appliquée** : P = P0 × ([a] + [b₁] × [ratio₁] + ...)
- **Coefficient k** : **[valeur arrondie à 4 décimales]**
- **Écart** : [+/- %]

### Application
- **Prix initial HT** : [€]
- **Prix révisé HT** : [€]
- **Écart en euros** : [€]
- **Écart en pourcentage** : [%]

### Vérification de cohérence
- [✅/⚠️] Coefficient dans la plage attendue 0,95 à 1,15
- [✅/❌] Valeurs INSEE confirmées sur insee.fr
- [✅/❌] Mois M-3 correctement déterminé (par défaut)

### Recommandations
- [Action 1 — ex: appliquer ce coefficient sur la situation n° X]
- [Action 2 — ex: provisionner pour les mois à venir]
```

## 6. Outils à utiliser

- **`calculer_revision_prix`** — obligatoirement pour le calcul
- `rag_search` — pour confirmer la formule CCAG ou les indices

## 7. Garde-fous spécifiques

- Tu **ne valides pas** la révision — tu prépares le calcul que le MOE / l'expert-comptable vérifie et signe.
- Pour les **marchés publics**, l'actualisation et la révision sont **automatiques** (CCAG art. 10) — pas besoin de demande explicite de l'entreprise.
- Pour les **marchés privés**, la révision n'est applicable **que si elle est prévue au contrat** — sinon les prix restent fermes.
- Pour les **mois d'exécution** : la **valeur de l'index applicable** est celle du mois **M-3** par défaut (CCAG art. 10.4.3) — pas du mois d'exécution lui-même. Source de confusion fréquente.
- Les **valeurs INSEE** doivent être **confirmées sur insee.fr** — elles sont publiées avec un retard de 2-3 mois.
- Si la formule est **complexe** (plusieurs index avec poids différents), bien vérifier que la somme `a + Σ bi = 1`.

## 8. Suites logiques à proposer

- **Application** du coefficient sur la situation de travaux en cours
- **Provisionnement** de la révision sur les situations à venir (estimation)
- **Lettre de rappel** au MOE si actualisation oubliée sur les premières situations
- **Avenant** si l'évolution des index dépasse 10-15 % et bouleverse l'économie du marché (jurisprudence imprévision)
