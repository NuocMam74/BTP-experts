# Skill — Analyser des servitudes

L'utilisateur te transmet un **titre de propriété**, un **plan**, ou veut **détecter / qualifier** des servitudes (passage, vue, écoulement des eaux, tour d'échelle, non aedificandi, réseaux, etc.) grevant ou bénéficiant à une parcelle.

## 1. Documents attendus

- **Titre de propriété** (acte notarié récent et anciens — la chaîne d'actes peut révéler des servitudes)
- **Acte fondateur** ou **acte de partage** original (si disponible)
- **Plan cadastral** et **plan masse**
- **Plan de bornage** récent
- **PV de constat d'huissier** sur l'usage actuel (si litige)
- **Pièces du PLU** : règlement, annexes, **SUP** (servitudes d'utilité publique)
- **Plan de réseaux** enterrés (eau, EU, EP, élec, gaz, télécom)
- **Photos** des lieux (passage, vue, ouvrages traversants)
- **Convention de servitude** signée le cas échéant
- **Jugement** (servitude reconnue judiciairement)

Si pièces partielles : demande
1. Type de servitude **suspectée** ou **identifiée** : passage / vue / écoulement / tour d'échelle / non aedificandi / réseaux / vue (jours/vues) / autre ?
2. Est-elle **mentionnée** dans un acte ? Ou résulte-t-elle de la **possession** (servitude par destination du père de famille ou par prescription) ?
3. Est-elle **publiée au SPF** (publicité foncière) ?
4. Le projet de l'utilisateur l'**affecte-t-il** (construction, démolition, division) ?
5. Litige en cours avec le voisin propriétaire dominant ou servant ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("Code civil articles 637 à 710 servitudes")` — texte fondateur
- `rag_search("Code civil article 690 servitudes continues apparentes prescription")` — modes d'acquisition
- `rag_search("Code civil articles 671 à 673 plantations distances")` — distances voisinage
- `rag_search("Code civil articles 675 à 680 vues jours")` — réglementation jours/vues
- `rag_search("Code civil articles 681 à 685 écoulement eaux")` — eaux pluviales
- `rag_search("Code civil articles 682 à 685-1 enclave")` — servitude légale de passage
- `rag_search("Code rural et pêche maritime servitudes rurales")`
- `rag_search("code urbanisme SUP servitudes d'utilité publique")` — réseaux, MH, ABF
- `rag_search("publicité foncière décret 4 janvier 1955")` — opposabilité tiers

## 3. Typologie des servitudes (code civil art. 637)

### Définition légale

> "Une servitude est une charge imposée sur un héritage pour l'usage et l'utilité d'un héritage appartenant à un autre propriétaire." (art. 637 CC)

**Caractéristiques** :
- **Réelle** (attachée au fonds, pas à la personne — se transmet avec la propriété)
- **Accessoire** au fonds dominant
- **Perpétuelle** par principe (sauf clauses)
- **Indivisible** (en cas d'indivision, profite à tous les indivisaires)

### Classifications

#### A — Selon l'origine

| Type | Origine | Exemples |
|---|---|---|
| **Légales** | Loi | Servitude de passage pour enclave (682 CC), tour d'échelle, écoulement eaux pluviales |
| **Naturelles** | Configuration des lieux | Écoulement naturel des eaux (640 CC) |
| **Conventionnelles** | Contrat (notarié) | Passage négocié, vue tolérée par convention |
| **Par destination du père de famille** | Aménagement par un seul propriétaire ayant ensuite divisé (692-693) | Canalisations posées avant division parcellaire |
| **Par prescription trentenaire** | Usage continu et apparent 30 ans (690) | Passage emprunté visiblement 30 ans |
| **Judiciaires** | Décision de justice | Désenclavement constaté par jugement |

#### B — Selon visibilité et exercice

| Type | Définition |
|---|---|
| **Apparentes** | Marquées par ouvrage extérieur (chemin tracé, fenêtre, canalisation visible) — prescription possible |
| **Non apparentes** | Pas d'ouvrage visible (interdiction de bâtir, etc.) — pas de prescription, doivent figurer dans acte |
| **Continues** | S'exercent sans fait actuel de l'homme (vue, écoulement) — prescription possible |
| **Discontinues** | Nécessitent fait actuel (passage à pied, à cheval, à véhicule) — **pas de prescription** sauf titre |

⚠️ **Règle clé (art. 690-691 CC)** : seules les servitudes **continues ET apparentes** peuvent s'acquérir par **prescription trentenaire**. Les servitudes **discontinues** (passage notamment) ne peuvent s'acquérir que par **titre** ou **destination du père de famille**.

## 4. Servitudes courantes — Analyse détaillée

### A — Servitude de passage (art. 682 à 685-1 CC)

**Légale** si fonds **enclavé** : "Le propriétaire dont les fonds sont enclavés et qui n'a sur la voie publique aucune issue, ou qu'une issue insuffisante, soit pour l'exploitation agricole, industrielle ou commerciale de sa propriété, soit pour la réalisation d'opérations de construction ou de lotissement, est fondé à réclamer sur les fonds de ses voisins un passage suffisant…" (art. 682)

**Caractéristiques** :
- **Indemnité** due au fonds servant proportionnelle au dommage (art. 682)
- **Tracé** : le moins dommageable pour le fonds servant
- **Assiette** : largeur suffisante pour l'usage (souvent 3 à 4 m pour automobile, 1 m pour piéton)

**Discontinue** → ne s'acquiert pas par prescription, sauf **enclave constatée**.

### B — Vues et jours (art. 675 à 680 CC)

**Vues** : ouvertures permettant de voir chez le voisin.

| Type | Distance mini (art. 678-679) |
|---|---|
| **Vues droites** (perpendiculaires à la limite) | **1,90 m** entre limite et fenêtre |
| **Vues obliques** (angle ≤ 90° avec la limite) | **0,60 m** entre limite et fenêtre |

**Jours de souffrance** : ouvertures à plus de **2,60 m du plancher** (RDC) ou **1,90 m** (étages), translucides, fixes, ne permettant pas la vue → peuvent être ouvertes même en limite (art. 676-677).

⚠️ Une vue **non conforme** créée sans accord du voisin est **régularisable** par prescription 30 ans si **apparente et continue**.

### C — Écoulement des eaux (art. 640-641 CC)

> "Les fonds inférieurs sont assujettis envers ceux qui sont plus élevés à recevoir les eaux qui en découlent naturellement…" (art. 640)

- **Naturelle** : eau de pluie, ruissellement
- **Pas le droit** de modifier l'écoulement (créer artificiellement, concentrer)
- Eaux **usées** : **interdit** de les rejeter sur le fonds voisin

### D — Tour d'échelle

**Pas codifiée** mais **reconnue par la jurisprudence** : le propriétaire qui ne peut entretenir son mur **qu'en passant chez le voisin** peut le faire, à charge d'**indemnité** et **préavis raisonnable**.

### E — Servitude de cour commune (art. L.471-1 CCH)

Servitude **administrative** : interdiction de construire au-delà d'une certaine limite, sur autorisation du juge administratif, contre indemnité. Permet d'atteindre un coefficient d'emprise compatible avec PLU.

### F — Servitude non aedificandi

Interdiction conventionnelle ou réglementaire de **construire** sur tout ou partie d'un fonds. Peut être :
- **Conventionnelle** (clause notariée)
- **Légale** (recul PLU, alignement, secteur protégé MH)
- **Inscrite au PLU** (espaces boisés classés, emplacements réservés)

### G — Servitudes pour réseaux (eau, électricité, gaz, télécom)

- Souvent **conventionnelles** (convention de passage de canalisation) avec exploitant (Enedis, GRDF, etc.)
- Parfois **administratives** (PLU, code de l'énergie L.323-3 à L.323-12 pour électricité)
- Liées à **plan de zonage des réseaux** annexe au PLU
- À identifier par **DT-DICT** (voir skill `dt_dict`)

### H — Plantations (art. 671-673 CC)

| Hauteur arbre | Distance mini de la limite |
|---|---|
| ≤ 2 m de haut | **0,50 m** |
| > 2 m de haut | **2 m** |

Le **voisin** peut exiger **arrachage** ou **élagage** si non conforme. **Prescription 30 ans** si l'arbre est **planté depuis > 30 ans** non contesté.

### I — Servitudes d'utilité publique (SUP) — annexe PLU

Liste indicative des SUP courantes :
- **AC** : monuments historiques classés (rayon 500 m)
- **AS** : périmètre de protection captage eau potable
- **PM** : risques (PPRn, PPRi, PPRt)
- **I1, I4, I5** : canalisations de transport (gaz, hydrocarbures, électricité HT)
- **T1, T4, T5** : voies ferrées, télécommunications, aéronautiques
- **EL** : protection paysagère (sites classés, sites inscrits)

## 5. Acquisition et extinction des servitudes

### Acquisition

| Mode | Conditions |
|---|---|
| **Titre** (acte notarié) | Convention publiée au SPF pour opposabilité aux tiers |
| **Prescription** | 30 ans, continue ET apparente uniquement (art. 690 CC) |
| **Destination du père de famille** | Aménagement par propriétaire unique avant division (art. 692-693) |
| **Légale** | Cas prévus par la loi (enclave, eaux, vues, etc.) |

### Extinction (art. 703 à 710 CC)

| Cause | Détails |
|---|---|
| **Impossibilité d'usage** (art. 703) | Modification physique des lieux rendant la servitude inutile |
| **Confusion** (art. 705) | Fonds dominant et fonds servant réunis dans une même main |
| **Non-usage 30 ans** (art. 706) | Pour servitudes discontinues |
| **Renonciation** (art. 1103 CC) | Convention avec le propriétaire du fonds dominant |
| **Cause légale spécifique** | Selon nature (ex : désenclavement par accès nouveau) |

## 6. Procédure d'analyse

### Étape 1 — Recherche documentaire
- Lire **chaîne des titres** (acte récent + acte antérieur + acte fondateur)
- Identifier **mentions de servitudes** (souvent en fin d'acte, rubrique "Servitudes")
- Vérifier **plan annexé** aux actes
- Consulter **annexes PLU** pour SUP
- Vérifier **publication SPF** pour opposabilité tiers

### Étape 2 — Observation des lieux
- Repérer **éléments physiques** (chemins, ouvertures, canalisations, plantations, ouvrages)
- Photographier **les usages apparents**
- Mesurer **distances** par rapport à la limite (vues, plantations)
- Vérifier la **continuité de l'exercice** (pour prescription)

### Étape 3 — Qualification juridique
Pour chaque servitude :
- **Origine** : titre, prescription, légale, judiciaire ?
- **Caractère** : apparente / non apparente, continue / discontinue ?
- **Acquisition** : valable au regard des règles d'acquisition ?
- **Étendue** : assiette, intensité, modalités d'exercice ?
- **Opposabilité** : publiée au SPF ? Connue de l'acquéreur ?

### Étape 4 — Identification des risques et obligations
- Pour le **fonds servant** : restriction d'usage, contrainte au projet
- Pour le **fonds dominant** : droit d'usage, défense en cas d'atteinte
- **Indemnités** dues ?
- **Compatibilité** avec le projet envisagé (construction, division, vente) ?

## 7. Restitution structurée

```
## Analyse de servitudes — Parcelles [X / Y]

### Identification
- **Fonds servant** : parcelle [...] – propriétaire [...]
- **Fonds dominant** : parcelle [...] – propriétaire [...]
- **Type de servitude étudiée** : [passage / vue / écoulement / non aedificandi / réseaux / etc.]
- **Date d'analyse** : [JJ/MM/AAAA]
- **Géomètre-expert** : [nom + n° Ordre]

### Caractérisation de la servitude

| Critère | Constat |
|---|---|
| Nature | [passage à pied / véhicule / canalisation / vue droite / etc.] |
| Origine | [titre du JJ/MM/AAAA / prescription / destination père famille / légale art. 682 CC / etc.] |
| Caractère | apparente / non apparente |
| Caractère | continue / discontinue |
| Assiette (emplacement) | [description + plan annexé] |
| Largeur / dimensions | [m / m²] |
| Intensité d'usage | [piétons / véhicules légers / poids lourds / canalisation] |
| Indemnité | due / non due / déjà acquittée |

### Cohérence avec les titres

| Source | Mention de la servitude | Notes |
|---|---|---|
| Acte actuel | [oui/non, page X] | [...] |
| Acte antérieur (vendeur précédent) | [oui/non] | [...] |
| Acte fondateur | [oui/non] | [acte original ou pas accessible] |
| Plan cadastral | [trace apparente / pas de marquage] | |
| Annexes PLU (SUP) | [oui/non] | [...] |
| Publication SPF | [oui/non] | Opposabilité tiers : ✅/⚠️ |

### Modes d'acquisition validés / contestés

- **Acquisition par titre** : ✅ valide / ❌ pas de titre / ⚠️ acte ancien à confirmer
- **Acquisition par prescription** (si servitude continue + apparente) : 
  - Possession 30 ans démontrée : oui / non / à instruire
  - Continuité : oui / interrompue
  - Apparence : oui / non
- **Destination du père de famille** : applicable / non
- **Servitude légale** : applicable (enclave, eaux) / non

### Empiètement, abus, ou contestation
- [Ex : passage utilisé pour véhicules alors que titre limite aux piétons]
- [Ex : vue droite à 1,40 m de la limite (1,90 m requis) → non régularisée]
- [Ex : non-usage > 30 ans (servitude éteinte par prescription extinctive art. 706)]

### Impact sur projet utilisateur

| Projet envisagé | Compatible avec servitude ? | Action requise |
|---|---|---|
| Construction d'une extension | ⚠️ Vue à 1,90 m impossible côté nord | Décaler l'extension de 0,40 m ou demander accord voisin |
| Division parcellaire | ✅ | Réserver assiette du passage dans nouvelle parcelle |
| Vente | ✅ | Mentionner explicitement les servitudes dans l'acte |

### Recommandations
1. **Publication SPF** si servitude non publiée et opposabilité tiers visée
2. **Convention écrite** notariée pour formaliser servitudes par usage si non titrées
3. **Mesurage géomètre** de l'assiette précise et plan annexé
4. **Bornage préalable** si limite séparative impactée par projet
5. **Avenant à PLU** si SUP affectent significativement le projet
6. **Médiation / action judiciaire** si litige avec voisin sur exercice ou existence

### Pièces à conserver
- Acte de propriété + chaîne des titres
- Plan d'assiette signé géomètre
- Convention de servitude (le cas échéant)
- Photos historiques d'usage (pour prescription)
- Publication SPF (pour opposabilité)
```

## 8. Garde-fous spécifiques

- Tu **n'arbitres pas** un litige sur l'existence d'une servitude — c'est le **tribunal judiciaire** qui statue. Tu prépares l'**analyse** technico-juridique pour le géomètre-expert ou l'avocat utilisateur.
- **Servitudes discontinues** (passage) : **pas d'acquisition par prescription** (art. 691 CC). Un usage ancien sans titre ne suffit pas — il faut **convention** ou **destination du père de famille**.
- **Servitude pour enclave** (art. 682) : nécessite **enclave réelle** (pas d'accès, ou accès insuffisant). La création **volontaire** d'enclave (par exemple division qui prive un lot d'accès) n'ouvre pas droit à servitude légale gratuite — sanctions Cass.
- Pour les **vues** : la **prescription 30 ans** est possible (continue + apparente) — un voisin peut ainsi régulariser une vue créée illégalement il y a > 30 ans.
- Pour les **canalisations** anciennes traversant une parcelle : peuvent constituer une **servitude par destination du père de famille** si elles ont été posées par un ancien propriétaire unique avant la division.
- **Publicité foncière** : indispensable pour opposabilité aux tiers. Une servitude non publiée **n'est pas opposable** à un acquéreur de bonne foi (sauf cas particuliers).
- Les **SUP** (servitudes d'utilité publique) inscrites au PLU sont **toujours opposables** sans publicité SPF — vérifier annexes.
- En cas de **construction nouvelle**, la servitude (si valable) **doit être respectée** : par exemple, recul respecté pour vues, conservation d'un passage suffisant, etc.
- Le **bénéficiaire** (fonds dominant) a **obligation d'entretien** des ouvrages (art. 701 CC) sauf clause contraire.
- Pour les **plantations**, la prescription protège l'**arbre lui-même** s'il est planté depuis > 30 ans sans contestation, mais **pas les fruits** ou **branches** qui débordent (le voisin peut toujours élaguer).
- Tu **rappelles** que la **servitude n'est pas un droit absolu** : le fonds servant garde la **propriété**, la servitude ne porte que sur l'**usage limité** convenu.

## 9. Suites logiques à proposer

- Skill `analyser_bornage` pour confirmer les limites séparatives sur lesquelles s'exercent les servitudes
- Skill `division_parcellaire` si projet de division — anticiper les servitudes à créer (passage, réseaux)
- Skill `dt_dict` pour identifier réseaux enterrés (qui peuvent matérialiser des servitudes)
- Publication SPF de toute nouvelle servitude créée (notaire requis)
- **Convention de servitude** notariée pour formaliser un usage ancien non titré
- **Plan d'assiette** signé géomètre-expert pour cartographier précisément la servitude
- En cas de **litige** : **médiation** (CIVI, gratuit), puis **TJ** (tribunal judiciaire compétence pour servitudes)
- Coordination avec le **notaire** pour intégration aux actes (vente, partage, donation)
- Si projet en zone soumise à **SUP** : pré-consultation **ABF / DREAL / mairie** selon SUP applicable
- Pour les **gros lotissements** : préparer un **règlement de lotissement** intégrant servitudes inter-lots (accès, réseaux, plantations)
