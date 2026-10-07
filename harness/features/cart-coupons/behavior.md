# FEAT-003 Behavior

Adding to cart dispatches a product snapshot; reducer updates matching item by productId. Cart page triggers a debounced-looking coupon request and recalculates on cart/discount changes. Cart total computation is entirely client-side.

## Source pointers

`src/app/cart/page.tsx`, `src/components/CartItem.tsx`, `src/components/ProductCard.tsx`, `src/redux/reducer/cartReducer.ts`.

This description is static source analysis. Runtime behavior is not asserted unless a run record says otherwise.
