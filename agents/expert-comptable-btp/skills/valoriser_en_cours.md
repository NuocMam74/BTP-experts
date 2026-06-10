# Skill — Valoriser les en-cours et passer les écritures (méthode à l'achèvement)

L'utilisateur veut **valoriser les en-cours de production** d'une entreprise BTP appliquant la **méthode à l'achèvement** et **passer les écritures** de variation d'en-cours à la clôture, dans le respect du PCG.

> ⚠️ **Rappel de la date de la base** : comptes et règles PCG **à revérifier** à la date de consultation. Tu prépares l'analyse ; l'expert-comptable (DEC) valide et signe.

## 1. Documents attendus

- **Liste des chantiers ouverts** à la clôture (non achevés).
- **Inventaire de chantier** (avancement physique relevé) par chantier.
- **Coûts engagés** par chantier (analytique — MO, matériaux, ST, matériel, frais de chantier).
- **Approvisionnements stockés** sur chantier (matériaux livrés non posés).
- **Politique comptable** : méthode retenue (achèvement) et son maintien (permanence des méthodes).
- **Coût total estimé à terminaison** + prix de marché (pour la perte à terminaison).

Si absent, demande :
1. Méthode retenue confirmée : **achèvement** (et non avancement) ?
2. Y a-t-il un **inventaire de chantier** (relevé d'avancement) à la clôture ?
3. Les coûts sont-ils suivis en **analytique** par chantier ?
4. Un chantier est-il **déficitaire** à terminaison (→ perte à provisionner) ?
5. Qualification : production de **biens** (compte 33) ou de **services** (compte 34) ?

## 2. Référentiels (`rag_search`)

- `rag_search("méthode à l'achèvement en-cours de production comptes 33 34")` — corpus *en_cours_methode_achevement*
- `rag_search("variation des en-cours 7133 71355 production stockée")`
- `rag_search("coût de production valorisation en-cours PCG")`
- `rag_search("perte à terminaison provision 1516 PCG 380-3")`
- `rag_search("CGI 38 2 bis rattachement produits travaux réception")`

## 3. Valoriser l'en-cours (coût de production, sans marge)

```
Coût de production de l'en-cours =
      Matières et fournitures incorporées
    + Charges directes de production (MO chantier, ST, matériel)
    + Quote-part de charges indirectes de production (frais de chantier, encadrement production)
```

**Exclure** : charges administratives générales, charges financières (sauf option encadrée), frais de commercialisation, **marge** (l'en-cours ne contient **pas** de bénéfice).

> Distinguer l'**en-cours de production** (travaux exécutés non facturés) des **approvisionnements stockés** (matériaux livrés non posés → stock de matières, pas en-cours).

## 4. Écritures (méthode à l'achèvement)

### Clôture N — constitution / augmentation de l'en-cours
```
34  En-cours de production de services            D   X €
    71355  Variation des en-cours de services         C   X €
```
(ou 33 / 7133 si production de biens) → neutralise les charges de la classe 6, résultat du chantier ≈ 0.

### N+1 — achèvement : extourne de l'en-cours puis constatation du CA
```
71355  Variation des en-cours de services         D   X €
    34  En-cours de production de services            C   X €

4111 / 418  Client                                D   Prix marché HT
    704  Travaux                                       C   Prix marché HT
```
→ Le résultat du contrat apparaît à l'achèvement.

### Perte à terminaison (obligatoire, même à l'achèvement)
Si coût total estimé > prix de marché :
```
6815  Dotations aux provisions d'exploitation     D   perte totale prévue
    1516  Provisions pour pertes sur contrats          C   idem
```
> La perte se provisionne **immédiatement** et **en totalité** (PCG art. 380-3), indépendamment de l'avancement.

### Acomptes / situations reçus avant achèvement
```
512 Banque                                        D   Z €
    4191  Avances et acomptes reçus sur commandes      C   Z €
```

## 5. Procédure d'inventaire de chantier

1. **Recenser** les chantiers ouverts à la clôture.
2. **Mesurer l'avancement physique** (relevé contradictoire avec le conducteur de travaux).
3. **Valoriser** au coût de production les travaux exécutés non facturés.
4. **Distinguer** les approvisionnements stockés (→ stock de matières).
5. **Rapprocher** des coûts comptabilisés (analytique ↔ générale).
6. **Documenter** (note d'inventaire + visa conducteur).

## 6. Restitution structurée

```
## Valorisation des en-cours — clôture [date] (méthode à l'achèvement)

### Méthode et permanence
- Méthode : à l'achèvement (mention annexe) — maintenue depuis [exercice]

### Inventaire par chantier
| Chantier | Avancement physique | Coût de production en-cours | Approv. stockés (hors en-cours) |
|---|---|---|---|
| ... | ... | ... | ... |

### Écritures proposées
- En-cours : 34 D / 71355 C : [Σ €]
- (Extourne N-1 si achèvement) : 71355 D / 34 C
- CA à l'achèvement : 411/418 D / 704 C
- Perte à terminaison (si applicable) : 6815 D / 1516 C : [€]

### Annexe
- Méthode retenue, base de valorisation (coût de production), provisions pour pertes

### Cohérence à vérifier
- [✅/⚠️] En-cours valorisé au coût de production (sans marge)
- [✅/⚠️] Approvisionnements stockés non comptés en en-cours
- [✅/⚠️] Perte à terminaison provisionnée (1516) si coût > marché
- [✅/⚠️] Permanence des méthodes respectée

### Garde-fous
- Comptes / règles PCG à revérifier ; à valider par le DEC.
```

## 7. Livrable (`generer_rapport`)

`generer_rapport({ titre: "Valorisation des en-cours — clôture [date]", contenu, format: "xlsx" | "docx", agent: "expert-comptable-btp", metadata: { entité, exercice, date } })`

- **XLSX** : inventaire par chantier + valorisation + tableau des écritures.
- **DOCX** : note de méthode + annexe comptable.

## 8. Garde-fous spécifiques

- La **méthode à l'achèvement** suppose un **choix de politique comptable** (ou l'impossibilité d'estimer le résultat de façon fiable) — **à mentionner en annexe** et à **maintenir** (permanence, PCG art. 121-2).
- La **perte à terminaison** se provisionne **immédiatement** (1516), même à l'achèvement — ne jamais l'omettre.
- L'en-cours est valorisé **au coût de production**, **jamais au prix de vente** (pas de marge anticipée).
- Le **rattachement fiscal** des produits suit l'art. 38, 2 bis CGI (réception). Une **sous-évaluation** des en-cours minore le résultat imposable → risque de contrôle.
- Tu **n'engages pas** la responsabilité de l'expert-comptable.

## 9. Suites logiques à proposer

- Skill `suivre_analytique_chantier` (source des coûts de production).
- Skill `reconnaissance_revenu_avancement` (si bascule vers la méthode à l'avancement — retraitement rétroactif).
- Skill `auditer_provisions_btp` (perte à terminaison, cohérence 2056).
- Préparation de l'**annexe comptable** (méthode, en-cours, provisions).
