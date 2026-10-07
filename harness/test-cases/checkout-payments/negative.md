# Checkout Payments — Negative Cases

## TC-013 — FEAT-004

**Test Case ID:** TC-013
**Feature:** FEAT-004
**Priority:** P0
**Type:** API / security / negative
**Preconditions:** Razorpay signature route is reachable in isolated environment with test secret configured.

**Steps:**
1. Submit missing signature fields.
2. Submit a syntactically valid but tampered signature.
3. Submit a valid test signature for a different order/payment pair.
4. Verify no successful order/payment is created.

**Test Data:** Fake identifiers and locally generated HMAC in test; never publish the secret or signature.

**Expected Result:** Missing/tampered/mismatched signatures return rejection; invalid proof cannot advance payment/order state.

**Actual Result:** NOT_EXECUTED.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-009
**Related Scenario:** SCN-013
**Related Bug:** None
**Last Executed:** NOT_EXECUTED
