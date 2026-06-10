# Skill — Mettre en place / contrôler un suivi analytique de chantier

L'utilisateur veut **mettre en place ou contrôler** une comptabilité **analytique par chantier (par affaire)** : calculer le **déboursé sec**, le **prix de revient**, la **marge**, suivre le **budget / réalisé** et **analyser les écarts**.

> ⚠️ La comptabilité analytique n'est **pas** une obligation légale (hors cas particuliers) mais c'est un **outil de pilotage** et une **pièce attendue en contrôle fiscal**. Coefficients et ordres de grandeur **à recalibrer pour chaque entreprise** ; **rappelle la date de la base** pour les éléments datés (coût horaire chargé, charges patronales).

## 1. Documents attendus

- **Devis / marché** par chantier (déboursé d'étude, prix de vente HT).
- **Pointage des heures** par chantier (badgeuse, relevés, paie analytique).
- **Factures fournisseurs** (matériaux) avec rattachement chantier (bons de livraison).
- **Factures de sous-traitance** par chantier.
- **Locations / coût d'usage du matériel** par chantier.
- **Frais de chantier** (installation, base vie, sécurité).
- **Reste à dépenser (RAD)** estimé par le conducteur de travaux.

Si absent, demande :
1. Le pointage des heures est-il **ventilé par chantier** ? Source ?
2. Les achats portent-ils un **code chantier** ?
3. Disposez-vous du **déboursé d'étude** (budget) par chantier ?
4. Comment est valorisé le **coût horaire de MO chargé** (avec CIBTP, déplacements) ?
5. Le matériel propre est-il refacturé aux chantiers via un **taux d'usage** ?

## 2. Référentiels (`rag_search`)

- `rag_search("comptabilité analytique chantier déboursé sec coefficient de vente")` — corpus *comptabilite_analytique_chantier*
- `rag_search("classe 9 comptabilité de gestion PCG sections analytiques")`
- `rag_search("coût horaire chargé CIBTP déplacement zone BTP")`
- `rag_search("avancement par les coûts perte à terminaison 1516")` — articulation reconnaissance du revenu
- `rag_search("contrôle fiscal BTP comptabilité analytique en-cours")`

## 3. Calculer le déboursé sec et le prix de revient

```
Déboursé sec = MO productive (heures × coût horaire chargé)
             + Matériaux incorporés
             + Matériel (location / coût d'usage interne)
             + Sous-traitance
             + Frais de chantier

Prix de revient = Déboursé sec × (1 + taux de frais généraux)
Prix de vente   = Déboursé sec × K     avec  K = (1 + tx FG) × (1 + tx marge)
```

| Poste | Compte général | Clé de ventilation |
|---|---|---|
| MO productive | 641/645 | heures pointées × coût horaire chargé |
| Matériaux | 601/602/604 | BL rattaché au chantier |
| Matériel | 613/615/681 | location affectée / taux d'usage |
| Sous-traitance | 611/604 | facture ST (vérifier autoliquidation) |
| Frais de chantier | 61x/62x | affectation directe |

> Le **coût horaire chargé** = salaire brut + charges patronales + **cotisation CIBTP** + indemnités de déplacement, rapporté aux **heures réellement productives**. À recalibrer par entreprise et **rappeler la date** des taux retenus.

## 4. Suivi budget / réalisé et écarts

| Élément | Calcul |
|---|---|
| Déboursé d'étude (budget) | du devis / marché |
| Déboursé constaté (réalisé) | coûts engagés à date (analytique) |
| Reste à dépenser (RAD) | estimation conducteur de travaux |
| Coût total prévisionnel | constaté + RAD |
| Marge prévisionnelle | Prix de vente marché − coût total prévisionnel |
| % avancement (coûts) | constaté / coût total prévisionnel |

### Décomposition des écarts

```
Écart total = Réalisé − Budget = Écart de quantité + Écart de prix/coût
```

| Écart | Lecture BTP |
|---|---|
| MO | heures réelles > prévues (sous-productivité, intempéries, reprises) ; coût horaire ≠ prévu |
| Matériaux | hausse de prix ; surconsommation / casse / vol |
| Sous-traitance | avenants, travaux supplémentaires |
| Frais de chantier | allongement du délai → base vie / grue plus longtemps |

> Si **coût total prévisionnel > prix de marché** → **perte à terminaison** : provision **immédiate** au compte **1516** (PCG art. 380-3). Renvoyer au skill `reconnaissance_revenu_avancement` / `valoriser_en_cours`.

## 5. Restitution structurée

```
## Suivi analytique — [Chantier]

### Paramètres
- Marché HT : [P]
- Coût horaire MO chargé retenu : [€/h] (date : ...)
- Taux frais généraux : [%] | Coefficient K : [...]

### Déboursé / prix de revient
| Poste | Budget | Réalisé à date | RAD | Total prév. |
|---|---|---|---|---|
| MO | ... | ... | ... | ... |
| Matériaux | ... | ... | ... | ... |
| Matériel | ... | ... | ... | ... |
| Sous-traitance | ... | ... | ... | ... |
| Frais de chantier | ... | ... | ... | ... |
| **Déboursé sec** | ... | ... | ... | ... |
| Frais généraux | ... | | | ... |
| **Prix de revient** | ... | | | ... |

### Marge
- Marge prévisionnelle = Prix marché − coût total prév. = [€] ([%])
- % avancement (coûts) = [%]

### Analyse des écarts
| Poste | Écart | Cause | Action |
|---|---|---|---|

### Alerte
- [✅ OK / ⚠️ perte à terminaison → provision 1516 à constituer]

### Garde-fous
- Coefficients à recalibrer ; coût horaire daté à revérifier.
- Exclure les approvisionnements stockés non posés du % d'avancement.
```

## 6. Livrable (`generer_rapport`)

`generer_rapport({ titre: "Suivi analytique de chantier — [chantier]", contenu, format: "xlsx" | "pdf" | "docx", agent: "expert-comptable-btp", metadata: { chantier, période, date } })`

- **XLSX** : onglets Hypothèses (coût horaire, K) / Déboursé / Budget-Réalisé / Écarts / Synthèse marge — **formules ouvertes**.
- **PDF/DOCX** : note de suivi + alerte perte à terminaison.

## 7. Garde-fous spécifiques

- Tu **n'engages pas** la responsabilité de l'expert-comptable — tu prépares le suivi, il valide.
- **Cohérence** à vérifier : heures analytiques ↔ paie/DSN ; achats analytiques ↔ comptabilité générale ; avancement ↔ produits comptabilisés.
- Ne pas inclure les **approvisionnements stockés non posés** dans les coûts d'avancement (biais).
- L'analytique est **attendue en contrôle fiscal** : la documenter (visa conducteur de travaux).
- **Rappeler la date** des taux de charges / coût horaire retenus.

## 8. Suites logiques à proposer

- Skill `reconnaissance_revenu_avancement` (CA et résultat à l'avancement).
- Skill `valoriser_en_cours` (si méthode à l'achèvement).
- Skill `auditer_provisions_btp` (perte à terminaison).
- Skill `controle_paie_btp` (composante MO du déboursé).
- Mise en place d'un **tableau de bord chantier** mensuel (budget / réalisé / RAD / % avancement / marge).
