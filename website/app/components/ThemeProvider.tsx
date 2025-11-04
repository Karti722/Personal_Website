"use client";

import React, { useEffect, useState } from "react";

type Mode = "day" | "night";
type Variant = "light" | "dark";

const LS_KEY = "site-theme";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // configurable day hours (easy to change)
  const DAY_START = 6; // inclusive
  const DAY_END = 19; // exclusive

  // Helper to read stored JSON preference from localStorage
  const readStored = () => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw);
    } catch { }
    return null;
  };

  // Helper to read cookie value if present
  const readCookie = () => {
    if (typeof window === "undefined") return null;
    try {
      const cookies = document.cookie ? document.cookie.split(';').map(c => c.trim()) : [];
      const themeCookie = cookies.find(c => c.startsWith(`${LS_KEY}=`));
      if (themeCookie) {
        const val = decodeURIComponent(themeCookie.split('=')[1]);
        return JSON.parse(val);
      }
    } catch { }
    return null;
  };

  // No `auto` mode: user chooses Day/Night manually. Persist only mode and variant.

  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window === "undefined") return "day";
    const stored = readStored();
    if (stored && stored.mode) return stored.mode;
    const c = readCookie();
    if (c && c.mode) return c.mode;
    const hour = new Date().getHours();
    return hour >= DAY_START && hour < DAY_END ? "day" : "night";
  });

  const [variant, setVariant] = useState<Variant>(() => {
    if (typeof window === "undefined") return "light";
    const stored = readStored();
    if (stored && stored.variant) return stored.variant;
    const c = readCookie();
    if (c && c.variant) return c.variant;
    // fallback to OS preference if available
    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch { }
    return "light";
  });

  // apply theme class to html element
  useEffect(() => {
    const applyClass = (m: Mode, v: Variant) => {
      const cls = `theme-${m}-${v}`;
      const el = document.documentElement;
      // remove possible theme- classes
      Array.from(el.classList).forEach((c) => { if (c.startsWith("theme-")) el.classList.remove(c); });
      el.classList.add(cls);
    };

    applyClass(mode, variant);
    // persist only mode and variant
    try { localStorage.setItem(LS_KEY, JSON.stringify({ mode, variant })); } catch { }
    // also set a cookie so the preference can be read quickly on next load
    try {
      const cookieVal = encodeURIComponent(JSON.stringify({ mode, variant }));
      // 1 year
      document.cookie = `${LS_KEY}=${cookieVal}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    } catch { }
  }, [mode, variant]);

  // No mount-time state mutations needed; initializers read cookie/localStorage/prefers-color-scheme.

  // no auto-cycle: user toggles day/night manually

  const toggleVariant = () => setVariant((v) => (v === "light" ? "dark" : "light"));
  const toggleMode = () => setMode((m) => (m === "day" ? "night" : "day"));

  return (
    <>
      <div style={{ minHeight: "100vh" }}>{children}</div>

      {/* Floating controls */}
      <div className="theme-toggle" aria-hidden={false} role="group" aria-label="Theme controls">
        <button aria-pressed={mode === "day"} className={`theme-btn ${mode === "day" ? 'active' : ''}`} onClick={toggleMode} title="Toggle Day/Night">
          {mode === "day" ? "Day" : "Night"}
        </button>

        <button aria-pressed={variant === "light"} className={`theme-btn ${variant === "light" ? 'active' : ''}`} onClick={toggleVariant} title="Toggle Light/Dark variant">
          {variant === "light" ? "Light" : "Dark"}
        </button>
      </div>

      <style jsx>{`
        /* Container: pill background that holds two circular buttons */
        .theme-toggle {
          position: fixed;
          right: 1rem;
          top: 1rem;
          z-index: 9999;
          display: inline-flex;
          gap: 0.45rem;
          align-items: center;
          background: var(--toggle-bg);
          padding: 0.35rem;
          border-radius: 999px;
          backdrop-filter: blur(6px);
          border: 1px solid var(--toggle-border);
          box-shadow: var(--toggle-shadow);
          -webkit-tap-highlight-color: transparent;
        }

        /* Circular buttons: accessible touch targets */
        .theme-btn {
          width: 44px;
          height: 44px;
          min-width: 44px;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid transparent;
          color: var(--toggle-btn-color);
          padding: 0;
          border-radius: 50%;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.82rem;
          line-height: 1;
          transition: transform 160ms ease, box-shadow 200ms ease, background 180ms ease, color 160ms ease;
          -webkit-user-select: none;
        }

        .theme-btn.active {
          background: var(--accent-gradient);
          color: white;
          box-shadow: var(--toggle-active-shadow);
          transform: translateY(-2px);
        }

        .theme-btn:focus {
          outline: 3px solid rgba(100,116,255,0.18);
          outline-offset: 3px;
        }

        .theme-btn:hover { opacity: 0.98; transform: translateY(-1px); }

        /* Mobile: move to bottom-right and reduce footprint slightly */
        @media (max-width:600px) {
          .theme-toggle { top: auto; bottom: 1rem; right: 1rem; padding: 0.28rem; gap: 0.35rem; }
          .theme-btn { width: 40px; height: 40px; min-width: 40px; min-height: 40px; font-size: 0.78rem }
        }

        /* Very small screens: center at bottom to avoid overlapping content */
        @media (max-width: 420px) {
          .theme-toggle { left: 50%; right: auto; transform: translateX(-50%); bottom: 0.9rem; }
        }
      `}</style>
    </>
  );
}
