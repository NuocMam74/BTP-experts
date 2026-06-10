# Skill — Organiser un constat / référé préventif avant travaux sensibles

L'utilisateur (MOE / OPC) doit **organiser un constat d'état des lieux** (commissaire de justice) ou un **référé préventif** (art. 145 CPC / R.532-1 CJA) **avant** des travaux susceptibles de causer des désordres aux **avoisinants** (voisins, mitoyens, voirie, réseaux, ouvrages publics). Tu identifies les **avoisinants sensibles**, choisis le **bon dispositif** (constat amiable vs référé judiciaire/administratif), prépares la **liste des points à constater** et, en cas de litige, organises le **suivi de l'expertise** (dires, sapiteur). Cf. corpus `constat_refere_expertise.md`.

> ⚠️ Mesure de **prévention du contentieux** : se préconstituer une **preuve datée** de l'état **avant** travaux. Le MOEX **assiste** le MOA et **fournit les pièces techniques** ; il **n'est pas** l'expert judiciaire ni le juge et ne tranche pas les responsabilités.

## 1. Documents attendus

- **Nature des travaux** projetés (démolition, terrassement, fondations spéciales, rabattement de nappe, vibrations, grue) et **planning**
- **Plan de masse / plan de situation** (identification des avoisinants)
- **Étude géotechnique** (G2/G5) si fondations / terrassement profond
- **Liste des avoisinants** : mitoyens, bâtiments fragiles, voirie, réseaux, monuments
- **Constats / référés** antérieurs éventuels
- En cas de litige déclaré : **courriers**, **photos**, **PV** existants, **désordres signalés**

Si pièces partielles : demande
1. Quels **travaux à risque** pour les tiers (démolition, fouilles profondes, pieux/paroi, rabattement, vibrations, grue à proximité) ?
2. Les avoisinants sont-ils des **personnes privées** (→ art. 145 CPC) ou des **personnes publiques / ouvrages publics** (→ R.531-1 / R.532-1 CJA) ?
3. Objectif : **constat amiable** (commissaire de justice) ou **référé préventif** (expert désigné par le juge) ?
4. Y a-t-il un **mur mitoyen** concerné (état des lieux de mitoyenneté) ?
5. Sommes-nous **avant travaux** (préventif) ou **après désordre déclaré** (contentieux engagé) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("référé préventif article 145 CPC état des lieux avoisinants avant travaux")`
- `rag_search("constat commissaire de justice huissier valeur probante état des lieux")`
- `rag_search("référé préventif administratif R.531-1 R.532-1 CJA ouvrage public")`
- `rag_search("expertise judiciaire dire d'expert sapiteur article 232 276 278 CPC")`
- `rag_search("état des lieux mitoyenneté mur mitoyen désordres préexistants")`

## 3. Procédure d'organisation

### Étape 1 — Identifier les travaux et les risques pour les tiers
- Recenser les **travaux sensibles** : démolition, terrassement / fouilles profondes, **fondations spéciales** (pieux, paroi moulée, micropieux), **rabattement de nappe**, **battage / vibrofonçage**, **grue à tour** survolant des propriétés voisines.
- Évaluer le **risque** (tassements, vibrations, fissuration, atteinte aux réseaux).

### Étape 2 — Identifier et qualifier les avoisinants
- Lister **mitoyens**, **bâtiments fragiles**, **voirie**, **réseaux**, **ouvrages publics**, **monuments**.
- Qualifier le **régime** : avoisinants **privés** (→ art. 145 CPC) vs **publics / domaine public** (→ R.531-1 / R.532-1 CJA).

### Étape 3 — Choisir le dispositif
| Dispositif | Quand | Acteur | Effet |
|---|---|---|---|
| **Constat de commissaire de justice** | Travaux à risque modéré, besoin d'une preuve rapide et datée | Commissaire de justice (ex-huissier) | PV de constat — fait foi jusqu'à preuve contraire |
| **Référé préventif judiciaire (art. 145 CPC)** | Avoisinants **privés**, enjeux importants | Juge → **expert** désigné | Expertise contradictoire, préconisations de précautions |
| **Référé préventif administratif (R.531-1 / R.532-1 CJA)** | Travaux touchant le **domaine public** / personnes publiques | Juge administratif → expert | Idem, en matière administrative |

> Recommander **systématiquement** le **référé préventif** pour les chantiers à fort risque (démolition, fondations spéciales, rabattement) : preuve **commune** opposable à toutes les parties.

### Étape 4 — Préparer la liste des points à constater
- **Façades / structures** : fissures existantes, désaffleurements, aplomb, désordres, humidité.
- **Mitoyenneté** : état du mur mitoyen, fissures, niveaux (art. 653 et s. C. civ.).
- **Voirie / sol** : état des chaussées, trottoirs, regards, affaissements.
- **Réseaux apparents**, ouvrages voisins sensibles.
- **Repérage photographique horodaté** et **relevés de niveaux / témoins** (jauges de fissures) à poser si besoin.

### Étape 5 — Organiser le caractère contradictoire
- **Convoquer** / informer les avoisinants pour un constat **contradictoire** (preuve plus solide).
- En référé : l'expert **convoque toutes les parties** aux réunions ; respecter le **contradictoire** (dires).

### Étape 6 (si litige déclaré) — Suivi de l'expertise
- **Rédiger les dires techniques** (observations écrites du MOA / MOE / entreprise) à adresser à l'expert (l'expert doit y répondre — art. 276 CPC).
- Demander si nécessaire la désignation d'un **sapiteur** (géotechnique, structure, acoustique — art. 278 CPC).
- **Fournir les pièces** (plans, études, PV de chantier, constats avant travaux) et **comparer état avant / après**.
- Suivre **pré-rapport** puis **rapport définitif** ; vérifier que les **dires** ont été traités.

## 4. Restitution structurée

```
## Organisation constat / référé préventif — [Chantier] — [date]

**Travaux à risque** : [démolition / terrassement / fondations spéciales / rabattement / grue]
**Avoisinants** : [privés / publics — liste]
**Dispositif recommandé** : [constat commissaire de justice / référé préventif art. 145 CPC / R.532-1 CJA]
**Références** : art. 145 CPC ; R.531-1/R.532-1 CJA ; ord. 2016-728 (commissaire de justice)

### Avoisinants identifiés
| Avoisinant | Type | Sensibilité | Régime (privé/public) | Action |
|---|---|---|---|---|
| Mitoyen n°X | bâti R+2 | fissures existantes | privé → art. 145 CPC | constat + référé |
| Voirie communale | chaussée | trafic | public → R.532-1 CJA | référé admin. |

### Points à constater
- Façades / structures : [fissures, aplomb, désordres, humidité]
- Mitoyenneté : [état mur mitoyen, niveaux]
- Voirie / réseaux : [chaussées, regards, réseaux apparents]
- Photos horodatées + témoins / jauges : [oui/non]

### Dispositif et calendrier
- [Constat amiable / saisine référé] → [délai avant démarrage]
- Caractère **contradictoire** : [convocation des avoisinants]

### (Si litige) Suivi expertise
- Dires à rédiger : [points techniques à soulever]
- Sapiteur souhaité : [discipline]
- Pièces à fournir : [plans, études, constat avant travaux]
```

5. **Cite systématiquement** : **art. 145 CPC** (référé préventif judiciaire), **R.531-1 / R.532-1 CJA** (administratif), **ord. 2016-728** (commissaire de justice / valeur probante), **art. 232, 276, 278 CPC** (expertise, dires, sapiteur), **C. civ. art. 653 et s.** (mitoyenneté).

## 5. Livrable (`generer_rapport`)

Propose une **note d'organisation DOCX/PDF** (recommandation du dispositif + liste des avoisinants + points à constater) pour le MOA, et — en phase contentieuse — un **projet de dire technique DOCX** à transmettre à l'expert via le conseil du MOA.

> `generer_rapport({ titre: "Constat / référé préventif — [chantier]", contenu, format: "pdf", agent: "moex", metadata: { dispositif, avoisinants, phase } })`

Mention finale obligatoire : *« Document préparé par l'agent IA MOEX — la décision de saisir le juge et la rédaction des actes relèvent du maître d'ouvrage et de son conseil. Le MOE assiste techniquement et ne se substitue ni à l'expert ni au juge. »*

## 6. Garde-fous spécifiques

- **Anticiper** : organiser le constat / référé **AVANT** tout démarrage des travaux à risque — une preuve établie après est sans valeur.
- **Choisir le bon régime** : avoisinants **privés** → art. 145 CPC ; **ouvrages publics / personnes publiques** → R.531-1/R.532-1 CJA. Ne pas se tromper de juge.
- Privilégier le **caractère contradictoire** (convocation des avoisinants) : un constat non contradictoire est plus facilement contestable.
- Le MOE **ne décide pas** de la saisine du juge (rôle MOA / conseil) ni ne **rédige les actes de procédure** : il **assiste techniquement** (liste des points, dires).
- En expertise, **respecter le contradictoire** et **répondre aux dires** ; recourir au **sapiteur** pour les questions hors spécialité.
- **Ne pas qualifier les responsabilités** : ni le commissaire de justice (qui constate) ni le MOE ne tranchent — c'est l'expert qui éclaire et le juge qui décide.
- Articuler avec la **sécurité** : les travaux à proximité de tiers relèvent aussi du **PGC** (cf. skill `auditer_pgc_ppsps`) et des **DT-DICT** (réseaux).

## 7. Suites logiques à proposer

- Intégration du constat / référé dans la **check-list de démarrage** (skill `gerer_demarrage_chantier`)
- Pose de **témoins / jauges de fissures** et **suivi de niveaux** pendant les travaux à risque
- En cas de **désordre déclaré** en cours de chantier : constat immédiat, alerte MOA + **assureur** (cf. corpus `assurances_construction.md`)
- **Rédaction des dires techniques** et coordination avec l'**expert** / le **sapiteur** si expertise engagée
- Conservation des constats / rapports au **dossier de chantier** et au **DOE** (skill `controler_doe_diuo`)
