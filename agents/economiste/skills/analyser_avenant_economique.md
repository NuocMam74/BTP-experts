# Skill — Analyser économiquement un avenant ou un TS

L'utilisateur te transmet une demande d'avenant ou de travaux supplémentaires (TS) à un marché en cours — tu dois analyser l'incidence économique, vérifier la légitimité du prix et formuler un avis.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Référence du marché** (n°, date, MOA, MOE, titulaire, lot)
- **Régime** : marché public (CCAG-Travaux + CCP R.2194) ou privé (NF P 03-001)
- **Montant initial HT** + **avenants antérieurs** (cumul)
- **Motif de l'avenant** : sujétions imprévues, demande MOA, modification programme, intempéries
- **Description précise** des travaux ajoutés / supprimés / modifiés
- **Devis du titulaire** ou note de chiffrage

### 2. Vérifier la qualification de la modification (CCP R.2194)

Pour les marchés publics, l'avenant doit relever d'un des 5 cas :

| Cas | Critère | Plafond |
|---|---|---|
| R.2194-2 | Clauses de réexamen ou options prévues au marché | Pas de plafond |
| R.2194-3 | Travaux complémentaires nécessaires (changement cotraitant impossible) | ≤ 50 % marché initial |
| R.2194-5 | Imprévu (circonstances non anticipables) | ≤ 50 % marché initial |
| R.2194-6 | Cession du contrat | Pas de plafond |
| R.2194-8 | Modifications de faible montant | ≤ 10 % et < seuil européen |

#### Limites communes (R.2194-7)

- ❓ Nature globale du marché modifiée ?
- ❓ Cumul des avenants > 50 % ?
- ❓ Équilibre économique bouleversé en faveur du titulaire ?

→ Si une réponse oui : **avenant impossible** → relancer une procédure de passation.

### 3. Vérifier le cumul des avenants

```
Cumul avenants = Σ Avenants signés à date + Avenant en cours d'analyse
% Cumul = Cumul / Marché initial × 100
```

#### Verdict

| Cumul | Verdict |
|---|---|
| < 15 % | ✅ Confortable, sans risque |
| 15-30 % | ✅ Acceptable |
| 30-50 % | ⚠️ Approche du plafond, vigilance |
| > 50 % | ❌ Plafond atteint, avenant impossible (sauf imprévu R.2194-5) |

### 4. Analyser le prix proposé par le titulaire

#### Méthode

Pour chaque poste de l'avenant, vérifier :

##### A. Prix unitaires existants au marché

Si le poste est **identique** à un poste du marché initial :
- **Application** du PU existant × Nouvelles quantités
- Pas de nouveau prix à négocier

##### B. Prix à négocier (postes nouveaux)

Si le poste est **nouveau** :
- Le titulaire propose un **sous-détail décomposé** (DS + FC + FG + BA)
- Vérification de la cohérence avec :
  - PU comparables sur le marché initial
  - Bordereaux (BatiPrix, UNTEC)
  - Concurrence (consultation d'autres entreprises pour benchmark)

##### C. Postes analogues

Si le poste est **analogue** (similaire mais pas identique) :
- **Adaptation** du PU existant
- Justification documentée

### 5. Détecter les surcoûts excessifs

#### Drapeaux rouges

| Symptôme | Analyse |
|---|---|
| **Coefficient de vente** > 1,80 | Marge excessive → renégocier |
| **PU bien supérieur** aux bordereaux | Justification ? Spécificité du chantier ? |
| **Quantités majorées** sans justification | Métré contradictoire |
| **Frais d'études** ou de prépa importants | Documentation requise |
| **Mobilisation imprévue** de matériel ou MO | Justifier (factures) |
| **Sous-traitance** non déclarée | Vérifier loi 1975 + DC4 |
| **Délai de mise en œuvre** allongé | Lien avec planning ? |

#### Méthode de benchmark

- **Consultation parallèle** de 2-3 entreprises pour comparaison
- Recalcul par méthode UNTEC (DS + FC + FG + BA)
- Vérification de la **cohérence** avec les PU du marché initial

### 6. Analyser l'incidence sur le délai

| Travaux ajoutés | Délai supplémentaire |
|---|---|
| Travaux indépendants (parallèles au planning) | 0 jour |
| Travaux interférant avec lots existants | Délai proportionnel |
| Travaux **substituants** (annulation + ajout) | Délai net |
| Travaux **séquentiels** (après lots terminés) | Pleine durée |

#### Calcul

```
Délai supplémentaire = Durée travaux ajoutés × Coefficient d'interférence
```

Le coefficient d'interférence dépend de la phase d'avancement et de la complexité.

### 7. Établir le tableau économique de l'avenant

| Élément | Avant avenant | Avenant | Après avenant |
|---|---|---|---|
| Montant marché HT | _ € | + _ € (ou - _ €) | _ € |
| TVA (selon taux) | _ € | _ € | _ € |
| Montant TTC | _ € | _ € | _ € |
| Cumul avenants depuis marché initial | _ € | + _ € | _ € |
| % Cumul du marché initial | _ % | | _ % |
| Délai contractuel | _ jours | + _ jours | _ jours |
| Date d'achèvement | _ | | _ |

### 8. Formuler un avis au MOA

#### Catégorisation

| Avis | Critères |
|---|---|
| ✅ **Recommandé** | Motif solide (R.2194 applicable), prix cohérent (vs bordereaux), cumul OK (< 30 %), pas de bouleversement |
| ⚠️ **À vérifier** | Motif acceptable, prix à négocier ou cumul approchant le seuil (30-50 %) |
| ❌ **Non recommandé** | Motif faible, surcoût excessif, dépassement plafond (> 50 %), bouleversement |

#### Recommandations possibles

1. **Signature en l'état** si toutes conditions OK
2. **Négociation** du prix (si excès détecté)
3. **Réduction de scope** (si pas tout justifié)
4. **Refus** et relance procédure si plafond atteint
5. **Consultation parallèle** (mise en concurrence pour le périmètre ajouté)
6. **Étalement** sur plusieurs avenants si cumul critique

### 9. Vérifier l'articulation avec révision de prix

Si l'avenant porte sur des travaux à exécuter dans le futur :
- **Application** de la révision de prix selon CCAP (sauf clause contraire)
- **Vérification** : l'avenant indique-t-il le taux de révision applicable ?
- **Risque** : sans clause révision, le titulaire supporte l'inflation

### 10. Analyse pour le marché privé (NF P 03-001)

Régime plus souple :
- Pas de plafond formel mais **principe d'équilibre** à respecter
- Avenant signé par les **deux parties** (MOA + titulaire)
- **TMA** (Travaux Modificatifs Acquéreur) en VEFA : règles CCH spécifiques (art. R.261-14)
- **Pas d'obligation** de procédure pour avenant
- **Mais** attention aux pratiques anticoncurrentielles si attribution favorisée

### 11. Restitution

#### Note de présentation au MOA

Structure :

```
1. CONTEXTE
   - Référence du marché
   - Objet de l'avenant
   - Initiateur de la demande

2. JUSTIFICATION
   - Motif technique / contractuel
   - Article R.2194 applicable
   - Lien avec PV de chantier ou OS

3. ANALYSE TECHNIQUE
   - Description des travaux
   - Vérification quantités
   - Validation conformité CCTP

4. ANALYSE ÉCONOMIQUE
   - Détail des PU
   - Vérification cohérence (vs bordereaux, vs marché initial)
   - Calcul du montant total
   - Incidence sur cumul avenants

5. ANALYSE DÉLAI
   - Délai supplémentaire demandé
   - Vérification cohérence (interférence chantier)

6. ANALYSE JURIDIQUE
   - Cas R.2194 applicable
   - Cumul vs plafond (50 %)
   - Risque de bouleversement (oui/non)

7. RECOMMANDATION
   - Avis ✅ / ⚠️ / ❌
   - Conditions éventuelles (négociation, réduction)
   - Délibération requise du MOA si dépassement seuil
```

## Garde-fous

- **Cumul** : surveiller en permanence (R.2194-3 et R.2194-5 plafonnés à 50 %).
- **Bouleversement** : éviter en cas de variation > 30 % (jurisprudence CE 21 oct. 2009 « Mediasoft »).
- **Imprévu** (R.2194-5) doit être réellement imprévisible : « erreur dans le DCE » n'est PAS un imprévu admissible.
- **Cession** (R.2194-6) : vérifier les capacités du nouvel attributaire.
- **OS provisoires** : ne pas démarrer les travaux sans OS, mais éviter de bloquer le chantier — OS provisoire = pratique courante.
- **Documentation** : conserver toutes les pièces (devis, PV, courriers) pour traçabilité.
- **Réclamations** : si l'avenant ne couvre pas tout le préjudice du titulaire, conserver les pièces pour réclamation art. 50.

## Livrable à proposer

Après analyse, propose un **dossier d'avenant** :
- **Note d'analyse** (DOCX + PDF) selon structure ci-dessus avec :
  - Synthèse exécutive (avis ✅/⚠️/❌)
  - Tableau économique détaillé
  - Recommandation au MOA
- **Tableau Excel** de chiffrage avec :
  - PU vérifiés vs bordereaux
  - Cumul avenants
  - Incidence montant et délai
- **Avenant rédigé** (DOCX) prêt à signature (si avis favorable)
- **Lettre de négociation** (DOCX) prête à envoyer (si avis avec réserves)
- Mention finale : *« Document préparé par l'agent IA Économiste — à valider par le maître d'œuvre, l'économiste de la construction et le service juridique du MOA. »*
