# Cart Coupons — Negative Cases

## TC-011 — FEAT-003

**Test Case ID:** TC-011
**Feature:** FEAT-003
**Priority:** P1
**Type:** Functional / API / regression
**Preconditions:** Test coupon code and an invalid code exist/do not exist in test DB; app and API reachable.

**Steps:**
1. Apply valid code in `/cart` and observe network request and totals.
2. Apply a code that does not exist.
3. Call the implemented `GET /api/payment/discount?coupon=...` directly and compare with the UI request.
4. Clear the code and verify discount reset.

**Test Data:** Synthetic coupon with fixed amount; invalid code generated for test. No coupon writes in production.

**Expected Result:** Valid code returns a fixed discount and updates total; invalid/empty code is rejected; UI calls implemented route with supported method and path.

**Actual Result:** NOT_EXECUTED. Static review found UI posts `/api/v1/payment/discount` while backend implements GET `/api/payment/discount`.

**Status:** NOT_RUN
**Automation:** PARTIAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-007
**Related Scenario:** SCN-011
**Related Bug:** BUG-001
**Last Executed:** NOT_EXECUTED
