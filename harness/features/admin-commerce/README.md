# Admin Commerce Operations

**Feature:** FEAT-007
**Purpose:** Manage product inventory/media, customer roles/accounts, coupons and order records from admin pages.
**User:** Administrator
**Entry Point:** `/admin/products`, `/admin/product/new`, `/admin/product/[id]`, `/admin/customers`, `/admin/coupons`, `/admin/coupon/*`
**Dependencies:** Admin client layout, RTK Query, MongoDB, Cloudinary, Redis cache.
**Inputs:** Admin ID, product fields/photo, user ID/role, coupon code/amount and generator options.
**Outputs:** Catalog/customer/coupon tables and CRUD confirmations; Cloudinary media updates.
**Business Rules:** Product categories lowercased; user roles enum admin/user; coupon code unique, declared size 8–25. Coupon form requires positive amount and at least one character set for generated characters when generated length >0.
**Expected Behavior:** Authorized admin can view and manage records; invalid/non-admin access is denied; media and DB changes remain consistent.
**Error Handling:** Form/API errors display toast; missing record routes return 404. Upload/unique-key/network failures need integration validation.
**Permissions:** Admin layout and route handlers check role; routes trust ID supplied by client query string. Debug endpoint is separate and unsafe.
**Related APIs:** Products `/api/product/admin-products`, `/api/product/new`, `/api/product/[id]`; users `/api/user/all`, `/api/user/[id]`; coupons `/api/payment/coupon/*`.
**Related Database Tables:** Product, User, Coupon; Cloudinary assets external.
**Related UI:** `src/app/admin/products`, `product/*`, `customers`, `coupons`, `coupon/*`; tables under `src/components/admin/Tables`.
**Existing Tests:** No admin UI/API/Cloudinary tests found. Root `admin_and_check*.ts` scripts are unsafe troubleshooting scripts, not tests.
**Missing Tests:** Role enforcement/identity binding, CRUD validation, duplicate code/email, upload failure and deletion, large list pagination, audit trail.

## Feature documents

- [Requirements](requirements.md)
- [Behavior and source observations](behavior.md)
- [Acceptance criteria](acceptance-criteria.md)
- [Test scenarios](test-scenarios.md)
- [Test cases](test-cases.md)
- [Test data](test-data.md)
- [Known issues](known-issues.md)

Canonical test definitions are kept in the root `harness/test-scenarios/` and `harness/test-cases/` trees. An execution result is not implied by this inventory.
