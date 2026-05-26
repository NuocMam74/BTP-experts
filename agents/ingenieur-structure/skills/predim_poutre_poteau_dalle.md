# Skill — Pré-dimensionner poutre / poteau / dalle / voile

L'utilisateur a besoin d'un **pré-dimensionnement rapide** d'un élément de structure courant pour phase ESQ / APS / APD (béton armé, charpente bois ou métallique). Ce sont des **ordres de grandeur d'ingénieur** à valider par note de calcul définitive.

## 1. Documents attendus / questions à poser

- Type d'élément (poutre, poteau, dalle, voile, semelle, panne, ferme, IPE/HEA, lamellé-collé)
- Géométrie (portée L, hauteur d'étage, largeur de zone d'influence)
- Charges G et Q (sinon, charges typiques par usage — voir skill `verifier_descente_charges`)
- Matériau pressenti (BA C25/30, BA C30/37, acier S235/S275/S355, bois GL24h, GL28h, C24)
- Conditions d'appui (simple, encastré, continu, console)
- Critères dimensionnants : résistance ELU, flèche ELS, vibration, feu, sismique

## 2. Référentiels (`rag_search` obligatoire si calcul détaillé)

- `rag_search("EC2 NF EN 1992-1-1 §5 dimensionnement éléments")`
- `rag_search("EC3 NF EN 1993-1-1 résistance acier")`
- `rag_search("EC5 NF EN 1995-1-1 charpente bois")`
- `rag_search("annexe nationale française EC2 EC3 EC5")`

## 3. Méthodes de pré-dimensionnement (par typologie)

### A — Poutre BA (béton armé) — EC2

**Critères d'élancement courants** (L = portée libre) :
| Type | h/L (élancement) | b (largeur) |
|---|---|---|
| Poutre simplement appuyée | 1/10 à 1/12 | h/2 à h/3 |
| Poutre continue | 1/15 à 1/18 | h/2 à h/3 |
| Poutre console | 1/5 à 1/6 | h/2 à h/3 |
| Poutre fortement chargée (parking, archives) | 1/8 à 1/10 | h/2 |
| Poutre hyperstatique (logement courant) | 1/14 à 1/16 | 20 à 25 cm |

**Section d'armatures tendues** (forfait pour ELU, en zone courante) :
```
As ≈ MEd / (0,87 × fyk × z)  avec z ≈ 0,9 × d
```
- MEd = moment ELU à mi-portée (poutre simple : MEd ≈ qu × L² / 8)
- fyk = 500 MPa pour B500B
- d ≈ h – 5 cm (enrobage + cadre + ½ ϕ)

**Taux d'armature** typique : ρ = As / (b × d) entre 0,5 % et 1,5 % (équilibré). Si > 1,5 % → augmenter h.

### B — Poteau BA — EC2

**Élancement maximum** : λlim ≈ 35 à 40 (au-delà, flambement à vérifier sérieusement)
- λ = lo / i = lo / (h/√12) pour section rectangulaire

**Charge axiale admissible (approx. simple, sans flambement, pour ELU)** :
```
NRd ≈ 0,85 × Ac × fck / 1,5 + As × fyk / 1,15
```

**Pré-dim rapide section** (poteau intérieur courant, hauteur 2,8-3 m) :
| Charge ELU (kN) | Section indicative |
|---|---|
| ≤ 500 | 25 × 25 cm |
| 500 à 1 000 | 30 × 30 cm |
| 1 000 à 1 800 | 35 × 35 cm |
| 1 800 à 2 800 | 40 × 40 cm |
| 2 800 à 4 000 | 45 × 45 cm |
| > 4 000 | 50 × 50 cm ou poteau circulaire |

(Hypothèses : C25/30, B500B, 1 à 2 % d'aciers, classe S4)

### C — Dalle BA — EC2

**Élancement L/h selon type** :
| Type | L/h |
|---|---|
| Dalle pleine portée 1 sens, appui simple | 25 à 28 |
| Dalle pleine portée 1 sens, continue | 28 à 32 |
| Dalle pleine portée 2 sens | 30 à 35 |
| Dalle nervurée | 35 à 40 |
| Dalle alvéolaire préfabriquée | 40 (catalogue fournisseur) |
| Pré-dalle + dalle compression | 30 à 35 |
| Dalle parking (charges importantes) | 22 à 25 |

**Épaisseur min** : 12 cm logement, 14 cm bureaux, 18 cm parking, 8 cm pour seuils REI ou flèche.

### D — Voile BA — EC2

**Épaisseur min** : 15 cm (réglementaire EC2 §5.4 (3)), souvent 18 à 25 cm en pratique.
- Voile porteur logement : 18-20 cm
- Voile parasismique : 20-25 cm selon zone
- Voile contre-terre (sous-sol) : 25-30 cm

### E — Charpente métallique acier — EC3

**Poutre IPE / HEA** : flèche ELS = L/300 (critère courant), souvent dimensionnant.

| Portée (m) | Profilé indicatif (charge courante toiture-plancher) |
|---|---|
| 4 à 6 | IPE 200 à 240 |
| 6 à 8 | IPE 270 à 330 |
| 8 à 10 | IPE 360 à 400, HEA 200 |
| 10 à 12 | HEA 240 à 280 |
| 12 à 15 | HEA 300 à 360 |
| 15 à 20 | HEA 400 à 500, PRS |
| > 20 | PRS (Profilé Reconstitué Soudé) |

**Poteau acier** :
- HEA / HEB ou tube creux
- Hauteur 3-4 m + charge 500 kN → HEA 160 à 200
- Hauteur 3-4 m + charge 1 000 kN → HEA 220 à 280

### F — Charpente bois — EC5

**Solive C24 (épicéa, sapin)** :
| Portée (m) | Entraxe 50 cm | Entraxe 60 cm |
|---|---|---|
| 3 | 60 × 175 mm | 60 × 200 mm |
| 4 | 60 × 200 mm | 75 × 200 mm |
| 5 | 75 × 225 mm | 75 × 250 mm |

**Poutre lamellé-collé GL24h** :
| Portée (m) | Section indicative (charge plancher courant) |
|---|---|
| 6 | 100 × 360 mm |
| 8 | 140 × 480 mm |
| 10 | 160 × 600 mm |
| 12 | 200 × 720 mm |
| 15 | 240 × 900 mm |

**Poteaux bois lamellé-collé** : section / hauteur ≈ 1/30 à 1/40 selon charge.

### G — Semelle isolée BA (sol courant 0,2 MPa)

**Pré-dimensionnement carré** :
```
B = √(NEd,ser / qadm)
e = max(B/4 ; 30 cm)
```
- NEd,ser : charge ELS de service
- qadm : contrainte admissible du sol (rapport géotechnique G2)
- Aciers : Mu = (B – a) × NEd,ELU / 8 — calcul ensuite via formule classique

## 4. Outils

Quand un calcul fin est demandé, l'agent doit appeler l'outil JavaScript `predim_beton_arme` (déclaré dans le manifest) qui retourne :
- Section d'aciers
- Vérification flèche ELS
- Vérification flambement (poteaux)
- Section béton minimale conforme EC2

Si l'outil est indisponible, l'agent **utilise les abaques ci-dessus** en précisant explicitement leur caractère **forfaitaire**.

## 5. Procédure

1. **Identifier le type d'élément** et les **conditions aux limites**.
2. **Estimer les charges** ELU et ELS (utiliser skill `verifier_descente_charges` si projet complet).
3. **Choisir un élancement** dans les tableaux ci-dessus selon les conditions d'appui.
4. **Pré-dimensionner section béton/acier/bois** correspondant.
5. **Vérifier les critères secondaires** :
   - Flèche ELS (L/250, L/300 selon usage)
   - Vibration (planchers > 8 m portée — fréquence propre > 8 Hz selon EC0 annexe A1)
   - Résistance au feu (R30, R60, R90, R120 selon ERP / habitation)
   - Sismique (chaînages EC8 §5)
6. **Indiquer le taux d'armature** ou taux de travail acier/bois pour vérifier que l'élément n'est ni sous-dimensionné, ni anormalement sur-dimensionné.

## 6. Restitution structurée

```
## Pré-dimensionnement — [Élément]

### Hypothèses
- **Type** : [poutre / poteau / dalle / etc.]
- **Portée / hauteur** : [m]
- **Conditions aux limites** : [simple / continu / encastré / console]
- **Charges** : Gk = [kN/m²], Qk = [kN/m²], combinaison ELU = [kN/m²]
- **Matériau** : [BA C25/30 + B500B / S235 / GL24h / etc.]
- **Critère dimensionnant** : [résistance ELU / flèche ELS / vibration / feu]

### Résultat
- **Section pré-dimensionnée** : [b × h cm — ou profilé IPE/HEA — ou section bois]
- **Armatures longitudinales** (BA) : [n × ϕ + position]
- **Armatures transversales** (BA) : [cadres ϕ + espacement]
- **Taux d'armature ρ** : [%]
- **Taux de travail acier/bois** : [%]

### Vérifications
| Critère | Valeur | Limite | Conformité |
|---|---|---|---|
| Résistance ELU | [MEd/MRd] | < 1,0 | ✅ |
| Flèche ELS quasi-permanente | [L/x] | L/250 | ✅ / ⚠️ |
| Flambement (poteau) | λ = [valeur] | λlim = 35 | ✅ |
| Résistance au feu | [Rxx] | [exigence] | ✅ / À confirmer |

### Niveau de confiance
- [Pré-dimensionnement indicatif ESQ/APS]
- [À valider par note de calcul EXE du BE structure signataire]

### Sensibilité / alternatives
- Si portée +1 m : section passe à [b × h]
- Si charge +20 % : prévoir +1 cm h ou + 1 HA
- Variante bois lamellé-collé : section équivalente [c × d]
- Variante acier : profilé IPE/HEA [...]
```

## 7. Garde-fous spécifiques

- **Pré-dimensionnement = ordre de grandeur** : la note de calcul finale relève du **BE structure signataire** (responsabilité décennale, Code civil art. 1792).
- Tu **ne livres pas** un pré-dimensionnement pour signature d'un PC ou DCE sans rappeler qu'une **note de calcul Eurocodes complète** est requise.
- Pour les **portées > 12 m** ou les **éléments fortement chargés** (parking, archives, gymnase), les pré-dimensionnements forfaitaires sont **insuffisants** : exiger une note de calcul.
- Pour les **bâtiments en zone sismique 3 à 5**, les sections de pré-dimensionnement sont **majorées** par les exigences EC8 — prévoir +15 à 25 % section béton, davantage d'aciers de chaînage.
- Pour les **ERP**, les exigences de **résistance au feu** (REI 60 à 120) peuvent imposer des sections **supérieures** au calcul mécanique seul (épaisseur de protection, enrobage anti-feu).
- Tu ne mélanges **jamais** les unités : kN/m² pour surfaces, kN/m pour linéaires, kN pour ponctuelles.
- Tu **rappelles** que les abaques classiques supposent classe d'exposition XC1 et durée d'utilisation S4 : pour XC4, XS, XD, ou S6, **majorer enrobage et section**.

## 8. Suites logiques à proposer

- Vérification complète par la skill `controle_note_calcul` une fois la note définitive disponible
- Analyse des **plans de ferraillage** par la skill `analyse_plan_ferraillage`
- Si zone sismique 3+ : combinaisons sismiques via la skill `zonage_sismique`
- Validation **points singuliers** (nœuds, ancrages, scellements) — voir skill `points_singuliers`
- Demander **mission G2 AVP/PRO** au géotechnicien pour valider hypothèses de fondation
- Saisine **bureau de contrôle** (Apave, Socotec, etc.) pour vérification indépendante en EXE
