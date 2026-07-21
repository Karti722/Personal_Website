"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Experience.module.css";
import { parseDetailedExperience, DetailedJob } from "./parseDetailedExperience";
import { renderInlineMarkdown } from "./renderInlineMarkdown";
import HudBadge from "../../HudBadge";
import PixelIcon from "../../PixelIcon";

type JobSummary = {
  role: string;
  company: string;
  url: string;
  summaryPoints: string[];
  date: string;
};

export const JOBS: JobSummary[] = [
  {
    role: "AI Enabler Apprentice",
    company: "Redminds",
    url: "https://rediminds.com/",
    summaryPoints: ["Full Stack IRO Software Development"],
    date: "Jan 12th, 2026 – July 10th, 2026",
  },
  {
    role: "Software Developer",
    company: "UCSC BLUEPRINT",
    url: "https://www.ucscblueprint.com/",
    summaryPoints: ["React Development"],
    date: "Feb 1st, 2024 – Feb 12th, 2026",
  },
  {
    role: "Full Stack Developer Intern",
    company: "PACR",
    url: "https://pacr.co/",
    summaryPoints: ["Search API Integration"],
    date: "Jul 15th, 2025 – Dec 15th, 2025",
  },
  {
    role: "Webmaster",
    company: "CruzHacks 2025",
    url: "https://cruzhacks.com/",
    summaryPoints: ["Landing Page Component Development"],
    date: "Oct 1st, 2024 – Apr 12th, 2025",
  },
  {
    role: "Backend Developer Intern",
    company: "SKYIT (Subsidiary of GBCS Group)",
    url: "https://skyit.services/",
    summaryPoints: ["API Testing and Debugging"],
    date: "Apr 1st, 2024 – Aug 15th, 2024",
  },
  {
    role: "Software Engineer Intern",
    company: "CodeDay",
    url: "https://labs.codeday.org/",
    summaryPoints: ["Unit Conversion Testing"],
    date: "Oct 1st, 2023 – Dec 15th, 2023",
  },
];

export default function Experience() {
  const [detailed, setDetailed] = useState(false);
  const [rawMarkdown, setRawMarkdown] = useState<string | null>(null);
  const [fetchFailed, setFetchFailed] = useState(false);
  const fetchStartedRef = useRef(false);

  useEffect(() => {
    if (!detailed || rawMarkdown !== null || fetchStartedRef.current) return;

    fetchStartedRef.current = true;
    let cancelled = false;

    fetch("/info/DETAILED-WORK-EXPERIENCE.md")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setRawMarkdown(text);
      })
      .catch(() => {
        if (!cancelled) {
          fetchStartedRef.current = false;
          setFetchFailed(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [detailed, rawMarkdown]);

  const isFetching = detailed && rawMarkdown === null && !fetchFailed;

  const detailedJobs = useMemo<DetailedJob[] | null>(
    () => (rawMarkdown ? parseDetailedExperience(rawMarkdown) : null),
    [rawMarkdown]
  );

  return (
    <section id="experience">
      <div className="container">
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>
            <PixelIcon variant="experience" />
            Experience
          </h2>
          <button
            type="button"
            className={styles.viewToggle}
            onClick={() => setDetailed((d) => !d)}
            aria-pressed={detailed}
          >
            {detailed ? "Show Summary" : "Detailed Experience"}
          </button>
        </div>

        {JOBS.map((job, index) => {
          const detail = detailedJobs?.[index];

          return (
            <div className={styles.job} key={job.company}>
              <h3>
                {job.role} @{" "}
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  {job.company}
                </a>
                {index === 0 && (
                  <span className={styles.latestBadge}>
                    <HudBadge tone="success">Latest</HudBadge>
                  </span>
                )}
              </h3>

              {detailed && detail ? (
                <ul key="detail" className={styles.detailBlock}>
                  {detail.bullets.map((bullet, i) => (
                    <li key={i}>{renderInlineMarkdown(bullet)}</li>
                  ))}
                </ul>
              ) : detailed && isFetching ? (
                <p className={styles.loadingNote}>Loading detailed experience…</p>
              ) : (
                <ul key="summary" className={styles.detailBlock}>
                  {job.summaryPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}

              <p>
                <em>{job.date}</em>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
