# FEAT-005 Behavior

Customer pages fetch order lists/details; admin transaction list displays all orders and details. Admin status action advances one state. Cancellation action calls POST to order ID; server deletes the document for permitted states.

## Source pointers

`src/app/orders/page.tsx`, `src/app/order/[id]/page.tsx`, admin transaction pages.

This description is static source analysis. Runtime behavior is not asserted unless a run record says otherwise.
