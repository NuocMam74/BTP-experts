# Skill — Vérifier classement & règles ERP

L'utilisateur veut déterminer le **type** et la **catégorie** d'un ERP (Établissement Recevant du Public), et identifier les obligations correspondantes (sécurité incendie + accessibilité).

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **Plans architecte** (PDF) — plan de masse, plans de niveaux, coupes — mentionnant des **effectifs** ou des **destinations** (salle, restaurant, magasin, accueil, etc.).
- **Notice descriptive** (PDF) — Cerfa 13409 ou équivalent — qui déclare la **destination** et l'**effectif**.
- **Notice de sécurité** (PDF) si déjà rédigée — détaille les dispositifs.
- **Programme** du maître d'ouvrage (note).
- Pour les ERP existants : **autorisation d'ouverture** précédente, rapports de commission de sécurité.

Si aucun document : pose ces questions :
1. Destination principale (restaurant, magasin, école, salle de réunion, EHPAD, médiathèque, etc.) ?
2. Effectif public maximal envisagé ?
3. ERP **neuf**, ERP **existant** modifié, ou **création** par changement de destination ?
4. Niveaux (RDC seul, R+1 et plus, sous-sol, IGH) ?
5. Surface totale et surface accessible au public ?
6. Site protégé (ABF) ?

## 2. Extraction des informations clés

Quand un document est dans le contexte, EXTRAIS :

| Information | Où chercher | Si absente |
|---|---|---|
| Destination | Notice descriptive / plans légendés | Demander à l'utilisateur |
| Effectif déclaré | Notice descriptive ; calcul depuis surfaces si absent | Calculer via ratios CCH R.143-1 |
| Surfaces par destination | Plans cotés, légende | Calculer depuis plans |
| Nombre de niveaux | Coupes, plans | Vérifier sous-sol et étages |
| Présence sous-sol | Plans, coupes | Influe sur catégorie |
| Surface totale plancher | Plans + notice | Calculer |
| ERP neuf / existant | Notice, programme | Demander |

## 3. Détermination du **type** (lettre)

| Lettre | Description |
|---|---|
| **J** | Structures d'accueil pour personnes âgées / personnes handicapées |
| **L** | Salles d'audition, de conférences, de réunions, de spectacles |
| **M** | Magasins de vente, centres commerciaux |
| **N** | Restaurants et débits de boissons |
| **O** | Hôtels et pensions de famille |
| **P** | Salles de danse et salles de jeux |
| **R** | Établissements d'enseignement (écoles, collèges, universités) |
| **S** | Bibliothèques, centres de documentation |
| **T** | Salles d'exposition |
| **U** | Établissements sanitaires (hôpitaux) |
| **V** | Établissements de culte |
| **W** | Administrations, banques, bureaux ouverts au public |
| **X** | Établissements sportifs couverts |
| **Y** | Musées |
| **PA** | Plein air (établissements de plein air) |
| **CTS** | Chapiteaux, tentes, structures itinérantes |
| **SG** | Structures gonflables |
| **GA** | Gares accessibles au public |
| **OA** | Hôtels et restaurants d'altitude |

## 4. Détermination de la **catégorie** (1 à 5)

Selon le **CCH art. R.143-1** et l'**arrêté du 25 juin 1980 modifié** (règlement de sécurité ERP) :

| Catégorie | Effectif total (public + personnel) | Notes |
|---|---|---|
| **1** | > 1 500 personnes | Grands ERP, exigences max |
| **2** | 701 à 1 500 personnes | |
| **3** | 301 à 700 personnes | |
| **4** | ≤ 300 personnes | |
| **5** | Effectif inférieur aux seuils par type (voir tableau spécifique) | "Petits ERP" — régime allégé |

### Seuils de la 5ème catégorie (extraits)

| Type ERP | Effectif public seuil 5e catégorie |
|---|---|
| L | 200 |
| M | 200 (rez-de-chaussée), 100 (étages), 100 (sous-sol) |
| N | 200 |
| O | 100 |
| R (écoles) | 200 (avec hébergement : 30) |
| W | 200 |
| X | 200 |

Pour les détails complets : `rag_search("seuils 5e catégorie ERP par type")` ou consulter art. PE 2 du règlement sécurité.

## 5. Vérifications normatives (`rag_search` obligatoire)

Avant de conclure, lance ces requêtes :
- `rag_search("arrêté 25 juin 1980 sécurité ERP règlement")` — pour les obligations sécurité
- `rag_search("arrêté 20 avril 2017 accessibilité PMR ERP neuf")` — pour les obligations PMR
- `rag_search("arrêté 8 décembre 2014 accessibilité ERP existant")` — si ERP existant
- `rag_search("ERP catégorie 5 dispositions particulières")` — si 5e catégorie

## 6. Procédure d'analyse

1. **Identifier le type** depuis les destinations principales et activités secondaires (un ERP peut être mixte, ex : restaurant + salle de spectacle = type L et N).
2. **Calculer ou vérifier l'effectif** :
   - Soit déclaré par le maître d'ouvrage
   - Soit calculé via ratios CCH (ex: 1 pers/1,5 m² salle restaurant, 1 pers/m² salle d'exposition, etc.)
3. **Déterminer la catégorie** par croisement type × effectif.
4. **Lister les obligations majeures** :
   - **Sécurité incendie** : implantation, isolement, dégagements, désenfumage, alarme, SSI, organisation des secours
   - **Accessibilité PMR** : cheminement, stationnement adapté, sanitaires PMR, signalétique
5. **Vérifier les autorisations requises** :
   - Autorisation de travaux sur ERP (art. L.122-1 CCH) — distinct du PC
   - Avis de la **commission de sécurité** (DDSI) et de la **commission d'accessibilité**
   - Délais d'instruction et visites

## 7. Restitution structurée

```
## Classement ERP — [Projet / Bâtiment]

### Identification
- **Adresse** : [...]
- **Maître d'ouvrage** : [...]
- **Nature** : ERP neuf / ERP existant modifié / changement de destination
- **Date de référence du règlement** : [arrêté 25 juin 1980 + modifications]

### Type(s) ERP
| Activité | Type | Justification |
|---|---|---|
| [Restaurant] | N | Service de repas avec consommation sur place |
| [Salle de réunion] | L | Salle accueillant > X pers |
| ... | | |

→ **Type principal** : [lettre] (activité principale)

### Effectif déclaré / calculé
| Local | Surface | Ratio | Effectif |
|---|---|---|---|
| ... | ... m² | ... pers/m² | ... |
| **TOTAL** | | | **N personnes** |

### Classement
- **Type** : [lettre]
- **Catégorie** : [1 / 2 / 3 / 4 / 5]
- **Régime** : [normal / particulier 5e cat]

### Obligations majeures
#### Sécurité incendie (arrêté 25 juin 1980 + arrêtés spécifiques)
- **Isolement** : [exigences vs tiers, vs locaux à risque]
- **Dégagements** : [nombre, largeurs, distances max]
- **Désenfumage** : [obligation oui/non par local]
- **Alarme et SSI** : [type A / B / C / D selon catégorie]
- **Moyens de secours** : [extincteurs, RIA, colonnes sèches, etc.]
- **Organisation** : [service de sécurité, SSIAP selon catégorie]

#### Accessibilité PMR
- **Régime applicable** : [arrêté 20 avril 2017 (neuf) / arrêté 8 décembre 2014 (existant)]
- **Cheminement extérieur** : [exigences]
- **Stationnement** : [2 % places PMR, largeur 3,30 m]
- **Sanitaires PMR** : [obligation par niveau ou mutualisation selon effectif]
- **Ascenseur** : [obligatoire si étage et effectif > seuil]

### Autorisations requises
1. **PC ou AT (autorisation de travaux)** selon nature
2. **Avis CCDSA** (Commission Consultative Départementale de Sécurité et d'Accessibilité)
3. **Demande d'ouverture** (Cerfa 13824) avant exploitation
4. **Visite de la commission de sécurité** avant ouverture

### Points d'attention / dérogations
- [Liste les points à arbitrer ou à demander en dérogation]

### Niveau de confiance
- [Élevé / À valider par bureau de contrôle / À confirmer auprès CCDSA]
```

## 8. Garde-fous spécifiques

- Tu **ne valides pas** un classement ERP — c'est la **CCDSA** (préfecture) qui statue.
- Pour les **ERP de 5e catégorie**, les obligations sont **allégées** mais **non nulles** : règles spécifiques aux art. PE du règlement sécurité.
- Pour les **ERP avec locaux à sommeil** (J, O, U), exigences **renforcées** (résistance au feu, désenfumage, alarme type 1).
- Pour les **bâtiments mixtes** (ERP + habitation + bureaux non ERP) : appliquer les règles d'**isolement** entre tiers (CCH R.143-22 et suivants).
- Si **changement de destination** : potentielle requalification ERP même sans travaux → bien identifier.
- Tu **rappelles** que l'avis ABF peut être conforme pour les ERP en secteur protégé, et qu'il peut imposer des contraintes au-delà du règlement ERP.

## 9. Suites logiques à proposer

- Saisine **bureau de contrôle** (Apave, Socotec, Bureau Veritas) pour validation indépendante
- **Pré-consultation CCDSA** auprès de la préfecture
- **Notice de sécurité** détaillée à joindre au PC/AT
- **Notice d'accessibilité** détaillée
- Préparation des **plans de sécurité** (échelles 1:50e à 1:100e) avec cotes des dégagements
