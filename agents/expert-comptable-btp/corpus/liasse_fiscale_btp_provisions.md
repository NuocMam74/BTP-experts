# Liasse fiscale BTP — Provisions et spécificités sectorielles

**Source :** PCG art. 322 (provisions) ; CGI art. 39-1 5° (déductibilité provisions) ; CGI art. 236 (CIR — Crédit Impôt Recherche) ; CGI art. 244 quater (CICE puis BCS) ; BOI-BIC-PROV (BOFIP) ; doctrine OEC (Ordre des Experts-Comptables).

## Spécificités fiscales BTP

### Liasse fiscale = ensemble des déclarations annuelles

Pour entreprise BTP soumise à IS :
- **Bilan** (2050-2053)
- **Compte de résultat** (2054)
- **Tableau des immobilisations** (2055-2057)
- **Tableau des provisions** (2056)
- **Tableau des amortissements** (2055)
- **Tableau des effectifs** (2058)
- **Détermination du résultat fiscal** (2058 A)
- **Affectation du résultat** (2058 B)
- **Tableau des plus-values et moins-values** (2059 A à 2059 D)

### Pour BIC (entreprise individuelle)

- **Compte de résultat simplifié** (2031-S à 2033-S)
- Idem tableaux

## Provisions courantes BTP

### 1. Provision pour congés payés (cadres et ETAM uniquement)

#### Spécificité BTP

Pour les **ouvriers BTP affiliés CIBTP**, **PAS** de provision : les CP sont externalisés à la caisse.

Pour les **cadres et ETAM** : provision classique selon droit commun.

#### Calcul

```
Provision CP = 1/10 des salaires de la période de référence (1ᵉʳ juin → 31 mai)
             - CP déjà pris pendant la période
             + Charges sociales sur cette provision (~ 50-55 %)
```

#### Comptabilisation

```
6412 Provision pour congés payés (cadres/ETAM)         _ €
6451 Provision pour charges sociales                    _ €
    4282 Provisions pour congés payés                    _ €
    4382 Provisions pour charges sociales                _ €
```

### 2. Provision pour litiges et garanties

#### Application

- Sinistre décennal **identifié** ou **probable** → provision pour la part non couverte par RC décennale
- Réclamation art. 50 CCAG en cours
- Litige fournisseur ou sous-traitant
- Litige fiscal ou social
- Garantie de parfait achèvement en cours

#### Conditions de déductibilité (CGI 39-1 5°)

1. **Nettement précisée** (objet, montant, base de calcul)
2. Risque **probable** (pas seulement possible)
3. **Régulièrement comptabilisée**
4. Mentionnée sur **tableau 2056** (relevé des provisions)

#### Comptabilisation

```
6815 Dotation aux provisions d'exploitation (litiges)        _ €
    1511 Provisions pour litiges                                _ €
```

#### Exemples chiffrés courants

- Provision franchise RC décennale (5-10 k€/sinistre)
- Provision réclamation art. 50 (selon ampleur)
- Provision honoraires d'avocat à venir

### 3. Provision pour perte à terminaison (contrats long terme)

#### Cadre PCG art. 380-3

Si à un moment donné le **coût total à terminaison** estimé **dépasse le prix de marché** révisé, une **provision pour la perte totale** doit être constituée **immédiatement**.

#### Cas typique

Marché 1 200 000 € HT.
Coûts initialement estimés : 950 000 €.
Réestimation à mi-chantier : coûts totaux = 1 260 000 €.
**Perte prévisible** : 60 000 €.

→ Provision **immédiate** des 60 000 € (peu importe l'avancement).

#### Comptabilisation

```
6815 Dotations aux provisions d'exploitation           60 000 €
    1518 Autres provisions pour risques                  60 000 €
```

### 4. Provision pour amende ou redressement fiscal

#### Application

- Vérification de comptabilité en cours
- Notification d'avis de mise en recouvrement
- Procédure contentieuse

#### Conditions

- Sinistre **probable** (avis reçu, pas seulement risque potentiel)
- Quantum estimable

#### Particularité fiscale

Les **amendes et pénalités** sont **non déductibles** fiscalement (CGI art. 39-2). Mais la **provision pour amende probable** est déductible si elle remplit les conditions (BOI-BIC-PROV-30).

### 5. Provision pour gros entretien et grandes révisions

#### Cadre PCG art. 311-2

Si les composants du bâtiment ont des **durées de vie différentes** :
- Approche par **composants séparés** (méthode obligatoire pour SBI > 5 M€)
- Composant identifié dépréciable séparément

#### Application BTP

Pour matériel de chantier (échafaudages, grues, banches) :
- Composant gros entretien (révisions périodiques 5-10 ans)
- Dépréciation séparée du matériel principal

### 6. Provision pour démantèlement

#### Cadre PCG art. 322

Si l'entreprise a une **obligation de démantèlement** d'une installation à la fin de son utilisation :
- Provision dès la mise en service
- Reprise progressive

### 7. Provision pour engagements de retraite (IFC)

#### Application

Pour les salariés ayant droit à une **indemnité de fin de carrière (IFC)** lors de leur départ à la retraite.

#### Calcul

```
IFC totale prévisionnelle = Salaire de fin de carrière × Coefficient ancienneté
Provision = IFC × Probabilité présence × Actualisation
```

#### Comptabilisation

```
6816 Dotation aux provisions pour risques et charges           _ €
    1531 Provisions pour pensions et obligations similaires      _ €
```

#### Particularité

- Recommandation ANC 2013-02 (méthode actuariale)
- Obligatoire en compta consolidée IFRS (IAS 19)
- **Optionnelle** en compta sociale (mais recommandée)

## Dispositifs fiscaux spécifiques

### 1. CIR — Crédit Impôt Recherche (CGI 244 quater B)

#### Champ

- **Activités de R&D** : recherche fondamentale, appliquée, développement expérimental
- Inclut : nouveaux matériaux, nouveaux procédés constructifs, modélisation, BIM avancé

#### Application BTP

Activités éligibles courantes :
- Développement de nouveaux modes constructifs (préfabrication, modular)
- Recherche sur isolation biosourcée
- Recherche sur béton bas carbone
- BIM avancé (algorithmes, intégrations)
- Robotique de chantier
- Veille technologique (limites strictes)

#### Calcul

```
CIR = 30 % des dépenses éligibles ≤ 100 M€
    + 5 % au-delà
```

Plafond : aucun plafond formel.

#### Documentation

- **Dossier justificatif** détaillé (description des projets, dépenses, équipes)
- **Conservation** 3 ans (LPF L.169)
- **Rescrit fiscal** possible (sécurisation préalable)

### 2. JEI — Jeune Entreprise Innovante (CGI 44 sexies-0 A)

#### Champ

- Entreprise **< 8 ans**
- **< 250 salariés**
- **CA < 50 M€** ou **bilan < 43 M€**
- **15 % minimum** de dépenses R&D
- Détenue à 50 % minimum par personnes physiques

#### Avantages

- **Exonération IS** : 100 % la 1ʳᵉ année, 50 % la 2ᵉ
- **Exonération CFE** (cotisation foncière des entreprises) : pendant 7 ans
- **Exonération cotisations sociales** patronales sur personnel R&D : 7 ans

#### Application BTP

Peu utilisée mais pertinente pour start-ups BIM, modélisation, robotique chantier.

### 3. CICE / BCS (Bouclier Compétitivité Sociale)

#### Évolution

- **CICE** : 2013-2018 → 6 % de la masse salariale ≤ 2,5 × SMIC
- **Réduction de cotisations** depuis 2019 : -6 points URSSAF sur les bas salaires
- **BCS** : pas créé en France (renommé en réduction directe)

#### Application BTP

- Bénéficie automatiquement à toutes entreprises BTP (réduction de cotisations sociales)
- Pas d'action déclarative spécifique

### 4. Réduction d'impôt mécénat (CGI 238 bis)

#### Champ

- Dons aux **organismes d'intérêt général**, fondations, associations
- 60 % de réduction d'IS (plafond : 5 ‰ du CA)

### 5. Dispositif Pinel et investissement locatif

Pour les promoteurs / commercialisateurs vendant à investisseurs Pinel/Denormandie :
- Réduction d'impôt **pour l'acquéreur** (12 à 21 % du prix selon engagement)
- Pas d'impact direct sur la fiscalité du promoteur, mais impact commercial

## Tableau 2056 — Provisions

### Présentation obligatoire à la liasse

| Type de provision | Dotation N | Reprise N | Provision fin N |
|---|---|---|---|
| Congés payés (cadres/ETAM) | _ | _ | _ |
| Litiges | _ | _ | _ |
| Pertes à terminaison | _ | _ | _ |
| Garantie décennale (parts non couvertes) | _ | _ | _ |
| Engagements retraite (IFC) | _ | _ | _ |
| Démantèlement | _ | _ | _ |
| Autres | _ | _ | _ |
| **Total** | _ | _ | _ |

### Détail à fournir

Pour chaque provision > 10 000 € :
- Origine et nature
- Mode de calcul
- Justifications (factures attendues, devis, expertise)

## Plus-values et moins-values

### Cession d'immobilisations BTP

#### Régime des plus-values professionnelles

- Pour **entreprise individuelle** : plus-value imposée au barème IR + prélèvements sociaux
- Pour **société IS** : plus-value imposée à IS (32 % en 2024)

#### Cas particulier — matériel BTP usagé

- Vente de grue, banche, échafaudage usagé
- Plus-value courte si détention < 2 ans
- Plus-value longue si > 2 ans (régime favorable)

#### Régularisation TVA

- Vente d'immobilisation TVA déductible : régularisation possible si encore dans le délai de 5 ans (CGI 207)

## Synthèse — checklist liasse fiscale BTP

### Avant clôture

1. **Inventaire** des chantiers en cours + valorisation (avancement)
2. **Provisions** à constituer :
   - CP cadres/ETAM
   - Litiges identifiés
   - Pertes à terminaison
   - Sinistres décennale (parts non couvertes)
   - IFC (engagements retraite)
3. **Décompte** des amortissements
4. **Cessions** d'immobilisations à régulariser
5. **Récupération TVA** sur créances irrécouvrables
6. **Audit** des cotisations CIBTP (cohérence)

### Lors de l'établissement

1. **Bilan** (2050-2053)
2. **Compte de résultat** (2054)
3. **Tableau des provisions** (2056) — détaillé
4. **Détermination du résultat fiscal** (2058 A)
5. **Affectation** (2058 B)
6. **Plus-values** (2059 A à 2059 D)
7. **Effectifs** (2058)
8. **Crédits d'impôt** (CIR, autres) — formulaires 2069

### Vérifications

- **Cohérence interne** (somme des comptes = total bilan/résultat)
- **Cohérence DSN** vs comptabilité (salaires)
- **Cohérence CIBTP** (cotisations)
- **Cohérence TVA** (CA3 vs CA déclaré)
- **Documentation** des provisions et CIR

## Sanctions et contrôles

### Vérification de comptabilité

- DGFiP peut **contrôler** la liasse 3 ans en arrière (LPF L.169)
- 10 ans en cas de fraude

### Sanctions

| Manquement | Sanction |
|---|---|
| Erreur matérielle | Régularisation + intérêts retard 0,4 %/mois |
| Insuffisance déclarative | Majoration 10 à 40 % |
| Mauvaise foi | Majoration 40 % |
| Manœuvre frauduleuse | Majoration 80 % + sanctions pénales |
| Défaut de production | Amende administrative + majoration |

## Citations à utiliser

- PCG art. 322 (provisions générales)
- PCG art. 380-1 à 380-3 (contrats long terme)
- PCG art. 311-2 (composants séparés)
- CGI art. 39-1 5° (déductibilité provisions)
- CGI art. 39-2 (amendes non déductibles)
- CGI art. 244 quater B (CIR)
- CGI art. 44 sexies-0 A (JEI)
- CGI art. 238 bis (mécénat)
- CGI art. 207, 272-1 (régularisation TVA)
- BOI-BIC-PROV-30 (provisions déductibles)
- Recommandation ANC 2013-02 (IFC)
- Recommandation ANC 2020-01 (contrats long terme)

**Référence à citer :** PCG + CGI + BOFIP. Sources : Legifrance + BOFIP-impots.gouv.fr + anc.fr.
