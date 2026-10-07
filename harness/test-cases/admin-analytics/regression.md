# Admin Analytics — Regression Cases

## TC-024 — FEAT-008

**Test Case ID:** TC-024
**Feature:** FEAT-008
**Priority:** P2
**Type:** Integration / regression / cache
**Preconditions:** Isolated Redis configured; test product/order/user data; capture cold response.

**Steps:**
1. Read latest catalog and dashboard stats to populate cache.
2. Perform a test-only mutation through supported API.
3. Read the same endpoints again and compare to DB.
4. Repeat with Redis absent/no-op mode.

**Test Data:** Synthetic records; no production cache keys/data.

**Expected Result:** Mutations invalidate every relevant key; returned data is fresh with Redis and correct with no Redis. Record TTL behavior if configured.

**Actual Result:** NOT_EXECUTED. Source key mismatch: latest API caches `latest-products-v2`, helper deletes `latest-products`; stats caches `admin-stats-frontend-v2`, helper deletes `admin-stats`.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-001, REQ-016
**Related Scenario:** SCN-024
**Related Bug:** BUG-009
**Last Executed:** NOT_EXECUTED
