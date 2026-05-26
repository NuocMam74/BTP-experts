import { z } from "zod";

export const reportFormatSchema = z.enum(["md", "docx", "xlsx", "pdf", "pptx"]);
export type ReportFormat = z.infer<typeof reportFormatSchema>;

export const sectionSchema = z.object({
  heading: z
    .string()
    .min(1)
    .describe("Titre de section (ex: 'Synthèse', 'Conformité PMR', etc.)"),
  body_markdown: z
    .string()
    .describe(
      "Contenu de la section en Markdown. Supporte titres ## ###, listes, tableaux | a | b |, gras **bold**, italique _it_, code `inline`.",
    ),
});

export const tableSchema = z.object({
  name: z
    .string()
    .min(1)
    .describe("Nom de la table (servira de nom d'onglet en XLSX)"),
  columns: z
    .array(z.string())
    .min(1)
    .describe("Noms des colonnes (ligne d'en-tête)"),
  rows: z
    .array(z.array(z.union([z.string(), z.number(), z.boolean(), z.null()])))
    .describe(
      "Lignes de données. Chaque ligne est un tableau de valeurs alignées sur les colonnes.",
    ),
});

export const slideSchema = z.object({
  title: z.string().min(1).describe("Titre de la diapositive"),
  bullets: z
    .array(z.string())
    .describe("Puces de contenu (une ligne par puce)"),
  note_speaker: z
    .string()
    .optional()
    .describe("Note du présentateur (optionnelle)"),
});

export const reportPayloadSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(200)
    .describe("Titre du document (affiché en haut et utilisé pour le nom de fichier)"),
  subtitle: z
    .string()
    .optional()
    .describe("Sous-titre optionnel (date, référence projet, etc.)"),
  format: reportFormatSchema,
  sections: z
    .array(sectionSchema)
    .optional()
    .describe(
      "Sections narratives du document. Obligatoire pour md/docx/pdf. Pour xlsx les sections sont mises sur un onglet 'Synthèse'.",
    ),
  tables: z
    .array(tableSchema)
    .optional()
    .describe(
      "Tableaux à inclure. Pour XLSX, chaque table = un onglet. Pour DOCX/PDF, les tables sont rendues après les sections. Recommandé en XLSX.",
    ),
  slides: z
    .array(slideSchema)
    .optional()
    .describe(
      "Diapositives — obligatoire pour le format pptx, ignoré pour les autres formats.",
    ),
});

export type ReportPayload = z.infer<typeof reportPayloadSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type Table = z.infer<typeof tableSchema>;
export type Slide = z.infer<typeof slideSchema>;
