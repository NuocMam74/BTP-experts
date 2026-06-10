# Coût RE2020 et décarbonation — surcoût, carbone, ACV, arbitrage matériaux

**Source :** Loi ELAN n° 2018-1021 art. 181 ; **décret n° 2021-1004 du 29 juillet 2021** et arrêté du 4 août 2021 (RE2020) ; arrêtés « valeurs » modificatifs ; méthode **ACV dynamique** réglementaire (base **INIES**, données **FDES** NF EN 15804+A2 et **PEP** pour équipements) ; loi AGEC ; pratiques UNTEC. Tous seuils/coûts = **ordre de grandeur, à actualiser à la date de consultation** (les seuils évoluent par paliers réglementaires).

> Principe : la **RE2020** introduit, en plus des exigences énergétiques (Bbio, Cep, DH confort d'été), des **exigences carbone** sur tout le cycle de vie (**Ic construction** et **Ic énergie**) qui **se durcissent par paliers (2025 / 2028 / 2031)**. L'économiste doit chiffrer le **surcoût** de conformité et arbitrer économiquement les solutions de **décarbonation**.

---

## 1. Les indicateurs RE2020

| Indicateur | Mesure | Enjeu économique |
|---|---|---|
| **Bbio** | Besoin bioclimatique (conception passive) | Compacité, orientation, isolation, inertie — surcoût enveloppe |
| **Cep / Cep,nr** | Consommation d'énergie primaire (totale / non renouvelable) | Sort le **gaz** du neuf → PAC, RCU, solaire (surcoût équipements) |
| **DH** | Degrés-heures d'inconfort (confort d'été **sans clim**) | Protections solaires, inertie, ventilation — surcoût |
| **Ic énergie** | Impact carbone des **consommations** d'énergie sur 50 ans (ACV dynamique) | Pénalise les énergies carbonées |
| **Ic construction** | Impact carbone des **composants + chantier** (matériaux, équipements) sur 50 ans | **Cœur du surcoût matériaux bas carbone** |

---

## 2. Paliers réglementaires (durcissement progressif)

Les seuils **Ic construction** et **Ic énergie** se renforcent par étapes : **2022 (entrée en vigueur) → 2025 → 2028 → 2031**.

- Chaque palier **abaisse** le seuil maximal admissible d'Ic construction → oblige à recourir à davantage de **matériaux bas carbone** (bois, biosourcés, béton bas carbone, réemploi).
- Le passage **2025 → 2028 → 2031** est le principal **driver de surcoût** à anticiper sur les opérations dont la livraison est lointaine : un projet conçu pour 2025 peut ne plus être conforme en 2028.

> ⚠️ Les **valeurs chiffrées des seuils** (en kgéqCO₂/m²) sont fixées par arrêté **par typologie** (maison individuelle, logement collectif, bureau, enseignement) et **révisées** : **ne pas citer un seuil chiffré de mémoire** — renvoyer aux arrêtés en vigueur (rt-re-batiment.developpement-durable.gouv.fr) et au **moteur de calcul réglementaire** + base INIES à la date du dépôt de PC.

---

## 3. Chiffrage carbone et ACV réglementaire

### ACV dynamique

- La RE2020 impose une **ACV (analyse de cycle de vie) dynamique** du bâtiment sur **50 ans** (pondération temporelle des émissions : une émission différée pèse moins).
- Réalisée par le BE thermique/environnemental ; l'économiste en exploite les **résultats pour chiffrer** les arbitrages.

### FDES et PEP (données environnementales)

- **FDES** (Fiche de Déclaration Environnementale et Sanitaire) : donnée carbone par **produit de construction** (norme NF EN 15804+A2), publiée sur la base **INIES**.
- **PEP** (Profil Environnemental Produit) : équivalent pour les **équipements** (CVC, électricité).
- **Données par défaut (MDEGD)** : valeurs forfaitaires pénalisantes en l'absence de FDES → incitent les industriels à publier des FDES (et l'économiste à privilégier les produits documentés).
- **FDES collectives vs individuelles** : une FDES **individuelle** (fabricant) est souvent **plus favorable** que la collective → impact sur l'atteinte des seuils et donc sur le choix produit.

---

## 4. Surcoût RE2020 et matériaux bas carbone (ordre de grandeur, à actualiser)

| Levier | Effet carbone | Effet coût (ordre de grandeur) |
|---|---|---|
| **Béton bas carbone** (CEM II/III, laitier, métakaolin, ciments bas carbone) | −20 à −50 % carbone béton | **+0 à +15 %** sur le poste béton (selon disponibilité locale, classe) |
| **Structure bois** (CLT, ossature, poteau-poutre lamellé) | forte baisse Ic construction (stockage carbone biogénique) | **+5 à +15 %** sur le gros œuvre/structure vs béton (très variable) |
| **Isolants biosourcés** (ouate, fibre de bois, paille, chanvre) | baisse Ic construction | **+5 à +30 %** vs isolants conventionnels |
| **Réemploi de matériaux** (AGEC) | baisse Ic construction | variable (parfois favorable) — cf. `demolition_desamiantage_dechets_cout.md` |
| **Sortie du gaz** (PAC, RCU, solaire) | baisse Ic énergie | surcoût équipement vs chaudière gaz (interdite en neuf) |
| **Confort d'été passif** (BSO, inertie, ventilation) | conformité DH | **+1 à +4 %** enveloppe |

- **Surcoût global RE2020** vs RT2012/référence : **ordre de grandeur +3 à +10 %** sur le coût travaux selon palier (2025 < 2028 < 2031), typologie et région — **à actualiser**, car les filières bas carbone montent en maturité et les écarts de prix se resserrent.
- Recoupement avec les **plus-values certification** du skill `ratio_m2` (E+C-, bâtiment passif, biosourcé).

---

## 5. Arbitrage économique (€) béton bas carbone / bois / biosourcé

Méthode d'arbitrage pour l'économiste :

1. **Cible carbone** : identifier le seuil **Ic construction** du palier visé (2025/2028/2031) pour la typologie → écart à combler vs solution de référence.
2. **Inventaire des leviers** : pour chaque lot, lister les variantes bas carbone disponibles **localement** (un levier indisponible en région = surcoût ou délai).
3. **Coût du kg CO₂ évité** : pour chaque levier, calculer **Δcoût (€) / Δcarbone (kgCO₂)** → classer du moins cher au plus cher.
4. **Optimisation** : combiner les leviers les **moins coûteux au kg évité** jusqu'à atteindre le seuil → trajectoire d'optimum économique.
5. **Sensibilité palier** : refaire l'exercice pour le palier suivant si la livraison est tardive (anticiper 2028/2031).

> Exemple de raisonnement (ordre de grandeur, à actualiser) : passer en **béton bas carbone CEM III** coûte souvent **peu** au kg CO₂ évité (levier prioritaire) ; la **structure bois intégrale** évite beaucoup de carbone mais à un **coût/kg plus élevé** → à réserver quand les leviers bon marché ne suffisent pas. L'économiste **hiérarchise** : d'abord les leviers à faible €/kgCO₂, ensuite les leviers structurants plus chers.

---

## 6. Restitution type (coût RE2020 / décarbonation)

```
## Étude de surcoût RE2020 / décarbonation — [Projet]

### Cadre
- Typologie : [logement collectif / MI / bureau / enseignement]
- Palier RE2020 visé (date dépôt PC / livraison) : [2025 / 2028 / 2031]
- Solution de référence : [...]
- Seuil Ic construction cible : [à confirmer arrêté en vigueur]

### Surcoûts par levier
| Levier bas carbone | Gain carbone (kgCO₂/m²) | Surcoût (€/m² ou %) | €/kgCO₂ évité |
|---|---|---|---|
| Béton bas carbone | | | |
| Isolants biosourcés | | | |
| Structure bois (partielle/totale) | | | |
| Réemploi | | | |

### Trajectoire d'optimum économique
- Leviers retenus (ordre €/kgCO₂ croissant) jusqu'au seuil : [...]
- Surcoût total estimé vs référence : [+X % travaux] (ordre de grandeur, à actualiser)

### Alertes
- ⚠️ Seuils chiffrés à confirmer sur arrêtés RE2020 en vigueur (rt-re-batiment...)
- ⚠️ ACV à réaliser par BE environnemental (base INIES / FDES à jour)
- ⚠️ Si livraison ≥ 2028/2031 : vérifier conformité au palier futur
```

## Citations à utiliser

- Loi ELAN n° 2018-1021 (art. 181 — performance environnementale)
- Décret n° 2021-1004 du 29 juillet 2021 + arrêté du 4 août 2021 (RE2020) et arrêtés « valeurs » modificatifs
- Méthode ACV dynamique RE2020 ; NF EN 15804+A2 (FDES) ; base INIES ; PEP ecopassport
- Loi AGEC n° 2020-105 (réemploi, REP PMCB)

**Référence à citer :** RE2020 (décret 2021-1004, arrêté 4 août 2021), méthode ACV dynamique, FDES/INIES. Sources : Legifrance + rt-re-batiment.developpement-durable.gouv.fr + INIES. Seuils et surcoûts = ordres de grandeur à actualiser aux arrêtés en vigueur à la date de dépôt du PC.
