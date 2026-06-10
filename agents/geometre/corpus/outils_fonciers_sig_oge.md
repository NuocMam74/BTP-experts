# Outils fonciers, SIG et téléprocédures — RFU, Géofoncier, GPU, PCRS, DVF

**Source :** Conventions DGFiP / OGE (Ordre des Géomètres-Experts) sur la **Représentation Foncière Unifiée (RFU)** et l'échange du plan cadastral ; portail **Géofoncier** (OGE) ; **Géoportail de l'Urbanisme** (code de l'urbanisme art. L.133-1 et s., dématérialisation des documents d'urbanisme) ; **PCRS** (protocole national / arrêté du 15 février 2012 et travaux CNIG) ; **DVF** (« Demande de Valeurs Foncières », open data DGFiP) ; pratique du géomètre-expert.

## RFU — Représentation Foncière Unifiée

### Définition

La **RFU** est la **base parcellaire de référence partagée** entre la **DGFiP** (cadastre) et l'**Ordre des Géomètres-Experts**, visant à **unifier** la représentation du parcellaire à partir des **levés géoréférencés** des géomètres-experts.

- Objectif : améliorer la **précision** et la **continuité** du plan parcellaire en intégrant les **données issues des bornages et DMPC** (géoréférencées RGF93 Lambert 93).
- Les géomètres-experts **alimentent** la RFU lors des opérations foncières (bornage, division, DMPC) via la plateforme **Géofoncier**.
- Tend à dépasser les limites historiques du plan cadastral (document **fiscal**, non juridique — voir `plan_topographique_systemes_coordonnees.md`).

## Géofoncier — portail de l'OGE

Portail professionnel de l'**Ordre des Géomètres-Experts** (geofoncier.fr) qui :
- Recense les **opérations foncières** géoréférencées réalisées par les géomètres-experts (bornages, RFU).
- Donne accès à des **couches SIG** (cadastre, RFU, repères géodésiques IGN, opérations OGE).
- Sert d'**interface** d'alimentation de la RFU et d'échange entre géomètres-experts.
- Outil de **recherche d'antériorité** (un bornage antérieur sur une parcelle peut y être repéré).

## e-foncier / téléprocédure DMPC dématérialisée (DGFiP)

- Le **Document Modificatif du Parcellaire Cadastral (DMPC)** est transmis à la DGFiP par **téléprocédure dématérialisée** (échange numérique géomètre ↔ service du cadastre).
- Dématérialisation des **documents d'arpentage** : dépôt en ligne, géoréférencement, mise à jour du plan cadastral informatisé (**PCI**).
- Voir le corpus `dmpc_cadastre_procedures.md` et le skill `etablir_dmpc` pour la procédure DMPC complète.

## GPU — Géoportail de l'Urbanisme

### Définition (art. L.133-1 et s. code de l'urbanisme)

Le **Géoportail de l'Urbanisme** (geoportail-urbanisme.gouv.fr) est la plateforme nationale de **publication dématérialisée** des documents d'urbanisme et servitudes :
- **PLU / PLUi**, cartes communales, **SCoT**.
- **Servitudes d'Utilité Publique (SUP)**.
- Périmètres divers (zonages).

### Portée juridique

- Depuis le **1er janvier 2020**, la **publication au GPU** conditionne le **caractère exécutoire** des documents d'urbanisme (obligation de dématérialisation au standard **CNIG**).
- Outil de **consultation** indispensable en phase amont (division, faisabilité, CU) pour récupérer le zonage, le règlement et les SUP applicables à une parcelle.

## PCRS — Plan Corps de Rue Simplifié

### Définition

Le **PCRS** est un **fond de plan topographique de très grande échelle** (≈ 1/200) du domaine public, **géoréférencé** (RGF93 Lambert 93 / NGF-IGN69), servant de **référentiel commun** pour la localisation des **réseaux** (objectif de fiabilisation **classe A** des réseaux — voir `dt_dict_reseaux.md`).

- Cadre : **protocole national PCRS** (CNIG) et obligations issues de la réforme **anti-endommagement** (DT-DICT, arrêté du 15 février 2012) imposant aux exploitants la localisation précise des réseaux.
- Produit en **mode vecteur** ou **image** ; partenariat collectivités / exploitants / IGN.
- Le **géomètre-expert** est producteur de données PCRS (levés topographiques de précision du corps de rue).

## DVF — Demande de Valeurs Foncières (open data)

### Définition

**DVF** est la base **open data** de la DGFiP recensant les **mutations immobilières** (ventes) des **5 dernières années** : prix, date, nature du bien, surface, localisation (parcelle).

- Accès : data.gouv.fr / app.dvf.etalab.gouv.fr (**DVF+** / « Patrim » pour les particuliers via impots.gouv.fr).
- Usage **évaluation immobilière** : recherche de **références de comparaison** (méthode par comparaison — voir `evaluation_immobiliere.md` et skill `evaluer_bien_immobilier`).
- Limites : données déclaratives (prix d'acte), pas de qualité fine du bien (état, étage exact), à **retraiter** et fiabiliser.

## Synthèse — outils par usage

| Besoin | Outil | Fournisseur |
|---|---|---|
| Parcellaire de référence géoréférencé | **RFU** / **Géofoncier** | DGFiP + OGE |
| Recherche d'antériorité de bornage | **Géofoncier** | OGE |
| Transmettre un DMPC | **Téléprocédure DMPC** dématérialisée | DGFiP |
| Zonage PLU + règlement + SUP d'une parcelle | **GPU** | État / collectivités |
| Fond de plan corps de rue / réseaux classe A | **PCRS** | Collectivités / exploitants / GE |
| Références de prix pour évaluation | **DVF** | DGFiP (open data) |
| Plan cadastral grand public | **cadastre.gouv.fr** | DGFiP |
| Repères géodésiques / nivellement | **geodesie.ign.fr** | IGN |

## Rôle du géomètre-expert

- **Producteur** de données géoréférencées alimentant la RFU et le PCRS.
- **Utilisateur expert** du GPU (faisabilité, CU, division), de DVF (évaluation), de Géofoncier (antériorité).
- **Garant** de la cohérence entre le plan cadastral (fiscal), la RFU (parcellaire de référence) et le **bornage** (seul juridique).

> Ces outils **fiabilisent** la donnée foncière mais ne **remplacent pas** le **bornage contradictoire** (monopole OGE, ordonnance 21 mai 1945) : la RFU et le cadastre restent des **représentations**, la limite juridique résulte du bornage. Disponibilités, formats et obligations **à revérifier à la date de consultation** (outils en évolution).

## Citations à utiliser

- Convention DGFiP / OGE sur la RFU et l'échange du plan cadastral informatisé (PCI)
- Code de l'urbanisme art. L.133-1 et s. (Géoportail de l'Urbanisme, dématérialisation, standard CNIG)
- Arrêté du 15 février 2012 (DT-DICT, classes de précision, PCRS) ; protocole national PCRS (CNIG)
- Base DVF (DGFiP, open data — data.gouv.fr)
- Ordonnance du 21 mai 1945 (monopole géomètre-expert)

**Référence à citer :** RFU/Géofoncier (DGFiP+OGE) + GPU (code urba L.133-1) + DVF + OGE. Sources : geofoncier.fr + geoportail-urbanisme.gouv.fr + cadastre.gouv.fr + data.gouv.fr.
