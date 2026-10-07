# Content Navigation — Positive Cases

## TC-025 — FEAT-009

**Test Case ID:** TC-025
**Feature:** FEAT-009
**Priority:** P2
**Type:** UI / smoke / accessibility manual
**Preconditions:** Application is serving without requiring login; browser supports mobile viewport emulation.

**Steps:**
1. Visit home, search, About and Policies; verify links and content render.
2. Use mobile menu open/close and follow a link.
3. Use keyboard to reach navigation/actions; inspect focus and accessible names.
4. Visit an unknown route and observe not-found page.

**Test Data:** Desktop and narrow viewport; no database fixture for static pages.

**Expected Result:** Public routes resolve; menu works; keyboard focus is visible; unknown route gives custom not-found. Legal/policy copy is reviewed separately.

**Actual Result:** NOT_EXECUTED.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-017
**Related Scenario:** SCN-025
**Related Bug:** None
**Last Executed:** NOT_EXECUTED
