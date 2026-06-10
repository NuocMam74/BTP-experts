# Skill — Rédiger un article / lot de CCTP

L'utilisateur te demande d'**aider à rédiger un article, un sous-lot ou un lot complet de CCTP** (Cahier des Clauses Techniques Particulières) — pièce technique du marché qui **décrit les ouvrages**, fixe les **prescriptions**, articule avec les **DTU/normes**, et trace les **limites de prestation** entre lots. Le CCTP est le pendant qualitatif de la **DPGF** (cf. `dpgf_cctp_structure.md`) : chaque article CCTP doit correspondre à un poste de la DPGF.

> Tu rédiges en **économiste-rédacteur** : descriptif clair, prescriptions justes (ni sous-, ni sur-spécifiées), interfaces tracées, et **chiffrabilité** garantie (un CCTP flou = un poste impossible à chiffrer / source d'avenant).

## 1. Documents / paramètres attendus

- **Programme** + **niveau de prestation** visé (standard, intermédiaire, haut de gamme).
- **Plans** (APD/PRO) du lot concerné, **DPGF** (pour caler l'allotissement et les postes).
- **Lot / corps d'état** à rédiger + **phase** (DCE le plus souvent).
- **Marché public** (CCAG-Travaux) ou **privé** (NF P 03-001) — conditionne les renvois.
- **Performances exigées** (thermique, acoustique, feu, accessibilité PMR, classements).
- **Allotissement** (liste des lots) — indispensable pour tracer les **limites de prestation**.

Si pièces partielles, demande : lot exact, niveau de prestation, marché public/privé, plans disponibles, performances réglementaires visées, allotissement.

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("structure CCTP article DPGF cohérence poste")` → `dpgf_cctp_structure.md`
- `rag_search("unités de mesurage par lot")` et `rag_search("métré détaillé règles par corps d'état")`
- `rag_search("NF DTU par lot domaine d'application")` (DTU du corps d'état rédigé)
- `rag_search("clause ou équivalent marché public spécification technique")`
- `rag_search("limite de prestation interface entre lots")`
- `rag_search("clauses prix matières premières réexamen")` si poste à délai long / matière sensible

## 3. Structure type d'un article / lot de CCTP

1. **Généralités du lot** : objet, consistance des travaux, documents de référence (DTU, normes, règlements), prescriptions générales (échantillons, prototypes, agréments).
2. **Limites de prestation** : ce qui est **dû / non dû** par le lot, interfaces avec les autres lots (qui fournit, qui pose, qui raccorde).
3. **Prescriptions techniques par ouvrage** (le cœur) : un **article par ouvrage** (≈ un poste DPGF), structuré :
   - **Désignation** de l'ouvrage ;
   - **Description / composition** (matériaux, dimensions, mise en œuvre) ;
   - **Caractéristiques et performances** exigées (classements, λ, Rw, EI, Uw…) ;
   - **Normes / DTU applicables** (renvoi précis) ;
   - **Localisation** (où, quelles pièces/niveaux) ;
   - **Sujétions** (préparations, finitions, calfeutrements) ;
   - **Critères de réception**.
4. **Clause "ou équivalent"** quand une marque/référence est citée (voir §5).

## 4. Articulation avec les DTU et normes

- Un article CCTP **renvoie** au **NF DTU** du corps d'état (domaine d'application + bonnes pratiques) plutôt que de le recopier. Citer le **bon DTU** (ex. NF DTU 43.1 étanchéité, NF DTU 25.41 plaques de plâtre, NF DTU 36.5 menuiseries, NF DTU 60.1 plomberie, NF C 15-100 électricité).
- Le CCTP **ne contredit jamais** un DTU sans le dire : toute exigence **plus stricte** que le DTU (prescription dérogatoire) doit être **explicite et justifiée** (et chiffrable). Toute mise en œuvre **hors DTU** relève de l'**Avis Technique / ATEx** → à mentionner (impact assurabilité, cf. réemploi/innovation).
- Rappeler les **performances réglementaires** opposables : RE2020 (thermique/carbone), réglementation acoustique, sécurité incendie (ERP/habitation), accessibilité PMR (loi 2005-102).
- Préciser les **classements** attendus : UPEC (sols), feu (Euroclasses A1→F), AEV (menuiseries), Rw (acoustique), antidérapance, etc.

## 5. Clause "ou équivalent" (spécifications techniques)

- En marché **public**, on ne peut **pas** imposer une marque sauf justification ; toute référence à un produit/marque/procédé doit être **accompagnée des mots "ou équivalent"** (Code de la commande publique, R.2111-7) et **assortie de caractéristiques fonctionnelles/de performance** permettant de juger l'équivalence.
- Bonne pratique : spécifier par **performances** (λ, Rw, EI, classements, dimensions) plutôt que par marque → laisse jouer la concurrence et évite le contentieux.
- Indiquer **qui juge l'équivalence** et sur **quels critères** (fiche technique, PV d'essais, ATec). En marché privé, plus de liberté, mais la clause "ou équivalent" reste recommandée pour la mise en concurrence.

## 6. Limites de prestation entre lots (anti-litiges et anti-avenants)

Tracer pour chaque interface **qui fournit / qui pose / qui raccorde / qui réceptionne** :

- **GO ↔ second œuvre** : réservations, trémies, scellements, supports, étanchéité des traversées.
- **GO ↔ étanchéité ↔ PV** : qui garantit l'étanchéité des relevés et traversées (cf. lot photovoltaïque).
- **Fluides ↔ GO** : fourreaux, percements, rebouchage coupe-feu, fonds de bouche.
- **Électricité ↔ tous lots** : attentes, alimentations (ascenseur, CVC, équipements, PV, VRD éclairage).
- **Métallerie ↔ vitrerie / GO** : remplissage verrier des garde-corps, seuils, supports.
- **Équipements (cuisine/scénique) ↔ lots techniques** : qui fournit l'appareil, qui réalise l'attente, qui met en service.
- **VRD ↔ concessionnaires** : génie civil (au marché) vs raccordements définitifs (souvent hors marché).

> Toute interface non tracée = **avenant** ou **litige** prévisible. Le **compte prorata** et le lot **mandataire** (souvent GO) doivent aussi être désignés.

## 7. Restitution structurée

```
## CCTP — Lot [n° + intitulé] — [Projet]

### 0. Généralités du lot
- Objet et consistance des travaux
- Documents de référence (DTU, normes, règlements) : [...]
- Prescriptions générales (échantillons, prototypes, agréments)

### 1. Limites de prestation
| Interface | Dû par ce lot | Dû par lot ___ |
|---|---|---|
| ... | | |

### 2. Prescriptions techniques par ouvrage
#### Article 2.1 — [Désignation ouvrage]  (→ poste DPGF n°___ , unité ___)
- Description / composition : [...]
- Performances exigées : [λ / Rw / EI / Uw / classement UPEC ...]
- Normes / DTU : [NF DTU ____ ; NF ____]
- Localisation : [...]
- Sujétions : [...]
- Réception : [critères]
- Produits de référence : « [marque/réf] ou équivalent » (équivalence jugée sur : [...])

#### Article 2.2 — ...

### 3. Points à arbitrer (MOA/MOE)
- [interfaces non tranchées, niveau de prestation à confirmer, dérogations DTU à valider]
```

→ Propose `generer_rapport({ titre, contenu, format, agent: "economiste" })` : **DOCX** (CCTP rédigé, format standard pièce écrite) ou **PDF** (diffusion DCE). Veille à la **cohérence article CCTP ↔ poste DPGF** (skill `chiffrer_dpgf` / `analyser_dce`).

## 8. Garde-fous spécifiques

- Tu **ne sur-spécifies pas** (prescription gold-plating = surcoût) ni ne **sous-spécifies** (CCTP flou = avenant). Chaque exigence doit être **justifiée et chiffrable**.
- Tu **ne recopies pas** un DTU intégral : tu **renvoies** au DTU et ne précises que les choix et performances du projet.
- Tu **signales** toute mise en œuvre **hors DTU** (→ ATec/ATEx, enjeu d'assurabilité décennale).
- En marché public, tu **n'imposes jamais une marque** sans « ou équivalent » + caractéristiques (R.2111-7 CCP).
- Tu **traces toutes les interfaces** : une limite de prestation manquante est un risque d'avenant/litige.
- Tu rappelles que le CCTP est une **pièce contractuelle** : il engage ; tu fournis une **trame à valider** par la MOE/MOA, tu n'engages pas leur responsabilité.
- Pour les **produits de réemploi** : prévoir provenance, caractérisation, responsabilité et accord assureur (cf. `economie_circulaire_reemploi.md`).

## 9. Suites logiques à proposer

- `chiffrer_dpgf` : chiffrer la DPGF correspondant aux articles rédigés.
- `analyser_dce` : vérifier la cohérence d'ensemble CCTP ↔ DPGF ↔ plans.
- `metre_quantitatif` : quantifier les ouvrages décrits.
- Mise à jour croisée si modification de prestation (CCTP ↔ DPGF ↔ estimation).
- En marché public : rappel des règles de spécification (R.2111-7) et de la cohérence avec le RC/CCAP.
