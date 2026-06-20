import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark";

type UIState = {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
};

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    if (stored === "light" || stored === "dark") return stored;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    return prefersDark ? "dark" : "light";
  });

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    document.documentElement.classList.toggle("dark", t === "dark");
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    // Toast colors via CSS vars.
    const root = document.documentElement;
    const isDark = theme === "dark";
    root.style.setProperty("--toast-bg", isDark ? "#0b1220" : "#ffffff");
    root.style.setProperty("--toast-fg", isDark ? "#e5e7eb" : "#0f172a");
    root.style.setProperty("--toast-border", isDark ? "#1f2a44" : "#e5e7eb");
  }, [theme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, isMobileMenuOpen, setMobileMenuOpen }),
    [theme, isMobileMenuOpen]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
