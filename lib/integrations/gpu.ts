// Intégration Géoportail-de-l'urbanisme + Base Adresse Nationale.
//
// APIs publiques utilisées :
//  - BAN (Base Adresse Nationale) — https://api-adresse.data.gouv.fr/
//    Géocode une adresse en coordonnées WGS84 + code INSEE de la commune.
//  - apicarto.ign.fr (IGN Géoplateforme) — endpoints `/api/gpu/*`
//    Renvoie les zonages PLU/PLUi/POS et les documents GPU couvrant un point.
//
// Aucune clé API requise pour un usage modéré (rate-limit ~50 req/s côté BAN,
// ~5 req/s côté apicarto). Si on dépasse → backoff côté appelant.

import { logger } from "@/lib/logger";

const BAN_BASE = "https://api-adresse.data.gouv.fr";
const APICARTO_GPU_BASE = "https://apicarto.ign.fr/api/gpu";

const FETCH_TIMEOUT_MS = 10_000;

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "chatbot-btp/0.1 (+https://btp-experts.local)",
        ...(init?.headers ?? {}),
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} sur ${url}`);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

// --- BAN: geocoding ---

export type GeocodeResult = {
  label: string;
  citycode: string; // INSEE
  city: string;
  postcode: string;
  coordinates: [number, number]; // [lon, lat] WGS84
  score: number;
};

type BanFeature = {
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: {
    label: string;
    citycode?: string;
    city?: string;
    postcode?: string;
    score?: number;
  };
};

export async function geocodeAddress(
  query: string,
): Promise<GeocodeResult | null> {
  const url = `${BAN_BASE}/search/?q=${encodeURIComponent(query)}&limit=1&autocomplete=0`;
  try {
    const data = await fetchJson<{ features: BanFeature[] }>(url);
    const first = data.features?.[0];
    if (!first) return null;
    return {
      label: first.properties.label,
      citycode: first.properties.citycode ?? "",
      city: first.properties.city ?? "",
      postcode: first.properties.postcode ?? "",
      coordinates: first.geometry.coordinates,
      score: first.properties.score ?? 0,
    };
  } catch (err) {
    logger.warn({ err, query }, "BAN geocoding failed");
    return null;
  }
}

// --- GPU: zoning at a point ---

export type ZoneUrba = {
  libelle: string;
  libelong: string | null;
  typezone: string | null; // U, AU, A, N, ...
  destdomi: string | null; // destination dominante
  partition: string | null; // identifiant DU (DU_<insee>)
  datapprob: string | null; // date d'approbation
  dateinfo: string | null;
  symbole: string | null;
};

type GpuFeature<P> = {
  geometry: unknown;
  properties: P;
};

export async function getZoneUrbaAtPoint(
  lon: number,
  lat: number,
): Promise<ZoneUrba[]> {
  const point = JSON.stringify({ type: "Point", coordinates: [lon, lat] });
  const url = `${APICARTO_GPU_BASE}/zone-urba?geom=${encodeURIComponent(point)}`;
  try {
    const data = await fetchJson<{ features: GpuFeature<Record<string, unknown>>[] }>(url);
    return (data.features ?? []).map((f) => {
      const p = f.properties;
      return {
        libelle: String(p.libelle ?? ""),
        libelong: (p.libelong as string | null) ?? null,
        typezone: (p.typezone as string | null) ?? null,
        destdomi: (p.destdomi as string | null) ?? null,
        partition: (p.partition as string | null) ?? null,
        datapprob: (p.datapprob as string | null) ?? null,
        dateinfo: (p.dateinfo as string | null) ?? null,
        symbole: (p.symbole as string | null) ?? null,
      };
    });
  } catch (err) {
    logger.warn({ err, lon, lat }, "GPU zone-urba lookup failed");
    return [];
  }
}

// --- GPU: SUP (servitudes d'utilité publique) at a point ---

export type ServitudeUP = {
  intitule: string;
  categorie: string | null;
  partition: string | null;
};

export async function getSupAtPoint(
  lon: number,
  lat: number,
): Promise<ServitudeUP[]> {
  const point = JSON.stringify({ type: "Point", coordinates: [lon, lat] });
  // Plusieurs catégories possibles : on couvre l'essentiel (assiettes
  // surfaciques de servitudes). Si nécessaire ajouter sup-linear / sup-point.
  const url = `${APICARTO_GPU_BASE}/assiette-sup-s?geom=${encodeURIComponent(point)}`;
  try {
    const data = await fetchJson<{ features: GpuFeature<Record<string, unknown>>[] }>(url);
    return (data.features ?? []).map((f) => ({
      intitule: String(f.properties.nomsupli ?? f.properties.libelle ?? ""),
      categorie: (f.properties.categorie as string | null) ?? null,
      partition: (f.properties.partition as string | null) ?? null,
    }));
  } catch (err) {
    logger.warn({ err, lon, lat }, "GPU SUP lookup failed");
    return [];
  }
}

// --- GPU: documents (PLU/PLUi/POS/CC) couvrant la commune ---

export type GpuDocument = {
  partition: string;
  typeDocument: string | null;
  nomDocument: string | null;
  dateApprobation: string | null;
  archiveUrl: string | null; // lien direct vers l'archive ZIP du document
};

export async function getDocumentsForCommune(
  insee: string,
): Promise<GpuDocument[]> {
  const partition = `DU_${insee}`;
  const url = `${APICARTO_GPU_BASE}/document?partition=${encodeURIComponent(partition)}`;
  try {
    const data = await fetchJson<{ features: GpuFeature<Record<string, unknown>>[] }>(url);
    return (data.features ?? []).map((f) => {
      const p = f.properties;
      return {
        partition: String(p.partition ?? partition),
        typeDocument: (p.typeref as string | null) ?? (p.typedoc as string | null),
        nomDocument: (p.nomreg as string | null) ?? (p.nomdoc as string | null),
        dateApprobation: (p.datapprob as string | null) ?? null,
        archiveUrl: (p.archive_url as string | null) ?? null,
      };
    });
  } catch (err) {
    logger.warn({ err, insee }, "GPU documents lookup failed");
    return [];
  }
}

// --- Resolver de haut niveau : adresse OU couple (lon,lat) OU INSEE ---

export type PluLookupResult = {
  source: {
    address?: string;
    coordinates?: [number, number];
    insee?: string;
  };
  geocoded: GeocodeResult | null;
  zones: ZoneUrba[];
  servitudes: ServitudeUP[];
  documents: GpuDocument[];
  warnings: string[];
};

export async function lookupPlu(input: {
  address?: string;
  lon?: number;
  lat?: number;
  insee?: string;
}): Promise<PluLookupResult> {
  const warnings: string[] = [];
  let geocoded: GeocodeResult | null = null;
  let lon = input.lon;
  let lat = input.lat;
  let insee = input.insee;

  if (input.address && (lon === undefined || lat === undefined)) {
    geocoded = await geocodeAddress(input.address);
    if (geocoded) {
      [lon, lat] = geocoded.coordinates;
      if (!insee) insee = geocoded.citycode;
    } else {
      warnings.push("Géocodage BAN sans résultat pour l'adresse fournie.");
    }
  }

  const [zones, servitudes] =
    lon !== undefined && lat !== undefined
      ? await Promise.all([getZoneUrbaAtPoint(lon, lat), getSupAtPoint(lon, lat)])
      : [[], []];

  if (lon !== undefined && lat !== undefined && zones.length === 0) {
    warnings.push(
      "Aucun zonage PLU trouvé à ce point (commune non dotée d'un PLU/PLUi déposé sur le GPU, ou point hors zonage).",
    );
  }

  const documents = insee ? await getDocumentsForCommune(insee) : [];
  if (insee && documents.length === 0) {
    warnings.push(
      `Aucun document GPU déposé pour la commune INSEE ${insee} (RNU ou commune non encore numérisée).`,
    );
  }

  return {
    source: {
      address: input.address,
      coordinates: lon !== undefined && lat !== undefined ? [lon, lat] : undefined,
      insee,
    },
    geocoded,
    zones,
    servitudes,
    documents,
    warnings,
  };
}
