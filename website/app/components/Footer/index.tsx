"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id="more-info" className={styles.footer}>
      <div className="container">
        <p className={styles.footerNote}>
          Note: This portfolio is built using Next.js, TypeScript
          and deployed on Vercel.
        </p>
        <a
          href="https://github.com/Karti722/Personal_Website"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerLink}
        >
          Portfolio Codebase 📟
        </a>
      </div>
    </footer>
  );
}