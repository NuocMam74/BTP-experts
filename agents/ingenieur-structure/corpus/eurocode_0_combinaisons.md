# Eurocode 0 — Bases de calcul et combinaisons d'actions

**Source :** NF EN 1990:2003/A1:2006 + AN française. Synthèse de cours d'école d'ingénieurs et de pratique professionnelle.

## Principe général

L'Eurocode 0 fixe les **bases de calcul** communes à tous les Eurocodes structurels. Il définit :
- Les **états limites** (ELU et ELS)
- Les **classes de fiabilité** (RC1, RC2, RC3)
- Les **catégories d'importance** (CC1, CC2, CC3)
- Les **combinaisons d'actions** à appliquer

## États limites

### États limites ultimes (ELU)

Vérifient la **sécurité** du bâtiment vis-à-vis de :
- Perte d'équilibre statique (EQU)
- Rupture interne des éléments structurels (STR)
- Rupture du sol (GEO)
- Fatigue (FAT)

### États limites de service (ELS)

Vérifient l'**aptitude au service** :
- Déformations (flèches)
- Vibrations
- Fissuration (limitation d'ouverture des fissures)
- Apparence (esthétique)

## Combinaisons d'actions — ELU fondamental (cas usuel)

Formule générale pour la situation **persistante / transitoire** (EN 1990 §6.4.3.2) :

```
Σ γ_G,j × G_k,j + γ_Q,1 × Q_k,1 + Σ γ_Q,i × ψ_0,i × Q_k,i
```

Avec :
- **G_k,j** : action permanente caractéristique
- **Q_k,1** : action variable de base (la plus défavorable)
- **Q_k,i** : autres actions variables
- **γ_G** : coefficient partiel sur les actions permanentes = **1,35** (défavorable) ou **1,00** (favorable)
- **γ_Q** : coefficient partiel sur les actions variables = **1,5** (défavorable) ou **0** (favorable)
- **ψ_0,i** : coefficient de combinaison de l'action accompagnante

## Coefficients ψ — Annexe nationale française

| Action | ψ_0 | ψ_1 | ψ_2 |
|---|---|---|---|
| Charges d'exploitation cat. A et B (habitation, bureaux) | 0,7 | 0,5 | 0,3 |
| Charges d'exploitation cat. C, D (lieux de rassemblement, commerces) | 0,7 | 0,7 | 0,6 |
| Charges d'exploitation cat. E (stockage) | 1,0 | 0,9 | 0,8 |
| Neige (altitude < 1000 m) | 0,5 | 0,2 | 0 |
| Neige (altitude ≥ 1000 m) | 0,7 | 0,5 | 0,2 |
| Vent | 0,6 | 0,2 | 0 |
| Variations thermiques | 0,6 | 0,5 | 0 |

## Combinaisons ELS

- **Caractéristique (rare)** : `Σ G_k + Q_k,1 + Σ ψ_0,i × Q_k,i`
- **Fréquente** : `Σ G_k + ψ_1,1 × Q_k,1 + Σ ψ_2,i × Q_k,i`
- **Quasi-permanente** : `Σ G_k + Σ ψ_2,i × Q_k,i`

## Catégories d'importance (CC)

| Catégorie | Description | Exemples |
|---|---|---|
| **CC1** | Conséquences faibles | Bâtiments agricoles, hangars sans présence permanente |
| **CC2** | Conséquences moyennes | Bâtiments d'habitation et de bureaux courants |
| **CC3** | Conséquences importantes | ERP, hôpitaux, immeubles de grande hauteur, ponts |

## Durée d'utilisation de projet

L'EN 1990 § 2.3 distingue les catégories de durée d'utilisation :

| Catégorie | Durée indicative | Exemples |
|---|---|---|
| 1 | 10 ans | Structures temporaires |
| 2 | 10 à 25 ans | Pièces de structure remplaçables (ex : appuis) |
| 3 | 15 à 30 ans | Structures agricoles |
| 4 | **50 ans** | **Bâtiments et structures courantes** |
| 5 | **100 ans** | Bâtiments monumentaux, ponts, ouvrages d'art |

## En pratique pour une vérification

1. **Identifier les actions** (G, Q variables, neige, vent, sismique éventuellement)
2. **Classer le bâtiment** : catégorie de conséquences CC, durée d'utilisation
3. **Construire les combinaisons** ELU et ELS pertinentes
4. **Calculer les sollicitations** (M, V, N) dans chaque combinaison
5. **Comparer aux résistances** des matériaux selon EC2/EC3/EC5

## Erreurs fréquentes

- **Oublier ψ_0** pour les actions accompagnantes : la combinaison la plus défavorable peut alors être sous-estimée
- **Confondre γ_G défavorable / favorable** : le γ_G = 1,00 ne s'applique que si l'action permanente est **favorable au cas considéré** (par exemple, un poids propre stabilisant contre un soulèvement par vent)
- **Ignorer la combinaison ELS quasi-permanente** : utilisée pour le calcul de la flèche à long terme (déformations différées du béton, fluage)

**Référence à citer :** NF EN 1990:2003/A1:2006 + Annexe nationale française. Pour les sections détaillées : EN 1990 §6 (vérifications par la méthode des coefficients partiels), §6.4.3 (combinaisons aux ELU), §6.5.3 (combinaisons aux ELS).
