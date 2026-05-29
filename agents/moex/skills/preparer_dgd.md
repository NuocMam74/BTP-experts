# Skill — Préparer un Décompte Général et Définitif (DGD)

L'utilisateur te transmet un marché de travaux en cours de clôture (situations cumulées, avenants, indemnités, retenues) — tu dois préparer un DGD conforme au CCAG-Travaux art. 13.

## Procédure attendue

### 1. Identifier le marché

Demande (si absent) :
- **Référence du marché** (n°, date, MOA, MOE, titulaire)
- **Lot** concerné
- **Montant initial HT** + variantes attribuées
- **Avenants** signés (n°, date, montant en plus/moins)
- **Situations payées** depuis le début (cumul HT)
- **Retenue de garantie** prélevée (5 % par défaut) ou caution substituée
- **Date de réception** des travaux
- **Levée des réserves** (état)
- **Pénalités** appliquées (intempéries au-delà des jours décomptés, retard, défauts)

### 2. Décomposer le DGD selon CCAG art. 13

Structure obligatoire :

#### A. Montant du marché contractuel

```
Marché initial (HT)                          M₀
+ Avenants n° 1, 2, …                       ± Σ A_i
= Marché contractuel cumulé (HT)             M_c
```

#### B. Travaux exécutés (DPGF révisée)

```
Travaux exécutés réels (HT base offre)       T_e
+ Révision de prix (formule CCAP)           + R
+ Sujétions imprévues (art. 14 CCAG)        + I_s
+ Travaux supplémentaires (OS)              + T_s
+ Indemnités diverses (allongement, etc.)    + I_d
- Travaux non exécutés / supprimés           - T_n
= Total travaux exécutés                     T_total
```

#### C. Calcul du DGD HT

```
T_total                                       T_total
- Acomptes versés (situations payées)        - Σ A_versés
- Retenues définitives (pénalités, défauts)  - P
= Solde DGD HT                                S_HT
```

#### D. TVA et solde TTC

```
S_HT × taux TVA (20 % par défaut, 10 % rénovation > 2 ans, 5,5 % rénovation énergétique éligible)
= TVA                                          TVA
+ S_HT                                         S_HT
= Solde DGD TTC                                S_TTC
```

#### E. Restitution de la retenue de garantie

```
Retenue de garantie prélevée (5 %)            RG
- Imputation pour défauts non levés (si applicable)
= Solde RG à restituer
                                              → restitution après expiration GPA (1 an)
```

### 3. Production du tableau récapitulatif

Modèle Excel multi-onglets :

#### Onglet 1 — Synthèse

| Poste | Montant HT | Référence |
|---|---|---|
| Marché initial | M₀ | Acte d'engagement |
| Avenant n° 1 | + A1 | Date / objet |
| Avenant n° 2 | + A2 | Date / objet |
| Marché contractuel cumulé | M_c | |
| Travaux exécutés HT (offre) | T_e | DPGF cumul |
| Révision de prix | + R | Formule CCAP |
| OS de TS | + T_s | Liste OS |
| Indemnités | + I_d | Motifs |
| Travaux non exécutés | - T_n | Liste |
| Total travaux exécutés HT | T_total | |
| Acomptes versés HT | - Σ A | Situations 1 à N |
| Pénalités | - P | Détail pénalités |
| Solde DGD HT | S_HT | |
| TVA | + TVA | Taux applicable |
| **Solde DGD TTC** | **S_TTC** | **À payer (+) ou à rembourser (-)** |

#### Onglet 2 — Détail révision

Calcul par période :
- Index BT/TP utilisés (mois de référence M0 + mois exécution M_n)
- Coefficient de révision
- Application au cumul de chaque période

#### Onglet 3 — OS de TS / sujétions

Liste détaillée :
- N° OS, date, objet
- Montant HT
- Validation MOA

#### Onglet 4 — Pénalités

Décompte précis :
- Pénalités de retard (jours × 1/3000 du marché par jour, ou clause CCAP)
- Pénalités d'intempéries au-delà des jours pré-décomptés
- Pénalités diverses

### 4. Procédure CCAG art. 13

Le DGD doit être :
- **Transmis** au titulaire par le MOE
- **Visé** par le MOA
- **Notifié** au titulaire (avec accusé de réception)
- Le titulaire dispose de **30 jours** pour :
  - **Accepter** (signature du DGD)
  - **Contester** par mémoire en réclamation (art. 50 CCAG)
  - **Garder le silence** → DGD réputé accepté

### 5. Si réclamations

Indiquer dans le DGD :
- Les **réserves** du titulaire mentionnées dans son décompte définitif
- La position du MOE / MOA sur chaque réserve
- Les **provisions** éventuelles en attente d'instruction

## Garde-fous

- **Délai global de paiement (DGP)** : 30 jours (État/EPS), 50 jours (EPS sanitaire), 60 jours (entreprises publiques) — art. R.2192-10 CCP. Intérêts moratoires automatiques si retard.
- **Retenue de garantie** non restituée tant que GPA non expirée + réserves non levées.
- **DOE et DIUO** à exiger comme condition de signature du DGD (clause CCAP recommandée).
- En cas de **liquidation judiciaire** du titulaire : DGD à transmettre au mandataire + déclaration de créance dans les délais légaux.

## Livrable à proposer

Après calcul, propose un **DGD format XLSX** complet (4 onglets ci-dessus) + **note de présentation DOCX** :
- Synthèse pour signature
- Tableau récapitulatif
- Notes méthodologiques
- Mention finale : *« Document préparé par l'agent IA MOEX — à viser par le maître d'œuvre et notifier au titulaire par voie recommandée. »*
