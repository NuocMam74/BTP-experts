# Skill — Contrôler la sous-traitance au regard de la loi 75-1334

L'utilisateur te transmet un **contrat de sous-traitance** (privé) ou un **DC4** (public). Tu dois vérifier sa **conformité à la loi n° 75-1334 du 31 décembre 1975** relative à la sous-traitance, qui est d'**ordre public** et dont le non-respect entraîne la **nullité du contrat** et la responsabilité solidaire du donneur d'ordre.

## 1. Documents attendus

- **Contrat de sous-traitance** signé entre EP (entreprise principale) et ST (sous-traitant)
- **DC4** (déclaration de sous-traitance) — marchés publics
- **CCAP** ou **acte d'engagement** du marché principal
- **Acceptation des conditions de paiement** (signature MOA marché public)
- **Caution personnelle et solidaire** (marché privé) — émise par établissement bancaire agréé
- **Délégation de paiement** signée par le MOA (alternative à la caution en marché privé)
- **Attestations** sociales, fiscales, URSSAF du sous-traitant (obligations de vigilance — Code du travail L.8222-1 et suiv.)
- **Kbis** du sous-traitant

Si pièces partielles : demande
1. Marché **public** ou **privé** ?
2. Le sous-traitant intervient en **premier rang** (sous l'EP) ou **deuxième rang** (sous-sous-traitant) ?
3. Montant prévisionnel des travaux sous-traités ?
4. La sous-traitance porte-t-elle sur une **partie du marché** ou sur un **lot complet** ?
5. Existence d'une **caution** ou d'une **délégation de paiement** ?
6. Le **MOA** a-t-il **agréé** le sous-traitant et **accepté les conditions de paiement** ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("loi 75-1334 du 31 décembre 1975 sous-traitance texte intégral")`
- `rag_search("CCAG-Travaux article 3 sous-traitance marchés publics")`
- `rag_search("Code commande publique R.2193 sous-traitance marchés publics")`
- `rag_search("Cass. ch. mixte 18 décembre 1992 nullité ordre public sous-traitance")`
- `rag_search("Code travail L.8222-1 obligation de vigilance donneur d'ordre")`
- `rag_search("CGI article 283 nonies autoliquidation BTP")` — pour aspect fiscal

## 3. Définition juridique de la sous-traitance (loi 1975 art. 1)

> "Opération par laquelle un entrepreneur confie par un sous-traité, et sous sa responsabilité, à une autre personne appelée sous-traitant l'exécution de tout ou partie du contrat d'entreprise ou d'une partie du marché public conclu avec le maître de l'ouvrage."

Conditions cumulatives :
- **Contrat d'entreprise** (pas vente, pas prêt de main-d'œuvre, pas mandat)
- **Sous le contrôle et la responsabilité de l'EP** (qui reste responsable vis-à-vis du MOA)
- **Travail spécifique au chantier** (pas livraison de bien standard)

⚠️ **Ne sont PAS de la sous-traitance** :
- Fourniture de matériaux ou matériels (vente)
- Prêt / location de main-d'œuvre (relève du droit du travail, intérim, GE)
- Études (relève contrats prestation intellectuelle séparée, sauf incluses dans le lot)

## 4. Obligations selon nature du marché

### A — Marchés publics (loi 1975 + Code commande publique)

| Obligation | Modalité | Texte |
|---|---|---|
| **Déclaration au MOA** | DC4 + acte spécial de sous-traitance | CCP art. R.2193-1 |
| **Agrément du ST** par MOA | Décision expresse écrite | CCP art. R.2193-3 |
| **Acceptation des conditions de paiement** | Signature MOA sur DC4 | CCP art. R.2193-4 |
| **Paiement direct** par MOA au ST | Si ≥ 600 € HT et ST agréé | Loi 75-1334 art. 6 + CCP art. R.2193-10 |
| **Délégation de paiement** (alternative) | Si pas paiement direct | Pratique rare en public |
| **Caution personnelle et solidaire** | Non requise en public | Cf. paiement direct sécurise le ST |

**Procédure d'agrément** :
1. EP soumet DC4 au MOA avec joint Kbis ST, attestation TVA, conditions de paiement
2. MOA dispose de **21 jours** pour notifier une décision (par défaut = refus tacite)
3. Si agréé : ST a droit au **paiement direct** dès facturation conforme

### B — Marchés privés (loi 1975 + NF P 03-001)

| Obligation | Modalité | Texte |
|---|---|---|
| **Mention de la sous-traitance** dans contrat principal | Recommandé, pas obligatoire | Pratique |
| **Acceptation du ST et de ses conditions** par MOA | Obligatoire pour validité | Loi 75-1334 art. 3 |
| **Caution personnelle et solidaire** émise par établissement bancaire agréé | OBLIGATOIRE (sauf délégation) | Loi 75-1334 art. 14 |
| **OU délégation de paiement** signée MOA + EP + ST | Alternative à la caution | Loi 75-1334 art. 14 |
| **Action directe** du ST contre MOA en cas défaillance EP | Droit légal | Loi 75-1334 art. 12 |

**⚠️ Sanctions de la défaillance** :

> **Sans agrément** ET **sans caution** ET **sans délégation** → **contrat NUL d'ordre public** (Cass. ch. mixte 18 décembre 1992).

Conséquences pratiques de la nullité :
- L'EP doit **payer le ST** sur base de l'**enrichissement sans cause** (in solidum, valeur des travaux)
- Le MOA peut être appelé **directement** à payer si l'EP est défaillante
- L'EP peut être condamnée à **payer 2 fois** (au ST + à l'EP qui avait facturé au MOA)

## 5. Obligations de vigilance (Code du travail L.8222-1 et suivants)

Tout donneur d'ordre (EP vis-à-vis du ST) doit, pour tout contrat ≥ **5 000 € HT** :

| Pièce | Périodicité | Source |
|---|---|---|
| Attestation de vigilance URSSAF | À la conclusion et tous les 6 mois | URSSAF.fr (téléchargement par ST) |
| Justificatif Kbis ≤ 3 mois | Conclusion contrat | Greffe |
| Liste nominative travailleurs détachés (si étrangers) | À la conclusion | Sapin II + transposition |
| Attestation fiscale (régularité) | Annuelle | impots.gouv.fr |

⚠️ **Sanction** : en cas de **travail dissimulé** du ST avéré, le donneur d'ordre est **solidairement responsable** :
- Du paiement des **impôts**, **taxes**, **cotisations sociales** dus par le ST
- Des **rémunérations** dues aux salariés (Code du travail L.8222-2)
- Des **majorations et pénalités**

## 6. Procédure de contrôle

### Étape 1 — Type de marché et nature de la prestation
- Marché **public** ou **privé** ?
- Vraie sous-traitance ou fausse (location main-d'œuvre déguisée, fourniture pure) ?

### Étape 2 — Conformité formelle

**Marché public** :
- DC4 signé EP + ST + MOA ?
- Décision d'agrément MOA présente ?
- Acceptation conditions de paiement signée MOA ?
- Acte spécial de sous-traitance (si modification ultérieure) ?

**Marché privé** :
- Contrat de sous-traitance écrit ?
- Acceptation MOA (exprès ou tacite, > 3 mois) ?
- Caution personnelle et solidaire (banque agréée) **OU** délégation de paiement signée MOA ?

### Étape 3 — Cohérence économique
- Montant ST cohérent avec son **chiffre d'affaires** déclaré (Kbis, déclarations sociales) ?
- Prix unitaires conformes aux **conditions économiques** acceptées par MOA ?
- Pas de **renchérissement** caché entre EP et ST (sauf justifié) ?

### Étape 4 — Obligations de vigilance
- Attestation URSSAF ST ≤ 6 mois ?
- Kbis ST ≤ 3 mois à la conclusion ?
- Attestations fiscales annuelles ?
- Si travailleurs étrangers : déclaration détachement SIPSI ?

### Étape 5 — Aspects fiscaux
- Application correcte de l'**autoliquidation TVA** art. 283 nonies CGI ? (voir skill `controle_autoliquidation_btp`)
- TVA conforme à la nature de l'opération ?

## 7. Restitution structurée

```
## Contrôle conformité sous-traitance — [ST x Chantier]

### Identification
- **Marché principal** : [réf + MOA + EP]
- **Sous-traitant** : [nom + SIRET]
- **Nature des travaux ST** : [lot ou partie de lot]
- **Montant prévisionnel** : [€ HT]
- **Type de marché** : public / privé
- **Rang ST** : 1 (sous EP) / 2 (sous autre ST)

### Conformité loi 75-1334

#### Marché public

| Critère | Constat | Conformité |
|---|---|---|
| DC4 signé EP + ST | [oui/non] | ✅ / ❌ |
| Décision d'agrément MOA | [date / refus / tacite] | ✅ / ❌ |
| Acceptation conditions de paiement signée MOA | [oui/non] | ✅ / ❌ |
| Acte spécial pour modifications | [N.A./oui/non] | ✅ / N.A. |
| Droit au paiement direct (≥ 600 € HT, agréé) | [oui/non] | ✅ / ❌ |

#### Marché privé

| Critère | Constat | Conformité |
|---|---|---|
| Contrat de sous-traitance écrit | [oui/non] | ✅ / ❌ |
| Acceptation MOA (exprès ou tacite) | [date] | ✅ / ⚠️ |
| **Caution personnelle et solidaire** banque agréée | [oui/non + référence] | ✅ / ❌ |
| **OU** délégation de paiement signée tripartite | [oui/non] | ✅ / ❌ |
| Action directe ST contre MOA prévue (art. 12) | [oui/non] | ✅ / ⚠️ |

### Obligations de vigilance (≥ 5 000 € HT)

| Document | À jour | Conformité |
|---|---|---|
| Attestation URSSAF ST (< 6 mois) | [date] | ✅ / ❌ |
| Kbis ST (< 3 mois à conclusion) | [date] | ✅ / ❌ |
| Attestation fiscale | [date] | ✅ / ❌ |
| Liste nominative détachement (si étrangers) | [N.A./fournie] | ✅ / N.A. |

### Aspects fiscaux
- Autoliquidation BTP applicable (art. 283 nonies CGI) : ✅ / ❌
- TVA correctement appliquée par ST (HT, mention) : ✅ / ❌

### Risques identifiés

#### Risque "nullité d'ordre public" (marché privé sans agrément ET sans caution)
- **Conséquences** : EP peut devoir payer 2 fois ; MOA peut être appelé directement
- **Action** : ❌ **NE PAS DÉMARRER LES TRAVAUX** avant régularisation

#### Risque "solidarité travail dissimulé" (vigilance défaillante)
- **Conséquences** : EP solidaire des cotisations, impôts et salaires du ST
- **Action** : régulariser les attestations avant tout paiement

#### Risque "agrément refusé" (marché public, décision MOA expresse négative)
- **Conséquences** : ST ne peut intervenir, EP doit trouver un remplaçant
- **Action** : retirer le ST du chantier

### Synthèse
- **Conformité globale** : ✅ Conforme / ⚠️ À régulariser / ❌ Bloquant
- **Risque** : faible / modéré / critique
- **Action immédiate** : [...]

### Pièces à demander / régulariser
1. [...]
2. [...]
```

## 8. Garde-fous spécifiques

- La **nullité d'ordre public** (Cass. ch. mixte 18/12/1992) est une **règle dure** — pas de tolérance, pas de validation a posteriori sans correction. **N'autorise jamais** un démarrage des travaux d'un ST non conforme.
- Pour les **marchés privés**, ne te contente pas d'un agrément **tacite** sans **trace écrite** (courrier, mail) du MOA — en cas de litige, c'est l'EP qui doit prouver l'agrément.
- Une **caution personnelle et solidaire** doit être émise par un **établissement agréé** (banque, compagnie d'assurance avec agrément spécial). Une caution **fournie par une société-mère ou un dirigeant** **n'est PAS** une caution au sens de la loi 1975.
- La **délégation de paiement** doit être **tripartite** (EP + ST + MOA) et engager le MOA à payer directement le ST sur les sommes dues à l'EP. Une simple "instruction de paiement" n'est **pas** une délégation.
- Les **sous-traitants étrangers (UE ou hors UE)** sont soumis aux **mêmes obligations** + déclaration **SIPSI** pour détachement de travailleurs (loi Macron 2015, code du travail L.1262-1).
- Pour les **sous-traitants en chaîne (rang 2, 3…)** : la loi 75-1334 s'applique **identiquement** entre chaque rang. Chaque entreprise est donneur d'ordre vis-à-vis du suivant.
- En **marché public**, le **paiement direct** n'est **obligatoire** que si :
  - ST agréé par MOA
  - Montant prévisionnel **≥ 600 € HT**
  - Sous-traitance dûment déclarée par DC4
- L'**action directe** du ST contre le MOA (loi 1975 art. 12) en marché privé est un **recours subsidiaire** : ST doit d'abord avoir mis en demeure l'EP avec **délai d'1 mois**, puis peut agir contre le MOA dans la limite de ce que ce dernier doit encore à l'EP.
- Tu **n'engages pas** la responsabilité de l'expert-comptable utilisateur — tu fournis une **analyse** qu'il valide.
- Si **doute sérieux** sur la régularité : **suspendre les paiements** au ST en attendant régularisation (préserve les recours).

## 9. Suites logiques à proposer

- Skill `controle_autoliquidation_btp` pour vérifier l'aspect TVA des factures ST
- Demande au **service juridique** ou à un **avocat spécialisé** si nullité d'ordre public en jeu (action conservatoire éventuelle)
- Mise en place d'un **registre des sous-traitants** (date d'agrément, montant, caution / délégation, vigilance URSSAF) pour tout cabinet ou entreprise
- Pour les **groupes** : politique interne d'**onboarding sous-traitant** standardisée (check-list, modèles de contrat, suivi automatique des renouvellements d'attestation)
- Coordination avec le **CAC** sur les engagements hors bilan (cautions données) et provisions pour litiges sous-traitance
- En cas de **litige avéré**, mémoire en réclamation à formaliser auprès du MOA dans les **délais CCAG-Travaux art. 50** (45 jours)
- Pour les **chantiers à risque** (gros volume sous-traitance, ST nouveaux) : visite terrain + contrôle CSPS + vérification déclaration préalable d'embauche
