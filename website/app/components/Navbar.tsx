"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSiteSettings } from "./ThemeProvider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement | null>(null);
  const {
    isDefault,
    mode,
    variant,
    toggleTheme,
    toggleMode,
    toggleDefault,
    fontChoice,
    cycleFont,
  } = useSiteSettings();

  const fontLabel = useMemo(() => {
    if (fontChoice === "serif") return "Serif";
    if (fontChoice === "mono") return "Mono";
    return "System";
  }, [fontChoice]);

  const navItems = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Certifications", id: "certifications" },
    { label: "Resume", id: "resume" },
    { label: "More Info", id: "more-info" },
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
    <nav className="navbar">
      <div className="nav-container">
        <a href="#" className="nav-logo">
          <span>KK</span>
        </a>

        <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-link"
              onClick={handleNavClick}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-actions" ref={settingsRef}>
          <button
            type="button"
            className={`settings-btn ${settingsOpen ? "active" : ""}`}
            aria-expanded={settingsOpen}
            aria-controls="settings-menu"
            onClick={() => setSettingsOpen((open) => !open)}
          >
            ⛭
          </button>

          <div
            id="settings-menu"
            className={`settings-menu ${settingsOpen ? "open" : ""}`}
            role="menu"
            aria-label="Site settings"
          >
            <div className="settings-row">
              <span className="settings-label">Theme</span>
              <button
                type="button"
                className="settings-toggle"
                onClick={toggleTheme}
                role="switch"
                aria-checked={variant === "dark" && !isDefault}
              >
                {isDefault ? "Default" : variant === "light" ? "Light" : "Dark"}
              </button>
            </div>

            <div className="settings-row">
              <span className="settings-label">Font</span>
              <button
                type="button"
                className="settings-toggle"
                onClick={cycleFont}
                aria-label="Cycle font style"
              >
                {fontLabel}
              </button>
            </div>

            <div className="settings-row">
              <span className="settings-label">Theme Set</span>
              <button
                type="button"
                className={`settings-toggle ${isDefault ? "on" : ""}`}
                onClick={toggleDefault}
                aria-pressed={isDefault}
              >
                {isDefault ? "Default" : "Custom"}
              </button>
            </div>

            <div className="settings-row">
              <span className="settings-label">Day / Night</span>
              <button
                type="button"
                className={`settings-toggle ${mode === "night" && !isDefault ? "on" : ""}`}
                onClick={toggleMode}
                role="switch"
                aria-checked={mode === "night" && !isDefault}
              >
                {isDefault ? "Default" : mode === "day" ? "Day" : "Night"}
              </button>
            </div>
          </div>

          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
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