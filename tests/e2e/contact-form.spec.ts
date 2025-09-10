import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("should submit contact form successfully", async ({ page }) => {
    // Fill out the form
    await page.getByLabel(/name/i).fill("John Doe");
    await page.getByLabel(/email/i).fill("john@example.com");
    await page.getByLabel(/subject/i).fill("Test Subject");
    await page.getByLabel(/message/i).fill("This is a test message with enough characters to pass validation requirements.");

    // Submit the form
    await page.getByRole("button", { name: /send message/i }).click();

    // Wait for success message (toast notification)
    await expect(page.getByText(/message sent successfully/i)).toBeVisible();

    // Form should be cleared after successful submission
    await expect(page.getByLabel(/name/i)).toHaveValue("");
    await expect(page.getByLabel(/email/i)).toHaveValue("");
    await expect(page.getByLabel(/subject/i)).toHaveValue("");
    await expect(page.getByLabel(/message/i)).toHaveValue("");
  });

  test("should show validation errors for invalid email", async ({ page }) => {
    await page.getByLabel(/name/i).fill("John Doe");
    await page.getByLabel(/email/i).fill("invalid-email");
    await page.getByLabel(/subject/i).fill("Test Subject");
    await page.getByLabel(/message/i).fill("This is a test message.");

    await page.getByRole("button", { name: /send message/i }).click();

    // Should show error message
    await expect(page.getByText(/failed to send message/i)).toBeVisible();
  });

  test("should require all fields", async ({ page }) => {
    // Try to submit empty form
    await page.getByRole("button", { name: /send message/i }).click();

    // Browser should prevent submission due to required attributes
    // Check that we're still on the contact page
    await expect(page).toHaveURL(/.*\/contact/);
  });

  test("should show loading state during submission", async ({ page }) => {
    await page.getByLabel(/name/i).fill("Jane Smith");
    await page.getByLabel(/email/i).fill("jane@example.com");
    await page.getByLabel(/subject/i).fill("Loading Test");
    await page.getByLabel(/message/i).fill("Testing the loading state of the contact form submission.");

    // Intercept the API call to make it slower
    await page.route("/api/contact", async (route) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      route.continue();
    });

    await page.getByRole("button", { name: /send message/i }).click();

    // Should show loading state
    await expect(page.getByText(/sending/i)).toBeVisible();
    
    // Button should be disabled during submission
    await expect(page.getByRole("button", { name: /sending/i })).toBeDisabled();
  });

  test("should be accessible via keyboard", async ({ page }) => {
    // Tab through form fields
    await page.keyboard.press("Tab"); // Skip link
    await page.keyboard.press("Tab"); // Should focus first form field (name)
    
    await expect(page.getByLabel(/name/i)).toBeFocused();
    await page.keyboard.type("John Doe");

    await page.keyboard.press("Tab"); // Email field
    await expect(page.getByLabel(/email/i)).toBeFocused();
    await page.keyboard.type("john@example.com");

    await page.keyboard.press("Tab"); // Subject field
    await expect(page.getByLabel(/subject/i)).toBeFocused();
    await page.keyboard.type("Keyboard Navigation Test");

    await page.keyboard.press("Tab"); // Message field
    await expect(page.getByLabel(/message/i)).toBeFocused();
    await page.keyboard.type("Testing keyboard navigation through the contact form.");

    await page.keyboard.press("Tab"); // Submit button
    await expect(page.getByRole("button", { name: /send message/i })).toBeFocused();

    // Submit with Enter key
    await page.keyboard.press("Enter");

    // Should show success message
    await expect(page.getByText(/message sent successfully/i)).toBeVisible();
  });

  test("should have proper form labels and ARIA attributes", async ({ page }) => {
    // Check that all form fields have proper labels
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/subject/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();

    // Check required attributes
    await expect(page.getByLabel(/name/i)).toHaveAttribute("required");
    await expect(page.getByLabel(/email/i)).toHaveAttribute("required");
    await expect(page.getByLabel(/subject/i)).toHaveAttribute("required");
    await expect(page.getByLabel(/message/i)).toHaveAttribute("required");

    // Check email input type
    await expect(page.getByLabel(/email/i)).toHaveAttribute("type", "email");
  });
});
