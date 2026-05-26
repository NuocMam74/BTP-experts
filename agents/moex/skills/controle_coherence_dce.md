# Skill — Contrôler la cohérence d'un DCE

L'utilisateur veut s'assurer qu'un Dossier de Consultation des Entreprises (CCAP / CCTP / DPGF / plans) est **interne cohérent** avant lancement de la consultation.

## 1. Documents attendus

L'utilisateur fournit :
- **CCAP** (Cahier des Clauses Administratives Particulières) — clauses contractuelles spécifiques
- **CCTP** (Cahier des Clauses Techniques Particulières) — descriptifs par lot
- **DPGF** (Décomposition du Prix Global et Forfaitaire) — généralement vide pour la consultation
- **Plans** : architecte (APD/PRO), structure, fluides (CVC + plomberie + électricité)
- **Pièces graphiques annexes** : repérages, carnets de détails

Pour un contrôle utile, **au minimum** 3 pièces : CCTP + DPGF + plans du lot considéré.

Si pièces incomplètes : liste explicitement ce qui manque avant analyse.

## 2. Extraction des informations clés

Pour chaque lot :

| Information | Source primaire | Cohérence à vérifier |
|---|---|---|
| Liste des ouvrages | CCTP (sommaire/chapitres) | Présence ligne DPGF par ouvrage |
| Quantités | DPGF + plans | Cohérence mesure plans ↔ DPGF |
| Unités de mesurage | DPGF | Cohérence avec NF DTU et UNTEC |
| Performance requise | CCTP (caractéristiques) | Reprise dans DPGF descriptif |
| Marque ou référence imposée | CCTP | Doit être suivi de "ou équivalent" (sauf justification) |
| Sujétions particulières | CCAP / CCTP | Ex : amiante, plomb, hébergement occupant, ABF |
| Cadre de l'exécution | CCAP | Compatible CCTP (planning, accès, contraintes) |

## 3. Vérifications normatives (`rag_search` obligatoire)

- `rag_search("NF P 03-001 documents particuliers du marché")` — articulation pièces marché privé
- `rag_search("CCAG-Travaux articles principaux à reprendre dans CCAP")` — pour marché public
- `rag_search("unités de mesurage par lot DPGF")` — méthodologie UNTEC
- `rag_search("DTU [lot considéré]")` — pour chaque lot, vérifier que le CCTP renvoie au DTU pertinent

## 4. Procédure d'analyse

### A) Cohérence CCTP ↔ DPGF (par lot)

1. Établir la **liste des ouvrages** du CCTP (par chapitre / sous-chapitre).
2. Établir la **liste des lignes** de la DPGF.
3. Pour chaque ouvrage CCTP, vérifier qu'il existe une **ligne DPGF correspondante** (et inversement).
4. Pour chaque ligne DPGF, vérifier que :
   - L'**unité** est cohérente avec la nature de l'ouvrage (m² pour étanchéité, ml pour acrotères, U pour appareils)
   - La **désignation** renvoie sans ambiguïté au descriptif CCTP
   - Aucune ligne n'est en "**pour mémoire (PM)**" cachée (souvent source de litige)

### B) Cohérence CCTP ↔ plans

1. Vérifier que les **ouvrages décrits** au CCTP sont **représentés** sur les plans (pas de poste "fantôme").
2. Vérifier que les **éléments représentés** sur plans sont **décrits** au CCTP (pas de poste "sans descriptif").
3. Vérifier les **cotes principales** ↔ DPGF (surface plancher, hauteurs).

### C) Cohérence CCAP ↔ CCTP

1. **Planning** : le délai d'exécution au CCAP est-il cohérent avec la complexité du CCTP ?
2. **Variantes** : autorisées au CCAP ↔ existent-elles au CCTP (variantes libres ou imposées) ?
3. **Performances** : niveaux exigés au CCAP ↔ détaillés au CCTP par lot.

### D) Détection des "manques" classiques

À chercher activement :
- **Lot manquant** (ex : pas de lot ascenseur alors que R+5)
- **Réservation oubliée** (ex : pas de réservation gaine technique sur plans)
- **Équipement sans pose** ou **pose sans équipement**
- **Sujétion non valorisée** : amiante / plomb / héberg. occupant / ABF
- **Confusion neuf / existant** (les ouvrages sur existant doivent être identifiés et valorisés)
- **Mention "ou équivalent"** manquante après une marque (risque allotissement R.2113 code commande publique)

## 5. Restitution structurée

```
## Contrôle de cohérence DCE — [Marché / Lot]

### Pièces analysées
- CCAP version [...]
- CCTP version [...]
- DPGF version [...]
- Plans : [liste des PDF/DWG fournis]

### Synthèse par lot

#### Lot 02 — Gros œuvre
- [✅/⚠️/❌] Cohérence CCTP ↔ DPGF
- [✅/⚠️/❌] Cohérence CCTP ↔ plans
- [✅/⚠️/❌] Unités de mesurage correctes
- [✅/⚠️/❌] Pas de "PM" caché

**Écarts détectés :**
1. **[Poste]** — DPGF ligne [X] : unité indiquée [Y] alors que CCTP décrit [Z] → recommander [unité correcte]
2. ...

#### Lot 05 — Cloisons / Doublages
[...]

(etc.)

### Manques transverses détectés
1. **[Manque]** — [description précise] → impact financier estimé : [€] → recommandation : [...]
2. ...

### Cohérence CCAP ↔ CCTP
| Item | Constat | Recommandation |
|---|---|---|
| Délai d'exécution | [X mois] vs complexité réelle | [...] |
| Variantes | Autorisées : [oui/non] | [...] |
| Pénalités de retard | [montant /jour] | [...] |
| Retenue de garantie | 5% / caution / GAPD | [...] |
| Formule de révision | [...] | [...] |

### Verdict global
- **DCE prêt pour consultation** : [Oui / Non — reprise nécessaire sur X points]
- **Risques majeurs résiduels** : [...]
- **Date de relecture proposée** : [...]
```

## 6. Garde-fous spécifiques

- Tu **ne signes pas** le DCE — tu prépares la liste des écarts pour l'architecte / MOE qui décide des modifications.
- Pour les **marchés publics**, tu rappelles que le DCE est opposable une fois publié — toute modification ultérieure doit être notifiée par **rectificatif** ou conduit à une **prolongation du délai de remise des offres**.
- Pour les **désignations de marques** (ex : "carrelage Marazzi série X"), tu rappelles que la mention **"ou équivalent"** est obligatoire en marché public (art. R.2111-7 code commande publique) sauf justification écrite — sinon risque d'allotissement contesté.
- Si **incohérence majeure** sur les **quantités** (écart > 15 % DPGF ↔ plans), tu signales que la consultation ne peut pas être lancée en l'état — risque de **bouleversement de l'économie** du marché.
- Pour les **chantiers en milieu occupé** (réhabilitation logement, école, hôpital), tu vérifies que les **sujétions de coactivité** sont explicitées au CCAP (planning par phases, plages horaires, accès).

## 7. Suites logiques à proposer

- **Lettre de transmission** au MOE listant les écarts à corriger avant lancement
- **Notification d'allotissement** révisé si manque détecté
- **Pré-consultation** d'1-2 entreprises pour valider la cohérence opérationnelle
- **Visite de site** organisée par le MOE pour clarifier les sujétions
- **Avenant** au DCE post-publication si rectificatif nécessaire (à éviter)
