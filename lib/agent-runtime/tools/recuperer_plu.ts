import { tool } from "ai";
import { z } from "zod";

import { lookupPlu } from "@/lib/integrations/gpu";

export const recupererPluTool = tool({
  description:
    "Récupère automatiquement le zonage PLU/PLUi, les servitudes d'utilité publique et les documents d'urbanisme couvrant une adresse, des coordonnées WGS84 ou un code INSEE. Source : Géoportail-de-l'urbanisme via apicarto.ign.fr + Base Adresse Nationale. À utiliser AVANT toute analyse de faisabilité ou d'instruction PC pour cadrer ce qui s'applique réellement à la parcelle.",
  inputSchema: z
    .object({
      address: z
        .string()
        .min(5)
        .optional()
        .describe(
          "Adresse postale française complète (ex: '12 rue Victor Hugo, 75001 Paris'). Géocodée via la BAN.",
        ),
      lon: z
        .number()
        .min(-180)
        .max(180)
        .optional()
        .describe("Longitude WGS84 (utilisé si address absent)."),
      lat: z
        .number()
        .min(-90)
        .max(90)
        .optional()
        .describe("Latitude WGS84 (utilisé si address absent)."),
      insee: z
        .string()
        .regex(/^[0-9AB]{5}$/i)
        .optional()
        .describe(
          "Code INSEE 5 caractères de la commune (utile pour lister les documents d'urbanisme).",
        ),
    })
    .refine(
      (v) => Boolean(v.address || (v.lon !== undefined && v.lat !== undefined) || v.insee),
      { message: "Fournis au minimum une adresse, un couple (lon,lat) ou un code INSEE." },
    ),
  execute: async (input) => {
    const result = await lookupPlu(input);

    return {
      source: result.source,
      adresse_geocodee: result.geocoded
        ? {
            label: result.geocoded.label,
            commune: result.geocoded.city,
            code_postal: result.geocoded.postcode,
            insee: result.geocoded.citycode,
            coordonnees_wgs84: result.geocoded.coordinates,
            score_geocodage: result.geocoded.score,
          }
        : null,
      zonage_au_point: result.zones.map((z) => ({
        libelle: z.libelle,
        libelle_long: z.libelong,
        type_zone: z.typezone,
        destination_dominante: z.destdomi,
        date_approbation: z.datapprob,
        document_partition: z.partition,
      })),
      servitudes_utilite_publique: result.servitudes,
      documents_urbanisme_commune: result.documents.map((d) => ({
        type: d.typeDocument,
        nom: d.nomDocument,
        date_approbation: d.dateApprobation,
        archive_url: d.archiveUrl,
      })),
      warnings: result.warnings,
      // Garde-fou méthodo pour l'agent.
      note_methodologique:
        "Ces données proviennent du Géoportail-de-l'urbanisme via apicarto.ign.fr et de la BAN. Elles N'ATTESTENT PAS de la conformité d'une opération : le document local (règlement écrit + plan graphique) doit toujours être vérifié — pour cela, fournis l'archive_url à l'utilisateur ou demande-lui de joindre le règlement de zone correspondant.",
    };
  },
});
