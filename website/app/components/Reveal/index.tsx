"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./Reveal.module.css";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "fade" | "wipe";
};

export default function Reveal({ children, delay = 0, className = "", variant = "fade" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variantClass = variant === "wipe" ? styles.wipe : styles.fade;

  // The observed element must stay geometrically "plain" — Chromium's
  // IntersectionObserver can under-report intersection ratio for a target
  // whose own clip-path/opacity already zeroes its rendered area, which
  // deadlocks a scroll-reveal (never visible because never observed as
  // intersecting). So clip-path/opacity live on an inner div instead.
  return (
    <div ref={ref} className={className}>
      <div
        className={`${styles.reveal} ${variantClass} ${visible ? styles.visible : ""}`}
        style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      >
        {children}
      </div>
    </div>
  );
}
