# Béton précontraint — principes (NF EN 1992-1-1 §5.10)

**Source :** NF EN 1992-1-1 (EC2) — notamment §3.3 (aciers de précontrainte), §5.10 (éléments et structures précontraints), §7 (ELS, limitation des contraintes), §8.10 (ancrages et dispositions des armatures de précontrainte) ; NF EN 1992-2 (ponts) pour les ouvrages d'art ; NF EN 10138 / NF EN ISO 17760 (armatures de précontrainte) ; ETAG / ETE des procédés de post-tension ; héritage du **BPEL 91** (résiduel). Produits préfabriqués précontraints : NF EN 1168 (alvéolaires), Avis Techniques.

## 1. Principe de la précontrainte

La **précontrainte** introduit volontairement dans le béton un état de **compression** (par des câbles/torons tendus) qui **s'oppose aux tractions** dues aux charges. Le béton, médiocre en traction, travaille ainsi essentiellement en compression → portées plus grandes, hauteurs réduites, fissuration maîtrisée, durabilité accrue.

```
Effet précontrainte = compression « pré-installée » qui compense la traction de flexion
```

## 2. Pré-tension vs post-tension

| Caractéristique | **Pré-tension** | **Post-tension** |
|---|---|---|
| Mise en tension | **Avant** coulage (torons tendus sur banc) | **Après** durcissement (câbles dans gaines) |
| Adhérence | Directe acier-béton (par adhérence) | Par ancrages d'extrémité (+ injection coulis) |
| Lieu | Usine (préfabrication) | Chantier ou usine |
| Produits | Poutres, dalles alvéolaires, prédalles précontraintes | Planchers post-tendus, poutres de grande portée, ponts, réservoirs |
| Gaines / ancrages | Sans gaine | Gaines + plaques d'ancrage (vérins) + coulis d'injection (ou non-adhérent : monotoron gainé graissé) |

- **Post-tension adhérente** : injection au coulis de ciment (protection + adhérence).
- **Post-tension non-adhérente** : monotorons gainés-graissés (T15 gainés), repris uniquement par les ancrages — fréquent en planchers de bâtiment.

## 3. Aciers de précontrainte (EC2 §3.3)

- **Torons** T13 (Ø 12,5 mm), **T15 / T15S** (Ø 15,2/15,7 mm) — les plus courants.
- Classes de résistance élevées : **f_pk ≈ 1770 à 1860 MPa**, f_p0,1k (limite à 0,1 %) ≈ 1640 MPa.
- Module E_p ≈ **195 000 MPa** (torons).
- Coefficient partiel γ_S = 1,15.
- **Contrainte de tension à l'origine** (à la mise en tension, §5.10.2.1) limitée :
  ```
  σ_p,max = min(0,80 × f_pk ; 0,90 × f_p0,1k)
  ```
- Contrainte après pertes instantanées (§5.10.3) limitée à min(0,75 f_pk ; 0,85 f_p0,1k).

## 4. Pertes de précontrainte (§5.10.4 — 5.10.6)

La tension réelle dans le câble est **inférieure** à la tension de mise en tension à cause des pertes :

### Pertes instantanées (au moment de la mise en tension)

| Perte | Cause | Concerne |
|---|---|---|
| **Frottement** | Câble courbe/ondulé dans la gaine (coefficients μ, k) | Post-tension |
| **Recul d'ancrage** | Rentrée du toron au blocage des clavettes (g ≈ 6 mm) | Post-tension |
| **Raccourcissement élastique du béton** | Mise en compression du béton lors du transfert | Pré- et post-tension |

### Pertes différées (dans le temps)

| Perte | Cause |
|---|---|
| **Retrait du béton** | Raccourcissement de séchage (ε_cs) |
| **Fluage du béton** | Déformation sous compression permanente (φ) |
| **Relaxation de l'acier** | Détente de l'acier sous tension constante (classe 1/2/3) |

- **Ordre de grandeur** des pertes totales : **15 à 25 %** de la tension initiale (post-tension), un peu moins en pré-tension.
- L'EC2 §5.10.6 fournit la formule de cumul des pertes différées (interaction retrait/fluage/relaxation).

## 5. Classes d'exposition et limitation des contraintes (ELS)

### Limitation des contraintes de compression (§7.2)

- σ_c ≤ **0,6 × f_ck** (combinaison caractéristique) pour limiter la microfissuration et le fluage non linéaire.
- σ_c ≤ **0,45 × f_ck** (combinaison quasi-permanente) si l'on veut un **fluage linéaire**.

### Limitation des contraintes dans l'acier (§7.2)

- σ_p ≤ 0,75 × f_pk sous combinaison caractéristique (après pertes).

### Maîtrise de la fissuration (§7.3) — classes de vérification

Le béton précontraint est vérifié vis-à-vis de la **décompression** et de l'ouverture de fissures selon la classe d'exposition (plus sévère qu'en BA car les câbles peuvent être sensibles à la corrosion sous tension) :
- **Pré-tension / post-tension adhérente** en XD/XS/XF : exigence de **décompression** sous combinaison fréquente (pas de traction au niveau du câble), w_max réduit.
- **Post-tension non-adhérente** : critères de w_max comme le BA (l'acier est protégé par la gaine + graisse).

## 6. Applications courantes

| Produit | Type | Portées | Remarque |
|---|---|---|---|
| **Dalle alvéolaire** | Pré-tension | 7 à 16 m | Sans étai, voir corpus planchers (NF EN 1168) |
| **Poutre précontrainte** | Pré-tension (préfa) ou post-tension | 12 à 30 m+ | Halls, parkings, ponts courts |
| **Plancher post-tendu** | Post-tension (monotorons gainés) | 8 à 12 m | Grandes trames tertiaires, faible épaisseur, peu de retombées |
| **Réservoir / silo** | Post-tension circonférentielle | — | Étanchéité (pas de fissuration) |
| **Pont / VIPP / caisson** | Post-tension | grandes portées | NF EN 1992-2 (hors bâtiment) |

## 7. Vérifications principales (synthèse)

1. **À la mise en tension (phase de transfert)** : contraintes admissibles dans le béton jeune (compression et traction limitées) au lâcher des câbles → souvent dimensionnant pour la préfabrication.
2. **En service (ELS)** : décompression / ouverture de fissures selon classe ; flèches (la précontrainte génère une **contre-flèche**).
3. **À l'ELU** : moment résistant de la section précontrainte + armatures passives (rupture en flexion) ; effort tranchant ; zones d'ancrage (bielles-tirants, frettage local intense sous les ancrages).
4. **Pertes** : bilan instantané + différé pour connaître la précontrainte « probable » utilisée dans les vérifications.
5. **Zones d'about / d'ancrage** : ferraillage de **frettage / éclatement** (équilibre général et local), point sensible (EC2 §8.10.3).

## 8. Garde-fous

- Le calcul de précontrainte est une **spécialité** : il requiert un BE qualifié et le respect strict des **procédés brevetés** (ETE/ATE des systèmes de post-tension), de l'**injection** des gaines et du **suivi des tensions** (PV de mise en tension, allongements mesurés).
- La **corrosion sous tension** des câbles est un risque majeur (sinistres) : protection (injection, gaines, classes d'exposition sévères) impérative.
- Les **phases provisoires** (transfert, manutention des éléments préfabriqués précontraints) sont souvent **dimensionnantes**.
- Les valeurs (portées, pertes %) données ici sont **indicatives (à confirmer par note de calcul de précontrainte)**.
- Pour les **ouvrages d'art**, basculer sur **NF EN 1992-2** — hors du périmètre bâtiment courant.

## Citations à utiliser

- NF EN 1992-1-1 (EC2) §3.3, §5.10, §7.2/7.3, §8.10 + AN française
- NF EN 1992-2 (ponts) pour les ouvrages d'art
- NF EN 10138 (armatures de précontrainte), NF EN 1168 (alvéolaires)
- ETE / ETAG des procédés de post-tension
- BPEL 91 (référentiel historique, résiduel)

**Référence à citer :** EC2 §5.10 (précontrainte) + AN + ETE des procédés. Sources : afnor.org, eurocodes.fr (CSTB).
