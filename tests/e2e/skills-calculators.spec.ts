import { test, expect } from "@playwright/test";

test.describe("Skills Page Calculators", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/skills");
  });

  test("should display Training Calculators section", async ({ page }) => {
    // Check for section title and description
    await expect(page.locator("text=Training Calculators")).toBeVisible();
    await expect(page.locator("text=Quick Tools")).toBeVisible();
    await expect(page.locator("text=Quick tools to measure performance, because fitness meets tech")).toBeVisible();
  });

  test("should show both BMI and OneRM calculators", async ({ page }) => {
    // Check for both calculators
    await expect(page.locator("text=BMI Calculator")).toBeVisible();
    await expect(page.locator("text=One Rep Max Calculator")).toBeVisible();
    
    // Check for input fields
    await expect(page.locator('input[placeholder="70"]')).toBeVisible(); // BMI weight
    await expect(page.locator('input[placeholder="175"]')).toBeVisible(); // BMI height
    await expect(page.locator('input[placeholder="185"]')).toBeVisible(); // OneRM weight
    await expect(page.locator('input[placeholder="5"]')).toBeVisible(); // OneRM reps
  });

  test("should calculate BMI with weight=70, height=175", async ({ page }) => {
    // Fill BMI form
    await page.fill('input[placeholder="70"]', "70");
    await page.fill('input[placeholder="175"]', "175");
    
    // Click calculate button
    await page.click("text=Calculate BMI");
    
    // Wait for result to appear
    await expect(page.locator("text=22.9")).toBeVisible();
    await expect(page.locator("text=Body Mass Index")).toBeVisible();
    await expect(page.locator("text=Normal weight")).toBeVisible();
  });

  test("should calculate OneRM with weight=100, reps=5", async ({ page }) => {
    // Fill OneRM form
    await page.fill('input[placeholder="185"]', "100");
    await page.fill('input[placeholder="5"]', "5");
    
    // Click calculate button
    await page.click("text=Calculate 1RM");
    
    // Wait for result to appear
    await expect(page.locator("text=116.7 lbs")).toBeVisible();
    await expect(page.locator("text=Estimated One Rep Maximum")).toBeVisible();
    await expect(page.locator("text=Novice")).toBeVisible();
  });

  test("should show BMI result after calculation", async ({ page }) => {
    // Fill and calculate BMI
    await page.fill('input[placeholder="70"]', "70");
    await page.fill('input[placeholder="175"]', "175");
    await page.click("text=Calculate BMI");
    
    // Check for result elements
    await expect(page.locator("text=Body Mass Index")).toBeVisible();
    await expect(page.locator("text=Category:")).toBeVisible();
    await expect(page.locator("text=Normal weight")).toBeVisible();
  });

  test("should show OneRM result after calculation", async ({ page }) => {
    // Fill and calculate OneRM
    await page.fill('input[placeholder="185"]', "100");
    await page.fill('input[placeholder="5"]', "5");
    await page.click("text=Calculate 1RM");
    
    // Check for result elements
    await expect(page.locator("text=Estimated One Rep Maximum")).toBeVisible();
    await expect(page.locator("text=Strength Level:")).toBeVisible();
    await expect(page.locator("text=Novice")).toBeVisible();
  });

  test("should have working reset buttons", async ({ page }) => {
    // Fill BMI form
    await page.fill('input[placeholder="70"]', "70");
    await page.fill('input[placeholder="175"]', "175");
    
    // Click reset
    await page.click("text=Reset");
    
    // Check that inputs are cleared
    await expect(page.locator('input[placeholder="70"]')).toHaveValue("");
    await expect(page.locator('input[placeholder="175"]')).toHaveValue("");
    
    // Fill OneRM form
    await page.fill('input[placeholder="185"]', "100");
    await page.fill('input[placeholder="5"]', "5");
    
    // Click reset (second reset button)
    const resetButtons = page.locator("text=Reset");
    await resetButtons.nth(1).click();
    
    // Check that inputs are cleared
    await expect(page.locator('input[placeholder="185"]')).toHaveValue("");
    await expect(page.locator('input[placeholder="5"]')).toHaveValue("");
  });

  test("should display disclaimer text", async ({ page }) => {
    await expect(page.locator("text=These tools are for demonstration only")).toBeVisible();
    await expect(page.locator("text=not a replacement for medical or training advice")).toBeVisible();
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that calculators are still visible and properly stacked
    await expect(page.locator("text=BMI Calculator")).toBeVisible();
    await expect(page.locator("text=One Rep Max Calculator")).toBeVisible();
    
    // Check that inputs are still accessible
    await expect(page.locator('input[placeholder="70"]')).toBeVisible();
    await expect(page.locator('input[placeholder="185"]')).toBeVisible();
  });

  test("should have proper form validation", async ({ page }) => {
    // Try to calculate without filling inputs
    await page.click("text=Calculate BMI");
    
    // Button should be disabled or show validation
    const bmiButton = page.locator("text=Calculate BMI");
    await expect(bmiButton).toBeDisabled();
    
    // Try OneRM without inputs
    const oneRMButton = page.locator("text=Calculate 1RM");
    await expect(oneRMButton).toBeDisabled();
  });

  test("should show BMI categories reference", async ({ page }) => {
    // Check for BMI categories section
    await expect(page.locator("text=BMI Categories (WHO Standards)")).toBeVisible();
    await expect(page.locator("text=Underweight")).toBeVisible();
    await expect(page.locator("text=Normal weight")).toBeVisible();
    await expect(page.locator("text=Overweight")).toBeVisible();
    await expect(page.locator("text=Obese")).toBeVisible();
  });

  test("should show formula information", async ({ page }) => {
    // Check for BMI formula
    await expect(page.locator("text=Formula: BMI = Weight (kg) ÷ Height² (m²)")).toBeVisible();
    
    // Check for OneRM formula
    await expect(page.locator("text=Formula: 1RM = Weight × (1 + Reps ÷ 30)")).toBeVisible();
  });
});
