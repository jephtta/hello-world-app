import { test, expect } from "@playwright/test";

test.describe("Hello World App", () => {
  test("displays Hello World text", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Hello World" })).toBeVisible();
  });

  test("Hello World text is centered on the page", async ({ page }) => {
    await page.goto("/");
    const heading = page.getByRole("heading", { name: "Hello World" });
    await expect(heading).toBeVisible();

    const container = page.locator("div.flex.min-h-screen");
    await expect(container).toHaveCSS("display", "flex");
    await expect(container).toHaveCSS("align-items", "center");
    await expect(container).toHaveCSS("justify-content", "center");
  });

  test("page has correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Hello World");
  });

  test("page loads without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    expect(errors).toHaveLength(0);
  });
});
