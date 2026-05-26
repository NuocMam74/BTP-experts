# Skill — Analyser un PV de bornage

L'utilisateur te transmet un **PV de bornage** (amiable ou judiciaire) ou un **dossier de bornage** complet. Tu dois l'analyser et identifier les écarts éventuels avec le **cadastre**, le **titre de propriété**, ou la **possession** réelle.

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **Procès-verbal de bornage** (PV) signé par le géomètre-expert et les parties
- **Plan annexé** au PV (avec coordonnées des bornes, idéalement en Lambert 93)
- **Titre de propriété** (acte notarié récent ou ancien)
- **Extrait cadastral** (matrice + plan)
- **Photos** des bornes posées (avec géolocalisation)
- **Convocation amiable** ou **jugement** (si bornage judiciaire)
- Acte fondateur ou plus ancien acte connu (pour comparaison historique)
- Plans historiques (anciens cadastres napoléoniens, plan-masse ancien)
- **Servitudes** déclarées (par actes ou usages)

Si pièces partielles : demande
1. Type de bornage : **amiable** ou **judiciaire** ?
2. Nombre de **parties** au bornage et leur statut (propriétaires personnes physiques / morales / indivision / usufruit) ?
3. **Géomètre-expert signataire** (nom, n° Ordre national, qualification OGE) ?
4. **Date** du PV ?
5. **Communes et références cadastrales** concernées ?
6. Y a-t-il un **litige** en cours ou en germe (empiètement constaté, clôture contestée) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("Code civil article 646 obligation de bornage")` — droit au bornage
- `rag_search("Code civil articles 690 à 710 servitudes")`
- `rag_search("Code civil articles 2258 à 2275 prescription acquisitive")` — possession trentenaire / abrégée
- `rag_search("ordonnance 21 mai 1945 géomètre-expert statut")` — monopole bornage
- `rag_search("Référentiel Lambert 93 EPSG 2154 projection")` — système géodésique légal
- `rag_search("Cour cassation bornage écart titre mesurage")` — jurisprudence
- `rag_search("Cadastre valeur fiscale ou présomption de propriété")` — limites du cadastre

## 3. Cadre juridique du bornage

### Bases légales

| Texte | Contenu |
|---|---|
| **Code civil art. 646** | "Tout propriétaire peut obliger son voisin au bornage de leurs propriétés contiguës" |
| **Code civil art. 647** | "Tout propriétaire peut clore son héritage" |
| **Code civil art. 648** | Frais de bornage partagés à parts égales |
| **Ordonnance 21 mai 1945** | Monopole du géomètre-expert (inscrit à l'Ordre) pour le bornage |
| **Code civil art. 2272** | Prescription acquisitive 30 ans (10 ans si bonne foi + juste titre) |
| **Code civil art. 2261** | Conditions de la possession utile : continue, paisible, publique, non équivoque, à titre de propriétaire |
| **Code civil art. 1103** | Force obligatoire du contrat (PV amiable = contrat) |

### Bornage amiable vs judiciaire

| Caractéristique | Amiable | Judiciaire |
|---|---|---|
| Mode | Convention entre parties | Décision du tribunal (TJ ou TI selon enjeu) |
| Géomètre | Choisi en commun | Désigné par le juge (généralement OGE inscrit) |
| Force | Convention art. 1103 CC (force obligatoire entre signataires) | Autorité de la chose jugée |
| Opposabilité aux tiers | Limitée (publicité foncière nécessaire) | Idem si publié au SPF |
| Coût | Partagé (art. 648) | À la charge du demandeur en général |
| Possibilité de contestation | Action en nullité dans 5 ans | Appel + cassation |

⚠️ **Force du PV amiable** : il vaut **convention** entre signataires (art. 1103 CC). Pour qu'il soit opposable aux **tiers et ayants cause**, il doit être **publié au Service de la Publicité Foncière** (SPF). Sans publication, un acquéreur ultérieur peut contester.

## 4. Procédure d'analyse

### Étape 1 — Identification et complétude formelle

Vérifier la présence de :
- **Identification des parties** (état civil complet, qualité)
- **Identification des parcelles** (commune, section, numéro, lieux-dits)
- **Description précise** des bornes posées (nature, matériau, dimensions, marquage)
- **Coordonnées** des bornes en **Lambert 93** (EPSG:2154) — précision au cm
- **Plan annexé** côté à l'échelle (1/100, 1/200, 1/500 selon emprise)
- **Date** du PV (et date des opérations de terrain si différentes)
- **Signatures** des parties + géomètre-expert + témoins éventuels
- **Photos** des bornes posées (datées, géolocalisées)

### Étape 2 — Cohérence titre / cadastre / mesurage

| Élément | Source | Notes |
|---|---|---|
| **Surface titre** | Acte notarié | Souvent imprécise (anciens actes) |
| **Surface cadastrale** | Matrice cadastrale | **Document fiscal**, pas titre de propriété, présomption simple seulement |
| **Surface mesurée** | Calculs géomètre | Authoritative si géomètre OGE |

**Écarts acceptables** :
- Écart **< 2 %** : cohérence considérée bonne
- Écart **2 à 5 %** : à investiguer, peut résulter d'imprécision historique
- Écart **> 5 %** : à investiguer impérativement (titre erroné ? possession différente ? empiètement ?)
- Écart **> 10 %** : signal d'un problème de fond (titre vague, possession contestée, erreur cadastrale)

### Étape 3 — Détection des empiètements et anomalies

- **Plantations, constructions, clôtures, terrasses** du voisin franchissant la limite ?
- **Servitudes apparentes** (chemin, passage, vue) **cohérentes** avec celles déclarées au titre ?
- **Surfaces apparentes** des parcelles cohérentes avec la matrice cadastrale ?
- **Modifications récentes** non actées (extension, démolition, division) ?
- **Bornes anciennes** repérées (en cohérence ou en conflit avec les nouvelles) ?

### Étape 4 — Modes de fixation de la limite

Le géomètre fixe la limite selon une **hiérarchie** :

1. **Titre** : limite indiquée par les actes (descriptifs, plans annexés, références à des points fixes)
2. **Bornes anciennes** non contestées par les parties
3. **Possession trentenaire** (art. 2272 CC) si :
   - **Continue** : sans interruption d'au moins 1 an
   - **Paisible** : sans violence ni contestation
   - **Publique** : visible des tiers
   - **Non équivoque** : avec l'animus domini (intention de posséder en propriétaire)
   - **À titre de propriétaire** : pas en qualité de locataire, dépositaire, etc.
4. **Présomption d'occupation** issue du cadastre (présomption simple)
5. **Équité** ou règles supplétives (partage à parts égales si limite indéterminable)

### Étape 5 — Vérification servitudes

- Servitudes **mentionnées au titre** (passage, vue, écoulement des eaux, tour d'échelle) bien représentées sur le plan ?
- Servitudes **publiques** (réseaux, recul ICPE, plan d'alignement, MH) repérées ?
- **DT-DICT** (si chantier projeté à proximité) — voir skill `dt_dict`

## 5. Restitution structurée

```
## Analyse PV de bornage — Parcelles [X et Y]

### Identification
- **Type de bornage** : amiable / judiciaire
- **Parties** : [propriétaires + représentants]
- **Géomètre-expert signataire** : [nom + n° Ordre OGE]
- **Date PV** : [JJ/MM/AAAA]
- **Référence judiciaire** (si judiciaire) : [n° RG + tribunal]

### Parcelles concernées
| Référence cadastrale | Commune | Propriétaire | Surface titre | Surface cadastre | Surface mesurée |
|---|---|---|---|---|---|
| [section + n°] | [commune] | [nom] | [m²] | [m²] | [m²] |

### Conformité formelle

| Critère | Conformité | Notes |
|---|---|---|
| Identification précise des parcelles | ✅ | Section + n° + lieu-dit |
| Coordonnées Lambert 93 des bornes | ✅ / ⚠️ | Précision : [cm] |
| Description matérielle des bornes (nature, type) | ✅ / ⚠️ | Bornes inox marquage SEXT |
| Plan annexé coté à l'échelle | ✅ / ❌ | 1/200e |
| Signatures parties + géomètre + témoins | ✅ / ❌ | [N parties signées] |
| Photos géolocalisées des bornes posées | ✅ / ❌ | |
| Publication SPF si opposabilité tiers visée | ✅ / N.A. | À recommander |

### Cohérence titre / cadastre / mesurage

| Parcelle | Surface titre | Surface cadastre | Surface mesurée | Écart titre / mesurage |
|---|---|---|---|---|
| [ref] | [m²] | [m²] | [m²] | [%] |

### Modes de fixation de la limite
- [Suivi du titre / Bornes anciennes confirmées / Possession trentenaire art. 2272 / Équité]
- Justification du géomètre : [...]

### Empiètements / anomalies détectés
1. [Ex : clôture grillage existante située 0,80 m à l'intérieur de la parcelle voisine → empiètement à régulariser]
2. [Ex : haie de cyprès dont les racines débordent — pas d'empiétement matériel sur le sol mais nuisance § art. 671 CC]
3. [Ex : terrasse béton voisine empiète sur 0,30 m — selon ancienneté, possession trentenaire pourrait être invoquée]

### Servitudes apparentes
- [Ex : passage à pied côté nord cohérent avec acte de 1932]
- [Ex : drain enterré non documenté à investiguer]

### Points d'attention
1. [Ex : écart de 7 % entre titre (1 200 m²) et mesurage (1 116 m²) → recherche acte fondateur 1956 recommandée]
2. [Ex : indivision côté propriétaire B avec représentant non identifié au PV → vérifier mandat]
3. [Ex : PV non publié au SPF → recommandation immédiate pour opposabilité tiers]

### Recommandations
- **Publication SPF** du PV pour opposabilité aux tiers
- Conservation par chaque partie d'**un original** signé
- **Photographies datées** des bornes annexées
- En cas d'empiètement : tentative de **résolution amiable** avant action en bornage judiciaire ou action possessoire (art. 2278 CPC)
- Mise à jour de la **clôture** ou des **plantations** suivant les limites bornées

### Niveau de confiance
- [Élevé / Moyen / Faible — selon complétude et cohérence]
```

## 6. Litiges courants et cas particuliers

### A — Empiétement par construction
- Voisin a construit (mur, terrasse, abri) au-delà de la limite
- **Sanction stricte** (Cass.) : démolition même pour empiètement minime (cm) sauf abus de droit caractérisé
- Possession trentenaire **inopposable** en cas d'empiétement de **construction** (Cass.) — la possession ne fait pas acquérir un droit sur un fonds d'autrui par construction

### B — Empiétement par plantations
- Art. 671 CC : distances minimales (2 m si arbre > 2 m de haut, 0,50 m sinon)
- Voisin peut exiger **arrachage** (Cass. systématique) sauf possession trentenaire des plantations elles-mêmes

### C — Possession trentenaire de la limite
- Peut faire **acquérir** une bande de terrain par usucapion (art. 2272 CC)
- Conditions strictes (art. 2261) à démontrer **par tous moyens** (témoignages, photos historiques, factures de travaux, actes)
- **Prescription abrégée** 10 ans si bonne foi + juste titre

### D — Écarts importants titre / mesurage
- Acte ancien souvent peu précis (surfaces "environ", "à peu près")
- **Recherche de l'acte fondateur** (acte originel d'attribution / partage) souvent décisive
- Plans cadastraux **napoléoniens** (1808-1850) parfois disponibles aux archives départementales

### E — Servitudes non documentées
- Servitudes **apparentes** (par usage long et visible) peuvent être consacrées par la possession
- Servitudes **occultes** (réseaux enterrés non déclarés) — souvent identifiées par **DT-DICT** ou anciens plans

## 7. Garde-fous spécifiques

- Tu **ne valides pas** le PV — tu prépares l'analyse pour le **géomètre-expert** signataire qui engage sa **responsabilité civile professionnelle** (ordonnance 1945).
- En cas d'**écart > 5 %** titre/mesurage, **ne tranches pas** — recommande une recherche complémentaire (acte fondateur, titres anciens, plans historiques).
- Si la **possession trentenaire** est invoquée, vérifie qu'elle est **caractérisée** : possession **continue, paisible, publique, non équivoque, à titre de propriétaire** (art. 2261 CC) ; **ne se présume pas**, doit être prouvée.
- Tu **rappelles** que le **PV de bornage amiable** vaut **convention** entre les parties (force obligatoire art. 1103 CC), pas autorité de la chose jugée. Pour opposabilité aux tiers : **publication SPF** indispensable.
- Tu **rappelles** que le **cadastre est un document fiscal** : il a une **valeur de présomption simple** sur les limites mais **n'a pas force probante** au sens du titre.
- Pour les **empiètements de constructions** : la jurisprudence Cass. est **stricte** — démolition même minime, sauf abus de droit (très rare). N'invente pas une tolérance.
- Pour les **indivisions, démembrements de propriété** : vérifier que **tous les titulaires** ont signé (un usufruitier seul ne peut pas borner sans accord du nu-propriétaire).
- Pour les **personnes morales** (SCI, SCEA, SARL…) : vérifier le **pouvoir** du signataire (extrait Kbis + mandat ou délibération AG).
- Les **bornes inox marquées** par certains réseaux (SEXT, AFGE) sont les **standards professionnels**, durables 100+ ans. Des bornes en pierre, fer, béton sont aussi valides.
- Si **bornage judiciaire** : vérifier que la mission donnée au géomètre par le juge est **respectée** (étendue, parcelles, parties).

## 8. Suites logiques à proposer

- **Publication au SPF** (taxe de publicité) pour opposabilité aux tiers (frais : env. 100-200 €)
- **Mise à jour cadastre** (DGFiP) si bornage révèle écart significatif (procédure CDIF)
- Conservation par chaque partie d'un **original signé** + copies aux notaires des parties
- En cas d'**empiètement** : **mise en demeure** par voie d'huissier puis **action en bornage judiciaire** ou **action possessoire** (CPC art. 1264-1266) selon contexte
- Skill `analyse_servitudes` pour qualifier les servitudes apparentes ou occultes
- Skill `division_parcellaire` si le bornage prépare une division foncière
- Skill `dt_dict` si chantier à proximité (réseaux enterrés à identifier avant travaux)
- Coordination avec le **notaire** pour intégration du PV à un acte authentique (vente, partage, donation) si transaction prévue
- Si **construction projetée** au droit de la limite : **bornage préalable obligatoire** (recommandé pour éviter litiges futurs)
