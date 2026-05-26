# Skill — Rédiger un Ordre de Service (OS)

L'utilisateur veut **rédiger un Ordre de Service** conforme au cadre contractuel applicable (**CCAG-Travaux** marchés publics — arrêté du 30 mars 2021 ; **NF P 03-001** marchés privés ; **CCAP** spécifique). L'OS est un acte écrit par lequel le **maître d'œuvre** (ou le MOA pour certains OS) **prescrit au titulaire** une obligation à exécuter.

## 1. Documents attendus

- **Marché signé** (acte d'engagement + CCAP + CCTP)
- **Notice d'organisation MOA-MOE-titulaire** (rôles et signataires)
- **Avenants** déjà notifiés
- **OS précédents** sur le même marché (pour cohérence et continuité)
- **Comptes-rendus** de chantier référençant l'événement déclencheur
- **Notes techniques** ou plans à annexer à l'OS

Si pièces partielles : demande
1. Marché **public** (CCAG-Travaux) ou **privé** (NF P 03-001) ?
2. Référence complète du marché (n°, lot, intitulé) ?
3. Identité MOA, MOE, titulaire ?
4. **Nature de l'OS** : démarrage / suspension / reprise / modification / prestations supplémentaires / approbation programme / arrêt total ?
5. Événement **déclencheur** (date, motif) ?
6. **Modalités de notification** prévues au CCAP (LRAR, plateforme dématérialisée, remise contre récépissé) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("CCAG-Travaux arrêté 30 mars 2021 article 3.8 ordres de service")`
- `rag_search("CCAG-Travaux article 12 modification du marché")`
- `rag_search("CCAG-Travaux article 14 modifications du programme")`
- `rag_search("CCAG-Travaux article 19 acomptes et révision")`
- `rag_search("CCAG-Travaux article 49 suspension arrêt")`
- `rag_search("NF P 03-001 article 13 ordres de service marchés privés")`
- `rag_search("code commande publique R.2191 acomptes")`
- `rag_search("loi MOP ordonnance 2018-1074 missions MOE")`

## 3. Typologie des OS

| Type OS | Référence CCAG | Objet | Délai réserve titulaire |
|---|---|---|---|
| **Démarrage des travaux** | Art. 28 + 3.8 | Lancement effectif | 15 jours |
| **Approbation du programme** | Art. 28 | Validation calendrier détaillé | 15 jours |
| **Modification du programme** | Art. 14 | Réordonnancement, calendrier | 15 jours |
| **Suspension des travaux** | Art. 49 | Arrêt temporaire (motif) | 15 jours |
| **Reprise des travaux** | Art. 49 | Levée de suspension | 15 jours |
| **Modification du marché** | Art. 12 | Variation quantités/qualités | 15 jours |
| **Prestations supplémentaires** | Art. 14 + 12 | Travaux non prévus | 15 jours |
| **Décision sur prix nouveaux** | Art. 14 | Prix non au bordereau | 15 jours |
| **Mise en demeure** | Art. 27 + 48 | Carence titulaire | 15 jours |
| **Constat OPR** | Art. 41 | Constat opérations préalables réception | — |
| **Résiliation** | Art. 46 | Cessation du contrat (faute, force majeure) | 15 jours |

## 4. Forme et mentions obligatoires (CCAG art. 3.8)

| Mention | Caractère |
|---|---|
| Numérotation séquentielle | Obligatoire |
| Référence du marché | Obligatoire |
| Identité MOA, MOE, titulaire | Obligatoire |
| Objet précis et concis | Obligatoire |
| Visa des articles applicables | Obligatoire |
| Prescriptions détaillées | Obligatoire |
| Délais d'exécution ou date d'effet | Obligatoire |
| Rappel du droit de réserve (15 jours) | Recommandé |
| Date et lieu d'émission | Obligatoire |
| Signature du MOE (ou MOA selon type) | Obligatoire |
| Notification au titulaire | Obligatoire (par LRAR ou voie dématérialisée) |

## 5. Procédure de rédaction

### Étape 1 — Identifier le **type d'OS** approprié
- Quel est l'objectif (démarrer, modifier, suspendre, prescrire, mettre en demeure) ?
- Quelle base contractuelle (CCAG art. X / NF P 03-001 art. Y / CCAP article Z) ?

### Étape 2 — Vérifier la **compétence du signataire**
- MOE peut signer la plupart des OS (CCAG art. 3.8)
- **MOA** doit signer ou avaliser :
  - Modification du marché > 15 % (art. 12)
  - Résiliation (art. 46)
  - Prestations supplémentaires entraînant **dépassement** du marché initial

### Étape 3 — Vérifier les **seuils et limites**
- **Modification quantitatif (art. 12)** : modification de masse autorisée jusqu'à **+/- 15 %** du marché initial sans avenant (sauf clause CCAP plus restrictive)
- Au-delà de 15 % : **avenant** obligatoire (signature MOA + titulaire)
- **Prestations supplémentaires** : si **> 5 %** du marché ou modifient sensiblement l'économie du contrat, **avenant** plutôt qu'OS

### Étape 4 — Identifier les **délais d'exécution et de réserves**
- Délai d'exécution : à compter de la **notification** (date de réception par titulaire)
- Réserve titulaire : **15 jours** à compter de la notification (CCAG art. 3.8.1)
- **Sans réserve** dans le délai → OS **accepté implicitement** (silence vaut acceptation)

### Étape 5 — Rédiger l'OS selon les modèles ci-dessous

## 6. Modèles d'OS

### Modèle 1 — OS de démarrage

```
ORDRE DE SERVICE N° 01

MARCHÉ N° [...]
LOT [n° + intitulé]
INTITULÉ : [Construction de ... à ...]

MAÎTRE D'OUVRAGE : [nom + adresse]
MAÎTRE D'ŒUVRE : [nom + adresse]
TITULAIRE DU LOT : [entreprise + SIRET + adresse]

DATE : [JJ/MM/AAAA]

VISA :
- CCAG-Travaux art. 3.8 (forme des OS) et art. 28 (commencement des travaux)
- CCAP du marché article [...]

OBJET : Ordre de commencement des travaux

PRESCRIPTIONS :
1. Le titulaire est tenu de commencer effectivement les travaux du lot [n°] 
   à compter du [date prévisionnelle].
2. Le titulaire produira sous 8 jours :
   - Le PPSPS coordonné avec le PGC du CSPS
   - L'attestation d'assurance décennale et RC en cours de validité
   - L'organigramme du personnel d'encadrement chantier
3. Le titulaire participe à la réunion de démarrage le [date] à [heure] à [lieu].

DÉLAIS :
- Date d'effet : à compter de la notification du présent OS
- Délai d'exécution total du marché : [N mois] à compter de la même date
- Date prévisionnelle de réception : [JJ/MM/AAAA]

RÉSERVES :
Conformément à CCAG-Travaux art. 3.8.1, le titulaire dispose d'un délai de 
15 jours à compter de la notification du présent ordre pour formuler ses 
éventuelles réserves écrites.

Fait à [lieu], le [date]

Le Maître d'œuvre
[Nom, fonction, signature]
```

### Modèle 2 — OS de modification (variation quantités)

```
ORDRE DE SERVICE N° [X]

[En-tête identique au modèle 1]

VISA :
- CCAG-Travaux art. 3.8 et art. 12 (modifications du marché)
- CCAP du marché article [...]
- Le présent OS s'inscrit dans la limite des [+/- 15 %] du marché initial 
  autorisée par l'art. 12.

OBJET : Modification quantitative du poste [n° DPGF — désignation]

PRESCRIPTIONS :
1. Le poste [...] du bordereau est modifié comme suit :
   - Quantité contractuelle : [...] [unité]
   - Quantité modifiée : [...] [unité]
   - Variation : [+ / -] [...] [unité] (soit [+ / -] [X] % du marché initial)
2. Le prix unitaire reste celui du bordereau initial : [...] € HT/[unité].
3. Impact financier estimé sur le marché :
   - Montant initial HT du poste : [...] €
   - Montant modifié HT du poste : [...] €
   - Écart HT : [+ / -] [...] €
4. L'impact cumulé des modifications depuis l'origine du marché est de 
   [...] % (vérification du seuil 15 % avant avenant).

DÉLAIS :
- Date d'effet : à compter de la notification
- Pas d'impact sur le délai contractuel d'exécution global

RÉSERVES :
[Identique modèle 1]

[Signature]
```

### Modèle 3 — OS de suspension

```
ORDRE DE SERVICE N° [X]

[En-tête]

VISA :
- CCAG-Travaux art. 3.8 et art. 49 (suspension et arrêt)
- CCAP du marché article [...]

OBJET : Suspension des travaux du lot [n°]

MOTIF : [Description précise — ex : intempéries persistantes / accident / défaut 
documents techniques / décision MOA]

PRESCRIPTIONS :
1. Le titulaire suspend l'exécution des travaux à compter du [date].
2. Le titulaire prend toutes mesures de :
   - Sécurisation du chantier (clôture, signalisation)
   - Conservation des ouvrages en cours
   - Information des sous-traitants
3. Le titulaire produit dans les 8 jours :
   - L'inventaire détaillé des travaux exécutés à date
   - Un rapport sur les coûts d'immobilisation
4. La reprise sera prescrite par OS ultérieur.

DURÉE PRÉVISIONNELLE : [estimée à X semaines ou indéterminée selon contexte]

INDEMNISATION :
Conformément à CCAG-Travaux art. 49.1, le titulaire pourra demander 
indemnisation des frais d'immobilisation si la suspension excède 1 mois 
(à présenter par mémoire en réclamation art. 50).

PRÉAVIS :
La suspension prend effet au [date], soit après un préavis de [N] jours 
[+ justification si préavis < 8 jours pour urgence].

RÉSERVES :
[Identique]

[Signature]
```

### Modèle 4 — OS de prestations supplémentaires

```
ORDRE DE SERVICE N° [X]

[En-tête]

VISA :
- CCAG-Travaux art. 3.8 et art. 14 (modifications du programme)
- CCAG-Travaux art. 12 (modifications du marché) si dépassement
- CCAP article [...]

OBJET : Prestations supplémentaires — [désignation]

NATURE :
[Description détaillée des travaux supplémentaires à exécuter]

JUSTIFICATION :
[Motif de la prestation supplémentaire : sujétion technique imprévue, 
modification programme MOA, mise en conformité, etc.]

PRESCRIPTIONS TECHNIQUES :
1. [Détail technique 1]
2. [Détail technique 2]
3. Documents complémentaires joints : [plans, notes de calcul, etc.]

VALORISATION :
Les prestations supplémentaires seront valorisées :
- Selon les prix unitaires du bordereau initial s'ils sont applicables :
  [poste X : Y €/unité × Z unités = ... € HT]
- Selon prix nouveaux à établir par ordonnance de prix nouveaux 
  conformément à CCAG art. 14.6 :
  [poste à prix nouveau : valorisation par bordereau de prix de sous-traitance 
  ou Batiprix Année [...] + frais généraux + bénéfices au taux contractuel]

IMPACT SUR LE MARCHÉ :
- Montant prévisionnel HT des PS : [...] €
- Cumul PS depuis origine : [...] %
- Si cumul > 15 % : avenant à signer en plus du présent OS

DÉLAIS :
- Date d'effet : à compter de la notification
- Délai supplémentaire accordé sur le marché : [N jours]
- Nouvelle date prévisionnelle de réception : [...]

RÉSERVES :
[Identique]

[Signature]
```

### Modèle 5 — OS de mise en demeure (carence titulaire)

```
ORDRE DE SERVICE N° [X]

[En-tête]

VISA :
- CCAG-Travaux art. 3.8 et art. 27 (obligations titulaire) et art. 48 (sanctions)
- CCAP article [...]

OBJET : Mise en demeure d'exécuter

CONSTAT DE CARENCE :
[Description précise et factuelle : "Le titulaire n'a pas, à la date du [...], 
livré les ouvrages du poste [...] contractuellement dus pour le [...]."]
[Référence aux comptes-rendus de chantier ou pièces probantes attestant la carence]

PRESCRIPTIONS :
1. Le titulaire est mis en demeure d'exécuter les travaux suivants dans un 
   délai de [N jours] à compter de la notification du présent OS :
   - [Action 1]
   - [Action 2]
2. Le titulaire produira un calendrier de rattrapage avant le [date].
3. À défaut d'exécution dans le délai imparti, l'article 48 du CCAG-Travaux 
   sera mis en œuvre (pénalités de retard, exécution aux frais et risques, 
   résiliation aux torts du titulaire).

PÉNALITÉS APPLICABLES (rappel CCAP article [...]) :
- Retard d'exécution : [...] € HT par jour calendaire de retard
- Cumul plafonné à [...] % du montant du marché (art. 19 CCAP)

RÉSERVES :
[Identique]

[Signature]
```

## 7. Spécificités marchés privés (NF P 03-001 art. 13)

En marché privé soumis à la **norme NF P 03-001 (édition 2017)** :
- Article **13** : ordres de service du MOE
- Délai de réserve titulaire : **15 jours** (similaire)
- Notification : par lettre recommandée avec AR ou tout moyen équivalent
- En cas de désaccord : procédure de conciliation amiable préalable (art. 23) avant action judiciaire

Si la norme NF P 03-001 **n'est pas visée au CCAP**, le marché privé est régi par les **clauses du contrat seul** : il faut alors expressément définir la procédure des OS dans les CGV ou conditions particulières.

## 8. Cas particuliers et pièges

### Cas 1 — OS verbal en chantier
Pratique fréquente mais **risquée** : un OS doit être **écrit** (CCAG art. 3.8). Tout ordre verbal doit être **confirmé par OS écrit** sous 8 jours, faute de quoi le titulaire peut le refuser et facturer sur autre base.

### Cas 2 — OS signé par MOE pour modification > 15 %
Le MOE **n'est pas habilité** à engager le MOA au-delà du seuil de 15 % (art. 12 CCAG). Tout OS de modification > 15 % doit être visé par MOA ou être suivi d'un **avenant** signé MOA.

### Cas 3 — OS de prix nouveau sans accord titulaire
La fixation du prix nouveau est **contradictoire** : MOE propose, titulaire accepte ou conteste. En cas de désaccord, **ordonnance de prix nouveau** (art. 14.6) provisoire et **mémoire en réclamation** ultérieur.

### Cas 4 — OS rétroactif
**Interdit en principe** : un OS produit effet à compter de sa notification, pas à une date antérieure. Pour régulariser une situation passée, formaliser par **avenant** ou décompte de **règlement transactionnel**.

### Cas 5 — OS pendant la GPA
Pendant l'année de garantie de parfait achèvement (art. 44.1 CCAG), le MOE peut émettre des **OS de levée de réserves** ou de **reprise GPA**. Les délais sont alors de 30 jours par défaut (art. 41.6).

## 9. Garde-fous spécifiques

- Tu **n'inventes** pas de numéro de marché, de personne, de date — utilise des **placeholders explicites** à compléter.
- Tu **rappelles** que l'OS doit être **daté ET notifié** pour produire effet (la date de **notification** compte pour les délais de réserve et d'exécution).
- Tu **ne signes pas** l'OS — tu prépares le texte pour signature par le **MOE** (ou MOA selon le type d'OS).
- Pour les marchés **privés**, vérifie d'abord si une **NF P 03-001** est visée au CCAP ; sinon les références CCAG **ne s'appliquent pas**.
- Pour les **modifications > 15 %** du marché initial : un **avenant signé MOA** est obligatoire en plus de l'OS (CCAG art. 12). Un OS seul est **insuffisant**.
- Pour les **OS de prix nouveau** : valorisation à proposer **avant exécution** si possible (CCAG art. 14.5) ; à défaut, **ordonnance de prix nouveau** par MOE puis acceptation/contestation titulaire.
- Pour les **OS de suspension > 1 mois** : le titulaire peut demander **indemnisation** des frais d'immobilisation (mémoire en réclamation art. 50). Anticiper la valorisation.
- Pour les **OS de mise en demeure** : la **précision** du constat est critique — toute imprécision peut être contestée par le titulaire et invalider la procédure de sanction (art. 48).
- Tu **rappelles** qu'un OS **ne se substitue pas à un avenant** : pour modifier de manière durable et essentielle le marché (objet, délai global, prix), avenant nécessaire.
- En cas de **doute sur la compétence** du signataire : faire viser par le **MOA** ou par toute personne ayant **délégation de signature** documentée.
- Pour les **marchés à tranches** ou à **commandes** : OS d'**affermissement de tranche** ou de **bon de commande** suivent un régime spécifique (CCAG art. 30 et 32).

## 10. Suites logiques à proposer

- **Notification officielle** par LRAR ou plateforme dématérialisée (CHORUS-Pro, profil acheteur)
- **Conservation** de l'AR de notification (preuve de la date d'effet)
- Suivi du **délai de réserve titulaire** (15 jours) — toute réserve formelle doit être traitée par OS rectificatif ou réponse motivée
- Pour OS de modification > 15 % : préparation immédiate de l'**avenant** signé MOA
- Pour OS de prestations supplémentaires : élaboration de l'**ordonnance de prix nouveau** si prix non au bordereau
- Pour OS de mise en demeure : suivi du **délai imparti** et préparation des **suites disciplinaires** (pénalités, exécution aux frais et risques, résiliation)
- Mise à jour du **planning** (chemin critique, sous-traitants concernés)
- Information **comptable** (impact sur situations, retenue garantie, révision)
- Skill `controle_situation_travaux` pour intégrer l'OS dans la prochaine situation de paiement
- Skill `controle_coherence_dce` pour confronter l'OS au DCE initial
- Skill `analyse_cr_chantier` pour intégrer l'OS aux comptes-rendus suivants
- Pour les **gros marchés** : reporting **OS / avenants / réclamations** mensuel pour le COPIL MOA
