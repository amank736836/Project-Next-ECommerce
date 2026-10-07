# Identity Access — Negative Cases

## TC-007 — FEAT-002

**Test Case ID:** TC-007
**Feature:** FEAT-002
**Priority:** P1
**Type:** Negative / security / UI + API
**Preconditions:** Test visitor and regular customer accounts exist.

**Steps:**
1. Open `/admin/dashboard` without a signed-in account.
2. Repeat as a regular customer.
3. Call an admin-only read API with missing ID and with the customer ID.
4. Verify no protected data is rendered or returned.

**Test Data:** No admin writes; synthetic non-admin IDs only.

**Expected Result:** UI redirects/blocks and server returns unauthorized/forbidden without returning dashboard/customer data.

**Actual Result:** NOT_EXECUTED.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-005
**Related Scenario:** SCN-007
**Related Bug:** BUG-007
**Last Executed:** NOT_EXECUTED
## TC-008 — FEAT-002

**Test Case ID:** TC-008
**Feature:** FEAT-002
**Priority:** P0
**Type:** Security / API
**Preconditions:** Authorized test environment has a test admin and non-admin; capture admin-only endpoint baseline.

**Steps:**
1. Authenticate as non-admin (or anonymous).
2. Send an admin API request while supplying the known admin UID in the `id` query parameter.
3. Repeat for product/user/coupon/order mutation only with harmless disposable records, if specifically authorized.
4. Record whether server binds supplied ID to authenticated caller.

**Test Data:** Synthetic identities and disposable records only. No production/admin account.

**Expected Result:** Request is denied unless the request is cryptographically authenticated as the same admin; a caller-controlled ID alone must not grant access.

**Actual Result:** NOT_EXECUTED. Source review shows handlers trust the query ID and do not verify a Firebase token.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-005
**Related Scenario:** SCN-008
**Related Bug:** BUG-007
**Last Executed:** NOT_EXECUTED
