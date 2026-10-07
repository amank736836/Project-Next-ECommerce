# Cart Coupons — Edge Cases Cases

## TC-010 — FEAT-003

**Test Case ID:** TC-010
**Feature:** FEAT-003
**Priority:** P1
**Type:** Functional / edge
**Preconditions:** Reducer/page can be exercised with synthetic cart items; product owner confirms expected shipping rule.

**Steps:**
1. Compute totals for empty cart and subtotal values 1, 1000 and 1001.
2. For a fixed subtotal, apply discount 0, equal to subtotal, and greater than subtotal.
3. Compare UI totals to independent calculations and Policies copy.

**Test Data:** `test-data/edge-cases/cart-pricing.json`; exact currencies are integer rupees as currently represented.

**Expected Result:** Subtotal/tax/discount/total are internally consistent and follow an approved shipping policy. Current reducer computes ₹200 below/equal ₹1000 and free above; Policies text differs, so final expected shipping rule is UNKNOWN / REQUIRES VALIDATION.

**Actual Result:** NOT_EXECUTED.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-006, REQ-007
**Related Scenario:** SCN-010
**Related Bug:** None
**Last Executed:** NOT_EXECUTED
