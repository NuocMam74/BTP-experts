import type { Tool } from "ai";

import { logger } from "@/lib/logger";
import type { LoadedAgent } from "@/lib/agent-runtime/types";

import { calcSurfacesTool } from "./calc_surfaces";
import { calculerCubaturesTool } from "./calculer_cubatures";
import { calculerRevisionPrixTool } from "./calculer_revision_prix";
import { calculerTvaTravauxTool } from "./calculer_tva_travaux";
import { makeAnnoterImageTool } from "./annoter_image";
import { makeGenererRapportTool } from "./generer_rapport";
import { makeModifierDocumentTool } from "./modifier_document";
import { makeRagSearchTool } from "./rag_search";
import { makeRemplirFormulairePdfTool } from "./remplir_formulaire_pdf";
import { predimBetonArmeTool } from "./predim_beton_arme";
import { ratioM2Tool } from "./ratio_m2";
import { recupererPluTool } from "./recuperer_plu";

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
      case "recuperer_plu":
        tools.recuperer_plu = recupererPluTool;
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
      // modifier_document / annoter_image are registered globally below (they are
      // cross-cutting capabilities available to every agent), so a manifest may
      // declare them but it is not required — skip the "no implementation" warn.
      case "modifier_document":
      case "annoter_image":
      case "remplir_formulaire_pdf":
        break;
      default:
        logger.warn(
          { tool: declaration.name, agent: agent.slug },
          "declared tool has no implementation",
        );
    }
  }

  // Document modification & image annotation are cross-cutting: ANY agent must be
  // able to edit a document the user uploaded and hand it back. They need a user
  // (to own the produced file), so they are added whenever a userId is present,
  // regardless of the manifest's tool list.
  if (context.userId) {
    tools.modifier_document = makeModifierDocumentTool({
      userId: context.userId,
      agentSlug: agent.slug,
      conversationId: context.conversationId,
    });
    tools.annoter_image = makeAnnoterImageTool({
      userId: context.userId,
      agentSlug: agent.slug,
      conversationId: context.conversationId,
    });
    tools.remplir_formulaire_pdf = makeRemplirFormulairePdfTool({
      userId: context.userId,
      agentSlug: agent.slug,
      conversationId: context.conversationId,
    });
  }

  return tools;
}
