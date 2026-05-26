# Skill — Contrôler la sous-traitance (DC4 et conformité loi 1975)

L'utilisateur (MOE en mission DET/AOR) doit **vérifier la complétude et la régularité** d'une déclaration de sous-traitance présentée par une entreprise titulaire : **DC4** (marchés publics) ou **convention** (marchés privés), conformité à la **loi 75-1334 du 31 décembre 1975** (d'ordre public), garanties exigées.

> ⚠️ Cette skill est l'angle **MOE / pilotage chantier** (réception et contrôle de la déclaration ST). Pour l'angle **expert-comptable** (TVA, vigilance fiscale, écritures), voir la skill expert-comptable `controle_sous_traitance_1975`.

## 1. Documents attendus

- **DC4** signé EP + ST (marchés publics) ou **convention de sous-traitance** (privé)
- **CCAP** et **acte d'engagement** du marché principal
- **Acceptation MOA** : décision écrite, courrier, mention sur DC4
- **Caution** personnelle et solidaire (banque agréée, marché privé) **OU** **délégation de paiement** (marché privé)
- **Kbis** du ST (< 3 mois)
- **Attestation de vigilance URSSAF** du ST (< 6 mois — Code travail L.8222-1)
- **Attestation fiscale** annuelle du ST (régularité)
- **Attestation d'assurance** (RC pro + décennale si applicable)
- **Liste nominative** des salariés détachés si ST étranger
- **Plan de prévention** ou **PPSPS** du ST coordonné avec PGC

Si pièces partielles : demande
1. Marché **public** ou **privé** ?
2. Le ST intervient en **rang 1** (sous EP) ou **rang 2** (sous-sous-traitance) ?
3. **Montant prévisionnel** des travaux ST ?
4. **Date prévue d'intervention** du ST sur chantier ?
5. ST déjà connu sur chantiers antérieurs ?
6. **Lot/poste** sous-traité (partie ou totalité du lot EP) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("loi 75-1334 31 décembre 1975 sous-traitance")`
- `rag_search("CCAG-Travaux article 3.6 sous-traitance marchés publics")`
- `rag_search("code commande publique R.2193 sous-traitance")`
- `rag_search("Cass. chambre mixte 18 décembre 1992 nullité ordre public")`
- `rag_search("Code travail L.8222 obligation vigilance donneur d'ordre")`
- `rag_search("Code travail L.8221 travail dissimulé sanctions")`
- `rag_search("DC4 formulaire imprimés marchés publics")`

## 3. Pièces et vérifications par type de marché

### A — Marché public (CCAG-Travaux art. 3.6 + CCP R.2193)

#### Le DC4 doit contenir :

| Rubrique | Vérification |
|---|---|
| **Identité du titulaire** (EP) | SIRET, raison sociale, adresse, représentant |
| **Identité du sous-traitant** | SIRET, raison sociale, adresse, représentant, n° inscription RCS / RM |
| **Nature des prestations sous-traitées** | Description précise du périmètre (par lot, par poste) |
| **Montant maximum HT** | Montant **plafond** des prestations ST |
| **Conditions de paiement** | Modalités, retenue de garantie, révision, délais |
| **Coordonnées bancaires du ST** | RIB conforme |
| **Documents joints** | Attestation vigilance URSSAF, attestation fiscale, Kbis, assurances |
| **Signatures EP et ST** | Originaux ou électroniques |

#### Acceptation par MOA :
- **Décision écrite** d'agrément (ou tacite après **21 jours** silence — CCAG art. 3.6.4)
- **Acceptation des conditions de paiement** signée par MOA sur DC4

#### Effets :
- ST agréé peut intervenir
- Si montant ST **≥ 600 € HT** : **paiement direct** par MOA (loi 1975 art. 6)
- Sinon : paiement par EP avec garanties classiques

### B — Marché privé (loi 1975 + NF P 03-001 si visée)

#### Contrat de sous-traitance écrit (recommandé fortement)

| Rubrique | Vérification |
|---|---|
| Identité EP + ST | Idem DC4 |
| Description précise des travaux | Périmètre, planning, livrables |
| Montant et conditions de prix | Ferme / révisable, formule |
| Conditions de paiement | Délais, retenue, révision |
| **Caution OU délégation** | **Cœur de la conformité loi 1975** |

#### Garanties **obligatoires** (loi 1975 art. 14) :

**Option 1 — Caution personnelle et solidaire**
- Émise par **organisme financier agréé** (banque ou compagnie d'assurance avec agrément spécifique)
- Pour le **montant total** du contrat de sous-traitance
- Solidaire entre EP et organisme (paiement à 1ère demande)
- **NB** : caution sociétaire ou personnelle d'un dirigeant ≠ caution au sens loi 1975

**Option 2 — Délégation de paiement (acceptée par MOA)**
- Convention **tripartite** : EP + ST + MOA
- MOA s'engage à payer **directement** le ST sur les sommes dues à l'EP
- Doit être signée **AVANT** intervention du ST

⚠️ **Sans caution ET sans délégation** : contrat de sous-traitance **NUL d'ordre public** (Cass. ch. mixte 18/12/1992).

#### Acceptation MOA en marché privé
- L'agrément **MOA** est obligatoire (loi 1975 art. 3) :
  - **Exprès** (écrit) : recommandé
  - **Tacite** : silence > 3 mois après notification (mais difficile à prouver)
- Documentation écrite recommandée pour éviter litiges futurs

## 4. Obligations de vigilance (Code du travail L.8222-1 et suivants)

Pour tout contrat ≥ **5 000 € HT** :

| Pièce | Périodicité | Source |
|---|---|---|
| **Attestation de vigilance URSSAF** | Conclusion + tous les **6 mois** | urssaf.fr (téléchargement par ST) |
| **Kbis** (< 3 mois à la conclusion) | Conclusion contrat | Greffe ou infogreffe.fr |
| **Attestation fiscale** (régularité) | Annuelle | impots.gouv.fr |
| **Liste nominative travailleurs détachés** | À la conclusion si ST étranger | Sapin II + L.1262-1 CT |

⚠️ Sanction : **solidarité du donneur d'ordre** en cas de **travail dissimulé** du ST :
- Paiement des **impôts, taxes, cotisations sociales**
- **Rémunérations** dues aux salariés
- **Majorations et pénalités**

## 5. Procédure de contrôle MOE

### Étape 1 — Recevoir le dossier de sous-traitance
- Réception **complète** des pièces (DC4 / convention + annexes)
- Numérotation **dossier ST** (référence interne)
- Date de **réception** consignée

### Étape 2 — Vérifier la **forme**
- DC4 ou convention **signée** par EP et ST ?
- Mentions obligatoires **complètes** ?
- Pièces jointes (Kbis, attestations) **présentes et à jour** ?
- Coordonnées bancaires conformes (RIB FR + IBAN) ?

### Étape 3 — Vérifier le **fond juridique**
- Marché public : DC4 conforme, **acceptation MOA** ?
- Marché privé : **caution** ou **délégation** présente ?
- Vérification : caution émise par organisme **agréé** (ACPR liste publique) ?
- Vérification : délégation **tripartite** signée par MOA ?

### Étape 4 — Vérifier la **vigilance** (obligation EP, contrôle MOE pour le MOA)
- Attestation URSSAF du ST **< 6 mois** ?
- Kbis **< 3 mois** ?
- Attestation fiscale présente ?
- Si ST étranger : déclaration détachement (SIPSI) ?

### Étape 5 — Vérifier la **cohérence économique**
- Le montant ST est-il **cohérent** avec le marché EP (pas de quasi-totalité = risque "marchand de travaux" déguisé) ?
- Le prix unitaire est-il **conforme** aux conditions économiques acceptées (pas de marge cachée EP-ST exorbitante non justifiée) ?
- Le ST a-t-il les **moyens humains et techniques** annoncés (Kbis, attestations qualifications, références) ?

### Étape 6 — Vérifier les **aspects techniques chantier**
- PPSPS du ST coordonné avec **PGC du CSPS** ?
- Habilitations spécifiques (électricien, soudeur, levage, échafaudages) ?
- **Assurances** RC et décennale en cours ?

### Étape 7 — Émettre un **avis circonstancié** au MOA
- Avis **favorable** / **favorable avec réserves** / **défavorable**
- Si défavorable : motiver précisément
- Si réserves : liste précise des **compléments à fournir** ou des **risques à arbitrer**

## 6. Restitution structurée

```
## Contrôle déclaration de sous-traitance — [ST × Chantier]

### Identification
- **Marché principal** : [réf + MOA + EP]
- **Sous-traitant** : [nom + SIRET + adresse]
- **Lot/poste sous-traité** : [...]
- **Montant prévisionnel HT** : [...] €
- **Type de marché** : public / privé
- **Rang du ST** : 1 (sous EP) / 2 (sous-sous-traitance)
- **Date de réception du dossier** : [JJ/MM/AAAA]
- **MOE rédacteur** : [...]

### Vérification formelle

| Critère | Conformité | Notes |
|---|---|---|
| DC4 signé EP + ST (public) | ✅ / ❌ | |
| OU convention sous-traitance signée (privé) | ✅ / ❌ | |
| Description précise des prestations | ✅ / ⚠️ | |
| Montant maximum HT | ✅ / ❌ | [...] |
| Conditions de paiement | ✅ / ❌ | |
| Coordonnées bancaires (RIB) | ✅ / ❌ | |

### Vérification juridique

#### Marché public

| Critère | Conformité | Notes |
|---|---|---|
| Acceptation MOA (date) | ✅ [date] / ❌ / Tacite à venir | Délai 21 j |
| Acceptation des conditions de paiement signée MOA | ✅ / ❌ | |
| Droit au paiement direct (≥ 600 € HT) | ✅ / N.A. | |

#### Marché privé

| Critère | Conformité | Notes |
|---|---|---|
| Acceptation MOA (exprès / tacite) | ✅ / ⚠️ | [date / forme] |
| **Caution personnelle et solidaire** (banque agréée) | ✅ [réf] / ❌ | Vérifier agrément ACPR |
| **OU délégation de paiement tripartite** | ✅ / ❌ | Signée par MOA ? |

### Vigilance L.8222-1 CT

| Pièce | À jour | Date d'émission | Conformité |
|---|---|---|---|
| Attestation URSSAF | ✅ / ❌ | [...] | < 6 mois |
| Kbis | ✅ / ❌ | [...] | < 3 mois |
| Attestation fiscale | ✅ / ❌ | [...] | Annuelle |
| Liste détachement (si étranger) | ✅ / N.A. | [...] | SIPSI |
| Assurance RC | ✅ / ❌ | [...] | À jour |
| Assurance décennale (si applicable) | ✅ / ❌ | [...] | À jour |

### Vérification technique chantier

| Critère | Conformité |
|---|---|
| PPSPS coordonné avec PGC CSPS | ✅ / ❌ |
| Habilitations / qualifications spécifiques | ✅ / N.A. |
| Moyens humains et techniques annoncés | ✅ / ⚠️ |

### Vérification économique

| Critère | Conformité |
|---|---|
| Cohérence avec le marché EP (montant ST < marché EP) | ✅ / ⚠️ |
| Prix unitaires cohérents avec conditions économiques acceptées | ✅ / ⚠️ |
| Pas de "marchand de travaux" déguisé (ST > 80 % du lot EP) | ✅ / ❌ |

### Risques identifiés

| Risque | Probabilité | Conséquence |
|---|---|---|
| Nullité ordre public (privé sans caution/délégation) | élevée si confirmée | EP doit payer 2 fois |
| Solidarité travail dissimulé (vigilance défaillante) | modérée à élevée selon défaut | EP solidaire impôts / cotisations / salaires |
| Refus paiement direct (public, agrément manquant) | élevée si DC4 incomplet | ST non payable par MOA |
| Défaut qualifications techniques | modérée | Risque chantier — défauts |
| Insolvabilité ST (Kbis ancien, dette URSSAF) | modérée | Dérive chantier, sous-traitance en cascade |

### Avis MOE au MOA

[Avis circonstancié] : ✅ Favorable / ⚠️ Favorable avec réserves / ❌ Défavorable

**Motivation** : [...]

**Réserves / compléments à fournir** :
1. [...]
2. [...]

**Recommandation** :
- [ ] Notifier l'agrément au ST (marché public)
- [ ] Demander régularisation des pièces manquantes avant intervention
- [ ] Refuser le ST en l'état (marché privé sans caution)
- [ ] Demander caution / délégation avant tout démarrage

### Délais et notification

- Délai d'agrément MOA (public) : 21 jours à compter de la réception du DC4
- Échéance pour notification : [JJ/MM/AAAA]
- Modalité : LRAR ou voie dématérialisée
```

## 7. Pièges fréquents en sous-traitance

### Piège 1 — Démarrage du ST sans agrément
**Risque** : en marché public, le ST ne peut **pas** être payé directement par MOA ; en marché privé, contrat **nul d'ordre public** si pas de caution/délégation.
**Action MOE** : **interdire** l'accès du ST au chantier tant que l'agrément n'est pas formalisé.

### Piège 2 — Caution non agréée
La caution doit émaner d'un **établissement agréé ACPR** (banque ou compagnie d'assurance avec agrément spécial). Une caution d'**une société-mère**, d'un **dirigeant** à titre personnel, ou d'une **assurance non agréée** n'est **pas valable**.
**Action MOE** : vérifier l'agrément ACPR via la liste publique.

### Piège 3 — Délégation de paiement incomplète
La délégation doit être **tripartite signée** (EP + ST + MOA), définir précisément les sommes et les conditions de mise en œuvre. Une **simple "instruction"** de paiement ou un **mandat unilatéral** ne suffit pas.

### Piège 4 — ST en cascade (rang 2, 3...)
La loi 1975 s'applique **identiquement** entre chaque rang. Chaque ST de rang N est donneur d'ordre vis-à-vis du rang N+1 et doit obtenir l'agrément du MOA pour chaque rang.

### Piège 5 — Sous-traitance > 80 % du lot
Si l'EP sous-traite quasiment l'intégralité de son lot, le MOA peut soupçonner un **"marchand de travaux"** déguisé (entreprise sans capacité réelle). Selon les CCAP, cela peut être motif de **refus** de la sous-traitance.

### Piège 6 — ST étranger (UE ou hors UE)
Obligations supplémentaires :
- **Détachement** : déclaration SIPSI obligatoire (Code travail L.1262-1)
- **Vigilance** : attestations équivalentes (A1 sécurité sociale, attestations fiscales du pays)
- **Langue** : tous documents en français
- **Salaire minimum français** applicable (loi 2014)

## 8. Garde-fous spécifiques

- Tu **ne signes pas** l'agrément — c'est le **MOA** qui décide (ou le MOE par délégation expresse). Tu prépares un **avis circonstancié**.
- La **nullité ordre public** (Cass. ch. mixte 18/12/1992) est **stricte** — pas de tolérance. **N'autorise jamais** un démarrage de ST non conforme.
- Pour les **marchés privés**, ne te contente pas d'un agrément **tacite** non documenté — exiger une **trace écrite** (mail, courrier) du MOA.
- Une **caution personnelle et solidaire** doit être émise par un **établissement agréé ACPR** : vérifier la **liste publique** (refacto.acpr.banque-france.fr).
- La **délégation de paiement** doit être **tripartite** et **acceptée par MOA** — sans cette signature, elle est inopérante.
- Pour les **sous-traitants en cascade** : la loi 75-1334 s'applique **identiquement** entre chaque rang — vigilance accrue pour les sous-sous-traitants.
- Les **attestations URSSAF et fiscale** doivent être **renouvelées tous les 6 mois pendant l'exécution** — pas seulement à la conclusion.
- En cas de **travail dissimulé avéré** : alerter immédiatement le MOA et envisager **résiliation** de la sous-traitance par OS (CCAG art. 48).
- Pour les **chantiers > 6 mois** ou les ST nombreux : tenir un **registre** consultable des sous-traitants agréés, échéances de pièces, montants engagés.
- Tu **rappelles** que c'est l'**EP** (et non le MOE ou MOA) qui supporte la **responsabilité contractuelle** de la sous-traitance vis-à-vis du MOA — mais le MOE engage sa responsabilité s'il manque à son devoir de **contrôle et conseil** (mission DET).

## 9. Suites logiques à proposer

- **Notification de la décision** d'agrément MOA au titulaire (LRAR ou voie dématérialisée)
- **Suivi du délai de 21 jours** d'instruction (marché public) — silence = agrément tacite
- En cas de **réserves** : demander complément de dossier (URSSAF récente, caution, etc.)
- **Mise à jour du tableau de bord** sous-traitance du chantier (registre)
- **Suivi des renouvellements** URSSAF/fiscaux **tous les 6 mois**
- Coordination avec la skill `controle_situation_travaux` pour intégrer les paiements directs ST dans les situations
- Coordination avec la skill MOEX `analyse_cr_chantier` pour signalement d'éventuelles défaillances ST en exécution
- En cas de **défaillance du ST** : OS de mise en demeure (skill `rediger_os`) puis éventuelle résiliation
- Pour les **chantiers complexes** : politique standardisée du MOA — **liste des ST récurrents agréés** ("liste blanche") pour fluidifier les agréments
- En cas de **litige** : médiation puis tribunal judiciaire compétent ; **mémoire en réclamation** dans les délais CCAG (art. 50)
