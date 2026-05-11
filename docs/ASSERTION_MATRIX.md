# Assertion Matrix
## Purpose
This document maps each Passmark + Playwright test to the user-facing behavior it validates.
The suite is intentionally compact. It protects the first public regression layer of the deployed Lysergic Systems web app:
1. page availability
2. meaningful rendered content
3. route/navigation usability
4. mobile viewport usability
The assertions are written as user-intent checks rather than brittle selector-only checks.
---
## Target
```txt
https://lysergic-systems.vercel.app

Override target:

BASE_URL=

⸻

Assertion Summary

Test File	Test Name	Primary Risk Covered	Final Result
tests/00-smoke.spec.ts	Homepage loads and presents the main product identity	Broken deploy, blank page, 404, fatal render failure	Passed
tests/01-navigation.spec.ts	Visitor can navigate through the primary site experience	Broken navigation, dead CTA, failed route transition	Passed
tests/02-mobile.spec.ts	Mobile viewport exposes usable content and navigation	Responsive layout failure, unreachable content, broken mobile UX	Passed

Final run:

3 passed
0 failed

⸻

Detailed Matrix

ID	Test File	User Flow	Assertion	Failure Signal	Severity
A-001	tests/00-smoke.spec.ts	Visitor opens the deployed site	Homepage contains visible meaningful content	Blank page, no rendered content, app shell failure	High
A-002	tests/00-smoke.spec.ts	Visitor opens the deployed site	Homepage does not show a 404, not found, blank, or fatal error state	Bad route, broken deployment, frontend crash	High
A-003	tests/01-navigation.spec.ts	Visitor enters the primary site experience	Main navigation or primary CTA area can be found	Missing navigation, hidden CTA, unusable landing page	Medium
A-004	tests/01-navigation.spec.ts	Visitor navigates to another section or surface	Navigation path works without a 404, blank page, or fatal rendering error	Broken route, dead link, failed client-side transition	High
A-005	tests/01-navigation.spec.ts	Visitor reaches destination content	Destination area contains meaningful visible content	Route technically loads but renders empty or irrelevant content	Medium
A-006	tests/02-mobile.spec.ts	Visitor opens app on mobile-sized viewport	Mobile page renders usable content	Layout collapse, content overflow, hidden primary content	High
A-007	tests/02-mobile.spec.ts	Visitor attempts to access important content on mobile	Important navigation or call-to-action content remains reachable	Broken mobile menu, unreachable CTA, poor responsive behavior	High

⸻

Test-to-Risk Mapping

Risk	Covered By	Notes
App unavailable after deploy	00-smoke.spec.ts	Confirms homepage does not show a fatal state
Blank page regression	00-smoke.spec.ts	Detects missing visible meaningful content
Bad route / 404	00-smoke.spec.ts, 01-navigation.spec.ts	Checks both initial page and navigation path
Broken CTA or navigation	01-navigation.spec.ts	Validates that a visitor can move through the site
Empty destination content	01-navigation.spec.ts	Ensures navigation leads to useful rendered content
Mobile layout regression	02-mobile.spec.ts	Uses a mobile-sized viewport
Mobile navigation failure	02-mobile.spec.ts	Confirms important content remains reachable

⸻

Assertion Strategy

The suite uses a hybrid model:

1. Playwright handles deterministic setup
    * opens the page
    * sets viewport where needed
    * runs the browser session
    * captures traces, screenshots, and video on failure
2. Passmark validates user intent
    * checks whether the visible page satisfies plain-English expectations
    * avoids overfitting the tests to fragile selectors
    * keeps the regression suite readable for judges and maintainers

⸻

Deterministic Setup Points

The smoke test explicitly loads the homepage before Passmark validates page state:

await page.goto("/", { waitUntil: "domcontentloaded" });
await expect(page).not.toHaveTitle(/404|not found|error/i);

The mobile test explicitly sets a mobile viewport before Passmark evaluates usability:

await page.setViewportSize({
  width: 390,
  height: 844
});

This reduces ambiguity and keeps the AI-assisted validation focused on the page state instead of setup.

⸻

Acceptance Criteria

A test run is considered acceptable when:

* all test files are discovered by Playwright
* Chromium launches successfully
* Passmark uses the OpenRouter gateway
* the target app loads successfully
* all three user-facing flows pass
* no .env secrets are committed
* Playwright reports 3 passed

Expected final output:

3 passed
0 failed

⸻

Current Result

Metric	Value
Total tests	3
Passed	3
Failed	0
Browser	Chromium
Execution environment	GitHub Codespaces
AI gateway	OpenRouter
Test runner	Playwright
User-flow validator	Passmark

⸻

Future Assertion Expansion

Future versions should add:

Future Test	Assertion Goal	Priority
Link validation	Confirm external and internal links resolve correctly	High
Accessibility smoke	Confirm basic semantic and keyboard usability	High
Project-page coverage	Confirm project/system pages load useful content	Medium
Contact/conversion flow	Confirm contact or CTA path works	Medium
Screenshot comparison	Detect visual regressions	Medium
Multi-viewport testing	Validate tablet, desktop, and narrow mobile layouts	Medium
CI regression gate	Run tests on push or pull request	High

⸻

Conclusion

This assertion matrix defines a small but complete regression baseline.

The suite does not attempt to test every possible behavior. It validates the first layer of public usability:

Can the app load?
Can visitors navigate?
Can mobile visitors use it?

For a hackathon submission, that creates a clean, reproducible, judge-readable proof that Passmark and Playwright are working against a real deployed application.
