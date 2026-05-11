import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("mobile viewport exposes usable content and navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  await runSteps({
    page,
    userFlow: "Mobile usability regression test",
    steps: [
      { description: "Open the homepage on a mobile-sized viewport" },
      { description: "Confirm the main content is visible without obvious layout failure" },
      { description: "Open the menu or interact with the primary mobile navigation if present" },
      { description: "Confirm a visitor can still access important site content" }
    ],
    assertions: [
      { assertion: "The mobile page renders usable content" },
      { assertion: "Important navigation or call-to-action content remains reachable on mobile" }
    ],
    test,
    expect
  });
});
