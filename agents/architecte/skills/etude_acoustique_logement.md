# Skill — Étude acoustique d'un logement (NRA)

L'utilisateur te transmet des plans, une notice descriptive ou un programme — tu dois analyser la conformité acoustique du logement selon l'arrêté NRA du 30 juin 1999 modifié.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Date du PC** (NRA s'applique à partir du 1ᵉʳ janv. 2000)
- **Type d'immeuble** : maison individuelle, logement collectif, EHPAD, école, hôtel
- **Nombre de logements** (> 10 logements → attestation acoustique obligatoire — arrêté 27 nov. 2012)
- **Voirie environnante** : classement (catégorie 1 à 5 du préfet)
- **Voisinage** : équipements bruyants (commerces RDC, ascenseur, chaufferie collective)

### 2. Vérifications par catégorie d'isolement

#### A. Bruits aériens **intérieurs** (DnT,A)

Vérifier les **53 dB** minimum pour les séparations entre :
- Pièce principale d'un logement / pièce principale d'un autre logement
- Cuisine ↔ pièce principale d'un autre logement
- + 5 dB si local d'activités (boutique RDC) → 58 dB

#### B. Bruits aériens **extérieurs** (DnT,A,tr)

Selon classement de la voie la plus bruyante :
- Cat. 1 (autoroute) : 45 dB
- Cat. 2 : 42 dB
- Cat. 3 : 38 dB
- Cat. 4 : 35 dB
- Cat. 5 ou hors zone : 30 dB (minimum NRA)

#### C. Bruits de chocs (L'nT,w)

- Plancher entre logements : ≤ **58 dB**
- Circulation commune (palier) au-dessus de pièce principale : ≤ 58 dB
- Local d'activités au-dessus : ≤ 55 dB

#### D. Bruits d'équipements (L_AT)

- Équipement individuel (chaudière, VMC) en pièce principale : ≤ 30 dB
- Équipement collectif (ascenseur, chaufferie, VMC) : ≤ 30 dB
- Idem en cuisine / SDB : ≤ 35 dB

#### E. Temps de réverbération parties communes

- Cage d'escalier (vol. < 250 m³) : T_R ≤ 1,2 s
- Cage d'escalier (vol. > 250 m³) : T_R ≤ 1,5 s

### 3. Analyse des dispositions constructives

Pour chaque exigence, vérifier que la **solution constructive** retenue est compatible :

#### Mur séparatif entre logements

| Solution | DnT,A attendu | Verdict |
|---|---|---|
| Parpaing 20 cm enduit | 48-52 dB | ⚠️ marginal (souvent insuffisant) |
| Béton 16 cm + doublage thermo-acoustique BA13/100 mm | 55-60 dB | ✅ |
| Béton 20 cm | 55-58 dB | ✅ |
| Double cloison BA13 + 50 mm laine + BA13 (sans appui béton) | 35-42 dB | ❌ insuffisant |

#### Plancher entre logements

| Solution | L'nT,w | Verdict |
|---|---|---|
| Béton 22 cm + carrelage scellé | 65-72 | ❌ |
| Béton 22 cm + chape flottante 40 mm + résiliant 5 mm + carrelage | 52-56 | ✅ |
| Béton 22 cm + parquet flottant sur sous-couche acoustique | 55-60 | ✅ |

#### Façade — vitrage selon classement

| Classement voie | Solution vitrage | DnT,A,tr |
|---|---|---|
| Cat. 4-5 | Double vitrage 4-16-4 | 33-36 |
| Cat. 3 | Double vitrage 4-16-4 + cadre acoustique | 36-39 |
| Cat. 2 | Vitrage acoustique 6-12-44.2 | 40-42 |
| Cat. 1 | Vitrage acoustique 10-12-44.2 ou triple vitrage | 42-45 |

### 4. Points de vigilance fréquents

- **Coffres volets roulants** : point faible majeur en façade (-3 à -5 dB sur le DnT,A,tr de la fenêtre)
- **Entrées d'air auto-réglables** : insonorisées (AAA) si DnT,A,tr > 38 dB exigé
- **Gaines techniques** : continuité du parement acoustique
- **Descentes EU** : isolation phonique (PVC bi-paroi ou fonte) sur la chute
- **VMC** : silencieux + désolidarisation conduits
- **Chaufferies / locaux techniques** : sas + 2 portes + isolation phonique

### 5. Pour chaque vérification

Format imposé :
```
[Local émetteur / récepteur] → Exigence NRA → Solution prévue → Verdict (✅ / ⚠️ / ❌) → Recommandation
```

Exemple :
```
Plancher logement A R+3 / chambre logement B R+2
→ Exigence : L'nT,w ≤ 58 dB
→ Solution : béton 22 cm + parquet collé direct
→ ❌ Probablement non conforme (L'nT,w attendu : 65-70 dB)
→ Recommandation : prévoir une chape flottante 40 mm + sous-couche résiliante (Insulit ou équivalent), OU parquet flottant sur sous-couche acoustique épaisse.
```

### 6. Attestation acoustique (collectif > 10 logements)

Rappel obligation arrêté 27 nov. 2012 :
- Mesures **sur site** à la livraison (1 logement par cage d'escalier minimum)
- Acousticien qualifié (NF S 31-057 + NF S 31-074)
- Attestation jointe à la **DAACT**
- Conséquence : si une mesure échoue, **travaux de rattrapage** à la charge du promoteur / entreprise.

## Garde-fous

- **Pas de validation finale** — la conformité acoustique est prononcée par les mesures sur site.
- **Tolérance de mesure** : -3 dB sur DnT,A et +3 dB sur L'nT,w.
- L'NRA s'applique pour les **logements neufs** (PC après 1ᵉʳ janv. 2000). Pour les bâtiments existants : pas d'obligation NRA mais respect du décret 95-20 sur le voisinage.
- Pour les **EHPAD, écoles, hôpitaux, hôtels** : exigences spécifiques (arrêtés dédiés).

## Livrable à proposer

Après analyse, propose une **note acoustique** (format DOCX + PDF) :
- Identification du projet (date PC, type, voirie)
- Tableau des exigences NRA applicables
- Analyse des dispositions constructives (mur, plancher, façade, équipement)
- Liste des non-conformités potentielles + recommandations
- Préconisations pour la phase travaux (essais, points contrôle)
- Mention finale : *« Document préparé par l'agent IA Architecte — à valider par un BE acoustique et confirmer par mesures sur site (arrêté 27 nov. 2012). »*
