# Pièces du marché, hiérarchie et formes de marché (CCP)

**Source :** Code de la commande publique (CCP) — partie législative (L.) et réglementaire (R.) ; CCAG-Travaux 2021 (arrêté du 30 mars 2021) ; NF P 03-001 (marchés privés). Legifrance — textes officiels du domaine public.

## 1. Les pièces constitutives du marché

Un marché de travaux est constitué de **pièces particulières** (propres au marché) et de **pièces générales** (documents-types). En cas de contradiction, l'ordre de priorité est fixé par l'**acte d'engagement** (ou le CCAP).

### Pièces particulières

| Pièce | Sigle | Rôle |
|---|---|---|
| **Acte d'engagement** | AE / ATTRI1 | Engagement signé du titulaire (offre, montant, délais) — pièce maîtresse |
| **Cahier des Clauses Administratives Particulières** | **CCAP** | Clauses administratives propres au marché (prix, délais, pénalités, avances, retenue, révision, sous-traitance) |
| **Cahier des Clauses Techniques Particulières** | **CCTP** | Prescriptions techniques par lot (matériaux, mise en œuvre, performances) |
| **Bordereau des Prix Unitaires** | **BPU** | Prix unitaires par poste (marché à prix unitaires) |
| **Décomposition du Prix Global et Forfaitaire** | **DPGF** | Décomposition d'un prix forfaitaire (marché à prix global et forfaitaire) |
| **Détail Quantitatif Estimatif** | **DQE** | Quantités estimatives × PU (sert au jugement des offres, non contractuel sauf mention) |
| **Calendrier d'exécution / planning** | — | Phasage prévisionnel |
| **Plans et notes** (ESQ→PRO) | — | Pièces graphiques et techniques |

### Pièces générales

| Pièce | Rôle |
|---|---|
| **CCAG-Travaux 2021** (arrêté 30/03/2021) | Clauses administratives générales — s'applique si le marché s'y réfère |
| **CCTG** (fascicules) | Clauses techniques générales (TP notamment) |
| **Normes NF DTU** | Règles de l'art (cf. fiche `dtu_principaux_par_lot.md`) |

> **Le CCAG ne s'applique que si le marché le vise** (L.2112-2 / R.2112-2 CCP). À défaut, le marché est régi par ses seules pièces particulières.

## 2. Hiérarchie des pièces (ordre de priorité)

L'ordre de priorité usuel, **fixé par l'acte d'engagement ou le CCAP** (et que le CCAG-Travaux propose à titre supplétif), est :

1. **Acte d'engagement** (AE) et ses annexes
2. **CCAP** (et cahier des clauses administratives exceptionnelles éventuel)
3. **CCTP** (et ses annexes)
4. **BPU / DPGF / DQE** (pièces financières)
5. **CCAG-Travaux**
6. **CCTG / fascicules**
7. **Normes (NF DTU), pièces graphiques, autres**

> ⚠️ Principe MOEX : **en cas de contradiction entre pièces, la pièce de rang supérieur prévaut**. Mais une **contradiction CCTP / plans / DPGF** sur un même ouvrage est une **anomalie du DCE** à signaler (cf. skill `controle_coherence_dce`) — ne jamais l'« interpréter » seul.

## 3. Formes de marché (CCP)

### Marché ordinaire (à prix forfaitaire ou à prix unitaires)

- **Prix global et forfaitaire** : un prix ferme pour un ouvrage défini ; décomposé par la **DPGF**.
- **Prix unitaires** : règlement aux quantités réellement exécutées × **BPU**.
- **Prix mixte** : combinaison des deux selon les postes.

### Accord-cadre (L.2125-1 / R.2162-1 et s. CCP)

Contrat fixant les règles applicables à des marchés/bons ultérieurs sur une période. Deux modalités :

| Type | Exécution | Référence |
|---|---|---|
| **À bons de commande** | Émission de **bons de commande** au fil de l'eau (prix au BPU, sans remise en concurrence) | R.2162-13 et s. |
| **À marchés subséquents** | **Marchés subséquents** conclus après remise en concurrence des titulaires de l'accord-cadre | R.2162-7 et s. |

- Possibilité de **minimum / maximum** (en montant ou quantité), ou sans maximum sous conditions.
- Durée en principe limitée (souvent **4 ans**, sauf cas justifiés) *(à revérifier à la date de consultation)*.

### Marché à tranches (ferme + optionnelles) (R.2113-4 à R.2113-6 CCP)

- **Tranche ferme** : exécutée d'office.
- **Tranches optionnelles** (anciennement « conditionnelles ») : **affermies** par décision (OS d'affermissement) ; indemnité de **dédit** et de **attente** possibles si prévues au marché.
- Utile quand le financement ou le besoin de phases ultérieures est incertain.

### Marché de conception-réalisation (R.2171-1 et s. CCP)

- Confie à un **groupement** à la fois les **études** et l'**exécution** des travaux.
- Dérogation à la **séparation conception/réalisation** (principe loi MOP / L.2431-1 CCP), admise pour **motifs techniques** ou d'**engagement de performance** rendant nécessaire l'association de l'entrepreneur aux études.
- Jury et remise de **prestations** (esquisse/APS) dans la procédure.

### Marché global de performance (L.2171-3 CCP)

- Associe **conception/réalisation et/ou exploitation-maintenance** à des **engagements de performance mesurables** (consommation énergétique, niveau de service, qualité d'usage).
- Le titulaire est tenu par des **objectifs chiffrés** vérifiés dans la durée.

### Marché de partenariat / marché global sectoriel

- **Marché de partenariat** (L.2211-1 et s.) : montage global (conception, réalisation, financement, exploitation) — régime spécifique, hors champ courant du MOEX en mission DET/AOR.

## 4. Allotissement (L.2113-10 et s. CCP)

- **Principe : obligation d'allotir** les marchés (favoriser l'accès des PME) — L.2113-10.
- **Dérogation possible** (marché global non alloti) si l'allotissement :
  - rend **techniquement difficile** ou **financièrement plus coûteuse** l'exécution, **ou**
  - le pouvoir adjudicateur n'est pas en mesure d'assurer lui-même les **missions d'organisation, de pilotage et de coordination** (motivation obligatoire — L.2113-11).
- **Conséquence MOEX** : en marché alloti, un **titulaire par lot**, des **OPR et réceptions lot par lot**, un **OPC** indispensable pour coordonner les interfaces, et un **compte prorota** pour les dépenses communes (cf. fiche `compte_prorata_chantier.md`).

## 5. Avances (R.2191-1 et s. CCP)

- **Avance forfaitaire** : **due de droit** au titulaire (sauf renonciation) lorsque le **montant** du marché (ou de la tranche/bon) **dépasse le seuil** réglementaire **ET** le **délai d'exécution dépasse 2 mois**.
- **Taux minimal** de l'avance et **seuils** : fixés par voie réglementaire *(barèmes datés — à revérifier à la date de consultation : R.2191-3 et s. ; taux minimal et seuils relevés selon la nature de l'acheteur et la taille de l'entreprise)*.
- **Garantie** : l'avance peut être subordonnée à une **garantie à première demande** (R.2191-7).
- **Remboursement** : par **précompte** sur les acomptes ; à défaut de clause, débute à **65 %** et s'achève à **80 %** d'exécution du montant du marché *(seuils réglementaires — à revérifier)*.
- Cf. skill `controle_situation_travaux` (contrôle de l'avance et de son remboursement dans les situations).

## 6. Groupement / cotraitance (R.2142-19 et s. CCP)

Plusieurs entreprises se **groupent** pour candidater/exécuter ensemble. Deux formes :

| Forme | Engagement | Risque |
|---|---|---|
| **Groupement conjoint** | Chaque cotraitant n'est engagé que pour **le ou les lots / prestations qui le concernent** | Le **mandataire** coordonne ; en cas de défaillance d'un membre, les autres ne sont pas tenus de sa part (sauf mandataire solidaire) |
| **Groupement solidaire** | **Chaque membre est engagé pour la totalité** du marché | Tout membre peut être appelé à exécuter / payer la totalité — sécurité maximale pour le MOA |

- **Mandataire commun** : représente le groupement vis-à-vis du MOA, transmet les situations, reçoit les OS.
- Le **mandataire d'un groupement conjoint peut être solidaire** des autres membres si le marché le prévoit.
- **À ne pas confondre avec la sous-traitance** (loi 75-1334) : la cotraitance est un **engagement direct** de chaque cotraitant envers le MOA ; la sous-traitance est un contrat **entre le titulaire et son ST** (cf. fiche `sous_traitance_loi_1975.md`).

## 7. Points de vigilance MOEX

- Vérifier que le **CCAG est bien visé** au CCAP avant de citer un article du CCAG.
- Identifier la **forme du marché** dès la prise en main : elle conditionne le mode de **règlement** (forfait/unitaire), l'**affermissement** des tranches, l'émission des **bons de commande** ou **marchés subséquents**.
- En **conception-réalisation** / **marché global de performance** : la mission **VISA/EXE** et les **engagements de performance** structurent tout le suivi (cf. fiche `missions_moe_loi_mop_visa_exe.md`).
- En marché **alloti** : anticiper l'**OPC**, les **interfaces inter-lots**, le **compte prorata** et les **réceptions par lot**.
- Toujours rappeler la **hiérarchie des pièces** lorsqu'une contradiction est invoquée par un titulaire.

## Citations à utiliser

- CCP : L.2112-2, R.2112-2 (pièces / référence au CCAG) ; L.2113-10 et L.2113-11 (allotissement) ; R.2113-4 à R.2113-6 (tranches) ; L.2125-1, R.2162-1 et s. (accords-cadres : bons de commande / marchés subséquents) ; R.2171-1 et s. (conception-réalisation) ; L.2171-3 (marché global de performance) ; L.2431-1 (loi MOP — séparation conception/réalisation) ; R.2142-19 et s. (groupements) ; R.2191-1 et s. (avances)
- CCAG-Travaux 2021 (arrêté 30/03/2021) — ordre de priorité des pièces, exécution
- NF P 03-001 (marchés privés) — pièces et hiérarchie en marché privé
- Loi 75-1334 (sous-traitance — à distinguer de la cotraitance)

**Référence à citer :** Code de la commande publique (L. et R. cités) + CCAG-Travaux 2021. Sources : Legifrance.
