# Admin Commerce — Edge Cases Cases

## TC-022 — FEAT-007

**Test Case ID:** TC-022
**Feature:** FEAT-007
**Priority:** P1
**Type:** Functional / database / edge
**Preconditions:** Isolated test admin and coupon collection; no shared/production coupon codes.

**Steps:**
1. Create/update/delete a synthetic coupon through admin UI/API.
2. Try duplicate code and amounts 0, negative, and above subtotal.
3. Try generated size 7, 8, 25, 26 and prefix+postfix at/over size.
4. Reload list/detail and inspect persisted generator fields.

**Test Data:** Synthetic unique code and fake amount values; no live customer-discount campaign.

**Expected Result:** Uniqueness and approved amount/length rules are consistently enforced; UI fields intended to persist are stored and read back.

**Actual Result:** NOT_EXECUTED. Schema declares size min/max; create/update handlers persist only code/amount, and amount schema has no range validator.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-015
**Related Scenario:** SCN-022
**Related Bug:** BUG-014
**Last Executed:** NOT_EXECUTED
