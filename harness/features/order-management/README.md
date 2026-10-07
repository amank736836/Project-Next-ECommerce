# Orders and Fulfillment

**Feature:** FEAT-005
**Purpose:** Allow customers to view orders and administrators to manage fulfillment; expose order cancellation actions.
**User:** Customer; administrator
**Entry Point:** `/orders`, `/order/[id]`, `/admin/transaction`, `/admin/transaction/[id]`
**Dependencies:** Order API, MongoDB Order/User/Product/Payment models, Redis cache, Redux RTK Query.
**Inputs:** User/admin ID query parameter; order ID; status action; order data.
**Outputs:** Order list/details, processing/shipped/delivered status, cancellation/deletion result.
**Business Rules:** Status enum has Processing/Shipped/Delivered/Cancelled. Admin PUT advances Processing→Shipped→Delivered. POST cancellation rejects Shipped/Delivered and deletes the order; it does not set Cancelled.
**Expected Behavior:** Customers only see/manage their own orders; admins manage all; permitted status transitions/cancellations update persisted records and invalidate relevant caches.
**Error Handling:** Missing IDs/not-found/unauthorized/state conflict return JSON status codes. UI shows toast/loading; exact owner privacy is not enforced on GET in source.
**Permissions:** Admin list/update/delete checks DB role from query ID. `/my` and `GET /[id]` have no verified caller identity/ownership guard. Cancellation has an ID parameter check against order user but ID is unbound to authentication.
**Related APIs:** `POST /api/order/new`; `GET /my`, `/all`, `/[id]`; `PUT|DELETE|POST /[id]`.
**Related Database Tables:** Order (shippingInfo, user, item snapshot, totals, status); Payment; Product stock; User.
**Related UI:** `src/app/orders/page.tsx`, `src/app/order/[id]/page.tsx`, admin transaction pages.
**Existing Tests:** No order API/database/browser tests found.
**Missing Tests:** Ownership/IDOR, status transition, cancellation rules, concurrent stock/order, cache consistency, payment settlement and rollback.

## Feature documents

- [Requirements](requirements.md)
- [Behavior and source observations](behavior.md)
- [Acceptance criteria](acceptance-criteria.md)
- [Test scenarios](test-scenarios.md)
- [Test cases](test-cases.md)
- [Test data](test-data.md)
- [Known issues](known-issues.md)

Canonical test definitions are kept in the root `harness/test-scenarios/` and `harness/test-cases/` trees. An execution result is not implied by this inventory.
