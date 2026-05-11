# Breaking Apps — Lysergic Passmark Regression Suite
Breaking Apps Hackathon submission: **Passmark + Playwright regression tests** for a deployed Lysergic Systems web app.
This repository validates a real public production surface using plain-English AI-assisted test flows executed through Playwright.
---
## Target App
Default target:
```txt
https://lysergic-systems.vercel.app

Override with:

BASE_URL=

⸻

Final Result

3 passed
0 failed

Validated flows:

1. Homepage smoke test
2. Primary navigation
3. Mobile viewport usability

⸻

Why This Exists

Fast-moving web apps can break in simple but damaging ways:

* homepage fails to load
* navigation routes break
* mobile layouts become unusable
* CTAs or important content become unreachable
* deploys silently regress public-facing behavior

This project creates a small regression baseline that confirms the deployed site remains usable from a visitor’s perspective.

⸻

Why Passmark

Traditional Playwright tests can become selector-heavy and brittle.

Passmark lets the test suite describe user intent in plain English while Playwright handles real browser execution underneath.

Instead of starting with low-level selectors, the tests ask higher-level questions:

* does the homepage show meaningful content?
* can a visitor navigate through the site?
* does the mobile viewport remain usable?

⸻

Stack

Layer	Tool
Test runner	Playwright
AI-assisted user flows	Passmark
AI gateway	OpenRouter
Runtime	Node.js
Language	TypeScript
Environment	GitHub Codespaces

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
│   └── ARTICLE_DRAFT.md
├── artifacts/
│   └── screenshots/
└── scripts/
    └── verify.sh

⸻

Test Coverage

Test File	Flow	Purpose
tests/00-smoke.spec.ts	Homepage smoke	Confirms the app loads and presents meaningful identity/content
tests/01-navigation.spec.ts	Primary navigation	Confirms a visitor can navigate through the primary site experience
tests/02-mobile.spec.ts	Mobile usability	Confirms important content remains reachable on a mobile viewport

⸻

Environment Variables

Create a local .env file from .env.example.

OPENROUTER_API_KEY=sk-or-...
AI_GATEWAY_API_KEY=sk-or-...
BASE_URL=https://lysergic-systems.vercel.app

The .env file is intentionally ignored by git.

⸻

Setup

npm install
cp .env.example .env
npx playwright install chromium

Edit .env and add your OpenRouter key:

nano .env

⸻

Run Tests

npm test

Run headed:

npm run test:headed

List discovered tests:

npm run test:list

Open the Playwright HTML report:

npm run report

Verify repository structure and test discovery:

npm run verify

⸻

Example Test

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

⸻

Findings

Final run:

3 passed
0 failed

Key findings:

* Passmark made test intent readable.
* Playwright provided deterministic browser execution.
* Preloading the homepage with Playwright made the smoke test more reliable.
* Mobile viewport testing provided quick confidence that the public app remained usable on small screens.
* Codespaces required Playwright Chromium dependencies before browser execution worked.

See:

docs/FINDINGS.md

⸻

Known Setup Notes

If Chromium fails in Codespaces with a missing Linux dependency, run:

sudo npx playwright install-deps chromium
npx playwright install chromium

If Passmark requests another provider key, confirm playwright.config.ts contains:

configure({
  ai: {
    gateway: "openrouter"
  }
});

⸻

Hackathon Submission

This project was built for the Breaking Apps Hackathon.

Required article tag:

#BreakingAppsHackathon

Submission artifacts:

* public GitHub repository
* Passmark + Playwright test suite
* Hashnode article
* social post linking the repo and article

⸻

Links

* Live app: https://lysergic-systems.vercel.app
* Repository: https://github.com/popdeuxrem/breaking-apps-lysergic-passmark

⸻

License

MIT

## Article

Hashnode article:

https://lysergic-systems.hashnode.dev/breaking-my-developer-system-with-passmark-plain-english-regression-testing-for-a-production-web-app

## Published Submission

- Hashnode article: https://lysergic-systems.hashnode.dev/breaking-my-developer-system-with-passmark-plain-english-regression-testing-for-a-production-web-app
- X post: https://x.com/fubjou_10022/status/2053711074223075619?s=46
