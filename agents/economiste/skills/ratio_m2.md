# Skill — Estimation rapide au m² SDP

L'utilisateur te demande un **ordre de grandeur** de coût pour un projet bâtiment **en phase amont** (faisabilité, ESQ, APS), via des **ratios €/m² SDP** par destination. C'est l'outil de **cadrage budgétaire initial** — il ne se substitue **jamais** à un chiffrage détaillé en phase aval.

## 1. Paramètres à collecter

L'utilisateur doit fournir :
- **Destination** du projet (logement collectif, bureaux, école, EHPAD, ERP, parking, etc.)
- **Surface de Plancher SDP** (m²) ou surface utile / SHAB à défaut (avec conversion)
- **Région ou ville** d'implantation
- **Phase d'étude** : faisabilité / ESQ / APS / APD
- **Niveau de prestation** : minimum / standard / haut de gamme
- **Particularités** : site occupé, ABF, certification (HQE, BREEAM, BBC, BEPOS, E+C-, BiodiverCity), démolition préalable, fondations spéciales, etc.

Si paramètres absents : demande **impérativement** au moins destination + surface + région avant tout chiffrage.

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("ratios SGI observatoire BTP par destination logements bureaux")`
- `rag_search("ratios OEAP marchés publics travaux par lot")`
- `rag_search("ratios UNTEC observatoire économique annuel")`
- `rag_search("Batiprix édition annuelle ratios estimation")`
- `rag_search("PLF 2025 indices BT01 actualisation prix")`

## 3. Ratios indicatifs €/m² SDP HT (référence métropole, hors Paris/IDF)

⚠️ Les valeurs ci-dessous sont indicatives, **issues d'observatoires** (SGI/OEAP/UNTEC), pour des **opérations standards** en métropole hors IDF, **prix année 2024-2025**. À utiliser comme **référence de cadrage**, jamais comme prix engageant.

### A — Logement (RÉSIDENTIEL)

| Type | Ratio bas | Ratio médian | Ratio haut | Notes |
|---|---|---|---|---|
| Logement collectif standard | 1 500 €/m² | 1 800 €/m² | 2 200 €/m² | RE2020 |
| Logement collectif intermédiaire | 1 700 | 2 100 | 2 600 | meilleure prestation |
| Logement collectif haut de gamme | 2 200 | 2 800 | 3 600 | finitions très soignées |
| Logement collectif social PLUS/PLAI | 1 350 | 1 600 | 1 900 | contraintes financières |
| Logement collectif EHPAD | 2 200 | 2 800 | 3 500 | équipements médicalisés |
| Logement collectif résidences seniors | 1 800 | 2 200 | 2 700 | équipement spécifique |
| Maison individuelle standard | 1 200 | 1 600 | 2 200 | très variable selon prestation |
| Maison individuelle haut de gamme | 2 200 | 3 000 | 4 500 | architecte, matériaux nobles |
| Réhabilitation logement collectif | 1 200 | 1 800 | 2 800 | selon état initial |
| Réhabilitation logement avec amiante/plomb | 1 800 | 2 600 | 4 000 | + désamiantage / déplombage |

### B — Bureaux / Tertiaire

| Type | Ratio bas | Ratio médian | Ratio haut |
|---|---|---|---|
| Bureaux standard | 1 800 | 2 200 | 2 800 |
| Bureaux haut de gamme | 2 500 | 3 200 | 4 200 |
| Bureaux ICOM (Centre Industriel Mixte) | 1 500 | 1 800 | 2 200 |
| Bureaux + commerces RDC | 2 000 | 2 500 | 3 200 |
| Bureaux flexibles / open space | 2 100 | 2 700 | 3 500 |
| Espace coworking | 2 300 | 2 900 | 3 700 |
| Salle de réunion / conférence équipée | 2 800 | 3 600 | 4 500 |

### C — Enseignement (ERP type R)

| Type | Ratio bas | Ratio médian | Ratio haut |
|---|---|---|---|
| Maternelle | 2 100 | 2 600 | 3 200 |
| Élémentaire | 1 800 | 2 200 | 2 800 |
| Collège (avec restauration) | 2 000 | 2 500 | 3 100 |
| Lycée (avec internat) | 2 200 | 2 800 | 3 500 |
| Université / Faculté | 2 000 | 2 600 | 3 400 |
| Centre de formation | 1 700 | 2 100 | 2 600 |
| Crèche / multi-accueil | 2 300 | 2 900 | 3 600 |

### D — Santé (ERP type U)

| Type | Ratio bas | Ratio médian | Ratio haut |
|---|---|---|---|
| Cabinet médical / paramédical | 2 200 | 2 800 | 3 500 |
| Centre de santé | 2 400 | 3 000 | 3 800 |
| Pharmacie | 2 000 | 2 500 | 3 200 |
| Clinique privée standard | 2 500 | 3 200 | 4 200 |
| Hôpital public / CHU | 3 200 | 4 000 | 5 500 |
| Bloc opératoire | 4 500 | 6 000 | 8 500 |
| EHPAD (en U sous-classement) | 2 200 | 2 800 | 3 500 |
| Maison de naissance / suivi | 2 500 | 3 100 | 3 800 |

### E — Commerce et tertiaire mixte (ERP type M, N)

| Type | Ratio bas | Ratio médian | Ratio haut |
|---|---|---|---|
| Magasin de proximité | 1 200 | 1 600 | 2 200 |
| Supermarché | 1 100 | 1 400 | 1 800 |
| Hypermarché / GD | 950 | 1 250 | 1 600 |
| Centre commercial (galerie + ancres) | 1 500 | 2 000 | 2 800 |
| Boutique de standing | 2 800 | 3 800 | 5 500 |
| Restaurant standard | 1 800 | 2 400 | 3 200 |
| Restaurant gastronomique | 2 800 | 3 800 | 5 500 |

### F — Hôtellerie (ERP type O)

| Type | Ratio bas | Ratio médian | Ratio haut |
|---|---|---|---|
| Hôtel économique (* à **) | 1 800 | 2 300 | 2 900 |
| Hôtel milieu de gamme (***) | 2 200 | 2 800 | 3 600 |
| Hôtel haut de gamme (****) | 2 800 | 3 800 | 5 200 |
| Hôtel luxe (*****) / palace | 4 200 | 5 800 | 8 500 |
| Auberge de jeunesse | 1 600 | 2 000 | 2 500 |

### G — Sport, culture (ERP type X, S, Y)

| Type | Ratio bas | Ratio médian | Ratio haut |
|---|---|---|---|
| Salle de sport (gymnase) | 1 500 | 1 900 | 2 500 |
| Piscine couverte | 3 200 | 4 200 | 5 800 |
| Stade / tribune (selon couverture) | 1 200 à 2 800 selon contexte | | |
| Bibliothèque / médiathèque | 2 400 | 3 000 | 3 800 |
| Musée | 3 200 | 4 200 | 5 800 |
| Salle de spectacle | 3 500 | 4 500 | 6 000 |
| Cinéma multiplexe | 2 200 | 2 800 | 3 500 |

### H — Industrie / Logistique / Parking

| Type | Ratio bas | Ratio médian | Ratio haut |
|---|---|---|---|
| Bâtiment industriel / atelier | 700 | 950 | 1 350 |
| Entrepôt logistique simple | 450 | 600 | 850 |
| Entrepôt logistique froid (négatif) | 1 200 | 1 600 | 2 200 |
| Entrepôt logistique froid (positif) | 800 | 1 100 | 1 500 |
| Parking aérien | 250 | 400 | 600 |
| Parking en sous-sol (1 niveau) | 1 100 | 1 500 | 2 000 |
| Parking en sous-sol (2-3 niveaux) | 1 600 | 2 200 | 3 000 |

## 4. Coefficients de **régionalisation** (à appliquer aux ratios standards métropole)

| Région | Coefficient |
|---|---|
| Paris (75) | × 1,30 à 1,40 |
| Petite couronne (92, 93, 94) | × 1,20 à 1,30 |
| Grande couronne IDF (77, 78, 91, 95) | × 1,10 à 1,20 |
| Lyon, Aix-en-Provence, Bordeaux, Nice, Strasbourg | × 1,10 à 1,15 |
| Métropoles intermédiaires (Marseille, Nantes, Toulouse, Lille...) | × 1,05 à 1,10 |
| Centre-province standard | × 1,00 (référence) |
| Province rurale (PACA hors littoral, Auvergne, Limousin, etc.) | × 0,90 à 0,95 |
| Outre-Mer (Guadeloupe, Martinique, Réunion, Mayotte) | × 1,25 à 1,50 |

## 5. Coefficients pour **certifications** et **contraintes spécifiques**

| Contrainte | Plus-value |
|---|---|
| **HQE® / BREEAM Excellent / LEED Gold** | +5 à +12 % |
| **HQE® Très performant / Exceptional** | +10 à +18 % |
| **BREEAM Outstanding / LEED Platinum** | +15 à +25 % |
| **BBC-Effinergie (RT2012)** | référence (intégré RE2020) |
| **RE2020 standard** | référence |
| **E+C- (bâtiment positif et bas carbone)** | +8 à +18 % |
| **BiodiverCity®, label commerce-éco-responsable** | +3 à +7 % |
| **Label "ville en transition"** | +5 à +10 % |
| **Bâtiment passif (Passivhaus)** | +10 à +20 % |
| **Bâtiment paille / chanvre / terre crue** | +10 à +30 % (selon expertise locale) |
| **MH classé ou inscrit + ABF** | +20 à +60 % |
| **Désamiantage préalable** | +30 à +150 €/m² SDP démoli |
| **Démolition préalable** | +50 à +200 €/m² SDP démoli |
| **Site occupé (chantier en exploitation)** | +10 à +20 % |
| **Sol pollué (plan de gestion)** | très variable, demander G5 environnementale |
| **Fondations spéciales (pieux, micropieux, parois)** | +50 à +200 €/m² SDP global |
| **Toiture-terrasse végétalisée** | +50 à +150 €/m² toiture |
| **Photovoltaïque intégré (toiture)** | +80 à +200 €/m² panneaux |
| **VRD lourd (> 100 m de raccordement)** | +30 à +100 €/m² SDP |
| **Accès difficile / centre-ville étroit** | +5 à +10 % |

## 6. Procédure de calcul

### Étape 1 — Sélection du ratio de base
- Identifier la **destination** dans les tableaux §3
- Choisir **bas / médian / haut** selon niveau de prestation visé

### Étape 2 — Application des coefficients
- **Régionalisation** (×)
- **Certifications / contraintes** (+ %)

### Étape 3 — Calcul de l'enveloppe
- Enveloppe HT = Ratio ajusté × SDP
- TVA selon nature (5,5 % / 10 % / 20 %)

### Étape 4 — Exclusions à mentionner

Les ratios ci-dessus **incluent généralement** :
- ✅ Gros œuvre, second œuvre, lots techniques (CVC, plomberie, électricité)
- ✅ Finitions standard du niveau de prestation visé
- ✅ Honoraires entreprise (FC, FG, BA)

Les ratios **excluent** :
- ❌ **Honoraires MOE** (architecte, BET, économiste, CSPS, bureau de contrôle) — env. **10 à 14 %** du total travaux
- ❌ **VRD spécifiques** longs ou lourds (au-delà de la voirie de proximité)
- ❌ **Fondations spéciales** (pieux, micropieux, parois berlinoises)
- ❌ **Démolition préalable** de bâtiments existants
- ❌ **Désamiantage / déplombage** préalables
- ❌ **Mobilier** (sauf hôtellerie clé en main)
- ❌ **Équipements process** (cuisine professionnelle, blocs opératoires, salles propres)
- ❌ **Foncier** (achat terrain)
- ❌ **Frais financiers et assurances** (MOA, DO, TRC, BIE...)
- ❌ **Frais de gestion** (AMO, OPC, programmiste)
- ❌ **TVA**

### Étape 5 — Niveau de confiance

| Phase | Précision attendue |
|---|---|
| Faisabilité / Programme | ± 25 à 30 % |
| ESQ | ± 25 % |
| APS | ± 20 % |
| APD | ± 15 % |
| PRO / DCE | Ratios non pertinents — utiliser DPGF |

## 7. Restitution structurée

```
## Estimation rapide au m² SDP — [Projet]

### Hypothèses
- **Destination** : [...]
- **SDP** : [m²]
- **Région** : [ville + département]
- **Phase** : [faisabilité / ESQ / APS / APD]
- **Niveau de prestation** : [standard / intermédiaire / haut de gamme]
- **Particularités** : [certification HQE, ABF, démolition préalable, etc.]
- **Date de référence prix** : [Batiprix 2024 / SGI 2024 / etc.]

### Ratios appliqués

| Hypothèse | Bas | Médian | Haut |
|---|---|---|---|
| Ratio brut (€/m² SDP HT) | 1 700 | 2 100 | 2 600 |
| Coef. régionalisation × 1,10 (Lyon) | 1 870 | 2 310 | 2 860 |
| Certification HQE Excellent + 10 % | 2 057 | 2 541 | 3 146 |
| Désamiantage forfait +120 €/m² | 2 177 | 2 661 | 3 266 |
| **Ratio final ajusté HT** | **2 180** | **2 660** | **3 270** |

### Enveloppes estimées (SDP = 4 500 m²)

| Hypothèse | Enveloppe HT travaux | TVA 20 % | TTC travaux |
|---|---|---|---|
| Bas | 9 810 000 € | 1 962 000 | 11 772 000 |
| **Médian** | **11 970 000 €** | **2 394 000** | **14 364 000** |
| Haut | 14 715 000 € | 2 943 000 | 17 658 000 |

### Honoraires et frais hors travaux (à provisionner)

| Poste | Estimation HT |
|---|---|
| Honoraires MOE (architecte + BE) ~12 % | 1 436 000 |
| AMO / OPC / programmiste ~2 % | 240 000 |
| Bureau de contrôle ~1 % | 120 000 |
| CSPS ~0,5 % | 60 000 |
| Assurance dommages-ouvrage ~1,2 % | 144 000 |
| Provision pour aléas ~5 % travaux | 600 000 |
| Études géotech G1 à G4 | 60 000 |
| Études complémentaires (acoustique, thermique avancée, etc.) | 80 000 |
| **TOTAL hors travaux HT** | **2 740 000** |

### Coût d'opération total (médian)
- Travaux HT : 11 970 000 €
- Hors travaux HT : 2 740 000 €
- **Coût opération HT** : 14 710 000 €
- TVA : 2 942 000 €
- **Coût opération TTC** : 17 652 000 €

### Exclusions explicites
- ❌ Foncier (achat terrain)
- ❌ Frais financiers (intérêts intercalaires, garanties bancaires)
- ❌ Mobilier (provision mobilier à dimensionner selon programme)
- ❌ Équipements process spécifiques

### Sensibilité de l'estimation
- ESQ : ± 25 % → enveloppe entre 11,2 M€ et 18,7 M€ TTC opération
- Recommandation : prévoir une **marge de manœuvre programmatique** de 10-15 % à ce stade

### Niveau de confiance
- **Moyen** (phase ESQ)
- À **affiner** par sous-détail des postes structurants en APS-APD
- À **valider** par retour marché ou consultation ciblée

### Sources
- Observatoires : SGI (Société de Gestion Immobilière), OEAP (Observatoire Économique de l'Achat Public), UNTEC (Union Nationale des Économistes de la Construction)
- Batiprix édition [année]
- Retours d'opérations comparables récentes
```

## 8. Garde-fous spécifiques

- Ne donne **jamais** un ratio sans avoir les paramètres minimum (destination + SDP + région + phase).
- Les ratios sont **indicatifs** — issus d'observatoires sectoriels — ne remplacent pas un **chiffrage détaillé** par sous-détail ou DPGF en phase aval.
- Si la **destination** demandée n'est pas dans les tableaux, propose la **catégorie la plus proche** en signalant la **différence**.
- Si la **phase** est PRO/DCE, **rappelle** que les ratios ne sont **plus pertinents** et qu'il faut chiffrer par **DPGF** (voir skill `chiffrer_dpgf`).
- Pour les **opérations atypiques** (palais, monuments, grands équipements, hôpital de pointe) : les ratios standards **sous-estiment** très significativement — exiger une **étude programme** spécifique.
- **Ne mélange pas** des éditions différentes d'observatoires sans le signaler — variation 3-7 % par année.
- **Honoraires MOE** : **systématiquement** rappeler qu'ils ne sont **pas** inclus dans les ratios travaux (10-14 % à ajouter).
- **Provision pour aléas** : recommander 5-10 % en phase amont, 3-5 % en phase aval.
- Pour les **opérations en marché public**, ne jamais oublier que le **prix unitaire** d'un BPU peut différer du ratio (selon mode de marché, taux de réponse, conjoncture économique).
- Tu **n'engages pas** ta responsabilité — tu fournis une estimation **prévisionnelle** que l'économiste utilisateur valide et affine.
- Les **ratios évoluent** avec l'inflation BTP — utiliser `rag_search` pour les dernières publications observatoires.

## 9. Suites logiques à proposer

- **Affinement** en phase APS-APD par sous-détail des postes structurants (gros œuvre, CVC, élec)
- Skill `chiffrer_dpgf` en phase PRO-DCE pour chiffrage poste par poste
- Skill `metre_quantitatif` pour quantifier les ouvrages à partir des plans
- **Consultation ciblée** de 2-3 entreprises (sondage prix) sur des projets similaires
- **Retours d'opérations** récentes du même MOA ou du même cabinet pour calibrage
- Skill `sous_detail_prix` pour décomposer les postes critiques
- En cas de **dépassement budget cible** : recommandations d'**optimisation programme** (réduction surface, simplification, phasing)
- Mise à jour à chaque **phase** d'études (ESQ → APS → APD → PRO → DCE → offre)
- **Bilan opération** prévisionnel intégrant tous les postes (travaux + honoraires + frais + foncier + financier)
- Suivi annuel des **indices BT01** pour actualiser l'enveloppe dans les phases longues
