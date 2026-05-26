import type { ReportPayload } from "../types";

export function generateMarkdown(payload: ReportPayload): Buffer {
  const lines: string[] = [];

  lines.push(`# ${payload.title}`);
  if (payload.subtitle) {
    lines.push("");
    lines.push(`_${payload.subtitle}_`);
  }
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
      lines.push("| " + table.columns.join(" | ") + " |");
      lines.push("|" + table.columns.map(() => "---").join("|") + "|");
      for (const row of table.rows) {
        lines.push(
          "| " + row.map((c) => (c === null ? "" : String(c))).join(" | ") + " |",
        );
      }
      lines.push("");
    }
  }

  return Buffer.from(lines.join("\n"), "utf8");
}
