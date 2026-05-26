# Skill — Contrôler une note de calcul structure

L'utilisateur te transmet une **note de calcul béton armé / charpente acier / charpente bois**. Tu dois la **contrôler critiquement** au regard des **Eurocodes (NF EN 1990 à 1998)**, de leurs **Annexes Nationales françaises**, et des **DTU applicables**.

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **Note de calcul** (PDF, parfois 50 à 500+ pages) — Robot, Advance, Graitec, Arche, Tedds, RFEM, calcul manuel
- **Plans de coffrage et ferraillage** correspondants
- **Rapport géotechnique** G1/G2/G3 (NF P 94-500)
- **CCTP structure**
- **Plan masse** (pour vent, neige, sismique)
- **Notice descriptive** (destination, hauteur, programme)

Si pas de note fournie : pose ces questions :
1. Bureau d'études signataire (nom + qualification OPQIBI 1330/1331/1333) ?
2. Logiciel utilisé et version ?
3. Phase du projet (APS, APD, PRO, DCE, EXE) ?
4. Indice de révision et date ?
5. Catégorie d'importance bâtiment (I / II / III / IV) selon EC8 § 4.2.5 ?
6. Catégorie d'usage selon EC1-1-1 ?
7. Bâtiment, lot, ouvrage spécifique concerné par la note ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("EC0 NF EN 1990 §6.4 combinaisons d'actions")` — γ et ψ
- `rag_search("EC2 NF EN 1992-1-1 §4 durabilité enrobage")`
- `rag_search("EC2 §9 dispositions constructives armatures")`
- `rag_search("EC3 NF EN 1993-1-1 classes de sections")`
- `rag_search("EC5 NF EN 1995-1-1 kmod kdef classes de service")`
- `rag_search("EC8 NF EN 1998-1 zonage spectre catégorie sol")`
- `rag_search("annexe nationale française EC2 EC3 EC5 EC8")`
- `rag_search("arrêté 22 octobre 2010 sismique commune zone")` (pour vérifier zone sismique)
- `rag_search("NF P 94-500 missions géotechniques G1 à G5")`

## 3. Procédure de contrôle

### Étape 1 — Identification générale

| Item | Où chercher | Notes |
|---|---|---|
| BE signataire | Cartouche / page de garde | Vérifier OPQIBI 1330 (BA), 1331 (acier), 1333 (bois) |
| Date / indice | Cartouche | Notes anciennes (> 12 mois) à actualiser |
| Logiciel + version | Page hypothèses | Cohérence avec normes en vigueur (Eurocodes actualisés) |
| Phase | Note de présentation | G2 PRO + EC = PRO ; G3-G4 = EXE |
| Bâtiment / Lot | Page 1 | Croiser avec plans |

### Étape 2 — Extraction des hypothèses générales

| Hypothèse | Valeur typique | Vérification |
|---|---|---|
| **Béton** | C25/30 (logt courant) à C50/60 (HPC) | Cohérent classe d'exposition ? |
| **Acier HA** | B500B (le plus courant) ou B450C (sismique zones 3-5) | B500A déconseillé sismique |
| **Bois** | C24 (structure courante), GL24h / GL28h (lamellé-collé) | Classes service 1/2/3 |
| **Acier construction** | S235 / S275 / S355 | EN 10025-2 |
| **Classe exposition béton** | XC1 (intérieur) à XS3 (mer) | Voir tableau §3 ci-dessous |
| **Classe structurale** | S4 = 50 ans / S5 = 75 ans / S6 = 100 ans | Détermine enrobage |
| **Catégorie d'importance** | I / II / III / IV | EC8 § 4.2.5 — ERP J, U, scolaires R → III ou IV |
| **Zone sismique** | 1 à 5 | Arrêté 22/10/2010 — vérifier commune |
| **Catégorie sol sismique** | A / B / C / D / E / S1 / S2 | EC8 § 3.1.2 |
| **Catégorie d'usage Q** | A à K (EC1-1-1 § 6.3) | Cohérent destination |
| **Région neige** | A1 à E (AN française EC1-1-3) | Géolocalisation |
| **Région vent** | 1 à 4 (AN française EC1-1-4) | Géolocalisation |
| **Catégorie terrain (vent)** | 0 à IV | Environnement projet |
| **Durée utilisation** | 50 ans (catégorie 4) à 100 ans (catégorie 5) | EC0 tab 2.1 |

### Étape 3 — Vérification des classes d'exposition (souvent erronées)

| Localisation | Classe attendue | Erreur courante |
|---|---|---|
| Pièces intérieures sèches (habitation) | XC1 | Souvent OK |
| Pièces humides (SDB) | XC3 | XC1 par défaut → faux |
| Façades extérieures non protégées | XC4 + XF1 minimum | XC1 ou XC2 → faux |
| Fondations sur sol non agressif | XC2 | OK si pas d'agressivité XA |
| Fondations en sol agressif | XC2 + XA1/2/3 | XA souvent oublié → faux |
| Bâtiments littoraux (< 1 km mer) | XS1 minimum | XC4 → insuffisant |
| Bâtiments en zone gel sévère + humide | XF3 ou XF4 + sels | Souvent sous-évalué |
| Toiture-terrasse exposée | XC4 + XF3 | XC1 → faux |
| Parking exposé sels déverglaçage | XD3 | Crucial pour enrobage 45 mm |
| Piscine bassin | XD2 | Bétons à composition spéciale |

### Étape 4 — Vérification des combinaisons (EC0 §6.4 + AN française)

**ELU fondamentale (situation durable / transitoire)** :
```
1,35 × Gk,sup + 0,9 × Gk,inf + 1,5 × Qk,1 + ∑ 1,5 × ψ0,i × Qk,i
```

**ELU sismique (situation sismique)** :
```
Gk + ∑ ψ2,i × Qk,i + AEd
```
où AEd = action sismique avec spectre EC8

**ELS caractéristique** :
```
Gk + Qk,1 + ∑ ψ0,i × Qk,i
```
→ Vérification flèches actives, ouverture fissures, contraintes en service

**ELS quasi-permanente** :
```
Gk + ∑ ψ2,i × Qk,i
```
→ Vérification flèches long terme (avec coefficient kdef pour bois)

**Vérifications** :
- Toutes les combinaisons **pertinentes** sont-elles considérées ?
- Si **bâtiment sismique** : combinaisons sismiques **présentes** ?
- Si **rampe parking, gymnase, archives** : combinaison avec charge concentrée Qk vérifiée ?
- Coefficients **ψ0, ψ1, ψ2** corrects selon catégorie d'usage et type d'action (neige altitude < 1000 m vs > 1000 m, vent, etc.) ?
- Si **inégal** chargement (charges variables d'un côté seulement) → exploration des combinaisons défavorables effective ?

### Étape 5 — Vérification des méthodes spécifiques

#### Béton armé (EC2)
- Sections minimales armatures (§9) → voir skill `analyse_plan_ferraillage`
- Enrobages selon classe d'exposition (§4.4)
- Longueurs d'ancrage et de recouvrement (§8.4 / 8.7)
- Vérification effort tranchant (§6.2 — avec/sans aciers transversaux)
- Vérification flèche (§7.4 — limites L/250 ou L/500)
- Vérification fissuration (§7.3 — wk,max selon classe d'exposition)

#### Charpente acier (EC3)
- Classification de section (1 à 4) — détermine méthode de calcul
- Vérification résistance section (§6.2)
- Vérification flambement (§6.3) — coefficients d'imperfection
- Vérification déversement (§6.3.2)
- Vérification voilement (§6.3.3)
- Vérification assemblages (boulons HR, soudures, EC3-1-8)
- Classe acier S235/S275/S355 — vérifier Charpy K si température < -5 °C

#### Charpente bois (EC5)
- Classe de service 1 / 2 / 3 — détermine kmod
- Coefficient kmod (durée d'application × classe service) — tab. 3.1 EC5
- Coefficient kdef (déformation long terme — fluage)
- Vérification résistance flexion, traction, compression, cisaillement
- Vérification stabilité (flambement, déversement)
- Vérification assemblages (broches, boulons, plaques métalliques) — EC5 chap. 8

#### Géotechnique (EC7)
- Méthode pressiométrique (Ménard) ou pénétrométrique (CPT, SPT)
- Vérification capacité portante ELU et ELS
- Vérification tassements
- Vérification poinçonnement local (semelles, radier)

### Étape 6 — Vérification cohérence avec rapport géotechnique

- Mission disponible **suffisante** pour la phase (G2 PRO pour PRO, G3+G4 pour EXE) ?
- **Valeurs adoptées** dans la note ≤ valeurs caractéristiques du rapport G ?
- Classes XA prises en compte pour bétons de fondation ?
- Hypothèses **niveau de nappe** cohérentes (cuvelage si nécessaire) ?
- Type de fondations conforme aux **recommandations** du géotechnicien ?

## 4. Restitution structurée

```
## Contrôle note de calcul — [Bâtiment / Lot / Ouvrage]

### Identification
- **Bureau d'études** : [nom], OPQIBI [n°], qualification [BA / acier / bois]
- **Date / indice** : [...]
- **Logiciel** : [nom + version]
- **Phase** : [APS / APD / PRO / DCE / EXE]
- **Référence** : [n° note + indice]

### Hypothèses extraites

| Item | Valeur déclarée | Vérification | Commentaire |
|---|---|---|---|
| Béton | C25/30 | ✅ | Cohérent logt courant intérieur |
| Acier HA | B500B | ✅ | Standard |
| Classe d'exposition | XC1 | ⚠️ | Façade en XC4 attendu |
| Classe structurale | S4 (50 ans) | ✅ | Bâtiment courant |
| Catégorie d'importance | II | ✅ | Logement collectif |
| Zone sismique | 2 (faible) | ❌ | Commune en zone 3 (modérée). Combinaisons sismiques à reprendre. |
| Catégorie sol sismique | C | ⚠️ | À confirmer par G2 — site potentiel S1/S2 |
| Région neige | A1 (sk = 0,45 kN/m²) | ✅ | Cohérent département |
| Région vent | 2 (vb,0 = 24 m/s) | ✅ | Cohérent terrain II |
| Catégorie usage Q | A (1,5 kN/m²) | ✅ | Logement |
| Durée utilisation | 50 ans | ✅ | Catégorie 4 EC0 |
| Mission géotechnique | G2 AVP | ⚠️ | G2 PRO requis pour la phase PRO |

### Combinaisons d'actions
| Combinaison | Présente | Coefficients | Commentaire |
|---|---|---|---|
| ELU fondamentale | ✅ | γG = 1,35 / γQ = 1,5 | OK |
| ELU sismique | ❌ | — | À ajouter (zone 3 + cat. II) |
| ELS caractéristique | ✅ | — | OK |
| ELS quasi-permanente | ✅ | ψ2A = 0,3 | OK |

### Points d'attention

1. **Zone sismique** ❌ — Commune en zone 3 modérée (arrêté 22/10/2010), note déclare zone 2. **Bloquant** : combinaisons sismiques à reprendre intégralement (impact poteaux, chaînages, joints, voile sismique).

2. **Classe d'exposition façade** ⚠️ — XC1 sur façade non protégée → XC4 + XF1 attendu. **Enrobage 15 mm vs 30 mm requis**. Reprise enrobage et ferraillage de peau.

3. **Mission géotechnique** ⚠️ — G2 AVP fournie en phase PRO. La norme NF P 94-500 prévoit une G2 PRO. Risque d'écart sur valeurs caractéristiques.

4. **Sol sismique catégorie C** ⚠️ — À confirmer par G2. Si S1/S2 (sol mou), spectre EC8 plus défavorable → reprises calcul.

5. **Combinaisons partielles** ⚠️ — Combinaisons inégales (charges variables sur 1 seul appui) non explorées dans le balayage.

### Synthèse

- **Note** : **à reprendre intégralement** (sismique zone 3 non considérée — point bloquant)
- **Niveau de confiance** : faible tant que points 1 et 2 non corrigés
- **Responsabilité décennale** : engagée par le **BE structure signataire** (Code civil art. 1792 et suivants). Le contrôle agent ne s'y substitue pas.
- **Pièces à demander au BE** : note révisée indice [B], étude G2 PRO complète, plan de joints sismiques, carnet ferraillage façade.

### Suites recommandées
- Demande révision note indice [B] intégrant points 1 à 5
- Demande mission **G2 PRO** au géotechnicien
- Saisine **bureau de contrôle** (Apave, Socotec, Bureau Veritas) en classe BCT, BPH, BSO selon contexte
- Coordination avec **MOE et MOA** pour impact sur planning et budget
```

## 5. Garde-fous spécifiques

- Tu **n'engages pas** ta responsabilité — tu prépares un **avis critique** à destination de l'ingénieur structure utilisateur, **qui décide**.
- Pour les **classes d'exposition** : ne jamais te contenter du minimum déclaré sans vérifier l'environnement réel — XC1 sur façade extérieure est une erreur fréquente et **bloquante**.
- Pour la **zone sismique** : si la zone déclarée ne correspond pas à la **commune** (arrêté 22 octobre 2010), c'est **bloquant** — toutes les combinaisons sismiques sont à reprendre.
- Pour la **mission géotechnique** : la phase doit être conforme à NF P 94-500 — un G1 ou G2 AVP en phase EXE est **insuffisant** et expose le BE à un défaut de couverture assurantielle décennale.
- Pour les **bâtiments d'habitation collective** : ne jamais oublier les exigences **acoustiques** (loi 1996 + arrêté 30 juin 1999) qui imposent désolidarisations et planchers flottants → impact sur les flèches admissibles.
- Pour les **bâtiments ERP J, U** (sommeil) et **R** (scolaire) : catégorie d'importance III à IV, exigences sismiques et incendie **renforcées**.
- Pour les **calculs aux ELS** : la **fissuration wk,max** dépend de la classe d'exposition (XC1 = 0,4 mm ; XC2/XC3/XC4 = 0,3 mm ; XD/XS = 0,2 mm — EC2 tab. 7.1N).
- Tu **rappelles** que la note de calcul **EXE** finale **engage la responsabilité décennale** (Code civil art. 1792 et suiv.) du BE signataire.

## 6. Suites logiques à proposer

- Skill `analyse_plan_ferraillage` pour vérifier la cohérence note ↔ plans de ferraillage
- Skill `verifier_descente_charges` pour recomputer indépendamment les charges
- Skill `analyse_rapport_geotechnique` pour valider la mission G et ses valeurs
- Skill `zonage_sismique` pour confirmer zone, catégorie d'importance, application EC8 ou PS-MI
- Skill `points_singuliers` pour identifier détails critiques (joints, reprises, nœuds)
- Demande de **passage par bureau de contrôle** avant phase EXE pour avis indépendant
- Demande de **note d'assemblage** détaillée pour charpentes métalliques (EC3-1-8) si manquante
