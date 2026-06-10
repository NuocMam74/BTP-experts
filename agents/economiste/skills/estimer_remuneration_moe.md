# Skill — Estimer la rémunération de maîtrise d'œuvre / de l'économiste

L'utilisateur veut **estimer des honoraires de maîtrise d'œuvre** (forfait MOE, taux d'honoraires en % des travaux, répartition par élément de mission) et/ou la **quote-part de l'économiste** dans le groupement. S'appuie sur le corpus `remuneration_moe_honoraires.md` et le cadre **loi MOP / CCP** (`estimation_phases_moe_cout_objectif.md`).

> Tu raisonnes en **forfait** (loi MOP) : on chiffre la rémunération à partir du **coût prévisionnel des travaux**, de la **complexité** et de l'**étendue de mission**, puis on l'exprime en **% travaux** pour comparaison. Aucun barème n'est réglementairement opposable — toute fourchette est un **ordre de grandeur à actualiser**.

## 1. Documents / paramètres attendus

- **Coût prévisionnel des travaux HT** (assiette) — ou enveloppe travaux estimée.
- **Type d'ouvrage et complexité** (simple / courante / complexe / réhabilitation-patrimoine).
- **Étendue de la mission** : mission de base loi MOP seule ? + OPC ? + EXE ? + missions complémentaires (BIM, environnement, synthèse, SSI) ?
- **Marché public** (forfait loi MOP, mission de base indivisible) ou **privé** (libre).
- **Périmètre demandé** : honoraires **MOE globaux** et/ou **part économiste** seule.
- Si réhabilitation : **DIA** au lieu d'ESQ ; existant et contraintes (occupation, MH/ABF).

Si paramètres partiels, demande : coût travaux HT, complexité, étendue de mission (base / +OPC / +EXE / complémentaires), public ou privé, périmètre (MOE global vs économiste).

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("rémunération maîtrise d'œuvre honoraires éléments de mission part économiste")` → `remuneration_moe_honoraires.md`
- `rag_search("loi MOP coût prévisionnel travaux seuil de tolérance engagement MOE")` → `estimation_phases_moe_cout_objectif.md`
- `rag_search("éléments de mission ESQ APS APD PRO ACT VISA DET AOR OPC répartition")`
- `rag_search("ratio m² par destination")` si le coût travaux n'est pas fourni (à estimer d'abord)

## 3. Procédure

### Étape 1 — Établir l'assiette (coût prévisionnel des travaux)

- Si fourni : retenir le **coût prévisionnel des travaux HT** (hors honoraires, hors foncier, hors frais annexes).
- Sinon : l'**estimer d'abord** (skill `ratio_m2` ou `estimer_par_phase`) — un taux d'honoraires sans assiette n'a pas de sens.

### Étape 2 — Caractériser la complexité

| Complexité | Exemples | Position dans la fourchette |
|---|---|---|
| Simple | hangar, logement standard répétitif | bas |
| Courante | logement collectif, bureaux, école | moyen |
| Complexe | hôpital, labo, ERP technique | haut |
| Très complexe | réhab lourde, MH/ABF, ouvrage d'exception | très haut / au-delà |

### Étape 3 — Retenir un taux d'honoraires (mission de base)

Fourchettes indicatives (% coût travaux HT, **ordre de grandeur à actualiser**, **pas un barème opposable**) :

| Coût travaux HT | Simple | Courant | Complexe / réhab |
|---|---|---|---|
| < 0,5 M€ | ~10-14 % | ~12-16 % | ~15-20 %+ |
| 0,5 à 2 M€ | ~8-11 % | ~10-13 % | ~13-18 % |
| 2 à 10 M€ | ~6-9 % | ~8-11 % | ~11-15 % |
| > 10 M€ | ~5-7 % | ~6-9 % | ~9-13 % |

→ Le taux **décroît** quand le montant **croît** ; il **croît** avec la complexité.

### Étape 4 — Ajouter les missions complémentaires

Calculées **en sus** de la mission de base :

- **OPC** (ordonnancement-pilotage-coordination) : mission complémentaire à valoriser à part.
- **EXE** (si confiée à la MOE) : pèse lourd (jusqu'à 25-30 % de la rémunération si EXE complète, vs simple VISA).
- **Missions complémentaires** : BIM management, environnement/ACV, synthèse, SSI, signalétique — chiffrées au temps passé ou au forfait dédié.

### Étape 5 — Répartir par élément de mission

Appliquer la répartition indicative (`remuneration_moe_honoraires.md`) :

| Élément | Part indicative |
|---|---|
| ESQ/DIA | 4-8 % |
| APS | 8-12 % |
| APD | 13-18 % |
| PRO | 22-30 % |
| ACT | 5-8 % |
| VISA (ou EXE si MOE) | 5-10 % (EXE jusqu'à 25-30 %) |
| DET | 18-25 % |
| AOR | 3-6 % |

### Étape 6 — Isoler la part de l'économiste

- Quote-part « économie de la construction » dans la rémunération MOE : **~5 à 12 %** (ordre de grandeur, selon poids du chiffrage/quantitatif, présence d'OPC ou d'une démarche coût objectif — à actualiser).
- Charge concentrée sur **APS→PRO** (estimations, métré, DQE), **ACT** (analyse d'offres), **DET** (suivi financier).
- Alternatives de facturation économiste : **quote-part forfaitaire** du forfait MOE, **temps passé** (taux journalier × jours) pour missions isolées, **forfait par livrable**.

## 4. Restitution structurée

```
## Estimation d'honoraires MOE — [Projet]

### Données
- Coût prévisionnel des travaux HT : [...] €
- Complexité : [simple / courante / complexe / réhab]
- Mission : [base loi MOP / + OPC / + EXE / + complémentaires]
- Marché : [public loi MOP / privé]

### Calcul
- Taux mission de base retenu : [X] % (fourchette [..]–[..] %)
- Honoraires mission de base HT : [...] €
- + OPC : [...] €   + EXE : [...] €   + complémentaires : [...] €
- **TOTAL honoraires MOE HT** : [...] € (soit ~[Y] % du coût travaux toutes missions)

### Répartition par élément de mission
| Élément | % | Montant HT |
|---|---|---|
| ESQ/DIA … AOR | | |
| **TOTAL** | 100 % | [...] |

### Part économiste
- Quote-part : [X] % de la rémunération MOE = [...] € HT
- (ou : [N] jours × [taux jour] € si mission au temps passé)

### Précision & cadre
- Ordre de grandeur indicatif, à actualiser — pas de barème opposable.
- Engagement MOE sur le coût à partir de l'APD (seuil de tolérance ± [X] %).
```

→ Propose `generer_rapport({ titre, contenu, format, agent: "economiste" })` : **XLSX** (calcul + répartition par élément, formules ouvertes), **DOCX/PDF** (note d'honoraires / proposition), **PPTX** si présentation MOA.

## 5. Garde-fous spécifiques

- Tu rappelles qu'**aucun barème d'honoraires n'est opposable** : les fourchettes sont des **ordres de grandeur à actualiser**, la rémunération est **négociée**.
- Tu chiffres en **forfait** (loi MOP), le **%** n'étant qu'un **outil de calcul/comparaison** ; tu **déconseilles** le % « au fil de l'eau » (indexé sur le coût réel) qui déresponsabilise la MOE.
- Tu **n'estimes pas** d'honoraires sans **assiette de travaux** fiable (estime d'abord le coût travaux).
- Tu **distingues** mission de base (indivisible en public) et missions complémentaires (OPC, EXE, BIM…) — facturées **en sus**.
- Tu rappelles l'**engagement MOE sur le coût** à l'APD et le **seuil de tolérance** (un dépassement imputable à la conception = reprise sans honoraires supplémentaires ; un changement de programme MOA = avenant à la mission).
- Tu **ne brades pas** la phase d'économie/chiffrage : un forfait sous-dimensionné fragilise la maîtrise des coûts.
- Tu n'engages pas la responsabilité de l'économiste utilisateur — estimation **indicative** à négocier.

## 6. Suites logiques à proposer

- `estimer_par_phase` / `ratio_m2` : caler/estimer l'assiette de travaux en amont.
- Bâtir le **tableau de bord d'enveloppe** (travaux + honoraires + frais + foncier + aléas) — cf. `estimation_phases_moe_cout_objectif.md`.
- **DOCX** de proposition d'honoraires ou **XLSX** de répartition pour le groupement MOE.
- En cas de **changement de programme** : chiffrage de l'**avenant à la mission MOE** (skill `analyser_avenant_economique` pour la logique d'avenant).
