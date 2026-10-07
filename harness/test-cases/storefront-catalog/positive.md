# Storefront Catalog — Positive Cases

## TC-001 — FEAT-001

**Test Case ID:** TC-001
**Feature:** FEAT-001
**Priority:** P1
**Type:** Smoke / functional / partial API automation
**Preconditions:** Application running against a disposable MongoDB test database. Seed 0 and several synthetic products with timestamps.

**Steps:**
1. Open `/` in a browser.
2. Observe loading, product, empty, and error states as applicable.
3. Request `GET /api/product/latest` and inspect JSON `success` and `products` shape.

**Test Data:** Synthetic products from `test-data/valid/product.json`; latest endpoint should return at most five.

**Expected Result:** Home responds and presents a defined state; the endpoint returns success with an array of products sorted newest-first and at most five records.

**Actual Result:** NOT_EXECUTED; the harness smoke script covers public page/catalog response shape but was not run against an app.

**Status:** NOT_RUN
**Automation:** PARTIAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-001
**Related Scenario:** SCN-001
**Related Bug:** None
**Last Executed:** NOT_EXECUTED
## TC-002 — FEAT-001

**Test Case ID:** TC-002
**Feature:** FEAT-001
**Priority:** P1
**Type:** Functional / API / partial automation
**Preconditions:** Test app and disposable DB with products varying in name, price, category and creation time; at least two pages.

**Steps:**
1. Open `/search`; query one known product name.
2. Apply exact category and maximum-price filters.
3. Try ascending and descending price sort; move to next and previous pages.
4. Compare API response to the seeded expected set.

**Test Data:** Synthetic catalog with distinct names/categories/prices; default page size 8 unless `PRODUCT_PER_PAGE` is set.

**Expected Result:** Only matching products appear; price is at or below max; ordering and page boundaries are stable; response includes `products` and `totalPage`.

**Actual Result:** NOT_EXECUTED; static source review notes response lacks client-typed min/max/category fields; category is requested separately.

**Status:** NOT_RUN
**Automation:** PARTIAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-002
**Related Scenario:** SCN-002
**Related Bug:** None
**Last Executed:** NOT_EXECUTED
## TC-003 — FEAT-001

**Test Case ID:** TC-003
**Feature:** FEAT-001
**Priority:** P1
**Type:** Functional / UI
**Preconditions:** A product exists with one valid image, stock 2, price, category, description and rating.

**Steps:**
1. Open `/product/{productId}`.
2. Verify product name, photo, category, price, stock/rating and reviews render.
3. Select quantity 2 and add to cart.
4. Attempt to increase quantity beyond stock.

**Test Data:** One synthetic product with stock 2; do not use a production image.

**Expected Result:** Details match DB; quantity is at least 1 and no more than available stock in UI; cart receives expected product snapshot.

**Actual Result:** NOT_EXECUTED.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-003
**Related Scenario:** SCN-003
**Related Bug:** None
**Last Executed:** NOT_EXECUTED
