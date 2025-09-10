import "@testing-library/jest-dom";
import { beforeAll, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
beforeAll(() => {

  const mockIntersectionObserver = class {
    root = null;
    rootMargin = "";
    thresholds = [];
    constructor() {}
    observe() {}
    disconnect() {}
    unobserve() {}
    takeRecords() { return []; }
  };
  
  (global as any).IntersectionObserver = mockIntersectionObserver;

  // Mock ResizeObserver
  const mockResizeObserver = class {
    constructor() {}
    observe() {}
    disconnect() {}
    unobserve() {}
  };
  
  (global as any).ResizeObserver = mockResizeObserver;

  // Mock matchMedia
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });
});
