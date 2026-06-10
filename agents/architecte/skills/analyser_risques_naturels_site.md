# Skill — Analyser les risques naturels d'un site

L'utilisateur te transmet une **adresse / parcelle**, un programme, des extraits de PLU/PPR, un État des Risques (ERP/ERNT) ou une étude de sol — tu dois analyser l'**exposition du terrain/projet aux risques naturels et à l'eau** (PPRN/PPRI, retrait-gonflement des argiles, eaux pluviales, assainissement) et en déduire les **contraintes constructives**. Tu t'appuies sur le corpus `risques_naturels_eau_assainissement`.

## Procédure attendue

### 1. Identification du site et du projet (demande si absent)

- **Localisation** : commune, parcelle (section/numéro), adresse.
- **Nature du projet** : MI / logement collectif / ERP / extension ; surface de plancher, emprise au sol, imperméabilisation prévue.
- **Raccordement** : réseau d'assainissement **collectif** ou **non collectif** (ANC) ; réseau pluvial existant ?
- **Documents disponibles** : extrait PLU + annexes, règlement PPR, État des Risques (ERP/ERNT), étude de sol (G1/G2), test de perméabilité.

> Rappelle systématiquement la consultation de **Géorisques (georisques.gouv.fr)** et des **annexes du PLU** pour établir l'exposition réelle de la parcelle.

### 2. Points d'analyse systématiques

Structure ta réponse selon le format imposé :

```
N°. [Article / Code] → Exposition/Exigence → Constat sur le site → Niveau → Contrainte constructive / Recommandation
```

#### A. PPRN / PPRI — inondation et mouvements de terrain

- Commune/parcelle couverte par un **PPRN/PPRI** ? (servitude annexée au PLU, Code env. L.562-1 et s.)
- **Zone** d'appartenance : rouge (inconstructible) / bleue (sous prescriptions) / blanche.
- **Cote PHE / cote de référence** : caler le **plancher habitable** au-dessus (souvent PHE + 20 cm — **à vérifier au règlement**).
- Prescriptions : pas de sous-sol habitable, zone refuge, matériaux insensibles, transparence hydraulique, emprise limitée.

#### B. Retrait-gonflement des argiles (RGA)

- **Zone d'exposition** (faible / moyenne / forte — Géorisques).
- En zone **moyenne/forte** (loi ELAN art. 68, décret 2019-495) : **étude G1** (vente terrain) et **étude G2** (construction MI) **obligatoires** — NF P 94-500.
- Fondations adaptées (ancrage, semelles) **ou** techniques forfaitaires ; risque décennal majeur sur sol argileux.

#### C. Eaux pluviales (loi sur l'eau / zonage pluvial)

- **Gestion à la parcelle** : infiltration prioritaire, sinon **rétention** + **débit de fuite** limité (souvent 1 à 3 L/s/ha — **à vérifier au règlement local**).
- Dimensionnement de la **rétention** selon surface imperméabilisée et pluie de référence.
- Seuil **IOTA rubrique 2.1.5.0** (R.214-1) : bassin versant intercepté **≥ 1 ha → Déclaration** loi sur l'eau ; **≥ 20 ha → Autorisation**.
- Aptitude du sol à l'infiltration (perméabilité) — test à intégrer à l'étude de sol.

#### D. Assainissement non collectif (ANC)

- Si **non raccordable** au collectif : dispositif **ANC** + **contrôle de conception du SPANC** (pièce souvent exigée au PC).
- **Dimensionnement** ≈ nombre de pièces principales (EH) ; choix de **filière** (traditionnelle sol/filtre à sable, ou agréée : microstation / filtre compact / filtre planté).
- Implantation (distances limites/puits/captages) + exutoire (infiltration prioritaire).

#### E. Article R.111-2 du Code de l'urbanisme

- Même **hors PPR approuvé**, un projet exposé (zone inondable connue, terrain instable) peut être **refusé ou encadré** pour des motifs de **sécurité/salubrité publique**.

### 3. Pour chaque point

- **Cite** l'article/code précis (L.562-1, R.214-1 rubr. 2.1.5.0, loi ELAN art. 68, CGCT L.2224-8, R.111-2…).
- Donne l'**exposition** et l'**exigence chiffrée** (cote, débit de fuite, seuil ha).
- Fais le **constat** sur le site (à partir des documents / Géorisques).
- Statue : ✅ favorable / ⚠️ sous conditions / ❌ contrainte forte ou inconstructible.
- Propose la **contrainte constructive** ou l'étude à diligenter.

## Restitution structurée

```
## Analyse risques naturels & eau — [Site / Projet]

### Identification
- **Commune / parcelle** : [...]
- **Projet** : [MI / collectif / ERP] — SDP [..] m², imperméabilisation [..] m²
- **Assainissement** : collectif / non collectif (ANC)

### Tableau d'exposition
| N° | Code/Article | Exposition / Exigence | Constat site | Niveau | Contrainte constructive |
|---|---|---|---|---|---|
| 1 | L.562-1 (PPRI) | zone [..], cote PHE [..] | [...] | ✅/⚠️/❌ | plancher ≥ PHE+0,20 m |

### Synthèse des contraintes constructives
- **Inondation** : cote plancher, interdiction sous-sol, ...
- **RGA** : études G1/G2 requises (zone moyenne/forte) — fondations adaptées
- **Eaux pluviales** : rétention [..] m³, débit de fuite [..] L/s ; IOTA déclaration : oui/non
- **ANC** : filière [..] + contrôle SPANC

### Études / démarches à diligenter
- [G2 géotechnique, test de perméabilité, dossier loi sur l'eau, contrôle SPANC...]

### Niveau de confiance
- [Élevé / à valider — selon disponibilité du règlement PPR et de l'étude de sol]

### Pièces complémentaires recommandées
- [règlement PPR, étude de sol G1/G2, zonage pluvial, contrôle SPANC]
```

## Exemple

> *MI 130 m² SDP sur terrain argileux (zone RGA forte), commune avec PPRI, parcelle en zone bleue, hors réseau collectif.*
> - **PPRI zone bleue** (L.562-1) : constructible sous prescriptions → caler plancher **≥ cote PHE + 0,20 m**, pas de sous-sol → ⚠️ sous conditions.
> - **RGA fort** (loi ELAN art. 68, décret 2019-495) : **G1 + G2 obligatoires** → fondations dimensionnées par le BE sol → ❌ contrainte forte (étude requise avant PRO).
> - **Eaux pluviales** : bassin versant < 1 ha → pas de déclaration IOTA, mais **rétention à la parcelle** + débit de fuite selon zonage pluvial.
> - **ANC** : filière à valider avec le **SPANC** (contrôle de conception) avant dépôt du PC.

## Proposition de livrable

Propose via l'outil **`generer_rapport`** une **note d'analyse risques naturels & eau** :
- **PDF + DOCX** : identification du site, tableau d'exposition (code → exigence → constat → niveau → contrainte), synthèse des contraintes constructives, études à diligenter, pièces complémentaires.
- Mention finale : *« Document préparé par l'agent IA Architecte — exposition à confirmer sur Géorisques et au règlement du PPR ; les études géotechniques et hydrauliques relèvent de bureaux spécialisés. »*

Appelle `generer_rapport({ titre, contenu, format: "pdf"|"docx", agent: "architecte", metadata })`.

## Garde-fous spécifiques

- **Aucune validation finale.** Tu signales l'exposition et les contraintes — la qualification du risque et le dimensionnement (cote, rétention, fondations, filière ANC) relèvent de **bureaux d'études spécialisés** (géotechnique, hydraulique, SPANC).
- L'**exposition réelle** se vérifie sur **Géorisques** et au **règlement du PPR** : ne jamais affirmer une cote/zone de mémoire — renvoie au document.
- Les **valeurs chiffrées** (cote PHE + 20 cm, débit de fuite 1–3 L/s/ha, seuils IOTA) sont **indicatives** et **à revérifier au règlement local et à la nomenclature en vigueur**.
- Si les documents sont insuffisants (pas de règlement PPR, pas d'étude de sol), **liste explicitement** les pièces à obtenir plutôt que d'inventer une cote ou un zonage.
- Rappelle l'article **R.111-2** : un projet peut être refusé pour sécurité/salubrité même hors PPR.
