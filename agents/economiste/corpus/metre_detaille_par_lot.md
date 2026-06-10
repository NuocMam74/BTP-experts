# Métré détaillé par corps d'état — règles fines de mesurage

**Source :** Recommandations de métré UNTEC ; NF DTU par lot (CSTB) ; fascicules du CCTG (génie civil/TP) ; NF P 03-001 (marchés privés) ; pratiques de cabinet d'économistes. Ce document affine `unites_mesurage_lots.md` : il ne donne pas seulement l'unité, mais **la règle de calcul, les coefficients, les déductions et les pièges** par corps d'état.

> Principe transversal : **quantité ouvrage ≠ quantité matière**. On métré l'ouvrage tel que défini au CCTP/bordereau ; les pertes, foisonnements, recouvrements et chutes vont dans le **déboursé sec** (pertes) ou en **aléas**, pas dans la quantité d'ouvrage, sauf convention de bordereau explicite. Tout ratio chiffré ci-dessous est un **ordre de grandeur, à actualiser à la date de consultation**.

---

## 1. Terrassement (lot VRD / GO terrassement)

### Foisonnement et compactage (par nature de sol)

Le **coefficient de foisonnement Cf** = volume foisonné (après extraction) / volume en place. Le **coefficient de compactage** (ou de retrait) ramène le remblai à son volume compacté.

| Nature de sol | Foisonnement Cf (ordre de grandeur) | Compactage (remblai) |
|---|---|---|
| Terre végétale, sable | 1,10 à 1,20 | 0,90 à 0,95 |
| Argile, limon | 1,20 à 1,35 | 0,85 à 0,90 |
| Marne, sol cohérent | 1,30 à 1,40 | — |
| Roche tendre / altérée (ripable) | 1,40 à 1,50 | — |
| Roche dure (minage / BRH) | 1,50 à 1,75 | — |

Règle : **les volumes de déblai/remblai se mesurent EN PLACE (m³)**. Le foisonnement sert à dimensionner le **transport et l'évacuation** (volume des camions), pas la quantité d'ouvrage. Le compactage sert à dimensionner le **volume d'apport** de remblai (il faut apporter plus que le volume fini compacté).

### Cubature des terrassements

- **Méthode des profils en travers** : on lève des profils espacés (10 à 25 m), on calcule l'aire déblai/remblai de chaque profil, puis le volume entre 2 profils.
- **Méthode du prismatoïde (ou de la moyenne des aires)** :
  ```
  V = (L / 6) × (S1 + 4 × Sm + S2)   (formule du prismatoïde, Sm = section au milieu)
  V ≈ L × (S1 + S2) / 2               (moyenne des aires, plus simple, légèrement majorante)
  ```
- **Méthode des prismes / quadrillage** (terrassement de plateforme) : maillage du terrain, cote moyenne par maille, V = aire maille × (cote projet − cote TN).

### Talus, fruit, sur-largeurs

- Un déblai/remblai n'est jamais vertical : on applique un **fruit de talus** (rapport H/B). Talus courant : **2/3 à 1/1** en déblai meuble, **3/2 (1,5 H pour 1 V)** en remblai. Cela **augmente le volume** à mesurer.
- **Sur-largeur de fouille** pour blindage / accès : +0,40 à +0,60 m par côté en tranchée (impacte le volume et le remblai).

### Déblai / remblai / évacuation

- **Bilan déblai-remblai** : Vremblai_en_place = Vdéblai_réemployé. L'excédent (déblai − remblai réemployable) = **déblai en excès à évacuer** ; le déficit = **apport extérieur**.
- **Évacuation** : volume foisonné = Vexcédent_en_place × Cf → en m³ foisonnés (dimensionne le nombre de rotations de camions et le coût de mise en décharge/ISDI).
- Distinguer **déblai réemployable** (remblai technique conforme), **déblai impropre** (évacuation), **déblai pollué** (filière déchets dangereux, cf. `demolition_desamiantage_dechets_cout.md`).

> Piège : ne jamais payer le remblai d'apport au volume foisonné livré — le mesurage est **en place compacté** ; le foisonnement de livraison est une perte du déboursé.

---

## 2. Gros œuvre (lot 02)

### Coffrage = m² de moule développé ≠ m² d'ouvrage

- Le **coffrage** se métré au **m² de surface coffrante développée** (surface de moule au contact du béton). C'est une quantité de **moyen**, distincte de la quantité d'**ouvrage**.
- **Voile béton** : l'ouvrage facturé est souvent au m² de voile **vu sur une seule face** (cf. `unites_mesurage_lots.md`), mais le coffrage technique nécessite **2 faces** → le sous-détail intègre 2 m² de coffrage par m² d'ouvrage.
- **Poteau** : coffrage = périmètre × hauteur. **Poutre** : coffrage = (2 hauteurs + 1 sous-face) × longueur. **Dalle** : coffrage = surface sous-face + rives.
- Déduire les **vides > seuil** (trémies, réservations) selon convention de bordereau (souvent déduction si > 0,50 m² ou > 1 m²).

### Ratios d'aciers (kg/m³ de béton, par élément) — ordre de grandeur à actualiser

| Élément structurel | Ratio acier (kg/m³ béton) |
|---|---|
| Béton de propreté / forme | 0 |
| Semelles filantes | 40 à 70 |
| Semelles isolées / radier courant | 60 à 100 |
| Voiles BA courants | 40 à 70 |
| Poteaux | 90 à 150 |
| Poutres | 100 à 180 |
| Planchers dalle pleine | 70 à 110 |
| Dalle de parking / superstructure chargée | 100 à 150 |
| Ouvrages élancés / précontraints | à calculer (note de structure) |

> Ratios **indicatifs en l'absence de plan de ferraillage** : dès qu'un plan BA existe, on métré le tonnage réel par diamètre. Logement courant : moyenne tous éléments **≈ 60 à 90 kg/m³** ; parking/tertiaire chargé **≈ 100 à 150 kg/m³**.

### Planchers — selon technologie

| Technologie | Mesurage | Points de vigilance |
|---|---|---|
| **Dalle pleine** coulée en place | m² (épaisseur précisée) + coffrage + acier kg | Étaiement et coffrage de sous-face conséquents |
| **Prédalle** (BA ou précontrainte) | m² de plancher (dalle de compression en sus) + ml d'étais | Compter la **dalle de collaboration** (béton coulé) séparément |
| **Poutrelles-hourdis** (entrevous) | m² de plancher | Distinguer hourdis béton / PSE / bois ; table de compression au m² ; ratio acier de la dalle de répartition |
| **Dalle alvéolée** (précontrainte) | m² + U de dalles + clavetage ml | Levage par grue, réservations à pré-percer |

### Réservations, trémies, scellements

- **Réservations** (gaines, fluides) : compter en **U** par type/dimension ; les déduire du béton si > seuil et les **chiffrer en sujétion** (création coffrage + reprise).
- **Trémies** (escaliers, ascenseurs) : déduire la surface de plancher ; ajouter le linéaire de chevêtre/renfort.

---

## 3. Charpente et couverture (lots 03 / couverture)

### Développé de toiture par coefficient de pente

La surface **rampante** (réelle) ≠ surface en **projection horizontale**. Coefficient de passage :
```
S_rampant = S_projetée_horizontale × (1 / cos α)     où α = angle de la pente
```

| Pente | Angle α | Coefficient 1/cos α |
|---|---|---|
| 30 % | ≈ 16,7° | 1,044 |
| 45 % | ≈ 24,2° | 1,096 |
| 60 % | ≈ 31,0° | 1,166 |
| 80 % | ≈ 38,7° | 1,281 |
| 100 % (1/1) | 45° | 1,414 |

> Règle : la **charpente traditionnelle** se métré souvent en **m² de projection horizontale** (bordereau), la **couverture** en **m² rampant réel**. Ne pas confondre — écart pouvant dépasser 40 % en forte pente.

### Recouvrements (couverture)

- Tuiles / ardoises : la surface **utile** posée est inférieure à la surface développée des éléments du fait des **recouvrements** (pureau). Le métré d'ouvrage est en **m² de toiture finie** ; la quantité de tuiles (matière) intègre le recouvrement → **perte de 10 à 20 %** au déboursé (nombre de tuiles/m²).
- Zinc / bac acier en grandes feuilles : recouvrements et pinces à intégrer en matière.

### Zinguerie au ml

- **Chéneaux, gouttières, noues, faîtières, rives, solins, descentes EP** : tous au **ml** (par développé et nature). La descente EP au ml par diamètre + U pour dauphins/coudes/naissances.
- Le **développé** d'une pièce de zinguerie (largeur de bande à façonner) conditionne le déboursé matière (zinc vendu au m² ou au kg).

---

## 4. Étanchéité (lot étanchéité, NF DTU 43.1 et série 43)

- **Partie courante** : m² de surface étanchée (en plan). Distinguer par complexe (bicouche bitume SBS, monocouche synthétique PVC/TPO/EPDM, asphalte) et par isolant support (épaisseur, λ).
- **Relevés d'étanchéité** : au **ml**, hauteur précisée (mini **15 cm** au-dessus de la protection, NF DTU 43.1) — ils consomment de la matière et de la main d'œuvre sans surface en plan.
- **Costières** (relevés sur édicules, lanterneaux, sorties) : ml + U.
- **Acrotères** : ml (traités côté étanchéité = relevé + bavette).
- **Évacuations / EP de toiture** : U (par DN), avec platines.
- **Protection** : meuble (gravillons, m²), dure (dalles sur plots, m² + U), végétalisée (m² par type extensif/semi-intensif).
- DTU de référence : **NF DTU 43.1** (toitures-terrasses maçonnées), 43.3 (tôles d'acier), 43.4 (bois), 43.5 (réfection).

---

## 5. Menuiseries extérieures et intérieures (lots 06 / 07)

- **Comptage en U par typologie** : chaque dimension × type × performance = une ligne. Ne pas additionner des fenêtres de gabarits différents.
- **Calepinage** : reporter le tableau de menuiseries (repérage MO/MI) du CCTP/plan façade. Chaque repère = U.
- Préciser : dimensions (L × H tableau), nombre de vantaux, ouverture (OB/OF/coulissant), **Uw / Sw**, vitrage, occultation (VR/BSO/volet), motorisation, dormant/rénovation ou dépose totale.
- **Sujétions** : appuis, bavettes, habillages, tapées d'isolation (au ml ou intégrées au U), précadres, ossatures secondaires.
- **Menuiseries intérieures** : portes au U (âme/dimension/bloc-porte), plinthes au ml, placards au U ou ml de façade.

---

## 6. Cloisons et doublages (lot 05)

- **Cloisons / doublages** au **m²**, par système (placo 72/98/120 mm, SAD, contre-cloison), performance acoustique (Rw) et hauteur.
- **Déduction des baies** : on **déduit les ouvertures > 0,50 m²** (convention courante ; vérifier le bordereau — parfois seuil à 1,00 m²). Les baies ≤ 0,50 m² ne sont pas déduites (la sujétion d'encadrement compense).
- **m² brut vs m² fini** : le **m² brut** = surface de l'ouvrage avant traitement des angles/joints ; le **m² fini** intègre bandes, enduit, ponçage. Préciser lequel est chiffré (impacte le déboursé peinture/finition en aval).
- **Hauteur** : cloison toute hauteur ≠ cloison sous faux-plafond. Mesurer du sol fini au plafond (ou sous-face dalle).
- **Plafonds** : m² par type (dalles 600×600 sur ossature, BA13 sur ossature, staff). Déduire trémies/luminaires encastrés selon convention.

---

## 7. Revêtements et peinture (lots revêtements / peinture)

### Surfaces développées et coefficients de finition

- **Peinture** : surface **développée** réelle = surface du support × coefficient selon nature, **déduction des ouvertures > 0,50 m²** (souvent comptées « bord à bord » pour le tableau).
- **Coefficients de développé** (ordre de grandeur, à actualiser) :

| Support | Coefficient sur surface vue |
|---|---|
| Mur lisse | 1,00 |
| Plafond lisse | 1,00 |
| Menuiserie bois (porte 2 faces + chant) | × 2,2 à 3,0 selon type |
| Radiateur (à fonte/à éléments) | × 2,5 à 4,0 |
| Grille / claustra / barreaudage | × 1,5 à 3,0 |
| Tuyauterie ml → m² | développé = π × Ø × ml |

- **Nombre de couches** : impression + 1 ou 2 couches de finition. Le déboursé matière et MO est par couche → un système A3 (3 couches) coûte ~1,4 à 1,6× un A2.
- **Revêtements de sol** : m² par nature (carrelage UPEC, parquet, sol souple). **Pertes** : carrelage 5-10 %, parquet 5-8 %, sol souple en lés 5-10 % (en déboursé, pas en quantité d'ouvrage). Plinthes au ml.

---

## 8. CVC / Plomberie / Électricité — métré de réseaux

### Réseaux au ml par DN / section

- **Plomberie distribution** : ml par **DN** et nature (cuivre, PER, multicouche, PVC-C). Distinguer EF/ECW/bouclage ECS. Robinetterie, vannes, organes = U.
- **Évacuations EU/EV/EP** : ml par **DN** (PVC), + U (siphons, regards, ventilations primaires).
- **CVC** : réseaux hydrauliques ml par DN ; **gaines de ventilation** au ml (rectangulaire = développé au m², circulaire = ml par Ø) ; terminaux (bouches, diffuseurs, registres) = U ; centrales/PAC/CTA = U par puissance.
- **Électricité** : câbles/conduits au **ml par section** (3G1,5 / 3G2,5 / câbles forts) ; appareillage (prises, interrupteurs, DCL) = U ; tableaux/protections = U par modules.

### Ratios de points (ordre de grandeur, à actualiser)

| Réseau | Ratio indicatif |
|---|---|
| Points électriques par logement (NF C 15-100 mini) | ~20 à 40 selon T2→T5 |
| Prises par pièce principale (mini NF C 15-100) | 3 à 5 |
| Points d'eau par logement | 4 à 8 (cuisine + SdB + WC) |
| Bouches VMC par logement | 3 à 6 (cuisine + SdB + WC) |
| Ratio CVC neuf logement collectif | ~80 à 160 €/m² SDP (ordre de grandeur) |
| Ratio électricité neuf logement collectif | ~70 à 130 €/m² SDP (ordre de grandeur) |

> Les **ratios points/logement** servent au cadrage amont (APS) ; en PRO, on métré sur plans de réseaux et schémas. NF C 15-100 fixe les **minima** (à respecter, jamais en dessous).

---

## 9. VRD (lot VRD / TP)

### Structures de chaussée par couche

Une chaussée se métré **couche par couche**, chacune en **m² × épaisseur** (ou m³) et par matériau :

| Couche | Mesurage | Matériaux types |
|---|---|---|
| Forme / PST | m² (+ traitement éventuel) | sol traité chaux/LHR |
| Couche de fondation | m² × ép. ou m³ | GNT 0/31,5, grave-ciment |
| Couche de base | m² × ép. | GNT, grave-bitume (GB) |
| Couche de liaison | m² × ép. | enrobé (EB-liaison) |
| Couche de roulement | m² × ép. | BBSG, BBTM, enrobé tiède |
| Bordures / caniveaux | ml | T2, CS, A2 |

### Profils en travers et réseaux VRD

- **Voirie** : profils en travers pour cubature des terrassements (cf. §1) ; surfaces de couches en m².
- **Réseaux enterrés** (EU, EP, AEP, gaz, télécom, BT/HTA) : **ml par DN et nature** en fond de fouille ; tranchées en m³ (en place) ; lit de pose et enrobage sablon au m³ ou ml ; grillage avertisseur au ml.
- **Ouvrages ponctuels** : regards, bouches, chambres télécom, postes = U (par DN/profondeur).
- **Assainissement** : NF DTU 60.1 / fascicule 70 (CCTG) pour les règles de pose.

---

## Pièges de métré transversaux (récapitulatif)

- **Coffrage** = m² de moule (2 faces voile) ≠ m² d'ouvrage (1 face). Ne pas confondre dans le sous-détail.
- **Toiture** : projection horizontale (charpente) ≠ rampant réel (couverture) — appliquer 1/cos α.
- **Acier** : toujours en **kg** (jamais ml), via tonnage réel ou ratio kg/m³ par élément.
- **Béton** : volume **en place** (le foisonnement de la toupie/pertes est au déboursé).
- **Terrassement** : volumes **en place** ; foisonnement pour l'évacuation, compactage pour l'apport.
- **Cloisons/peinture** : déduire les baies **> 0,50 m²** (vérifier le seuil du bordereau).
- **Réseaux** : ml par **DN/section** + U pour les organes — ne pas globaliser en forfait sans détail.

**Référence à citer :** Recommandations de métré UNTEC ; NF DTU par lot (CSTB) ; fascicules CCTG (TP/VRD) ; NF C 15-100 (électricité) ; NF DTU 43.1 (étanchéité). Tout ratio = ordre de grandeur à actualiser à la date de consultation.
