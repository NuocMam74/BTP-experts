# DPGF et CCTP — Structure, lecture et bonnes pratiques

**Source :** Pratiques UNTEC (Union Nationale des Économistes de la Construction) ; CCAG-Travaux 2021 art. 9 ; NF P 03-001 art. 6 ; CCP art. R.2112-1 et s.

## Pièces écrites du DCE — vocabulaire

| Sigle | Pièce | Fonction |
|---|---|---|
| **CCAP** | Cahier des Clauses Administratives Particulières | Clauses administratives propres au marché (délais, pénalités, paiement, garanties, retenue de garantie, révision…) |
| **CCAG** | Cahier des Clauses Administratives Générales | Clauses générales (Travaux 2021, FCS, PI, MOE…) — non publié par le pouvoir adjudicateur, référé |
| **CCTP** | Cahier des Clauses Techniques Particulières | Prescriptions techniques par lot — la spécification |
| **CCTG** | Cahier des Clauses Techniques Générales (rares) | Spécifications techniques génériques (DTU, fascicules) |
| **DPGF** | Décomposition du Prix Global et Forfaitaire | Quantitatif chiffré entreprise (prix forfaitaire) |
| **DQE** | Détail Quantitatif Estimatif | Quantitatif type marché à prix unitaires (BP × Quantité) |
| **BPU** | Bordereau des Prix Unitaires | Liste de prix unitaires forfaitaires |
| **DPGF / DQE** | Pièce à chiffrer | Document support de l'offre |
| **AE** | Acte d'Engagement | Engagement contractuel du candidat |
| **RC** | Règlement de Consultation | Procédure de la consultation |
| **MAPA / AOO / AOR** | Procédures de passation | Marché à procédure adaptée / Appel d'offres ouvert / restreint |

## DPGF — structure et codification

Le DPGF organise le chiffrage en arborescence à 3-4 niveaux :

```
1. LOT (ex : Gros œuvre)
  1.1 OUVRAGE (ex : Fondations)
    1.1.1 SOUS-OUVRAGE (ex : Semelles filantes)
      1.1.1.1 ARTICLE / POSTE (ex : Semelle 60 × 30 cm BA C25/30)
```

### Colonnes types d'une ligne de DPGF

| Col | Libellé | Contenu |
|---|---|---|
| A | N° article | 1.1.1.1 |
| B | Désignation | Description technique conforme CCTP |
| C | Unité | ml / m² / m³ / U / forfait |
| D | Quantité | Issue du métré entreprise |
| E | Prix unitaire HT | À chiffrer |
| F | Prix total HT | C × D × E (formule) |

### Bonnes pratiques DPGF

- **Ne pas modifier les libellés** fournis dans le DPGF de consultation (sauf chapitres « variantes »).
- **Ne pas ajouter de lignes** dans le DPGF imposé (sauf option / variante autorisée).
- **Vérifier les quantités** (métré entreprise) et les **questionner** par voie de DCE (avant remise de l'offre) si écart.
- **Décomposer le forfait** : oubli d'un poste = perte sèche.

## CCTP — structure type d'un lot

### Architecture commune

```
0. Généralités
   - Objet du lot
   - Documents de référence (DTU, NF, FDES…)
   - Limites de prestation
   - Définitions
   - Coordination avec les autres lots

1. Description des ouvrages
   1.1 Type d'ouvrage (ex : maçonnerie en élévation)
       - Matériaux (référence + caractéristiques techniques)
       - Mise en œuvre (DTU applicable, prescriptions particulières)
       - Réservations, scellements, finitions
       - Essais et contrôles
       - Contraintes spécifiques (acoustique, thermique, sécurité)

2. Spécifications particulières (climat, géotechnique, sismique…)
3. Liste des ouvrages à chiffrer (renvoi au DPGF)
4. Annexes (plans, calculs, BPU, fiches matériau)
```

### Indicateurs de qualité d'un CCTP

- Précision des **références normatives** (DTU 13.1 + DTU 13.2 par exemple).
- Clarté des **caractéristiques minimales** (classes, résistances, performances thermiques R en m²·K/W, acoustiques Rw en dB).
- **Limites de prestation** explicites (qui fait quoi entre lots GO/Plomberie/Electricité).
- Critères de **réception** et essais (échantillon, agrément, PV usine).

### Drapeaux rouges CCTP (à signaler à la MOA / MOE)

- **« ou équivalent »** absent après désignation de marque (entorse code commande publique).
- **Renvoi à plan « à fournir ultérieurement »** : oblige le chiffrage sur hypothèse — préciser réserves.
- **Absence de classification incendie** des matériaux (Euroclasses).
- **Pas de mention DTU** : le candidat doit présumer les bonnes pratiques.
- **CCTP générique « copie-coller »** sans adaptation au projet.
- **Variantes interdites** + plages d'ambiguïté → risque de réclamations en exécution.

## Distinction prix global et forfaitaire vs. prix unitaires

### Marché à prix global et forfaitaire (« P.G.F. »)

- Le titulaire s'engage sur un **prix total** pour la totalité des ouvrages décrits.
- Tout oubli reste à sa charge sauf modification du marché.
- DPGF = support de chiffrage mais n'est pas contractuel pièce à pièce (sauf clause inverse).
- Variations admises uniquement sur OS de modification (CCAG-Travaux 12, NF P 03-001 22.1.3).

### Marché à prix unitaires (« BP × Q »)

- Le titulaire s'engage sur un **bordereau de prix unitaires** (BPU).
- Les quantités effectivement réalisées sont attachées au PU pour calcul de la situation.
- Risque pour le MO : **dérapage** des quantités (à maîtriser par OPC + relevés contradictoires).
- DQE prévisionnel sert à comparer les offres mais n'est pas exact.

### Marché mixte

- Lot gros œuvre forfaitaire + lots terrassement / VRD à prix unitaires (BP × Q).
- Fréquent quand le sol est incertain.

## Composition d'un Prix Unitaire (méthode UNTEC)

```
PU = DS + FC + FG + BA
```
- **DS** : Déboursé Sec — matière + main d'œuvre + matériel d'exécution
- **FC** : Frais de Chantier — installations, gardiennage, base vie, échafaudages, sécurité collective
- **FG** : Frais Généraux d'entreprise — direction, comptabilité, assurances, formation
- **BA** : Bénéfice et Aléas — marge entreprise + aléas

Pondération courante :
- FC : 8 à 12 % du DS
- FG : 7 à 14 % du DS+FC (selon taille entreprise)
- BA : 5 à 10 % du DS+FC+FG

### Exemple — semelle BA

- Béton C25/30 : 0,18 m³/ml × 145 €/m³ = 26,10 €/ml
- Acier HA 8 : 18 kg/ml × 1,15 €/kg = 20,70 €/ml
- Coffrage perdu : 6 €/ml
- Main d'œuvre : 0,25 h × 38 €/h = 9,50 €/ml
- DS = 62,30 €/ml
- FC (10 %) = 6,23 €
- DS+FC = 68,53 €
- FG (10 %) = 6,85 €
- DS+FC+FG = 75,38 €
- BA (7 %) = 5,28 €
- **PU = 80,66 €/ml** (HT)

## Étapes d'élaboration d'un DPGF (économiste MOE)

1. **Lecture du programme** + plans APD/PRO.
2. **Découpage en lots** (cohérence corps d'état du marché).
3. **Métré quantitatif** par ouvrage, à partir des plans cotés.
4. **Codification** des postes (norme interne ou Bibliothèque PRIMUS / EDIBatec).
5. **Saisie du DPGF** (Excel ou logiciel métré : Attic+, Primus, Devisoc, BatiPrix).
6. **Élaboration du DQE estimatif** (PU de référence × Q).
7. **Présentation au MOA** pour validation budgétaire.

## Méthode d'analyse des offres (économiste côté MOE en ACT)

1. **Vérification de conformité** :
   - DPGF complet, sans modification non autorisée
   - Variantes éligibles seulement si prévues
   - Pièces administratives (DC1, DC2, attestations sociales et fiscales, RC pro, décennale)

2. **Vérification arithmétique** :
   - Recalcul de chaque ligne (Q × PU)
   - Vérification des totaux par lot
   - Correction des erreurs matérielles (préciser les rectifications dans le PV)

3. **Analyse comparative** :
   - Tableau comparatif par poste — repérer **prix anormalement bas** (PAB) ou hauts (PAH)
   - Demande de **justification** des PAB (CCP art. L.2152-5)
   - Écart > 30 % par rapport au DQE estimatif → questionner

4. **Analyse technique** :
   - Conformité au CCTP
   - Mémoires techniques (méthodologie, planning, références)
   - Notation pondérée selon RC (souvent prix 60 % + technique 40 %)

5. **Rapport d'analyse** :
   - PV ACT motivé
   - Classement des offres
   - Recommandation au MOA

## Citations à utiliser

- Code de la commande publique art. R.2112-1 et s. (pièces du marché)
- CCAG-Travaux 2021 art. 9 (consistance des travaux), 10 (prix), 12 (modifications), 13 (acomptes/situations)
- NF P 03-001 art. 6, 17, 19 (marché privé)
- UNTEC — Recommandations professionnelles (méthode sous-détail)
- Bibliothèques de prix : BatiPrix (Le Moniteur), Bordereau ANNUEL des prix UNTEC

**Référence à citer :** CCAG-Travaux 2021, NF P 03-001, méthodologie UNTEC. Sources : Legifrance + UNTEC + AFNOR.
