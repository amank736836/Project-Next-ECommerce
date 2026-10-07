# Storefront Catalog — Edge Cases Cases

## TC-004 — FEAT-001

**Test Case ID:** TC-004
**Feature:** FEAT-001
**Priority:** P2
**Type:** Negative / edge / API
**Preconditions:** Disposable test API and product dataset; capture baseline response/time.

**Steps:**
1. Request empty search and no-match search.
2. Try regex metacharacters such as `[`, `.*`, and a long bounded string.
3. Request page 0, 1, last, last+1, and a negative page.
4. Record response status, JSON, query duration and server logs.

**Test Data:** No write data; query strings only. Keep input size bounded; do not stress a shared environment.

**Expected Result:** Empty/no-match and invalid page/input behavior is controlled; no unhandled exception, regex injection, or unbounded resource use. Define validation semantics with product owner.

**Actual Result:** NOT_EXECUTED.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-002
**Related Scenario:** SCN-004 / SCN-028
**Related Bug:** BUG-012
**Last Executed:** NOT_EXECUTED
