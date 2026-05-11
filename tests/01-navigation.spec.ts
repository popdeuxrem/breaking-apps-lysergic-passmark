import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("visitor can navigate through the primary site experience", async ({ page }) => {
  await runSteps({
    page,
    userFlow: "Primary navigation regression test",
    steps: [
      { description: "Open the deployed site homepage" },
      { description: "Find the main navigation or primary call-to-action areas" },
      { description: "Navigate to an available section, project, system, or contact surface" },
      { description: "Confirm the destination content becomes visible" }
    ],
    assertions: [
      { assertion: "The navigation path works without a 404, blank page, or fatal rendering error" },
      { assertion: "The destination area contains meaningful visible content" }
    ],
    test,
    expect
  });
});
