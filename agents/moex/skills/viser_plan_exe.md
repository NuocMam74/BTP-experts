# Skill — Viser un plan d'exécution (EXE) / plan d'atelier (PAC)

L'utilisateur (MOE titulaire de la mission **VISA**) te transmet un **plan d'exécution (EXE)** ou un **plan d'atelier et de chantier (PAC)** établi par une entreprise ; tu dois en **examiner la conformité** au PRO, aux DTU et aux interfaces inter-lots, puis préparer un **visa** (sans observation / avec observations / refusé), gérer les **indices** et émettre le **Bon Pour Exécution (BPA)**.

> ⚠️ Le **VISA ne décharge pas l'entreprise** de sa responsabilité sur ses études d'exécution (cf. corpus `missions_moe_loi_mop_visa_exe.md`). Tu prépares un avis de visa que le **MOE signe**.

## 1. Documents attendus

- **Plan EXE / PAC** à viser (avec **cartouche** : n° de plan, **indice**, date, échelle, lot)
- **PRO** (et APD / permis de construire) — référence de conformité
- **CCTP** du lot et **DTU** applicables (cf. corpus `dtu_principaux_par_lot.md`)
- **Plans des autres lots** concernés par les **interfaces** (GO, CVC, élec, structure…)
- **Note de calcul** / hypothèses (si plan structure : ferraillage, charges)
- **Bordereau de diffusion / registre des indices** du chantier (historique des versions)
- **Plans BPA antérieurs** du même ouvrage (pour comparer les indices)

Si pièces partielles : demande
1. Le marché prévoit-il **VISA** (études par l'entreprise) ou **EXE** (études par le MOE) ?
2. Lot concerné et **DTU** applicables ?
3. **Indice** du plan et historique (1re émission / reprise après observations) ?
4. Quels **lots d'interface** sont impactés (réservations, charges, attentes) ?
5. Le PRO de référence est-il fourni et à jour (post-avenant) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("missions maîtrise d'œuvre VISA études d'exécution R.2431")`
- `rag_search("BPA bon pour exécution circuit plans indices")`
- `rag_search("DTU [lot concerné] prescriptions mise en œuvre")` — selon l'ouvrage
- `rag_search("CCAG-Travaux 2021 plans d'exécution études responsabilité titulaire")`
- `rag_search("plans d'atelier et de chantier PAC interfaces réservations")`

## 3. Procédure de visa

### Étape 1 — Contrôle formel du plan
- Cartouche complet : **n° de plan, indice, date, échelle, lot, émetteur** ?
- Le plan se rattache-t-il à un **ouvrage du PRO** identifiable ?
- Indice cohérent avec l'**historique** (registre des indices) ?

### Étape 2 — Conformité au PRO (et permis)
- Les **dimensions, niveaux, implantations, matériaux** sont-ils conformes au **PRO / APD** ?
- Tout **écart** avec le PRO doit être **justifié** (OS, avenant, validation MOA) — sinon **observation** ou **refus**.

### Étape 3 — Conformité aux DTU / règles de l'art
- L'ouvrage respecte-t-il les **prescriptions du DTU** du lot (épaisseurs, pentes, recouvrements, enrobages, fixations…) ?
- Produits sous **Avis Technique / DTA** : conditions d'emploi respectées ?
- Cf. skill `controle_conformite_dtu` pour motiver les écarts par article de DTU.

### Étape 4 — Cohérence des interfaces inter-lots
- **Réservations / percements** cohérents avec le GO et les fluides (CVC, élec, plomberie) ?
- **Charges suspendues / attentes / scellements** prévus et compatibles avec la structure ?
- **Niveaux finis**, calepinages, jonctions entre lots cohérents ?
- Les **plans d'interface** modifiés doivent être **re-diffusés** aux lots impactés.

### Étape 5 — Émettre le visa
- **Sans observation** → plan **BPA** (exécutable)
- **Avec observations** → corrections à intégrer, **nouvel indice**, re-passage en visa avant BPA
- **Refusé / À reprendre** → non conforme (PRO / DTU / interface) ; l'entreprise reprend et réémet

### Étape 6 — Gérer les indices et la diffusion
- Mettre à jour le **registre des indices** : un **seul indice BPA en vigueur** par plan ; retirer les indices périmés.
- **Diffuser** le plan BPA aux lots concernés (interfaces) avec bordereau de diffusion daté.

## 4. Restitution structurée

```
## Visa de plan d'exécution — [N° plan / indice]

**Marché / Lot** : [réf — lot n° et nom]
**Plan** : [n° + désignation]   **Indice examiné** : [A/B/…]   **Date** : [JJ/MM/AAAA]
**Émetteur (entreprise)** : [...]
**Référence de conformité** : PRO [réf] / CCTP lot / DTU [n°]

### Conformité au PRO
- [✅ conforme / ⚠️ écart : ... / ❌ non conforme : ...]

### Conformité DTU / règles de l'art
| Point | DTU / article | Constat | Statut |
|---|---|---|---|
| [épaisseur / pente / enrobage…] | DTU [n°] § [x] | [valeur plan vs exigée] | ✅ / ⚠️ / ❌ |

### Interfaces inter-lots
| Interface | Lot concerné | Constat | Statut |
|---|---|---|---|
| [réservation / charge / attente] | [GO / CVC / élec] | [...] | ✅ / ⚠️ / ❌ |

### Décision de visa
☐ **VISA SANS OBSERVATION** → plan **BPA** (Bon Pour Exécution)
☐ **VISA AVEC OBSERVATIONS** (corrections ci-dessous, nouvel indice requis avant BPA)
☐ **REFUSÉ / À REPRENDRE**

### Observations à lever (le cas échéant)
1. [observation motivée par article PRO / DTU / interface]
2. [...]

### Gestion des indices
- Indice examiné : [X] — Indice BPA en vigueur après visa : [X / X+1]
- Indices périmés à retirer du chantier : [...]
- Diffusion BPA aux lots : [liste]
```

5. **Cite systématiquement** : élément de mission **VISA** (R.2431-x CCP / loi MOP), **PRO** de référence, **DTU** applicables, et rappelle que le **VISA n'exonère pas** l'entreprise (CCAG-Travaux — responsabilité du titulaire sur ses études).

## 5. Livrable (`generer_rapport`)

Propose une **fiche de visa DOCX/PDF** (signable par le MOE) reprenant la décision, les observations motivées et la gestion des indices ; pour un lot avec nombreux plans, un **tableau de suivi des visas XLSX** (n° plan, indice, statut BPA, date, lot diffusé).

> `generer_rapport({ titre: "Visa plan [N°] indice [X] — Lot [...]", contenu, format: "pdf", agent: "moex", metadata: { marche, lot, plan, indice } })`

Mention finale obligatoire : *« Document préparé par l'agent IA MOEX — visa à signer par le maître d'œuvre (mission VISA). Le visa ne décharge pas l'entreprise de sa responsabilité sur ses études d'exécution. »*

## 6. Garde-fous spécifiques

- ⚠️ **Ne déclare jamais un plan BPA** s'il subsiste une **non-conformité** au PRO, au DTU ou une **interface non résolue** — émets un visa **avec observations** ou un **refus**.
- **Un plan non visé BPA ne doit pas être exécuté** : signale tout plan « Bon Pour Information » (BPI) ou « À valider » trouvé en cours d'exécution.
- Le **VISA n'exonère pas** l'entreprise : ne reformule jamais le visa comme une garantie de l'exactitude des études de l'entreprise.
- Vérifie qu'**un seul indice BPA** est en vigueur par plan ; un ouvrage exécuté sur **indice périmé** est une cause fréquente de réserve.
- Pour les **plans de structure**, ne valide pas seul des **notes de calcul** : c'est le **BET structure / contrôleur technique** qui les vérifie ; ton visa porte sur la **cohérence** et les **interfaces**.
- Distingue **VISA** (entreprise fait l'EXE) et **EXE** (MOE fait l'étude) : adapte la procédure au marché.
- En cas de **doute d'interface** entre lots : demande une **réunion de synthèse EXE** plutôt que de viser unilatéralement.

## 7. Suites logiques à proposer

- Skill `controle_conformite_dtu` pour motiver précisément les écarts par article de DTU
- Diffusion du **plan BPA** aux lots d'interface + mise à jour du **registre des indices**
- En cas d'écart PRO justifié par une modification : skill `rediger_os` / `preparer_avenant`
- Alimentation du **DOE** par les plans **conformes à l'exécution (PEX)** à la réception (skill `controler_doe_diuo`)
- **Réunion de synthèse EXE** périodique pour les chantiers à fortes interfaces (TCE)
