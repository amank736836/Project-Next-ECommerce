# Identity Access — Regression Cases

## TC-006 — FEAT-002

**Test Case ID:** TC-006
**Feature:** FEAT-002
**Priority:** P1
**Type:** Functional / regression / integration
**Preconditions:** A synthetic Firebase account and corresponding app profile exist in the disposable DB.

**Steps:**
1. Sign in and verify the header/profile state.
2. Reload the page and wait for `onAuthStateChanged`.
3. Sign out and verify user state/admin link is cleared.
4. Sign in as the same account again.

**Test Data:** One test customer and, separately, one test admin identity.

**Expected Result:** Auth state consistently hydrates the correct profile; logout clears the client user; no stale role remains across session changes.

**Actual Result:** NOT_EXECUTED.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-004, REQ-005
**Related Scenario:** SCN-006
**Related Bug:** None
**Last Executed:** NOT_EXECUTED
