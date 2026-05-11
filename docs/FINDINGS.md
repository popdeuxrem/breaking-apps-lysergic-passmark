# Findings
## Summary
This submission tested a deployed Lysergic Systems web app using **Passmark** and **Playwright**.
The goal was to create a small, reliable regression baseline for a real public web application before the hackathon deadline.
Final result:
```txt
3 passed
0 failed

⸻

Target

https://lysergic-systems.vercel.app

Repository:

https://github.com/popdeuxrem/breaking-apps-lysergic-passmark

⸻

Tested Flows

Flow	Test File	Result
Homepage smoke test	tests/00-smoke.spec.ts	✅ Passed
Primary navigation	tests/01-navigation.spec.ts	✅ Passed
Mobile viewport usability	tests/02-mobile.spec.ts	✅ Passed

⸻

Final Test Result

3 passed
0 failed

This confirms that the deployed app:

* loads successfully
* presents meaningful public content
* supports primary navigation
* remains usable on a mobile-sized viewport

⸻

What Worked

1. Passmark Made Test Intent Readable

The test flows were expressed in plain English.

This made the suite easier to understand than a selector-heavy test suite, especially for a hackathon submission where judges need to quickly understand what is being tested.

Example:

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
]

2. Playwright Provided Deterministic Browser Execution

Playwright handled:

* browser startup
* page navigation
* viewport control
* test discovery
* HTML reporting
* traces, screenshots, and video on failure

This kept Passmark focused on user-facing validation instead of low-level browser orchestration.

3. Hybrid Setup Was More Reliable

The strongest pattern was:

Playwright for deterministic setup
Passmark for plain-English validation

For example, the smoke test first loads the homepage directly:

await page.goto("/", { waitUntil: "domcontentloaded" });
await expect(page).not.toHaveTitle(/404|not found|error/i);

Then Passmark validates the visible page state.

This reduced ambiguity and made the final smoke test more reliable.

4. Codespaces Was Enough

GitHub Codespaces was sufficient to:

* install dependencies
* configure Playwright
* run Chromium
* execute Passmark tests
* commit and push the repo

This proved the submission could be built from a browser-based development environment.

⸻

Issues Encountered

Issue 1 — Chromium Failed to Launch

The first test run failed because Chromium could not start inside Codespaces.

Observed error:

error while loading shared libraries: libatk-1.0.so.0

Root cause:

Missing Linux system dependency required by Chromium.

Resolution:

sudo npx playwright install-deps chromium
npx playwright install chromium

Result:

Chromium launched successfully after installing Playwright browser dependencies.

⸻

Issue 2 — Passmark Requested the Wrong Provider Key

After Chromium was fixed, Passmark failed because it expected a different AI provider key.

Observed error:

GOOGLE_GENERATIVE_AI_API_KEY isn't set

Root cause:

Passmark was defaulting to another gateway instead of OpenRouter.

Resolution:

The Playwright config was patched to explicitly configure Passmark with OpenRouter:

import { configure } from "passmark";
configure({
  ai: {
    gateway: "openrouter"
  }
});

The .env file then provided:

OPENROUTER_API_KEY=
AI_GATEWAY_API_KEY=

Result:

Passmark executed successfully through OpenRouter.

⸻

Issue 3 — Initial Smoke Test Was Too Vague

The first homepage smoke test relied too heavily on a broad instruction:

Navigate to the homepage

This made the test less deterministic.

Resolution:

The final smoke test explicitly opened the page with Playwright before Passmark validated the loaded state.

Final pattern:

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

Result:

The smoke test passed after deterministic page loading was added.

⸻

Regression Value

This suite protects against the first layer of public-facing regressions.

Risk	Covered By
Broken deploy	Homepage smoke test
Blank page	Homepage smoke test
404 or fatal render state	Homepage smoke test
Broken navigation	Primary navigation test
Empty destination content	Primary navigation test
Mobile layout failure	Mobile usability test
Unreachable mobile content	Mobile usability test

⸻

Final State

Item	Status
Repository created	✅
Repository public	✅
Passmark installed	✅
Playwright installed	✅
Chromium dependencies fixed	✅
OpenRouter gateway configured	✅
.env.example documented	✅
.env ignored	✅
Tests discovered	✅
Tests executed	✅
Final run passed	✅
Docs generated	✅

⸻

Final Result Snapshot

Running 3 tests using 1 worker
✓ tests/00-smoke.spec.ts
✓ tests/01-navigation.spec.ts
✓ tests/02-mobile.spec.ts
3 passed
0 failed

⸻

Lessons Learned

1. Small Regression Suites Can Still Be Useful

A useful first test suite does not need to cover every feature.

The first public regression layer should answer:

Can the app load?
Can visitors navigate?
Can mobile visitors use it?

Those checks are simple, but they catch high-impact production failures.

2. AI-Assisted Tests Still Need Deterministic Setup

Passmark is useful for validating user intent, but deterministic setup still matters.

The most reliable pattern was:

Use Playwright to establish state.
Use Passmark to validate user-facing behavior.

3. Environment Issues Are Part of the Build

The main blockers were not app bugs. They were environment and configuration problems:

* Chromium system dependencies
* AI gateway configuration
* vague first-run instructions

Documenting those issues made the repo more useful and reproducible.

4. Codespaces Is Viable for Deadline Builds

Even under time pressure, Codespaces was enough to complete:

* repository setup
* dependency installation
* test authoring
* browser execution
* result validation
* git push

⸻

Future Improvements

The next version of this project should add:

Improvement	Priority	Reason
Link validation	High	Detect broken internal/external links
Accessibility smoke checks	High	Validate keyboard and semantic usability
Project-page tests	Medium	Expand coverage beyond the homepage
Contact / conversion path tests	Medium	Validate important visitor actions
Screenshot comparison	Medium	Detect visual regressions
Multi-viewport testing	Medium	Cover tablet, desktop, and narrow mobile
GitHub Actions CI	High	Run tests on push and pull request
Structured artifacts	Medium	Save reports, screenshots, and traces
Network retry policy	Low	Reduce flakiness from transient failures
Full report screenshots in repo docs	Low	Improve judge-readable evidence

⸻

Conclusion

The final submission produced a working Passmark + Playwright regression suite against a real deployed web app.

The project is intentionally compact, but complete:

Public repo
Passmark + Playwright tests
OpenRouter gateway
Codespaces execution
3 passing tests
Documented setup findings
Hashnode-ready article draft
Social post draft

Final result:

3 passed
0 failed

The suite establishes a practical regression baseline for the deployed Lysergic Systems web app.
