# Test Setup

## Install and static verification

Use the lockfile and an approved Node/npm version (baseline used Node 22.22.3 and npm 10.9.8):

```bash
npm ci
npm run lint
npm run build
```

`npm run lint` currently fails on the pre-existing baseline; see `test-results/latest/RUN-20261007-01.md`. `npm run build` passed once at the inspected commit. Do not interpret successful build as a passing functional suite.

## Test environment variables

No `.env.example` exists. Provide only the variables needed for the test being run, through a local ignored `.env.local`, shell environment, or secret manager. Never add real values to this repository or attach them as evidence.

| Variable | Needed by | Required/optional in code |
|---|---|---|
| `MONGO_URI`, `MONGO_DB` | Data-backed APIs | Required for successful DB-backed routes; connection helper defaults URI to empty string if missing. |
| `REDIS_URI` | Redis caching | Optional; no-op cache is used when unset. |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Admin media upload/delete | Needed for product-media integration; use a test Cloudinary account/folder. |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Server payment order/signature routes | Needed only for Razorpay sandbox; do not use live keys. |
| `NEXT_PUBLIC_RAZORPAY_KEY` | Browser checkout | Public key only; source has a test-key fallback. Never expose a secret. |
| `NEXT_PUBLIC_FIREBASE_API`, `NEXT_PUBLIC_FIREBASE_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`, `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase client auth/analytics | Firebase initialization is conditional on core values; use a test Firebase project. |
| `NEXT_PUBLIC_SERVER_URL` | RTK Query API origin | Optional; most APIs default to same-origin. |
| `PRODUCT_PER_PAGE` | Catalog page size | Optional; API defaults to 8. |

## Safe database and integration rules

- Use a newly created disposable database with synthetic IDs and fake addresses/emails only.
- Verify the app is not connected to production before any write, Cloudinary action or checkout test.
- Payment tests must use Razorpay sandbox mode. Do not store actual card/payment data.
- Do not run `admin_and_check.ts` or `admin_and_check_inline.ts`: both target a hard-coded ID and can assign admin privileges. `check_products.ts` reads/prints database product details and has no dedicated npm/TypeScript test runner configured. None was invoked for harness creation.
- Do not invoke `GET /api/admin-fix-v3` against a shared service; it mutates cache and returns user data.
- Keep test evidence redacted; never include tokens, environment dumps, full personal records, or provider secrets.

## API smoke

Start the app against a local test DB, then follow [API tool instructions](api/README.md). The script defaults to `http://localhost:5173`, restricts non-local targets by default, and makes GET requests only.