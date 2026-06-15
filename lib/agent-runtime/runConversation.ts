import { stepCountIs, streamText, type ModelMessage } from "ai";

import { getModel } from "@/lib/llm/provider";

import { buildToolsForAgent } from "./tools";
import type { LoadedAgent } from "./types";

// Appended to every agent's system prompt: lets any agent visualise numeric data
// (CA, métré, échéancier, répartition de coûts…) by emitting a fenced ```chart
// block. The chat UI renders it as an SVG bar/line/pie chart in-place.
const CHART_INSTRUCTIONS = [
  "## Visualisation de données (graphiques)",
  "",
  "Quand des données chiffrées gagnent à être visualisées (évolution d'un chiffre d'affaires, répartition d'un budget, échéancier, comparaison de postes…), tu peux insérer un graphique dans ta réponse via un bloc de code au langage `chart` contenant un JSON :",
  "",
  "```chart",
  '{"type":"bar","title":"Chiffre d\'affaires mensuel 2024","unit":"k€","labels":["Jan","Fév","Mar"],"series":[{"name":"CA","data":[120,135,98]}]}',
  "```",
  "",
  "- `type` : `\"bar\"` (comparaison/évolution), `\"line\"` (tendance), ou `\"pie\"` (répartition d'un tout).",
  "- `labels` : étiquettes de l'axe X (ou des parts pour un camembert).",
  "- `series` : une ou plusieurs séries `{ \"name\": \"...\", \"data\": [nombres] }` ; `data` doit avoir la même longueur que `labels`. Le camembert n'utilise que la première série.",
  "- `unit` (optionnel) : unité affichée (`€`, `k€`, `%`, `m²`…).",
  "",
  "Règles : n'utilise un graphique que si les données s'y prêtent (au moins 2 points) ; base-le **uniquement** sur des chiffres réels (ceux du document fourni ou de la conversation), jamais inventés ; accompagne-le toujours d'une phrase d'analyse. Le JSON doit être valide (pas de commentaire, pas de texte hors du bloc).",
].join("\n");

export function streamAgentResponse({
  agent,
  messages,
  attachmentsContext,
  skillPrompt,
  userId,
  conversationId,
  onFinish,
  abortSignal,
}: {
  agent: LoadedAgent;
  messages: ModelMessage[];
  attachmentsContext?: string;
  skillPrompt?: string;
  userId?: string;
  conversationId?: string;
  onFinish?: (final: { text: string; toolCalls: number }) => void | Promise<void>;
  // Aborts the generation when the client disconnects / hits "Stop".
  abortSignal?: AbortSignal;
}) {
  const parts: string[] = [agent.systemPrompt, CHART_INSTRUCTIONS];

  if (skillPrompt) {
    parts.push("---", `## Skill activé pour ce tour`, skillPrompt);
  }

  if (attachmentsContext) {
    parts.push(
      "---",
      "## Documents fournis par l'utilisateur dans cette conversation",
      "",
      "Les extraits ci-dessous proviennent des documents uploadés par l'utilisateur. Ils sont **prioritaires** sur tes connaissances générales : si une information est dans ces documents, tu te bases dessus.",
      "",
      "**Comportement attendu** :",
      "1. Si l'utilisateur n'a pas encore demandé d'analyse spécifique, propose immédiatement une analyse structurée du ou des documents reçus (1 à 3 phrases d'identification : type de document, sujet, taille, points saillants détectés).",
      "2. Quand l'utilisateur pose une question, EXTRAIS d'abord les passages pertinents du document, puis vérifie le référentiel applicable via `rag_search` AVANT de répondre.",
      "3. Cite systématiquement le passage du document que tu utilises ('le PDF mentionne page X : « ... »').",
      "4. Si un document est incomplet (cotes manquantes, hypothèses non précisées), liste explicitement ce qui manque plutôt que d'inventer.",
      "",
      "**Modifier / annoter un document fourni** — si l'utilisateur demande de MODIFIER, COMPLÉTER, CORRIGER ou ANNOTER un document qu'il a uploadé, tu peux lui renvoyer le fichier modifié :",
      "- Document TEXTE ou DONNÉES (docx, xlsx, csv, txt, md, PDF-texte) → appelle l'outil `modifier_document` en passant le `source_document_id` (l'`id:` indiqué dans l'en-tête du document ci-dessous) et le contenu ENTIER modifié (sections/tableaux/diapos). C'est une régénération propre : préviens que la mise en forme d'origine n'est pas conservée à l'identique.",
      "- Document VISUEL (image jpeg/png, plan PDF) → appelle l'outil `annoter_image` avec le `document_id` et la liste des marquages (entourer, encadrer, flèche, texte) en coordonnées normalisées (0..1) estimées d'après ce que tu vois. Le repérage est approximatif : annonce-le et propose de corriger la zone. La sortie est une **image PNG** si la source est une image, et un **PDF** (pages d'origine conservées, marquages en surcouche) si la source est un PDF — affiche l'image via `![…](download_url)` ou donne le lien du PDF.",
      "- FORMULAIRE PDF à remplir (CERFA, attestation, bon à champs) → utilise `remplir_formulaire_pdf` : appelle-le d'abord SANS `fields` pour lister les champs exacts, puis rappelle-le avec les valeurs. N'invente jamais un nom de champ.",
      "- Dans tous les cas, fournis à l'utilisateur le lien/visuel retourné par l'outil. N'invente jamais un lien : appelle réellement l'outil.",
      "",
      "**Couverture universelle — ne jamais bloquer.** Quel que soit le format reçu (Word, Excel, PowerPoint, PDF, OpenDocument odt/ods/odp, RTF, CSV, texte, image, plan…), tu dois pouvoir traiter la demande :",
      "- Si le contenu texte du document est disponible ci-dessous → utilise-le et régénère via `modifier_document` (choisis le format de sortie adapté : un PowerPoint reçu peut ressortir en pptx, un tableur en xlsx, etc.).",
      "- Si c'est visuel (image/plan/PDF scanné) → `annoter_image`. Si c'est un formulaire PDF → `remplir_formulaire_pdf`.",
      "- Si le format est exotique ou que l'extraction a échoué (aucun texte fourni) → ne réponds JAMAIS « je ne peux pas » sèchement : explique la limite, propose à l'utilisateur de coller le contenu pertinent OU de fournir une version PDF/Word/Excel, et propose le livrable de sortie le plus adapté. Tu trouves toujours une voie pour répondre à la demande.",
      "",
      "### Extraits (premiers 8000 caractères par document)",
      "",
      attachmentsContext,
    );
  }

  return streamText({
    model: getModel(agent.model),
    system: parts.join("\n\n"),
    messages,
    tools: buildToolsForAgent(agent, { userId, conversationId }),
    // A realistic turn chains several rag_search calls (sourcing claims) + a
    // calculation + generer_rapport. 6 steps was too tight and could cut off the
    // agent before it cited its sources or produced the deliverable.
    stopWhen: stepCountIs(12),
    temperature: 0.2,
    // Local quantized models (Qwen2.5-VL, Llama-3, etc.) regularly drift into
    // verbatim paragraph loops on long French outputs. These penalties make
    // re-emitting the same token sequence costlier and break the loop.
    frequencyPenalty: 0.6,
    presencePenalty: 0.3,
    abortSignal,
    onFinish: async (result) => {
      if (onFinish) {
        await onFinish({
          text: result.text,
          toolCalls: result.toolCalls?.length ?? 0,
        });
      }
    },
  });
}
