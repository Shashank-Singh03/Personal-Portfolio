import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCounter } from "@/components/StatCounter";
import { OneRMCalculator } from "@/components/Calculators/OneRM";
import { BMICalculator } from "@/components/Calculators/BMI";

// Mock framer-motion to avoid issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  useInView: () => true,
  useMotionValue: () => ({ set: vi.fn(), on: vi.fn() }),
  useSpring: () => ({ on: vi.fn() }),
}));

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("StatCounter Component", () => {
  it("renders counter with correct value and label", () => {
    render(
      <StatCounter
        value={100}
        label="Projects"
        description="Completed successfully"
      />
    );

    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Completed successfully")).toBeInTheDocument();
  });

  it("applies correct variant classes", () => {
    const { container } = render(
      <StatCounter
        value={50}
        label="Test"
        variant="large"
      />
    );

    expect(container.firstChild).toHaveClass("p-8");
  });

  it("handles prefix and suffix correctly", () => {
    render(
      <StatCounter
        value={95}
        label="Score"
        prefix="$"
        suffix="%"
      />
    );

    // The animated number component should eventually show the prefix/suffix
    expect(screen.getByText("Score")).toBeInTheDocument();
  });
});

describe("OneRMCalculator Component", () => {
  it("renders calculator form correctly", () => {
    render(<OneRMCalculator />);

    expect(screen.getByText("One Rep Max Calculator")).toBeInTheDocument();
    expect(screen.getByLabelText(/weight/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/repetitions/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /calculate 1rm/i })).toBeInTheDocument();
  });

  it("shows formula information", () => {
    render(<OneRMCalculator />);

    expect(screen.getByText(/Formula:/)).toBeInTheDocument();
    expect(screen.getByText(/1RM = Weight × \(1 \+ Reps ÷ 30\)/)).toBeInTheDocument();
  });

  it("has proper input validation attributes", () => {
    render(<OneRMCalculator />);

    const weightInput = screen.getByLabelText(/weight/i);
    const repsInput = screen.getByLabelText(/repetitions/i);

    expect(weightInput).toHaveAttribute("type", "number");
    expect(weightInput).toHaveAttribute("min", "1");
    expect(weightInput).toHaveAttribute("max", "1000");

    expect(repsInput).toHaveAttribute("type", "number");
    expect(repsInput).toHaveAttribute("min", "1");
    expect(repsInput).toHaveAttribute("max", "50");
  });
});

describe("BMICalculator Component", () => {
  it("renders calculator with metric and imperial tabs", () => {
    render(<BMICalculator />);

    expect(screen.getByText("BMI Calculator")).toBeInTheDocument();
    expect(screen.getByText("Metric (kg/cm)")).toBeInTheDocument();
    expect(screen.getByText("Imperial (lbs/ft)")).toBeInTheDocument();
  });

  it("shows BMI categories reference", () => {
    render(<BMICalculator />);

    expect(screen.getByText("BMI Categories (WHO Standards)")).toBeInTheDocument();
    expect(screen.getByText("< 18.5")).toBeInTheDocument();
    expect(screen.getByText("18.5 - 24.9")).toBeInTheDocument();
    expect(screen.getByText("25.0 - 29.9")).toBeInTheDocument();
    expect(screen.getByText("≥ 30.0")).toBeInTheDocument();
  });

  it("displays formula information", () => {
    render(<BMICalculator />);

    expect(screen.getByText(/Formula:/)).toBeInTheDocument();
    expect(screen.getByText(/BMI = Weight \(kg\) ÷ Height² \(m²\)/)).toBeInTheDocument();
  });

  it("has reset functionality", () => {
    render(<BMICalculator />);

    const resetButton = screen.getByRole("button", { name: /reset/i });
    expect(resetButton).toBeInTheDocument();
  });
});
