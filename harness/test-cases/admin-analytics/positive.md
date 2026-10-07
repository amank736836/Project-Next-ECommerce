# Admin Analytics — Positive Cases

## TC-023 — FEAT-008

**Test Case ID:** TC-023
**Feature:** FEAT-008
**Priority:** P2
**Type:** Functional / API / database
**Preconditions:** Admin and controlled synthetic users/products/orders with known dates/statuses; isolated Redis optional.

**Steps:**
1. Request stats, bar, line and pie endpoints as test admin.
2. Independently calculate expected fixture counts/totals/month buckets.
3. Compare response arrays/aggregates and displayed charts.
4. Repeat with empty collections and zero previous-month values.

**Test Data:** Synthetic dataset only; dates around month boundaries; include Processing/Shipped/Delivered orders.

**Expected Result:** All metrics and chart shapes match an agreed formula and fixture oracle; no-data/zero cases remain finite and stable.

**Actual Result:** NOT_EXECUTED. Metric definitions/oracle have not been approved.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-016
**Related Scenario:** SCN-023
**Related Bug:** BUG-009
**Last Executed:** NOT_EXECUTED
