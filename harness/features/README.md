# Feature Inventory

Nine meaningful feature areas were identified from the App Router pages, client state, API routes, models and shared components. Feature IDs are stable harness IDs, not values embedded in the application.

| ID | Feature | Main users | Main entry points | Criticality / current concern |
|---|---|---|---|---|
| [FEAT-001](storefront-catalog/README.md) | Storefront catalog and search | Visitor/customer | `/`, `/search`, `/product/[id]` | Core read flow; Mongo-backed. |
| [FEAT-002](identity-access/README.md) | Identity and access | Visitor/customer/admin | `/login`, `/admin/*`, `/api/user/*` | High security risk: server handlers trust query-string user IDs rather than verifying Firebase identity. |
| [FEAT-003](cart-coupons/README.md) | Cart and coupons | Customer | `/cart`, `cartReducer`, `/api/payment/discount` | Coupon request route/method mismatch; pricing policy conflict. |
| [FEAT-004](checkout-payments/README.md) | Checkout and payments | Customer | `/shipping`, `/api/payment/*` | Several client/server contract mismatches prevent a verified end-to-end flow. |
| [FEAT-005](order-management/README.md) | Orders and fulfillment | Customer/admin | `/orders`, `/order/[id]`, `/admin/transaction` | Ownership checks/read privacy, order payload, cancel state, and stock transactionality require testing. |
| [FEAT-006](product-reviews/README.md) | Product reviews and ratings | Customer/visitor | `/product/[id]`, `/api/product/review/*` | Create API path mismatch; review-button contract differs. |
| [FEAT-007](admin-commerce/README.md) | Admin commerce operations | Admin | `/admin/products`, `/admin/customers`, `/admin/coupons` | CRUD integrates with Mongo/Cloudinary; authorization binding needs security validation. |
| [FEAT-008](admin-analytics/README.md) | Admin dashboard and analytics | Admin | `/admin/dashboard`, `/admin/chart/*` | No metric oracle or runtime coverage; Redis key invalidation mismatch. |
| [FEAT-009](content-navigation/README.md) | Navigation and informational pages | Visitor/customer | Shared `Header`, `/about`, `/policies` | Content is static UI; terms are not enforced in backend. |

Every feature folder contains a short README with the requested feature facts and focused requirement, behavior, acceptance, scenario, case, data, and known-issue references. Canonical requirement and case definitions live in the central `requirements/`, `test-scenarios/`, and `test-cases/` documents; see [traceability](../reports/traceability.md).