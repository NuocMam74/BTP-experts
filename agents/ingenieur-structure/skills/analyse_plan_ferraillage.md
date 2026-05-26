# Skill — Analyser un plan de ferraillage

L'utilisateur te transmet un **plan de ferraillage** (PDF, DWG) d'un élément en béton armé (poutre, poteau, voile, dalle, fondation) qu'il faut vérifier au regard de l'**Eurocode 2 (NF EN 1992-1-1)** et de son **Annexe Nationale française**.

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **Plan de coffrage** correspondant (géométrie, sections, repérage)
- **Plan de ferraillage détaillé** (PDF, DWG) avec nomenclature des aciers, espacements, recouvrements
- **Note de calcul** ou **fiche d'éléments** précisant les efforts (M, V, N), classes de béton, d'acier, exposition
- **CCTP structure** indiquant classes d'environnement, enrobages contractuels, qualité béton C25/30, C30/37, etc.
- **Carnets de détails** (jonctions, scellements, reprises de bétonnage)

Si plan seul fourni sans note : demande
1. Classe de béton (C20/25, C25/30, C30/37, C35/45…) ?
2. Classe d'acier HA (B500A ou B500B, voire B450C) ?
3. Classe d'exposition (XC, XD, XS, XF, XA) — voir tableau §3 ci-dessous ?
4. Catégorie d'importance et zone sismique (impacte armatures de continuité, chaînages) ?
5. Durée d'utilisation prévue (50 ans courant, 100 ans ouvrage exceptionnel) ?
6. Efforts dimensionnants (M, V, N) ELU/ELS ?

## 2. Référentiels (`rag_search` obligatoire)

Avant analyse, lance les requêtes :
- `rag_search("EC2 NF EN 1992-1-1 §4 enrobage durabilité")` — cnom, cmin,dur, Δcdev
- `rag_search("EC2 §9 dispositions constructives armatures")` — sections min/max, ancrages, recouvrements
- `rag_search("annexe nationale française EC2")` — valeurs spécifiques France
- `rag_search("DTU 21 exécution ouvrages béton")` — tolérances de pose, espacement, vibration

## 3. Classes d'exposition (EC2 §4.2 — décisif pour enrobage)

| Classe | Environnement | Exemples |
|---|---|---|
| **X0** | Aucun risque | Locaux secs intérieurs sans armatures |
| **XC1** | Sec ou humide en permanence | Intérieur sec ; éléments immergés en permanence |
| **XC2** | Humide, rarement sec | Fondations courantes, intérieur très humide |
| **XC3** | Humidité modérée | Extérieurs abrités de la pluie, salles de bain |
| **XC4** | Alternance humide-sec | Façades exposées à la pluie |
| **XD1** | Humide modéré + chlorures | Brouillard salin éloigné |
| **XD2** | Humide + chlorures (piscine) | Bassins eau chlorée |
| **XD3** | Chlorures + cycles | Ponts, parkings exposés aux sels |
| **XS1** | Air marin (< 1 km du littoral) | Façades littorales |
| **XS2** | Immersion eau de mer | Pieux, quais en eau salée |
| **XS3** | Marées, embruns | Zone de marnage |
| **XF1** | Gel modéré, peu d'humidité | Façades verticales en gel modéré |
| **XF2** | Gel modéré + sels de déverglaçage | Bords de chaussée |
| **XF3** | Gel sévère, eau présente | Surfaces horizontales en montagne |
| **XF4** | Gel sévère + sels | Chaussées en montagne |
| **XA1/2/3** | Attaque chimique (sol agressif) | Eaux résiduaires, sols sulfatés |

## 4. Enrobage cnom (EC2 §4.4)

```
cnom = cmin + Δcdev
```

- **cmin** = max(cmin,b ; cmin,dur + Δcdur,γ – Δcdur,st – Δcdur,add ; 10 mm)
- **Δcdev** = 10 mm par défaut (tolérance d'exécution, AN française)
- **cmin,b** = diamètre de la plus grosse barre (souvent 12-25 mm)
- **cmin,dur** selon classe d'exposition × classe structurale (S1 à S6, défaut S4) :

| Classe | cmin,dur (mm) — S4 (50 ans) |
|---|---|
| X0 | 10 |
| XC1 | 15 |
| XC2/XC3 | 25 |
| XC4 | 30 |
| XD1/XS1 | 35 |
| XD2/XS2 | 40 |
| XD3/XS3 | 45 |
| XF1 | 25-30 |
| XF2/XF3 | 30-35 |
| XF4 | 40-45 |

⚠️ Pour les **fondations coulées en place sans coffrage** (puits, semelles sur béton de propreté) : cmin = 75 mm en EC2 §4.4.1.3 (3). Sur béton de propreté : 40 mm.

## 5. Procédure d'analyse poste par poste

### A — Poutres (EC2 §9.2)

| Vérification | Exigence EC2 | Méthode |
|---|---|---|
| **Section min armature tendue** | As,min = max(0,26 × fctm/fyk × bt × d ; 0,0013 × bt × d) — §9.2.1.1 | Calcul direct |
| **Section max armature tendue** | As,max = 0,04 × Ac — §9.2.1.1 (3) | Vérifier sur-armé |
| **Diamètre min** | 6 mm | Lecture plan |
| **Espacement min** entre barres | max(diamètre, dmax granulat + 5 mm, 20 mm) — §8.2 | Mesure plan |
| **Cadres minimum** | ρw,min = 0,08 √fck / fyk — §9.2.2 (5) | Calcul espacement |
| **Espacement max cadres** | sl,max = 0,75 d (1 + cot α) — §9.2.2 (6) | Pour la part. courante |
| **Ancrages aux appuis** | lbd selon §8.4 | Calcul lbd,rqd |
| **Recouvrements** | l0 = α1 × α2 × α3 × α5 × α6 × lb,rqd — §8.7 | Vérifier longueur sur plan |
| **Crochets normalisés** | 180° ou 135° selon §8.3 | Lecture plan |

### B — Poteaux (EC2 §9.5)

| Vérification | Exigence EC2 |
|---|---|
| **Diamètre longitudinal min** | 8 mm (12 mm souvent en pratique) — §9.5.2 (1) |
| **Section min** | As,min = max(0,10 × NEd/fyd ; 0,002 × Ac) — §9.5.2 (2) |
| **Section max** | As,max = 0,04 × Ac (0,08 × Ac aux recouvrements) — §9.5.2 (3) |
| **Nombre min barres** | 4 (poteaux carrés/rectangulaires), 6 (poteaux circulaires) — §9.5.2 (4) |
| **Cadres** | dt ≥ max(6 mm ; 1/4 du diamètre long. max) — §9.5.3 (1) |
| **Espacement cadres** | scl,tmax = min(20 × dl,min ; b ; 400 mm) — §9.5.3 (3) en zone courante |
| **Resserrement aux extrémités** | × 0,6 sur hauteur = max(b ; h/clear ; 600 mm) — §9.5.3 (4) |

### C — Voiles (EC2 §9.6)

- **Armatures verticales** : ρv,min = 0,002 Ac (peut être 0,001 × Ac si justifié par compression suffisante)
- **Armatures horizontales** : ρh,min = max(ρv,min / 4 ; 0,001 Ac)
- **Espacement max** : 3 × épaisseur ou 400 mm
- **Cadres de liaison** dans les bords > 2 % As,v,min

### D — Dalles (EC2 §9.3)

- **Section min** dans la direction principale : As,min = 0,26 × fctm/fyk × b × d (≥ 0,0013 × b × d)
- **Section secondaire** : ≥ 20 % de la section principale
- **Espacement max** : min(3 × h ; 400 mm) dans la direction principale ; min(3,5 × h ; 450 mm) dans la secondaire
- **Diamètre max** : limité pour ne pas dépasser ρmax 0,04
- **Armatures sur appuis non encastrés** : prévoir aciers de chapeau si flexion locale possible (loi des chapeaux 1/4 portée minimum)

### E — Semelles et fondations (EC2 §9.8)

- **Aciers principaux** : couvrent la totalité de la largeur, longueur d'ancrage lbd à partir des fibres extrêmes
- **Crochets ou ancrages droits** selon §8.4
- **Aciers de répartition** transversaux ≥ 20 % section principale
- **Voiles-semelles ou longrines** : armatures de peau si h > 1 m

## 6. Procédure d'analyse globale

1. **Identifier l'élément analysé** (poutre/poteau/voile/dalle/semelle) et la **classe d'exposition** ; déduire cnom mini.
2. **Lire la nomenclature** : repère, quantité, diamètre, longueur, façonnage.
3. **Vérifier l'enrobage réel sur plan** (côte cnom indiquée ou déduite des cadres) — comparer à exigence.
4. **Vérifier les sections totales** (As longitudinal, Asw transversal) vs As,min et As,max.
5. **Vérifier les espacements** (longitudinaux et transversaux) vs maximums autorisés.
6. **Vérifier les longueurs d'ancrage et de recouvrement** vs lbd / l0 calculés (avec α1 à α6 selon contexte).
7. **Vérifier les crochets** (180° avec mandrin ≥ 4 ϕ pour HA12, ≥ 7 ϕ pour HA ≥ 16).
8. **Identifier les points singuliers** : nœuds poteau-poutre, jonctions voile-dalle, reprises de bétonnage, scellements (voir skill `points_singuliers`).

## 7. Restitution structurée

```
## Analyse plan de ferraillage — [Élément + repère]

### Hypothèses
- **Élément** : [poutre P12, poteau Pot-3, voile V2, dalle D1, semelle S4]
- **Béton** : [C25/30 / C30/37]
- **Acier** : [B500B]
- **Classe d'exposition** : [XC1 / XC4 / XD3 / XS1 / XF...]
- **Classe structurale (durée vie)** : [S4 = 50 ans / S6 = 100 ans]
- **Enrobage cnom requis** : [mm]

### Vérifications

| Critère | Exigence EC2 | Plan analysé | Conformité |
|---|---|---|---|
| Enrobage cnom | ≥ [mm] | [mm] coté | ✅ / ⚠️ / ❌ |
| As,min long. tendue | ≥ [cm²] (§9.2.1.1) | [cm²] (5 HA16) | ✅ / ⚠️ / ❌ |
| As,max | ≤ [cm²] | [cm²] | ✅ |
| Diamètre cadres ϕt | ≥ [mm] | [mm] | ✅ / ❌ |
| Espacement cadres zone courante | ≤ [mm] | [mm] | ✅ / ❌ |
| Espacement cadres zone resserrée | ≤ 0,6 × scl,tmax | [mm] | ✅ / ❌ |
| Longueur d'ancrage aux appuis | ≥ lbd = [mm] | [mm] | ✅ / ❌ |
| Longueur de recouvrement | ≥ l0 = [mm] | [mm] | ✅ / ❌ |
| Crochets normalisés | 135°/180° + mandrin | [conforme/non] | ✅ / ❌ |

### Points d'attention
1. [Enrobage 20 mm sur plan vs 30 mm requis pour XC4 — non conforme]
2. [Espacement cadres 25 cm en zone resserrée poteau — vérifier sismique]
3. [Recouvrement HA20 = 50 cm sur plan — calcul donne 78 cm en XC4 → reprendre]
4. [Crochets normalisés non représentés en coupe — demander détail]

### Synthèse
- **Conformité globale** : [Conforme / Non conforme sur N points / À reprendre]
- **Niveau de confiance** : [Élevé / À valider / À confirmer par BE]
- **Pièces complémentaires à demander** : [carnet détails nœuds, note de calcul, étude jonctions]
```

## 8. Garde-fous spécifiques

- Tu **ne signes pas** le plan — c'est le **BE structure signataire** qui engage sa responsabilité.
- Tu **ne corriges pas silencieusement** un plan : tu produis une **liste d'observations** que le BE corrigera et resignera.
- Pour les **classes d'exposition multiples** sur un même élément (ex : façade exposée XC4 d'un côté, intérieur XC1 de l'autre), prendre la **plus défavorable** sur l'enrobage.
- Pour les **bétons exposés au gel** (XF), tu **rappelles** qu'au-delà de l'enrobage, le **béton** lui-même doit avoir une composition adaptée (E/C max, entraîneur d'air) — voir DTU 21 §4 et NF EN 206.
- Pour les **ouvrages en zone sismique 3 à 5** ou catégorie d'importance III/IV, les exigences EC8 §5 sur **ductilité** et **détaillage des armatures aux nœuds** peuvent **être plus contraignantes** que EC2 — vérifier l'application de DCM ou DCH.
- Si la **classe structurale n'est pas indiquée** (S1 à S6), demande-la — elle conditionne l'enrobage durabilité.
- Tu **n'inventes pas** un calcul de lbd ou l0 sans avoir les efforts dimensionnants ; si la note n'est pas fournie, **utilise** les valeurs forfaitaires tabulées de la norme avec mention explicite de l'hypothèse.

## 9. Suites logiques à proposer

- Demander la **note de calcul** complète si seul le plan est fourni
- Vérifier les **points singuliers** avec la skill `points_singuliers` (joints, reprises, ancrages)
- Si plan **EXE** validé : demander **fiche de réception ferraillage** et **autocontrôle** avant coulage
- Pour les **gros ouvrages**, demander **PPSPS et PAQ** béton/ferraillage
- Si **bureau de contrôle** mandaté, vérifier que le plan a son **visa** (DC, ou favorable avec observations levées)
- Pour les **éléments précontraints**, basculer sur l'**Eurocode 2 partie 2** + **NF EN 1992-2** (ponts) — hors de portée de cette skill
