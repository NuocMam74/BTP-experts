# Skill — Contrôler comptablement une situation de travaux

L'utilisateur te transmet une **situation mensuelle de travaux** (ou une situation cumulée intermédiaire). Tu dois la **vérifier sur le plan comptable et fiscal** : cumul vs marché, retenue de garantie, révision, TVA, écritures, traçabilité.

> ⚠️ Cette skill est l'angle **expert-comptable** (saisine côté entreprise titulaire ou MOA). Pour l'angle **maîtrise d'œuvre** (vérification d'avancement et de prix), voir la skill MOEX `controle_situation_travaux`.

## 1. Documents attendus

- **Situation mensuelle de travaux** (PDF, XLSX) — émise par l'entreprise titulaire
- **DPGF** initiale + avenants éventuels
- **Marché** signé (CCAP, acte d'engagement) avec **conditions financières** (révision, retenue de garantie, modalités d'acompte, formule de prix)
- **PV** d'avancement (signé MOE/MOA) ou bons d'attachement
- **Situations antérieures** (pour cumul cohérent)
- **Caution bancaire** ou **GAPD** (garantie à première demande) substituant la retenue de garantie le cas échéant
- **Indices BT / TP** publiés (INSEE) si révision

Si pièces partielles : demande
1. Marché public ou privé ?
2. Régime fiscal client (TVA normale, TVA réduite logement, MOA non assujetti) ?
3. Régime de prix (ferme, ferme actualisable, révisable) ? Formule contractuelle ?
4. Retenue de garantie 5 % ou substitution caution / GAPD ?
5. Présence de sous-traitants en paiement direct ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("CCAG-Travaux article 19 acomptes situations")`
- `rag_search("CCAG-Travaux article 10 révision actualisation")`
- `rag_search("CCAG-Travaux article 44 retenue de garantie")`
- `rag_search("NF P 03-001 articles 13 et 17 acomptes garanties marchés privés")`
- `rag_search("CGI articles 269 270 fait générateur TVA travaux")`
- `rag_search("loi 71-584 retenue garantie 5 % marchés privés")` — texte fondateur RG en privé

## 3. Procédure de contrôle

### Étape 1 — Cohérence formelle de la situation

| Vérification | Méthode |
|---|---|
| Numéro de situation, mois de référence | Lecture en-tête |
| Marché et avenants intégrés | Cumul de référence cohérent |
| Décomposition par lot ou poste DPGF | Tableau cohérent avec DPGF |
| Quantités du mois vs cumulées vs contractuelles | Calcul croisé |
| Prix unitaires identiques au bordereau | Comparaison ligne à ligne |
| Révision/actualisation correctement appliquée | Formule contractuelle |
| Retenue de garantie 5 % HT (ou substitution) | Calcul sur HT |
| Total HT cohérent avec sous-totaux | Vérif arithmétique |
| TVA appliquée selon nature de l'opération | Voir §4 |
| Cumul cohérent avec situations antérieures | Suite arithmétique |

### Étape 2 — Vérification du cumul vs marché

```
Σ situations cumulées HT ≤ Σ marché initial + Σ avenants notifiés HT
```

Si dépassement → **bloquant** : avenants manquants ou erreurs de cumul, à investiguer.

⚠️ **Quantités cumulées par poste ≤ quantité contractuelle**, sauf modifications justifiées (OS, avenant, sujétion technique imprévue).

### Étape 3 — Révision et actualisation des prix

#### Actualisation (CCAG-Travaux art. 10.2)
- Applicable si **délai entre date marché et date début exécution > 3 mois**
- Formule indiciaire : Cn = C0 × (In-3 / I0)
- I0 = indice du mois zéro (généralement mois de remise des offres ou date prévisionnelle d'exécution selon CCAP)
- I3 = indice du mois N-3 (3 mois avant date du fait générateur)

#### Révision (CCAG-Travaux art. 10.4 / NF P 03-001)
- Applicable mensuellement aux acomptes
- Formule contractuelle type : Cn = C0 × (a + b × (BTx_n / BTx_0))
  - **a** = part fixe (souvent 0,10 à 0,15)
  - **b** = part variable
  - **BTx** = indice contractuel (BT01, BT08, BT38, BT50, TP01, TP04…)
  - n = mois M-3 (sauf clause contraire)
- Vérifier que **a + b = 1** (sauf formule à plusieurs indices)
- Vérifier que les **indices** sont ceux publiés INSEE (et non estimés)

### Étape 4 — Retenue de garantie 5 %

**Marché public (CCAG-Travaux art. 44 + Code commande publique art. R.2191-32)** :
- 5 % HT du montant du marché
- Substituable par **caution bancaire personnelle et solidaire** OU **GAPD** (garantie à première demande)
- Libération : 30 jours après expiration du **délai de garantie de parfait achèvement (GPA = 1 an)**

**Marché privé (loi 71-584 + NF P 03-001 art. 13)** :
- 5 % maximum
- Substituable par caution **d'un organisme financier agréé**
- Consignée à la **Caisse des Dépôts** si pas de substitution
- Restitution à expiration de la GPA (1 an), sauf réserves levées

⚠️ Vérifier le **calcul sur HT** (pas TTC) et l'**absence de retenue sur la révision** (sauf clause CCAP contraire).

### Étape 5 — TVA applicable

| Cas | Taux | Particularité |
|---|---|---|
| Marché public ouvrage neuf MOA collectivité | 20 % | Récupération FCTVA possible MOA |
| Travaux logement collectif neuf | 20 % | Attestation MOA non requise |
| Travaux dans logement de + 2 ans | 10 % | Attestation 1300-SD MOA |
| Rénovation énergétique éligible | 5,5 % | Attestation 1301-SD MOA |
| MOA particulier (rénovation > 2 ans) | 10 % ou 5,5 % | Attestation au moment du devis |
| Sous-traitance BTP (cascade) | Autoliquidation | Mention 283 nonies (voir skill dédiée) |
| MOA hors champ TVA (collectivité non assujettie) | 20 % standard | Pas d'autoliquidation entre EU et collectivité |

### Étape 6 — Fait générateur et exigibilité (CGI art. 269)

- **Fait générateur** : exécution des travaux (livraison successive)
- **Exigibilité** :
  - **Régime du débit** (par défaut depuis 2003) : exigible lors de l'émission de la facture
  - **Sur option** : régime des **encaissements** (TVA exigible à l'encaissement seulement)
  - **MOA public** : règle particulière — exigibilité à la **mise en paiement** (et non lors de l'émission de la situation)

⚠️ Régime du **débit** = situations émises génèrent TVA exigible immédiate, même si le client n'a pas payé. Risque trésorerie.

### Étape 7 — Sous-traitants en paiement direct

Si des **sous-traitants en paiement direct** (marché public agréé) sont rattachés à la situation :
- Leur **part** est isolée dans la situation
- L'entreprise principale **n'encaisse pas** leur part (paiement direct par le MOA)
- Comptabilisation : compte **604** "Achats de sous-traitance" (par l'entreprise principale) crédité d'un **transfert** ; le sous-traitant déclare directement sa créance au MOA

### Étape 8 — Écritures comptables (côté entreprise titulaire)

```
[Émission de la situation]
411 "Clients"                              D  [Net à mandater TTC]
4117 "Clients - Retenue de garantie"       D  [Retenue 5 % HT]
    701/704/705 "Production vendue"             C  [Montant cumulé HT - cumul situations antérieures]
    44571 "TVA collectée"                       C  [TVA exigible — selon régime débit/encaissement]

[Encaissement]
512 "Banque"                              D  [Net à mandater TTC]
    411 "Clients"                              C  idem

[Libération RG à expiration GPA + levée réserves]
411 "Clients"                              D  [RG cumulée]
    4117 "Clients - RG"                         C  idem
[Puis encaissement classique]
```

## 4. Restitution structurée

```
## Contrôle comptable situation de travaux n° [X]

### Identification
- **Marché** : [référence + maître d'ouvrage]
- **Titulaire** : [entreprise]
- **Lot** : [n° + nom]
- **Situation n°** : [X]
- **Mois de référence** : [MM/AAAA]
- **Régime fiscal client** : [TVA normale / réduite / non assujetti]
- **Régime de prix** : [ferme / ferme actualisable / révisable + formule]
- **Garantie** : [retenue 5 % / caution / GAPD]

### Cumul et arithmétique

| Élément | Montant (€ HT) |
|---|---|
| Marché initial | [...] |
| Avenants notifiés | [...] |
| **Marché total HT révisé** | [P] |
| Cumul situations antérieures HT | [...] |
| Situation du mois HT (hors révision) | [...] |
| Révision du mois | [...] |
| **Cumul total HT à date** | [Σ] |
| **Reste à exécuter HT** | [P – Σ] |

### Vérifications

| Critère | Constat | Conformité |
|---|---|---|
| Cumul ≤ marché total HT | [Σ vs P] | ✅ / ❌ |
| Quantités cumulées ≤ quantités contractuelles | [par lot] | ✅ / ⚠️ |
| Prix unitaires conformes bordereau | [contrôle ligne] | ✅ / ⚠️ |
| Formule de révision contractuelle | [a + b cohérents] | ✅ / ⚠️ |
| Indices BT/TP du mois M-3 publiés | [In-3 INSEE] | ✅ / ⚠️ |
| Calcul retenue garantie 5 % sur HT | [valeur correcte] | ✅ / ❌ |
| TVA appliquée | [taux + base] | ✅ / ⚠️ |
| Sous-traitants paiement direct isolés | [N.A. / présent] | ✅ |

### Calcul TVA et net à mandater

| Élément | Montant (€) |
|---|---|
| Montant validé HT | [...] |
| Retenue garantie 5 % HT | – [...] |
| **Net à mandater HT** | [...] |
| TVA (taux : [20/10/5,5] %) | + [...] |
| **Net à mandater TTC** | [...] |

### Écritures comptables proposées
```
411 "Clients"                              D  [Net à mandater TTC]
4117 "Clients - Retenue de garantie"       D  [Retenue 5 % HT]
    704 "Travaux"                               C  [Montant HT du mois]
    44571 "TVA collectée"                       C  [TVA]
```

### Régime TVA d'exigibilité
- **Débit** (défaut) : TVA exigible à l'émission de la facture
- **Encaissement** (sur option) : TVA exigible à l'encaissement
- → Régime applicable à cette entreprise : [débit / encaissement]
- → Date de fait générateur : [...]
- → Période CA3 d'imputation : [MM/AAAA]

### Points d'attention
1. [Ex : révision calculée avec In-2 au lieu de In-3 → recalculer]
2. [Ex : retenue de garantie appliquée sur TTC au lieu HT → corriger]
3. [Ex : TVA 10 % sans attestation 1300-SD jointe → demander]
4. [Ex : cumul fait apparaître dépassement marché → vérifier avenants signés]

### Niveau de confiance
- [Élevé / À valider après contrôles complémentaires]

### Suites
- [Recommandations : régularisations à passer, pièces complémentaires à demander]
- [Réserve éventuelle sur la situation]
```

## 5. Garde-fous spécifiques

- Tu **ne signes** ni n'autorises de paiement — tu prépares un **contrôle comptable** qui sert à l'expert-comptable utilisateur.
- Pour les **marchés publics**, le **délai global de paiement (DGP)** est de **30 jours** (collectivités) ou **50 jours** (établissements publics santé) ; au-delà, **intérêts moratoires automatiques** (taux BCE + 8 points minimum) à comptabiliser en compte **6711** (charges exceptionnelles).
- Pour les **marchés privés**, la **loi LME 2008** plafonne à **60 jours fin de mois** ou **45 jours fin de mois**. Vérifier conformité CCAP.
- Si **dépassement du marché HT** détecté : ne pas accepter la situation — exiger l'**avenant signé** au préalable (sinon la part dépassant n'est pas mandatable).
- Pour la **révision** : vérifier que l'indice **publié INSEE** est utilisé (pas d'estimation). Les indices BT sont publiés avec ~3 mois de décalage : si la situation cite un indice non publié, alerter.
- Si **retenue de garantie** substituée par caution : vérifier que la **caution bancaire** est **émise par un établissement agréé** (liste ACPR) ; en marché public, vérifier qu'elle est **conforme au modèle CCAG art. 44** (premier demande indépendante).
- Pour **TVA en régime débit** : attention à la **trésorerie** — la TVA est due dès la facturation, même si le client tarde à payer.
- Tu **rappelles** qu'en cas de **litige sur les quantités**, le MOE peut **refuser le mandatement** ; côté entreprise titulaire, prévoir mémoire en réclamation (CCAG art. 50) dans les **délais contractuels** (souvent 45 jours).
- Pour les **sous-traitants en paiement direct** : leur facture est adressée **directement** au MOA (avec copie à l'EP), pas à l'entreprise principale.
- Pour les **provisions pour litiges**, ne **comptabilise pas** une perte avant qu'elle ne soit **probable et estimable** (PCG art. 322-1 §3).

## 6. Suites logiques à proposer

- Skill `reconnaissance_revenu_avancement` pour la traduction comptable de l'avancement à la clôture
- Skill `controle_autoliquidation_btp` si la situation intègre de la sous-traitance BTP
- Skill `controle_sous_traitance_1975` pour le cadre juridique des sous-traitants
- Skill `calculer_tva_travaux` pour vérifier le taux appliqué selon nature et client
- Demande au MOE d'un **PV d'avancement signé** si vérification d'avancement physique nécessaire
- Si trésorerie tendue : étudier option **encaissement** pour la TVA, **mobilisation Dailly / affacturage**, **escompte de caution**
- Pour le **dossier d'audit** : conservation **10 ans** des situations + PV + indices appliqués (Code commerce L.123-22)
- Pour les **cas litigieux** sur quantités ou révision : **mémoire en réclamation** à formaliser dans les délais CCAG / NF P 03-001
