# Security Api — Edge Cases Cases

## TC-028 — Cross-cutting API

**Test Case ID:** TC-028
**Feature:** Cross-cutting API
**Priority:** P1
**Type:** Security / performance / API
**Preconditions:** Local/disposable app with bounded logs and request timeout.

**Steps:**
1. Send bounded search terms containing regex metacharacters and nested/repetition patterns.
2. Repeat a small controlled batch at low concurrency.
3. Observe status, query time, CPU/log behavior and DB query plan.
4. Stop if resource use rises unexpectedly; do not perform DoS testing.

**Test Data:** Synthetic query strings only, max length agreed with owner; no record mutations.

**Expected Result:** Search input is safely escaped/validated or bounded; response cost remains controlled under an approved test threshold.

**Actual Result:** NOT_EXECUTED. Search is passed into Mongo `$regex` without escaping; no rate limit or input size bound was found in source.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-002; security NFR UNKNOWN
**Related Scenario:** SCN-028
**Related Bug:** BUG-012
**Last Executed:** NOT_EXECUTED
