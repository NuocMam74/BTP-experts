# Skill — Contrôler une situation de travaux

L'utilisateur (MOE en mission DET) te transmet une **situation mensuelle de travaux** (acompte) présentée par le titulaire ; tu dois la **vérifier** (complétude, calculs, avancement, révision, avances, retenues) et préparer la **proposition de paiement** que le MOE signe et transmet au MOA pour mandatement.

> ⚠️ Tu **ne payes pas** et **n'autorises pas** un paiement : tu prépares la **proposition du maître d'œuvre** (CCAG-Travaux 2021 art. 12 — vérification des décomptes / acomptes).

## 1. Documents attendus

- **Situation du mois** (projet de décompte mensuel du titulaire)
- **Acte d'engagement** + **CCAP** (régime des prix, avances, retenue de garantie, pénalités, délais de paiement)
- **DPGF / BPU / DQE** initial et avenants
- **Situations antérieures** validées (pour le cumul et l'avancement)
- **OS et avenants** notifiés (prestations supplémentaires, prix nouveaux, modifications de masse)
- **Déclarations de sous-traitance (DC4)** agréées → **paiements directs** des ST à isoler
- **Demande d'avance** et **garantie à première demande** éventuelle (pour les avances)
- **Acte de cession/nantissement de créance (Dailly)** et **exemplaire unique / certificat de cessibilité** le cas échéant
- **Constats d'avancement** ou compte-rendu de chantier (pour recouper l'avancement physique)

Si pièces partielles : demande
1. Marché **public** (CCAG-Travaux) ou **privé** (NF P 03-001) ?
2. Régime des prix au **CCAP** : ferme / ferme actualisable / **révisable** ? formule ?
3. Une **avance** a-t-elle été versée (taux, garantie, modalités de remboursement) ?
4. Existe-t-il des **sous-traitants en paiement direct** (DC4 agréés) ?
5. La créance a-t-elle fait l'objet d'une **cession/nantissement Dailly** (banque bénéficiaire) ?
6. Numéro et mois de la situation, montant du marché et cumul antérieur validé ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("CCAG-Travaux 2021 article 12 acomptes décomptes vérification")`
- `rag_search("CCAG-Travaux 2021 article 13 décompte général DGD")`
- `rag_search("CCAG-Travaux 2021 retenue de garantie 5 pour cent")`
- `rag_search("code commande publique R.2191 avance taux remboursement")`
- `rag_search("code commande publique R.2192 délai global de paiement intérêts moratoires")`
- `rag_search("CCAP clause prix révision actualisation formule")` — la révision est **dans le CCAP**
- `rag_search("cession nantissement créance Dailly exemplaire unique certificat cessibilité")`
- `rag_search("loi 75-1334 paiement direct sous-traitant 600 euros")`

## 3. Procédure de contrôle

### Étape 1 — Complétude formelle
- Numéro de situation, **mois de référence**, marché / lot / titulaire
- Décomposition **par poste DPGF** (ou par prix du BPU × quantités)
- Quantités **du mois** / **cumulées** / **du marché** par poste
- Application des **prix unitaires** du bordereau (et prix nouveaux notifiés par OS/avenant)
- **Révision / actualisation** des prix si le CCAP la prévoit
- **Avance** et son **remboursement** (le cas échéant)
- **Retenue de garantie** 5 %
- **Paiements directs ST** distingués de la part EP
- Acomptes antérieurs versés à date

### Étape 2 — Cohérence interne (calculs)
- Cumul des situations ≤ **montant du marché** (initial + avenants/OS notifiés) — toute quantité cumulée > quantité contractuelle d'un poste doit être **justifiée** par OS/avenant
- Application correcte du **taux de retenue de garantie** (5 % sur le HT du décompte, plafonné à 5 % du montant total du marché)
- **TVA** au taux pertinent (20 / 10 / 5,5 % selon nature de l'opération — autoliquidation pour la ST dans certains cas du bâtiment)
- Reprise exacte du **cumul antérieur validé** (pas de re-facturation de l'avancement déjà payé)

### Étape 3 — Avancement physique vs financier
- L'avancement **financier** ne doit pas dépasser l'avancement **physique** constaté en chantier
- Recoupe avec les comptes-rendus / constats ; signale toute **sur-facturation par anticipation**
- Si l'avancement n'est pas vérifiable sur pièces : **demande une visite contradictoire**

### Étape 4 — Révision / actualisation des prix (si applicable)
- **La formule de révision est dans le CCAP**, pas dans un « article 10 du CCAG ». Cite la clause CCAP exacte.
- Vérifie le **régime du prix** (ferme / ferme actualisable / révisable — cadre **R.2112-13 et s. CCP**)
- Utilise l'outil **`calculer_revision_prix`** pour vérifier le coefficient
- Vérifie le **mois d'index** retenu (souvent **M-3** par rapport au mois d'exécution, **mais c'est le CCAP qui le fixe**) et la **part fixe** conforme au CCAP
- Cf. skill `calculer_revision`

### Étape 5 — Avances (R.2191 CCP) et leur remboursement
- **Avance forfaitaire** : due de droit (sauf renonciation du titulaire) lorsque le **montant du marché ou de la tranche dépasse le seuil réglementaire** et que le **délai d'exécution dépasse 2 mois** — **taux minimal légal** de l'avance et **conditions de garantie** *(barèmes et seuils datés — à revérifier à la date de consultation : taux et seuils R.2191-x fixés par voie réglementaire)*.
- **Garantie de l'avance** : selon les cas, l'avance peut être subordonnée à la constitution d'une **garantie à première demande** (ou caution) — vérifie sa présence et sa validité au montant de l'avance.
- **Remboursement de l'avance** : par **précompte** sur les acomptes, selon la cadence du CCAP. À défaut de clause, le remboursement **commence** lorsque le montant des prestations exécutées **atteint 65 %** du montant du marché et s'**achève** lorsqu'il atteint **80 %** *(seuils réglementaires R.2191-x — à revérifier à la date de consultation)*.
- **Contrôle** : vérifie que la situation **rembourse** la quote-part d'avance attendue (ligne « remboursement d'avance » au décompte) et que le **cumul remboursé** est cohérent avec l'avancement.

### Étape 6 — Paiements directs des sous-traitants (loi 75-1334)
- Pour tout **ST agréé** dont la part dépasse le seuil de paiement direct (**600 € TTC**, loi 1975 art. 6), la part ST est **payée directement** par le MOA et **déduite** du paiement de l'EP.
- Vérifie que la situation **isole** clairement part EP / part(s) ST, et que chaque part ST correspond à une prestation **agréée** (DC4) et **acceptée** par l'EP (validation de la facture du ST).
- Cf. skill `controle_sous_traitance`.

### Étape 7 — Cession / nantissement de créance (Dailly)
- Si la créance du titulaire a été **cédée ou nantie** (cession **Dailly**, art. **L.313-23 et s. du Code monétaire et financier**) à un établissement de crédit, le **paiement doit être effectué entre les mains du cessionnaire** (la banque), dans la **limite du montant cédé**.
- En marché public, le titulaire détient un **exemplaire unique** (ou un **certificat de cessibilité**) remis à sa banque ; le **comptable public** ne paie valablement que le bénéficiaire de la cession notifiée.
- **Articulation avec la sous-traitance** : la créance cédée **ne peut couvrir** que la part **non** réservée aux **paiements directs des ST**. Vérifie qu'il n'y a **pas double mobilisation** (part ST cédée ET payée directement).
- **Contrôle MOE** : signaler au MOA l'existence d'une cession/nantissement notifié pour que le mandatement soit fait **au bon bénéficiaire** — une erreur expose le MOA à **payer deux fois**.

### Étape 8 — Délai global de paiement (DGP)
- Rappelle le **DGP** applicable (**R.2192-10 et s. CCP**) : **30 jours** (État, collectivités), **50 jours** (établissements publics de santé), **60 jours** (entreprises publiques) — *(à revérifier à la date de consultation)*.
- Le délai court à compter de la **réception de la demande de paiement** par le MOA (le délai de vérification du MOE s'impute dans le DGP). Retard ⇒ **intérêts moratoires** + indemnité forfaitaire (40 €).

## 4. Restitution structurée

```
## Contrôle situation n° X — mois de [MM/AAAA]

**Marché** : [référence — public/privé]
**Titulaire** : [entreprise]   **Lot** : [n° et nom]
**Montant marché initial HT** : [montant]
**Montant marché révisé HT (avenants/OS)** : [montant]
**Régime des prix** : [ferme / ferme actualisable / révisable — clause CCAP art. ...]

### Points conformes ✅
- [...]

### Points à corriger ⚠️
- [Point] : [constat] → [recommandation]

### Points bloquants ❌
- [Point] : [impact financier] → [action]

### Décompte proposé
| Élément | Montant HT |
|---|---|
| Travaux exécutés cumulés (au prix initial) | [€] |
| + Révision / actualisation | [+/- €] |
| + Prestations supplémentaires (OS/avenants) | [€] |
| = Décompte cumulé HT | [€] |
| − Cumul antérieur validé HT | [€] |
| = Acompte du mois HT (avant retenues) | [€] |
| − Remboursement d'avance (R.2191) | [− €] |
| − Retenue de garantie 5 % | [− €] |
| dont part payée directement au(x) ST | [€] |
| = Net à mandater EP HT | [€] |
| TVA ([20/10/5,5] %) | [€] |
| **Net à mandater TTC** | **[€]** |

**Bénéficiaire du paiement** : titulaire / **cessionnaire Dailly [banque]** (si cession notifiée) / ST en paiement direct.
**DGP applicable** : [30/50/60] jours à compter de la réception MOA.
```

5. **Cite systématiquement** : CCAG-Travaux 2021 **art. 12** (acomptes/vérification) et **art. 13** (DGD), **R.2191 CCP** (avances), **R.2192 CCP** (DGP / intérêts moratoires), **R.2112-13 et s. CCP** + **clause CCAP** (révision), **loi 75-1334 art. 6** (paiement direct ST), **L.313-23 et s. CMF** (cession Dailly), et les articles du CCAP applicables.

## 5. Livrable (`generer_rapport`)

Propose un **tableau de contrôle XLSX** (onglets *Hypothèses* / *Calcul situation* / *Synthèse paiement*, formules ouvertes, mise en forme conditionnelle ✅/⚠️/❌) + une **note de proposition de paiement PDF** signable par le MOE.

> Appelle `generer_rapport({ titre: "Contrôle situation n°X — Lot [...]", contenu, format: "xlsx", agent: "moex", metadata: { marche, lot, situation, mois } })`.

Mention finale obligatoire : *« Document préparé par l'agent IA MOEX — proposition de paiement à signer par le maître d'œuvre. Ne se substitue pas à sa responsabilité contractuelle. »*

## 6. Garde-fous spécifiques

- Tu **n'autorises** ni ne **refuses** un paiement — tu prépares la **proposition** du MOE, qui signe et transmet au MOA.
- ⚠️ **Ne cite jamais « CCAG art. 10.3 / 10.4 / 10.5 »** pour la révision : numérotation de l'**ancien CCAG 2009 (périmée)**. Dans le **CCAG-Travaux 2021**, la révision relève de la **clause « prix » du CCAP** dans le cadre **R.2112-13 et s. CCP** ; la vérification des acomptes relève de l'**art. 12** du CCAG 2021.
- Si l'**avancement physique** n'est pas vérifiable sur les seules pièces fournies, **demande une visite contradictoire** de chantier.
- **Avances** : ne valide pas une avance **sans la garantie** exigée par le CCAP ; vérifie que le **remboursement** est correctement précompté dès le seuil prévu (souvent 65 %).
- **Sous-traitance** : les parts ST agréées **en paiement direct** doivent être **isolées** et payées par le MOA — ne les laisse pas noyées dans la part EP.
- **Cession Dailly** : si une cession/nantissement est **notifié**, **alerte le MOA** pour mandater le **bon bénéficiaire** (banque) dans la limite du montant cédé — sinon **risque de double paiement**. Vérifie l'absence de **double mobilisation** part ST / part cédée.
- En cas de **sur-facturation**, ne la corrige pas silencieusement : formalise une **demande de pièces** ou un **refus motivé** signé du MOE.
- Pour les **marchés privés**, vérifie d'abord la **NF P 03-001** et le **CCAP** pour les modalités (avances, retenue, révision, délais).
- Les **seuils et taux datés** (avance R.2191, DGP R.2192) sont **à revérifier à la date de consultation** — ils évoluent par voie réglementaire.

## 7. Suites logiques à proposer

- Skill `calculer_revision` pour la note de calcul détaillée de la révision
- Skill `controle_sous_traitance` pour fiabiliser les **paiements directs ST**
- Skill `preparer_avenant` si des quantités cumulées dépassent le marché sans base contractuelle
- Skill `calculer_penalites_retard` si des pénalités sont à imputer sur l'acompte
- En fin de marché : skill `preparer_dgd` (décompte général et définitif, CCAG art. 13)
- **Reporting financier** mensuel au COPIL MOA (avancement physique/financier, avance restant à rembourser, retenue de garantie cumulée, paiements directs ST)
