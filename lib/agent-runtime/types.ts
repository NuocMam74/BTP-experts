import { z } from "zod";

export const reportFormatEnum = z.enum(["md", "docx", "xlsx", "pdf", "pptx"]);

export const agentSkillSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  output_formats: z
    .array(reportFormatEnum)
    .optional()
    .describe(
      "Formats de livrables que ce skill produit typiquement. Affichés en sous-titre du bouton dans l'UI.",
    ),
});

export const agentToolSchema = z.object({
  name: z.string(),
  type: z.enum(["javascript_function", "vector_search"]),
  namespace: z.string().optional(),
});

export const agentManifestSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be lowercase kebab-case"),
  name: z.string(),
  tagline: z.string(),
  presentation: z
    .string()
    .optional()
    .describe(
      "Présentation de l'agent affichée à l'ouverture (écran d'accueil), propre à son métier. Si absent, une présentation générique est dérivée du nom/tagline.",
    ),
  version: z.string(),
  model: z.string(),
  stripe_price_id: z.string().optional(),
  monthly_price_eur: z.number().int().nonnegative(),
  accepted_documents: z.array(z.string()),
  skills: z.array(agentSkillSchema),
  tools: z.array(agentToolSchema),
  corpus_namespace: z.string(),
  system_prompt_path: z.string(),
});

export type AgentSkill = z.infer<typeof agentSkillSchema>;
export type AgentTool = z.infer<typeof agentToolSchema>;
export type AgentManifest = z.infer<typeof agentManifestSchema>;

export type LoadedAgent = AgentManifest & {
  systemPrompt: string;
  rootPath: string;
};
