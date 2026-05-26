# Zonage sismique et catégories d'importance — France

**Source :** Arrêté du 22 octobre 2010 (modifié) relatif à la classification et aux règles de construction parasismique applicables aux bâtiments de la classe dite "à risque normal". Code de l'environnement art. R.563-1 à R.563-8. Decret 2010-1255. Legifrance — texte officiel français du domaine public.

## Zonage sismique France métropolitaine

Le territoire français métropolitain est découpé en **5 zones** de sismicité :

| Zone | Niveau | Accélération de référence a_gr | Communes typiques |
|---|---|---|---|
| **1** | Très faible | < 0,4 m/s² | Bordeaux, Toulouse, Lille, Reims, Lyon (Ouest) |
| **2** | Faible | 0,4 à 0,7 m/s² | Paris (zone parisienne), Marseille, Bordeaux |
| **3** | Modérée | 0,7 à 1,1 m/s² | Strasbourg, Nantes, Annecy, Vichy |
| **4** | Moyenne | 1,1 à 1,6 m/s² | Nice, Grenoble (partie sud), Vallée du Rhône (sud) |
| **5** | Forte | > 1,6 m/s² | Antilles, Guadeloupe, Martinique (DOM) |

Le zonage **commune par commune** est défini par l'**annexe** de l'arrêté du 22 octobre 2010 et publié sur le site géorisques.gouv.fr.

## Catégories d'importance des bâtiments

Selon l'**article R.563-3** du Code de l'environnement, les bâtiments à risque normal sont classés en **4 catégories d'importance** :

| Catégorie | Description | Coefficient γ_I (EC8) |
|---|---|---|
| **I** | Faible enjeu — bâtiments d'activité ou de stockage avec présence humaine intermittente. **Pas d'obligation EC8** | 0,8 |
| **II** | **Habitation collective** et habitation individuelle ; bureaux ; commerces ≤ 300 personnes ; ERP cat. 4 et 5 (sauf scolaires) | 1,0 |
| **III** | Établissements scolaires ; ERP cat. 1, 2, 3 ; bâtiments dont l'effectif > 300 personnes ; bâtiments des centres de production d'énergie | 1,2 |
| **IV** | Bâtiments indispensables à la gestion de crise : hôpitaux, casernes pompiers, gendarmeries, centres de production d'eau ; infrastructures de transport stratégiques | 1,4 |

## Tableau d'application de l'Eurocode 8

| Zone de sismicité | Cat. I | Cat. II | Cat. III | Cat. IV |
|---|---|---|---|---|
| **1** | — | — | — | EC8 ou PS-MI |
| **2** | — | — | EC8 ou PS-MI | EC8 obligatoire |
| **3** | — | EC8 ou PS-MI | EC8 obligatoire | EC8 obligatoire |
| **4** | EC8 ou PS-MI | EC8 obligatoire | EC8 obligatoire | EC8 obligatoire |
| **5** | EC8 ou CP-MI Antilles | EC8 obligatoire | EC8 obligatoire | EC8 obligatoire |

Légende :
- **—** : aucune obligation parasismique
- **PS-MI 89** : règles simplifiées Maisons Individuelles (jusqu'à 2 niveaux + combles, art. 4 de l'arrêté 22 oct. 2010)
- **CP-MI Antilles** : règles spécifiques Antilles
- **EC8** : Eurocode 8 (NF EN 1998-1) + Annexe nationale française complète

## PS-MI 89 — Conditions d'application simplifiée

Pour pouvoir utiliser les règles **PS-MI 89** (alternative simplifiée à l'EC8), la maison doit respecter **toutes** ces conditions :
- Maison individuelle au sens du CCH L.231-1 (un seul logement)
- ≤ 2 niveaux + combles aménageables
- Surface ≤ 250 m² SDP
- Hauteur ≤ 11 m au faîtage
- Géométrie régulière (pas de décrochements importants)
- Sols favorables (classe A, B ou C selon EC8) — exclut classes D, E, S1, S2
- Charges d'exploitation normales

**Si une seule condition n'est pas respectée → EC8 obligatoire.**

## Eurocode 8 — Principales obligations

Pour un bâtiment soumis à l'EC8 (NF EN 1998-1 + AN française), l'ingénieur doit :

1. **Choisir un système de contreventement** (palées triangulées, voiles de contreventement, portiques rigides, mixte)
2. **Définir la classe de ductilité** : DCL (faible), DCM (moyenne), DCH (haute)
3. **Calculer le coefficient de comportement q** selon le type de contreventement et la classe de ductilité
4. **Appliquer la méthode d'analyse** :
   - Analyse modale spectrale (méthode courante)
   - Analyse temporelle (cas particuliers)
   - Analyse forces horizontales équivalentes (bâtiments réguliers)
5. **Vérifier les déplacements** inter-étages (limitation pour éviter dommages aux éléments non structuraux)
6. **Détailler les armatures** sismiques (chaînages, frettage des poteaux, ancrages renforcés)

## Combinaisons sismiques (EC0)

```
Σ G_k,j + A_Ed + Σ ψ_2,i × Q_k,i
```

Avec :
- **G_k,j** : actions permanentes (sans γ_G — coefficient 1,0 en sismique)
- **A_Ed** : action sismique de calcul
- **Q_k,i** : actions variables (avec coefficient ψ_2 quasi-permanent)

L'action sismique A_Ed est obtenue à partir de :
- **a_g** = a_gr × γ_I (accélération de calcul = accélération zonale × coef d'importance)
- **Spectre de réponse élastique** (fonction de la classe de sol)
- **Coefficient de comportement q** pour passer au spectre de calcul

## Erreurs fréquentes

- **Confondre zone et catégorie** : la zone est géographique, la catégorie dépend de la destination du bâtiment.
- **Utiliser PS-MI 89 hors champ** : 95 % des maisons en zone 3 ou 4 ne respectent pas toutes les conditions PS-MI → EC8 s'applique.
- **Oublier γ_I = 1,2** pour catégorie III : les armatures dimensionnées comme en II seraient sous-dimensionnées de 20 %.
- **Mauvaise classe de sol** : les essais G2 doivent fournir Vs,30 (vitesse moyenne des ondes de cisaillement sur 30 m) pour déterminer la classe (A à E).
- **Ignorer le couplage avec la géotechnique** : les sols de classe D ou E peuvent amplifier l'effet sismique d'un facteur 2 à 3.

**Référence à citer :** Arrêté du 22 octobre 2010 (modifié) ; Code de l'environnement art. R.563-1 à R.563-8 ; NF EN 1998-1:2005 + Annexe nationale française ; PS-MI 89. Source : Legifrance et AFNOR.
