# Test Summary — RUN-20261007-01

**Run date:** 2026-10-07  
**Commit:** `d445d93`  
**Environment:** Local sandbox checkout; Node 22.22.3, npm 10.9.8; no external app test services or `.env` configured.  
**Tester/agent:** Arena coding agent  
**Test suite:** Repository lint/build/dependency audit plus harness utility syntax/guard and documentation-link checks. No application functional suite was executed.

| Metric | Result |
|---|---:|
| Total harness cases | 33 |
| Passed | 3 |
| Failed | 2 |
| Blocked | 0 |
| Not run | 28 |
| Executed | 5 |
| Pass rate among executed checks | 60% (3/5) |
| Application cases executed | 0/28 |

## Executed checks

1. **TC-029 / `npm run lint` — FAIL.** Exit 1; 63 errors and 52 warnings. The build check is separate and did not make lint pass.
2. **TC-030 / `npm run build` — PASS.** Exit 0; production build/type check/static generation completed. Sass emitted deprecation warnings for `@import`.
3. **TC-031 / `npm audit --json` — FAIL/findings.** 29 advisory records: 3 critical, 19 high, 6 moderate, 1 low. See [dependency audit](dependency-audit.md).
4. **TC-032 / smoke-runner syntax and remote guard — PASS.** `node --check` exited 0; unauthorized non-local target exited 2 before `fetch`.
5. **TC-033 / harness Markdown link check — PASS.** Relative file links resolved across 178 Markdown files.

Logs: [lint](../evidence/logs/RUN-20261007-01-lint.log), [build](../evidence/logs/RUN-20261007-01-build.log), [audit](../evidence/logs/RUN-20261007-01-audit.log), [syntax](../evidence/logs/RUN-20261007-01-smoke-syntax.log), [remote guard](../evidence/logs/RUN-20261007-01-smoke-guard.log), [link check](../evidence/logs/RUN-20261007-01-links.log).

## Not executed

All 28 application behavior scenarios/cases are `NOT_EXECUTED`: no disposable MongoDB, Firebase test project, Redis, Cloudinary test account, Razorpay sandbox configuration, or browser automation environment was supplied. The public API smoke runner was not run against an app. No database writes, payment calls, screenshots, videos, API response evidence, performance runs, VAPT, or source-code coverage measurement were produced.

## Critical failures / known limitations

- Checkout route contracts do not align across UI and API (`BUG-001`–`BUG-004`); review submission (`BUG-005`) also has response and route contract mismatches.
- Static security findings include unauthenticated debug data exposure, unbound caller-supplied admin IDs, and unguarded user/order reads (`BUG-006`–`BUG-008`).
- npm audit contains critical/high dependency advisories (`BUG-011`); lint baseline fails (`BUG-010`).
- Release recommendation: NOT READY on available evidence. Full conditions in `release-readiness.md`.