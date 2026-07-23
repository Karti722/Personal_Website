"use client";

import { useState } from "react";
import styles from "./Projects.module.css";
import HudBadge from "../../HudBadge";
import Reveal from "../../Reveal";
import TiltCard from "../../TiltCard";
import PixelFrame from "../../PixelFrame";
import PixelIcon from "../../PixelIcon";
import PixelSparkle from "../../PixelSparkle";
import { PROJECTS, ProjectBullet } from "../../../data/portfolio";

export { PROJECTS } from "../../../data/portfolio";
export const PROJECT_COUNT = PROJECTS.length;

function ProjectDetails({ tldr, project }: { tldr: boolean; project: (typeof PROJECTS)[number] }) {
  if (tldr) {
    return (
      <p className={`${styles.tldrText} ${styles.detailBlock}`} key="tldr">
        {project.summary}
      </p>
    );
  }
  return (
    <div className={styles.detailBlock} key="full">
      <ul>
        {project.bullets.map((bullet, bulletIndex) => (
          <ProjectBulletItem bullet={bullet} key={bulletIndex} />
        ))}
      </ul>
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

  return (
    <section id="projects">
      <div className="container">
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>
            <PixelIcon variant="projects" />
            Projects
          </h2>
          <PixelSparkle>
            <button
              type="button"
              className={styles.viewToggle}
              onClick={() => setTldr((t) => !t)}
              aria-pressed={tldr}
            >
              {tldr ? "Show Full Details" : "Show TLDR Summaries"}
            </button>
          </PixelSparkle>
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
                  <ProjectDetails tldr={tldr} project={project} />
                </div>
              </PixelFrame>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
