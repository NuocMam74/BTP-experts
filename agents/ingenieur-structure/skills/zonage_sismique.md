# Skill — Déterminer zone et catégorie sismique

L'utilisateur veut savoir si son projet est soumis à l'**Eurocode 8 (NF EN 1998-1)**, et quels **paramètres sismiques** s'appliquent (accélération, spectre, coefficient de comportement, classe de ductilité).

## 1. Documents attendus / questions à poser

L'utilisateur fournit typiquement :
- **Adresse** ou **commune** + code INSEE
- **Destination** du bâtiment et **catégorie ERP** si applicable
- **Effectif** maximal accueilli
- **Géométrie** (nb niveaux, hauteur totale, SDP, régularité en plan et en élévation)
- **Rapport géotechnique** (G1 / G2) si disponible — pour la **classe de sol** EC8
- **Plans** (pour l'analyse de régularité, raideur, contreventement envisagé)

Si pas d'info : pose ces questions :
1. Commune + code INSEE (déterminant pour la zone) ?
2. Destination + catégorie ERP / effectif ?
3. Bâtiment **neuf**, **modifié**, **étendu**, **surélevé** ?
4. Hauteur totale, nombre de niveaux, SDP totale ?
5. Sol identifié (rocher, argile, sable, alluvions) ? Vs,30 si disponible ?
6. Type de structure pressentie (voiles BA, portiques, charpente bois MOB, mixte) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("arrêté 22 octobre 2010 zonage sismique communes")` — annexe avec liste communes
- `rag_search("code environnement R.563-1 à R.563-8 catégories d'importance")`
- `rag_search("NF EN 1998-1 chapitre 3 actions sismiques spectres")` — paramètres calcul
- `rag_search("annexe nationale française EC8")` — adaptations France
- `rag_search("PS-MI 89 conditions d'application maisons individuelles")` — alternative simplifiée
- `rag_search("CP-MI Antilles règles paracyclonique paraseismique")` — Antilles spécifiques
- Site officiel : **georisques.gouv.fr** pour validation directe

## 3. Détermination de la **zone de sismicité** (art. R.563-4)

Selon l'arrêté du 22 octobre 2010 :

| Zone | Qualification | a_gr (m/s²) | Régions concernées (indicatif) |
|---|---|---|---|
| **1** | Très faible | 0,4 | Bassin parisien, Nord, Picardie, Aquitaine littoral |
| **2** | Faible | 0,7 | Vallée du Rhône, Charente, Massif central, Bretagne nord |
| **3** | Modérée | 1,1 | Alsace, Vosges, Jura, Bourgogne, Languedoc, Pays Basque |
| **4** | Moyenne | 1,6 | Alpes, Pyrénées centrales, sud Provence |
| **5** | Forte | 3,0 | Antilles (Martinique, Guadeloupe), Réunion forte |

**Important** : la zone se vérifie commune par commune sur la **carte officielle** (georisques.gouv.fr) ou via le **moteur de recherche** par code INSEE. Ne jamais déduire la zone d'une commune à partir du département seul (variation possible).

## 4. Détermination de la **catégorie d'importance** (art. R.563-3)

| Catégorie | γ_I | Définition | Exemples |
|---|---|---|---|
| **I** | 0,8 | Risque limité pour les personnes | Bâtiments agricoles, hangars de stockage sans personnel permanent, abris |
| **II** | 1,0 | Risque "normal" | Habitation (individuelle, collective ≤ 28 m), bureaux (effectif < 300), commerces, ERP catégorie 4 et 5 (hors scolaires et J) |
| **III** | 1,2 | Risque élevé pour les personnes | ERP catégorie 1, 2, 3 ; bâtiments scolaires ; bureaux > 300 personnes ; centres commerciaux ; immeubles habitation > 28 m hauteur |
| **IV** | 1,4 | Essentiel à la gestion de crise et sécurité civile | Hôpitaux, cliniques, centres de secours, casernes, centres énergétiques, télécoms stratégiques, contrôle aérien |

## 5. **Obligation EC8** : croisement zone × catégorie

| Zone \ Catégorie | I | II | III | IV |
|---|---|---|---|---|
| **1** (très faible) | ❌ | ❌ | ❌ | ✅ |
| **2** (faible) | ❌ | ❌ | ✅ | ✅ |
| **3** (modérée) | ❌ | ✅ | ✅ | ✅ |
| **4** (moyenne) | ❌ | ✅ | ✅ | ✅ |
| **5** (forte) | ❌ | ✅ | ✅ | ✅ |

❌ = pas d'obligation EC8
✅ = EC8 obligatoire (avec **alternative PS-MI 89** sous conditions strictes en zone 2 à 4)

### PS-MI 89 : conditions d'application (alternative simplifiée à EC8)

**Toutes** ces conditions doivent être réunies :
- **Maison individuelle** uniquement (pas collectif, pas mitoyen sauf joint sismique)
- Catégorie d'importance **II** seulement
- **Zone sismique 3 ou 4** uniquement (pas zone 5)
- Hauteur **≤ 11 m** au faîtage
- **≤ 2 niveaux** + combles aménagés
- SDP totale **≤ 250 m²**
- Géométrie **régulière** en plan et en élévation
- Forme rectangulaire (élancement L/l ≤ 4)
- Pas de **transparence en RDC** (pilotis, parkings ouverts)
- Classe de sol **A, B, C, D ou E** (pas S1, S2)
- Pas de toiture lourde (terrasse béton possible si conforme)

**Pour les Antilles (zone 5)** : règles **CP-MI Antilles** (paracyclonique + parasismique combinées) pour MI.

## 6. Classe de sol EC8 § 3.1.2 (basée sur Vs,30 ou caractéristiques géotechniques)

| Classe | Description | Vs,30 (m/s) | NSPT | cu (kPa) |
|---|---|---|---|---|
| **A** | Rocher, formation rocheuse | > 800 | — | — |
| **B** | Dépôts sables denses, graviers, argiles raides ≥ 10 m | 360-800 | > 50 | > 250 |
| **C** | Sables denses, sables mi-denses, argiles raides 10-100 m | 180-360 | 15-50 | 70-250 |
| **D** | Sables lâches, dépôts cohésifs lâches | < 180 | < 15 | < 70 |
| **E** | Profil C ou D sur substratum rocheux, épaisseur < 20 m | — | — | — |
| **S1** | Argiles très molles épaisseur > 10 m | < 100 | — | 10-20 |
| **S2** | Sols susceptibles de liquéfaction, argiles sensibles | — | — | — |

⚠️ Sols **S1 et S2** : **études spécifiques** requises (spectre adapté, liquéfaction, etc.) — EC8 § 3.1.2 (4).

## 7. Spectre de réponse de calcul (EC8 § 3.2.2.5)

Paramètres :
- **a_g** = a_gr × γ_I (accélération de pointe au sol au rocher × coefficient importance)
- **S** : paramètre de sol (1,0 pour A ; jusqu'à 1,8 pour D — type 2 spectre français AN)
- **TB, TC, TD** : périodes caractéristiques du spectre
- **q** : coefficient de comportement (réduction par ductilité)

**Spectre type 1 ou type 2** : la France métropolitaine utilise principalement le **type 2** (séisme proche, magnitude modérée) en zones 1 à 4 ; type 1 possible en zone 5 (Antilles).

## 8. Classe de ductilité et coefficient de comportement q

| Classe | Description | q (BA portique) | q (BA voiles) | q (acier MRF) | q (bois MOB) |
|---|---|---|---|---|---|
| **DCL** (Low) | Ductilité limitée — calcul élastique étendu | 1,5 | 1,5 | 1,5-2,0 | 1,5 |
| **DCM** (Medium) | Ductilité moyenne | 3,0-3,5 | 2,5-3,0 | 4,0 | 2,0-3,0 |
| **DCH** (High) | Ductilité haute (détaillage très exigeant) | 4,5-5,4 | 3,6-4,4 | 5,0-6,5 | (rare bois) |

**En France métropolitaine** : le plus souvent **DCM**. **DCH** réservé aux zones 4-5 + ouvrages complexes.

## 9. Procédure

1. **Vérifier la commune** sur georisques.gouv.fr ou via `rag_search` sur l'annexe de l'arrêté → **zone**.
2. **Déterminer la catégorie d'importance** depuis destination + effectif + hauteur.
3. **Croiser** dans le tableau → **EC8 obligatoire ou non**.
4. Si **EC8 obligatoire** : examiner si **PS-MI 89** applicable (uniquement MI sous conditions strictes).
5. **Déterminer la classe de sol** depuis rapport G ou hypothèse provisoire (avec demande G2 à venir).
6. Calculer **a_g** = a_gr × γ_I.
7. Indiquer **paramètres spectraux** (S, TB, TC, TD) selon classe de sol et type spectre.
8. Suggérer **système de contreventement** et **classe de ductilité** à valider par BE structure.

## 10. Restitution structurée

```
## Analyse sismique — [Commune] / [Destination]

### Données projet
- **Commune** : [nom + code INSEE]
- **Adresse** : [...]
- **Destination** : [habitation collective / ERP type X cat Y / etc.]
- **Effectif** : [N personnes]
- **Hauteur** : [m] / **Niveaux** : [R+N]
- **SDP** : [m²]
- **Système constructif pressenti** : [voiles BA / portiques BA / charpente bois / mixte]

### Classement
- **Zone de sismicité** : [n] ([qualification])
- **a_gr** : [m/s²]
- **Catégorie d'importance** : [I / II / III / IV]
- **Coefficient γ_I** : [0,8 / 1,0 / 1,2 / 1,4]
- **a_g** = a_gr × γ_I = [m/s²]
- **Classe de sol** : [A / B / C / D / E / S1 / S2] (source : rapport G2 ou hypothèse à confirmer)
- **Paramètre S** : [valeur]
- **Périodes** : TB = [s], TC = [s], TD = [s]

### Conclusion
- **EC8** : [obligatoire / non applicable / optionnel]
- **Référentiel** : NF EN 1998-1 + AN française
- **PS-MI 89** alternative : [applicable / non applicable car (raison)]
- **CP-MI Antilles** : [N.A. / applicable si zone 5]

### Système de contreventement préconisé
- [Voiles BA / portiques / mixte / palées triangulées]
- **Classe de ductilité** suggérée : [DCL / DCM / DCH]
- **q** estimatif : [valeur]

### Vérifications complémentaires à prévoir
1. Calcul **spectre de réponse de calcul** complet (avec ξ = 5 % amortissement)
2. **Régularité** en plan et élévation (impacte q et méthode d'analyse) — EC8 § 4.2.3
3. **Effets P-Δ** si bâtiment souple — EC8 § 4.4.2.2
4. **Chaînages horizontaux et verticaux** — EC8 § 5.6, EC2 § 9.10
5. **Joint sismique** si bâtiment composé de plusieurs blocs (largeur ≥ √(d1² + d2²))
6. **Détails ductilité** sur nœuds critiques (DCM ou DCH)

### Niveau de confiance
- [Élevé / À valider par classe sol définitive / À reprendre si destination change]

### Pièces à demander
- Rapport **G2 PRO** avec classe de sol et Vs,30 (NF P 94-500)
- Plan de **régularité** géométrique et de **raideur**
- Plan des **joints sismiques** si bâtiment composé
```

## 11. Garde-fous spécifiques

- Tu **ne signes** ni ne **valides** une étude sismique — tu prépares l'**analyse** pour l'ingénieur structure utilisateur, qui décide.
- La **zone** se vérifie **commune par commune** sur l'arrêté 22/10/2010 ou georisques.gouv.fr ; ne jamais déduire d'un département.
- **Zone 5 (DOM)** : EC8 + règles **CP-MI Antilles** quasiment toujours obligatoires — alerte spécifique.
- Pour les **bâtiments existants** modifiés (extension, surélévation, changement de destination) : application de **EC8-3** ou **règles spécifiques** (parfois plus contraignantes que EC8-1).
- Pour les **ERP existants** changeant de catégorie : possible **basculement** de l'obligation EC8 (cat. 4 → cat. 3 = exigence renforcée).
- **PS-MI 89** : appliquer **strictement** les 11 conditions. Une seule non remplie → **EC8 complet** obligatoire.
- Pour les **bâtiments scolaires** (R) : toujours en **catégorie III** sauf très petite école < 30 élèves (cat. II).
- Pour les **hôpitaux** et établissements de santé : presque toujours **cat. IV**.
- Si **Vs,30 non mesuré** : la classe de sol est **estimée** depuis lithologie — risque de **passage en classe C ou D plus défavorable** au stade G2. Anticiper coefficients S majorés.
- Tu **rappelles** que la **classe de ductilité** DCM ou DCH n'est pas un simple choix de q : elle implique un **détaillage** spécifique des armatures, des nœuds et des chaînages (EC8 § 5.5 et § 5.6), souvent contraignant.

## 12. Suites logiques à proposer

- Vérification du **rapport géotechnique** (classe de sol, liquéfaction) avec la skill `analyse_rapport_geotechnique`
- **Note de calcul** EC8 spécifique à demander au BE structure si zone 3+ et cat. II+
- **Contrôle technique obligatoire** (mission SEI = Solidité de l'ouvrage Existant après modifications, ou L = Solidité des ouvrages, ou PS = Sécurité parasismique) selon décret 2007-1727 — **PS obligatoire** en zone 4-5 + bâtiments cat. III/IV
- Vérification de la **régularité géométrique** par la skill `controle_note_calcul`
- Skill `points_singuliers` pour vérifier les **joints sismiques** et **détails de ductilité**
- Pour bâtiments **existants** : étude **EC8-3** ou diagnostic spécifique (Cahier 3231 CSTB)
- Pour les **ouvrages d'art** : référentiel spécifique **NF EN 1998-2** (ponts) hors champ habitation/tertiaire
