export type DetailedJob = {
  role: string;
  company: string;
  companyUrl: string;
  dateRange: string;
  bullets: string[];
};

/** Parses the "## Role @ [Company](url)" sections of DETAILED-WORK-EXPERIENCE.md. */
export function parseDetailedExperience(markdown: string): DetailedJob[] {
  const sections = markdown.split(/\n##\s+/).slice(1);

  return sections.map((section) => {
    const lines = section.split("\n").map((line) => line.trim());
    const heading = lines[0] ?? "";

    const linkMatch = heading.match(/\[([^\]]+)\]\(([^)]+)\)/);
    const company = linkMatch?.[1] ?? "";
    const companyUrl = linkMatch?.[2] ?? "";
    const role = heading.split(" @ ")[0]?.trim() ?? heading;

    const dateLine = lines.find((line) => line.startsWith("*") && line.endsWith("*"));
    const dateRange = dateLine ? dateLine.replace(/^\*+|\*+$/g, "") : "";

    const bullets = lines
      .filter((line) => line.startsWith("- "))
      .map((line) => line.slice(2).trim());

    return { role, company, companyUrl, dateRange, bullets };
  });
}
