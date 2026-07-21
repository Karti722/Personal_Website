"use client";
import styles from "./Resume.module.css";
import PixelFrame from "../../PixelFrame";
import PixelIcon from "../../PixelIcon";

export default function Resume() {
  return (
    <section id="resume">
      <div className="container">
        <h2 className={styles.heading}>
          <PixelIcon variant="resume" />
          Resume
        </h2>
        <div className={styles.resumeContainer}>
          <div className={styles.resumeActions}>
            <a
              href="https://drive.google.com/file/d/1JO34pdET8FLmVvrzHKqVx5TB7A4WIAot/view?usp=sharing"
              target="_blank"
              className={`${styles.resumeBtn} ${styles.viewBtn}`}
            >
              View on Google Drive
            </a>
          </div>
          <PixelFrame>
            <div className={styles.resumeEmbed}>
              <iframe
                src="/pdfs/Kartikeya_Resume.pdf#toolbar=1&navpanes=0&zoom=0"
                title="Kartikeya Kumaria Resume"
                width="100%"
                height="600"
                className={styles.resumeFrame}
              ></iframe>
            </div>
          </PixelFrame>
        </div>
      </div>
    </section>
  );
}
