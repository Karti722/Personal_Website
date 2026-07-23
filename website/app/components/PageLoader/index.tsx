"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSiteSettings } from "../ThemeProvider";
import styles from "./PageLoader.module.css";

const MIN_VISIBLE_MS = 500;
const FADE_MS = 300;
const PIXEL_BLOCKS = [0, 1, 2, 3, 4];

function PageLoaderInner() {
  const { pixelArt } = useSiteSettings();
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  // Remounted per-navigation via `key={pathname}` in the wrapper below, so
  // state above always starts fresh — no reset-on-effect needed here.
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadingOut(true), MIN_VISIBLE_MS);
    const hideTimer = setTimeout(() => setVisible(false), MIN_VISIBLE_MS + FADE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`${styles.overlay} ${fadingOut ? styles.fadeOut : ""}`}
      role="status"
      aria-live="polite"
    >
      {pixelArt ? (
        <div className={styles.pixelBar} aria-hidden="true">
          {PIXEL_BLOCKS.map((i) => (
            <span key={i} className={styles.pixelBlock} style={{ animationDelay: `${i * 90}ms` }} />
          ))}
        </div>
      ) : (
        <div className={styles.spinner} />
      )}
      <span className={styles.srOnly}>Loading…</span>
    </div>
  );
}

export default function PageLoader() {
  const pathname = usePathname();
  return <PageLoaderInner key={pathname} />;
}
