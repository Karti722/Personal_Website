"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Experience.module.css";
import { parseDetailedExperience, DetailedJob } from "./parseDetailedExperience";
import { renderInlineMarkdown } from "./renderInlineMarkdown";
import HudBadge from "../../HudBadge";
import PixelIcon from "../../PixelIcon";
import Reveal from "../../Reveal";
import TiltCard from "../../TiltCard";
import PixelFrame from "../../PixelFrame";
import { JOBS } from "../../../data/portfolio";

export { JOBS } from "../../../data/portfolio";

export default function Experience() {
  const [detailed, setDetailed] = useState(false);
  const [rawMarkdown, setRawMarkdown] = useState<string | null>(null);
  const [fetchFailed, setFetchFailed] = useState(false);
  const fetchStartedRef = useRef(false);

  useEffect(() => {
    if (!detailed || rawMarkdown !== null || fetchStartedRef.current) return;

    fetchStartedRef.current = true;
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    fetch("/info/DETAILED-WORK-EXPERIENCE.md", { signal: controller.signal })
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
            <Reveal delay={index * 60} key={job.company}>
              <TiltCard>
                <PixelFrame>
                  <div className={styles.job}>
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
                </PixelFrame>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
