# Test Scenario Register

The register contains 28 source-grounded application scenarios and 5 repository quality/security/harness scenarios. Every scenario is linked to a detailed test case and traceability row. Application scenarios are planned only; all remain `NOT_EXECUTED` in the current baseline.

## Scenario index

| ID | Scenario | Type emphasis | Case |
|---|---|---|---|
| SCN-001 | Home/latest catalog smoke | Smoke, UI, API | TC-001 |
| SCN-002 | Catalog search/filter/sort/page | Functional, API, UI | TC-002 |
| SCN-003 | Product details and stock-bounded add-to-cart | Functional, UI | TC-003 |
| SCN-004 | Search input and pagination boundaries | Negative, edge, API | TC-004 |
| SCN-005 | New Google profile onboarding | Functional, integration | TC-005 |
| SCN-006 | Returning profile hydration and logout | Functional, integration | TC-006 |
| SCN-007 | Admin route/API role gate | Negative, security | TC-007 |
| SCN-008 | Spoofed admin ID / identity binding | Security, API | TC-008 |
| SCN-009 | Cart add/change/remove and stock limits | Functional, UI | TC-009 |
| SCN-010 | Cart price arithmetic boundaries | Functional, edge, database/API | TC-010 |
| SCN-011 | Coupon apply/reject integration | Functional, negative, API | TC-011 |
| SCN-012 | Shipping to Razorpay checkout initiation | Functional, integration | TC-012 |
| SCN-013 | Valid/invalid payment signature | Negative, edge, API | TC-013 |
| SCN-014 | Order create, trusted totals and stock consistency | Integration, database | TC-014 |
| SCN-015 | Order-list/detail ownership and privacy | Security, API, UI | TC-015 |
| SCN-016 | Cancellation eligibility and persistence | Functional, negative, API | TC-016 |
| SCN-017 | Admin fulfillment status progression | Functional, regression | TC-017 |
| SCN-018 | Review create/update and rating aggregate | Functional, integration, database | TC-018 |
| SCN-019 | Review deletion ownership | Negative, security, API | TC-019 |
| SCN-020 | Admin product CRUD and media lifecycle | Functional, integration, database | TC-020 |
| SCN-021 | Admin customer role/delete controls | Functional, security, API | TC-021 |
| SCN-022 | Admin coupon create/update/delete | Functional, edge, database | TC-022 |
| SCN-023 | Dashboard metrics and charts | Functional, integration, edge | TC-023 |
| SCN-024 | Redis cache invalidation after mutation | Regression, integration, performance | TC-024 |
| SCN-025 | Public navigation, content, responsive behavior | Smoke, UI, accessibility | TC-025 |
| SCN-026 | API required fields, methods and invalid IDs | Negative, API, database | TC-026 |
| SCN-027 | Public endpoint/data exposure and debug route | Security/VAPT | TC-027 |
| SCN-028 | Search regex abuse and request-cost boundaries | Security, edge, performance | TC-028 |
| SCN-029 | ESLint baseline | Tooling | TC-029 (executed) |
| SCN-030 | Next production build | Tooling | TC-030 (executed) |
| SCN-031 | Dependency vulnerability audit | Security/tooling | TC-031 (executed) |
| SCN-032 | Harness smoke-runner syntax and remote-target guard | Tooling | TC-032 (executed) |
| SCN-033 | Harness relative Markdown link validation | Tooling | TC-033 (executed) |

## Scenario categories

- [Smoke](smoke.md)
- [Regression](regression.md)
- [Functional](functional.md)
- [Negative](negative.md)
- [Edge cases](edge-cases.md)
- [Integration](integration.md)
- [API](api.md)
- [Database](database.md)
- [UI](ui.md)
- [Performance](performance.md)
- [Security](security.md)

Case details use the common structure in [test-cases/README.md](../test-cases/README.md). Scenario presence does not mean it has run.