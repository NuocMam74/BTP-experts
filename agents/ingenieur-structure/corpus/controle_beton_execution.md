# Contrôle du béton et de l'exécution (NF EN 206/CN, NF EN 13670 / DTU 21)

**Source :** NF EN 206/CN (béton — spécification, performances, production et conformité ; complément national CN) ; NF EN 13670 + **DTU 21** (NF P 18-201 — exécution des ouvrages en béton) ; NF EN 12350 (essais sur béton frais) et NF EN 12390 (essais sur béton durci) ; NF EN 13791 (évaluation de la résistance in situ — carottage) ; NF EN 1992-1-1 (EC2 — enrobage, dispositions du ferraillage) ; DTU 13.x (fondations). Diagnostic in situ et orientation : voir skill `controler_execution_beton.md`.

## 1. Spécification du béton (NF EN 206/CN)

Un béton se spécifie soit comme **BPS** (béton à propriétés spécifiées — l'usine garantit les performances), soit comme **BCP** (béton à composition prescrite). La désignation BPS combine :

| Caractéristique | Exemple | Référence |
|---|---|---|
| **Classe de résistance** | C25/30 | f_ck cyl / f_ck cube |
| **Classe(s) d'exposition** | XC4, XF1 | risques d'agression (voir EC2 / corpus pathologie) |
| **Classe de consistance** | S3 | ouvrabilité (affaissement) |
| **Dmax granulat** | 22 mm | dimension maximale |
| **Classe de chlorures** | Cl 0,40 | teneur max en chlorures |

→ Exemple de désignation : **C25/30 XC4(F) S3 Dmax 22 Cl 0,40**.

### Classes de consistance (affaissement au cône — NF EN 12350-2)

| Classe | Affaissement (slump, mm) | Usage type |
|---|---|---|
| **S1** | 10 - 40 | Ferme — dallage, pièces peu ferraillées |
| **S2** | 50 - 90 | Plastique |
| **S3** | 100 - 150 | **Très plastique — courant BA bâtiment** |
| **S4** | 160 - 210 | Fluide — voiles ferraillés, pompage |
| **S5** | ≥ 220 | Très fluide (vers BAP) |

> Les **BAP** (bétons autoplaçants) se caractérisent par l'**étalement** (classes SF1/SF2/SF3, NF EN 12350-8) et non l'affaissement.

### Exigences minimales selon exposition (NF EN 206/CN, tableau NA.F)

Pour chaque classe d'exposition, le complément national fixe : **classe de résistance minimale**, **rapport E/C maximal**, **dosage minimal en ciment**, et **type de ciment**. Exemples indicatifs :

| Exposition | f_ck mini | E/C max | C mini (kg/m³) |
|---|---|---|---|
| XC1 | C20/25 | 0,65 | 260 |
| XC4 | C25/30 | 0,60 | 280 |
| XF1 | C25/30 | 0,60 | 280 |
| XF4 | C35/45 (air entraîné) | 0,45 | 340 |
| XS3 / XD3 | C35/45 | 0,45 | 350 |

## 2. Contrôle de production et conformité (NF EN 206/CN)

- **Contrôle de production en usine** (CPU) du producteur, sous **certification NF-BPE** (marque de conformité) → garantit la régularité.
- **Critère de conformité de la résistance** (§8.2) sur la base d'essais de compression à 28 jours :
  - **Production continue** (≥ 35 résultats) : moyenne **f_cm ≥ f_ck + 1,48 × σ** et chaque résultat **f_ci ≥ f_ck − 4 MPa**.
  - **Production initiale** (3 résultats) : f_cm ≥ f_ck + 4 et f_ci ≥ f_ck − 4.
- **Identification à la livraison** : **bon de livraison** (BL) obligatoire — désignation complète, heure de chargement, volume, classe, adjuvants. Le délai d'utilisation et l'**heure limite de mise en œuvre** doivent être respectés.

## 3. Les quatre épreuves du béton (DTU 21 / NF EN 206)

| Épreuve | Quand | Objet | Par qui |
|---|---|---|---|
| **Épreuve d'étude** | Avant chantier (béton non normalisé / BCP) | Vérifier que la **formule** atteint les performances visées (résistance, durabilité) | Producteur / labo |
| **Épreuve de convenance** | Avant le 1er coulage | Confirmer la formule **dans les conditions réelles** du chantier (matériel, transport, mise en œuvre) | Entreprise + labo |
| **Épreuve de contrôle** | Pendant le chantier | Vérifier la **conformité** du béton livré (résistance, consistance) par prélèvements | MOE / contrôle |
| **Épreuve d'information** | À une échéance définie | Connaître la résistance à un âge **différent de 28 j** (décoffrage, mise en tension, décintrement) | Entreprise |

> Pour un **BPS certifié NF-BPE**, l'épreuve d'étude est couverte par la certification du producteur ; l'entreprise reste responsable des épreuves de **convenance, contrôle et information** sur son chantier.

## 4. Prélèvements et essais

### Béton frais (NF EN 12350)

- **Affaissement** (cône d'Abrams, -2) à la livraison → vérifier la classe de consistance.
- **Air occlus** (-7) pour les bétons à air entraîné (XF3/XF4).
- **Température** du béton frais (coulage par temps chaud/froid : bornes de mise en œuvre).

### Béton durci — résistance (NF EN 12390)

- **Confection d'éprouvettes** (cylindres Ø 113 mm × 226 mm ou cubes 150 mm), conservation normalisée (eau ~20 °C).
- **Essai de compression à 28 j** (-3) → f_c ; éprouvettes d'**information** à 7 j ou à l'échéance utile.
- Fréquence de prélèvement selon DTU 21 / marché : p. ex. **1 prélèvement par jour de coulage et par formule**, ou par volume (ex. tous les ~100-150 m³), renforcé pour les ouvrages sensibles.

### Évaluation in situ — carottage (NF EN 13791)

- Quand : doute sur un résultat non conforme, ouvrage existant (diagnostic), litige.
- **Carottes** Ø ≥ 50-100 mm, élancement corrigé (h/d), facteur de conversion vers la résistance « cube/cylindre ».
- Complément **non destructif** : **scléromètre** (rebond, indicatif), **ultrasons** (homogénéité), à étalonner par carottes.
- La résistance **in situ** est évaluée par rapport à f_ck,is (valeur in situ ≈ 0,85 × valeur sur éprouvettes en pratique).

## 5. Exécution des ouvrages en béton (NF EN 13670 / DTU 21)

### Classes d'exécution

La NF EN 13670 définit des **classes d'exécution** liées au niveau d'exigence et de contrôle (cohérentes avec les classes d'inspection). Plus l'ouvrage est sensible, plus le contrôle est renforcé.

### Points clés du DTU 21

- **Coffrages et étaiements** : stabilité, étanchéité, peau (parement), tolérances, résistance aux poussées du béton frais.
- **Mise en place** : vibration (serrage), hauteur de chute limitée (ségrégation), reprises de bétonnage traitées (rugosité, repiquage, barbotine/résine).
- **Cure** : protection contre la dessiccation (essentiel pour la durabilité de peau et la fissuration) — durée selon classe d'exposition et conditions climatiques.
- **Bétonnage par temps chaud / froid** : bornes de température, précautions (eau froide/glace, calorifugeage, retardateurs/accélérateurs).
- **Décoffrage / décintrement** : à la **résistance suffisante** (épreuve d'information), pas seulement au délai.
- **Tolérances dimensionnelles** : aplomb, planéité, position, et surtout **enrobage**.

## 6. Contrôle du ferraillage AVANT coulage (point d'arrêt majeur)

Le **contrôle du ferraillage avant bétonnage** est un **point d'arrêt** essentiel (une fois coulé, plus rien n'est visible) :

| À vérifier | Référence | Tolérance / valeur |
|---|---|---|
| **Diamètres et nombre** de barres | Plan EXE / note de calcul | conforme au plan |
| **Position** (lits, nappes, chapeaux) | Plan EXE | respect des sections en travée/appui |
| **Enrobage** (cales, distanciers) | EC2 §4.4 | c_nom = c_min + Δc_dev (≥ Δc_dev = 10 mm) |
| **Espacements** (barres, cadres/étriers) | Plan / EC2 §8.2 | e_min ≥ max(Ø ; Dmax+5 ; 20 mm) |
| **Recouvrements et ancrages** (l_0, l_bd) | EC2 §8 | longueur et position des recouvrements |
| **Aciers de couture, chaînages, attentes** | EC2 §9 | présence et continuité |
| **Propreté** (rouille non adhérente, terre, huile) | DTU 21 | nettoyage avant coulage |
| **Stabilité de la cage** (ligatures, écarteurs) | — | pas de déplacement au coulage |

→ Établir une **fiche de contrôle / levée de point d'arrêt** signée avant d'autoriser le bétonnage.

## 7. Synthèse — chaîne de contrôle qualité béton

```
Spécification (EC2 + EN 206/CN)  →  Commande BPS / formule
   →  Épreuves (étude / convenance)
   →  Contrôle ferraillage AVANT coulage (point d'arrêt)
   →  Réception à la livraison (BL, consistance, T°)  →  Prélèvements
   →  Mise en œuvre (DTU 21 / EN 13670 : vibration, reprises, cure)
   →  Épreuves de contrôle (28 j) + information (décoffrage)
   →  Conformité (EN 206 §8) → en cas de doute : carottage (EN 13791)
```

## 8. Garde-fous

- Le **contrôle du ferraillage avant coulage** est irréversible : ne pas autoriser le bétonnage sans levée de point d'arrêt (enrobage, position, recouvrements).
- Un **résultat de compression non conforme** ne se conclut pas par le seul rejet : investigation (re-essai, carottage NF EN 13791, étude de l'incidence structurale) avant décision.
- La **cure** est trop souvent négligée : elle conditionne la durabilité de peau (carbonatation, fissuration de retrait) — l'exiger au CCTP et la contrôler.
- Les **classes d'exposition** et exigences (E/C, ciment) priment : un béton « de bonne résistance » mais à mauvaise durabilité reste non conforme à l'usage.
- Valeurs (fréquences, seuils) **indicatives** — la conformité contractuelle relève du CCTP, du DTU 21 et du contrôle extérieur ; la responsabilité de l'exécution engage l'**entreprise** et celle de la conception le **BET** (décennale, code civil art. 1792).

## Citations à utiliser

- NF EN 206/CN (spécification, classes de consistance, conformité §8, BPS/BCP)
- NF EN 13670 + DTU 21 (NF P 18-201 — exécution, coffrage, cure, tolérances)
- NF EN 12350 (béton frais : affaissement, air, T°), NF EN 12390 (durci : compression -3)
- NF EN 13791 (résistance in situ, carottage), NF EN 1992-1-1 §4/§8 (enrobage, ferraillage)
- Marque **NF-BPE** (certification béton prêt à l'emploi)

**Référence à citer :** NF EN 206/CN (conformité) + DTU 21 / NF EN 13670 (exécution) + épreuves. Sources : afnor.org, eurocodes.fr (CSTB).
