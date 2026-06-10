# Murs de soutènement (NF P 94-281 / NF P 94-282, EC7)

**Source :** NF EN 1997-1 (Eurocode 7) et son AN française ; **NF P 94-281** (ouvrages de soutènement — murs) ; **NF P 94-282** (écrans de soutènement — palplanches, parois, berlinoises) ; NF P 94-270 (remblais renforcés et massifs en sol cloué) ; DTU 13.1/13.2 (fondations) ; NF P 94-500 (missions géotechniques G1-G5). Théories de poussée : Rankine, Coulomb, Boussinesq (surcharges).

## 1. Typologie des murs de soutènement

| Type | Principe | Hauteur usuelle |
|---|---|---|
| **Mur poids** (béton, maçonnerie, gabions) | Stabilité par son **propre poids** | jusqu'à ~ 3-4 m |
| **Mur cantilever (voile encastré en T/L renversé)** | Voile BA encastré sur semelle ; le **poids des terres sur le talon** participe | 3 à 8 m |
| **Mur à contreforts** | Voile raidi par contreforts BA (économise le béton en grande hauteur) | > 6-8 m |
| **Mur en terre armée / remblai renforcé** | Remblai + nappes d'armatures (géosynthétiques, bandes métalliques) + parement | 5 à 15 m+ |
| **Mur cloué** | Sol existant stabilisé par clous + béton projeté (déblai) | variable |
| **Écran (palplanches, paroi, berlinoise)** | Écran encastré ± ancré (voir corpus fondations spéciales / NF P 94-282) | excavations profondes |

## 2. Poussée et butée des terres

### Coefficients de poussée K_a et de butée K_p

#### Théorie de Rankine (sol pulvérulent, parement vertical, terre-plein horizontal, sans frottement sol-mur)

```
K_a = tan²(45° − φ'/2) = (1 − sin φ') / (1 + sin φ')   (poussée active)
K_p = tan²(45° + φ'/2) = (1 + sin φ') / (1 − sin φ')   (butée passive)
```

| φ' (°) | K_a (Rankine) | K_p (Rankine) |
|---|---|---|
| 25 | 0,41 | 2,46 |
| 30 | 0,33 | 3,00 |
| 35 | 0,27 | 3,69 |
| 40 | 0,22 | 4,60 |

- **K_0 (poussée au repos)** = 1 − sin φ' (sol non déplacé, mur très rigide).

#### Théorie de Coulomb

Prend en compte le **frottement sol-mur δ**, l'**inclinaison du parement** et la **pente du terre-plein β** (équilibre du coin de rupture). Plus général que Rankine ; tables/formules de Coulomb usuelles.

### Diagramme de pression

Pour un sol pulvérulent (c'=0), pression active à la profondeur z :
```
σ_a(z) = K_a × γ × z   (+ K_a × q pour une surcharge q uniforme)
```
- Résultante de poussée par mètre linéaire : **P_a = ½ × K_a × γ × H²**, appliquée à **H/3** de la base.
- Surcharge q : poussée additionnelle **K_a × q × H**, appliquée à **H/2**.
- Sol cohérent (c' ≠ 0) : terme de réduction **− 2 c' √K_a** (poussée), terme d'augmentation **+ 2 c' √K_p** (butée).
- **Poussée hydrostatique de l'eau** à ajouter si présence de nappe non drainée (γ_w × z) — d'où l'importance du **drainage**.

## 3. Vérifications de stabilité (EC7 / NF P 94-281)

Quatre (cinq) vérifications de **stabilité externe** + la **stabilité interne** (résistance des sections BA) :

### A — Renversement (basculement)

Équilibre des moments autour de l'arête aval de la semelle :
```
Moments stabilisateurs (poids mur + terres sur talon) ≥ Moments moteurs (poussée)
```
- Critère traduit dans EC7 par les **états limites GEO/EQU** avec coefficients partiels ; en pratique, la **résultante** doit rester dans le **tiers central** de la base (excentricité e ≤ B/6) pour éviter le décollement.

### B — Glissement (sur la base)

```
Effort horizontal résistant (frottement base + butée aval) ≥ Poussée horizontale
   Résistance = N' × tan δ_base (+ c'_base × B) + butée passive éventuelle (avec prudence)
```
- δ_base = frottement sol/semelle ; la butée aval n'est mobilisée qu'avec un déplacement → souvent négligée ou minorée. Une **bêche** sous la semelle augmente la résistance au glissement.

### C — Portance / poinçonnement du sol de fondation

- Contrainte de référence sous la semelle (avec excentricité, modèle de Meyerhof : semelle effective B' = B − 2e) ≤ **capacité portante** du sol (méthode pressiométrique/pénétrométrique EC7, voir corpus EC7 / fondations).

### D — Stabilité d'ensemble / grand glissement (GMS)

- Vérification du **glissement circulaire généralisé** (méthode des tranches : Bishop, Fellenius) englobant le mur et le sol → **état limite GEO**. Indispensable en présence de **pente** ou de **sol mou** en profondeur. C'est une analyse **géotechnique** (mission G2).

### E — Stabilité interne (résistance BA)

- Le **voile** (flexion encastrée en pied) et la **semelle** (patin + talon en flexion) sont calculés en **BA selon EC2** (moments dus à la poussée) — aciers verticaux du voile côté terre, aciers de la semelle, chaînages.

## 4. Drainage (point critique)

L'**eau derrière le mur double quasiment la poussée** (poussée hydrostatique) : le **drainage est impératif**.

- **Drain** en pied (drain routier + géotextile filtrant) collectant l'eau.
- **Barbacanes** (Ø 80-100 mm) traversant le voile, tous les 1 à 2 m, en quinconce.
- **Massif drainant** (matériau granulaire ou nappe drainante géocomposite) contre le parement amont.
- **Étanchéité** du parement amont si nécessaire.
- Sans drainage → calculer avec la **poussée hydrostatique** complète (mur surdimensionné) — à éviter.

## 5. Pré-dimensionnement (mur cantilever BA — indicatif)

Pour un mur en T renversé de hauteur **H** (indicatif, à confirmer par note de calcul) :

| Élément | Pré-dimensionnement |
|---|---|
| Épaisseur du voile en tête | ≥ 20-25 cm |
| Épaisseur du voile en pied | ≈ H/12 à H/10 |
| Épaisseur de la semelle | ≈ H/12 à H/10 (≥ 30 cm) |
| Largeur de la semelle B | ≈ 0,5 H à 0,7 H |
| Position du voile sur la semelle | talon arrière (côté terre) ≈ 0,5-0,6 B |
| Bêche (si glissement) | profondeur 0,3-0,5 m sous la semelle |

> Pré-dimensionnement **indicatif (à confirmer par note de calcul EC7 + EC2)**. Les paramètres de sol (φ', c', γ, q surcharge, niveau de nappe) doivent provenir du **rapport géotechnique (G2)**.

## 6. Garde-fous

- Les **paramètres de sol** (φ', c', γ, nappe) sont **fournis par le géotechnicien** (G2) — ne pas les inventer ; la poussée y est très sensible.
- Le **drainage** est la première cause de sinistre des murs de soutènement (poussée hydrostatique négligée) : à prévoir systématiquement.
- La **stabilité au grand glissement (GMS)** est une vérification **géotechnique** indépendante des vérifications du mur, indispensable en pente / sol mou.
- Pour les **écrans de soutènement** (palplanches, parois, berlinoises, tirants), appliquer **NF P 94-282** (calcul aux modules de réaction / MISS) — voir corpus fondations spéciales.
- Les surcharges (circulation, stockage en tête, bâtiment en arrière) doivent être **intégrées** à la poussée (Boussinesq pour charges localisées).
- Toutes les valeurs de pré-dimensionnement sont **indicatives**.

## Citations à utiliser

- NF EN 1997-1 (EC7) + AN française
- NF P 94-281 (murs de soutènement), NF P 94-282 (écrans), NF P 94-270 (sol renforcé/cloué)
- NF EN 1992-1-1 (EC2) pour le calcul BA des voiles et semelles
- DTU 13.1/13.2 (fondations), NF P 94-500 (missions G1-G5)
- Théories de **Rankine** et **Coulomb** (poussée/butée), méthodes de **Bishop/Fellenius** (grand glissement)

**Référence à citer :** EC7 + NF P 94-281/282 + EC2 (sections BA). Sources : afnor.org, eurocodes.fr (CSTB), CFMS.
