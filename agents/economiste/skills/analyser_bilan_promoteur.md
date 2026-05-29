# Skill — Analyser le bilan d'une opération de promotion

L'utilisateur te transmet une opération de promotion immobilière (projet) — tu dois analyser ou établir son bilan prévisionnel, calculer la marge et identifier les risques.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Type d'opération** : logement neuf VEFA, mixte logement-commerce, bureau, etc.
- **Localisation** : zone, prix de marché au m², attractivité
- **Programme** : nombre de logements, typologies, surfaces SDP / SHAB
- **Foncier** : prix d'acquisition, état du terrain (nu / bâti à démolir / pollué)
- **Phase** : ESQ, APS, APD, en cours
- **Hypothèses** : prix de vente, durée totale, financement

### 2. Construire les recettes prévisionnelles

#### Décomposition par typologie

Pour chaque produit (logement, parking, commerce) :

| Produit | Quantité | Surface unitaire | Prix vente HT €/m² | Total HT |
|---|---|---|---|---|
| Logement T2 | _ | _ m² SHAB | _ €/m² | _ € |
| Logement T3 | _ | _ m² SHAB | _ €/m² | _ € |
| Logement T4 | _ | _ m² SHAB | _ €/m² | _ € |
| Parkings | _ | _ U | _ €/U | _ € |
| Commerce | _ | _ m² | _ €/m² | _ € |
| **Total HT** | | | | **_ €** |

#### Modulation des prix

- **T2** : prix au m² **+5 à +10 %** vs T3
- **T1 / studio** : **+10 à +15 %**
- **T4 et plus** : **-5 à -10 %**
- Avec **balcon/terrasse** : +5 à +15 %
- Avec **parking** : valorisation 15-50 k€/U
- Étages élevés : +1 à +3 % par étage (effet vue, luminosité)

#### TVA

| Cas | Taux |
|---|---|
| VEFA logement secteur libre | **20 %** |
| VEFA en zone ANRU + PAS | **5,5 %** |
| VEFA en QPV (sous conditions) | **10 %** |
| Bureau / commerce | **20 %** |

### 3. Construire le coût de revient

#### A. Foncier (10-40 % du CA)

| Poste | Montant |
|---|---|
| Acquisition foncier | _ € |
| Frais d'acte notarié (~7-8 % bâti / ~3 % nu) | _ € |
| Études préalables (G2, BV, expertises) | _ € |
| Démolition / dépollution si applicable | _ € |
| Frais portage (intérêts pendant études) | _ € |
| **Total foncier** | **_ €** |

#### B. Travaux (50-65 % du CA)

| Poste | Montant |
|---|---|
| Coût travaux HT (SDP × €/m²) | _ € |
| Raccordements et branchements | _ € |
| Aménagements extérieurs + VRD | _ € |
| **Total travaux** | **_ €** |

##### Ratios travaux par typologie

| Typologie | €/m² SDP HT |
|---|---|
| Logement collectif R+5 standard | 1 800 - 2 400 |
| Logement collectif R+8 et plus | 2 200 - 2 900 |
| Logement haut de gamme | 2 600 - 3 500 |
| Logement social HLM | 1 600 - 2 100 |
| Bureau tertiaire HQE | 1 800 - 2 400 |

#### C. Honoraires (8-15 % du coût travaux)

| Poste | % travaux | Montant |
|---|---|---|
| MOE (archi + BE) | 8-12 % | _ € |
| CSPS, CT, géomètre, BE thermique | 1,5-3 % | _ € |
| Notaire transactions | 1-2 % | _ € |
| Commercialisation (agence) | 3-6 % du CA | _ € |
| Gestion promoteur | 1-3 % du CA | _ € |
| **Total honoraires** | | **_ €** |

#### D. Taxes et charges foncières

| Poste | Montant |
|---|---|
| Taxe d'aménagement (5-25 %, souvent 8 %) | _ € |
| Redevance archéologique (si fouilles) | _ € |
| Versement assainissement collectif | _ € |
| Taxe foncière pendant chantier | _ € |
| **Total taxes** | **_ €** |

#### E. Assurances

| Poste | Montant |
|---|---|
| DO (2,5-5 % du coût travaux HT) | _ € |
| TRC (0,1-0,4 %) | _ € |
| **Total assurances** | **_ €** |

#### F. Frais financiers (3-7 % du coût de revient)

| Poste | Montant |
|---|---|
| Intérêts emprunt portage + travaux (durée 18-36 mois) | _ € |
| GFA (Garantie Financière d'Achèvement) ~ 1-1,5 % | _ € |
| Frais bancaires divers | _ € |
| **Total financier** | **_ €** |

#### G. Provisions

| Poste | Montant |
|---|---|
| Aléas (5-7 % du coût travaux) | _ € |
| Provision réclamations (1-3 %) | _ € |
| **Total provisions** | **_ €** |

### 4. Calcul de la marge

```
Marge brute = CA HT - Coût de revient total
% Marge brute = Marge brute / CA HT × 100
```

#### Cibles

| Taille promoteur | Marge brute cible |
|---|---|
| Petit promoteur (1-5 opérations/an) | 8-12 % du CA HT |
| Promoteur moyen | 7-10 % |
| Grand promoteur | 6-8 % |
| Bailleur social | 3-5 % (mission différente) |

#### Marge nette (après IS, frais financiers complets)

```
Marge nette ≈ 50-60 % de la marge brute
```

Soit **3-7 %** du CA HT typiquement.

### 5. Analyse de viabilité

#### Verdict

| Marge brute calculée | Verdict |
|---|---|
| > 12 % | ✅ Très bonne, opération sécurisée |
| 7-12 % | ✅ Bonne, conforme aux standards |
| 4-7 % | ⚠️ Marginale, à sécuriser |
| 0-4 % | ⚠️ Risquée, optimisations nécessaires |
| < 0 % | ❌ Non viable, à abandonner ou restructurer |

#### Options d'optimisation

Si marge insuffisante :

1. **Renégocier le foncier** (-10 à -20 %) — souvent le plus gros levier
2. **Optimiser les travaux** (-3 à -7 %) — choix matériaux, mode constructif
3. **Augmenter les prix de vente** si marché le permet
4. **Diversifier les typologies** (introduire des T2 plus rentables)
5. **Ajouter parkings ou commerces** rentables
6. **Réduire les honoraires** (cabinet plus modeste)
7. **Optimiser la fiscalité** (TVA ANRU, dispositifs locatif)
8. **Mobiliser aides** (PAS, dispositifs locaux)

### 6. Plan de financement et trésorerie

#### Sources

| Source | Cumul max | Conditions |
|---|---|---|
| **Apports promoteur** | 15-25 % | Trésorerie disponible |
| **Crédit promoteur** (BPI, banques) | 60-75 % | GFA souscrite |
| **Pré-commercialisation** | 50 % min avant démarrage | VEFA selon échéancier R.261-14 CCH |
| **Subventions** (ANRU, dispositifs locaux) | variable | Selon zonage |

#### Échéancier VEFA — art. R.261-14 CCH

| Phase | Cumul max du prix |
|---|---|
| Réservation (dépôt garantie) | 5 % (12 mois) |
| Achèvement fondations | **35 %** |
| Mise hors d'eau | **70 %** |
| Achèvement | **95 %** |
| Livraison | **100 %** (- 5 % consignables si réserves) |

### 7. Analyse des risques

| Risque | Impact | Mitigation |
|---|---|---|
| **Surenchère foncier** | Marge réduite | Compte à rebours rigoureux |
| **Surcoût travaux** | Marge réduite | Prix forfaitaire + provisions 5-7 % |
| **Retard commercialisation** | Frais financiers ⬆ | Pré-commercialisation 50 % avant démarrage |
| **Annulations VEFA** | Trésorerie | Garantie acompte + suivi clients |
| **Baisse marché immobilier** | Stocks invendus | Diversification typologies, accords bailleurs sociaux |
| **Litiges techniques** | Réserves, indemnités | DO + provisions + suivi MOE |
| **Évolution réglementaire** (RE2020+, loi Climat) | Surcoût standards | Veille permanente |
| **Sujétions imprévues** (sol, archéo) | Surcoûts non anticipés | Études G2 + BV solides en amont |

### 8. Compte à rebours pour validation foncier

Méthode classique :

```
Prix vente cible × Surfaces vendables
- Marge cible (8-12 % CA)
- Coût travaux estimé
- Honoraires estimés
- Taxes et charges
- Assurances
- Frais financiers
- Provisions
= Budget foncier MAX acceptable
```

Si le prix d'acquisition du foncier > budget max → **ne pas acquérir** ou renégocier.

### 9. Analyse de sensibilité

#### Variables à tester

1. **Prix de vente** : -10 %, -5 %, base, +5 %
2. **Coût travaux** : -5 %, base, +5 %, +10 %
3. **Durée totale** : +3 mois, +6 mois (impact frais financiers)
4. **Taux de pré-commercialisation** : 30 %, 50 %, 70 %

#### Méthode

Recalcul de la marge dans chaque scénario.
Identifier le **seuil de bascule** : à partir de quand la marge devient négative.

### 10. Restitution

#### Tableau de synthèse

| Indicateur | Montant | % CA HT |
|---|---|---|
| Chiffre d'affaires HT | _ € | 100 % |
| Foncier | _ € | _ % |
| Travaux | _ € | _ % |
| Honoraires | _ € | _ % |
| Taxes | _ € | _ % |
| Assurances | _ € | _ % |
| Frais financiers | _ € | _ % |
| Provisions | _ € | _ % |
| **Total coût de revient** | _ € | _ % |
| **Marge brute** | _ € | _ % |

#### Graphique en cascade

Représentation visuelle de la décomposition CA → coûts → marge.

## Garde-fous

- **Hypothèses de marché** doivent être vérifiables (étude notaires, prix opérations comparables).
- **Études G2 / BV** obligatoires avant chiffrage travaux (sinon risque surcoût majeur).
- **Marge brute** ≥ 7 % indispensable pour viabilité (sauf opération sociale).
- **Pré-commercialisation 50 %** avant démarrage travaux pour sécuriser financement.
- **GFA et DO** souscrites avant ouverture chantier (obligation légale).
- **TVA** : vérifier zonage (ANRU, QPV) pour appliquer le bon taux.
- **Loi Hoguet** : encadrement de la commercialisation par professionnel agréé.

## Livrable à proposer

Après analyse, propose un **bilan promoteur complet** :
- **Bilan détaillé** (XLSX) avec onglets : recettes, coûts par poste, synthèse, sensibilité
- **Note de présentation** (DOCX + PDF) avec :
  - Synthèse exécutive (verdict marge)
  - Décomposition CA et coûts
  - Comparaison vs cibles
  - Analyse des risques
  - Recommandations d'optimisation
- **Tableau de bord** pour suivi (XLSX)
- Mention finale : *« Document préparé par l'agent IA Économiste — à valider par la direction promotion / financière avant décision d'acquisition foncière. »*
