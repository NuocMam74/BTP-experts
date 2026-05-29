# TVA immobilière — Marchand de biens et opérations spécifiques

**Source :** Code général des impôts (CGI) art. 257 et s. (TVA immobilière) ; CGI art. 268 (marge) ; CGI art. 279-0 bis (TVA 10 %) ; CGI art. 278-0 bis A (TVA 5,5 %) ; CCH (VEFA) ; BOI-TVA-IMM (BOFIP).

## Distinction TVA immobilière

### Trois régimes principaux

| Régime | Type d'opération | Taux |
|---|---|---|
| **TVA sur prix total** | Construction neuve VEFA | 20 % |
| **TVA sur marge** | Marchand de biens (revente après transformation) | 20 % sur marge |
| **TVA travaux** | Rénovation, amélioration | 5,5 / 10 / 20 % selon nature |

## TVA sur prix total — Construction neuve (CGI 257)

### Champ d'application

S'applique aux **livraisons d'immeubles neufs** :
- **Immeuble neuf** (terminé depuis ≤ 5 ans, jamais habité)
- **Construction** par un promoteur
- **VEFA** (Vente en l'État Futur d'Achèvement)
- **Livraison à soi-même** (autoconsommation)

### Notion d'« immeuble neuf »

L'immeuble est neuf si :
1. **Construction nouvelle**, ou
2. **Surélévation** créant volume habitable, ou
3. **Travaux** assimilés à du neuf (transformation > 2/3 du second œuvre ou > 1/2 du gros œuvre)

### Taux

- **20 %** par défaut
- **5,5 %** en zone **ANRU + PAS** (CGI 278 sexies)
- **10 %** en QPV (Quartier Prioritaire de la Ville) sous conditions

### Échéancier de paiement

Pour VEFA : suivant les **maxima** de l'art. R.261-14 CCH (cf. corpus dédié).

### Comptabilisation côté promoteur

```
3355 Stocks de produits terminés                _ €
    701 Vente d'immeubles                            _ €
    44572 TVA collectée                              _ €
```

Et pour le coût de revient :
```
335 Stocks de produits en cours                  _ €
    61 Sous-traitance                                _ €
    44566 TVA déductible                            _ €
```

## TVA sur marge — Marchand de biens (CGI 268)

### Champ d'application

Le **marchand de biens** :
- **Achète** des biens immobiliers (logements, terrains, immeubles)
- **Revend** dans l'**année suivant** l'acquisition (court terme)
- Sans avoir réalisé de **transformation profonde**

### Activité commerciale

- Inscription au **RCS** (Registre du Commerce et des Sociétés)
- Régime fiscal **BIC** (Bénéfices Industriels et Commerciaux)
- Code NAF 6810Z

### TVA sur marge (CGI 268)

#### Principe

```
TVA = 20 % × (Prix vente - Prix d'achat)
```

→ La TVA s'applique uniquement sur la **plus-value** réalisée, pas sur le prix total.

#### Conditions

- Le bien est revendu **dans un état comparable** à l'achat (pas de transformation majeure)
- Pas d'**option** pour la TVA sur prix total

#### Avantages

- **Réduction** de la TVA due (uniquement sur marge)
- Permet **viabilité économique** des opérations courtes (revente en l'état)

### Exemple — marchand de biens (revente à 6 mois)

- Achat immeuble : 800 000 € HT
- Frais de remise en état (peinture, plomberie) : 50 000 € HT
- Prix de revente : 1 050 000 € HT
- Marge brute : 1 050 000 - 800 000 - 50 000 = 200 000 €
- **TVA sur marge** : 200 000 × 20 % = 40 000 €
- Marge nette TTC : 200 000 - 40 000 = 160 000 € (avant frais)

→ Vs TVA sur prix total : 1 050 000 × 20 % = 210 000 € → écrasante.

### Comptabilisation marchand de biens

```
3355 Stocks d'immeubles                          _ €
    218 Acquisition immobilière                       _ €

Vente :
401 Banque                                        _ €
    707 Vente d'immeubles                              _ €
    44572 TVA collectée (sur marge)                    _ €
```

## VEFA — règles spécifiques

### Cadre légal (CCH L.261-1 et s.)

La **Vente en l'État Futur d'Achèvement** est encadrée :
- Contrat de vente signé en **2 étapes** : contrat préliminaire + acte authentique
- **Réservation** avec dépôt de garantie (max 5 %)
- **Échéancier** réglementé (art. R.261-14)
- **Garanties** : GFA (Garantie Financière d'Achèvement) obligatoire

### TVA et VEFA

- **TVA exigible** au fur et à mesure de l'avancement (à chaque échéance VEFA)
- **Facturation** avec mention « VEFA »
- **Taux** : 20 % (sauf ANRU)

### Comptabilisation acquéreur (acompte à 35 %)

Acompte 35 % d'un appartement à 350 000 € HT (TVA 20 %, total TTC = 420 000 €) :

Acompte de 35 % × 420 000 = 147 000 € TTC :
```
2382 Avances et acomptes versés sur immobilisations  122 500 € (HT)
44566 TVA déductible                                  24 500 €
    512 Banque                                         147 000 €
```

À la livraison, transfert des comptes 2382 → 213 (Immobilisations bâtiment).

## Livraison à soi-même (LASM)

### Champ

Lorsqu'un assujetti **construit** un immeuble pour son propre usage professionnel :
- **LASM** déclenchée à la **mise en service** de l'immeuble
- TVA **collectée** sur la valeur de l'immeuble
- TVA **déductible** sur les achats liés à la construction

### Conditions

- Immeuble destiné à **usage professionnel** ou **locatif TVA**
- Pas pour usage personnel (autre régime)

### Comptabilisation LASM

```
213 Bâtiments                                   _ €
44566 TVA déductible (acquisitions)            _ €
    228 Production en cours - immeubles               _ €
    44572 TVA collectée                              _ €
```

→ Effet **neutre** en trésorerie mais déclaratif obligatoire.

## Options TVA

### Option pour la TVA sur opérations exonérées

Certaines opérations immobilières sont **exonérées de TVA** (CGI 261) :
- **Locations nues à usage d'habitation**
- **Ventes d'immeubles anciens** (achevés depuis > 5 ans, déjà habités)

Mais l'**option** pour la TVA est possible (CGI 260) :
- Permet de **récupérer** la TVA sur les charges (acquisition, travaux)
- Soumise à conditions strictes
- Engagement de **conserver** l'immeuble 20 ans

### Exemple — option utile pour bailleur tertiaire

- Achat immeuble bureau : 1 000 000 € HT + 200 000 € TVA
- Loyers annuels HT : 80 000 €
- Sans option : TVA non récupérée + loyer exonéré = perte 200 k€
- Avec option : TVA récupérée + loyer + 20 % TVA collectée (à la charge des locataires)

## Cas du terrain à bâtir

### TVA terrain à bâtir (CGI 257 I 2°)

- **Terrain à bâtir** = terrain équipé en VRD, susceptible de recevoir construction
- **TVA 20 %** sur le prix total (régime de l'immobilier neuf)
- Sauf si terrain acquis **sans TVA** par marchand de biens → TVA sur marge

### Distinction terrain bâti / non bâti

- **Terrain bâti** vendu avec construction ancienne → exonéré (option TVA possible)
- **Terrain non bâti** : assujetti TVA si destiné à bâtir + équipé en VRD

## Régularisation TVA immobilière

### Cession ou changement d'affectation (CGI 207)

Si un immeuble assujetti TVA est :
- **Cédé** avant 20 ans : régularisation de la TVA déduite
- **Affecté à un usage non assujetti** : idem

```
Régularisation = TVA initiale × (20 - années écoulées) / 20
```

#### Exemple

- TVA déduite à l'acquisition : 100 000 €
- Cession après 7 ans
- Régularisation = 100 000 × (20 - 7) / 20 = **65 000 €** à reverser

## Synthèse — choix du régime

### Arbres de décision

#### Question 1 : Immeuble neuf ?

- ✅ Oui → **TVA prix total 20 %** (sauf ANRU à 5,5 % ou QPV à 10 %)
- ❌ Non → Question 2

#### Question 2 : Marchand de biens (revente rapide en l'état) ?

- ✅ Oui → **TVA sur marge 20 %**
- ❌ Non → Question 3

#### Question 3 : Travaux dans immeuble > 2 ans ?

- ✅ Oui → **TVA travaux** (5,5 % énergétique, 10 % amélioration, 20 % gros œuvre)
- ❌ Non → Question 4

#### Question 4 : Vente d'immeuble ancien (achevé > 5 ans, habité) ?

- ✅ Oui → **Exonération** par défaut (option TVA possible)
- ❌ Non → Cas particulier (analyse spécifique)

## Sanctions TVA immobilière

### Manquements typiques

| Manquement | Sanction |
|---|---|
| Application 5,5 % à tort sur immeuble neuf | Régularisation + intérêts retard 0,4 %/mois + majoration 5-40 % |
| Pas d'option TVA déclarée | Perte du droit à déduction |
| Sortie d'option avant 20 ans | Régularisation TVA déduite proportionnelle |
| LASM non déclarée | Pénalité de 5 % (CGI 1788 A) |
| Marchand de biens — TVA prix total au lieu de marge | Excès de TVA versée, demande de remboursement complexe |

### Prescription

- **Prescription DGFiP** : 3 ans (LPF L.169)
- Allongée à 10 ans en cas de fraude

## Cas pratiques fréquents

### 1. Vente d'un immeuble VEFA réceptionné

- TVA collectée à chaque étape avancement (35 %, 70 %, 95 %, 100 %)
- Restitution au moment de l'acte authentique de la TVA déduite par l'acquéreur si LASM

### 2. Revente d'un immeuble par un particulier

- **Pas de TVA** (particulier non assujetti)
- Seuls **frais de notaire** (≈ 8 % bâti ancien, 3 % nu)

### 3. Marchand de biens revend après 1 an et 1 mois

- Sortie du régime marchand de biens
- TVA sur prix total possiblement applicable (à analyser au cas par cas)

### 4. Cession d'un terrain agricole pour construction

- Assujettissement TVA si terrain à bâtir (équipé)
- Marge si acquis sans TVA

## Synthèse — bonnes pratiques expert-comptable

1. **Identifier** le régime TVA dès l'origine de l'opération.
2. **Vérifier** les options TVA (à exercer dans les délais).
3. **Comptabilisation** rigoureuse selon le régime (prix total, marge, LASM).
4. **Échéancier VEFA** : TVA exigible à chaque appel.
5. **Régularisation** suivie pour immeubles cédés ou affectation modifiée (CGI 207).
6. **Documentation** : conserver actes notariés, devis, factures (10 ans).
7. **Veille fiscale** : taux et conditions évoluent (lois de finances annuelles).
8. **Conseil** au client sur l'opportunité du régime selon la stratégie (option, marchand de biens, LASM).

## Citations à utiliser

- CGI art. 257 (TVA immobilière)
- CGI art. 268 (TVA sur marge — marchand de biens)
- CGI art. 278-0 bis A (5,5 %) et 279-0 bis (10 %)
- CGI art. 278 sexies (ANRU à 5,5 %)
- CGI art. 260 (option TVA), 261 (exonérations)
- CGI art. 207 (régularisation)
- CCH art. L.261-1 et s. (VEFA)
- CCH art. R.261-14 (échéancier VEFA)
- BOI-TVA-IMM (doctrine BOFIP)

**Référence à citer :** CGI art. 257 et s. + BOFIP TVA-IMM. Sources : Legifrance + BOFIP-impots.gouv.fr.
