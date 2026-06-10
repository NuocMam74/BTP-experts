# Estimation par phase MOE — loi MOP, enveloppe, coût objectif

**Source :** Loi MOP n° 85-704 du 12 juillet 1985 (recodifiée au **Code de la commande publique, partie législative L.2421-1 et s. et décret 93-1268** repris aux R.2431-1 et s.) ; arrêté du 21 décembre 1993 (éléments de mission MOE) ; pratiques UNTEC. Tout ratio/seuil = **ordre de grandeur, à actualiser à la date de consultation**.

> Principe : la mission de l'économiste-MOE consiste à **maîtriser le coût** du projet phase après phase, depuis l'**enveloppe financière prévisionnelle** (fixée par le MOA) jusqu'au **coût prévisionnel des travaux** sur lequel la MOE **s'engage** (loi MOP), avec une **précision croissante**.

---

## 1. Vocabulaire de la maîtrise des coûts (loi MOP)

| Notion | Définition | Qui le fixe |
|---|---|---|
| **Enveloppe financière prévisionnelle** | Montant **toutes dépenses confondues** que le MOA décide de consacrer à l'opération (travaux + honoraires + foncier + frais + aléas). | **MOA** (programme) |
| **Coût prévisionnel des travaux** | Estimation des seuls **travaux** établie par la MOE, sur laquelle elle **s'engage** à partir de l'**APD**. | **MOE** |
| **Coût de réalisation** | Coût réel des travaux constaté en fin de chantier (marchés notifiés + avenants). | constaté |
| **Seuil de tolérance** | Pourcentage d'écart contractuel admis entre le coût prévisionnel (engagement MOE) et le coût des marchés / de réalisation, déclenchant la responsabilité MOE. | **contrat MOE** |

---

## 2. Engagement et responsabilité de l'économiste-MOE

La loi MOP introduit un **engagement de la MOE sur le coût** :

- **À l'APD** : la MOE **arrête** le coût prévisionnel des travaux et **s'y engage**, dans la limite d'un **seuil de tolérance** fixé au contrat (souvent **+ 3 à + 5 %** sur la phase études, ordre de grandeur).
- **Après consultation des entreprises (ACT)** : si le **résultat des appels d'offres** dépasse le coût prévisionnel engagé **au-delà du seuil de tolérance**, la MOE doit **reprendre ses études sans rémunération supplémentaire** pour ramener le coût dans l'enveloppe.
- **En réalisation** : un second seuil peut encadrer l'écart entre coût prévisionnel et **coût de réalisation** (dérive d'exécution imputable à la conception).

> L'économiste est en première ligne sur cet engagement : c'est lui qui chiffre, alerte sur les dérives, et propose les **mesures d'économie** (variantes, simplifications) pour tenir l'enveloppe. Sa responsabilité est **contractuelle** (et engage le groupement MOE).

---

## 3. Conception à coût objectif (CCO)

- Le MOA peut imposer une démarche de **conception à coût objectif** : le coût travaux est une **donnée d'entrée non négociable**, et la conception s'adapte pour le respecter (à programme et qualité donnés).
- Méthode : **enveloppe travaux figée → arbitrages techniques** (mode constructif, niveau de prestation, surfaces, ratios) pour atterrir sous le plafond.
- L'économiste pilote la **boucle d'optimisation** : chiffrage → écart au coût objectif → leviers (réduction surface utile, choix de systèmes plus économiques, phasage, allotissement) → re-chiffrage.
- À distinguer du chiffrage « au fil de l'eau » : ici le **coût est la contrainte**, pas le résultat.

---

## 4. Cycle de l'estimation par phase — précision et livrables

| Phase | Précision indicative | Base de l'estimation | Livrable économiste attendu |
|---|---|---|---|
| **Programme / Faisabilité** | ± 25 à 30 % | Ratios €/m² SDP par destination | Enveloppe financière prévisionnelle (note de cadrage) |
| **ESQ** (esquisse) | **± 25 %** | Ratios + premiers partis architecturaux | Estimation sommaire par grandes masses |
| **APS** (avant-projet sommaire) | ± 15 à 20 % | Ratios affinés + premières quantités | Estimation par lot (compte sommaire décomposé) |
| **APD** (avant-projet définitif) | ± 10 à 15 % | Métré sommaire + prix de référence | **Coût prévisionnel des travaux engagé** + estimation par lot détaillée |
| **PRO** (projet) | **± 5 %** | Métré détaillé + sous-détails | Estimation détaillée / DQE par poste |
| **DCE / ACT** | engageant (offres) | DPGF chiffrée, offres reçues | DQE, analyse des offres, rapport ACT |

> Mémo de cohérence avec les autres skills : `ratio_m2` couvre Faisabilité→APD ; `chiffrer_dpgf` couvre PRO→DCE ; `comparer_offres` couvre ACT. Ce corpus relie le tout au **cadre loi MOP**.

### Livrable par phase (détail)

- **ESQ** : estimation par **grandes masses** (gros œuvre / clos-couvert / second œuvre / lots techniques / VRD), enveloppe ± 25 %, sensibilités sur le parti.
- **APS** : **compte sommaire décomposé** par lot, vérification de cohérence avec l'enveloppe MOA, premières alertes de dérive.
- **APD** : **coût prévisionnel des travaux** par lot, **engagement MOE** + seuil de tolérance, identification des postes à risque, provisions justifiées.
- **PRO** : **DQE détaillé** poste par poste (métré + PU), prêt à servir de base au DCE et à l'analyse des offres.
- **DCE/ACT** : DPGF/DQE de consultation, estimation confidentielle MOA, **analyse des offres** vs coût prévisionnel, contrôle du respect du seuil de tolérance.

---

## 5. Gestion de l'enveloppe et alerte de dérive

L'économiste tient un **tableau de bord de l'enveloppe** actualisé à chaque phase :

```
Enveloppe MOA (TDC) : ............... €
  ├─ Travaux (coût prévisionnel MOE) : ....... €  ← engagement, seuil ± X %
  ├─ Honoraires MOE (~10-14 % travaux) : ..... €
  ├─ AMO / OPC / SPS / contrôle technique : .. €
  ├─ Études (géotech, acoustique, etc.) : .... €
  ├─ Assurances (DO, TRC) : .................. €
  ├─ Foncier / VRD primaire / raccordements : €
  └─ Provision pour aléas et révisions : ..... €
```

- À chaque phase : **comparer** le coût prévisionnel travaux réactualisé à la cible. Écart > seuil → **alerte MOA** + propositions d'économie.
- Distinguer dérive de **programme** (le MOA ajoute/modifie → avenant à la mission, pas de faute MOE) et dérive de **conception/estimation** (imputable MOE → reprise sans surcoût d'honoraires).
- Intégrer la **révision/actualisation** prévisionnelle pour les opérations longues (cf. `indices_bt_tp_revision_prix.md`).

---

## 6. Restitution type (estimation par phase)

```
## Estimation [phase ESQ/APS/APD/PRO] — [Projet]

### Cadre
- MOA / programme : [...]
- Enveloppe financière prévisionnelle MOA : [...] €
- Phase : [...] — précision attendue ± [X] %
- Engagement MOE sur le coût : [oui à partir APD / non] — seuil tolérance [± X %]

### Estimation des travaux
| Lot / grande masse | Quantité ou ratio | Coût HT | % |
|---|---|---|---|
| ... | | | |
| **TOTAL TRAVAUX HT** | | | 100 % |

### Positionnement vs enveloppe
- Coût prévisionnel travaux : [...] €
- Cible (enveloppe travaux MOA) : [...] €
- Écart : [+/- X %] → [dans le seuil / DÉPASSEMENT → mesures d'économie]

### Mesures d'optimisation proposées (si dépassement)
- [variante constructive / réduction surface / niveau de prestation / phasage]

### Niveau de confiance & suites
- Précision [± X %], à affiner en phase [suivante]
```

## Citations à utiliser

- Loi MOP n° 85-704 du 12 juillet 1985 (codifiée CCP L.2421-1 et s.)
- Décret n° 93-1268 du 29 nov. 1993 et arrêté du 21 déc. 1993 (missions et éléments de mission MOE — ESQ, APS, APD, PRO, ACT, VISA, DET, AOR)
- CCP R.2431-1 et s. (missions de maîtrise d'œuvre, ouvrages de bâtiment)
- UNTEC — méthode d'estimation par phase et de maîtrise des coûts

**Référence à citer :** Loi MOP / CCP (missions MOE, coût prévisionnel, seuil de tolérance), arrêté 21 déc. 1993. Source : Legifrance + UNTEC. Tout ratio = ordre de grandeur à actualiser.
