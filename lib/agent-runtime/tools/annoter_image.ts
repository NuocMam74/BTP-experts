import { tool } from "ai";
import { and, eq } from "drizzle-orm";
import fs from "node:fs/promises";
import { z } from "zod";

import { db, schema } from "@/lib/db/client";
import { logger } from "@/lib/logger";
import { annotateDocument, type Annotation } from "@/lib/parsers/annotate";
import { overlayAnnotationsOnPdf, type PdfAnnotation } from "@/lib/parsers/pdf-edit";
import { saveBinaryReport } from "@/lib/reports";

const annotationSchema = z.object({
  type: z
    .enum(["circle", "rectangle", "arrow", "text"])
    .describe(
      "Type de marquage : 'circle' (entourer), 'rectangle' (encadrer), 'arrow' (flèche vers un élément), 'text' (annotation textuelle).",
    ),
  x: z
    .number()
    .min(0)
    .max(1)
    .describe(
      "Position horizontale du coin haut-gauche de la zone, NORMALISÉE entre 0 (bord gauche) et 1 (bord droit). Pour une flèche, c'est le point de départ.",
    ),
  y: z
    .number()
    .min(0)
    .max(1)
    .describe(
      "Position verticale du coin haut-gauche, NORMALISÉE entre 0 (haut) et 1 (bas). Pour une flèche, c'est le point de départ.",
    ),
  width: z
    .number()
    .min(0)
    .max(1)
    .describe(
      "Largeur de la zone, normalisée (0..1). Pour une flèche, déplacement horizontal jusqu'à la pointe (peut être ~0 pour une flèche verticale).",
    ),
  height: z
    .number()
    .min(0)
    .max(1)
    .describe(
      "Hauteur de la zone, normalisée (0..1). Pour une flèche, déplacement vertical jusqu'à la pointe.",
    ),
  label: z
    .string()
    .optional()
    .describe(
      "Texte optionnel affiché près du marquage (obligatoire pour le type 'text').",
    ),
  color: z
    .enum(["red", "blue", "green", "orange", "black", "yellow", "white"])
    .optional()
    .describe("Couleur du marquage (défaut : red)."),
  page: z
    .number()
    .int()
    .min(1)
    .optional()
    .describe("Pour un PDF multi-page : page (1-indexée) où dessiner ce marquage. Défaut : la page indiquée au niveau racine, sinon 1."),
});

const inputSchema = z.object({
  document_id: z
    .string()
    .describe(
      "Identifiant du document uploadé à annoter (fourni dans le contexte des documents, champ `id:`). Doit être une image ou un PDF.",
    ),
  page: z
    .number()
    .int()
    .min(1)
    .optional()
    .describe("Numéro de page (1-indexé) à annoter pour un PDF mono-cible. Défaut : 1. Tu peux aussi préciser la page par marquage."),
  title: z
    .string()
    .optional()
    .describe("Titre du livrable annoté (sert au nom de fichier)."),
  annotations: z
    .array(annotationSchema)
    .min(1)
    .describe(
      "Liste des marquages à dessiner sur le plan/l'image. Place-les en te basant sur ce que tu VOIS dans l'image jointe ; estime les coordonnées normalisées au mieux.",
    ),
});

export function makeAnnoterImageTool(args: {
  userId: string;
  agentSlug: string;
  conversationId?: string;
}) {
  return tool({
    description:
      "Annote un document VISUEL uploadé (image jpeg/png OU plan/PDF) : entoure, encadre, pointe par une flèche ou ajoute du texte/tampon sur des éléments précis. " +
      "Sortie : une **image PNG** si la source est une image ; un **PDF** (pages d'origine préservées, marquages ajoutés en surcouche vectorielle) si la source est un PDF. " +
      "À utiliser quand l'utilisateur demande de marquer/entourer/repérer/tamponner quelque chose sur un plan, une image ou un PDF. " +
      "Tu DOIS d'abord regarder le document joint pour situer les éléments, puis fournir les coordonnées NORMALISÉES (0..1, origine en haut-gauche) de chaque marquage ; pour un PDF multi-page, précise la `page` de chaque marquage. " +
      "Honnêteté : les coordonnées sont estimées à l'œil — si le plan est dense ou la cible ambiguë, annonce que le repérage est approximatif et propose à l'utilisateur de préciser la zone. " +
      "Après génération : si la sortie est une image, affiche-la en Markdown `![Plan annoté](download_url)` ; si c'est un PDF, donne le lien `[📥 Télécharger le PDF annoté](download_url)`.",
    inputSchema,
    execute: async (input) => {
      if (!args.conversationId) {
        return {
          success: false,
          error: "Aucune conversation active — impossible de retrouver le document.",
        };
      }

      // Load the document and verify it belongs to THIS conversation (ownership
      // is enforced through the conversation, like /api/documents).
      const doc = await db.query.documents.findFirst({
        where: and(
          eq(schema.documents.id, input.document_id),
          eq(schema.documents.conversationId, args.conversationId),
        ),
      });
      if (!doc) {
        return {
          success: false,
          error:
            "Document introuvable dans cette conversation. Utilise l'identifiant `id:` indiqué dans le contexte des documents.",
        };
      }

      const kind = (doc.metadata as { kind?: string } | null)?.kind;
      const isImage = kind === "image" || (doc.mimeType ?? "").startsWith("image/");
      const isPdf = kind === "pdf" || doc.mimeType === "application/pdf";
      if (!isImage && !isPdf) {
        return {
          success: false,
          error: `Ce document (${kind ?? "type inconnu"}) n'est pas annotable : seules les images et les PDF le sont. Pour un document texte (docx/xlsx…), utilise l'outil de modification de document.`,
        };
      }

      let buffer: Buffer;
      try {
        buffer = await fs.readFile(doc.storagePath);
      } catch (err) {
        logger.warn({ err, documentId: doc.id }, "annotate: file read failed");
        return {
          success: false,
          error: "Fichier source introuvable sur le disque.",
        };
      }

      const baseName = doc.filename.replace(/\.[^.]+$/, "");
      const title = input.title?.trim() || `${baseName} - annoté`;
      const defaultPage = input.page ?? 1;

      // --- PDF source → vector overlay on the original PDF, returned as PDF ---
      if (isPdf) {
        let pdfBytes: Uint8Array;
        try {
          pdfBytes = await overlayAnnotationsOnPdf(
            buffer,
            input.annotations.map((a) => ({ ...a, page: a.page ?? defaultPage })) as PdfAnnotation[],
          );
        } catch (err) {
          logger.warn({ err, documentId: doc.id }, "annotate pdf: overlay failed");
          return {
            success: false,
            error: err instanceof Error ? err.message : "Échec de l'annotation du PDF.",
          };
        }
        const saved = await saveBinaryReport({
          userId: args.userId,
          agentSlug: args.agentSlug,
          conversationId: args.conversationId,
          format: "pdf",
          title,
          buffer: Buffer.from(pdfBytes),
          metadata: {
            source_document_id: doc.id,
            source_filename: doc.filename,
            annotations: input.annotations.length,
          },
        });
        return {
          success: true,
          report_id: saved.id,
          format: saved.format,
          filename: saved.filename,
          size_kb: Math.round(saved.sizeBytes / 102.4) / 10,
          download_url: saved.downloadUrl,
          annotations_drawn: input.annotations.length,
          usage_instruction:
            "Donne le lien de téléchargement du PDF annoté : `[📥 Télécharger " +
            saved.filename +
            "](" +
            saved.downloadUrl +
            ")`. Rappelle que le repérage est approximatif et invite l'utilisateur à corriger si besoin.",
        };
      }

      // --- Image source → raster canvas, returned as PNG ---------------------
      let result;
      try {
        result = await annotateDocument({
          buffer,
          kind: "image",
          page: defaultPage,
          annotations: input.annotations as Annotation[],
        });
      } catch (err) {
        logger.warn({ err, documentId: doc.id }, "annotate: drawing failed");
        return {
          success: false,
          error: err instanceof Error ? err.message : "Échec de l'annotation de l'image.",
        };
      }

      const saved = await saveBinaryReport({
        userId: args.userId,
        agentSlug: args.agentSlug,
        conversationId: args.conversationId,
        format: "png",
        title,
        buffer: result.png,
        metadata: {
          source_document_id: doc.id,
          source_filename: doc.filename,
          annotations: input.annotations.length,
          width: result.width,
          height: result.height,
        },
      });

      return {
        success: true,
        report_id: saved.id,
        format: saved.format,
        filename: saved.filename,
        size_kb: Math.round(saved.sizeBytes / 102.4) / 10,
        download_url: saved.downloadUrl,
        annotations_drawn: input.annotations.length,
        usage_instruction:
          "Affiche l'image annotée dans ta réponse via la syntaxe Markdown image : `![" +
          title +
          "](" +
          saved.downloadUrl +
          ")`. Rappelle que le repérage des éléments est approximatif et invite l'utilisateur à corriger si besoin.",
      };
    },
  });
}
