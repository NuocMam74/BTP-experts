# Skill — Calculer la TVA sur travaux

L'utilisateur veut déterminer le **taux de TVA applicable** à des travaux (20 % / 10 % / 5,5 %), produire les **attestations** requises, gérer les cas mixtes (plusieurs taux sur un même devis), l'**autoliquidation** en sous-traitance BTP, et convertir **HT ↔ TTC**.

## 1. Documents / paramètres attendus

- **Nature des travaux** (construction neuve / amélioration / entretien / rénovation énergétique).
- **Ancienneté du logement** (achevé depuis **plus / moins de 2 ans**).
- **Usage** (logement — résidence principale/secondaire — vs local professionnel/tertiaire).
- **Devis / DPGF** à ventiler par taux.
- **Caractéristiques techniques** des équipements (R, Uw, performances) pour le 5,5 %.
- Contexte **sous-traitance BTP** (autoliquidation) ?

Si paramètres partiels, demande :
1. Logement achevé depuis **plus de 2 ans** ?
2. **Type** de travaux (neuf / amélioration / qualité énergétique / entretien) ?
3. Y a-t-il **extension de surface** (> 9 m² ?) ou surélévation ?
4. **Sous-traitance** dans le cadre d'un marché de travaux (autoliquidation) ?

## 2. Référentiels (`rag_search` obligatoire)

- `rag_search("TVA travaux taux 5,5 10 20 CGI 278-0 bis A 279-0 bis")`
- `rag_search("TVA 5,5 rénovation énergétique conditions exigences techniques R Uw")`
- `rag_search("attestation TVA travaux normale simplifiée logement 2 ans")`
- `rag_search("autoliquidation TVA sous-traitance BTP CGI 283-2 nonies")`
- `rag_search("TVA construction neuve 257 livraison à soi-même")`

## 3. Procédure

### Étape 1 — Qualifier l'opération

| Cas | Taux |
|---|---|
| **Construction neuve**, extension > 9 m² SHAB, surélévation créant logement, gros œuvre majeur (« remise à neuf ») | **20 %** |
| **Amélioration / transformation / aménagement / entretien** d'un **logement achevé > 2 ans** | **10 %** |
| **Amélioration de la qualité énergétique** (logement > 2 ans) + travaux **indissociables** | **5,5 %** |
| **Tertiaire / local professionnel**, travaux hors champ taux réduits | **20 %** |

### Étape 2 — Vérifier les conditions du taux réduit

- **> 2 ans** : le logement doit être **achevé depuis plus de 2 ans** (10 % et 5,5 %).
- **5,5 %** : équipement/ouvrage **techniquement éligible** (R minimum isolation, Uw ≤ 1,3 + Sw ≥ 0,30 menuiseries, PAC/chaudière condensation/biomasse/solaire/VMC double flux…) et posé par une **entreprise**.
- **Exclusions du taux réduit** : travaux conduisant à une **remise à neuf** (> 2/3 d'un élément de gros œuvre, ou augmentation > 10 % SHAB selon critères), **construction neuve**, entretien des espaces verts, équipements ménagers/mobiliers.

### Étape 3 — Attestation TVA

- Pour 10 % et 5,5 % : **attestation** du client (normale ou simplifiée selon ampleur) confirmant l'éligibilité (logement > 2 ans, nature des travaux). À **conserver** par l'entreprise.

### Étape 4 — Cas mixtes et autoliquidation

- **Devis mixte** : ventiler chaque poste à son taux (un même devis peut porter du 5,5 %, du 10 % et du 20 %). Les travaux **induits/indissociables** suivent le taux du travail principal éligible.
- **Autoliquidation BTP** (CGI 283-2 nonies) : en **sous-traitance** de travaux immobiliers, la TVA est **autoliquidée par le donneur d'ordre** — le sous-traitant facture **HT** avec mention « autoliquidation ». Ne pas appliquer de TVA sur la facture du sous-traitant.

### Étape 5 — Conversion HT ↔ TTC

- TTC = HT × (1 + taux). Par taux : ×1,055 / ×1,10 / ×1,20.
- HT = TTC / (1 + taux).

## 4. Restitution structurée

```
## Calcul de TVA travaux — [Projet / Devis]

### Qualification
- Type d'opération : [neuf / amélioration / qualité énergétique / entretien]
- Logement achevé > 2 ans : [oui/non]
- Usage : [résidence principale / secondaire / tertiaire]
- Autoliquidation (sous-traitance) : [oui/non]

### Ventilation par taux
| Poste | Montant HT | Taux TVA | Montant TVA | TTC | Justification |
|---|---|---|---|---|---|
| ... | | 5,5 / 10 / 20 % | | | CGI 278-0 bis A / 279-0 bis / 20 % |
| **TOTAL** | | — | | | |

### Attestation requise
- [Attestation normale / simplifiée] à faire signer par le client et à conserver.

### Points de vigilance
- [Remise à neuf → bascule 20 % si dépassement seuils]
- [Équipement non éligible 5,5 % → 10 %]
- [Autoliquidation : facture HT mention « autoliquidation »]
```

→ Propose `generer_rapport({ titre, contenu, format: "xlsx", agent: "economiste" })` (devis ventilé par taux) ou **DOCX** (note + attestation).

## 5. Garde-fous spécifiques

- Tu **ne confonds pas** 10 % (amélioration) et 5,5 % (qualité énergétique) — le 5,5 % exige des **caractéristiques techniques** précises.
- Tu **vérifies** systématiquement la condition « **logement achevé > 2 ans** » pour tout taux réduit.
- Tu **signales** la bascule à **20 %** en cas de **remise à neuf** (seuils gros œuvre / surface) ou de **construction neuve**.
- Tu **rappelles** l'obligation d'**attestation** client (10 %/5,5 %) à conserver par l'entreprise.
- En **sous-traitance BTP**, tu appliques l'**autoliquidation** (facture HT) — pas de TVA sur la facture du sous-traitant.
- Tu **précises** que les taux et conditions relèvent de la **doctrine fiscale en vigueur** (BOFIP) — « à confirmer à la date de facturation » en cas de doute, sans te substituer à un conseil fiscal.

## 6. Suites logiques à proposer

- Skill `estimer_renovation_energetique` (la TVA 5,5 % s'y combine avec MPR/CEE/Éco-PTZ).
- Skill `chiffrer_dpgf` pour ventiler les taux dans une DPGF complète.
- **Devis/attestation** au format DOCX/XLSX pour le client.
- Vérification de la **doctrine BOFIP** en vigueur en cas de cas limite.
