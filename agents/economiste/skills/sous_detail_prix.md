# Skill — Sous-détail de prix

L'utilisateur veut décomposer un prix unitaire (PU) en ses composantes selon la méthodologie UNTEC.

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **CCTP** décrivant l'ouvrage à chiffrer
- **DPGF** vide ou renseignée à analyser
- **Plans** cotés pour caler la quantité
- **Bordereau de l'entreprise** (devis détaillé)
- **Sous-détail existant** à contrôler

Si aucun document : pose ces questions :
1. Quel ouvrage élémentaire (ex : m² de voile béton banché ép. 20 cm) ?
2. Unité de mesurage et quantité du marché ?
3. Région du chantier (impact MO et frais) ?
4. Phase (APS, APD, PRO, OFFRE) ?
5. Source du déboursé sec à utiliser : Batiprix, sous-détail propre, retour marché ?

## 2. Extraction des informations clés

Quand un sous-détail est dans le contexte, EXTRAIS :

| Information | Où chercher | Si absente |
|---|---|---|
| Désignation ouvrage | Tête du sous-détail | Inventer placeholder |
| Unité de mesurage | Tête du sous-détail | Cf. corpus unités par lot |
| Quantité | Cadre quantitatif | Demander |
| Temps unitaire MO | Ligne MO | Bordereau Batiprix ou retour marché |
| Taux horaire MO | Ligne MO | Selon convention collective et région |
| Coût MAT (matériau principal) | Ligne MAT | Devis fournisseur récent |
| Coût MAT' (matériel) | Ligne matériel | Location ou amortissement |
| TR (transports/manutention) | Ligne TR | Si pas chiffré : 2-5 % du déboursé |
| FC (frais de chantier) | Note ou ligne | Voir % entreprise |
| FG (frais généraux) | Note ou ligne | 8-18 % selon taille entreprise |
| BA (bénéfices + aléas) | Note ou ligne | 4-10 % |

## 3. Vérifications normatives (`rag_search` obligatoire)

- `rag_search("méthodologie UNTEC sous-détail de prix")` — pour la structure
- `rag_search("temps unitaire main d'œuvre [ouvrage]")` — si TU à fixer
- `rag_search("convention collective bâtiment taux horaire")` — pour caler MO chargée

## 4. Procédure d'analyse

### A) Construire un sous-détail (cas "j'ai un CCTP, donne-moi un PU")

1. **Identifier l'ouvrage élémentaire** précisément (unité, performance, sujétions)
2. **Choisir la source** du déboursé sec :
   - Sous-détail propre depuis temps unitaires (TU) et matériaux
   - Bordereau Batiprix édition N (préciser le millésime)
   - Retour marché récent (chantier comparable)
3. **Décomposer le déboursé sec (D)** :
   - **MO** = TU × taux horaire chargé (€/h)
   - **MAT** = quantité matériau × prix fournisseur (€/u)
   - **MAT'** (matériel) = location ou amortissement
   - **TR** = transport et manutention
4. **Appliquer les marges** :
   - **Frais de chantier (FC)** : 8-18 % du D
   - **Frais généraux (FG)** : 8-18 % du (D + FC)
   - **Bénéfices et aléas (BA)** : 4-10 % du (D + FC + FG)
5. **Calculer le PU HT** = D × (1 + FC%) × (1 + FG%) × (1 + BA%) (convention 1)
6. **Indiquer le PU TVA** = PU HT × (1 + taux TVA applicable)

### B) Contrôler un sous-détail existant

1. **Vérifier la cohérence** :
   - TU MO réaliste pour l'ouvrage et le contexte
   - Prix matériau cohérent avec marché récent
   - % FC / FG / BA dans les plages usuelles
2. **Détecter les anomalies** :
   - Prix anormalement bas (offre suspecte / sous-traitance dissimulée)
   - Prix anormalement haut (sur-évaluation pour gonfler la base de révision)
3. **Comparer à un bordereau** : écart > 20 % à Batiprix = anomalie à investiguer

## 5. Restitution structurée

```
## Sous-détail de prix — [Désignation ouvrage]

### Identification
- **Ouvrage** : [...]
- **Unité** : [m² / m³ / ml / U]
- **Quantité marché** : [...]
- **Source** : [Sous-détail propre / Batiprix 2024 / Retour marché chantier X]
- **Région** : [...]
- **Mois de référence (M0)** : [MM/AAAA]

### Déboursé sec (D) — détail

| Composante | Quantité | Prix unitaire | Total |
|---|---|---|---|
| **MO** : main d'œuvre productive | [TU h/u] × [qté] | [€/h chargé] | [€] |
| **MAT** : matériaux fournitures | [qté matière/u] × [qté] | [€/u matière] | [€] |
| **MAT'** : matériel et outillage | — | — | [€] |
| **TR** : transports, manutentions | — | — | [€] |
| **SC** : sous-traitance éventuelle | — | — | [€] |
| **TOTAL déboursé sec D** | | | **[€]** |

### Composition du PU HT

| Niveau | Pourcentage | Montant | Cumul |
|---|---|---|---|
| Déboursé sec D | — | [€] | [€] |
| + Frais de chantier (FC) | [%] | [€] | [€] |
| + Frais généraux (FG) | [%] | [€] | [€] |
| + Bénéfices et aléas (BA) | [%] | [€] | [€] |
| **PU HT** | | | **[€ / unité]** |
| + TVA [taux %] | | [€] | [€] |
| **PU TTC** | | | **[€ / unité]** |

### Prix total marché
- **PU HT** × **quantité** = **[€ HT]**

### Niveau de confiance
- [Élevé] : sources Batiprix édition récente + TU validés
- [À valider] : matériau à confirmer auprès du fournisseur local
- [À confirmer par calcul] : ouvrages spécifiques

### Hypothèses prises
- [MO chargée à X €/h selon convention collective Bâtiment ouvriers Île-de-France]
- [Région : facteur 1.05 sur la MO]
- [Pas de sujétion ABF / amiante / plomb / héberg. occupant]
- [Hauteur sous plafond standard 2,50 m]
```

## 6. Garde-fous spécifiques

- Tu **ne donnes pas** un PU sans **source explicite** et **mois de référence**.
- Tu **n'inventes pas** un TU MO — utilise un bordereau ou recommande à l'utilisateur de fournir un TU validé par son entreprise.
- Tu **rappelles** que le mois M0 est crucial pour les marchés à prix révisable (CCAG art. 10) — tout sous-détail vaut au mois M0 cité.
- Pour des **ouvrages très spécifiques** (sous-œuvre, ABF, intervention en site occupé) : majorer le BA à 10-15 % pour couvrir l'incertitude.
- Tu **n'arbitres pas** entre 2 bordereaux contradictoires sans le signaler — tu prends en compte l'écart et propose une fourchette.

## 7. Suites logiques à proposer

- **Recoupement avec retour marché** (chantier comparable) si écart > 15 % à Batiprix
- **Comparaison d'offres entreprises** sur le poste — utiliser le skill `comparer_offres`
- **Mise à jour annuelle** des sous-détails internes au cabinet (effet inflation + révisions BT)
- **Sous-détail défensif** en phase OFFRE pour anticiper les négociations
