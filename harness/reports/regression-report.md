# Regression Report — Initial Harness Baseline

**Run:** RUN-20261007-01  
**Overall status:** NOT_EXECUTED for application regression. This is an inventory, not a pass report.

## Regression scope

| Area | Regression focus | Cases | Result |
|---|---|---|---|
| Catalog and cart | Latest data, product details, quantity, totals, coupon, cache refresh | TC-001, TC-003, TC-009–TC-011, TC-024 | NOT_EXECUTED |
| Identity/access | Auth-state hydration/logout and admin role enforcement | TC-006–TC-008, TC-021 | NOT_EXECUTED |
| Checkout/orders | Payment, order, inventory, cancellation and status consistency | TC-012–TC-017 | NOT_EXECUTED |
| Reviews | Review CRUD and rating aggregate | TC-018–TC-019 | NOT_EXECUTED |
| Admin operations | Product, customer and coupon changes; fresh list/cache | TC-020–TC-022, TC-024 | NOT_EXECUTED |
| Dashboard | Metrics and cache consistency after writes | TC-023–TC-024 | NOT_EXECUTED |
| Public pages | Navigation, policy content and responsive menu | TC-025 | NOT_EXECUTED |
| Build/tooling | Production compile, lint baseline, dependency audit, harness syntax/links | TC-029–TC-033 | Executed separately; build/syntax/links PASS, lint/audit FAIL. |

## Findings affecting regression planning

- Checkout cannot be treated as an executable golden path until BUG-001–BUG-004 are resolved or a product owner supplies the intended contract.
- Review submission should remain a known failing/blocked integration until BUG-005 is fixed; do not mark TC-018 PASS using only the backend's separate route.
- Auth/admin/ownership cases need a safe test identity and server-side token verification changes; do not attempt against a real admin account.
- Cache regression needs Redis enabled to demonstrate BUG-009; without Redis the no-op implementation does not exercise invalidation.

No application regression test ran in this baseline; only repository build/lint/audit and harness-integrity checks were executed.