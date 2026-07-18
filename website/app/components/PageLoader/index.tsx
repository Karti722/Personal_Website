"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./PageLoader.module.css";

const MIN_VISIBLE_MS = 500;
const FADE_MS = 300;

export default function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    setVisible(true);
    setFadingOut(false);

    const fadeTimer = setTimeout(() => setFadingOut(true), MIN_VISIBLE_MS);
    const hideTimer = setTimeout(() => setVisible(false), MIN_VISIBLE_MS + FADE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.overlay} ${fadingOut ? styles.fadeOut : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.spinner} />
      <span className={styles.srOnly}>Loading…</span>
    </div>
  );
}
