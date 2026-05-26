# Skill — Métré quantitatif depuis plans

L'utilisateur veut un métré quantitatif (quantitatifs par lot, par ouvrage élémentaire) à partir de plans architecte/structure.

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **Plans architecte cotés** (PDF ou DWG) — plan de masse, plans niveaux, coupes, façades. Format **cote** souvent en mm ou cm sur plans techniques.
- **Plans structure** (coffrage, ferraillage) si disponibles.
- **CCTP** par lot pour cadrer les ouvrages élémentaires.
- **DPGF vide** si déjà fournie par le MOE.
- **Photographies** chantier en cas de rénovation.

Si aucun plan : pose ces questions pour un métré indicatif :
1. SDP totale ?
2. Type de structure (béton voilé, ossature bois, poteau-poutre métal) ?
3. Nombre de niveaux et hauteur sous plafond ?
4. Type d'enveloppe (façades légères, maçonnée, ITE) ?
5. Type de couverture (toiture-terrasse, charpente bois, pannes acier) ?

## 2. Extraction des informations clés depuis les plans

| Information | Où chercher | Comment mesurer |
|---|---|---|
| Surface au sol (emprise) | Plan de masse | Mesurer périmètre × largeur ou polygone |
| Surfaces de planchers | Plans niveaux + cotes | Surface entre nus intérieurs |
| Linéaire de mur extérieur | Plan niveau + cote périmètre | Périmètre extérieur × hauteur sous dalle |
| Linéaire de cloisons | Plans niveaux | Cumul des cloisons par type |
| Surfaces de toiture | Coupes + plan toiture | Surface en projection horizontale (pour bordereaux) ou rampant |
| Nombre d'ouvertures | Plans niveaux + façades | Compter par type et dimension |
| Volume béton | Plans coffrage | Dim × dim × longueur ; déduire trémies |
| Tonnage acier | Plans ferraillage ou ratio | Si plan ferraillage absent : ratio kg/m³ béton (60-90 kg en logement, 100-150 en superstructure parking) |

**Référence des unités par lot** : `rag_search("unités de mesurage par lot DPGF")` (voir corpus économiste).

## 3. Vérifications normatives (`rag_search` obligatoire)

Avant rédaction :
- `rag_search("unités de mesurage par lot")` — règle UNTEC à respecter
- `rag_search("ratios m² béton acier logement collectif")` — pour estimations rapides
- `rag_search("DTU lot considéré")` — règles de l'art (si descriptif ambigu)

## 4. Procédure d'analyse

1. **Identifier les lots** à métrer : VRD / Gros œuvre / Charpente / Couverture / Étanchéité / Façades / Menuiseries ext. / Cloisons-doublages / Menuiseries int. / Revêtements sols / Faïence / Peinture / CVC / Plomb-sanitaire / Électricité / Ascenseur / Espaces verts.
2. **Pour chaque lot**, décomposer en **ouvrages élémentaires** (cf. méthodologie UNTEC dans le corpus économiste).
3. **Mesurer** chaque ouvrage sur les plans avec l'**unité correcte** (m², m³, ml, U, ens.).
4. **Identifier les surfaces / quantités spécifiques** :
   - Trémies (à déduire des surfaces béton)
   - Réservations (passages techniques, gaines)
   - Pertes / chutes (carrelage 5-10 %, étanchéité bicouche 10 %)
5. **Distinguer quantité ouvrage / quantité matière** :
   - Voile béton : 1 m² coffré = 1 face, alors que le coffrage technique fait les 2 faces → bordereau Batiprix prend 1 face
   - Charpente : m² de toiture projection horizontale (bordereau) ≠ m² rampant réel
6. **Produire le quantitatif** par lot, en cohérence avec la DPGF si fournie.

## 5. Restitution structurée

```
## Métré quantitatif — [Projet]

### Hypothèses générales
- **SDP totale** : [m²]
- **Emprise au sol** : [m²]
- **Niveaux** : [nombre + qualification]
- **Hauteur sous plafond moyenne** : [m]
- **Type de structure** : [...]
- **Date du métré** : [JJ/MM/AAAA]
- **Niveau de précision** : [APS ±15 % / APD ±10 % / PRO ±5 %]

### Lot 02 — Gros œuvre

| N° | Désignation | Unité | Quantité | Source / hypothèse |
|---|---|---|---|---|
| 02.01 | Décapage terre végétale | m² | [valeur] | Plan masse, ép. 30 cm |
| 02.02 | Terrassement général | m³ | [valeur] | Plan masse + coupes |
| 02.03 | Fouilles fondations | m³ | [valeur] | Coupes + plan fondations |
| 02.04 | Béton de propreté | m³ | [valeur] | 10 cm sous semelles |
| 02.05 | Semelles filantes BA | m³ | [valeur] | Plan fondations |
| 02.06 | Voiles BA en élévation | m² | [valeur] | Plan coffrage, 1 face |
| 02.07 | Aciers HA | kg | [valeur] | Plan ferraillage ou ratio [X kg/m³] |
| 02.08 | Dalles BA | m² | [valeur] | Plans niveaux, ép. moyenne |
| 02.09 | Escaliers BA | U | [valeur] | Plans niveaux |
| 02.10 | Acrotères | ml | [valeur] | Plan toiture |

### Lot 04 — Étanchéité
| ... |

### Lot 05 — Cloisons / Doublages
| ... |

(etc. pour chaque lot)

### Quantités à valider
- [Liste des cotes / quantités estimées par ratio plutôt que mesurées directement]
- [Hypothèses prises pour les sujétions non plans (chutes, pertes)]

### Niveau de confiance
- **Élevé** : quantités mesurées directement sur plans cotés
- **À valider** : quantités déduites par ratio (préciser)
- **À confirmer par calcul** : ouvrages spécifiques (charpente complexe, sous-œuvre, etc.)

### Suite — Chiffrage
Le métré est l'étape AMONT du chiffrage. Une fois validé :
- Utiliser **`chiffrer_dpgf`** pour appliquer des prix unitaires à ces quantités
- Croiser avec `ratio_m2` pour vérifier la cohérence globale du chiffrage
```

## 6. Outils à utiliser

- `rag_search` pour vérifier unités de mesurage et DTU applicables
- `ratio_m2` pour ordre de grandeur de cohérence
- `calc_surfaces` si l'utilisateur demande de distinguer SDP / SHAB / Carrez

## 7. Garde-fous spécifiques

- Tu **n'invites pas** à un métré sans plans cotés — l'estimation au pifomètre n'a pas valeur de métré.
- Pour les **réhabilitations**, le métré "papier" est **toujours indicatif** — un **métré contradictoire sur site** doit valider en phase EXE.
- Pour les **plans DWG** : tu rappelles à l'utilisateur que l'extraction de quantité depuis un DWG nécessite un **logiciel métré** (Attic+, MasterMetre, ArchiCAD) — l'extraction depuis PDF a une marge d'erreur de 3-8 %.
- Pour les **ouvrages cachés** (réservations, trémies, gaines techniques) : tu **listes explicitement** les hypothèses prises faute de plans techniques.
- Tu **n'engages pas** le signataire de la note de métré — tu prépares l'analyse pour l'économiste.

## 8. Suites logiques à proposer

- **Recoupement** avec ratio_m2 pour cohérence globale
- **Chiffrage** poste par poste via `chiffrer_dpgf`
- **Consultation entreprises** sur les postes structurants
- **Vérification contradictoire** sur site si rénovation lourde
- **Mise en forme** Excel ou XML KP1 pour transmission MOE
