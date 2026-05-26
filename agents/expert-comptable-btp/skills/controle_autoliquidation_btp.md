# Skill — Vérifier l'autoliquidation BTP sur une facture sous-traitant

L'utilisateur te transmet une **facture de sous-traitant BTP** ; tu dois vérifier qu'elle respecte le **régime d'autoliquidation** institué par l'article **283 nonies du CGI** (en vigueur depuis le 1er janvier 2014).

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **Facture sous-traitant** (PDF, image)
- **Contrat de sous-traitance** ou bon de commande
- **DC4** (déclaration de sous-traitance — marchés publics) ou **convention** de sous-traitance privée
- **Caution personnelle et solidaire** (pour marchés privés) ou **délégation de paiement** (loi 75-1334)
- **Agrément du MOA** (exprès ou tacite — à vérifier dans correspondance)
- **CCAP** ou **acte d'engagement** du marché principal

Si pièces manquantes : demande
1. Nature du marché : public ou privé ?
2. Le sous-traitant est-il **agréé** par le MOA (acceptation des conditions de paiement) ?
3. Nature de l'opération : construction, TP, génie civil, second œuvre, démolition, étanchéité, etc. ?
4. Le sous-traitant et le donneur d'ordre sont-ils tous deux assujettis à la TVA en France ?
5. La prestation comprend-elle **uniquement de la fourniture** (livraison sans pose) ou inclut-elle **pose / travaux** ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("CGI article 283 nonies autoliquidation sous-traitance BTP")`
- `rag_search("BOFIP BOI-TVA-DECLA-10-20-30 autoliquidation sous-traitance bâtiment")` — doctrine
- `rag_search("loi 75-1334 sous-traitance contrat agrément")`
- `rag_search("CCAG-Travaux article 3 sous-traitance marchés publics")`
- `rag_search("annexe III article 242 nonies A CGI activités BTP éligibles")` — périmètre activités

## 3. Champ d'application de l'autoliquidation BTP

### Travaux **éligibles** (autoliquidation s'applique)

Tous travaux de construction (annexe III art. 242 nonies A) :
- **Construction, reconstruction, démolition** d'immeubles
- **Gros œuvre** : terrassement, fondations, maçonnerie, charpente, couverture, étanchéité
- **Second œuvre** : plomberie, électricité, chauffage, ventilation, isolation, plâtrerie, peinture, menuiserie, vitrerie, carrelage
- **VRD** : voirie, réseaux divers, assainissement, terrassement
- **Génie civil** : ponts, tunnels, ouvrages d'art, fondations spéciales
- **Aménagement / agencement** : cuisines intégrées posées, salles de bain installées, dressings
- **Pose** d'équipements industriels intégrés au bâti
- **Travaux d'isolation, rénovation énergétique** liés au bâti
- **Démolition, désamiantage, terrassement** liés à un projet de construction

### Travaux ou prestations **NON éligibles** (TVA normale s'applique)

- **Fourniture pure sans pose** (livraison de matériaux, location de matériel)
- **Études, prestations intellectuelles** : architecte, maître d'œuvre, BET, géomètre, contrôle technique, CSPS
- **Nettoyage de fin de chantier** (sauf inclus dans un lot global)
- **Travaux paysagers** isolés (espaces verts purs)
- **Locations** de matériel ou d'engins sans conducteur
- **Prestations administratives**, gestion, secrétariat
- Activités hors champ BTP (livraisons de biens distincts, services généraux)

### Cas spécifiques

| Situation | Régime |
|---|---|
| Sous-traitant établi à l'étranger (UE) | Autoliquidation classique art. 283-2 CGI |
| Sous-traitant hors UE | Autoliquidation art. 283-2 CGI |
| Marchand de biens / promotion immobilière | Hors champ — TVA normale |
| Sous-traitant en franchise en base TVA | Pas de TVA à autoliquider (sous-traitant n'a pas de TVA à facturer) |
| Sous-traitance de second rang (sous-sous-traitant) | Autoliquidation s'applique entre eux aussi |
| Mise à disposition de personnel intérimaire | Hors champ (prestation d'intérim, pas BTP) |
| Travaux sur des biens meubles (mobilier, matériel) | Hors champ |
| Travaux pour un MOA NON assujetti TVA (particulier) | Pas d'autoliquidation — TVA normale |

⚠️ **Condition fondamentale** : l'autoliquidation BTP suppose que **les deux parties (sous-traitant ET donneur d'ordre) sont des assujettis à la TVA** réalisant des opérations dans le cadre de leurs activités BTP. Si le MOA est un particulier, l'entreprise principale qui sous-traite **conserve** la TVA classique avec son client.

## 4. Mentions obligatoires sur la facture

| Mention | Exigence | Sanction si manquante |
|---|---|---|
| Facture émise **HT** (pas de TVA collectée) | Obligatoire | TVA payée à tort, droit à remboursement contesté |
| Mention "**Autoliquidation — article 283 nonies du CGI**" | Obligatoire (ou équivalent : "TVA due par le preneur") | Amende 15 € par mention manquante (art. 1737 II CGI), plafonnée 1/4 du montant facturé |
| SIRET sous-traitant | Obligatoire (mentions générales) | Amende 15 € par mention |
| SIRET donneur d'ordre / mention "preneur assujetti" | Obligatoire | Amende 15 € par mention |
| Détail TVA = 0 | Cohérent | — |
| Date d'émission | Obligatoire | Amende 15 € |
| Numéro de facture (séquentiel) | Obligatoire | Amende 15 € |
| Description précise des travaux | Obligatoire | Amende 15 €, requalification possible |
| Désignation du chantier / marché | Bonne pratique | Difficulté de rattachement comptable |
| Modalités de règlement, taux de pénalité | Obligatoire | Amende |

## 5. Procédure de contrôle

1. **Identifier la nature** de la prestation (éligible BTP ou non).
2. **Vérifier le statut des parties** : sous-traitant + donneur d'ordre tous deux assujettis BTP ?
3. **Vérifier les mentions** sur la facture (cf. tableau §4).
4. **Vérifier le cadre juridique** sous-traitance (loi 75-1334) :
   - Marché public : **DC4** signé et **agrément MOA** ?
   - Marché privé : **caution personnelle et solidaire** OU **délégation de paiement** OU **agrément exprès** ?
5. **Recouper avec le contrat** : la facture est-elle conforme au bon de commande / contrat ?
6. **Vérifier la cohérence comptable** : compte de charges (604, 611), TVA collectée (4452), TVA déductible (44566 ou 4452 selon plan comptable).
7. **Anticiper la déclaration CA3** : ligne 02 ("achats de biens et services dont la TVA est autoliquidée").

## 6. Écritures comptables — Côté donneur d'ordre

### Comptabilisation de la facture sous-traitant
```
604 (ou 611) "Achats sous-traitance"        D  10 000 €
44566 "TVA déductible sur ABS"              D   2 000 €    ← TVA autoliquidée (20 %)
    401 "Fournisseur sous-traitant"             C  10 000 €
    4452 "TVA due intracom / autoliquidation"   C   2 000 €
```

### Lors du paiement
```
401 "Fournisseur sous-traitant"             D  10 000 €
    512 "Banque"                                C  10 000 €
```

### Déclaration CA3 (du donneur d'ordre)
- **Ligne 02** "Achats de biens et services dont la TVA est autoliquidée" : 10 000 € → TVA 2 000 €
- **Ligne 17** "Total TVA collectée" : intègre les 2 000 €
- **Ligne 20** "TVA déductible sur autres biens et services" : 2 000 € (récupération)
- **Effet net en trésorerie** : 0 € (collectée = déductible)

⚠️ Si le donneur d'ordre est en **prorata de déduction** (activités exonérées), la TVA déductible peut être **partiellement perdue** — l'autoliquidation n'est pas neutre dans ce cas.

## 7. Restitution structurée

```
## Contrôle facture sous-traitant — [n° facture]

### Identification
- **Sous-traitant** : [nom + SIRET]
- **Donneur d'ordre** : [nom + SIRET]
- **Marché / Chantier** : [...]
- **Lot / Prestation** : [...]
- **Date facture** : [JJ/MM/AAAA]
- **Montant HT** : [€]
- **Type de marché** : public / privé

### Conformité autoliquidation (CGI art. 283 nonies)

| Critère | Constat | Conformité |
|---|---|---|
| Nature prestation éligible BTP | [oui/non] | ✅ / ❌ |
| Sous-traitant assujetti TVA | [oui/non] | ✅ / ❌ |
| Donneur d'ordre assujetti TVA | [oui/non] | ✅ / ❌ |
| MOA assujetti (pour cascade) | [oui/non] | ✅ / N.A. |
| Facture émise HT | [oui/non] | ✅ / ❌ |
| Mention "Autoliquidation art. 283 nonies CGI" | [oui/non] | ✅ / ❌ |
| Détail TVA = 0 | [oui/non] | ✅ / ❌ |
| Description précise des travaux | [oui/non] | ✅ / ⚠️ |
| Numéro séquentiel + date | [oui/non] | ✅ / ❌ |
| SIRET + adresse parties | [oui/non] | ✅ / ❌ |

### Conformité loi 75-1334 (sous-traitance)

| Critère | Constat | Conformité |
|---|---|---|
| **Marché public** : DC4 signé MOA | [oui/non] | ✅ / ❌ |
| **Marché public** : agrément des conditions de paiement | [oui/non] | ✅ / ❌ |
| **Marché privé** : agrément MOA exprès | [oui/non/tacite] | ✅ / ⚠️ |
| **Marché privé** : caution personnelle ET solidaire | [oui/non] | ✅ / ❌ |
| **Marché privé** : OU délégation de paiement signée MOA | [oui/non] | ✅ / N.A. |

### Écritures comptables recommandées (côté donneur d'ordre)
- **604 ou 611** "Achats sous-traitance" — Débit HT
- **44566** "TVA déductible sur ABS" — Débit TVA (taux normal 20 % ou réduit 10/5,5 selon prestation)
- **4452** "TVA autoliquidée" — Crédit TVA
- **401** "Fournisseur sous-traitant" — Crédit Total HT
- **Effet net trésorerie** : 0 €

### Déclaration CA3
- Ligne 02 : [montant HT]
- Ligne 17 (TVA collectée) : intègre +[TVA]
- Ligne 20 (TVA déductible) : [TVA] récupéré

### Sanctions encourues si non-respect

| Manquement | Sanction |
|---|---|
| Sous-traitant a collecté TVA à tort | Amende 5 % du montant TVA collectée à tort + intérêts |
| Donneur d'ordre n'a pas déclaré autoliquidation | Amende 5 % de la TVA non déclarée (art. 1788 A CGI) |
| Mentions facturation manquantes | 15 € par mention manquante, plafonné 25 % du montant (art. 1737 II CGI) |
| Manquement délibéré | Majoration 40 % à 80 % (art. 1729 CGI) |
| Délai de reprise | 3 ans civils suivant l'année concernée (art. L.169 LPF) |

### Action recommandée
- **Si conforme** : ✅ valider et comptabiliser
- **Si TVA collectée indûment** : demander **facture rectificative** au sous-traitant (recommandé)
- **Si mention manquante** : demander rectification (régularisation possible avant contrôle)
- **Si défaut DC4 / caution loi 1975** : ⚠️ alerter ; le contrat peut être déclaré **nul** d'ordre public (Cass. ch. mixte 18/12/1992) → risque de **devoir payer 2 fois**

### Conservation des pièces
- Facture + contrat de sous-traitance : **10 ans** (Code de commerce L.123-22)
- Pièces fiscales : **6 ans** (LPF art. L.176)
```

## 8. Garde-fous spécifiques

- Si le sous-traitant a **collecté indûment** la TVA, **deux options** :
  1. Demander une **facture rectificative** (recommandé)
  2. Accepter la facture et déduire normalement la TVA — **risque** : si l'administration relève l'irrégularité, le donneur d'ordre peut être inquiété pour **insuffisance de vigilance** (jurisprudence stricte CE)
- Pour les **marchés publics** sans agrément du MOA (absence de DC4 signé) : le sous-traitant n'a **pas droit au paiement direct** (loi 75-1334 art. 6) — alerter immédiatement.
- Pour les **marchés privés** sans agrément ET sans caution ET sans délégation de paiement : contrat de sous-traitance **nul d'ordre public** (Cass. ch. mixte 18 décembre 1992) — risque de devoir **invalider tout le contrat** et de **payer 2 fois** (au sous-traitant directement + à l'entreprise principale).
- Si le **MOA est un particulier non assujetti** : l'autoliquidation BTP **ne s'applique pas** entre l'entreprise principale et le MOA, mais **s'applique toujours** entre entreprise principale et sous-traitant BTP (les deux étant assujettis).
- **Sous-traitant en franchise en base TVA** (CA < seuils, art. 293 B CGI) : il **ne facture pas de TVA** mais doit mentionner "TVA non applicable — art. 293 B du CGI". Pas d'autoliquidation à appliquer par le donneur d'ordre.
- En cas de **fourniture seule** (livraison de matériaux sans pose) : pas d'autoliquidation, TVA normale. **Exception** : si la fourniture est **accessoire** à une prestation BTP plus large (montant fourniture < 50 % du total), elle suit le régime de la prestation principale = autoliquidation.
- Tu **n'autorises** ni ne **refuses** la facture — tu prépares la **recommandation** pour l'expert-comptable utilisateur qui décide.

## 9. Suites logiques à proposer

- Skill `controle_sous_traitance_1975` pour vérification approfondie du cadre juridique (DC4, caution, délégation)
- Skill `controle_situation_travaux` si la facture entre dans une situation mensuelle de travaux
- **Demande de rescrit fiscal** (LPF art. L.80 B) sur les cas vraiment ambigus (montant > seuil défini par le cabinet)
- Mise à jour des **outils de facturation** entreprise pour automatiser les mentions obligatoires
- **Formation** des collaborateurs comptables (juniors notamment) sur les pièges fréquents
- Réception des éventuelles **dénonciations** de contrat ou de caution → impact sur les paiements en cours
- Vérification du **profil de risque** du sous-traitant (Kbis, attestation URSSAF, vigilance art. L.8222-1 et suivants du Code du travail — obligation de vigilance des donneurs d'ordre)
