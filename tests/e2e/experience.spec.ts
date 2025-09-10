import { test, expect } from "@playwright/test";

test.describe("Experience Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to experience page via navbar", async ({ page }) => {
    // Click on Experience link in navbar
    await page.click('a[href="/experience"]');
    
    // Verify we're on the experience page
    await expect(page).toHaveURL("/experience");
    await expect(page.locator("h1, h2")).toContainText("Professional Journey");
  });

  test("should display experience content correctly", async ({ page }) => {
    await page.goto("/experience");
    
    // Check for main sections
    await expect(page.locator("text=Professional Journey")).toBeVisible();
    await expect(page.locator("text=Experience")).toBeVisible();
    
    // Check for company names
    await expect(page.locator("text=Oracle")).toBeVisible();
    await expect(page.locator("text=Woodman Electronics")).toBeVisible();
  });

  test("should show current role with proper styling", async ({ page }) => {
    await page.goto("/experience");
    
    // Check for current role section
    await expect(page.locator("text=Current Role")).toBeVisible();
    await expect(page.locator("text=Active Position")).toBeVisible();
    
    // Check for current badge
    await expect(page.locator("text=Current")).toBeVisible();
    
    // Check for Oracle as current role
    await expect(page.locator("text=Oracle")).toBeVisible();
    await expect(page.locator("text=Frontend & Cloud Engineer Intern")).toBeVisible();
  });

  test("should display experience statistics", async ({ page }) => {
    await page.goto("/experience");
    
    // Check for stats cards
    await expect(page.locator("text=Total Roles")).toBeVisible();
    await expect(page.locator("text=Current Role")).toBeVisible();
    await expect(page.locator("text=Key Achievements")).toBeVisible();
    await expect(page.locator("text=Years Experience")).toBeVisible();
  });

  test("should show experience details with proper formatting", async ({ page }) => {
    await page.goto("/experience");
    
    // Check for duration and location
    await expect(page.locator("text=June 2025 – Present")).toBeVisible();
    await expect(page.locator("text=Bangalore, India")).toBeVisible();
    await expect(page.locator("text=Nov 2024 – Jan 2025")).toBeVisible();
    await expect(page.locator("text=New Delhi, India")).toBeVisible();
  });

  test("should display bullet points for achievements", async ({ page }) => {
    await page.goto("/experience");
    
    // Check for key bullet points
    await expect(page.locator("text=Developed responsive UI components in Angular 16+")).toBeVisible();
    await expect(page.locator("text=Built reusable PrimeNG components")).toBeVisible();
    await expect(page.locator("text=Deployed builds to AWS EC2")).toBeVisible();
    await expect(page.locator("text=Developed and maintained 3 web applications")).toBeVisible();
    await expect(page.locator("text=Collaborated with a 5-member dev team")).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto("/experience");
    
    // Check for CTA buttons
    await expect(page.locator("text=Start a Project")).toBeVisible();
    await expect(page.locator("text=View My Work")).toBeVisible();
    
    // Test Start a Project link
    await page.click("text=Start a Project");
    await expect(page).toHaveURL("/contact");
    
    // Go back and test View My Work link
    await page.goBack();
    await page.click("text=View My Work");
    await expect(page).toHaveURL("/projects");
  });

  test("should display career philosophy section", async ({ page }) => {
    await page.goto("/experience");
    
    // Check for philosophy section
    await expect(page.locator("text=Career Philosophy")).toBeVisible();
    await expect(page.locator("text=Professional Growth")).toBeVisible();
    
    // Check for philosophy cards
    await expect(page.locator("text=Continuous Growth")).toBeVisible();
    await expect(page.locator("text=Collaborative Impact")).toBeVisible();
    await expect(page.locator("text=Results-Driven")).toBeVisible();
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/experience");
    
    // Check that content is still visible and properly formatted
    await expect(page.locator("text=Professional Journey")).toBeVisible();
    await expect(page.locator("text=Oracle")).toBeVisible();
    await expect(page.locator("text=Woodman Electronics")).toBeVisible();
  });

  test("should have proper SEO meta tags", async ({ page }) => {
    await page.goto("/experience");
    
    // Check for title
    await expect(page).toHaveTitle(/Experience/);
    
    // Check for meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute("content");
    expect(metaDescription).toContain("Professional experience");
  });

  test("should navigate from homepage experience preview", async ({ page }) => {
    await page.goto("/");
    
    // Scroll to experience section
    await page.locator("text=Professional Journey").scrollIntoViewIfNeeded();
    
    // Click on View Full Experience button
    await page.click("text=View Full Experience");
    
    // Verify navigation to experience page
    await expect(page).toHaveURL("/experience");
    await expect(page.locator("text=Professional Journey")).toBeVisible();
  });
});
