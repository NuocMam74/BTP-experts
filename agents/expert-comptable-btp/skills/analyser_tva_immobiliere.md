# Skill — Analyser la TVA immobilière (marchand de biens, VEFA, LASM)

L'utilisateur te transmet une opération immobilière (vente, acquisition, transformation) — tu dois analyser le régime TVA applicable et calculer la TVA due.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Nature de l'opération** : vente, acquisition, transformation, livraison à soi-même
- **Type d'immeuble** : terrain à bâtir, neuf, ancien, mixte
- **Vendeur** : particulier, promoteur, marchand de biens, entreprise
- **Acquéreur** : particulier, professionnel
- **Date d'achèvement** de l'immeuble si applicable
- **Travaux** réalisés (si rénovation/transformation)
- **Localisation** : zone ANRU, QPV, secteur libre

### 2. Identifier le régime applicable

#### Arbre de décision

```
Q1 : Immeuble neuf (achevé ≤ 5 ans + jamais habité) ?
├── OUI → TVA prix total 20 % (sauf ANRU à 5,5 %, QPV à 10 %)
└── NON → Q2

Q2 : Travaux assimilés à du neuf (transformation > 2/3 second œuvre ou > 1/2 gros œuvre) ?
├── OUI → Immeuble neuf → Q1 OUI
└── NON → Q3

Q3 : Marchand de biens (revente rapide en l'état) ?
├── OUI → TVA sur marge 20 % (CGI 268)
└── NON → Q4

Q4 : Travaux dans immeuble > 2 ans ?
├── OUI → TVA travaux (5,5/10/20 % selon nature)
└── NON → Q5

Q5 : Vente d'immeuble ancien (> 5 ans, déjà habité) ?
├── OUI → Exonération TVA (option possible)
└── NON → Analyse spécifique
```

### 3. Cas 1 — Immeuble neuf (CGI 257)

#### Conditions

- Construction nouvelle, ou
- Surélévation créant volume habitable, ou
- Travaux assimilés à du neuf (> 2/3 second œuvre ou > 1/2 gros œuvre)

#### TVA applicable

- **20 %** par défaut
- **5,5 %** en zone ANRU + PAS (CGI 278 sexies)
- **10 %** en QPV sous conditions

#### Application VEFA

- TVA **exigible** à chaque échéance VEFA
- Mention « VEFA » sur factures
- Échéancier maximum (R.261-14 CCH) : 5 % réservation, 35 % fondations, 70 % HD, 95 % achèvement, 100 % livraison

### 4. Cas 2 — Marchand de biens (CGI 268)

#### Conditions

- Activité commerciale (RCS, NAF 6810Z)
- Achat puis revente dans **l'année** suivante
- **Sans** transformation profonde
- Pas d'option pour la TVA sur prix total

#### Calcul TVA sur marge

```
TVA = 20 % × (Prix vente - Prix d'achat)
```

#### Exemple

- Achat immeuble : 800 000 € HT
- Frais de remise en état : 50 000 € HT
- Revente : 1 050 000 € HT
- Marge : 1 050 000 - 800 000 - 50 000 = 200 000 €
- **TVA sur marge** : 200 000 × 20 % = 40 000 €

→ Comparé à TVA prix total (210 000 €) : économie de **170 000 €**.

### 5. Cas 3 — Travaux dans immeuble > 2 ans

#### TVA 5,5 % (CGI 278-0 bis A)

Travaux d'amélioration de la qualité énergétique :
- Isolation thermique avec R minimum :
  - Combles perdus : R ≥ 7
  - Murs façade : R ≥ 3,7
  - Plancher bas : R ≥ 3
- Fenêtres : Uw ≤ 1,3 W/m²K + Sw ≥ 0,30
- Chauffage performant (chaudière condensation, PAC, biomasse)
- ECS (solaire, thermodynamique, biomasse)
- VMC double flux

#### TVA 10 % (CGI 279-0 bis)

- Travaux d'amélioration / transformation / aménagement / entretien
- Pas d'extension > 9 m²
- Pas de rénovation lourde (> 2/3 second œuvre ou > 1/2 gros œuvre)

#### TVA 20 %

- Construction neuve
- Extension > 9 m²
- Rénovation lourde
- Travaux d'agrément (piscine, sauna, jacuzzi extérieur)

### 6. Cas 4 — Vente immeuble ancien

#### Exonération par défaut

- Immeuble achevé depuis > 5 ans + déjà habité
- **Pas de TVA** à la vente
- Frais de notaire ~ 8 % (bâti existant)

#### Option TVA (CGI 260)

Possible pour :
- Bailleurs professionnels (récupérer TVA acquisition)
- Conditions strictes
- Engagement **20 ans**

### 7. Cas 5 — Livraison à soi-même (LASM)

#### Champ

- Assujetti construit un immeuble pour son usage professionnel
- LASM **déclenchée** à la mise en service
- TVA collectée sur valeur immeuble
- TVA déductible sur achats liés

### 8. Cas particuliers à examiner

#### Surélévation

- Crée un volume habitable > 9 m² → régime neuf → 20 %
- Modeste (≤ 9 m² SDP) → TVA 10 %

#### Acquisition terrain à bâtir

- **20 %** sur prix total si vendeur assujetti et terrain équipé
- **TVA sur marge** si terrain acquis sans TVA + marchand de biens

#### Rénovation lourde mais < 2/3 second œuvre

- TVA 10 % si autres conditions OK
- TVA 20 % si dépasse seuils

#### Mixte logement + commerce

- Répartition au prorata des surfaces

### 9. Documentation à demander

| Document | Pour |
|---|---|
| Acte notarié d'acquisition | Date achèvement, prix, régime TVA |
| Permis de construire | Date PC, nature des travaux |
| Devis et factures travaux | Nature précise (énergétique ou non) |
| Attestation 1300/1301 client | Pour TVA réduite 5,5/10 % |
| Plans avant/après | Mesurer % de second œuvre rénové |
| Contrat VEFA | Pour échéancier paiement |

### 10. Calculer la TVA et les régularisations

#### Cession ou changement d'affectation (CGI 207)

Si immeuble assujetti TVA est cédé avant 20 ans ou affecté à usage non assujetti :

```
Régularisation = TVA initiale × (20 - années écoulées) / 20
```

#### Exemple

- TVA déduite à l'acquisition : 100 000 €
- Cession après 7 ans
- Régularisation = 100 000 × (20 - 7) / 20 = **65 000 € à reverser**

### 11. Comptabilisation

#### Vente immeuble neuf

```
411 Clients                                _ €
    701 Vente d'immeubles                       _ €
    44572 TVA collectée                         _ €
```

#### Achat immeuble (marchand de biens, sur marge)

```
3355 Stocks d'immeubles                  _ €
    401 Fournisseurs / 218 Acquisition         _ €
```

À la revente, la TVA est calculée sur la marge uniquement.

#### LASM

```
213 Bâtiments                              _ €
44566 TVA déductible (sur acquisitions)   _ €
    228 Production en cours                     _ €
    44572 TVA collectée (LASM)                  _ €
```

### 12. Restitution

#### Tableau d'analyse

| Élément | Valeur | Régime TVA | TVA due |
|---|---|---|---|
| Prix d'acquisition | _ € | _ | _ € |
| Travaux réalisés | _ € | _ | _ € |
| Prix de vente | _ € | _ | _ € |
| Marge | _ € | | |
| **TVA à reverser** | | | **_ €** |

#### Note d'analyse

- Identification de l'opération
- Régime TVA retenu + justification
- Calcul de la TVA due
- Risques de régularisation
- Recommandations (option TVA, choix régime…)

## Garde-fous

- **Pas de validation finale** — l'analyse vaut conseil ; les actes notariés doivent confirmer.
- **Délais d'option** : option pour TVA à exercer dans les délais (variables).
- **Régularisation 20 ans** : suivi obligatoire pour immeubles cédés.
- **Marchand de biens** : conditions strictes (revente < 1 an, sans transformation).
- **Documentation** : conserver 10 ans pour audit DGFiP.
- **Veille fiscale** : taux et conditions évoluent (lois de finances annuelles).

## Livrable à proposer

Après analyse, propose :
- **Note d'analyse TVA immobilière** (DOCX + PDF) avec :
  - Identification de l'opération
  - Régime TVA retenu + justification
  - Calcul détaillé de la TVA due
  - Risques de régularisation
  - Recommandations
- **Tableau Excel** de calcul détaillé
- **Modèle de facture** conforme avec mentions adaptées
- **Conseils opérationnels** (option TVA, choix marchand de biens, etc.)
- Mention finale : *« Document préparé par l'agent IA Expert-comptable BTP — à valider par l'expert-comptable inscrit à l'OEC et le notaire si actes authentiques en cours. »*
