# Identity Access — Positive Cases

## TC-005 — FEAT-002

**Test Case ID:** TC-005
**Feature:** FEAT-002
**Priority:** P1
**Type:** Functional / integration
**Preconditions:** Firebase test project and disposable Mongo DB are configured; no existing profile for synthetic UID.

**Steps:**
1. Open `/login` and complete Google sign-in with a test account.
2. Attempt submission with missing gender/DOB and observe validation feedback.
3. Select allowed gender and DOB and sign in again.
4. Inspect persisted profile and role using a safe test-only DB query.

**Test Data:** Synthetic Firebase identity; email under `example.invalid` where supported; no real account credentials in evidence.

**Expected Result:** New profile is created only with required fields; role follows first-user bootstrap code; app returns to home and profile hydrates. Confirm bootstrap policy before release.

**Actual Result:** NOT_EXECUTED; Firebase/Mongo test services were not supplied.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-004
**Related Scenario:** SCN-005
**Related Bug:** BUG-007
**Last Executed:** NOT_EXECUTED
