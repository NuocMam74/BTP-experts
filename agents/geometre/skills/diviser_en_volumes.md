# Skill — Analyser / établir une division en volumes et son EDDV

L'utilisateur veut **analyser, concevoir ou établir** une **division en volumes** (ensemble immobilier complexe : dalle urbaine, centre commercial, gare, superposition domaine public / privé) et son **État Descriptif de Division en Volumes (EDDV)** : définir les volumes en 3D (emprises + cotes NGF), organiser les **servitudes de volumes**, articuler la **gestion AFUL / ASL**, et **vérifier le risque de requalification en copropriété**. S'appuie sur le corpus `division_en_volumes.md` (et `asl_aful_asa.md`).

## 1. Documents attendus

- **Plan-masse et plans architecturaux** du projet (niveaux, coupes)
- **Plan topographique** géoréférencé (RGF93 Lambert 93 + NGF-IGN69)
- **Étude de structure** (descentes de charges, ouvrages partagés appui/soutènement)
- **Acte d'origine** de la propriété + références cadastrales du tènement
- **Programme** : nature et affectation de chaque volume (commerces, logements, bureaux, parkings, voirie publique)
- **Identité des futurs propriétaires** de volumes (privés, bailleur social, collectivité, exploitant)
- **EDDV existant** + **état des servitudes** + **statuts AFUL / ASL** (si analyse d'un existant)
- **Position de la personne publique** (si superposition domaine public : déclassement, convention)

Si pièces partielles : demande
1. Objectif : **analyser** un EDDV existant / **concevoir** une division en volumes neuve ?
2. Y a-t-il un **volume relevant du domaine public** (voie, parking public, gare) ? Déclassement prévu ?
3. Combien de **volumes** et quelles **affectations** ?
4. Existe-t-il des **équipements / réseaux mutualisés** entre volumes (à gérer en AFUL/ASL) ?
5. Risque identifié de **parties communes indivises** (cours, halls, locaux partagés) ?
6. Un / des volume(s) sera-t-il lui-même placé en **copropriété** interne ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("code civil article 552 propriété dessus dessous")`
- `rag_search("loi 10 juillet 1965 article 1 ensemble immobilier absence parties communes")`
- `rag_search("division en volumes EDDV servitudes cotes NGF")`
- `rag_search("code civil articles 637 686 servitudes conventionnelles par titre")`
- `rag_search("ordonnance 2004-632 AFUL ASL gestion volumes")`
- `rag_search("code urbanisme L.322-1 association foncière urbaine libre")`
- `rag_search("jurisprudence requalification division en volumes copropriété")`
- `rag_search("domanialité publique déclassement inaliénabilité")`

## 3. Cadre juridique (rappels structurants)

| Texte | Contenu |
|---|---|
| **Code civil art. 552** | Propriété du sol = du dessus et du dessous → la division en volumes y **déroge conventionnellement** |
| **Loi 1965 art. 1 al. 2** | En **l'absence de parties communes**, le statut de la copropriété **ne s'applique pas** → volumes + AFUL/ASL |
| **Code civil art. 637, 686, 703-705** | Servitudes (constitution par titre, extinction) — ossature inter-volumes |
| **Ordonnance 2004-632 + loi 1865** | **AFUL / ASL** : gestion des équipements et services communs entre volumes |
| **Code urba L.322-1 et s.** | Régime de l'**AFUL** |

> **Critère décisif :** la division en volumes n'est valable que s'il **n'existe aucune partie commune indivise**. À défaut, le juge **requalifie** l'ensemble en **copropriété** (Cass. 3e civ.). C'est le point de vigilance n°1.

## 4. Procédure

### Étape 1 — Vérifier l'éligibilité à la division en volumes

- Ensemble **immobilier complexe** (superposition d'usages / d'acteurs, présence éventuelle de domaine public) ?
- **Absence** de parties communes indivises (tout élément partagé doit être traité en **servitude** + gestion AFUL/ASL, pas en indivision) ?
- Alternative copropriété écartée pour de bonnes raisons (personnes publiques, usages hétérogènes) ?

### Étape 2 — Définir les volumes (géométrie 3D)

- Délimiter chaque volume : **emprise(s) au sol** géoréférencée(s) RGF93 + **cotes altimétriques NGF** (plancher et plafond).
- Établir **plans par niveau** + **coupes cotées NGF** (un volume sans cote haute/basse est indéfini).
- Numérotation **continue et pérenne** des volumes.

### Étape 3 — Construire le réseau de servitudes de volumes

Pour chaque interdépendance, créer une servitude **par titre** (acte de division) avec **assiette géoréférencée** :
- **Appui / soutènement** (structure portant les volumes sus-jacents)
- **Accès / circulation** (passage piéton, véhicules)
- **Réseaux** (eau, EU, EP, élec, télécom, chauffage)
- **Surplomb / tréfonds**
- **Secours / désenfumage / sécurité incendie**

→ Établir les **plans d'assiette** de chaque servitude (fonds dominant / fonds servant).

### Étape 4 — Organiser la gestion (AFUL / ASL)

- Identifier les **éléments d'intérêt commun** (réseaux mutualisés, sécurité, gros entretien des ouvrages partagés, voiries internes).
- Définir les **clés de répartition** des charges (surfaces, valeurs, usages — **pas de tantièmes**).
- Préparer les bases des **statuts** (objet, périmètre, organes, charges) → rédaction notaire ; déclaration + **publication** pour opposabilité (voir `asl_aful_asa.md`).

### Étape 5 — Traiter la domanialité publique (le cas échéant)

- Volume public → règles de **domanialité** (inaliénabilité) : prévoir le **déclassement** préalable à toute cession et la **convention** avec la personne publique.

### Étape 6 — Établir l'EDDV et l'acte

- **EDDV** (tableau des volumes + plans-coupes cotés NGF) + **état descriptif des servitudes**.
- **Acte de division en volumes** (notaire) + **publication au SPF**.

## 5. Restitution structurée

```
## Division en volumes — [Ensemble immobilier]

### Identification
- **Tènement** : [adresse + références cadastrales + contenance]
- **Géoréférencement** : RGF93 Lambert 93 / NGF-IGN69
- **Nature de l'ensemble** : [dalle urbaine / centre commercial / gare / mixte]
- **Présence domaine public** : [oui/non — préciser]
- **Objet** : analyse / conception EDDV
- **Date** : [JJ/MM/AAAA]
- **Géomètre-expert** : [nom + n° Ordre OGE]

### Tableau des volumes
| N° volume | Affectation | Propriétaire / acteur | Emprise (m²) | Cote NGF plancher | Cote NGF plafond |
|---|---|---|---|---|---|
| V1 | Voirie publique | Commune | 1 250 | 102,00 | 105,50 |
| V2 | Parking | SCI parking | 1 250 | 98,50 | 102,00 |
| V3 | Commerces | Foncière | 1 250 | 105,50 | 110,00 |
| V4 | Logements | Bailleur | 900 | 110,00 | 128,00 |
| ... | | | | | |

### Vérification anti-requalification copropriété
| Critère | Constat |
|---|---|
| Aucune partie commune **indivise** | ✅ / ❌ [si ❌ : risque de requalification] |
| Tout élément partagé traité en **servitude** | ✅ / ⚠️ |
| Gestion par **AFUL / ASL** (pas de syndicat) | ✅ |

### Réseau de servitudes de volumes
| Servitude | Fonds dominant | Fonds servant | Assiette / gabarit | Objet |
|---|---|---|---|---|
| Appui / soutènement | V3, V4 | V2 (structure) | Poteaux + dalle (plan annexe) | Portance |
| Accès véhicules | V2 | V1 | Rampe (plan annexe) | Desserte parking |
| Réseaux | V3, V4 | V2 | Gaines techniques | Eau/EU/EP/élec/télécom |
| Secours incendie | tous | V1 | Cheminements pompiers | Sécurité |

### Gestion AFUL / ASL
- **Structure** : AFUL / ASL
- **Périmètre** : volumes V1 à V4
- **Éléments d'intérêt commun** : [réseaux mutualisés, sécurité, gros entretien dalle]
- **Clés de charges** : [surfaces / usages — à préciser dans statuts]

### Domanialité publique (si applicable)
- **Volume(s) public(s)** : [V1]
- **Déclassement** requis avant cession : [oui/non]
- **Convention** avec la personne publique : [à formaliser]

### Points d'attention
1. [Ex : local technique partagé envisagé en indivision → RISQUE de requalification → le traiter en servitude]
2. [Ex : volume V1 (voie) relève du domaine public → déclassement préalable obligatoire]
3. [Ex : servitude d'appui V2→V3/V4 non gabarisée → préciser l'assiette 3D]

### Niveau de confiance
- [Élevé / À valider avec notaire + personne publique / À reprendre après plans structure]
```

→ Sur demande ou en push proactif :
`generer_rapport({ titre: "EDDV et état des servitudes — [ensemble]", contenu: <markdown>, format: "docx" (note + EDDV) ou "xlsx" (tableau volumes + servitudes), agent: "geometre", metadata: { tenement, references_cadastrales, OGE_signataire_prevu, date } })`

> 👉 *Souhaites-tu que je génère le **projet d'EDDV + état des servitudes (DOCX)** et le **tableau des volumes (XLSX)** prêts à transmettre au notaire et à la collectivité ?*

## 6. Garde-fous spécifiques

- Tu **ne tranches pas** la qualification **division en volumes / copropriété** : tu l'**éclaires** et tu **alertes** sur le **risque de requalification** (Cass. 3e civ.) dès qu'un élément partagé risque de rester en **indivision**. La division en volumes suppose **zéro partie commune indivise**.
- L'EDDV est **3D** : tout volume doit être défini par une **emprise géoréférencée** ET des **cotes NGF** plancher / plafond. Un volume sans cote altimétrique est **inopposable / indéfini**.
- Les **servitudes** sont l'**ossature** de l'ensemble : elles doivent être **constituées par titre** (acte de division), avec **assiette précise** (plan d'assiette géoréférencé). Une servitude mal définie fragilise tout le montage.
- Pour les **volumes du domaine public** : règles de **domanialité** (inaliénabilité) — **déclassement** préalable et **convention** avec la personne publique indispensables. Tu **n'omets pas** ce point.
- Tu **ne signes pas** l'acte : le géomètre-expert OGE établit l'**EDDV et les plans** (sa responsabilité), le **notaire** rédige l'acte de division, les servitudes et coordonne les **statuts AFUL/ASL** + la **publicité foncière**.
- La **gestion** se fait par **AFUL / ASL** (pas de syndicat de copropriété, pas de tantièmes) : clés de charges **statutaires** ; publication des statuts pour **opposabilité** (voir `asl_aful_asa.md`).
- Tu **rappelles** les obligations **sécurité incendie / accessibilité** (ERP, IGH) : la division ne doit pas compromettre issues, désenfumage, accès secours → servitudes dédiées.
- Tu **ne génères pas** de livrable si la **géométrie 3D** (cotes NGF) ou la structure (appuis) ne sont pas connues — demande les plans-coupes et l'étude structure.

## 7. Suites logiques à proposer

- **Levé géoréférencé** complet (RGF93 + NGF-IGN69) et **plans-coupes** cotés des volumes
- **Plans d'assiette** des servitudes (skill `analyse_servitudes` pour la qualification)
- Rédaction des **statuts AFUL / ASL** (corpus `asl_aful_asa.md`) + déclaration + publication
- Coordination **notaire** (acte de division en volumes + publicité foncière) et **collectivité** (déclassement, convention)
- **DMPC** si la division en volumes s'accompagne d'une modification du parcellaire au sol (skill `etablir_dmpc`)
- Si gestion **interne** d'un volume nécessaire : **copropriété** dans le volume (skill `etablir_edd_copropriete`)
- **Récolement classe A** des réseaux mutualisés (skill `realiser_recolement`) + **DT-DICT** pour les travaux (skill `dt_dict`)
