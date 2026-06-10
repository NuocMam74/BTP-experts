# TVA — coefficient de déduction, régularisations, FCTVA, débours et créances irrécouvrables

**Source :** CGI art. 271 (droit à déduction) ; CGI annexe II art. 205 à 210 (coefficients de déduction : assujettissement, taxation, admission ; régularisations) ; CGI art. 206 II (exclusions du droit à déduction) ; CGI art. 256 et s. (champ d'application) ; CGI art. 267 II (sommes exclues de la base — débours au nom et pour le compte) ; CGI art. 272 (récupération de la TVA sur créances irrécouvrables) ; CGCT art. L.1615-1 et s. (FCTVA — Fonds de compensation pour la TVA, côté collectivités MOA) ; NF P 03-001 annexe A (compte prorata). **Taux, seuils et identifiants BOFIP à revérifier à la date de consultation.**

## 1. Le mécanisme général du droit à déduction (CGI art. 271)

La TVA grevant une dépense est déductible si la dépense est **nécessaire à l'exploitation** et utilisée pour des opérations **ouvrant droit à déduction**. Depuis la réforme 2008, la déductibilité se mesure par un **coefficient de déduction** propre à **chaque bien et service** :

```
Coefficient de déduction = Coefficient d'assujettissement
                         × Coefficient de taxation
                         × Coefficient d'admission
```

Chaque coefficient est compris **entre 0 et 1** (CGI annexe II art. 206).

## 2. Les trois coefficients (CGI annexe II art. 206)

### 2.1 Coefficient d'assujettissement

- Proportion d'utilisation du bien/service pour des opérations **dans le champ** de la TVA (par opposition aux opérations **hors champ** : activité non économique, subventions non taxables, etc.).
- = **1** si le bien est utilisé exclusivement pour des opérations dans le champ ; **0** si hors champ ; **proratisé** si usage mixte.

### 2.2 Coefficient de taxation

- Proportion d'utilisation pour des opérations **taxées (ou assimilées : exportations, livraisons intracommunautaires, opérations exonérées ouvrant droit à déduction)** parmi les opérations **dans le champ**.
- = **1** si l'opération en aval est taxée et ouvre droit à déduction ; **0** si exonérée sans droit à déduction ; **forfaitaire** (rapport CA taxé / CA total dans le champ) en cas d'usage mixte.

> C'est ici que se loge le **redevable partiel** (mène à la fois des opérations taxées et exonérées sans droit à déduction) et l'**assujetti partiel** (mène des opérations dans le champ et hors champ).

### 2.3 Coefficient d'admission

- Traduit les **exclusions/restrictions** légales du droit à déduction (CGI art. 206 II / 273) : véhicules de tourisme, certains carburants, dépenses de logement de tiers, etc.
- = **1** si aucune exclusion ; **0** si exclusion totale ; **partiel** pour certains carburants.

## 3. Assujetti / redevable partiel en BTP

| Situation BTP | Conséquence sur les coefficients |
|---|---|
| Entreprise **100 % travaux taxés** (BTP classique) | Coefficients généralement = 1 → **déduction intégrale** |
| Bailleur réalisant des **locations exonérées** (logement nu) à côté d'activité taxée | **Redevable partiel** → coefficient de taxation < 1 sur les dépenses mixtes |
| **Holding** animatrice avec produits financiers / dividendes hors champ | **Assujetti partiel** → coefficient d'assujettissement < 1 sur les frais de structure |
| Activité de **marchand de biens** mêlant ventes taxées et exonérées | Coefficient de taxation à calculer (voir corpus *tva_immobiliere_marchand_biens*) |
| **Autoliquidation BTP** (ST) | N'affecte pas le coefficient ; le ST ne collecte pas, le donneur d'ordre autoliquide (voir corpus *autoliquidation_tva_btp*) |

> Pour la majorité des entreprises de travaux **pleinement assujetties et taxées**, le coefficient de déduction = **1**. La problématique de **prorata** apparaît surtout chez les **bailleurs**, **holdings** et **promoteurs/marchands de biens**.

## 4. Régularisations de TVA déduite (CGI annexe II art. 207)

La déduction initiale est **provisoire** ; elle peut être **régularisée**.

### 4.1 Régularisations annuelles et globales (immobilisations)

- Les **immobilisations** (matériel BTP, immeubles) ouvrent une **période de régularisation** : **5 ans** (biens meubles : matériel, engins) ou **20 ans** (immeubles), année d'acquisition comprise.
- **Régularisation annuelle** : si le coefficient de déduction d'une année varie de plus d'un certain écart par rapport au coefficient de référence → complément de déduction ou reversement, par fraction (1/5 ou 1/20).
- **Régularisation globale (one-shot)** : en cas d'événement (cession, cessation, changement d'affectation, perte du droit à déduction) avant la fin de la période → reversement (ou déduction complémentaire) pour les années restantes.

### 4.2 Cas BTP fréquents

| Événement | Régularisation |
|---|---|
| **Cession de matériel** (grue, pelle) dans le délai de 5 ans | Si la cession est **soumise à TVA** : pas de reversement ; si **non soumise** : reversement de TVA pour les années restantes (CGI ann. II art. 207) |
| **Cession d'immeuble** dans les 20 ans | Régularisation globale (sauf option/soumission à TVA — voir TVA immobilière) |
| Bien passant d'usage **taxé** à usage **exonéré** | Reversement |
| **Vol / destruction dûment justifiés** | En principe **pas** de régularisation (dispense sous conditions) |

## 5. FCTVA — Fonds de Compensation pour la TVA (côté collectivités MOA)

**Le FCTVA ne concerne pas l'entreprise BTP** elle-même, mais le **maître d'ouvrage public** (commune, EPCI, département…). À connaître pour conseiller et facturer correctement.

- Les **collectivités** ne récupèrent pas la TVA par la voie fiscale classique sur leurs **investissements** non assujettis : elles bénéficient du **FCTVA** (CGCT art. L.1615-1 et s.), une **dotation budgétaire** qui leur restitue forfaitairement une fraction de la TVA supportée sur leurs dépenses d'investissement (et certaines dépenses d'entretien, selon le texte en vigueur).
- **Taux de compensation FCTVA** : taux forfaitaire **à revérifier** (révisé par les lois de finances).
- **Conséquence pour l'entreprise BTP** : sur un **marché public** d'investissement, l'entreprise **facture la TVA normalement** (20 % en général) ; c'est la collectivité qui récupère via le **FCTVA** — l'entreprise n'a **rien à faire de particulier** côté facturation, hormis émettre une facture conforme. Ne pas confondre FCTVA et autoliquidation.

> ⚠️ Une collectivité **assujettie** pour une activité donnée (ex. service de distribution d'eau soumis à TVA) récupère la TVA par voie **fiscale** (déduction), **pas** par le FCTVA. La frontière dépend de l'affectation de l'investissement. **À revérifier** au cas par cas.

## 6. Frontière débours / refacturation — le piège du compte prorata

### 6.1 Débours (CGI art. 267 II)

Sont **exclues de la base d'imposition** à la TVA les sommes remboursées par le client correspondant à des **débours** engagés **au nom et pour le compte** du client (mandat), sous conditions strictes :

- L'entreprise agit en **mandataire** (au nom et pour le compte du client) ;
- Elle **rend compte exactement** du montant (pas de marge) ;
- Elle **justifie** la nature et le montant exact des dépenses auprès de l'administration ;
- La dépense est **inscrite dans un compte de tiers** (passage par classe 4), **pas** en produit/charge.

→ Le débours **ne suit pas** la TVA : l'entreprise refacture le **montant exact** sans TVA additionnelle (elle n'a pas déduit la TVA d'amont sur ce débours).

### 6.2 Refacturation (≠ débours)

Si l'entreprise agit **en son nom propre** (elle achète puis revend/refacture), il s'agit d'une **refacturation** : l'opération est **taxable** au taux qui lui est propre ; l'entreprise **déduit** la TVA d'amont et **collecte** la TVA en aval. C'est le cas général en BTP (achats de matériaux revendus dans la prestation de travaux).

| Critère | **Débours** (art. 267 II) | **Refacturation** |
|---|---|---|
| Qualité | Mandataire (nom et compte du client) | Nom propre |
| TVA | Hors base (pas de TVA ajoutée) | Taxable, TVA collectée |
| Comptabilisation | **Compte de tiers** (classe 4) | Charge (6) puis produit (7) |
| Marge | **Interdite** (montant exact) | Possible |
| Justificatif | Facture **au nom du client** | Facture au nom de l'entreprise |

### 6.3 Compte prorata (NF P 03-001 annexe A)

- Les **dépenses communes de chantier** (eau, électricité, gardiennage, nettoyage, base-vie) gérées via le **compte prorata** sont **réparties** entre entreprises selon une clé. Leur traitement TVA dépend de la qualité du **gestionnaire** :
  - S'il **refacture en son nom** la quote-part aux autres entreprises → opération **taxable** (TVA collectée, déduction d'amont).
  - S'il agit en **mandataire** pour le compte du groupement (débours) → traitement de débours.
- En pratique, la **refacturation taxable** est la situation la plus fréquente pour le gestionnaire du compte prorata. Voir corpus *compte_prorata_nf_p_03001* et skill `compte_prorata`.

> ⚠️ Erreur classique en contrôle : qualifier en **débours** (hors TVA) ce qui est en réalité une **refacturation** (taxable) → **rappel de TVA collectée**. Les conditions du débours (mandat, montant exact, compte de tiers, justificatif au nom du client) sont **cumulatives et strictes**.

## 7. Créances irrécouvrables (CGI art. 272)

L'entreprise BTP peut **récupérer la TVA** qu'elle a **collectée et déclarée** sur une facture **définitivement impayée**.

- **Condition** : le caractère **irrécouvrable** doit être **établi** (clôture de la procédure collective pour insuffisance d'actif, certificat d'irrécouvrabilité, créance définitivement perdue). Un simple **retard de paiement** ou un **litige** ne suffit **pas**.
- **Modalité** : envoi au client défaillant d'un **duplicata** de facture portant la mention légale (TVA pouvant faire l'objet d'une déduction…), puis **imputation** de la TVA récupérée sur la déclaration.
- **Distinction** :
  - **Créance douteuse / litigieuse** (recouvrement incertain mais non définitivement perdu) → **provision pour dépréciation** (491) sur le **montant HT** ; **pas** de récupération de TVA.
  - **Créance irrécouvrable** (perte définitive) → **perte** (654) + **récupération de la TVA** (272).
- **BTP** : fréquent en cas de **procédure collective** du MOA ou d'un donneur d'ordre (voir corpus *procedure_collective_btp*). Bien dater la **certitude d'irrécouvrabilité**.

### Écritures indicatives

```
Constatation du douteux :         416 Clients douteux        à 411 Clients
Provision (HT) :                  6817 Dotation              à 491 Dépréciation clients
Irrécouvrabilité définitive :     654 Pertes / créances      à 416
                                  44571 TVA collectée (récup) à 416  (régularisation de la TVA)
Reprise de la provision :         491                         à 7817 Reprise
```

## 8. Synthèse des comptes mobilisés

| Compte | Emploi |
|---|---|
| **44566** | TVA déductible sur autres biens et services |
| **445662 / 445663** | TVA déductible sur immobilisations (suivi pour régularisations) |
| **44571** | TVA collectée (et récupération sur irrécouvrables) |
| **44551 / 44558** | TVA à décaisser / TVA à régulariser |
| **467 / 4-tiers** | Débours (au nom et pour le compte) — compte de tiers |
| **416 / 491 / 654 / 6817 / 7817** | Clients douteux, dépréciation, pertes, dotation/reprise |

## 9. Garde-fous

- **Coefficient de déduction = produit de 3 coefficients** (assujettissement × taxation × admission) ; pour une entreprise **100 % travaux taxés**, il vaut généralement **1**.
- **Débours ≠ refacturation** : le débours (hors TVA) suppose **mandat + montant exact + compte de tiers + justificatif au nom du client**, conditions **cumulatives** ; à défaut, c'est une refacturation **taxable**.
- Le **FCTVA** concerne la **collectivité MOA**, pas l'entreprise : sur marché public d'investissement, l'entreprise **facture la TVA normalement**.
- **Régularisations** : suivre le délai **5 ans (meubles) / 20 ans (immeubles)** ; cession de matériel non soumise à TVA → **reversement**.
- **Créance irrécouvrable** : récupération de TVA seulement si **perte définitive établie** ; le **litige** ou le **retard** ne donne droit qu'à une **provision** (sans TVA).
- Identifiants BOFIP et taux FCTVA : **à revérifier** ; pour les cas mixtes (assujetti/redevable partiel, prorata), **rescrit** recommandé (LPF art. L.80 B).

## 10. Citations à utiliser

- CGI art. 271 (droit à déduction), 272 (créances irrécouvrables), 267 II (débours), 206 II (exclusions)
- CGI annexe II art. 205 à 210 (coefficients de déduction et régularisations)
- CGCT art. L.1615-1 et s. (FCTVA)
- NF P 03-001 annexe A (compte prorata)
- PCG — comptes 44566/44571, 416/491/654, comptes de tiers (débours)

**Référence à citer :** CGI + CGI annexe II + CGCT + NF P 03-001 + PCG. Sources : Legifrance + BOFIP. **Taux FCTVA, seuils de régularisation et identifiants BOFIP à revérifier à la date de consultation ; rescrit conseillé pour les configurations de prorata.**
