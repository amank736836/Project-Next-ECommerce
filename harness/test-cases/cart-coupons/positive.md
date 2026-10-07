# Cart Coupons — Positive Cases

## TC-009 — FEAT-003

**Test Case ID:** TC-009
**Feature:** FEAT-003
**Priority:** P1
**Type:** Functional / UI
**Preconditions:** Product with stock 3 is visible; cart state is empty.

**Steps:**
1. Add the product from a card.
2. Increment to quantity 3.
3. Attempt increment to 4.
4. Decrement to 2 and remove the item.
5. Verify cart count and list.

**Test Data:** Synthetic product ID with price and stock 3.

**Expected Result:** One cart row exists; quantity never exceeds stock; decrement/removal update row and header count correctly.

**Actual Result:** NOT_EXECUTED.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-006
**Related Scenario:** SCN-009
**Related Bug:** None
**Last Executed:** NOT_EXECUTED
