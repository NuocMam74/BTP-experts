import { tool } from "ai";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db, schema } from "@/lib/db/client";
import { generateReport } from "@/lib/reports";
import { reportPayloadSchema } from "@/lib/reports/types";

// The modification tool reuses the full report payload (sections / tables /
// slides) — the model produces the COMPLETE modified content and we regenerate a
// fresh, downloadable file. It is NOT an in-place byte edit: original formatting
// (styles, Excel formulas, exact layout) is rebuilt from content, not preserved.
const inputSchema = reportPayloadSchema.extend({
  source_document_id: z
    .string()
    .optional()
    .describe(
      "Identifiant (`id:` dans le contexte des documents) du document uploadé servant de base à la modification. Optionnel mais recommandé pour la traçabilité.",
    ),
});

export function makeModifierDocumentTool(args: {
  userId: string;
  agentSlug: string;
  conversationId?: string;
}) {
  return tool({
    description:
      "Modifie / complète / corrige / reformate un document TEXTE ou DONNÉES uploadé par l'utilisateur (docx, xlsx, csv, txt, md, ou PDF-texte) et renvoie la version modifiée téléchargeable. À utiliser quand l'utilisateur demande d'ajouter/supprimer/corriger/compléter/reformater le contenu d'un document qu'il a fourni (ex. « ajoute une colonne TVA », « corrige les fautes », « complète le tableau », « reformule la section 3 »). " +
      "Méthode : pars du contenu extrait du document (fourni dans le contexte), applique EXACTEMENT la modification demandée, et renvoie le document ENTIER modifié via `sections`/`tables`/`slides` — ne tronque rien, ne remplace pas par des placeholders. " +
      "Choisis `format` identique à celui du document source quand c'est pertinent (xlsx pour un tableur, docx pour un document Word, etc.). " +
      "Limite à signaler à l'utilisateur : il s'agit d'une régénération propre du contenu — la mise en forme d'origine (styles, formules Excel, mise en page exacte) n'est pas conservée à l'identique. " +
      "Une fois généré, inclus le lien de téléchargement Markdown dans ta réponse : `[📥 Télécharger le document modifié](download_url)`.",
    inputSchema,
    execute: async (input) => {
      const { source_document_id, ...payload } = input;

      // If a source id is given, verify it belongs to this conversation — purely
      // for traceability/metadata; modification works off the in-context text.
      let sourceFilename: string | null = null;
      if (source_document_id && args.conversationId) {
        const doc = await db.query.documents.findFirst({
          where: and(
            eq(schema.documents.id, source_document_id),
            eq(schema.documents.conversationId, args.conversationId),
          ),
        });
        sourceFilename = doc?.filename ?? null;
      }

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
        source_filename: sourceFilename,
        usage_instruction:
          "Inclus le lien de téléchargement dans ta réponse sous forme Markdown : `[📥 Télécharger " +
          result.filename +
          "](" +
          result.downloadUrl +
          ")`. Précise ce qui a été modifié et rappelle que la mise en forme d'origine n'est pas conservée à l'identique.",
      };
    },
  });
}
