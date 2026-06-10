# Skill — Évaluer une entreprise BTP (méthodes + retraitements) et cadrer la transmission/cession

L'utilisateur veut **évaluer une entreprise BTP** (en vue d'une cession, transmission, entrée/sortie d'associé, OBO) : appliquer les **méthodes** (patrimoniale, rentabilité/EBE, goodwill, comparables), réaliser les **retraitements spécifiques BTP** (en-cours, provisions, matériel, crédit-bail, carnet de commandes), et cadrer le **schéma de transmission** (apport-cession, LBO/holding, donation Dutreil) ainsi que la **GAP** et la fiscalité de cession.

> ⚠️ **Tous les multiples, taux, seuils et abattements sont à revérifier à la date de consultation** (loi de finances annuelle ; bases de transactions). Tu **prépares** une évaluation indicative et un cadrage de schéma ; la valeur définitive et le montage relèvent du **DEC + avocat fiscaliste**. L'évaluation n'est pas une opinion de commissaire aux apports.

## 1. Documents attendus

- **Liasses fiscales** des 3 derniers exercices (2050 à 2059) et **FEC**.
- **Balance / grand-livre** détaillés (en-cours 33/34, FAE 418, RG 4117, provisions 1516/15x).
- **Carnet de commandes** chiffré + **marges prévisionnelles** par chantier.
- **Parc matériel** (inventaire, valeur vénale/cote) et **contrats de crédit-bail** (612, échéances).
- **Rémunération du dirigeant**, baux avec **SCI liée**, conventions intra-groupe.
- **Structure juridique** (EI / société, IS ou IR ; holding existante), **détention du capital**.
- Contexte : cession **fonds** ou **titres** ? transmission **familiale** ? départ **retraite** ?

Si absent, demande :
1. **EI / société à l'IR** ou **société à l'IS** ? Holding en place ?
2. Cession de **fonds** ou de **titres** ? À un **tiers**, au **management**, à la **famille** ?
3. Le dirigeant part-il à la **retraite** (151 septies A / 150-0 D ter) ?
4. **Carnet de commandes** : montant et marge prévisionnelle ?
5. Matériel en **propriété** ou **crédit-bail** ? Immobilier d'exploitation dans le périmètre ?

## 2. Référentiels (`rag_search`)

- `rag_search("évaluation entreprise BTP retraitements en-cours matériel crédit-bail carnet de commandes")` — corpus *evaluation_transmission_entreprise_btp*
- `rag_search("méthode patrimoniale ANCC multiple EBE goodwill comparables DCF")`
- `rag_search("apport-cession 150-0 B ter holding LBO intégration fiscale mère-fille")`
- `rag_search("pacte Dutreil 787 B donation transmission familiale")`
- `rag_search("garantie actif passif GAP décennale plus-values cession titres fonds")`
- `rag_search("perte à terminaison 1516 en-cours provisions BTP")` — corpus en-cours / provisions
- `rag_search("BFR BTP retenue de garantie financement")` — pour la dette nette / trésorerie normative

## 3. Étape 1 — Retraiter avant d'évaluer (spécifique BTP)

| Retraitement | Action |
|---|---|
| **Rémunération dirigeant** | Ramener à un niveau de marché → EBE normatif |
| **Crédit-bail matériel** (612) | Réintégrer redevances en dotation + frais financiers ; immobiliser le bien + dette à l'ANR |
| **Provisions** | Normaliser perte à terminaison (1516), SAV/GPA, litiges (sous/sur-provision) |
| **En-cours** (33/34) | Vérifier la valorisation au coût de production ; purger marges latentes |
| **Matériel** | Valeur vénale (cote/expertise) au lieu de la VNC |
| **Non récurrents** | Neutraliser sinistres, cessions exceptionnelles, indemnités |
| **Loyers SCI liée** | Aligner sur le marché |

> Produire un **EBE normatif** (résultat de gestion) et un **actif net réévalué (ANR)**.

## 4. Étape 2 — Appliquer plusieurs méthodes et fourchetter

| Méthode | Formule | Quand |
|---|---|---|
| **Patrimoniale (ANCC)** | CP ± plus/moins-values latentes − actifs fictifs − fiscalité latente | Entreprise capitalistique (parc TP) |
| **Multiple d'EBE** | VE = EBE normatif × multiple ; VT = VE − dette financière nette | Référence transactionnelle |
| **Capitalisation du résultat** | Résultat normatif / taux de capitalisation (prime de risque BTP) | Rentabilité |
| **DCF** | Actualisation des FCF + valeur terminale au CMPC | Si prévisions fiables (carnet) |
| **Goodwill (mixte)** | ANCC + rente du superprofit | Croiser patrimoine + rentabilité |

> **Multiples BTP modérés** (activité cyclique, capitalistique, marges faibles) — **fourchette à revérifier** sur bases de transactions ; **ne jamais inventer** de multiple. Croiser 2-3 méthodes, puis appliquer **décotes/primes** (taille, illiquidité, dépendance dirigeant, minoritaire).

## 5. Étape 3 — Pondérer par le carnet et la dépendance

- **Carnet de commandes** : montant, **marge prévisionnelle**, récurrence MOA, risque (pénalités, intempéries, révisions) → un carnet mal margé **détruit** de la valeur.
- **Dépendance** : au **dirigeant** (intuitu personae, agréments/qualifications), à un **client** ou **donneur d'ordre** unique → décote.
- **Continuité** : qualifications (Qualibat/RGE), **assurances décennale**, transférabilité des **marchés en cours**.

## 6. Étape 4 — Cadrer le schéma de transmission/cession

| Schéma | Mécanisme | Référence (à revérifier) |
|---|---|---|
| **Cession de fonds** vs **titres** | Passif transmis ou non ; intuitu personae des marchés | Code com. L.141-1 et s. |
| **Apport-cession** | Apport titres à holding IS → **report** ; remploi d'une quote-part | CGI art. 150-0 B ter |
| **LBO / OBO** | Holding endettée ; remontée de dividendes (mère-fille / intégration) | CGI art. 145, 216 ; 223 A |
| **Donation Dutreil** | Exonération partielle DMTG sous engagements de conservation | CGI art. 787 B |
| **Départ retraite** | Abattement dirigeant | CGI art. 151 septies A ; 150-0 D ter |

> **Vigilance LBO en BTP** : le levier suppose des **dividendes réguliers**, alors que le BFR est tendu et la rentabilité cyclique → dimensionner la dette d'acquisition prudemment.

## 7. Étape 5 — GAP et fiscalité de cession

- **GAP** : couvrir les passifs latents BTP (redressements fiscaux/URSSAF, litiges chantiers, **sinistres décennaux**), la réalité des **créances** (RG 4117, situations litigieuses) et des **en-cours**. ⚠️ Prévoir une garantie **spécifique décennale (10 ans)**, la durée fiscale/sociale standard (3 ans) étant insuffisante.
- **Fiscalité cédant** : EI/IR → 151 septies / 238 quindecies / 151 septies A/B ; cession de titres → PFU ou barème + abattements, abattement dirigeant retraite ; société IS cédant titres → régime **titres de participation** (QPFC).
- **Positions incertaines** → **rescrit** (LPF art. L.80 B) + validation **DEC/avocat**.

## 8. Écritures indicatives (selon schéma)

```
Cession titres de participation (holding) :
  462 Créance / 261 Titres / 675 VNC / 775 Produit de cession → plus-value en résultat
Apport-cession (150-0 B ter) :
  titres apportés en 261/271 chez la holding ; prime d'apport en 104x ; report d'imposition suivi extra-comptable
Provision pour risque GAP (si appel probable) :
  6815 Dotation à 1511/1515 Provision pour risque
```

> Adapter à l'entité (cédant, holding, cible) et au schéma.

## 9. Restitution structurée

```
## Évaluation indicative — [Entreprise BTP]

### Réserve de fraîcheur
- Multiples / taux / seuils / abattements à revérifier au [date]. Évaluation indicative, non opinion de CAA.

### Retraitements
- EBE normatif : [€] (rému dirigeant, crédit-bail, provisions, non récurrents)
- ANR : [€] (matériel en valeur vénale, crédit-bail réintégré, en-cours, fiscalité latente)

### Valorisation (fourchette)
| Méthode | Valeur des titres | Pondération |
| ANCC | [€] | |
| Multiple d'EBE (x[..] à x[..]) | [€] | |
| Goodwill / DCF | [€] | |
→ **Fourchette retenue** : [€] – [€] (décotes : dépendance dirigeant, illiquidité…)

### Carnet & dépendance
- Carnet : [€], [mois de visibilité], marge prév. [%] ; dépendance : [dirigeant/client]

### Schéma de transmission proposé
- [Fonds/titres ; apport-cession ; OBO ; Dutreil] + impacts fiscaux

### GAP & fiscalité
- Points de garantie (dont décennale 10 ans) ; régime de plus-value applicable

### Garde-fous
- Évaluation indicative à valider par le DEC + avocat fiscaliste. Aucun multiple inventé.
```

## 10. Livrable (`generer_rapport`)

`generer_rapport({ titre: "Évaluation et schéma de transmission — [entreprise]", contenu, format: "xlsx" | "docx" | "pdf", agent: "expert-comptable-btp", metadata: { entité, exercices, date } })`

- **XLSX** : retraitements, calcul multi-méthodes, fourchette, simulation fiscale de cession.
- **DOCX/PDF** : note d'évaluation + cadrage du schéma + points de GAP.

## 11. Garde-fous spécifiques

- **Aucun multiple/taux inventé** : fourchettes justifiées par des **bases de transactions datées** (à revérifier).
- Toujours **retraiter** (crédit-bail, rému, provisions, en-cours, matériel) **avant** d'évaluer.
- Le **carnet de commandes** et la **dépendance** priment souvent sur le bilan ; un carnet mal margé détruit de la valeur.
- **GAP** : couvrir le risque **décennal (10 ans)**, pas seulement le fiscal/social (3 ans).
- **150-0 B ter / intégration / Dutreil** : seuils, délais et engagements de conservation **à revérifier** scrupuleusement.
- Tu **prépares** une évaluation indicative ; la valeur définitive et le montage relèvent du **DEC + avocat**. Tu n'engages pas la responsabilité de l'expert-comptable.

## 12. Suites logiques à proposer

- Skill `auditer_provisions_btp` (normaliser perte à terminaison 1516, SAV/GPA avant évaluation).
- Skill `valoriser_en_cours` / `reconnaissance_revenu_avancement` (fiabiliser en-cours et FAE).
- Skill `analyser_ratios_gestion` (carnet, BFR, structure financière — diagnostic préalable).
- Skill `optimiser_tresorerie_btp` (dette nette / trésorerie normative pour le passage VE → VT).
- Skill `analyser_fiscalite_entreprise` (plus-values, régimes d'exonération).
- Mise en relation **avocat fiscaliste** pour le montage et la **GAP**.
