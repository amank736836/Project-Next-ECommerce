# Orders Fulfillment — Regression Cases

## TC-017 — FEAT-005

**Test Case ID:** TC-017
**Feature:** FEAT-005
**Priority:** P1
**Type:** Functional / regression / admin
**Preconditions:** Test admin and one synthetic order in Processing status.

**Steps:**
1. Advance the order once and refresh list/details.
2. Advance again and refresh.
3. Verify Delivered state hides processing controls.
4. Attempt another update only through an explicitly authorized API test.

**Test Data:** Disposable order; no production shipping action.

**Expected Result:** Processing→Shipped→Delivered occurs in order; UI/API agree and cache/list/details refresh after each mutation.

**Actual Result:** NOT_EXECUTED.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-011
**Related Scenario:** SCN-017
**Related Bug:** BUG-009
**Last Executed:** NOT_EXECUTED
