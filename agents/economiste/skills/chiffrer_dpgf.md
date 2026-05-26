# Skill — Chiffrer une DPGF (Décomposition du Prix Global et Forfaitaire)

L'utilisateur te demande de **renseigner, vérifier ou réviser une DPGF** (Décomposition du Prix Global et Forfaitaire) — pièce contractuelle quantitative et économique des marchés de travaux, qu'ils soient **publics** (CCAG-Travaux) ou **privés** (NF P 03-001).

## 1. Documents attendus

- **DPGF** vide ou pré-remplie (XLSX, PDF)
- **CCTP** par lot (descriptifs techniques)
- **Plans cotés** APD / PRO / DCE (PDF ou DWG)
- **Métré quantitatif** (si déjà établi par BE économiste ou MOE)
- **CCAP** (révision, ferme/ajustable, modalités de paiement)
- **CCTG** (cahier des clauses techniques générales) si visé
- **Bordereaux de prix** internes ou commerciaux (Batiprix édition N, Capeb, FFB)
- **Sous-détails** des prix unitaires (méthode UNTEC)
- **Phase du projet** (ESQ : ± 25 %, APS : ± 20 %, APD : ± 15 %, PRO : ± 10 %, DCE : ± 5 %, OFFRE : engageant)

Si pièces partielles : demande
1. Marché **public** ou **privé** ?
2. **Phase** du projet (impact direct sur précision attendue) ?
3. **Région** d'implantation (impact prix MO et matériaux) ?
4. **Date** de référence des prix (mois et année) ?
5. **Source** de prix utilisée (Batiprix année, bordereau interne, retour marché) ?
6. Statut du chiffrage : **estimation** prévisionnelle / **offre** engageante ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("NF P 03-001 article 7 DPGF marchés privés")`
- `rag_search("CCAG-Travaux article 11 prix unitaires forfaitaires")`
- `rag_search("méthode UNTEC sous-détail prix MO MAT FC FG BA")`
- `rag_search("Batiprix nomenclature unités mesurage par lot")`
- `rag_search("indices BT INSEE révision prix")`
- `rag_search("ratios SGI OEAP UNTEC m² par destination")` — pour benchmark

## 3. Structure de la DPGF

### A — En-tête

| Mention | Contenu |
|---|---|
| Référence marché / opération | [titre + n° identifiant] |
| Maître d'ouvrage | [...] |
| Maître d'œuvre | [...] |
| Lot | [n° + intitulé] |
| Phase | DCE / Offre |
| Date | [JJ/MM/AAAA] |
| Index de prix | Mois M0 de référence |
| Régime de prix | Ferme / Ferme actualisable / Révisable + formule |

### B — Tableau de chiffrage (par lot)

| Colonne | Contenu |
|---|---|
| **N° poste** | Numérotation hiérarchique (1, 1.1, 1.2, 2, 2.1...) |
| **Désignation** | Libellé court rattaché au CCTP |
| **Référence CCTP** | Article / paragraphe |
| **Unité** | m², m³, ml, U, kg, ens, ff, jour... |
| **Quantité** | Décimale (m² avec 2 décimales) |
| **Prix Unitaire HT** | € par unité |
| **Prix Total HT** | PU × Quantité |
| **Source du PU** | Batiprix 2024 / Sous-détail / Retour marché / FF |
| **Confiance** | Élevée / Moyenne / Faible |
| **Hypothèses** | Notes méthodologiques |

### C — Totaux par lot et général

- **Total HT lot** = Σ Prix Total HT
- **Plus-value géographique** (zone Paris/IDF +15 à +25 %, montagne +10 à +20 %, etc.)
- **Plus-value pour conditions de chantier** (héritage existant, accès difficile, milieu occupé) +5 à +20 %
- **TVA** selon nature de l'opération
- **Total TTC**

## 4. Unités de mesurage par lot (extrait critique)

| Lot | Ouvrage typique | Unité |
|---|---|---|
| **VRD / Terrassement** | Décapage TV, déblais, remblais | m² / m³ |
| | Réseaux EU / EP / AEP | ml |
| | Regards, bouches, postes | U |
| | Voirie bitumineuse | m² (× épaisseur) |
| **Démolitions** | Démolition maçonnerie, ouvrage BA | m³ |
| | Démolition cloison | m² |
| | Désamiantage | m² (selon DTA) |
| **Gros œuvre** | Fondations semelles | m³ |
| | Fondations pieux | ml (× ϕ) |
| | Voile BA | m² (× épaisseur) ou m³ |
| | Poteau BA, poutre BA | m³ |
| | Dalle BA, plancher | m² (avec ép.) |
| | Mur maçonnerie | m² (avec ép.) |
| | Acrotère | ml |
| | Évacuations attentes plomberie | U |
| **Charpente** | Charpente bois traditionnelle | m² couvert |
| | Lamellé-collé / fermes industrielles | U + kg |
| | Charpente métallique | tonnes |
| **Couverture** | Tuile / ardoise / zinc | m² rampant |
| | Zinguerie (chéneaux, gouttières) | ml |
| | Fenêtres de toit | U |
| **Étanchéité** | Multicouche, monomembrane | m² |
| | Relevés | ml |
| | Étanchéité enterrée | m² |
| **Cloisonnement** | Placostil 72-98 mm | m² |
| | Faux-plafond | m² |
| | Doublages thermiques / acoustiques | m² |
| **Menuiseries extérieures** | Fenêtre, porte fenêtre | U (avec dim.) |
| | Porte d'entrée | U |
| | Volets roulants, BSO | U |
| **Menuiseries intérieures** | Porte intérieure | U |
| | Placard | ml de tringle ou U |
| **Plomberie / sanitaires** | Distribution eau froide/chaude | ml |
| | Évacuation EU / EV | ml |
| | Sanitaires (lavabo, WC, douche) | U |
| | Robinetterie | U |
| **CVC** | Chaudière, PAC, VMC | U |
| | Gaines de ventilation | ml |
| | Radiateurs | U |
| | Diffusion (registres, grilles) | U |
| **Électricité** | Tableau, départs, protections | U |
| | Câblage courant fort / faible | ml |
| | Appareillage (prises, interrupteurs) | U |
| | Éclairage | U |
| **Revêtements de sol** | Carrelage / parquet | m² |
| | Plinthes | ml |
| | Sols souples (PVC, linoléum) | m² |
| **Peinture / revêtements muraux** | Peinture murs/plafonds | m² développé |
| | Papier peint | m² |
| | Faïence | m² |
| **Aménagements extérieurs** | Clôture, portail | ml + U |
| | Pavés, dalles | m² |

⚠️ **Pièges fréquents** :
- Confondre **m² de mur fini** vs **m² de cloison brute** (la cloison de doublage compte en plus)
- Confondre **mètres carrés rampants** (toiture) vs **m² projetés en plan**
- Oublier la **développée** (peinture intérieure : surfaces × hauteur sous plafond, déduction ouvertures > 0,5 m²)
- Doubler comptage **plinthes** = ml de murs périphériques par pièce (sans porte)
- Coffrage perdu / récupérable : compte différemment en m² (récupérable = 1 emploi)

## 5. Méthode du sous-détail de prix (UNTEC)

```
Prix Unitaire HT = DS × (1 + FC) × (1 + FG) × (1 + BA)
```

| Composante | Définition | Ordre de grandeur |
|---|---|---|
| **DS** Déboursé Sec | MO + MAT + MAT' + TR + SC | Coût direct du poste |
| **MO** | Main d'œuvre (heures × taux horaire chargé) | |
| **MAT** | Matériaux | Fournitures consommées dans l'ouvrage |
| **MAT'** | Matériel | Engins, échafaudages, outillage |
| **TR** | Transport | Livraison matériaux, location camion |
| **SC** | Sous-traitance, locations | Si poste partiellement sous-traité |
| **FC** Frais de chantier | Logistique chantier (encadrement, sécurité, baraquements) | 5 à 12 % du DS |
| **FG** Frais généraux | Structure entreprise (direction, comptabilité, R&D) | 8 à 15 % |
| **BA** Bénéfices + aléas | Marge + couverture risques | 3 à 8 % |

⚠️ Selon les conventions :
- Méthode **cascade** (multiplicative) : (((DS + FC) + FG) + BA) — plus précise
- Méthode **simple** (additive) : DS + FC + FG + BA — plus rapide

## 6. Procédure de chiffrage

### Étape 1 — Analyse préalable

- Vérifier la **cohérence CCTP ↔ DPGF** : chaque poste DPGF doit pointer un article CCTP, et chaque ouvrage CCTP doit apparaître dans la DPGF
- Signaler les **omissions** (poste CCTP non chiffré) et les **doublons** (même prestation comptée 2 fois)
- Identifier les **descriptifs flous** (ex : "Diverses prestations annexes" sans détail) — demander précision MOA/MOE ou prendre **hypothèse** explicite

### Étape 2 — Quantification

- Reprendre le **métré quantitatif** si fourni
- Sinon, **recalculer** depuis plans cotés et descriptifs CCTP (voir skill `metre_quantitatif`)
- Vérifier **unités** conformes à la nomenclature lot (cf. §4)
- Croiser **quantités par lot** avec totaux **globaux** (cohérence m² SHAB, m² SDP)

### Étape 3 — Application des prix unitaires

Source par ordre de **fiabilité** :
1. **Sous-détail propre** de l'entreprise (le plus fiable, à jour, mais peu accessible en BE)
2. **Retour de marché** récent et comparable (très fiable si récent, géographie cohérente)
3. **Batiprix** (édition année N — actualisation annuelle) — référence économiste
4. **Capeb / FFB** bordereaux artisans (souvent plus chers que Batiprix)
5. **Estimation par ratio** au m² SDP (uniquement en phase amont — ESQ/APS)

### Étape 4 — Plus-values et minorations contextuelles

| Contexte | Impact PU |
|---|---|
| Région parisienne (75, 92, 93, 94) | +15 à +25 % |
| Sud-Est, côte basque | +5 à +15 % |
| Montagne (Alpes, Pyrénées) | +10 à +20 % |
| Outre-Mer | +20 à +40 % |
| Centre / Province standard | référence |
| Chantier en milieu occupé (école, hôpital, copro) | +10 à +20 % |
| Chantier accès difficile (centre-ville, ruelle, étage sans monte-charge) | +5 à +15 % |
| Petit chantier (< 100 k€) | +10 à +20 % (frais fixes répartis) |
| Gros chantier (> 5 M€) | -5 à -10 % (économies d'échelle) |
| Rénovation lourde | +20 à +40 % (vs neuf) |
| Réhabilitation MH ou ABF | +30 à +80 % (matériaux et techniques spécifiques) |

### Étape 5 — Vérification globale

- **Ratio €/m² SDP** cohérent avec destination (voir skill `ratio_m2`)
- Répartition par **lot** cohérente avec les standards :
  - Gros œuvre : 25 à 35 % du total
  - Charpente / Couverture / Étanchéité : 8 à 12 %
  - Menuiseries ext. : 8 à 12 %
  - Cloisonnement / Plâtrerie : 5 à 8 %
  - Menuiseries int. : 3 à 6 %
  - CVC : 8 à 15 %
  - Plomberie / Sanitaires : 4 à 8 %
  - Électricité : 6 à 10 %
  - Revêtements de sols : 4 à 8 %
  - Peinture / Faïence : 3 à 6 %
  - VRD / Aménagements ext. : 5 à 15 %
  - Honoraires MOE : 8 à 14 % du total travaux (hors DPGF)

### Étape 6 — Restitution structurée

```
## Chiffrage DPGF — Lot [n° + nom] — [Projet]

### Hypothèses
- **Marché** : public CCAG / privé NF P 03-001
- **Phase** : DCE / Offre
- **Région** : [...]
- **Date prix** : Batiprix [année] + retours marché récents
- **Indice M0** : [BT01 / BT08 / BT38 / index mensuel mois M-3]
- **Précision attendue** : ± [%] selon phase

### Tableau de chiffrage

| N° | Désignation | Réf. CCTP | Unité | Qté | PU HT (€) | Total HT (€) | Source PU | Confiance |
|---|---|---|---|---|---|---|---|---|
| 1 | TERRASSEMENTS | | | | | | | |
| 1.1 | Décapage terre végétale ép. 30 cm | A.1.1 | m² | 350 | 5,80 | 2 030 | Batiprix 2024 | Élevée |
| 1.2 | Fouilles en pleine masse | A.1.2 | m³ | 280 | 14,50 | 4 060 | Batiprix 2024 | Élevée |
| 1.3 | Remblais sous dallage GNT 0/31,5 | A.1.4 | m³ | 120 | 38,00 | 4 560 | Batiprix 2024 | Élevée |
| ... | | | | | | | | |
| 2 | FONDATIONS | | | | | | | |
| 2.1 | Béton propreté C16/20 ép. 10 cm | A.2.1 | m³ | 12 | 175 | 2 100 | Batiprix 2024 | Élevée |
| 2.2 | Semelles filantes BA C25/30 | A.2.2 | m³ | 35 | 285 | 9 975 | Batiprix 2024 | Élevée |
| ... | | | | | | | | |

### Sous-total lot 1 — Terrassements / Fondations : [...] € HT

### Récapitulatif par sous-lot

| Sous-lot | Total HT (€) | % du lot |
|---|---|---|
| Terrassements | [...] | [...] |
| Fondations | [...] | [...] |
| Voiles BA | [...] | [...] |
| Planchers | [...] | [...] |
| Couverture | [...] | [...] |
| ... | | |
| **TOTAL LOT HT** | **[...]** | **100 %** |

### Plus-values contextuelles
- Zone géographique : [+X %]
- Conditions chantier : [+X %]
- **Total ajusté HT** : [...] €

### Ratios de contrôle
- **€/m² SDP du lot** : [...] €/m² (référence destination [...] : [...] à [...] €/m²)
- **€/m² SHAB du lot** : [...]
- Cohérence avec ratios marché : ✅ / ⚠️ / ❌

### Points à clarifier
1. [Poste 3.4 — descriptif CCTP flou ("autres prestations connexes") : hypothèse prise = X]
2. [Quantité du poste 5.2 incohérente avec plan — recalcul donné en notes]
3. [VRD spécifiques (raccordements eau/élec) non explicités : provision FF 15 000 €]

### Exclusions
- Honoraires MOE
- Compte prorata (lot mandataire EP gros œuvre)
- Bureau de contrôle
- CSPS
- Études géotechniques G2/G3/G4
- Branchements définitifs (à charge MOA)
- Assurances dommages-ouvrage (charge MOA)

### Niveau de confiance global
- **Estimation HT lot** : [...] €
- **Fourchette** : [...] à [...] € (selon précision phase)
- **Recommandation** : [chiffrage à valider par retour marché / consultation ciblée / OPC pour calibrage]
```

## 7. Garde-fous spécifiques

- Tu **ne prétends jamais** qu'un chiffrage est "**le prix**" — c'est **une fourchette** à un moment T, dans un contexte donné, **sourcée**.
- Pour les **phases amont** (ESQ/APS), la précision attendue est de **± 20-25 %** : recommander un **ratio €/m² SDP** + vérification par compte décomposé sommaire.
- Pour les **phases aval** (PRO/DCE), la précision attendue est de **± 5-10 %** : exiger métré détaillé + sous-détails de prix.
- Si l'utilisateur n'a pas précisé **région**, **phase**, ou **date** : **demande** ces informations avant tout chiffrage.
- **Ne mélange pas** des bordereaux de **millésimes différents** sans le signaler (Batiprix 2023 ≠ Batiprix 2025 — écart 5-10 % typique).
- Pour les marchés publics, rappelle que le **CCAP** du marché fixe les règles de **révision** (formule, indice, mois M0).
- Pour les marchés **réhabilitation** : majorations importantes par rapport au neuf (+ 20 à 40 %), avec coefficient **selon état initial** et **contraintes** (occupation, amiante, plomb).
- Pour les **provisions / forfaits** : ne **pas** se contenter d'un "FF 10 000 €" sans justification — toujours détailler l'hypothèse derrière le forfait.
- Pour les **prestations sous-traitées** : prévoir une **marge de coordination EP** (généralement 5 à 10 %).
- Pour les **fondations spéciales** (pieux, micropieux, parois berlinoises, parois clouées) : **toujours** consulter une entreprise spécialisée — pas de chiffrage forfaitaire fiable sans étude G2/G3.
- Si **incohérence** détectée entre métré et plans : **ne corrige pas silencieusement** — signale et demande arbitrage MOA/MOE.
- Tu **n'engages pas** la responsabilité de l'économiste utilisateur — tu fournis une estimation à **valider** par retour marché ou consultation.

## 8. Suites logiques à proposer

- **Consultation ciblée** de 2-3 entreprises sur les postes critiques (validation prix par retour marché)
- **Sous-détail détaillé** des postes à forte sensibilité (gros œuvre, CVC, électricité)
- Skill `metre_quantitatif` pour quantification précise depuis plans
- Skill `sous_detail_prix` pour décomposition fine des prix unitaires
- Skill `comparer_offres` une fois les offres reçues
- Skill `ratio_m2` pour benchmark global au m² SDP
- Skill `reviser_prix` pour anticiper la révision/actualisation contractuelle
- En cas de **dépassement budget** : recommandations d'**optimisation** (variantes, simplifications, phasing)
- Mise à jour de l'**estimation prévisionnelle** à chaque phase (ESQ → APS → APD → PRO → DCE → Offres)
- **Réunion de prix** avec MOA pour arbitrage en cas d'écart budget
- Pour les **avenants** ultérieurs : conservation du **dossier de chiffrage initial** comme base de comparaison
