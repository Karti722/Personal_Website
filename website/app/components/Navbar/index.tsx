"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteSettings } from "../ThemeProvider";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement | null>(null);
  const {
    theme,
    cycleTheme,
    mode,
    toggleMode,
    fontChoice,
    cycleFont,
  } = useSiteSettings();

  const fontLabel = useMemo(() => {
    if (fontChoice === "serif") return "Serif";
    if (fontChoice === "mono") return "Mono";
    if (fontChoice === "modern") return "Modern";
    if (fontChoice === "reading") return "Reading";
    if (fontChoice === "rounded") return "Rounded";
    if (fontChoice === "typewriter") return "Typewriter";
    if (fontChoice === "classic") return "Classic";
    return "System";
  }, [fontChoice]);

  const themeLabel = useMemo(() => {
    const labels: Record<string, string> = {
      daylight: "Daylight",
      sunset: "Sunset",
      ocean: "Ocean",
      forest: "Forest",
      monochrome: "Monochrome",
      cyberpunk: "Cyberpunk",
      vintage: "Vintage",
      pastel: "Pastel",
      warm: "Warm",
      cool: "Cool",
    };
    return labels[theme] || "Daylight";
  }, [theme]);

  const navItems = [
    { label: "Skills", href: "/skills" },
    { label: "Experience", href: "/experience" },
    { label: "Projects", href: "/projects" },
    { label: "Certifications", href: "/certifications" },
    { label: "Resume", href: "/resume" },
  ];

  const handleNavClick = () => {
    setMenuOpen(false);
    setSettingsOpen(false);
  };

  useEffect(() => {
    const onClickAway = (event: MouseEvent) => {
      if (!settingsRef.current) return;
      const target = event.target as Node;
      if (!settingsRef.current.contains(target)) {
        setSettingsOpen(false);
      }
    };

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickAway);
    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("mousedown", onClickAway);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.navLogo} onClick={handleNavClick}>
          <span>KK</span>
        </Link>

        <div className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={handleNavClick}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.navActions} ref={settingsRef}>
          <button
            type="button"
            className={`${styles.settingsBtn} ${settingsOpen ? styles.active : ""}`}
            aria-expanded={settingsOpen}
            aria-controls="settings-menu"
            onClick={() => setSettingsOpen((open) => !open)}
          >
            <Image
              src="/svgs/settings.svg"
              alt=""
              width={27}
              height={27}
              aria-hidden="true"
              className={styles.settingsIcon}
            />
          </button>

          <div
            id="settings-menu"
            className={`${styles.settingsMenu} ${settingsOpen ? styles.open : ""}`}
            role="menu"
            aria-label="Site settings"
          >
            <div className={styles.settingsRow}>
              <span className={styles.settingsLabel}>Theme</span>
              <button
                type="button"
                className={styles.settingsToggle}
                onClick={cycleTheme}
                aria-label="Cycle through themes"
              >
                {themeLabel}
              </button>
            </div>

            <div className={styles.settingsRow}>
              <span className={styles.settingsLabel}>Font</span>
              <button
                type="button"
                className={styles.settingsToggle}
                onClick={cycleFont}
                aria-label="Cycle font style"
              >
                {fontLabel}
              </button>
            </div>

            <div className={styles.settingsRow}>
              <span className={styles.settingsLabel}>Brightness</span>
              <button
                type="button"
                className={`${styles.settingsToggle} ${mode === "night" ? styles.on : ""}`}
                onClick={toggleMode}
                role="switch"
                aria-checked={mode === "night"}
              >
                {mode === "day" ? "Day" : "Night"}
              </button>
            </div>
          </div>

          <div
            className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
}