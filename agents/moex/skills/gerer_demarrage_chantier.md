# Skill — Piloter les formalités de démarrage de chantier

L'utilisateur (MOE / OPC) doit **piloter et vérifier les formalités de démarrage** d'un chantier : **DOC**, **affichage du panneau de permis**, **OS de démarrage**, **piquetage / implantation**, **DT-DICT**, **état des lieux / constat des avoisinants**, **registre journal**, **ouverture du compte prorata**, et — en **réhabilitation** — **repérage amiante (SS3/SS4)** et **plomb (CREP)**. Tu produis une **check-list de démarrage** statuée et alertes sur les manquements bloquants. Cf. corpus `formalites_demarrage_chantier.md`.

> ⚠️ Certaines formalités sont **bloquantes** : pas de démarrage sans **OS notifié**, sans **panneau affiché**, et — en réhabilitation — sans **repérage amiante** valide (risque pénal). Le MOEX **vérifie, alerte et bloque** ; il ne se substitue pas au MOA (DOC, DAACT, assurances) ni à l'inspection du travail.

## 1. Documents attendus

- **Permis de construire** (ou déclaration préalable) et **récépissé de DOC** (Cerfa 13407)
- **Photo / constat du panneau de permis** affiché sur le terrain
- **OS de démarrage** (notifié au titulaire / mandataire — cf. skill `rediger_os`)
- **PV de piquetage / d'implantation** (contradictoire, géomètre / entreprise)
- **Récépissés de DT-DICT** (réseaux — exploitants)
- **Constat / état des lieux** des avoisinants (commissaire de justice / référé préventif — cf. skill `organiser_constat_refere`)
- **Registre journal de chantier** ouvert
- **Convention de compte prorata** (multi-entreprises) signée
- **Attestations d'assurance** (DO, RC décennale) à jour
- **PGC / PPSPS** (CSPS) — cf. skill `auditer_pgc_ppsps`
- En réhabilitation : **repérage amiante avant travaux (RAAT)**, **plan de retrait (SS3)** ou **mode opératoire (SS4)**, **CREP** (plomb, habitat ancien)

Si pièces partielles : demande
1. Marché **public** (CCAG-Travaux) ou **privé** (NF P 03-001) ?
2. Opération **neuve** ou **réhabilitation** (→ amiante / plomb) ?
3. Chantier **mono** ou **multi-entreprises** (→ compte prorata) ?
4. Présence d'**avoisinants sensibles** (mitoyens, voirie, réseaux) → constat / référé préventif requis ?
5. Phase : **avant** démarrage (préparation) ou **régularisation** d'un démarrage déjà engagé ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("déclaration ouverture chantier DOC panneau permis R.424-15 R.424-16")`
- `rag_search("affichage panneau permis recours des tiers R.600-3 constat continu")`
- `rag_search("piquetage implantation bornage géomètre PV contradictoire DT-DICT")`
- `rag_search("registre journal chantier compte prorata ouverture NF P 03-001")`
- `rag_search("repérage amiante avant travaux sous-section 3 plan de retrait décret 2012-639")`
- `rag_search("CREP constat risque exposition plomb réhabilitation L.1334")`

## 3. Procédure de pilotage

### Étape 1 — Autorisations et affichage
- **DOC** déposée par le MOA (Cerfa 13407) → récépissé ?
- **Panneau de permis** affiché, **≥ 80 cm**, **visible de la voie publique**, **continu** ? → **faire constater** (point de départ du recours des tiers, R.600-3).

### Étape 2 — OS de démarrage et préparation
- **OS de démarrage** rédigé et **notifié** (CCAG art. 3.8) — au **mandataire** si groupement (cf. corpus `cotraitance_groupement.md`) ?
- **Période de préparation** organisée (plannings, plans EXE, installations) ?

### Étape 3 — Implantation et réseaux
- **Piquetage / implantation** réalisé, **PV contradictoire** signé (responsabilité d'implantation figée) ?
- **DT-DICT** : récépissés des exploitants obtenus avant travaux à proximité de réseaux ?
- **Bornage** (limites de propriété) par géomètre-expert si nécessaire ?

### Étape 4 — État des lieux et avoisinants
- **Constat avant travaux** / **référé préventif** des avoisinants sensibles (cf. skill `organiser_constat_refere`) ?
- État des lieux du site (voiries, réseaux) documenté ?

### Étape 5 — Traçabilité et installations communes
- **Registre journal** ouvert et tenu ?
- **Convention de compte prorata** signée par toutes les entreprises (multi-lots) — clé + gestionnaire (cf. skill `gerer_compte_prorata`) ?
- **Base vie**, installations de chantier, **PGC/PPSPS** en place (cf. skill `auditer_pgc_ppsps`) ?

### Étape 6 — Réhabilitation : amiante / plomb (BLOQUANT)
- **Repérage amiante avant travaux (RAAT)** réalisé et transmis ? **Sans repérage = interdiction de démarrer.**
- Travaux de retrait → **SS3** : entreprise **certifiée**, **plan de retrait** transmis **1 mois avant** à inspection du travail / Carsat / OPPBTP ?
- Interventions → **SS4** : **mode opératoire** établi et transmis ?
- **CREP** (plomb) réalisé en habitat ancien (< 1949) → mesures de protection si plomb dégradé ?

### Étape 7 — Assurances
- **DO** (MOA) et **RC décennale** (entreprises) à jour → attestations (cf. corpus `assurances_construction.md`) ?

### Étape 8 — Synthèse et alertes
- Établir la **check-list statuée** (✅ / ⚠️ / ❌), identifier les **bloquants**, et **prescrire** les régularisations avant (ou suspension du) démarrage.

## 4. Restitution structurée

```
## Pilotage démarrage de chantier — [Chantier] — [date]

**Marché** : [réf]   **Type** : [public CCAG / privé NF P 03-001]
**Opération** : [neuf / réhabilitation]   **Lots** : [mono / multi]
**Références** : C. urbanisme R.424-15/R.424-16, CCAG art. 3.8, NF P 03-001, décret 2012-639 (amiante)

### Check-list de démarrage
| Formalité | Référence | Responsable | Statut | Observation |
|---|---|---|---|---|
| DOC déposée | R.424-16 Urb. | MOA | ✅/❌ | [récépissé] |
| Panneau permis affiché (continu, ≥80 cm) | R.424-15 / R.600-3 | MOA | ✅/⚠️/❌ | [constat ?] |
| OS de démarrage notifié | CCAG art. 3.8 | MOE | ✅/❌ | [date] |
| Piquetage / implantation (PV) | géomètre/MOE | Entreprise | ✅/❌ | [PV contradictoire] |
| DT-DICT (réseaux) | R.554-1 Env. | Entreprise | ✅/⚠️ | [récépissés] |
| Constat / état des lieux avoisinants | art. 145 CPC | MOA | ✅/⚠️ | [constat] |
| Registre journal ouvert | NF P 03-001 | OPC/Entreprise | ✅/❌ | |
| Convention compte prorata signée | NF P 03-001 art. 14 | Entreprises | ✅/❌ | [clé / gestionnaire] |
| Amiante : repérage + PDRE(SS3)/mode op.(SS4) | R.4412-94 / décret 2012-639 | Entreprise certifiée | ✅/❌/N.A. | **BLOQUANT** |
| Plomb : CREP (réhab ancien) | L.1334-5 CSP | MOA | ✅/N.A. | |
| Assurances DO / RC décennale | art. 1792, L.241-1/242-1 | MOA/Entreprises | ✅/⚠️ | [attestations] |
| PGC / PPSPS | R.4532 C. trav. | CSPS | ✅/⚠️ | [skill dédié] |

### Manquements bloquants
1. [formalité manquante] → [conséquence + action : suspension / régularisation avant démarrage]

### Actions / régularisations prescrites
- [action] → [responsable] → [échéance]
```

5. **Cite systématiquement** : **C. urbanisme R.424-15 / R.424-16** (panneau / DOC), **R.600-3** (recours des tiers), **CCAG art. 3.8** (OS démarrage), **NF P 03-001 art. 14** (compte prorata), **décret 2012-639** et **R.4412-94 et s.** (amiante), **L.1334-5 CSP** (CREP plomb).

## 5. Livrable (`generer_rapport`)

Propose une **check-list de démarrage XLSX** (statuts ✅/⚠️/❌, responsables, échéances) et une **note de démarrage DOCX/PDF** (constats + manquements bloquants + actions) pour le MOA et les entreprises.

> `generer_rapport({ titre: "Démarrage de chantier — [chantier]", contenu, format: "xlsx", agent: "moex", metadata: { operation, type_marche, date } })`

Mention finale obligatoire : *« Document préparé par l'agent IA MOEX — vérifications à valider par le maître d'œuvre. Les procédures amiante/plomb relèvent d'entreprises et diagnostiqueurs qualifiés ; le MOE alerte sans se substituer à l'inspection du travail. »*

## 6. Garde-fous spécifiques

- **Bloquants absolus** : pas de démarrage sans **OS notifié**, sans **panneau affiché continu**, et — en réhabilitation — sans **repérage amiante** valide (**risque pénal**).
- L'**affichage du panneau** conditionne le **délai de recours des tiers** → recommande un **constat** (commissaire de justice).
- Le **piquetage** doit être **contradictoire** et **figé par PV** (responsabilité d'implantation).
- **Amiante** : ne valide jamais un démarrage SS3/SS4 sans **certification** de l'entreprise et **plan de retrait / mode opératoire** transmis dans les délais (1 mois avant pour SS3).
- **Distingue** registre journal de chantier et **registre-journal CSPS** (RJC, tenu par le coordonnateur).
- Le MOE **n'effectue pas** lui-même les démarches du MOA (DOC, assurances) : il **vérifie** qu'elles sont faites.
- En cas d'ambiguïté (public/privé, applicabilité d'un diagnostic) : **demande au MOA** plutôt qu'interpréter.

## 7. Suites logiques à proposer

- **Rédaction de l'OS de démarrage** si absent (skill `rediger_os`)
- **Organisation d'un constat / référé préventif** des avoisinants (skill `organiser_constat_refere`)
- **Ouverture et convention de compte prorata** (skill `gerer_compte_prorata`)
- **Audit du PGC / validation des PPSPS** (skill `auditer_pgc_ppsps`)
- Suivi du **registre journal** et premiers **comptes-rendus de chantier** (skill `analyse_cr_chantier`)
- En réhabilitation : coordination **amiante / plomb** et gestion des **déchets dangereux** (skill `controler_gestion_dechets`)
