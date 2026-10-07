# FEAT-001 Behavior

Home queries the latest endpoint; search uses RTK Query with search/category/price/sort/page parameters and separately queries categories; details loads by ID and shows a carousel, fields and rating; product quantity is local UI state and cart insertion dispatches a Redux action.

## Source pointers

`src/app/page.tsx`, `src/app/search/page.tsx`, `src/app/product/[id]/page.tsx`, `src/components/ProductCard.tsx`, `src/components/Review/ReviewCustomizedButtons.tsx`.

This description is static source analysis. Runtime behavior is not asserted unless a run record says otherwise.
