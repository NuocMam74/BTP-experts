# CCAG-Travaux — Révision et actualisation de prix (extraits)

**Source :** Arrêté du 30 mars 2021 portant approbation du cahier des clauses administratives générales des marchés publics de travaux (CCAG-Travaux 2021), Legifrance — texte officiel français du domaine public.

## Article 10 — Variation des prix

### Article 10.1 — Cas général

Les prix du marché peuvent être :
- **Fermes** : ils ne peuvent être actualisés ni révisés.
- **Fermes actualisables** : un prix ferme est actualisé en fonction des variations économiques constatées entre le mois d'établissement du prix et le mois de début d'exécution des travaux.
- **Révisables** : ils sont modifiés en fonction des variations économiques constatées en cours d'exécution du marché, par application d'une formule de révision figurant au marché.

### Article 10.2 — Mois d'établissement des prix (mois zéro)

Le mois d'établissement des prix (dit "mois zéro" ou M0) est, sauf disposition contraire du marché, le mois précédant celui de la signature de l'acte d'engagement par le titulaire.

### Article 10.3 — Actualisation

L'actualisation joue lorsque le délai entre la date d'établissement du prix (M0) et la date de début d'exécution des travaux excède **trois mois**.

Le coefficient d'actualisation est calculé sur la base des index applicables au mois M-3 (mois précédant de trois mois la date à laquelle commence l'exécution des prestations) divisés par les mêmes index au mois M0.

### Article 10.4 — Révision

La formule de révision figurant au marché fait intervenir un ou plusieurs index de référence (BT01 à BT55 pour le bâtiment, TP01 à TP12 pour les travaux publics, publiés par l'INSEE).

La révision joue chaque mois sur la base des index publiés. Sauf disposition contraire, **les valeurs des index sont celles du mois M-3** (trois mois avant le mois de l'exécution effective des prestations rémunérées).

### Article 10.5 — Formule paramétrique

Une formule de révision typique a la forme :

```
P = P0 × (a + b × BT(n) / BT(0))
```

Où :
- `P` = prix révisé du mois n
- `P0` = prix initial du marché (établi au mois M0)
- `a` = partie fixe (souvent 0,125 ou 0,15)
- `b` = part révisable (1 − a)
- `BT(n)` = valeur de l'index BT au mois M-3 par rapport à n
- `BT(0)` = valeur de l'index BT au mois M0

## Application pratique

Pour les marchés de longue durée (> 3 mois entre M0 et début d'exécution), l'actualisation est **automatique** (pas besoin de demande). En revanche, la révision n'est appliquée que si le marché prévoit une formule de révision : à défaut, les prix restent fermes en cours d'exécution.

**À vérifier dans le CCAP du marché :**
1. Les prix sont-ils fermes, fermes actualisables, ou révisables ?
2. Quel est l'index BT (ou combinaison d'index) applicable au lot considéré ?
3. Le coefficient `a` (part fixe) est-il indiqué ? Si non, on utilise généralement 0,125 par défaut.
4. Y a-t-il un mois zéro explicite ?

**Référence à citer :** CCAG-Travaux 2021 (arrêté 30 mars 2021), art. 10. Source : Legifrance.
