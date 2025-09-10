import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Experience from "@/app/(site)/experience/page";
import { experiences } from "@/content/experience";

// Mock Next.js components
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock Framer Motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
  },
}));

describe("Experience Page", () => {
  it("should render experience page with correct title", () => {
    render(<Experience />);
    
    expect(screen.getByText("Professional Journey")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText(/A timeline of my professional growth/)).toBeInTheDocument();
  });

  it("should display all experience entries", () => {
    render(<Experience />);
    
    // Check for both companies
    expect(screen.getByText("Oracle")).toBeInTheDocument();
    expect(screen.getByText("Woodman Electronics")).toBeInTheDocument();
  });

  it("should show current role correctly", () => {
    render(<Experience />);
    
    const currentExperience = experiences.find(exp => exp.current);
    if (currentExperience) {
      expect(screen.getByText(currentExperience.company)).toBeInTheDocument();
      expect(screen.getByText(currentExperience.role)).toBeInTheDocument();
      expect(screen.getByText("Current")).toBeInTheDocument();
    }
  });

  it("should display experience statistics", () => {
    render(<Experience />);
    
    expect(screen.getByText("Total Roles")).toBeInTheDocument();
    expect(screen.getByText("Current Role")).toBeInTheDocument();
    expect(screen.getByText("Key Achievements")).toBeInTheDocument();
    expect(screen.getByText("Years Experience")).toBeInTheDocument();
  });

  it("should show experience details for each role", () => {
    render(<Experience />);
    
    experiences.forEach((experience) => {
      expect(screen.getByText(experience.company)).toBeInTheDocument();
      expect(screen.getByText(experience.role)).toBeInTheDocument();
      expect(screen.getByText(experience.duration)).toBeInTheDocument();
      expect(screen.getByText(experience.location)).toBeInTheDocument();
      
      // Check for at least one bullet point
      experience.bullets.forEach((bullet) => {
        expect(screen.getByText(bullet)).toBeInTheDocument();
      });
    });
  });

  it("should have proper navigation links", () => {
    render(<Experience />);
    
    expect(screen.getByText("Start a Project")).toBeInTheDocument();
    expect(screen.getByText("View My Work")).toBeInTheDocument();
  });

  it("should display career philosophy section", () => {
    render(<Experience />);
    
    expect(screen.getByText("Career Philosophy")).toBeInTheDocument();
    expect(screen.getByText("Continuous Growth")).toBeInTheDocument();
    expect(screen.getByText("Collaborative Impact")).toBeInTheDocument();
    expect(screen.getByText("Results-Driven")).toBeInTheDocument();
  });

  it("should show proper icons and visual elements", () => {
    render(<Experience />);
    
    // Check for building icons (company icons)
    const buildingIcons = screen.getAllByTestId("building-icon");
    expect(buildingIcons.length).toBeGreaterThan(0);
  });

  it("should have proper section structure", () => {
    render(<Experience />);
    
    // Check for main sections
    expect(screen.getByText("Professional Journey")).toBeInTheDocument();
    expect(screen.getByText("Professional History")).toBeInTheDocument();
    expect(screen.getByText("Career Philosophy")).toBeInTheDocument();
    expect(screen.getByText("Ready to Work Together?")).toBeInTheDocument();
  });

  it("should display current role in dedicated section", () => {
    render(<Experience />);
    
    const currentExperience = experiences.find(exp => exp.current);
    if (currentExperience) {
      expect(screen.getByText("Current Role")).toBeInTheDocument();
      expect(screen.getByText("Active Position")).toBeInTheDocument();
    }
  });

  it("should show past experiences in history section", () => {
    render(<Experience />);
    
    const pastExperiences = experiences.filter(exp => !exp.current);
    if (pastExperiences.length > 0) {
      expect(screen.getByText("Professional History")).toBeInTheDocument();
      expect(screen.getByText("Previous Roles")).toBeInTheDocument();
    }
  });
});
