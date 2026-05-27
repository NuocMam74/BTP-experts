import { z } from "zod";

export const reportFormatSchema = z.enum(["md", "docx", "xlsx", "pdf", "pptx"]);
export type ReportFormat = z.infer<typeof reportFormatSchema>;

export const sectionSchema = z.object({
  heading: z
    .string()
    .min(1)
    .describe("Titre de section (ex: 'Objet et contexte', 'Hypothèses', 'Analyse détaillée', 'Conformité PMR', 'Conclusions & recommandations')"),
  body_markdown: z
    .string()
    .describe(
      "Contenu DÉTAILLÉ de la section en Markdown — plusieurs paragraphes étoffés (vise 120 à 400 mots), pas une seule phrase. " +
        "Quantifie tout (chiffres, m², €, références d'articles/normes). Cite les sources réglementaires. " +
        "Utilise des sous-titres ### et des listes à puces pour structurer. " +
        "INTERDIT : phrases creuses, '...', 'etc.', 'à compléter', placeholders ou contenu générique. " +
        "Pour des données chiffrées tabulaires, ne les mets PAS ici en texte : utilise le champ `tables`.",
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
    .describe(
      "Noms des colonnes. Pour un chiffrage/métré/DPGF, inclure au minimum : Lot/Désignation, Quantité, Unité, Prix unitaire (€), Total (€).",
    ),
  rows: z
    .array(z.array(z.union([z.string(), z.number(), z.boolean(), z.null()])))
    .describe(
      "Lignes de données EXHAUSTIVES, alignées sur les colonnes : une ligne par poste/lot/pièce — n'omets aucun élément identifié. " +
        "Inclure une ou des lignes de sous-totaux et un TOTAL général. Mets les nombres comme nombres (pas de texte). " +
        "Ne tronque jamais avec '…' : liste toutes les lignes.",
    ),
});

export const slideSchema = z.object({
  title: z.string().min(1).describe("Titre de la diapositive"),
  bullets: z
    .array(z.string())
    .describe(
      "Puces de contenu substantielles (4 à 7 puces par diapo, une idée chiffrée/sourcée par puce — pas de puce vide ni télégraphique).",
    ),
  note_speaker: z
    .string()
    .optional()
    .describe("Note du présentateur : commentaire détaillé pour développer la diapo à l'oral."),
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
      "Sections narratives du document — obligatoire pour md/docx/pdf (sur un onglet 'Synthèse' en xlsx). " +
        "Produis un document COMPLET : vise 5 à 10 sections couvrant a minima objet/contexte, méthodologie & hypothèses, " +
        "analyse détaillée poste par poste, points de vigilance/limites, conclusions & recommandations, et sources/annexes. " +
        "Ne te limite pas à 1-2 sections.",
    ),
  tables: z
    .array(tableSchema)
    .optional()
    .describe(
      "Tableaux à inclure (XLSX : un onglet par table ; DOCX/PDF : rendus après les sections). " +
        "Dès qu'il y a des quantités/chiffres (métré, DPGF, comparatif d'offres, balance, TVA), fournis un tableau DÉTAILLÉ et complet avec totaux.",
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
