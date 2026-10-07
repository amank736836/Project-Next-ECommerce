# Source-Observed Business Rules

These are rules encoded in the current application code, not necessarily approved business policy. Conflicts and missing validation are marked explicitly. Source line paths are linked for reproducibility.

## Catalog and stock

- Latest products are sorted newest-first and limited to 5 in `src/app/api/product/latest/route.ts`.
- Product search matches `name` using a case-insensitive Mongo regular expression; filters include category equality and price `<=` the supplied maximum. Sort is ascending only when `sort=asc`, otherwise descending if any sort value is supplied; default is newest first. Page size is `Number(PRODUCT_PER_PAGE) || 8` (`src/app/api/product/all/route.ts`).
- Product create/update lowercases category. Product name, price, stock, category, description and photo fields are required by model/API in differing combinations; numeric bounds are not declared in the Product schema.
- Product UI prevents quantities above the currently displayed stock. Server `reduceStock()` rejects missing products and quantities over current stock, then saves products one by one.

## Cart arithmetic and coupon

`src/redux/reducer/cartReducer.ts` currently computes:

```text
subtotal = Σ(price × quantity)
shipping = 0 when subtotal = 0; 0 when subtotal > 1000; otherwise 200
tax = round(subtotal × 0.18)
discount = min(coupon-discount, subtotal)
total = subtotal + tax + shipping − discount
```

This reducer runs in the browser. The checkout/order API does not recompute totals, so it is not an authoritative server pricing rule. `src/app/policies/page.tsx` displays different shipping terms (₹50 below ₹999 and free shipping above ₹999). **Intended shipping amount/threshold: UNKNOWN / REQUIRES VALIDATION.**

Coupon code is looked up by exact value through `Coupon.findOne({ code })`; amount is a fixed discount value. Cart input uppercases entered characters, but the API does not normalize. Coupon discount is capped at subtotal client-side. Coupon validation client URL/method does not match the implemented route (`BUG-001`).

## Identity and roles

- Login uses Firebase Google popup in the browser. A new profile requires `_id`, name, email, photo, gender, DOB. Existing user lookup returns a welcome response before gender/DOB are required.
- `POST /api/user/new` assigns `admin` when the database currently has zero users; otherwise `user`. It does not use the submitted `role` value to choose the role.
- Admin pages check client Redux role. Admin API handlers generally load the `id` query parameter and check the database role; no Firebase token binding was found. This behavior is a security risk, not a validated authorization rule (`BUG-007`).
- User gender schema only allows `male`/`female`; date-of-birth has no age/format business validation beyond Mongoose casting/required.

## Orders and payments

- Order status enum allows `Processing`, `Shipped`, `Delivered`, `Cancelled`. Admin `PUT /api/order/[id]` advances Processing → Shipped → Delivered; other states are set to Delivered by the default branch.
- Cancellation endpoint deletes the order document if allowed; it does not set status to `Cancelled`. It rejects Shipped/Delivered. Customer UI offers cancel while Processing or Shipped, which conflicts with that handler; admin UI offers cancel only while Processing.
- Order creation requires shippingInfo, orderItems, user, subtotal, tax and total to be truthy. It reduces stock before order creation and accepts client-supplied item/pricing fields. UI currently omits subtotal/tax/shipping/discount/total in that request (`BUG-003`).
- Razorpay signature uses HMAC-SHA256 of `razorpay_order_id|razorpay_payment_id` with `RAZORPAY_KEY_SECRET`. End-to-end payment creation/persistence is not currently connected to matching server route contracts (`BUG-002` / `BUG-004`).

## Reviews and admin records

- Review rating schema range is 1–5. POST handler looks for an existing user/product review and updates it; otherwise creates one, updates the product's ratings/count, and calculates average with `Math.floor`.
- Review deletion query is scoped to the supplied user ID and product; handler comment mentions admin-or-owner but no distinct admin override is implemented in the query.
- Coupon codes are unique; schema length field defaults to 8 and declares min 8/max 25. Coupon amount has no positive/range validator in schema. Admin UI checks amount > 0 and exposes code-generation options; handlers save only code/amount.
- Dashboard percentage calculation and summary definitions are implementation-specific; no business-owner definition for “revenue,” “active users,” age groups, or financial distribution is documented.

## Conflicts requiring owner decision

1. Cart shipping formula vs Policies-page shipping copy.
2. User cancellation UI vs endpoint state restriction; whether cancellation should delete or mark Cancelled.
3. Role bootstrap (“first DB account is admin”) and authenticated identity binding.
4. Which data is authoritative for checkout totals, stock reservation and coupon validity.
5. Coupon prefix/postfix/character flags and `size`: whether these are required persistent business fields.
6. Meaning and inclusion of non-delivered/cancelled orders in revenue/dashboard metrics.