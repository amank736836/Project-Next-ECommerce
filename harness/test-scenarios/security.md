# Security / VAPT Scenarios

This is a test plan, not a penetration-test result. Run only in an authorized isolated environment with synthetic accounts/data. No VAPT scanner was found or run.

| ID | Risk/check | Case |
|---|---|---|
| SCN-007–SCN-008 | Missing/non-admin/admin-ID spoof across dashboard, user, product, coupon, order mutations; prove server binds verified Firebase principal to role. | TC-007–TC-008 |
| SCN-015 | IDOR: substitute another user's ID/order ID on order list/details/cancellation. | TC-015 |
| SCN-019 | Review mutation ownership; change supplied user ID/product ID. | TC-019 |
| SCN-021–SCN-022 | Admin role escalation/forged identity, coupon/product/customer API access. | TC-021–TC-022 |
| SCN-026 | Malformed ObjectIds, missing required fields, unexpected methods, injection/control characters. | TC-026 |
| SCN-027 | Unauthenticated `/api/admin-fix-v3`; direct user/order read; PII exposure; CORS and sensitive error/log response review. | TC-027 |
| SCN-028 | Mongo regex metacharacters / ReDoS-style search inputs and request abuse limits. | TC-028 |
| SCN-031 | npm lockfile advisory scan. | TC-031; executed, findings in dependency audit report. |

Source review shows concerns already filed as `BUG-006`–`BUG-008`, plus 29 npm audit findings. These are not substitutes for runtime verification. Security status is NOT_EXECUTED for API/VAPT scenarios and release readiness is NOT READY.
