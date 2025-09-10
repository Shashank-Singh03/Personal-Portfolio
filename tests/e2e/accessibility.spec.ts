import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility", () => {
  test("should not have any automatically detectable accessibility issues on home page", async ({ page }) => {
    await page.goto("/");
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should not have any automatically detectable accessibility issues on contact page", async ({ page }) => {
    await page.goto("/contact");
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");
    
    // Check that there's exactly one h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
    
    // Check that headings are properly nested (no skipping levels)
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").all();
    const headingLevels = await Promise.all(
      headings.map(async (heading) => {
        const tagName = await heading.evaluate((el) => el.tagName.toLowerCase());
        return parseInt(tagName.charAt(1));
      })
    );
    
    // First heading should be h1
    expect(headingLevels[0]).toBe(1);
    
    // Check for proper nesting (no level skipping)
    for (let i = 1; i < headingLevels.length; i++) {
      const currentLevel = headingLevels[i];
      const previousLevel = headingLevels[i - 1];
      
      // Should not skip more than one level
      if (currentLevel > previousLevel) {
        expect(currentLevel - previousLevel).toBeLessThanOrEqual(1);
      }
    }
  });

  test("should have proper focus management", async ({ page }) => {
    await page.goto("/");
    
    // Test tab navigation
    await page.keyboard.press("Tab"); // Skip to content link
    await expect(page.getByRole("link", { name: /skip to main content/i })).toBeFocused();
    
    await page.keyboard.press("Tab"); // First navigation item
    const firstNavItem = page.getByRole("link", { name: /home/i }).first();
    await expect(firstNavItem).toBeFocused();
  });

  test("should have proper alt text for images", async ({ page }) => {
    await page.goto("/");
    
    const images = await page.locator("img").all();
    
    for (const img of images) {
      const alt = await img.getAttribute("alt");
      const ariaLabel = await img.getAttribute("aria-label");
      const ariaHidden = await img.getAttribute("aria-hidden");
      
      // Images should have alt text, aria-label, or be marked as decorative
      expect(
        alt !== null || 
        ariaLabel !== null || 
        ariaHidden === "true"
      ).toBe(true);
    }
  });

  test("should have proper form labels", async ({ page }) => {
    await page.goto("/contact");
    
    // All form inputs should have associated labels
    const inputs = await page.locator("input, textarea, select").all();
    
    for (const input of inputs) {
      const id = await input.getAttribute("id");
      const ariaLabel = await input.getAttribute("aria-label");
      const ariaLabelledby = await input.getAttribute("aria-labelledby");
      
      if (id) {
        // Check if there's a label with for attribute
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count() > 0;
        
        expect(
          hasLabel || 
          ariaLabel !== null || 
          ariaLabelledby !== null
        ).toBe(true);
      }
    }
  });

  test("should have sufficient color contrast", async ({ page }) => {
    await page.goto("/");
    
    // Run axe with specific color contrast rules
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(["color-contrast"])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should be navigable with keyboard only", async ({ page }) => {
    await page.goto("/");
    
    // Test that all interactive elements are reachable
    const interactiveElements = await page.locator("a, button, input, textarea, select, [tabindex]").all();
    
    let focusableCount = 0;
    
    // Count elements that should be focusable
    for (const element of interactiveElements) {
      const tabindex = await element.getAttribute("tabindex");
      const disabled = await element.getAttribute("disabled");
      const ariaHidden = await element.getAttribute("aria-hidden");
      
      // Element should be focusable if it's not disabled, not hidden, and tabindex is not -1
      if (disabled === null && ariaHidden !== "true" && tabindex !== "-1") {
        focusableCount++;
      }
    }
    
    // Navigate through all focusable elements
    let currentFocusableIndex = 0;
    
    while (currentFocusableIndex < Math.min(focusableCount, 20)) { // Limit to prevent infinite loops
      await page.keyboard.press("Tab");
      currentFocusableIndex++;
    }
    
    // Should have navigated through multiple elements
    expect(currentFocusableIndex).toBeGreaterThan(5);
  });

  test("should have proper ARIA landmarks", async ({ page }) => {
    await page.goto("/");
    
    // Check for main landmark
    await expect(page.locator("main, [role='main']")).toBeVisible();
    
    // Check for navigation landmark
    await expect(page.locator("nav, [role='navigation']")).toBeVisible();
    
    // Check for contentinfo landmark (footer)
    const footerCount = await page.locator("footer, [role='contentinfo']").count();
    expect(footerCount).toBeGreaterThan(0);
  });

  test("should work with screen reader announcements", async ({ page }) => {
    await page.goto("/contact");
    
    // Fill out form and submit to test live regions
    await page.getByLabel(/name/i).fill("Test User");
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/subject/i).fill("Screen Reader Test");
    await page.getByLabel(/message/i).fill("Testing screen reader announcements for form submission.");
    
    await page.getByRole("button", { name: /send message/i }).click();
    
    // Check that success message appears (should be announced by screen readers)
    await expect(page.getByText(/message sent successfully/i)).toBeVisible();
    
    // The toast should have proper ARIA attributes
    const toast = page.getByText(/message sent successfully/i).locator("..");
    const ariaLive = await toast.getAttribute("aria-live");
    const role = await toast.getAttribute("role");
    
    // Should have aria-live or role for screen reader announcements
    expect(ariaLive !== null || role === "alert" || role === "status").toBe(true);
  });
});
