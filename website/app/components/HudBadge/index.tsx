import { ReactNode } from "react";
import styles from "./HudBadge.module.css";

type HudBadgeProps = {
  children: ReactNode;
  tone?: "accent" | "success" | "muted";
};

export default function HudBadge({ children, tone = "accent" }: HudBadgeProps) {
  const toneClass =
    tone === "success" ? styles.success : tone === "muted" ? styles.muted : styles.accent;

  return (
    <span className={`${styles.badge} ${toneClass}`}>
      {tone === "success" && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
}
