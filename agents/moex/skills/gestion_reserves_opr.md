# Skill — Gérer les réserves OPR

L'utilisateur prépare ou suit la **levée des réserves** émises lors des **Opérations Préalables à la Réception** (OPR).

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **PV d'OPR** signé contradictoirement (MOE / MOA / titulaire)
- **Liste des réserves** détaillée (annexe au PV)
- **Plans de repérage** des réserves
- **Photos** des points de réserve
- **PV de réception** (avec ou sans réserves) si déjà émis
- **PV de levée de réserves** intermédiaires

Si pas de PV : pose ces questions :
1. Marché public ou privé ?
2. Date des OPR / date de réception prononcée ?
3. Nombre approximatif de réserves ?
4. Type de réserves (malfaçons, non-conformités, omissions, dispositifs non livrés) ?
5. Délai de levée fixé au PV (par défaut 30 jours CCAG art. 41) ?
6. Une caution ou retenue de garantie 5 % est-elle en place ?

## 2. Extraction des informations clés

Pour chaque réserve, EXTRAIS :

| Champ | Source | Action si absente |
|---|---|---|
| N° de réserve | PV OPR | Numéroter si absent |
| Lot concerné | PV OPR | Identifier depuis description |
| Localisation | PV + plan | Demander précision |
| Description précise | PV OPR | Indispensable |
| Nature (malfaçon / non-conformité / oubli) | PV OPR | À qualifier |
| Photo de référence | Annexe | Fortement recommandé |
| Délai de levée | PV OPR | 30 jours par défaut |
| Action attendue de l'entreprise | PV OPR / déduit | À préciser |
| Date de levée effective | PV de levée | Vide jusqu'à exécution |

## 3. Vérifications normatives (`rag_search` obligatoire)

- `rag_search("CCAG-Travaux article 41 réception réserves")` — délais
- `rag_search("CCAG-Travaux article 44 garantie de parfait achèvement")` — GPA 1 an
- `rag_search("code civil article 1792-6 garantie parfait achèvement")` — fondement
- `rag_search("retenue de garantie 5 % caution")` — modalités de libération

## 4. Procédure d'analyse / gestion

### A) Phase OPR — préparation et conduite

1. Vérifier la **complétude documentaire** : DOE, plans EXE conformes, fiches techniques, PV essais COPREC, attestations RT/RE.
2. Conduire la **visite OPR** lot par lot.
3. **Consigner** chaque réserve avec :
   - Numéro unique
   - Localisation précise (étage / pièce / position)
   - Description objective (ne pas qualifier la cause)
   - Photo
   - Délai de levée demandé
   - Signature contradictoire
4. **Faire signer** le PV par les 3 parties (MOE, MOA, titulaire).

### B) Phase post-OPR — suivi des réserves

1. **Notifier** la liste de réserves à chaque entreprise concernée (LRAR si > 30 réserves).
2. **Délai de levée** standard : 30 jours à compter de la notification (CCAG art. 41.5).
3. **Prolongation possible** une seule fois, motivée (saison, livraison équipement, etc.).
4. **Suivi** :
   - Visites de contrôle à 15 jours
   - PV de levée intermédiaires (lot par lot)
   - Relances LRAR si retard

### C) Réception avec ou sans réserves

1. **Prononcer la réception** par OS du MOA, sur proposition du MOE.
2. **Si réserves** : la réception est prononcée **avec réserves** — date d'effet pour les garanties (GPA, biennale, décennale).
3. **Si refus** : motivation par non-conformités substantielles → renvoi en OPR.

### D) Phase GPA — garantie de parfait achèvement (1 an)

1. Pendant 1 an après réception, le titulaire est tenu de **lever toutes les réserves** consignées au PV ET de **remédier à tous les désordres signalés** dans cette période, même non présents au PV.
2. Tenir un **registre** des désordres signalés par le MOA.
3. À l'expiration du délai GPA (1 an) : **PV de levée définitive des réserves** + **libération de la retenue de garantie 5 %** (CCAG art. 44.2).

## 5. Restitution structurée

```
## Suivi réserves OPR — [Marché / Bâtiment]

### Cadre contractuel
- **Marché** : [public / privé]
- **PV OPR** : du [JJ/MM/AAAA]
- **Réception** : [oui le JJ/MM/AAAA avec/sans réserves | non prononcée]
- **Délai de levée fixé** : [N jours à compter de…]
- **Référence** : CCAG-Travaux art. 41, art. 44 / NF P 03-001

### Tableau des réserves

| N° | Lot | Localisation | Description | Nature | Délai levée | Statut | Date levée | Photo |
|---|---|---|---|---|---|---|---|---|
| R001 | GO | RDC, hall | Fissure plafond 80 cm | Malfaçon | 30 j | Ouverte | — | photo_R001.jpg |
| R002 | Menuis ext | R+1, ch. 12 | Joint silicone manquant | Oubli | 15 j | Levée | 12/04/2026 | — |
| ... | | | | | | | | |

### Synthèse par lot

| Lot | Total réserves | Levées | Ouvertes | En retard | % achèvement |
|---|---|---|---|---|---|
| Gros œuvre | 5 | 3 | 2 | 0 | 60 % |
| ... | | | | | |
| **Total** | | | | | |

### Réserves en retard de levée
1. **R[XXX]** — [description] — entreprise [Y] — retard [N jours] — action proposée [LRAR mise en demeure / exécution office]

### Actions recommandées
1. **Notification formelle** des réserves restantes par LRAR
2. **Relance** des entreprises retardataires
3. **Exécution d'office** prévue à l'article [CCAG art. 41.5 ou CCAP] pour les réserves > délai prolongé
4. **PV de levée définitive** une fois toutes réserves levées
5. **Libération retenue de garantie** à expiration GPA

### Documentation à produire
- [ ] PV de levée de chaque réserve (signé contradictoirement)
- [ ] PV final de levée définitive
- [ ] DOE complété (si éléments modifiés)
- [ ] Attestation libération retenue de garantie (1 an post-réception)
```

## 6. Garde-fous spécifiques

- Tu **ne prononces pas** la réception — c'est le **MOA** sur proposition du **MOE titulaire** qui statue par acte formel.
- Pour les **réserves substantielles** (sécurité, étanchéité, structure), tu **recommandes le refus** de réception plutôt qu'une réception avec réserves — moins de risque pour le MOA.
- Pour les **réserves non levées** dans le délai imparti, tu rappelles que le **MOA peut faire exécuter d'office** les travaux aux frais et risques du titulaire (CCAG art. 41.5).
- Tu **rappelles** que la date de **réception** est la date d'effet des **garanties légales** :
  - **GPA** : 1 an (art. 1792-6 code civil)
  - **Biennale** : 2 ans (art. 1792-3 code civil) — éléments d'équipement dissociables
  - **Décennale** : 10 ans (art. 1792 code civil) — gros œuvre et impropriété à destination
- Pour les **dommages-ouvrage** (DO) : tu rappelles que la DO **anticipe** la décennale pendant 10 ans après réception, sans recherche de responsabilité.

## 7. Suites logiques à proposer

- **LRAR** aux entreprises pour notification formelle des réserves
- **Visite de contrôle** à 15 jours pour vérifier l'avancement de la levée
- **PV de levée** par lot puis définitif
- **Levée de la retenue de garantie 5 %** à 1 an (à anticiper administrativement)
- **Bilan de l'opération** : retour d'expérience MOA / MOE pour les opérations futures
