# Skill — Décompter les intempéries et proposer prolongation

L'utilisateur te transmet un chantier impacté par des intempéries — tu dois décompter les jours d'arrêt, calculer la prolongation de délai et préparer la notification.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Référence du marché** + lot concerné
- **CCAP** : nombre de jours d'intempéries pré-décomptés par mois
- **Période** d'analyse (mois ou plusieurs mois)
- **Localisation** du chantier (ville + département → station Météo-France)
- **PV de chantier** des jours d'arrêt
- **Type de travaux** en cours (béton, étanchéité, charpente extérieure)

### 2. Vérifier les jours pré-décomptés au CCAP

#### Si CCAP indique un forfait

Recopier le forfait par mois :

| Mois | Jours intempéries pré-décomptés CCAP |
|---|---|
| Janvier | _ |
| Février | _ |
| Mars | _ |
| … | _ |

#### Si CCAP silencieux

Utiliser les **statistiques régionales** Météo-France ou valeurs usuelles :

| Mois | Jours présumés (France métropolitaine moyenne, BTP) |
|---|---|
| Janvier | 8-12 |
| Février | 7-10 |
| Mars | 5-7 |
| Avril | 3-5 |
| Mai | 2-3 |
| Juin | 1-2 |
| Juillet | 1 |
| Août | 1 |
| Septembre | 2-3 |
| Octobre | 4-6 |
| Novembre | 6-9 |
| Décembre | 8-12 |
| **Total annuel** | **~48-72** |

→ **Sud** : valeurs ~ 50 % de celles du Nord.

### 3. Compter les jours d'arrêt réel

#### Sources

- **PV de chantier** signés (date + cause)
- **Cahier de chantier** ou registre de l'OPC
- **Photos datées** (gel, neige, inondation)
- **Relevés Météo-France** (bulletins climatologiques)

#### Critères d'éligibilité (CT L.5424-8)

Un jour d'arrêt est éligible si :
- **Cause climatique** : gel, neige, verglas, pluie persistante, tempête, ouragan, inondation
- **Danger** ou **impossibilité technique** de poursuivre
- **Nature et situation du chantier** prises en compte (chantier intérieur peu impacté par pluie)

#### Cas pratiques

| Conditions | Éligible ? |
|---|---|
| Gel < -2 °C, bétonnage prévu | ✅ Oui |
| Pluie > 20 mm/24h, étanchéité prévue | ✅ Oui |
| Pluie modérée 8 mm/24h, intérieur en cours | ❌ Non |
| Vent > 70 km/h, grutage prévu | ✅ Oui |
| Neige > 5 cm, accès chantier bloqué | ✅ Oui |
| Brouillard intense, travaux en hauteur | ✅ Oui (sécurité) |
| Brouillard léger, travaux intérieur | ❌ Non |
| Inondation locale au chantier | ✅ Oui |
| Pluie légère 2 mm, intérieur en cours | ❌ Non |

### 4. Calcul de la prolongation

#### Méthode

```
Jours de prolongation = Jours d'arrêt réels - Jours pré-décomptés CCAP
```

#### Si négatif

- **Pas de prolongation** : les intempéries étaient anticipées et incluses dans le forfait
- Le titulaire **n'a pas** droit à allongement

#### Si positif

- **Prolongation accordée** égale à la différence
- À cumuler avec les autres prorogations éventuelles (TS, sujétions, etc.)

### 5. Tableau récapitulatif mensuel

| Mois | Forfait CCAP | Jours d'arrêt réels | Jours de prolongation |
|---|---|---|---|
| Janvier 2024 | 8 | 12 | +4 |
| Février 2024 | 7 | 6 | 0 (sous forfait) |
| Mars 2024 | 5 | 9 | +4 |
| Avril 2024 | 3 | 4 | +1 |
| **Cumul** | **23** | **31** | **+9 jours** |

→ Prolongation totale demandée : **9 jours**.

### 6. Documenter les arrêts

Pour chaque jour d'arrêt, le PV de chantier doit mentionner :

```
Date : _____ (jour, mois, année)
Cause : Gel / Neige / Pluie / Tempête / Inondation
Mesure relevée : ___ °C / ___ mm pluie / ___ km/h vent / ___ cm neige
Source de la mesure : Météo-France station _____
Travaux concernés et arrêtés : _____ (lot et nature)
Effectif arrêté : _____ ouvriers
Heure d'arrêt : ___ h__
Heure de reprise prévue : ___ h__
Photos : annexées
Signature chef de chantier : _____
Signature MOE/OPC : _____
```

### 7. Récupérer les preuves Météo-France

#### Procédure

1. Identifier la **station Météo-France** la plus proche du chantier
2. **Commander** les bulletins climatologiques de la période (Climathèque)
3. Coût : ~ 30-80 € HT pour un mois
4. Délai : 2-7 jours

#### Contenu utile

- Températures min/max journalières
- Précipitations journalières (mm)
- Vitesses moyennes et rafales du vent (km/h)
- Hauteurs de neige fraîche
- Niveau cours d'eau si inondation

### 8. Préparer la notification

#### Lettre de demande de prolongation (titulaire → MOE)

```
[Identité titulaire]                                  [Date]

[Identité MOE]
[Adresse]

LRAR n° xxxx

Objet : Demande de prolongation de délai pour intempéries
       Marché n° xxxx — Période ___

Madame, Monsieur,

Conformément à l'article 19.2.2 du CCAG-Travaux 2021, nous
sollicitons l'application d'une prolongation de délai en
raison des intempéries survenues sur la période ci-dessous :

[Tableau récapitulatif]

Les jours d'arrêt sont justifiés par les PV de chantier et les
relevés Météo-France de la station ____ joints en annexe.

Nous demandons en conséquence une prolongation de notre délai
contractuel de ___ jours.

Veuillez agréer, Madame, Monsieur, nos salutations distinguées.

[Signature]

PJ :
- PV de chantier (jours d'arrêt)
- Relevés Météo-France
- Photos datées
```

#### Réponse MOE (notification au MOA)

```
[Identité MOE]                                        [Date]

[Identité MOA]
[Adresse]

Objet : Proposition de prorogation de délai
       Marché n° xxxx

Madame, Monsieur,

Suite à la demande du titulaire et à l'analyse des justificatifs
relatifs aux intempéries de la période ___, nous proposons une
prorogation de délai de ___ jours conformément à l'article 19.2.2
du CCAG-Travaux 2021.

Nouvelle date contractuelle d'achèvement : ___

Cette prorogation pourra être notifiée par OS ou intégrée à un
avenant ultérieur.

Veuillez agréer, Madame, Monsieur, nos salutations distinguées.

[Signature MOE]
```

### 9. OS de prorogation

Le MOE peut émettre directement un **OS de prorogation** (CCAG 19.2) :

```
ORDRE DE SERVICE N° ____ / Date ____

Marché : n° _____
Titulaire : _____
Objet : Prorogation de délai pour intempéries

Suite aux intempéries survenues du __ au __ ayant entraîné
____ jours d'arrêt dépassant le forfait CCAP, nous vous notifions
une prorogation de votre délai contractuel de ____ jours.

Nouvelle date contractuelle d'achèvement : ____ (au lieu de ____).

Le titulaire ne pourra donc se voir appliquer de pénalités de
retard pour les jours objet de cette prorogation.

[Signature MOE]
```

### 10. Suivre en continu

#### Tableau de bord mensuel

- Décompte intempéries mois par mois
- Prolongation cumulée à date
- Date contractuelle actualisée

#### Recommandation MOEX

- **Décompter tous les mois** (pas en bloc en fin de chantier)
- **OS de prorogation** trimestriel (sinon en bloc en fin de chantier)
- **Notification au titulaire** pour validation contradictoire
- **Cumul** : suivi pour DGD final

### 11. Cas de force majeure

Si les intempéries sont **exceptionnelles** (tempête Alex, inondation centennale) :
- **Force majeure** invocable
- Pas de plafond de jours
- Indemnisation au titre du préjudice subi possible (suspension + perte exploitation)
- Documentation renforcée (déclaration catastrophe naturelle, etc.)

## Garde-fous

- **Conditions cumulatives** pour qu'un jour soit éligible : cause climatique + danger/impossibilité + nature/situation chantier.
- **Pas de prolongation** pour intempéries déjà incluses dans le forfait.
- **PV de chantier** essentiel : sans PV signé, pas de preuve.
- **Relevés Météo-France** indispensables — pas de prolongation sans données objectives.
- **Forfait CCAP** à respecter — pas de modification unilatérale.
- **Pour les chantiers d'intérieur** : peu de jours éligibles (les conditions n'empêchent pas vraiment l'exécution).
- **Indemnisation CIBTP** des ouvriers : à traiter à part (75 % salaire, 55 h/an).

## Livrable à proposer

Après calcul, propose un **dossier de demande de prorogation** :
- **Lettre de demande** (DOCX) du titulaire au MOE
- **OS de prorogation** (DOCX) prêt à émettre par le MOE
- **Tableau récapitulatif mensuel** (XLSX) avec :
  - Forfait CCAP
  - Jours d'arrêt réels
  - Prolongation par mois
  - Cumul
- **Annexes** : PV de chantier, relevés Météo-France, photos
- **Note de synthèse** (DOCX) destinée au MOA
- Mention finale : *« Document préparé par l'agent IA MOEX — à valider par le maître d'œuvre et le maître d'ouvrage avant émission de l'OS. »*
