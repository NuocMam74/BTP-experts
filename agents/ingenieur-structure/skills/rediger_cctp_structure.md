# Skill — Rédiger et contrôler un CCTP structure (gros œuvre / charpente)

L'utilisateur veut **rédiger** ou **contrôler/améliorer** un **CCTP** (Cahier des Clauses Techniques Particulières) du lot structure — gros œuvre béton armé, charpente acier, charpente bois, fondations. Le CCTP est **accepté en entrée** (document) mais n'est **pas outillé** par un calcul : tu travailles sur le **contenu rédactionnel et la conformité normative**.

## 1. Documents attendus / questions

- **CCTP existant** (si contrôle) ou **programme** (si rédaction) : destination, surfaces, niveaux, hauteur.
- **Hypothèses générales** : matériaux, classes d'exposition, catégorie d'importance, zone sismique, neige/vent, durée d'utilisation, exigences feu.
- **Rapport géotechnique** (G2) : type de fondations, contraintes admissibles, agressivité.
- **Plans** (coffrage, principe structurel), **phasage**, contraintes de site.

Si rédaction sans hypothèses, demande : usage et catégorie d'importance, zone sismique/commune, classes d'exposition par zone, régions neige/vent, durée d'utilisation (50/100 ans), exigences feu (ERP/habitation), mission géotechnique disponible.

## 2. Référentiels (`rag_search` recommandé)

- `rag_search("annexe nationale française EC2 EC3 EC5 classes")`
- `rag_search("NF EN 206 béton classes exposition durabilité")`
- `rag_search("DTU 21 exécution béton tolérances")` / `rag_search("DTU 32 charpente acier EXC")` / `rag_search("DTU 31 charpente bois")`
- `rag_search("NF EN 1090 classes d'exécution EXC")`
- `rag_search("sécurité incendie ERP habitation degré stabilité")`
- `rag_search("NF P 03-001 CCAG marchés privés bâtiment")`

## 3. Trame type d'un CCTP structure (chapitres à couvrir)

| Chapitre | Contenu attendu |
|---|---|
| **1. Généralités / prescriptions communes** | Objet, consistance des travaux, normes/DTU applicables, hiérarchie des pièces, NF P 03-001 (marchés privés) ou CCAG Travaux (public) |
| **2. Documents de référence** | Eurocodes + AN, NF EN 206/CN, DTU 13/21/23/31/32, NF EN 1090, arrêté 22/10/2010 (sismique), réglementation feu |
| **3. Hypothèses générales** | Catégorie d'importance, **zone sismique** (commune), régions **neige/vent**, **classes d'exposition** par zone, **durée d'utilisation** (S4/S6), exigences **feu** (R/REI) |
| **4. Études d'exécution** | Répartition EXE (entreprise / BE), notes de calcul Eurocodes, plans, **visa du bureau de contrôle**, synthèse |
| **5. Matériaux** | Béton (classes C.., XC/XD/XS/XF/XA, consistance), aciers HA (**B500B**, B500C sismique — NF EN 10080), acier construction (S235/S275/S355, EXC), bois (C24, GL24h/GL28h, classe de service), treillis |
| **6. Fondations** | Type (selon **G2**), contraintes admissibles, encastrement, béton de propreté, **enrobages** (coulage en place/coffré), longrines/chaînages, RGA si concerné |
| **7. Superstructure BA** | Voiles, poteaux, poutres, planchers (dalle/prédalle/poutrelles/alvéolaire), enrobages, **joints de dilatation**, reprises de bétonnage (PRB), chaînages (robustesse) |
| **8. Charpente acier/bois** | Profilés, assemblages (EC3-1-8 / EC5), protection (anticorrosion, **feu**), classes EXC, tolérances |
| **9. Dispositions sismiques** | Si zone 2-4 : ductilité (DCL/DCM/DCH), chaînages, joints sismiques, détails de nœuds |
| **10. Sécurité incendie** | Degrés R/REI exigés, protections (enrobage/flocage/intumescent), justifications |
| **11. Tolérances et contrôles** | Tolérances (DTU 21, NF EN 13670), autocontrôle, PAQ, réception ferraillage, essais béton |
| **12. Limites de prestations** | Interfaces avec les autres lots (étanchéité, façade, fluides — réservations, trémies) |

## 4. Procédure (rédaction ou contrôle)

1. **Vérifier la présence et la cohérence des hypothèses générales** (catégorie d'importance, **zone sismique vs commune** — arrêté 22/10/2010, régions neige/vent, classes d'exposition, durée, feu).
2. **Contrôler les classes d'exposition** déclarées vs environnement réel (XC1 sur façade = erreur classique → XC4 + XF1).
3. **Vérifier la cohérence matériaux** : béton/exposition/enrobage ; **B500B/B500C** (jamais « B450C », NF EN 10080) ; acier construction + **classe EXC** ; bois + classe de service.
4. **Vérifier la conformité de la mission géotechnique** (G2 PRO mini en conception) et la traduction des préconisations (type de fondation, XA, RGA).
5. **Vérifier les prescriptions de joints** (dilatation > 25-30 m BA), **reprises de bétonnage (PRB)**, **chaînages/robustesse** (EC2 §9.10 + EN 1991-1-7).
6. **Vérifier les exigences feu** (R/REI cohérents avec le classement réglementaire) et **sismiques** (si zone 2-4).
7. **Vérifier la répartition EXE** et le **visa du bureau de contrôle** (missions L, LE, SEI, STI…).
8. **Lister les manques et incohérences** (rédaction floue, normes obsolètes, exigences contradictoires, renvois manquants).

## 5. Restitution structurée

```
## CCTP structure — [Rédaction / Contrôle] — [Projet]

### Hypothèses générales (à figer dans le CCTP)
| Item | Valeur | Conformité | Commentaire |
|---|---|---|---|
| Catégorie d'importance | [I-IV] | ✅/⚠️ | |
| Zone sismique (commune) | [1-5] | ✅/❌ | arrêté 22/10/2010 |
| Région neige / vent | [.. / 1-4] | ✅ | AN EC1 |
| Classes d'exposition | [XC../XF../XA..] | ⚠️ | façade XC4 attendue |
| Durée d'utilisation | [S4/S6] | ✅ | |
| Exigence feu | [R../REI..] | ✅/⚠️ | |
| Mission géotech | [G2 PRO] | ✅/❌ | |

### Matériaux prescrits
- Béton : [classes + exposition + consistance]
- Aciers HA : [B500B / B500C] — **jamais B450C**
- Acier construction : [S275 + EXC2]
- Bois : [C24 / GL24h, classe service]

### Observations / manques
1. [Classe d'exposition façade XC1 → corriger en XC4 + XF1]
2. [Joints de dilatation non prescrits (bâtiment 40 m) → ajouter]
3. [Chaînages/robustesse (CC2) non mentionnés → ajouter EC2 §9.10 + EN 1991-1-7]
4. [Mission EXE et visa bureau de contrôle non précisés → compléter]

### Synthèse
- **CCTP** : [conforme / à compléter sur N points / à reprendre]
- **Niveau de confiance** : [selon complétude]
```

## 6. Livrable (generer_rapport)

Propose et, sur demande, génère via `generer_rapport({ titre, contenu, format, agent: "ingenieur-structure" })` :
- **CCTP structure rédigé** ou **rapport de contrôle du CCTP** (DOCX + PDF) suivant la trame ci-dessus.
- **Tableau des hypothèses générales** (XLSX) à figer.
- Mention finale obligatoire : *« Document préparé par l'agent IA Ingénieur structure — aide à la rédaction/contrôle indicative. Le CCTP relève de la responsabilité de la maîtrise d'œuvre / du BE structure ; les notes de calcul et la signature engagent le BE titulaire (responsabilité décennale, code civil art. 1792). »*

## 7. Garde-fous spécifiques

- Le CCTP **engage la maîtrise d'œuvre / le BE** : tu **aides** à rédiger/contrôler, tu ne te substitues pas au rédacteur responsable.
- **Ne jamais prescrire de calcul de dimensionnement** dans cette skill (elle est rédactionnelle) — renvoyer aux skills de vérification pour les calculs.
- **Cohérence des hypothèses** (sismique/commune, exposition/environnement) : signaler fermement les incohérences **bloquantes**.
- Proscrire les références **obsolètes** (BAEL/CM66 seuls) et les nuances inexistantes (« B450C » → **B500B/B500C**, NF EN 10080).
- Rappeler les **interfaces** (réservations, trémies, rupteurs thermiques, désolidarisations acoustiques en habitation) — sources fréquentes de litige.
- Toujours prévoir la **mission EXE**, le **PAQ/autocontrôle** et le **visa du bureau de contrôle**.

## 8. Suites logiques à proposer

- Figer les hypothèses via `verifier_combinaisons_eurocodes` et `zonage_sismique` (zone, catégorie).
- Valider les fondations via `analyse_rapport_geotechnique` et `verifier_fondation_superficielle`.
- Contrôler les notes/plans associés via `controle_note_calcul` et `analyse_plan_ferraillage`.
- Vérifier les exigences feu via `verifier_stabilite_feu`.
- Soumettre le CCTP au **bureau de contrôle** et coordonner avec les **autres lots** (interfaces).
