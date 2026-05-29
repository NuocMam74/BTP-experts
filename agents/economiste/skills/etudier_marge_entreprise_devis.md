# Skill — Étude de prix entreprise et calcul de marge

L'utilisateur te transmet un DCE ou un appel d'offres — tu dois préparer une étude de prix complète côté entreprise (et non côté MOE), incluant marge, coefficient de vente et stratégie.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Référence du marché** + type (public, privé) + MOA/MOE
- **Nature des travaux** + lot
- **Montant prévisionnel** (DQE estimatif MOE)
- **Délai** d'exécution + planning prévisionnel
- **Taille de l'entreprise** (artisan, PME, grande entreprise) → impacte les ratios FG
- **Position concurrentielle** : combien de candidats ? Concurrence forte ou faible ?
- **Stratégie commerciale** : prix bas pour acquérir le client, prix standard, prix premium ?

### 2. Décomposition d'un PU — méthode UNTEC

#### Formule générale

```
PU = DS + FC + FG + BA
```

| Composante | Description | Pondération courante |
|---|---|---|
| **DS** (Déboursé Sec) | Matière + MO + Matériel d'exécution | base |
| **FC** (Frais de Chantier) | Installations, gardiennage, base vie | 8-12 % du DS |
| **FG** (Frais Généraux) | Direction, comptabilité, assurances, formation | 7-14 % du (DS+FC) |
| **BA** (Bénéfice et Aléas) | Marge + aléas | 5-10 % du (DS+FC+FG) |

#### Coefficient de vente

```
K_vente = PU / DS
```

### 3. Calcul du Déboursé Sec (DS)

#### Matière (matériaux)

Pour chaque matériau :
- **Prix d'achat négocié** (souvent -20 à -45 % du prix catalogue)
- + **Coefficient de pertes** : 5-15 % selon ouvrage
- + **Transport et manutention** : 3-8 % du prix achat
- + **Stockage et gestion** : 1-3 %

#### Main d'œuvre

Pour chaque tâche :
- **Productivité** mesurée en heures par unité d'ouvrage (mètre, m², m³, U)
- **Salaire horaire brut** × coefficient de charges sociales (~ 50-60 %)
- = Coût MO par unité

#### Matériel d'exécution

- **Petit matériel** : forfait ou %
- **Gros matériel** : location journalière + amortissement + transport sur chantier

### 4. Calcul des Frais de Chantier (FC)

#### Méthode % (rapide)

```
FC = DS × 8-12 %
```

#### Méthode détaillée

| Poste | Coût mensuel estimé |
|---|---|
| Installation + repli base vie | forfait initial |
| Gardiennage (si nécessaire) | x €/mois |
| Conducteur de travaux | y €/mois (au prorata du chantier) |
| Chef de chantier | z €/mois |
| Loyer et entretien base vie | w €/mois |
| Énergie chantier (élec, eau) | v €/mois |
| Sécurité collective (échafaudage, garde-corps) | forfait |
| Assurance TRC (si à charge entreprise) | forfait |

→ Total FC réparti sur la durée du chantier.

### 5. Calcul des Frais Généraux (FG)

#### Méthode

Taux FG = Frais Généraux annuels / Chiffre d'affaires annuel

#### Ratios par taille d'entreprise

| Taille | Taux FG du CA |
|---|---|
| Artisan < 5 salariés | 7-12 % |
| PME 5-30 salariés | 9-14 % |
| Entreprise 30-100 salariés | 10-15 % |
| Grande entreprise > 100 salariés | 11-17 % |

#### Application

```
FG appliqués au chantier = (DS + FC) × Taux FG
```

### 6. Calcul du Bénéfice et Aléas (BA)

#### Modulation selon le risque

| Type de chantier | Taux BA |
|---|---|
| Simple, court | 5-7 % |
| Standard | 7-10 % |
| Complexe, risqué | 10-15 % |
| Exceptionnel (HQE++, ITGH) | 12-20 % |

#### Modulation selon stratégie commerciale

| Stratégie | Effet sur BA |
|---|---|
| Acquérir un nouveau client | BA réduit (5-7 %) |
| Maintenir l'activité | BA standard (7-10 %) |
| Spécialité technique | BA majoré (10-15 %) |
| Dumping (à éviter) | BA < 0 (risque OAB) |

### 7. Calcul du PU final et coefficient de vente

#### Synthèse par poste

```
PU = DS × (1 + FC%) × (1 + FG%) × (1 + BA%)
   = DS × K_vente
```

#### Coefficient de vente cible

| Taille entreprise | K_vente typique |
|---|---|
| Artisan / petite entreprise | 1,20 - 1,35 |
| PME 5-30 salariés | 1,30 - 1,55 |
| Entreprise moyenne 30-100 salariés | 1,40 - 1,65 |
| Grande entreprise > 100 salariés | 1,50 - 1,80 |
| Travaux publics | 1,45 - 1,75 |
| Grands projets / spécialités | 1,60 - 2,00 |

### 8. Réception du DCE — vérifications préalables

#### Liste de contrôle

- [ ] Pièces administratives du DCE complètes (CCAP, CCTP, DPGF, plans)
- [ ] Délai de remise des offres respecté
- [ ] CCAP cohérent (révision de prix, intempéries, pénalités, garanties)
- [ ] CCTP précis (DTU cités, références matériaux)
- [ ] DPGF complet (pas de poste « pour mémoire »)
- [ ] Plans cohérents (coupes, élévations, détails)
- [ ] Conditions de chantier réalistes (accès, base vie, horaires)
- [ ] Délai d'exécution réaliste

#### Demandes de précisions (avant date limite remise offres)

- Questions techniques via la **plateforme DCE**
- Points d'ambiguïté à clarifier
- Sols réels (si étude G2 non transmise — risque sujétions)

### 9. Métré contradictoire

Le DPGF fourni par la MOE est **rarement juste**. L'entreprise doit :
- **Recalculer** chaque quantité (vérification croisée)
- **Identifier** les postes oubliés ou doublons
- **Signaler** les écarts au MOE (qui peut les corriger)
- **Conserver** les hypothèses (en cas de TS justifié pendant l'exécution)

### 10. Consultation fournisseurs

- **Demandes de prix** auprès des fournisseurs principaux
- **Délais d'approvisionnement** vérifiés (notamment matériaux à délai long)
- **Conditions de paiement** (acompte commande, délai facturation)
- **Garanties** fournisseurs

### 11. Validation interne avant remise

- **Réunion** équipe études + direction + commercial
- **Vérification** des hypothèses (productivité, prix matière, coefficient FG)
- **Modulation stratégique** : BA ajusté selon contexte concurrentiel
- **Décision finale** sur le prix de remise

### 12. Mémoire technique

À soigner — souvent 30-50 % de la notation finale.

#### Contenu type

1. **Présentation de l'entreprise** : références, qualifications (Qualibat, RGE, ISO)
2. **Compréhension du programme** : reformulation des enjeux du MOA
3. **Méthodologie de chantier** : phasage, organisation, équipes
4. **Planning prévisionnel** détaillé (GANTT)
5. **Moyens humains et matériels** mobilisés
6. **Démarche qualité** : PAQ, autocontrôles, suivis
7. **Démarche sécurité** : PPSPS, prévention, formation
8. **Démarche environnementale** : déchets, énergie, matériaux biosourcés
9. **Insertion sociale** (clause si applicable)
10. **Références similaires** : 3-5 chantiers comparables récents

### 13. Restitution — proposition synthétique

#### Tableau de présentation

| Poste DPGF | Quantité | PU HT | Total HT |
|---|---|---|---|
| 1. Préparation | 1 | 4 500 | 4 500 |
| 2. Gros œuvre | (détaillé par sous-poste) | … | … |
| … | … | … | … |
| **Total HT** | | | _ € |
| TVA 5,5/10/20 % | | | _ € |
| **Total TTC** | | | _ € |

#### Note de présentation interne

- **Marge brute calculée** : _ %
- **Comparaison vs estimation MOE** : _ %
- **Risques identifiés** : liste
- **Recommandation** : remettre / ne pas remettre / remettre avec variante

## Garde-fous

- **Pas de validation finale** — la décision de remise revient à la direction de l'entreprise.
- **Offre Anormalement Basse (OAB)** : si prix < 70 % de la moyenne ou < -30 % du DQE MOE, risque de justification (CCP L.2152-5) voire rejet.
- **Métré contradictoire** : conserver les calculs et hypothèses pour pouvoir justifier les éventuelles réclamations.
- **Consultations fournisseurs récentes** (< 30 jours) pour fiabilité des prix.
- **Validité de l'offre** : indiquer la durée (souvent 90-120 jours).
- **Mémoire technique** soigné : facteur clé d'attribution, ne pas négliger.

## Livrable à proposer

Après étude, propose un **dossier d'offre complet** :
- **DPGF chiffré** (XLSX) avec calculs détaillés
- **Sous-détails de prix** principaux (XLSX) pour traçabilité
- **Mémoire technique** (DOCX) selon plan ci-dessus
- **Planning prévisionnel** (XLSX ou MS Project)
- **Note interne de validation** (DOCX) avec recommandation
- **Acte d'engagement** rempli (DOCX)
- **Annexes administratives** : DC1, DC2, attestations sociales et fiscales
- Mention finale : *« Document préparé par l'agent IA Économiste — à valider par la direction de l'entreprise avant remise officielle. »*
