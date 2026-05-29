# Skill — Vérifier les combinaisons d'actions Eurocode

L'utilisateur te transmet une note de calcul, un projet ou une description d'élément structural — tu dois vérifier que les **combinaisons d'actions** sont correctes selon EN 1990 et EN 1991.

## Procédure attendue

### 1. Identifier l'ouvrage et son contexte

Demande (si absent) :
- **Usage** du bâtiment : logement (cat A), bureau (B), réunion (C), commerce (D), stockage (E), parking (F/G), toiture (H/I)
- **Zone géographique** : zone climatique vent (1 à 5), zone neige (A1 à E), zone sismique (1 à 5), altitude
- **Hauteur** du bâtiment et **catégorie de terrain** (0 à IV)
- **Élément** vérifié (poutre, poteau, voile, dalle, fondation)
- **Combinaisons** déjà identifiées dans la note de calcul

### 2. Recenser les actions

| Type | Action | Référence | Valeur caractéristique |
|---|---|---|---|
| **Permanente** | Poids propre | EC1-1-1 § 5 + Tab. AN | G_k = γ × V |
| Permanente | Charges fixes (équipements) | EC1-1-1 § 6.1 | G_k |
| **Variable usage** | Charge d'exploitation | EC1-1-1 Tab. 6.1 + AN | Q_k (selon catégorie) |
| Variable atmosphérique | Neige | EC1-1-3 + AN | s = µ × C_e × C_t × s_k |
| Variable atmosphérique | Vent | EC1-1-4 + AN | q_p(z) × c_pe |
| Variable thermique | Température | EC1-1-5 + AN | ΔT |
| **Accidentelle** | Choc, explosion, incendie | EC1-1-7 | A_d |
| **Sismique** | Séisme | EC8 + arrêté 22.10.2010 | A_Ed |

### 3. Lister les combinaisons applicables

#### A. ELU — Combinaison fondamentale

```
1,35 × G_k + 1,5 × Q_k,1 + Σ 1,5 × ψ_0,i × Q_k,i
```

Pour chaque action variable, **2 cas** à tester :
- Q_1 = action prépondérante, autres avec ψ_0
- Tester avec chaque action variable comme prépondérante (Q_exploitation, neige, vent, thermique)

#### B. ELU — Combinaison accidentelle (si pertinente)

```
G_k + A_d + ψ_1 × Q_k,1 + Σ ψ_2,i × Q_k,i
```

#### C. ELU — Combinaison sismique (si zone sismique 2-5)

```
G_k + A_Ed + Σ ψ_2,i × Q_k,i
```

#### D. ELS — Combinaisons

| Combinaison | Formule | Usage |
|---|---|---|
| **Caractéristique** (rare) | G_k + Q_k,1 + Σ ψ_0,i × Q_k,i | Fissuration (béton précontraint), états irréversibles |
| **Fréquente** | G_k + ψ_1 × Q_k,1 + Σ ψ_2,i × Q_k,i | Confort vibratoire, flèches |
| **Quasi-permanente** | G_k + Σ ψ_2,i × Q_k,i | Déformations à long terme, fluage |

### 4. Vérifier les coefficients ψ (Tab. A.1.1 EN 1990)

| Action | ψ_0 | ψ_1 | ψ_2 |
|---|---|---|---|
| Cat. A — Logement | 0,7 | 0,5 | 0,3 |
| Cat. B — Bureaux | 0,7 | 0,5 | 0,3 |
| Cat. C — Réunion | 0,7 | 0,7 | 0,6 |
| Cat. D — Commerce | 0,7 | 0,7 | 0,6 |
| Cat. E — Stockage | 1,0 | 0,9 | 0,8 |
| Cat. F — Parking VL | 0,7 | 0,7 | 0,6 |
| Cat. G — Parking PL | 0,7 | 0,5 | 0,3 |
| Cat. H — Toiture inaccessible | 0 | 0 | 0 |
| Neige (alt. < 1 000 m) | 0,5 | 0,2 | 0 |
| Neige (alt. ≥ 1 000 m) | 0,7 | 0,5 | 0,2 |
| Vent | 0,6 | 0,2 | 0 |
| Thermique | 0,6 | 0,5 | 0 |

### 5. Pour chaque combinaison vérifiée

#### Construction de la combinaison

Pour un logement R+5 avec neige (zone B1, < 1 000 m) et vent (zone 2) :

**ELU 1 — Q_exploitation prépondérante**
```
1,35 × G + 1,5 × Q_exp + 1,5 × 0,5 × S + 1,5 × 0,6 × W
```

**ELU 2 — Neige prépondérante**
```
1,35 × G + 1,5 × S + 1,5 × 0,7 × Q_exp + 1,5 × 0,6 × W
```

**ELU 3 — Vent prépondérant**
```
1,35 × G + 1,5 × W + 1,5 × 0,7 × Q_exp + 1,5 × 0,5 × S
```

**ELS qp** (pour calcul de flèche long terme)
```
G + 0,3 × Q_exp + 0 × S + 0 × W
```

### 6. Vérification des dimensionnement

Une fois les combinaisons établies, vérifier :
- **Sollicitations** maximales (M, V, N) sur l'élément
- **Vérification** selon le matériau :
  - Béton armé : EC2 (f_cd, f_yd, vérifications flexion, cisaillement, flambement)
  - Acier : EC3 (sections de classe 1, 2, 3, 4 ; voilement, flambement)
  - Bois : EC5 (k_mod selon classe service et durée, vérifications σ_d ≤ f_d)
  - Maçonnerie : EC6 (f_k de la maçonnerie)
- **Vérification de service** (flèches, fissuration, vibrations)

### 7. Drapeaux rouges fréquents

| Anomalie | Conséquence |
|---|---|
| Coefficient ψ_0 oublié sur action variable secondaire | Sous-estimation de la charge |
| **Vent vertical descendant** non considéré (toiture plate) | Sous-estimation des soulèvements |
| Action **neige** intégrée sans coefficient ψ_2 en ELS qp | Sur-estimation des flèches |
| Coefficient γ_G pris à 1,0 sur action permanente défavorable | Sous-estimation de M_Ed |
| **Charges concentrées** ignorées (chariot élévateur en stockage) | Sous-estimation locale |
| Combinaison **sismique** absente en zone 2-5 | Non-conformité réglementaire |
| Coefficient α_n (réduction multi-niveaux EC1-1-1 § 6.3.1.2) non appliqué | Sur-estimation des poteaux de fondation |

### 8. Pour chaque non-conformité

- **Cite** l'article EN 1990 / EN 1991 concerné
- **Indique** la combinaison manquante / erronée
- **Quantifie** l'écart de dimensionnement (avant / après correction)
- **Recommande** la révision du dimensionnement

## Garde-fous

- **Pas de validation finale** — le pré-dim et le contrôle ne se substituent pas à une **note de calcul** signée par un BET inscrit à l'OPQIBI ou un ingénieur agréé.
- Les coefficients **AN** (Annexe Nationale française) peuvent différer des valeurs de référence de l'Eurocode — toujours utiliser l'AN française.
- **Vérification sismique** : si zone 2 ou plus, intégrer EC8 (analyse modale, coefficient de comportement q).
- **Bâtiments classés** : peuvent avoir des règles spécifiques (ITGH, ERP avec règles incendie sur la structure).

## Livrable à proposer

Après vérification, propose un **Rapport de contrôle des combinaisons d'actions** (format DOCX + PDF) :
- Synthèse exécutive (verdict global)
- Tableau récapitulatif des actions (G, Q, S, W, T, A, A_Ed)
- Liste des combinaisons applicables (ELU, ELS, accidentelle, sismique)
- Analyse des combinaisons identifiées dans la note de calcul
- Non-conformités et recommandations
- Mention finale : *« Document préparé par l'agent IA Ingénieur structure — à valider et signer par un ingénieur diplômé inscrit à l'OPQIBI. Ne se substitue pas à une note de calcul EXE. »*
