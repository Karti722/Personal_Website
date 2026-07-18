export type ProjectSummary = {
  title: string;
  summary: string;
};

/** Parses the "## Project Title" + paragraph sections of SUMMARIZE-PROJECTS.md. */
export function parseProjectSummaries(markdown: string): ProjectSummary[] {
  const sections = markdown.split(/\n##\s+/).slice(1);

  return sections.map((section) => {
    const lines = section.split("\n");
    const title = lines[0]?.trim() ?? "";
    const summary = lines.slice(1).join(" ").replace(/\s+/g, " ").trim();

    return { title, summary };
  });
}
