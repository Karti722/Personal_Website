"use client";

import { useSiteSettings } from "../ThemeProvider";
import styles from "./PixelIcon.module.css";

type PixelIconProps = {
  variant: "about" | "skills" | "experience" | "projects" | "certifications" | "resume";
  className?: string;
};

// Small pixel-art icons (SVG, not a bitmap font, so they stay crisp at any
// size). "about" is a face; the rest are simple objects tied to each page.
const GRIDS: Record<PixelIconProps["variant"], string[]> = {
  about: [
    "011111110",
    "111111111",
    "111111111",
    "110111011",
    "111111111",
    "101111101",
    "111000111",
    "111111111",
    "011111110",
  ],
  // Gear/cog.
  skills: ["0010100", "0111110", "1100011", "0100010", "1100011", "0111110", "0010100"],
  // Briefcase — handle + case.
  experience: ["0011100", "0011100", "1111111", "1111111", "1111111", "1111111", "1111111"],
  // Rocket — nose, body, fins, thrusters.
  projects: ["0001000", "0011100", "0011100", "0011100", "0011100", "0111110", "0010100"],
  // Trophy.
  certifications: ["1111111", "1111111", "0111110", "0111110", "0011100", "0111110", "1111111"],
  // Floppy disk.
  resume: ["1111111", "1000101", "1111111", "1000001", "1111111", "1100111", "1111111"],
};

export default function PixelIcon({ variant, className = "" }: PixelIconProps) {
  const { pixelArt } = useSiteSettings();
  if (!pixelArt) return null;

  const grid = GRIDS[variant];
  const size = grid.length;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={`${styles.icon} ${className}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {grid.map((row, y) =>
        [...row].map((cell, x) =>
          cell === "1" ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} /> : null
        )
      )}
    </svg>
  );
}
