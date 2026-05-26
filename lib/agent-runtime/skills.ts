import fs from "node:fs/promises";
import path from "node:path";

const AGENTS_DIR = path.join(process.cwd(), "agents");

export async function loadSkillPrompt(
  agentSlug: string,
  skillId: string,
): Promise<string | null> {
  if (!/^[a-z0-9_-]+$/.test(skillId)) return null;
  const filePath = path.join(AGENTS_DIR, agentSlug, "skills", `${skillId}.md`);
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}
