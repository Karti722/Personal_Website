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
              Welcome to my Portfolio!
            </p>
            <div className={styles.socialLinks} aria-label="Contact links">
              <a
                href="mailto:kartikeyaku@gmail.com"
                className={styles.iconLink}
                aria-label="Send email to Kartikeya"
              >
                <Image
                  src="/SVGs/email.svg"
                  alt=""
                  width={30}
                  height={30}
                  aria-hidden="true"
                  className={`${styles.socialIcon} ${styles.iconEmail}`}
                />
              </a>
              <a
                href="https://linkedin.com/in/kartikeya-kumaria"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="Open LinkedIn profile"
              >
                <Image
                  src="/SVGs/linkedin.svg"
                  alt=""
                  width={30}
                  height={30}
                  aria-hidden="true"
                  className={`${styles.socialIcon} ${styles.iconLinkedin}`}
                />
              </a>
              <a
                href="https://github.com/karti722"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="Open GitHub profile"
              >
                <Image
                  src="/SVGs/github.svg"
                  alt=""
                  width={30}
                  height={30}
                  aria-hidden="true"
                  className={`${styles.socialIcon} ${styles.iconGithub}`}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}