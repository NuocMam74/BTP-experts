# Contreventement, stabilité horizontale et robustesse

**Source :** NF EN 1990 (EC0 — classes de conséquences, robustesse) ; NF EN 1991-1-4 (vent, EC1) ; NF EN 1991-1-7 (actions accidentelles — robustesse, annexe A) ; NF EN 1992-1-1 (EC2) §5.2 (imperfections géométriques), §5.8 (effets du second ordre), §9.10 (chaînages), annexe J (détails de nœuds) ; NF EN 1993-1-1 (EC3) §5.2-5.3 (imperfections, second ordre) ; NF EN 1998-1 (EC8) pour le contreventement sismique (traité dans les corpus sismiques). Le présent corpus traite la **stabilité horizontale au vent (hors sismique)** et la **robustesse**.

## 1. Stabilité horizontale : principe

Une structure doit résister non seulement aux charges **verticales** (gravité) mais aux **actions horizontales** : **vent**, **poussées**, **imperfections géométriques** (défauts de verticalité), effets du **second ordre**, et — traité ailleurs — **séisme**. Le **système de contreventement** collecte ces efforts horizontaux à chaque niveau (via les **diaphragmes**) et les descend jusqu'aux fondations.

```
Effort horizontal (vent) → diaphragme de plancher → éléments verticaux de contreventement → fondations
```

## 2. Diaphragmes (planchers/toitures)

- Le **plancher** (dalle BA, table collaborante, toiture contreventée) agit comme une **poutre horizontale rigide** dans son plan : il **collecte** les efforts de vent et les **répartit** vers les éléments verticaux stabilisateurs.
- **Conditions** : continuité (chaînages périphériques EC2 §9.10), rigidité dans le plan (dalle béton OK ; planchers préfabriqués → clavetage + table de compression ; toitures légères → poutre au vent / croix de Saint-André).
- Un **diaphragme défaillant** (préfa mal claveté, plancher percé de grandes trémies) ne transmet pas correctement les efforts → instabilité.

## 3. Éléments verticaux de contreventement

| Système | Principe | Matériau |
|---|---|---|
| **Voiles / refends BA** | Murs travaillant en console (flexion + cisaillement dans leur plan) | Béton armé |
| **Noyau central** | Cage d'ascenseur/escalier en voiles BA fermés (très grande inertie/torsion) | Béton armé |
| **Palées de stabilité (triangulation)** | Croix de Saint-André, V, K, diagonales | Acier (treillis) |
| **Portiques (cadres) rigides** | Nœuds rigides poteau-poutre reprenant le moment | Acier, béton |
| **Murs de maçonnerie chaînée** | Refends maçonnés chaînés | Maçonnerie (EC6) |

### Distribution des efforts horizontaux

- Répartition **proportionnelle à la rigidité** de chaque élément (les voiles/noyaux raides captent l'essentiel).
- **Centre de torsion** vs **centre de poussée** : si non confondus, **torsion d'ensemble** → efforts additionnels ; rechercher une disposition **symétrique** des contreventements.
- **Stabilité en deux directions orthogonales** + **torsion** : au moins **3 plans de contreventement non concourants et non tous parallèles**.

## 4. Imperfections géométriques (EC2 §5.2 / EC3 §5.3)

Les structures ne sont jamais parfaitement verticales : on introduit une **inclinaison initiale θ_i** équivalente.

### EC2 — bâtiments béton (§5.2)

```
θ_i = θ_0 × α_h × α_m       avec θ_0 = 1/200
   α_h = 2/√l  (coefficient de hauteur, 2/3 ≤ α_h ≤ 1 ; l en m)
   α_m = √(0,5 × (1 + 1/m))  (m = nb d'éléments verticaux)
```
- Se traduit par une **force horizontale fictive** H_i = θ_i × N (N = charge verticale) appliquée à chaque niveau, à **cumuler** avec le vent.

### EC3 — ossatures acier (§5.3)

- Défaut d'aplomb global **φ = φ0 × α_h × α_m** (φ0 = 1/200) + défauts d'arc local des barres (e0/L) selon courbe de flambement.
- Peut être remplacé par des **forces horizontales équivalentes**.

## 5. Effets du second ordre (P-Δ) — structures contreventées ou non

- **Structure à nœuds fixes (contreventée)** : déplacements horizontaux faibles, second ordre **négligeable** si le contreventement est suffisamment rigide (critère de souplesse).
- **Structure à nœuds déplaçables (non contreventée, portiques)** : le déplacement Δ sous charge verticale N génère un **moment additionnel N×Δ** (effet P-Δ) → amplification à vérifier (EC2 §5.8, EC3 §5.2 via α_cr ≥ 10 pour négliger).
- Critère EC3 : si **α_cr = F_cr / F_Ed ≥ 10** (analyse élastique), second ordre global négligeable.

## 6. Détails de nœuds béton (EC2 annexe J)

L'**annexe J de l'EC2** donne les règles de détail (modèles bielles-tirants) pour les **nœuds** courants :

| Nœud | Règle clé |
|---|---|
| **Nœud d'angle de portique (moment fermant)** | Bonne capacité ; armatures continues à l'intrados |
| **Nœud d'angle de portique (moment ouvrant)** | Risque de fendage diagonal : **armatures diagonales** ou boucles ; efficacité limitée si mal ferraillé |
| **Nœud poteau-poutre intermédiaire** | Continuité des aciers, ancrage des barres de poutre dans le poteau, cadres dans le nœud |
| **Encastrement poutre sur poteau** | Modèle bielle-tirant ; ancrage des chapeaux |
| **Consoles courtes / corbeaux** | Modèle bielle-tirant (tirant supérieur ancré, bielle comprimée) — EC2 §6.5 et annexe J |

> Les nœuds sont des **zones de discontinuité (régions D)** où l'hypothèse de Navier ne s'applique pas → **modèles bielles-tirants** (EC2 §6.5).

## 7. Chaînages (EC2 §9.10) — solidarisation et robustesse

Les **chaînages** lient les éléments entre eux pour assurer le **monolithisme** et la **robustesse** (limitation de l'effondrement progressif) :

| Chaînage | Rôle | Effort minimal (indicatif) |
|---|---|---|
| **Chaînage périphérique** (au pourtour de chaque plancher) | Ceinture le diaphragme | F_tie,per = max(l_i × q1 ; q2), souvent ≥ **70 kN** |
| **Chaînage intérieur** | Couture des planchers dans les 2 directions | selon §9.10.2.3 |
| **Chaînage horizontal de liaison aux poteaux/voiles** | Relie les éléments verticaux au plancher | selon §9.10.2.4 |
| **Chaînage vertical** (poteaux/voiles, en élévation) | Continuité verticale, surtout dans les bâtiments en panneaux | selon §9.10.2.5 |

- Les chaînages sont la base de la **stratégie de robustesse** (chemins de report alternatifs).

## 8. Robustesse et effondrement progressif (EC0 + EN 1991-1-7 annexe A)

### Classes de conséquences (EC0 / EN 1990 annexe B)

| Classe | Conséquences | Exemples |
|---|---|---|
| **CC1** | Faibles | Bâtiments agricoles, faible occupation |
| **CC2** | Moyennes | Bâtiments courants (habitation, bureaux) |
| **CC3** | Élevées | ERP grande capacité, tribunes, IGH, ouvrages stratégiques |

→ correspondent aux **classes de fiabilité RC1/RC2/RC3** (coefficients K_FI sur les actions : 0,9 / 1,0 / 1,1).

### Classes de conséquences pour la robustesse (EN 1991-1-7 annexe A)

| Classe | Stratégie de robustesse exigée |
|---|---|
| **CC1** | Aucune mesure spécifique (au-delà du dimensionnement normal) |
| **CC2a** (basse) | **Chaînages horizontaux** efficaces (ou ancrages) |
| **CC2b** (haute) | Chaînages **horizontaux + verticaux** ; ou vérification de la **stabilité en cas de retrait d'un élément porteur** (scénario « élément manquant ») |
| **CC3** | **Analyse de risque** systématique (approche par scénarios) |

### Principes anti-effondrement progressif

- **Continuité et ductilité** (chaînages) pour permettre des **chemins de report alternatifs**.
- **Élément clé** (key element) : si un élément ne peut être « retiré » sans effondrement disproportionné, le dimensionner pour une **action accidentelle** A_d (ex. **34 kN/m²** appliqué selon EN 1991-1-7).
- Éviter les **dispositions à ruine en chaîne** (structures hyperstatiques préférables aux isostatiques pour la robustesse).

## 9. Procédure de vérification de la stabilité horizontale au vent

1. **Évaluer les actions horizontales** : vent (EC1-1-4, par face) + **forces d'imperfection** H_i (EC2 §5.2 / EC3 §5.3).
2. **Vérifier les diaphragmes** (continuité, chaînages, rigidité dans le plan).
3. **Identifier le système de contreventement** dans **les 2 directions** + reprise de la **torsion** (3 plans non concourants).
4. **Distribuer** les efforts selon les rigidités ; vérifier l'**excentricité** centre de torsion / centre de poussée.
5. **Vérifier les éléments** (voiles en flexion-cisaillement, palées en traction/compression, portiques) et leurs **fondations** (soulèvement des palées tendues).
6. **Vérifier le second ordre** (P-Δ) si structure souple / non contreventée (α_cr).
7. **Assurer la robustesse** (chaînages selon classe de conséquence, scénario élément manquant si CC2b/CC3).

## 10. Garde-fous

- **Toujours contreventer dans les deux directions** et reprendre la **torsion** (3 plans non tous parallèles ni concourants) — erreur classique : un seul plan ou des voiles tous parallèles.
- Les **imperfections géométriques** (H_i) se **cumulent** au vent — ne pas les oublier (souvent dimensionnantes pour les bâtiments peu ventés mais élancés).
- Le **diaphragme préfabriqué** doit être justifié (clavetage + chaînage + table) pour transmettre les efforts horizontaux.
- La **robustesse** (chaînages EC2 §9.10 + EN 1991-1-7) est **réglementaire** selon la classe de conséquence — ne pas la traiter implicitement.
- Pour le **contreventement sismique**, l'EC8 prime (ductilité, coefficient de comportement q, dispositions de détail des nœuds) — voir corpus sismiques.
- Les efforts de chaînage minimaux (≥ 70 kN) et les valeurs sont **indicatifs (à confirmer par note de calcul)**.

## Citations à utiliser

- NF EN 1990 (EC0) annexe B (classes de conséquences/fiabilité)
- NF EN 1991-1-4 (vent), NF EN 1991-1-7 (actions accidentelles, robustesse, annexe A)
- NF EN 1992-1-1 (EC2) §5.2 (imperfections), §5.8 (second ordre), §6.5 (bielles-tirants), §9.10 (chaînages), annexe J (nœuds)
- NF EN 1993-1-1 (EC3) §5.2-5.3 (imperfections, second ordre)
- NF EN 1998-1 (EC8) pour le contreventement sismique (corpus dédiés)

**Référence à citer :** EC0 + EC1-1-7 (robustesse) + EC2 §5.2/§9.10/annexe J + EC3 §5.3. Sources : afnor.org, eurocodes.fr (CSTB).
