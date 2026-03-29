"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const THEME_CHOICES = [
  "daylight",
  "sunset",
  "ocean",
  "forest",
  "monochrome",
  "cyberpunk",
  "vintage",
  "pastel",
  "warm",
  "cool",
] as const;

type Theme = (typeof THEME_CHOICES)[number];

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

type Mode = "day" | "night";

const LS_KEY = "site-theme";
const FONT_KEY = "site-font";
const MODE_KEY = "site-mode";

type SiteSettingsContextValue = {
  isDefault: boolean;
  theme: Theme;
  cycleTheme: () => void;
  toggleDefault: () => void;
  mode: Mode;
  toggleMode: () => void;
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
  const themeOrder: Theme[] = [...THEME_CHOICES];
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

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "daylight";

    const stored = readStored();
    if (stored && stored.theme && themeOrder.includes(stored.theme as Theme)) {
      return stored.theme as Theme;
    }

    const c = readCookie();
    if (c && c.theme && themeOrder.includes(c.theme as Theme)) {
      return c.theme as Theme;
    }

    return "daylight";
  });

  const [isDefault, setIsDefault] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;

    const stored = readStored();
    if (stored && stored.isDefault === true) return true;

    const c = readCookie();
    if (c && c.isDefault === true) return true;

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

  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window === "undefined") return "day";

    const stored = localStorage.getItem(MODE_KEY);
    if (stored === "day" || stored === "night") return stored;

    try {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "night";
      }
    } catch {}

    return "day";
  });

  const prevRef = useRef<Theme | null>(null);

  useEffect(() => {
    const applyClass = () => {
      const el = document.documentElement;

      Array.from(el.classList).forEach((c) => {
        if (c.startsWith("theme-")) el.classList.remove(c);
        if (c.startsWith("mode-")) el.classList.remove(c);
      });

      const themeClass = `theme-${theme}`;
      const modeClass = `mode-${mode}`;
      el.classList.add(themeClass, modeClass);
    };

    applyClass();

    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ theme, isDefault }));
    } catch {}

    try {
      const payload = { theme, isDefault };
      const cookieVal = encodeURIComponent(JSON.stringify(payload));
      document.cookie = `${LS_KEY}=${cookieVal}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    } catch {}
  }, [theme, isDefault, mode]);

  useEffect(() => {
    const el = document.documentElement;
    Array.from(el.classList).forEach((c) => {
      if (c.startsWith("mode-")) el.classList.remove(c);
    });
    el.classList.add(`mode-${mode}`);

    try {
      localStorage.setItem(MODE_KEY, mode);
    } catch {}
  }, [mode]);

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

  const cycleTheme = () => {
    setTheme((current) => {
      const index = themeOrder.indexOf(current);
      const nextIndex = index === themeOrder.length - 1 ? 0 : index + 1;
      return themeOrder[nextIndex];
    });
  };

  const toggleDefault = () => {
    if (!isDefault) {
      prevRef.current = theme;
      setIsDefault(true);
    } else {
      if (prevRef.current) {
        setTheme(prevRef.current);
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

  const toggleMode = () => {
    setMode((m) => (m === "day" ? "night" : "day"));
  };

  const contextValue: SiteSettingsContextValue = {
    isDefault,
    theme,
    cycleTheme,
    toggleDefault,
    mode,
    toggleMode,
    fontChoice,
    cycleFont,
  };

  return (
    <SiteSettingsContext.Provider value={contextValue}>
      <div style={{ minHeight: "100vh" }}>{children}</div>
    </SiteSettingsContext.Provider>
  );
}