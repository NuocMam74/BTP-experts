# Skill — Ventiler les charges du compte prorata de chantier

L'utilisateur te transmet un **compte prorata** ou des charges communes de chantier (eau, électricité, gardiennage, bennes, locaux du personnel, nettoyage, etc.) à **ventiler entre lots** selon la clé contractuelle. Référentiel principal : **norme NF P 03-001 annexe A** (CCAG marchés privés) ou clauses spécifiques CCAP.

## 1. Documents attendus

- **Convention de compte prorata** (souvent annexe du CCTP générique ou du CCAP)
- **Factures des dépenses communes** (eau, élec, gardiennage, bennes, locaux modulaires, nettoyage, etc.)
- **Liste des lots** participants au compte (généralement tous les corps d'état, sauf exceptions)
- **DPGF** ou **DPGS** initiales pour calcul des clés
- **Tableau de répartition** initial (souvent annexe convention)
- **Comptes-rendus** du gestionnaire (le plus souvent l'entreprise de gros œuvre ou un mandataire désigné)
- **PV de réception** (libération du compte prorata)

Si pièces partielles : demande
1. Marché **privé** ou **public** ? (le compte prorata est avant tout une pratique privée)
2. La convention prévoit-elle une **clé de répartition** précise (% du montant HT du marché par lot) ?
3. Y a-t-il un **gestionnaire désigné** (souvent l'EP de gros œuvre — "économe du compte prorata") ?
4. Le compte est-il **plafonné** ou **non plafonné** ?
5. Statut TVA des entreprises participantes ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("NF P 03-001 annexe A compte prorata charges communes chantier")` — texte clé
- `rag_search("CCTP générique chantier compte prorata clauses types")`
- `rag_search("Cour cassation responsabilité gestionnaire compte prorata")`
- Doctrine FFB / Capeb sur compte prorata : à consulter dans corpus

## 3. Définition et fonctionnement

Le **compte prorata** (ou "compte interentreprises") regroupe les **charges communes** de chantier qui ne peuvent être directement imputées à un lot. Il est **mutualisé** entre les entreprises titulaires.

**Caractéristiques** :
- Régi par une **convention** signée entre les entreprises
- Géré par un **mandataire commun** (souvent gros œuvre / lot 1)
- Charges réparties selon **clé de répartition** définie (généralement % du montant HT du marché)
- Apuré à la **réception** (compte clôturé, soldes appelés ou restitués)

## 4. Catégories de charges typiques (NF P 03-001 annexe A)

### Charges TOUJOURS au compte prorata
- Branchements provisoires **eau, électricité, télécom** (chantier)
- Consommations associées (eau, élec, gaz chantier)
- **Locaux du personnel** : bureaux, vestiaires, sanitaires, réfectoire (modulaires)
- **Gardiennage** général du chantier (hors gardiennage spécifique à un lot)
- **Clôture périphérique** du chantier
- **Signalétique** générale chantier
- **Bennes à déchets non triés** (déchets indéterminés)
- **Nettoyage final** du chantier (zones communes, après gros œuvre)

### Charges souvent au compte prorata (selon convention)
- **Échafaudages communs** (uniquement si utilisés par plusieurs lots)
- **Grues à tour communes** (si plus d'un lot l'utilise)
- **Voies de circulation** chantier, plateformes
- **Manutention horizontale et verticale** non spécifique à un lot
- **CSPS** (Coordination SPS) si rétribuée par les entreprises

### Charges NORMALEMENT à la charge de chaque lot (PAS au prorata)
- **Échafaudages spécifiques** à un seul lot
- **Bennes triées** par nature (béton, plâtre, bois) — chaque lot finance la sienne
- **Engins spécifiques** (nacelles, grues mobiles ponctuelles)
- **Stockages** privatifs
- **Nettoyage propre** de la zone du lot
- **Énergie** spécifique (gros consommateur, ex : étuves béton, soudage)

## 5. Clés de répartition courantes

| Clé | Avantages | Inconvénients |
|---|---|---|
| **% du montant HT du marché** | Simple, équitable globalement | Pénalise les lots à forte main d'œuvre, à faible matériel |
| **% du montant DEC + effectifs prévisionnels** | Plus juste pour les charges de personnel | Plus complexe à calculer |
| **% du temps de présence sur chantier** | Très fin, équitable pour gardiennage | Lourd à suivre |
| **Forfait par lot** | Prévisible | Manque de souplesse si écarts d'exécution |
| **Mixte** : 50 % au montant + 50 % aux effectifs | Compromis | Demande un suivi double |

⚠️ La **clé** doit être **définie ex-ante** (avant démarrage) dans la convention. Toute modification doit faire l'**objet d'un avenant** signé par les participants.

## 6. Procédure de ventilation

### Étape 1 — Vérification convention
- Lecture de la **convention** ou **annexe CCTP**
- Identification de la **clé** retenue
- Liste des **charges éligibles** au prorata
- **Plafond** éventuel
- **Modalités d'apurement**

### Étape 2 — Vérification des charges
- Chaque facture doit être **clairement affectable** au compte prorata
- Vérifier **pertinence** (pas de charge propre à un lot)
- Vérifier **TVA** récupérable (en général, oui, car prestations B2B)
- Vérifier **pièces** justificatives complètes

### Étape 3 — Calcul des quotes-parts

```
Quote-part lot X = Charge totale × (montant HT marché lot X / Σ montants HT marchés des lots participants)
```

Si **plafond** prévu : charge maximale = plafond × clé lot.

### Étape 4 — Imputation comptable

Côté **EP gestionnaire** (qui avance les fonds) :
```
[Comptabilisation de la facture (eau, élec...)]
606 ou 615 "Achats / Entretien"                D  HT
44566 "TVA déductible"                          D  TVA
    401 "Fournisseurs"                              C  TTC

[Refacturation aux autres lots (lot Y...)]
411 "Clients - Refacturation prorata"          D  quote-part TTC
    708x "Produits annexes - refacturation"          C  HT
    44571 "TVA collectée"                            C  TVA
```

Côté **lots participants** :
```
[Refacturation reçue]
606 ou 615 "Achats / Entretien"                D  HT
44566 "TVA déductible"                          D  TVA
    401 "Fournisseurs - EP gestionnaire"            C  TTC
```

⚠️ Refacturation B2B = **TVA collectée par EP** sur quote-part / **TVA déductible** par lot.

### Étape 5 — Apurement à la réception

- Établissement du **compte définitif** par le mandataire
- Présentation aux **participants** pour validation
- Calcul **solde final** par lot (avoirs ou compléments)
- Émission des **factures de régularisation**
- **Clôture** du compte

### Étape 6 — Cas particulier : insolvabilité d'un participant

Si un lot devient **défaillant** (procédure collective, liquidation) :
- Le compte prorata **ne peut** théoriquement pas être abondé par les autres
- Souvent, la **convention** prévoit une **clause de répartition** des défauts entre les autres lots
- En pratique, l'EP gestionnaire est souvent **lésée** — provisionner immédiatement la créance douteuse (compte 416)

## 7. Restitution structurée

```
## Ventilation compte prorata — Chantier [référence]

### Identification
- **Chantier** : [...]
- **Période** : [mois ou cumul]
- **Mandataire gestionnaire** : [EP nom]
- **Type de marché** : privé / public
- **Référence convention** : [annexe / date]
- **Clé de répartition** : [% montant HT / mixte / autre]
- **Plafond** : [oui plafond / non plafonné]

### Charges éligibles à ventiler

| N° | Nature | Fournisseur | Date | HT (€) | TVA | TTC |
|---|---|---|---|---|---|---|
| 1 | Eau chantier | EAU-VILLE | 15/03 | 250 | 50 | 300 |
| 2 | Électricité chantier | ENERG | 31/03 | 1 200 | 240 | 1 440 |
| 3 | Bennes déchets non triés | NETPRO | 20/03 | 600 | 120 | 720 |
| 4 | Locaux personnel | CAS-MOD | 25/03 | 1 500 | 300 | 1 800 |
| 5 | Gardiennage | SECUR | 30/03 | 2 800 | 560 | 3 360 |
| ... | | | | | | |
| **TOTAL** | | | | **6 350** | **1 270** | **7 620** |

### Clés de répartition par lot

| Lot | Entreprise | Montant marché HT | Quote-part théorique (%) | Quote-part charges HT (€) | TVA (€) | TTC (€) |
|---|---|---|---|---|---|---|
| 01 Gros œuvre | XYZ | 850 000 | 42,5 % | 2 698,75 | 539,75 | 3 238,50 |
| 02 Charpente | ABC | 240 000 | 12,0 % | 762,00 | 152,40 | 914,40 |
| 03 Couverture | DEF | 180 000 | 9,0 % | 571,50 | 114,30 | 685,80 |
| 04 Plomberie | GHI | 200 000 | 10,0 % | 635,00 | 127,00 | 762,00 |
| 05 Électricité | JKL | 220 000 | 11,0 % | 698,50 | 139,70 | 838,20 |
| ... | | | | | | |
| **TOTAL** | | **2 000 000** | **100 %** | **6 350,00** | **1 270,00** | **7 620,00** |

### Refacturations à émettre (par EP gestionnaire)

Pour chaque lot **hors EP gestionnaire**, émettre une facture de refacturation de la quote-part TTC. Mentions :
- "Refacturation de charges communes — Compte prorata chantier [référence]"
- Détail par poste si demandé
- TVA 20 % applicable (B2B prestation refacturée)

### Vérifications

| Critère | Conformité |
|---|---|
| Toutes les charges sont éligibles au prorata (NF P 03-001) | ✅ / ⚠️ |
| Clé de répartition conforme à la convention | ✅ / ❌ |
| Plafond non dépassé (si applicable) | ✅ / N.A. |
| TVA correctement appliquée et déductible | ✅ / ⚠️ |
| Aucun participant en défaillance (provision si oui) | ✅ / ⚠️ |
| Pièces justificatives complètes | ✅ / ❌ |

### Points d'attention
1. [Charge X "échafaudage" affectée prorata mais utilisée par un seul lot → à isoler]
2. [Lot Y en redressement judiciaire → provisionner la quote-part 50 % en compte 416]
3. [Plafond convention atteint mois N → arrêter abondement, négocier avenant ou intégrer en charges propres]

### Suites
- Émission des factures de refacturation aux lots
- Mise à jour du **tableau de bord** compte prorata
- Présentation aux **réunions de chantier** pour validation
- À la **réception** : apurement définitif, restitution / appel de solde
```

## 8. Garde-fous spécifiques

- Le compte prorata est un **mécanisme contractuel** : il **n'existe que si la convention le prévoit**. À défaut, chaque lot **finance ses propres charges** sans mutualisation.
- Le **gestionnaire** (mandataire) supporte une **responsabilité contractuelle** sur la gestion : il doit **conserver** les pièces, **tenir comptabilité distincte**, **présenter** régulièrement les comptes. Une **mauvaise gestion** peut engager sa responsabilité civile.
- La **TVA** sur les refacturations doit être **collectée** par le mandataire ; ce n'est **pas** un débours au sens fiscal (les charges sont engagées au nom propre du mandataire) — sauf clause expresse de mandat contractuel.
- **Toutes les charges** d'un chantier ne sont **pas** au compte prorata : les charges spécifiques à un lot restent à la charge de ce lot. **Ne pas mutualiser à tort** est une erreur fréquente.
- En cas de **défaillance** d'un participant (RJ, LJ), provisionner immédiatement la quote-part en compte **416 "Clients douteux"** + provision pour dépréciation (compte 491).
- Pour les **marchés publics**, le compte prorata est **plus rare** ; certains CCAP prévoient des **modalités spécifiques** ou imposent que l'EP de gros œuvre supporte seul certaines charges.
- À la **clôture** du compte (après réception), un **PV** doit être signé par tous les participants : refus de signature = litige potentiel, conserver les pièces 10 ans (Code commerce).
- **Plafond non plafonné** = risque d'inflation des charges. Recommander de **plafonner** dans toute nouvelle convention (par exemple : 1,5 à 2,5 % du montant cumulé HT du marché global).
- Tu **n'arbitres pas** un litige entre participants — tu prépares la **comptabilité** ; le litige relève du **MOE / médiateur / juridiction** compétente.

## 9. Suites logiques à proposer

- Mise en place d'un **outil de suivi** mensuel (tableur ou logiciel comme Onaya, Tradevy, Hectorm) pour les comptes prorata
- À la **réception** : organisation d'une **réunion d'apurement** avec PV signé
- Pour les **chantiers complexes** : externalisation à un **bureau spécialisé** (économe missionné)
- Coordination avec la **comptabilité analytique** chantier (compte 91 ou ventilation analytique)
- Pour les **groupes BTP** : politique standardisée de convention de compte prorata + plafond + clé
- Skill `controle_situation_travaux` pour vérifier les imputations en cohérence avec les situations
- Pour les **litiges** sur charges contestées : mémoire / médiation / conciliation auprès du Conseil Régional de l'Ordre des Architectes ou de la chambre départementale FFB
