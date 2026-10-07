# Cart and Coupons

**Feature:** FEAT-003
**Purpose:** Maintain cart items in Redux, calculate a cart estimate, and attempt to apply a fixed-value coupon.
**User:** Signed-in customer
**Entry Point:** `/cart`; product card/detail add-to-cart controls; `cartReducer`
**Dependencies:** Redux Toolkit in-memory state, Axios coupon request, coupon discount API.
**Inputs:** Product snapshot, quantity, product stock; coupon code.
**Outputs:** Cart item list, quantity controls, subtotal/shipping/tax/discount/total, coupon status.
**Business Rules:** Cart key is product ID; quantity is updated for existing item. UI checks stock. Cart reducer computes 18% rounded tax, 200 shipping for non-empty subtotal ≤1000 and free >1000; discount is capped at subtotal.
**Expected Behavior:** Customer can add/change/remove items, see updated amounts, and apply/reject a coupon with totals refreshed.
**Error Handling:** Coupon errors show toasts and clear the discount; empty cart shows a message. Cart state is not persisted across reloads.
**Permissions:** Cart data is local to current browser Redux store; coupon UI appears for role user.
**Related APIs:** Backend implements `GET /api/payment/discount?coupon=...`; cart currently sends `POST /api/v1/payment/discount?coupon=...`.
**Related Database Tables:** Coupon (unique code and amount); Product is queried indirectly during checkout, not by cart reducer.
**Related UI:** `src/app/cart/page.tsx`, `src/components/CartItem.tsx`, `src/components/ProductCard.tsx`, `src/redux/reducer/cartReducer.ts`.
**Existing Tests:** No cart/coupon tests found.
**Missing Tests:** Reducer boundary tests, refresh persistence requirements, invalid/expired/duplicate coupon behavior, and UI/API integration.

## Feature documents

- [Requirements](requirements.md)
- [Behavior and source observations](behavior.md)
- [Acceptance criteria](acceptance-criteria.md)
- [Test scenarios](test-scenarios.md)
- [Test cases](test-cases.md)
- [Test data](test-data.md)
- [Known issues](known-issues.md)

Canonical test definitions are kept in the root `harness/test-scenarios/` and `harness/test-cases/` trees. An execution result is not implied by this inventory.
