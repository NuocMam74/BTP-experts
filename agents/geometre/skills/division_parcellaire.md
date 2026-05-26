# Skill — Diviser une parcelle (PA, DP, modification cadastrale)

L'utilisateur envisage de **diviser une parcelle** (vendre une partie, créer un lot à bâtir, sortir une bande de terrain). Tu dois **identifier la procédure** applicable (PA, DP, modification cadastrale seule), **vérifier la faisabilité** au regard du PLU, et **anticiper les obligations** d'aménagement.

## 1. Documents attendus

- **Plan cadastral** + **matrice cadastrale** (extrait DGFiP)
- **Titre de propriété** + chaîne des titres
- **Règlement du PLU** + **plan de zonage** + **OAP** + **annexes SUP**
- **Plan d'esquisse de division** envisagé
- **Plan topographique** récent
- **Étude géotechnique** G1 ES éventuelle
- **Diagnostic** des servitudes existantes
- **Notice de programme** : nature des futurs lots (bâtir, jardin, etc.)
- **Existant** : photos, constructions sur la parcelle mère

Si pièces partielles : demande
1. Combien de **lots** sont prévus issus de la division ?
2. Quels lots sont destinés à la **construction** ? Au maintien comme jardin ?
3. La division est-elle suivie d'une **vente** ? D'une donation ? D'un partage ?
4. Période envisagée : **dans les 10 ans précédant** une autre division ou non (déterminant pour lotissement) ?
5. Existence d'**éléments existants** (maison, dépendance, haie) à conserver ou démolir ?
6. **Accès** prévu pour chaque lot ?
7. **Réseaux** : raccordés ou à créer ?
8. Demande de **CUb** (certificat d'urbanisme opérationnel) envisagée ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("code urbanisme article L.442-1 définition lotissement")`
- `rag_search("code urbanisme L.442-2 PA permis d'aménager seuils")`
- `rag_search("code urbanisme R.421-19 R.421-23 PA DP seuils")`
- `rag_search("code urbanisme R.442-1 R.442-9 procédure PA")`
- `rag_search("code urbanisme R.421-19 division déclaration préalable")`
- `rag_search("loi ALUR 2014 lotissement modifications")`
- `rag_search("code civil article 815 815-14 partage indivision")` — si partage indivisaires

## 3. Procédure applicable selon contexte

### A — Définition du lotissement (code urbanisme L.442-1)

> "Constitue un lotissement la division en propriété ou en jouissance d'une **unité foncière** ou de plusieurs unités foncières contiguës ayant pour objet de créer un ou plusieurs lots destinés à être bâtis."

**Caractéristiques** :
- Division **en propriété ou en jouissance** (vente, location ≥ 1 an, division en volumes)
- **Au moins un lot** destiné à être bâti
- **Unité foncière** : ensemble des parcelles d'un même propriétaire d'un seul tenant

### B — Régime de la division (PA, DP ou simple modification cadastrale)

| Cas | Procédure | Texte |
|---|---|---|
| Division **avec création de voie** ou **espace commun** | **PA** (Permis d'Aménager) | L.442-2 et R.421-19 |
| Division en site protégé (ABF, AVAP, MH classé, secteur sauvegardé) | **PA** | R.421-19 |
| Division avec création d'**au moins 1 lot bâtissable** sans voie/espace commun | **DP** (Déclaration Préalable) | R.421-23 |
| Division **dans les 10 ans** suivant une autre division (totalisant 3 lots ou plus) | **PA** (à partir du 3e lot) | L.442-1-1 et R.421-19 |
| Division **simple** sans création de lot à bâtir (rétrocession, partage, rectification cadastrale) | **Aucune procédure d'urbanisme** | DGFiP modification cadastrale seule |
| Division par voie de partage **judiciaire** | DP en général | doctrine |

### C — Cas de dispense d'autorisation (R.442-1 à R.442-9)

Sont **exclus du lotissement** (donc ni PA ni DP au titre du lotissement) :
- Divisions par donation, succession, partage (sans création de lot à bâtir)
- Divisions opérées en application d'une décision de justice
- Divisions en vue de réaliser un programme déclaré d'utilité publique
- Divisions de terrains résultant d'un PC valant lotissement (PC groupé)
- Division en jouissance temporaire (< 1 an)

## 4. Seuils et modalités PA / DP

### PA — Permis d'Aménager (R.421-19)

**Cas exigeant un PA** :
- Création de **voies, espaces communs** (parking, espaces verts, locaux poubelles)
- Lotissement en **secteur sauvegardé**, **AVAP**, **site classé**, **site inscrit**, **MH classé**
- Lotissement **dans les 10 ans** d'une autre division **portant total à ≥ 3 lots**

**Procédure** :
- Instruction : **3 mois** (5 mois si ABF)
- Cerfa 13409 (PA)
- Pièces : PA1 à PA8 (situation, projet, règlement de lotissement, équipements, etc.)
- **Garantie financière d'achèvement** (GFA) pour les équipements communs si vente avant achèvement
- **Mention contraignante** au règlement de copropriété ou règlement de lotissement

### DP — Déclaration Préalable (R.421-23)

**Cas relevant de la DP** :
- Division parcellaire **simple** créant au moins 1 lot à bâtir
- **Pas de création** de voirie ni d'espace commun

**Procédure** :
- Instruction : **1 mois** (2 mois si ABF)
- Cerfa 13702 (DP)
- Pièces : DP1 à DP10 (situation, projet, plans)
- Pas de GFA exigée
- Plus simple et rapide

### Modification cadastrale seule (DGFiP)

**Cas** : division **sans création de lot à bâtir** :
- Rectification cadastrale (correction d'erreur)
- Rétrocession à voisinage
- Partage entre indivisaires sans construction prévue

**Procédure** :
- Plan parcellaire émis par **géomètre-expert** (monopole)
- **Document modificatif du parcellaire cadastral (DMPC)** transmis à la DGFiP
- Aucune procédure d'urbanisme
- Pas de PA, pas de DP

## 5. Vérifications obligatoires AVANT division

### Étape 1 — Vérification PLU pour chaque lot futur

Pour chaque **futur lot**, vérifier :
- **Zone PLU** (UA, UB, UC, AU, A, N) → autorise-t-elle la destination prévue ?
- **Surface minimum** parcelle (si exigée par PLU)
- **Emprise au sol** : reste-t-il suffisamment pour bâtir ?
- **Hauteur maximale** : compatible avec programme ?
- **Recul** par rapport à la voie et **limites séparatives** : respectables ?
- **Stationnement** : nombre de places réalisables sur chaque lot ?
- **Coefficient de Biotope par Surface (CBS)** ou **espaces verts** : possible sur chaque lot ?
- **OAP** applicable ?
- **SUP** (servitudes utilité publique) limitantes ?

### Étape 2 — Vérification accès (art. R.151-47)

- Chaque lot doit avoir **accès direct** à la voie publique (ou via servitude valable)
- Si **enclave créée** : prévoir **servitude de passage** au profit du lot enclavé (art. 682 CC)
- Si **création de voirie** : passage en **PA** obligatoire

### Étape 3 — Vérification raccordement aux réseaux

- **Eau potable** : disponible au droit ? Capacité suffisante ?
- **Assainissement** : collectif (raccordement réseau) ou non collectif (étude SPANC, étude G1 sol) ?
- **Eaux pluviales** : possibilité d'infiltration ou raccordement ?
- **Électricité** : raccordement Enedis (devis à anticiper)
- **Gaz** : pas obligatoire mais possibilité ?
- **Télécom** : fibre disponible ?

### Étape 4 — Vérification servitudes existantes

- Servitudes **conventionnelles** mentionnées au titre (à respecter ou racheter)
- Servitudes **par destination du père de famille** : à formaliser au moment de la division
- Servitudes **légales** (passage pour enclave, eaux) : à intégrer
- Voir skill `analyse_servitudes`

### Étape 5 — Vérification fiscale

- **Plus-value immobilière** : si vente, calcul de la plus-value (art. 150 U CGI) — exonération si résidence principale ou détention > 30 ans
- **TVA** sur terrain à bâtir si vendeur professionnel
- **Taxe d'aménagement** sur futures constructions (R.331-7) — financière, à anticiper
- **Frais de notaire** (acte de vente, hypothèque) — 7-8 % du prix

## 6. Étapes pratiques de la division

1. **Étude préliminaire** : faisabilité PLU, accès, réseaux, fiscalité
2. **Demande de CUb** (certificat d'urbanisme opérationnel) — engage la commune sur 18 mois (recommandé)
3. **Mesurage géomètre-expert** : lever topographique de la parcelle mère, projet de division
4. **Établissement plan de division** : sectorisation, coordonnées Lambert 93, surfaces lots
5. **Dépôt PA ou DP** en mairie selon procédure applicable
6. **Instruction** : 1 à 3 mois selon procédure + extensions ABF/secteur protégé
7. **Affichage** sur terrain (pendant toute durée des travaux d'aménagement si PA, sinon dès accord pour 2 mois minimum)
8. **Délai de recours des tiers** : 2 mois à compter de l'affichage
9. **DMPC** (Document Modificatif du Parcellaire Cadastral) émis par géomètre-expert et transmis à la DGFiP
10. **Acte notarié de vente** ou de partage selon contexte
11. **Publication au SPF** (publicité foncière) pour opposabilité

## 7. Restitution structurée

```
## Division parcellaire — Parcelle [section + n°]

### Identification
- **Parcelle mère** : [section + n° cadastral]
- **Commune** : [...]
- **Propriétaire** : [...]
- **Surface totale** : [m²]
- **Zone PLU** : [...]
- **Site protégé** : [oui/non — préciser ABF, AVAP, MH]
- **Date d'analyse** : [JJ/MM/AAAA]
- **Géomètre-expert** : [nom + n° Ordre OGE]

### Programme de division
- **Nombre de lots projetés** : [N]
- **Destination de chaque lot** :
  - Lot 1 : conservé propriétaire, maintien existant
  - Lot 2 : à bâtir, MI individuelle 120 m² SDP
  - Lot 3 : à bâtir, vente
- **Création voirie ou espace commun** : [oui/non]
- **Division dans les 10 ans d'une précédente** : [oui/non]

### Procédure applicable
- **Régime** : ⬜ Aucune procédure / ⬜ DP / ⬜ PA
- **Justification** : [...]
- **Délai d'instruction** : [1 mois DP / 3 mois PA / + 1-2 mois si ABF]
- **Cerfa applicable** : [13702 DP / 13409 PA]

### Vérifications PLU (par lot)

| Lot | Zone | Destination | Surface | Emprise possible | Hauteur OK | Recul OK | Stationnement | Verdict |
|---|---|---|---|---|---|---|---|---|
| Lot 1 | UB | Maintien existant | 800 m² | — | — | — | — | ✅ |
| Lot 2 | UB | Habitation MI | 480 m² | OK (60 % max) | OK (R+1) | OK (3 m / 4 m) | OK (2 places) | ✅ |
| Lot 3 | UB | Habitation MI | 520 m² | OK | OK | ⚠️ Recul 4 m côté nord à vérifier | OK | ⚠️ |

### Accès et raccordement réseaux

| Lot | Accès voie publique | Eau potable | Assainissement | Élec | Verdict |
|---|---|---|---|---|---|
| Lot 1 | Direct (existant) | OK | OK | OK | ✅ |
| Lot 2 | Servitude passage 3 m sur lot 1 à créer | À raccorder (10 m réseau) | À raccorder (15 m collectif) | Devis Enedis 6 k€ | ⚠️ |
| Lot 3 | Direct | À raccorder (8 m réseau) | À raccorder (20 m collectif) | À raccorder | ⚠️ |

### Servitudes à créer / formaliser

| Servitude | Fonds dominant | Fonds servant | Description | Action |
|---|---|---|---|---|
| Passage 3 m largeur | Lot 2 | Lot 1 | Voie privée d'accès à voie publique | Convention notariée + plan annexé + publication SPF |
| Canalisation eau | Lot 2 + Lot 3 | Lot 1 | Branchement réseau commun | Convention + plan annexé |

### Aspects fiscaux

- **Plus-value immobilière** sur lots vendus : [calculs estimés] — exonération résidence principale ? Détention > 22 ans (abattement IR) / > 30 ans (abattement total) ?
- **Frais notarié** estimatif : [7-8 % prix vente]
- **Taxe d'aménagement** future construction : [calcul indicatif]
- **TVA** : N.A. (vendeur particulier) / 20 % si professionnel

### Risques et points d'attention

1. [Ex : lot 2 enclavé sans accès direct → servitude obligatoire, à formaliser avant vente]
2. [Ex : recul 3 m côté nord lot 3 limite la constructibilité → bande non bâtissable]
3. [Ex : assainissement collectif éloigné → vérifier coût et délai raccordement avec service eau]
4. [Ex : ABF imposé si secteur sauvegardé → 5 mois d'instruction au lieu de 3 mois]
5. [Ex : OAP impose accès groupé → revoir plan de division]

### Documents à préparer

| Document | Émetteur | Délai |
|---|---|---|
| Plan de division coté | Géomètre-expert | 2-3 semaines |
| Cerfa DP/PA | Pétitionnaire | 1 jour |
| Plans annexes (PA1 à PA8 ou DP1 à DP10) | Géomètre + pétitionnaire | 1-2 semaines |
| Convention de servitude | Notaire | 2-4 semaines |
| DMPC pour DGFiP | Géomètre-expert | Après accord urbanisme |
| Acte de vente notarié | Notaire | À partir de l'accord urbanisme + délai recours tiers |

### Plan d'action proposé

1. **Mois 1** : étude faisabilité + demande CUb mairie (réponse 2 mois)
2. **Mois 2** : levé topographique + plan de division
3. **Mois 3** : dépôt DP ou PA
4. **Mois 4** : instruction urbanisme
5. **Mois 5** : affichage + délai recours tiers
6. **Mois 6** : DMPC + acte notarié
7. **Mois 7** : publication SPF

### Niveau de confiance
- [Élevé / À valider après CUb / À reprendre selon résultats DP-PA]
```

## 8. Garde-fous spécifiques

- Tu **ne signes pas** la division — c'est le **géomètre-expert OGE** qui établit le DMPC et le notaire qui rédige les actes.
- **Lotissement vs division simple** : la frontière est subtile (création voirie ? espace commun ? lotissement dans les 10 ans ?). En cas de doute, **demander avis mairie** ou **CUb** avant engagement.
- La **création d'enclave** par division qui prive un lot d'accès est **interdite** sans servitude légale ou conventionnelle. La servitude **doit être préparée et formalisée** dès la division.
- Les **règles d'urbanisme** s'apprécient **lot par lot** après division : un lot conforme à l'origine peut devenir **non bâtissable** après division (emprise au sol, espaces verts, hauteur, etc.).
- Pour les **divisions en lotissement** (PA), un **règlement de lotissement** est exigé et s'impose à tous les lots — pas modifiable individuellement.
- Pour les **divisions par voie de partage entre indivisaires** : régies par art. 815-14 et suivants CC (procédure spécifique, sans PA/DP au titre du lotissement, mais peut nécessiter DP si lot à bâtir).
- **Délai de recours tiers** : 2 mois à compter de l'affichage **régulier** du PA ou DP sur le terrain — tant que ce délai n'est pas écoulé, la décision n'est **pas définitivement purgée**.
- Pour les **constructions existantes** sur la parcelle mère : vérifier qu'elles **restent conformes** au PLU après division (un seul lot peut hériter de la construction qui dépasserait les seuils).
- Pour les **terres agricoles ou naturelles** : la division en zone A ou N pour création de lot à bâtir est **généralement impossible** sauf cas spécifiques (STECAL : Secteur de Taille Et de Capacité d'Accueil Limitées).
- **Site protégé (ABF, MH classé, SPR)** : ABF peut **émettre un avis conforme** (donc bloquant) sur la division — pré-consultation **fortement recommandée**.
- **Loi MOP / signature architecte** : si l'un des lots reçoit construction > 150 m² SDP MI, **signature d'un architecte est obligatoire** au PC ultérieur (loi 3 janvier 1977).
- Tu **rappelles** que la **vente** n'est juridiquement possible qu'après **DMPC publié** et **division définitive**.

## 9. Suites logiques à proposer

- Demande de **CUb** (certificat d'urbanisme opérationnel) à la mairie — engage la commune 18 mois (R.410-1 et suivants)
- Skill `analyser_bornage` pour préparer le bornage des nouvelles limites
- Skill `analyse_servitudes` pour formaliser les servitudes inter-lots
- Skill `calculer_surfaces_legales` pour vérifier la SDP constructible de chaque lot
- Coordination avec un **notaire** dès le démarrage pour cadrer fiscalité, actes de vente, servitudes
- **Étude G1 ES** géotechnique si construction prévue (NF P 94-500)
- **Étude SPANC** si assainissement non collectif
- Préparation du **règlement de lotissement** (cas PA)
- Pour grandes opérations : **assistance MOA** par AMO spécialisé urbanisme opérationnel
- Anticipation des **demandes de PC** futures sur chaque lot — pré-projet d'esquisse
- Affichage en mairie + sur terrain dès accord d'urbanisme (panneau réglementaire 80 × 120 cm minimum)
