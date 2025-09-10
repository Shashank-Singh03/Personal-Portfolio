import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Skills Page Integration", () => {
  it("should render Skills page with all sections", () => {
    render(<Skills />);
    
    // Check for main sections
    expect(screen.getByText("Technical Arsenal")).toBeInTheDocument();
    expect(screen.getByText("Skill Categories")).toBeInTheDocument();
    expect(screen.getByText("Learning Philosophy")).toBeInTheDocument();
    expect(screen.getByText("Currently Learning")).toBeInTheDocument();
    expect(screen.getByText("Training Calculators")).toBeInTheDocument();
  });

  it("should have interactive BMI Calculator", async () => {
    const user = userEvent.setup();
    render(<Skills />);
    
    // Find BMI Calculator inputs
    const weightInput = screen.getByLabelText("Weight (kg)");
    const heightInput = screen.getByLabelText("Height (cm)");
    const calculateButton = screen.getByText("Calculate BMI");
    
    // Fill in the form
    await user.type(weightInput, "70");
    await user.type(heightInput, "175");
    
    // Click calculate
    await user.click(calculateButton);
    
    // Wait for result to appear
    await waitFor(() => {
      expect(screen.getByText(/22.9/)).toBeInTheDocument();
    });
    
    // Check for BMI category
    expect(screen.getByText("Normal weight")).toBeInTheDocument();
  });

  it("should have interactive OneRM Calculator", async () => {
    const user = userEvent.setup();
    render(<Skills />);
    
    // Find OneRM Calculator inputs
    const weightInput = screen.getByLabelText("Weight (lbs)");
    const repsInput = screen.getByLabelText("Repetitions");
    const calculateButton = screen.getByText("Calculate 1RM");
    
    // Fill in the form
    await user.type(weightInput, "100");
    await user.type(repsInput, "5");
    
    // Click calculate
    await user.click(calculateButton);
    
    // Wait for result to appear
    await waitFor(() => {
      expect(screen.getByText(/116.7 lbs/)).toBeInTheDocument();
    });
    
    // Check for strength level
    expect(screen.getByText("Novice")).toBeInTheDocument();
  });

  it("should show BMI result after calculation", async () => {
    const user = userEvent.setup();
    render(<Skills />);
    
    const weightInput = screen.getByLabelText("Weight (kg)");
    const heightInput = screen.getByLabelText("Height (cm)");
    const calculateButton = screen.getByText("Calculate BMI");
    
    await user.type(weightInput, "70");
    await user.type(heightInput, "175");
    await user.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText("Body Mass Index")).toBeInTheDocument();
      expect(screen.getByText("Category:")).toBeInTheDocument();
    });
  });

  it("should show OneRM result after calculation", async () => {
    const user = userEvent.setup();
    render(<Skills />);
    
    const weightInput = screen.getByLabelText("Weight (lbs)");
    const repsInput = screen.getByLabelText("Repetitions");
    const calculateButton = screen.getByText("Calculate 1RM");
    
    await user.type(weightInput, "100");
    await user.type(repsInput, "5");
    await user.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText("Estimated One Rep Maximum")).toBeInTheDocument();
      expect(screen.getByText("Strength Level:")).toBeInTheDocument();
    });
  });

  it("should have reset functionality for both calculators", async () => {
    const user = userEvent.setup();
    render(<Skills />);
    
    // Test BMI Calculator reset
    const bmiWeightInput = screen.getByLabelText("Weight (kg)");
    const bmiHeightInput = screen.getByLabelText("Height (cm)");
    const bmiResetButton = screen.getAllByText("Reset")[0];
    
    await user.type(bmiWeightInput, "70");
    await user.type(bmiHeightInput, "175");
    await user.click(bmiResetButton);
    
    expect(bmiWeightInput).toHaveValue("");
    expect(bmiHeightInput).toHaveValue("");
    
    // Test OneRM Calculator reset
    const oneRMWeightInput = screen.getByLabelText("Weight (lbs)");
    const oneRMRepsInput = screen.getByLabelText("Repetitions");
    const oneRMResetButton = screen.getAllByText("Reset")[1];
    
    await user.type(oneRMWeightInput, "100");
    await user.type(oneRMRepsInput, "5");
    await user.click(oneRMResetButton);
    
    expect(oneRMWeightInput).toHaveValue("");
    expect(oneRMRepsInput).toHaveValue("");
  });

  it("should display disclaimer text for calculators", () => {
    render(<Skills />);
    
    expect(screen.getByText(/These tools are for demonstration only/)).toBeInTheDocument();
    expect(screen.getByText(/not a replacement for medical or training advice/)).toBeInTheDocument();
  });
});
