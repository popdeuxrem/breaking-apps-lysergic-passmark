# Test Plan
## Objective
Use **Passmark** and **Playwright** to validate that a deployed Lysergic Systems web app remains usable after changes.
This suite is intentionally small, fast, and submission-safe. It validates the first regression layer every public web app needs:
1. page availability
2. navigation usability
3. mobile access
## Target
Default target:
```txt
https://lysergic-systems.vercel.app

Override with:

BASE_URL=

Scope

The suite focuses on high-confidence, user-facing checks.

Test File	Flow	Purpose
tests/00-smoke.spec.ts	Homepage smoke	Confirms the app loads and presents meaningful identity/content
tests/01-navigation.spec.ts	Primary navigation	Confirms a visitor can navigate through the primary site experience
tests/02-mobile.spec.ts	Mobile usability	Confirms important content remains reachable on a mobile viewport

Out of Scope

The following are intentionally excluded from this submission:

* authentication
* payment flows
* private dashboards
* database writes
* destructive actions
* CAPTCHA-protected apps
* visual snapshot comparison
* accessibility auditing
* performance benchmarking
* load testing
* security scanning

Runtime Environment

Expected runtime:

* Node.js
* npm
* Playwright Chromium
* Passmark
* OpenRouter API key
* GitHub Codespaces or equivalent Linux environment

Required Environment Variables

OPENROUTER_API_KEY=
AI_GATEWAY_API_KEY=
BASE_URL=

Setup

npm install
cp .env.example .env
npx playwright install chromium

If Chromium dependencies are missing in Codespaces:

sudo npx playwright install-deps chromium
npx playwright install chromium

Execution

Run all tests:

npm test

Open report:

npm run report

Verify repo structure and test discovery:

npm run verify

Success Criteria

The suite is considered successful when:

* repository is public
* .env is ignored
* .env.example documents required keys
* npm test executes the Passmark + Playwright suite
* all three tests pass
* Hashnode article includes #BreakingAppsHackathon
* article links to the GitHub repository
* social post links to both the article and repository

Final Result

3 passed
0 failed

