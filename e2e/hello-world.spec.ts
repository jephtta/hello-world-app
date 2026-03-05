import { test, expect } from "@playwright/test";

test.describe("Hello World App", () => {
  test("should display Hello World heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Hello World" })).toBeVisible();
  });

  test("should center the Hello World heading on the page", async ({ page }) => {
    await page.goto("/");
    const heading = page.getByRole("heading", { name: "Hello World" });
    await expect(heading).toBeVisible();

    const viewport = page.viewportSize();
    if (!viewport) throw new Error("No viewport");

    const box = await heading.boundingBox();
    if (!box) throw new Error("No bounding box");

    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    expect(centerX).toBeGreaterThan(viewport.width * 0.3);
    expect(centerX).toBeLessThan(viewport.width * 0.7);
    expect(centerY).toBeGreaterThan(viewport.height * 0.3);
    expect(centerY).toBeLessThan(viewport.height * 0.7);
  });

  test("should have correct page title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Hello World");
  });

  test("should have correct meta description", async ({ page }) => {
    await page.goto("/");
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", "A simple Hello World application");
  });

  test("should load without JavaScript errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    expect(errors).toHaveLength(0);
  });

  test("should return a 404 page for unknown routes", async ({ page }) => {
    const response = await page.goto("/nonexistent-route");
    expect(response?.status()).toBe(404);
  });
});
