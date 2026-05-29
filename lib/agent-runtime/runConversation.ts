import { stepCountIs, streamText, type ModelMessage } from "ai";

import { getModel } from "@/lib/llm/provider";

import { buildToolsForAgent } from "./tools";
import type { LoadedAgent } from "./types";

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
  const parts: string[] = [agent.systemPrompt];

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
