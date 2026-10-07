# Toolchain — Positive Cases

## TC-030 — Tooling / build

**Test Case ID:** TC-030
**Feature:** Tooling / build
**Priority:** P1
**Type:** Automated build verification
**Preconditions:** `npm ci` completed; no runtime credentials were supplied.

**Steps:**
1. Run `npm run build` from repository root.
2. Capture exit status, generated route table and warnings.

**Test Data:** Tracked repository source/config at commit d445d93.

**Expected Result:** Next production build exits 0 and type-checks/generates route output.

**Actual Result:** Exit 0; Next 16.1.7 production build compiled, TypeScript ran, static generation completed (44/44), and the build emitted its App Router route table. Sass `@import` deprecation warnings were emitted.

**Status:** PASS
**Automation:** AUTOMATED
**Evidence:** [Build log](../../evidence/logs/RUN-20261007-01-build.log)
**Related Requirement:** Tooling baseline (no REQ ID)
**Related Scenario:** SCN-030
**Related Bug:** None
**Last Executed:** 2026-10-07

## TC-032 — Tooling / harness utility

**Test Case ID:** TC-032
**Feature:** Tooling / API smoke utility
**Priority:** P2
**Type:** Automated syntax and safety-guard validation
**Preconditions:** Node is installed; checkout contains `public-smoke.mjs`.

**Steps:**
1. Run `node --check harness/automation/api/public-smoke.mjs`.
2. Run with `HARNESS_BASE_URL=https://example.com` and without `HARNESS_ALLOW_REMOTE=1`.
3. Confirm the script exits 2 before issuing a request and prints the remote-target refusal.

**Test Data:** Harness source; URL is a guard-test input only and must not be contacted.

**Expected Result:** Script parses with exit 0; non-local target is rejected with exit 2 before `fetch`.

**Actual Result:** Syntax check exited 0. Remote-target guard exited 2 with the expected refusal; no network request was made.

**Status:** PASS
**Automation:** AUTOMATED
**Evidence:** [Syntax log](../../evidence/logs/RUN-20261007-01-smoke-syntax.log); [guard log](../../evidence/logs/RUN-20261007-01-smoke-guard.log)
**Related Requirement:** Harness maintenance check (no product REQ ID)
**Related Scenario:** SCN-032
**Related Bug:** None
**Last Executed:** 2026-10-07

## TC-033 — Tooling / documentation integrity

**Test Case ID:** TC-033
**Feature:** Tooling / harness documentation
**Priority:** P2
**Type:** Automated documentation link check
**Preconditions:** Python 3 is available; harness Markdown files are present.

**Steps:**
1. Run `python3 harness/automation/utilities/check-markdown-links.py` from the repository root.
2. Capture the reported Markdown file count and exit status.

**Test Data:** Harness Markdown files and relative links; no application data.

**Expected Result:** All relative Markdown file links resolve; script exits 0.

**Actual Result:** All relative Markdown file links resolve; see recorded output and checked-file count in the link-check log.

**Status:** PASS
**Automation:** AUTOMATED
**Evidence:** [Markdown link check log](../../evidence/logs/RUN-20261007-01-links.log)
**Related Requirement:** Harness maintenance check (no product REQ ID)
**Related Scenario:** SCN-033
**Related Bug:** None
**Last Executed:** 2026-10-07
