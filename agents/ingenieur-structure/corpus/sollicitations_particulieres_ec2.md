# Sollicitations particulières en béton armé (EC2)

**Source :** NF EN 1992-1-1 (EC2) — **§5.8** (analyse des effets du second ordre, éléments comprimés / poteaux élancés), **§6.3** (torsion), **§6.4** (poinçonnement), **§6.8** (fatigue) ; NF EN 1991-1-7 (EC1-1-7 — **actions accidentelles**, annexe A : robustesse et effondrement progressif) ; NF EN 1990 (combinaison accidentelle) + AN françaises. Compléments : voir corpus `eurocode_2_beton_arme.md` (flexion/effort tranchant), `contreventement_stabilite.md` (imperfections, robustesse), `planchers_prefabrication.md` (poinçonnement planchers-dalles).

## 1. Flexion composée et poteaux élancés — effets du second ordre (EC2 §5.8)

### Élancement et critère de prise en compte

Un poteau comprimé fléchit sous charge : son déplacement latéral crée un **moment additionnel du 2nd ordre** (effet P-Δ). Cet effet est négligeable si l'élément est **peu élancé** :

```
Élancement   λ = l_0 / i        avec i = √(I/A)  (rayon de giration)
l_0 = longueur efficace de flambement (selon conditions d'appui, EC2 fig. 5.7)
```

- **Critère §5.8.3.1** : les effets du 2nd ordre peuvent être **négligés** si **λ ≤ λ_lim** avec :
  ```
  λ_lim = 20 × A × B × C / √n
  ```
  - n = N_Ed / (A_c × f_cd) (effort normal réduit) ;
  - A ≈ 0,7 (si φ_ef inconnu) ; B ≈ 1,1 (si ω inconnu) ; C ≈ 0,7 (si rapport des moments d'about r_m inconnu).
- Si **λ > λ_lim** → les effets du 2nd ordre doivent être pris en compte.

### Longueur efficace l_0 (EC2 §5.8.3.2)

| Liaisons | l_0 |
|---|---|
| Bi-articulé | l |
| Encastré-libre (poteau console) | 2 l |
| Bi-encastré (nœuds non déplaçables) | 0,5 l |
| Encastré-articulé | 0,7 l |
| Structure à nœuds déplaçables | > l (selon souplesse k1, k2) |

### Méthodes d'analyse du 2nd ordre

- **Méthode générale** (§5.8.6) : analyse non linéaire (matériaux + géométrie).
- **Méthode de la rigidité nominale** (§5.8.7) : amplification du moment via une rigidité réduite EI nominale (fluage inclus).
- **Méthode de la courbure nominale** (§5.8.8) — usuelle pour les poteaux isolés :
  ```
  M_Ed = M_0Ed + M_2     (M_0Ed = moment du 1er ordre, M_2 = moment du 2nd ordre)
  M_2 = N_Ed × e_2 ,   e_2 = (1/r) × l_0² / c
  1/r = K_r × K_φ × (1/r_0) ,   1/r_0 = ε_yd / (0,45 d)
  ```
  - K_r : facteur de correction (effort normal) ; K_φ : prise en compte du **fluage** (φ_ef) ; c ≈ 10 (≈ π²) pour une courbure ~constante.
- Ajouter les **imperfections géométriques** (§5.2) : inclinaison θ_i → excentricité additionnelle e_i = θ_i × l_0/2.

### Excentricités à cumuler

```
e_tot = e_0 (1er ordre, M_0Ed/N_Ed) + e_i (imperfection) + e_2 (2nd ordre)
M_Ed = N_Ed × e_tot
```

→ Vérification finale en **flexion composée** (N + M) sur le **diagramme d'interaction** N-M de la section (ferraillage symétrique courant pour les poteaux).

## 2. Torsion (EC2 §6.3)

### Torsion d'équilibre vs de compatibilité

- **Torsion d'équilibre** : indispensable à l'équilibre (poutre de rive supportant des consoles, escalier hélicoïdal) → **doit** être reprise par le ferraillage.
- **Torsion de compatibilité** : résulte seulement de la continuité (rotation gênée) → peut être **redistribuée** (fissuration ELS à maîtriser), un ferraillage minimal de torsion suffit souvent.

### Modèle du treillis spatial creux (§6.3.2)

La section est assimilée à une **section creuse à parois minces** équivalente (épaisseur t_ef). La torsion T_Ed génère un **flux de cisaillement** repris par un **treillis spatial** :

```
τ_t × t_ef = T_Ed / (2 × A_k)        (A_k = aire enclose par la ligne moyenne des parois)
```

- **Armatures longitudinales de torsion** ΣA_sl réparties sur le périmètre u_k :
  ```
  ΣA_sl × f_yd / u_k = (T_Ed / (2 A_k)) × cot θ
  ```
- **Armatures transversales** (cadres fermés) A_sw/s :
  ```
  T_Rd,s = 2 A_k × (A_sw/s) × f_ywd × cot θ
  ```
- **Cumul torsion + effort tranchant** (§6.3.2(4)) : interaction à vérifier vis-à-vis des bielles comprimées :
  ```
  T_Ed/T_Rd,max + V_Ed/V_Rd,max ≤ 1
  ```
- **Dispositions** : cadres **fermés** (ancrés par recouvrement ou crochets), barres longitudinales **dans chaque angle** + réparties.

## 3. Poinçonnement des dalles et planchers-dalles (EC2 §6.4)

Le **poinçonnement** est la rupture locale par cisaillement autour d'une charge concentrée (poteau sur **plancher-dalle / dalle champignon**, semelle sous poteau, charge ponctuelle) : un cône de béton est « poinçonné ».

### Périmètres de contrôle

- Contour de la **zone chargée** u_0 (périmètre du poteau).
- **Périmètre de contrôle de référence u_1** à **2d** du nu du poteau (contour arrondi).

### Vérifications (§6.4.3 à 6.4.5)

```
Contrainte de poinçonnement appliquée :  v_Ed = β × V_Ed / (u_1 × d)
```
- **β** : coefficient majorant pour l'**excentricité** de la charge (transfert de moment) — β ≈ 1,15 (poteau intérieur), 1,4 (rive), 1,5 (angle) en valeurs forfaitaires.

**Trois vérifications successives :**
1. **Au nu du poteau (u_0)** : v_Ed ≤ **v_Rd,max** (écrasement des bielles) → si dépassé : augmenter d, la section du poteau, ou la résistance béton.
2. **Sur u_1 sans armatures** : si v_Ed ≤ **v_Rd,c** → pas d'armatures de poinçonnement.
   ```
   v_Rd,c = C_Rd,c × k × (100 ρ_l f_ck)^(1/3)   (≥ v_min)
   ```
3. **Si v_Ed > v_Rd,c** : disposer des **armatures de poinçonnement** (épingles, étriers, rails goujons / studrails) sur plusieurs périmètres jusqu'à u_out où v_Ed ≤ v_Rd,c.

### Dispositions

- **Renforts** possibles : chapiteau (drop panel), goujons (studrails — efficaces et industrialisés), augmentation locale d'épaisseur.
- Le poinçonnement est **souvent dimensionnant** pour les planchers-dalles sans poutres (parkings, tertiaire).

## 4. Fatigue (EC2 §6.8)

- Concerne les éléments sous **cycles répétés** (ponts, planchers industriels roulés, supports de machines/grues).
- Vérification de l'**étendue de contrainte** Δσ dans les armatures et le béton ; courbes **S-N**, cumul de **Palmgren-Miner** (Σ n_i/N_i ≤ 1), coefficient γ_F,fat.
- Détails sensibles : coudes, soudures, ancrages, jonctions. Rarement dimensionnant en bâtiment courant (voir corpus `pathologie_durabilite_reparation.md`).

## 5. Robustesse et effondrement progressif (NF EN 1991-1-7 annexe A)

La **robustesse** est l'aptitude d'une structure à **ne pas subir de dommage disproportionné** par rapport à la cause initiale (explosion, choc, erreur, défaillance localisée d'un élément). Principe : éviter l'**effondrement progressif** « en chaîne » (type Ronan Point).

### Classes de conséquences (EC1-1-7 annexe A — CC)

| Classe | Exemple de bâtiment | Exigence de robustesse |
|---|---|---|
| **CC1** | Maisons individuelles, bâtiments < 4 niveaux, faible occupation | Mesures minimales (bonne conception) |
| **CC2a** (Lower) | Bâtiments courants jusqu'à ~15 m / R+4 | **Chaînages horizontaux** |
| **CC2b** (Upper) | Bâtiments moyens (bureaux, logements > R+4) | Chaînages horizontaux **+ verticaux**, ou vérification du **retrait d'élément** |
| **CC3** | IGH, ERP à forte occupation, ouvrages sensibles | **Analyse de risque systématique** (scénarios) |

### Stratégies (annexe A)

1. **Chaînages** (tie forces) horizontaux (périphériques + intérieurs) et verticaux assurant un **cheminement alternatif** des efforts (effet de membrane, suspension). Voir EC2 §9.10 (chaînages) — corpus `contreventement_stabilite.md`.
2. **Retrait d'élément** (notional member removal) : vérifier que la structure tient si un poteau/voile/poutre est supprimé → la surface effondrée reste **limitée** (≤ 15 % de l'étage ou ~100 m², et plancher adjacent).
3. **Élément-clé** (key element) : si un élément ne peut être retiré, le dimensionner pour une **action accidentelle de référence A_d = 34 kN/m²**.

### Combinaison accidentelle (EC0)

```
E_d = ΣG_kj + A_d + ψ_1,1 Q_k,1 + Σ ψ_2,i Q_k,i
```
γ partiels réduits (situation accidentelle), coefficients ψ_1/ψ_2.

## 6. Garde-fous

- **Poteaux élancés** : ne jamais négliger les effets du 2nd ordre + imperfections + fluage (φ_ef) tant que λ > λ_lim ; cumuler e_0 + e_i + e_2.
- **Torsion d'équilibre** : obligatoirement ferraillée (cadres **fermés** + longitudinaux d'angle) ; vérifier l'interaction T+V sur les bielles.
- **Poinçonnement** : vérifier d'abord v_Rd,max au nu du poteau (non rattrapable par armatures) ; soigner β (excentricité) en rive/angle ; les planchers-dalles sont sensibles.
- **Robustesse** : déterminer la **classe de conséquences** dès la conception ; les chaînages et le cheminement alternatif sont la première ligne de défense.
- Toutes les formules, coefficients et seuils ci-dessus sont **indicatifs (à confirmer par note de calcul)** — la note définitive engage la **responsabilité décennale du BET** (code civil art. 1792).

## Citations à utiliser

- NF EN 1992-1-1 §5.8 (2nd ordre / poteaux élancés : λ_lim, courbure nominale), §5.2 (imperfections)
- NF EN 1992-1-1 §6.3 (torsion : treillis spatial, A_k, T_Rd), §6.4 (poinçonnement : u_1, v_Rd,c/v_Rd,max, β)
- NF EN 1992-1-1 §6.8 (fatigue) + §9.10 (chaînages)
- NF EN 1991-1-7 annexe A (robustesse : classes CC, retrait d'élément, A_d = 34 kN/m²)
- NF EN 1990 (combinaison accidentelle) + AN françaises

**Référence à citer :** EC2 §5.8 / §6.3 / §6.4 (sollicitations particulières) + EC1-1-7 annexe A (robustesse). Sources : afnor.org, eurocodes.fr (CSTB).
