#!/usr/bin/env bash
set -euo pipefail

required_files=(
  "README.md"
  "package.json"
  "playwright.config.ts"
  ".env.example"
  ".gitignore"
  "tests/00-smoke.spec.ts"
  "tests/01-navigation.spec.ts"
  "tests/02-mobile.spec.ts"
  "docs/TEST_PLAN.md"
  "docs/ASSERTION_MATRIX.md"
  "docs/FINDINGS.md"
  "docs/SUBMISSION_CHECKLIST.md"
  "docs/ARTICLE_DRAFT.md"
  "docs/SOCIAL_POST.md"
)

for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing required file: $file"
    exit 1
  fi
done

if [[ -f ".env" ]]; then
  git check-ignore .env >/dev/null || {
    echo "ERROR: .env exists but is not ignored by git"
    exit 1
  }
fi

npx playwright test --list

echo "Verification complete"
