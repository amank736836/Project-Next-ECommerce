# Checkout and Payments

**Feature:** FEAT-004
**Purpose:** Collect shipping details and orchestrate a Razorpay checkout, signature verification, order creation and payment record.
**User:** Signed-in customer with cart items
**Entry Point:** `/shipping`; `/api/payment/*`; `POST /api/order/new`
**Dependencies:** Redux cart/user state, Razorpay Checkout.js, Razorpay SDK, MongoDB, Razorpay server credentials.
**Inputs:** Cart items, shipping address, coupon, user ID, Razorpay order/payment/signature fields.
**Outputs:** Razorpay order data, signature verification response, order ID, payment record, navigation to `/orders`.
**Business Rules:** Shipping form fields are HTML-required. Signature should equal HMAC-SHA256(order ID + `|` + payment ID, server secret). Order endpoint requires shippingInfo/orderItems/user/subtotal/tax/total.
**Expected Behavior:** For an approved payment, verify signature, create a valid order, decrement inventory once, persist payment status and navigate to the order list; failures must not create partial/incorrect orders.
**Error Handling:** Checkout shows payment errors and stops on API failure. Payment modal dismissal logs and toasts. External integration errors need sandbox tests.
**Permissions:** UI redirects empty carts to cart and unauthenticated users to login. Backend payment/order routes do not consistently verify caller identity or payment linkage.
**Related APIs:** `POST /api/payment/create` expects `{amount}`; `/verify` expects Razorpay IDs/signature. Client posts a cart payload to `/create`, sends order payload without required totals, and calls unimplemented `/api/payment/createPayment` for persistence.
**Related Database Tables:** Order, Payment, Product, Coupon, User.
**Related UI:** `src/app/shipping/page.tsx`; RTK Query `paymentAPI.ts`, `orderAPI.ts`.
**Existing Tests:** No payment/order integration tests or sandbox config found. No payment flow was executed.
**Missing Tests:** Server-side pricing/coupon/stock validation; payment/order id binding; create/verify/persist happy/negative cases; duplicate callback/idempotency; failure rollback.

## Feature documents

- [Requirements](requirements.md)
- [Behavior and source observations](behavior.md)
- [Acceptance criteria](acceptance-criteria.md)
- [Test scenarios](test-scenarios.md)
- [Test cases](test-cases.md)
- [Test data](test-data.md)
- [Known issues](known-issues.md)

Canonical test definitions are kept in the root `harness/test-scenarios/` and `harness/test-cases/` trees. An execution result is not implied by this inventory.
