# Architecture and trust boundaries

## At a glance

```text
Browser
  ├─ Next.js App Router pages/components (React, Redux/RTK Query)
  ├─ Firebase Google popup authentication (client SDK)
  └─ same-origin /api/* requests (or NEXT_PUBLIC_SERVER_URL override)
          │
          ▼
Next.js Route Handlers (src/app/api/**/route.ts)
  ├─ Mongoose ───────────── MongoDB (MONGO_URI / MONGO_DB)
  ├─ ioredis/no-op ──────── Redis (optional REDIS_URI)
  ├─ Cloudinary ─────────── product images
  └─ Razorpay ───────────── server-created order / signature check

Next.js root layout also loads Vercel Analytics; actual hosting is UNKNOWN.
```

No separate frontend/backend deployment or service boundary is present in the repository. UI and API handlers live in one Next.js app. RTK Query endpoint definitions are under `src/redux/api`; models and service clients under `src/models` and `src/lib`.

## Route inventory

`[id]` is a dynamic path parameter. Unless noted, API success/error JSON uses a `success` boolean and usually a `message`.

| Area | Methods and routes | Notes visible in source |
|---|---|---|
| Users | `POST /api/user/new`; `GET /api/user/[id]`; `GET /api/user/all?id=...`; `PATCH|DELETE /api/user/[id]?id=...` | New profile input includes Firebase UID/name/email/photo/gender/DOB. Admin handlers load the supplied `id` from Mongo and check `role`. `GET /[id]` has no caller-auth check. |
| Products | `GET /api/product/latest`; `GET /categories`; `GET /all`; `GET /admin-products?id=...`; `GET /[id]`; `POST /new?id=...`; `PUT|DELETE /[id]?id=...` | Listing/search is public. Admin list/mutations check a supplied user ID/role. Create/update upload to Cloudinary; delete removes Cloudinary files. |
| Reviews | `GET|DELETE /api/product/review/[id]`; `POST /api/product/review/new` | Dynamic route's `id` is treated as product ID. Create is in `/new` and consumes `productId` from JSON. The current RTK Query create endpoint instead POSTs to `/review/[productId]`; see `BUG-005`. |
| Orders | `POST /api/order/new`; `GET /my?id=...`; `GET /all?id=...`; `GET|PUT|DELETE|POST /[id]?id=...` | Admin list/update/delete checks a caller-supplied DB user ID. Customer lists/details have no verified caller identity. POST to `[id]` cancels by deleting the order if the loaded user is permitted and state passes the check. |
| Payments/coupons | `GET /api/payment/discount?coupon=...`; `POST /api/payment/create`; `POST /api/payment/verify`; `GET /coupon/all?id=...`; `POST /coupon/new?id=...`; `GET|PUT|DELETE /coupon/[id]?id=...` | `/create` expects an `amount` and creates a Razorpay order. No `/api/payment/createPayment` handler exists, although the client calls that path. Cart's discount request uses a different method/path. See `BUG-001`, `BUG-002`, and `BUG-004`. |
| Dashboard | `GET /api/dashboard/stats|bar|line|pie?id=...` | All require a DB user looked up by supplied ID with role `admin`; analytics cached in Redis where configured. |
| Troubleshooting | `GET /api/admin-fix-v3` | No auth check; hard-coded user ID, deletes a Redis key, and returns the user document. Treat as a security issue, not a supported endpoint. |

## Authentication and authorization

- The browser initializes Firebase only if the public config values are present. `ReduxProvider` subscribes to `onAuthStateChanged`; on sign-in it fetches the profile using `/api/user/{uid}`.
- Login calls `POST /api/user/new`. The route trusts submitted identity/profile fields and does not validate a Firebase ID token in the handler. The first database user is assigned `admin`, subsequent new users `user`.
- `/admin` layout redirects clients whose Redux `user` is absent or not `admin`. This is a UI gate, not a substitute for server authorization.
- Several server handlers check `User.findById(id).role === "admin"`, but `id` comes from the request query and is not cryptographically bound to the caller. Treat privileged access control as **unverified and high risk** until an isolated security test proves otherwise.
- User/order read handlers have no caller identity/ownership check in source. No signed application session, authorization middleware, server-side Firebase token verification, or CSRF protection was found in the tracked tree. Verify before deployment.

## Data layer

Mongoose models: `User`, `Product`, `Order`, `Payment`, `Review`, `Coupon`. Schemas/timestamps and core fields are in `src/models/*.ts`; see feature docs for field-level behavior. There is no migration/seed/test database setup in the repository. `connectDB()` reads Mongo environment variables and caches connection state in a module-level object.

`reduceStock()` loads and saves each product one at a time before order creation. No transaction or rollback is present in the helper. Order inputs/totals are supplied by the client-facing request shape and should be independently validated/recomputed server-side; current route contracts disagree with UI payloads.

## Cache behavior

Redis is optional and no TTL is set in these route helpers. Cache keys include `latest-products-v2`, `categories`, `all-products`, `product-{id}`, user/order/list keys, coupon list, and admin chart/stats keys. `invalidateCache()` currently deletes `latest-products` (not `latest-products-v2`) and `admin-stats` (not `admin-stats-frontend-v2`), so stale catalog/dashboard data is possible when Redis is enabled. See `BUG-009` and `SCN-024`.

## Runtime/build configuration

- Next config enables the React Compiler and sets API response headers including `Access-Control-Allow-Origin: *` and `Access-Control-Allow-Credentials: true`. This combination and production CORS policy need security validation.
- TypeScript is strict; `next build` runs compilation/type checking and static generation. ESLint is configured through `eslint.config.mjs`.
- No Docker/Compose, CI workflow, middleware auth, Playwright/Cypress config, or deployment manifest was found.
- `npm run dev` uses port 5173; `npm run start` invokes default `next start` without a port override.

## Security boundaries to validate

1. Firebase identity → profile API → server identity binding.
2. Role checking for every admin API, including ID spoofing and stale cached profile cases.
3. Order/user personal data read isolation and cancellation ownership.
4. Checkout amount, stock, coupon, and signature integrity.
5. Public debug route and CORS response policy.
6. Search regex and multipart media validation/limits.

See [security scenarios](test-scenarios/security.md), [bugs](bugs/README.md), and [release readiness](reports/release-readiness.md). No live VAPT was performed.