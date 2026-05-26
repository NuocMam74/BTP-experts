import type { Tool } from "ai";

import type { LoadedAgent } from "@/lib/agent-runtime/types";

import { calcSurfacesTool } from "./calc_surfaces";
import { calculerCubaturesTool } from "./calculer_cubatures";
import { calculerRevisionPrixTool } from "./calculer_revision_prix";
import { calculerTvaTravauxTool } from "./calculer_tva_travaux";
import { makeGenererRapportTool } from "./generer_rapport";
import { makeRagSearchTool } from "./rag_search";
import { predimBetonArmeTool } from "./predim_beton_arme";
import { ratioM2Tool } from "./ratio_m2";

export function buildToolsForAgent(
  agent: LoadedAgent,
  context: { userId?: string; conversationId?: string } = {},
): Record<string, Tool> {
  const tools: Record<string, Tool> = {};

  for (const declaration of agent.tools) {
    switch (declaration.name) {
      case "calc_surfaces":
        tools.calc_surfaces = calcSurfacesTool;
        break;
      case "calculer_cubatures":
        tools.calculer_cubatures = calculerCubaturesTool;
        break;
      case "calculer_revision_prix":
        tools.calculer_revision_prix = calculerRevisionPrixTool;
        break;
      case "calculer_tva_travaux":
        tools.calculer_tva_travaux = calculerTvaTravauxTool;
        break;
      case "predim_beton_arme":
        tools.predim_beton_arme = predimBetonArmeTool;
        break;
      case "ratio_m2":
        tools.ratio_m2 = ratioM2Tool;
        break;
      case "rag_search":
        tools.rag_search = makeRagSearchTool(
          declaration.namespace ?? agent.corpus_namespace,
        );
        break;
      case "generer_rapport":
        if (context.userId) {
          tools.generer_rapport = makeGenererRapportTool({
            userId: context.userId,
            agentSlug: agent.slug,
            conversationId: context.conversationId,
          });
        }
        break;
      default:
        // eslint-disable-next-line no-console
        console.warn(
          `[tools] declared tool "${declaration.name}" has no implementation`,
        );
    }
  }

  return tools;
}
