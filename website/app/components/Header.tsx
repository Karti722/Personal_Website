"use client";

import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header id="header" className={styles.header}>
      <div className="container">
        <div className={styles.profileSection}>
          <Image
            src="/photos/karti.png"
            alt="Kartikeya Kumaria Profile Photo"
            className={styles.profilePhoto}
            width={150}
            height={150}
          />
          <div className={styles.profileInfo}>
            <h1 className={styles.title}>Kartikeya Kumaria</h1>
            <p className={styles.textLine}>
              Reach out to me at
              <a
                href="mailto:kartikeyaku@gmail.com"
                className={styles.inlineLink}
              >
                kartikeyaku@gmail.com
              </a>
            </p>
            <p className={styles.textLine}>
              <a
                href="https://linkedin.com/in/kartikeya-kumaria"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                LinkedIn
              </a>{" "}
              |{" "}
              <a
                href="https://github.com/karti722"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}