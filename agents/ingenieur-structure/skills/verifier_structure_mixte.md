# Skill — Vérifier une structure mixte acier-béton (EC4)

L'utilisateur te transmet un **plancher collaborant à bac acier**, une **poutre mixte** ou un **poteau mixte** à vérifier au regard de l'**Eurocode 4 (NF EN 1994-1-1)** et de son **Annexe Nationale française**. Tu produis une **vérification indicative** (résistance, connexion, ELS), pas une note de calcul signée.

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **Plan de coffrage / plan de plancher** (trame, portées, entraxe poutres)
- **Profilé acier** retenu (IPE/HEA/HEB/PRS, nuance S235/S275/S355) et **dalle** (épaisseur, béton C25/30…)
- **Bac collaborant** (référence, hauteur de nervure hp, sens des nervures) + son **Avis Technique / DTA**
- **Connecteurs** : type (goujons à tête Ø, hauteur), nombre, espacement
- **Charges** G et Q (ELU/ELS), usage
- **Note de calcul** mixte et/ou catalogue fabricant

Si données incomplètes, demande :
1. Profilé acier (type + nuance) et dalle (épaisseur totale + béton) ?
2. Bac collaborant (référence + ATec, sens des nervures perpendiculaire/parallèle à la poutre) ?
3. Connecteurs (Ø goujon, hauteur h_sc, nombre par nervure, espacement) ?
4. Portée, entraxe des poutres, conditions d'appui (isostatique/continue) ?
5. Charges G / Q et usage (tertiaire, parking, stockage) ?
6. Étaiement prévu en phase de bétonnage (oui/non) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("EC4 NF EN 1994-1-1 poutre mixte largeur participante")`
- `rag_search("EC4 connecteurs goujons PRd connexion complète partielle")`
- `rag_search("EC4 plancher collaborant bac acier phase coffrage")`
- `rag_search("EC4 poteau mixte tube rempli méthode simplifiée")`
- `rag_search("EC4 retrait fluage coefficient équivalence ELS flèche")`
- `rag_search("EC2 béton classes exposition enrobage")` et `rag_search("EC3 acier classification sections")` (matériaux)
- `rag_search("EC4 NF EN 1994-1-2 comportement au feu mixte")` (si exigence feu)

## 3. Procédure de vérification

### Étape 1 — Identifier le type d'élément mixte
Plancher collaborant / poutre mixte / poteau mixte → la vérification diffère.

### Étape 2 — Poutre mixte

1. **Largeur participante b_eff** : b_eff = b0 + Σ min(Le/8 ; bi) avec Le ≈ 0,85 L (travée de rive), 0,70 L (intermédiaire).
2. **Classe de section** (EC3) du profilé → analyse plastique (classe 1-2) ou élastique (3-4).
3. **Moment résistant plastique M_pl,Rd** (connexion complète) : position de l'axe neutre plastique (dalle ou profilé), bras de levier. Comparer à M_Ed.
4. **Effort tranchant V_pl,Rd** (âme acier seule) ; interaction M-V si V_Ed > 0,5 V_pl,Rd.
5. **Connexion** : effort de cisaillement V_l = min(N_c,f ; N_a) ; résistance d'un goujon P_Rd = min(0,8 f_u πd²/4 ; 0,29 α d² √(f_ck E_cm)) / γ_V (γ_V = 1,25), réduction k_t si bac transversal ; **nombre n = V_l / P_Rd**. Vérifier le **degré de connexion η ≥ minimal** (≥ 0,4) si connexion partielle.

### Étape 3 — Plancher collaborant à bac acier

1. **Phase de coffrage (provisoire)** : résistance + flèche du bac sous béton frais + 1,5 kN/m² chantier (flèche ≤ L/180 ou 20 mm) — selon EN 1993-1-3 / DTA. **À ne pas oublier.**
2. **Phase mixte (définitive)** : flexion section mixte ; **cisaillement longitudinal** (méthode m-k ou connexion partielle τ_u,Rd) ; **poinçonnement** sous charge concentrée.
3. **Dispositions** : h ≥ 80 mm, h_c ≥ 40 mm au-dessus des nervures, treillis anti-fissuration (≥ 0,2 % A_c sur appuis continus).

### Étape 4 — Poteau mixte

1. Vérifier le **domaine de validité** de la méthode simplifiée (λ̄ ≤ 2, δ acier entre 0,2 et 0,9).
2. **N_pl,Rd** = A_a f_yd + A_c f_cd (×0,85 enrobé / ×1,0 tube rempli) + A_s f_sd ; flambement N_b,Rd = χ N_pl,Rd. Comparer à N_Ed.
3. **Feu** (EC4-1-2) : les poteaux mixtes tiennent souvent R60-R120 sans protection (renvoi corpus incendie).

### Étape 5 — ELS (retrait, fluage, flèche, vibration)

1. **Coefficient d'équivalence** n_L = n0 (1 + ψ_L φ_t) pour les charges de longue durée (fluage) ; n0 ≈ E_a/E_cm ≈ 6,8 (C25/30).
2. **Flèches** (combinaisons caractéristique + quasi-permanente avec n_L) : limites L/250 (totale), L/350-L/500 (cloisons fragiles).
3. **Retrait** : armatures anti-fissuration de la dalle (treillis) ; **fissuration** sur appuis (moment négatif).
4. **Vibrations** des planchers de grande portée tertiaires : f ≥ 3-4 Hz (souvent dimensionnant en mixte léger).

## 4. Restitution structurée

```
## Vérification structure mixte — [Élément + repère]

### Hypothèses
- **Type** : [plancher collaborant / poutre mixte / poteau mixte]
- **Acier** : [profilé + nuance S355]
- **Béton** : [C25/30, b_eff = ... m, h dalle = ... cm]
- **Bac** : [réf + ATec, nervures ⟂/∥, hp = ... mm]
- **Connecteurs** : [goujons Ø19 h=100, n par nervure, espacement]
- **Portée / appuis** : [L = ... m, isostatique/continue]
- **Charges** : Gk = ..., Qk = ... ; combi ELU = ...

### Vérifications
| Critère | Valeur | Limite/Résistance | Conformité |
|---|---|---|---|
| Phase coffrage bac (flèche) | [mm] | L/180 ou 20 mm | ✅/⚠️/❌ |
| Largeur participante b_eff | [m] | — | — |
| Moment M_Ed / M_pl,Rd | [ratio] | < 1,0 | ✅/❌ |
| Effort tranchant V_Ed / V_pl,Rd | [ratio] | < 1,0 | ✅/❌ |
| Connexion : n connecteurs | [n posés] | ≥ n requis | ✅/❌ |
| Degré de connexion η | [valeur] | ≥ 0,4 (mini) | ✅/❌ |
| Poteau : N_Ed / N_b,Rd | [ratio] | < 1,0 | ✅/❌ |
| Flèche ELS (avec fluage n_L) | [L/x] | L/250 (L/350-500) | ✅/⚠️ |
| Vibration f propre | [Hz] | ≥ 3-4 Hz | ✅/⚠️ |
| Résistance au feu | [Rxx] | [exigence] | ✅/À confirmer |

### Points d'attention
1. [Phase coffrage non justifiée → demander vérification bac sous béton frais]
2. [Connexion partielle η = 0,35 < 0,4 → ajouter des goujons]
3. [Flèche ELS sans prise en compte du fluage (n_L) → recalculer]

### Synthèse
- **Conformité globale** : [Conforme / Non conforme sur N points / À reprendre]
- **Niveau de confiance** : [Élevé / À valider / À confirmer par BE]
- **Pièces à demander** : [ATec bac, PV soudage goujons, note mixte complète]
```

## 5. Livrable (generer_rapport)

Propose et, sur demande, génère via `generer_rapport({ titre, contenu, format, agent: "ingenieur-structure" })` :
- **Note de vérification mixte** (DOCX + PDF) : hypothèses → b_eff → M_pl,Rd → connexion → ELS (fluage/retrait/flèche/vibration) → feu → synthèse.
- **Tableau de vérification** (XLSX) : onglets Hypothèses / Section mixte / Connexion / ELS.
- Mention finale obligatoire : *« Document préparé par l'agent IA Ingénieur structure — vérification indicative selon EC4. La note de calcul définitive et la signature engagent le BE structure titulaire (responsabilité décennale, code civil art. 1792). »*

## 6. Garde-fous spécifiques

- Tu **ne signes pas** : la note de calcul mixte définitive engage la **responsabilité décennale** du BE structure signataire (code civil art. 1792).
- **N'oublie jamais la phase de coffrage** du bac (provisoire) — souvent dimensionnante et fréquemment omise.
- La capacité du **bac collaborant** relève de son **Avis Technique / DTA** : ne pas la recalculer « ex nihilo ».
- Les **abaques de pré-dimensionnement** (profilé par portée) sont **indicatifs (à confirmer par note de calcul)** ; la flèche ELS et les vibrations gouvernent souvent en mixte.
- **Retrait et fluage** (coefficient n_L) doivent être pris en compte aux ELS — impact flèche significatif.
- Vérifier le **degré de connexion** (η ≥ minimal) et l'espacement des connecteurs (e ≤ 6 h_dalle et ≤ 800 mm).
- **Soudage des goujons à travers le bac** : épaisseur de tôle limite, galvanisation, contrôle (essai de pliage / coup de marteau).

## 7. Suites logiques à proposer

- Vérification au feu via la skill `verifier_stabilite_feu` (poutre mixte souvent à protéger, poteau mixte souvent OK).
- Pré-dimensionnement amont via `predim_acier_poutre_poteau` (profilé) et `predim_poutre_poteau_dalle`.
- Vérification des **assemblages** (poutre mixte sur poteau) via `verifier_assemblage_acier`.
- Contrôle global de la note via `controle_note_calcul`.
- Demander l'**ATec du bac**, le **PV de soudage des goujons** et la **note mixte** complète avant phase EXE.
