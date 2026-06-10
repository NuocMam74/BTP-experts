# Skill — Produire / analyser un plan parcellaire d'expropriation et situer la procédure

L'utilisateur est concerné par une **expropriation pour cause d'utilité publique** (en tant qu'expropriant, exproprié, ou pour le compte d'un aménageur) et veut **produire ou analyser un plan parcellaire d'expropriation**, **situer la procédure** (phase administrative / judiciaire), identifier les **emprises** (totales / partielles) et **cadrer l'indemnité** (principale, de remploi, accessoires). S'appuie sur le corpus `expropriation_dup.md` (et `evaluation_immobiliere.md`, `dmpc_cadastre_procedures.md`).

## 1. Documents attendus

- **Arrêté de DUP** (ou décret) + dossier d'enquête publique
- **Arrêté de cessibilité** + **état parcellaire** (liste des propriétaires)
- **Plan général des travaux** du projet d'utilité publique
- **Plan cadastral** + **matrice** des parcelles concernées
- **Titres de propriété** des fonds touchés
- **Ordonnance d'expropriation** (si déjà prononcée)
- **Évaluation France Domaine** + offres / mémoires des parties (si phase indemnitaire)
- **Plan topographique** géoréférencé (RGF93 Lambert 93)

Si pièces partielles : demande
1. Vous intervenez pour l'**expropriant** (collectivité / aménageur) ou pour un **exproprié** ?
2. À quel **stade** : avant enquête / enquête parcellaire / arrêté de cessibilité / ordonnance d'expropriation / fixation de l'indemnité ?
3. Emprise **totale** (parcelle entière) ou **partielle** (DMPC à établir) ?
4. Nature des biens (terrain nu, bâti, exploitation agricole, fonds de commerce) ?
5. Existe-t-il un **reliquat** (partie non expropriée) potentiellement déprécié / impropre à usage ?
6. Une **cession amiable** est-elle envisagée ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("code expropriation DUP utilité publique enquête publique")`
- `rag_search("code expropriation enquête parcellaire arrêté de cessibilité")`
- `rag_search("code expropriation ordonnance d'expropriation transfert propriété")`
- `rag_search("code expropriation indemnité principale remploi accessoires L.321-1")`
- `rag_search("code expropriation expropriation partielle reliquat L.242-1")`
- `rag_search("code expropriation rétrocession L.421-1 délai 5 ans")`
- `rag_search("DDHC article 17 juste et préalable indemnité propriété")`
- `rag_search("document d'arpentage DMPC division parcelle expropriée")`

## 3. Cadre juridique (rappels structurants)

| Texte | Contenu |
|---|---|
| **DDHC art. 17 / Code civil art. 545** | Expropriation seulement pour **utilité publique** + **juste et préalable indemnité** |
| **Code expro L.121-1 et s.** | **DUP** par arrêté préfectoral (ou décret) après enquête publique |
| **Code expro L.131-1 et s. / R.131-1** | **Enquête parcellaire** + **arrêté de cessibilité** |
| **Code expro L.221-1** | **Ordonnance d'expropriation** (juge) : éteint les droits, **transfère la propriété** |
| **Code expro L.321-1** | Indemnité : **principale** + **remploi** + **accessoires** (réparation intégrale) |
| **Code expro L.242-1 et s.** | **Expropriation partielle** : acquisition de la totalité si reliquat impropre |
| **Code expro L.421-1 et s.** | **Rétrocession** si destination non réalisée sous **5 ans** |

> **Séparation des phases :** l'administration **déclare l'utilité publique** et **désigne les parcelles** (DUP + cessibilité) ; seul le **juge de l'expropriation** **transfère la propriété** (ordonnance) et **fixe l'indemnité**.

## 4. Procédure

### Étape 1 — Situer le stade de la procédure

Positionner le dossier sur la chronologie :
`Études → Enquête publique → DUP → Enquête parcellaire → Arrêté de cessibilité → Ordonnance d'expropriation → Fixation de l'indemnité (à défaut d'accord amiable)`

### Étape 2 — Établir / vérifier le plan parcellaire d'expropriation

- Reporter les **emprises** à exproprier sur fond cadastral géoréférencé **RGF93 Lambert 93**.
- Distinguer **emprises totales** (parcelle entière) et **emprises partielles** (portion).
- Pour chaque emprise partielle : préparer un **document d'arpentage (DMPC)** créant la parcelle « emprise » distincte (voir skill `etablir_dmpc`).
- Mesurer le **reliquat** (partie restante) et évaluer son **caractère utilisable**.

### Étape 3 — Établir / vérifier l'état parcellaire

- Tableau : n° parcelle, surface totale, **surface expropriée**, surface reliquat, propriétaire, nature, droits réels.
- Vérifier la **concordance** plan parcellaire ↔ état parcellaire ↔ arrêté de cessibilité.

### Étape 4 — Cadrer l'indemnité (appui technique)

- **Indemnité principale** : valeur vénale (méthode par comparaison — DVF, références ; voir `evaluation_immobiliere.md`).
- **Indemnité de remploi** : frais de remploi (barème dégressif).
- **Indemnités accessoires** : dépréciation du **reliquat**, trouble d'exploitation, perte de récolte, déménagement, etc.
- Neutraliser les **plus-values** liées à l'annonce de l'opération (**date de référence**).

> L'**estimation officielle** revient à **France Domaine** et l'**indemnité** est **fixée par le juge** : le géomètre **éclaire** la valeur et la dépréciation du reliquat, il ne fixe pas l'indemnité.

### Étape 5 — Identifier les options de l'exproprié

- **Cession amiable** (acte notarié) — toujours privilégiée.
- **Acquisition de la totalité** si reliquat impropre (art. L.242-1).
- **Droit de délaissement** / **rétrocession** (art. L.421-1, délai 5 ans) le cas échéant.

## 5. Restitution structurée

```
## Expropriation — Plan parcellaire et situation — [Opération]

### Identification
- **Opération d'utilité publique** : [intitulé]
- **Expropriant** : [collectivité / aménageur]
- **DUP** : [arrêté/décret du JJ/MM/AAAA]
- **Arrêté de cessibilité** : [du JJ/MM/AAAA]
- **Stade actuel** : [enquête parcellaire / cessibilité / ordonnance / indemnité]
- **Géoréférencement** : RGF93 Lambert 93
- **Géomètre-expert** : [nom + n° Ordre OGE]

### État parcellaire des emprises
| Parcelle | Commune | Propriétaire | Surface totale (m²) | Surface expropriée (m²) | Reliquat (m²) | Emprise | Reliquat utilisable ? |
|---|---|---|---|---|---|---|---|
| AB 123 | [commune] | [nom] | 1 800 | 1 800 | 0 | Totale | — |
| AB 124 | [commune] | [nom] | 2 400 | 600 | 1 800 | Partielle (DMPC) | ✅ |
| AB 130 | [commune] | [nom] | 900 | 700 | 200 | Partielle (DMPC) | ⚠️ reliquat impropre |

### Documents d'arpentage (emprises partielles)
| Parcelle mère | Parcelle emprise créée | Parcelle reliquat | DMPC |
|---|---|---|---|
| AB 124 | AB 200 (600 m²) | AB 201 (1 800 m²) | À établir |

### Cadrage indemnitaire (appui — non décisionnel)
| Poste | Base | Estimation indicative |
|---|---|---|
| Indemnité principale | Valeur vénale (comparaison) | [€] |
| Indemnité de remploi | Barème dégressif | [€] |
| Dépréciation du reliquat | Reliquat AB 130 impropre | [€ / acquisition totale art. L.242-1] |
| Accessoires | [trouble exploitation / déménagement] | [€] |

### Points d'attention
1. [Ex : reliquat AB 130 (200 m²) impropre à usage → demande d'acquisition totale art. L.242-1]
2. [Ex : ordonnance d'expropriation non encore prononcée → propriété pas encore transférée]
3. [Ex : plus-value liée à l'annonce du projet à neutraliser (date de référence)]
4. [Ex : cession amiable possible avant audience du juge → privilégier]

### Niveau de confiance
- [Élevé / À valider avec France Domaine et le juge de l'expropriation]
```

→ Sur demande ou en push proactif :
`generer_rapport({ titre: "Plan parcellaire et note d'expropriation — [opération]", contenu: <markdown>, format: "docx" (note + état parcellaire) ou "xlsx" (état parcellaire + cadrage), agent: "geometre", metadata: { operation, dup, cessibilite, OGE_signataire_prevu, date } })`

> 👉 *Souhaites-tu que je génère la **note de situation + état parcellaire (DOCX)** et le **tableau des emprises (XLSX)** prêts à transmettre à l'aménageur / au juge de l'expropriation ?*

## 6. Garde-fous spécifiques

- Tu **respectes la séparation des phases** : l'administration **déclare l'utilité publique** et **désigne** les parcelles (DUP + cessibilité) ; seul le **juge de l'expropriation** **transfère la propriété** (ordonnance) et **fixe l'indemnité**. Ne **confonds pas** les rôles.
- Tu **ne fixes pas** l'indemnité : tu **éclaires** la valeur (méthode par comparaison) et la dépréciation du reliquat. L'**estimation officielle** revient à **France Domaine** et l'**indemnité** au **juge**. Le principe est la **réparation intégrale** (préjudice direct, matériel et certain).
- Pour les **emprises partielles** : un **document d'arpentage (DMPC)** établi par le **géomètre-expert OGE** est nécessaire pour créer la parcelle « emprise » distincte (monopole, ordonnance 21 mai 1945) — voir skill `etablir_dmpc`.
- Tu **signales** le **droit à l'acquisition totale** (art. L.242-1) quand le **reliquat** est impropre à un usage normal, et le **droit de rétrocession** (art. L.421-1, délai **5 ans**) si la destination DUP n'est pas réalisée.
- Tu **privilégies** la **cession amiable** (acte notarié) à tout stade — moins coûteuse et plus rapide que la phase judiciaire.
- Tu **rappelles** que l'expropriation suppose une **utilité publique légalement constatée** (contrôle du juge administratif — **théorie du bilan**, CE *Ville Nouvelle Est* 1971) et une **juste et préalable indemnité** (DDHC art. 17).
- Tu **ne génères pas** de livrable si l'**arrêté de cessibilité** / l'**état parcellaire** sont absents et que les emprises ne sont pas levées — demande les pièces.

## 7. Suites logiques à proposer

- **Levé et plan parcellaire** géoréférencé des emprises (RGF93)
- **Documents d'arpentage (DMPC)** pour chaque emprise partielle (skill `etablir_dmpc`)
- **Évaluation foncière** d'appui (skill `evaluer_bien_immobilier`, corpus `evaluation_immobiliere.md`)
- Vérification de la **concordance** plan parcellaire ↔ arrêté de cessibilité ↔ titres (skill `analyser_titres_propriete`)
- Préparation d'un **mémoire** (offre / réclamation) pour le juge de l'expropriation, en lien avec l'avocat
- **Cession amiable** : coordination notaire (acte) + publicité foncière
- Si le reliquat est impropre : demande d'**acquisition totale** (art. L.242-1)
- Pour les expropriations d'exploitations agricoles : articulation avec un éventuel **aménagement foncier (AFAF)** de compensation (corpus `amenagement_foncier_rural_afaf.md`)
