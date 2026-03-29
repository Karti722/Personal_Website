"use client";

import styles from "./Resume.module.css";

export default function Resume() {
  return (
    <section id="resume">
      <div className="container">
        <h2>Resume</h2>
        <div className={styles.resumeContainer}>
          <div className={styles.resumeActions}>
            <a
              href="/files/Kartikeya_Resume.pdf"
              target="_blank"
              className={`${styles.resumeBtn} ${styles.downloadBtn}`}
            >
              <span>📄</span> Download Resume
            </a>
            <a
              href="https://drive.google.com/file/d/1hA4tV1gZL9JFTqkCwex9sDhYuLdzoLdb/view?usp=sharing"
              target="_blank"
              className={`${styles.resumeBtn} ${styles.viewBtn}`}
            >
              <span>👀</span> View Full Screen
            </a>
          </div>
          <div className={styles.resumeEmbed}>
            <iframe
              src="/files/Kartikeya_Resume.pdf#toolbar=1&navpanes=0&zoom=0"
              title="Kartikeya Kumaria Resume"
              width="100%"
              height="600"
              className={styles.resumeFrame}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}