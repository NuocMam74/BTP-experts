import { describe, expect, it } from "vitest";

import { chunkText } from "@/lib/agent-runtime/chunking";

describe("chunkText", () => {
  it("returns an empty array for empty input", () => {
    expect(chunkText("")).toEqual([]);
    expect(chunkText("   \n\n  ")).toEqual([]);
  });

  it("returns a single chunk when text fits in one window", () => {
    const text = "Bonjour, ceci est un texte court.";
    const chunks = chunkText(text);
    expect(chunks).toHaveLength(1);
    expect(chunks[0]!.content).toBe(text);
    expect(chunks[0]!.charStart).toBe(0);
    expect(chunks[0]!.charEnd).toBe(text.length);
  });

  it("splits a long text into overlapping chunks", () => {
    const paragraph = "Article premier. Texte de référence à indexer pour les tests RAG. ";
    const text = paragraph.repeat(120);
    const chunks = chunkText(text, { maxChars: 1000, overlapChars: 150 });

    expect(chunks.length).toBeGreaterThanOrEqual(3);

    for (let i = 1; i < chunks.length; i += 1) {
      const prev = chunks[i - 1]!;
      const next = chunks[i]!;
      expect(next.charStart).toBeLessThan(prev.charEnd);
      expect(next.content.length).toBeGreaterThan(0);
      expect(next.content.length).toBeLessThanOrEqual(1000);
    }
  });

  it("indexes chunks sequentially starting at 0", () => {
    const text = "a".repeat(5000);
    const chunks = chunkText(text, { maxChars: 1000, overlapChars: 100 });
    chunks.forEach((c, i) => expect(c.index).toBe(i));
  });

  it("rejects overlap >= maxChars", () => {
    expect(() => chunkText("x".repeat(2000), { maxChars: 500, overlapChars: 500 })).toThrow();
  });
});
