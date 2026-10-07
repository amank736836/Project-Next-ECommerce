# Testing Strategy

## Principles

- Treat this harness as a map of observed code, not a substitute for product-owner confirmation. Mark uncertain requirements `UNKNOWN / REQUIRES VALIDATION`.
- Run only against a disposable non-production environment. Checkout/payment, role updates, database writes, Cloudinary deletes, and order stock updates can have irreversible external effects.
- Verify server-side authorization and pricing independently of client/UI checks. Use the Firebase test project and Mongo test database, never production identities/data.
- Record exact commit, environment, command, outcome, and evidence. Use `NOT_EXECUTED` until execution has occurred.
- Do not modify application source to make a test pass as part of harness maintenance. File a bug and add/retain a regression case.

## Test layers and priorities

| Priority | Layer | Focus | Current capability |
|---|---|---|---|
| P0 | Build/static quality | TypeScript/Next production build, lint, dependency audit | Existing npm scripts; current lint fails, build passes, audit reports vulnerabilities. |
| P0 | Security/API contract | ID spoofing, public personal-data reads, debug route, checkout integrity, request validation | Source-review cases plus an opt-in read-only API smoke script; no auth/API test framework or isolated backend supplied. |
| P1 | Critical business flows | Browse → product → cart → coupon → shipping → Razorpay → order; admin product and order workflows | Manual cases defined; not executed. Checkout has known contract mismatches. |
| P1 | Persistence/integration | Mongoose schema validation, stock/order atomicity, Redis invalidation, Cloudinary and payment integration | Requires disposable service credentials/data; no DB fixture runner or integration framework. |
| P2 | UI regression | navigation, responsive layouts, loading/error/empty states, accessibility | Manual browser checklist; no browser automation framework. |
| P2 | Performance | search query scaling, catalog pages, charts, concurrency, memory/response time | No load tool, baseline, or target in repository. UNKNOWN / REQUIRES VALIDATION. |

## Suite definitions

- **Smoke:** page rendering, public catalog endpoints and basic JSON shape; script at `automation/api/public-smoke.mjs`.
- **Functional/regression:** feature-level cases in `test-cases/`; all currently `NOT_EXECUTED` except tooling checks in the recorded run.
- **API/security:** invoke route handlers with missing/invalid/non-admin identities, owner/admin identities, malformed IDs and hostile inputs. The source currently trusts request-supplied identity IDs; security tests need an isolated environment and must not use real users.
- **Database:** verify schemas, unique email/coupon constraints, permitted enums, product stock changes, ratings aggregation, order/payment consistency, and cache behavior against a disposable Mongo/Redis instance. There is no checked-in test database or migration setup.
- **UI:** manually exercise desktop/mobile viewports, keyboard focus and accessible labels, async loading/error states, Firebase login, cart, checkout and admin screens. Do not attempt payment with a live key.
- **Performance/security/VAPT:** no approved SLO, security test plan, load target or scanner is present. Define scope/thresholds before claiming readiness.

## Safe local setup

1. Install exact lockfile dependencies with `npm ci` (Node/npm versions used for the baseline are in `TESTING_STATUS.md`).
2. Prepare a **separate** MongoDB database and, if desired, a separate Redis instance. Provide required variables via the shell/secret manager; never add values to Git or this harness.
3. Firebase, Razorpay and Cloudinary are not needed for a page/build smoke check. For integration tests, create sandbox/test credentials and verify their mode before use. Missing integrations may block those tests.
4. Run `npm run lint`, `npm run build`; record both even when one fails.
5. For public API checks only, start `npm run dev -- --hostname 0.0.0.0` and run the smoke script with `HARNESS_BASE_URL=http://127.0.0.1:5173`. It is read-only, but the API handlers connect to MongoDB. Default target guard rejects non-local hosts.
6. Use a fresh test database/data namespace. Never run the root `admin_and_check*.ts` scripts: they promote a hard-coded user to admin. Never invoke `/api/admin-fix-v3` against a shared or production service.

## Existing test infrastructure and constraints

There is no `test`/`test:watch` npm script, test framework, unit/component test, browser automation configuration, coverage tool, database fixture/seed framework, or CI config in the tracked repository. `npm run lint` and `npm run build` are the only configured quality commands. Three root TypeScript files are operational/debug scripts, not a safe test suite; see `test-tools/README.md`.

## Entry / exit guidance

There is no repository-defined release gate. As a proposed harness check (not an approved product SLO), a release review should require: production build pass; all critical feature/security cases executed in a disposable staging-equivalent environment; no unresolved critical/high security findings without explicit risk acceptance; regression and smoke suites executed; and every blocked/not-run case justified. Current evidence does not meet that bar; see `reports/release-readiness.md`.