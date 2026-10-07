# Toolchain — Negative Cases

## TC-029 — Tooling / lint

**Test Case ID:** TC-029
**Feature:** Tooling / lint
**Priority:** P1
**Type:** Automated static quality
**Preconditions:** `npm ci` completed in checkout at commit d445d93.

**Steps:**
1. Run `npm run lint` from repository root.
2. Capture exit status and complete ESLint output.

**Test Data:** Tracked repository source; no external data.

**Expected Result:** Command exits 0 with no lint errors.

**Actual Result:** Exit 1; ESLint reported 63 errors and 52 warnings (115 findings total).

**Status:** FAIL
**Automation:** AUTOMATED
**Evidence:** [Lint log](../../evidence/logs/RUN-20261007-01-lint.log)
**Related Requirement:** Tooling baseline (no REQ ID)
**Related Scenario:** SCN-029
**Related Bug:** BUG-010
**Last Executed:** 2026-10-07
## TC-031 — Tooling / dependency security

**Test Case ID:** TC-031
**Feature:** Tooling / dependency security
**Priority:** P0
**Type:** Automated dependency audit
**Preconditions:** Lockfile installed; npm registry audit available.

**Steps:**
1. Run `npm audit --json` without changing package/lock files.
2. Record counts, direct vulnerable packages, fixes reported by npm, and audit date.

**Test Data:** `package-lock.json`; no secrets or production endpoints.

**Expected Result:** No critical/high advisories under the harness review threshold; any findings are triaged and linked to an owner-approved remediation plan.

**Actual Result:** 29 findings: 1 low, 6 moderate, 19 high and 3 critical. Direct advisories include `next` (critical), `axios` (high), `mongoose` (moderate), and `eslint-config-next` (high). Audit data is time-sensitive; see report for full summary.

**Status:** FAIL
**Automation:** AUTOMATED
**Evidence:** [Dependency audit report](../../reports/dependency-audit.md)
**Related Requirement:** Security NFR not yet approved
**Related Scenario:** SCN-031
**Related Bug:** BUG-011
**Last Executed:** 2026-10-07
