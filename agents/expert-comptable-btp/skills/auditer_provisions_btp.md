# Skill — Auditer les provisions d'une entreprise BTP

L'utilisateur te transmet la comptabilité d'une entreprise BTP (avant clôture ou en cours d'audit) — tu dois vérifier les provisions nécessaires et leur conformité au PCG.

## Procédure attendue

### 1. Identifier le contexte

Demande (si absent) :
- **Entreprise auditée** : raison sociale, SIREN, activité (BTP, type)
- **Exercice clos** ou en cours
- **Format des comptes** : provisoires, définitifs
- **Spécificités** : chantiers en cours, litiges connus, sinistres récents

### 2. Provisions à examiner systématiquement

#### A. Provision pour congés payés (cadres et ETAM uniquement)

##### Spécificité BTP

**ATTENTION** : Pour les **ouvriers BTP affiliés CIBTP**, **PAS de provision CP** (externalisé à la caisse).

Pour **cadres et ETAM** : provision classique.

##### Calcul

```
Provision CP = 1/10 des salaires de la période de référence (1ᵉʳ juin → 31 mai)
             - CP déjà pris pendant la période
             + Charges sociales (~ 50-55 %)
```

##### Comptabilisation

```
6412 Provision pour congés payés (cadres/ETAM)         _ €
6451 Provision pour charges sociales                    _ €
    4282 Provisions pour congés payés                    _ €
    4382 Provisions pour charges sociales                _ €
```

##### Audit

- ❓ Calcul cohérent avec base des salaires
- ❓ Période de référence respectée
- ❓ Ouvriers BTP exclus de cette provision (cohérent avec CIBTP)

#### B. Provision pour perte à terminaison (contrats long terme)

##### Cadre PCG art. 380-3

Obligation **immédiate** de provisionner la perte totale si coûts à terminaison > prix marché.

##### Démarche d'audit

Pour chaque chantier en cours :

1. **Récupérer** :
   - Montant du marché révisé (initial + avenants)
   - Coûts engagés à la clôture
   - **Coûts restant à engager** estimés
   - Total coûts à terminaison

2. **Calculer** :
   ```
   Perte prévisible = Total coûts à terminaison - Marché révisé
   Si > 0 → Provisionner immédiatement
   ```

3. **Comptabiliser** :
   ```
   6815 Dotations aux provisions d'exploitation         _ €
       1518 Autres provisions pour risques                  _ €
   ```

##### Audit

- ❓ Tableau de bord chantier par chantier
- ❓ Coûts restant à engager estimés par le conducteur de travaux (signature)
- ❓ Provision **complète** sur la perte, pas au prorata de l'avancement

##### Exemple

Marché : 1 200 000 € HT.
Coûts engagés : 800 000 €.
Coûts restant à engager : 460 000 €.
Total coûts terminaison : 1 260 000 €.
**Perte prévisible** : 60 000 € → Provisionner intégralement.

#### C. Provision pour litiges

##### Cas couverts

- Réclamations art. 50 CCAG en cours
- Litiges fournisseurs ou sous-traitants
- Litiges fiscaux ou sociaux
- Litiges décennale (parts non couvertes par RC)
- Honoraires d'avocat à venir

##### Conditions de déductibilité (CGI 39-1 5°)

1. **Nettement précisée** (objet, montant, base de calcul)
2. Risque **probable** (pas seulement éventuel)
3. Mentionnée sur **tableau 2056**
4. Régulièrement comptabilisée

##### Comptabilisation

```
6815 Dotation aux provisions d'exploitation        _ €
    1511 Provisions pour litiges                       _ €
```

##### Audit

- ❓ Recensement des litiges (échange avec direction + avocat)
- ❓ Chiffrage justifié (devis avocat, expertise, indemnité réclamée)
- ❓ Conformité conditions de déductibilité
- ❓ Mention au tableau 2056

#### D. Provision pour engagements de retraite (IFC)

##### Cadre PCG art. 322

Si entreprise verse une **indemnité de fin de carrière** à ses salariés.

##### Calcul (méthode actuarielle simplifiée)

```
Provision = Σ (Salaire de fin de carrière estimé × Ancienneté × Coefficient × Probabilité présence × Actualisation)
```

##### Comptabilisation

```
6816 Dotation aux provisions pour risques et charges     _ €
    1531 Provisions pour pensions et obligations similaires  _ €
```

##### Audit

- ❓ Liste des salariés concernés (anciens cadres, ouvriers anciens)
- ❓ Calcul actuariel (taux d'actualisation, table de mortalité)
- ❓ Recommandation ANC 2013-02
- ❓ Reprise/dotation cohérentes avec évolution effectif

#### E. Provision pour sinistres décennale (parts non couvertes)

##### Cas

- Sinistre identifié ou probable
- Franchise restant à charge entreprise
- Part non couverte par assurance RC décennale

##### Audit

- ❓ Recensement des **désordres dénoncés** par MOA (pendant GPA ou ultérieurement)
- ❓ Position de l'assureur (prise en charge, refus, franchise)
- ❓ Estimation des coûts de reprise
- ❓ Provisionnement de la part nette à charge

##### Comptabilisation

```
6815 Dotation aux provisions d'exploitation        _ €
    1511 Provisions pour litiges                       _ €
```

#### F. Provision pour amendes ou redressements

##### Cas

- Vérification de comptabilité en cours
- Notification d'avis de mise en recouvrement
- Procédure contentieuse fiscale ou sociale

##### Audit

- ❓ Courriers DGFiP / URSSAF examinés
- ❓ Chiffrage du risque (montant + pénalités)
- ❓ Provisionnement du **principal** (pas des amendes — non déductibles fiscalement, mais déductible si « amende probable »)

##### Comptabilisation

```
6815 Dotation aux provisions d'exploitation        _ €
    155 Provisions pour impôts                         _ €
```

#### G. Provision pour démantèlement

##### Cas

- Obligation de démantèlement d'une installation (chaufferie, pylône, etc.)
- Provision dès la mise en service

##### Audit

- ❓ Identification des obligations contractuelles ou légales
- ❓ Estimation du coût de démantèlement (technique + main d'œuvre)
- ❓ Étalement sur durée d'utilisation

#### H. Provision pour gros entretien (composants séparés)

##### Cadre PCG art. 311-2

Si matériel BTP a des composants à durées de vie différentes (échafaudage, grue, banche).

##### Audit

- ❓ Identification des composants gros entretien
- ❓ Amortissement séparé
- ❓ Cohérence avec usage réel

### 3. Vérifier la cohérence d'ensemble

#### Tableau 2056 — récapitulatif provisions

| Type | Dotation N | Reprise N | Solde N |
|---|---|---|---|
| Congés payés (cadres/ETAM) | _ | _ | _ |
| Pertes à terminaison | _ | _ | _ |
| Litiges | _ | _ | _ |
| Engagements retraite (IFC) | _ | _ | _ |
| Sinistres décennale | _ | _ | _ |
| Amendes / redressements | _ | _ | _ |
| Démantèlement | _ | _ | _ |
| Gros entretien | _ | _ | _ |
| **Total** | _ | _ | _ |

#### Vérifier

- ❓ **Justifications** pour chaque provision (notes internes, factures, expertises)
- ❓ **Mise à jour** des estimations (pas de provision « historique » non reprise)
- ❓ **Reprise** des provisions devenues sans objet
- ❓ **Mention** au tableau 2056 (avec calcul détaillé pour > 10 000 €)
- ❓ **Note annexe** justifiant les provisions importantes

### 4. Détecter les provisions manquantes

#### Signaux d'alerte

| Signal | Provision suggérée |
|---|---|
| Chantier en cours avec budget tendu | Vérifier perte terminaison |
| Désordres dénoncés en GPA | Provision sinistre / litige |
| Réclamation reçue (mémoire art. 50) | Provision litige |
| Avis de redressement DGFiP / URSSAF | Provision amende / impôt |
| Salarié senior approchant retraite | Vérifier IFC |
| Avenants importants non chiffrés | Réserves contractuelles |

#### Échanges avec dirigeant et direction

- Quels litiges en cours ?
- Quels chantiers à risque ?
- Quels sinistres en cours ?
- Quelles évolutions réglementaires impactantes ?

### 5. Détecter les provisions excessives ou injustifiées

#### Signaux

- Provision **forfaitaire** sans justification (CGI 39-1 5° non respecté)
- Provision constante d'année en année sans évolution
- Provision pour risque éventuel mais non probable
- Provision pour amendes non déductibles
- Provision pour aléas commerciaux (interdit BIC, sauf cas spécifiques)

#### Risque fiscal

- Non-déductibilité → **réintégration extra-comptable** sur 2058 A
- Sanction si **mauvaise foi** ou **manœuvre frauduleuse**

### 6. Restitution

#### Rapport d'audit

Structure :

```
1. SYNTHÈSE EXÉCUTIVE
   - Verdict global (provisions complètes ou non)
   - Risques identifiés

2. AUDIT DÉTAILLÉ PAR PROVISION
   Pour chaque catégorie :
   - Méthode de calcul
   - Justifications
   - Conformité PCG et fiscale
   - Recommandations

3. PROVISIONS MANQUANTES À CONSTITUER
   - Liste avec chiffrage estimatif

4. PROVISIONS EXCESSIVES À REPRENDRE
   - Liste avec analyse

5. TABLEAU 2056 RECTIFIÉ
   - Synthèse après recommandations

6. IMPACTS FISCAUX ET COMPTABLES
   - Sur résultat de l'exercice
   - Sur IS due
   - Sur trésorerie

7. RECOMMANDATIONS
   - Procédure pour exercices futurs
   - Mise en place de procédures de suivi
```

## Garde-fous

- **Pas de validation finale** — le rapport vaut conseil ; signature par l'expert-comptable inscrit à l'OEC.
- **Conditions de déductibilité** strictes (CGI 39-1 5°) : risque, précision, mention.
- **Mention au tableau 2056** : justificatif obligatoire pour les provisions > 10 k€.
- **Provisions globales forfaitaires** souvent rejetées par DGFiP (CE 1ᵉʳ déc. 1976).
- **Documentation** : conserver les justificatifs des provisions (factures attendues, devis, expertises, courriers DGFiP) pendant 10 ans.
- **Reprise** systématique des provisions devenues sans objet.
- **Pour les contrats long terme** : méthode à l'avancement + perte à terminaison (PCG 380).

## Livrable à proposer

Après audit, propose :
- **Rapport d'audit des provisions** (DOCX + PDF) selon structure ci-dessus
- **Tableau 2056 rectifié** (XLSX)
- **Notes annexes** justificatives pour provisions importantes (DOCX)
- **Recommandations procédurales** pour exercices futurs
- **Estimation d'impact fiscal** des corrections proposées
- Mention finale : *« Document préparé par l'agent IA Expert-comptable BTP — à valider par l'expert-comptable inscrit à l'OEC et le commissaire aux comptes le cas échéant. »*
