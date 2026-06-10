# Skill — Auditer un PGC, valider un PPSPS, vérifier le registre-journal

L'utilisateur (MOE / OPC, en appui de la coordination SPS) doit **auditer un Plan Général de Coordination (PGC)**, **vérifier la complétude d'un PPSPS** d'entreprise et **contrôler la tenue du registre-journal** du CSPS. Tu produis un avis de conformité motivé. Cf. corpus `csps_securite_chantier.md`.

> ⚠️ La **responsabilité de la coordination SPS** incombe au **CSPS** désigné par le MOA. Le MOE/OPC **vérifie l'existence et la cohérence** des documents SPS et **réagit aux alertes** du CSPS ; il **ne se substitue pas** au coordonnateur.

## 1. Documents attendus

- **PGC** (Plan Général de Coordination SPS) — et ses mises à jour
- **PPSPS** de l'entreprise (Plan Particulier de Sécurité et de Protection de la Santé) à valider
- **Registre-journal** du CSPS
- **Contrat CSPS** (MOA ↔ coordonnateur) et **niveau de coordination** retenu
- **DIUO** en préparation (cf. fiche `doe_diuo_constitution.md`)
- **Estimation du volume de travaux** (hommes-jours) et **nombre d'entreprises** (pour la catégorie)
- Liste des **travaux dangereux** présents sur l'opération

Si pièces partielles : demande
1. **Catégorie / niveau** de coordination (volume h-J, nombre d'entreprises) ?
2. Un **CSPS** est-il désigné (contrat écrit) et de quel **niveau** ?
3. Le chantier comporte-t-il des **travaux dangereux** (liste des 17 — arrêté 25/02/2003) ?
4. Phase : **conception** (audit PGC) ou **réalisation** (PPSPS, registre-journal) ?
5. Présence d'**amiante / plomb** (procédures spécifiques) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("coordination SPS niveaux catégories R.4532-1 R.4532-77")`
- `rag_search("PGC plan général de coordination contenu R.4532-12")`
- `rag_search("PPSPS contenu obligatoire R.4532-65 délai transmission")`
- `rag_search("registre journal CSPS visites décisions")`
- `rag_search("travaux dangereux liste 17 arrêté 25 février 2003")`
- `rag_search("CISSCT collège interentreprises 1re catégorie R.4532-77")`
- `rag_search("CCAG-Travaux 2021 article 28 sécurité chantier")`

## 3. Procédure d'audit

### Étape 1 — Catégorie d'opération et CSPS
- Déterminer la **catégorie** : **1re catégorie / niveau I = > 10 000 hommes-jours ET > 10 entreprises** (TCE) — art. **R.4532-77** ; sinon 2e ou 3e catégorie.
- Vérifier qu'un **CSPS du niveau requis** est **désigné par contrat écrit**, au bon moment (conception pour niveau I).
- En 1re catégorie : **CISSCT** obligatoire ; vérifier sa constitution.

### Étape 2 — Audit du PGC
Vérifier la présence des rubriques (R.4532-12) :
- Renseignements administratifs du chantier
- **Mesures d'organisation générale** et coordination des **moyens communs** (échafaudages, grue, base vie, gardiennage)
- **Liaisons** entre intervenants (MOA, MOE, entreprises, CT, OPC)
- **Protections collectives**
- Mesures spécifiques aux **travaux dangereux** présents
- **Travaux interdits** / consignations / procédures (interférences)
- Modalités de **mise à jour** du PGC

### Étape 3 — Validation du PPSPS
- **Transmis dans les délais** : **30 jours** avant intervention (niveau I) / **8 jours** (niveaux II-III).
- Contenu (R.4532-65) : identification, description des travaux/planning, **analyse de risques par tâche**, **mesures de prévention** (protections collectives, EPI, consignes), **moyens de secours**, **coordination** avec les autres entreprises, **mesures pour sous-traitants**.
- **Cohérence avec le PGC** et avec les **PPSPS des lots interférents** ?
- Traitement spécifique des **travaux dangereux** présents (chute > 3 m, amiante, plomb, ensevelissement, électrique HT…) ?

### Étape 4 — Registre-journal
- Tenu par le CSPS, à jour : **visites SPS**, **décisions**, **réunions de coordination**, **observations remises**.
- Fréquence des **visites** conforme au niveau (niveau I : hebdomadaire ; niveau II : bimensuelle minimum).

### Étape 5 — Avis et alertes
- Émettre un **avis de conformité** (favorable / avec réserves / défavorable).
- Pour toute **carence de sécurité grave** : **alerter immédiatement** le CSPS et le MOA (et, si danger grave et imminent, faire **arrêter** la tâche concernée).

## 4. Restitution structurée

```
## Audit SPS — [Chantier] — [PGC / PPSPS / registre-journal]

**Opération** : [...]   **Catégorie / niveau** : [I / II / III] (volume [..] h-J, [..] entreprises)
**CSPS désigné** : [oui — niveau / non]   **CISSCT** : [requis & constitué / N.A.]
**Référence** : Code du travail R.4532-1, R.4532-77 (catégories), R.4532-12 (PGC), R.4532-65 (PPSPS) ; arrêté 25/02/2003 (travaux dangereux)

### Audit du PGC
| Rubrique | Présente | Conforme | Observation |
|---|---|---|---|
| Organisation générale / moyens communs | ✅/❌ | ✅/⚠️ | |
| Protections collectives | ✅/❌ | | |
| Travaux dangereux traités | ✅/❌ | | |
| Travaux interdits / consignations | ✅/❌ | | |
| Modalités de mise à jour | ✅/❌ | | |

### Validation du PPSPS — [entreprise]
| Critère | Constat | Statut |
|---|---|---|
| Transmis dans les délais (30 j / 8 j) | [...] | ✅/❌ |
| Analyse de risques par tâche | [...] | ✅/⚠️ |
| Mesures de prévention (collectif/EPI) | [...] | ✅/⚠️ |
| Moyens de secours | [...] | ✅/❌ |
| Cohérence PGC + lots interférents | [...] | ✅/⚠️ |
| Travaux dangereux traités | [...] | ✅/❌ |

### Registre-journal
| Critère | Constat | Statut |
|---|---|---|
| Tenu et à jour | [...] | ✅/❌ |
| Fréquence des visites conforme au niveau | [...] | ✅/⚠️ |

### Avis et alertes
- **Avis** : ✅ favorable / ⚠️ favorable avec réserves / ❌ défavorable
- **Alertes sécurité** (le cas échéant) : [...] → CSPS + MOA notifiés
```

5. **Cite systématiquement** : **Code du travail R.4532-1 et R.4532-77** (catégories / 1re catégorie : > 10 000 h-J ET > 10 entreprises), **R.4532-12** (PGC), **R.4532-65** (PPSPS), **arrêté 25/02/2003** (travaux dangereux), **CCAG-Travaux 2021 art. 28** (sécurité).

## 5. Livrable (`generer_rapport`)

Propose un **rapport d'audit SPS DOCX/PDF** (avis motivé + réserves + alertes) ; pour un suivi multi-entreprises, une **matrice de suivi des PPSPS XLSX** (entreprise, date de transmission, statut, travaux dangereux).

> `generer_rapport({ titre: "Audit SPS — [chantier]", contenu, format: "pdf", agent: "moex", metadata: { operation, niveau } })`

Mention finale obligatoire : *« Document préparé par l'agent IA MOEX — avis à valider par le maître d'œuvre, en lien avec le CSPS. Ne se substitue pas à la mission du coordonnateur SPS. »*

## 6. Garde-fous spécifiques

- **Seuil de référence fiabilisé** : 1re catégorie / niveau I = **> 10 000 hommes-jours ET > 10 entreprises** (R.4532-77) — n'utilise **aucune autre valeur**.
- Le MOE/OPC **ne se substitue pas au CSPS** : il **vérifie**, **alerte** et **réagit** ; la coordination reste de la responsabilité du coordonnateur désigné.
- En cas de **danger grave et imminent** : faire **arrêter** la tâche concernée et alerter **immédiatement** CSPS + MOA (et l'inspection du travail si nécessaire).
- **Amiante / plomb** : procédures spécifiques (sous-sections 3/4 amiante, CARSAT) — ne valide pas un PPSPS générique ; exige le **mode opératoire / plan de retrait** adéquat.
- Vérifie la **cohérence inter-lots** des PPSPS (interférences) : c'est là que naissent les accidents.
- Tu **n'établis pas** le PGC ni le PPSPS (rôles CSPS / entreprise) : tu les **audites**.

## 7. Suites logiques à proposer

- **Point SPS** systématique en réunion de chantier (skill `analyse_cr_chantier`)
- Demande de **régularisation** d'un PPSPS non conforme avant intervention
- Articulation avec la **gestion des déchets dangereux** (skill `controler_gestion_dechets`)
- Finalisation du **DIUO** à la réception (skill `controler_doe_diuo`)
- En cas de carence persistante : **OS** rappelant les obligations de sécurité (skill `rediger_os`, CCAG art. 28)
