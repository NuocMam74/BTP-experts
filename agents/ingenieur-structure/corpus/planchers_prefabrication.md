# Planchers et préfabrication — poutrelles-hourdis, prédalles, alvéolaires, collaborants

**Source :** NF EN 1992-1-1 (EC2) — notamment §6.4 (poinçonnement) et §10 (éléments préfabriqués en béton) ; NF EN 13369 (règles communes pour les produits préfabriqués en béton) ; NF EN 15037 (poutrelles-entrevous) ; NF EN 1168 (dalles alvéolaires) ; NF EN 13747 (prédalles) ; NF EN 1994-1-1 (planchers collaborants mixtes, voir corpus EC4) ; DTU 23.5 (planchers à poutrelles) ; **Cahiers des Prescriptions Techniques (CPT) PLANCHERS** du CSTB et **Avis Techniques (ATec) / DTA** des fabricants ; DTU 21 (exécution béton).

## 0. Choix du système selon la portée (rappel)

| Portée | Système usuel |
|---|---|
| < 5,50 m | Poutrelles-hourdis (16+4, 20+5) |
| 5,50 à 6,50 m | Prédalles + dalle de compression |
| 6,50 à 9 m | Dalle pleine BA / prédalle épaisse |
| 7 à 16 m | Dalles alvéolaires précontraintes |
| Grandes portées tertiaires | Plancher collaborant bac acier (EC4) |

## 1. Planchers à poutrelles et entrevous (NF EN 15037, CPT, DTU 23.5)

### Principe

- **Poutrelles** préfabriquées (béton précontraint ou treillis BA) posées sur appuis, espacées de **60 cm** (entraxe courant).
- **Entrevous (hourdis)** posés entre poutrelles : béton, terre cuite, polystyrène (PSE) ou bois (entrevous légers, isolants).
- **Dalle de compression** coulée en place avec treillis soudé (ép. 4 à 5 cm) → notation **« 16+4 »** = entrevous 16 cm + table 4 cm = 20 cm total.

### Dimensionnement

- Le **dimensionnement** des poutrelles relève de l'**Avis Technique / CPT** du fabricant (capacité par poutrelle selon portée, surcharge, classe).
- **Notation courante** : 12+4, 16+4, 20+5, 25+5 (hauteur totale 16 à 30 cm).
- **Table de compression** : treillis anti-fissuration (ST 25 C mini) ; chaînages périphériques et de rives.

### Étaiement

- **Étaiement obligatoire** en phase de coulage (les poutrelles seules ne portent pas le béton frais + chantier sur la pleine portée).
- File(s) d'étais selon la portée (1 file ≤ ~ 4 m, 2 files au-delà), maintenues jusqu'à durcissement suffisant de la dalle (résistance prescrite, souvent 21 jours / décintrement selon CPT).

## 2. Prédalles (NF EN 13747, CPT prédalles)

### Principe

- **Prédalle** = plaque mince préfabriquée (BA ou précontrainte, ép. 5 à 7 cm) servant de **coffrage participant**.
- **Béton complémentaire** coulé en place par-dessus (BA complémentaire) → la prédalle constitue la partie inférieure de la dalle finie (épaisseur totale 16 à 25 cm).
- **Aciers de la dalle finie** : ceux de la prédalle (en travée) + aciers complémentaires (chapeaux sur appuis, renforts de trémie) dans le béton coulé en place.

### Suspentes et couture

- **Armatures de liaison (raidisseurs / suspentes)** dépassant de la prédalle assurent la **couture** prédalle ↔ béton complémentaire (transfert du cisaillement à l'interface, monolithisme) — dimensionnées selon CPT/ATec.
- **Joint entre prédalles** : traitement (bande de pontage, armatures de couture transversale) pour la continuité.

### Étaiement

- **Étaiement** des prédalles obligatoire en phase de coulage (sauf prédalles « auto-portantes » sur faibles portées selon ATec). Files d'étais selon portée et épaisseur.
- Décintrement après atteinte de la résistance prescrite du béton complémentaire.

## 3. Dalles alvéolaires précontraintes (NF EN 1168)

### Principe

- Éléments préfabriqués **précontraints par pré-tension** (torons en partie basse), allégés par des **alvéoles longitudinales**.
- Posés **jointifs**, clavetage des joints longitudinaux au mortier ; portées **7 à 16 m** (jusqu'à ~ 20 m) avec **faible hauteur** (h/L ≈ 1/35 à 1/40).
- **Sans étaiement** (auto-portants à la pose) — atout majeur en délais.

### Mise en œuvre

- **Avec ou sans dalle de compression** rapportée (table collaborante coulée en place pour reprendre la continuité, le diaphragme et les charges réparties supplémentaires).
- **Chaînages** périphériques dans les joints/about ; appuis mini selon ATec.
- **Trémies** : à prévoir à la fabrication (réservations) ou par chevêtres ; éviter les recoupes d'alvéoles non prévues.

### Dimensionnement

- Capacités issues des **catalogues fabricants / ATec** (abaques portée × surcharge × hauteur).
- Vérifications de précontrainte : voir corpus précontrainte (pertes, classes d'exposition, contraintes admissibles à la mise en tension et en service).

## 4. Plancher collaborant à bac acier (mixte — renvoi EC4)

- Tôle acier nervurée (coffrage + armature inférieure) + dalle béton + connexion à la poutre porteuse.
- Dimensionnement selon **NF EN 1994-1-1** (voir corpus `eurocode_4_mixte_acier_beton.md`) : phases coffrage/mixte, cisaillement longitudinal (m-k), connexion par goujons.

## 5. Poinçonnement des planchers-dalles (EC2 §6.4)

Pour les **planchers-dalles** (dalles appuyées directement sur poteaux, sans poutres) et les **dalles sous charge concentrée** (pied de poteau, charge ponctuelle), vérifier le **poinçonnement** :

### Périmètres de contrôle

- **u0** : périmètre du contour du poteau (face).
- **u1** : périmètre de contrôle de référence à **2d** de la face du poteau (d = hauteur utile moyenne).

### Vérifications (art. 6.4.3 — 6.4.5)

```
v_Ed = β × V_Ed / (u_i × d)
```
- **β** : coefficient majorateur d'excentricité (1,15 poteau intérieur ; 1,4 rive ; 1,5 angle — valeurs simplifiées de l'AN).

| Vérification | Critère |
|---|---|
| **Au contour du poteau u0** | v_Ed ≤ v_Rd,max (écrasement des bielles) |
| **Au périmètre u1 sans armatures** | v_Ed ≤ v_Rd,c (résistance béton seul, §6.4.4) |
| **Si v_Ed > v_Rd,c** | Armatures de poinçonnement requises (§6.4.5) jusqu'au périmètre u_out où v_Ed ≤ v_Rd,c |

- **v_Rd,c** = C_Rd,c × k × (100 ρ_l f_ck)^(1/3) ≥ v_min (analogue à l'effort tranchant).
- **Armatures de poinçonnement** : étriers, goujons (studrails), corolles — disposées en couronnes concentriques.

> Le poinçonnement est souvent **dimensionnant** pour l'épaisseur des planchers-dalles ; on renforce localement par **chapiteau**, **augmentation de h**, ou **armatures spécifiques**.

## 6. Diaphragme et stabilité horizontale

- Le plancher (dalle de compression, table collaborante, clavetage alvéolaire) doit pouvoir jouer le rôle de **diaphragme rigide** transmettant les efforts horizontaux (vent, séisme) aux éléments de contreventement — chaînages et continuité indispensables (voir corpus contreventement).
- En **préfabriqué**, le monolithisme du diaphragme dépend des **clavetages, chaînages et table de compression** — point de vigilance EC8 §5.10 (diaphragmes en zone sismique).

## 7. Points de vigilance préfabrication (EC2 §10)

- **Phases provisoires** : manutention, stockage, levage (élingues, points d'ancrage) — vérification des éléments en phase transitoire (souvent plus contraignante que la phase finale).
- **Tolérances de pose**, longueurs d'appui mini, **calage**.
- **Liaisons** (chaînages, couture, clavetage) qui transforment des éléments isostatiques en structure monolithique.
- **Étaiement / décintrement** : ne décintrer qu'après résistance prescrite atteinte.
- **Avis Techniques (ATec) / DTA** : les capacités des produits préfabriqués ne se calculent pas « ex nihilo » — se référer au document du fabricant et au **CPT PLANCHERS** du CSTB.

## 8. Garde-fous

- Les capacités des **poutrelles, prédalles, dalles alvéolaires** relèvent des **Avis Techniques / CPT** : ne pas substituer un calcul « maison » au document du fabricant pour la capacité du produit.
- L'**étaiement** des poutrelles-hourdis et des prédalles est **obligatoire** (sauf produit auto-portant justifié) — son oubli est une cause classique d'effondrement en phase de coulage.
- Vérifier le **poinçonnement** (EC2 §6.4) pour tout plancher-dalle ou charge concentrée — souvent dimensionnant.
- Assurer le **rôle de diaphragme** du plancher (chaînages, clavetages, table) surtout en **zone sismique**.
- Toutes les indications de portée/hauteur sont **indicatives (à confirmer par note de calcul et ATec produit)**.

## Citations à utiliser

- NF EN 1992-1-1 (EC2) §6.4 (poinçonnement) et §10 (préfabrication)
- NF EN 13369 (produits préfabriqués — règles communes)
- NF EN 15037 (poutrelles-entrevous), NF EN 13747 (prédalles), NF EN 1168 (dalles alvéolaires)
- NF EN 1994-1-1 (planchers collaborants — voir corpus EC4)
- DTU 23.5 (planchers à poutrelles), DTU 21 (exécution)
- CPT PLANCHERS du CSTB, Avis Techniques / DTA des fabricants

**Référence à citer :** EC2 §6.4 et §10 + CPT/ATec CSTB + DTU 23.5. Sources : afnor.org, eurocodes.fr et cstb.fr (Avis Techniques).
