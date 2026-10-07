# Bugs and Issues

This tracker contains findings from static inspection and actual check runs. Static observations are not described as reproduced runtime bugs; their reproducibility is explicitly `UNKNOWN / REQUIRES VALIDATION` where no runtime test occurred.

## Open findings

| ID | Severity | Finding | Source of evidence | Regression case |
|---|---|---|---|---|
| [BUG-001](open/BUG-001.md) | High | Coupon client path/method mismatch | Static source review | TC-011 |
| [BUG-002](open/BUG-002.md) | Critical | Razorpay create body/response mismatch | Static source review | TC-012 |
| [BUG-003](open/BUG-003.md) | Critical | Order create omits required totals; stock changes before create | Static source review | TC-012, TC-014 |
| [BUG-004](open/BUG-004.md) | High | Payment persistence route missing | Static route inventory | TC-012 |
| [BUG-005](open/BUG-005.md) | High | Review UI write control/POST route contract mismatch | Static route/response review | TC-018 |
| [BUG-006](open/BUG-006.md) | Critical | Unauthenticated debug API returns user data/mutates cache | Static security review; not invoked | TC-027 |
| [BUG-007](open/BUG-007.md) | Critical | Admin API trusts supplied ID without verified caller binding | Static security review; no exploit test | TC-008, TC-021, TC-026 |
| [BUG-008](open/BUG-008.md) | Critical | User/order read endpoints lack ownership checks | Static security review; no IDOR test | TC-015, TC-027 |
| [BUG-009](open/BUG-009.md) | Medium | Cache invalidation key names differ | Static key comparison | TC-024 |
| [BUG-010](open/BUG-010.md) | Medium | `npm run lint` fails (63 errors/52 warnings) | Executed run log | TC-029 |
| [BUG-011](open/BUG-011.md) | High | npm audit reports 3 critical/19 high advisories | Executed audit report | TC-031 |
| [BUG-012](open/BUG-012.md) | Medium | Raw search string passed to Mongo regex | Static source review; abuse not tested | TC-004, TC-028 |
| [BUG-013](open/BUG-013.md) | Medium | Wildcard API CORS origin with credentials | Static config review; browser test not run | TC-027 |
| [BUG-014](open/BUG-014.md) | Medium | Coupon generator metadata is ignored by create/update APIs | Static source review | TC-022 |

## Issue template

```text
Bug ID:
Title:
Severity:
Priority:
Feature:
Environment:
Preconditions:

Steps to Reproduce:

Expected:

Actual:

Reproducible: YES / NO / INTERMITTENT / UNKNOWN / REQUIRES VALIDATION

Evidence:

Root Cause:

Fix:

Regression Test:

Status: OPEN / IN_PROGRESS / FIXED / VERIFIED / CLOSED
```

Before closing a static finding, reproduce safely, implement/fix in a product change, execute the linked regression test, and preserve evidence. There are no resolved findings in this initial harness baseline.