# Product Reviews — Edge Cases Cases

## TC-018 — FEAT-006

**Test Case ID:** TC-018
**Feature:** FEAT-006
**Priority:** P1
**Type:** Functional / database / edge
**Preconditions:** A test product and two synthetic users exist; review route contract is verified or bug fixed in test branch.

**Steps:**
1. Create review with rating 1 and comment.
2. Update same user/product to rating 5 and a new comment.
3. Confirm only one review exists and Product aggregate changes.
4. Try rating 0 and 6; delete final review and recalculate aggregate.

**Test Data:** Synthetic product/users and non-sensitive comments; use ratings 1, 5, 0 and 6.

**Expected Result:** Supported route accepts rating 1–5; existing review is updated, not duplicated; count/sum/floored average are correct; invalid range is rejected.

**Actual Result:** NOT_EXECUTED. Client POST path differs from server create route; review GET does not include `reviewButton` as expected by UI.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-012
**Related Scenario:** SCN-018
**Related Bug:** BUG-005
**Last Executed:** NOT_EXECUTED
