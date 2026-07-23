"use client";

import { useState } from "react";
import PixelIcon from "../../PixelIcon";
import TiltCard from "../../TiltCard";
import PixelFrame from "../../PixelFrame";
import PixelSparkle from "../../PixelSparkle";
import { ABOUT, UNIVERSITY } from "../../../data/portfolio";
import styles from "./About.module.css";

export default function About() {
  const [isTLDR, setIsTLDR] = useState(false);

  return (
    <section id="about">
      <div className="container">
        <h2 className={styles.heading}>
          <PixelIcon variant="about" />
          About Me
        </h2>

        <div className={styles.actions}>
          <PixelSparkle>
            <button
              onClick={() => setIsTLDR(!isTLDR)}
              className={styles.toggleBtn}
            >
              {isTLDR ? "Full Version" : "TLDR Summary"}
            </button>
          </PixelSparkle>
          <PixelSparkle>
            <a
              href="/pdfs/Kartikeya_Portfolio.pdf"
              download
              className={styles.pdfBtn}
            >
              Print Portfolio as PDF
            </a>
          </PixelSparkle>
        </div>

        <TiltCard>
          <PixelFrame>
            {!isTLDR ? (
              <p key="full" className={styles.textFade}>
                {ABOUT.full.before}
                <a href={UNIVERSITY.url} target="_blank" rel="noopener noreferrer">
                  {UNIVERSITY.name}
                </a>
                {ABOUT.full.after}
              </p>
            ) : (
              <p key="tldr" className={styles.textFade}>
                {ABOUT.tldr.before}
                <a href={UNIVERSITY.url} target="_blank" rel="noopener noreferrer">
                  {UNIVERSITY.name}
                </a>
                {ABOUT.tldr.after}
              </p>
            )}
          </PixelFrame>
        </TiltCard>
      </div>
    </section>
  );
}