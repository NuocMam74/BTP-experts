# Skill — Suivre les finances d'un chantier

L'utilisateur veut **contrôler ou établir** le suivi financier d'un chantier en cours : situations de travaux / acomptes mensuels, application des variations de prix, retenue de garantie, avance et son remboursement, prix nouveaux, jusqu'au **décompte général et définitif (DGD)**, avec **courbe de décaissement (courbe en S)**.

## 1. Documents attendus

- **Marché** : acte d'engagement (montant initial HT/TTC), **CCAP** (régime de prix, révision/formule + M0, avance, retenue de garantie, pénalités, délai de paiement).
- **DPGF / DQE** contractuel (base de l'avancement).
- **Situation(s) précédente(s)** / projets de décompte mensuels (PDM) déjà émis.
- **Planning** travaux (Gantt) pour la courbe en S.
- **OS / avenants** notifiés (travaux supplémentaires, prix nouveaux).
- **Valeurs d'indices INSEE** (BT/TP) aux mois utiles, si révision.

Si pièces partielles, demande :
1. Marché **public** (CCAG-Travaux) ou **privé** (NF P 03-001) ?
2. **Régime de prix** : ferme / ferme actualisable / révisable (+ formule et M0) ?
3. Y a-t-il une **avance** (taux, échéancier de remboursement) ?
4. **Retenue de garantie** 5 % prélevée ou **caution/GAPD** substituée ?
5. Numéro et **mois de la situation** à traiter ; cumul de la situation précédente ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("situations acomptes décompte général définitif DGD CCAG-Travaux 2021")`
- `rag_search("retenue de garantie 5 % loi 71-584 caution GAPD")`
- `rag_search("avance forfaitaire remboursement 65 80 marché public")`
- `rag_search("ordre actualisation révision décompte indices BT TP")`
- `rag_search("courbe de décaissement courbe en S chantier")`
- Pour la révision : `rag_search("formule révision prix indices BT TP CCAG art 10")`

## 3. Procédure

### A) Contrôler / établir une situation mensuelle (acompte)

1. **Reprendre l'avancement** cumulé déclaré par l'entreprise (PDM) et le **confronter au réel** exécuté (relevé OPC / contradictoire). Signaler tout sur-avancement.
2. Vérifier que les **prix appliqués** sont ceux du marché (et que les TS/prix nouveaux sont bien notifiés).
3. Calculer les **variations de prix** dans le bon **ordre : actualisation (une fois) puis révision (à chaque situation)** — citer les indices INSEE utilisés (mois + valeur).
4. Déduire le **remboursement d'avance** (échéancier 65 → 80 %) le cas échéant.
5. Déduire la **retenue de garantie 5 %** (sauf substitution caution/GAPD).
6. **Acompte du mois** = cumul du mois N − cumul du mois N-1.
7. Contrôler le **délai de paiement** (30 j public courant) et signaler le risque d'intérêts moratoires.

### B) Établir le DGD (solde du marché)

1. Vérifier que la **réception** est prononcée (avec/sans réserves).
2. Reprendre le **projet de décompte final** de l'entreprise : total des sommes dues (travaux + variations + prix nouveaux + primes − pénalités).
3. **Récoler tous les acomptes** versés → solde.
4. Intégrer **toute** la révision/actualisation jusqu'au solde.
5. Provisionner les **réserves** non levées ; rappeler la **libération de la retenue de garantie** à l'issue de la GPA (1 an).
6. Alerter : le DGD signé est **définitif** — vérifier avant acceptation.

### C) Courbe de décaissement (courbe en S)

1. Décomposer le marché par **lot/phase** avec montant + planning.
2. Répartir chaque montant sur sa durée → cumul mensuel prévisionnel (profil en S).
3. Superposer l'**avancement réel** (situations payées) → écart (avance/retard).
4. Intégrer retenue de garantie (−5 % du flux) et creux de **remboursement d'avance**.

## 4. Restitution structurée

```
## Suivi financier — [Projet / Lot] — situation n° [N] / [DGD]

### Cadre du marché
- Montant initial HT / TTC : [...]
- Régime de prix : [ferme actualisable / révisable] — formule + M0 : [...]
- Avance : [taux] — remboursement [65 → 80 %]
- Retenue de garantie : 5 % [ou caution/GAPD]

### Situation / décompte
| Poste | Cumul N | Cumul N-1 | Acompte du mois |
|---|---|---|---|
| Travaux exécutés (prix marché) | | | |
| Approvisionnements | | | |
| Variation de prix (révision) | | | |
| Sous-total | | | |
| − Remboursement avance | | | |
| − Retenue de garantie 5 % | | | |
| **Net à mandater HT** | | | |
| TVA [taux] | | | |
| **Net TTC** | | | |

### Variation de prix appliquée
- Ordre : actualisation [oui/non] puis révision
- Indices INSEE cités (mois + valeur) : [...]
- Coefficient : [...]

### Contrôles & drapeaux
- Avancement déclaré vs réel (OPC) : ✅ / ⚠️
- Cumul retenue ≤ 5 % marché : ✅
- Délai de paiement : [30 j] — risque intérêts moratoires : [...]

### Courbe de décaissement
- Position vs courbe en S : avance / conforme / retard
- Atterrissage DGD prévisionnel : [...]
```

→ Propose `generer_rapport({ titre, contenu, format: "xlsx", agent: "economiste" })` pour le tableau de situation (XLSX avec formules), ou **pptx** pour la courbe en S en COPIL.

## 5. Garde-fous spécifiques

- Tu **ne valides pas** un avancement non confronté au réel exécuté (relevé OPC/contradictoire) — sur-avancement = risque pour le MOA.
- Tu **respectes l'ordre** actualisation (une fois) → révision (périodique) ; jamais l'inverse, jamais les deux confondues.
- La **révision** s'applique **avant** retenue de garantie et **hors** avance.
- Tu **n'engages pas** le visa du MOE — tu prépares le contrôle ; le DGD reste à viser par le maître d'œuvre.
- Pour la **retenue de garantie**, rappelle la **substitution** possible par caution/GAPD (non refusable si conforme) et la **libération** à la fin de la GPA.
- Pour un **prix nouveau**, exige un **sous-détail** justifié au M0 du marché (cf. skill `sous_detail_prix`).
- Avant acceptation d'un **DGD** : rappelle son caractère **définitif** (plus de réclamation sauf réserve expresse dans le délai).

## 6. Suites logiques à proposer

- Skill `reviser_prix` pour le calcul détaillé de la révision/actualisation.
- Skill `sous_detail_prix` pour justifier un prix nouveau.
- Skill `analyser_avenant_economique` pour les TS / avenants impactant le décompte.
- Mise en forme **XLSX** du tableau de situation (formules ouvertes) ou **PPTX** courbe en S pour COPIL.
- Mise à jour de la **courbe de décaissement** à chaque situation pour le plan de trésorerie MOA.
