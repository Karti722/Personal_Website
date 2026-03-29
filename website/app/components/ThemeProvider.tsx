"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Mode = "day" | "night";
type Variant = "light" | "dark";

const FONT_CHOICES = [
  "system",
  "serif",
  "mono",
  "modern",
  "reading",
  "rounded",
  "typewriter",
  "classic",
] as const;

type FontChoice = (typeof FONT_CHOICES)[number];

const LS_KEY = "site-theme";
const FONT_KEY = "site-font";

type SiteSettingsContextValue = {
  isDefault: boolean;
  mode: Mode;
  variant: Variant;
  toggleTheme: () => void;
  toggleMode: () => void;
  toggleDefault: () => void;
  fontChoice: FontChoice;
  cycleFont: () => void;
};

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);

export const useSiteSettings = () => {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) {
    throw new Error("useSiteSettings must be used within ThemeProvider");
  }
  return ctx;
};

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const DAY_START = 6;
  const DAY_END = 19;
  const fontOrder: FontChoice[] = [...FONT_CHOICES];

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

  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window === "undefined") return "day";

    const stored = readStored();
    if (stored && stored.mode && stored.mode !== "default") return stored.mode;

    const c = readCookie();
    if (c && c.mode && c.mode !== "default") return c.mode;

    const hour = new Date().getHours();
    return hour >= DAY_START && hour < DAY_END ? "day" : "night";
  });

  const [variant, setVariant] = useState<Variant>(() => {
    if (typeof window === "undefined") return "light";

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

  const [fontChoice, setFontChoice] = useState<FontChoice>(() => {
    if (typeof window === "undefined") return "system";
    const stored = localStorage.getItem(FONT_KEY);
    if (stored && fontOrder.includes(stored as FontChoice)) {
      return stored as FontChoice;
    }
    return "system";
  });

  const prevRef = useRef<{ mode: Mode; variant: Variant } | null>(null);

  useEffect(() => {
    const applyClass = () => {
      const el = document.documentElement;

      Array.from(el.classList).forEach((c) => {
        if (c.startsWith("theme-")) el.classList.remove(c);
      });

      if (isDefault) {
        el.classList.add("theme-default");
      } else {
        const cls = `theme-${mode}-${variant}`;
        el.classList.add(cls);
      }
    };

    applyClass();

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

  useEffect(() => {
    const el = document.documentElement;
    Array.from(el.classList).forEach((c) => {
      if (c.startsWith("font-")) el.classList.remove(c);
    });
    el.classList.add(`font-${fontChoice}`);

    try {
      localStorage.setItem(FONT_KEY, fontChoice);
    } catch {}
  }, [fontChoice]);

  const toggleTheme = () => {
    if (isDefault) {
      setIsDefault(false);
      setVariant("dark");
      return;
    }

    setVariant((v) => (v === "light" ? "dark" : "light"));
  };

  const toggleMode = () => {
    if (isDefault) {
      setIsDefault(false);
    }
    setMode((m) => (m === "day" ? "night" : "day"));
  };

  const toggleDefault = () => {
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

  const cycleFont = () => {
    setFontChoice((current) => {
      const index = fontOrder.indexOf(current);
      const nextIndex = index === fontOrder.length - 1 ? 0 : index + 1;
      return fontOrder[nextIndex];
    });
  };

  const contextValue: SiteSettingsContextValue = {
    isDefault,
    mode,
    variant,
    toggleTheme,
    toggleMode,
    toggleDefault,
    fontChoice,
    cycleFont,
  };

  return (
    <SiteSettingsContext.Provider value={contextValue}>
      <div style={{ minHeight: "100vh" }}>{children}</div>
    </SiteSettingsContext.Provider>
  );
}