# Skill — Aider à rédiger la notice descriptive PC

L'utilisateur prépare une demande de **permis de construire** (PC) et a besoin d'aide pour rédiger la **notice descriptive** (Cerfa 13409 ou volet PC1).

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **Programme** du projet (note du maître d'ouvrage)
- **Plans d'esquisse / APS / APD** — plan masse, plans niveaux, façades, coupes
- **Règlement PLU** (pour cadrer les éléments à justifier)
- **Étude thermique RE2020** (si déjà disponible)
- **Photo et localisation** de la parcelle

Si aucun document : pose les questions structurantes :
1. Adresse et n° de parcelle ?
2. Destination : habitation, bureau, ERP, autre ?
3. Nature : construction neuve, extension, surélévation, restructuration ?
4. SDP et emprise au sol envisagées ?
5. Nombre de logements / locaux ?
6. Hauteur totale ?
7. Matériaux principaux (façade, couverture) ?
8. Insertion paysagère envisagée ?
9. Site protégé (ABF) ?
10. Programme de stationnement ?

## 2. Extraction des informations clés du PLU et des plans

| Information | Où chercher | Action |
|---|---|---|
| Zone PLU | Plan de zonage / règlement | Conditionne les rubriques à justifier |
| Hauteur max PLU | Art. 10 règlement | Justifier le respect dans la notice |
| Recul / limites | Art. 6 et 7 | Décrire l'implantation par rapport à la voie et aux limites |
| Aspect extérieur | Art. 11 | Décrire matériaux, couleurs, traitement des façades |
| Stationnement | Art. 12 | Justifier le nombre de places (cohérent SDP) |
| Espaces verts | Art. 13 | Décrire le traitement paysager (% pleine terre, CBS) |

## 3. Structure de la notice descriptive PC (Cerfa 13409 / volet PCMI4 ou PC4)

La notice doit couvrir, selon la circulaire et les pratiques administratives, ces rubriques :

### Section 1 — État initial du terrain et de ses abords

- **Topographie** : terrain plat, en pente (% et orientation), accidenté
- **Végétation existante** : arbres remarquables, haies, espaces verts, sol perméable
- **Constructions existantes** : sur la parcelle ou en limite immédiate
- **Réseaux** : présence eau, EU, EP, électricité, gaz, télécom au droit de la parcelle
- **Servitudes apparentes** : passages, vues, etc.
- **Voirie d'accès** : nature, largeur, type
- **Photographies** (renvoi vers PCMI7 et PCMI8)

### Section 2 — Présentation du projet

- **Destination** : habitation individuelle / collective / mixte / autre
- **Programme** : nombre de logements (typologie T2/T3/T4…), bureaux, commerces, etc.
- **Surfaces** :
  - **SDP totale** (art. R.111-22 CCH)
  - **Emprise au sol**
  - **Surface plancher des logements** (par type)
  - **Surfaces extérieures** (jardin, terrasse)
- **Hauteur** : à l'égout, au faîtage, au point haut (avec référence altimétrique)
- **Niveaux** : nombre, dont sous-sol et combles aménagés

### Section 3 — Implantation et orientation

- **Recul** par rapport à la voie publique : [m]
- **Distance** aux limites séparatives : [m] (côté gauche / droit / fond de parcelle)
- **Orientation** des pièces principales (sud / est / ouest / nord)
- **Insertion dans la pente** (terrasse, pilotis, terrassement)

### Section 4 — Matériaux et aspect extérieur

- **Façades** : enduit (couleur, finition), bardage (essence, teinte), pierre, brique, etc.
- **Couverture** : tuile, ardoise, zinc, étanchéité toiture-terrasse — couleur
- **Menuiseries** : matériau (PVC, alu, bois), couleur, vitrage
- **Volets / brise-soleil** : type et couleur
- **Clôture** et **portail** : matériau, hauteur
- **Cohérence** avec le règlement PLU (art. 11) et avec le contexte bâti environnant
- Pour secteur ABF : **palette ABF** ou contraintes spécifiques mentionnées

### Section 5 — Traitement des abords et espaces extérieurs

- **Espaces verts** : surface, essences plantées (privilégier essences locales si exigé)
- **Espaces minéralisés** : type de matériaux (béton désactivé, pavés, gravier)
- **Surfaces perméables** : pourcentage (cohérent CBS PLU si applicable)
- **Stationnement** : nombre de places, dimension, type (parking aérien, garage, abri vélo)
- **Locaux poubelles, vélos** : localisation, dimension

### Section 6 — Accès et voirie

- **Accès véhicules** : largeur, type, visibilité, conformité PMR
- **Accès piétons** : cheminement, conformité PMR
- **Stationnement** : nombre de places (dont PMR), conformité PLU art. 12
- **Manœuvres** : aire de retournement, accessibilité services secours

### Section 7 — Performance énergétique et environnementale

- **Référentiel** : RE2020 (PC déposé après 01/01/2022)
- **Bbio, Cep, Cep_nr, Ic_construction, Ic_énergie, DH** : valeurs attestées
- **Conformité** aux seuils applicables (selon date de PC)
- **Énergies renouvelables** : type (solaire, PAC, etc.)
- **Étanchéité à l'air** : niveau Q4Pa-surf visé

### Section 8 — Insertion paysagère et urbaine

- **Photomontages** ou **vues** (renvoi PCMI6)
- **Justification de l'insertion** : volumes, couleurs, hauteurs vs voisinage
- **Respect du caractère** du lieu (rural, urbain, balnéaire, montagne)
- Si **ABF** : argumentaire spécifique reprenant les attentes ABF

## 4. Vérifications normatives (`rag_search` obligatoire)

Avant rédaction finale :
- `rag_search("articles PLU urbanisme à justifier dans notice PC")` — checklist
- `rag_search("seuils PC vs DP R.421-1 R.421-12")` — pour vérifier que c'est bien PC et non DP
- `rag_search("recours obligatoire architecte loi 1977 seuils")` — > 150 m² SDP en MI = architecte obligatoire
- `rag_search("formulaire Cerfa 13409 notice descriptive")` — pour s'assurer de la complétude
- Si ABF : `rag_search("avis ABF conforme procédure")`

## 5. Restitution structurée

Produis la notice rédigée directement, structurée selon les sections ci-dessus. Pour chaque section :
- **Phrase d'accroche** (factuelle, neutre, administrative)
- **Données chiffrées** (SDP, hauteurs, recul, %, etc.)
- **Justification** explicite vs PLU quand applicable

Style attendu :
- Phrases courtes, neutres, factuelles
- Pas de superlatifs ni d'engagement non vérifiable
- Précision dimensionnelle (mètres, m², %)
- Numérotation des sections

Termine par :
```
### Pièces complémentaires jointes au PC (rappel checklist)
- [ ] PCMI1 / PC1 : plan de situation
- [ ] PCMI2 / PC2 : plan de masse
- [ ] PCMI3 / PC3 : plan de coupe
- [ ] PCMI4 / PC4 : notice descriptive (le présent document)
- [ ] PCMI5 / PC5 : plan des façades et toitures
- [ ] PCMI6 / PC6 : insertion paysagère (document graphique)
- [ ] PCMI7 / PC7 : photographies de proximité
- [ ] PCMI8 / PC8 : photographies du paysage lointain
- [ ] Attestation RE2020 (si applicable)
- [ ] Étude de sol G2 ou G1 (si applicable)
- [ ] Notice d'accessibilité (si ERP ou habitation collective)
- [ ] Notice de sécurité (si ERP)
- [ ] Étude d'impact ou évaluation environnementale (selon seuils)
```

## 6. Garde-fous spécifiques

- Tu **ne signes pas** la notice — c'est l'architecte (ou le maître d'ouvrage pour MI < 150 m²) qui signe.
- Tu **n'inventes pas** de chiffres absents des documents fournis — tu utilises des placeholders explicites `[à compléter]`.
- Si **dépassement de 150 m² SDP** sur une MI : tu **rappelles** que la **signature d'un architecte inscrit à l'Ordre est obligatoire** (loi du 3 janvier 1977 modifiée).
- Si **secteur ABF** : tu **rappelles** que la notice doit anticiper l'avis conforme et que la consultation ABF peut être préalable.
- Si **performance RE2020** non disponible : tu **signales** que la notice ne peut être finalisée tant que l'attestation BE thermique n'est pas produite.
- Si le projet relève d'une **DP plutôt que PC** (selon R.421-9 à R.421-12), tu le **signales** plutôt que de pousser une notice PC inutile.

## 7. Suites logiques à proposer

- **Vérification finale** par l'architecte signataire
- **Pré-consultation mairie** pour identifier d'éventuels points de blocage
- **Pré-consultation ABF** si secteur protégé
- **Dossier numérique** via Plat'AU (plateforme d'autorisation d'urbanisme) si commune raccordée
- Suivi des **délais d'instruction** : 2 mois en MI, 3 mois autres, +1 mois si ABF
- Préparation de la **déclaration d'ouverture de chantier** (DOC) et **DAACT** post-réception
