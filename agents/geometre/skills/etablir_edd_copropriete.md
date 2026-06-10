# Skill — Établir / analyser un EDD et un règlement de copropriété (tantièmes, modificatif)

L'utilisateur veut **établir, analyser ou modifier** un **État Descriptif de Division (EDD)** et/ou un **règlement de copropriété (RCP)** : numéroter les lots, **calculer ou vérifier les tantièmes / millièmes** (généraux et de charges spéciales), contrôler la **répartition des charges** (art. 10 loi 1965), ou préparer un **modificatif d'EDD/RCP** (réunion, scission, création de lots, surélévation). S'appuie sur le corpus `copropriete_edd_reglement.md`.

## 1. Documents attendus

- **EDD existant** (état descriptif de division) + **tableau des lots** (n°, nature, tantièmes)
- **Règlement de copropriété (RCP)** + ses modificatifs successifs
- **Plans des lots** / plans des niveaux (DWG, PDF)
- **Acte d'origine** de la copropriété + actes de mutation des lots concernés
- **Mesurages** (Carrez / surface utile) des lots à créer ou modifier
- **Procès-verbaux d'AG** récents (autorisation de travaux, vote de modification)
- **Fiche synthétique** + n° d'immatriculation au registre national (ALUR)
- **DTG / carnet d'entretien** (si disponibles)

Si pièces partielles : demande
1. Objectif : **création** d'un EDD neuf / **analyse** d'un EDD-RCP existant / **modificatif** (réunion, scission, création de lot, surélévation) ?
2. Nombre de **lots** (et nature : appartements, caves, parkings, locaux commerciaux) ?
3. Existe-t-il des **parties communes spéciales** ou à **jouissance privative** (terrasses, jardins privatifs) ?
4. **Base** des tantièmes (1 000 / 10 000 / 100 000) et grilles de charges existantes (ascenseur, chauffage, eau) ?
5. Pour un modificatif : **décision d'AG** déjà votée ? À quelle **majorité** (art. 24 / 25 / 26 / unanimité) ?
6. Le lot modifié est-il **vendu / à vendre** (mesurage **Carrez** requis) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("loi 10 juillet 1965 article 5 tantièmes valeur relative")`
- `rag_search("loi 1965 article 10 répartition charges générales spéciales utilité")`
- `rag_search("loi 1965 article 8 règlement de copropriété contenu")`
- `rag_search("loi 1965 articles 24 25 26 majorités assemblée générale")`
- `rag_search("décret 17 mars 1967 copropriété application")`
- `rag_search("décret 1955 état descriptif de division publicité foncière")`
- `rag_search("loi Carrez 96-1107 superficie privative lot copropriété")`
- `rag_search("loi ALUR registre national fiche synthétique DTG fonds travaux")`
- `rag_search("loi 1965 article 12 révision répartition charges quart")`

## 3. Cadre juridique (rappels structurants)

| Texte | Contenu |
|---|---|
| **Loi 65-557 du 10 juillet 1965, art. 1** | Champ : immeuble réparti en **lots** (privatif + quote-part de communes) |
| **Art. 2 et 3** | Parties **privatives** / parties **communes** (présomption art. 3) |
| **Art. 5** | Tantièmes = proportionnels à la **valeur relative** des privatives (consistance, superficie, situation — sans égard à l'utilisation) |
| **Art. 6-2 / 6-3** | Parties communes **spéciales** / à **jouissance privative** (ord. 2019) |
| **Art. 8** | Contenu obligatoire du **RCP** (dont bases de répartition des charges — ALUR) |
| **Art. 10** | Deux régimes : charges **spéciales** (al. 1, selon **utilité**) / charges **générales** (al. 2, selon **tantièmes**) |
| **Art. 12** | **Révision** de répartition si écart > **1/4** (délais 5 ans / 2 ans) |
| **Art. 24 / 25 / 26 / unanimité** | **Majorités** d'AG selon la nature de la décision |
| **Décret 67-223 du 17 mars 1967** | Application |
| **Décret 55-1350 du 14 oct. 1955** | EDD pour la publicité foncière |
| **Loi 96-1107 (Carrez)** | Superficie privative à la vente d'un lot > 8 m² |
| **Loi ALUR 2014** | Immatriculation (RNIC), fiche synthétique, DTG, carnet d'entretien, fonds de travaux |

> **Distinction clé :** les **tantièmes** (art. 5, valeur relative) ≠ la **surface Carrez** (loi 96-1107, mesurage à la vente). La surface Carrez **ne sert pas** au calcul des tantièmes.

## 4. Procédure

### Étape 1 — Qualifier l'opération

- **Création** d'EDD : copropriété neuve ou mise en copropriété d'un immeuble existant.
- **Analyse** : contrôle de cohérence d'un EDD/RCP existant.
- **Modificatif** : réunion / scission / création de lot / surélévation / changement de destination / aliénation de communes.

### Étape 2 — Identifier parties privatives et communes

- Lister les **lots** (appartements, caves, parkings, locaux) et leur consistance.
- Qualifier les **parties communes** (générales, **spéciales**, à **jouissance privative**) → impacte les grilles de charges et les votes.

### Étape 3 — Calculer / vérifier les tantièmes (art. 5)

1. Déterminer la **valeur relative** de chaque lot (pondération : **superficie** + **situation** [étage, exposition, vue] + **consistance**).
2. Choisir une **base** (ex. 10 000) et répartir au prorata des valeurs relatives.
3. **Contrôle de bouclage** : la somme des tantièmes **généraux** = base exacte (ex. 10 000 / 10 000).
4. Établir les **grilles de charges spéciales** (art. 10 al. 1) selon l'**utilité** (ex. ascenseur : RDC exonéré, pondération croissante avec l'étage ; chauffage : selon surfaces chauffées ; eau : selon usage).

### Étape 4 — Vérifier la conformité de la répartition des charges (art. 10)

- Charges **générales** (conservation, entretien, administration) → tantièmes généraux (art. 10 al. 2).
- Charges **spéciales** (équipements / services) → selon utilité objective (art. 10 al. 1).
- Repérer une **non-conformité** (ex. RDC payant l'ascenseur, clé manifestement disproportionnée) → risque d'**action en révision art. 12** (écart > 1/4).

### Étape 5 — Cas du modificatif

1. **Mesurer** les lots concernés (Carrez si lot d'habitation > 8 m² destiné à la vente).
2. **Recalculer** les tantièmes en **conservant la base constante** (la ventilation d'un lot scindé doit redonner exactement les tantièmes du lot d'origine ; une réunion additionne).
3. **Plans modificatifs** des lots.
4. **Qualifier la majorité d'AG** requise (art. 24 / 25 / 25-1 passerelle / 26 / unanimité) selon l'effet sur les communes et la destination.
5. **Rédaction notariale** du modificatif d'EDD / RCP + **publication au SPF**.

### Étape 6 — Contrôles ALUR

- Vérifier l'**immatriculation** (RNIC), la **fiche synthétique** à jour, l'existence d'un **DTG** / **carnet d'entretien** / **fonds de travaux**.

## 5. Restitution structurée

```
## EDD / Règlement de copropriété — [Immeuble]

### Identification
- **Immeuble** : [adresse]
- **Références cadastrales** : [section + n° + contenance]
- **N° d'immatriculation (RNIC)** : [...]
- **Nombre de lots** : [N]
- **Base des tantièmes** : [1 000 / 10 000 / 100 000]
- **Objet** : création / analyse / modificatif [réunion / scission / création de lot / surélévation]
- **Date d'analyse** : [JJ/MM/AAAA]
- **Géomètre-expert** : [nom + n° Ordre OGE]

### Tableau des lots et tantièmes

| Lot | Bât/Étage | Nature | Surface (m²) | Valeur relative | Tantièmes généraux | Grille ascenseur | Grille chauffage | Grille eau |
|---|---|---|---|---|---|---|---|---|
| 1 | A / RDC | Appartement | 62,0 | ... | 850 | 0 (RDC exonéré) | 600 | 700 |
| 2 | A / R+2 | Appartement | 75,0 | ... | 1 050 | 1 200 | 750 | 850 |
| 12 | S-sol | Cave | 6,0 | ... | 40 | 0 | 0 | 0 |
| ... | | | | | | | | |
| **TOTAL** | | | | | **10 000** | **10 000** | **10 000** | **10 000** |

### Contrôle de bouclage
- Somme tantièmes généraux = [valeur] / base [10 000] → ✅ / ❌
- Somme de chaque grille de charges = base → ✅ / ❌

### Conformité de la répartition des charges (art. 10)
| Poste de charges | Régime (al. 1 / al. 2) | Clé appliquée | Conforme ? |
|---|---|---|---|
| Administration, conservation | Al. 2 (générales) | Tantièmes généraux | ✅ |
| Ascenseur | Al. 1 (utilité) | Grille ascenseur (RDC exonéré) | ✅ |
| Chauffage collectif | Al. 1 (utilité) | Grille selon surfaces chauffées | ⚠️ à vérifier |

### Parties communes spéciales / à jouissance privative
- [Ex : terrasse lot 8 = partie commune à jouissance privative — reste commune en propriété]
- [Ex : hall bât. B = partie commune spéciale aux lots du bât. B + vote spécial]

### Modificatif (si applicable)
- **Opération** : [scission lot 5 → lots 5 et 14]
- **Tantièmes avant** : lot 5 = 900
- **Tantièmes après** : lot 5 = 520 + lot 14 = 380 (somme = 900 → équilibre conservé ✅)
- **Mesurage Carrez** des nouveaux lots : [m²]
- **Majorité d'AG requise** : [art. 25 b — autorisation travaux affectant communes] — à confirmer
- **Acte** : modificatif d'EDD/RCP (notaire) + publication SPF

### Points d'attention
1. [Ex : RDC participe à l'ascenseur → non conforme art. 10 al. 1, risque art. 12]
2. [Ex : somme des tantièmes = 10 020 ≠ base 10 000 → erreur de bouclage à corriger]
3. [Ex : surélévation = création de lot sur droit accessoire art. 4 → majorité renforcée / unanimité selon atteinte aux communes]

### Niveau de confiance
- [Élevé / À valider après vote AG / À reprendre après mesurage Carrez]
```

→ Sur demande explicite ou en push proactif, proposer la génération du livrable :
`generer_rapport({ titre: "EDD et grille de tantièmes — [immeuble]", contenu: <markdown ci-dessus>, format: "xlsx" (grille) ou "docx" (note + projet de modificatif), agent: "geometre", metadata: { immeuble, references_cadastrales, rnic, OGE_signataire_prevu, date } })`

> 👉 *Souhaites-tu que je génère la **grille de tantièmes (XLSX)** et/ou la **note de modificatif d'EDD/RCP (DOCX)** prête à transmettre au notaire et au syndic ?*

## 6. Garde-fous spécifiques

- Tu **ne signes pas** l'EDD ni le modificatif — c'est le **géomètre-expert OGE** qui établit l'EDD et les plans (sa responsabilité), et le **notaire** qui rédige et **publie** l'acte au SPF.
- Le calcul des **tantièmes** (art. 5) repose sur la **valeur relative** (superficie + situation + consistance), **pas** sur la seule surface ni sur la surface Carrez. Ne **confonds pas** tantièmes et Carrez.
- Le **bouclage** est impératif : la somme des tantièmes généraux (et de chaque grille) doit être **exactement** égale à la base. Une scission doit **ventiler à l'identique** ; une réunion doit **additionner**. Tout écart est une erreur.
- La **répartition des charges** doit respecter l'**art. 10** (spéciales = utilité ; générales = tantièmes). Une clé non conforme expose à une **action en révision (art. 12)** si l'écart dépasse **1/4** (délais 5 ans / 2 ans).
- La **majorité d'AG** d'un modificatif (art. 24 / 25 / 25-1 / 26 / unanimité) dépend précisément de l'effet sur les **parties communes** et la **destination** — à **qualifier au cas par cas** ; ne **tranche pas** une majorité sans analyse, signale le point de vigilance.
- Une **création de lot** (combles, surélévation) suppose souvent la **cession d'un droit accessoire** (art. 4) et peut requérir une **double majorité (art. 26) voire l'unanimité** en cas d'atteinte aux droits / aux communes.
- Pour la **vente** d'un lot d'habitation > 8 m² : **mesurage Carrez** obligatoire (loi 96-1107, sanction art. 4-2 : écart > 5 % → diminution de prix dans 1 an). Voir skill `calculer_surfaces_legales`.
- Le statut de la copropriété est **d'ordre public** (art. 43) : toute clause contraire du RCP est **réputée non écrite**.
- Tu **ne génères pas** de livrable si les pièces sont **manifestement incomplètes** (EDD/RCP absents, mesurages non faits) — demande d'abord les compléments.

## 7. Suites logiques à proposer

- **Mesurage Carrez** des lots créés / vendus (skill `calculer_surfaces_legales`)
- **Plans des lots** géoréférencés + DMPC si la modification affecte le parcellaire (skill `etablir_dmpc`)
- **Vote en AG** à la majorité requise (coordination syndic) puis **acte notarié** + **publication SPF**
- Mise à jour de la **fiche synthétique** et du **registre national** (ALUR)
- Vérification **DTG** / **carnet d'entretien** / **fonds de travaux** (loi Climat 2021)
- Si l'ensemble relève en réalité d'un **ensemble immobilier complexe** sans parties communes : envisager une **division en volumes** (skill `diviser_en_volumes`)
- Coordination **notaire** (publicité foncière) et **syndic** (mise en œuvre, mise à jour du RCP)
