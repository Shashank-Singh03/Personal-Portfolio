"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";

interface ScrollState {
  activeSection: number;
  totalSections: number;
  goToSection: (index: number) => void;
  setScrollState: (active: number, total: number) => void;
}

const ScrollContext = createContext<ScrollState>({
  activeSection: 0,
  totalSections: 0,
  goToSection: () => {},
  setScrollState: () => {},
});

export function useScrollContext() {
  return useContext(ScrollContext);
}

/* Wraps the entire site layout so both AppShell and SideNav share state */
export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState(0);
  const [totalSections, setTotalSections] = useState(0);
  const [goFn, setGoFn] = useState<((i: number) => void) | null>(null);

  const setScrollState = useCallback((active: number, total: number) => {
    setActiveSection(active);
    setTotalSections(total);
  }, []);

  const goToSection = useCallback(
    (i: number) => {
      if (goFn) goFn(i);
    },
    [goFn]
  );

  const value = useMemo(
    () => ({ activeSection, totalSections, goToSection, setScrollState }),
    [activeSection, totalSections, goToSection, setScrollState]
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}
