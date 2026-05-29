# Eurocode 7 — Calcul géotechnique des fondations

**Source :** NF EN 1997-1 et son Annexe Nationale française ; NF P 94-500 (missions géotechniques G1 à G5) ; DTU 13.1 (fondations superficielles) ; DTU 13.2 (fondations profondes) ; norme NF P 94-261 (fondations superficielles) ; NF P 94-262 (fondations profondes).

## Cadre légal et obligations

### Loi ELAN 2018 + CCH L.112-22

Depuis le **1ᵉʳ oct. 2020**, étude géotechnique **G1 PGC** + **G2 AVP** obligatoires pour :
- **Maison individuelle** en zone de retrait-gonflement des argiles (RGA) **moyenne** ou **forte** (carte BRGM)
- Le vendeur fournit G1 ; le constructeur (CCMI) fournit G2

### Pour les autres ouvrages

- **NF P 94-500** définit les **missions G1 à G5** selon phase et complexité

| Mission | Phase | Description |
|---|---|---|
| **G1 PGC** | Études amont | Étude géotechnique préalable (terrain, contexte) |
| **G1 PRG** | Programme | Identification des risques majeurs |
| **G2 AVP** | APS-APD | Étude géotechnique de conception (avec sondages détaillés) |
| **G2 PRO** | PRO-DCE | Étude de projet géotechnique avec préconisations détaillées |
| **G3** | EXE | Étude et suivi géotechnique d'exécution (par entreprise) |
| **G4** | EXE | Supervision géotechnique d'exécution (par MOE/BE indépendant) |
| **G5** | Diagnostic | Diagnostic géotechnique d'un ouvrage existant |

## États limites et approches de calcul (EN 1997-1)

### États limites

| ELU | ELS |
|---|---|
| **GEO** : rupture par défaillance du terrain | Déformations excessives |
| **STR** : rupture par défaillance d'élément structurel | Tassements différentiels |
| **EQU** : perte d'équilibre statique global | Vibrations |
| **UPL** : rupture par soulèvement | |
| **HYD** : rupture par érosion interne / piping | |

### Approches de calcul (AN française : Approche 2)

L'**Approche 2** est utilisée en France pour les fondations courantes :

```
A1 (actions) + M1 (paramètres sol) + R2 (résistance)
```

- **A1** : facteurs d'actions normaux (1,35 G + 1,5 Q)
- **M1** : paramètres sol nominaux (γ_M = 1,0)
- **R2** : facteurs résistance (γ_R = 1,4 pour portance)

## Fondations superficielles (NF P 94-261)

### Types

- **Semelle filante** : sous mur continu (largeur 30-100 cm)
- **Semelle isolée** : sous poteau (carrée ou rectangulaire)
- **Radier général** : dalle pleine sous tout le bâtiment
- **Radier nervuré** : dalle + poutres
- **Pieux courts** : si sol médiocre superficiel mais bon en profondeur

### Profondeur minimale (DTU 13.1)

#### Hors gel

| Région | Profondeur minimale |
|---|---|
| France méridionale (zone non gélive) | 50 cm |
| France standard | 80 cm |
| Montagne / nord | 100-120 cm |
| Zone gélive très exposée | 150 cm |

#### Hors phénomène RGA

- **Profondeur** : 80-120 cm pour éviter alternances humidité

### Portance admissible — pré-dimensionnement

```
q_admis = q_u / FS
```

avec **q_u** la contrainte ultime (calculée selon Terzaghi ou Meyerhof) et **FS** ≈ 3 (sécurité).

#### Ordres de grandeur

| Type de sol | q_admis (kPa = 0,1 bar) |
|---|---|
| Sable fin lâche | 100-150 |
| Sable moyen dense | 200-300 |
| Sable grossier dense | 300-500 |
| Gravier sableux dense | 400-600 |
| Marne | 200-400 |
| Argile molle | 50-100 |
| Argile raide | 200-400 |
| Argile très raide / marneuse | 400-800 |
| Roche altérée | 500-1 000 |
| Roche dure | > 2 000 |

### Calcul d'une semelle filante

#### Données

- Charge permanente G = 80 kN/ml
- Charge variable Q = 30 kN/ml
- Sol : sable moyen dense (q_admis = 250 kPa)

#### Calcul

- **N_ELS** = G + Q = 110 kN/ml
- **N_ELU** = 1,35 × 80 + 1,5 × 30 = 153 kN/ml

#### Vérification portance

```
Largeur min = N_ELS / q_admis = 110 / 250 = 0,44 m
```

→ Semelle de 60 cm de large (avec marge), profondeur 80 cm, BA armé.

### Pour les bâtiments hauts (R+5 et plus)

- **Pré-dim** : largeur semelle ≈ N / q_admis
- **Vérifier** poinçonnement (cisaillement BA)
- **Tassement** différentiel maximum : L/500

## Fondations profondes (NF P 94-262)

### Types de pieux

| Type | Description | Cas d'usage |
|---|---|---|
| **Pieux battus** | Battage de pieu préfabriqué BA | Sols cohérents, ouvrages industriels |
| **Pieux forés tubés** | Forage + bétonnage avec chemise | Sols variables, urbain |
| **Pieux forés boue** | Forage + bentonite + bétonnage | Sols incohérents |
| **Pieux à la tarière** | Forage continu + injection BA | Sols cohérents, faibles charges |
| **Micropieux** | Pieux Ø < 250 mm | Reprises en sous-œuvre, charges modérées |
| **Pieux refoulants (CFA)** | Tarière creuse continue | Standard moderne |

### Capacité portante d'un pieu

```
Q_u = Q_p (pointe) + Q_s (frottement latéral)
```

#### Q_p (pointe)

```
Q_p = q_p × A_pointe
```

avec **q_p** : pression unitaire de pointe (dépend du sol)

#### Q_s (frottement)

```
Q_s = Σ q_s,i × L_i × p
```

avec **q_s,i** : frottement unitaire latéral par couche, **L_i** : longueur traversée, **p** : périmètre du pieu

#### Coefficients de sécurité

```
Q_admis,ELU = Q_u / γ_R (≈ 1,4)
Q_admis,ELS = Q_u / 2,3
```

### Ordres de grandeur

| Type | Capacité ELS (typique) |
|---|---|
| Micropieu Ø 200 mm × 10 m | 200-400 kN |
| Pieu foré CFA Ø 600 mm × 15 m | 1 000-2 500 kN |
| Pieu battu BA Ø 350 × 350 mm × 12 m | 800-1 500 kN |
| Pieu foré boue Ø 1 000 mm × 25 m | 3 000-8 000 kN |

### Vérifications

- **Capacité portante** (Q_admis ≥ N_appliqué)
- **Tassements** (≤ L/500)
- **Cisaillement latéral** sous charges horizontales (séisme, vent)
- **Soulèvement** (vent ascensionnel, séisme)

## Tassements

### Critères ELS

| Critère | Limite |
|---|---|
| Tassement absolu | < 25 mm (bâtiment courant) |
| Tassement différentiel | < L/500 |
| Inclinaison ouvrage | < 1/1 000 |

### Calcul

Méthodes :
- **Œdométrique** (NF P 94-090) pour argiles
- **Pressiométrique** (NF P 94-110) pour sols mixtes
- **Méthode des modules** (sables)

### Tassements typiques

| Type de sol | Tassement attendu pour 100 kPa appliqué |
|---|---|
| Sable lâche | 10-30 mm |
| Sable dense | 5-10 mm |
| Argile molle | 30-100 mm (long terme) |
| Argile dure | 5-15 mm |
| Marne | 5-15 mm |
| Roche | 1-5 mm |

## Tassement de consolidation (argiles)

Pour les argiles saturées sous nouvelle charge :
- **Tassement instantané** (élastique)
- **Tassement de consolidation** (long terme, dissipation eau interstitielle) — **mois à années**
- **Tassement secondaire** (fluage)

→ Critère majeur pour le timing de construction (préchargement éventuel).

## Eaux souterraines et fondations

### Présence de la nappe

- Influence sur la **portance** (effet de poussée d'Archimède)
- **Soulèvement** possible (radier en sous-sol)
- **Risque** d'inondation de la fouille
- **Drainage périphérique** souvent nécessaire

### Vérification de stabilité au soulèvement (UPL)

```
G + S - U_eau ≥ 0
```

avec U_eau la force ascensionnelle = γ_eau × Volume immergé.

## Phénomène de retrait-gonflement des argiles (RGA)

### Cause

Argiles sensibles aux variations d'humidité (cycle sécheresse / pluie).

### Conséquence

- **Mouvement** vertical du sol (parfois > 10 cm)
- **Fissures** structurelles sur bâtiments en surface
- **Indemnisation Cat-Nat** importante (50+ communes/an)

### Prévention

- **Étude G1+G2** obligatoire (loi ELAN 2020) en zone moyenne/forte
- **Fondations renforcées** : semelles plus profondes (1,20 m mini), longrines
- **Plantations** éloignées (5-10 m des fondations)
- **Drainage périphérique**
- **Étanchéité** au sol

## Géotechnique sismique (EC8)

### Sols à risque sismique

- **Classes de sol** A (rocher) à E (très meuble)
- **Liquéfaction** : sables saturés → comportement liquide pendant séisme

### Vérifications

- **Capacité portante** sismique (réduite vs. statique)
- **Tassements** sismiques (cumulés)
- **Liquéfaction** : étude spécifique si suspect

## Synthèse — bonnes pratiques BE structure

1. **Étude G1+G2** obligatoire pour MI en zone RGA (loi ELAN)
2. **Préconisations** sol intégrées au DCE (CCTP + plans)
3. **Pré-dim** : ratios + ordres de grandeur, puis calcul détaillé
4. **Tassements** ELS vérifiés (≤ L/500 différentiel)
5. **Cohérence** entre étude géotechnique et calculs structure
6. **G3** (entreprise) et **G4** (BE indépendant) pour suivi exécution
7. **Pour MI en zone RGA** : fondations renforcées (longrines, profondeur 1,20 m mini)
8. **Communication** avec BE géotechnique (rebouclage si nécessaire)

## Citations à utiliser

- NF EN 1997-1 + AN française
- NF P 94-500 (missions G1 à G5)
- NF P 94-261 (fondations superficielles)
- NF P 94-262 (fondations profondes)
- DTU 13.1 (fondations superficielles)
- DTU 13.2 (fondations profondes)
- CCH L.112-22 (étude G obligatoire MI zone RGA)
- Loi ELAN 2018
- NF EN 1998 (sismique)

**Référence à citer :** Eurocode 7 + DTU 13 + NF P 94-500. Sources : afnor.org, eurocodes.fr (CSTB), BRGM.
