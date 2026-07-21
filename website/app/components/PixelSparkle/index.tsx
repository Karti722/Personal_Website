"use client";

import { ReactNode } from "react";
import { useSiteSettings } from "../ThemeProvider";
import styles from "./PixelSparkle.module.css";

type PixelSparkleProps = {
  children: ReactNode;
  className?: string;
};

const PARTICLES = [0, 1, 2, 3, 4, 5];

export default function PixelSparkle({ children, className = "" }: PixelSparkleProps) {
  const { pixelArt } = useSiteSettings();

  return (
    <span className={`${styles.wrap} ${className}`}>
      {children}
      {pixelArt && (
        <span className={styles.burst} aria-hidden="true">
          {PARTICLES.map((i) => (
            <span key={i} className={`${styles.particle} ${styles[`p${i}`]}`} />
          ))}
        </span>
      )}
    </span>
  );
}
