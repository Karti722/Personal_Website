"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Projects.module.css";
import { parseProjectSummaries, ProjectSummary } from "./parseProjectSummaries";
import HudBadge from "../../HudBadge";
import Reveal from "../../Reveal";
import TiltCard from "../../TiltCard";
import PixelFrame from "../../PixelFrame";
import PixelIcon from "../../PixelIcon";
import { PROJECTS, ProjectBullet } from "../../../data/portfolio";

export { PROJECTS } from "../../../data/portfolio";
export const PROJECT_COUNT = PROJECTS.length;

type ProjectDetailsProps = {
  tldr: boolean;
  isFetching: boolean;
  summary?: string;
  children: ReactNode;
};

function ProjectDetails({ tldr, isFetching, summary, children }: ProjectDetailsProps) {
  if (tldr && summary) {
    return (
      <p className={`${styles.tldrText} ${styles.detailBlock}`} key="tldr">
        {summary}
      </p>
    );
  }
  if (tldr && isFetching) {
    return <p className={styles.loadingNote}>Loading summary…</p>;
  }
  return (
    <div className={styles.detailBlock} key="full">
      {children}
    </div>
  );
}

function ProjectBulletItem({ bullet }: { bullet: ProjectBullet }) {
  if (typeof bullet === "string") {
    return <li>{bullet}</li>;
  }
  return (
    <li>
      <a href={bullet.href} target="_blank" rel="noopener noreferrer">
        {bullet.label}
      </a>
    </li>
  );
}

export default function Projects() {
  const [tldr, setTldr] = useState(true);
  const [rawMarkdown, setRawMarkdown] = useState<string | null>(null);
  const [fetchFailed, setFetchFailed] = useState(false);
  const fetchStartedRef = useRef(false);

  useEffect(() => {
    if (!tldr || rawMarkdown !== null || fetchStartedRef.current) return;

    fetchStartedRef.current = true;
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    fetch("/info/SUMMARIZE-PROJECTS.md", { signal: controller.signal })
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
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timeout);
    };
  }, [tldr, rawMarkdown]);

  const isFetching = tldr && rawMarkdown === null && !fetchFailed;

  const summaries = useMemo<ProjectSummary[] | null>(
    () => (rawMarkdown ? parseProjectSummaries(rawMarkdown) : null),
    [rawMarkdown]
  );

  return (
    <section id="projects">
      <div className="container">
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>
            <PixelIcon variant="projects" />
            Projects
          </h2>
          <button
            type="button"
            className={styles.viewToggle}
            onClick={() => setTldr((t) => !t)}
            aria-pressed={tldr}
          >
            {tldr ? "Show Full Details" : "Show TLDR Summaries"}
          </button>
        </div>

        {PROJECTS.map((project, index) => (
          <Reveal delay={index * 60} key={project.name}>
            <TiltCard>
              <PixelFrame>
                <div className={styles.project}>
                  <h3>
                    {project.url ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                    <span className={styles.statusBadge}>
                      <HudBadge tone={project.status === "Live" ? "success" : "muted"}>
                        {project.status}
                      </HudBadge>
                    </span>
                  </h3>
                  <p>
                    <em>{project.dateRange}</em>
                    {project.githubUrl && (
                      <>
                        {" "}
                        |{" "}
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          GitHub Repository
                        </a>
                      </>
                    )}
                  </p>
                  <ProjectDetails
                    tldr={tldr}
                    isFetching={isFetching}
                    summary={summaries?.[index]?.summary}
                  >
                    <ul>
                      {project.bullets.map((bullet, bulletIndex) => (
                        <ProjectBulletItem bullet={bullet} key={bulletIndex} />
                      ))}
                    </ul>
                  </ProjectDetails>
                </div>
              </PixelFrame>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
