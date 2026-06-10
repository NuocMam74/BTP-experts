# Skill — Préparer la facturation électronique et l'e-reporting (entreprise BTP)

L'utilisateur veut **diagnostiquer la conformité** d'une entreprise BTP à la **réforme de la facturation électronique** (e-invoicing) et de la **transmission de données** (e-reporting), déterminer le **calendrier applicable**, **choisir une PDP** et **paramétrer les cas BTP** (autoliquidation sous-traitance, situations, taux réduits).

> ⚠️ **Garde-fou de fraîcheur** : la réforme est en cours de déploiement et son calendrier a déjà été reporté (LF 2024). **Rappelle systématiquement la date de la base** et invite à **revérifier** le calendrier, les seuils et les formats sur impots.gouv.fr et auprès de la PDP retenue avant toute décision.

## 1. Documents attendus / paramètres à collecter

- **Liasse / comptes** récents (CA, total bilan) et **effectif** → pour déterminer la **catégorie** d'entreprise.
- **Cartographie de la facturation** : part B2B (pros / donneurs d'ordre), part B2C (particuliers), opérations à l'international.
- **Logiciel** de facturation / gestion de chantier / comptabilité actuel (éditeur, capacité Factur-X).
- **Volume** de factures émises / reçues par mois.
- Présence de **sous-traitance** (en émission : facture ST autoliquidée ; en réception : factures ST reçues).
- Recours aux **situations de travaux**, **acomptes**, **retenue de garantie**.

Si absent, demande :
1. CA HT, total de bilan, effectif (pour la catégorie micro / PME / ETI / GE) ?
2. L'entreprise facture-t-elle des **particuliers** (B2C) ? des **professionnels** (B2B) ? à l'**étranger** ?
3. Logiciel actuel et capacité à produire du **Factur-X / UBL / CII** ?
4. Une **PDP** est-elle déjà choisie / contractualisée ?
5. Cas BTP présents : **autoliquidation ST**, taux **10 / 5,5**, situations, acomptes, RG ?

## 2. Référentiels (`rag_search`)

- `rag_search("réforme facturation électronique 2026 calendrier PDP")` — corpus *facturation_electronique_2026*
- `rag_search("e-reporting opérations B2C international données de paiement")`
- `rag_search("Factur-X UBL CII format facture électronique EN 16931")`
- `rag_search("CGI 283 nonies autoliquidation sous-traitance BTP")` — pour le paramétrage ST
- `rag_search("CGI 269 exigibilité TVA prestations de services encaissement")` — pour le e-reporting des paiements

## 3. Déterminer le calendrier applicable

1. **Réception** : **toutes** les entreprises doivent pouvoir **recevoir** des factures électroniques au **1ᵉʳ septembre 2026** (à revérifier).
2. **Émission + e-reporting** selon la taille :
   - **GE / ETI** → **1ᵉʳ septembre 2026**
   - **PME / micro** → **1ᵉʳ septembre 2027**

> La plupart des entreprises BTP sont **PME/micro** → **réception sept. 2026** mais **émission sept. 2027**. Confirmer la catégorie avec les seuils du décret 2008-1354. **Dates à revérifier.**

## 4. Cartographier e-invoicing vs e-reporting

| Flux de l'entreprise BTP | Obligation |
|---|---|
| Facture à un **donneur d'ordre / client pro** établi en France (B2B) | **E-invoicing** (facture électronique via PDP) |
| Facture à un **particulier** (B2C) | **E-reporting** des données de transaction + **données d'encaissement** |
| Facture **ST autoliquidée** au titulaire (B2B) | **E-invoicing** avec **code TVA « autoliquidation / reverse charge »** |
| Opération avec l'**étranger** (UE / hors UE) | **E-reporting** |
| Travaux pour **MOA public** | Selon la nature (souvent déjà Chorus Pro pour le public) |

## 5. Choisir une PDP

- Vérifier que la PDP est **immatriculée** par l'administration.
- Vérifier l'**interopérabilité** avec le logiciel comptable / de gestion de chantier (connecteur, reprise des formats).
- Vérifier la gestion des **statuts** de facture (déposée, rejetée, encaissée) — utile au pilotage du BFR (cf. *tresorerie_bfr_financement_btp*).
- Rappeler que le **PPF n'est plus** la plateforme gratuite de transit : il faut **une PDP**.

## 6. Paramétrer les cas BTP spécifiques

| Cas | Paramétrage à vérifier |
|---|---|
| **Autoliquidation ST** | Facture HT + mention « Autoliquidation — art. 283 nonies CGI » **et** code structuré « reverse charge » dans le XML ; taux TVA = 0 (pas de TVA renseignée par erreur) |
| **Taux réduits 10 / 5,5** | Code de taux correct + attestation 1300/1301-SD conservée (le format structuré ne dispense pas de l'attestation) |
| **Situations de travaux** | Factures d'acompte / situation / facture définitive correctement chaînées |
| **Acomptes / avances** | Compte 4191 ; factures d'acompte structurées |
| **Retenue de garantie 5 %** | RG (compte 4117) tracée ; ne pas la confondre avec une réfaction |
| **Mentions nouvelles** | SIREN client, adresse de livraison, option débits/encaissement |

## 7. Restitution structurée

```
## Diagnostic facturation électronique — [Entreprise]

### Date de la base / réserve de fraîcheur
- Réforme en déploiement, calendrier susceptible d'évoluer — à revérifier au [date].

### Catégorie de l'entreprise
- CA / bilan / effectif → **[micro / PME / ETI / GE]**

### Calendrier applicable
- Réception : **1ᵉʳ sept. 2026** (toutes entreprises)
- Émission + e-reporting : **[sept. 2026 (GE/ETI) / sept. 2027 (PME/micro)]**

### Cartographie des flux
| Flux | Volume | Obligation (e-invoicing / e-reporting) |
|---|---|---|
| B2B France | ... | E-invoicing |
| B2C (particuliers) | ... | E-reporting + paiement |
| International | ... | E-reporting |

### PDP
- Statut : [choisie / à choisir], immatriculée [oui/non], interopérable [oui/non]

### Cas BTP à paramétrer
- Autoliquidation ST : [✅ / ⚠️]
- Taux réduits 10 / 5,5 : [✅ / ⚠️]
- Situations / acomptes / RG : [✅ / ⚠️]

### Plan d'action (échéancier)
1. Garantir la **réception** (sept. 2026)
2. Choisir / contractualiser la **PDP**
3. Paramétrer les **cas BTP**
4. Tester des **factures pilotes Factur-X**
5. Former les équipes (devis-facturation, conducteurs émettant les situations)

### Garde-fous
- Calendrier / seuils / formats **à revérifier**.
- L'attestation 1300/1301-SD reste **obligatoire** même en facture électronique.
- Vérifier le code TVA « reverse charge » sur les factures ST autoliquidées.
```

## 8. Livrable (`generer_rapport`)

Propose : `generer_rapport({ titre: "Diagnostic facturation électronique BTP", contenu, format: "docx" | "pdf" | "xlsx", agent: "expert-comptable-btp", metadata: { entité, date, échéance } })`

- **DOCX/PDF** : note de diagnostic + plan d'action + échéancier.
- **XLSX** : cartographie des flux + checklist de paramétrage + planning.

## 9. Garde-fous spécifiques

- **Ne se substitue pas** au choix technique de la PDP ni à l'avis de l'éditeur logiciel — tu cadres, l'expert-comptable et l'éditeur déploient.
- **Rappelle la date de la base** : le calendrier a déjà été reporté → ne jamais présenter une date comme définitive sans renvoi à impots.gouv.fr.
- **Ne cite pas d'identifiant de spécification** non confirmé ; renvoie au « dossier de spécifications externes » de l'administration.
- Le diagnostic ne **dispense pas** des obligations TVA de fond (exigibilité à l'encaissement, autoliquidation, attestations).

## 10. Suites logiques à proposer

- Skill `controle_autoliquidation_btp` pour fiabiliser le paramétrage des factures ST.
- Skill `optimiser_tresorerie_btp` pour exploiter les **statuts** de facture (encaissée) dans le pilotage du BFR.
- Skill `calculer_tva_travaux` pour sécuriser les codes de taux (10 / 5,5 / 20).
- Mise à jour des **modèles de factures** et de l'**annuaire clients** (SIREN, code de routage).
