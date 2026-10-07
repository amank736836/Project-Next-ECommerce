# Product Reviews and Ratings

**Feature:** FEAT-006
**Purpose:** Show user reviews on product details, accept review ratings/comments, and update product aggregate ratings.
**User:** Visitor (read); signed-in customer (write)
**Entry Point:** `/product/[id]`; `/api/product/review/*`
**Dependencies:** Review and Product Mongoose models, User model, RTK Query, `6pp` rating components, Redis invalidation.
**Inputs:** Product ID, authenticated user ID, integer rating 1–5, comment.
**Outputs:** Sorted review list with reviewer name/photo, aggregate rating/count, create/update/delete response.
**Business Rules:** Review rating schema range 1–5. POST updates an existing review for same user/product or creates one; average uses floor. Delete query scopes to supplied user+product.
**Expected Behavior:** Reviews load in newest-updated-first order; eligible customer can create/update their own review and remove it; aggregates reflect exactly persisted reviews.
**Error Handling:** Missing user/product/review returns 401/404; schema and DB errors map to 500 in handlers. UI toasts API error.
**Permissions:** GET reviews is public. POST requires an existing DB user but no token verification. DELETE finds only review matching provided user ID and product; supplied ID is not authenticated.
**Related APIs:** `GET|DELETE /api/product/review/[id]`; create handler is `POST /api/product/review/new`.
**Related Database Tables:** Review, Product, User.
**Related UI:** `src/app/product/[id]/page.tsx`, `src/components/Review/ReviewCard.tsx`, `Ratings.tsx`, `ReviewCustomizedButtons.tsx`.
**Existing Tests:** No review tests found.
**Missing Tests:** Client/server route contract, eligible purchase policy (none found), response `reviewButton`, aggregate correctness, invalid rating, and ownership tests.

## Feature documents

- [Requirements](requirements.md)
- [Behavior and source observations](behavior.md)
- [Acceptance criteria](acceptance-criteria.md)
- [Test scenarios](test-scenarios.md)
- [Test cases](test-cases.md)
- [Test data](test-data.md)
- [Known issues](known-issues.md)

Canonical test definitions are kept in the root `harness/test-scenarios/` and `harness/test-cases/` trees. An execution result is not implied by this inventory.
