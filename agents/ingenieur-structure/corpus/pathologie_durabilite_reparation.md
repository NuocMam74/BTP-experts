# Pathologie, durabilité et réparation du béton

**Source :** NF EN 1992-1-1 (EC2, §4 durabilité et enrobage, §6.8 fatigue) ; NF EN 206/CN (classes d'exposition XC/XD/XS/XF/XA, limitation E/C) ; **NF EN 1504** (parties 1 à 10 — produits et systèmes de réparation et protection des structures en béton) ; recommandations **AFGC** (réparation et renforcement par matériaux composites collés — FRP) ; **FD P 18-464** et recommandations LCPC/IFSTTAR (prévention des désordres dus à la **RAG** et à la **RSI**) ; NF P 95-101/102 (réparation et renforcement). Diagnostic in situ : voir skill `evaluer_pathologie_beton.md`.

## 1. Carbonatation du béton (loi en √t)

La **carbonatation** est la pénétration du CO₂ atmosphérique qui réagit avec la portlandite Ca(OH)₂ du béton :

```
Ca(OH)₂ + CO₂ → CaCO₃ + H₂O
```

→ Le **pH** de la solution interstitielle chute d'environ **13** à **< 9**. Or, l'acier n'est passivé (protégé) que tant que le pH reste élevé (> ~11). Quand le **front de carbonatation** atteint l'armature, le film passif disparaît → **dépassivation** → la corrosion peut s'amorcer si l'humidité et l'oxygène sont présents.

### Loi de progression en racine du temps

La profondeur carbonatée suit une **loi en √t** (diffusion) :

```
x_c(t) = K × √t
```

- x_c : profondeur du front de carbonatation (mm) ; t : temps (années) ; K : coefficient de carbonatation (mm/√an).
- **K** dépend de : qualité du béton (rapport E/C, dosage en ciment, compacité), **humidité relative** (carbonatation maximale autour de **50-70 % HR** ; très lente si béton saturé ou très sec), teneur en CO₂.
- Ordres de grandeur indicatifs : béton courant abrité **K ≈ 3-5 mm/√an** ; béton de bonne qualité **K ≈ 1-2 mm/√an**.

→ La carbonatation est la cause **n°1** de corrosion en **ambiance XC** (façades, intérieur, abrité de la pluie). La **classe XC** et l'**enrobage c_nom** sont calibrés pour que le front n'atteigne pas l'acier sur la durée d'utilisation (50/100 ans). Diagnostic : **test à la phénolphtaléine** (vire au rose si pH > 9 → zone non carbonatée).

## 2. Corrosion des armatures

### Amorçage et propagation

- **Amorçage** : par carbonatation (perte de passivation généralisée) **ou** par **chlorures** (XD/XS — corrosion par piqûres dès un seuil de Cl⁻ ≈ 0,4 % du poids de ciment).
- **Propagation** : l'acier s'oxyde, les produits de corrosion (rouille) occupent un **volume 2 à 6 fois** supérieur au métal d'origine → **pression d'expansion** → **fissuration parallèle à l'armature** puis **éclatement de l'enrobage** (spalling), mise à nu et accélération.

### Cinétique et conséquences structurelles

- **Vitesse de corrosion** v_corr (µm/an) selon humidité, O₂, résistivité du béton et présence de chlorures :
  - Carbonatation, ambiance modérée : **2-20 µm/an**.
  - Chlorures, ambiance humide : **50-200 µm/an** (piqûres très localisées et profondes).
- **Perte de section** d'acier : réduction du diamètre → baisse de A_s → baisse de M_Rd et V_Rd ; perte d'adhérence (l'éclatement détruit l'ancrage) ; perte de ductilité (fragilisation par piqûres).
- **Conséquences** : fissures longitudinales sur poutres/poteaux, éclats avec aciers apparents rouillés, traces de rouille, sous-face de balcons/dalles dégradée.

## 3. Réaction alcali-granulats (RAG) et réaction sulfatique interne (RSI)

### RAG (réaction alcali-silice, RAS / alcali-réaction)

- **Mécanisme** : réaction entre les **alcalins** (Na₂O, K₂O) du ciment et certaines **silices réactives** des granulats, en présence d'**eau** → formation d'un **gel expansif** qui gonfle.
- **Conditions** (les 3 simultanées) : granulats réactifs + alcalins suffisants + humidité (> ~80 % HR).
- **Symptômes** : **fissuration en faïence / réticulée** (maillage), exsudations de gel, fissures orientées par les contraintes (parallèles à la précontrainte), gonflement, parfois pop-outs.
- **Délai** : se développe sur **5 à 20 ans**. Ouvrages exposés : barrages, ponts, ouvrages hydrauliques, fondations massives humides.
- **Prévention** (FD P 18-464) : limiter le **bilan alcalin** du béton, choisir des granulats non réactifs (qualification NR/PR/PRP), additions (cendres, laitier), maîtriser l'humidité.

### RSI (réaction sulfatique interne — formation différée d'ettringite, DEF)

- **Mécanisme** : formation **différée d'ettringite** dans un béton qui a subi un **échauffement excessif au jeune âge** (T° au cœur **> ~65-80 °C**, pièces massives, étuvage mal maîtrisé) → expansion ultérieure en milieu humide.
- **Symptômes** : voisins de la RAG (fissuration, gonflement) — souvent associées.
- **Prévention** : **limiter la température au cœur** au jeune âge (ciment à faible chaleur CEM III, dosage, refroidissement, coulage par plots), recommandations LCPC/IFSTTAR.

> ⚠️ Ne pas confondre avec l'**attaque sulfatique externe** (sulfates du sol/eau → classe **XA**), qui relève de la formulation (ciment **PM/ES** résistant aux sulfates, NF P 15-319).

## 4. Fatigue (EC2 §6.8)

- **Mécanisme** : endommagement sous **chargement cyclique répété** (ponts, planchers industriels, machines, supports de grues) bien avant la résistance statique.
- **Vérification EC2 §6.8** : étendue de contrainte Δσ dans les armatures et le béton, courbes **S-N**, règle d'accumulation de **Palmgren-Miner** (cumul des dommages D = Σ n_i/N_i ≤ 1), coefficient γ_F,fat.
- Détails sensibles : zones d'ancrage, coudes des barres, soudures, jonctions précontraint.
- Pour le bâtiment courant la fatigue est rarement dimensionnante ; elle l'est pour les **ouvrages roulés/vibrants**.

## 5. Réparation et protection (NF EN 1504)

La série **NF EN 1504** structure le **diagnostic → choix de principes → produits → exécution → contrôle**. Elle définit **11 principes** regroupés en deux familles :

### Principes liés aux défauts du béton (P1 à P6)

| Principe | Objet | Méthodes types |
|---|---|---|
| **P1** | Protection contre la pénétration (eau, agents) | Imprégnation, revêtement, colmatage fissures |
| **P2** | Contrôle de l'humidité | Imprégnation hydrophobe, revêtement |
| **P3** | Restauration / réparation du béton | **Mortiers de réparation** (R1 à R4 selon résistance), béton projeté, ragréage |
| **P4** | Renforcement structural | Ajout d'armatures, béton/mortier additionnel, **collage de plats/tissus FRP** |
| **P5** | Résistance physique (abrasion, chocs) | Revêtements, surfaçage |
| **P6** | Résistance chimique | Revêtements résistants |

### Principes liés à la corrosion des armatures (P7 à P11)

| Principe | Objet | Méthodes types |
|---|---|---|
| **P7** | Préservation / restauration de la passivité | Décapage + remplacement du béton carbonaté/chloruré, **réalcalinisation**, **déchloruration** électrochimique |
| **P8** | Augmentation de la résistivité | Revêtements limitant l'humidité |
| **P9** | Contrôle des zones cathodiques | — |
| **P10** | **Protection cathodique** | Anodes sacrificielles (Zn) ou courant imposé |
| **P11** | Contrôle des zones anodiques | Inhibiteurs, revêtement des armatures |

### Mortiers de réparation — classes (NF EN 1504-3)

| Classe | Type | f_c (MPa) | Usage |
|---|---|---|---|
| **R1** | Non structural | ≥ 10 | Ragréage léger |
| **R2** | Non structural | ≥ 15 | Reprise de surface |
| **R3** | Structural | ≥ 25 | Réparation courante |
| **R4** | Structural | ≥ 45 | Réparation à forte sollicitation |

### Démarche type de réparation (P3 + P7)

1. **Purge** du béton dégradé/carbonaté jusqu'au béton sain (derrière les aciers).
2. **Traitement des armatures** : décapage (sablage, brossage), remplacement si perte de section > seuil (~10-15 %), **passivation / primaire** anticorrosion.
3. **Réparation** par mortier R3/R4 (ou béton projeté) avec **accrochage** (rugosité, primaire).
4. **Protection** de surface (P1/P2) : imprégnation hydrophobe ou revêtement anti-carbonatation.
5. **Contrôle** : adhérence (essais de pull-off), enrobage rétabli, w_k.

## 6. Renforcement par composites collés (FRP — recommandations AFGC)

Le **renforcement par matériaux composites** (PRF / FRP : fibres de **carbone CFRP**, **verre GFRP**, **aramide AFRP** dans une matrice époxy) consiste à **coller des plats ou tissus** sur le béton pour augmenter la capacité (recommandations **AFGC** « Réparation et renforcement des structures en béton au moyen des matériaux composites »).

| Application | Effet | Disposition |
|---|---|---|
| **Renfort de flexion** | ↑ M_Rd | Plats/lamelles CFRP collés en fibre tendue |
| **Renfort à l'effort tranchant** | ↑ V_Rd | Bandes/U/enveloppe latérale (wrap) |
| **Confinement de poteaux** | ↑ N_Rd, ductilité | **Frettage** par tissu enroulé (chemisage FRP) — efficace en sismique (EC8-3) |

### Points clés et limites

- Module CFRP élevé (E ≈ 150-200 GPa), résistance en traction très élevée, **non corrodable**, faible épaisseur, mise en œuvre rapide.
- **Modes de ruine spécifiques** : **décollement / délaminage** (peeling à l'about, débonding à mi-portée) → dimensionnant ; ancrage des plats indispensable.
- **Comportement fragile** (pas de palier plastique) → coefficients de sécurité sur la déformation du composite.
- **Tenue au feu médiocre** (résine époxy se dégrade vers 60-80 °C) → protection feu si exigence R, ou hypothèse de perte du renfort en situation d'incendie.
- État du support : béton sain, purge préalable des aciers corrodés (le FRP ne traite pas la corrosion sous-jacente).

## 7. Garde-fous

- Le **diagnostic** (carbonatation, chlorures, RAG/RSI, perte de section) précède toujours la réparation : prélèvements, mesures (phénolphtaléine, profil de Cl⁻, pétrographie) — voir skill dédié.
- La **RAG/RSI** est **irréversible** : la réparation vise à **stopper l'eau** et suivre l'évolution, pas à « guérir » le gel.
- Traiter la **cause** (humidité, chlorures, carbonatation) avant l'effet : un simple ragréage sans purge ni passivation **relance** la corrosion (effet « incipient anode »).
- Le **renforcement FRP** est une étude de spécialiste (modes de décollement, feu) : note de calcul + recommandations AFGC + Avis Technique du système.
- Les **classes de mortier**, vitesses et coefficients ci-dessus sont **indicatifs (à confirmer par note de calcul / diagnostic)** — la réparation structurale engage la **responsabilité décennale du BET** (code civil art. 1792).

## Citations à utiliser

- NF EN 1992-1-1 §4 (durabilité, enrobage), §6.8 (fatigue)
- NF EN 206/CN (classes XC/XD/XS/XF/XA, E/C)
- NF EN 1504-1 à 10 (réparation/protection ; -3 mortiers R1-R4 ; -9 principes P1-P11 ; -10 mise en œuvre)
- FD P 18-464, recommandations LCPC/IFSTTAR (RAG, RSI/DEF), NF P 15-319 (ciments PM/ES)
- Recommandations AFGC (composites collés FRP), NF P 95-101/102

**Référence à citer :** NF EN 1504 (principes P1-P11) + EC2 §4 (durabilité) + AFGC (FRP). Sources : afnor.org, afgc.asso.fr.
