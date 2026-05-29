# Skill — Calculer et notifier des pénalités de retard

L'utilisateur te transmet un marché en retard d'exécution — tu dois calculer les pénalités de retard conformes au CCAG et préparer la notification au titulaire.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Référence du marché** (n°, date, MOA, titulaire, montant HT initial)
- **Régime** : marché public (CCAG-Travaux) ou privé (NF P 03-001)
- **Date contractuelle initiale d'achèvement**
- **Avenants** prorogeant le délai (montant et date de chaque prorogation)
- **Date réelle d'achèvement** (date du PV d'OPR ou date de fin réelle des travaux)
- **CCAP** : taux des pénalités, plafond, modalités particulières

### 2. Identifier la formule applicable

#### A. Marché public — CCAG-Travaux 2021 art. 20.1

À défaut de stipulation contraire au CCAP :
```
Pénalité journalière = Valeur des travaux × 1 / 3 000
```

#### B. CCAP modulé

Si le CCAP prévoit :
- **Pénalité par lot** : `Pénalité = Valeur du lot × 1 / 3 000`
- **Pénalité majorée** : `Pénalité = Valeur × 2 / 3 000` (cas exceptionnel)
- **Pénalité à barème fixe** : `Pénalité = X € / jour`
- **Pénalité progressive** : 1/3 000 les 30 premiers jours, puis 1/1 500

#### C. Marché privé (NF P 03-001 art. 11)

- Pénalités prévues au CCAP, sinon référence à l'usage de la profession
- En pratique, formule similaire CCAG (1/3 000)

### 3. Calculer la date contractuelle finale

```
Date contractuelle finale = Date initiale + Σ prorogations accordées
```

#### Prorogations à prendre en compte

| Cause | Référence | Documentation |
|---|---|---|
| **Intempéries hors forfait** | CCAG 19.2.2 | Relevés Météo-France + PV chantier |
| **Carence MOA** (plans, accès, paiements) | Responsabilité contractuelle | Courriers, OS |
| **Travaux supplémentaires** | art. 14 + 19 | Avenants, OS de TS |
| **Force majeure** | Jurisprudence | PV événement |
| **Carence d'autres lots** | Interfaces | PV chantier |

#### Si le CCAP est silencieux sur certaines prorogations

- **Examiner** la jurisprudence (CE 13 oct. 1995, etc.)
- **Examiner** les courriers échangés (réserves du titulaire)
- En cas de doute : pencher pour la prorogation (jurisprudence favorable au titulaire en cas d'ambiguïté)

### 4. Calculer le retard

```
Retard (jours) = Date PV d'OPR - Date contractuelle finale
```

#### Précision

- **Jours calendaires** par défaut (CCAG art. 19.1)
- **Jours ouvrables** uniquement si le CCAP le prévoit
- **Comptage à compter du lendemain** de la date contractuelle

#### Exemple

- Date initiale : 30 juin 2024
- Avenant n°1 : +30 jours (30 juill. 2024)
- Intempéries hors forfait : +12 jours (11 août 2024)
- TS : +20 jours (31 août 2024)
- **Date contractuelle finale** : **31 août 2024**
- Date PV d'OPR : **15 octobre 2024**
- **Retard** = 45 jours

### 5. Calculer les pénalités

```
Pénalité par jour = Valeur marché HT × Taux unitaire
Total pénalités = Pénalité par jour × Retard
```

#### Exemple (marché 1 200 000 € HT, 1/3 000 par défaut, retard 45 j)

- Pénalité/jour = 1 200 000 / 3 000 = **400 €**
- Total = 400 × 45 = **18 000 €**

### 6. Vérifier le plafond

#### Plafond CCAG par défaut

```
Plafond = 10 % du marché HT
```

#### Application

- Si **total pénalités > plafond** : appliquer le plafond
- **Notifier** la cause du plafonnement
- **MOA conserve** le droit de :
  - Résilier le marché pour faute (art. 46)
  - Demander indemnité complémentaire si préjudice prouvé > plafond

#### Exemple

Marché 1,2 M€ HT → plafond = 120 000 €.
Total calculé = 18 000 € → en-dessous du plafond, pénalités appliquées intégralement.

### 7. Vérifier les exonérations possibles

Avant d'appliquer les pénalités, examiner si le titulaire peut être exonéré :

#### A. Carence du MOA (CCAG 19.2)

- Plans EXE en retard ?
- Modifications de programme en cours d'exécution ?
- Retard de paiement (art. L.2192-13 CCP) ?
- Accès chantier non livré ?

#### B. Intempéries (CCAG 19.2.2)

- Forfait pré-décompté au CCAP respecté ?
- Si dépassement justifié → prolongation accordée

#### C. Force majeure

- Catastrophes naturelles (tempêtes Klaus, Xynthia, Alex)
- Crise sanitaire COVID-19 (ordonnance 2020-319)
- Inondations centennales

#### D. Sujétions imprévues (art. 14 CCAG)

- Si sol bouleversant l'économie → allongement justifié

→ **Si oui à l'une de ces causes** : prorogation à recalculer, pénalités à recalculer.

### 8. Préparer la notification

#### Forme

- **LRAR** au titulaire
- Adressée à l'**adresse du marché** (siège ou domicile élu)

#### Contenu

```
[Identité MOA]                                      [Date]

[Identité titulaire]
[Adresse]

LRAR n° xxxx

Objet : Notification de pénalités de retard
       Marché n° xxxx

Madame, Monsieur,

Nous vous notifions par la présente l'application de pénalités de
retard relatives au marché cité en référence.

1. Date contractuelle d'achèvement (initiale + prorogations) :
   __________________

2. Date d'achèvement réel constatée au PV d'OPR du __________ :
   __________________

3. Nombre de jours de retard imputable :
   ____ jours

4. Formule applicable (CCAP art. ___) :
   Pénalité journalière = Valeur travaux × 1/3 000 = ___ €

5. Total des pénalités :
   ____ €  HT

Ce montant sera imputé sur :
   [ ] Les acomptes en cours
   [ ] La retenue de garantie
   [ ] Le solde du marché

Vous disposez d'un délai de 45 jours pour formuler vos observations
écrites par mémoire en réclamation art. 50 du CCAG, à défaut de
quoi cette décision sera considérée comme acceptée.

Veuillez agréer, Madame, Monsieur, l'expression de nos salutations
distinguées.

[Signature MOA]
```

### 9. Imputation

Les pénalités peuvent être imputées sur :

| Source | Modalité |
|---|---|
| **Acomptes en cours** | Retenue sur le prochain paiement |
| **Retenue de garantie** | Imputation contre la retenue 5 % |
| **Solde du marché** | Déduction sur le DGD |
| **Caution** (si retenue substituée) | Appel à la caution si pas d'autre source |

### 10. Anticiper les contestations

#### Recevabilité

Le titulaire peut contester par **mémoire en réclamation art. 50** dans les **45 jours** :
- Sur le **fondement** : retard non imputable
- Sur le **calcul** : taux ou montant erroné
- Sur le **plafond** : dépassement

#### Préparation

- **Documenter** chaque jour de retard avec PV de chantier
- **Conserver** les courriers et OS
- **Réserver les preuves** de carence du titulaire (rapports MOE, photos)
- **Anticiper** les arguments du titulaire

### 11. Calcul des intérêts moratoires (côté titulaire)

Si le MOA est en retard de paiement, le titulaire peut réclamer :

```
Intérêts moratoires = Montant non payé × Taux directeur BCE + 8 points × Nombre de jours / 365
+ Indemnité forfaitaire 40 € par facture
```

→ **À ne pas confondre** avec les pénalités de retard du titulaire.

## Garde-fous

- **Vérifier les prorogations** avant d'appliquer les pénalités (la jurisprudence est favorable au titulaire en cas d'ambiguïté).
- **Pas de pénalités** sans mise en demeure préalable si le CCAP l'exige (CCAG-Travaux art. 20 n'exige pas de mise en demeure, mais certains CCAP oui).
- **Plafond** à respecter — au-delà : résiliation possible ou indemnisation par contentieux.
- **Notification motivée** indispensable — sinon contestation possible pour vice de forme.
- **Conserver** les pièces du dossier pendant 5 ans (prescription).
- **Recours du titulaire** : 45 jours pour mémoire en réclamation, puis 6 mois pour saisir TA.

## Livrable à proposer

Après calcul, propose un **dossier de pénalités** :
- **Lettre de notification LRAR** au titulaire (DOCX)
- **Tableau de calcul détaillé** (XLSX) avec :
  - Date initiale, prorogations, date finale
  - Date PV d'OPR
  - Jours de retard
  - Formule applicable (CCAP)
  - Calcul de la pénalité journalière
  - Total pénalités
  - Plafond et application
- **Note de motivation** (DOCX) expliquant les calculs
- **Annexes** : copies PV d'OPR, OS, avenants, relevés intempéries (le cas échéant)
- Mention finale : *« Document préparé par l'agent IA MOEX — à valider par le maître d'œuvre et le maître d'ouvrage avant notification au titulaire. »*
