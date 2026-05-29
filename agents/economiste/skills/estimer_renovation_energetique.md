# Skill — Estimer une rénovation énergétique avec aides

L'utilisateur te transmet un logement à rénover énergétiquement — tu dois chiffrer les travaux, mobiliser les aides (MaPrimeRénov', CEE, Éco-PTZ, TVA réduite) et calculer le reste à charge net.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Type de logement** : maison individuelle, appartement, copropriété
- **Statut** : propriétaire occupant / bailleur / vente en cours
- **Revenus du ménage** (RFR) → catégorie MaPrimeRénov' (Bleu/Jaune/Violet/Rose)
- **Année de construction** (impact éligibilité)
- **Surface** SHAB en m²
- **Localisation** : zone climatique, IDF ou hors IDF
- **DPE actuel** : classe + énergie primaire kWh/m²/an
- **Travaux envisagés** : liste prioritaire (audit énergétique recommandé)
- **Budget** disponible

### 2. Vérifier l'éligibilité aux aides

#### MaPrimeRénov'

- Logement **résidence principale** (occupant) ou loué nu (bailleur, depuis 2024)
- Logement **achevé depuis > 15 ans** (sauf changement de chauffage : > 2 ans)
- **Occupation** au moins 8 mois/an
- **Engagement** d'occupation 3 ans après travaux (sauf cas dérogatoires)
- **Entreprise RGE** pour tous les travaux financés

#### Catégories de revenus 2024 (RFR — IDF)

| Catégorie | 1 personne | 2 personnes | 3 personnes | 4 personnes |
|---|---|---|---|---|
| **Très Modestes (Bleu)** | 23 768 € | 34 884 € | 41 893 € | 48 914 € |
| **Modestes (Jaune)** | 28 933 € | 42 463 € | 51 000 € | 59 549 € |
| **Intermédiaires (Violet)** | 40 404 € | 59 394 € | 71 060 € | 83 637 € |
| **Aisés (Rose)** | au-delà | au-delà | au-delà | au-delà |

(Hors IDF : seuils environ -15 à -20 %.)

### 3. Lister les travaux et leurs coûts

#### Tableau de chiffrage

Pour chaque action de rénovation :

| Travaux | Surface / Quantité | PU HT | Total HT | Taux TVA | Total TTC |
|---|---|---|---|---|---|
| ITE 14 cm | _ m² | _ €/m² | _ € | 5,5 % | _ € |
| Isolation combles 30 cm | _ m² | _ €/m² | _ € | 5,5 % | _ € |
| Remplacement fenêtres DV | _ U | _ €/U | _ € | 5,5 % | _ € |
| PAC air/eau | 1 | _ €/U | _ € | 5,5 % | _ € |
| VMC double flux 90 % | 1 | _ € | _ € | 5,5 % | _ € |
| Audit énergétique | 1 | _ € | _ € | 5,5 % | _ € |
| **Total** | | | **_ €** | | **_ €** |

#### Coûts indicatifs (référence chapitre corpus)

##### Isolation

- ITE 14 cm enduit hydraulique : 110-160 €/m²
- ITI doublage 100 mm : 45-70 €/m²
- Combles perdus soufflage 30 cm : 25-45 €/m²
- Rampants intérieur 24 cm : 80-130 €/m²
- Plancher bas par dessous : 30-55 €/m²

##### Menuiseries (par fenêtre 1,40 × 1,15 m DV)

- PVC blanc DV : 350-500 €
- Alu RPT DV : 750-1 100 €
- Bois traditionnel : 850-1 400 €

##### Ventilation

- VMC simple flux hygro B : 1 500-2 500 €
- VMC double flux 90 % : 5 500-9 000 €

##### Chauffage / ECS

- Chaudière gaz condensation : 7 500-12 000 €
- PAC air/eau 9 kW + radiateurs : 12 000-18 000 €
- Chaudière biomasse : 18 000-26 000 €
- Ballon thermodynamique : 3 500-5 500 €
- ECS solaire : 5 500-8 500 €

### 4. Calculer les aides

#### A. MaPrimeRénov' (parcours par geste)

##### Pour la catégorie **Bleu** (très modestes)

| Travaux | Aide forfaitaire |
|---|---|
| Isolation ITE (m²) | 75 €/m² |
| Isolation combles perdus (m²) | 25 €/m² |
| Isolation rampants (m²) | 75 €/m² (max 100 m²) |
| Isolation plancher bas (m²) | 30 €/m² |
| Menuiserie (par fenêtre) | 100 € |
| VMC double flux | 2 500 € |
| PAC air/eau | 5 000 € |
| Chaudière biomasse | 4 000 € |
| Poêle granulés | 2 500 € |
| Ballon thermodynamique | 1 200 € |
| ECS solaire | 4 000 € |
| Audit énergétique | 500 € |

##### Pour la catégorie **Jaune** (modestes)

Multiplier par environ 0,7 par rapport à Bleu :
- Isolation ITE : 60 €/m²
- PAC air/eau : 4 000 €
- Chaudière biomasse : 3 000 €
- etc.

##### Pour la catégorie **Violet** (intermédiaires)

Multiplier par environ 0,4 par rapport à Bleu :
- ITE : 40 €/m²
- PAC air/eau : 3 000 €
- etc.

##### Pour la catégorie **Rose** (aisés)

Aides réduites voire nulles sur la plupart des gestes.

#### Bonus

- **Bonus sortie de passoire** (F ou G → ≥ E) : **+1 500 €**
- **Bonus BBC** (atteinte A ou B) : **+1 500 €**

#### Plafond cumulé

- 20 000 € sur 5 ans (parcours par geste)
- 70 000 € (parcours accompagné, rénovation d'ampleur)

#### B. CEE — Certificats d'Économies d'Énergie

##### Méthode

1. Calculer les **kWh cumac** économisés par chaque travaux
2. Multiplier par le **prix de la prime** (variable, ~ 0,005-0,012 €/kWh cumac selon obligé)
3. **Coup de pouce** pour ménages modestes : prime majorée

##### Estimation rapide

| Travaux | CEE indicatif |
|---|---|
| Isolation combles | 10-30 €/m² |
| Isolation murs | 10-25 €/m² |
| Remplacement chaudière fioul → PAC (Bleu) | 4 000 € (Coup de pouce) |
| Remplacement chaudière fioul → biomasse (Bleu) | 4 000 € |
| Rénovation globale (sortie 2 classes DPE) | 2 000-8 000 € |

#### C. Éco-PTZ — Prêt à taux zéro

##### Conditions

- Logement résidence principale **achevé > 2 ans**
- Travaux par entreprise **RGE**

##### Plafonds

| Type | Plafond | Durée max |
|---|---|---|
| Action unique | 15 000 € | 20 ans |
| Bouquet 2 actions | 25 000 € | 20 ans |
| Bouquet 3+ actions | 30 000 € | 20 ans |
| Performance globale (≥ 35 % gain) | 50 000 € | 20 ans |

#### D. TVA réduite

- **5,5 %** pour travaux éligibles énergétiques (CGI 278-0 bis A)
- **10 %** pour autres travaux d'amélioration (CGI 279-0 bis)
- **20 %** pour gros œuvre et travaux non éligibles

#### E. Aides locales

Vérifier :
- Conseil régional (ex : Île-de-France, Auvergne-Rhône-Alpes)
- Département (variable selon politique)
- Commune / intercommunalité (parfois prime locale, dispositifs ANRU)

### 5. Calculer le reste à charge

```
Coût total TTC
- MaPrimeRénov'
- CEE
- Aides locales
- (Éco-PTZ : non subvention, simple prêt à 0 %)
= Reste à charge net

Éco-PTZ mobilisable : jusqu'à 30 000 € à 0 % sur 20 ans (étalement)
```

### 6. Calculer le ROI (Return on Investment)

#### A. Économies annuelles d'énergie

```
Économies = (Conso initiale - Conso finale) × Prix kWh
```

Estimation conso après travaux (selon classe DPE cible) :
- Classe A : ≤ 70 kWh/m²/an
- Classe B : 71-110
- Classe C : 111-180
- Classe D : 181-250
- Classe E : 251-330

#### B. Temps de retour brut

```
TRB = Reste à charge / Économies annuelles
```

#### C. Valeur vénale ajoutée

- Gain de **2 classes DPE** ≈ **+6-12 %** de la valeur du bien (étude notaires)
- Gain de **3 classes ou plus** : +10-15 %

### 7. Vérifier les délais et conformités loi Climat

#### Calendrier d'interdiction de location

| Date | Classe interdite à la location |
|---|---|
| 1ᵉʳ janv. 2025 | G |
| 1ᵉʳ janv. 2028 | F |
| 1ᵉʳ janv. 2034 | E |

→ **Anticiper** : si logement loué actuellement classé F/G/E, prioriser une rénovation atteignant la classe non interdite.

### 8. Préparer le plan de financement

| Source | Montant | Cumul |
|---|---|---|
| MaPrimeRénov' | _ € | _ € |
| CEE | _ € | _ € |
| Aides locales | _ € | _ € |
| **Aides directes** | _ € | _ € |
| Éco-PTZ (prêt 0 %) | _ € | _ € |
| Apport personnel | _ € | _ € |
| Crédit bancaire classique | _ € | _ € |
| **Total financement** | _ € | 100 % |

### 9. Lister les démarches à suivre

#### Avant signature des devis

1. **Audit énergétique** (réglementaire si vente passoire F/G ; recommandé sinon)
2. **Sélection entreprises RGE** (france-renov.gouv.fr)
3. **Devis détaillés** auprès de 3 entreprises minimum
4. **Demande MaPrimeRénov'** sur maprimerenov.gouv.fr **AVANT** signature devis
5. **Engagement CEE** auprès d'un obligé ou délégataire **AVANT** signature devis
6. **Demande Éco-PTZ** auprès d'une banque agréée

#### Pendant les travaux

7. **Suivi de chantier** par Mon Accompagnateur Rénov' (si parcours accompagné)
8. **Vérification** des justificatifs (RGE, certifications)
9. **Factures détaillées** par poste avec taux TVA correct

#### Après les travaux

10. **DPE post-travaux** (justificatif pour aides)
11. **Versement des aides** sur fourniture des justificatifs
12. **Conservation** des documents 5 ans

### 10. Simulateurs officiels

- **MaPrimeRénov'** : maprimerenov.gouv.fr (simulateur officiel)
- **CEE** : selectra.info, calculeo.fr, primesenergie.fr
- **Éco-PTZ** : ecologie.gouv.fr/eco-ptz
- **Audit énergétique** : ademe.fr

## Garde-fous

- **Devis signés AVANT** demande MPR/CEE → invalidation des aides.
- **Entreprises RGE** obligatoires sinon perte de l'éligibilité.
- **Engagement d'occupation 3 ans** après travaux pour MaPrimeRénov' (sauf vente justifiée).
- **Plafonds 5 ans** : suivre cumul sur fenêtre glissante.
- **Bonus BBC** atteint si arrivée en A ou B uniquement.
- **TVA 5,5 %** : conditions techniques précises (R minimum, Uw maxi) — sinon 10 % ou 20 %.
- **Copropriété** : démarche collective + vote AG (Loi ÉLAN art. 26 et 25 selon majorité).
- **Délai de versement MPR** : 4-6 semaines après transmission justificatifs.
- **Évolutions annuelles** : barèmes MPR mis à jour chaque année.

## Livrable à proposer

Après analyse, propose un **dossier rénovation énergétique** :
- **Tableau de chiffrage détaillé** (XLSX) avec :
  - Travaux par poste
  - Coûts HT, TVA, TTC
  - Aides calculées par source
  - Reste à charge
- **Plan de financement** (XLSX)
- **Note d'accompagnement** (DOCX + PDF) avec :
  - Synthèse économique
  - Calendrier
  - Démarches à suivre
  - Liste des entreprises RGE locales (à vérifier sur france-renov.gouv.fr)
- **ROI et gain de valeur vénale** (calcul + graphique)
- Mention finale : *« Document préparé par l'agent IA Économiste — à valider par un professionnel RGE audit pour l'audit énergétique réglementaire et par l'Accompagnateur Rénov' pour le parcours accompagné. »*
