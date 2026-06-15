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
      "Génère un document téléchargeable au format demandé (md, docx, xlsx, pdf, pptx) à partir de sections narratives, de tableaux et/ou de diapositives. " +
      "**N'appelle cet outil QUE si l'utilisateur a explicitement demandé un fichier / livrable / export dans son dernier message** (ex. « fais-moi un PDF », « exporte en Excel », « génère le rapport »). " +
      "Ne génère JAMAIS un document de ta propre initiative à la fin d'une analyse : propose-le en une phrase et attends son accord. " +
      "Le document produit doit être un livrable professionnel complet et soigneusement mis en forme (voir le standard de complétude). " +
      "Une fois généré, indique à l'utilisateur le lien de téléchargement retourné par la fonction (`download_url`), en l'incluant comme lien Markdown dans ta réponse : `[Télécharger le document](download_url)`.\n\nFormats :\n- **md** : note Markdown brute, idéal pour itération rapide\n- **docx** : rapport Word, idéal pour analyses normatives et notes formelles\n- **xlsx** : feuille de calcul Excel, idéal pour tableaux quantitatifs (métré, DPGF, comparaison offres, balance, calcul TVA)\n- **pdf** : rapport PDF, idéal pour communication finale (analyse PMR, contrôle situation, contrôle note de calcul)\n- **pptx** : présentation PowerPoint, idéal pour présenter en réunion (synthèse comité de pilotage, soutenance)",
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
