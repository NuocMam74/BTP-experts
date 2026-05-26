# Méthodologie — Sous-détail de prix (méthode UNTEC)

**Source :** Méthodologie de l'Union Nationale des Économistes de la Construction (UNTEC), synthèse de pratique professionnelle française.

## Structure d'un sous-détail de prix unitaire

Tout prix unitaire d'un poste de DPGF se décompose en quatre grandes masses :

1. **Déboursé sec (D)** — c'est le coût direct de l'ouvrage à l'unité de mesurage. Il se décompose en :
   - **MO** : main d'œuvre productive (heures d'ouvriers × taux horaire chargé)
   - **MAT** : matériaux fournitures (matières incorporées à l'ouvrage)
   - **MAT'** : matériel et outillage (location, amortissement, consommables)
   - **TR** : transports et manutentions (livraison, grutage)
   - **SC** : sous-traitance éventuelle valorisée HT

2. **Frais de chantier (FC)** — affectables au chantier mais non directement à un ouvrage élémentaire :
   - Installation / repli (cantonnement, clôtures, bennes, panneau)
   - Encadrement (chef de chantier, conducteur de travaux dédié)
   - Compte prorata (cf. NF P 03-001 annexe A) : eau, électricité, gardiennage
   - Échafaudages communs
   - Sécurité (PPSPS, EPI collectifs)

3. **Frais généraux (FG)** — affectables à l'entreprise (siège, encadrement non chantier, marketing, financiers). Typiquement 8 % à 18 % du déboursé selon la taille de l'entreprise et le métier.

4. **Bénéfices et aléas (BA)** — marge commerciale et provision pour aléas. Typiquement 4 % à 10 %.

## Formule de composition

```
Prix unitaire HT = D × (1 + FC%) × (1 + FG%) × (1 + BA%)
```

ou bien, plus rigoureusement :

```
Prix unitaire HT = D + D × FC% + (D + FC) × FG% + (D + FC + FG) × BA%
```

(les deux conventions existent — bien vérifier laquelle est utilisée dans le bordereau de référence).

## Ordres de grandeur usuels (France 2024-2025)

| Poste | Plage typique |
|---|---|
| MO bâtiment (taux horaire chargé ouvrier) | 35 à 55 €/h selon convention collective et région |
| MO TP (taux horaire chargé ouvrier) | 38 à 60 €/h |
| FC (frais de chantier) | 8 % à 18 % du déboursé sec |
| FG (frais généraux) | 8 % à 18 % du déboursé sec |
| BA (bénéfices et aléas) | 4 % à 10 % |

Pour des artisans ou TPE, FG peut grimper jusqu'à 25 %. Pour des majors, FG est plus bas (6-10 %) mais le BA peut être plus haut (jusqu'à 12 %).

## Sources du déboursé sec

Trois sources usuelles :
1. **Sous-détail propre** : composition à partir des temps unitaires (TU) et matériaux par ouvrage, sourcés sur :
   - Temps unitaires : SOCOTEC / APAVE retours marché, ou bordereaux Capeb / FFB
   - Matériaux : devis fournisseurs récents, base de données négoces
2. **Bordereau Batiprix** (Groupe Moniteur) : déboursés secs publiés, par lot et par ouvrage élémentaire. Mise à jour annuelle.
3. **Retours marché récents** : ouvrages comparables sur chantiers réalisés (carnet de prix de l'entreprise ou de l'économiste).

## À retenir pour le chiffrage

- Toujours **séparer** déboursé sec et marges. Ne pas additionner directement les "prix tout compris" venant de sources différentes — leurs marges peuvent être incohérentes.
- Pour les **petites quantités** ou les **ouvrages très spécifiques**, augmenter le BA (10-15 %) pour couvrir l'incertitude.
- Pour les **gros marchés** (> 10 M€ HT), la marge se compresse mais les frais d'études en phase OFFRE augmentent.

**Référence à citer :** UNTEC — méthodologie économique. Pour les marchés publics : CCAG-Travaux art. 10 sur la révision/actualisation. Pour les marchés privés : NF P 03-001 (CCAG privé).
