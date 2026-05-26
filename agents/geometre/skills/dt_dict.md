# Skill — Préparer et suivre une DT-DICT (réseaux enterrés)

L'utilisateur s'apprête à réaliser des **travaux à proximité de réseaux enterrés** (canalisations, câbles électriques, gaz, eau, télécom, fibre, etc.) et doit accomplir la procédure **DT-DICT** (Déclaration de projet de Travaux – Déclaration d'Intention de Commencement de Travaux) prévue par le **décret 2011-1241** (réforme "anti-endommagement"), désormais codifiée aux art. **R.554-1 et suivants** du code de l'environnement.

## 1. Documents attendus

- **Plan masse** du projet ou du chantier (localisation, emprise)
- **Plan parcellaire** ou cadastre
- **Récépissés DT et DICT** des exploitants (s'ils ont déjà été demandés)
- **Investigation Complémentaire (IC)** si réseaux sensibles non identifiés ou en classe C
- **Marquage-piquetage** réalisé sur place (photos, plan)
- **Convention** avec un opérateur de détection (entreprise spécialisée)
- **Plan de prévention** ou **PPSPS**

Si pièces partielles : demande
1. Nature des travaux (terrassement, fonçage, forage, démolition, plantation profonde, etc.) ?
2. **Profondeur** des excavations envisagées (impact sur classes de réseaux) ?
3. Localisation exacte (commune, parcelle, coordonnées Lambert 93) ?
4. **Date prévue** de commencement des travaux ?
5. Vous êtes **maître d'ouvrage (MOA)** ou **exécutant** ?
6. Sites **sensibles à proximité** (canalisation gaz haute pression, lignes HT, etc.) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("décret 2011-1241 DT-DICT réforme anti-endommagement")`
- `rag_search("code environnement R.554-1 à R.554-39 obligations exploitants")`
- `rag_search("norme NF S 70-003-1 DT-DICT travaux à proximité réseaux")`
- `rag_search("norme NF S 70-003-2 mesures préventives lors travaux")`
- `rag_search("norme NF S 70-003-3 marquage piquetage")`
- `rag_search("guichet unique reseaux-et-canalisations.gouv.fr")` — procédure dématérialisée
- `rag_search("classes de précision réseaux A B C")` — précision cartographique

## 3. Cadre réglementaire et acteurs

### Acteurs

| Acteur | Rôle |
|---|---|
| **Maître d'ouvrage (MOA)** | Demandeur de la DT — déclare le projet aux exploitants |
| **Entrepreneur (exécutant)** | Demandeur de la DICT — déclare le démarrage effectif |
| **Exploitant de réseaux** | Répond aux DT et DICT, communique plans + classe précision |
| **Guichet unique** (reseaux-et-canalisations.gouv.fr / INERIS) | Centralise les déclarations et les exploitants concernés |
| **Géomètre-expert / Géodétecteur** | Réalise IC, repérage et marquage-piquetage |

### Types de déclarations

| Acte | Quand ? | Par qui ? |
|---|---|---|
| **DT** (Déclaration de Projet de Travaux) | À la **conception** du projet (souvent en phase APS / APD / PRO) | MOA ou MOE désigné |
| **DICT** (Déclaration d'Intention de Commencement de Travaux) | **Avant démarrage** (au moins **7 jours** avant) | Exécutant |
| **DT-DICT conjointe** | Pour les travaux **urgents** ou **sans MOA distinct** | Demandeur unique |
| **ATU** (Avis de Travaux Urgents) | Travaux urgents pour sécurité immédiate | Sans délai préalable, suivi DICT a posteriori |
| **Investigation Complémentaire (IC)** | Si **réseau sensible en classe B ou C** détecté | MOA |

### Délais à respecter

| Étape | Délai |
|---|---|
| Réponse exploitant à DT | 9 à 15 jours selon mode (postal/dématérialisé) |
| Réponse exploitant à DICT | 7 jours |
| Délai entre DICT et démarrage | 7 jours minimum après réponse |
| Validité DICT | 3 mois pour démarrer, 6 mois pour réaliser |
| Validité DT | 3 mois (ou plus si IC) |

## 4. Classes de précision des réseaux (R.554-23)

| Classe | Précision cartographique | Conséquences |
|---|---|---|
| **A** | ± 40 cm pour rigides, ± 50 cm pour flexibles (en zone urbaine) | Travaux possibles avec précautions standards |
| **B** | Entre A et 1,5 m | Sondages manuels recommandés à proximité |
| **C** | > 1,5 m d'imprécision | **Investigations Complémentaires (IC) obligatoires** si réseau sensible |

### Réseaux **sensibles pour la sécurité** (R.554-2)

- Canalisations de **gaz** (toutes pressions)
- Canalisations de **transport d'hydrocarbures** liquides ou gazeux
- Canalisations de **transport ou distribution de produits chimiques** dangereux
- Canalisations de **vapeur d'eau ou eau surchauffée**
- **Lignes électriques** HT et BT
- Réseaux de **chaleur** ou de **froid**
- Installations destinées à la **circulation de trains** (ferroviaire)
- Canalisations de transport de **CO2** captage / stockage
- Réseaux de **télécommunications** (selon certaines configurations seulement)

⚠️ Pour les **réseaux sensibles** en **classe B ou C** : **IC obligatoire** par le MOA avant DICT, sous peine de **sanctions pénales**.

## 5. Procédure pas-à-pas

### Étape 1 — Déclarer le projet au Guichet Unique (DT)

1. Connection à **reseaux-et-canalisations.gouv.fr**
2. Identification de la **zone d'emprise** (polygone géographique sur carte)
3. Le Guichet Unique fournit la **liste des exploitants** concernés
4. Émission d'une **DT** automatisée vers chaque exploitant

### Étape 2 — Recueillir les réponses (récépissés DT)

- Chaque exploitant a **9 à 15 jours** pour répondre
- Récépissé indique :
  - Position cartographique des réseaux
  - **Classe de précision** (A, B, C)
  - Prescriptions techniques particulières
  - Coordonnées du **représentant exploitant**

### Étape 3 — Investigation Complémentaire si nécessaire (R.554-23-II)

Si **réseau sensible en classe B ou C** :
- Faire intervenir un **prestataire de détection certifié** (DT-DICT NF S 70-003)
- Cartographier en **classe A** (précision améliorée)
- Modifier ou repenser le projet si conflit identifié

### Étape 4 — Marquage-piquetage avant travaux (NF S 70-003-3)

- Réalisé sur le terrain en présence de l'exécutant
- **Code couleur officiel** :
  - **Jaune** : gaz
  - **Rouge** : électricité
  - **Vert** : télécom
  - **Bleu** : eau potable
  - **Marron** : eaux usées
  - **Cyan** : eaux pluviales
  - **Orange** : chauffage urbain
- Marquage **pérenne** : peinture au sol, jalonnement, balises
- **PV de marquage-piquetage** signé MOA + exécutant + détecteur

### Étape 5 — DICT (par exécutant) avant démarrage

- **7 jours minimum avant** ouverture de chantier
- Émission via Guichet Unique vers exploitants concernés
- Chaque exploitant a **7 jours** pour répondre
- Récépissé DICT confirme les prescriptions à respecter

### Étape 6 — Démarrage chantier dans les **règles d'art**

- Respect des **prescriptions** des récépissés (techniques, signalétique)
- **Sondages manuels** ou aspiration à proximité des réseaux sensibles (interdiction d'engin mécanique à < 1 m)
- **Précautions particulières** selon réseau (gaz → pas d'étincelle, chalumeau)
- **Encadrement** technique par un **AIPR** (Autorisation d'Intervention à Proximité des Réseaux) pour chaque opérateur

### Étape 7 — Endommagement éventuel

Si **réseau endommagé** :
- **Arrêt immédiat** du chantier
- **Sécurisation** (évacuation, périmètre)
- **Appel** des secours et de l'exploitant
- **Constat** (DT-DICT-MIL) à émettre
- Selon gravité : enquête INERIS / DREAL

## 6. AIPR — Autorisation d'Intervention à Proximité des Réseaux

Depuis 2018, toute personne **encadrant ou réalisant** des travaux à proximité de réseaux doit avoir l'**AIPR** :

| Profil | Niveau AIPR |
|---|---|
| **Concepteur** (BE, MOE, géomètre) | Niveau 1 |
| **Encadrant** (chef chantier, conducteur de travaux) | Niveau 2 |
| **Opérateur** (conducteur d'engins, terrassier) | Niveau 3 |

- Examen QCM 30 questions (administré par OPP — Organisme Préventionnaire Professionnel)
- Validité **5 ans**
- Coût : 60 à 100 € HT par certificat

## 7. Restitution structurée

```
## DT-DICT — Préparation et suivi — Chantier [référence]

### Identification
- **Projet** : [...]
- **Maître d'ouvrage** : [...]
- **Exécutant** : [...]
- **Localisation** : [commune + parcelle + Lambert 93]
- **Nature des travaux** : [terrassement / fondations / fonçage / etc.]
- **Profondeur max** : [m]
- **Date prévisionnelle de démarrage** : [JJ/MM/AAAA]

### État des déclarations

| Acte | Date | Statut | Validité |
|---|---|---|---|
| DT | [JJ/MM/AAAA] | Émise → réponses reçues | 3 mois |
| DICT | [JJ/MM/AAAA] | Émise → en attente | 6 mois travaux |
| IC | Si applicable | Réalisée le [JJ/MM/AAAA] | — |
| Marquage-piquetage | [JJ/MM/AAAA] | PV signé | — |

### Exploitants concernés (issus du Guichet Unique)

| Exploitant | Réseau | Classe précision | Sensible | Récépissé DT | Récépissé DICT |
|---|---|---|---|---|---|
| Enedis | Électricité BT | A | Non | OK [date] | OK [date] |
| GRDF | Gaz | B | **Oui** | OK [date] + IC réalisée | OK [date] |
| VEOLIA | Eau potable | A | Non | OK [date] | OK [date] |
| Orange | Télécom | C | Non | OK [date] | OK [date] |
| ENGIE | Gaz HP | A | **Oui** | OK [date] | OK [date] |

### Investigations Complémentaires (IC) — si applicable

| Réseau visé | Classe initiale | Prestataire détection | Date IC | Nouvelle classe | Documents |
|---|---|---|---|---|---|
| Gaz GRDF | B | XYZ-DETECT | [date] | A | Plan + PV |

### Marquage-piquetage

- **Date** : [JJ/MM/AAAA]
- **Présents** : [MOA + exécutant + détecteur]
- **Méthode** : peinture sol + balises
- **Code couleur** appliqué : ✅
- **PV signé** : ✅
- **Photos** : ✅

### Prescriptions à respecter (extraites des récépissés)

1. **Gaz GRDF** : pas d'engin mécanique à < 1 m du réseau ; sondages manuels obligatoires ; appel pré-démarrage chantier 24h avant au n° XX
2. **Électricité Enedis** : pas de travaux sous ligne HT en l'absence de consignation préalable ; distance sécurité 3 m
3. **Eau Veolia** : passage à 0,80 m sous canalisation
4. ...

### AIPR (Autorisation d'Intervention à Proximité Réseaux)

| Personnel | Niveau requis | Détenu | Validité |
|---|---|---|---|
| Chef de chantier MARTIN | 2 | OK | 2027 |
| Conducteur engin BERNARD | 3 | OK | 2026 |
| Conducteur engin DUPONT | 3 | ❌ Non détenu | À obtenir AVANT démarrage |

### Synthèse
- **Conformité globale** : ✅ Conforme / ⚠️ À régulariser
- **Bloquant** : [AIPR manquante / IC non réalisée / récépissé non reçu / etc.]
- **Démarrage possible** à compter du : [JJ/MM/AAAA]

### Actions immédiates
1. [...]
2. [...]
```

## 8. Sanctions et responsabilités

### Sanctions pénales et administratives (R.554-39)

| Manquement | Sanction |
|---|---|
| Travaux sans DT (par MOA) | Amende administrative jusqu'à **1 500 €** par exploitant non interrogé |
| Travaux sans DICT (par exécutant) | Amende administrative jusqu'à **1 500 €** par exploitant non interrogé |
| Non-respect prescriptions récépissés | Amende administrative jusqu'à **1 500 €** + responsabilité pénale en cas accident |
| Endommagement réseau par négligence | Responsabilité civile (réparation) + sanctions pénales si dommage corporel |
| Travail dissimulé (AIPR sans certificat) | Sanction sociale + arrêt de chantier |

### Responsabilité civile

- **MOA** responsable de la qualité de la **DT et IC**
- **Exécutant** responsable du respect des **prescriptions techniques**
- En cas d'**endommagement** : selon répartition des torts, responsabilité partagée

### Cas particulier : ATU (Avis de Travaux Urgents)

Pour les travaux **urgents** (réparation fuite gaz, panne électrique, etc.) :
- **ATU** au lieu de DT-DICT (déclaration a posteriori)
- Conditions : urgence avérée, sécurité immédiate, durée limitée
- Régularisation a posteriori par DT-DICT obligatoire

## 9. Garde-fous spécifiques

- La DT-DICT est une **obligation légale** (art. R.554-21 et suivants code de l'environnement) — **aucune dérogation** sauf ATU justifié.
- **Tout chantier** sans DT-DICT valides à proximité d'un réseau **doit être suspendu** immédiatement — risque pour les personnes (gaz, électricité, eau sous pression).
- Pour les **réseaux sensibles en classe B ou C** : **l'IC est obligatoire** ; à défaut, la responsabilité du MOA est engagée et le chantier est **illégal**.
- La **DICT a une validité de 6 mois** : si le chantier dépasse, **nouvelle DICT** obligatoire.
- Le **marquage-piquetage** doit être **maintenu en bon état** pendant toute la durée des travaux — repassage si nécessaire.
- L'**AIPR** est exigée pour **tout** opérateur intervenant à moins de 50 m d'un réseau sensible. Sans AIPR, le chantier est en infraction (art. L.554-1 code énergie + art. R.554-31 code environnement).
- En cas de **doute sur l'existence d'un réseau**, **stopper** et faire intervenir un **détecteur** — ne pas continuer "à tâtons".
- Tu **rappelles** que les délais incompressibles (DT 9-15j, DICT 7j+7j d'attente) doivent être **anticipés dans le planning** dès la phase PRO.
- Pour les **travaux en domaine public** : la **convention d'occupation** est distincte de la DT-DICT (mais souvent corrélée).
- Tu **ne signes pas** les déclarations — c'est le **MOA** ou l'**exécutant désigné** qui assume la responsabilité administrative.
- Si **réseau non identifié** (orphelin) est trouvé en cours de chantier : **arrêt immédiat**, **information du préfet** + **Guichet Unique** (mécanisme d'intégration des réseaux orphelins).

## 10. Suites logiques à proposer

- **Inscription au Guichet Unique** (reseaux-et-canalisations.gouv.fr) gratuite et obligatoire pour tout MOA récurrent
- **Formation AIPR** pour l'équipe chantier dès qu'un opérateur n'est pas certifié
- **Convention avec un prestataire de détection** certifié (NF S 70-003) pour les IC futures
- **Plan de prévention** ou **PPSPS** intégrant les prescriptions DT-DICT
- En cas d'**endommagement** : déclaration immédiate par **DT-DICT-MIL** (Manquement, Incident, Litige) sur Guichet Unique
- Skill `cubatures` pour quantifier les terrassements (impact sur DT-DICT)
- Skill `analyse_servitudes` si réseau implique servitude conventionnelle
- Coordination avec le **CSPS** sur les mesures de prévention liées aux réseaux
- Mise à jour du **DUER** (Document Unique d'Évaluation des Risques) de l'entreprise pour intégrer le risque réseaux
- Pour les **projets d'aménagement** : intégration des plans réseaux au **DOE** final (Dossier d'Ouvrages Exécutés) à transmettre au futur exploitant
