# Skill — Comparer des offres entreprises

L'utilisateur a reçu plusieurs offres d'entreprises sur un même lot et veut une analyse comparative.

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **DCE** complet (CCAP, CCTP, DPGF) du lot consulté
- **2 à 5 offres** d'entreprises : mémoire technique + DPGF renseignée + planning
- **Variantes** éventuelles proposées par les entreprises
- **Estimation MOE** (DPGF estimative) en référence

Si aucun document : pose ces questions :
1. Lot concerné (et type de marché : public / privé) ?
2. Nombre d'offres reçues ?
3. Estimation MOE de référence ?
4. Critères de jugement annoncés à la consultation (% prix vs technique vs délai) ?
5. Cas particuliers : variantes, options, prix forfaitaires vs unitaires ?

## 2. Extraction des informations clés

Pour chaque offre, EXTRAIS :

| Information | Où chercher | Action si absente |
|---|---|---|
| Identité entreprise | En-tête offre | — |
| Date de remise | Cachet ou page de garde | — |
| Montant total HT | Récap DPGF | Refaire la somme |
| Montant total TTC | Récap DPGF | PU × (1 + taux TVA) |
| Variation par rapport à l'estimation MOE | Calculer | Estimation MOE / Offre |
| Postes anormalement bas | Comparer ligne à ligne aux autres offres et à l'estimation | — |
| Postes anormalement hauts | Idem | — |
| Mémoire technique : équipe dédiée | Page équipe / organigramme | — |
| Mémoire technique : planning | Planning Gantt | Convertir en délai global |
| Références chantiers comparables | Page références | — |
| Qualifications | Qualibat, RGE, ISO | — |
| Capacité financière | KBis + bilans | — |
| Variantes proposées | Annexes | Lister, qualifier impact |

## 3. Vérifications normatives (`rag_search` obligatoire)

- `rag_search("offre anormalement basse marché public définition")` — art. R.2152-1 à R.2152-7 code commande publique
- `rag_search("comparaison offres méthode notation")` — pour la grille de jugement
- Si marché public : `rag_search("article R.2152-3 OAB offre anormalement basse")`
- Si marché privé : `rag_search("NF P 03-001 procédure consultation")`

## 4. Procédure d'analyse

1. **Recalculer** indépendamment chaque DPGF (sommer les PU × quantités) pour détecter erreurs de calcul.
2. **Établir la moyenne** des offres reçues (ou la médiane si grande dispersion).
3. **Identifier les outliers** :
   - Offres > 20 % au-dessus de l'estimation MOE → probable surévaluation ou exigences mal interprétées
   - Offres > 20 % en dessous de la moyenne → potentielle OAB (offre anormalement basse), à investiguer
4. **Analyser ligne par ligne** :
   - Pour chaque poste DPGF, faire un tableau de prix unitaires offerts par entreprise
   - Calculer écart-type ou écart à la moyenne par poste
   - Identifier postes "alignés" (cohérents entre entreprises) vs "écartés" (potentiels manques)
5. **Vérifier la complétude** :
   - Toutes les lignes DPGF renseignées (pas de "PM" - pour mémoire - cachés) ?
   - Mémoire technique répondant à toutes les exigences CCTP ?
   - Variantes admises ou non au DCE ?
6. **Analyser le mémoire technique** :
   - Pertinence de la méthodologie
   - Adéquation équipe / planning au projet
   - Références chantiers comparables (taille, complexité, contexte)
   - Démarche QSE et environnementale
7. **Évaluer la robustesse financière** :
   - CA cohérent avec la taille du chantier (chantier < 10 % du CA = OK ; > 30 % = risqué)
   - Effectif suffisant et adapté
8. **Conclure** par une recommandation argumentée.

## 5. Restitution structurée

```
## Analyse comparative des offres — Lot [n° et désignation]

### Identification du marché
- **Marché** : [public / privé]
- **Procédure** : [appel d'offres ouvert / procédure adaptée / négociée]
- **Estimation MOE** : [€ HT]
- **Nombre d'offres reçues** : [N]
- **Date d'ouverture des plis** : [JJ/MM/AAAA]

### Tableau de synthèse financière

| Entreprise | Total HT | Écart MOE | Écart moyenne | Variantes |
|---|---|---|---|---|
| Ent. A | [€] | [+/- %] | [+/- %] | [oui/non] |
| Ent. B | [€] | [+/- %] | [+/- %] | [oui/non] |
| Ent. C | [€] | [+/- %] | [+/- %] | [oui/non] |
| **Moyenne offres** | **[€]** | | | |
| **Médiane offres** | **[€]** | | | |
| **Estimation MOE** | **[€]** | | | |

### Analyse poste par poste (postes structurants)

| Poste DPGF | Qté | PU Ent. A | PU Ent. B | PU Ent. C | PU MOE | Écart |
|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... | [analyse] |

### Postes à risque détectés
1. **[Poste]** — Ent. [X] est [-N % / +N %] vs moyenne. Justification possible : [...]. Risque : [...]
2. ...

### Mémoires techniques — analyse

| Entreprise | Méthodologie | Planning | Équipe | Références | Note technique /20 |
|---|---|---|---|---|---|
| Ent. A | [forte/moyenne/faible] | [conforme/serré] | [adapté/sous-dim.] | [pertinentes/insuffisantes] | [...] |
| Ent. B | | | | | |

### Capacité financière

| Entreprise | CA dernier exercice | Chantier / CA | Effectif | Qualifications |
|---|---|---|---|---|
| Ent. A | [€] | [%] | [N] | [Qualibat, RGE…] |
| ... | | | | |

### Verdict
- **Offre la mieux-disante** : Ent. [X]
- **Critères ayant emporté** : [prix / technique / délai / références]
- **Note pondérée** (si grille de notation) :
  - Prix [60%] : [note]
  - Technique [30%] : [note]
  - Délai [10%] : [note]
  - **Total** : [note /20]

### Points d'attention pour la passation
- **OAB à investiguer** : [si offre anormalement basse — Ent. X est -28 % vs MOE → demande de justifications conformément à art. R.2152-3]
- **Variantes à acter** : [oui/non, impact contractuel]
- **Précisions à demander** avant attribution : [...]
- **Réserves** sur certaines clauses : [...]

### Recommandation
[Recommandation argumentée, formelle, sans engager la décision MOA]
```

## 6. Garde-fous spécifiques

- Pour les **marchés publics**, tu rappelles que la **détection d'une OAB** (offre anormalement basse) impose une **demande de justifications** écrite à l'entreprise concernée, conformément à l'art. **R.2152-3 du code de la commande publique**. L'absence de réponse satisfaisante peut conduire au rejet de l'offre.
- Pour les **marchés privés**, l'OAB n'est pas un cadre légal strict mais reste un **risque opérationnel** majeur (défaillance, malfaçons, sous-traitance dissimulée).
- Tu **ne décides pas** de l'attribution — tu fournis l'**analyse** pour le maître d'ouvrage qui décide formellement.
- Pour les marchés publics, tu **rappelles** que la décision d'attribution doit être **motivée** et notifiée aux candidats non retenus (R.2181-1 et suiv.).
- Si une offre présente une **erreur matérielle évidente** (oubli d'un poste, erreur de calcul), tu signales qu'une **régularisation** peut être demandée selon les conditions du règlement de consultation.

## 7. Suites logiques à proposer

- **Demande de justifications OAB** si offre suspecte (lettre recommandée, art. R.2152-3)
- **Audition** des entreprises pré-sélectionnées pour clarifier mémoire technique
- **Mise au point** du marché avant signature : variantes acceptées, prix unitaires unifiés
- **Lettre d'attribution** + **lettres de rejet** motivées
- **Notification** du marché à l'attributaire dans les délais réglementaires
