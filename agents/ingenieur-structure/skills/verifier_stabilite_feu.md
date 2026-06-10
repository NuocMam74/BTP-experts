# Skill — Déterminer et vérifier la stabilité au feu d'un élément

L'utilisateur veut **déterminer le degré de résistance au feu exigé** (R / REI + durée) pour un bâtiment et **vérifier** qu'un élément porteur (poteau, poutre, dalle, voile, charpente) le satisfait, selon les **parties feu des Eurocodes** (EC2/EC3/EC4/EC5/EC6-1-2) et la **réglementation française** (ERP, habitation, IGH, parkings, code du travail).

## 1. Documents attendus / questions

- **Type de bâtiment** : habitation (1re à 4e famille / IGH), ERP (type + catégorie/effectif), parc de stationnement, bâtiment industriel / code du travail.
- **Hauteur** du plancher bas du dernier niveau (déterminante pour le classement).
- **Élément à vérifier** : poteau / poutre / dalle / voile / charpente (BA, acier, mixte, bois).
- **Matériau et section** : dimensions, enrobage / distance a des aciers (BA), profilé + protection éventuelle (acier), section bois.
- **Fonction** : porteur seul (R), séparatif (EI), porteur + séparatif (REI).
- **Charge en situation d'incendie** (combinaison accidentelle) ou degré d'utilisation.

Si données incomplètes, demande : type/catégorie de bâtiment, hauteur, nature et section de l'élément, fonction (porteur/séparatif), protection éventuelle.

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("sécurité incendie critères R E I courbe ISO 834")`
- `rag_search("EC2 feu valeurs tabulées poteau poutre dalle enrobage distance a")`
- `rag_search("EC3 feu acier ky theta température critique protection")`
- `rag_search("EC5 feu bois vitesse de carbonisation section efficace")`
- `rag_search("réglementation incendie ERP habitation famille IGH degré stabilité")`
- `rag_search("EC4 NF EN 1994-1-2 poteau mixte feu")` (si mixte)
- `rag_search("arrêté 25 juin 1980 ERP")` / `rag_search("arrêté 31 janvier 1986 habitation famille")`

## 3. Procédure

### Étape 1 — Déterminer le degré réglementaire exigé
Selon le **type de bâtiment** et la **hauteur** :
- **Habitation** : 1re famille (—), 2e (R 30 / CF 1/2 h), 3e A et B (R 60 / CF 1 h), 4e (R 90 / CF 1 h 1/2). > 50 m → IGH.
- **ERP** : selon hauteur du plancher bas dernier niveau (≤ 8 m → R 60 ; ≤ 28 m → R 60 ; > 28 m → R 90) et le type/catégorie (J, U, R, L… exigences renforcées).
- **IGH** : R 120 minimum.
- **Parking couvert** : généralement R 90 (parfois R 60/R 120 selon configuration).
- **Code du travail** : R 30 à R 60 selon hauteur/niveaux.

### Étape 2 — Identifier la fonction de l'élément
Porteur → **R** ; séparatif → **EI** ; les deux → **REI**.

### Étape 3 — Choisir la méthode (tabulée ou simplifiée)
- **Valeurs tabulées** : rapide, sécuritaire (lecture directe).
- **Modèle simplifié** : k_y,θ (acier), isotherme 500 °C (béton), section efficace (bois).

### Étape 4 — Vérifier selon le matériau

**Béton armé (EC2-1-2)** — méthode tabulée :
- **Poteau** : côté b_min + distance a des aciers (ex. R60 → 250/35 ou 350/31).
- **Poutre** : b_min + a (ex. R60 → 120/40).
- **Dalle** : épaisseur h_s + a (ex. REI60 → 80/20).
- Vérifier que la **section et l'enrobage réels** atteignent ces minima ; sinon majorer.

**Acier (EC3-1-2)** :
- Déterminer la **température critique θ_a,cr** (≈ 540 °C pour μ0 ≈ 0,6) via la formule de l'art. 4.2.4 ou k_y,θ.
- Acier nu ≈ R15 → souvent **protection nécessaire** : épaisseur de peinture intumescente / flocage / plaques selon le **facteur de massiveté A_p/V** et la durée visée (PV produit).

**Bois (EC5-1-2)** :
- Profondeur carbonisée d_char,n = βn × t (LC résineux βn ≈ 0,70 mm/min) ; section efficace = section − (d_char,n + 7 mm) par face exposée ; revérifier la résistance sur la section réduite.

**Mixte (EC4-1-2)** :
- Poteaux mixtes (tube rempli, profilé enrobé) tiennent souvent R60-R120 sans protection ; poutres mixtes souvent à protéger.

**Maçonnerie (EC6-1-2)** : valeurs tabulées (épaisseur vs REI + chargement) ; REI 60-120 courant.

### Étape 5 — Conclure
Comparer la **capacité au feu** de l'élément au **degré exigé** ; prescrire la protection si nécessaire.

## 4. Restitution structurée

```
## Stabilité au feu — [Élément + bâtiment]

### Exigence réglementaire
- **Type de bâtiment** : [habitation 3e fam. A / ERP type R 2e cat. / parking / IGH…]
- **Hauteur plancher bas dernier niveau** : [m]
- **Degré exigé** : structure **R __** / planchers **REI __** (réf. arrêté __)

### Élément vérifié
- **Élément / fonction** : [poteau porteur → R / mur séparatif → REI]
- **Matériau / section** : [BA 30×30, a = 35 mm / IPE 300 S275 / LC 200×600 GL24h]
- **Méthode** : [valeurs tabulées / modèle simplifié]

### Vérification
| Critère | Exigé | Élément | Conformité |
|---|---|---|---|
| Section min (b_min / h_s) | [mm] | [mm] | ✅/❌ |
| Distance a des aciers (BA) | [mm] | [mm] | ✅/❌ |
| Température critique θ_a,cr (acier) | — | [°C] | ✅/À protéger |
| Protection rapportée (acier) | [ép. visée] | [ép. prévue] | ✅/❌ |
| Section résiduelle (bois) | [résistante] | [calc.] | ✅/❌ |
| Degré atteint | R/REI __ | R/REI __ | ✅/❌ |

### Points d'attention
1. [Distance a = 25 mm < 35 mm requis pour R60 → reprendre enrobage]
2. [IPE 300 nu = R15 → prévoir peinture intumescente pour R60 (PV produit + ép. sèche)]
3. [Risque d'éclatement (spalling) si BHP → fibres polypropylène]

### Synthèse
- **Conformité** : [Conforme / Non conforme / Protection à prévoir]
- **Niveau de confiance** : [Élevé (tabulé) / À valider (modèle)]
- **Réserve** : classement réglementaire à confirmer par le **coordonnateur SSI / bureau de contrôle / commission de sécurité**.
```

## 5. Livrable (generer_rapport)

Propose et, sur demande, génère via `generer_rapport({ titre, contenu, format, agent: "ingenieur-structure" })` :
- **Note de vérification au feu** (DOCX + PDF) : exigence réglementaire → méthode → vérification élément → protection prescrite → synthèse.
- **Tableau de synthèse** (XLSX) des éléments et degrés.
- Mention finale obligatoire : *« Document préparé par l'agent IA Ingénieur structure — vérification indicative selon Eurocodes feu. Le classement réglementaire relève du coordonnateur SSI / bureau de contrôle ; la note de calcul au feu engage le BE structure (responsabilité décennale, code civil art. 1792). »*

## 6. Garde-fous spécifiques

- Le **classement réglementaire** (famille, type/catégorie ERP, IGH) relève du **coordonnateur SSI / bureau de contrôle / commission de sécurité** — tu vérifies la **tenue mécanique** pour le degré exigé, tu ne prononces pas le classement.
- Les **valeurs tabulées** sont **sécuritaires mais indicatives (à confirmer par note de calcul au feu)** ; un modèle simplifié peut justifier moins.
- La **protection acier** (intumescent/flocage) exige un **PV d'essai / ETE** couvrant le facteur de massiveté et la durée — épaisseur sèche contractuelle.
- L'**éclatement (spalling)** des BHP doit être traité (fibres polypropylène ≥ 2 kg/m³).
- Ne pas confondre **réaction au feu** (matériau, Euroclasses A1-F) et **résistance au feu** (élément, R/REI) — seule la seconde concerne ta vérification structurelle.
- La combinaison d'actions en incendie est **accidentelle** (G + ψ1,1 Qk,1 + Σ ψ2,i Qk,i) — chargement réduit.

## 7. Suites logiques à proposer

- Pré-dimensionnement avec contrainte feu intégrée via `predim_poutre_poteau_dalle` / `predim_acier_poutre_poteau` (sections majorées).
- Vérification mixte au feu via `verifier_structure_mixte`.
- Croiser avec `analyse_plan_ferraillage` (enrobage / distance a réels).
- Demander les **PV d'essai / ETE** des protections rapportées et le **classement SSI** au bureau de contrôle.
- Saisir le **bureau de contrôle (mission SSI / STI)** pour validation du dispositif global.
