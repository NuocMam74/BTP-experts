# Skill — Évaluer un bien immobilier

L'utilisateur te transmet un bien à évaluer — tu dois produire une expertise immobilière selon les méthodes professionnelles (comparaison, capitalisation, coût de remplacement).

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Bien à évaluer** : type (logement, commerce, bureau, terrain), localisation, surface
- **Mandant** : propriétaire, notaire (succession), avocat (divorce), DGFiP, etc.
- **Objet** de l'évaluation : vente, succession, donation, partage, expropriation, IFI, sinistre, comptabilité
- **Date d'effet** : valeur au jour de (vente, décès, partage…)
- **Type de valeur recherchée** :
  - **Vénale** : prix probable de vente
  - **Usage** : pour le propriétaire actuel
  - **Remplacement** : coût de reconstruction
  - **Locative** : loyer probable
- **Documents disponibles** : acte de propriété, plans, diagnostics, baux

### 2. Étude documentaire

#### Documents à analyser

- ❓ Acte de propriété + descriptif
- ❓ Plan cadastral récent
- ❓ Titre de propriété
- ❓ Diagnostics techniques (DPE, amiante, plomb, etc.)
- ❓ Baux en cours (locataires + loyers)
- ❓ Charges de copropriété (3 derniers exercices)
- ❓ PC ou DP éventuels
- ❓ Servitudes mentionnées

#### Vérifications

- ❓ Propriété pleine ou démembrée ?
- ❓ Indivision ?
- ❓ Servitudes impactantes ?
- ❓ Litiges en cours ?

### 3. Visite du bien

#### Liste de contrôle

- ❓ Adresse + accès
- ❓ Surface mesurée (Carrez si copropriété)
- ❓ État général :
  - Bon entretien / Vétusté moyenne / Mauvais état
- ❓ Travaux à prévoir (chiffrage estimé)
- ❓ Étage + ascenseur
- ❓ Vue + exposition
- ❓ Pièces (nombre, distribution)
- ❓ Annexes (parking, cave, terrasse, balcon)
- ❓ Diagnostic visuel rapide :
  - Toiture, façade, menuiseries
  - Plomberie, électricité
  - Humidité, fissures

#### Environnement

- ❓ Quartier (résidentiel, commerçant, calme)
- ❓ Transports en commun
- ❓ Commerces, écoles
- ❓ Nuisances (route, ferroviaire, aéroport)
- ❓ Sécurité du quartier

### 4. Recherche marché

#### Sources de transactions

- **Perval** (Notaires de France) : transactions notariales — données précises
- **BIEN** (Paris + IDF) : transactions
- **MIN** (province) : transactions
- **DVF** (Données Valeurs Foncières — DGFiP) : transactions publiques (gratuit)
- **MeilleursAgents, SeLoger** : prix d'annonces (biais hausse)

#### Critères de sélection des comparables

- **Récents** : 6-12 mois max
- **Proches géographiquement** : 1-5 km selon densité urbaine
- **Similaires** : surface, type, état, étage, annexes
- **Minimum 3-5 comparables** pour fiabilité

#### Indices et tendances

- **Indice notaires-INSEE** logement ancien (mise à jour trimestrielle)
- **Indice IRL** loyers (annuel)
- **Tendance** locale : hausse, baisse, stagnation

### 5. Application des méthodes

#### A. Méthode par comparaison (souvent prioritaire pour logements)

1. **Recensement** des 3-5 comparables
2. **Tableau** :

| Comparable | Adresse | Surface | Prix vente | €/m² | Date | Écart vs bien évalué |
|---|---|---|---|---|---|---|
| 1 | ___ | _ m² | _ € | _ €/m² | _ | +/- _ % |
| 2 | ___ | _ m² | _ € | _ €/m² | _ | +/- _ % |
| 3 | ___ | _ m² | _ € | _ €/m² | _ | +/- _ % |

3. **Ajustements** pour écarts :
   - Surface (€/m² + total)
   - État (neuf, à rénover, à démolir)
   - Étage (RDC vs 5ᵉ)
   - Vue, exposition
   - Annexes (parking, cave, terrasse)

4. **Calcul** : €/m² moyen ajusté × surface bien évalué = Valeur

#### B. Méthode par capitalisation (biens locatifs)

```
Valeur = R_net / T_cap
```

##### Calcul du revenu net

```
R_brut (loyer annuel HT)
- Charges non récupérables (5-15 % loyer)
- Taxe foncière
- Vacance locative prévue (5-10 %)
- Frais de gestion (5-8 %)
= R_net
```

##### Taux de capitalisation typique

| Type | Taux |
|---|---|
| Logement Paris haut de gamme | 2,5-3,5 % |
| Logement Paris standard | 3-4 % |
| Logement IDF couronne | 4-5 % |
| Logement grande ville province | 4-6 % |
| Logement petite ville | 5-7 % |
| Bureau Paris CBD | 3-4 % |
| Bureau province | 6-8 % |
| Commerce centre-ville | 5-7 % |
| Local industriel | 7-9 % |

#### C. Méthode par coût de remplacement (cas particuliers)

```
Valeur = (C_neuf - V_vétusté) + V_foncier
```

- **C_neuf** : coût reconstruction (€/m² × surface)
- **V_vétusté** : abattement (5-50 % selon âge et état)
- **V_foncier** : valeur du terrain par comparaison

### 6. Synthèse des méthodes

#### Tableau récapitulatif

| Méthode | Valeur | Pondération |
|---|---|---|
| Comparative | _ € | 50-70 % |
| Capitalisation | _ € | 20-40 % |
| Coût de remplacement | _ € | 0-20 % |
| **Valeur retenue** | **_ €** | |

#### Justification

- Méthode dominante (comparative pour logement courant)
- Pondération selon contexte
- **Fourchette de prix** plutôt que valeur unique (± 5-15 %)
- **Marge d'incertitude**

### 7. Rédaction du rapport

#### Structure type

```
RAPPORT D'EXPERTISE IMMOBILIÈRE

1. MISSION ET CONTEXTE
   - Mandant : ___
   - Objet : ___
   - Date d'effet : ___
   - Date du rapport : ___

2. IDENTIFICATION DU BIEN
   - Adresse : ___
   - Références cadastrales : ___
   - Type : ___
   - Description : ___
   - Surface : ___ m² (Carrez si applicable)

3. ÉTUDE JURIDIQUE
   - Statut : pleine propriété / démembrement / indivision
   - Charges : ___
   - Servitudes : ___
   - Litiges : ___

4. ÉTUDE TECHNIQUE
   - État général : ___
   - Travaux à prévoir : ___ (€ ___)
   - Diagnostics techniques : ___

5. ÉTUDE ÉCONOMIQUE
   - Marché local : ___
   - Comparables (tableau)
   - Tendances : ___

6. ÉVALUATION
   - Méthodes appliquées (détails)
   - Calculs détaillés
   - Synthèse

7. CONCLUSION
   - Valeur vénale retenue : ___ €
   - Fourchette de prix : ___ à ___ €
   - Validité : ___ (à date)
   - Mention finale : ___

ANNEXES :
- Plans, photos
- Tableaux comparables
- Pièces du dossier
```

### 8. Cas particuliers

#### Évaluation pour IFI

- Valeur vénale au 1ᵉʳ janvier
- Justifiable en cas de contrôle DGFiP
- Comparative + capitalisation

#### Évaluation pour succession

- Valeur vénale au jour du décès
- Pour calcul droits de succession
- Préférable d'évaluer bas (moins de droits) mais justifiable

#### Évaluation pour expropriation

- Indemnité = valeur vénale + indemnités annexes
- Devant le juge de l'expropriation
- Souvent expertise judiciaire

#### Évaluation pour partage / divorce

- Valeur vénale au jour du partage
- Souvent expertise contradictoire
- Médiation possible

#### Évaluation d'un fonds de commerce

- Méthode spécifique (rendement + comparaison)
- Éléments incorporels (droit au bail, clientèle, enseigne)
- Coefficient multiplicateur sur CA ou EBE

### 9. Validité de l'évaluation

- **Date de validité** : valable à la date d'effet
- **Conditions** : sous réserve d'évolution du marché
- **Recommandation** : renouvellement annuel pour gros patrimoines
- **Pas d'engagement** sur prix de vente effectif

## Garde-fous

- **Indépendance** vis-à-vis des intérêts du mandant (jamais favoriser une partie).
- **Méthode dominante** comparative pour logements courants.
- **Comparables récents** : 6-12 mois max.
- **Fourchette de prix** plutôt que valeur unique (5-15 % d'incertitude).
- **Visite contradictoire** recommandée (présence propriétaire).
- **Justifications** méthodologiques détaillées (audit DGFiP possible pour IFI).
- **RC pro** spécifique évaluation.
- **Conservation** dossier 10 ans.

## Livrable à proposer

Après évaluation :
- **Rapport d'expertise** (DOCX + PDF) selon structure ci-dessus
- **Tableau des comparables** (XLSX)
- **Photographies** datées du bien
- **Calculs détaillés** par méthode (XLSX)
- **Synthèse exécutive** (DOCX) avec valeur retenue + fourchette
- Mention finale : *« Document préparé par l'agent IA Géomètre — à valider et signer par le géomètre-expert ou expert immobilier qualifié. Valeur estimée à la date d'effet, sous réserve d'évolution du marché. »*
