import { tool } from "ai";

import { generateReport } from "@/lib/reports";
import { reportPayloadSchema } from "@/lib/reports/types";

export function makeGenererRapportTool(args: {
  userId: string;
  agentSlug: string;
  conversationId?: string;
}) {
  return tool({
    description:
      "Génère un document téléchargeable au format demandé (md, docx, xlsx, pdf, pptx) à partir de sections narratives, de tableaux et/ou de diapositives. À utiliser quand l'utilisateur demande explicitement un rapport / une note / un tableau / une présentation, OU quand l'analyse produit un livrable structuré qui mérite d'être archivé. Une fois généré, indique à l'utilisateur le lien de téléchargement retourné par la fonction (`download_url`), en l'incluant comme lien Markdown dans ta réponse : `[Télécharger le document](download_url)`.\n\nFormats :\n- **md** : note Markdown brute, idéal pour itération rapide\n- **docx** : rapport Word, idéal pour analyses normatives et notes formelles\n- **xlsx** : feuille de calcul Excel, idéal pour tableaux quantitatifs (métré, DPGF, comparaison offres, balance, calcul TVA)\n- **pdf** : rapport PDF, idéal pour communication finale (analyse PMR, contrôle situation, contrôle note de calcul)\n- **pptx** : présentation PowerPoint, idéal pour présenter en réunion (synthèse comité de pilotage, soutenance)",
    inputSchema: reportPayloadSchema,
    execute: async (payload) => {
      const result = await generateReport({
        userId: args.userId,
        agentSlug: args.agentSlug,
        conversationId: args.conversationId,
        payload,
      });
      return {
        success: true,
        report_id: result.id,
        format: result.format,
        filename: result.filename,
        size_kb: Math.round(result.sizeBytes / 102.4) / 10,
        download_url: result.downloadUrl,
        usage_instruction:
          "Inclus le lien de téléchargement dans ta réponse à l'utilisateur sous la forme Markdown : `[📥 Télécharger " +
          result.filename +
          "](" +
          result.downloadUrl +
          ")`. Précise aussi le format et la taille.",
      };
    },
  });
}
