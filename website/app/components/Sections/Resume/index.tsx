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
              href="https://drive.google.com/file/d/1QBODjHS9p59_QOiNmgSQYhegF6KLsR--/view?usp=sharing"
              target="_blank"
              className={`${styles.resumeBtn} ${styles.viewBtn}`}
            >
              View on Google Drive
            </a>
          </div>
          <div className={styles.resumeEmbed}>
            <iframe
              src="/pdfs/Kartikeya_Resume.pdf#toolbar=1&navpanes=0&zoom=0"
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