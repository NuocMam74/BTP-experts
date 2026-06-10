# Skill — Cadrer une mission de géomètre-expert (lettre de mission, périmètre, devoir de conseil, RGPD)

L'utilisateur veut **cadrer une mission de géomètre-expert** : définir le **périmètre** (ce qui est inclus / exclu), formaliser une **lettre de mission**, structurer le **devoir de conseil**, lister les **livrables** et sécuriser le traitement des **données personnelles** (RGPD). S'appuie sur le corpus `deontologie_contrat_oge.md` (et `outils_fonciers_sig_oge.md` pour la donnée foncière).

## 1. Informations attendues

- **Client / mandant** : particulier, notaire, collectivité, aménageur, syndic, avocat…
- **Objet de la mission** : bornage, division, DMPC, EDD/EDDV, implantation, récolement, levé 3D, évaluation, expertise…
- **Bien concerné** : commune, parcelles cadastrales, adresse.
- **Contexte** : vente, succession, litige de voisinage, projet de construction, expropriation, copropriété…
- **Contraintes** : délais souhaités, accès au terrain, contradictoire (bornage), budget indicatif.
- **Pièces disponibles** : titres, plans, extraits cadastraux, autorisations d'urbanisme.

Si éléments manquants, demande
1. Pour **qui** intervenez-vous (client) et y a-t-il des **tiers** (voisins, indivisaires) à associer ?
2. Quel est l'**objet précis** et le **résultat attendu** (acte foncier signé ? simple avis ? plan ?) ?
3. Quelles **pièces** pouvez-vous fournir et avez-vous **accès au terrain** ?
4. Y a-t-il un **litige** en cours ou un **délai** impératif (compromis, audience) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("ordonnance 1945 monopole géomètre-expert bornage DMPC")`
- `rag_search("décret 96-478 devoirs professionnels indépendance devoir de conseil")`
- `rag_search("lettre de mission contrat géomètre-expert honoraires livrables")`
- `rag_search("responsabilité RC pro décennale géomètre-expert assurance")`
- `rag_search("RGPD données foncières propriétaires minimisation conservation")`
- `rag_search("conservation archives minutes bornage prescription trentenaire")`

## 3. Cadre déontologique (rappels structurants)

| Texte | Contenu |
|---|---|
| **Ordonnance du 21 mai 1945** | **Monopole** OGE : bornage, fixation de limites, DMPC, sous signature du géomètre-expert |
| **Décret 96-478 du 31 mai 1996** | Devoirs professionnels : **indépendance**, conscience, **devoir de conseil**, secret, confraternité |
| **Code civil 1231-1 / 1240** | **Responsabilité** contractuelle / délictuelle ; **RC pro obligatoire** |
| **Code civil 1792 et s.** | **Garantie décennale** (missions de conception / implantation) |
| **RGPD (UE 2016/679)** | Traitement des **données personnelles** des propriétaires : base légale, minimisation, information |

> Tu **prépares** le cadrage et le projet de lettre de mission ; l'**engagement** et la **signature** relèvent du géomètre-expert OGE.

## 4. Procédure

### Étape 1 — Qualifier la mission et le monopole

- Déterminer si la mission **relève du monopole** OGE (bornage, DMPC, EDD/EDDV → **oui**, signature géomètre-expert obligatoire) ou d'une mission **ouverte** (levé, métré, conseil).
- Identifier le **type de livrable final** (acte foncier opposable ? note ? plan ?) et qui le **signe**.

### Étape 2 — Définir le périmètre (inclus / exclu)

- Lister **précisément** les prestations **incluses** (relevé, recherche cadastrale, contradictoire, plan, PV…).
- Lister les prestations **exclues** (ex. acte notarié, dépôt d'autorisation d'urbanisme, négociation amiable) pour éviter toute attente implicite.
- Préciser les **hypothèses et conditions** (accès, fourniture des titres, présence des parties au contradictoire).

### Étape 3 — Structurer le devoir de conseil

- Identifier les **risques fonciers** à signaler : incohérence titre/cadastre/limite, **servitudes**, empiétement, aléas d'urbanisme, démembrement, fiscalité (TA, plus-value).
- Prévoir une **alerte écrite** au client sur ces points (le devoir de conseil s'exerce **même non sollicité**).

### Étape 4 — Lister livrables, délais et honoraires

- **Livrables** datés et nommés (plan, PV, note, attestation, DMPC…).
- **Délais** indicatifs par phase (**à revérifier à la date de consultation**).
- **Honoraires** : modalité (forfait / temps passé), débours, paiement — honoraires **libres** mais **convenus à l'avance**.

### Étape 5 — Sécuriser le RGPD et les archives

- **Base légale** du traitement (contrat / obligation légale), **données minimales**, **information** des personnes.
- **Durée de conservation** et archivage des minutes (mémoire foncière).
- Vigilance **prises de vues drone** (personnes, voisinage — voir `leves_3d_scanner_drone.md`).

## 5. Restitution structurée

```
## Cadrage de mission — Géomètre-expert — [Objet]

### Identification
- **Client / mandant** : [nom / qualité]
- **Géomètre-expert** : [nom + n° Ordre OGE]
- **Bien** : [commune] — parcelles [réf. cadastrales]
- **Contexte** : [vente / litige / projet…]

### Qualification de la mission
- **Objet** : [bornage / division / DMPC / EDD / levé 3D / évaluation…]
- **Relève du monopole OGE** : [Oui (signature géomètre-expert) / Non]
- **Livrable final** : [acte opposable / note / plan] — signé par : [géomètre-expert / autre]

### Périmètre
| Inclus | Exclu |
|---|---|
| [relevé, recherche cadastrale, contradictoire, plan, PV] | [acte notarié, dépôt PC, négociation] |

### Conditions et hypothèses
- Accès au terrain : [ ] — Titres fournis par le client : [ ] — Contradictoire : [parties à convoquer]

### Devoir de conseil — points d'alerte
1. [Ex : incohérence titre/cadastre à lever avant la vente]
2. [Ex : servitude de passage à confirmer]
3. [Ex : fiscalité — taxe d'aménagement / plus-value à anticiper]

### Livrables et délais
| Livrable | Format | Délai indicatif (à revérifier) |
|---|---|---|
| [Plan / PV / note] | [DOCX/PDF/XLSX] | [ ] |

### Honoraires (à convenir)
- Modalité : [forfait / temps passé] — Débours : [ ] — Paiement : [ ]
- *Honoraires libres, convenus à l'avance ; montants à revérifier à la date de consultation.*

### RGPD et archives
- Base légale : [contrat / obligation légale] — Données : [minimales] — Information du client : [ ]
- Conservation des minutes : [durée] — Drone : [vigilance prises de vues le cas échéant]

### Niveau de confiance
- [Projet de cadrage — à valider et signer par le géomètre-expert OGE]
```

→ Sur demande ou en push proactif :
`generer_rapport({ titre: "Lettre de mission — [objet] — [commune]", contenu: <markdown>, format: "docx", agent: "geometre", metadata: { client, commune, parcelles, OGE_signataire_prevu, date } })`

> 👉 *Souhaites-tu que je génère la **lettre de mission (DOCX)** prête à adapter et signer par le géomètre-expert, avec la clause RGPD et le périmètre détaillé ?*

## 6. Garde-fous spécifiques

- Tu **prépares** le cadrage et le **projet** de lettre de mission : l'**engagement** et la **signature** relèvent du **géomètre-expert inscrit à l'Ordre** (ordonnance du 21 mai 1945). Tu n'engages pas sa responsabilité.
- Tu **rappelles le monopole** : bornage, fixation de limites, DMPC, EDD/EDDV ne peuvent être réalisés et signés **que** par un géomètre-expert OGE.
- Tu **distingues clairement l'inclus et l'exclu** du périmètre pour prévenir les litiges sur l'étendue de la mission.
- Tu **actives le devoir de conseil** : signaler les risques fonciers (titre/cadastre, servitudes, empiétement, urbanisme, fiscalité) **même non demandés** (devoir renforcé, décret 96-478).
- Tu **n'indiques jamais** d'honoraires ou de délais comme définitifs : honoraires **libres et convenus à l'avance**, coûts et délais **à revérifier à la date de consultation**.
- Tu **intègres une clause RGPD** (base légale, minimisation, information, conservation) et signales la vigilance sur les **prises de vues drone**.
- Tu **n'oublies pas l'assurance** : RC pro **obligatoire** ; décennale (art. 1792) pour les missions de conception / implantation.

## 7. Suites logiques à proposer

- **Lettre de mission** finalisée (skill ci-dessus) + clause RGPD.
- Lancement de la mission technique : bornage (`rediger_pv_bornage`), division (`division_parcellaire`), DMPC (`etablir_dmpc`), EDD/EDDV (`etablir_edd_copropriete`, `diviser_en_volumes`), levé 3D.
- **Analyse des titres** préalable (skill `analyser_titres_propriete`).
- Si volet fiscal : analyse de la **taxe d'aménagement** et de la fiscalité (skill `analyser_fiscalite_fonciere`, corpus `baux_reels_fiscalite_fonciere.md`).
- Recherche d'**antériorité** de bornage (Géofoncier — corpus `outils_fonciers_sig_oge.md`).
