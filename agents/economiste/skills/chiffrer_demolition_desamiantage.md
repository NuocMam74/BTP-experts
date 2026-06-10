# Skill — Chiffrer démolition, désamiantage et déchets

L'utilisateur veut **métrer et chiffrer** une opération de démolition / curetage / déconstruction, intégrant **désamiantage (SS3/SS4)**, **déplombage**, et la **gestion des déchets** (PEMD, BSD, filières, coût à la tonne), avec valorisation possible du **réemploi**.

## 1. Documents attendus

- **RAAT** (repérage amiante avant travaux, arrêté 16 juil. 2019) — indispensable avant tout chiffrage.
- **CREP** (plomb) si bâti **antérieur à 1949**.
- **Diagnostic PEMD** (décret 2021-821) si démolition / rénovation significative (> 1 000 m² ou ex-usage à substances dangereuses).
- **Plans** existants / état des lieux / photos.
- **Programme** : démolition totale, partielle, curetage, déconstruction sélective ?

Si pièces partielles, demande :
1. **Année** du permis de construire (< 1er juillet 1997 → risque amiante ; < 1949 → risque plomb) ?
2. **RAAT / CREP / PEMD** réalisés ? (sinon : à faire avant, chiffrage = sous réserve).
3. **Mode** visé : curetage / déconstruction sélective / démolition lourde ?
4. **Surfaces / volumes** concernés et nature des ouvrages (BA, maçonnerie, charpente) ?
5. **Exutoires locaux** (ISDI/ISDND/ISDD) et distance ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("désamiantage SS3 SS4 retrait encapsulage coût")`
- `rag_search("RAAT repérage amiante avant travaux arrêté 2019 CREP plomb")`
- `rag_search("diagnostic PEMD loi AGEC décret 2021-821 réemploi")`
- `rag_search("déchets BTP filières ISDI ISDND ISDD BSD TGAP coût tonne")`
- `rag_search("métré démolition curetage déconstruction tonnage")`

## 3. Procédure

### Étape 1 — Vérifier les repérages (pré-requis)

- Pas de chiffrage de désamiantage **sans RAAT** : si absent, le mentionner comme **point bloquant** et chiffrer **sous réserve**.
- CREP si < 1949 ; PEMD si seuils atteints.

### Étape 2 — Chiffrer le désamiantage (par consultation)

- Identifier les **MPCA** repérés (dalles, flocages, calorifugeages, colles, fibrociment…).
- Classer **SS3** (retrait/encapsulage — entreprise certifiée, confinement) ou **SS4** (intervention).
- Postes : installation/confinement, retrait (€/m² ou €/ml), conditionnement, **évacuation ISDD** (€/t élevé), contrôles d'empoussièrement.
- ⚠️ **Toujours** renvoyer à une **consultation d'entreprise certifiée** — pas de forfait fiable. Donner des ordres de grandeur uniquement (à actualiser).

### Étape 3 — Métrer la démolition par mode

- **Curetage** : m²/ml/U par élément déposé.
- **Déconstruction sélective** : par **flux** (béton, métaux, bois, plâtre, inerte, DIB, DD) en tonnes.
- **Démolition lourde** : m³ d'ouvrage (conversion tonnage : béton ~2,4 t/m³, BA ~2,5 t/m³).
- Respecter l'ordre : **désamiantage/déplombage AVANT** démolition de l'ouvrage concerné.

### Étape 4 — Chiffrer les déchets par flux

- Affecter chaque flux à sa **filière** : inertes (ISDI), DIB (ISDND), DD/amiante/plomb (ISDD).
- Coût = **transport + traitement + TGAP** (€/t par filière, ordre de grandeur à actualiser).
- **BSD** obligatoire pour DD ; **BSDA** pour l'amiante (Trackdéchets).

### Étape 5 — Valoriser le réemploi (AGEC)

- Identifier les lots réemployables (menuiseries, structures métal, sanitaires…).
- Bilan : surcoût dépose soignée/stockage vs économie achat neuf + traitement évité.

## 4. Restitution structurée

```
## Chiffrage démolition-désamiantage-déchets — [Projet]

### Repérages (pré-requis)
- RAAT amiante : [fait / À FAIRE — bloquant] — MPCA : [...]
- CREP plomb (si < 1949) : [...]
- Diagnostic PEMD (si seuils) : [...]

### Désamiantage (consultation entreprise certifiée SS3/SS4)
| Matériau amianté | Quantité | SS3/SS4 | Coût HT (ordre de grandeur) |
|---|---|---|---|
| ... | | | |
> ⚠️ À valider par devis d'entreprise certifiée.

### Démolition
| Ouvrage | Mode | Quantité | Tonnage | Coût HT |
|---|---|---|---|---|

### Déchets par flux
| Flux | Tonnage | Filière | BSD | Transport+traitement+TGAP |
|---|---|---|---|---|
| Inertes | | ISDI | non | |
| DIB | | ISDND | non | |
| Amiante | | ISDD | BSDA | |
| DD (plomb…) | | ISDD | BSD | |

### Réemploi (PEMD)
- Lots réemployables : [...] — bilan économique : [...]

### Synthèse & réserves
- Total HT (hors aléas) : [...]
- Provision aléas amiante non repéré : [...]
- Exclusions : pollution des sols (G5 env.), branchements définitifs
```

→ Propose `generer_rapport({ titre, contenu, format: "xlsx", agent: "economiste" })` (détail par flux) ou **DOCX/PDF** (note de chiffrage déconstruction).

## 5. Garde-fous spécifiques

- Tu **ne chiffres pas** un désamiantage sans **RAAT** ni un déplombage sans **CREP** — repérage = pré-requis ; sinon chiffrage **sous réserve** + alerte.
- Le **désamiantage** se chiffre par **consultation d'entreprise certifiée SS3/SS4** : tu ne donnes que des **ordres de grandeur** (à actualiser), jamais un forfait engageant.
- Tu **respectes la séquence** : repérage → désamiantage/déplombage → démolition → évacuation.
- Tu **affectes chaque flux** à sa filière et rappelles le **BSD/BSDA** (Trackdéchets) pour les déchets dangereux.
- Tu **rappelles** la volatilité des coûts de traitement (TGAP croissante) → « ordre de grandeur, à actualiser à la date de consultation ».
- Tu **n'oublies pas** que ces postes sont **exclus** des ratios €/m² courants (cf. `ratio_m2`).

## 6. Suites logiques à proposer

- **Consultation** d'entreprises certifiées amiante (SS3) pour valider le désamiantage.
- Skill `metre_quantitatif` pour le métré de démolition détaillé.
- Skill `chiffrer_dpgf` pour intégrer le lot démolition/désamiantage dans la DPGF globale.
- Intégration des coûts dans le **bilan d'opération** (skill `analyser_bilan_promoteur`).
- **Diagnostic PEMD** complet si non réalisé (obligation AGEC).
