"use client";

import React, { useEffect, useState, useRef } from "react";

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
    if (stored && stored.mode && stored.mode !== 'default') return stored.mode;
    const c = readCookie();
    if (c && c.mode && c.mode !== 'default') return c.mode;
    const hour = new Date().getHours();
    return hour >= DAY_START && hour < DAY_END ? "day" : "night";
  });

  const [variant, setVariant] = useState<Variant>(() => {
    if (typeof window === "undefined") return "light";
    const stored = readStored();
    if (stored && stored.variant && stored.mode !== 'default') return stored.variant;
    const c = readCookie();
    if (c && c.variant && c.mode !== 'default') return c.variant;
    // fallback to OS preference if available
    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch { }
    return "light";
  });

  // when true, the site uses the project's original/default stylesheet and other toggles are locked
  const [isDefault, setIsDefault] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = readStored();
    if (stored && stored.mode === 'default') return true;
    const c = readCookie();
    if (c && c.mode === 'default') return true;
    // if pre-hydration script set a class of theme-default, respect that on hydrate
    try { if (document.documentElement && document.documentElement.classList.contains('theme-default')) return true; } catch {}
    return false;
  });

  // store previous mode/variant so we can restore them when the user clicks Undo
  const prevRef = useRef<{ mode: Mode; variant: Variant } | null>(null);

  // apply theme class to html element
  useEffect(() => {
    const applyClass = () => {
      const el = document.documentElement;
      // remove possible theme- classes
      Array.from(el.classList).forEach((c) => { if (c.startsWith("theme-")) el.classList.remove(c); });
      if (isDefault) {
        el.classList.add('theme-default');
      } else {
        const cls = `theme-${mode}-${variant}`;
        el.classList.add(cls);
      }
    };

    applyClass();
    // persist state (mode/variant) or default marker
    try {
      if (isDefault) {
        localStorage.setItem(LS_KEY, JSON.stringify({ mode: 'default' }));
      } else {
        localStorage.setItem(LS_KEY, JSON.stringify({ mode, variant }));
      }
    } catch { }
    // also set a cookie so the preference can be read quickly on next load
    try {
      const payload = isDefault ? { mode: 'default' } : { mode, variant };
      const cookieVal = encodeURIComponent(JSON.stringify(payload));
      // 1 year
      document.cookie = `${LS_KEY}=${cookieVal}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    } catch { }
  }, [mode, variant, isDefault]);

  // No mount-time state mutations needed; initializers read cookie/localStorage/prefers-color-scheme.

  // no auto-cycle: user toggles day/night manually

  const toggleVariant = () => { if (isDefault) return; setVariant((v) => (v === "light" ? "dark" : "light")); };
  const toggleMode = () => { if (isDefault) return; setMode((m) => (m === "day" ? "night" : "day")); };

  const toggleDefault = () => {
    if (!isDefault) {
      // entering default: remember current settings
      prevRef.current = { mode, variant };
      setIsDefault(true);
    } else {
      // undo: restore previous settings if we have them
      if (prevRef.current) {
        setMode(prevRef.current.mode);
        setVariant(prevRef.current.variant);
        prevRef.current = null;
      }
      setIsDefault(false);
    }
  };

  return (
    <>
      <div style={{ minHeight: "100vh" }}>{children}</div>

      {/* Floating controls */}
      <div className="theme-toggle" aria-hidden={false} role="group" aria-label="Theme controls">
        {!isDefault && 
        <>
        <button
          aria-pressed={mode === "day"}
          className={`theme-btn ${mode === "day" ? 'active' : ''}`}
          onClick={toggleMode}
          title="Toggle Day/Night"
          disabled={isDefault}
          aria-disabled={isDefault}
        >
          {mode === "day" ? "Day" : "Night"}
        </button>
        {!isDefault &&
          <button
            aria-pressed={variant === "light"}
            className={`theme-btn ${variant === "light" ? 'active' : ''}`}
            onClick={toggleVariant}
            title="Toggle Light/Dark variant"
            disabled={isDefault}
            aria-disabled={isDefault}
            >
            {variant === "light" ? "Light" : "Dark"}
          </button>}
        </>
        }


        <button
          aria-pressed={isDefault}
          className={`theme-btn ${isDefault ? 'active' : ''} theme-default-btn`}
          onClick={toggleDefault}
          title={isDefault ? 'Undo default theme' : 'Use default theme'}
        >
          {isDefault ? 'Untoggle Default' : 'Default'}
        </button>
      </div>

      <style jsx>{`
        /* Container: pill background that holds two circular buttons */
        .theme-toggle {
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          bottom: 1rem;
          z-index: 1001;
          display: inline-flex;
          width: auto;
          max-width: calc(100vw - 1rem);
          gap: 0.45rem;
          align-items: center;
          justify-content: center;
          background: var(--toggle-bg);
          padding: 0.35rem;
          border-radius: 999px;
          backdrop-filter: blur(6px);
          border: 1px solid var(--toggle-border);
          box-shadow: var(--toggle-shadow);
          -webkit-tap-highlight-color: transparent;
          white-space: nowrap;
          flex-wrap: nowrap;
        }

        /* Circular buttons: accessible touch targets */
        .theme-btn {
          width: 55px;
          height: 55px;
          min-width: 55px;
          min-height: 55px;
          flex: 0 0 auto;
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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

        .theme-btn[disabled], .theme-btn[aria-disabled="true"] {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
          transform: none;
          box-shadow: none;
        }

        /* Slightly differentiate the Default button when active */
        .theme-default-btn.active {
          background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(0,0,0,0.06));
          color: var(--toggle-btn-color);
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }

        .theme-default-btn {
          width: auto;
          min-width: 55px;
          max-width: min(220px, calc(100vw - 2.5rem));
          border-radius: 999px;
          padding: 0 1rem;
          white-space: nowrap;
          text-align: center;
          line-height: 1.05;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .theme-btn:hover { opacity: 0.98; transform: translateY(-1px); }


        /* Very small screens: keep centered at bottom */
        @media (max-width: 420px) {
          .theme-toggle {
            left: 50%;
            transform: translateX(-50%);
            bottom: calc(0.9rem + env(safe-area-inset-bottom, 0px));
            gap: 0.34rem;
            padding: 0.34rem;
            width: auto;
          }
          .theme-btn {
            width: auto;
            min-width: 76px;
            height: 50px;
            min-height: 50px;
            border-radius: 999px;
            padding: 0 0.86rem;
            font-size: 0.72rem;
            line-height: 1;
          }
          .theme-default-btn {
            min-width: 96px;
            max-width: 52vw;
            padding: 0 0.8rem;
            font-size: 0.72rem;
          }
        }
      `}</style>
    </>
  );
}
