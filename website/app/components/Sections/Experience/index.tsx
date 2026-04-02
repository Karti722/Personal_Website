"use client";

import styles from "./Experience.module.css";

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <h2>Experience</h2>
        
        {/* REDMINDS */}
        <div className={styles.job}>
          <h3>
            AI Enabler Apprentice @{" "}
            <a
              href="https://rediminds.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redminds
            </a>
          </h3>
          <p>
            <em>Jan 2026 – Present</em>
          </p>
        </div>

        {/* UCSC BLUEPRINT */}
        <div className={styles.job}>
          <h3>
            Software Developer @{" "}
            <a
              href="https://www.ucscblueprint.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              UCSC BLUEPRINT
            </a>
          </h3>
          <p>
            <em>Feb 2024 – Feb 2026</em>
          </p>
        </div>

        {/* PACR */}
        <div className={styles.job}>
          <h3>
            Full Stack Developer Intern @{" "}
            <a
              href="https://pacr.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              PACR
            </a>
          </h3>
          <p>
            <em>Jul 2025 – Dec 2025</em>
          </p>
        </div>

        {/* CRUZHACKS */}
        <div className={styles.job}>
          <h3>
            Webmaster @{" "}
            <a
              href="https://cruzhacks.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CruzHacks 2025
            </a>
          </h3>
          <p>
            <em>Oct 2024 – Apr 2025</em>
          </p>
        </div>
        

        {/* SKYIT */}
        <div className={styles.job}>
          <h3>
            Backend Developer Intern @{" "}
            <a
              href="https://skyit.services/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SKYIT (Subsidiary of GBCS Group)
            </a>
          </h3>
          <p>
            <em>Apr 2024 – Aug 2024</em>
          </p>
        </div>

        {/* CODEDAY */}
        <div className={styles.job}>
          <h3>
            Software Engineer Intern @{" "}
            <a
              href="https://labs.codeday.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CodeDay
            </a>
          </h3>
          <p>
            <em>Oct 2023 – Dec 2023</em>
          </p>
        </div>
      </div>
    </section>
  );
}