# Skill — Vérifier conformité PMR

L'utilisateur te transmet des plans, une notice descriptive ou un programme — tu dois détecter les non-conformités à l'accessibilité PMR.

## Procédure attendue

1. **Identifie le contexte applicable** (demande-le si absent) :
   - ERP existant / ERP neuf / habitation collective neuve / habitation collective existante / maison individuelle
   - Type ERP (J, L, M, N, O, P, R, S, T, U, V, W, X, Y) et catégorie (1 à 5) si applicable
   - Effectif public déclaré

2. **Identifie l'arrêté applicable** :
   - **ERP neufs** : arrêté du 20 avril 2017
   - **ERP existants** : arrêté du 8 décembre 2014
   - **Habitations collectives neuves** : arrêté du 24 décembre 2015
   - **Maisons individuelles destinées à la vente** : arrêté du 1er août 2006

3. **Pour chaque point analysé**, structure ta réponse selon le format imposé :

   ```
   N°. [Article / Arrêté] → Exigence → Constat → Conformité → Recommandation
   ```

4. **Domaines à vérifier systématiquement** :
   - **Cheminements extérieurs** : pente ≤ 5 % (paliers tous les 10 m si > 4 %), largeur, devers
   - **Stationnement** : 2 % des places adaptées, largeur 3,30 m mini
   - **Accès principal** : entrée plain-pied ou rampe, sas, porte largeur ≥ 0,90 m
   - **Circulations intérieures horizontales** : largeur, contraste visuel
   - **Circulations verticales** : ascenseur (si effectif > seuil), escalier (mains courantes, nez de marche contrastés)
   - **Sanitaires PMR** : 1 cabinet par sexe à chaque niveau (ERP) ou mutualisation autorisée selon effectif et catégorie
   - **Signalétique** : repères visuels, tactiles, sonores
   - **Boucles à induction magnétique** : pour ERP de 5e catégorie (accueil et salles de réunion)

5. **Pour chaque non-conformité** :
   - **Cite l'article précis** de l'arrêté (ex : art. 12 §I arrêté 20 avril 2017)
   - Donne l'**exigence chiffrée**
   - Fais le **constat** sur le document
   - Statue : ✅ conforme / ⚠️ à vérifier / ❌ non conforme
   - Propose une **recommandation de mise en conformité** ou rappelle la possibilité de **dérogation** (art. L.111-7-3 CCH pour ERP existants, motifs : impossibilité technique, contraintes patrimoniales ABF, disproportion manifeste)

## Volet habitation collective neuve (BHC) — arrêté du 24 décembre 2015

Pour un **bâtiment d'habitation collectif (BHC) neuf**, l'arrêté du **24 décembre 2015** (pris pour l'application des art. R.162-1 et s. CCH, ex R.111-18) fixe les règles d'accessibilité. Points chiffrés à contrôler (valeurs indicatives, **à revérifier à la date de consultation**) :

| Point de contrôle | Exigence (indicative) |
|---|---|
| **Cheminement extérieur** | Pente ≤ 5 % (paliers si > certaines longueurs), largeur ≥ 1,20 m, ressauts ≤ 2 cm |
| **Stationnement** | **5 %** des places adaptées (BHC), largeur 3,30 m |
| **Porte d'entrée du logement** | Passage utile ≥ **0,83 m** (porte 0,90 m) |
| **Circulations communes** | Largeur ≥ 1,20 m ; portes communes ≥ 0,90 m |
| **Ascenseur** | **Obligatoire** si le bâtiment comporte des logements en **étage(s)** au-dessus ou au-dessous du rdc à partir d'un certain nombre d'étages (historiquement ≥ R+3, abaissé sous conditions) |
| **WC, salle d'eau du logement** | Espace d'usage et de manœuvre compatibles fauteuil |

### Logements évolutifs (loi ELAN — quota 20 %)

La **loi ELAN** (2018-1021 du 23 novembre 2018, art. 64) a modifié le régime des BHC neufs : au lieu de **100 % accessibles**, désormais :

- **100 % des logements doivent être « évolutifs »** ;
- **Au moins 20 %** des logements (et au minimum un logement) doivent être **immédiatement accessibles** dès la livraison.

> Un **logement évolutif** est un logement dont une **mise en accessibilité ultérieure** peut être réalisée par des **travaux simples** (sans toucher aux structures porteuses, aux gaines techniques ni aux réseaux principaux). La pièce de vie (séjour + cuisine) et un cabinet d'aisance doivent être accessibles dès l'origine ; le reste peut être rendu accessible par travaux simples.

**À vérifier sur les plans BHC neuf** :
1. Le **quota de 20 %** de logements **immédiatement accessibles** est-il atteint (et ≥ 1 logement) ? Répartition par bâtiment / cage.
2. Les **autres logements** respectent-ils le caractère **évolutif** (mise en accessibilité par travaux simples, pas de mur porteur bloquant, gaines bien placées) ?
3. **Ascenseur** présent si requis (sinon les logements en étage ne peuvent compter dans le quota accessible).
4. **Parties communes** (hall, circulations, stationnement 5 %) accessibles.

## Restitution structurée

```
## Vérification PMR — [Projet]

### Identification
- **Régime** : ERP neuf / ERP existant / BHC neuf / BHC existant / MI à vendre
- **Type/catégorie ERP** : [J/L/M.../1-5] — effectif : [n]
- **Arrêté applicable** : [20 avr. 2017 / 8 déc. 2014 / 24 déc. 2015 / 1er août 2006]

### Tableau de conformité
| N° | Article/Arrêté | Exigence | Constat | Conformité | Recommandation |
|---|---|---|---|---|---|
| 1 | art. X arrêté ... | [chiffrée] | [plan] | ✅/⚠️/❌ | [...] |

### Synthèse (BHC neuf le cas échéant)
- Logements immédiatement accessibles : [n] / [total] = [%] vs **20 % requis** → ✅/❌
- Logements évolutifs (travaux simples) : [conforme/à vérifier]
- Ascenseur requis : [oui/non] → présent : [oui/non]

### Non-conformités majeures
- [cheminement / ascenseur / sanitaires / quota 20 %]

### Niveau de confiance
- [Élevé / à valider — selon présence des coupes et cotes]

### Pièces complémentaires recommandées
- [coupes cotées, plan ascenseur, plan de repérage des logements accessibles]
```

## Exemple

> *BHC neuf de 30 logements sur R+4, 1 cage avec ascenseur.*
> - **Quota ELAN** : 20 % × 30 = **6 logements** minimum immédiatement accessibles (arrêté 24 déc. 2015 + loi ELAN art. 64). Plan annonce 4 → **❌ non conforme**, recommandation : porter à 6.
> - Stationnement : **5 %** des places adaptées (BHC). Ascenseur présent (R+4) → logements d'étage éligibles au quota.
> - Autres logements : vérifier le **caractère évolutif** (pas de mur porteur entre WC et dégagement, gaines déportées).

## Proposition de livrable

Propose via l'outil **`generer_rapport`** un **rapport d'analyse PMR** :
- **PDF + DOCX** : identification du régime, tableau de non-conformités (article → exigence → constat → verdict → recommandation), synthèse quota BHC, pièces complémentaires.
- Mention finale : *« Document préparé par l'agent IA Architecte — constats indicatifs ; la conformité définitive relève de l'architecte et du contrôleur technique (mission HAND). En secteur protégé, avis ABF possible pour dérogation. »*

Appelle `generer_rapport({ titre, contenu, format: "pdf"|"docx", agent: "architecte", metadata })`.

## Garde-fous spécifiques

- **Aucune validation finale.** Tu signales des constats — la conformité définitive relève de l'architecte et du contrôleur technique.
- Pour les **ERP existants**, rappelle l'existence des **Ad'AP** (agenda d'accessibilité programmée) et des **dérogations** prévues à l'art. L.111-7-3 CCH.
- Pour les **immeubles à caractère historique** ou en **secteur sauvegardé**, signale qu'une consultation **ABF** est requise et peut motiver une dérogation.
- Si le document fourni est insuffisant (pas de coupes, pas de dimensions), **liste explicitement** les compléments nécessaires plutôt que d'inventer des cotes.
