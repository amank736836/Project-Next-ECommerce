# Project Overview

**Repository:** `amank736836/Project-Next-ECommerce`  
**Application name shown in UI:** VirtuoStore / Virtuo Store  
**Inspection baseline:** 2026-10-07, commit `d445d93`  
**Evidence boundary:** statements below are based on tracked source, package/config files, and the test commands recorded in this harness.

## Purpose and users

The code implements a Next.js storefront and admin area for an e-commerce shop. The home-page copy describes clothing, shoes, and everyday essentials. Visitors can browse/search products; a signed-in customer can use a cart, enter a shipping address, and initiate checkout; an administrator can manage catalog/customer/coupon/order data and view analytics.

Main user classes visible in code:

- **Visitor:** public home, catalog, product details, About, Policies, and login pages.
- **Customer:** Google sign-in, cart, coupon entry, checkout, order list/details/cancellation, and product reviews.
- **Administrator:** admin dashboard, charts, product/customer/coupon/transaction management, plus small Stopwatch and Toss pages.

No formal user-role, product, or legal specification beyond source/UI copy is checked in. Where business intent is ambiguous, see `UNKNOWN / REQUIRES VALIDATION` in [requirements](requirements/non-functional-requirements.md) and feature documents.

## Technology and architecture

| Layer | Repository evidence |
|---|---|
| Frontend | Next.js App Router (`next` 16.1.7), React 19.2.3, TypeScript 5, Sass, Redux Toolkit / RTK Query, Chart.js, React Table, `6pp`, React Hot Toast. UI is primarily client-rendered components under `src/app` and `src/components`. |
| Backend | Next.js Route Handlers under `src/app/api`; no separate backend service/project is present. Route handlers use Next request/response APIs. |
| Database | MongoDB through Mongoose 9.1.6. Models exist for User, Product, Order, Payment, Review, and Coupon in `src/models`. No migration directory, seed framework, or checked-in schema deployment procedure was found. |
| Cache | Optional Redis through ioredis. `src/lib/redis.ts` provides no-op `get`/`set`/`del` implementations when `REDIS_URI` is absent. |
| Identity | Firebase client SDK and Google popup authentication. `src/components/ReduxProvider.tsx` observes Firebase auth state and loads the application user via `/api/user/{uid}`. Server-side Firebase token verification was not found in the inspected API handlers. |
| Media | Cloudinary SDK for product photo upload/delete. |
| Payments | Razorpay Node SDK for server order creation/signature verification and Razorpay Checkout.js loaded by the browser. The checked-in client/server route contracts do not currently line up; see `BUG-002`–`BUG-004`. |
| Analytics | `@vercel/analytics/next` in root layout. This package alone does not establish the hosting provider. |

## Main workflows

1. **Browse:** `/` requests the latest products; `/search` requests paginated catalog data; `/product/[id]` loads product details and reviews.
2. **Sign in:** `/login` uses Firebase Google sign-in. New profiles require gender and date of birth; the API assigns the first stored user the `admin` role and later users `user`.
3. **Cart and discount:** Redux holds cart state in memory; quantity/price state is calculated in reducers. The cart page attempts to validate a coupon.
4. **Checkout:** `/shipping` collects shipping fields, opens Razorpay Checkout, requests server-side payment verification, then attempts to create an order and payment record. Several route/body mismatches are documented as open bugs.
5. **Order lifecycle:** customer order list/details are at `/orders` and `/order/[id]`; admin transactions at `/admin/transaction`. Admin status changes advance Processing → Shipped → Delivered. Cancellation removes an order rather than setting its `Cancelled` status.
6. **Administration:** product, customer, coupon, transaction, dashboard, and chart pages are under `/admin` and share a client-side admin layout.

## Important modules and routes

- **Storefront:** `src/app/page.tsx`, `search/page.tsx`, `product/[id]/page.tsx`, `components/ProductCard.tsx`, `components/Header.tsx`.
- **Identity/state:** `src/firebase.ts`, `components/ReduxProvider.tsx`, `redux/reducer/userReducer.ts`, `redux/reducer/cartReducer.ts`.
- **API/data:** `src/app/api/**/route.ts`, `src/lib/db.ts`, `src/lib/redis.ts`, `src/lib/cloud.ts`, `src/models/**`.
- **Admin:** `src/app/admin/**`, `src/components/admin/**`, `src/app/api/dashboard/**`.
- **Shared logic:** `src/utils/backend-features.ts` (stock, cache invalidation, charts/categories, Cloudinary) and `src/utils/features.ts` (image transform, response toast, month labels).

The full route/method inventory and trust boundaries are in [Architecture](ARCHITECTURE.md).

## Data and business logic

- **User:** string `_id` (Firebase UID in the client flow), name/email/photo, role (`admin`/`user`), gender (`male`/`female`), date of birth, timestamps, computed age.
- **Product:** name, photo records (`public_id`, URL), price, stock, category, description, ratings/count/average, timestamps.
- **Order:** shipping address, user reference, item snapshots, subtotal/tax/shipping/discount/total, status, timestamps.
- **Payment:** user/order references, payment status, Razorpay IDs/signature, timestamps.
- **Review:** comment, rating 1–5, user/product references, timestamps.
- **Coupon:** unique code, amount, length/prefix/postfix and character-set flags.

Cart reducer logic currently computes 18% rounded tax, ₹200 shipping for a non-empty subtotal up to ₹1,000, free shipping above ₹1,000, caps discount at subtotal, and sums those values. The Policies page states different shipping terms (₹50 below ₹999/free above). Intended pricing policy is therefore **UNKNOWN / REQUIRES VALIDATION**. More details are in `requirements/business-rules.md`.

## APIs and connected services

API groups include:

- `/api/product/*`: latest, categories, search/all, details, admin catalog, product create/update/delete, review list/create/delete.
- `/api/user/*`: profile create/read, admin user list/update/delete.
- `/api/order/*`: create, customer/admin lists, details, admin status update/delete, cancellation.
- `/api/payment/*`: coupon discount and admin coupon CRUD, Razorpay order creation and signature verification.
- `/api/dashboard/*`: stats plus bar/line/pie analytics.
- `/api/admin-fix-v3`: a hard-coded troubleshooting endpoint; it is not part of a safe public API contract.

External endpoints/services are Firebase Auth/Analytics, Cloudinary, Razorpay, optional Redis, MongoDB, and Vercel Analytics. Hosting provider, deployed environments, external API URLs, service tiers, retention, and production configuration are **UNKNOWN / REQUIRES VALIDATION**.

## Configuration discovered

No `.env.example`, deployment manifest, Docker file, or test-environment config is tracked. Code references these variables:

- MongoDB: `MONGO_URI`, `MONGO_DB`.
- Redis (optional): `REDIS_URI`.
- Cloudinary: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
- Razorpay server: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`; browser: `NEXT_PUBLIC_RAZORPAY_KEY` (source also contains a test-key fallback).
- Firebase public config: `NEXT_PUBLIC_FIREBASE_API`, `NEXT_PUBLIC_FIREBASE_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`, `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`.
- Optional client API origin: `NEXT_PUBLIC_SERVER_URL` (otherwise same-origin URLs are used in most RTK Query APIs).
- Optional catalog page size: `PRODUCT_PER_PAGE` (default 8 in route code).

These are names only, not secret values. Do not commit a `.env*` file or real credentials.

## Existing documentation

The root `README.md` is the generic create-next-app starter guide (dev server, Next.js links and generic Vercel deployment pointer); it does not document VirtuoStore workflows, API contracts, test setup, or environment variables. No separate API/product specification, environment example, migration guide, or test suite documentation was present before this harness.

## Build and deployment

`package.json` provides `npm run dev` (Next dev server on port 5173), `npm run build`, `npm run start`, and `npm run lint`. The production build was executed successfully in `RUN-20261007-01`. `npm run lint` currently fails; details are recorded in the run report. Deployment provider, CI workflow, release process, target environments, secrets-management configuration, and production database are **UNKNOWN / REQUIRES VALIDATION**.