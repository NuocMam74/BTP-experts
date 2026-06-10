# Skill — Évaluer une pathologie du béton et orienter la réparation

L'utilisateur te transmet un **désordre sur un ouvrage en béton** (fissures, éclats, aciers apparents, faïençage, taches de rouille, gonflement) — tu dois **identifier la pathologie** (carbonatation/corrosion, chlorures, RAG, RSI, fatigue), en évaluer la gravité et **orienter la réparation / protection** au sens de la **NF EN 1504** (et le renforcement FRP si nécessaire). Tu produis un **avis indicatif**, pas une note de calcul ni un diagnostic signé.

## 1. Documents attendus / questions

- **Ouvrage** : type (bâtiment, parking, pont, réservoir, façade, balcon), âge, exposition (intérieur, extérieur, bord de mer, sels de déverglaçage, immergé).
- **Classe d'exposition** d'origine (XC/XD/XS/XF/XA) et **enrobage** prévu/réel.
- **Symptômes** : nature (fissures, éclats, faïençage, exsudations), localisation, ouverture (mm), orientation, **évolutivité** (suivi ?), aciers visibles + état (rouille, perte de section).
- **Environnement** : humidité, contact eau/sel, cycles gel-dégel.
- **Investigations déjà faites** : phénolphtaléine (front de carbonatation), profil de chlorures, pH, carottage/pétrographie, pachomètre, potentiel de corrosion.

Si données incomplètes, demande : exposition + âge, photos datées/localisées, ouverture et orientation des fissures, état des aciers, et résultats d'essais disponibles (carbonatation, Cl⁻).

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("carbonatation béton loi racine du temps front dépassivation pH")`
- `rag_search("corrosion armatures perte de section éclatement chlorures piqûres")`
- `rag_search("réaction alcali-granulats RAG RSI ettringite différée faïençage")`
- `rag_search("NF EN 1504 principes P1 P11 mortiers R1 R4 réparation protection")`
- `rag_search("renforcement composites collés FRP CFRP AFGC flexion confinement")`
- `rag_search("classes d'exposition XC XD XS XF XA enrobage durabilité EC2")`
- `rag_search("fatigue béton EC2 6.8 cycles Palmgren-Miner")` (si chargement cyclique)

## 3. Procédure

### Étape 1 — Identifier la pathologie (arbre de diagnostic)

```
Q1 : Fissures fines parallèles aux armatures + taches de rouille + éclats ?
├── OUI → CORROSION D'ARMATURES → Q2
└── NON → Q3

Q2 : Ouvrage en ambiance chlorures (mer XS / sels XD) ?
├── OUI → Corrosion par CHLORURES (piqûres) — profil de Cl⁻
└── NON → Corrosion par CARBONATATION — test phénolphtaléine (front vs enrobage)

Q3 : Fissuration en faïence / réticulée + gonflement + exsudations de gel ?
├── OUI → RAG (alcali-réaction) ou RSI (ettringite différée) → pétrographie
│         • Pièce massive / béton étuvé chaud au jeune âge → suspecter RSI/DEF
│         • Granulats réactifs + humidité permanente → suspecter RAG
└── NON → Q4

Q4 : Élément sous charges cycliques répétées (pont, plancher roulé, machine) ?
├── OUI → FATIGUE (vérif EC2 §6.8, détails, soudures/coudes)
└── NON → autre (retrait, gel-dégel/écaillage XF, attaque sulfatique externe XA, choc…)
```

### Étape 2 — Confirmer par essais (orienter le programme)

| Pathologie suspectée | Essai de confirmation |
|---|---|
| Carbonatation | **Phénolphtaléine** sur carotte fraîche → profondeur du front vs enrobage (pachomètre) |
| Corrosion (chlorures) | **Profil de chlorures** (% / poids ciment) ; **potentiel de corrosion** (cartographie) |
| Perte de section acier | Ouverture localisée, mesure du Ø résiduel |
| RAG / RSI | **Examen pétrographique** (lames minces), essai d'expansion résiduelle |
| Résistance résiduelle béton | **Carottage** + compression (NF EN 13791) |

### Étape 3 — Évaluer la gravité

- **Structurelle** : perte de section d'acier (≥ ~10-15 % = significative), baisse de M_Rd/V_Rd, perte d'adhérence (éclatement à l'ancrage), évolutivité.
- **Durabilité** : front de carbonatation ayant atteint/dépassé l'acier, chlorures > seuil, fissuration traversante.
- **RAG/RSI** : caractère **évolutif et irréversible** → suivi (expansion résiduelle).
- **Drapeaux rouges** : aciers fortement corrodés portants, éclats au-dessus de zones fréquentées (balcons, sous-faces), fissures structurelles évolutives → sécurisation immédiate (voir skill diagnostic).

### Étape 4 — Choisir le principe de réparation/protection (NF EN 1504)

| Situation | Principe(s) NF EN 1504 | Mise en œuvre type |
|---|---|---|
| Carbonatation, acier dépassivé, enrobage sain restant | **P1/P2** (protection) + éventuellement **réalcalinisation (P7)** | Revêtement anti-carbonatation, imprégnation hydrophobe |
| Corrosion installée + éclats | **P3** (restauration béton) + **P7/P11** (passivation, inhibiteurs) | Purge → décapage aciers → mortier **R3/R4** → protection P1 |
| Chlorures importants | **P7** (déchloruration) ± **P10** (protection cathodique) | Anodes sacrificielles / courant imposé pour ouvrages majeurs |
| Capacité structurale insuffisante | **P4** (renforcement) | Béton/mortier additionnel, **FRP collé** |
| RAG / RSI | **P1/P2** (stopper l'eau) + suivi | Étanchéité, drainage ; pas de « guérison » du gel |

### Étape 5 — Démarche de réparation (P3 + P7 typique)

```
1. Purge du béton dégradé/carbonaté jusqu'au béton sain (derrière les aciers)
2. Décapage des aciers (sablage/brossage) ; remplacement si perte > seuil
3. Primaire / passivation anticorrosion des armatures
4. Réparation : mortier R3/R4 (NF EN 1504-3) ou béton projeté, avec accrochage
5. Protection de surface (P1/P2) : revêtement anti-carbonatation / hydrophobe
6. Contrôle : adhérence (pull-off), enrobage rétabli, suivi fissuration
```

### Étape 6 — Renforcement FRP (si P4, recommandations AFGC)

| Besoin | Solution FRP | Vérification clé |
|---|---|---|
| ↑ Flexion (M_Rd) | Lamelles/plats **CFRP** en fibre tendue | **Décollement** (peeling/débonding), ancrage d'about |
| ↑ Effort tranchant (V_Rd) | Bandes/U/wrap latéraux | Schéma de collage, ancrage |
| Poteau (N_Rd, ductilité sismique) | **Confinement** par tissu enroulé (frettage FRP) | Recouvrement, état du support |

→ Limites FRP : comportement **fragile** (coefficients sur la déformation), **tenue au feu médiocre** (résine ~60-80 °C → protection ou hypothèse de perte du renfort sous incendie), purge préalable des aciers corrodés (le FRP ne traite pas la corrosion).

## 4. Exemple — Sous-face de balcons R+4 en bord de ville

#### Constat
- Bâtiment ~40 ans, balcons BA, façade XC4. Fissures fines longitudinales en sous-face, éclats ponctuels, aciers apparents rouillés, traces de rouille.
- Phénolphtaléine sur carotte : front de carbonatation **~25 mm** ; enrobage réel mesuré au pachomètre **~15-20 mm**.

#### Interprétation
- Front de carbonatation **a dépassé l'enrobage** → dépassivation → **corrosion par carbonatation** (pas de chlorures notables — pas de bord de mer ni sels).
- Éclatement par expansion des produits de corrosion → perte d'enrobage et amorce de perte de section.

#### Orientation
- Principes **P3 + P7 + P1** (NF EN 1504) : purge des sous-faces éclatées, décapage/passivation des aciers, réparation **mortier R3**, puis **revêtement anti-carbonatation (P1)** sur l'ensemble pour stopper la progression.
- Vérifier si la **perte de section** des aciers porteurs impose un **renforcement (P4)** local (FRP ou aciers additionnels) → note de calcul.
- Suivi : contrôle d'adhérence (pull-off), inspection périodique.

## 5. Restitution

```
1. CONTEXTE — ouvrage, âge, exposition, désordres signalés
2. PATHOLOGIE IDENTIFIÉE — diagnostic (carbonatation/corrosion/RAG/RSI/fatigue) + preuves (essais)
3. GRAVITÉ — structurelle (perte de section) + durabilité + évolutivité
4. PRINCIPE(S) NF EN 1504 retenus (P1-P11) + classes de mortier (R)
5. DÉMARCHE DE RÉPARATION — étapes (purge/passivation/réparation/protection)
6. RENFORCEMENT éventuel (P4 / FRP — AFGC) + limites (décollement, feu)
7. CONTRÔLES ET SUIVI
8. POINTS D'ATTENTION / drapeaux rouges + niveau de confiance
```

## Garde-fous

- **Pas de diagnostic signé** — avis indicatif à confirmer par BET + expert pathologie (sondages, essais représentatifs).
- **Traiter la cause avant l'effet** : un ragréage sans purge ni passivation **relance** la corrosion (effet anode incipiente) — la réparation est non conforme.
- **RAG/RSI** : pathologie **irréversible** → stopper l'eau + suivre l'expansion, ne pas promettre une « guérison ».
- **FRP** : étude de spécialiste (modes de décollement, tenue au feu) — recommandations AFGC + Avis Technique du système.
- **Sécurité** : signaler immédiatement éclats au-dessus de zones fréquentées et aciers porteurs fortement corrodés (sécurisation/purge préventive).
- Valeurs (seuils, classes R, vitesses de corrosion) **indicatives** — la réparation structurale engage la **responsabilité décennale du BET** (code civil art. 1792).

## Livrable à proposer

→ Construis le contenu et appelle `generer_rapport({ titre, contenu, format, agent: "ingenieur-structure" })`.

Après évaluation :
- **Rapport de pathologie et orientation de réparation** (DOCX + PDF) selon structure ci-dessus
- **Tableau de synthèse** désordres / pathologie / gravité / principe NF EN 1504 (XLSX)
- **Programme d'investigations complémentaires** (carottages, profil Cl⁻, pétrographie) (DOCX)
- **Croquis / repérage photographique** des désordres
- 👉 *Souhaites-tu que je génère le rapport de pathologie + le tableau de synthèse NF EN 1504 au format DOCX/XLSX pour le maître d'ouvrage / l'expert ?*
- Mention finale : *« Document préparé par l'agent IA Ingénieur structure — évaluation indicative selon NF EN 1504 / EC2 / recommandations AFGC. Diagnostic et note de réparation à valider et signer par un BET inscrit OPQIBI. Investigations représentatives indispensables. »*
