# Skill — Calculer les surfaces légales (Carrez, Boutin, SDP, utile, brute)

L'utilisateur veut **mesurer ou vérifier** les surfaces réglementaires d'un logement, d'un local ou d'un bâtiment selon les **différents référentiels légaux** : **Carrez** (copropriété), **Boutin** (location), **SHAB** (habitable), **SDP** (urbanisme), **surface utile, surface brute**, **surface taxable**.

## 1. Documents attendus

- **Plans cotés** du logement ou bâtiment (PDF, DWG)
- **Acte de copropriété** (état descriptif de division, règlement de copropriété)
- **Acte de vente** ou **bail** mentionnant la surface
- **Coupes** (pour vérifier hauteurs sous plafond, combles, mezzanines)
- **Plan de la parcelle** et **règlement PLU** (pour SDP, surface taxable)
- **Diagnostic Carrez** ou **Boutin** déjà émis (à contrôler)

Si pièces partielles : demande
1. Quel(s) référentiel(s) cibler : **Carrez**, **Boutin**, **SHAB**, **SDP**, **surface utile**, **surface brute**, **surface taxable** ?
2. Type de bien : maison individuelle / appartement / locaux commerciaux / mixte ?
3. Statut : vente / location nue / location meublée / copropriété / construction neuve ?
4. Combles aménagés ou non ? Sous-pentes ? Mezzanines ?
5. Surfaces extérieures à intégrer/exclure (balcons, terrasses, jardins, caves, garages, parkings) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("loi 96-1107 Carrez surfaces privatives copropriété")`
- `rag_search("loi 2009-323 Boutin surface habitable location")`
- `rag_search("CCH article R.156-1 surface habitable")` — ex-R.111-2
- `rag_search("code urbanisme R.111-22 surface de plancher SDP")`
- `rag_search("code urbanisme R.331-7 surface taxable")` — taxe d'aménagement
- `rag_search("loi ALUR 2014 mesurage copropriété parties privatives")`
- `rag_search("jurisprudence Carrez 5 % tolérance article 4-2")` — sanctions
- `rag_search("ordonnance 21 mai 1945 géomètre-expert mesurage")` — monopole certains mesurages

## 3. Tableau récapitulatif des surfaces légales

| Référentiel | Loi / texte | Usage | Exclusions principales | Tolérance |
|---|---|---|---|---|
| **Carrez** | Loi 96-1107 du 18/12/1996 | Vente d'un lot de copropriété | Caves, garages, parkings, balcons, terrasses, loggias, vérandas non chauffées, parties < 1,80 m de hauteur sous plafond | **5 %** (art. 4-2) — sinon action en diminution prix |
| **Boutin** | Loi 2009-323 du 25/03/2009 | Bail d'habitation (loi 89) | Idem Carrez + combles non aménagés, locaux communs | Aucune tolérance contractuelle ; mais erreur < 1/20 = sans conséquence (CA) |
| **SHAB** (Surface Habitable) | CCH art. R.156-1 (ex R.111-2) | Permis de construire habitation, prêts aidés (PTZ, PSLA), copropriété (ALUR) | Murs, cloisons, gaines, marches, embrasures, parts < 1,80 m, balcons, terrasses, caves, garages, combles non aménagés, locaux commerciaux | Aucune mais critère obligatoire au PC habitation |
| **SDP** (Surface De Plancher) | Code urbanisme art. R.111-22 | Permis de construire (tous usages), seuils architecte 150 m², densité PLU | Combles non aménageables, vides sanitaires, locaux techniques, balcons, terrasses non clos, stationnement, etc. | Aucune |
| **Surface Taxable** | Code urbanisme art. R.331-7 | Taxe d'aménagement | Mêmes exclusions que SDP + déductions spécifiques | Aucune |
| **Surface Utile** | Pas de définition légale unique | Bureaux, immobilier tertiaire | Murs, cloisons fixes (pas mobiles), gaines, ascenseurs, escaliers communs | Norme BOMA / GLA selon contexte |
| **Surface Brute** | — | Programmation, prévisionnel | Inclut tous murs, cloisons, espaces communs | — |
| **GLA** (Gross Leasable Area) | Norme commerce | Bail commercial centres commerciaux | Selon contrat — pratique internationale | — |
| **Surface Pondérée** | — | Évaluation immobilière | Pondération selon usage (cave = 0,1, garage = 0,3, terrasse = 0,3-0,5, etc.) | — |

## 4. Définitions détaillées et règles de calcul

### A — Surface Carrez (copropriété — vente)

**Loi 96-1107 du 18 décembre 1996** (dite "loi Carrez")

**Définition** : superficie des planchers des locaux clos et couverts après déduction des surfaces occupées par murs, cloisons, marches et cages d'escalier, gaines, embrasures de portes et fenêtres.

**Exclusions** :
- Caves, garages, emplacements de stationnement, box
- Combles **non aménagés**
- Balcons, terrasses, loggias, vérandas non isolées
- Surfaces dont la **hauteur sous plafond est inférieure à 1,80 m**
- Locaux d'usage commun (paliers, escaliers communs)
- Lots inférieurs à 8 m² (non soumis à Carrez)

**Sanction art. 4-2 loi Carrez** :
- Si surface réelle inférieure à surface mentionnée à l'acte de **plus de 5 %** : **action en diminution de prix** (proportionnelle) dans le délai d'**1 an** à compter de l'acte
- Si surface non mentionnée à l'acte : **nullité de la vente** dans 1 mois après promesse

### B — Surface Boutin (loi habitable — locations soumises à loi 89)

**Loi 2009-323 du 25 mars 2009** (article 78)

**Définition** : surface du logement après déduction des murs, cloisons, marches et cages d'escalier, gaines, embrasures de portes et fenêtres. Les **combles non aménagés** sont également **exclus** (à la différence de Carrez où ils sont déjà exclus s'ils sont < 1,80 m sous plafond).

**Locations concernées** : bail soumis à la **loi 89-462** (résidence principale du locataire, vide ou meublé depuis ALUR 2014).

**Exclusions** :
- Idem Carrez
- **Combles non aménagés** (différence majeure vs SHAB où ils sont exclus si < 1,80 m)
- Caves, garages, parkings
- Balcons, terrasses, loggias, vérandas

**Sanction** : aucune sanction légale automatique, mais le locataire peut demander **réduction du loyer** au prorata si l'écart est significatif (jurisprudence : tolérance ~ 1/20 = 5 %, à apprécier in concreto).

### C — Surface Habitable (SHAB) — CCH art. R.156-1

**Définition** : surface de plancher construite, après déduction des surfaces occupées par murs, cloisons, marches et cages d'escalier, gaines, embrasures de portes et fenêtres.

**Exclusions** (similaires à Carrez/Boutin mais usage différent) :
- Combles non aménagés
- Caves, sous-sols, remises, garages, terrasses, loggias, balcons, séchoirs extérieurs, vérandas
- Volumes vitrés à usage de loggia ou de véranda
- Locaux communs
- Parties < 1,80 m de hauteur sous plafond

**Usage** :
- **Calcul du loyer** au m² SHAB pour le **conventionnement ANAH, PTZ, PSLA**
- **Définition d'un T1, T2, T3** (selon barème SHAB + SHON ancienne)
- **Permis de construire habitation** (pièce de la notice)
- **Diagnostic copropriété** (avec ALUR 2014)

### D — Surface De Plancher (SDP) — Code urbanisme R.111-22

**Définition** (depuis ordonnance 2011-1539) : somme des surfaces de planchers de chaque niveau **clos et couvert**, calculée à partir du **nu intérieur des murs de façades**, à l'exclusion de :
- Surfaces de plancher des combles **non aménageables** (hauteur < 1,80 m)
- Vides et trémies d'escaliers et ascenseurs
- Surfaces affectées au **stationnement** des véhicules (y compris rampes d'accès et aires de manœuvre)
- Surfaces des **locaux techniques** des installations communes (chaufferies, transformateurs, etc.)
- Surfaces des **caves ou celliers** d'un logement collectif si non accessibles depuis les parties communes ouvertes au public
- **Une part fixe de 10 %** des surfaces destinées à l'habitation collective, en compensation des espaces communs

**Usage principal** : **PC, DP, taxe d'aménagement, seuils architecte (150 m²)**, plafonds PLU (densité, hauteur).

### E — Surface Taxable — Code urbanisme R.331-7

**Définition** : SDP **+** locaux affectés au stationnement.

Servait au calcul de la **taxe d'aménagement** (loi de finances 2011, dite "réforme de la fiscalité de l'urbanisme").

**Exclusions** : caves, certaines remises, espaces de stationnement souterrains à certaines conditions.

### F — Surface Utile (tertiaire/bureaux)

**Pas de définition légale unique** — usages divers :

| Type | Définition |
|---|---|
| **Surface Utile Brute (SUB)** | Surface des plateaux nets des murs, cloisons et trémies (équivalent SHAB pour logement) |
| **Surface Utile Nette (SUN)** | SUB – surfaces non utilisables (locaux techniques, gaines, ascenseurs, escaliers) |
| **GLA (Gross Leasable Area)** | Pratique anglo-saxonne — surface louable, mesurée intérieurement (équivalente SUB) |
| **Surface BOMA** | Norme américaine BOMA — surface privative + quote-part communes |

Pour les **bureaux** : la pratique française admet la définition "**Surface Utile = Surface des locaux à usage de bureaux et annexes professionnels**".

### G — Surface Pondérée (évaluation immobilière)

Outil **non normé** d'évaluation, pondérations indicatives :

| Espace | Pondération |
|---|---|
| Pièce principale habitable | 1,00 |
| Salle de bain, WC | 0,80 à 1,00 |
| Cuisine | 1,00 |
| Couloir, dégagement | 0,70 à 0,80 |
| Balcon, terrasse | 0,30 à 0,50 |
| Loggia couverte | 0,50 à 0,70 |
| Véranda non chauffée | 0,40 à 0,60 |
| Cave en sous-sol | 0,10 à 0,20 |
| Parking en sous-sol | 0,30 |
| Garage individuel | 0,40 |
| Comble < 1,80 m HSP | 0,30 à 0,50 |
| Mezzanine | 0,50 à 0,80 |

## 5. Procédure de calcul

### Étape 1 — Identifier le ou les référentiels cibles

Selon contexte :
- **Vente lot copropriété** → **Carrez** obligatoire (mention dans le compromis et l'acte authentique)
- **Bail loi 89 (location nue ou meublée résidence principale)** → **Boutin** obligatoire
- **PC, urbanisme** → **SDP** (et surface taxable)
- **Demande logement social, PTZ, PSLA, ANAH** → **SHAB**
- **Bureaux, commerces** → **Surface Utile** (selon contrat)
- **Évaluation valeur vénale** → **Surface Pondérée**

### Étape 2 — Lever les surfaces sur plan ou sur place

- Mesures **précises** (laser télémètre, théodolite, scanner 3D selon contexte)
- Notation **niveau par niveau**, **pièce par pièce**
- Distinction parties **chauffées et closes** vs **non chauffées / non closes**
- Identification **hauteurs sous plafond** < 1,80 m (Carrez)
- Identification **combles non aménagés** (exclusion Boutin et SHAB)

### Étape 3 — Calculer la surface selon le référentiel

Pour chaque pièce :
- Surface brute (entre murs intérieurs nus)
- Déduction murs, cloisons, gaines, embrasures
- Vérification HSP ≥ 1,80 m (Carrez)
- Application des exclusions selon référentiel

### Étape 4 — Restitution avec **précision et marge**

- Précision **typique géomètre OGE** : ± 1 % à ± 2 %
- Précision **télémètre laser** : ± 0,5 % en l'absence d'obstacles
- Indication **tolérance** réglementaire applicable

## 6. Restitution structurée

```
## Calcul surfaces légales — [Bien]

### Identification du bien
- **Type** : [maison / appartement / locaux tertiaires]
- **Adresse** : [...]
- **Référence cadastrale / lot copro** : [...]
- **Statut** : [vente / bail / PC / autre]

### Référentiels demandés
- ✅ Carrez (vente copropriété)
- ✅ Boutin (bail loi 89)
- ✅ SHAB (CCH R.156-1)
- ✅ SDP (urbanisme)
- ✅ Surface taxable
- ✅ Surface utile
- ✅ Pondérée

### Mesurage pièce par pièce

| Pièce | Surface brute (m²) | HSP (m) | Carrez (m²) | Boutin (m²) | SHAB (m²) | SDP (m²) |
|---|---|---|---|---|---|---|
| Séjour | 28,4 | 2,55 | 28,4 | 28,4 | 28,4 | — |
| Cuisine | 11,2 | 2,55 | 11,2 | 11,2 | 11,2 | — |
| Chambre 1 | 14,6 | 2,55 | 14,6 | 14,6 | 14,6 | — |
| Chambre 2 (combles) | 16,0 | 2,30 mi-pente | 8,5 (partie >1,80) | 8,5 | 8,5 | 16,0 |
| SDB | 6,2 | 2,50 | 6,2 | 6,2 | 6,2 | — |
| WC | 1,4 | 2,50 | 1,4 | 1,4 | 1,4 | — |
| Couloir | 4,8 | 2,55 | 4,8 | 4,8 | 4,8 | — |
| Cave (sous-sol) | 6,5 | 2,20 | — (exclue) | — (exclue) | — | — |
| Balcon | 4,5 | — | — (exclu) | — (exclu) | — | — (couvert non clos) |
| Combles non aménagés | 24,0 | — | — | — | — | — (non aménageables) |

### Totaux par référentiel

| Référentiel | Total (m²) | Notes |
|---|---|---|
| **Carrez** | 75,1 | Parties privatives chauffées, HSP ≥ 1,80 m |
| **Boutin** | 75,1 | Identique Carrez ici |
| **SHAB** | 75,1 | Identique pour ce logement |
| **SDP** | 91,1 | Inclut combles non aménagés mais entre murs façade |
| **Surface taxable** | 91,1 | Identique SDP (pas de stationnement) |
| **Surface utile** | N/A | — |
| **Surface pondérée** | 81,3 | Pondérations habituelles |

### Conformité

| Critère | Valeur | Tolérance | Conformité |
|---|---|---|---|
| Surface annoncée à l'acte (Carrez) | 78,0 m² | ± 5 % (3,9 m²) | ✅ (écart 2,9 m² < 3,9 m²) |
| Surface annoncée au bail (Boutin) | 76,0 m² | (apprécié in concreto) | ✅ |

### Méthodologie
- Mesures : **télémètre laser Leica DISTO** + plan coté DWG
- Précision : ± 1 %
- Date de levé : [JJ/MM/AAAA]
- Géomètre-expert : [nom + n° Ordre]

### Garde-fous formels
- Le présent calcul ne tient pas lieu d'**attestation Carrez** au sens de la loi 96-1107 (rédaction d'attestation par professionnel certifié obligatoire — voir art. 4-1).
- Pour **vente**, l'attestation doit être annexée à la **promesse** ET à l'**acte authentique** (peines de nullité possible — art. 4-2).
- Pour **bail**, la mention Boutin est dans le **contrat de bail** lui-même.

### Recommandations
- Annexer le présent rapport à l'acte de vente / au bail
- Conserver les **plans cotés** et **photos** de la mesure
- En cas de **doute sur HSP** : prévoir un **2e passage** avec laser de précision
```

## 7. Garde-fous spécifiques

- **Carrez et Boutin ne sont PAS interchangeables** : Carrez inclut tous les locaux clos et couverts de + 1,80 m HSP du lot de copropriété ; Boutin exclut en plus **les combles non aménagés** quel que soit leur HSP. Ne pas confondre.
- L'**attestation Carrez** doit être établie par un **professionnel certifié** ou par un **géomètre-expert OGE**. Une auto-mesure du propriétaire est **acceptée** mais **n'engage que lui** (sans tiers attestataire, le recours en cas d'erreur est plus complexe).
- Pour les **vendeurs**, la **mention "environ"** ou "**+/- X %**" n'est pas valable au sens loi Carrez — **chiffre précis exigé**.
- **Tolérance Carrez** : 5 % en moins acceptés. Au-delà, le **prix est réduit au prorata** sur action de l'acquéreur dans 1 an.
- **Mezzanines** : peuvent compter en Carrez/Boutin si **HSP ≥ 1,80 m partout** et accès permanent. Sinon, sont exclues.
- **Combles avec sous-pente** : seule la partie où HSP ≥ 1,80 m compte en Carrez/Boutin. Le **point bas** est celui de la **pente**, pas du seuil de circulation.
- **Vérandas** : si **chauffées et closes** et **isolation thermique correcte**, elles peuvent compter en Carrez (jurisprudence variable, conseiller un mesurage spécifique). En Boutin, sont **toujours** exclues.
- **Loggias** (extérieures couvertes par dalle au-dessus) : **exclues** Carrez et Boutin.
- **Cave en sous-sol** : exclue Carrez/Boutin/SHAB ; comptée en Pondérée à 0,1-0,2.
- Pour les **maisons individuelles**, la **loi Carrez ne s'applique PAS** (réservée à la copropriété). Pour la vente d'une MI, la surface est librement déterminée mais doit être **non trompeuse** (vice du consentement art. 1130 CC).
- Tu **n'engages pas** ta responsabilité — tu prépares les éléments pour le **géomètre-expert** ou le **diagnostiqueur certifié** qui signe.
- Pour la **SDP** : c'est l'**architecte** ou le **MOA** qui la calcule pour la notice PC — le géomètre peut la vérifier mais elle relève de l'urbanisme.

## 8. Suites logiques à proposer

- Établissement d'une **attestation Carrez signée** par professionnel certifié pour vente
- Mise à jour du **règlement de copropriété** si écart majeur sur lot (procédure AG copropriété)
- Skill `division_parcellaire` si projet de division foncière
- Skill `analyser_bornage` si limite séparative implicitement remise en cause
- Coordination avec le **notaire** pour intégrer le mesurage à l'acte
- Si **bail loi 89** mentionne surface erronée : avenant correctif amiable
- Pour **logement social, ANAH, PTZ, PSLA** : utiliser la **SHAB** réglementaire en cohérence avec le formulaire d'attribution
- Pour les **bâtiments tertiaires** : recommander une **norme conventionnelle** (BOMA, GLA, surface utile française) dans le bail commercial
- **Photographie + plan coté** annexés au mesurage pour traçabilité
- Conservation des **archives** du mesurage **30 ans** (responsabilité décennale du géomètre)
