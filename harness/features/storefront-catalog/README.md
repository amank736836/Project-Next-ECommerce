# Storefront Catalog and Search

**Feature:** FEAT-001
**Purpose:** Present public merchandise, let visitors discover products, and expose product details before adding items to the in-memory cart.
**User:** Visitor; signed-in customer
**Entry Point:** `/`, `/search`, `/product/[id]`
**Dependencies:** Next client UI, RTK Query, MongoDB product API, optional Redis, Cloudinary image URLs.
**Inputs:** Search text, category, maximum price, sort, page; product ID; requested quantity.
**Outputs:** Latest/catalog product cards, details/images, stock and rating display, cart action.
**Business Rules:** Latest API sorts newest-first and returns up to five. Search defaults to eight per page (PRODUCT_PER_PAGE override); category is exact and price is an upper bound. Product category is lowercased on admin create/update.
**Expected Behavior:** Visitors can browse/search, apply filters/sort/page, open a product, inspect available stock/rating, and add no more than currently available stock from the UI.
**Error Handling:** Loading, empty and API-error states are present in the storefront. Invalid IDs/Mongo errors are returned as route errors; exact UI recovery needs validation.
**Permissions:** Catalog reads are public. Cart is client-side; no authenticated role required to browse.
**Related APIs:** `GET /api/product/latest`, `/categories`, `/all`, `/[id]`; admin list/mutations are described in FEAT-007.
**Related Database Tables:** Product (photos, price, stock, category, description, ratings, timestamps).
**Related UI:** `src/app/page.tsx`, `src/app/search/page.tsx`, `src/app/product/[id]/page.tsx`, `src/components/ProductCard.tsx`, `src/components/Review/ReviewCustomizedButtons.tsx`.
**Existing Tests:** No app unit/API/UI tests found. Build generated these routes; this is not behavioral test evidence.
**Missing Tests:** Search/filter contract, product not-found/error state, pagination boundaries, images, stock and cache freshness need runtime cases.

## Feature documents

- [Requirements](requirements.md)
- [Behavior and source observations](behavior.md)
- [Acceptance criteria](acceptance-criteria.md)
- [Test scenarios](test-scenarios.md)
- [Test cases](test-cases.md)
- [Test data](test-data.md)
- [Known issues](known-issues.md)

Canonical test definitions are kept in the root `harness/test-scenarios/` and `harness/test-cases/` trees. An execution result is not implied by this inventory.
