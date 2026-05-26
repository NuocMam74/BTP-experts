export type Chunk = {
  index: number;
  content: string;
  charStart: number;
  charEnd: number;
};

const DEFAULT_MAX_CHARS = 3000;
const DEFAULT_OVERLAP_CHARS = 400;

export function chunkText(
  text: string,
  opts: { maxChars?: number; overlapChars?: number } = {},
): Chunk[] {
  const maxChars = opts.maxChars ?? DEFAULT_MAX_CHARS;
  const overlapChars = opts.overlapChars ?? DEFAULT_OVERLAP_CHARS;

  if (maxChars <= overlapChars) {
    throw new Error("maxChars must be greater than overlapChars");
  }

  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (normalized.length === 0) return [];

  if (normalized.length <= maxChars) {
    return [
      {
        index: 0,
        content: normalized,
        charStart: 0,
        charEnd: normalized.length,
      },
    ];
  }

  const chunks: Chunk[] = [];
  let cursor = 0;
  let index = 0;

  while (cursor < normalized.length) {
    let end = Math.min(cursor + maxChars, normalized.length);

    if (end < normalized.length) {
      const window = normalized.slice(cursor, end);
      const paragraphBreak = window.lastIndexOf("\n\n");
      const lineBreak = window.lastIndexOf("\n");
      const sentenceEnd = lastSentenceEnd(window);

      const breakAt = pickBreak(
        paragraphBreak,
        lineBreak,
        sentenceEnd,
        maxChars - overlapChars,
      );
      if (breakAt !== -1) {
        end = cursor + breakAt + 1;
      }
    }

    const slice = normalized.slice(cursor, end).trim();
    if (slice.length > 0) {
      chunks.push({
        index,
        content: slice,
        charStart: cursor,
        charEnd: end,
      });
      index += 1;
    }

    if (end >= normalized.length) break;
    cursor = Math.max(end - overlapChars, cursor + 1);
  }

  return chunks;
}

function lastSentenceEnd(window: string): number {
  const matches = [...window.matchAll(/[.!?]\s/g)];
  if (matches.length === 0) return -1;
  return matches[matches.length - 1]!.index ?? -1;
}

function pickBreak(
  paragraphBreak: number,
  lineBreak: number,
  sentenceEnd: number,
  minBreakAt: number,
): number {
  if (paragraphBreak >= minBreakAt) return paragraphBreak;
  if (lineBreak >= minBreakAt) return lineBreak;
  if (sentenceEnd >= minBreakAt) return sentenceEnd;
  return -1;
}
