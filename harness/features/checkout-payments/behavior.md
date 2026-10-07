# FEAT-004 Behavior

The page loads Checkout.js, calls the create mutation, creates a Razorpay object, verifies handler response, then requests order creation and payment persistence. The inspected request/route contracts are inconsistent before and during this flow.

## Source pointers

`src/app/shipping/page.tsx`; RTK Query `paymentAPI.ts`, `orderAPI.ts`.

This description is static source analysis. Runtime behavior is not asserted unless a run record says otherwise.
