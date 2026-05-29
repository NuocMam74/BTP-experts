# RE2020 — Indicateurs, seuils et vérification d'attestation

**Source :** Arrêté du 4 août 2021 relatif aux exigences de performance énergétique et environnementale des constructions de bâtiments en France métropolitaine ; décret 2021-1004 du 29 juillet 2021 ; loi ELAN 2018-1021 (qui fonde l'évolution RT2012 → RE2020).

## Champ d'application

S'applique à tout permis de construire déposé depuis :
- **1ᵉʳ janvier 2022** : logements (maison individuelle et collectif)
- **1ᵉʳ juillet 2022** : bureaux et enseignement primaire/secondaire
- **1ᵉʳ janvier 2023** : autres tertiaires (commerce, hôtellerie, santé, sport, salles polyvalentes)
- Constructions temporaires (durée d'utilisation < 2 ans) : exclues
- Bâtiments < 50 m² SDP : non assujettis aux seuils mais soumis aux exigences de moyens

## Cinq indicateurs principaux

| Indicateur | Définition | Unité |
|---|---|---|
| **Bbio** | Besoin bioclimatique conventionnel : chauffage + refroidissement + éclairage | points (sans unité) |
| **Cep** | Consommation d'énergie primaire totale | kWh/m²/an (énergie primaire) |
| **Cep,nr** | Consommation d'énergie primaire **non renouvelable** | kWh/m²/an |
| **Ic_construction** | Impact carbone des composants de la construction (ACV cycle complet, 50 ans) | kg CO₂éq/m² |
| **Ic_énergie** | Impact carbone des consommations d'énergie sur 50 ans | kg CO₂éq/m² |
| **DH** | Degrés-heures d'inconfort estival (température > 26 °C ou 28 °C) | DH |

## Bbio — Besoin bioclimatique

Mesure la performance de l'enveloppe et la qualité architecturale (compacité, orientation, isolation, surfaces vitrées, masques) sans recours aux équipements.

**Seuil Bbio_max** : déterminé par calcul selon le **Bbio_max_moyen** propre à la typologie (MI, LC, bureaux…), avec modulations :
- Géographique (zone H1a à H3, altitude)
- Surface du logement (logements > 90 m² SHAB : malus)
- Combles aménagés
- Exposition au bruit (BR1, BR2, BR3)

## Cep et Cep,nr — Consommation d'énergie primaire

Évalue les consommations conventionnelles pour 5 usages :
- Chauffage
- Refroidissement
- Eau Chaude Sanitaire (ECS)
- Éclairage
- Auxiliaires (ventilation, pompes)

Coefficient d'énergie primaire :
- Électricité : **2,3** (au lieu de 2,58 en RT2012)
- Gaz, fioul, bois, RCU : **1,0**

Le Cep,nr **isole** la fraction non renouvelable pour favoriser EnR (bois, solaire, géothermie, RCU EnR).

**Seuils 2022** (logement MI / collectif) :
- Cep,nr_max ≈ 55 kWh/m²/an (MI) — variable selon zone climatique et altitude
- Cep,max ≈ 75 kWh/m²/an

Durcissement progressif :
- Étape 2025
- Étape 2028
- Étape 2031

## Ic_construction — Carbone construction

Analyse de cycle de vie (ACV) sur **50 ans** de référence, par étapes :
- A1-A3 : production des composants (extraction matière, transport, fabrication)
- A4-A5 : transport + mise en œuvre
- B1-B7 : usage du bâtiment (entretien, remplacement)
- C1-C4 : fin de vie (déconstruction, transport, traitement)
- D : bénéfices et charges au-delà du système (recyclage)

Données issues des **FDES** (Fiches de Déclaration Environnementale et Sanitaire — base INIES) et **PEP** (Produits d'Équipement) selon NF EN 15804+A2.

**Seuils Ic_construction_max (MI, kg CO₂éq/m²)** :
- 2022 : **640**
- 2025 : **530**
- 2028 : **475**
- 2031 : **415**

Pour collectif et tertiaire : seuils différents (cf. annexe arrêté 4 août 2021 mod.).

## Ic_énergie — Carbone des consommations

Cumul des émissions liées aux consommations énergétiques sur 50 ans :
- Facteurs d'émission par énergie (kg CO₂éq/kWh)
- Le bois et le RCU EnR sont fortement avantagés ; l'électricité a un facteur d'émission « négocié » à 79 g CO₂éq/kWh en moyenne annuelle.

## DH — Degrés-heures d'inconfort estival

Nouvel indicateur RE2020 : impose la conception bioclimatique adaptée à l'évolution climatique.

**Seuil DH_max** :
- Bas : **350 DH** (objectif de confort optimal)
- Haut : **1 250 DH** (limite haute, au-delà : non conforme)

Calculé sur une saison estivale type avec une simulation thermique dynamique conventionnelle.

## Exigences de moyens (en plus des seuils chiffrés)

- **Recours obligatoire aux EnR** pour les MI : la production d'ECS ne peut pas être 100 % électrique par effet Joule (oblige : pompe à chaleur, gaz hybride, ECS solaire, etc.).
- **Production photovoltaïque** : pas d'obligation pour MI ; pour tertiaire > 1 000 m² emprise au sol, obligation depuis loi Climat (L.171-4 CCH).
- **Comportement passif** : surfaces vitrées orientées sud + protections solaires fixes en façade ouest / sud-ouest.
- **Étanchéité à l'air** mesurée :
  - MI : Q4Pa-surf ≤ **0,60 m³/h·m²** (paroi déperditive)
  - Logement collectif : Q4Pa-surf ≤ **1,00 m³/h·m²**

## Vérification d'une attestation RE2020

L'attestation est délivrée par un bureau d'études thermiques. Elle comporte :
- Identification du projet (référence PC, adresse, MOA, MOE)
- Données géographiques (zone H1/H2/H3, altitude, classe BR)
- Surface : SHAB, SRT (Surface Référence Thermique), Surface utile
- Valeurs calculées + seuils max
- Verdict : conforme / non conforme
- Données ACV : Ic_construction, Ic_énergie

### Points de contrôle d'une attestation

1. **Identité du projet** cohérente avec le PC
2. **Zone climatique** correcte (8 zones : H1a, H1b, H1c, H2a, H2b, H2c, H2d, H3) selon arrêté 26 oct. 2010 modifié
3. **Bbio ≤ Bbio_max** (modulé)
4. **Cep,nr ≤ Cep,nr_max** (modulé)
5. **Cep ≤ Cep_max** (cap total)
6. **Ic_construction ≤ seuil de l'année** (selon date PC)
7. **Ic_énergie ≤ seuil**
8. **DH ≤ 1 250** (avec alerte au-delà de 350)
9. **Étanchéité à l'air** Q4 cohérente avec la mesure réalisée
10. **Recours EnR** confirmé (description du système ECS)

### Drapeaux rouges fréquents

- Calcul réalisé avec un **moteur non agréé** par le ministère (seuls les logiciels labellisés sont admis).
- **Surface SRT** incohérente (>10 % d'écart avec SHAB).
- Absence des **FDES** sur composants majeurs (isolation, menuiseries, structure) → l'ACV utilise alors les **Données Environnementales par Défaut (DED)** très défavorables.
- **DH > 1 250** : impose des modifications projet (protections solaires, ventilation traversante).
- **Étanchéité Q4 = valeur de défaut** (1,3) : pas de test, fragilise la conformité.

## Logiciels admis (RT/RE)

Liste publiée par le ministère. Exemples : Climawin (BBS Slama), Clima-Win Pleiades (Izuba), Perrenoud (Logiciels Perrenoud), Pleiades+Comfie (Izuba).

## Bonus de constructibilité

Art. **L.151-28 1° du Code de l'urbanisme** : majoration jusqu'à **30 %** des règles du PLU pour les bâtiments **exemplaires** en énergie ou environnement (au-delà des seuils RE2020 minimum requis).

## Citations à utiliser

- Arrêté 4 août 2021 (texte de référence RE2020 + ses annexes Méthode TH-BCE et Méthode ACV)
- Décret 2021-1004
- CCH art. L.171-1 à L.171-9 (performance énergétique)
- Loi ELAN 23 nov. 2018 art. 181
- Loi Climat & Résilience 22 août 2021 (renforcement)

**Référence à citer :** Arrêté du 4 août 2021, ses annexes et l'arrêté modifié du 26 octobre 2010 sur les zones climatiques. Source : Legifrance + RT-bâtiment (rt-batiment.fr).
