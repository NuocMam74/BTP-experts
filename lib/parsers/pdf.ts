import { extractText, getDocumentProxy } from "unpdf";

export async function parsePdfBuffer(buffer: Buffer): Promise<{
  text: string;
  pages: number;
}> {
  const data = new Uint8Array(buffer);
  const pdf = await getDocumentProxy(data);
  const { text, totalPages } = await extractText(pdf, { mergePages: true });
  return { text, pages: totalPages };
}
