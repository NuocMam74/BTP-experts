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

3. **Frais généraux (FG)** — affectables à l'entreprise (siège, encadrement non chantier, marketing, financiers). Fourchette de référence **8 % à 15 %** (cf. tableau de référence unique ci-dessous), selon la taille de l'entreprise et le métier.

4. **Bénéfices et aléas (BA)** — marge commerciale et provision pour aléas. Fourchette de référence **4 % à 10 %** (cf. tableau de référence unique ci-dessous).

## Formule de composition

```
Prix unitaire HT = D × (1 + FC%) × (1 + FG%) × (1 + BA%)
```

ou bien, plus rigoureusement :

```
Prix unitaire HT = D + D × FC% + (D + FC) × FG% + (D + FC + FG) × BA%
```

(les deux conventions existent — bien vérifier laquelle est utilisée dans le bordereau de référence).

## Fourchette de référence unique des marges (FC / FG / BA)

> **RÉFÉRENCE UNIQUE DE L'AGENT.** Ce tableau est la **seule** fourchette de marges faisant foi pour l'agent économiste. Les fichiers `corpus/dpgf_cctp_structure.md` et `skills/chiffrer_dpgf.md` (et tout autre fichier qui mentionne FC/FG/BA) s'alignent dessus. En cas de divergence, **c'est ce tableau qui prime.**

| Masse | Assiette de calcul | Fourchette de référence | Cas particuliers |
|---|---|---|---|
| **FC** — Frais de chantier | % du déboursé sec (D) | **8 % à 12 %** | Petit chantier / site occupé / accès difficile → jusqu'à 15 %. Très gros chantier organisé → 6 à 8 %. |
| **FG** — Frais généraux | % de (D + FC) | **8 % à 15 %** | Artisan / TPE → jusqu'à 20-25 %. Major / gros marché structuré → 6 à 10 %. |
| **BA** — Bénéfices et aléas | % de (D + FC + FG) | **4 % à 10 %** | Petites quantités / ouvrage spécifique / forte incertitude → 10 à 15 %. Major sur gros marché → BA pouvant monter à 12 %. |

**Lecture cumulée :** un ouvrage standard chiffré au milieu de fourchette (FC 10 %, FG 11 %, BA 7 %) porte un **coefficient de passage déboursé sec → PU HT de l'ordre de 1,30 à 1,32** (ordre de grandeur, à actualiser à la date de consultation). Une TPE peut atteindre 1,45-1,55 ; un major bien organisé peut descendre à 1,22-1,26.

## Ordres de grandeur de main d'œuvre (France, ordre de grandeur à actualiser à la date de consultation)

| Poste | Plage typique |
|---|---|
| MO bâtiment (taux horaire chargé ouvrier) | 35 à 55 €/h selon convention collective et région |
| MO TP (taux horaire chargé ouvrier) | 38 à 60 €/h |

> Ces taux horaires sont des **ordres de grandeur datés** : ils évoluent avec les conventions collectives et la conjoncture. **À actualiser à la date de consultation** (cf. indices TRBT et IPHE, corpus `indices_bt_tp_revision_prix.md`).

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
