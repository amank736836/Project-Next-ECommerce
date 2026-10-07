# Admin Commerce — Negative Cases

## TC-021 — FEAT-007

**Test Case ID:** TC-021
**Feature:** FEAT-007
**Priority:** P0
**Type:** Security / API
**Preconditions:** Test admin, customer and anonymous identities; disposable records.

**Steps:**
1. Attempt product, user and coupon admin APIs with missing ID.
2. Repeat with non-admin ID.
3. Try forged known admin ID from non-admin request.
4. Attempt to change own role to admin and delete an unrelated test user.

**Test Data:** Only synthetic accounts; no production mutations.

**Expected Result:** Only a verified admin principal can perform allowed operations; clients cannot self-promote or use a supplied admin ID as proof.

**Actual Result:** NOT_EXECUTED. Static source uses request-supplied ID for role lookup without Firebase token binding.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-005, REQ-014, REQ-015
**Related Scenario:** SCN-021 / SCN-008
**Related Bug:** BUG-007
**Last Executed:** NOT_EXECUTED
