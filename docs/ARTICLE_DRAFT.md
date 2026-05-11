# Breaking My Developer System with Passmark: Plain-English Regression Testing for a Production Web App
I joined the **Breaking Apps Hackathon** to test a real deployed web app, not a toy demo.
For this submission, I built a **Passmark + Playwright regression suite** for my deployed Lysergic Systems web app.
The goal was simple:
> prove that the app still loads, exposes meaningful navigation, and remains usable on mobile.
This is the first regression layer every production-facing web app needs.
---
## What I Built
I created a public regression testing repository using:
- **Passmark** for plain-English user-flow validation
- **Playwright** for real browser execution
- **OpenRouter** as the AI gateway
- **GitHub Codespaces** as the build environment
- **TypeScript** for the test suite
The suite runs against my deployed app:
```txt
https://lysergic-systems.vercel.app

Repository:

https://github.com/popdeuxrem/breaking-apps-lysergic-passmark

⸻

Why I Chose This App

I wanted to test a real public surface I control.

A developer system or portfolio site may look simple, but it can still fail in high-impact ways:

* homepage fails after a deploy
* navigation routes break
* mobile layout collapses
* important content becomes unreachable
* CTAs or destination sections stop rendering
* users hit blank pages or broken routes

Those failures are basic, but they matter.

So instead of building a fake demo app, I used Passmark to test a deployed production-facing web app.

⸻

Test Coverage

The suite covers three high-value user-facing flows:

Test	Purpose
Homepage smoke test	Confirms the app loads and presents meaningful identity/content
Primary navigation	Confirms a visitor can move through the main site experience
Mobile viewport usability	Confirms important content remains reachable on a mobile-sized screen

The goal was not to overbuild. The goal was to create a working regression harness before the hackathon deadline.

Final result:

3 passed
0 failed

⸻

Why Passmark

Traditional Playwright tests can become selector-heavy quickly.

Selectors are useful, but they can also make early test suites brittle when the actual goal is broader:

* can a user understand the page?
* can a user navigate?
* can a user access the site on mobile?
* did the public surface regress?

Passmark made the test intent easier to read because the steps are written in plain English while Playwright still handles browser automation underneath.

Instead of starting with brittle selectors, I could describe what a real visitor should be able to do.

⸻

Repository Structure

breaking-apps-lysergic-passmark/
├── README.md
├── package.json
├── playwright.config.ts
├── .env.example
├── tests/
│   ├── 00-smoke.spec.ts
│   ├── 01-navigation.spec.ts
│   └── 02-mobile.spec.ts
├── docs/
│   ├── TEST_PLAN.md
│   ├── ASSERTION_MATRIX.md
│   ├── FINDINGS.md
│   ├── SUBMISSION_CHECKLIST.md
│   ├── ARTICLE_DRAFT.md
│   └── SOCIAL_POST.md
├── artifacts/
│   └── screenshots/
└── scripts/
    └── verify.sh

⸻

Example Test

Here is the homepage smoke test.

import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";
test("homepage loads and presents the main product identity", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page).not.toHaveTitle(/404|not found|error/i);
  await runSteps({
    page,
    userFlow: "Homepage smoke test for the deployed Lysergic Systems site",
    steps: [
      {
        description: "Observe the currently loaded homepage"
      },
      {
        description: "Confirm the page shows visible brand, portfolio, product, system, or developer identity content"
      },
      {
        description: "Confirm the page is not blank and not showing a browser error page"
      }
    ],
    assertions: [
      {
        assertion: "The homepage contains visible meaningful content"
      },
      {
        assertion: "The homepage does not show a 404, not found, blank, or fatal error state"
      }
    ],
    test,
    expect
  });
});

The important part is the split between deterministic setup and AI-assisted validation.

Playwright first opens the page directly:

await page.goto("/", { waitUntil: "domcontentloaded" });

Then Passmark validates the user-facing state in plain English.

That made the smoke test more reliable than asking the AI agent to infer the entire setup from scratch.

⸻

Playwright Configuration

The suite uses Playwright as the browser execution layer and configures Passmark to use OpenRouter.

import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import { configure } from "passmark";
dotenv.config();
configure({
  ai: {
    gateway: "openrouter"
  }
});
export default defineConfig({
  testDir: "./tests",
  timeout: 120_000,
  expect: {
    timeout: 20_000
  },
  fullyParallel: false,
  reporter: [["html"], ["list"]],
  use: {
    baseURL: process.env.BASE_URL || "https://lysergic-systems.vercel.app",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"]
      }
    }
  ]
});

Environment variables are kept outside the repository:

OPENROUTER_API_KEY=
AI_GATEWAY_API_KEY=
BASE_URL=

The real .env file is ignored by git.

⸻

What Broke During Setup

This was not a completely clean path. Two setup issues came up.

1. Chromium Could Not Start in Codespaces

The first blocker was not the test code. It was the browser runtime.

Chromium failed because a Linux dependency was missing:

libatk-1.0.so.0

The fix was to install Playwright’s Chromium dependencies:

sudo npx playwright install-deps chromium
npx playwright install chromium

After that, Chromium could launch correctly inside Codespaces.

2. Passmark Expected a Different Provider Key

Passmark initially requested:

GOOGLE_GENERATIVE_AI_API_KEY

The suite needed to use OpenRouter instead, so I configured the gateway explicitly:

configure({
  ai: {
    gateway: "openrouter"
  }
});

Then the local .env provided:

OPENROUTER_API_KEY=
AI_GATEWAY_API_KEY=

After those fixes, the tests ran successfully.

⸻

Final Test Result

The final run passed:

3 passed
0 failed

The suite validated:

* the homepage loads
* primary navigation works
* mobile viewport content remains reachable

This gives the project a practical regression baseline.

It is not a full quality system yet, but it is enough to catch the first layer of user-facing breakage.

⸻

What I Learned

Passmark is useful when the important question is user intent.

For early regression coverage, the most valuable checks are often simple:

* does the page load?
* can users navigate?
* does mobile still work?
* does the public surface still communicate what it is?

Those checks are not flashy, but they prevent obvious production regressions.

The strongest pattern was:

1. use Playwright for deterministic setup
2. use Passmark for plain-English validation
3. keep secrets outside the repo
4. document the failures and fixes
5. keep the first suite small enough to maintain

⸻

Future Improvements

The next version of this suite could add:

* link validation
* accessibility checks
* screenshot comparison
* project-page coverage
* contact or conversion-flow testing
* GitHub Actions CI with secure repository secrets
* multiple viewport profiles
* trace retention for every run
* structured artifact exports after each test run

The current submission establishes the baseline. The next step is expanding coverage.

⸻

Links

* GitHub repo: https://github.com/popdeuxrem/breaking-apps-lysergic-passmark
* Live app: https://lysergic-systems.vercel.app

#BreakingAppsHackathon
