# Skill — Pré-dimensionner un dallage industriel (DTU 13.3)

L'utilisateur veut **pré-dimensionner un dallage** (industriel, logistique, tertiaire ou MI) selon le **DTU 13.3 (NF P 11-213)** : épaisseur, armatures/fibres, maillage des joints, vérification de poinçonnement. Tu produis un **pré-dimensionnement indicatif**, pas une note de calcul signée.

## 1. Documents attendus / questions

- **Destination** : industriel (partie 1), tertiaire/commerce (partie 2), maison individuelle (partie 3).
- **Charges** : réparties (kPa / t/m²), **charges concentrées** (pieds de racks : charge par pied + entraxe), **charges roulantes** (chariots : charge à l'essieu + empreinte de roue), linéaires.
- **Sol support** : **module de réaction k** (MN/m³), portance de plateforme (essais à la plaque EV2), homogénéité — issus du **rapport géotechnique (G2/G3)**.
- **Surface, géométrie**, présence de poteaux/longrines (joints d'isolement).
- **Environnement** : intérieur/extérieur (quai), agressivité (XA), gel (XF).

Si données incomplètes, demande :
1. Destination et classe d'usage du dallage ?
2. Charges (réparties, racks par pied + entraxe, chariots à l'essieu + bandage/pneu) ?
3. Module de réaction k du sol (ou essais à la plaque) du rapport géotechnique ?
4. Surface et trame (poteaux), revêtement/état de surface attendu (quartz, planéité) ?
5. Environnement (intérieur/quai extérieur, agressivité sol) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("DTU 13.3 dallages")`
- `rag_search("DTU 13.3 charges concentrées roulantes poinçonnement Westergaard")`
- `rag_search("dallage joints retrait construction dilatation isolement maillage")`
- `rag_search("dallage module de réaction k sol support plateforme")`
- `rag_search("EC2 poinçonnement charge concentrée §6.4")`
- `rag_search("NF P 94-500 missions géotechniques G2 G3")` (portance, module k)

## 3. Procédure

### Étape 1 — Recenser les charges dimensionnantes
- Réparties (q kPa), concentrées (racks : P par pied, entraxe), roulantes (essieu chariot + empreinte), linéaires.
- En logistique, les **pieds de racks rapprochés** et les **roues de chariots** gouvernent souvent (cas Westergaard bord/angle).

### Étape 2 — Obtenir le module de réaction k
- Du **rapport géotechnique** (essai à la plaque, module de Westergaard). Vérifier la **portance de plateforme** (EV2) et son **homogénéité**.
- Valeurs indicatives : sol médiocre 20-40, moyen 50-80, bon 80-120 MN/m³ (**à confirmer par étude géotechnique**).

### Étape 3 — Modèle de Westergaard
- Rayon de rigidité ℓ = [E_b h³ / (12(1−ν²) k)]^(1/4).
- Moments de flexion selon la **position de la charge** (centre / bord / angle ; angle = plus défavorable).
- Le **transfert de charge aux joints** (goujons) ramène le cas « bord/angle » vers « centre/bord ».

### Étape 4 — Épaisseur et armatures/fibres
- Pré-dimensionner **h** (industriel 18-25 cm ; tertiaire 13-18 ; MI 12-15) — **indicatif**.
- Choisir : **treillis soudé**, **armatures BA calculées** (fortes charges), ou **fibres** (métalliques 20-45 kg/m³, ou macro-synthétiques structurelles selon ETE) ; vérifier la **résistance résiduelle post-fissuration** (NF EN 14651).

### Étape 5 — Vérifier le poinçonnement
- Sous **pied de rack** ou **roue** : cisaillement de poinçonnement (EC2 §6.4 adapté, périmètre de contrôle autour de l'empreinte) → v_Ed ≤ v_Rd,c ; sinon augmenter h ou renforcer localement.

### Étape 6 — Définir les joints
- **Retrait** (sciage 1/3 ép., panneaux carrés 5-6 m, L/l ≤ 1,5), **construction** (goujons de transfert), **dilatation** (grandes surfaces/extérieur), **isolement** (périphérie, autour des poteaux).
- Soigner le **transfert de charge** (goujons) pour limiter le battement sous charges roulantes.

### Étape 7 — Tolérances et exécution
- Planéité (règle 2 m + réglet 0,20 m) selon classe d'usage (VNA/superflat = serré) ; surfaçage (hélicoptère + durcisseur quartz) ; **cure soignée** (anti-retrait) ; calage des armatures.

## 4. Restitution structurée

```
## Pré-dimensionnement dallage — [Projet]

### Hypothèses
- **Destination / partie DTU 13.3** : [industriel partie 1 / tertiaire partie 2 / MI partie 3]
- **Charges** : réparties [kPa] ; racks [kN/pied @ entraxe] ; chariots [kN/essieu, empreinte] ; linéaires [kN/m]
- **Sol** : module de réaction k = [MN/m³] (source géotech), plateforme EV2 = [MPa]
- **Béton** : [C25/30 ou C30/37], classe d'exposition [XC1 / XF / XD / XA]

### Résultat pré-dimensionnement (indicatif)
- **Épaisseur dallage h** : [cm]
- **Armature / fibres** : [treillis ST.. / HA.. / fibres .. kg/m³]
- **Maillage des joints** : panneaux [m × m], sciage 1/3 ép., goujons de transfert aux joints de construction
- **Joints d'isolement** : périphérie + autour poteaux

### Vérifications
| Critère | Valeur | Limite | Conformité |
|---|---|---|---|
| Flexion (Westergaard, cas angle/bord) | [M_Ed] | [M_Rd] | ✅/⚠️ |
| Poinçonnement (pied rack / roue) | [v_Ed] | [v_Rd,c] | ✅/❌ |
| Tassement (absolu/différentiel) | [mm] | usage | ✅/⚠️ |
| Maillage joints (L/l) | [ratio] | ≤ 1,5 | ✅ |

### Points d'attention
1. [Module k à confirmer par essai à la plaque (géotech)]
2. [Charges de racks à obtenir du fournisseur de stockage]
3. [Transfert de charge aux joints requis (battement sous chariots)]

### Synthèse
- **Pré-dimensionnement indicatif** ESQ/APS — **à confirmer par note de calcul DTU 13.3**.
- **Niveau de confiance** : [selon qualité des données de charges et du module k].
```

## 5. Livrable (generer_rapport)

Propose et, sur demande, génère via `generer_rapport({ titre, contenu, format, agent: "ingenieur-structure" })` :
- **Note de pré-dimensionnement dallage** (DOCX + PDF) : charges → module k → Westergaard → épaisseur/armatures → poinçonnement → plan de joints → tolérances.
- **Plan de calepinage des joints** (esquisse) et **tableau** (XLSX) charges/vérifications.
- Mention finale obligatoire : *« Document préparé par l'agent IA Ingénieur structure — pré-dimensionnement indicatif selon DTU 13.3. La note de calcul définitive et la signature engagent le BE structure titulaire (responsabilité décennale, code civil art. 1792). »*

## 6. Garde-fous spécifiques

- Le **module de réaction k** et la **portance** doivent provenir du **rapport géotechnique** (G2/G3) — ne pas inventer ; le dallage est très sensible au support.
- Un **dallage n'est pas un radier** : sol médiocre/hétérogène + fortes charges → envisager **plancher porté** ou **dallage sur inclusions rigides** (étude géotechnique).
- Les **joints et le transfert de charge** sont la 1re cause de désordres (battement, épaufrures) — à soigner.
- Épaisseurs et dosages de fibres **indicatifs (à confirmer par note de calcul)** ; les charges de racks/chariots viennent du **client / fournisseur de stockage**.
- **Cure soignée** indispensable (retrait plastique, faïençage).
- Le DTU 13.3 **exclut** pistes aéroportuaires, chaussées, dallages précontraints.

## 7. Suites logiques à proposer

- Analyser le **rapport géotechnique** via `analyse_rapport_geotechnique` (module k, portance, agressivité XA).
- Vérifier la **descente de charges** via `verifier_descente_charges` (charges de stockage).
- Si fondations associées (longrines, poteaux) : `verifier_fondation_superficielle`.
- Demander au **fournisseur de stockage** les charges de racks ; au **géotechnicien** l'essai à la plaque (module k) et la réception de plateforme.
