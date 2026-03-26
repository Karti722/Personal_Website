"use client";

import React, { useEffect, useState, useRef } from "react";

type Mode = "day" | "night";
type Variant = "light" | "dark";

const LS_KEY = "site-theme";

const isMobileBrowser = () => {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent || navigator.vendor || "";
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
};

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const DAY_START = 6;
  const DAY_END = 19;

  const readStored = () => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return null;
  };

  const readCookie = () => {
    if (typeof window === "undefined") return null;
    try {
      const cookies = document.cookie
        ? document.cookie.split(";").map((c) => c.trim())
        : [];
      const themeCookie = cookies.find((c) => c.startsWith(`${LS_KEY}=`));
      if (themeCookie) {
        const val = decodeURIComponent(themeCookie.split("=")[1]);
        return JSON.parse(val);
      }
    } catch {}
    return null;
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileBrowser());
  }, []);

  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window === "undefined") return "day";
    if (isMobileBrowser()) return "day";

    const stored = readStored();
    if (stored && stored.mode && stored.mode !== "default") return stored.mode;

    const c = readCookie();
    if (c && c.mode && c.mode !== "default") return c.mode;

    const hour = new Date().getHours();
    return hour >= DAY_START && hour < DAY_END ? "day" : "night";
  });

  const [variant, setVariant] = useState<Variant>(() => {
    if (typeof window === "undefined") return "light";
    if (isMobileBrowser()) return "light";

    const stored = readStored();
    if (stored && stored.variant && stored.mode !== "default") return stored.variant;

    const c = readCookie();
    if (c && c.variant && c.mode !== "default") return c.variant;

    try {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      }
    } catch {}

    return "light";
  });

  const [isDefault, setIsDefault] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;

    if (isMobileBrowser()) return true;

    const stored = readStored();
    if (stored && stored.mode === "default") return true;

    const c = readCookie();
    if (c && c.mode === "default") return true;

    try {
      if (
        document.documentElement &&
        document.documentElement.classList.contains("theme-default")
      ) {
        return true;
      }
    } catch {}

    return false;
  });

  const prevRef = useRef<{ mode: Mode; variant: Variant } | null>(null);

  useEffect(() => {
    const mobile = isMobileBrowser();

    const applyClass = () => {
      const el = document.documentElement;

      Array.from(el.classList).forEach((c) => {
        if (c.startsWith("theme-")) el.classList.remove(c);
      });

      if (mobile) {
        el.classList.add("theme-day-light");
      }
      else if (isDefault) {
        el.classList.add("theme-default");
      } else {
        const cls = `theme-${mode}-${variant}`;
        el.classList.add(cls);
      }
    };

    applyClass();

    if (mobile) return;

    try {
      if (isDefault) {
        localStorage.setItem(LS_KEY, JSON.stringify({ mode: "default" }));
      } else {
        localStorage.setItem(LS_KEY, JSON.stringify({ mode, variant }));
      }
    } catch {}

    try {
      const payload = isDefault ? { mode: "default" } : { mode, variant };
      const cookieVal = encodeURIComponent(JSON.stringify(payload));
      document.cookie = `${LS_KEY}=${cookieVal}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    } catch {}
  }, [mode, variant, isDefault]);

  const toggleVariant = () => {
    if (isDefault || isMobileBrowser()) return;
    setVariant((v) => (v === "light" ? "dark" : "light"));
  };

  const toggleMode = () => {
    if (isDefault || isMobileBrowser()) return;
    setMode((m) => (m === "day" ? "night" : "day"));
  };

  const toggleDefault = () => {
    if (isMobileBrowser()) return;

    if (!isDefault) {
      prevRef.current = { mode, variant };
      setIsDefault(true);
    } else {
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

      {!isMobile && (
        <div
          className="theme-toggle"
          aria-hidden={false}
          role="group"
          aria-label="Theme controls"
        >
          {!isDefault && (
            <>
              <button
                aria-pressed={mode === "day"}
                className={`theme-btn ${mode === "day" ? "active" : ""}`}
                onClick={toggleMode}
                title="Toggle Day/Night"
                disabled={isDefault}
                aria-disabled={isDefault}
              >
                {mode === "day" ? "Day" : "Night"}
              </button>

              <button
                aria-pressed={variant === "light"}
                className={`theme-btn ${variant === "light" ? "active" : ""}`}
                onClick={toggleVariant}
                title="Toggle Light/Dark variant"
                disabled={isDefault}
                aria-disabled={isDefault}
              >
                {variant === "light" ? "Light" : "Dark"}
              </button>
            </>
          )}

          <button
            aria-pressed={isDefault}
            className={`theme-btn ${isDefault ? "active" : ""} theme-default-btn`}
            onClick={toggleDefault}
            title={isDefault ? "Undo default theme" : "Use default theme"}
          >
            {isDefault ? "Untoggle Default" : "Default"}
          </button>
        </div>
      )}

      <style jsx>{`
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
          transition: transform 160ms ease, box-shadow 200ms ease, background 180ms ease,
            color 160ms ease;
          -webkit-user-select: none;
        }

        .theme-btn.active {
          background: var(--accent-gradient);
          color: white;
          box-shadow: var(--toggle-active-shadow);
          transform: translateY(-2px);
        }

        .theme-btn:focus {
          outline: 3px solid rgba(100, 116, 255, 0.18);
          outline-offset: 3px;
        }

        .theme-btn[disabled],
        .theme-btn[aria-disabled="true"] {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
          transform: none;
          box-shadow: none;
        }

        .theme-default-btn.active {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.06),
            rgba(0, 0, 0, 0.06)
          );
          color: var(--toggle-btn-color);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
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

        .theme-btn:hover {
          opacity: 0.98;
          transform: translateY(-1px);
        }

        @media (max-width: 420px) {
          .theme-toggle {
            bottom: calc(0.9rem + env(safe-area-inset-bottom, 0px));
            gap: 0.34rem;
          }

          .theme-btn {
            min-width: 76px;
            height: 50px;
            min-height: 50px;
            border-radius: 999px;
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