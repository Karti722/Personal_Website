"use client";

import { ReactNode } from "react";
import { useSiteSettings } from "../ThemeProvider";
import styles from "./PixelFrame.module.css";

type PixelFrameProps = {
  children: ReactNode;
  className?: string;
};

export default function PixelFrame({ children, className = "" }: PixelFrameProps) {
  const { pixelArt } = useSiteSettings();

  return (
    <div className={`${styles.frame} ${className}`}>
      {children}
      {pixelArt && (
        <>
          <span className={`${styles.corner} ${styles.tl}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.tr}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.bl}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.br}`} aria-hidden="true" />
        </>
      )}
    </div>
  );
}
