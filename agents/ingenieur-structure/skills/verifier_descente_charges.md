# Skill — Vérifier une descente de charges

L'utilisateur te transmet une note de calcul ou un projet de structure pour lequel tu dois **reconstituer et vérifier la descente de charges** depuis la toiture jusqu'aux fondations selon les Eurocodes (NF EN 1990, 1991 et leurs Annexes Nationales françaises).

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **Plans de coffrage** (PDF, DWG) — niveaux, trames porteuses, sections des éléments
- **Plans de charpente** (couverture, toiture-terrasse)
- **Note de calcul descente de charges** (extrait Robot, Advance Design, Graitec, Arche, ou note manuelle)
- **Notice descriptive** : nature des planchers (dalle pleine, hourdis, prédalles, CLT), revêtements, cloisons
- **Rapport géotechnique** G1 / G2 pour les contraintes admissibles aux fondations
- **Plan masse** avec orientation (pour le vent) et localisation (pour neige et sismique)

Si pas de note de calcul fournie : demande
1. Destination du bâtiment (habitation, bureau, ERP, industriel, parking)
2. Géométrie (nombre de niveaux, trames, hauteurs sous plafond, portées principales)
3. Localisation (commune ou département pour zones neige/vent/sismique)
4. Altitude (impact direct sur charges de neige)
5. Nature des planchers (dalle BA, prédalles, hourdis, plancher mixte, CLT)
6. Revêtements et cloisons prévus (chape, carrelage, faux-plafond, cloisons placostil ou maçonnées)
7. Toiture (terrasse accessible / non accessible, couverture pente, type charpente)

## 2. Référentiels et hypothèses (`rag_search` obligatoire)

Avant tout calcul, lance les requêtes :
- `rag_search("EC0 NF EN 1990 combinaisons d'actions ELU ELS")` — coefficients γ et ψ
- `rag_search("EC1 partie 1-1 poids volumiques matériaux")` — valeurs caractéristiques
- `rag_search("EC1 partie 1-1 charges d'exploitation catégories A à K")` — valeurs qk
- `rag_search("EC1 partie 1-3 neige carte régionale altitude")` — sk selon région A1 à E
- `rag_search("EC1 partie 1-4 vent pression dynamique vb,0 régions 1 à 4")` — pour vérif chargement enveloppe
- `rag_search("annexe nationale française EC1")` — valeurs spécifiques France

## 3. Extraction des charges (action par action)

### A — Charges permanentes G (EC1-1-1)

| Élément | Valeur indicative | Source |
|---|---|---|
| Dalle BA pleine 20 cm | 5,0 kN/m² | EC1-1-1 tab. A.1 (β = 25 kN/m³) |
| Dalle BA pleine 25 cm | 6,25 kN/m² | idem |
| Prédalle + dalle compression (16+4 cm) | ≈ 5,5 kN/m² | retour fournisseur |
| Hourdis BA 16+4 cm | ≈ 3,3 kN/m² | EC1-1-1 |
| Plancher poutrelles-hourdis polystyrène 16+4 | ≈ 2,5 kN/m² | retour fournisseur |
| Plancher CLT 200 mm | ≈ 1,0 kN/m² | retour fournisseur |
| Chape ciment 5 cm | 1,0 kN/m² | β = 20 kN/m³ |
| Carrelage + colle | 0,5 kN/m² | retour pose |
| Parquet flottant | 0,2 kN/m² | retour pose |
| Faux-plafond plâtre | 0,15 kN/m² | retour fournisseur |
| Cloisons placostil légères | 0,5 kN/m² (forfait) | EC1-1-1 §6.3.1.2 (2) |
| Cloisons maçonnerie ép. 10 cm | 1,5-1,8 kN/m² | calcul direct |
| Cloisons maçonnerie ép. 20 cm | 3,0 kN/m² | calcul direct |
| Étanchéité bicouche + protection gravillon | 0,5 + 0,9 = 1,4 kN/m² | retour fournisseur |
| Isolation toiture-terrasse 14 cm | 0,03 kN/m² | retour fournisseur |
| Couverture tuile + liteaux + écran | 0,5-0,6 kN/m² | EC1-1-1 |
| Charpente bois traditionnelle (forfait) | 0,15 kN/m² | retour calcul |

### B — Charges d'exploitation Q (EC1-1-1 §6.3 + AN française)

| Catégorie | Destination | qk (kN/m²) | Qk concentré (kN) |
|---|---|---|---|
| **A** | Habitation, résidentiel | 1,5 | 2,0 |
| **B** | Bureaux | 2,5 | 4,0 |
| **C1** | Salles de réunion (avec tables) | 2,5 | 4,0 |
| **C2** | Salles à sièges fixes | 4,0 | 4,0 |
| **C3** | Espaces sans obstacles (musées, halls) | 4,0 | 4,0 |
| **C4** | Activités physiques (gymnases) | 5,0 | 7,0 |
| **C5** | Foules denses (concerts, tribunes) | 5,0 | 4,5 |
| **D1** | Commerces de détail | 5,0 | 4,0 |
| **D2** | Grands magasins | 5,0 | 7,0 |
| **E1** | Stockage léger (archives, livres) | 7,5 | 7,0 |
| **F** | Parking véhicules ≤ 30 kN | 2,5 | 20 |
| **G** | Parking véhicules > 30 kN | 5,0 | 90 |
| **H** | Toitures inaccessibles (entretien) | 1,0 | 1,5 |
| **I** | Toitures accessibles (cat. A à G) | selon cat. usage | idem |

⚠️ **Coefficient de dégression αn** sur charges Q en bâtiments d'habitation/bureau (AN française EC1-1-1) : pour les poteaux et murs supportant ≥ 2 niveaux, possibilité de réduction selon le nombre de niveaux supportés. Toujours préciser si appliquée.

### C — Charges climatiques (EC1-1-3 neige, EC1-1-4 vent)

- **Neige sk** : selon **carte régionale française** (A1, A2, B1, B2, C1, C2, D, E) — voir AN française EC1-1-3
- Pour z > 200 m d'altitude, **majoration** selon formule § A.1 de l'AN française
- **Toiture 1 pente, 2 pentes, multiple, accumulations** : coefficients de forme μ1, μ2 selon §5.3 EC1-1-3
- **Vent vb,0** : selon **carte de vent française** (régions 1 à 4) — voir AN française EC1-1-4
- Catégorie de terrain (0 à IV) selon environnement (mer ouvert / campagne / forêt / ville)
- Coefficients pression cpe (extérieur) et cpi (intérieur)

### D — Charges sismiques (EC8 — voir skill `zonage_sismique`)

Si zone 3, 4 ou 5 ou catégorie d'importance III/IV → combinaisons sismiques additionnelles à intégrer.

## 4. Combinaisons d'actions (EC0 — NF EN 1990 §6.4)

### ELU fondamentale (situation durable / transitoire)

```
1,35 × Gk,sup + 0,9 × Gk,inf + 1,5 × Qk,1 + ∑ 1,5 × ψ0,i × Qk,i
```

Coefficients ψ0 (AN française EC0 tab. A1.1) :
| Catégorie | ψ0 | ψ1 | ψ2 |
|---|---|---|---|
| A (habitation) | 0,7 | 0,5 | 0,3 |
| B (bureau) | 0,7 | 0,5 | 0,3 |
| C (rassemblement) | 0,7 | 0,7 | 0,6 |
| D (commerce) | 0,7 | 0,7 | 0,6 |
| E (stockage) | 1,0 | 0,9 | 0,8 |
| F (parking ≤ 30 kN) | 0,7 | 0,7 | 0,6 |
| Neige (altitude < 1000 m) | 0,5 | 0,2 | 0 |
| Vent | 0,6 | 0,2 | 0 |

### ELS caractéristique (rares — vérification flèche poutres, ouverture fissures)

```
Gk + Qk,1 + ∑ ψ0,i × Qk,i
```

### ELS quasi-permanente (vérification flèche long terme, fissuration durable)

```
Gk + ∑ ψ2,i × Qk,i
```

## 5. Procédure de vérification

1. **Identifier la trame structurelle** et la **descente principale** : repérer sur plan les **poteaux et murs porteurs** ; tracer le cheminement des charges niveau par niveau.

2. **Pour chaque niveau, du haut vers le bas** :
   - Calculer Gk (poids propre + revêtements + cloisons + équipements fixes)
   - Identifier Qk selon catégorie d'usage du niveau
   - Appliquer les neige/vent uniquement en toiture
   - Cumuler par poteau / mur porteur via **surface d'influence**

3. **Surfaces d'influence** :
   - Poteau central : ½ portée × ½ portée (4 trames)
   - Poteau de rive : ½ × ¼ trame (2 trames + console éventuelle)
   - Poteau d'angle : ¼ × ¼ trame
   - Mur de refend : ½ portée × longueur du mur

4. **Vérifier la combinaison ELU à la fondation** :
   - Calculer Nu = 1,35 Σ Gi + 1,5 Σ Qi (avec dégression αn si applicable)
   - Comparer à la **capacité portante** annoncée dans le rapport géotechnique (G2 / G3)
   - Coefficient de sécurité ≥ 1 (ELU)

5. **Recouper avec la note de calcul fournie** :
   - Hypothèses (poids volumiques, surcharges) cohérentes avec les destinations ?
   - Combinaisons utilisées correctes ?
   - Coefficients ψ adaptés ?
   - Dégression αn correctement appliquée ou pas appliquée à tort ?

## 6. Restitution structurée

```
## Descente de charges — [Bât. / Niveau / Élément]

### Hypothèses
- **Référentiel** : EC0 + EC1-1-1 + AN française
- **Catégorie d'usage par niveau** : RDC = D1, R+1 à R+4 = A
- **Région neige / altitude** : [zone] / [m]
- **Région vent** : [zone, catégorie terrain]
- **Dégression αn** : [appliquée / non appliquée + justification]

### Charges par niveau (sur 1 m² de plancher)

| Niveau | Catégorie | Gk (kN/m²) | Qk (kN/m²) | Combinaison ELU (kN/m²) |
|---|---|---|---|---|
| Toiture-terrasse | H | 7,2 | 1,0 | 11,2 |
| R+4 (logements) | A | 6,5 | 1,5 | 11,0 |
| R+3 (logements) | A | 6,5 | 1,5 | 11,0 |
| ... | | | | |
| RDC (commerce) | D1 | 7,0 | 5,0 | 16,9 |
| **TOTAL ELU dalle au-dessus de fondations** | | | | **N kN/m²** |

### Charge totale par élément vertical (exemple poteau P3)

- **Surface d'influence** : 5,4 × 4,8 = 25,9 m²
- **Nb niveaux supportés** : 5
- **Charge ELU pondérée + dégression αn** : Nu = [...] kN
- **Charge ELU sans dégression (vérification)** : [...] kN

### Comparaison avec note de calcul

| Élément | Note BE | Recalcul agent | Écart | Conformité |
|---|---|---|---|---|
| Poteau P3 niveau RDC | 1 850 kN | 1 870 kN | + 1,1 % | ✅ |
| Mur M2 niveau R-1 | 240 kN/ml | 285 kN/ml | + 18,7 % | ⚠️ À vérifier |

### Points d'attention
1. [Écart > 10 % sur élément X → hypothèse divergente sur Y]
2. [Dégression αn appliquée sur catégorie C1 — vérifier admissibilité AN française]
3. [Surcharge cloisons manquante au R+2 (0,5 kN/m² forfait min)]

### Compatibilité fondations
- **Capacité géotechnique annoncée** : qadm = [kPa] (rapport G2 du [date])
- **Contrainte max recalculée** : [kPa]
- **Vérification** : ✅ / ⚠️ / ❌

### Niveau de confiance
- [Élevé / À valider par BE structure / À confirmer avec hypothèses définitives]
```

## 7. Garde-fous spécifiques

- Tu **ne signes pas** la descente de charges — c'est le **BE structure signataire** qui engage sa **responsabilité décennale** (Code civil art. 1792).
- Si la note de calcul fournie est en désaccord de **> 10 %** avec ton recalcul, **n'arbitre pas** : tu demandes au BE de justifier ses hypothèses.
- Tu **rappelles** que la dégression αn (AN française EC1-1-1) est facultative et que son application doit être **explicitement déclarée** par le BE.
- Pour les **bâtiments à usage mixte** (commerce + habitation), les charges d'exploitation Q de chaque niveau utilisent la **catégorie correspondante**, jamais la plus défavorable globale (sauf justification).
- Pour les **planchers de grande portée** (> 8 m), vérifie également **flèche ELS quasi-permanente ≤ L/250** et vibration (critère à valider auprès du BE).
- Pour les **toitures-terrasses végétalisées** ou **photovoltaïques** : surcharges spécifiques à intégrer (charge eau de saturation, panneaux PV ≈ 0,15 kN/m² + lestage).
- Pour les **parkings**, ne jamais oublier les **charges concentrées Qk** (20 ou 90 kN) en plus de la charge répartie qk.
- En présence de **silos, archives, bibliothèques, stockage** : surcharges très spécifiques, demander **destination détaillée et charge effective**.

## 8. Suites logiques à proposer

- Vérification des **sections** des poteaux, murs et fondations avec la skill `predim_poutre_poteau_dalle`
- Contrôle de la **note de calcul** complète avec la skill `controle_note_calcul`
- Analyse du **rapport géotechnique** pour validation des contraintes admissibles avec la skill `analyse_rapport_geotechnique`
- Si zone sismique 3+ : compléter par la skill `zonage_sismique` et combinaisons sismiques
- **STS** (simulation thermique structurelle) si bâtiment exposé à variations thermiques importantes (toiture acier, façade verre)
