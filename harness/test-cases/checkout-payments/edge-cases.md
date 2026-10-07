# Checkout Payments — Edge Cases Cases

## TC-014 — FEAT-004

**Test Case ID:** TC-014
**Feature:** FEAT-004
**Priority:** P0
**Type:** Database / integration / edge
**Preconditions:** Disposable DB and controlled stock product; verify test data snapshot before and after.

**Steps:**
1. Attempt order creation with missing/zero totals and altered client price.
2. Attempt quantity 0, quantity equal to stock, and quantity above stock.
3. Simulate product deletion or a second concurrent order at the same stock boundary.
4. Inspect order/payment documents and product stock.

**Test Data:** One product with stock 1–2; crafted client payloads with no real payment.

**Expected Result:** Server derives/validates price and totals, rejects invalid quantity/state, and stock/order effects are atomic or rolled back on failure.

**Actual Result:** NOT_EXECUTED. Handler trusts client totals and reduces stock before order creation; no transaction/rollback was found.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-010
**Related Scenario:** SCN-014
**Related Bug:** BUG-003
**Last Executed:** NOT_EXECUTED
