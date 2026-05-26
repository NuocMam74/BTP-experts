import { tool } from "ai";
import { z } from "zod";

const roomSchema = z.object({
  name: z.string().describe("Identifiant ou nom de la pièce"),
  area_m2: z.number().positive().describe("Surface au sol de la pièce en m²"),
  ceiling_height_m: z
    .number()
    .positive()
    .describe("Hauteur sous plafond moyenne en mètres"),
  is_living_space: z
    .boolean()
    .describe(
      "Pièce d'habitation au sens de SHAB : exclut caves, garages, balcons, terrasses, combles non aménagés, parkings.",
    ),
  is_private_copro: z
    .boolean()
    .describe(
      "Partie privative en copropriété (pour Carrez) : exclut balcons, terrasses, caves, garages, emplacements de stationnement.",
    ),
  area_under_180cm_m2: z
    .number()
    .min(0)
    .default(0)
    .describe(
      "Portion de la pièce dont la hauteur sous plafond est < 1,80 m (à exclure de Carrez et SHAB selon cas).",
    ),
});

export const calcSurfacesTool = tool({
  description:
    "Calcule les surfaces réglementaires d'un logement selon les référentiels français : Surface de Plancher (SDP, R.111-22 CCH), Surface Habitable (SHAB, art. R.156-1 CCH), Surface Carrez (loi 96-1107, copropriété). Distingue strictement les exclusions de chaque référentiel.",
  inputSchema: z.object({
    rooms: z.array(roomSchema).min(1),
  }),
  execute: async ({ rooms }) => {
    let sdp = 0;
    let shab = 0;
    let carrez = 0;
    const detail: Array<{
      name: string;
      area_m2: number;
      counted_sdp: number;
      counted_shab: number;
      counted_carrez: number;
      note: string;
    }> = [];

    for (const room of rooms) {
      const surfaceUtile = room.area_m2;
      const surfaceAbove180 = Math.max(
        0,
        surfaceUtile - room.area_under_180cm_m2,
      );

      const inSdp = surfaceUtile;
      const inShab = room.is_living_space ? surfaceAbove180 : 0;
      const inCarrez =
        room.is_private_copro && room.ceiling_height_m >= 1.8
          ? surfaceAbove180
          : 0;

      sdp += inSdp;
      shab += inShab;
      carrez += inCarrez;

      const notes: string[] = [];
      if (!room.is_living_space)
        notes.push("non-habitable → exclue SHAB");
      if (!room.is_private_copro)
        notes.push("non-privative → exclue Carrez");
      if (room.area_under_180cm_m2 > 0)
        notes.push(
          `${room.area_under_180cm_m2.toFixed(2)} m² sous 1,80 m exclus de SHAB/Carrez`,
        );

      detail.push({
        name: room.name,
        area_m2: round2(surfaceUtile),
        counted_sdp: round2(inSdp),
        counted_shab: round2(inShab),
        counted_carrez: round2(inCarrez),
        note: notes.join(" ; ") || "—",
      });
    }

    return {
      totals: {
        sdp_m2: round2(sdp),
        shab_m2: round2(shab),
        carrez_m2: round2(carrez),
      },
      detail,
      references: {
        sdp: "Code de l'urbanisme art. R.111-22 (Surface de Plancher)",
        shab:
          "Code de la construction et de l'habitation art. R.156-1 (Surface habitable)",
        carrez:
          "Loi 96-1107 du 18 décembre 1996, art. 4-1 (Surface privative loi Carrez)",
      },
    };
  },
});

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
