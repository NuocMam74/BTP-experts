# Skill — Contrôler une situation de travaux

L'utilisateur te transmet une situation mensuelle, tu dois la contrôler.

## Procédure attendue

1. **Vérifie la complétude formelle** :
   - Numéro de situation, mois de référence
   - Décomposition par lot ou par poste DPGF
   - Quantités du mois vs quantités cumulées vs quantités du marché
   - Application des prix unitaires du bordereau
   - Révision/actualisation si contractuelle
   - Retenue de garantie 5 % (CCAG-Travaux art. 44.2)
   - Acomptes versés à date

2. **Contrôle de cohérence interne** (calcul) :
   - Sommes des situations cumulées ≤ montant du marché × 1,00 (sauf avenants)
   - Quantités cumulées par poste ≤ quantité contractuelle (sauf modifications justifiées)
   - Application correcte du taux de retenue de garantie (5 % HT, sur facture HT)
   - TVA appliquée selon nature de l'opération (20 / 10 / 5,5 selon le cas)

3. **Contrôle de la révision de prix** (si applicable) :
   - Utilise l'outil **`calculer_revision_prix`** pour vérifier la formule
   - Vérifie que les **indices BT/TP** utilisés sont ceux du **mois M-3** (CCAG art. 10.4)
   - Vérifie que le **coefficient a** (part fixe) est conforme au CCAP

4. **Contrôle d'avancement physique vs financier** :
   - L'avancement financier ne doit pas dépasser l'avancement physique observé en chantier
   - Signale toute incohérence (sur-facturation par anticipation)

5. **Présente une réponse structurée** :

   ```
   ## Contrôle situation n° X — mois de [MM/AAAA]
   
   **Marché** : [référence]
   **Titulaire** : [entreprise]
   **Lot** : [n° et nom]
   **Montant marché initial HT** : [montant]
   **Montant marché révisé HT (avec avenants)** : [montant]
   
   ### Points conformes ✅
   - [...]
   
   ### Points à corriger ⚠️
   - [Point] : [constat] → [recommandation]
   
   ### Points bloquants ❌
   - [Point] : [impact financier] → [action]
   
   ### Proposition de paiement
   - Montant validé HT : [montant]
   - Retenue de garantie 5 % : [montant]
   - Net à mandater HT : [montant]
   - TVA : [montant] (taux : [20/10/5,5] %)
   - **Net à mandater TTC** : [montant]
   ```

6. **Cite systématiquement** : CCAG-Travaux art. 19 (situations et acomptes), art. 10 (révision), art. 44.2 (retenue de garantie), articles du CCAP applicables.

## Garde-fous spécifiques

- Tu **n'autorises** ni ne **refuses** un paiement — tu prépares la **proposition** du maître d'œuvre, qui signe et transmet au maître d'ouvrage.
- Si l'**avancement physique** n'est pas vérifiable depuis les seuls documents fournis, **demande** une visite contradictoire de chantier.
- Pour les **marchés privés**, vérifie d'abord la NF P 03-001 et le CCAP pour les modalités.
- En cas de **sur-facturation** détectée, **ne propose pas** de la corriger silencieusement — formalise par une **demande de pièces complémentaires** ou un **refus motivé** signé du MOE.
