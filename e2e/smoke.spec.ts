import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", () => {
  test("should return HTTP 200 for the home page", async ({ request }) => {
    const response = await request.get("/");
    expect(response.status()).toBe(200);
  });

  test("should render the main page without JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Hello World" })).toBeVisible();
    expect(errors).toHaveLength(0);
  });

  test("should have the correct document title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Hello World");
  });

  test("should serve HTML with correct content type", async ({ request }) => {
    const response = await request.get("/");
    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("text/html");
  });
});
