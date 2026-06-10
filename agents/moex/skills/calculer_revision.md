# Skill — Calculer une révision de prix (vue MOEX)

L'utilisateur veut appliquer la formule de révision contractuelle sur une situation de travaux ou un prix.

## 1. Documents attendus

- **CCAP** du marché — contient la **formule** exacte, le **mois M0**, les **index** et la **part fixe**
- **Situation de travaux** à réviser
- **OS / Avenant** introduisant des prix nouveaux à intégrer
- **Valeurs INSEE** des indices BT / TP utilisés
- Le **prix initial** du marché ou du poste

Si CCAP non fourni : demande la formule contractuelle exacte avant de calculer.

## 2. Extraction des informations clés

| Information | Source | Si absente |
|---|---|---|
| Régime du prix | CCAP clause "prix" | Demander : ferme / actualisable / révisable |
| Mois M0 | CCAP | Souvent = mois précédant signature acte d'engagement |
| Formule | CCAP — clause "révision" | Forme `P = P0 × (a + Σ b_i × I_i(M)/I_i(0))` |
| Part fixe (a) | Formule | Souvent 0,125 par défaut |
| Index | Formule | BT01 (bâtiment courant), BT45 (gros œuvre béton), TP01 (TP) |
| Mois d'exécution | Situation | Pour calculer M-3 |
| Valeurs INSEE M0 et M-3 | insee.fr/fr/statistiques | À récupérer |

> ⚠️ **Base juridique (à connaître absolument)** : dans le **CCAG-Travaux 2021** (arrêté du 30 mars 2021), il **n'existe pas** d'article unique « 10.3 / 10.4 / 10.5 » fixant la révision/actualisation comme dans l'ancien CCAG 2009 (numérotation **périmée**). En marché public, **la révision et l'actualisation des prix sont entièrement définies par les clauses « prix » du CCAP** (régime du prix, formule, index, mois M0, part fixe, règle du mois d'établissement de l'index), encadrées par le **Code de la commande publique** : **R.2112-13 et s. CCP** (variation des prix : prix ferme, ferme actualisable, révisable) et, pour toute modification ultérieure, **L.2194-1 / R.2194-1 CCP**. **C'est donc le CCAP qui fait foi** — cite-le textuellement, et **ne renvoie pas** à un « article 10.x du CCAG ».

## 3. Vérifications normatives (`rag_search` obligatoire)

- `rag_search("CCAP clause prix révision actualisation formule")` — la formule contractuelle est **dans le CCAP**, pas dans le CCAG
- `rag_search("code commande publique R.2112-13 variation des prix")` — prix ferme / ferme actualisable / révisable
- `rag_search("code commande publique R.2194 L.2194 modification marché")` — pour toute évolution du marché impactant les prix
- `rag_search("NF P 03-001 révision marchés privés")` — pour les marchés privés
- `rag_search("indices BT INSEE liste 1 à 55")` — pour s'assurer du bon index par lot

## 4. Procédure d'analyse

1. **Identifier le régime** :
   - **Ferme** : pas de révision, mais actualisation possible si délai > 3 mois entre M0 et début exécution.
   - **Ferme actualisable** : un seul coefficient appliqué au démarrage.
   - **Révisable** : coefficient recalculé chaque mois.

2. **Identifier la formule** depuis le CCAP. Vérifier que `a + Σ b_i = 1` (à 1 % près).

3. **Récupérer les valeurs INSEE** :
   - **M0** = mois d'établissement des prix (défini au CCAP)
   - **M(exécution)** = mois retenu par la **clause de révision du CCAP** pour l'index courant. La pratique la plus fréquente est le **mois M-3** (index connu et publié) par rapport au mois d'exécution, **mais ce décalage est fixé par le CCAP** — vérifie la clause exacte, ne le présume pas.

4. **Calculer le coefficient** via l'outil **`calculer_revision_prix`**.

5. **Appliquer le coefficient** au prix initial ou à la situation cumulée.

6. **Vérifier la cohérence** :
   - Coefficient typiquement dans 0,95-1,15 sur 12-24 mois (inflation normale)
   - Coefficient anormalement haut/bas → recoupement INSEE

## 5. Restitution structurée

```
## Révision de prix — Situation n° [X] — Marché [...]

### Cadre contractuel
- **Marché** : [référence + public/privé]
- **Régime** : [révisable / ferme actualisable]
- **CCAP — clause "révision"** : citation textuelle
- **Mois M0** : [MM/AAAA]
- **Formule** : P = P0 × ([a] + [b_1] × BT01(M)/BT01(0) + ...)
- **Part fixe a** : [...]
- **Référence** : clause « révision des prix » du **CCAP** [article ...] — encadrée par **R.2112-13 et s. CCP** (variation des prix)

### Valeurs INSEE

| Index | M0 ([MM/AAAA]) | M-3 ([MM/AAAA]) | Ratio M-3/M0 |
|---|---|---|---|
| BT01 | [valeur] | [valeur] | [ratio à 4 décimales] |

### Calcul du coefficient
- Application de la formule : [détail du calcul]
- **Coefficient k** = **[valeur à 4 décimales]**
- **Variation** : [+/- %]

### Application

| Item | Montant initial | Coefficient | Montant révisé |
|---|---|---|---|
| Prix HT poste / situation | [€] | [k] | [€] |
| **Écart HT** | | | **[€]** |

### Recommandations
- [Appliquer ce coefficient sur la situation n° X du [MM/AAAA]]
- [Si situation cumulée comprend des prix de plusieurs mois : décomposer par mois d'exécution et appliquer le coefficient adapté]
- [Provisionner pour les situations à venir]

### Vérification
- [✅/⚠️] Coefficient dans la plage normale
- [✅] Valeurs INSEE confirmées sur insee.fr
```

## 6. Outils à utiliser

- **`calculer_revision_prix`** — pour le calcul détaillé (multi-index supporté)
- `rag_search` — pour confirmer la formule CCAG si doute

## 7. Garde-fous spécifiques

- Tu **n'arbitres pas** le calcul — tu **prépares** la révision que le MOE titulaire **signe** et propose au MOA.
- ⚠️ **Ne cite jamais un « article 10.3 / 10.4 / 10.5 du CCAG-Travaux »** pour la révision : cette numérotation appartient à l'**ancien CCAG 2009 (périmé)**. Dans le **CCAG-Travaux 2021**, la révision/actualisation est définie par la **clause « prix » du CCAP**, dans le cadre des **R.2112-13 et s. CCP** (variation des prix). **C'est le CCAP qui fait foi.**
- Pour les **marchés publics**, l'**actualisation** d'un prix **ferme actualisable** s'applique selon ce que prévoit le **CCAP** (typiquement si le délai entre M0 et le début d'exécution dépasse **3 mois**) — vérifie la clause, ne la présume pas « automatique ».
- Pour les **marchés privés**, vérifier que la **NF P 03-001** ou le **contrat** prévoient la révision — par défaut, prix **fermes**.
- **Décalage de l'index (souvent M-3)** : c'est l'erreur classique. La valeur à utiliser est celle du mois retenu **par la clause du CCAP** (fréquemment M-3 par rapport au mois d'exécution), **pas** le mois d'exécution lui-même.
- **Vérifier la publication INSEE** : les indices BT / TP sont publiés avec **2-3 mois de retard**. Pour des situations très récentes, utiliser l'**index provisoire** puis recalibrer dès publication définitive.
- Tu **rappelles** que **seul le CCAP** fixe la règle du décalage d'index — il n'existe pas de « M-3 par défaut » imposé par le CCAG 2021.

## 8. Suites logiques à proposer

- **Application** sur la situation à mandater
- **Note de calcul** annexée au mandatement
- **Recalibrage** quand les indices INSEE deviennent définitifs
- **Provisionnement** pour les situations à venir
- **Bilan de fin de marché** : différentiel actualisation + révision cumulée vs montant initial
