import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate to all main pages", async ({ page }) => {
    await page.goto("/");

    // Test home page loads
    await expect(page.getByRole("heading", { name: /lifting code/i })).toBeVisible();

    // Navigate to About page
    await page.getByRole("link", { name: /about/i }).first().click();
    await expect(page.getByRole("heading", { name: /about me/i })).toBeVisible();
    await expect(page).toHaveURL(/.*\/about/);

    // Navigate to Skills page
    await page.getByRole("link", { name: /skills/i }).first().click();
    await expect(page.getByRole("heading", { name: /technical arsenal/i })).toBeVisible();
    await expect(page).toHaveURL(/.*\/skills/);

    // Navigate to Projects page
    await page.getByRole("link", { name: /projects/i }).first().click();
    await expect(page.getByRole("heading", { name: /project portfolio/i })).toBeVisible();
    await expect(page).toHaveURL(/.*\/projects/);

    // Navigate to Achievements page
    await page.getByRole("link", { name: /achievements/i }).first().click();
    await expect(page.getByRole("heading", { name: /achievements/i })).toBeVisible();
    await expect(page).toHaveURL(/.*\/achievements/);

    // Navigate to Contact page
    await page.getByRole("link", { name: /contact/i }).first().click();
    await expect(page.getByRole("heading", { name: /let's work together/i })).toBeVisible();
    await expect(page).toHaveURL(/.*\/contact/);
  });

  test("should highlight active navigation link", async ({ page }) => {
    await page.goto("/about");

    // Check that About link is highlighted/active
    const aboutLink = page.getByRole("link", { name: /about/i }).first();
    await expect(aboutLink).toHaveClass(/active|text-primary/);
  });

  test("should work on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Open mobile menu
    await page.getByRole("button", { name: /toggle navigation/i }).click();

    // Navigate using mobile menu
    await page.getByRole("link", { name: /about/i }).click();
    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.getByRole("heading", { name: /about me/i })).toBeVisible();
  });

  test("should have working skip to content link", async ({ page }) => {
    await page.goto("/");
    
    // Focus the skip link (it should be the first focusable element)
    await page.keyboard.press("Tab");
    
    // The skip link should be focused and visible
    const skipLink = page.getByRole("link", { name: /skip to main content/i });
    await expect(skipLink).toBeFocused();
    
    // Click the skip link
    await skipLink.click();
    
    // Main content should be focused
    const mainContent = page.locator("#main-content");
    await expect(mainContent).toBeFocused();
  });
});
