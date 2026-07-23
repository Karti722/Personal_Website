"use client";

import { useEffect } from "react";
import { useSiteSettings } from "../ThemeProvider";
import styles from "./PixelClickBurst.module.css";

const PARTICLE_COUNT = 6;
const RADIUS = 20;
const CLEANUP_MS = 900;

export default function PixelClickBurst() {
  const { pixelArt } = useSiteSettings();

  useEffect(() => {
    if (!pixelArt) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleClick = (event: MouseEvent) => {
      const burst = document.createElement("div");
      burst.className = styles.burst;
      burst.style.left = `${event.clientX}px`;
      burst.style.top = `${event.clientY}px`;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
        const particle = document.createElement("span");
        particle.className = styles.particle;
        particle.style.setProperty("--tx", `${Math.cos(angle) * RADIUS}px`);
        particle.style.setProperty("--ty", `${Math.sin(angle) * RADIUS}px`);
        particle.style.animationDelay = `${i * 15}ms`;
        burst.appendChild(particle);
      }

      document.body.appendChild(burst);
      window.setTimeout(() => burst.remove(), CLEANUP_MS);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pixelArt]);

  return null;
}
