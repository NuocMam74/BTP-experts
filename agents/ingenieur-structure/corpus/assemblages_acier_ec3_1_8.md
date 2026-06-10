# Assemblages des structures acier (NF EN 1993-1-8)

**Source :** NF EN 1993-1-8 (calcul des assemblages) et son Annexe Nationale française ; en lien avec NF EN 1993-1-1 (EC3 général), NF EN 1090-2 (exécution, classes EXC), NF EN 14399 (boulons HR précontraints), NF EN 15048 (boulonnerie non précontrainte SB), NF EN ISO 898 (caractéristiques mécaniques de la boulonnerie), NF EN 1992-1-1 (béton — pieds de poteau, EC2 §J/annexe). DTU 32.1 (charpente acier).

## 1. Coefficients partiels (γ_M) — assemblages

| Vérification | Coefficient | Valeur (AN) |
|---|---|---|
| Boulons, soudures, plaques en pression diamétrale | **γ_M2** | **1,25** |
| Boulons précontraints (résistance au glissement ELU) | γ_M3 | 1,25 |
| Boulons précontraints (résistance au glissement ELS) | γ_M3,ser | 1,10 |
| Résistance d'un boulon d'injection | γ_M4 | 1,0 |

## 2. Classification des assemblages (art. 5.2)

### Par rigidité

| Classe | Comportement | Modélisation |
|---|---|---|
| **Articulé (nominalement)** | Transmet l'effort tranchant, **pas le moment** | Rotule |
| **Rigide** | Continuité quasi totale, rotation négligeable | Encastrement |
| **Semi-rigide** | Rigidité intermédiaire (loi M-φ) | Ressort de rotation |

- Critère par la **rigidité initiale en rotation S_j,ini** comparée à E×I/L de la barre (limites k_b = 8 ou 25 selon ossature contreventée ou non).

### Par résistance

- **Articulé** (résistance au moment négligeable), **à pleine résistance** (≥ résistance des barres assemblées), **à résistance partielle**.

### Méthode des composants (art. 6)

L'assemblage est décomposé en **composants élémentaires** (ressorts) : âme de poteau en cisaillement/compression/traction, semelle de poteau en flexion, platine d'about en flexion, boulons en traction, soudures, etc. On évalue la **résistance** et la **rigidité** de chaque composant, puis on **assemble** (le plus faible gouverne) → M_j,Rd et S_j,ini. C'est le cœur de l'EC3-1-8 pour les **assemblages poutre-poteau par platine**.

## 3. Boulons (art. 3)

### Catégories d'assemblages boulonnés (Tab. 3.2)

| Catégorie | Sollicitation | Boulons | Critère |
|---|---|---|---|
| **A** | Cisaillement (pression diamétrale) | Toutes classes (4.6 à 10.9), non précontraints | F_v,Ed ≤ F_v,Rd et F_b,Rd |
| **B** | Cisaillement, résistance au glissement à l'**ELS** | HR précontraints | pas de glissement sous charge de service |
| **C** | Cisaillement, résistance au glissement à l'**ELU** | HR précontraints | pas de glissement à l'ELU (joints sans jeu) |
| **D** | Traction, non précontraints | 8.8/10.9 | F_t,Ed ≤ F_t,Rd |
| **E** | Traction, précontraints | HR précontraints | fatigue, étanchéité, rigidité |

### Classes de boulons (résistance)

| Classe | f_yb (MPa) | f_ub (MPa) |
|---|---|---|
| 4.6 | 240 | 400 |
| 5.6 | 300 | 500 |
| 8.8 | 640 | 800 |
| 10.9 | 900 | 1000 |

Classes **8.8** et **10.9** dominantes ; diamètres courants M12, **M16, M20, M24**, M27, M30.

### Résistances unitaires d'un boulon (Tab. 3.4)

```
Cisaillement :        F_v,Rd = α_v × f_ub × A / γ_M2     (A = A_s si plan dans le filetage)
   α_v = 0,6 (classes 4.6/5.6/8.8) ; 0,5 (10.9)
Pression diamétrale : F_b,Rd = k1 × α_b × f_u × d × t / γ_M2
Traction :            F_t,Rd = k2 × f_ub × A_s / γ_M2     (k2 = 0,9 ; 0,63 pour tête fraisée)
Poinçonnement :       B_p,Rd = 0,6 × π × d_m × t_p × f_u / γ_M2
Cisaillement+traction : F_v,Ed/F_v,Rd + F_t,Ed/(1,4 F_t,Rd) ≤ 1,0
```

### Boulons HR précontraints — résistance au glissement (art. 3.9)

```
F_s,Rd = (k_s × n × μ / γ_M3) × F_p,C        avec F_p,C = 0,7 × f_ub × A_s
```
- n : nombre de plans de frottement ; μ : coefficient de frottement (0,5 classe A surface grenaillée ; 0,2 brute).
- Surfaces préparées (classes de surface A à D) et **serrage contrôlé** au couple / à l'angle (NF EN 1090-2).

### Pinces et entraxes (Tab. 3.3)

- Pince longitudinale **e1 ≥ 1,2 d0** ; transversale **e2 ≥ 1,2 d0** ; entraxe **p1 ≥ 2,2 d0** (d0 = diamètre du trou).
- Maxima pour éviter le voilement / la corrosion entre plats.

## 4. Soudures (art. 4)

### Cordons d'angle (méthode directionnelle ou simplifiée)

```
Résistance par unité de longueur :  F_w,Rd = f_vw,d × a
   f_vw,d = f_u / (√3 × β_w × γ_M2)
```
- **a** = épaisseur de gorge ; **β_w** = coefficient de corrélation (0,80 S235 ; **0,85 S275** ; **0,90 S355** ; 1,0 S460).
- Gorge minimale **a ≥ 3 mm** ; longueur efficace ≥ max(30 mm ; 6a).

### Soudures à pleine pénétration

- Résistance = celle de la **plus faible des pièces assemblées** (pas de calcul du cordon) si exécution et contrôle conformes (END selon EXC).

## 5. Assemblages types

### A — Platine d'about (poutre-poteau, par boulons HR)

- Platine soudée en bout de poutre, boulonnée sur la semelle du poteau.
- **Méthode des composants** : on identifie les **rangées de boulons tendus** (zone supérieure sous moment), modélisées par des **tronçons en T équivalents** (T-stub) ; modes de ruine du T-stub :
  - **Mode 1** : plastification complète de la platine/semelle (mécanisme de flexion).
  - **Mode 2** : plastification de la platine + ruine des boulons.
  - **Mode 3** : ruine des boulons seuls (platine épaisse).
- M_j,Rd = Σ (résistance de rangée × bras de levier). Vérifier aussi l'**âme de poteau** (cisaillement panneau, compression, traction) → souvent raidisseurs requis.

### B — Pied de poteau (platine + tiges d'ancrage + bêche)

Transmet effort normal, moment et effort tranchant à la fondation béton.

| Composant | Vérification | Référence |
|---|---|---|
| **Platine sous compression** | Pression sur le béton ≤ f_jd (béton + frettage) ; aire portante efficace (tronçon en T comprimé) | EC3-1-8 §6.2.5 + EC2 |
| **Tiges d'ancrage en traction** | Résistance acier de la tige (F_t,Rd) + ancrage dans le béton (cône d'arrachement, fendage) | EC2-4 (NF EN 1992-4) |
| **Béton de fondation** | Pression localisée f_jd = β_j × k_j × f_cd | EC2 §6.7 |
| **Cisaillement** | Frottement platine/béton (μ ≈ 0,2-0,3) + tiges + **bêche** si effort important | §6.2.2 |

- **Bêche** (profilé court soudé sous la platine, noyé dans le béton) pour reprendre le cisaillement horizontal lorsque le frottement et les tiges sont insuffisants.
- **Articulé** (platine fine + 2 tiges centrées) vs **encastré** (platine épaisse + 4 tiges + bras de levier + souvent raidisseurs/bêche).

### C — Gousset (assemblage de barres treillis)

- Plaque (gousset) soudée/boulonnée recevant les diagonales et membrures concourantes ; vérifier la **section nette**, la **rupture de bloc** (art. 3.10.2), le cisaillement de groupe de boulons, l'excentricité (lignes d'épure concourantes).

### D — Couvre-joints / éclissage

- Continuité d'une membrure par plats de part et d'autre, boulonnés (catégorie C précontraint pour transmettre le moment sans glissement).

## 6. Vérifications complémentaires

- **Rupture de bloc** (block tearing, art. 3.10.2) : déchirement combiné traction + cisaillement d'un groupe de trous.
- **Effet de levier (prying)** sur boulons tendus (T-stub) — augmente la traction réelle.
- **Voilement** de l'âme de poteau dans le panneau de nœud (cisaillement) → raidisseurs / doublure d'âme.
- **Fatigue** (NF EN 1993-1-9) pour assemblages sous charges cycliques (ponts, supports de machines).

## 7. Exécution (NF EN 1090-2) — classes EXC

| Classe d'exécution | Usage |
|---|---|
| **EXC1** | Structures peu sollicitées, conséquences faibles |
| **EXC2** | **Bâtiment courant** (par défaut) |
| EXC3 | Ouvrages sollicités / publics |
| EXC4 | Ponts, conséquences extrêmes |

- Le **serrage des boulons HR** (au couple, à l'angle, ou combiné) et la **préparation des surfaces de frottement** sont contractuels (PV de serrage).
- **Contrôles de soudure** (END : ressuage, magnétoscopie, ultrasons, radiographie) selon EXC.

## 8. Garde-fous

- L'**assemblage est souvent le maillon faible** : à dimensionner avec autant de soin que les barres (ne jamais le négliger en phase EXE).
- La **classification rigide/articulé/semi-rigide** doit être **cohérente** avec l'hypothèse du modèle de calcul global (un nœud modélisé encastré doit être réellement rigide).
- Pour le **pied de poteau**, vérifier les **trois chaînes** : platine (acier), tiges (acier + ancrage béton EC2-4), béton de fondation (pression) — et le **cisaillement** (frottement / bêche).
- Les **boulons précontraints** exigent surfaces préparées + serrage contrôlé + PV ; un HR « non précontraint » serré au couple ordinaire ne donne **pas** une catégorie B/C.
- Toutes les résistances dépendent de **γ_M2 = 1,25** (et non γ_M0=1,0) — erreur fréquente.
- Les valeurs et choix ici sont **indicatifs (à confirmer par note de calcul d'assemblage EC3-1-8)**.

## Citations à utiliser

- NF EN 1993-1-8 + AN française (assemblages)
- NF EN 1993-1-1 (EC3 général), NF EN 1993-1-9 (fatigue)
- NF EN 1090-2 (exécution, classes EXC), NF EN 14399 (HR précontraints), NF EN 15048 (SB)
- NF EN 1992-4 (ancrages dans le béton — tiges, chevilles) ; EC2 §6.7 (pression localisée)
- DTU 32.1 (charpente acier)

**Référence à citer :** Eurocode 3 partie 1-8 + AN + NF EN 1090. Sources : afnor.org, eurocodes.fr (CSTB).
