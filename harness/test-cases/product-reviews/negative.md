# Product Reviews — Negative Cases

## TC-019 — FEAT-006

**Test Case ID:** TC-019
**Feature:** FEAT-006
**Priority:** P1
**Type:** API / security
**Preconditions:** One review owned by test user A; test user B and optional test admin exist.

**Steps:**
1. Delete review as owner A.
2. Attempt deletion with user B ID for the same product.
3. Attempt deletion with missing/unknown user ID.
4. Verify review and product aggregate after each attempt.

**Test Data:** Synthetic IDs; do not use real user comments.

**Expected Result:** Only authenticated owner (or an explicitly defined admin) can delete; unauthorized attempts do not change review or aggregate.

**Actual Result:** NOT_EXECUTED. Static handler scopes query by supplied user/product but does not authenticate supplied ID.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-012
**Related Scenario:** SCN-019
**Related Bug:** BUG-007
**Last Executed:** NOT_EXECUTED
