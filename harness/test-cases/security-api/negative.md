# Security Api — Negative Cases

## TC-026 — Cross-cutting API

**Test Case ID:** TC-026
**Feature:** Cross-cutting API
**Priority:** P1
**Type:** API / negative / validation
**Preconditions:** Disposable app/API and database; capture expected route schemas/status codes.

**Steps:**
1. For user/product/order/coupon/review/payment routes, omit required fields.
2. Supply malformed ObjectIds, invalid enum/status, invalid numeric values and wrong HTTP methods.
3. Inspect status/JSON and DB/media side effects.

**Test Data:** Synthetic malformed inputs only; no secrets; no valid mutation data.

**Expected Result:** Inputs are validated with 4xx responses; no 500 stack disclosure, unintended writes, stock changes or Cloudinary side effects.

**Actual Result:** NOT_EXECUTED.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** Cross-cutting
**Related Scenario:** SCN-026
**Related Bug:** BUG-002, BUG-003, BUG-005, BUG-007
**Last Executed:** NOT_EXECUTED
## TC-027 — Cross-cutting API

**Test Case ID:** TC-027
**Feature:** Cross-cutting API
**Priority:** P0
**Type:** Security / VAPT / privacy
**Preconditions:** Authorized isolated app with synthetic user/order; do not use real PII.

**Steps:**
1. Request `/api/admin-fix-v3` without credentials.
2. Request `/api/user/{knownTestId}` and `/api/order/{knownTestOrder}` without owner credentials.
3. Send an inert OPTIONS preflight with an untrusted origin; inspect CORS headers, response fields, cache effects and logs without invoking unsafe mutations beyond the isolated debug-route probe.
4. Verify a fixed release denies or minimizes all unauthorized data.

**Test Data:** Synthetic profile/address only; never use production IDs.

**Expected Result:** Unauthenticated callers cannot clear internal cache or obtain user/order personal data; sensitive fields and stack/config data are not exposed.

**Actual Result:** NOT_EXECUTED. Source review found the debug route returns `userFromDB` with no auth; user/order GET routes also lack caller authorization.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** Cross-cutting security/privacy
**Related Scenario:** SCN-027
**Related Bug:** BUG-006, BUG-008
**Last Executed:** NOT_EXECUTED
