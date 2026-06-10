# Groupements d'entreprises BTP — SEP, GIE, cotraitance, intégration fiscale et management fees

**Source :** Code civil art. 1871 à 1872-2 (société en participation — SEP) ; Code de commerce art. L.251-1 et s. (GIE) ; CGI art. 8 et 218 bis (SEP — transparence / option IS), art. 238 bis L à 238 bis O (régime fiscal des SEP), art. 239 quater (GIE — translucidité fiscale) ; CGI art. 256 et s. + art. 257 ter / 283 (TVA, désignation du redevable en SEP) ; CGI art. 223 A et s. (intégration fiscale) ; PCG — comptes de liaison **458** « Associés — opérations faites en commun et en GIE », règlement ANC sur les comptes ; CCAG-Travaux et NF P 03-001 (cotraitance, groupement momentané d'entreprises — GME). **Seuils, taux et identifiants BOFIP à revérifier à la date de consultation.**

## 1. Panorama : pourquoi des groupements en BTP

Les chantiers importants dépassent la capacité d'une seule entreprise (technique, financière, assurantielle). D'où des **groupements** :

| Forme | Personnalité morale | Apparence vis-à-vis du MOA | Usage BTP |
|---|---|---|---|
| **Groupement momentané d'entreprises (GME)** — conjoint ou solidaire | Non (groupement contractuel) | Visible : chaque cotraitant signe le marché | Réponse commune à un marché (public/privé) |
| **Société en participation (SEP)** | **Non** (pas immatriculée, sans personnalité morale) | Souvent **occulte** (non révélée aux tiers) ou ostensible | Partage des résultats d'un chantier / d'une opération entre partenaires |
| **GIE** | **Oui** (immatriculé au RCS) | Visible | Moyens communs durables (matériel, achats, structure commerciale), pas de recherche de bénéfice propre |
| **Filiale commune (SAS/SARL)** | Oui | Visible | Partenariat durable, gros projets, concession |

> À ne pas confondre : **cotraitance** (plusieurs entreprises titulaires d'un même marché) ≠ **sous-traitance** (loi 75-1334 — un titulaire confie une part à un ST). Voir corpus *autoliquidation_tva_btp* et skill `controle_sous_traitance_1975`.

## 2. La cotraitance / GME (groupement momentané d'entreprises)

### 2.1 Conjoint vs solidaire

- **Groupement conjoint** : chaque cotraitant n'est engagé que pour **sa part** de prestations (son lot). Un **mandataire commun** coordonne. Le mandataire peut être conjoint (engagé pour sa part) ou **solidaire** (garant de la bonne exécution de tous).
- **Groupement solidaire** : **chaque** membre est engagé pour **la totalité** du marché (responsabilité solidaire) → risque maximal, à provisionner/assurer.

### 2.2 Traitement comptable de la cotraitance

- En **conjoint** : chaque cotraitant **facture sa part** au MOA et comptabilise **son** CA, ses charges, sa **TVA**. Pas de mise en commun comptable du résultat (sauf SEP sous-jacente).
- Le **mandataire** peut centraliser la facturation : il agit alors comme **mandataire** (le flux qui n'est pas le sien est un **compte de tiers**, pas un produit) — distinguer **débours/mandat** de la **refacturation** (voir corpus *tva_deduction_fctva_debours*).
- **Compte prorata** du chantier : géré entre les entreprises du groupement selon la **NF P 03-001 annexe A** (voir corpus *compte_prorata_nf_p_03001*).

## 3. La société en participation (SEP) de chantier

La **SEP** (Code civil art. 1871 et s.) est le véhicule **le plus courant** pour partager le **résultat d'un chantier** entre partenaires sans créer de personne morale.

### 3.1 Caractéristiques

- **Pas de personnalité morale**, pas d'immatriculation, pas de capital social ; existence **interne** (entre associés).
- Un **gérant** (souvent le mandataire/pilote du chantier) tient la **comptabilité de la SEP** (extra-comptable ou comptabilité autonome) et agit en son nom vis-à-vis des tiers (SEP **occulte**) ou au nom de la SEP (SEP **ostensible**).
- Chaque associé apporte des moyens (personnel, matériel, trésorerie) et reçoit une **quote-part de résultat**.

### 3.2 Mécanique comptable (comptes 458)

Le **compte 458 « Associés — opérations faites en commun et en GIE »** (subdivisé 4581/4588) enregistre les **opérations réciproques** entre chaque associé et la SEP :

```
Chez l'associé non-gérant :
- Apports / avances de trésorerie à la SEP      → 458 (débit)
- Quote-part de résultat bénéficiaire revenant  → 458 (débit) / 755 (produit) [ou 655 si perte]
- Encaissement de la quote-part                  → 512 / 458

Chez le gérant (qui tient la SEP) :
- Comptabilité de la SEP : produits/charges du chantier, TVA, résultat
- Répartition du résultat aux associés           → résultat SEP réparti via 458
```

- **Produits/charges de la quote-part** : comptes **655 « Quote-part de résultat sur opérations faites en commun »** (perte transférée / quote-part déficitaire) et **755 « Quote-part de résultat … »** (bénéfice). Le **gérant** porte en 655/755 la quote-part **transférée aux autres** associés ; les **associés** comptabilisent **leur** quote-part en 755 (bénéfice) ou 655 (perte).
- Les **en-cours** du chantier en SEP suivent les règles habituelles (avancement / achèvement, perte à terminaison **1516**) — voir corpus *reconnaissance_revenu_avancement* et *en_cours_methode_achevement*.

### 3.3 Régime fiscal de la SEP

- **Transparence** (CGI art. 8 / 238 bis L et s.) : à défaut d'option, la SEP n'est **pas** imposée en tant que telle ; chaque associé est imposé sur **sa quote-part** de résultat dans **sa propre catégorie** (BIC/IS).
- Pour la part revenant à des **associés indéfiniment responsables et dont les noms ont été communiqués** à l'administration : imposition **chez l'associé**. Pour les associés **non révélés**, la part de résultat est imposée à l'**IS** au niveau de la SEP (CGI art. 218 bis / 238 bis K — *à revérifier*).
- **Option IS** possible (CGI art. 239 / 206) — irrévocable, à manier avec prudence.

### 3.4 TVA en SEP

- La SEP **occulte** n'apparaît pas : c'est le **gérant** qui, agissant en son nom, **facture le MOA**, **collecte/déclare la TVA** et **déduit** la TVA d'amont. Les flux internes avec les associés (apports de moyens) suivent leur nature (mise à disposition de personnel/matériel = prestation taxable, ou simple répartition de résultat = hors champ).
- La SEP **ostensible** peut être identifiée à la TVA (désignation d'un **redevable**). **Configuration à sécuriser au cas par cas** (rescrit possible) car la pratique varie.
- **Autoliquidation BTP** (art. 283 nonies CGI) : à examiner sur les flux **entre membres** si l'un réalise des travaux pour le compte de la SEP/d'un autre membre (cf. corpus *autoliquidation_tva_btp*).

> ⚠️ La frontière **mise à disposition de moyens (taxable)** / **simple répartition de résultat (hors champ TVA)** est un point de contrôle fiscal récurrent en SEP. À documenter dans le **contrat de SEP**.

## 4. Le GIE (groupement d'intérêt économique)

- **Personnalité morale** (Code com. L.251-1 et s.), immatriculé au RCS ; **but** : faciliter/développer l'activité économique de ses membres, **sans rechercher de bénéfice pour lui-même**.
- Usage BTP : **moyens communs** (parc matériel, centrale d'achat, bureau d'études, réponse commerciale commune, label).
- **Responsabilité** : les membres sont **solidairement et indéfiniment** responsables des dettes du GIE → vigilance majeure.
- **Fiscalité** : **translucidité** (CGI art. 239 quater) — le GIE n'est pas soumis à l'IS ; le résultat est imposé chez les **membres** au prorata de leurs droits, dans leur catégorie. La TVA est gérée par le GIE (assujetti).
- **Comptabilité** : le GIE tient une comptabilité propre ; les opérations réciproques membres ↔ GIE transitent aussi par les comptes **458**.

## 5. Intégration fiscale en groupe BTP (CGI art. 223 A et s.)

- Permet de **consolider les résultats fiscaux** d'un groupe IS : la **société mère** se constitue seule redevable de l'IS pour l'ensemble.
- **Condition de détention** : la mère doit détenir, directement ou indirectement, **au moins 95 %** du capital des filiales intégrées (*seuil à revérifier*).
- **Avantages BTP** : compensation des **résultats bénéficiaires et déficitaires** entre sociétés du groupe (utile vu la **cyclicité** des chantiers), neutralisation de certaines opérations intra-groupe.
- **Conventions** : convention d'intégration fiscale réglant la **répartition de la charge d'impôt** entre sociétés (équité, pas de transfert de richesse injustifié).
- Comptes : **698** (intégration fiscale) ; créances/dettes d'IS intra-groupe.

## 6. Management fees et flux intra-groupe — sécurisation

Dans un groupe BTP (holding animatrice + filiales d'exploitation), la holding refacture souvent des **prestations de direction / supports** (management fees).

| Exigence | Pourquoi |
|---|---|
| **Réalité** de la prestation (substance) | Pas de facturation fictive — sinon réintégration + abus de droit |
| **Convention** écrite, prix **justifié** (méthode, clé de répartition) | Déductibilité (CGI art. 39-1) et prix de transfert |
| **Intérêt propre** de la filiale | Une prestation déjà rendue par un dirigeant rémunéré de la filiale = risque de **double rémunération** non déductible |
| **TVA** : prestation taxable (20 %) | Le flux management fees est dans le champ TVA |
| **Convention réglementée** si dirigeants communs | Procédure d'approbation (Code de commerce) |

> Jurisprudence constante : des management fees **sans contrepartie réelle** ou faisant **doublon** avec les fonctions du dirigeant sont **rejetés** (acte anormal de gestion / absence de cause). À documenter solidement.

## 7. Synthèse des comptes mobilisés

| Compte | Emploi |
|---|---|
| **4581 / 4588** | Opérations en commun avec la SEP / le GIE (apports, avances, quote-part à répartir) |
| **655** | Quote-part de **perte** sur opérations faites en commun (transférée / supportée) |
| **755** | Quote-part de **bénéfice** sur opérations faites en commun |
| **267 / 268** | Créances rattachées / participations (filiale commune) |
| **698** | Intégration fiscale (charge d'IS) |
| **622 / 628** | Honoraires / prestations (management fees reçus) |
| **44566 / 44571** | TVA déductible / collectée sur flux intra-groupe taxables |

## 8. Garde-fous

- **Cotraitance ≠ sous-traitance** : ne pas appliquer la loi 1975 ni l'autoliquidation par défaut entre **cotraitants** ; vérifier la qualification réelle du flux.
- **Groupement solidaire** : chaque membre répond de **tout** le marché → risque à provisionner.
- **SEP** : bien distinguer **mise à disposition de moyens (taxable)** et **répartition de résultat (hors champ TVA)** ; sécuriser le **gérant**, la tenue 458 et la TVA (rescrit si doute).
- **GIE** : responsabilité **solidaire et indéfinie** des membres — informer le dirigeant.
- **Intégration fiscale** : seuil **95 %** et convention de répartition à revérifier/rédiger.
- **Management fees** : exiger **substance** + convention + prix justifié ; risque d'acte anormal de gestion.
- Identifiants BOFIP précis et configuration TVA des SEP/GIE : **à confirmer** par le BOFIP applicable et, au besoin, par **rescrit** (LPF art. L.80 B).

## 9. Citations à utiliser

- Code civil art. 1871 à 1872-2 (SEP)
- Code de commerce art. L.251-1 et s. (GIE)
- CGI art. 8, 218 bis, 238 bis K à 238 bis O (SEP), 239 quater (GIE), 223 A et s. (intégration fiscale)
- CGI art. 256 et s., 283 (TVA, redevable) ; art. 283 nonies (autoliquidation BTP, flux entre membres)
- PCG — comptes 458, 655, 755, 698
- CCAG-Travaux / NF P 03-001 (cotraitance, GME, compte prorata)

**Référence à citer :** Code civil + Code de commerce + CGI + PCG. Sources : Legifrance + BOFIP. **Régimes TVA des SEP/GIE et seuils d'intégration à revérifier à la date de consultation ; rescrit recommandé pour les configurations sensibles.**
