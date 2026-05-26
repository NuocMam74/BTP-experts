# Skill — Analyser un PLU pour faisabilité d'une opération

L'utilisateur veut savoir si un projet est réalisable sur une parcelle donnée au regard du Plan Local d'Urbanisme (PLU).

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **Règlement du PLU** (PDF, souvent volumineux : 80-300 pages) — identifier par les en-têtes "Zone UA", "Zone UB"… "Zone N" et la nomenclature R.151 du code de l'urbanisme.
- **Plan de zonage du PLU** (PDF/image) — couleurs et lettres zone.
- **Plan cadastral** ou extrait cadastral de la parcelle concernée.
- **Programme du projet** (note de l'utilisateur) : destination, SDP visée, hauteur, nombre de logements, etc.
- Parfois : **OAP** (Orientations d'Aménagement et de Programmation), **SUP** (servitudes d'utilité publique), **PADD** (Projet d'Aménagement et de Développement Durables — non normatif).

Si aucun document : pose ces questions structurantes avant toute analyse :
1. Commune et n° de parcelle (section + numéro cadastral) ?
2. Zone PLU (UA, UB, UC, AU, A, N…) si déjà connue ?
3. Destination du projet (habitation, bureau, commerce, ERP, etc.) ?
4. Programme : SDP visée, nombre de logements/locaux, hauteur ?
5. Existant sur la parcelle ?
6. Site protégé (ABF, secteur sauvegardé, MH classé, site Natura 2000) ?

## 2. Extraction des informations clés du règlement PLU

Quand le règlement est dans le contexte, EXTRAIS section par section :

| Information | Article PLU typique | Si absente |
|---|---|---|
| Destinations / sous-destinations autorisées | Art. 1 ou "Occupations et utilisations du sol" | Référer au tableau R.151-27 et R.151-28 |
| Destinations interdites | Art. 2 | Présomption d'interdiction si non listée comme autorisée |
| Conditions particulières (mixité sociale, performance énergétique) | Art. 2 ou 3 | Vérifier OAP |
| Accès et voirie | Art. 3 | Code voirie communale |
| Desserte par les réseaux | Art. 4 | Délibération du SIE local |
| Implantation par rapport aux voies | Art. 6 | Recul minimum 3-5 m fréquent |
| Implantation par rapport aux limites séparatives | Art. 7 | L = H/2 mini souvent, ou prospect |
| Implantation sur la même propriété | Art. 8 | Distances entre 2 bâtiments |
| **Emprise au sol (CES)** | Art. 9 | Si non précisé, illimité |
| **Hauteur maximale** | Art. 10 | À l'égout / au faîtage / au niveau supérieur. Préciser **comment** elle est mesurée. |
| Aspect extérieur | Art. 11 | Renvoi PLU + ABF |
| **Stationnement** | Art. 12 | Ratio places / logement, places PMR (2 % mini) |
| **Espaces libres et plantations** | Art. 13 | Coefficient de biotope (CBS), espaces verts en pleine terre |
| **COS / densité** | Art. 14 (PLU avant ALUR) ou disparu (PLU post-ALUR) | Loi ALUR 2014 a supprimé COS, vérifier date du PLU |

## 3. Vérifications normatives (`rag_search` obligatoire)

Avant de conclure, lance ces requêtes :
- `rag_search("seuils permis de construire vs déclaration préalable")` — R.421-1 à R.421-12 code urba
- `rag_search("recours obligatoire architecte loi 1977")` — > 150 m² SDP en habitation individuelle
- `rag_search("loi ALUR suppression COS")` — pour PLU antérieurs à 2014
- Si site protégé : `rag_search("ABF avis conforme")` — code patrimoine art. L.621-31

## 4. Procédure d'analyse

1. **Identifier la zone PLU** depuis le plan de zonage et qualifier-la (urbaine UA/UB/UC, à urbaniser AU, agricole A, naturelle N).
2. **Vérifier la destination du projet** vs destinations autorisées (art. 1 et 2).
3. **Vérifier les règles morphologiques** :
   - Recul / limites séparatives (art. 6 et 7)
   - Hauteur maximale (art. 10) avec son mode de mesurage
   - Emprise au sol (art. 9)
   - Espaces verts / CBS (art. 13)
4. **Vérifier les obligations programmatiques** :
   - Stationnement (art. 12) — calculer nombre de places requises
   - Performance énergétique éventuelle (art. 14 ou 15 selon PLU)
   - Mixité sociale (servitude L.151-15)
5. **Identifier les servitudes** mentionnées au PLU ou en SUP (réseaux, recul ICPE, captage, monument historique).
6. **Croiser avec OAP** : si la parcelle est dans une OAP, extraire les principes de composition urbaine (gabarit, accès, espaces publics).
7. **Conclure sur la faisabilité** : possible / possible avec adaptations / impossible — pour chaque cas, lister les leviers (dérogation, modification PLU, recours ABF, etc.).

## 5. Restitution structurée

```
## Analyse PLU — Parcelle [section + n°], commune de [...]

### Identification de la zone
- **Zone PLU** : [code zone] ([qualif: urbaine / à urbaniser / agricole / naturelle])
- **Date d'approbation du PLU** : [...]
- **OAP applicable** : [oui / non — référence]
- **SUP applicables** : [...]
- **Site protégé** : [non / ABF / secteur sauvegardé / SPR]

### Programme projet
- **Destination** : [...]
- **SDP visée** : [m²]
- **Logements / locaux** : [nombre + typologie]
- **Hauteur** : [m]
- **Emprise** : [m²]

### Confrontation programme ↔ règlement

| Règle PLU | Exigence | Projet | Conformité | Recommandation |
|---|---|---|---|---|
| Destination (art. 1-2) | [exigence] | [valeur] | [✅ / ⚠️ / ❌] | [...] |
| Recul voirie (art. 6) | [m] | [m] | | |
| Limites séparatives (art. 7) | [...] | | | |
| Emprise au sol (art. 9) | [%] | [%] | | |
| Hauteur (art. 10) | [m] | [m] | | |
| Stationnement (art. 12) | [places] | [places] | | |
| Espaces verts (art. 13) | [%] | [%] | | |

### Servitudes à vérifier
- [SUP 1] : [impact]
- [SUP 2] : [impact]

### Verdict de faisabilité
- **Statut** : [Faisable / Faisable avec adaptations / Non faisable en l'état]
- **Leviers possibles** : [dérogation, modification, etc.]

### Démarches à suivre
1. [Action 1 — ex: certificat d'urbanisme opérationnel (CUb)]
2. [Action 2 — ex: avis ABF préalable si MH classé voisin]
3. [Action 3 — ex: déposer PC ou DP selon seuils R.421]
```

## 6. Outils à utiliser

- `rag_search` — obligatoire avant toute citation d'article CCH ou code urba
- `calc_surfaces` — si l'utilisateur demande le calcul de la SDP du projet à comparer aux seuils

## 7. Garde-fous spécifiques

- Tu **ne valides pas** un projet — tu prépares une **analyse de faisabilité** qui doit être complétée par un **certificat d'urbanisme** (CU a ou b) auprès de la mairie. Le CUb engage l'administration sur 18 mois.
- Tu **ne contournes pas** une règle PLU par interprétation : si elle est claire, elle s'applique. Pour les cas de **dérogation** (art. L.152-3 et suiv. code urba) et **adaptation mineure** (art. L.152-3), tu rappelles que c'est l'administration qui décide.
- Pour les **PLU antérieurs à 2014** (loi ALUR), vérifie que les articles COS (art. 14) sont effectivement **supprimés** dans la pratique — certaines communes ont des PLU non révisés mais COS de facto inapplicables.
- Pour les **secteurs ABF** (UNESCO, AVAP, SPR, MH classé/inscrit) : tu rappelles que l'avis ABF peut être **conforme** (art. L.621-31 code patrimoine) — donc bloquant.
- Pour les **OAP** : tu rappelles qu'elles ont **valeur réglementaire opposable** (L.152-1 code urba) — donc s'imposent à l'instruction du PC.

## 8. Suites logiques à proposer

- Demande de **certificat d'urbanisme opérationnel (CUb)** à la mairie pour sécuriser l'opération
- Préparation des **plans d'esquisse** intégrant les contraintes morphologiques
- Pré-consultation **ABF** si site protégé
- Étude faisabilité technique (G1 ES géotech, raccordements réseaux, accès voirie)
- Si dépassement de seuil ALUR/architecte (> 150 m² SDP en MI), rappel obligation de signature architecte
