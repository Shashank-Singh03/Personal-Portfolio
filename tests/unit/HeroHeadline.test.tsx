import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Hero } from "@/components/Hero";

// Mock framer-motion to avoid issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  ArrowRight: () => <span data-testid="arrow-right-icon" />,
  Download: () => <span data-testid="download-icon" />,
  Github: () => <span data-testid="github-icon" />,
  Linkedin: () => <span data-testid="linkedin-icon" />,
  Mail: () => <span data-testid="mail-icon" />,
}));

describe("Hero Headline Rotation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should display the initial headline on mount", () => {
    render(<Hero />);
    
    expect(screen.getByText("Lifting Code,")).toBeInTheDocument();
    expect(screen.getByText("Shipping Gains")).toBeInTheDocument();
  });

  it("should rotate to the second headline after 4 seconds", async () => {
    render(<Hero />);
    
    // Initial headline should be visible
    expect(screen.getByText("Lifting Code,")).toBeInTheDocument();
    expect(screen.getByText("Shipping Gains")).toBeInTheDocument();
    
    // Fast-forward 4 seconds
    vi.advanceTimersByTime(4000);
    
    // Wait for the headline to change
    await waitFor(() => {
      expect(screen.getByText("Clean Code.")).toBeInTheDocument();
      expect(screen.getByText("Heavy Lifts.")).toBeInTheDocument();
    });
  });

  it("should rotate to the third headline after 8 seconds", async () => {
    render(<Hero />);
    
    // Fast-forward 8 seconds (2 rotations)
    vi.advanceTimersByTime(8000);
    
    // Wait for the headline to change
    await waitFor(() => {
      expect(screen.getByText("Debugging Bugs,")).toBeInTheDocument();
      expect(screen.getByText("Deadlifting Bytes.")).toBeInTheDocument();
    });
  });

  it("should cycle back to the first headline after 12 seconds", async () => {
    render(<Hero />);
    
    // Fast-forward 12 seconds (3 rotations)
    vi.advanceTimersByTime(12000);
    
    // Wait for the headline to cycle back
    await waitFor(() => {
      expect(screen.getByText("Lifting Code,")).toBeInTheDocument();
      expect(screen.getByText("Shipping Gains")).toBeInTheDocument();
    });
  });

  it("should continue cycling infinitely", async () => {
    render(<Hero />);
    
    // Fast-forward 24 seconds (6 rotations - 2 full cycles)
    vi.advanceTimersByTime(24000);
    
    // Should be back to the first headline
    await waitFor(() => {
      expect(screen.getByText("Lifting Code,")).toBeInTheDocument();
      expect(screen.getByText("Shipping Gains")).toBeInTheDocument();
    });
  });

  it("should clean up interval on unmount", () => {
    const clearIntervalSpy = vi.spyOn(global, "clearInterval");
    
    const { unmount } = render(<Hero />);
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
    
    clearIntervalSpy.mockRestore();
  });
});
