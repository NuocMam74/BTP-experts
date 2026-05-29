# Skill — Analyser le comportement sismique d'un bâtiment (EC8)

L'utilisateur te transmet un projet de bâtiment en zone sismique — tu dois identifier les exigences EC8, choisir la méthode d'analyse et vérifier les dispositions.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Bâtiment** : type, usage, hauteur, nombre d'étages
- **Localisation** : commune (zone sismique selon arrêté 22 oct. 2010)
- **Catégorie d'importance** (Tab. 5.1.1) :
  - I : ouvrages sans risque
  - II : habitation, tertiaire courants
  - III : ERP, écoles, équipements
  - IV : hôpitaux, secours
- **Système structural** : portique BA / voiles BA / acier / bois / maçonnerie
- **Régularité** : en plan, en élévation
- **Sol** : classe A à E (rocher à très meuble)

### 2. Identifier l'obligation d'application EC8

#### Tableau des obligations

| Cat. / Zone | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| I | Non | Non | Non | Non | Non |
| II | Non | Oui partielle | Oui | Oui | Oui |
| III | Non | Oui | Oui | Oui | Oui |
| IV | Oui | Oui | Oui | Oui | Oui |

#### Pour MI cat. II en zones 3-4

- **Arrêté 19 juill. 2011** : règles forfaitaires simplifiées (pas de calcul EC8 complet)

### 3. Calculer l'action sismique

#### Accélération de calcul

```
a_g = γ_I × a_gr
```

| Zone | a_gr (m/s²) |
|---|---|
| 1 | 0,4 |
| 2 | 0,7 |
| 3 | 1,1 |
| 4 | 1,6 |
| 5 | 3,0 |

| Cat. | γ_I |
|---|---|
| I | 0,8 |
| II | 1,0 |
| III | 1,2 |
| IV | 1,4 |

#### Exemple

Bâtiment cat. III en zone 3 : a_g = 1,2 × 1,1 = **1,32 m/s²**

### 4. Identifier la classe de sol (Tab. 3.1)

| Classe | Description | V_s,30 (m/s) |
|---|---|---|
| A | Rocher | > 800 |
| B | Sol dense | 360-800 |
| C | Sable, gravier compact | 180-360 |
| D | Sol meuble | < 180 |
| E | Sol meuble sur rocher | C ou D sur A |

→ Donnée de l'étude **G2 PRO**.

### 5. Choisir le système structural et coefficient q

#### Béton armé

| Système | q (DCM) | q (DCH) |
|---|---|---|
| Murs ductiles | 3,0 | 4,5 |
| Murs porteurs voilés | 2,0 | 3,0 |
| Ossatures à risque faible | 1,5 | 1,5 |

#### Acier

| Système | q (DCM) | q (DCH) |
|---|---|---|
| Portique ductile | 4,0 | 6,5 |
| Triangulation à barres centrées | 3,0 | 4,0 |
| Triangulation à barres excentrées | 4,0 | 6,0 |

#### Bois

| Système | q |
|---|---|
| MOB avec voiles | 2,0 |
| Triangulation hyperstatique | 4,0 |
| Portique cloué hyperstatique | 5,0 |

#### Maçonnerie

| Système | q |
|---|---|
| Non armée chaînée | 1,5 |
| Armée | 2,5 |

### 6. Vérifier la régularité

#### En plan (art. 4.2.3.2)

- ❓ **Disposition** approximativement symétrique en plan
- ❓ **Compacité** : forme régulière, sans grands rentrants
- ❓ **Rigidité** : répartie symétriquement
- ❓ **Masse** : distribution proche du centre géométrique

#### En élévation (art. 4.2.3.3)

- ❓ **Continuité** des éléments porteurs sur toute la hauteur
- ❓ **Variation progressive** de masse et de rigidité avec la hauteur
- ❓ **Pas de discontinuité** brutale (étage transparent, recul)

### 7. Choisir la méthode d'analyse

#### Méthode des forces latérales (statique équivalente)

Applicable si :
- Bâtiment **régulier** (plan + élévation)
- T₁ ≤ min(4 × T_C ; 2,0 s)

**Méthode** : Calcul de F_b puis répartition par étage.

#### Méthode modale spectrale

Applicable :
- Bâtiments **irréguliers**
- T₁ > 2 × T_C
- Effets de plusieurs modes significatifs

**Méthode** : Calcul des modes propres + réponse modale + combinaison SRSS ou CQC.

### 8. Calcul par méthode des forces latérales

#### Force tranchante de base

```
F_b = S_d(T₁) × m × λ
```

- S_d(T₁) : ordonnée du spectre de calcul (avec q)
- m : masse totale du bâtiment
- λ : 0,85 (si T₁ ≤ 2 × T_C) ou 1,0

#### Répartition par étage

```
F_i = F_b × (z_i × m_i) / Σ(z_j × m_j)
```

### 9. Vérifier les dispositions

#### A. Déplacements (art. 4.4.3.2)

##### Pour éléments fragiles

```
d_r ≤ 0,005 × h
```

##### Pour éléments ductiles

```
d_r ≤ 0,0075 × h
```

- d_r : déplacement relatif inter-étages
- h : hauteur d'étage

#### B. Effets P-Δ (art. 4.4.2.2)

```
θ = P_tot × d_r / (V_tot × h)
```

| θ | Conséquence |
|---|---|
| ≤ 0,1 | Négligeable |
| 0,1 < θ ≤ 0,2 | Amplification (1/(1-θ)) |
| 0,2 < θ ≤ 0,3 | Analyse non linéaire requise |
| > 0,3 | Inacceptable |

#### C. Capacité dissipative

- Vérification que la structure peut développer des **rotules plastiques** dans les zones critiques

#### D. Règle « strong column / weak beam » (portiques BA)

```
Σ M_Rc ≥ 1,3 × Σ M_Rb
```

→ Les poteaux résistent plus que les poutres.

### 10. Dispositions constructives

#### Béton armé

- ❓ **Aciers** : B500B classe 2 (DCM), B500C classe 3 (DCH)
- ❓ **Cadres dans zones critiques** : espacement ≤ 6-10 cm
- ❓ **Continuité** des armatures dans les nœuds
- ❓ **Recouvrement majoré** (1,5 × longueur d'ancrage)
- ❓ **Zones critiques** : extrémités poutres/poteaux sur 1,5 × h

#### Acier

- ❓ **Assemblages dissipatifs**
- ❓ **Stabilité** des barres comprimées (raidisseurs)
- ❓ **Continuité** des éléments

#### Bois

- ❓ **Voiles travaillants** OSB ≥ 12 mm
- ❓ **Fixations denses** dans zones critiques

#### Maçonnerie

- ❓ **Chaînages horizontaux + verticaux**
- ❓ **Linteaux BA** systématiques
- ❓ **Hauteur limitée** en zones 4-5

### 11. Combinaisons d'actions sismiques

```
G_k + A_Ed + Σ ψ_2,i × Q_k,i
```

#### Coefficients ψ_2

| Action | ψ_2 |
|---|---|
| Logement A | 0,3 |
| Bureau B | 0,3 |
| Réunion C | 0,6 |
| Stockage E | 0,8 |
| Neige (alt. ≥ 1 000 m) | 0,2 |
| Vent | 0 |

### 12. Restitution

#### Rapport d'analyse sismique

Structure type :

```
1. DONNÉES DE BASE
   - Zone sismique : ___
   - Catégorie d'importance : ___
   - a_gr, γ_I, a_g
   - Classe de sol
   - Système structural choisi
   - Coefficient q retenu

2. ANALYSE DE RÉGULARITÉ
   - Plan : régulier / irrégulier
   - Élévation : régulier / irrégulier
   - Conclusion : méthode statique ou modale

3. MÉTHODE D'ANALYSE
   - Statique équivalente ou modale
   - Justification

4. CALCUL DES SOLLICITATIONS
   - F_b ou réponse modale
   - Répartition par étage

5. VÉRIFICATIONS
   - Déplacements ≤ limite
   - Effets P-Δ
   - Capacité dissipative
   - Règle « strong column / weak beam »

6. DISPOSITIONS CONSTRUCTIVES
   - Liste des prescriptions

7. CONCLUSION
   - Conformité EC8
   - Recommandations
```

### 13. Drapeaux rouges fréquents

| Anomalie | Action |
|---|---|
| Bâtiment cat. III en zone 2 non vérifié sismique | Étude EC8 obligatoire |
| Discontinuité d'éléments verticaux | Reconception |
| Déplacements > limite | Augmenter rigidité |
| Effets P-Δ > 0,2 | Augmenter sections ou contreventement |
| Coefficient q surévalué | Calcul plus pessimiste |
| Dispositions constructives manquantes | Régularisation EXE |
| Pas d'étude géotechnique (classe sol) | G2 PRO requise |

## Garde-fous

- **Pas de validation finale** — calcul à confirmer par BET inscrit OPQIBI signataire de la note.
- **Étude G2 PRO** indispensable pour classe de sol.
- **Coordination architecte** : régularité géométrique préférable (impact économique).
- **Logiciels** : Robot, RFEM, Scia, Advance Design avec module sismique.
- **Pour MI zones 3-4** : règles forfaitaires arrêté 19 juill. 2011.
- **DTU correspondants** pour dispositions constructives.
- **Coefficient q** : ne pas surestimer (responsabilité du BE).

## Livrable à proposer

Après analyse :
- **Note d'analyse sismique** (DOCX + PDF) selon structure ci-dessus
- **Tableau XLSX** de calcul (sollicitations + vérifications)
- **Schémas** des dispositions constructives critiques
- **Liste** des prescriptions à intégrer au DCE
- Mention finale : *« Document préparé par l'agent IA Ingénieur structure — à valider et signer par un BET inscrit OPQIBI. Calculs détaillés à effectuer avec logiciel agréé. »*
