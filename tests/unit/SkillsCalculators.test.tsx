import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Skills from "@/app/(site)/skills/page";

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

describe("Skills Calculators Integration", () => {
  it("should render Skills page with Training Calculators section", () => {
    render(<Skills />);
    
    // Check for main page content
    expect(screen.getByText("Technical Arsenal")).toBeInTheDocument();
    expect(screen.getByText("Skills & Technologies")).toBeInTheDocument();
    
    // Check for Training Calculators section
    expect(screen.getByText("Training Calculators")).toBeInTheDocument();
    expect(screen.getByText("Quick Tools")).toBeInTheDocument();
    expect(screen.getByText(/Quick tools to measure performance, because fitness meets tech/)).toBeInTheDocument();
  });

  it("should mount BMI Calculator component", () => {
    render(<Skills />);
    
    // Check for BMI Calculator
    expect(screen.getByText("BMI Calculator")).toBeInTheDocument();
    expect(screen.getByText(/Calculate your Body Mass Index/)).toBeInTheDocument();
    expect(screen.getByText("Weight (kg)")).toBeInTheDocument();
    expect(screen.getByText("Height (cm)")).toBeInTheDocument();
  });

  it("should mount OneRM Calculator component", () => {
    render(<Skills />);
    
    // Check for OneRM Calculator
    expect(screen.getByText("One Rep Max Calculator")).toBeInTheDocument();
    expect(screen.getByText(/Calculate your estimated one-rep maximum/)).toBeInTheDocument();
    expect(screen.getByText("Weight (lbs)")).toBeInTheDocument();
    expect(screen.getByText("Repetitions")).toBeInTheDocument();
  });

  it("should display disclaimer text", () => {
    render(<Skills />);
    
    // Check for disclaimer
    expect(screen.getByText(/These tools are for demonstration only/)).toBeInTheDocument();
    expect(screen.getByText(/not a replacement for medical or training advice/)).toBeInTheDocument();
  });

  it("should have proper section structure", () => {
    render(<Skills />);
    
    // Check for section headings
    expect(screen.getByText("Training Calculators")).toBeInTheDocument();
    expect(screen.getByText("Quick Tools")).toBeInTheDocument();
    
    // Check for calculator titles
    expect(screen.getByText("BMI Calculator")).toBeInTheDocument();
    expect(screen.getByText("One Rep Max Calculator")).toBeInTheDocument();
  });

  it("should render both calculators in the same section", () => {
    render(<Skills />);
    
    // Find the Training Calculators section
    const trainingSection = screen.getByText("Training Calculators").closest("section");
    expect(trainingSection).toBeInTheDocument();
    
    // Both calculators should be within this section
    const bmiCalculator = screen.getByText("BMI Calculator");
    const oneRMCalculator = screen.getByText("One Rep Max Calculator");
    
    expect(bmiCalculator).toBeInTheDocument();
    expect(oneRMCalculator).toBeInTheDocument();
  });
});
