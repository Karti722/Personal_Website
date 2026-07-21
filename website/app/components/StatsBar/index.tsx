"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { JOBS } from "../Sections/Experience";
import { PROJECT_COUNT } from "../Sections/Projects";
import { CERT_COUNT } from "../Sections/Certifications";
import Reveal from "../Reveal";
import styles from "./StatsBar.module.css";

const STATS = [
  {
    label: "Roles Held",
    value: JOBS.length,
    icon: "briefcase" as const,
    href: "/experience",
    cta: "View experience",
  },
  {
    label: "Projects Shipped",
    value: PROJECT_COUNT,
    icon: "code" as const,
    href: "/projects",
    cta: "View projects",
  },
  {
    label: "Certifications",
    value: CERT_COUNT,
    icon: "certificate" as const,
    href: "/certifications",
    cta: "View certifications",
  },
];

const COUNT_MS = 900;

function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

function StatIcon({ kind }: { kind: "briefcase" | "code" | "certificate" }) {
  if (kind === "briefcase") {
    return (
      <svg viewBox="0 0 20 20" className={styles.icon} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <rect x="2.5" y="6" width="15" height="10.5" rx="1.5" />
        <path d="M7 6V4.5A1.5 1.5 0 0 1 8.5 3h3A1.5 1.5 0 0 1 13 4.5V6" />
        <path d="M2.5 10.5h15" />
      </svg>
    );
  }
  if (kind === "code") {
    return (
      <svg viewBox="0 0 20 20" className={styles.icon} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 6 2.5 10 7 14" />
        <path d="M13 6l4.5 4-4.5 4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" className={styles.icon} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="7" r="4.5" />
      <path d="M7 10.8 5.5 17l4.5-2.3L14.5 17l-1.5-6.2" />
    </svg>
  );
}

export default function StatsBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(() => STATS.map(() => 0));
  const startedRef = useRef(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      requestAnimationFrame(() => setCounts(STATS.map((s) => s.value)));
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 0 : COUNT_MS;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
          const eased = easeOutQuad(progress);
          setCounts(STATS.map((s) => Math.round(s.value * eased)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.wrap}>
      <div className="container">
        <div className={styles.bar} aria-label="Portfolio stats" ref={barRef}>
          {STATS.map((stat, i) => (
            <Reveal delay={i * 80} key={stat.label}>
              <Link href={stat.href} className={styles.stat} aria-label={stat.cta}>
                <span className={styles.iconWrap}>
                  <StatIcon kind={stat.icon} />
                </span>
                <div className={styles.statText}>
                  <span className={styles.value}>{counts[i]}</span>
                  <span className={styles.label}>{stat.label}</span>
                </div>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
