# Orders Fulfillment — Negative Cases

## TC-015 — FEAT-005

**Test Case ID:** TC-015
**Feature:** FEAT-005
**Priority:** P0
**Type:** API / security / IDOR
**Preconditions:** Two test users and two synthetic orders exist in isolated DB.

**Steps:**
1. As customer A, query `/api/order/my?id={A}`.
2. Change query ID to customer B.
3. Request customer B order directly via `/api/order/{orderB}`.
4. Attempt cancellation with another user ID and inspect data/change.

**Test Data:** Fake user/order IDs and synthetic shipping addresses.

**Expected Result:** Only verified owner or authorized admin can read or change the intended order; no cross-user shipping/address data is disclosed.

**Actual Result:** NOT_EXECUTED. Static source shows `/my` and order GET do not authenticate/authorize caller ownership.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-010, REQ-011
**Related Scenario:** SCN-015
**Related Bug:** BUG-008
**Last Executed:** NOT_EXECUTED
## TC-016 — FEAT-005

**Test Case ID:** TC-016
**Feature:** FEAT-005
**Priority:** P1
**Type:** Functional / API / state boundary
**Preconditions:** Synthetic orders exist in Processing, Shipped, Delivered and Cancelled states.

**Steps:**
1. Attempt customer cancellation for each state.
2. Attempt admin cancellation for each state.
3. Repeat cancellation after a successful cancellation.
4. Compare UI availability with API response and persisted record/status.

**Test Data:** Disposable test orders only; no real paid transactions.

**Expected Result:** UI and API use one owner-approved cancellation rule, reject ineligible states, and return a consistent idempotent outcome. Confirm whether cancel sets status or deletes record.

**Actual Result:** NOT_EXECUTED. Source UI offers customer cancel for Shipped; API rejects Shipped/Delivered and deletes eligible orders.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-011
**Related Scenario:** SCN-016
**Related Bug:** None
**Last Executed:** NOT_EXECUTED
