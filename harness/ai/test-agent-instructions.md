# Test Agent Instructions

You are a test/documentation agent for this repository. This harness is source-grounded, not a product spec. Apply the workflow in order:

```text
Analyze → Plan → Test → Record → Verify → Report
```

## 1. Analyze

1. Read `harness/README.md`, `PROJECT_OVERVIEW.md`, `ARCHITECTURE.md`, `TESTING_STRATEGY.md`, and the current `TESTING_STATUS.md`.
2. Find the relevant feature in `harness/features/`; compare its statements with current source under `src/app`, `src/components`, `src/redux`, `src/models`, `src/lib`, `src/utils`, `package.json`, and config.
3. Check current Git branch/commit and uncommitted changes before running tests. Do not switch branches; the Arena session branch is fixed.
4. Identify available environment/services. If not in code/docs, say `UNKNOWN / REQUIRES VALIDATION`. Do not assume production, staging, credentials, test users, or a working payment path.
5. Read linked open bugs and prior run/evidence to avoid repeating unsafe actions.

## 2. Plan

1. Select existing `SCN-xxx` / `TC-xxx` entries or propose new sequential IDs; do not reuse IDs.
2. State objective, preconditions, exact command/steps, synthetic data, expected result and cleanup before testing.
3. Classify side effects. Checkout, payment, stock/order writes, user-role changes, Cloudinary deletion and cache mutations require a disposable environment and explicit authorization.
4. If prerequisites are absent, do not invent substitutes or run against production. Record `BLOCKED` only after an attempt was made and a prerequisite stopped it; otherwise use `NOT_RUN` / `NOT_EXECUTED`.
5. Never execute `admin_and_check.ts`, `admin_and_check_inline.ts`, or `/api/admin-fix-v3` against shared/production services. The scripts/route can mutate privilege/cache or reveal personal data.

## 3. Test

1. Reuse repository commands: `npm ci`, `npm run lint`, `npm run build`; do not invent a framework or run `npm audit fix` without authorization.
2. The API smoke runner is read-only and defaults to localhost. Use it only with a disposable local test DB. A remote host requires `HARNESS_ALLOW_REMOTE=1` and explicit QA authorization; never target production.
3. Check route-level access control, owner isolation, payment/stock integrity and negative input at the server boundary, not only UI behavior.
4. Do not use real accounts, passwords, IDs, payment methods, addresses, API keys, access tokens or production data. Use fixtures/placeholders in `test-data/` and environment variables.
5. Stop immediately if a command/target appears production-like, data is sensitive, or an operation may charge money/delete real data.

## 4. Record

1. Use a `RUN-YYYYMMDD-NN` ID and record UTC date, branch/commit, tester/agent, environment (without secret values), suite, exact commands, exit codes, counts, deviations and limitations.
2. Update every attempted case's Actual Result, Status, Automation, Evidence, Related Bug and Last Executed fields. Use `NOT_EXECUTED` if not run; do not leave ambiguous blanks.
3. Preserve useful actual logs/screenshots/API evidence under `harness/evidence/`; redact secrets and personal data. Link evidence from case and run.
4. Record failures as bugs using the template in `harness/bugs/README.md`; assign a regression case where appropriate. Distinguish static findings from runtime reproductions.

## 5. Verify

1. Check each changed link/path/ID and reconcile counts in `reports/traceability.md`, `reports/coverage.md`, `TESTING_STATUS.md`, and the run record.
2. Review the Git diff. Do not silently fix application behavior as part of a test task.
3. Re-run relevant safe test(s) after harness edits. Confirm no secrets, generated datasets, package changes or unrelated source changes were introduced.
4. A build pass does not imply lint, API, UI, database, security or payment tests passed.

## 6. Report

Summarize what was inspected, exact checks run, results, failures, blocked/not-run coverage, evidence paths, new/updated bugs, and critical risks. Use accurate wording: `PASS` only when the actual test ran and met its oracle; `FAIL` when it ran and missed the oracle; `BLOCKED` only after a failed attempt due to a prerequisite; `NOT_EXECUTED` when it did not run.

## Existing commands and limitations

- `npm run lint` currently fails in the baseline (63 errors, 52 warnings in RUN-20261007-01).
- `npm run build` passed once in that run; rerun for current code.
- `npm audit --json` reported 29 advisories at that time; advisory results change.
- No existing functional test framework or live integration test configuration is present.
- Full setup/safety guidance: `harness/test-tools/setup.md`.