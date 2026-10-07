# FEAT-006 Behavior

ReviewCard queries `/review/{productId}` for reviews; it expects a `reviewButton` boolean. RTK Query submits new review to `/review/{productId}` while route handler is at `/review/new`; GET handler returns reviews only.

## Source pointers

`src/app/product/[id]/page.tsx`, `src/components/Review/ReviewCard.tsx`, `Ratings.tsx`, `ReviewCustomizedButtons.tsx`.

This description is static source analysis. Runtime behavior is not asserted unless a run record says otherwise.
