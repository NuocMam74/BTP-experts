import type { ReportPayload } from "../types";
import { frenchToday, isNumericValue } from "./theme";

export function generateMarkdown(payload: ReportPayload): Buffer {
  const lines: string[] = [];

  lines.push(`# ${payload.title}`);
  if (payload.subtitle) {
    lines.push("");
    lines.push(`_${payload.subtitle}_`);
  }
  lines.push("");
  lines.push(`_Généré le ${frenchToday()}_`);
  lines.push("");
  lines.push("---");
  lines.push("");

  if (payload.sections && payload.sections.length > 0) {
    for (const section of payload.sections) {
      lines.push(`## ${section.heading}`);
      lines.push("");
      lines.push(section.body_markdown);
      lines.push("");
    }
  }

  if (payload.tables && payload.tables.length > 0) {
    for (const table of payload.tables) {
      lines.push(`### ${table.name}`);
      lines.push("");
      // Right-align columns whose data cells are all numeric.
      const numericCol = table.columns.map((_, i) =>
        table.rows.length > 0 &&
        table.rows.every((r) => {
          const v = r[i] ?? null;
          return v === null || v === "" || isNumericValue(v);
        }),
      );
      lines.push("| " + table.columns.join(" | ") + " |");
      lines.push(
        "|" + table.columns.map((_, i) => (numericCol[i] ? "---:" : "---")).join("|") + "|",
      );
      for (const row of table.rows) {
        lines.push(
          "| " + row.map((c) => (c === null ? "" : String(c))).join(" | ") + " |",
        );
      }
      lines.push("");
    }
  }

  lines.push("");
  lines.push("---");
  lines.push("_Document généré automatiquement — à valider par un professionnel._");

  return Buffer.from(lines.join("\n"), "utf8");
}
