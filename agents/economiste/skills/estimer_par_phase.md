# Skill — Estimer au bon niveau de précision selon la phase (ESQ → PRO)

L'utilisateur veut une **estimation calée sur la phase d'étude** (Faisabilité, ESQ, APS, APD, PRO, DCE/ACT) au **bon niveau de précision**, dans le cadre de la **loi MOP** : enveloppe financière prévisionnelle, coût prévisionnel des travaux, engagement MOE et **seuil de tolérance**, éventuellement en **conception à coût objectif**.

## 1. Documents / paramètres attendus

- **Programme** / cahier des charges MOA + **enveloppe financière prévisionnelle**.
- **Phase d'étude** en cours (Faisabilité / ESQ / APS / APD / PRO / DCE).
- **Pièces graphiques** disponibles à cette phase (esquisse, plans APS/APD/PRO).
- **Destination + SDP + région** (pour les phases amont au ratio).
- **Contrat MOE** : la MOE est-elle engagée sur le coût (à partir APD) ? Quel **seuil de tolérance** ?
- Démarche **coût objectif** imposée ? (coût travaux = donnée d'entrée figée).

Si paramètres partiels, demande : phase exacte, enveloppe MOA, destination/SDP/région, existence d'un engagement MOE + seuil.

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("loi MOP enveloppe coût prévisionnel travaux seuil de tolérance")`
- `rag_search("phases ESQ APS APD PRO précision estimation livrable")`
- `rag_search("conception à coût objectif optimisation enveloppe")`
- `rag_search("ratios m² par destination")` — pour Faisabilité→APD
- `rag_search("DPGF chiffrage poste par poste")` — pour PRO→DCE

## 3. Procédure

### Étape 1 — Caler la précision sur la phase

| Phase | Précision visée | Base de l'estimation |
|---|---|---|
| Faisabilité / Programme | ± 25-30 % | Ratios €/m² SDP |
| **ESQ** | ± 25 % | Ratios + parti architectural (grandes masses) |
| **APS** | ± 15-20 % | Compte sommaire décomposé par lot |
| **APD** | ± 10-15 % | Métré sommaire + prix réf. → **coût prévisionnel engagé** |
| **PRO** | ± 5 % | Métré détaillé + sous-détails (DQE) |
| **DCE / ACT** | engageant | DPGF chiffrée / offres reçues |

### Étape 2 — Produire l'estimation au format de la phase

- **Faisabilité/ESQ** → ratio €/m² SDP (skill `ratio_m2`) + grandes masses (GO / clos-couvert / second œuvre / lots techniques / VRD).
- **APS** → **compte sommaire décomposé** par lot (premières quantités).
- **APD** → **coût prévisionnel des travaux** par lot, **point d'engagement MOE** + seuil de tolérance.
- **PRO** → **DQE détaillé** poste par poste (skill `chiffrer_dpgf` + `metre_quantitatif` + `sous_detail_prix`).
- **DCE/ACT** → DPGF de consultation + estimation confidentielle MOA + analyse des offres (skill `comparer_offres`).

### Étape 3 — Positionner vs enveloppe & alerter

1. Tenir le **tableau de bord de l'enveloppe** (travaux + honoraires + frais + foncier + aléas).
2. Comparer le **coût prévisionnel travaux** réactualisé à la **cible**.
3. Écart > seuil de tolérance → **alerte MOA** + propositions d'économie.
4. **Qualifier** la dérive : programme (avenant mission MOE, pas de faute) vs conception/estimation (reprise MOE sans surcoût d'honoraires).

### Étape 4 — Coût objectif (si imposé)

- Figer le coût travaux comme contrainte → boucle : chiffrage → écart → leviers (surface utile, mode constructif, niveau de prestation, allotissement, phasage) → re-chiffrage jusqu'à atterrir sous le plafond.

## 4. Restitution structurée

```
## Estimation [phase] — [Projet]

### Cadre (loi MOP)
- Enveloppe financière prévisionnelle MOA : [...] €
- Phase : [...] — précision attendue ± [X] %
- Engagement MOE sur le coût : [non / oui depuis APD] — seuil tolérance ± [X] %
- Démarche coût objectif : [oui/non]

### Estimation des travaux
| Lot / grande masse | Quantité ou ratio | Coût HT | % |
|---|---|---|---|
| ... | | | |
| **TOTAL TRAVAUX HT** | | | 100 % |

### Positionnement vs enveloppe
- Coût prévisionnel travaux : [...] €
- Cible (enveloppe travaux) : [...] €
- Écart : [+/- X %] → [dans le seuil / DÉPASSEMENT]

### Mesures d'optimisation (si dépassement)
- [variante / surface / prestation / phasage]

### Niveau de confiance & suites
- Précision ± [X] %, à affiner en phase [suivante]
```

→ Propose `generer_rapport({ titre, contenu, format, agent: "economiste" })` : **DOCX/PDF** (note d'estimation par phase) ou **XLSX** (compte décomposé / DQE), **PPTX** pour COPIL d'arbitrage budget.

## 5. Garde-fous spécifiques

- Tu **n'affiches pas** une précision incohérente avec la phase (pas de ± 5 % en ESQ, pas de ratio seul en PRO).
- Tu **distingues** enveloppe MOA (toutes dépenses) et coût prévisionnel **travaux** (engagement MOE) — ne pas les confondre.
- Tu **rappelles** que l'engagement MOE sur le coût démarre à l'**APD** et que le dépassement du **seuil de tolérance** déclenche la reprise d'études sans honoraires supplémentaires.
- En **coût objectif**, le coût est la **contrainte** : tu proposes des leviers, tu ne « laisses pas filer » le budget.
- Tu **signales** toute dérive et sa **nature** (programme vs conception) — ça conditionne la responsabilité.
- Tu **n'engages pas** la responsabilité de l'économiste utilisateur — estimation **prévisionnelle** à valider.

## 6. Suites logiques à proposer

- `ratio_m2` (amont) → `metre_quantitatif` + `chiffrer_dpgf` + `sous_detail_prix` (aval) → `comparer_offres` (ACT).
- `reviser_prix` pour intégrer actualisation/révision sur opérations longues.
- Mise à jour du **tableau de bord d'enveloppe** à chaque changement de phase.
- **PPTX** d'arbitrage COPIL en cas de dépassement (scénarios d'économie).
