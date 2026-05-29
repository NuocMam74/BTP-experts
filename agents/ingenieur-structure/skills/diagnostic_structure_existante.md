# Skill — Diagnostiquer une structure existante

L'utilisateur te transmet un bâtiment existant (rénovation, surélévation, désordres) — tu dois réaliser un diagnostic structurel selon les bonnes pratiques et l'EC8 Partie 3.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Bâtiment** : âge, usage, hauteur, surface
- **Type de structure** : BA, acier, maçonnerie, bois, mixte
- **Objet du diagnostic** :
  - Désordres apparents (fissures, déformations)
  - Projet de rénovation / extension / surélévation
  - Changement d'usage (charges accrues)
  - Sinistre (incendie, séisme, inondation)
  - Mise en sécurité préventive
- **Documents disponibles** : plans EXE, notes de calcul, DOE
- **Désordres signalés** : nature, localisation, ancienneté

### 2. Étude documentaire

#### Documents à collecter

- ❓ Plans EXE structure (coffrage, ferraillage)
- ❓ Notes de calcul originelles
- ❓ DOE et plans réseaux
- ❓ Plans architecte initiaux et modifications
- ❓ Procès-verbaux d'essais et contrôles
- ❓ Historique des interventions (rénovations, modifications)
- ❓ Étude géotechnique historique
- ❓ Permis de construire successifs

#### Recherches complémentaires

- ❓ Archives municipales (PC anciens)
- ❓ Cadastre (modifications de bâti)
- ❓ Compagnies d'assurance (sinistres antérieurs)
- ❓ Témoignages anciens (gérant, occupants)

### 3. Visite de reconnaissance

#### Liste de contrôle externe

- ❓ Façades : fissures, désaffleurements, écaillage enduits
- ❓ Acrotères : décollement, oxydation
- ❓ Toiture : déformations, mousses, écailles
- ❓ Encadrements d'ouvertures : fissures en escalier
- ❓ Pieds de mur : remontées capillaires, dégradation
- ❓ Plages, terrasses : décollement, infiltrations

#### Liste de contrôle interne

- ❓ Murs porteurs : fissures (orientation, ampleur, évolution)
- ❓ Planchers : déformations, flèches, fissures
- ❓ Plafonds : fissures, écaillage, traces d'humidité
- ❓ Escaliers : tassement, séparation des marches
- ❓ Portes et fenêtres : déformations bâti, blocage
- ❓ Sous-sol / vide sanitaire : humidité, fissures fondations

#### Photographies systématiques

- Datées
- Localisées (croquis annoté)
- Échelle (mètre ruban dans le cadre)
- Vues globales + zooms désordres

### 4. Typologie et gravité des désordres

#### Fissures murs porteurs

| Type | Description | Gravité |
|---|---|---|
| **Microfissures** (< 0,2 mm) | Capillaire, esthétique | Faible |
| **Fissures** (0,2-2 mm) | Visibles, suivi requis | Modérée |
| **Lézardes** (2-10 mm) | Évolutives, structurelles probables | Élevée |
| **Failles** (> 10 mm) | Structurelles, urgentes | Très élevée |

#### Orientation des fissures

| Orientation | Cause probable |
|---|---|
| Verticale | Décompression du terrain (tassement différentiel) |
| Horizontale | Poussée des terres ou des planchers |
| En escalier (45°) | Différentiel d'appui (sol ou structure) |
| En coin | Concentration de contraintes |
| Sur tout un mur | Affaissement d'angle |

#### Fissures planchers

- **Au centre** : flexion excessive (vérifier descente charges)
- **Aux appuis** : moment négatif insuffisant (BA mal armé)
- **Diagonales** : cisaillement excessif (BA insuffisant)

### 5. Sondages et essais

#### Sondages destructifs

| Type | Description | Usage |
|---|---|---|
| **Carottage béton** | Échantillon Ø 100 mm | Résistance béton (compression) |
| **Sondage de ferraillage** | Ouverture localisée | Identification armatures réelles |
| **Sondage de sol** | Pénétromètre, pressiomètre | Caractérisation sol existant |
| **Sondage maçonnerie** | Extraction bloc | Identification matériau et état |

#### Essais non destructifs

| Type | Description | Application |
|---|---|---|
| **Pachomètre** | Détection armatures | Position + diamètre |
| **Mesure de pH** | Carbonatation béton | Risque corrosion armatures |
| **Mesure de chlorures** | Pénétration chlorures | Risque corrosion |
| **Mesure d'humidité** | Hygromètre | Humidité matériau |
| **Ultrasons** | Vitesse de propagation | État interne béton |
| **Caméra thermique** | Thermographie infrarouge | Ponts thermiques, défauts |
| **Géoradar** | Onde radio | Cartographie réseaux et armatures |
| **Vibrations** | Mesure modale | Fréquences propres |

### 6. Caractériser le système structurel

#### Identification du système

- ❓ Système porteur principal (poteaux-poutres, voiles, mixte)
- ❓ Système de contreventement (refends, treillis, portiques)
- ❓ Continuité des éléments (chaînages, joints)
- ❓ Type de plancher (dalle pleine, hourdis, métallique)
- ❓ Type de toiture (charpente, terrasse, mixte)

#### Évaluation de la régularité

- ❓ En plan : symétrie, compacité
- ❓ En élévation : continuité, variations de rigidité

### 7. Calculs de vérification

#### Descente de charges

- Recalculer avec usages actuels (peuvent différer de l'origine)
- Intégrer les modifications (charges ajoutées : cloisons, équipements, etc.)

#### Vérification des éléments structurels

##### Poutres

```
M_Ed (actuel) ≤ M_Rd (de l'élément existant tel que reconnu)
```

##### Poteaux

Idem avec flambement.

##### Voiles et refends

Vérification compression + cisaillement.

##### Fondations

Sur la base de la portance disponible (étude G5 — diagnostic).

#### Application EC8 Partie 3

Pour bâtiments existants en zones sismiques :
- **Évaluation** de la résistance sismique actuelle
- **Niveaux d'exigence** :
  - DL (Damage Limitation) : pas de dégâts importants pour séisme modéré
  - SD (Significant Damage) : pas d'effondrement pour séisme moyen
  - NC (Near Collapse) : pas d'effondrement total pour séisme fort

### 8. Identifier les causes des désordres

#### Causes potentielles

| Cause | Symptômes typiques |
|---|---|
| **Tassements différentiels** | Fissures verticales / en escalier |
| **Affaissement RGA** | Fissures dans MI sur argile |
| **Surcharges** | Flèches, fissures planchers |
| **Carbonatation** | Éclatement béton, corrosion armatures |
| **Réaction alcali-silice (RAS)** | Fissures réticulaires |
| **Sulfates** | Gonflement, écaillage |
| **Termites** | Bois sec, galeries |
| **Champignons (mérule)** | Bois humide, mycélium |
| **Sinistres** | Fissures localisées suite à choc, incendie, inondation |
| **Conception originelle insuffisante** | Désordres généralisés |

### 9. Stratégie de réparation / renforcement

#### Réparation

- Reprises locales (injection résines fissures)
- Étanchéité (façades, terrasses)
- Traitement bois (champignons, termites)
- Traitement armatures corrodées (passivation)

#### Renforcement structurel

##### Béton armé

- **Chemisage** en BA (poteaux, poutres)
- **Tirants** précontraints externes
- **Frettage** par bandes de fibres (FRP — fibres de carbone, verre, aramide)
- **Renforts métalliques** (poutres, IPN)

##### Acier

- **Doublage** profilés
- **Triangulation** ajoutée
- **Cordons de soudure** sur sections existantes

##### Bois

- **Coiffes métalliques** sur connexions
- **Liaisons résines** ductiles
- **Doublage** par profilés métalliques

##### Maçonnerie

- **Chaînages** ajoutés (forage + scellement)
- **Tirants** métalliques traversant
- **Frettage** mortier projeté
- **Reprises** mur par mur

#### Renforcement sismique (EC8 Partie 3)

- **Voiles supplémentaires** BA
- **Contreventement** acier ajouté
- **Frettage FRP** des poteaux
- **Isolation parasismique** (rare en France métropolitaine)

### 10. Restitution

#### Rapport de diagnostic

Structure :

```
1. CONTEXTE ET OBJET
   - Mandant, bâtiment, objet du diagnostic

2. ÉTUDE DOCUMENTAIRE
   - Documents collectés
   - Historique du bâtiment

3. VISITE DE RECONNAISSANCE
   - Description état général
   - Désordres relevés (photos + croquis)

4. SONDAGES ET ESSAIS
   - Méthodes
   - Résultats
   - Interprétation

5. SYSTÈME STRUCTUREL
   - Description
   - Évaluation régularité

6. CALCULS DE VÉRIFICATION
   - Descente charges actuelle
   - Vérification éléments
   - Application EC8 (si applicable)

7. CAUSES DES DÉSORDRES
   - Diagnostic
   - Évolution probable

8. STRATÉGIE DE RÉPARATION/RENFORCEMENT
   - Options techniques
   - Coût estimatif
   - Planning

9. RECOMMANDATIONS
   - Urgence des actions
   - Suivi instrumental (si nécessaire)
   - Périodicité des visites

10. CONCLUSION
    - Synthèse
    - Verdict global
```

### 11. Drapeaux rouges urgents

| Symptôme | Action immédiate |
|---|---|
| Fissure > 10 mm évolutive | Évacuation immédiate + étaiement |
| Flèche > L/200 sur plancher | Étaiement + diagnostic urgent |
| Décollement enduit + corrosion armatures visibles | Sécurisation + traitement urgent |
| Inclinaison de l'ouvrage > 1/300 | Évacuation + expertise judiciaire |
| Effondrement partiel imminent | Évacuation + démolition contrôlée |
| Présence d'amiante en mauvais état | Confinement + retrait SS3 |

## Garde-fous

- **Pas de validation finale** — diagnostic à confirmer par BET inscrit OPQIBI + ingénieur structure DPLG/HMONP.
- **Sécurité** : signaler immédiatement les risques d'effondrement.
- **Sondages** destructifs : autorisation propriétaire + protection occupants.
- **Suivi** : prévoir mesures (fissuromètre, jauges) si évolution probable.
- **Coordination** : architecte (rénovation), CSPS (sécurité chantier).
- **Pour bâtiment classé MH** : avis ABF + procédure spécifique.
- **EC8 Partie 3** : applicable aux bâtiments existants en zone sismique.
- **Conservation** dossier 10 ans minimum.

## Livrable à proposer

Après diagnostic :
- **Rapport de diagnostic structurel** (DOCX + PDF) selon structure ci-dessus
- **Cahier des sondages** (résultats détaillés)
- **Photographies** datées et localisées
- **Croquis** des désordres
- **Plans** de réparation/renforcement (DWG + PDF)
- **Bilan économique** (XLSX) : coût estimatif par scénario
- **Note urgence** si désordres critiques (DOCX)
- Mention finale : *« Document préparé par l'agent IA Ingénieur structure — à valider et signer par un BET inscrit OPQIBI. Sondages complémentaires à programmer selon recommandations. »*
