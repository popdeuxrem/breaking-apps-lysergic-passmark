import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("homepage loads and presents the main product identity", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page).not.toHaveTitle(/404|not found|error/i);

  await runSteps({
    page,
    userFlow: "Homepage smoke test for the deployed Lysergic Systems site",
    steps: [
      { description: "Observe the currently loaded homepage" },
      { description: "Confirm the page shows visible brand, portfolio, product, system, or developer identity content" },
      { description: "Confirm the page is not blank and not showing a browser error page" }
    ],
    assertions: [
      { assertion: "The homepage contains visible meaningful content" },
      { assertion: "The homepage does not show a 404, not found, blank, or fatal error state" }
    ],
    test,
    expect
  });
});
