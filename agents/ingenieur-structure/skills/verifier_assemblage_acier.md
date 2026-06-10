# Skill — Vérifier un assemblage acier (EC3-1-8)

L'utilisateur te transmet un **assemblage de charpente métallique** (pied de poteau, platine d'about poutre-poteau, gousset de treillis, éclissage) à vérifier au regard de la **NF EN 1993-1-8** et de son **Annexe Nationale française**. Tu produis une **vérification indicative** (boulons, soudures, composants), pas une note de calcul signée.

## 1. Documents attendus / questions

- **Type d'assemblage** : pied de poteau, platine d'about (poutre-poteau), gousset (treillis), couvre-joint/éclissage, attache simple (cornière/platine fine).
- **Plan de détail** (géométrie, épaisseurs de plats/platine, soudures, implantation des boulons, pinces/entraxes).
- **Boulons** : classe (8.8 / 10.9), diamètre, précontraints ou non, catégorie (A/B/C/D/E).
- **Soudures** : type (cordon d'angle a, pleine pénétration), nuance acier (S235/S275/S355).
- **Efforts à transmettre** : N, V, M (ELU).
- Pour **pied de poteau** : béton de fondation (classe), tiges d'ancrage (Ø, longueur, ancrage), platine (épaisseur), bêche éventuelle.

Si données incomplètes, demande : type d'assemblage, efforts N/V/M, classe/diamètre des boulons (précontraints ?), épaisseurs et soudures, et (pied de poteau) béton + tiges + bêche.

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("EC3 NF EN 1993-1-8 boulons catégories cisaillement pression diamétrale")`
- `rag_search("EC3 1-8 soudures cordon angle béta_w gorge")`
- `rag_search("EC3 1-8 méthode des composants platine d'about T-stub")`
- `rag_search("EC3 1-8 pied de poteau platine tiges d'ancrage bêche")`
- `rag_search("EC3 1-8 classification rigide articulé semi-rigide")`
- `rag_search("EN 1090 classes d'exécution EXC boulons précontraints serrage")`
- `rag_search("EC2 ancrage tiges béton NF EN 1992-4")` (pied de poteau)

## 3. Procédure

### Étape 1 — Classifier l'assemblage
Rigide / articulé / semi-rigide (rigidité S_j,ini) — **cohérence** avec l'hypothèse du modèle global (un nœud modélisé encastré doit être réellement rigide).

### Étape 2 — Vérifier les boulons (γ_M2 = 1,25)
- **Cisaillement** F_v,Rd = α_v f_ub A / γ_M2 (α_v = 0,6 ou 0,5).
- **Pression diamétrale** F_b,Rd = k1 α_b f_u d t / γ_M2.
- **Traction** F_t,Rd = 0,9 f_ub A_s / γ_M2 ; **poinçonnement** B_p,Rd.
- **Interaction V+T** : F_v,Ed/F_v,Rd + F_t,Ed/(1,4 F_t,Rd) ≤ 1.
- **Précontraints (cat. B/C)** : résistance au glissement F_s,Rd = k_s n μ F_p,C / γ_M3 — surfaces préparées + serrage contrôlé.
- **Pinces / entraxes** (e1, e2 ≥ 1,2 d0 ; p1 ≥ 2,2 d0) ; **rupture de bloc** (block tearing).

### Étape 3 — Vérifier les soudures
- **Cordon d'angle** : F_w,Rd = (f_u / (√3 β_w γ_M2)) × a ; β_w = 0,80/0,85/0,90 (S235/S275/S355) ; a ≥ 3 mm, L_eff ≥ max(30 mm ; 6a).
- **Pleine pénétration** : résistance = pièce la plus faible (si exécution + END conformes EXC).

### Étape 4 — Méthode des composants (platine d'about)
- Identifier les **rangées de boulons tendus** → **tronçons en T (T-stub)** ; modes de ruine 1/2/3 ; **effet de levier (prying)**.
- M_j,Rd = Σ (résistance de rangée × bras de levier) ; vérifier l'**âme de poteau** (panneau de cisaillement, compression, traction) → **raidisseurs** souvent requis.

### Étape 5 — Pied de poteau (3 chaînes + cisaillement)
1. **Platine sous compression** : pression sur béton ≤ f_jd ; aire portante efficace (T-stub comprimé).
2. **Tiges en traction** : résistance acier (F_t,Rd) **+ ancrage dans le béton** (cône d'arrachement, fendage — NF EN 1992-4).
3. **Béton de fondation** : pression localisée f_jd = β_j k_j f_cd (EC2 §6.7).
4. **Cisaillement** : frottement platine/béton (μ ≈ 0,2-0,3) + tiges + **bêche** si effort important.
5. Articulé (2 tiges, platine fine) vs encastré (4 tiges + bras de levier + raidisseurs/bêche).

### Étape 6 — Exécution (EXC)
EXC2 par défaut (bâtiment) ; serrage HR contrôlé + surfaces de frottement préparées (PV) ; contrôles soudure (END) selon EXC.

## 4. Restitution structurée

```
## Vérification assemblage acier — [Type + repère]

### Hypothèses
- **Type** : [pied de poteau / platine d'about / gousset / éclissage]
- **Boulons** : [classe 8.8, Ø M20, cat. C précontraints / non]
- **Soudures** : [cordon a = 5 mm / pleine pénétration], acier [S275, β_w = 0,85]
- **Efforts ELU** : N = ..., V = ..., M = ...
- **Pied de poteau** : béton [C25/30], tiges [Ø + ancrage], bêche [oui/non]

### Vérifications
| Critère | Sollicitation | Résistance | Ratio | Conformité |
|---|---|---|---|---|
| Boulon cisaillement | F_v,Ed | F_v,Rd | [%] | ✅/❌ |
| Pression diamétrale | F_b,Ed | F_b,Rd | [%] | ✅/❌ |
| Boulon traction (+ levier) | F_t,Ed | F_t,Rd | [%] | ✅/❌ |
| Interaction V+T | — | ≤ 1,0 | [%] | ✅/❌ |
| Glissement (cat. B/C) | F_Ed | F_s,Rd | [%] | ✅/❌ |
| Soudure cordon | F_w,Ed | F_w,Rd | [%] | ✅/❌ |
| Moment du nœud (T-stub) | M_Ed | M_j,Rd | [%] | ✅/❌ |
| Âme de poteau (panneau) | — | — | — | ✅/raidisseurs |
| Pied : pression béton | σ | f_jd | [%] | ✅/❌ |
| Pied : ancrage tiges (béton) | — | NF EN 1992-4 | — | ✅/❌ |
| Rupture de bloc | — | — | — | ✅/⚠️ |

### Points d'attention
1. [Boulons « HR » serrés au couple ordinaire → pas de catégorie C ; reprendre]
2. [Âme de poteau non raidie → raidisseurs requis en compression/traction]
3. [Ancrage des tiges insuffisant (cône) → augmenter la longueur / frettage]

### Synthèse
- **Conformité** : [Conforme / Non conforme sur N points / À reprendre]
- **Classification** : [rigide/articulé] cohérente avec le modèle ? [oui/non]
- **Niveau de confiance** : [Élevé / À valider / À confirmer par BE]
```

## 5. Livrable (generer_rapport)

Propose et, sur demande, génère via `generer_rapport({ titre, contenu, format, agent: "ingenieur-structure" })` :
- **Note de vérification d'assemblage** (DOCX + PDF) : hypothèses → boulons → soudures → composants/pied de poteau → synthèse.
- **Tableau de vérification** (XLSX).
- Mention finale obligatoire : *« Document préparé par l'agent IA Ingénieur structure — vérification indicative selon EC3-1-8. La note de calcul définitive et la signature engagent le BE structure titulaire (responsabilité décennale, code civil art. 1792). »*

## 6. Garde-fous spécifiques

- L'**assemblage est souvent le maillon faible** — à vérifier avec autant de soin que les barres.
- Toutes les résistances utilisent **γ_M2 = 1,25** (pas γ_M0 = 1,0) — erreur fréquente.
- La **classification rigide/articulé/semi-rigide** doit être **cohérente** avec le modèle global.
- **Pied de poteau** : vérifier les **3 chaînes** (platine acier / tiges + ancrage béton EC2-4 / pression béton) **et** le cisaillement (frottement + bêche).
- Les **boulons précontraints (cat. B/C)** exigent surfaces préparées + serrage contrôlé + PV ; sinon catégorie A seulement.
- Tu **ne signes pas** : la note d'assemblage engage le **BE structure signataire** (responsabilité décennale, code civil art. 1792).
- Toutes les valeurs sont **indicatives (à confirmer par note de calcul EC3-1-8)**.

## 7. Suites logiques à proposer

- Pré-dimensionnement des barres via `predim_acier_poutre_poteau` (cohérence section/assemblage).
- Vérification au feu de l'assemblage via `verifier_stabilite_feu` (protection des nœuds).
- Pour structure mixte : `verifier_structure_mixte` (attache poutre mixte).
- Croiser avec `controle_note_calcul` (note d'ensemble) et `points_singuliers` (ancrages, scellements).
- Demander la **note d'assemblage** détaillée, les **PV de serrage HR** et les **rapports d'END** de soudure avant EXE.
