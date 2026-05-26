import { createOpenAI } from "@ai-sdk/openai";
import { stepCountIs, streamText, type ModelMessage } from "ai";

import { buildToolsForAgent } from "./tools";
import type { LoadedAgent } from "./types";

const openai = createOpenAI({
  baseURL: process.env.OPENAI_API_BASE_URL ?? "http://localhost:1234/v1",
  apiKey: process.env.OPENAI_API_KEY ?? "lm-studio",
});

const MODEL_ID = process.env.OPENAI_MODEL ?? "local-model";

export function streamAgentResponse({
  agent,
  messages,
  attachmentsContext,
  skillPrompt,
  userId,
  conversationId,
  onFinish,
}: {
  agent: LoadedAgent;
  messages: ModelMessage[];
  attachmentsContext?: string;
  skillPrompt?: string;
  userId?: string;
  conversationId?: string;
  onFinish?: (final: { text: string; toolCalls: number }) => void | Promise<void>;
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
    model: openai(MODEL_ID),
    system: parts.join("\n\n"),
    messages,
    tools: buildToolsForAgent(agent, { userId, conversationId }),
    stopWhen: stepCountIs(6),
    temperature: 0.2,
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
