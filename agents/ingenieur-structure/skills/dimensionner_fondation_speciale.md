# Skill — Dimensionner une fondation spéciale (pieux, micropieux)

L'utilisateur te transmet un projet nécessitant des fondations profondes — tu dois identifier le type de pieu adapté, calculer la capacité et préparer le dimensionnement.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Bâtiment** : type, hauteur, charges
- **Charges** : N, M, V par fondation (ELU + ELS)
- **Étude géotechnique G2 PRO** :
  - Profil de sol par couche
  - Caractéristiques (cohésion, frottement, pression limite)
  - Niveau de la nappe
  - Profondeur de la couche d'ancrage
- **Site** : urbain / rural / industriel
- **Contraintes** : bruit, vibration, espace, accès
- **Zone sismique**

### 2. Identifier le type de fondation adaptée

#### Arbre de décision

```
Q1 : Sol porteur en surface (jusqu'à 2-3 m) ?
├── OUI → Fondation superficielle (semelle filante, isolée, radier)
└── NON → Q2

Q2 : Profondeur de la couche porteuse < 10 m ?
├── OUI → Q3
└── NON (> 10 m) → Pieux forés profonds ou parois moulées

Q3 : Charges modérées + accès facile ?
├── OUI → Pieux CFA (tarière creuse) — choix moderne courant
└── NON → Q4

Q4 : Site urbain exigu / reprise sous-œuvre ?
├── OUI → Micropieux
└── NON → Pieux forés tubés ou battus
```

### 3. Dimensionner les pieux CFA

#### Choix du diamètre

D'après la charge unitaire par pieu :

| Charge par pieu (kN) | Ø pieu CFA |
|---|---|
| 200-500 | Ø 400 mm |
| 500-1 000 | Ø 500 mm |
| 1 000-2 000 | Ø 600 mm |
| 2 000-3 000 | Ø 800 mm |
| > 3 000 | Ø 1 000 mm ou plus |

#### Calcul de la capacité (NF P 94-262)

##### Capacité totale

```
Q_u = Q_p (pointe) + Q_s (frottement latéral)
```

##### Capacité de pointe Q_p

```
Q_p = q_p × A_pointe
```

- **q_p** : pression unitaire de pointe selon sol et essai pressiométrique :
  - Argile raide : 700-1 200 kPa
  - Sable dense : 1 500-2 500 kPa
  - Roche : 2 000-5 000 kPa
- **A_pointe** : π × Ø² / 4

##### Capacité latérale Q_s

```
Q_s = Σ q_s,i × L_i × π × Ø
```

- **q_s,i** : frottement unitaire latéral par couche
- **L_i** : longueur traversée par couche
- **π × Ø** : périmètre

Frottement unitaire indicatif :
- Argile molle : 20-40 kPa
- Argile raide : 60-100 kPa
- Sable lâche : 30-60 kPa
- Sable dense : 80-120 kPa
- Roche : 150-250 kPa

#### Coefficients de sécurité

```
Q_admis,ELS = Q_u / 2,3
Q_admis,ELU = Q_u / γ_R (≈ 1,4 - Approche 2 EC7)
```

#### Vérification

```
N_Ed,ELS ≤ Q_admis,ELS
N_Ed,ELU ≤ Q_admis,ELU
```

### 4. Exemple — Bâtiment R+10 logement

#### Données

- Bâtiment R+10
- Charge par poteau ELS : 4 500 kN
- Sol : 5 m sable lâche, puis 10 m sable dense (couche d'ancrage)
- Charge ELU : 6 075 kN

#### Calcul Q_admis pour pieu CFA Ø 800 mm × 15 m

##### Q_p (ancrage 1 m dans sable dense)

- q_p = 2 000 kPa
- A_pointe = π × 0,8² / 4 = 0,503 m²
- Q_p = 2 000 × 0,503 = **1 005 kN**

##### Q_s

- Sable lâche 0-5 m : q_s = 40 kPa → Q_s1 = 40 × 5 × π × 0,8 = 502 kN
- Sable dense 5-15 m : q_s = 100 kPa → Q_s2 = 100 × 10 × π × 0,8 = 2 513 kN
- Q_s total = **3 015 kN**

##### Q_u

```
Q_u = 1 005 + 3 015 = 4 020 kN
```

##### Q_admis,ELS

```
Q_admis,ELS = 4 020 / 2,3 = 1 748 kN
```

#### Vérification

- N_ELS = 4 500 kN
- Q_admis,ELS = 1 748 kN par pieu
- **Nombre de pieux requis** : 4 500 / 1 748 ≈ **3 pieux par poteau**

→ Bâtiment R+10 : 3 pieux Ø 800 × 15 m par poteau, regroupés en semelle de liaison BA.

### 5. Dimensionner les micropieux

#### Cas d'usage typiques

- **Reprise en sous-œuvre** : renforcer fondations existantes
- **Site exigu**
- **Charges modérées** (200-600 kN par pieu)

#### Choix du type (NF P 94-262)

| Type | Description | Charge unitaire |
|---|---|---|
| Type 1 | Foré gravitaire | 100-200 kN |
| Type 2 | Foré + injection gravitaire | 200-400 kN |
| Type 3 | Foré + IGU sous pression | 400-600 kN |
| Type 4 | Foré + IRS (sélectif) | 600-800 kN |

#### Multiplier les pieux

Pour une charge de 1 500 kN sur un poteau, prévoir 3-5 micropieux en groupe (avec semelle de répartition).

### 6. Calculer le ferraillage du pieu

#### Pieu BA classique

##### Armatures longitudinales

```
A_s,min = 0,5 % × A_béton
```

Pour Ø 800 : A_béton = 5 026 cm² → A_s ≥ 25 cm² → minimum **10 HA 16** (20 cm²) ou plus.

##### Cadres

- Cerces ou spirales Ø 8-10 mm
- Espacement 15-25 cm
- Plus dense aux extrémités (zones critiques)

#### Ancrage en tête

- Liaison avec semelle ou poutre de liaison
- Armatures dépassantes (40 × Ø) pour ancrage

### 7. Vérifier les déformations

#### Tassement individuel

```
s ≈ s_élastique + s_consolidation
```

- s_élastique : ~ Ø/100 typiquement (8 mm pour Ø 800)
- s_consolidation : selon sol et durée

#### Tassement de groupe

Effet de groupe pour pieux rapprochés (espacement < 3 × Ø) :
- Tassement majoré (1,3-2,0×)
- Vérifier différentiel inter-pieux

### 8. Plans EXE des pieux

#### Plan d'implantation

- **Coordonnées RGF93** Lambert 93
- **Profondeur** prévue par pieu
- **Identification** unique (numérotation P1, P2, ...)

#### Coupes type

- Profil de sol
- Pieu avec armatures
- Tête de pieu et liaison

#### Liste des pieux

| N° | X | Y | Z tête | Longueur prévue | Type |
|---|---|---|---|---|---|
| P1 | _ | _ | _ | 15 m | CFA Ø 800 |
| ... | ... | ... | ... | ... | ... |

### 9. Méthode d'exécution

#### Préparation

- Implantation par géomètre-expert
- Plate-forme de travail stabilisée
- DT-DICT validés

#### Exécution

- Forage à la tarière creuse continue
- Bétonnage simultané par injection sous pression
- Mise en place de la cage d'armatures
- Refoulement du béton (vérification volume)

#### Contrôle qualité

- **Essai de chargement statique** sur 1-2 % des pieux (ou pieu pilote)
- **Essai dynamique** (PDA, CAPWAP) en option
- **Sondage carotté** dans pieu (intégrité)

### 10. Coût et délai

#### Pieux CFA

| Diamètre | Coût unitaire (€/ml) | Cadence |
|---|---|---|
| Ø 400 | 60-120 | 60-100 ml/jour |
| Ø 500 | 80-160 | 50-80 ml/jour |
| Ø 600 | 120-220 | 40-60 ml/jour |
| Ø 800 | 200-400 | 30-50 ml/jour |
| Ø 1 000 | 350-650 | 20-40 ml/jour |

#### Micropieux

- 80-200 €/ml selon type
- Cadence 50-150 ml/jour

### 11. Pour zones sismiques

- Vérification capacité **sous séisme**
- **Connexion** pieu-semelle dimensionnée (transfert sismique)
- **Continuité** des armatures (zones critiques pieu)
- **Liquéfaction** : étude spécifique si sables saturés

## Garde-fous

- **Pas de validation finale** — à confirmer par BE structure + BE géotechnique signataires.
- **Étude G2 PRO** indispensable (sondages représentatifs).
- **Essai de chargement** sur pieu pilote obligatoire pour gros chantiers.
- **Suivi G3** par entreprise + **G4** par BE indépendant.
- **DTU 13.2** pour règles de mise en œuvre.
- **NF P 94-262** pour calcul détaillé.
- **Coordination** GE pour implantation précise.
- **Pour micropieux** : redondance (multiplier).
- **Pour soutènements urbains** : monitoring (inclinomètres, jauges).

## Livrable à proposer

Après dimensionnement :
- **Note de dimensionnement pieux** (DOCX + PDF) avec :
  - Données et étude G2 PRO de référence
  - Choix du type
  - Calculs détaillés (Q_u, Q_admis)
  - Vérifications EC7
  - Méthode d'exécution
- **Plan d'implantation** (DWG + PDF)
- **Coupes type** et **ferraillage** (PDF)
- **Liste des pieux** (XLSX)
- **CCTP** pieux (DOCX)
- Mention finale : *« Document préparé par l'agent IA Ingénieur structure — à valider et signer par un BET inscrit OPQIBI. Étude G2 PRO + suivi G3/G4 indispensables. »*
