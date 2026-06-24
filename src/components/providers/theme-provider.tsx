"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeColor = "cyan" | "green" | "amber" | "violet";

interface ThemeContextType {
  theme: ThemeColor;
  crt: boolean;
  sound: boolean;
  setTheme: (theme: ThemeColor) => void;
  setCrt: (crt: boolean) => void;
  setSound: (sound: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeColor>("green");
  const [crt, setCrtState] = useState<boolean>(false);
  const [sound, setSoundState] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("cyberdeck-theme") as ThemeColor;
    const storedCrt = localStorage.getItem("cyberdeck-crt");
    const storedSound = localStorage.getItem("cyberdeck-sound");

    if (storedTheme) setThemeState(storedTheme);
    if (storedCrt) setCrtState(storedCrt === "true");
    if (storedSound) setSoundState(storedSound !== "false");
    
    setMounted(true);
  }, []);

  // Sync settings to localStorage and DOM
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("cyberdeck-theme", theme);
    
    // Apply theme class to document element
    const root = window.document.documentElement;
    root.classList.remove("theme-cyan", "theme-green", "theme-amber", "theme-violet");
    root.classList.add(`theme-${theme}`);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("cyberdeck-crt", String(crt));
    
    const root = window.document.documentElement;
    if (crt) {
      root.classList.add("crt-effect");
    } else {
      root.classList.remove("crt-effect");
    }
  }, [crt, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("cyberdeck-sound", String(sound));
  }, [sound, mounted]);

  const setTheme = (newTheme: ThemeColor) => setThemeState(newTheme);
  const setCrt = (val: boolean) => setCrtState(val);
  const setSound = (val: boolean) => setSoundState(val);

  return (
    <ThemeContext.Provider value={{ theme, crt, sound, setTheme, setCrt, setSound }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
