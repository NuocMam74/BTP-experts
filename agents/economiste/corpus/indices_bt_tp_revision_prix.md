# Indices BT/TP — Révision et actualisation des prix

**Source :** INSEE — indices nationaux du bâtiment (BT) et des travaux publics (TP) ; Code de la commande publique L.2412-7, R.2112-13 ; CCAG-Travaux 2021 art. 10 ; arrêté 22 sept. 2014 (formule type marchés publics).

## Cadre légal

- **Actualisation** : ajustement du prix pour tenir compte du décalage entre la date d'offre et la date de démarrage. Marché public : obligatoire si > 3 mois entre offre et OS démarrage (art. R.2112-13 CCP).
- **Révision** : ajustement périodique du prix en cours d'exécution pour suivre l'évolution des coûts. Doit être prévue par le marché (CCAG-Travaux art. 10.4).

## Index BT — bâtiment

Indices nationaux publiés mensuellement par l'**INSEE** (base 2010 = 100, sauf rebasage).

### Principaux index BT par lot

| Index | Lot couvert |
|---|---|
| **BT01** | Tous corps d'état — index synthétique de référence |
| **BT02** | Plomberie sanitaire |
| **BT03** | Couverture en grandes feuilles et zinc |
| **BT06** | Ossature en acier |
| **BT07** | Ossatures et charpentes en bois |
| **BT08** | Plâtre et préfabriqués |
| **BT09** | Carrelage et revêtements céramiques |
| **BT10** | Couverture en tuiles de béton |
| **BT16** | Étanchéité |
| **BT18a** | Menuiserie acier et serrurerie |
| **BT19b** | Menuiserie en PVC |
| **BT26** | Couverture en ardoises |
| **BT34** | Électricité |
| **BT38** | Isolation par l'intérieur, plaques de plâtre |
| **BT40** | Maçonnerie et béton armé courants |
| **BT41** | Maçonnerie murs ext. en pierre |
| **BT45** | Vitrerie miroiterie |
| **BT46** | Peinture, papiers peints, tentures |
| **BT47** | Revêtements souples |
| **BT48** | Plomberie sanitaire (synonyme BT02 ancien) |
| **BT49** | Couverture en tuiles de terre cuite |
| **BT50** | Rénovation - entretien tous corps d'état |
| **BT53** | Ascenseurs |

### Indices spécifiques

- **TRBT** : taux horaires des salaires dans le bâtiment (publié trimestriellement)
- **IPHE** : indices des prix horaires des entreprises

## Index TP — Travaux publics

Indices nationaux INSEE pour les marchés de travaux publics.

| Index | Lot couvert |
|---|---|
| **TP01** | Index général tous travaux |
| **TP02** | Travaux d'aménagement et entretien de voirie |
| **TP03** | Terrassements généraux |
| **TP04** | Routes |
| **TP08** | Travaux d'éclairage public |
| **TP09** | Fabrication et mise en œuvre d'enrobés |
| **TP10a** | Canalisations, égouts, assainissement |
| **TP12c** | Ouvrages d'art en béton |
| **TP13** | Fonçage, micro-tunnelier |

## Formules de révision — principes

### Forme générale

```
P = P₀ × (a + b × I_n/I₀ + c × J_n/J₀ + …)
```

avec :
- **P** : prix révisé
- **P₀** : prix initial du marché (HT)
- **a** : part fixe (généralement **0,125** en marché public, soit 12,5 %)
- **b, c, …** : pondérations des index (somme b+c+… = 1 - a)
- **I_n** : valeur de l'index à la date de référence d'exécution (mois d'exécution - 3)
- **I₀** : valeur de l'index à la date de référence d'offre (mois m₀)

### Date de référence des index

- **Marché public** (CCAG-Travaux art. 10.4.2) : par défaut, valeur de l'index au **mois M0** (mois d'établissement du prix, c'est-à-dire mois de remise de l'offre) et au **mois M-3** (mois d'exécution des travaux moins 3 mois) — ce décalage tient compte du délai entre publication INSEE et exécution.
- **Marché privé** (NF P 03-001 art. 17) : règle similaire, références précisées au CCAP.

### Exemple — formule mono-index

Marché de gros œuvre, prix initial 1 000 000 € HT.
- Formule : `P = P₀ × (0,125 + 0,875 × BT40_n / BT40_0)`
- BT40_0 (mois M0 = avril 2024) = 132,5
- Travaux exécutés en septembre 2024 → BT40_n (juin 2024) = 134,8
- Coefficient = 0,125 + 0,875 × 134,8/132,5 = 0,125 + 0,875 × 1,01736 = 0,125 + 0,890 = **1,01519**
- Prix révisé = 1 000 000 × 1,01519 = **1 015 190 € HT** (+15 190 € soit +1,52 %)

### Exemple — formule multi-index (TCE)

Lot tous corps d'état, prix initial 500 000 € HT.
- Formule : `P = P₀ × (0,125 + 0,3 × BT01/BT01₀ + 0,2 × BT40/BT40₀ + 0,15 × BT34/BT34₀ + 0,225 × TRBT/TRBT₀)`
- Calcul pondéré à chaque période d'exécution.

## Pondération typique par lot

| Lot | Index conseillés |
|---|---|
| Gros œuvre béton armé | BT40 + TRBT |
| Charpente bois | BT07 + TRBT |
| Couverture tuiles | BT49 ou BT10 + TRBT |
| Étanchéité | BT16 + TRBT |
| Menuiseries extérieures PVC | BT19b + TRBT |
| Cloisons / doublages | BT38 + TRBT |
| Électricité | BT34 + TRBT |
| Plomberie/CVC | BT02 (ou BT48) + TRBT |
| Peinture | BT46 + TRBT |
| Carrelage | BT09 + TRBT |

## Actualisation (différent de la révision)

L'**actualisation** s'applique **une fois** au démarrage si > 3 mois entre offre et OS de démarrage. Formule type :
```
P_actualisé = P₀ × I_(OS-3) / I_M0
```
- Pas de terme fixe `a`.
- L'index pris en compte est celui défini au CCAP (par défaut, index principal du marché — souvent BT01 ou TP01).

## Publication des indices

- Publication **mensuelle** par l'INSEE.
- **Lien** : insee.fr → Indices et séries chronologiques.
- **Délai de publication** : environ 2 mois après le mois de référence (l'indice d'octobre est publié en décembre).

## Indices remplacés / arrêts de publication

Suite à modernisation, certains anciens indices ont été supprimés ou remplacés :
- Anciens index **PM, PMC, PSE…** : supprimés
- Anciens **B0, B1** (banlieue Paris) : supprimés
- **TPHC** (terrassements - prix horaires) : encore utilisé pour certains marchés TP
- **TRPC** : supprimé en 2014, remplacé par références aux conventions collectives

## Cas pratiques fréquents

### 1. Index indisponible à la date de calcul

- Si l'index n'a pas encore été publié pour le mois d'exécution, utiliser la **dernière valeur connue** + **régularisation** lors du paiement suivant.
- CCAG-Travaux art. 10.4.4 : utilisation du dernier indice publié, puis ajustement.

### 2. Index abandonné (rebasage)

- Mise en place d'un **coefficient de raccordement** publié par l'INSEE.
- L'indice rebasé est appliqué après transformation : `I_n / I₀ = I_n_nouvelle_base × K_raccordement / I₀_ancienne_base`.

### 3. Acompte non révisé

- Les **avances** ne sont pas révisées.
- Le solde est révisé en tenant compte du dernier acompte payé.

### 4. Marché à prix forfaitaires (pas de DPGF)

- Application de la formule globale sur le forfait.

### 5. Lot avec sous-formules par phase

- Décomposition possible pour les marchés longue durée (>18 mois) avec des phases distinctes (terrassement, GO, second œuvre).

## Points de vigilance

- **Marchés à prix ferme** (non révisables) : possibles en marché public uniquement si l'exécution est courte. Risque pour l'entreprise en période d'inflation.
- **Plafond de révision** : certains CCAP plafonnent la révision (clause à vérifier).
- **Tier-CE inflation** (loi 2022-1158 du 16 août 2022) : amendements possibles pour absorber l'inflation exceptionnelle 2022-2023 (avenant ou clause de réexamen).
- **Marchés publics > 4 ans** : clause de réexamen obligatoire (R.2112-13 CCP).

## Méthode de calcul d'une révision (synthèse)

1. **Identifier la formule** du CCAP (article spécifique).
2. **Récupérer les valeurs INSEE** des index à M0 (offre) et M_n (exécution).
3. **Appliquer la pondération**.
4. **Calculer le coefficient de révision**.
5. **Appliquer au montant** de la situation (HT, hors retenue de garantie).
6. **Vérifier la cohérence** : variation > ±10 % → drapeau rouge (vérifier la formule).
7. **Documenter** : citer les valeurs INSEE utilisées (mois + valeur) pour traçabilité.

## Citations à utiliser

- INSEE — séries indices BT et TP
- Code de la commande publique R.2112-13 et s. (révision)
- CCAG-Travaux 2021 art. 10 (clauses de variation des prix)
- NF P 03-001 art. 17 (marché privé)
- Arrêté 22 sept. 2014 (formule type marché public)
- Loi 2022-1158 du 16 août 2022 (mesures inflation)

**Référence à citer :** Indices INSEE BT/TP publiés mensuellement, CCAG-Travaux 2021 art. 10, CCP R.2112-13. Sources : insee.fr et Legifrance.
