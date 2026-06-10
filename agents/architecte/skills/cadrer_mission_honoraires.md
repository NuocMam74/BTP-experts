# Skill — Cadrer une mission de maîtrise d'œuvre et estimer les honoraires

L'utilisateur te transmet un projet (programme, budget, type d'ouvrage) — tu dois **cadrer la mission MOE** (phasage loi MOP), **estimer les honoraires**, et lister les **points clés du contrat** d'architecte.

## Procédure attendue

### 1. Identifier le contexte (demande-le si absent)

- **Type d'ouvrage** : MI / logement collectif / tertiaire / ERP / réhabilitation.
- **Marché** : **public** (loi MOP / Code de la commande publique → mission de base obligatoire) ou **privé** (liberté contractuelle).
- **Programme** défini ? **Budget travaux** prévisionnel (HT) ?
- **Étendue souhaitée** : conception seule / PC seul / mission complète / suivi de chantier.
- **Existant** : diagnostic (DIAG) nécessaire (réhabilitation) ?

### 2. Cadrer le phasage loi MOP (`rag_search` sur loi_mop)

Appuie-toi sur le corpus loi MOP (`rag_search("loi MOP éléments de mission ESQ APS APD PRO ACT VISA DET AOR")`) :

| Sigle | Phase | À retenir |
|---|---|---|
| **ESQ** | Esquisse (option) | Traduction du programme, enveloppe prévisionnelle |
| **APS** | Avant-projet sommaire | Faisabilité, estimation ±10-15 % |
| **APD** | Avant-projet définitif | Choix arrêtés, **dépôt du PC**, estimation ±5 % |
| **PRO** | Études de projet | CCTP, DPGF/DQE, coût par lot |
| **ACT** | Assistance contrat travaux | DCE, analyse des offres |
| **VISA / EXE** | Exécution | Visa des plans EXE entreprise |
| **DET** | Direction de l'exécution | Réunions, OS, situations |
| **AOR** | Assistance réception | OPR, réception, GPA, DOE/DIUO |
| **OPC** | Ordonnancement-pilotage | Planning, interfaces |

- **Mission de base** (public, bâtiment) : APS+APD+PRO+ACT+VISA+DET+AOR — **obligatoire**.
- **Mission complète** : mission de base + EXE + OPC.
- En **réhabilitation** : ajouter le **DIAG** en amont de l'APS.

### 3. Estimer les honoraires (`rag_search` sur contrat_architecte + loi_mop)

Mobilise le corpus contrat d'architecte (`rag_search("honoraires architecte pourcentage travaux forfait barème")`) :

| Mode | Quand l'employer |
|---|---|
| **% du coût travaux HT** | Mission complète, le plus courant |
| **Forfait** | Programme défini — recommandé (CNOA), sécurise le MOA |
| **Vacation** | Conseil, missions ponctuelles |

**Ordres de grandeur indicatifs** (négociables en marché privé) :
- MI mission complète : **~8 à 12 %** des travaux HT.
- Logement collectif / tertiaire courant : **~7 à 11 %** (classes loi MOP : 1 simple 4-8 %, 2 courant 7-11 %, 3 complexe 10-14 %).
- **PC seul** (conception + dépôt) : **~3 à 5 %** ou forfait.

> Rappelle : barèmes **indicatifs, librement négociables (valeur à revérifier à la date de consultation)**.

### 4. Points clés du contrat (corpus contrat d'architecte)

- **Contrat-type CNOA** ; mission **complète vs partielle** clairement délimitée.
- **Devoir de conseil** : alerter par écrit si mission partielle (risque de perte de maîtrise du chantier).
- **Échéancier** par phase ; **avenant** pour toute évolution.
- **Assurances** : RC professionnelle + **décennale** (attestation avant ouverture du chantier, L.243-2).
- **Inscription à l'Ordre** ; **déontologie** (indépendance, pas de signature de complaisance).
- **Résiliation**, propriété intellectuelle, conciliation Ordre préalable.

## Restitution structurée

```
## Cadrage de mission MOE — [Projet]

### Identification
- **Ouvrage** : [type] — **marché** : [public / privé]
- **Budget travaux HT** : [montant]
- **Étendue** : [complète / de base / partielle / PC seul]

### Phasage proposé (loi MOP)
| Phase | Incluse ? | Livrables clés |
|---|---|---|
| DIAG (réhab) | ☐ | état des lieux |
| ESQ | ☐ | esquisse |
| APS | ☐ | estimation ±10-15 % |
| APD | ☐ | PC, estimation ±5 % |
| PRO | ☐ | CCTP, DPGF |
| ACT | ☐ | DCE, analyse offres |
| VISA/EXE | ☐ | visa plans |
| DET | ☐ | suivi chantier |
| AOR | ☐ | réception, DOE |
| OPC | ☐ | planning |

### Estimation des honoraires
- Mode retenu : [% / forfait / vacation]
- Fourchette : **[X à Y %]** de [budget] HT ≈ **[montant indicatif]**
- *(barème indicatif, négociable — valeur à revérifier à la date de consultation)*

### Points de vigilance contractuels
| Point | État | Recommandation |
|---|---|---|
| Mission complète/partielle | | devoir de conseil écrit si partielle |
| Échéancier par phase | | |
| Assurances RC + décennale | | attestation avant chantier |
| Avenant TMA | | |

### Niveau de confiance
- [Élevé / à valider — dépend du budget et de la complexité réelle]
```

## Exemple

> *MI neuve, marché privé, budget travaux 280 000 € HT, mission complète demandée.*
> - Phasage : ESQ→AOR (complète). Honoraires **~9-11 %** → **~25 000 à 31 000 € HT** (indicatif, négociable).
> - Contrat-type CNOA, forfait recommandé (programme défini), assurances RC + décennale à jour, échéancier par phase.

## Proposition de livrable

Propose via l'outil **`generer_rapport`** un **projet de note de cadrage de mission + simulation d'honoraires** :
- **DOCX** : note de cadrage (phasage, mission, points contractuels).
- **XLSX** : simulation d'honoraires (phases × % × budget, modifiable).
- Mention finale : *« Document préparé par l'agent IA Architecte — barèmes indicatifs et négociables ; contrat à établir sur la base du contrat-type CNOA et à signer par l'architecte (DPLG / HMONP). »*

Appelle `generer_rapport({ titre, contenu, format: "docx"|"xlsx", agent: "architecte", metadata })`.

## Garde-fous spécifiques

- **Pas de barème opposable** : les honoraires sont **librement négociés** en marché privé ; n'affiche que des **fourchettes indicatives (valeur à revérifier à la date de consultation)**.
- En **commande publique** (loi MOP), rappelle la **mission de base obligatoire** pour les opérations de bâtiment et le recours à l'architecte (art. 3 loi 1977).
- **Devoir de conseil** : si le MOA demande une **mission partielle** (ex. PC seul), alerte **explicitement et par écrit** sur les risques.
- **Déontologie** : rappelle l'interdiction de **signature de complaisance** et l'obligation d'**indépendance** (décret 80-217) ; pas de commission d'entreprise.
- Ne **chiffre pas** d'honoraires fermes : tu proposes une **estimation** à valider par l'architecte.
- Renvoie à la skill `qualifier_desordre_garantie` pour le volet responsabilité/assurance, et à `monter_dossier_autorisation` pour le PC.
