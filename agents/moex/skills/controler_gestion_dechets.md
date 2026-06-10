# Skill — Contrôler la gestion des déchets de chantier

L'utilisateur (MOE / OPC) doit **contrôler la gestion des déchets** d'un chantier : vérifier le **diagnostic PEMD**, le **SOGED/SOSED** des entreprises, la **traçabilité** (bordereaux, registre) et le **taux de valorisation** (objectif 70 %), puis émettre des constats motivés et un bilan. Cf. corpus `dechets_environnement_chantier.md`.

## 1. Documents attendus

- **Diagnostic PEMD** (si démolition / rénovation significative — décret 2021-821) + **formulaire de récolement** après travaux
- **SOGED / SOSED** des entreprises (organisation du tri, filières, bennes, objectifs)
- **Bordereaux de suivi** : **BSD / BSDD (Trackdéchets)** pour les déchets dangereux
- **Registre des déchets** (chronologique : nature, quantités, destination, filière)
- **Bons de pesée / attestations** des exutoires (tonnages valorisés)
- **Charte chantier à faibles nuisances** (si annexée au marché) et CCTP/CCAP (clauses déchets)

Si pièces partielles : demande
1. Opération de **démolition / rénovation** (PEMD requis) ou **construction neuve** ?
2. **Surface** concernée / activité antérieure (substances dangereuses) → seuils PEMD ?
3. Présence de **déchets dangereux** (amiante, plomb, DEEE, hydrocarbures) ?
4. Le marché impose-t-il un **SOGED/SOSED** et un **taux de valorisation** contractuel ?
5. Phase : **préparation**, **suivi exécution** ou **bilan de fin de chantier** ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("décret 2021-821 diagnostic PEMD démolition rénovation")`
- `rag_search("loi AGEC REP bâtiment PMCB éco-organismes reprise déchets")`
- `rag_search("SOGED SOSED schéma organisation gestion déchets chantier")`
- `rag_search("BSD BSDD Trackdéchets registre déchets traçabilité R.541")`
- `rag_search("taux valorisation 70 pour cent déchets construction démolition")`
- `rag_search("charte chantier faibles nuisances bruit poussières eaux de lavage")`

## 3. Procédure de contrôle

### Étape 1 — Diagnostic PEMD (si applicable)
- Seuils atteints (**> 1 000 m²** OU activité avec substances dangereuses) → **diagnostic obligatoire** ?
- Réalisé par un **professionnel compétent et indépendant**, **transmis avant** consultation/démolition ?
- Identifie-t-il **réemploi**, **nature et quantités**, **filières** ?
- **Récolement** établi **après** travaux et transmis ?

### Étape 2 — SOGED / SOSED
- Transmis par l'entreprise **avant travaux** (si exigé au marché) ?
- Définit-il : **tri à la source**, **bennes par flux**, **filières**, **objectifs de valorisation**, **traçabilité** ?
- **Mise en œuvre réelle** sur chantier vérifiée (bennes identifiées, affichage consignes) ?

### Étape 3 — Traçabilité
- **Déchets dangereux** : **BSD/BSDD via Trackdéchets** présents et complets ?
- **Registre des déchets** tenu (nature, quantités, destination, exutoire) ?
- **Bons de pesée / attestations** des exutoires cohérents avec les quantités évacuées ?
- Filières conformes (installations autorisées, points de reprise REP PMCB) ?

### Étape 4 — Taux de valorisation
- Calcul : (tonnage valorisé matière / tonnage total) × 100 → comparer à l'**objectif 70 %** (et à l'objectif contractuel éventuel).
- Justifié par bons de pesée / attestations ?

### Étape 5 — Charte chantier à faibles nuisances
- **Bruit** (plages horaires, engins), **poussières** (arrosage, bâchage bennes, débourbeur), **eaux de lavage** (bac de décantation, lavage toupies, interdiction rejet laitance) respectés ?

### Étape 6 — Constats et bilan
- Émettre des **constats motivés** (non-conformités → réserves / demandes de régularisation).
- Consolider un **bilan déchets** (tonnages, taux de valorisation) pour le DOE / reporting.

## 4. Restitution structurée

```
## Contrôle gestion des déchets — [Chantier] — [phase]

**Opération** : [neuf / démolition / rénovation]   **Lot(s)** : [...]
**Référence** : décret 2021-821 (PEMD), loi AGEC (REP PMCB), Code env. L.541-1 et s.

### Diagnostic PEMD
| Critère | Constat | Statut |
|---|---|---|
| Seuils atteints / diagnostic requis | [...] | ✅ / N.A. / ❌ |
| Diagnostic transmis avant travaux | [...] | ✅ / ❌ |
| Récolement après travaux | [...] | ✅ / ⚠️ |

### SOGED / SOSED
| Critère | Constat | Statut |
|---|---|---|
| SOGED transmis et complet | [...] | ✅ / ⚠️ / ❌ |
| Tri à la source / bennes par flux | [...] | ✅ / ⚠️ |
| Mise en œuvre réelle constatée | [...] | ✅ / ❌ |

### Traçabilité
| Critère | Constat | Statut |
|---|---|---|
| BSD/BSDD (Trackdéchets) déchets dangereux | [...] | ✅ / ❌ |
| Registre des déchets | [...] | ✅ / ⚠️ |
| Bons de pesée / exutoires conformes | [...] | ✅ / ❌ |

### Taux de valorisation
- Tonnage total : [t]   Tonnage valorisé matière : [t]
- **Taux de valorisation : [..] %**  (objectif 70 % — [✅ atteint / ❌ non atteint])

### Charte faibles nuisances
| Thème | Constat | Statut |
|---|---|---|
| Bruit | [...] | ✅ / ⚠️ |
| Poussières | [...] | ✅ / ⚠️ |
| Eaux de lavage | [...] | ✅ / ❌ |

### Non-conformités / actions
1. [constat motivé] → [régularisation demandée / réserve]
```

5. **Cite systématiquement** : **décret 2021-821** (PEMD), **loi AGEC** (REP PMCB), **Code de l'environnement L.541-1 et s.** et **R.541-43 et s.** (registre, BSD/Trackdéchets), objectif **70 %**, et les clauses **CCTP/CCAP** déchets du marché.

## 5. Livrable (`generer_rapport`)

Propose un **rapport de contrôle déchets DOCX/PDF** (constats motivés + actions) et un **bilan déchets XLSX** (flux, tonnages, taux de valorisation) pour le DOE / reporting.

> `generer_rapport({ titre: "Contrôle gestion des déchets — [chantier]", contenu, format: "pdf", agent: "moex", metadata: { operation, phase } })`

Mention finale obligatoire : *« Document préparé par l'agent IA MOEX — constats à valider par le maître d'œuvre. Seuils, taux et dates de la réglementation déchets datés — à revérifier à la date de consultation. »*

## 6. Garde-fous spécifiques

- Les **seuils PEMD**, le **taux de valorisation 70 %** et les **dates d'entrée en vigueur REP** sont **datés** → rappelle qu'ils sont **à revérifier à la date de consultation**.
- **Déchets dangereux** (amiante, plomb) : ne te limite pas à la traçabilité — articule avec la **sécurité** (cf. skill `auditer_pgc_ppsps` / corpus CSPS, travaux dangereux) ; ces travaux relèvent de procédures spécifiques (sous-section 3/4 amiante).
- Tu **constates et alertes** : tu ne te substitues pas à l'inspection (DREAL/inspection du travail) ni au MOA pour les sanctions.
- Ne valide pas un **taux de valorisation** sans **bons de pesée / attestations** d'exutoires (déclaratif non justifié = non conforme).
- Vérifie la **réalité chantier** (bennes, tri) et pas seulement les documents : un SOGED parfait sur le papier ne vaut rien sans mise en œuvre.

## 7. Suites logiques à proposer

- Demande de **régularisation** du SOGED / traçabilité avant poursuite des évacuations
- **Bilan déchets** consolidé pour le **DOE** (skill `controler_doe_diuo`)
- **Point déchets / nuisances** récurrent en réunion de chantier (skill `analyse_cr_chantier`)
- Pour amiante/plomb : coordination **CSPS** et procédures spécifiques (skill `auditer_pgc_ppsps`)
- Reporting **environnemental** au COPIL MOA (taux de valorisation, conformité charte)
