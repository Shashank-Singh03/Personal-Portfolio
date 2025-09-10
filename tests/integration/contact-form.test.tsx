import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "@/app/(site)/contact/page";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: any }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
      <div {...props}>{children}</div>
    ),
  },
}));

// Mock sonner
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock fetch
global.fetch = vi.fn();

describe("Contact Form Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render contact form with all required fields", () => {
    render(<Contact />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("should submit form with valid data", async () => {
    const user = userEvent.setup();
    
    // Mock successful API response
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "Message sent successfully!" }),
    });

    render(<Contact />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/subject/i), "Test Subject");
    await user.type(screen.getByLabelText(/message/i), "This is a test message");
    
    // Submit the form
    await user.click(screen.getByRole("button", { name: /send message/i }));
    
    // Wait for the API call
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          subject: "Test Subject",
          message: "This is a test message",
        }),
      });
    });
  });

  it("should show loading state during submission", async () => {
    const user = userEvent.setup();
    
    // Mock delayed API response
    (global.fetch as any).mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve({ ok: true, json: async () => ({ success: true }) }), 100))
    );

    render(<Contact />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/subject/i), "Test Subject");
    await user.type(screen.getByLabelText(/message/i), "This is a test message");
    
    // Submit the form
    await user.click(screen.getByRole("button", { name: /send message/i }));
    
    // Check loading state
    expect(screen.getByText(/sending/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
  });

  it("should handle form validation errors", async () => {
    const user = userEvent.setup();
    
    // Mock API error response
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: "Validation error" }),
    });

    render(<Contact />);
    
    // Submit empty form
    await user.click(screen.getByRole("button", { name: /send message/i }));
    
    // Should not submit due to HTML5 validation
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
