# Chatbot BTP

Plateforme SaaS d'agents conversationnels spécialisés pour les métiers du BTP (architecte, MOEX, économiste, géomètre-expert, ingénieur structure, expert-comptable BTP).

> Cible commerciale : cabinets d'architectes, BET, maîtres d'œuvre, entreprises générales BTP.

Voir [SPEC_AGENTS_BTP.md](./SPEC_AGENTS_BTP.md) pour la spécification produit complète.

---

## Stack technique (local-first)

| Composant | Choix actuel | Note |
|---|---|---|
| App | Next.js 14 (App Router) + TypeScript strict | Single app, pas de monorepo |
| Styling | Tailwind CSS | shadcn/ui prévu plus tard |
| DB | SQLite + Drizzle ORM | Migration future vers Postgres+pgvector |
| Vecteurs (RAG) | extension `sqlite-vec` (table vec0, 1024d) | KNN par MATCH operator |
| Auth | Auth.js v5 (Credentials + JWT) | OIDC à ajouter pour le B2B |
| LLM | LM Studio (local) via SDK OpenAI (`ai` v6) | Chat + embeddings dans le même serveur |
| Parsing | `unpdf` pour PDF | DWG / IFC en phase ultérieure |
| Tests | Vitest | Coverage v8 dispo |

---

## Démarrage

### 1. Prérequis

- **Node.js 20+** (testé sur Node 24)
- **LM Studio** avec deux modèles chargés :
  - Un modèle de **chat** supportant le function calling (Qwen2.5-Instruct, Mistral, Llama 3.x, etc.)
  - Un modèle d'**embeddings** multilingue 1024 dimensions (recommandé : `BAAI/bge-m3` ou `intfloat/multilingual-e5-large`)
- Activer **Local Server** dans LM Studio (port 1234 par défaut)

> **Lecture d'images / PDF scannés (vision).** Les fichiers texte (DOCX, XLSX, PDF-texte, CSV…)
> sont lus avec n'importe quel modèle de chat. Pour lire des **images** (JPEG/PNG) ou des
> **PDF scannés/plans**, charge un modèle **multimodal** (ex. `qwen2.5-vl-7b-instruct`) et
> mets `OPENAI_VISION=true` dans `.env.local`. Sans cela, l'app n'enverra pas l'image au
> modèle (pour éviter une réponse inventée) et invitera l'utilisateur à charger un modèle de vision.

### 2. Installation

```powershell
npm install
```

### 3. Variables d'environnement

```powershell
copy .env.example .env.local
```

Adapte ensuite :
- `OPENAI_MODEL` → nom du modèle de chat servi par LM Studio
- `EMBEDDING_MODEL` → nom du modèle d'embeddings (par défaut `text-embedding-bge-m3`)
- `OPENAI_VISION` → `true` si le modèle chargé est multimodal (lecture d'images/PDF scannés)

### 4. Migration de la base

```powershell
npm run db:generate   # génère les migrations à partir du schéma Drizzle
npm run db:migrate    # applique les migrations sur data/app.db
```

### 5. Indexer le corpus

```powershell
npm run ingest                 # ingère tous les agents
npm run ingest economiste      # ingère un agent précis
```

L'ingestion lit `agents/<slug>/corpus/*.md`, chunke, embedde via LM Studio, et insère dans la table virtuelle `corpus_chunks_vec`. Idempotent (purge les chunks précédents de l'agent avant ré-ingestion).

### 6. Lancer en dev

```powershell
npm run dev
```

Puis [http://localhost:3000](http://localhost:3000). Crée un compte → choisis un agent → discute.

### 7. Tests

```powershell
npm test              # vitest run
npm run test:watch    # mode watch
npm run typecheck     # tsc --noEmit
```

---

## Structure du projet

```
.
├── app/                                # Next.js App Router
│   ├── (auth)/{signin,signup,signout}/ # Pages d'auth
│   ├── api/{auth,chat,upload}/         # Routes API
│   ├── chat/                           # /chat = historique, /chat/[slug] = conversation
│   └── page.tsx                        # Home : liste des agents + statut LM Studio
├── components/                         # UI partagés (badges header, statut LLM)
├── lib/
│   ├── agent-runtime/                  # Manifest, runtime, outils, chunking, preambule, skills
│   ├── auth/                           # passwords (bcryptjs)
│   ├── db/                             # Drizzle schema, client SQLite+vec, messages helpers
│   ├── llm/                            # Client LM Studio, embeddings
│   └── parsers/                        # unpdf
├── agents/                             # Un dossier par agent
│   ├── architecte/
│   │   ├── manifest.json
│   │   ├── system.md
│   │   ├── corpus/                     # Markdown indexé en RAG
│   │   └── skills/                     # Prompts par skill (calculer_surfaces.md, etc.)
│   └── economiste/                     # idem
├── infra/ingest/                       # Script d'ingestion corpus → embeddings → vec0
├── drizzle/                            # Migrations SQL générées
├── tests/                              # Vitest
├── data/                               # SQLite + uploads (gitignored)
├── auth.config.ts                      # Auth.js edge-safe config
├── auth.ts                             # Auth.js full config (Node + DB)
├── middleware.ts                       # Protection des routes
└── SPEC_AGENTS_BTP.md                  # Spec produit
```

---

## Agents disponibles

Les 6 agents sont implémentés : system prompt, corpus normatif indexé (≈ 85–92 chunks chacun) et skills rédigés.

| Agent | Skills clés | Statut |
|---|---|---|
| **Architecte DPLG / HMONP** | Calculer surfaces (SDP/SHAB/Carrez), Analyser PLU, RE2020, Monter dossier d'autorisation, Vérifier ERP | Opérationnel (~18 skills) |
| **Économiste de la construction** | Métré quantitatif, Chiffrer DPGF, Sous-détail de prix, Ratio m², Comparer offres, Réviser prix, TVA travaux | Opérationnel (~18 skills) |
| **MOEX (maîtrise d'œuvre d'exécution)** | Viser plan EXE, Contrôle situation/DTU, OS, Réserves OPR, Révision, Compte prorata, Sous-traitance | Opérationnel (~22 skills) |
| **Géomètre-expert** | Bornage, Division parcellaire, EDD copropriété, Servitudes, Cubatures, DT/DICT, Fiscalité foncière | Opérationnel (~17 skills) |
| **Ingénieur structure** | Prédim béton/poutre/poteau, Descente de charges, Zonage sismique, Stabilité au feu, Assemblages acier, Pathologie béton | Opérationnel (~21 skills) |
| **Expert-comptable BTP** | Situations de travaux, Autoliquidation, Sous-traitance 1975, Paie BTP, TVA, Trésorerie, Facturation électronique | Opérationnel (~21 skills) |

## Outils outillés disponibles

| Tool | Description | Utilisé par |
|---|---|---|
| `rag_search` | Recherche hybride (sémantique vec0 + lexicale BM25/FTS5, fusion RRF) dans le corpus de l'agent | Tous |
| `generer_rapport` | Génère un livrable téléchargeable (PDF/DOCX/XLSX/PPTX) | Tous (si activé) |
| `calc_surfaces` | Calcule SDP / SHAB / Carrez avec exclusions correctes (h < 1,80 m, copropriété, etc.) | Architecte |
| `ratio_m2` | Fourchette indicative €/m² SDP par destination et région (logement, bureaux, ERP, etc.) | Économiste |
| `calculer_revision_prix` | Révision/actualisation de prix (index BT, formule de révision) | Économiste, MOEX |
| `calculer_tva_travaux` | Détermine le taux de TVA travaux applicable (5,5 / 10 / 20 %) | Économiste, Expert-comptable |
| `calculer_cubatures` | Calcul de cubatures / terrassements | Géomètre |
| `predim_beton_arme` | Prédimensionnement béton armé (poutre / poteau / dalle) | Ingénieur structure |
| `recuperer_plu` | Interroge apicarto.ign.fr + api-adresse.data.gouv.fr (Géoportail-de-l'urbanisme) | Architecte |

---

## Migration future vers Supabase + pgvector

Quand l'app sera fonctionnelle et qu'on aura des premiers clients, la migration se fera par :

1. Conversion du schéma Drizzle SQLite → Postgres (types `vector(1024)` natifs, `jsonb` natif).
2. Bascule du client `drizzle/better-sqlite3` → `drizzle/postgres-js`.
3. Import des données SQLite via `pgloader` ou script custom.
4. Activation RLS Supabase au niveau des migrations.

La séparation actuelle (`lib/db/client.ts`, `lib/llm/embeddings.ts`) rend la bascule indolore.

---

## Ce qu'il reste à faire

Voir issues GitHub / TODO interne. Principaux chantiers avant une vraie mise en production SaaS :

- Migration SQLite → Postgres + pgvector (l'app est aujourd'hui mono-instance : SQLite et le rate-limiter en mémoire ne supportent pas le multi-instance / serverless)
- Stripe + entitlements (`user_agents`) en production
- Mode B2B : organizations, équipes, SSO (OIDC)
- Durcissement auth : vérification email, reset mot de passe, rate-limit anti-bruteforce sur le login
- Conformité : mentions légales, CGU, RGPD/DPA, hébergement des documents clients
- Observabilité (Sentry déjà câblé, optionnel via `SENTRY_DSN` + PostHog)
- Approfondir le corpus normatif (Eurocodes, DTU, BOFIP)
