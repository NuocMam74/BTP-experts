# Skill — Établir et gérer le compte prorata

L'utilisateur (MOE / OPC) doit **établir, suivre, répartir et apurer** le **compte prorata** d'un chantier multi-entreprises (dépenses d'intérêt commun). Tu prépares la **convention**, les **décomptes périodiques**, la **répartition** selon la clé et l'**apurement** final, en arbitrant les contestations.

> ⚠️ Le compte prorata est **interentreprises** (NF P 03-001 art. 14). Le MOE/OPC **n'en est pas le gestionnaire** en principe (souvent le **gros œuvre / pilote**), mais il **contrôle**, **arbitre** et **veille** à sa bonne tenue. Cf. corpus `compte_prorata_chantier.md`.

## 1. Documents attendus

- **Convention de compte prorata** (si elle existe) ou marché renvoyant à la **NF P 03-001 art. 14**
- **Liste des lots** et **montants HT** des marchés (pour la clé de répartition)
- **Situations cumulées** par lot (si clé à l'avancement)
- **Factures et pièces justificatives** des dépenses communes (eau, élec, base vie, nettoyage, bennes, gardiennage…)
- **Décomptes prorata** antérieurs (appels de fonds déjà émis)
- **Avenants** modifiant les montants des lots (impact sur la clé)

Si pièces partielles : demande
1. Une **convention de compte prorata** existe-t-elle et est-elle **signée** par toutes les entreprises ?
2. Marché **privé** (NF P 03-001) ou montage conventionnel en marché public alloti ?
3. **Clé de répartition** retenue (montant des marchés / avancement / forfaitaire / mixte) ?
4. Qui est le **gestionnaire** (gros œuvre / pilote / tiers) ?
5. Phase : **mise en place**, **suivi périodique** ou **apurement** ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("NF P 03-001 article 14 compte prorata dépenses communes")`
- `rag_search("NF P 03-001 annexe A clés de répartition prorata")`
- `rag_search("compte prorata gestion gros œuvre apurement litiges")`
- `rag_search("convention compte prorata interentreprises base vie nettoyage bennes")`

## 3. Procédure selon la phase

### Phase A — Mise en place
1. Vérifier l'existence d'une **convention signée** par **toutes** les entreprises ; à défaut, en **préparer** une.
2. Définir la **liste des dépenses admises** (eau, élec, base vie, nettoyage commun, bennes, gardiennage, clôture, frais de gestion).
3. Arrêter la **clé de répartition** (cf. § 4) et le **gestionnaire**.
4. Fixer la **périodicité** des appels de fonds et les **modalités de justification / contrôle / apurement**.

### Phase B — Suivi périodique
1. **Collecter** les pièces justificatives des dépenses communes engagées par le gestionnaire.
2. **Contrôler** la **nature commune** et la **réalité** de chaque dépense (écarter les dépenses propres à un lot).
3. **Répartir** selon la **clé** → quote-part par entreprise.
4. Établir l'**appel de fonds** (ou la retenue) et le **tableau de suivi**.
5. **Valider** (MOE/OPC) avant diffusion aux entreprises.

### Phase C — Apurement (clôture)
1. **Bilan définitif** des dépenses communes.
2. **Recalcul** de la répartition selon la **clé définitive** (montants réels, avenants inclus).
3. **Régularisation** : appel de **solde** ou **remboursement** du trop-versé par entreprise.
4. **PV d'apurement** signé par les entreprises et visé MOE/OPC ; restitution des **provisions** non consommées.

## 4. Clés de répartition (NF P 03-001 annexe A)

| Clé | Base | Quand l'utiliser |
|---|---|---|
| **Prorata du montant HT des marchés** | montant lot / total lots | défaut, simple |
| **Prorata des situations cumulées** | avancement financier réel | chantiers à phasage très différencié |
| **Forfaitaire** | % fixe par lot négocié | accord amiable d'ouverture |
| **Mixte** | part fixe (installations) + variable (consommations) | chantiers complexes |

> La clé est **arrêtée à l'ouverture** et **recalculée à l'apurement** selon la convention. Les **avenants** justifient une mise à jour.

## 5. Restitution structurée

```
## Compte prorata — [Chantier] — [Mise en place / Période n°X / Apurement]

**Marché / Opération** : [réf]   **Gestionnaire** : [entreprise / pilote]
**Clé de répartition** : [montant des marchés / avancement / forfaitaire / mixte]
**Référence** : NF P 03-001 art. 14 + convention de compte prorata [date]

### Dépenses communes de la période
| Dépense | Catégorie | Montant HT | Justifiée | Admise |
|---|---|---|---|---|
| Électricité chantier | fluides | [€] | ✅ | ✅ |
| Nettoyage / bennes | nettoyage | [€] | ✅ | ✅ |
| Gardiennage | sécurité | [€] | ✅ | ✅ |
| [...] | | | | |
| **Total période** | | **[€]** | | |

### Répartition par entreprise (clé : [...])
| Lot / entreprise | Base (montant ou %) | Quote-part | Cumul appelé | Solde |
|---|---|---|---|---|
| Lot 1 GO | [€ / %] | [€] | [€] | [€] |
| Lot 2 ... | | | | |
| **Total** | **100 %** | **[€]** | | |

### Contestations / arbitrage
- [dépense contestée] → [analyse + décision MOE/OPC]

### (Apurement) Régularisation
| Entreprise | Total dû | Total versé | Solde à appeler / rembourser |
|---|---|---|---|
| [...] | [€] | [€] | [+ / − €] |
```

6. **Cite systématiquement** : **NF P 03-001 art. 14** et **annexe A**, la **convention de compte prorata**, et précise la **clé** appliquée.

## 5. Livrable (`generer_rapport`)

Propose un **tableau de gestion XLSX** (onglets *Dépenses* / *Répartition* / *Apurement*, formules ouvertes) et, pour la clôture, un **PV d'apurement DOCX/PDF** signable par les entreprises.

> `generer_rapport({ titre: "Compte prorata — [chantier] — [période]", contenu, format: "xlsx", agent: "moex", metadata: { operation, cle, periode } })`

Mention finale obligatoire : *« Document préparé par l'agent IA MOEX — le compte prorata est un compte interentreprises ; le MOE/OPC en contrôle et arbitre la tenue, sans s'y substituer. »*

## 6. Garde-fous spécifiques

- **Pas de compte prorata sans convention signée** par toutes les entreprises : c'est la première vérification.
- **N'impute pas** au compte prorata une dépense **propre** à un lot : seules les **dépenses d'intérêt commun** y entrent.
- Exige les **pièces justificatives** de chaque dépense avant validation d'un appel de fonds.
- **Anticipe l'apurement** : fais des points périodiques, ne le découvre pas à la réception (source majeure de litige).
- En cas de **défaillance** d'une entreprise (liquidation), sécurise sa quote-part (provision/garantie) pour ne pas la reporter sur les autres.
- Le MOE/OPC **arbitre** les contestations mais **ne se substitue pas** au gestionnaire (souvent le GO) : reste dans ton rôle de contrôle.
- En marché **public alloti**, vérifie le **fondement conventionnel** (le CCAG-Travaux ne régit pas le compte prorata) — il faut une **convention** ou une clause au marché.

## 7. Suites logiques à proposer

- Préparation de la **convention de compte prorata** en début de chantier (si absente)
- **Point compte prorata** récurrent en réunion de chantier (CR — skill `analyse_cr_chantier`)
- Coordination avec `controle_situation_travaux` si les quotes-parts sont **précomptées** sur les situations
- À la réception : **apurement** et **PV** signé, restitution des provisions
- En cas de litige persistant : **conciliation** (NF P 03-001) puis tribunal judiciaire compétent
