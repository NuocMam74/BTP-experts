# Dallages industriels et courants — DTU 13.3 (NF P 11-213)

**Source :** NF P 11-213 (DTU 13.3) « Dallages — Conception, calcul et exécution », parties 1 (industriels), 2 (à usage autre qu'industriel et autres que maisons individuelles) et 3 (maisons individuelles) ; en lien avec NF EN 1992-1-1 (EC2), NF EN 206/CN (béton), DTU 13.1/13.2 (fondations), NF P 94-500 (missions géotechniques G1-G5) et le rapport géotechnique pour le module de réaction du sol.

## 1. Définition et principe

Un **dallage** est un ouvrage en béton (armé, fibré ou non) de grande surface, **reposant sur le sol** (sol support ou couche de forme), désolidarisé de la structure (joints périphériques). Il **transmet directement** au sol les charges qu'il reçoit (contrairement à un **plancher porté** qui s'appuie sur poutres/poteaux). Le dallage **n'est pas un radier** (un radier est une fondation qui reporte les charges du bâtiment).

```
Charges → dallage (plaque sur appui élastique = sol) → sol support
```

## 2. Classes de dallage (DTU 13.3)

Le DTU 13.3 distingue selon la **destination** et les **tolérances/usage** :

| Classe | Destination | Exigences |
|---|---|---|
| **Partie 1 — Industriels** | Entrepôts, ateliers, usines, plateformes logistiques | Charges fortes (stockage, chariots), planéité, durabilité |
| **Partie 2 — Non industriels** | Bureaux, commerces, parkings (autres que MI) | Charges modérées, revêtements |
| **Partie 3 — Maisons individuelles** | Dallages de MI et habitat individuel | Charges faibles, méthode simplifiée |

Pour les dallages industriels, les **classes d'usage / de tolérances de planéité** conditionnent le mode de tirage et de cure (dallage surfacé hélicoptère, quartz, etc.).

## 3. Actions et charges (DTU 13.3 — chapitre charges)

| Type de charge | Description | Exemples |
|---|---|---|
| **Charges réparties uniformes** | q (kPa ou t/m²) sur de grandes surfaces | Stockage en vrac, charges de plancher |
| **Charges concentrées / ponctuelles** | P (kN) appliquées sur petite surface | Pieds de racks/palettiers, pieds de machine |
| **Charges roulantes (mobiles)** | Essieux de chariots élévateurs, transpalettes | Roues de gerbeurs, AGV |
| **Charges linéaires** | charge par mètre linéaire | Murs, cloisons, longrines posées |
| **Charges de poinçonnement** | charge ponctuelle locale | Pieds isolés, vérins |

### Précisions

- Pour les **racks à palettes**, on connaît la charge par pied (souvent 60 à 120 kN) et l'entraxe — c'est souvent **dimensionnant** (combinaison de charges concentrées rapprochées).
- Pour les **chariots**, on prend la **charge à l'essieu** la plus défavorable (chariot chargé) avec l'empreinte de roue (bandage / pneumatique → surface de contact différente).
- Les charges réparties de stockage atteignent couramment **30 à 60 kPa** (3 à 6 t/m²) en logistique.

## 4. Sol support et module de réaction k (Westergaard)

### Modèle de Westergaard (plaque sur sol de Winkler)

Le dallage est modélisé comme une **plaque infinie reposant sur un sol élastique** caractérisé par un **module de réaction k** (dit module de Westergaard ou coefficient de réaction) :
```
p = k × w     (p = pression sous la plaque, w = tassement, k en MN/m³ ou kPa/mm)
```

### Rayon de rigidité relative

```
ℓ = [ E_b × h³ / (12 × (1 − ν²) × k) ]^(1/4)
```
- E_b : module du béton, h : épaisseur du dallage, ν ≈ 0,2, k : module de réaction.
- ℓ caractérise la « longueur d'influence » de diffusion d'une charge ponctuelle.

### Cas de chargement de Westergaard (position de la charge)

| Position | Effet sur les moments | Remarque |
|---|---|---|
| **Charge au centre** (intérieur) | Moment radial/tangentiel modéré | Cas favorable |
| **Charge au bord** (rive) | Moments ~ 2 × cas centre | Plus défavorable |
| **Charge à l'angle** (coin) | Cas le plus défavorable | Dimensionnant souvent |

Les **joints** doivent donc être traités avec transfert de charge (goujons) pour éviter le cas « bord/angle » non transféré.

### Valeurs indicatives de module de réaction k

| Sol support | k (MN/m³) — indicatif |
|---|---|
| Sol médiocre (limon mou, remblai non traité) | 20 à 40 |
| Sol moyen (grave, sol traité) | 50 à 80 |
| Bon sol (grave compactée, plateforme traitée) | 80 à 120 |
| Sol traité aux liants hydrauliques | > 120 |

> Le **module de réaction k** est à **fournir par le géotechnicien** (mission G2/G3, essai à la plaque type EV2 / module de Westergaard). Valeurs ci-dessus **indicatives (à confirmer par étude géotechnique)**.

### Plateforme support (couche de forme)

- **Plateforme PF** réceptionnée (essais à la plaque EV2, dynaplaque, module sous chargement statique).
- Couche de forme + couche de réglage (sable/grave) ; film polyéthylène (anti-remontée d'humidité, désolidarisation).
- Portance vérifiée avant coulage (réception de plateforme contractuelle).

## 5. Épaisseur et armatures

### Épaisseurs courantes (indicatif, à confirmer par note de calcul)

| Usage | Épaisseur dallage |
|---|---|
| Maison individuelle / habitat (DTU 13.3 partie 3) | 12 à 15 cm |
| Tertiaire / commerce (partie 2) | 13 à 18 cm |
| Industriel léger | 15 à 18 cm |
| Industriel / logistique (charges fortes, racks) | **18 à 25 cm** (voire plus) |

### Armatures / fibres

| Solution | Description | Usage |
|---|---|---|
| **Treillis soudé** | Nappe(s) ST en partie supérieure et/ou inférieure | Dallage armé classique |
| **Armature calculée** (BA) | Aciers dimensionnés (HA) | Fortes charges, dallage structurel |
| **Fibres métalliques** | Dosage 20 à 45 kg/m³ | Maîtrise de la fissuration, post-fissuration |
| **Fibres synthétiques (macro)** | Dosage structurel selon ETE | Alternative ou complément |
| **Non armé** (béton de masse) | Sans armature, joints rapprochés | Faibles charges, partie 3 simplifiée |

- Le **dosage de fibres** se justifie par une note (résistance résiduelle post-fissuration, classe de ténacité selon NF EN 14651).
- Le ferraillage et/ou le fibrage limitent l'**ouverture de fissures** de retrait et participent à la **continuité** au droit des joints.

## 6. Joints (essentiel pour les dallages)

Le retrait du béton et les déformations thermiques imposent de **fractionner** le dallage. Quatre familles de joints :

| Type de joint | Rôle | Exécution |
|---|---|---|
| **Joint de retrait (sciage)** | Localiser la fissuration de retrait | Sciage à 1/3 de l'épaisseur, dès durcissement (24-48 h) |
| **Joint de construction (reprise)** | Arrêt de coulage entre bandes/journées | Goujons de transfert de charge, parfois clavetage |
| **Joint de dilatation** | Absorber les mouvements thermiques (grandes surfaces, extérieur) | Largeur 1-2 cm, garniture compressible |
| **Joint d'isolement / désolidarisation** | Séparer le dallage des éléments fixes (poteaux, murs, longrines) | Bande compressible périphérique, autour des poteaux |

### Maillage des joints de retrait

- Panneaux **carrés** de préférence (élancement L/l ≤ 1,5) ; côté courant **5 à 6 m** (jusqu'à ~ 25 × épaisseur).
- Joints **alignés et débouchants** ; éviter les angles rentrants (armatures de renfort en diagonale aux angles de trémies/poteaux).
- **Transfert de charge** aux joints (goujons lisses graissés / plats de glissement) pour limiter les **différences de niveau** (battement, faïençage) sous charges roulantes — crucial en logistique.

## 7. Tolérances (DTU 13.3)

- **Planéité générale** (règle de 2 m) et **planéité locale** (réglet 0,20 m) selon la classe d'usage (chariots à grande hauteur de levée → tolérances serrées, classes spécifiques type « superflat » pour allées étroites VNA).
- **Tolérances de niveau** par rapport au projet.
- **Battement aux joints** limité (transfert de charge).
- **État de surface** : surfaçage mécanique (hélicoptère), saupoudrage durcisseur (quartz/corindon) pour la résistance à l'usure.

## 8. Vérifications structurelles du dallage

1. **Flexion sous charges** (Westergaard / abaques / EF plaque sur sol élastique) : moments aux cas centre/bord/angle → vérifier la résistance en flexion (béton fibré : résistance résiduelle ; BA : aciers).
2. **Poinçonnement** sous charge concentrée (pied de rack, roue) : vérifier le cisaillement (EC2 §6.4 adapté ; périmètre de contrôle autour de l'empreinte).
3. **Tassement** (absolu et différentiel) compatible avec l'usage et les équipements (racks de grande hauteur sensibles au différentiel).
4. **Fissuration de retrait** maîtrisée par les joints + armatures/fibres + cure.
5. **Fatigue** sous charges roulantes répétées (logistique intensive).

## 9. Exécution et cure

- **Béton** : classe C25/30 mini courante, souvent **C30/37** en industriel ; consistance maîtrisée ; classe d'exposition selon environnement (XC, voire XF/XD pour quais extérieurs, XA si sol agressif).
- **Cure soignée** indispensable (produit de cure / bâchage / humidification) pour limiter le retrait plastique et le faïençage.
- **Calage des armatures** (distanciers), respect de la position de la nappe (souvent en partie supérieure pour reprendre les moments de retrait/bord).
- **Réception** : plateforme support, planéité, sciage des joints dans les délais, état de surface.

## 10. Garde-fous

- Le **module de réaction k** doit provenir d'un **rapport géotechnique** (G2/G3) — ne pas inventer une valeur ; le dallage est très sensible à la **portance et à l'homogénéité** du support.
- Un **dallage n'est pas un radier** : si le sol est médiocre/hétérogène et les charges importantes, un **plancher porté sur fondations** ou un **dallage sur inclusions rigides** peut s'imposer (étude géotechnique).
- Les **joints et le transfert de charge** sont la première cause de désordres (battement, épaufrures) en logistique : à soigner au stade conception.
- Les valeurs d'épaisseur et de dosage de fibres sont **indicatives (à confirmer par note de calcul DTU 13.3)** ; les charges de racks et de chariots doivent être obtenues du **client / fournisseur de stockage**.
- Le DTU 13.3 **exclut** les ouvrages spéciaux (dallages précontraints, pistes aéroportuaires, chaussées) qui relèvent d'autres référentiels.

## Citations à utiliser

- NF P 11-213 (DTU 13.3) parties 1, 2 et 3 — dallages
- NF EN 1992-1-1 (EC2) — flexion, poinçonnement §6.4
- NF EN 206/CN (béton) ; NF EN 14651 (essai de flexion béton fibré)
- DTU 13.1 / 13.2 (fondations) ; NF P 94-500 (missions G1-G5) — module de réaction, portance
- Méthode de **Westergaard** (plaque sur sol élastique de Winkler)

**Référence à citer :** DTU 13.3 (NF P 11-213) + EC2 + rapport géotechnique (module k). Sources : afnor.org, eurocodes.fr (CSTB), CFMS.
