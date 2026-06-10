# Skill — Monter un dossier d'autorisation d'urbanisme (PC / PCMI / DP / PA / PD)

L'utilisateur te décrit un projet (construction, extension, rénovation, clôture, lotissement, démolition) — tu dois **qualifier le régime d'autorisation**, lister les **pièces** et le **CERFA**, préparer le **dépôt** et baliser l'**instruction**.

## Procédure attendue

### 1. Identifier le contexte (demande-le si absent)

- **Nature des travaux** : construction neuve / extension / surélévation / changement de destination / ravalement / clôture / piscine / démolition / lotissement / panneaux PV.
- **Surfaces** : SDP et emprise au sol créées (cf. skill `calculer_surfaces`).
- **Localisation** : zone PLU, **secteur protégé** (abords MH / SPR) ? commune ayant institué la DP clôtures / PD ?
- **Demandeur** : personne physique ou morale (incidence sur le seuil architecte 150 m² SDP).
- **Existant** : modification des structures porteuses ou de la façade ?

### 2. Qualifier le régime (`rag_search` sur le corpus autorisations)

Appuie-toi sur les seuils R.421 (`rag_search("seuils R.421 DP PC emprise surface de plancher")`) :

| Cas | Régime probable |
|---|---|
| Construction/extension **> 20 m²** (ou > 40 m² en zone U PLU) ou portant le total **> 150 m² SDP** | **PC / PCMI** |
| Construction/extension **5 à 20 m²** (40 m² zone U) | **DP** |
| Modification d'aspect, ravalement secteur protégé, changement de destination **sans** toucher structure/façade | **DP** |
| Changement de destination **avec** modification structure/façade | **PC** |
| Clôture (si commune l'a instituée), piscine 10-100 m² | **DP** |
| Lotissement, aménagement, affouillement important | **PA** |
| Démolition (secteur protégé ou commune l'ayant institué) | **PD** |

→ Si plusieurs travaux : retenir le **régime le plus protecteur** et regrouper sur un seul dossier quand c'est possible.

### 3. Identifier le CERFA

| Régime | CERFA (à confirmer service-public.fr) |
|---|---|
| PCMI (maison individuelle) | **13406** |
| PC autres | **13409** |
| DP travaux | **13404** |
| DP lotissement / divisions | **13702** |
| PA | **13409** (volet aménager) / **13703** |
| PD | **13405** |
| CU | **13410** |
| Autorisation/ouverture ERP | **13824** |

> Rappelle systématiquement : *le numéro et la notice CERFA évoluent — à confirmer à la date de dépôt sur service-public.fr (valeur à revérifier à la date de consultation).*

### 4. Lister les pièces du dossier

Pour un **PCMI**, dérouler PCMI1 à PCMI8 (situation, masse coté 3D, coupe TN/projeté, notice, façades/toitures, insertion 3D, photos proche et lointain) + pièces complémentaires selon contexte :
- **Attestation RE2020** (PCMI14-1)
- **Étude de sol G1** (zone RGA, loi ELAN)
- **Volet paysager** / insertion
- **Autorisation ABF** si abords MH / SPR (cf. skill `verifier_abf_secteur_protege`)
- **Dérogations PMR** si logement collectif (cf. skill `verifier_pmr`)
- Notice **sécurité incendie** + accessibilité si **ERP** (CERFA 13824)

Pour une **DP** : DP1 à DP8 selon les travaux.

### 5. Préparer le dépôt et baliser l'instruction

- **Dépôt** en mairie ou **téléservice** (obligatoire communes ≥ 3 500 hab.). Récépissé = date de dépôt + délai.
- **Délais de droit commun** : DP 1 mois, PCMI 2 mois, PC/PA 3 mois, PD 2 mois.
- **Majorations** à anticiper : ERP/IGH (5 mois), ABF/SPR, consultation réseaux (+1 mois).
- **Complétude** : demande de pièces possible dans le 1er mois (délai suspendu ; 3 mois pour compléter).
- **Décision tacite** à l'échéance (permis tacite / non-opposition, sauf cas ABF conforme, sécurité).
- **Affichage** : panneau réglementaire sur terrain ≥ 2 mois continus + **constats d'huissier** ; recours des tiers **2 mois** (R.600-1/2).
- Surveiller : **retrait** (3 mois), **péremption** (3 ans + 2×1 an), **modificatif / transfert** si besoin.

## Restitution structurée

```
## Montage du dossier d'autorisation — [Projet]

### Identification
- **Travaux** : [description]
- **SDP / emprise créées** : [m²]
- **Localisation** : [zone PLU] — secteur protégé : [oui/non]
- **Demandeur** : [personne physique / morale]

### Qualification du régime
| Critère | Constat | Conséquence |
|---|---|---|
| Seuil SDP/emprise | [valeur] | [DP / PC] |
| Total après travaux vs 150 m² SDP | [valeur] | [architecte obligatoire ?] |
| Secteur protégé | [oui/non] | [avis ABF / PD] |
| ERP | [oui/non] | [13824, délai 5 mois] |

→ **Régime retenu : [PC / PCMI / DP / PA / PD]** — CERFA **[n°]** (à confirmer service-public.fr).

### Pièces à fournir
| Pièce | Présente ? | Observation |
|---|---|---|
| PCMI1 plan de situation | ☐ | |
| ... | ☐ | |
| Attestation RE2020 | ☐ | |
| Étude de sol G1 (RGA) | ☐ | |
| Autorisation ABF | ☐ | si secteur protégé |

### Parcours d'instruction prévisionnel
- Délai de droit commun : **[X mois]** ; majorations anticipées : [ABF / ERP / réseaux]
- Risque de demande de pièces : [points sensibles]
- Affichage + constats huissier ; recours tiers 2 mois
- Jalons : retrait 3 mois / péremption 3 ans (+2×1 an)

### Niveau de confiance
- [Élevé / à valider / à confirmer]

### Pièces complémentaires recommandées
- [coupes cotées, insertion, étude de sol, etc.]
```

## Exemple

> *Extension de 35 m² SDP sur une MI existante de 130 m² en zone U d'un PLU, hors secteur protégé, propriétaire particulier.*
> - Total après travaux : **165 m² SDP** → dépasse **150 m²** → **PC + architecte obligatoire** (art. 4 loi 1977).
> - Bien que > 40 m² → de toute façon PC. CERFA **13406** (PCMI). Pièces PCMI1-8 + attestation **RE2020** (création de surface) + **étude de sol G1** si zone RGA.
> - Délai de droit commun **2 mois** (PCMI). Affichage + constats huissier ; recours tiers 2 mois.

## Proposition de livrable

À l'issue, propose via l'outil **`generer_rapport`** un **dossier de montage d'autorisation** :
- **DOCX** : note de qualification du régime + liste des pièces (checklist) + parcours d'instruction.
- **PDF** : version transmissible au MOA / mairie.
- Mention finale : *« Document préparé par l'agent IA Architecte — régime à confirmer auprès du service instructeur ; numéro CERFA à vérifier à la date de dépôt. À valider et signer par l'architecte (DPLG / HMONP). »*

Appelle `generer_rapport({ titre, contenu, format: "docx"|"pdf", agent: "architecte", metadata })`.

## Garde-fous spécifiques

- **Aucune validation finale du régime** : la qualification définitive appartient au **service instructeur**. Tu signales le régime **probable** et les points à confirmer.
- **N'invente jamais un numéro CERFA** ni un seuil : si incertain, renvoie à service-public.fr **(valeur à revérifier à la date de consultation)**.
- Rappelle le **seuil architecte 150 m² SDP** pour les personnes physiques (art. 4 loi 77-2 du 3 janvier 1977) et **toujours** pour les personnes morales.
- En **secteur protégé** (abords MH / SPR), signale l'**avis ABF** (souvent conforme) et la **majoration du délai** ; oriente vers la skill `verifier_abf_secteur_protege`.
- Pour les **ERP**, ne pas oublier l'**autorisation de travaux / ouverture** (CERFA 13824) et le délai **5 mois** ; oriente vers `verifier_erp` et `verifier_securite_incendie_erp`.
- Si les **surfaces** ne sont pas fiables, renvoie d'abord à la skill `calculer_surfaces` avant de conclure sur le régime.
- Insiste sur l'**affichage réglementaire + constats d'huissier** : c'est ce qui purge les **recours des tiers** (2 mois).
