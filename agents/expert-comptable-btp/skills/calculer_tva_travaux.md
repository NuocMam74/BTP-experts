# Skill — Déterminer le taux de TVA applicable à des travaux

L'utilisateur veut savoir quel taux de TVA appliquer (**20 % / 10 % / 5,5 % / 2,1 %**) à des travaux donnés selon le CGI et la doctrine BOFIP.

## 1. Documents attendus / paramètres à collecter

L'utilisateur fournit typiquement :
- **Devis ou facture** de l'entreprise BTP (PDF)
- **Description des travaux** (nature, lieu, équipements posés)
- **Attestation 1300-SD ou 1301-SD** signée par le client (cruciale)
- **Justificatif d'âge** du logement (acte notarié, déclaration achèvement DAACT, taxe foncière)
- **Pour rénovation énergétique** : devis détaillé + caractéristiques techniques équipement
- **Statut du client** (particulier, bailleur HLM, SCI, association, professionnel)

Si paramètres absents, demande **impérativement** :
1. Nature des travaux : construction neuve / reconstruction / surélévation / extension / rénovation / entretien / amélioration ?
2. Type de local : habitation principale / résidence secondaire / locatif / mixte / professionnel ?
3. Âge du local : **achevé depuis plus de 2 ans à la date du devis** ? Oui / Non / À vérifier
4. Statut du client : particulier / SCI / bailleur social / collectivité / pro ?
5. Pose **et** fourniture, ou pose seule, ou fourniture seule ?
6. Pour rénovation énergétique : **type d'équipement précis** (isolation toiture/murs/sols, PAC air-eau / air-air / géothermique, chaudière à condensation, chauffe-eau thermodynamique, VMC double flux, etc.) + **caractéristiques techniques** (label, marquage CE, performance) ?
7. **Attestation client** 1300-SD (taux 10 %) ou 1301-SD (taux 5,5 %) signée **avant le début des travaux** ? Oui / Non
8. Local situé en **DOM-TOM** ? (taux spécifiques Guadeloupe, Martinique, Réunion : 8,5 % standard, etc.)

## 2. Référentiels (`rag_search` obligatoire pour cas limites)

- `rag_search("CGI article 278 taux normal TVA 20 %")` — taux de base
- `rag_search("CGI article 279-0 bis travaux logement 10 %")` — travaux taux intermédiaire
- `rag_search("CGI article 278-0 bis A rénovation énergétique 5,5 %")` — taux réduit
- `rag_search("CGI article 296 DOM TVA spécifique")` — taux DOM
- `rag_search("BOFIP BOI-TVA-LIQ-30-20-90 travaux immobiliers logement")` — doctrine taux 10 %
- `rag_search("BOFIP BOI-TVA-LIQ-30-20-95 rénovation énergétique 5,5")` — doctrine taux 5,5 %
- `rag_search("attestation simplifiée 1300-SD 1301-SD")` — modèles et exigences formelles
- `rag_search("CGI 283 nonies autoliquidation sous-traitance BTP")` — pour cas sous-traitance

## 3. Arborescence de décision

```
┌── Travaux dans un local d'HABITATION ?
│   ├── NON (local professionnel pur) → 20 % (CGI art. 278)
│   │
│   └── OUI →
│       ├── Local achevé depuis + 2 ans à la date d'émission du devis ?
│       │   ├── NON (neuf / – 2 ans) → 20 % (sauf accession sociale ZUS/QPV : 5,5 %)
│       │   │
│       │   └── OUI →
│       │       ├── Travaux de rénovation énergétique listés à l'arrêté
│       │       │   du 17 mars 2014 (mis à jour annuellement) ?
│       │       │   ├── OUI + attestation 1301-SD + matériel éligible
│       │       │   │   → 5,5 % (CGI art. 278-0 bis A)
│       │       │   │
│       │       │   └── NON → 10 % (CGI art. 279-0 bis) si :
│       │       │       - amélioration / transformation / aménagement / entretien
│       │       │       - PAS sortie du champ (cf. §5 ci-dessous)
│       │       │       - attestation 1300-SD signée AVANT travaux
│       │       │
│       │       └── Surélévation augmentant SDP > 10 % ou créant nouveau logt ?
│       │           → 20 % (assimilé à construction neuve)
│       │
│       └── Logement social (HLM, livraison à soi-même) →
│           règles particulières (5,5 % ou 10 %), CGI art. 278 sexies, voir BOFIP
```

## 4. Tableau de synthèse des taux

| Nature des travaux | Type local | Âge | Taux | Référence CGI |
|---|---|---|---|---|
| Construction neuve | Tous | Neuf | **20 %** | art. 278 |
| Reconstruction / démolition + reconstruction | Tous | — | **20 %** | art. 278 ; BOI-TVA-IMM-20 |
| Surélévation avec création de logement neuf | Habitation | — | **20 %** | doctrine BOFIP |
| Surélévation conservant logement existant | Habitation | + 2 ans | **10 %** | art. 279-0 bis |
| Extension < 10 % SDP | Habitation | + 2 ans | **10 %** | doctrine, attestation 1300-SD |
| Extension > 10 % SDP | Habitation | + 2 ans | **20 %** | doctrine, considéré comme construction neuve |
| Travaux d'entretien (peinture, plomberie réparation) | Habitation | + 2 ans | **10 %** | art. 279-0 bis |
| Aménagement / transformation intérieure | Habitation | + 2 ans | **10 %** | art. 279-0 bis |
| Pose d'isolation thermique (toit, murs, sols) | Habitation | + 2 ans | **5,5 %** | art. 278-0 bis A, attestation 1301-SD |
| Pose PAC air-eau / géothermie | Habitation | + 2 ans | **5,5 %** | art. 278-0 bis A |
| Pose chaudière à condensation gaz | Habitation | + 2 ans | **5,5 %** | art. 278-0 bis A |
| Pose chauffe-eau thermodynamique / solaire | Habitation | + 2 ans | **5,5 %** | art. 278-0 bis A |
| Pose VMC double flux | Habitation | + 2 ans | **5,5 %** | art. 278-0 bis A |
| Travaux **induits** liés à rénovation énergétique | Habitation | + 2 ans | **5,5 %** | doctrine, dans limite 2 ans après pose |
| Climatisation seule (sans réversibilité PAC) | Habitation | + 2 ans | **10 %** | hors 5,5 % (pas chauffage) |
| Piscine, jacuzzi, sauna | Habitation | + 2 ans | **20 %** | doctrine BOFIP — exclu équipement de loisirs |
| Cuisine équipée (mobilier + électroménager) | Habitation | + 2 ans | **20 %** sur meubles / **10 %** sur installation | scinder le devis |
| Domotique non éligible énergétique | Habitation | + 2 ans | **10 %** ou **20 %** selon BOFIP | vérifier doctrine |
| Travaux en local mixte (pro + habitation) | Mixte | + 2 ans | **prorata habitable** (10 % ou 5,5 %) / **20 %** sur pro | scinder le devis |
| Construction logement social (LASM) | Social | Neuf | **5,5 %** ou **10 %** selon usage | art. 278 sexies |
| Travaux ICPE / industriel | Pro | Tous | **20 %** | art. 278 |
| Travaux dans local professionnel | Pro | Tous | **20 %** | art. 278 |
| **TVA DOM (sauf Mayotte)** | Tous | — | taux spécifiques 8,5 % standard | art. 296 |

## 5. Exclusions et travaux **non éligibles** au taux 10 % (sortie du champ — BOFIP)

Les travaux suivants restent à **20 %** même en logement de + 2 ans :
- Travaux qui concourent à la **production d'un immeuble neuf** au sens fiscal (création de SDP > 10 % et coût > 30 % de la construction)
- **Surélévation** créant un nouveau logement distinct
- **Reconstruction** sur l'emplacement d'un immeuble démoli
- Pose d'**équipements ménagers ou mobiliers** (cuisine encastrée, dressings, électroménager non encastré, mobilier de salle de bain)
- Aménagement d'**espaces de loisirs** : piscines, jacuzzis, saunas, hammams, courts de tennis, abris piscine, locaux pisciniers
- Travaux d'**aménagement extérieur** : terrasses, allées, clôtures (sauf liés à PMR), murets, portails, garages indépendants
- **Téléviseurs, ordinateurs, équipements high-tech** intégrés
- **Mobilier** au sens large : meubles, étagères, plans de travail meublants

## 6. Attestations clients — **OBLIGATOIRES**

### Attestation 1300-SD (taux 10 %)
- Obligatoire **avant le début des travaux** dans logement de + 2 ans
- Signée par le **client final** (occupant ou propriétaire bailleur)
- Conservée par l'entreprise **6 ans** (LPF art. L.176)
- Mentions : adresse exact, ancienneté du logement, description travaux

### Attestation 1301-SD (taux 5,5 %)
- Spécifique rénovation énergétique
- Mentions complémentaires : nature et caractéristiques techniques des équipements éligibles
- Idem 1300-SD pour délai et conservation

⚠️ **Sans attestation = requalification au taux 20 %** lors d'un contrôle fiscal, avec **majorations** (40 % si manquements délibérés, art. 1729 CGI) et **intérêts de retard** (0,2 %/mois, art. 1727 CGI).

## 7. Procédure

1. **Qualifier la nature des travaux** précisément (nomenclature BOFIP).
2. **Vérifier le statut et l'âge du local** (justificatifs).
3. **Identifier le taux applicable** via l'arborescence + tableau.
4. **Lister les attestations et pièces** à exiger ou fournir.
5. **Identifier les exclusions** (travaux à 20 % dans un devis multi-postes).
6. **Recommander la scission** d'un devis si plusieurs taux s'appliquent.
7. **Anticiper les contrôles** : conservation 5 à 6 ans des pièces.

## 8. Restitution structurée

```
## TVA — [Description courte des travaux]

### Qualification
- **Nature** : [...]
- **Local** : [habitation / professionnel / mixte]
- **Âge** : [neuf / + 2 ans / précision]
- **Client** : [particulier / pro / bailleur]
- **Lieu** : [métropole / DOM]

### Taux applicable : **[20 % / 10 % / 5,5 %]**

Si devis multi-postes :
| Poste | Description | Taux | Référence |
|---|---|---|---|
| 1 | Isolation toiture | 5,5 % | CGI art. 278-0 bis A |
| 2 | Reprise plâtrerie liée | 5,5 % | doctrine (travaux induits) |
| 3 | Peinture salon | 10 % | CGI art. 279-0 bis |
| 4 | Pose cuisine équipée (meubles) | 20 % | exclu BOFIP |

### Pièces justificatives à conserver (6 ans, LPF art. L.176)
1. **Attestation 1300-SD ou 1301-SD** signée par le client **AVANT** début des travaux
2. **Devis détaillé** séparant fourniture / pose si applicable
3. **Factures fournisseur** des équipements éligibles (rénovation énergétique : caractéristiques techniques, label, marquage CE)
4. **Justificatif d'ancienneté** du logement (DAACT, taxe foncière > 2 ans)
5. **Photos avant/après** si rénovation énergétique (preuve de l'éligibilité)

### Risques et cas limites
- [Identifier les ambiguïtés]
- [Recommandation : rescrit fiscal LPF L.80 B si > N € en jeu]
- [Recommandation : devis scindé par taux]

### Sanctions en cas d'erreur (rappel)
- **Requalification au taux 20 %** sur le délai de reprise (3 ans, art. L.169 LPF)
- **Intérêts de retard** : 0,2 %/mois (art. 1727 CGI)
- **Majoration** 40 % si manquement délibéré (art. 1729 CGI), 80 % si manœuvres frauduleuses

### Suites
- [Rescrit fiscal / mise à jour devis / formation client sur attestation]
```

## 9. Cas spécifiques détaillés

### A — Sous-traitance BTP : autoliquidation (CGI art. 283 nonies)
Si l'entreprise est un **sous-traitant** d'un donneur d'ordre lui-même assujetti BTP :
- Le sous-traitant facture **HT** (sans TVA collectée)
- Mention obligatoire : **"Autoliquidation — article 283 nonies du CGI"**
- Le donneur d'ordre **autoliquide** : déclare la TVA sur ses CA3 (ligne 02 ou 03 selon nature)
- Voir skill `controle_autoliquidation_btp` pour détails

### B — Logements à TVA réduite construits sur ZUS / QPV
- Taux **5,5 %** sur certaines opérations d'accession sociale en quartiers prioritaires (CGI art. 278 sexies-0 A)
- Conditions : ressources acquéreur, prix au m² plafonné, durée occupation

### C — Travaux dans monuments historiques
- Pas de régime TVA spécifique général
- Mais possibilité d'**imputation au revenu foncier** (régime fiscal MH, art. 156 II 1° ter)

### D — Locaux mixtes (habitation + pro)
- **Scinder le devis** par usage
- Habitation : 10 % ou 5,5 % selon nature
- Professionnel : 20 %
- Travaux **communs** (toiture, façade) : prorata des surfaces

### E — Bailleurs et SCI
- Bailleur personne physique = particulier → 10 % ou 5,5 % applicables (logement habitation + 2 ans)
- **SCI familiale** louant à un occupant : applicable
- **SCI de marchand de biens** : règles particulières (souvent 20 %)
- **Bailleur social (HLM, OPH, SEM)** : règles spécifiques CGI art. 278 sexies

## 10. Garde-fous spécifiques

- Pour un **cas limite** (transformation lourde, extension marginale, surélévation > 50 %, équipement non listé) : **n'invente pas un taux** — cite le BOFIP applicable et **recommande un rescrit fiscal** (LPF art. L.80 B) si le montant en jeu le justifie.
- Pour la **sous-traitance BTP** : rappelle systématiquement l'**autoliquidation art. 283 nonies CGI** — voir skill dédiée `controle_autoliquidation_btp`.
- Pour la **rénovation énergétique** : la liste des équipements éligibles évolue **chaque année** ; vérifier la **dernière version** de l'arrêté du 17 mars 2014 modifié + arrêté annuel DGEC + DGFiP. Si doute, taux 10 % par défaut sécurise.
- **Absence d'attestation client** (1300-SD ou 1301-SD) au moment des travaux = **requalification automatique au taux 20 %** par l'administration sur 3 ans de délai de reprise.
- L'**attestation** doit être conservée **6 ans** (LPF art. L.176) ; au-delà du délai de reprise, elle reste utile en cas de demande tardive.
- Tu **rappelles** que l'agent n'engage pas la responsabilité de l'expert-comptable utilisateur — l'avis fiscal final relève de lui.
- En cas de **mauvaise foi présumée** (taux 5,5 % appliqué sans équipement éligible) : majoration 40 % à 80 % + intérêts → privilégier la prudence.
- Tu **rappelles** que la TVA collectée est **due dès le fait générateur** (décaissement/encaissement selon régime — art. 269 CGI). Une erreur de taux donne lieu à une **régularisation** (DEB rectificative CA3).

## 11. Suites logiques à proposer

- Skill `controle_autoliquidation_btp` si situation de sous-traitance
- Skill `controle_situation_travaux` pour vérifier la TVA collectée sur situations
- Demande de **rescrit fiscal** (LPF art. L.80 B) pour les cas vraiment ambigus
- Mise à jour de la **documentation interne entreprise** : modèle d'attestation 1300/1301-SD pré-rempli, check-list devis multi-postes
- Vérification du **régime du client** : si bailleur professionnel ou SCI, vérifier conséquences (déductibilité TVA, option pour la TVA, etc.)
- Pour **MOA public** (collectivité, marché public) : vérifier FCTVA ou exonérations spécifiques selon nature de l'ouvrage
