# Functional Scenarios

| ID | Coverage | Expected outcome source |
|---|---|---|
| SCN-001–SCN-003 | Home/latest catalog; search/filter/sort/page; product detail and quantity selection. | `src/app/page.tsx`, `search/page.tsx`, `product/[id]/page.tsx`, product handlers. |
| SCN-005–SCN-006 | Google onboarding, profile hydration, logout. | Login UI, Firebase auth listener, user routes. |
| SCN-009–SCN-011 | Cart update/removal, reducer arithmetic, coupon application. | Cart components/reducer and discount endpoint. |
| SCN-012–SCN-014 | Shipping/payment/order/stock flow. | Shipping page plus payment/order route handlers; known request-contract gaps must be resolved. |
| SCN-015–SCN-017 | Customer order flow, cancellation, admin progression. | Order pages and `/api/order/*`. |
| SCN-018–SCN-019 | Review CRUD and rating aggregates. | Review UI/handlers/models. |
| SCN-020–SCN-022 | Admin product, customer, coupon operations. | `/admin/*`, associated APIs/models. |
| SCN-023 | Dashboard statistics/charts. | `/api/dashboard/*`, chart and table components. |
| SCN-025 | Public navigation/content and responsive controls. | Shared Header, informational pages and styles. |

Detailed cases are in the [case index](../test-cases/README.md). Expected results that depend on missing product/business decisions are marked `UNKNOWN / REQUIRES VALIDATION`.