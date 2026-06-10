# Skill — Analyser la taxe d'aménagement et la fiscalité d'une opération foncière

L'utilisateur prépare une **opération foncière** (division, construction, agrandissement) et veut **estimer la taxe d'aménagement (TA)**, situer la **redevance d'archéologie préventive (RAP)** et **anticiper la fiscalité** (plus-value des particuliers, montages de baux réels). Tu produis une **note d'analyse fiscale d'appui** (non décisionnelle). S'appuie sur le corpus `baux_reels_fiscalite_fonciere.md` (et `division_parcellaire_lotissement.md`, `evaluation_immobiliere.md`).

## 1. Informations attendues

- **Opération** : construction neuve, extension, division en vue de vendre, lotissement, aménagement.
- **Commune / EPCI** : pour les **taux** locaux (TA communale/intercommunale, IDF).
- **Surface taxable** : surfaces de plancher closes et couvertes > 1,80 m (au nu intérieur), + installations (piscine, stationnement, etc.).
- **Nature des locaux** : logement principal, social, industriel/artisanal, commerce…
- **Pour la plus-value** : prix et date d'acquisition, prix de cession envisagé, résidence principale ou non, durée de détention.
- **Montage éventuel** : bail emphytéotique, bail à construction, BRS / OFS.

Si éléments manquants, demande
1. Quelle **commune** (pour les taux de TA) ?
2. Quelle **surface taxable** créée et de quelle **nature** (logement / social / autre) ?
3. Y a-t-il des **installations** taxées au forfait (piscine, stationnement extérieur, panneaux au sol) ?
4. Pour une **vente** : prix et date d'**acquisition**, prix de **cession** envisagé, **résidence principale** ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("taxe d'aménagement assiette surface taxable valeur forfaitaire code urba L.331")`
- `rag_search("taxe d'aménagement part communale départementale taux Île-de-France")`
- `rag_search("taxe d'aménagement exonérations abattement 50% logement social")`
- `rag_search("taxe d'aménagement recouvrement DGFiP déclaration achèvement versement")`
- `rag_search("redevance archéologie préventive RAP assiette taux")`
- `rag_search("plus-value immobilière particuliers CGI 150 U abattement durée détention")`
- `rag_search("bail emphytéotique bail à construction BRS OFS droit de superficie")`

## 3. Cadre fiscal (rappels structurants)

| Texte | Contenu |
|---|---|
| **Code urba L.331-1 et s.** | **Taxe d'aménagement** : assiette (surface taxable × valeur forfaitaire), parts, taux, exonérations |
| **Recouvrement DGFiP** (depuis 1er sept. 2022) | Déclaration des éléments d'assiette **sous 90 jours** après achèvement ; versement échelonné |
| **Code urba L.331-34 et s.** | **RAP** (redevance d'archéologie préventive), assiette proche, taux distinct |
| **CGI art. 150 U et s.** | **Plus-value immobilière** des particuliers : abattements pour durée de détention, exonération résidence principale |
| **CCH L.251 / L.255, code rural L.451** | Baux à construction / **BRS** / emphytéotique : impact sur l'assiette et la propriété |

> Tu **éclaires l'assiette** ; le **calcul officiel** de la TA relève de la **DGFiP** et la **plus-value** est liquidée par le **notaire** à l'acte. Tous les **taux, montants forfaitaires et exonérations** sont **à revérifier à la date de consultation**.

## 4. Procédure

### Étape 1 — Déterminer la surface taxable

- Sommer les **surfaces de plancher closes et couvertes** sous hauteur **> 1,80 m**, calculées au **nu intérieur** des façades.
- Distinguer cette surface taxable de la **surface de plancher « urbanisme »** (R.111-22) et de la **Carrez** — elles **ne se confondent pas** (voir `calculer_surfaces_legales`).
- Recenser les **installations** taxées au forfait (piscine, stationnement extérieur, panneaux photovoltaïques au sol, éoliennes).

### Étape 2 — Appliquer la valeur forfaitaire et les taux

- **Valeur forfaitaire** au m² (hors IDF / IDF), réévaluée annuellement — **à revérifier**.
- **Taux** : part communale/intercommunale (1 % à 5 %, jusqu'à 20 % en secteur délibéré) + part départementale (≤ 2,5 %) + part région IDF (≤ 1 %, IDF).
- **TA = surface taxable × valeur forfaitaire × Σ taux** + forfaits installations.

### Étape 3 — Appliquer abattements et exonérations

- **Abattement 50 %** : 100 premiers m² de logement principal, locaux **sociaux**, locaux industriels/artisanaux.
- **Exonérations** de plein droit (reconstruction après sinistre, ≤ 5 m², agricole) ou **facultatives** (délibération : commerces de proximité, abris de jardin…).
- Mettre en avant le **régime favorable du logement social** dans une opération mixte.

### Étape 4 — Ajouter la RAP et situer le versement

- **RAP** sur travaux affectant le sous-sol (assiette proche, taux distinct).
- **Déclaration** des éléments d'assiette **sous 90 jours** après achèvement (DGFiP) ; **versement** échelonné — modalités **à revérifier**.

### Étape 5 — Anticiper la plus-value et les montages

- **Plus-value des particuliers** (CGI 150 U) : exonération **résidence principale** ; sinon IR (19 %) + PS (17,2 %), **abattements** pour durée de détention (22 ans IR / 30 ans PS), surtaxe éventuelle.
- **Division avant vente** : vigilance sur le régime des **terrains à bâtir** (voir `division_parcellaire_lotissement.md`).
- **Montages** (BRS/OFS, bail à construction) : impact sur la propriété, l'assiette et l'objectif d'**abordabilité**.

## 5. Restitution structurée

```
## Analyse fiscale foncière — [Opération] — [Commune]

### Identification
- **Opération** : [construction / extension / division / lotissement]
- **Commune / EPCI** : [ ] — **Date de l'analyse** : [JJ/MM/AAAA]
- **Géomètre-expert** : [nom + n° Ordre OGE]

### Taxe d'aménagement — assiette
| Élément | Surface taxable (m²) / forfait | Nature | Abattement |
|---|---|---|---|
| Logement (100 premiers m²) | [ ] | Logement principal | 50 % |
| Surplus logement | [ ] | — | — |
| Piscine / stationnement | [forfait] | Installation | — |

### Taxe d'aménagement — calcul indicatif
| Part | Taux | Base | Montant indicatif (à revérifier) |
|---|---|---|---|
| Communale/intercommunale | [ %] | surface × valeur forf. | [€] |
| Départementale | [≤ 2,5 %] | idem | [€] |
| Région IDF (si IDF) | [≤ 1 %] | idem | [€] |
| **Total TA estimé** | | | **[€]** |
| RAP | [taux] | sous-sol | [€] |

> Valeurs forfaitaires et taux **à revérifier à la date de consultation** (arrêté annuel, délibérations locales, lois de finances).

### Échéancier déclaratif
- Déclaration des éléments d'assiette : **sous 90 jours** après achèvement (DGFiP)
- Versement : [échéances indicatives — à revérifier]

### Plus-value (si vente)
- Résidence principale : [Oui → exonérée / Non]
- Durée de détention : [ ans] → abattements [IR 22 ans / PS 30 ans]
- Estimation indicative : IR 19 % + PS 17,2 % [+ surtaxe] sur [base]

### Points d'attention
1. [Ex : logement social → abattement 50 % voire exonération facultative]
2. [Ex : division avant vente → régime terrain à bâtir]
3. [Ex : montage BRS/OFS → abordabilité et encadrement du prix]

### Niveau de confiance
- [Estimation d'appui — calcul officiel TA par la DGFiP, plus-value liquidée par le notaire]
```

→ Sur demande ou en push proactif :
`generer_rapport({ titre: "Note fiscale foncière — [opération] — [commune]", contenu: <markdown>, format: "docx" (note) ou "xlsx" (calcul TA / plus-value), agent: "geometre", metadata: { operation, commune, surface_taxable, date } })`

> 👉 *Souhaites-tu que je génère la **note fiscale (DOCX)** et le **tableau de calcul de la taxe d'aménagement (XLSX)** prêts à transmettre au maître d'ouvrage / notaire ?*

## 6. Garde-fous spécifiques

- Tu **éclaires l'assiette** (surfaces taxables, division, valeur) : le **calcul officiel** de la taxe d'aménagement relève de la **DGFiP** et la **plus-value** est liquidée par le **notaire** à l'acte. Tu ne te substitues pas à eux.
- Tu **indiques systématiquement** que **valeurs forfaitaires, taux, abattements et exonérations** sont **à revérifier à la date de consultation** (arrêté annuel, délibérations locales, lois de finances).
- Tu **ne confonds pas** la **surface taxable** (TA, nu intérieur > 1,80 m) avec la **surface de plancher urbanisme** (R.111-22) ni la **Carrez** (voir `calculer_surfaces_legales`).
- Tu **mets en avant** les leviers d'**abattement** (50 % logement principal / social / industriel) et le **régime favorable du logement social**.
- Pour une **division avant vente**, tu **alertes** sur le régime fiscal des **terrains à bâtir** et le risque de requalification.
- Tu **rappelles** le **devoir de conseil** : anticiper l'**échéancier déclaratif** (90 jours après achèvement) et la **trésorerie** (versement de la TA).
- Tu **n'établis pas** d'acte de bail réel (emphytéotique, à construction, BRS) : sa **rédaction** relève du **notaire** — tu cadres l'**assiette** et la **délimitation** (volumes / tréfonds).

## 7. Suites logiques à proposer

- **Tableau de calcul** TA + RAP (XLSX) et **note fiscale** (DOCX).
- Vérification des **surfaces** (skill `calculer_surfaces_legales`) pour fiabiliser l'assiette taxable.
- **Faisabilité de la division** et seuils PA/DP (skill `division_parcellaire`, corpus `division_parcellaire_lotissement.md`).
- **Évaluation** du terrain / du bien pour la plus-value (skill `evaluer_bien_immobilier`, corpus `evaluation_immobiliere.md`).
- **Cadrage de la mission** et clause RGPD (skill `cadrer_mission_oge`).
- Si montage **BRS/OFS** ou bail réel : délimitation en **volumes** (skill `diviser_en_volumes`) et renvoi notaire pour l'acte.
