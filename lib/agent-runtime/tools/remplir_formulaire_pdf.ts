import { tool } from "ai";
import { and, eq } from "drizzle-orm";
import fs from "node:fs/promises";
import { z } from "zod";

import { db, schema } from "@/lib/db/client";
import { logger } from "@/lib/logger";
import { fillPdfFormFields, listPdfFormFields } from "@/lib/parsers/pdf-edit";
import { saveBinaryReport } from "@/lib/reports";

const inputSchema = z.object({
  document_id: z
    .string()
    .describe(
      "Identifiant (`id:` dans le contexte des documents) du PDF de formulaire uploadé (CERFA, attestation, bon de commande à champs…).",
    ),
  fields: z
    .array(
      z.object({
        name: z.string().describe("Nom EXACT du champ de formulaire (tel que listé par l'outil)."),
        value: z
          .string()
          .describe(
            "Valeur à inscrire. Pour une case à cocher : 'oui'/'true'/'x' pour cocher, autre chose pour décocher. Pour une liste : l'option exacte.",
          ),
      }),
    )
    .optional()
    .describe(
      "Champs à remplir. **Laisse vide pour d'abord LISTER les champs disponibles du PDF** (leurs noms + types) ; appelle ensuite à nouveau l'outil avec les valeurs.",
    ),
  flatten: z
    .boolean()
    .optional()
    .describe("Si true, aplatit le formulaire (valeurs figées, non modifiables). Défaut : false (reste éditable)."),
  title: z.string().optional().describe("Titre du livrable (nom de fichier)."),
});

export function makeRemplirFormulairePdfTool(args: {
  userId: string;
  agentSlug: string;
  conversationId?: string;
}) {
  return tool({
    description:
      "Remplit les champs d'un formulaire PDF uploadé (CERFA, attestation, bon…) et renvoie le PDF complété. " +
      "Workflow en deux temps : **1)** appelle d'abord l'outil SANS `fields` pour obtenir la liste exacte des champs (noms + types) ; **2)** rappelle-le avec `fields` = paires {name, value} en utilisant les noms exacts. " +
      "N'invente jamais un nom de champ : utilise ceux retournés à l'étape 1. Si un PDF n'a aucun champ de formulaire, dis-le à l'utilisateur (utilise alors `annoter_image` pour y apposer du texte en surcouche).",
    inputSchema,
    execute: async (input) => {
      if (!args.conversationId) {
        return { success: false, error: "Aucune conversation active — impossible de retrouver le document." };
      }

      const doc = await db.query.documents.findFirst({
        where: and(
          eq(schema.documents.id, input.document_id),
          eq(schema.documents.conversationId, args.conversationId),
        ),
      });
      if (!doc) {
        return {
          success: false,
          error: "Document introuvable dans cette conversation. Utilise l'identifiant `id:` du contexte des documents.",
        };
      }
      const isPdf = (doc.metadata as { kind?: string } | null)?.kind === "pdf" || doc.mimeType === "application/pdf";
      if (!isPdf) {
        return { success: false, error: "Ce document n'est pas un PDF : le remplissage de formulaire ne s'applique qu'aux PDF." };
      }

      let buffer: Buffer;
      try {
        buffer = await fs.readFile(doc.storagePath);
      } catch (err) {
        logger.warn({ err, documentId: doc.id }, "form-fill: file read failed");
        return { success: false, error: "Fichier source introuvable sur le disque." };
      }

      // --- Step 1: no fields provided → list available fields ----------------
      if (!input.fields || input.fields.length === 0) {
        let fields;
        try {
          fields = await listPdfFormFields(buffer);
        } catch (err) {
          logger.warn({ err, documentId: doc.id }, "form-fill: list failed");
          return { success: false, error: "Impossible de lire les champs du PDF (fichier corrompu ou protégé ?)." };
        }
        if (fields.length === 0) {
          return {
            success: false,
            no_form_fields: true,
            error:
              "Ce PDF ne contient aucun champ de formulaire interactif. Pour y inscrire du texte, utilise l'outil `annoter_image` (surcouche de texte aux coordonnées voulues).",
          };
        }
        return {
          success: true,
          listing: true,
          fields,
          usage_instruction:
            "Voici les champs du formulaire. Rappelle l'outil avec `fields` = [{name, value}] en utilisant ces noms EXACTS pour remplir le PDF.",
        };
      }

      // --- Step 2: fill ------------------------------------------------------
      let result;
      try {
        result = await fillPdfFormFields(
          buffer,
          input.fields.map((f) => ({ name: f.name, value: f.value })),
          input.flatten ?? false,
        );
      } catch (err) {
        logger.warn({ err, documentId: doc.id }, "form-fill: fill failed");
        return { success: false, error: err instanceof Error ? err.message : "Échec du remplissage du formulaire." };
      }

      const baseName = doc.filename.replace(/\.[^.]+$/, "");
      const title = input.title?.trim() || `${baseName} - rempli`;
      const saved = await saveBinaryReport({
        userId: args.userId,
        agentSlug: args.agentSlug,
        conversationId: args.conversationId,
        format: "pdf",
        title,
        buffer: Buffer.from(result.pdf),
        metadata: {
          source_document_id: doc.id,
          source_filename: doc.filename,
          filled: result.filled.length,
          missing: result.missing,
        },
      });

      return {
        success: true,
        report_id: saved.id,
        format: saved.format,
        filename: saved.filename,
        size_kb: Math.round(saved.sizeBytes / 102.4) / 10,
        download_url: saved.downloadUrl,
        filled_fields: result.filled,
        missing_fields: result.missing,
        available_fields: result.available,
        usage_instruction:
          (result.missing.length > 0
            ? `Attention : ${result.missing.length} champ(s) introuvable(s) (${result.missing.join(", ")}) — vérifie les noms via la liste retournée. `
            : "") +
          "Donne le lien : `[📥 Télécharger " +
          saved.filename +
          "](" +
          saved.downloadUrl +
          ")` et récapitule les champs remplis.",
      };
    },
  });
}
