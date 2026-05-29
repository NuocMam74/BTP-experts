# Skill — Analyser et auditer un planning de chantier

L'utilisateur te transmet un planning de chantier (GANTT, planning enclenché, planning prévisionnel) — tu dois l'auditer, identifier le chemin critique, détecter les incohérences et proposer des optimisations.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Type de planning** : prévisionnel / enclenché / détaillé / récolement
- **Phase du projet** : DCE, marché signé, en cours, fin de chantier
- **Format** : GANTT papier/PDF, fichier MS Project (.mpp), Primavera, fichier Excel
- **Type de bâtiment** : logement collectif, bureau, hôpital, équipement
- **Surface** et **nombre d'étages**
- **Durée totale** prévue
- **Date d'ouverture** et **date d'achèvement**

### 2. Vérifier la complétude du planning

Liste de contrôle :

| Élément | À vérifier |
|---|---|
| **Tâches majeures** | Toutes les phases incluses : préparation, terrassement, fondations, gros œuvre, charpente, couverture, étanchéité, façades, menuiseries ext., cloisons, plomberie, élec, CVC, revêtements, finitions, VRD, espaces verts |
| **Durées par tâche** | Cohérentes avec la nature et la quantité d'ouvrages |
| **Liens entre tâches** | Successions logiques (terrassement → fondations → murs porteurs → planchers → toiture) |
| **Phases sensibles** | Mise hors d'eau (HD), mise hors d'air (HA), réception |
| **Réceptions intermédiaires** | Mise en eau des fluides, essais, …. |
| **Études EXE** | Si à charge de l'entreprise, inclues |
| **OPR** (Opérations Préalables Réception) | Planifiées avant date de réception |
| **DOE et DIUO** | Finalisation programmée |
| **Marge** sur tâches non critiques | Identifiée |

### 3. Identifier le chemin critique

#### Méthode

1. **Lister** toutes les tâches avec leurs durées et leurs dépendances
2. **Calculer** les dates au plus tôt (forward pass) :
   - Pour chaque tâche : date au plus tôt = max(dates fin des prédécesseurs)
3. **Calculer** les dates au plus tard (backward pass) :
   - Depuis la fin du projet, remonter : date au plus tard = min(dates début des successeurs - durée)
4. **Identifier** les tâches dont **date au plus tôt = date au plus tard** : ce sont les tâches du **chemin critique**

#### Importance

- **Tout retard** sur une tâche critique = retard du projet entier
- **Tout retard** sur une tâche non critique avec marge ne retarde pas le projet (tant que la marge n'est pas consommée)

### 4. Détecter les incohérences

#### A. Durées irréalistes

Vérifier que chaque durée est cohérente avec :
- Quantité d'ouvrages (volumes béton, m² peinture, etc.)
- Effectif prévisible
- Productivité standard du métier
- Conditions climatiques saisonnières

#### Exemples de durées de référence

| Phase | Durée (logement collectif R+5, 40 logements) |
|---|---|
| Terrassement | 3-4 semaines |
| Fondations + dalle bas | 4-6 semaines |
| Gros œuvre élévation (par étage) | 5-7 semaines/étage |
| Charpente + couverture | 6-8 semaines |
| Étanchéité TT | 2-3 semaines |
| Menuiseries extérieures (mise hors d'air) | 4-6 semaines |
| Cloisons / plâtrerie | 6-10 semaines |
| Plomberie second œuvre | 6-8 semaines |
| Électricité courants forts/faibles | 6-8 semaines |
| CVC / VMC | 4-6 semaines |
| Revêtements (carrelage + parquet + peinture) | 8-12 semaines |
| Espaces verts + VRD | 3-5 semaines |
| OPR + levée réserves | 3-5 semaines |

#### B. Chevauchements impossibles

- **Plâtrerie + chauffage** : nécessite l'eau et l'élec, donc après leur primaire
- **Carrelage + plâtrerie** : nécessite plomberie ECS/EF terminée + supports secs
- **Peinture + carrelage** : ordre obligatoire (peinture après ou avant selon zone)

#### C. Liens manquants

Tâches qui devraient être liées mais ne le sont pas :
- Couverture sans dépendance avec charpente
- Cloisons sans dépendance avec menuiseries extérieures (mise hors d'air)
- Réception sans dépendance avec OPR

#### D. Saisonnalité ignorée

- **Bétonnage en hiver** : risque gel, nécessite protection (+10-20 % durée)
- **Étanchéité en hiver** : conditions limites (T° < 5 °C → arrêt)
- **Peinture extérieure en hiver** : impossible (T° < 5 °C)
- **Vacances** : août, période Noël/Nouvel An — réduction d'activité

### 5. Calculer la criticité et les marges

#### Pour chaque tâche

```
Marge totale = Date au plus tard de fin - Date au plus tôt de fin
```

- Marge = 0 : tâche **critique**
- Marge > 0 : tâche avec **marge libre**

#### Identification visuelle

- Surligner en **rouge** les tâches critiques
- Surligner en **vert** les tâches à forte marge (> 4 semaines)
- Surligner en **jaune** les tâches à faible marge (1-3 semaines)

### 6. Audit des risques

| Risque | Indicateur | Action recommandée |
|---|---|---|
| **Durée trop courte** | < moyenne du métier | Renégocier ou augmenter effectifs |
| **Saisonnalité défavorable** | Étanchéité prévue en janvier | Décaler ou prévoir surcoût |
| **Phase critique trop tendue** | Marge zéro sur > 30 % du planning | Prévoir buffer |
| **Approvisionnement long** | Menuiseries spécifiques (8-12 semaines délai) | Commande anticipée |
| **Études EXE en retard** | Plans EXE non prévus avant exécution | Bloquer phase études |
| **Coordination inter-lots** | Interfaces non détaillées | Réunion OPC dédiée |
| **Pas de réception partielle** | Tout en fin de chantier | Envisager phasage |

### 7. Proposer des optimisations

#### A. Accélérer le chemin critique

- **Augmenter** les effectifs sur tâches critiques
- **Travailler en 2x8** (samedis) si zone autorisée
- **Modifier l'ordre** des tâches (si interfaces le permettent)
- **Préfabrication** d'éléments (cages d'escaliers, salles de bains préfa)

#### B. Réduire les risques

- **Anticiper les commandes** matériaux à délai long
- **Lisser** la charge des entreprises (éviter les pics)
- **Démarrer en parallèle** les lots techniques (plomberie, élec) dans la même zone

#### C. Saisonnalité

- **Programmer** l'étanchéité en avril-octobre
- **Programmer** la couverture avant l'hiver
- **Programmer** la peinture extérieure en mai-septembre

### 8. Restituer un diagnostic clair

#### Tableau récapitulatif

| Métrique | Valeur |
|---|---|
| Durée totale du planning | _ mois |
| Nombre de tâches | _ |
| Nombre de tâches sur chemin critique | _ |
| Marge moyenne | _ jours |
| Risques identifiés | Liste |
| Recommandations | Liste prioritaire |

#### Schéma synthétique

Pour chaque phase majeure :
- État : ✅ Réaliste / ⚠️ À surveiller / ❌ Critique
- Justification

### 9. Mise à jour pendant le chantier

#### Méthode

- **Mise à jour mensuelle** du planning détaillé (réunion OPC)
- **Comparaison** planning prévu / réel
- **Détection** des dérives sur le chemin critique
- **Alerte précoce** au MOA en cas de retard significatif

#### Indicateurs clés

| KPI | Calcul | Cible |
|---|---|---|
| Avancement physique vs planning | % réel / % prévu | ≥ 95 % |
| Marge restante sur chemin critique | jours | > 0 |
| Retard cumulé | jours | minimisé |
| % tâches en retard | nb / total | < 10 % |

## Garde-fous

- **Pas de validation** sans connaissance du contexte projet — un planning « ambitieux mais réaliste » dépend des moyens mobilisés.
- **Durées de référence** sont indicatives — l'entreprise peut prouver des durées différentes (par retours d'expérience).
- **Variations saisonnières** sont à considérer mais peuvent être absorbées par des moyens de protection (béton chauffé, chauffage local).
- **Méthode PERT/GANTT** : utile pour analyse mais les logiciels (MS Project, Primavera) calculent automatiquement le chemin critique.
- **BIM 4D** : pour grands projets, validation visuelle via simulation 4D.

## Livrable à proposer

Après analyse, propose un **rapport d'audit planning** :
- Synthèse exécutive (verdict global, risques majeurs)
- Tableau des tâches avec marges et criticité
- Schéma du chemin critique
- Liste des incohérences détectées
- Liste des risques (saisonnalité, durées, interfaces)
- Recommandations priorisées
- **Planning corrigé** proposé (si demande) — format DOCX + MS Project si fichier MPP fourni
- Mention finale : *« Document préparé par l'agent IA MOEX — à valider par l'OPC et le maître d'œuvre avant ajustement contractuel. »*
