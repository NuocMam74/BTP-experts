# Skill — Optimiser la trésorerie et le BFR d'une entreprise BTP

L'utilisateur veut **diagnostiquer le BFR** d'une entreprise BTP, **proposer des solutions de financement** (Dailly, affacturage, crédit-bail) et **vérifier les garanties** (garantie de paiement art. 1799-1, cautions, retenue de garantie).

> ⚠️ **Rappel de la date de la base** : délais de paiement, seuils et taux **à revérifier**. Tu prépares le diagnostic ; l'arbitrage financier final relève du dirigeant et de l'expert-comptable (DEC).

## 1. Documents attendus

- **Balance** et **grand-livre** (postes clients, fournisseurs, 4117 RG, 4191 avances).
- **Échéancier** des situations émises / encaissées par chantier.
- **Tableau de trésorerie** prévisionnel (si disponible).
- **Encours de cautionnement** bancaire (lignes consommées).
- **Contrats** : marchés (privés / publics), crédit-bail matériel, affacturage / Dailly éventuels.

Si absent, demande :
1. Marchés majoritairement **publics** ou **privés** ?
2. Montant de la **retenue de garantie** immobilisée (4117) ?
3. **Délais d'encaissement** moyens constatés (DSO) ?
4. Financements en place : **Dailly**, **affacturage**, **découvert**, **crédit-bail** ?
5. Croissance du **CA** (un CA en forte hausse gonfle le BFR) ?

## 2. Référentiels (`rag_search`)

- `rag_search("BFR BTP retenue de garantie 4117 décalage situations encaissement")` — corpus *tresorerie_bfr_financement_btp*
- `rag_search("cession Dailly affacturage escompte financement poste client")`
- `rag_search("crédit-bail matériel 612 option d'achat annexe engagement hors bilan")`
- `rag_search("garantie de paiement 1799-1 code civil marchés privés")`
- `rag_search("caution loi 1975 GAPD retenue de garantie marchés publics")`
- `rag_search("délais de paiement LME marchés publics intérêts moratoires")`

## 3. Diagnostiquer le BFR

```
BFR = Stocks et en-cours + Créances clients (situations non encaissées, FAE 418, RG 4117)
      − Dettes fournisseurs − Avances/acomptes reçus (4191) − Dettes fiscales et sociales
```

| Levier | Effet |
|---|---|
| Émettre les **situations** sans retard | Appelle la trésorerie plus tôt |
| Maximiser l'**avance** de démarrage (4191) | Trésorerie en amont |
| Réduire la **RG** immobilisée (caution GAPD) | Encaisse 100 % au lieu de 95 % |
| Réduire le **DSO** (relances, intérêts de retard) | Encaissements plus rapides |
| Mobiliser le poste client (**Dailly**) | Financement immédiat des créances |

> En BTP, **résultat bénéficiaire ≠ trésorerie positive**. Une **forte croissance** gonfle le BFR → risque de tension. Surveiller la couverture du BFR par le fonds de roulement.

## 4. Proposer les financements adaptés

| Outil | Quand | Points d'attention BTP |
|---|---|---|
| **Cession Dailly** | Mobiliser des créances pro | Souvent préféré en BTP ; créances de situations (conditionnelles) |
| **Affacturage** | Externaliser gestion + financement | Factors appliquent des **abattements** sur créances BTP (validation MOE, RG, réfactions) |
| **Escompte** | Effets de commerce | Moins courant sur situations |
| **MCNE** | Créances **export** (chantiers étrangers) | — |
| **Crédit-bail matériel** | Financer grue/pelle/banche | Redevances en **612** ; option d'achat en fin ; **annexe** (engagement hors bilan) ; retraitement en analyse financière / IFRS 16 |
| **Découvert / facilité** | Court terme ponctuel | Coûteux |

## 5. Vérifier les garanties

| Garantie | Vérification |
|---|---|
| **Retenue de garantie 5 %** (4117) | Suivre ; remplacer par **caution GAPD** pour encaisser 100 % ; **libération** à la levée des réserves |
| **Garantie de paiement art. 1799-1** (marchés privés) | Le MOA doit garantir le paiement (caution bancaire ou paiement direct du prêteur) ; à défaut, **suspension** possible des travaux après mise en demeure |
| **Caution loi 1975** (sous-traitance privée) | L'entreprise principale doit fournir **caution personnelle et solidaire** au ST (ou délégation de paiement) — à défaut, contrat ST nul |
| **Cautions de marché** (bonne fin, restitution d'avance) | Suivre l'**encours de cautionnement** (impacte les lignes bancaires) ; mention **annexe** |

## 6. Restitution structurée

```
## Diagnostic trésorerie / BFR — [Entreprise]

### Réserve de fraîcheur
- Délais / seuils / taux à revérifier au [date].

### Diagnostic BFR
- Postes clients (dont 418, 4117) : [€]
- Avances reçues (4191) : [€]
- Dettes fournisseurs / fiscales-sociales : [€]
- **BFR estimé** : [€] | DSO : [jours]

### Garanties
| Garantie | Constat | Action |
|---|---|---|
| RG 4117 | [€ immobilisés] | Caution GAPD ? |
| Art. 1799-1 (privé) | [fournie / absente] | Exiger / suspendre |
| Caution loi 1975 (ST) | [✅/⚠️] | — |

### Financements proposés
| Outil | Pertinence | Coût indicatif | Recommandation |
|---|---|---|---|

### Plan d'action
1. Réduire la RG immobilisée (GAPD)
2. Accélérer l'émission des situations / relances
3. Mobiliser le poste client (Dailly)
4. Financer le matériel en crédit-bail
5. Exiger la garantie 1799-1 sur marchés privés

### Garde-fous
- Arbitrage financier = dirigeant + DEC. Ne se substitue pas à l'analyse bancaire.
```

## 7. Livrable (`generer_rapport`)

`generer_rapport({ titre: "Diagnostic trésorerie et BFR — [entreprise]", contenu, format: "xlsx" | "docx" | "pdf", agent: "expert-comptable-btp", metadata: { entité, période, date } })`

- **XLSX** : calcul du BFR, DSO, échéancier, simulation des financements.
- **DOCX/PDF** : note de diagnostic + plan d'action + revue des garanties.

## 8. Garde-fous spécifiques

- Le **crédit-bail** n'immobilise pas le bien (redevances en 612) mais doit figurer en **annexe** (engagement hors bilan) ; le **retraiter** en analyse financière (endettement).
- L'**affacturage** sur créances BTP subit souvent des **abattements** (créances conditionnelles) → comparer au coût de la **Dailly**.
- La **garantie de paiement 1799-1** est un **droit** de l'entrepreneur à mobiliser dès le contrat (marchés privés).
- Ne pas confondre **retenue de garantie** (5 %, 4117) et **réfaction** (réduction définitive du prix).
- Tu **prépares** le diagnostic ; l'**arbitrage** appartient au dirigeant et à l'expert-comptable. Délais/seuils **à revérifier**.

## 9. Suites logiques à proposer

- Skill `controle_situation_travaux` (fiabiliser les situations émises / RG).
- Skill `controle_sous_traitance_1975` (cautions ST, délégation de paiement).
- Skill `preparer_facturation_electronique` (exploiter les **statuts** de facture « encaissée »).
- Skill `gerer_procedure_collective` (si la tension de trésorerie évolue vers la cessation des paiements).
- Mise en place d'un **plan de trésorerie glissant** (12 semaines) par chantier.
