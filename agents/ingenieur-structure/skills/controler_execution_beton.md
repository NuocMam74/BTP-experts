# Skill — Contrôler la conformité béton et l'exécution

L'utilisateur te soumet un **béton et/ou une exécution d'ouvrage en béton** à contrôler (spécification, livraison, prélèvements, ferraillage avant coulage, résultats de compression, mise en œuvre) au regard de la **NF EN 206/CN**, de la **NF EN 13670 / DTU 21** et des **quatre épreuves**. Tu produis un **avis de contrôle indicatif** (conformité, points d'arrêt, écarts), pas une réception signée.

## 1. Documents attendus / questions

- **Spécification** : désignation du béton (classe de résistance, classes d'exposition, consistance, Dmax, classe de chlorures), CCTP.
- **Bons de livraison (BL)** : désignation, heure de chargement, volume, adjuvants, délai d'utilisation.
- **Épreuves** : étude/convenance réalisées ? résultats de **contrôle** (compression 28 j) et d'**information** (décoffrage) ?
- **Prélèvements** : fréquence, conservation des éprouvettes, essais (affaissement, air, T°).
- **Ferraillage** : plans EXE, fiche de contrôle avant coulage (point d'arrêt) — diamètres, position, enrobage, recouvrements, propreté.
- **Mise en œuvre** : vibration, reprises de bétonnage, cure, conditions climatiques (temps chaud/froid), décoffrage.

Si données incomplètes, demande : la désignation complète du béton + classe d'exposition exigée, les BL, les résultats de compression, et la fiche de contrôle ferraillage avant coulage.

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("NF EN 206 CN spécification BPS classes consistance S1 S5 désignation")`
- `rag_search("NF EN 206 conformité résistance critère f_cm écart-type production continue")`
- `rag_search("épreuves étude convenance contrôle information béton DTU 21")`
- `rag_search("NF EN 13670 DTU 21 exécution coffrage cure reprises tolérances")`
- `rag_search("contrôle ferraillage avant coulage point d'arrêt enrobage recouvrement EC2")`
- `rag_search("classes d'exposition exigences E/C dosage ciment XC XD XS XF XA")`
- `rag_search("NF EN 13791 carottage résistance in situ scléromètre ultrasons")` (si litige/doute)

## 3. Procédure

### Étape 1 — Vérifier la spécification (NF EN 206/CN)

- La **désignation BPS** est-elle complète ? (résistance + **exposition** + consistance + Dmax + Cl).
- La classe de résistance et les exigences (E/C max, dosage ciment, type de ciment) **couvrent-elles les classes d'exposition** réelles de l'ouvrage (tableau NA.F) ?
  - Ex. : façade extérieure → **XC4** (+ XF1 selon site) → mini **C25/30**, E/C ≤ 0,60 ; ouvrage de mer → **XS** → C35/45, E/C ≤ 0,45.
- Cohérence avec l'**enrobage** prescrit au plan (EC2 §4.4) pour la durabilité.

### Étape 2 — Contrôler les épreuves (DTU 21)

| Épreuve | Vérifier | Statut |
|---|---|---|
| **Étude** | Formule validée (ou BPS certifié **NF-BPE** → couverte par le producteur) | ❓ |
| **Convenance** | Réalisée dans les conditions réelles du chantier avant 1er coulage | ❓ |
| **Contrôle** | Prélèvements + compression 28 j conformes à la fréquence | ❓ |
| **Information** | Résistance à l'échéance utile (décoffrage, mise en tension, décintrement) | ❓ |

### Étape 3 — Contrôler la livraison et les prélèvements

- **BL** présents, désignation conforme, **délai/heure limite** de mise en œuvre respectés.
- **Essais béton frais** : affaissement (classe de consistance, NF EN 12350-2), air occlus (XF3/XF4), température.
- **Prélèvements** : fréquence (p. ex. 1/jour/formule ou par volume), éprouvettes correctement confectionnées et conservées (NF EN 12390).

### Étape 4 — Vérifier la conformité de la résistance (NF EN 206 §8.2)

```
Production continue (≥ 35 résultats) :
   f_cm ≥ f_ck + 1,48 × σ     ET   chaque f_ci ≥ f_ck − 4 MPa
Production initiale (3 résultats) :
   f_cm ≥ f_ck + 4            ET   chaque f_ci ≥ f_ck − 4 MPa
```

→ Si un résultat est **non conforme** : ne pas conclure au rejet immédiat — investigation : re-essai, **carottage in situ (NF EN 13791)**, analyse de l'**incidence structurale** (la résistance réelle suffit-elle pour les sollicitations ?).

### Étape 5 — Contrôler le ferraillage AVANT coulage (point d'arrêt majeur)

| À vérifier | Référence | Critère |
|---|---|---|
| Diamètres + nombre de barres | Plan EXE / note de calcul | conforme au plan |
| Position (lits, nappes, **chapeaux**) | Plan EXE | sections en travée/appui respectées |
| **Enrobage** (cales, distanciers) | EC2 §4.4 | c_nom = c_min + Δc_dev (Δc ≥ 10 mm) |
| Espacements barres/cadres | EC2 §8.2 | e_min ≥ max(Ø ; Dmax+5 ; 20 mm) |
| Recouvrements / ancrages (l_0, l_bd) | EC2 §8 | longueur + position |
| Chaînages, attentes, aciers de couture | EC2 §9 | présence + continuité |
| Propreté (rouille non adhérente, terre, huile) | DTU 21 | nettoyé avant coulage |
| Stabilité de la cage (ligatures) | — | pas de déplacement au coulage |

→ **Levée de point d'arrêt** signée avant d'autoriser le bétonnage (irréversible une fois coulé).

### Étape 6 — Contrôler la mise en œuvre (NF EN 13670 / DTU 21)

- **Coffrages/étaiements** : stabilité, étanchéité, tolérances, peau (parement).
- **Serrage** : vibration adaptée, hauteur de chute limitée (ségrégation).
- **Reprises de bétonnage** : traitement (repiquage/rugosité, propreté), position.
- **Cure** : protection contre la dessiccation — durée selon exposition/climat (point clé durabilité et fissuration de retrait).
- **Temps chaud/froid** : bornes de T° du béton frais, précautions.
- **Décoffrage/décintrement** : à la **résistance suffisante** (épreuve d'information), pas seulement au délai.
- **Tolérances** : aplomb, planéité, position, **enrobage** réel.

## 4. Exemple — Coulage d'un voile de façade R+3 (logement)

#### Spécification reçue
- Désignation : **C25/30 XC1 S3 Dmax 22 Cl 0,40**. Façade extérieure exposée à la pluie.

#### Contrôle
- **Écart détecté** : la classe d'exposition **XC1** (intérieur sec) ne couvre **pas** une façade extérieure → exposition réelle **XC4** (cycles humidification/séchage), voire **XF1** en région exposée.
- Conséquence : E/C max et dosage ciment de XC1 (E/C ≤ 0,65) **insuffisants** pour XC4 (E/C ≤ 0,60, C ≥ 280 kg/m³) ; enrobage à revoir (c_min XC4 ≈ 30 mm vs 15 mm en XC1).
- **Action** : exiger la requalification du béton en **C25/30 XC4(F)** (et XF1 si site exposé), corriger l'enrobage au plan, refaire la commande BPS.

#### Suite
- Convenance avant 1er voile ; prélèvements 28 j (contrôle) ; cure soignée (durabilité de peau) ; point d'arrêt ferraillage (enrobage côté extérieur).

## 5. Restitution

```
1. CONTEXTE — ouvrage, élément, désignation béton, CCTP
2. SPÉCIFICATION — adéquation classe/exposition/consistance vs usage réel
3. ÉPREUVES — étude/convenance/contrôle/information (statut)
4. LIVRAISON & PRÉLÈVEMENTS — BL, consistance, T°, fréquence
5. CONFORMITÉ RÉSISTANCE — critère EN 206 §8 ; carottage si doute
6. FERRAILLAGE AVANT COULAGE — fiche point d'arrêt (enrobage, position, recouvrements)
7. MISE EN ŒUVRE — coffrage, vibration, reprises, cure, décoffrage, tolérances
8. ÉCARTS / NON-CONFORMITÉS + actions + niveau de confiance
```

## Garde-fous

- **Pas de réception signée** — avis de contrôle indicatif ; la réception relève du contrôle extérieur / bureau de contrôle.
- **Point d'arrêt ferraillage** irréversible : pas de bétonnage sans levée (enrobage, position, recouvrements, propreté).
- **Classe d'exposition prime** : un béton « assez résistant » mais sous-classé en durabilité est **non conforme à l'usage** (cause de pathologie future — voir corpus pathologie).
- **Résultat non conforme** : investiguer (re-essai, carottage NF EN 13791, incidence structurale) avant toute décision de rejet/démolition.
- **Cure** : l'exiger au CCTP et la contrôler (souvent négligée, impacte durabilité et fissuration).
- Fréquences/seuils **indicatifs** — la conformité contractuelle relève du CCTP + DTU 21 ; l'exécution engage l'**entreprise**, la conception le **BET** (responsabilité décennale, code civil art. 1792).

## Livrable à proposer

→ Construis le contenu et appelle `generer_rapport({ titre, contenu, format, agent: "ingenieur-structure" })`.

Après contrôle :
- **Rapport de contrôle béton / exécution** (DOCX + PDF) selon structure ci-dessus
- **Fiche de contrôle ferraillage / levée de point d'arrêt** (DOCX)
- **Tableau de suivi des prélèvements et résultats de compression** vs critère EN 206 (XLSX)
- **Liste des écarts / non-conformités** et actions correctives (XLSX)
- 👉 *Souhaites-tu que je génère le rapport de contrôle béton + la fiche point d'arrêt ferraillage au format DOCX/XLSX pour la MOE / le bureau de contrôle ?*
- Mention finale : *« Document préparé par l'agent IA Ingénieur structure — contrôle indicatif selon NF EN 206/CN, NF EN 13670 / DTU 21. Réception et conformité contractuelle à valider par le contrôle extérieur / bureau de contrôle. L'exécution engage l'entreprise et la conception le BET (responsabilité décennale, code civil art. 1792). »*
