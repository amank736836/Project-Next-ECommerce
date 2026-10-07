# Test Cases

Cases below use the standard fields requested for reproducible execution. Canonical full case details are in the module files; each entry includes steps, test data, expected/actual result, status, automation, evidence, requirement, scenario, bug and last-executed fields. There are 33 cases: 28 application scenarios and 5 tooling/harness checks.

## Module index

| Module | Cases | Files |
|---|---|---|
| Storefront catalog | TC-001–TC-004 | [positive](storefront-catalog/positive.md), [edge cases](storefront-catalog/edge-cases.md) |
| Identity/access | TC-005–TC-008 | [positive](identity-access/positive.md), [negative](identity-access/negative.md), [regression](identity-access/regression.md) |
| Cart/coupons | TC-009–TC-011 | [positive](cart-coupons/positive.md), [negative](cart-coupons/negative.md), [edge cases](cart-coupons/edge-cases.md) |
| Checkout/payments | TC-012–TC-014 | [positive](checkout-payments/positive.md), [negative](checkout-payments/negative.md), [edge cases](checkout-payments/edge-cases.md) |
| Orders/fulfillment | TC-015–TC-017 | [negative](orders-fulfillment/negative.md), [regression](orders-fulfillment/regression.md) |
| Product reviews | TC-018–TC-019 | [negative](product-reviews/negative.md), [edge cases](product-reviews/edge-cases.md) |
| Admin commerce | TC-020–TC-022 | [positive](admin-commerce/positive.md), [negative](admin-commerce/negative.md), [edge cases](admin-commerce/edge-cases.md) |
| Admin analytics | TC-023–TC-024 | [positive](admin-analytics/positive.md), [regression](admin-analytics/regression.md) |
| Content/navigation | TC-025 | [positive](content-navigation/positive.md) |
| Cross-cutting API/security | TC-026–TC-028 | [negative](security-api/negative.md), [edge cases](security-api/edge-cases.md) |
| Toolchain | TC-029–TC-033 | [positive](toolchain/positive.md), [negative](toolchain/negative.md) |

## Standard case status

- `NOT_RUN` + `Actual Result: NOT_EXECUTED` means no execution was performed.
- `PASS` / `FAIL` are only used for the five actual tooling/harness checks in `RUN-20261007-01`.
- `BLOCKED` is for a case attempted but blocked by a missing prerequisite. The current 28 application cases were not attempted, so they remain `NOT_RUN`, not `BLOCKED`.
- `Automation` is `AUTOMATED`, `MANUAL`, or `PARTIAL`. The public smoke runner is partial coverage and has not been run.

See [scenario register](../test-scenarios/README.md), [traceability](../reports/traceability.md), and [latest execution](../test-results/latest/RUN-20261007-01.md).