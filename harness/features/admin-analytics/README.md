# Admin Dashboard and Analytics

**Feature:** FEAT-008
**Purpose:** Provide admin-only summary widgets, category/gender summaries, latest orders, and bar/line/pie charts.
**User:** Administrator
**Entry Point:** `/admin/dashboard`, `/admin/chart/bar`, `/line`, `/pie`
**Dependencies:** MongoDB User/Product/Order, Redis, backend aggregation helpers, Chart.js/React Chart.js, RTK Query.
**Inputs:** Admin ID query; current time; stored products/users/orders.
**Outputs:** Counts, percentage changes, six/twelve-month arrays, category/stock/order/revenue/user distributions.
**Business Rules:** Metrics derive from Mongo records; chart helper groups records by month; revenue/discount data filters to delivered orders in relevant helper. No metric definitions or TTLs documented.
**Expected Behavior:** Only an authenticated admin can view accurate, fresh metrics; empty/new databases render safely; cache invalidates after underlying mutation.
**Error Handling:** API returns unauthorized/database/cache errors; pages toast and use skeleton/fallback data.
**Permissions:** UI admin gate and API role lookup, but identity is query-ID-based.
**Related APIs:** `GET /api/dashboard/stats|bar|line|pie?id=...`.
**Related Database Tables:** User, Product, Order; Redis key/value entries.
**Related UI:** Admin dashboard and chart pages; `src/components/admin/Charts/*`, `DashboardItems/*`, `Tables/DashboardTable.tsx`.
**Existing Tests:** No metric unit/integration/visual regression tests found.
**Missing Tests:** Defined calculation oracle, zero/empty/boundary month accuracy, timezone/year boundaries, stale cache, authorization, performance on large collections.

## Feature documents

- [Requirements](requirements.md)
- [Behavior and source observations](behavior.md)
- [Acceptance criteria](acceptance-criteria.md)
- [Test scenarios](test-scenarios.md)
- [Test cases](test-cases.md)
- [Test data](test-data.md)
- [Known issues](known-issues.md)

Canonical test definitions are kept in the root `harness/test-scenarios/` and `harness/test-cases/` trees. An execution result is not implied by this inventory.
