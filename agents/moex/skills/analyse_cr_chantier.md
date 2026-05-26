# Skill — Analyser un compte-rendu de chantier

L'utilisateur te transmet un compte-rendu hebdomadaire de chantier (CR) à analyser pour en extraire actions, retards, alertes et risques.

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **CR de chantier** hebdomadaire (PDF), souvent émis par le MOE titulaire de la mission DET
- **Ordre du jour** précédent
- **Annexes** : photos, planning actualisé, liste de réserves
- Parfois **mails** ou **OS** notifiés depuis le dernier CR

Identifier un CR par : en-tête "Compte-rendu de chantier n° X", date, listing des présents, sections "Avancement", "Décisions", "Actions".

## 2. Extraction des informations clés

Quand un CR est dans le contexte, EXTRAIS :

| Information | Section CR | Action si absente |
|---|---|---|
| Numéro de CR + date | En-tête | — |
| Présents / absents / excusés | Liste émargement | Souvent annexée |
| Phase chantier | "Avancement" | À déduire des actions |
| Avancement par lot | "Avancement" | Lister postes |
| **Retards constatés** | "Retards" / "Planning" | Indispensable |
| **Actions à mener** | "Actions" | Avec porteur + délai |
| **Décisions prises** | "Décisions" | À tracer |
| **Points bloquants** | "Points bloquants" / "Alertes" | À remonter |
| **Sécurité** | "Sécurité" / mentions SPS | — |
| **OS prévus** | Notification | À acter |
| **Visites prévues** | Planning | — |

## 3. Vérifications normatives (`rag_search` obligatoire)

- `rag_search("CCAG-Travaux article 19 situations de travaux")` — si CR mentionne une situation
- `rag_search("CCAG-Travaux article 49 ordre de service arrêt")` — si arrêt prévu
- `rag_search("loi 75-1334 sous-traitance agrément")` — si nouveau sous-traitant arrivant
- `rag_search("CSPS coordination sécurité protection santé code du travail")` — si remarque sécurité

## 4. Procédure d'analyse

1. **Identifier la phase** : préparation / exécution (gros œuvre, second œuvre, finitions) / OPR / levée de réserves.

2. **Synthétiser l'avancement** par lot :
   - Pourcentage d'avancement physique (estimé visu ou planning)
   - Effectifs présents par entreprise
   - Postes à risque (retard prévisible)

3. **Lister les actions** sous forme tableau (qui / quoi / quand) :
   - Action MOA
   - Action MOE
   - Action entreprise
   - Action sous-traitant

4. **Identifier les retards** :
   - Cause : intempéries / sous-traitant / coordination / livraison matériaux / OS modifiant le marché / cas de force majeure
   - Impact sur planning global
   - **Responsabilité** : entreprise / MOA / extérieur ?

5. **Identifier les alertes** :
   - Sécurité (PPSPS non actualisé, conditions dangereuses)
   - Qualité (malfaçons détectées)
   - Financier (avancement physique vs financier, sur-facturation)
   - Juridique (sous-traitant non agréé, dépassement seuils OS)

6. **Anticiper les suites** :
   - OS à notifier (modification, arrêt, prestations sup.)
   - Réunion ad hoc à programmer
   - Demande de complément documentaire (DC4, attestations URSSAF, etc.)

## 5. Restitution structurée

```
## Synthèse CR chantier n° [X] du [JJ/MM/AAAA] — [Marché / Lot]

### Identification
- **Marché** : [...]
- **Lot(s)** : [...]
- **MOE** : [...]
- **Présents** : [liste]
- **Absents/excusés** : [liste]
- **Météo / aléas** : [...]

### Avancement par lot

| Lot | Avancement % | Effectif | État planning | Risques |
|---|---|---|---|---|
| Gros œuvre | [X%] | [N personnes] | [conforme/+J/-J] | [...] |
| Charpente | | | | |
| ... | | | | |

### Actions à mener (extraits)

| N° | Action | Porteur | Délai | Statut |
|---|---|---|---|---|
| A1 | [description précise] | [MOA/MOE/Ent. X] | [JJ/MM] | Ouverte |
| A2 | ... | | | |

### Décisions prises
1. [Décision 1] — fondement : [article CCAP / OS / réunion]
2. ...

### Retards constatés
- **Lot [X]** : retard de [N jours] — cause [...] — impact [...] — responsabilité [...]

### Alertes / points bloquants
1. **[Alerte 1]** — gravité [haute/moyenne/basse] — impact [...] — action proposée [...]

### Risques juridiques / financiers à acter
- [Liste — sous-traitance non agréée / sur-facturation / dépassement seuil OS / etc.]

### OS / courriers formels à émettre
1. [OS n° X — modification | arrêt | reprises | prestations supplémentaires]
2. [LRAR à entreprise Y pour mise en demeure]

### Prochain CR
- Date prévue : [JJ/MM/AAAA]
- Points spécifiques à mettre à l'OJ : [...]
```

## 6. Garde-fous spécifiques

- Tu **n'inventes pas** de fait non présent dans le CR — tu structures et synthétises l'existant.
- Tu **identifies les responsabilités** **avec précaution** : "responsabilité présumée" tant que les preuves ne sont pas écrites. Une attribution de responsabilité formelle se fait par OS / LRAR.
- Pour les **retards d'intempéries** : tu rappelles que les **conditions atmosphériques** définies à l'art. L.5424-8 du code du travail (et reprises par les CCAG-Travaux art. 19.2) ouvrent droit à **prolongation de délai** pour l'entreprise, sans pénalité.
- Pour les **OS modifiant le marché** > 15 % du montant initial : tu rappelles le besoin d'**accord MOA** (CCAG art. 12).
- Pour les **points sécurité graves** : tu recommandes l'**arrêt immédiat** si risque imminent + notification au coordonnateur SPS + LRAR au MOA.

## 7. Suites logiques à proposer

- **OS / courriers formels** identifiés à émettre
- **Réunion ad hoc** : revue planning, revue sécurité, point sous-traitance
- **Demande de pièces** à entreprise (DC4, attestation URSSAF, PPSPS actualisé)
- **Visite contradictoire** sur point sensible
- **Mise en demeure** si défaillance grave (LRAR motivée)
