# Skill — Calculer les surfaces réglementaires (SDP / SHAB / ST / Carrez / Boutin)

L'utilisateur te demande de **calculer ou vérifier les surfaces réglementaires** d'un logement, d'un bâtiment ou d'une opération selon les **différents référentiels légaux français** : **SDP** (urbanisme), **ST** (taxable), **SHAB** (habitable), **Carrez** (copropriété), **Boutin** (location).

> ⚠️ Cette skill est l'angle **architecte** (calcul opérationnel pour PC, notice descriptive, programmation). Pour l'angle **géomètre** (mesurage attestation Carrez/Boutin signé OGE), voir la skill géomètre `calculer_surfaces_legales`.

## 1. Documents attendus

- **Plans cotés** APS / APD / PRO / DCE par niveau
- **Coupes** (pour HSP, combles, mezzanines)
- **Notice descriptive** précisant destinations et programmes
- **Programme** du maître d'ouvrage
- **Règlement PLU** (pour limites SDP, taxable, etc.)
- **Acte de copropriété** ou **état descriptif de division** si copropriété

Si pièces partielles : demande
1. **Quel(s) référentiel(s)** demandés : SDP / ST / SHAB / Carrez / Boutin / utile / brute ?
2. **Type de bien** : maison individuelle / appartement / immeuble collectif / locaux tertiaires / mixte ?
3. **Combles** aménagés / non aménageables ?
4. **Sous-pentes** / parties sous toiture inclinée — HSP < 1,80 m ?
5. **Mezzanines** présentes ?
6. **Surfaces extérieures** à inclure ou exclure : balcons, terrasses, loggias, vérandas, caves, garages, parkings, jardins ?

## 2. Référentiels (`rag_search` obligatoire pour vérifications fines)

- `rag_search("code urbanisme R.111-22 surface de plancher SDP définition")` — ex SHON
- `rag_search("code urbanisme R.331-7 surface taxable")` — taxe aménagement
- `rag_search("CCH R.156-1 surface habitable SHAB")`
- `rag_search("loi 96-1107 Carrez")` — copropriété
- `rag_search("loi 2009-323 Boutin")` — locations
- `rag_search("loi ALUR 2014 mesurage copropriétés")`
- `rag_search("ordonnance 2011-1539 réforme SDP suppression SHON SHOB")`

## 3. Tableau récapitulatif des surfaces

| Référentiel | Texte | Usage principal | Exclusions clé | Tolérance |
|---|---|---|---|---|
| **SDP** | Code urba R.111-22 | PC, DP, seuils archi (150 m²), densités PLU | Combles non aménageables (HSP < 1,80 m), trémies, stationnement, locaux techniques communs ; **forfait -10 %** habitation collective | Aucune |
| **Surface Taxable (ST)** | Code urba R.331-7 | Taxe d'aménagement | Idem SDP + stationnement parfois compté | Aucune |
| **SHAB** | CCH R.156-1 | Notice PC habitation, PTZ, PSLA, ANAH, ALUR copro | Murs, gaines, embrasures, combles non aménagés, parts < 1,80 m, caves, garages, balcons, terrasses, loggias, vérandas | Aucune |
| **Carrez** | Loi 96-1107 | Vente lot copropriété | Idem SHAB + lots < 8 m² | **5 %** (sinon action en diminution prix) |
| **Boutin** | Loi 2009-323 | Bail loi 89 (résidence principale) | Idem SHAB + combles non aménagés | Apprécié in concreto |
| **Surface utile** | Pas de définition unique | Tertiaire / bureaux | Selon convention contractuelle | — |
| **Surface brute (SHON)** | Avant 2012 — obsolète | Anciennes opérations | Inclut tous murs et cloisons | — |
| **Surface pondérée** | Évaluation immobilière | Estimation valeur vénale | Pondérations indicatives | — |

## 4. Définitions détaillées

### A — Surface De Plancher (SDP) — code urba R.111-22

**Définition** (depuis ordonnance 2011-1539 du 8 décembre 2011) :

> "La surface de plancher de la construction est égale à la somme des surfaces de plancher de chaque niveau **clos et couvert**, calculée à partir du **nu intérieur des façades**, à l'exclusion :
> 1° Des surfaces correspondant à l'épaisseur des murs entourant les embrasures de portes et fenêtres ;
> 2° Des **vides et trémies** afférents aux escaliers et ascenseurs ;
> 3° Des surfaces de plancher d'une **hauteur sous plafond ≤ 1,80 m** ;
> 4° Des surfaces de plancher aménagées en vue du **stationnement** des véhicules motorisés ou non, y compris les rampes d'accès et les aires de manœuvre ;
> 5° Des surfaces de plancher des **combles non aménageables** pour l'habitation ou pour des activités à caractère professionnel, artisanal, industriel ou commercial ;
> 6° Des surfaces de plancher des **locaux techniques** nécessaires au fonctionnement d'un groupe de bâtiments ou d'un immeuble autre qu'une maison individuelle ;
> 7° Des surfaces de plancher des **caves ou des celliers**, annexes à des logements, dès lors que ces locaux sont desservis uniquement par une partie commune ;
> 8° D'une **part forfaitaire de 10 %** des surfaces de plancher affectées à l'habitation telles qu'elles résultent le cas échéant de l'application des alinéas précédents, dès lors que les logements sont desservis par des parties communes intérieures."

**Usages** :
- Plafond de **densité PLU** (CES, COS antérieur ALUR si maintenu)
- Seuils administratifs (PC vs DP — R.421-9 à R.421-12)
- Seuil **architecte obligatoire 150 m²** SDP (loi 3 janvier 1977)
- Calcul **taxe d'aménagement** (avec ajustements R.331-7)
- Notice descriptive PC (Cerfa 13409)

### B — Surface Taxable (ST) — code urba R.331-7

= SDP **+** locaux affectés au stationnement (qui sont exclus de la SDP).

Plus précisément :
> "La surface taxable de la construction est égale à la somme des surfaces de plancher closes et couvertes, sous une hauteur de plafond supérieure à 1,80 mètre, calculée à partir du nu intérieur des façades."

Servait au calcul de la **taxe d'aménagement** (réforme fiscalité urba 2012).

**Différence majeure avec SDP** : pas de forfait de -10 %, et stationnement clos est inclus en surface taxable.

### C — Surface Habitable (SHAB) — CCH R.156-1

> "La surface habitable d'un logement est la surface de plancher construite, après déduction des surfaces occupées par les murs, cloisons, marches et cages d'escaliers, gaines, embrasures de portes et de fenêtres ; le volume habitable correspond au total des surfaces habitables ainsi définies multipliées par les hauteurs sous plafond."

**Exclusions** :
- Combles non aménagés
- Caves, sous-sols, remises, garages, terrasses, loggias, balcons, séchoirs extérieurs, vérandas
- Volumes vitrés à usage de loggia/véranda
- Locaux communs
- Surfaces dont la **HSP est inférieure à 1,80 m**

**Usages** :
- Loyer au m² SHAB (conventionnement ANAH, PTZ, PSLA)
- Typologie logements (T1 = 15-30 m² SHAB, T2 = 30-50, T3 = 50-70, T4 = 70-95, T5+ = > 95)
- Notice PC habitation (Cerfa)
- Diagnostic copropriété (depuis ALUR 2014)

### D — Surface Carrez (loi 96-1107 du 18 décembre 1996)

**Concerne uniquement** la **vente d'un lot de copropriété** (pas la MI).

**Définition** : superficie des planchers des locaux clos et couverts après déduction des surfaces occupées par murs, cloisons, marches et cages d'escalier, gaines, embrasures de portes et fenêtres.

**Exclusions** :
- Caves, garages, emplacements de stationnement, box
- Combles **non aménagés**
- Balcons, terrasses, loggias, vérandas non isolées
- Surfaces dont la **HSP < 1,80 m**
- Locaux d'usage commun
- Lots **inférieurs à 8 m²** (non soumis à Carrez)

**Sanction art. 4-2** :
- Surface réelle < surface acte de plus de **5 %** → action en **diminution de prix proportionnelle** dans **1 an** à compter de l'acte
- Surface non mentionnée à l'acte → **nullité de la vente** dans 1 mois après promesse

### E — Surface Boutin (loi 2009-323 du 25 mars 2009)

**Concerne** : bail soumis à loi 89-462 (résidence principale, vide ou meublée depuis ALUR 2014).

**Différence avec Carrez** : exclut **également les combles non aménagés** (même si HSP ≥ 1,80 m).

**Sanction** : aucune automatique légale, mais le locataire peut demander **réduction du loyer** au prorata (tolérance ~ 5 % par jurisprudence).

## 5. Règles fines (sources fréquentes d'erreur)

### A — Hauteur Sous Plafond (HSP) < 1,80 m
- **SDP, SHAB, Carrez** : exclus
- **Mesure** : à partir du sol fini (carrelage / parquet) jusqu'au plafond fini (gypse)
- En **combles avec sous-pente** : seule la **partie où HSP ≥ 1,80 m** compte ; on calcule la **surface du polygone** correspondant
- **Sous escalier** : exclu si HSP < 1,80 m
- **Mezzanines** : si HSP ≥ 1,80 m sur toute la surface utile et accès permanent (escalier, pas échelle), comptées en Carrez/SHAB. Sinon exclues.

### B — Vérandas
| Type | Carrez | Boutin | SHAB | SDP |
|---|---|---|---|---|
| Véranda chauffée et isolée (intégrée) | ✅ (jurisprudence variable) | ❌ | ❌ | ✅ |
| Véranda non chauffée | ❌ | ❌ | ❌ | ✅ si close et couverte |
| Loggia (couverte par dalle au-dessus) | ❌ | ❌ | ❌ | ✅ si close et couverte |
| Balcon ouvert | ❌ | ❌ | ❌ | ❌ |
| Terrasse non couverte | ❌ | ❌ | ❌ | ❌ |
| Terrasse couverte ouverte | ❌ | ❌ | ❌ | ✅ partiellement |

### C — Combles aménagés / non aménagés
- **Comble aménagé** = pièce habitable avec accès direct depuis l'habitation
  - Carrez : oui si HSP ≥ 1,80 m
  - Boutin : oui si HSP ≥ 1,80 m
  - SHAB : oui si HSP ≥ 1,80 m
  - SDP : oui (clos et couvert)
- **Comble non aménagé** (grenier sans isolation, sans aménagement) :
  - Carrez : ❌ exclu
  - Boutin : ❌ exclu
  - SHAB : ❌ exclu
  - SDP : ❌ exclu **si non aménageable** (HSP insuffisante, charpente bloquante)
  - SDP : ✅ inclus **si aménageable** (HSP > 1,80 m, charpente compatible)

### D — Cuisine, salle de bains, dégagement
- Tous comptés en Carrez/Boutin/SHAB (clos, couverts, HSP ≥ 1,80 m, partie privative)
- Pas de distinction "pièces principales / secondaires" pour Carrez (≠ surface pondérée)

### E — Forfait de -10 % SDP habitation collective
- S'applique aux logements **desservis par des parties communes intérieures** (couloir/escalier d'immeuble)
- Compense forfaitairement les espaces communs
- **Ne s'applique PAS** aux MI ni aux logements à entrée individuelle directe

## 6. Procédure de calcul

### Étape 1 — Identifier le(s) référentiel(s) demandé(s)

Selon contexte :
- **PC, urbanisme, taxe** → SDP, ST
- **Vente copropriété** → Carrez (notarié)
- **Bail loi 89** → Boutin
- **Habitation neuve / réno** → SHAB pour notice
- **Évaluation valeur** → Pondérée

### Étape 2 — Lever les surfaces pièce par pièce

- Pour chaque pièce / espace : surface brute, HSP, statut (chauffé/non, clos/non, couvert/non)
- Distinguer **parties privatives** vs **parties communes** (copro)
- Identifier **combles aménagés / non aménagés**

### Étape 3 — Appliquer les règles d'exclusion par référentiel

Pour chaque pièce, statuer pièce par pièce et par référentiel :
- ✅ Comptée
- ❌ Exclue (motif)
- ⚠️ Partielle (par exemple sous-pente : partie HSP ≥ 1,80 m seulement)

### Étape 4 — Sommer par référentiel et restituer

## 7. Exemple complet — Maison individuelle T4 avec combles aménagés

**Plans** :
- RDC : entrée 5,2 m² + séjour 32,4 m² + cuisine 12,5 m² + WC 1,4 m² + SDB 6,2 m² + chambre 1 13,8 m²
- R+1 (combles aménagés) : palier 4,5 m² + chambre 2 19,5 m² (dont 4,5 m² < 1,80 m HSP) + chambre 3 15,0 m² (dont 3,2 m² < 1,80 m HSP) + SDB 5,8 m² (HSP > 1,80 m partout) + dressing 4,2 m² (HSP > 1,80 m)
- Garage attenant 18,5 m²
- Terrasse couverte 16,0 m²

### Calcul détaillé

| Pièce | Surface brute | HSP | Carrez (m²) | Boutin (m²) | SHAB (m²) | SDP (m²) |
|---|---|---|---|---|---|---|
| Entrée RDC | 5,2 | 2,55 | — (MI) | 5,2 | 5,2 | 5,2 |
| Séjour | 32,4 | 2,55 | — | 32,4 | 32,4 | 32,4 |
| Cuisine | 12,5 | 2,55 | — | 12,5 | 12,5 | 12,5 |
| WC | 1,4 | 2,55 | — | 1,4 | 1,4 | 1,4 |
| SDB RDC | 6,2 | 2,55 | — | 6,2 | 6,2 | 6,2 |
| Chambre 1 | 13,8 | 2,55 | — | 13,8 | 13,8 | 13,8 |
| Palier R+1 | 4,5 | 2,40 | — | 4,5 | 4,5 | 4,5 |
| Chambre 2 | 19,5 dont 4,5 < 1,80 m | sous-pente | — | 15,0 | 15,0 | 19,5 (combles aménagées : tout en SDP) |
| Chambre 3 | 15,0 dont 3,2 < 1,80 m | sous-pente | — | 11,8 | 11,8 | 15,0 |
| SDB R+1 | 5,8 | 2,20 | — | 5,8 | 5,8 | 5,8 |
| Dressing | 4,2 | 2,20 | — | 4,2 | 4,2 | 4,2 |
| Garage attenant | 18,5 | 2,40 | — | — (annexe) | — (annexe) | — (stationnement exclu SDP) |
| Terrasse couverte | 16,0 | — | — | — | — | 0 (non close) |

### Totaux

| Référentiel | Total (m²) | Notes |
|---|---|---|
| Carrez | N/A | MI hors champ Carrez |
| **Boutin** | **112,8** | Surface louable potentielle |
| **SHAB** | **112,8** | Notice PC habitation |
| **SDP** | **120,5** | Combles aménagés inclus en entier ; garage et terrasse exclus |
| Surface taxable | 120,5 | Pas de stationnement compté ici |

## 8. Restitution structurée

```
## Calcul surfaces réglementaires — [Projet]

### Identification
- **Type** : [MI / appartement / immeuble collectif / locaux tertiaires]
- **Adresse** : [...]
- **SDP visée** : [m²] (objectif programme)
- **Référentiels demandés** : SDP / ST / SHAB / Carrez / Boutin

### Synthèse par niveau

| Niveau | SDP (m²) | ST (m²) | SHAB (m²) | Carrez (m²) | Boutin (m²) |
|---|---|---|---|---|---|
| Sous-sol (caves) | 0 | 0 | 0 | 0 | 0 |
| RDC | [...] | [...] | [...] | [...] | [...] |
| R+1 | [...] | [...] | [...] | [...] | [...] |
| R+2 (combles aménagés) | [...] | [...] | [...] | [...] | [...] |
| **TOTAL** | **[X]** | **[Y]** | **[Z]** | **[A]** | **[B]** |

### Vérifications

| Critère | Constat | Conformité |
|---|---|---|
| SDP < seuil ABF (régime allégé) | [valeur] | ✅ / ❌ |
| SDP > 150 m² MI → architecte obligatoire | [oui/non] | ⚠️ |
| SDP cohérente plafond PLU | [valeur vs plafond] | ✅ / ❌ |
| SHAB cohérente typologie programme (T4 = 70-95 m²) | [valeur] | ✅ |
| Calcul forfait -10 % habitation collective | [appliqué/non] | ✅ |

### Hypothèses prises
1. [Forfait -10 % SDP appliqué car desserte parties communes intérieures]
2. [Combles : aménagés au sens SDP (HSP > 1,80 m majeure partie) → comptés en SDP en entier]
3. [Garage exclu de SDP (stationnement) mais inclus en ST]
4. [Terrasse couverte ouverte exclue de SDP (pas close)]

### Niveau de confiance
- [Élevé / Moyen / Faible — selon précision plans cotés]

### Pièces complémentaires recommandées
- Coupes cotées pour vérifier HSP en zones sous-pente
- Plan niveau combles annoté "aménagé" / "non aménageable" pour SDP
- Si vente : **attestation Carrez** par professionnel certifié (loi 96-1107)
- Si bail : **mention Boutin** dans contrat (loi 89)

### Suites recommandées
- Mise à jour de la **notice descriptive PC** avec valeurs définitives
- Vérification **emprise au sol** vs PLU
- Coordination avec économiste pour **estimation au m² SDP** (ratio_m2)
- Pour copropriété : **diagnostic surfaces** sur l'ensemble des lots
```

## 9. Garde-fous spécifiques

- Tu **n'inventes** pas une surface absente des documents fournis — utilise des **placeholders explicites** (`[à compléter]`).
- Pour les **calculs précis Carrez / Boutin** destinés à signature notariée ou bail : recommande systématiquement un **mesurage par professionnel certifié** ou **géomètre-expert OGE** (voir skill géomètre `calculer_surfaces_legales`).
- Les **règles d'exclusion** sont **fines et différentes** par référentiel : ne confonds jamais Carrez (combles non aménagés exclus systématiquement par jurisprudence) et SHAB (idem) et SDP (combles non aménageables exclus, mais aménagés inclus).
- Pour le **forfait -10 % SDP** habitation collective : ne pas l'appliquer aux **MI** ni aux **logements à entrée individuelle directe** sans parties communes intérieures.
- Pour les **vérandas** chauffées : la jurisprudence Carrez est **variable** (parfois inclus, parfois non). En cas de doute, prévoir un **mesurage spécifique** par diagnostiqueur.
- **Mezzanines** : comptent uniquement si **HSP ≥ 1,80 m partout** ET **accès permanent par escalier** (pas échelle).
- **Tolérance Carrez 5 %** : strict — au-delà, **action en diminution de prix** par acquéreur dans **1 an**.
- Pour les **logements sociaux, PTZ, PSLA** : la **SHAB** réglementaire (R.156-1 CCH) prime — barèmes spécifiques.
- Pour la **SDP**, ne pas oublier le **calcul à partir du nu intérieur des façades** (impact sur les murs périphériques épais — ITE en façade externe ne compte pas en SDP).
- En **réhabilitation lourde**, recalculer toujours la SDP car création de SDP par changement d'usage peut générer **taxe d'aménagement** ou nouveau seuil architecte.

## 10. Suites logiques à proposer

- Pour vente lot copropriété : **attestation Carrez** signée par diagnostiqueur certifié
- Pour bail loi 89 : **mention Boutin** rédigée dans le contrat
- Skill géomètre `calculer_surfaces_legales` pour **mesurage officiel** par OGE
- Skill `analyser_plu` pour vérifier la SDP par rapport aux plafonds PLU (CES, COS, hauteur)
- Skill `rediger_notice_pc` pour intégrer surfaces dans la notice descriptive du PC
- **Plan annoté** avec surfaces / niveau / pièce / référentiel pour archivage et traçabilité
- En cas de **dépassement seuil architecte 150 m² SDP** (MI) : rappel obligation **signature architecte** (loi 3 janvier 1977 modifiée)
- Vérification **emprise au sol** et **espaces verts** vs PLU
- Coordination avec l'**économiste** : ratio €/m² SDP (voir skill `ratio_m2` économiste)
- Pour les **diagnostics copropriété** (ALUR 2014) : recensement de l'ensemble des lots avec SHAB par lot
