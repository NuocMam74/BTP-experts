# Skill — Vérifier une attestation RE2020

L'utilisateur te transmet une **attestation RE2020** (ou étude thermique) qu'il faut vérifier au regard des seuils en vigueur selon la date de dépôt du permis de construire.

## 1. Documents attendus

L'utilisateur fournit typiquement :
- **Attestation RE2020 PC** — émise par un bureau d'études thermiques **agréé** (RGE Études). Format normalisé.
- **Étude thermique complète** (PDF, parfois > 100 pages) — calculs détaillés Bbio, Cep, Ic.
- **Notice PC** (Cerfa 13409) avec performance énergétique.
- Parfois **plans architecte** + métré pour recoupement (mais l'étude thermique est la source autoritaire).

Indices pour identifier une attestation RE2020 : présence des termes **Bbio, Cep, Ic_construction, Ic_énergie, DH** ; mention "RE2020" ; cachet du BE thermique ; numéro d'attestation.

Si aucun document : pose ces questions :
1. Date prévisionnelle de **dépôt du PC** (détermine les seuils applicables) ?
2. Type de construction (logement collectif, maison individuelle, bureaux, scolaire, hôtellerie, gymnase, autre) ?
3. SDP du projet ?
4. Zone climatique (H1a, H1b, H1c, H2a, H2b, H2c, H2d, H3) ?
5. Altitude (impacte la zone climatique) ?
6. Bureau d'études thermique mandaté ?

## 2. Extraction des informations clés

Quand l'attestation est dans le contexte, EXTRAIS :

| Information | Où chercher | Si absente |
|---|---|---|
| Date de dépôt PC | En-tête / "Date d'autorisation d'urbanisme" | Demander à l'utilisateur |
| Type de bâtiment | "Type d'usage" / "Destination" | Plans + notice |
| Surface de référence | "Surface de référence" / SHAB / SUF | Calculer depuis plans |
| Zone climatique | "Zone climatique" | Déduire de la commune (carte zonage RE2020) |
| Altitude | "Altitude" | Géoportail |
| **Bbio** | Indicateur Bbio (besoin bioclimatique) | C'est le 1er indicateur à vérifier |
| **Bbio_max** | Plafond Bbio applicable | Tableau seuils selon usage et zone |
| **Cep** | Consommation d'énergie primaire | kWh_ep/m²/an |
| **Cep_nr** | Consommation d'énergie primaire non renouvelable | kWh_ep_nr/m²/an |
| **Cep_max** | Plafond Cep applicable | Tableau seuils |
| **Ic_construction** | Impact carbone construction | kgCO2eq/m² |
| **Ic_construction_max** | Plafond selon année de PC | Évolution 2022 → 2025 → 2028 → 2031 |
| **Ic_énergie** | Impact carbone énergie | kgCO2eq/m²/an |
| **DH** | Degré-heures d'inconfort estival | h°C/an, plafond 1250 |
| Système de chauffage | "Générateur" | Influe sur Cep |
| Énergies renouvelables | "EnR" | Si ECS solaire, PAC, etc. |

## 3. Vérifications normatives (`rag_search` obligatoire)

Avant de conclure, lance ces requêtes :
- `rag_search("seuils RE2020 Bbio_max maison individuelle")` ou `"logement collectif"` selon usage
- `rag_search("seuils Ic_construction 2022 2025 2028 2031")` — évolution dans le temps
- `rag_search("attestation thermique PC arrêté 4 août 2021")` — texte fondateur
- `rag_search("Cep_max RE2020 par usage zone climatique")` — plafonds

## 4. Procédure d'analyse

1. **Identifier la date de dépôt PC** — fixe les **seuils** applicables :
   - PC déposé entre **01/01/2022 et 31/12/2024** → seuils Ic 2022 (Ic_construction_max = 640 kgCO2eq/m² logement collectif)
   - PC déposé à partir du **01/01/2025** → seuils Ic 2025 (durcis)
   - À partir de **01/01/2028** → seuils Ic 2028
   - À partir de **01/01/2031** → seuils Ic 2031

2. **Vérifier la conformité Bbio** :
   - Bbio_projet ≤ Bbio_max (selon zone climatique et type d'usage)
   - Si Bbio > Bbio_max → **non conforme**, revoir conception (enveloppe, orientation, ouvertures)

3. **Vérifier la conformité Cep et Cep_nr** :
   - Cep ≤ Cep_max (énergie totale)
   - Cep_nr ≤ Cep_nr_max (énergie non renouvelable)
   - Si non conforme → introduire EnR, améliorer générateur, isoler

4. **Vérifier la conformité Ic_construction** :
   - Ic_projet ≤ Ic_max (selon année de PC)
   - Identifier les contributeurs majeurs (béton, acier, isolant) et les leviers (bois, biosourcés)

5. **Vérifier la conformité Ic_énergie** :
   - Ic_énergie ≤ Ic_énergie_max
   - Sensible au mix énergétique (chauffage gaz vs PAC électrique vs réseau de chaleur)

6. **Vérifier le confort d'été (DH)** :
   - DH ≤ 1250 h°C (seuil maximum)
   - 350 ≤ DH ≤ 1250 = "à vérifier" (étude confort estival approfondie attendue)
   - Si DH > 1250 → **non conforme**, prévoir protections solaires, inertie, ventilation traversante

7. **Vérifier la cohérence administrative** :
   - BE thermique **agréé** (RGE Études) ?
   - Attestation **signée** et **cachetée** ?
   - Date d'émission cohérente avec la date de dépôt PC ?

## 5. Restitution structurée

```
## Vérification attestation RE2020 — [Projet]

### Identification
- **Maître d'ouvrage** : [...]
- **Projet** : [SDP, type, adresse]
- **Date de dépôt PC** : [JJ/MM/AAAA] → **seuils applicables : Ic [2022 / 2025 / 2028 / 2031]**
- **Bureau d'études thermiques** : [nom, n° RGE Études]
- **Zone climatique** : [H1a / H1b / .../ H3]
- **Altitude** : [m]

### Indicateurs et conformité

| Indicateur | Valeur projet | Plafond applicable | Conformité | Marge |
|---|---|---|---|---|
| **Bbio** | [pts] | [pts] | [✅/❌] | [pts ou %] |
| **Cep** | [kWh_ep/m²/an] | [kWh_ep/m²/an] | [✅/❌] | |
| **Cep_nr** | [kWh_ep_nr/m²/an] | [...] | [✅/❌] | |
| **Ic_construction** | [kgCO2eq/m²] | [...] | [✅/❌] | |
| **Ic_énergie** | [kgCO2eq/m²/an] | [...] | [✅/❌] | |
| **DH (confort été)** | [h°C] | 1250 max (350 = "à vérifier") | [✅/⚠️/❌] | |

### Points d'attention
1. [Indicateur en limite — recommandation pour sécuriser]
2. [Contributeur majeur Ic_construction — levier biosourcé]
3. [Confort été : DH > 350 → étude approfondie attendue]

### Conformité administrative
- [✅/❌] BE thermique agréé RGE Études (n° [...])
- [✅/❌] Attestation signée et cachetée
- [✅/❌] Date émission cohérente avec PC
- [✅/❌] Indicateurs cohérents (pas d'erreur de saisie évidente)

### Verdict
- **Statut** : [Conforme / Non conforme sur [point] / À reprendre]
- **Marge / Risque** : [...]

### Recommandations
- [Action 1 — ex: ajouter EnR pour passer sous Cep_nr_max]
- [Action 2 — ex: substituer béton par bois en planchers pour gagner sur Ic_construction]
- [Action 3 — ex: BSO ou casquettes pour réduire DH]
```

## 6. Garde-fous spécifiques

- Tu **n'engages pas** ta responsabilité — l'attestation RE2020 est **signée par un BE thermique agréé** qui engage la sienne. Tu prépares un avis critique pour l'architecte utilisateur.
- Pour les **valeurs limites** (Cep, Bbio, Ic), tu **utilises rag_search** plutôt que de citer de mémoire — les seuils dépendent de la zone climatique, du type d'usage, et de l'année.
- Pour le **confort d'été (DH)** : c'est le **principal point de non-conformité** des projets actuels. Insiste sur les protections solaires si > 350 h°C.
- Pour les **dérogations** : la RE2020 ne prévoit pas de dérogation au sens strict mais permet des **adaptations** (catégories CE2 logements collectifs, par exemple, exemptés de Cep_nr en zones bruyantes).
- Tu **rappelles** que la RE2020 s'applique à toute **demande de PC déposée après le 1er janvier 2022** pour les logements neufs (puis bureaux/scolaires 01/07/2022, puis autres).

## 7. Suites logiques à proposer

- Demander au BE thermique l'**étude détaillée** (PDF complet) si seule l'attestation est fournie et qu'un doute subsiste
- **STD** (simulation thermique dynamique) si confort estival critique
- **ACV** (analyse de cycle de vie) détaillée pour identifier les leviers Ic_construction
- Anticiper le **passage en seuils 2025** si PC > 2024 — Ic_construction nettement plus exigeant
- Préparer le **dépôt d'attestation à l'achèvement** (loi 2010-788)
