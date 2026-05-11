# Submission Checklist
## Status
Current submission state:
```txt
Repo: pushed
Tests: passing
Final result: 3 passed, 0 failed

Primary remaining tasks:

1. publish Hashnode article
2. add #BreakingAppsHackathon
3. publish social post
4. paste final article link into social post / repo docs if time permits

⸻

Repository Checklist

Item	Status	Notes
Public GitHub repository exists	✅	popdeuxrem/breaking-apps-lysergic-passmark
README exists	✅	Describes target, stack, setup, and final result
package.json exists	✅	Includes test, report, and verify scripts
.gitignore exists	✅	Ignores .env, reports, test results, logs, and dependencies
.env.example exists	✅	Documents required environment variables
.env is not committed	✅	Must remain ignored
Playwright config exists	✅	playwright.config.ts
Passmark gateway configured	✅	OpenRouter configured through configure()
Test files exist	✅	3 test files under tests/
Docs folder exists	✅	Test plan, findings, assertion matrix, article draft, social post
Verification script exists	✅	scripts/verify.sh

⸻

Required Repository Files

Confirm these files exist before final submission:

README.md
package.json
package-lock.json
.gitignore
.env.example
playwright.config.ts
tests/00-smoke.spec.ts
tests/01-navigation.spec.ts
tests/02-mobile.spec.ts
docs/TEST_PLAN.md
docs/ASSERTION_MATRIX.md
docs/FINDINGS.md
docs/SUBMISSION_CHECKLIST.md
docs/ARTICLE_DRAFT.md
docs/SOCIAL_POST.md
scripts/verify.sh

Run:

ls -la
find tests docs scripts -maxdepth 2 -type f | sort

⸻

Secret Safety Checklist

Before every commit:

git check-ignore .env
git status --short

Expected result:

.env

Do not commit:

.env
OPENROUTER_API_KEY
AI_GATEWAY_API_KEY
playwright-report/
test-results/

If .env appears in git status, stop and run:

git rm --cached .env
echo ".env" >> .gitignore
git add .gitignore

⸻

Test Suite Checklist

Test	File	Status
Homepage smoke test	tests/00-smoke.spec.ts	✅
Primary navigation test	tests/01-navigation.spec.ts	✅
Mobile usability test	tests/02-mobile.spec.ts	✅

Final test result:

3 passed
0 failed

Run again if needed:

npm test

Open report if needed:

npm run report

⸻

Local Verification Checklist

Run:

npm run verify

Expected checks:

* required files exist
* .env is ignored
* Playwright discovers all tests

Then run:

npm test

Expected result:

3 passed
0 failed

⸻

Git Checklist

Check state:

git status --short

Commit regenerated docs:

git add README.md docs scripts .gitignore .env.example package.json playwright.config.ts tests
git commit -m "docs: finalize Breaking Apps submission artifacts"
git push

If there is nothing to commit:

git log --oneline -5

⸻

GitHub Repository Checklist

Open the repository in a browser:

https://github.com/popdeuxrem/breaking-apps-lysergic-passmark

Confirm:

* repository is public
* README renders correctly
* tests/ directory is visible
* docs/ directory is visible
* .env is not visible
* latest commit includes regenerated docs
* repo description mentions Breaking Apps / Passmark / Playwright

Suggested repo description:

Breaking Apps Hackathon submission: Passmark + Playwright regression tests for a deployed Lysergic Systems web app.

Suggested repo topics:

passmark
playwright
testing
ai-testing
regression-testing
breaking-apps-hackathon
openrouter
typescript

⸻

Hashnode Article Checklist

Use:

docs/ARTICLE_DRAFT.md

Article title:

Breaking My Developer System with Passmark: Plain-English Regression Testing for a Production Web App

Before publishing, confirm the article includes:

* problem statement
* what was built
* target app link
* GitHub repo link
* test coverage
* example test
* setup issues encountered
* final result: 3 passed, 0 failed
* future improvements
* #BreakingAppsHackathon

Required tag:

#BreakingAppsHackathon

Required links:

GitHub repo: https://github.com/popdeuxrem/breaking-apps-lysergic-passmark
Live app: https://lysergic-systems.vercel.app

⸻

Social Post Checklist

Use:

docs/SOCIAL_POST.md

Before posting, replace:

[paste Hashnode link]

with the final article URL.

Minimum social post must include:

* #BreakingAppsHackathon
* GitHub repo link
* Hashnode article link
* final result or summary
* mention Passmark + Playwright

Primary post:

I joined the #BreakingAppsHackathon by building a Passmark + Playwright regression suite for my deployed Lysergic Systems web app.
The suite tests the public surface that should never silently break:
- homepage loading
- primary navigation
- mobile usability
Final run:
3 passed
0 failed
The goal was simple: use plain-English testing to catch user-facing regressions before shipping changes.
Repo: https://github.com/popdeuxrem/breaking-apps-lysergic-passmark
Article: [paste Hashnode link]
#Playwright #Testing #AI #DevTools

⸻

Final Submission Checklist

Requirement	Status
Public GitHub repo	✅
Passmark + Playwright test suite	✅
Tests passing	✅
README completed	✅
Docs completed	✅
Hashnode article published	⬜
Article tagged #BreakingAppsHackathon	⬜
Social post published	⬜
Social post links repo + article	⬜

⸻

Final Proof Block

Use this in article/social/submission notes:

Repository: https://github.com/popdeuxrem/breaking-apps-lysergic-passmark
Live app: https://lysergic-systems.vercel.app
Stack: Passmark + Playwright + OpenRouter + GitHub Codespaces
Coverage: homepage smoke, primary navigation, mobile usability
Final result: 3 passed, 0 failed
Tag: #BreakingAppsHackathon

⸻

Deadline Mode

If time is almost gone, do only these:

1. publish docs/ARTICLE_DRAFT.md on Hashnode
2. ensure #BreakingAppsHackathon is present
3. post the primary social post from docs/SOCIAL_POST.md
4. make sure both links are public

Minimum viable final state:

Public repo + Hashnode article + #BreakingAppsHackathon + social post


## Published Links

Repository:

```txt
https://github.com/popdeuxrem/breaking-apps-lysergic-passmark
```

Hashnode article:

```txt
https://lysergic-systems.hashnode.dev/breaking-my-developer-system-with-passmark-plain-english-regression-testing-for-a-production-web-app
```

X post:

```txt
https://x.com/fubjou_10022/status/2053711074223075619?s=46
```
