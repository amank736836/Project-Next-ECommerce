# Checkout Payments — Positive Cases

## TC-012 — FEAT-004

**Test Case ID:** TC-012
**Feature:** FEAT-004
**Priority:** P0
**Type:** End-to-end / integration
**Preconditions:** Isolated Firebase, MongoDB, Razorpay sandbox and test product are configured; product has enough stock.

**Steps:**
1. Sign in as synthetic customer and add test item.
2. Enter all required shipping fields.
3. Start checkout and inspect server-created amount/currency/order ID.
4. Complete a sandbox payment.
5. Verify signature, order/payment records, stock, order list and success route.

**Test Data:** Synthetic cart/shipping; Razorpay sandbox only; no real card or production credentials.

**Expected Result:** Server validates cart/pricing/stock/coupon, creates Razorpay order, verifies callback, persists one order and payment, decrements stock once, and renders confirmation.

**Actual Result:** NOT_EXECUTED; external test services absent. Static source reveals create payload mismatch, missing order totals and missing payment persistence route.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-008, REQ-009, REQ-010
**Related Scenario:** SCN-012 / SCN-014
**Related Bug:** BUG-002, BUG-003, BUG-004
**Last Executed:** NOT_EXECUTED
