# Facturation électronique et e-reporting — réforme 2026 (impact BTP)

**Source :** CGI art. 289 bis, 289 ter et 290 (facturation électronique et transmission des données) ; ordonnance 2021-1190 du 15 sept. 2021 ; loi de finances pour 2024 (art. 91, report et aménagement du calendrier) ; décrets et arrêtés d'application ; spécifications externes de l'administration (« dossier de spécifications externes » de la facturation électronique). **Calendrier, formats et seuils à revérifier à la date de consultation** sur impots.gouv.fr — la réforme est en cours de déploiement.

> ⚠️ **Avertissement de fraîcheur** : ce corpus décrit la réforme telle que cadrée par les textes de 2021-2024. Le calendrier a déjà été reporté une fois (LF 2024). Toute date, tout seuil et toute modalité doivent être **revérifiés** auprès de l'administration et de la PDP choisie avant toute décision opérationnelle.

## 1. Deux obligations distinctes : e-invoicing et e-reporting

La réforme crée **deux obligations qu'il ne faut pas confondre** :

| Obligation | Champ | Mécanisme |
|---|---|---|
| **Facturation électronique** (*e-invoicing*) | Opérations **B2B domestiques** (entre assujettis établis en France) | Émission, transmission et réception des factures sous **forme électronique structurée**, via plateforme |
| **Transmission de données** (*e-reporting*) | Opérations **hors champ e-invoicing** : B2C, opérations avec l'**international** (UE et hors UE), et **données de paiement** | Transmission à l'administration des **données de transaction** (et de paiement pour les prestations de services) |

**Conséquence BTP** : une entreprise du bâtiment qui facture à la fois des particuliers (B2C → e-reporting) et des professionnels / donneurs d'ordre (B2B → e-invoicing) est concernée par **les deux** dispositifs.

## 2. Calendrier (à revérifier — cadrage LF 2024)

### Obligation de **réception** (tous les assujettis)

- À compter du **1ᵉʳ septembre 2026** : **toutes** les entreprises assujetties à la TVA, **quelle que soit leur taille**, doivent être en **capacité de recevoir** des factures électroniques.
- *(Une faculté de report jusqu'au 1ᵉʳ décembre 2026 a été évoquée pour la généralisation ; à revérifier.)*

### Obligation d'**émission** (e-invoicing) et **e-reporting** — par taille d'entreprise

| Catégorie d'entreprise | Émission e-invoicing + e-reporting |
|---|---|
| **Grandes entreprises** et **ETI** (entreprises de taille intermédiaire) | **1ᵉʳ septembre 2026** |
| **PME** et **micro-entreprises** | **1ᵉʳ septembre 2027** |

> La taille s'apprécie selon les catégories du décret 2008-1354 (effectif, CA, total de bilan). Beaucoup d'entreprises BTP relèvent de la catégorie **PME / micro** → cible **septembre 2027** pour l'émission, mais **septembre 2026** pour la **réception**. Dates à revérifier.

## 3. Architecture des plateformes

### Suppression du PPF en tant que plateforme de transit

Le schéma a évolué : le **Portail Public de Facturation (PPF)** **n'assure plus le rôle de plateforme gratuite de dépôt / transmission** des factures (abandon du « PPF plateforme »). Le PPF est recentré sur un rôle de **concentrateur de données** et d'**annuaire central** (identification des destinataires).

### Plateformes de Dématérialisation Partenaires (PDP)

- Les flux de factures transitent désormais par des **PDP** : opérateurs privés **immatriculés** par l'administration.
- Chaque entreprise doit **choisir au moins une PDP** (pour émettre et/ou recevoir).
- La PDP assure : conversion de format, contrôles, transmission à la PDP du destinataire, **extraction et transmission des données** à l'administration (TVA), gestion des **statuts** de la facture (déposée, rejetée, encaissée, etc.).
- L'**annuaire** central permet d'aiguiller chaque facture vers la PDP du destinataire (via SIREN/SIRET et code de routage).

> Choisir une PDP **immatriculée** est désormais un acte structurant : vérifier l'immatriculation, l'interopérabilité, la reprise des formats sortants de votre logiciel comptable / de gestion de chantier.

## 4. Formats de facture électronique

Une « facture électronique » au sens de la réforme est une facture **structurée** (données exploitables par machine), et non un simple PDF.

| Format | Nature | Usage |
|---|---|---|
| **Factur-X** | **Hybride** : PDF/A-3 lisible + fichier XML structuré embarqué | Format de référence, lisible par l'humain ET la machine — adapté aux PME BTP |
| **UBL** (Universal Business Language) | XML pur | Format structuré international |
| **CII** (Cross Industry Invoice) | XML pur (UN/CEFACT) | Format structuré international, socle technique de Factur-X |

Le **socle minimum** s'appuie sur la norme européenne **EN 16931**. Les trois formats ci-dessus constituent le **socle** accepté ; les PDP peuvent gérer d'autres formats par interopérabilité.

> Un **PDF simple** (non structuré) ne sera **plus** une facture conforme une fois l'entreprise dans le champ de l'obligation d'émission. Une période de tolérance / d'accompagnement est possible — à revérifier.

## 5. Mentions obligatoires nouvelles

En complément des mentions de l'art. 242 nonies A de l'annexe II au CGI, la réforme ajoute des **mentions obligatoires** (calendrier d'entrée à revérifier), notamment :

- Le **numéro SIREN** du client (pour le routage B2B).
- L'**adresse de livraison** des biens lorsqu'elle diffère de l'adresse de facturation.
- L'information selon laquelle les opérations sont **exclusivement des livraisons de biens, des prestations de services, ou les deux**.
- Le **paiement de la TVA d'après les débits** lorsque le prestataire a opté pour cette modalité.
- Les mentions habituelles de **régime particulier** (autoliquidation, franchise en base, marge, exonération…).

## 6. Impact spécifique BTP

### 6.1 Autoliquidation de sous-traitance (art. 283, 2 nonies CGI)

- La facture du **sous-traitant** reste émise **HT** avec la mention d'autoliquidation (« Autoliquidation — article 283 nonies du CGI » ou « TVA due par le preneur »).
- En facture électronique structurée, cette situation se traduit par un **code de catégorie de TVA** spécifique (taux 0 / mention « reverse charge ») porté dans le XML. Vérifier que le logiciel / la PDP **gère correctement le cas autoliquidation** (catégorie de taxe, mention textuelle ET code structuré).
- L'enjeu : éviter qu'une facture ST autoliquidée parte avec un **taux de TVA** renseigné par erreur → rejet ou incohérence de e-reporting.

### 6.2 E-reporting des opérations hors champ e-invoicing

- Travaux pour **particuliers** (B2C) : **e-reporting** des données de transaction **et** des **données d'encaissement** (les travaux relèvent des prestations de services → TVA exigible à l'encaissement, sauf option débits).
- Travaux pour **MOA public non assujetti** ou hors champ : selon la nature, e-reporting.
- Opérations avec l'**étranger** (chantiers transfrontaliers, sous-traitants UE) : e-reporting.

### 6.3 TVA des prestations de travaux à l'encaissement

- Les travaux du BTP étant des **prestations de services**, la TVA est en principe **exigible à l'encaissement** (sauf option pour les débits — art. 269 CGI). Le **e-reporting des données de paiement** transmet à l'administration la **date d'encaissement** → cohérence à assurer avec la CA3.

### 6.4 Situations de travaux, retenue de garantie, acomptes

- Les **situations mensuelles**, **acomptes** et **décomptes** doivent être tracés dans le format structuré (factures d'acompte, facture définitive). Vérifier la gestion de la **retenue de garantie 5 %** et des **avances** (compte 4191) dans l'outil.

### 6.5 Cycle de vie (statuts) — utile pour le pilotage de trésorerie

La réforme impose la gestion de **statuts** de facture (déposée, rejetée, refusée, encaissée…). En BTP, où le BFR est tendu, le **statut « encaissée »** devient une donnée de pilotage de trésorerie exploitable.

## 7. Sanctions (à revérifier)

- **Défaut d'émission** sous forme électronique : amende forfaitaire **par facture**, plafonnée par année civile.
- **Défaut de transmission e-reporting** : amende forfaitaire **par transmission**, plafonnée par année civile.
- Régime de sanction assorti d'un **délai / tolérance** lors de la première application (à revérifier dans le texte applicable).

## 8. Checklist de mise en conformité (cabinet → client BTP)

1. **Déterminer la catégorie** de l'entreprise (micro / PME / ETI / GE) → en déduire la **date d'émission** applicable.
2. **Vérifier la capacité de réception** au 1ᵉʳ septembre 2026 (obligatoire pour tous).
3. **Choisir une PDP immatriculée** et vérifier l'**interopérabilité** avec le logiciel de gestion / comptabilité.
4. **Cartographier les flux** : B2B domestique (e-invoicing) vs B2C / international (e-reporting).
5. **Paramétrer les cas BTP** : autoliquidation ST, taux réduits (10 / 5,5), situations, acomptes, retenue de garantie.
6. **Mettre à jour les mentions** (SIREN client, adresse de livraison, débits/encaissement).
7. **Fiabiliser l'annuaire** : SIRET, code de routage des clients.
8. **Tester** des factures pilotes (Factur-X) avant la bascule.
9. **Former** les équipes (devis-facturation, conducteurs de travaux qui émettent les situations).

## 9. Citations à utiliser

- CGI art. 289 bis, 289 ter, 290 (facturation électronique et transmission de données)
- CGI art. 242 nonies A annexe II (mentions des factures)
- CGI art. 269 (exigibilité TVA — prestations de services / option débits)
- CGI art. 283, 2 nonies (autoliquidation sous-traitance BTP)
- Ordonnance 2021-1190 du 15 septembre 2021
- Loi de finances pour 2024 (report et aménagement du calendrier)
- Norme européenne EN 16931 (sémantique de la facture électronique)

**Référence à citer :** CGI + ordonnance 2021-1190 + LF 2024 + spécifications externes de l'administration. Sources : Legifrance + impots.gouv.fr. **Calendrier, seuils et formats à revérifier à la date de consultation.**
