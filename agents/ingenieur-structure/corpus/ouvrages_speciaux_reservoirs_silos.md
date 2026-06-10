# Ouvrages spéciaux — réservoirs, silos, cuvelage (NF EN 1992-3)

**Source :** NF EN 1992-3 (EC2 partie 3 — silos et réservoirs : structures de stockage de liquides et de matières granulaires) + son Annexe Nationale française ; NF EN 1991-4 (EC1-4 — actions sur les silos et réservoirs) ; NF EN 1992-1-1 (EC2-1-1, base : §7.3 maîtrise de la fissuration) ; NF P 11-221 (DTU 14.1 — cuvelage) ; NF EN 206/CN (béton, classes XA/XC) ; NF EN 1990 (combinaisons). Pour la précontrainte circonférentielle : EC2 §5.10 (voir corpus `precontrainte_principes.md`).

## 1. Domaine et principe

Les **réservoirs** (stockage de liquides : eau potable, eaux usées, effluents, hydrocarbures) et **silos** (matières granulaires/pulvérulentes : céréales, ciment, clinker, granulats) sont des structures où **l'étanchéité et la maîtrise de la fissuration** sont aussi déterminantes que la résistance. La traction des parois (effet de cerce sous pression interne) est l'action prépondérante → la **fissuration traversante** doit être empêchée ou strictement limitée pour garantir l'étanchéité et la durabilité.

```
Paroi cylindrique sous pression interne p, rayon r :
effort de traction circonférentiel (cerce)  N_θ = p × r  (par unité de hauteur)
```

## 2. Classes d'étanchéité (NF EN 1992-3 §7.3.1, Tab. 7.105)

L'EC2-3 définit **4 classes d'exigence d'étanchéité (tightness classes)** qui pilotent le critère de fissuration :

| Classe | Exigence | Critère sur la fissuration |
|---|---|---|
| **Classe 0** | Fuite tolérée, ou sans conséquence | Limites de w_k de l'EC2-1-1 §7.3.1 (w_max = 0,3 mm courant) |
| **Classe 1** | Fuites limitées à une faible quantité ; taches/humidité de surface admises | Fissures **traversant la section** limitées à **w_k1** ; cicatrisation (autocolmatage) escomptée si la traction n'est pas dominante |
| **Classe 2** | Fuites minimales ; aspect esthétique ; pas de taches | **Pas de fissures traversantes** sous combinaison quasi-permanente → zone comprimée résiduelle exigée |
| **Classe 3** | Étanchéité totale (aucune fuite) | Étanchéité assurée par revêtement, membrane, liner ou précontrainte ; pas de traversée d'eau |

### Critère de la classe 1 — fissures traversantes

Tant qu'une fissure traverse toute la section tendue (paroi en traction simple ou flexion composée à axe neutre hors section), l'EC2-3 limite son ouverture à **w_k1**, fonction du **gradient hydraulique** h_D/h (hauteur de fluide / épaisseur de paroi) :

```
h_D/h ≤ 5   →  w_k1 = 0,20 mm
h_D/h = 35  →  w_k1 = 0,05 mm
(interpolation linéaire entre les deux ; min ≈ 0,05 mm)
```

→ Plus la pression est forte par rapport à l'épaisseur, plus l'ouverture admissible est faible. L'**autocicatrisation** (dépôt de carbonates) referme les fissures fines (< ~0,2 mm) si le débit de fuite reste très faible.

### Classe 2 — section partiellement comprimée

On exige qu'une **bande comprimée** subsiste sur l'épaisseur (largeur ≥ min(50 mm ; 0,2 h)) pour qu'aucune fissure ne traverse → vérification que l'axe neutre reste dans la section sous combinaison **quasi-permanente**.

## 3. Maîtrise de la fissuration en traction (gêne aux déformations imposées)

Dans les réservoirs, la fissuration est souvent due aux **déformations imposées gênées** (retrait du béton + gradient thermique d'hydratation au jeune âge, bridage par la fondation/radier) bien plus qu'aux charges. On applique l'EC2-1-1 §7.3 avec les compléments de l'EC2-3 :

- **Section minimale d'armature de maîtrise de fissuration** (§7.3.2) :
  ```
  A_s,min = k_c × k × f_ct,eff × A_ct / σ_s
  ```
  - f_ct,eff : résistance en traction effective au moment de la fissuration (≈ f_ctm, ou valeur au jeune âge si fissuration précoce).
  - k_c : 1,0 (traction pure) ; ≈ 0,4 (flexion).
  - σ_s : contrainte admise dans l'acier, limitée par le **diamètre maximal Ø_s*** ou l'**espacement maximal** (Tab. 7.2N/7.3N) pour respecter w_max.
- **Espacement des fissures** s_r,max et **ouverture** w_k = s_r,max × (ε_sm − ε_cm) (§7.3.4).
- Privilégier des **barres de petit diamètre rapprochées** (plus efficaces que de grosses barres) pour répartir et fermer la fissuration.

### Dispositions constructives anti-fissuration

- **Joints de retrait/dilatation** et plots de bétonnage : limiter la longueur coulée d'un seul tenant (souvent ≤ 15-20 m), bétonnage alterné.
- **Cure prolongée**, ciments à faible chaleur d'hydratation (CEM III), maîtrise de la T° au cœur.
- **Waterstops** (joints water-stop) aux reprises et joints.
- Liaison radier-voile : congé, ferraillage de continuité, gestion du bridage.

## 4. Actions sur les silos et réservoirs (NF EN 1991-4)

L'EC1-4 fournit les **pressions exercées par les matières stockées** :

### Silos — pressions de la matière ensilée

- **Pression horizontale** p_h sur la paroi et **frottement** p_w (théorie de **Janssen** pour la zone basse) :
  ```
  p_ho = (γ / (K × μ)) × A/U      (pression horizontale asymptotique, paroi verticale)
  p_h(z) = p_ho × (1 − e^(−z/z_o))
  ```
  - γ : poids volumique du produit ; K : rapport pression latérale/verticale ; μ : coefficient de frottement paroi ; A/U : aire/périmètre de la section.
- **Phases de remplissage** (filling) et de **vidange** (discharge) : la vidange majore les pressions (coefficients de majoration, pressions de **flux dynamiques**, effet « switch »).
- **Charges dissymétriques** (patch loads) pour l'effet d'excentrement de vidange → flexion parasite de la virole.
- **Classes de conséquence** AAC 1/2/3 (Action Assessment Class) selon capacité et type d'écoulement, conditionnant le niveau de raffinement du calcul.

### Réservoirs — actions liquides

- **Pression hydrostatique** p(z) = γ_liquide × z (γ_eau = 10 kN/m³).
- **Poussée des terres** sur cuves enterrées (côté extérieur, EC7), **sous-pression** (poussée d'Archimède sous le radier — risque de **soulèvement à vide** : vérification au flottement, lestage ou ancrage).
- **Actions sismiques des liquides** : pression **impulsive** (mouvement solidaire) + **convective** (ballottement / sloshing, revanche libre à prévoir) — EC8-4.

## 5. Cuvelage (NF P 11-221 / DTU 14.1)

Le **cuvelage** est un ouvrage en béton conçu pour assurer l'**étanchéité d'un local enterré** soumis à la pression de la nappe phréatique (sous-sols, parkings, locaux techniques). Le DTU 14.1 distingue :

| Type de cuvelage | Principe | Étanchéité |
|---|---|---|
| **Cuvelage à structure relativement étanche** | Le béton (qualité, ferraillage anti-fissuration, w_k maîtrisé) constitue lui-même la barrière | Béton seul (classe d'étanchéité visée) |
| **Cuvelage avec revêtement d'étanchéité** | Revêtement (minéral, asphalte, membrane) placé côté pression ou côté intrados | Revêtement + structure |
| **Cuvelage avec drainage** | Rabattement/évacuation organisée de l'eau (cas où la pression permanente n'est pas admise) | Drainage permanent contrôlé |

- **Hauteur de nappe de calcul** : niveau le plus défavorable (crue, nappe haute) → définit la pression de dimensionnement.
- **Vérification au soulèvement** (poids propre + lest ≥ sous-pression × coefficient).
- **Maîtrise de la fissuration** (w_k) du radier et des voiles côté eau, mêmes principes qu'un réservoir.
- Coordination avec l'**étude G2** (niveau et agressivité de la nappe → classes XA).

## 6. Précontrainte des réservoirs (rappel)

Les réservoirs cylindriques de grande capacité (château d'eau, bâche industrielle) sont fréquemment **précontraints circonférentiellement** (post-tension par câbles enroulés ou torons gainés) pour **maintenir le béton en compression** sous la pression interne → **décompression** évitée, donc **aucune fissure traversante** (classe d'étanchéité élevée). Voir corpus `precontrainte_principes.md` (EC2 §5.10, limitation des contraintes ELS).

## 7. Principes de calcul — synthèse

1. **Définir la classe d'étanchéité** (0 à 3) selon l'usage (eau potable, effluent, esthétique) → critère w_k.
2. **Combinaisons** (EC0) : ELU (résistance, flottement), ELS **quasi-permanent** (fissuration, décompression), accidentel (sismique avec ballottement).
3. **Actions** (EC1-4) : hydrostatique/Janssen, terres, sous-pression, thermique, sismique.
4. **Vérification de fissuration** (EC2-1-1 §7.3 + EC2-3 §7.3.1) : A_s,min, σ_s limitée, w_k ≤ w_max de la classe ; section comprimée résiduelle (classe 2).
5. **Durabilité** : classes d'exposition souvent **XC4 + XA** (effluents) ou **XD/XS** ; enrobage majoré.
6. **Dispositions** : joints, water-stops, bétonnage par plots, cure, ciment à faible chaleur.

## 8. Ordres de grandeur indicatifs (à confirmer par note de calcul)

| Ouvrage | Épaisseur paroi indicative | Remarque |
|---|---|---|
| Réservoir BA Ø 10-20 m, h 4-6 m | **20 à 30 cm** | Ferraillage de cerce + verticaux, classe 1/2 |
| Réservoir précontraint Ø 30-50 m | 25 à 40 cm | Post-tension circonférentielle |
| Silo BA cylindrique | **18 à 30 cm** (virole) | Selon Ø, hauteur, vidange |
| Cuvelage sous-sol (voile) | 25 à 35 cm | Selon hauteur de nappe |
| Radier de cuve/cuvelage | 30 à 60 cm | Selon sous-pression et portée |

Ces valeurs sont **indicatives (à confirmer par note de calcul)**.

## 9. Garde-fous

- Le calcul des **réservoirs/silos** relève d'une **spécialité** (fissuration au jeune âge, déformations imposées gênées, actions de vidange, ballottement sismique) : note de calcul par un BET qualifié.
- La **classe d'étanchéité** doit être **fixée par le maître d'ouvrage/programme** (eau potable ≠ effluent ≠ esthétique) avant tout dimensionnement.
- La **fissuration de retrait au jeune âge** (bridage radier/voile) est souvent **plus dimensionnante** que les charges de service : ne pas la négliger.
- **Sous-pression / flottement** : toujours vérifier le réservoir/cuvelage **à vide** sous nappe haute.
- Sismique : prévoir la **revanche libre** (ballottement) et vérifier les pressions impulsive + convective (EC8-4).
- Valeurs et épaisseurs ci-dessus **indicatives** — la note de calcul finale engage la **responsabilité décennale du BET** (code civil art. 1792).

## Citations à utiliser

- NF EN 1992-3 (réservoirs/silos) §7.3.1 (classes d'étanchéité 0-3, w_k1) + AN française
- NF EN 1991-4 (actions sur silos/réservoirs : Janssen, remplissage/vidange, patch loads)
- NF EN 1992-1-1 §7.3 (maîtrise de la fissuration, A_s,min)
- NF P 11-221 / DTU 14.1 (cuvelage : structure étanche, revêtement, drainage)
- NF EN 206/CN (classes XA/XC/XD/XS), NF EN 1998-4 (sismique réservoirs/silos)

**Référence à citer :** EC2-3 §7.3 (étanchéité) + EC1-4 (actions) + DTU 14.1 (cuvelage). Sources : afnor.org, eurocodes.fr (CSTB).
