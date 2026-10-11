# VirtuoStore QA Report

**Scope:** Next.js 16.4.0 storefront (`/home/user/Project-Next-ECommerce`, branch `arena/87714838-project-next-ecommerce`, base `6c7ea3a`).
**Date:** 2026-10-11.
**Environment:** Firebase, MongoDB, Redis, Razorpay and Cloudinary were not configured. The app ran in guest mode, and `/api/*` was served from in-memory fixtures (`e2e/fixtures/mock-api.ts`), except where noted.
**Browser:** Chromium 1440×900 desktop profile (Playwright 1.64.0 with a locally extracted Chromium). **Firefox, Safari/WebKit and Edge were not tested.** See "Coverage gaps".

---

## 1. Readiness assessment

**Verdict: conditionally ready for release.** Every High-severity defect found in this audit is fixed and covered by an automated regression test. The remaining open items are Medium or Low.

Before release, the following must be done:
1. Test in Firefox, Safari (WebKit) and Edge. These were not run.
2. Run an authenticated pass against a real Firebase project. The signed-in checkout path is only partly verified (see §6).
3. Optimise the uncompressed images in `public/images` (QA-016).

---

## 2. Issue register

Severity: **H** High, **M** Medium, **L** Low. Status: **Fixed** means fixed in code and covered by a passing test. **Open** means not fixed in this pass.

| ID | Page / Component | Issue | Description | Sev | Viewport | Root cause | Fix | Status |
|---|---|---|---|---|---|---|---|---|
| QA-001 | Cart / Redux store | Cart lost on reload | Items added from a product card were gone after a page reload. | H | 1440 | Cart state lived only in Redux memory; nothing was persisted. | `CartPersistence` in `ReduxProvider.tsx` writes to localStorage key `virtuostore-cart-items` and restores it once on the client. A corrupt value is ignored. `hydrateCartItems` added to `cartReducer.ts`. | Fixed (baseline fails) |
| QA-002 | Product page / add-to-cart | Quantity overwritten | Adding a product already in the cart reset the header count (expected 3, got 2). | H | 1440 | `addToCart` set quantity to 1 instead of merging. | Quantity is merged and capped at stock in `ReviewCustomizedButtons.tsx`. Confirmed directly on both servers with `verify-merge.mjs`. | Fixed (baseline fails) |
| QA-003 | Search | Products hidden above ₹1,00,000 | The default price filter hid every product above ₹1,00,000. | H | 1440 | Search always sent a `price` filter. | `search/page.tsx` sends `price` only when below `maxPriceFallback = 100000`. | Fixed (baseline fails) |
| QA-004 | Cart page | Horizontal overflow and oversized thumbnail | `/cart` overflowed by about 26 px at 320–390, and cart thumbnails rendered at natural size (about 1448 px wide at 375). | H | 320–390 | Thumbnail sizing rule missed the cart item image; summary row not constrained on narrow screens. | `_cart.scss` selector `>a >img` sizing; `@media (max-width:860px)` layout block. | Fixed (baseline fails) |
| QA-005 | Product page `/product/[id]` | Overflow on phones and tablets | Add/buy controls and layout overflowed between 320 and 820 px (about 194 px at 375 before fix). | H | 320–820 | Fixed-width product layout with no narrow breakpoint. | `@media (max-width:860px)` block in `_productDetails.scss`. | Fixed |
| QA-006 | About `/about` | Grid overflow at 320 | Two-column grid overflowed at 320 px. | M | 320 | Grid used a fixed minimum column width. | `minmax(min(300px,100%),1fr)` in `about/page.tsx`. | Fixed |
| QA-007 | Cart `CartItem` | Unnamed quantity and remove controls | Screen readers announced unnamed buttons. | M | All | Icon-only buttons had no accessible name. | `aria-label` on quantity and remove buttons; trash icon `aria-hidden`. | Fixed (baseline fails) |
| QA-008 | Shipping `/shipping` | Signed-in users bounced to /login | A signed-in user who loaded checkout directly, or refreshed it, was redirected to `/login`. A possible earlier redirect to `/cart` before cart hydration is inferred from effect order and was not separately reproduced. | H | 1440 | Guard ran on mount and checked `user` before Firebase auth resolved, ignoring `userReducer.loading`. | Effect returns early while `userLoading` is true. Reproduced with `auth-race-probe.mjs`: before the fix the URL became `/login` at about 3 s, and after the fix it stays on `/shipping`. | Fixed (guest paths tested; signed-in path verified by probe only) |
| QA-009 | Cart `CartItem` | Double-click on "−" deletes the item | A double-click on the decrease button removed the whole line item with no confirmation and no keyboard equivalent. | H | 1440 | Hidden `onDoubleClick={removeHandler}` on the decrement button. | Handler removed. The explicit "Remove … from cart" button is unchanged. Confirmed failing before the fix and passing after. | Fixed |
| QA-010 | Policies `/policies` | Literal `**` markdown in copy | Policy text showed raw `**Virtuo Store**`-style markers (9 spans). | L | All | Markdown syntax pasted into JSX text. | Converted to `<strong>` elements. Test fails on the old build and passes on the new one. | Fixed |
| QA-011 | About `/about` | Off-brand accent and excess top padding | Used `#f97316` (a different orange from the site accent) and `10rem` top padding under a ~78 px fixed header, leaving a large empty band. | L | All | Inline styles were not using design tokens. | Accent replaced with `var(--accent-deep)`. Top padding reduced to `6rem`. Visually reviewed at 390 and 1440. | Fixed |
| QA-012 | Global / a11y (axe) | Colour contrast, image alt and button names | On the original commit, axe reported 20 colour-contrast violations (every route at 1440 and 390), 2 `image-alt`, and 2 `button-name`. Re-verified warm on 2026-10-11. | H | All | Low-contrast text and accent tokens; unlabelled images and controls. | Accent and text tokens darkened (`--accent-deep #b84a24`, `$color3 #c2502a`, `.red #b8402f`; greys `#6b675f` in `_home`, `_search`, `_login`). Labels added (QA-007, QA-013, QA-014). | Fixed. Current code: axe 20/20, 0 violations. Baseline: 20/20 fail. |
| QA-013 | Login `/login` | Gender select has no programmatic label | The select was not labelled for assistive technology. | M | All | Missing `htmlFor`/`id` pairing. | `htmlFor`/`id` added. | Fixed |
| QA-014 | Product gallery `/product/[id]` | Unnamed carousel controls and images | Gallery images and prev/next controls had no names. | M | All | Missing alt text and `aria-label`. | `galleryRef` effect names images and carousel buttons. | Fixed |
| QA-015 | Shipping / Razorpay | Unhandled rejection when checkout script fails | If the Razorpay script failed to load, an unhandled promise rejection was thrown and nothing was shown to the user. | M | All | `loadScript` promise had no catch. | `.catch` added, with a toast shown to the user. | Fixed (not separately tested; the Razorpay CDN is unreachable in this environment) |
| QA-016 | Global / assets | Large uncompressed images in `public/` | `virtuo-editorial.jpg` is 262 KB, `tails.png` 193 KB and `heads.png` 141 KB. | M | All | Source images not optimised for web. | Recommended: convert to WebP or AVIF and resize to the displayed size. | Open |
| QA-017 | Build / Sass | `@import` deprecation warnings | Every dev build warns that Sass `@import` is deprecated and will break in Dart Sass 3.0. | L | — | `app.scss` uses `@import` for partials. | Recommended: migrate to `@use`. Not changed in this pass to avoid a broad refactor. | Open |
| QA-018 | Header `Header.tsx` | Icon-only navigation at 851–1100 px | Labels are hidden between 851 and 1100 px, so the nav is icons only. Links have `title` tooltips and accessible names. Looks intentional and was reviewed visually. | L | 851–1100 | Compact breakpoint design. | No change. Consider visible labels if the design allows. | Open (observation) |
| QA-019 | Global / keyboard | No skip-to-content link | The first Tab stop on the home page is the logo, and no skip link was observed. | L | All | No skip link in layout. | Recommended: add a visually hidden skip link as the first focusable element. | Open (observation) |
| QA-020 | Policies `/policies` | Brand name used as `<h1>` | Each policy tab renders `<h1>Virtuo Store</h1>`, so the page heading is the brand rather than "Policies". Only one `<h1>` is rendered at a time. | L | All | Heading level and text choice. | Recommended: use the page name as `<h1>`. | Open |

**Totals:** 20 issues. High 8 (all fixed). Medium 6 (5 fixed, 1 open). Low 6 (2 fixed, 4 open). **Fixed 15, open 5.**

**Verified, not reproduced:** the product-card add button (`ProductCard.tsx`) already checks stock. A test confirms that clicking beyond stock stops at 4 and shows "reached the available stock". The earlier suspicion was incorrect, and no code was changed. The test is kept as a guard.

---

## 3. Automated results

Current code, production build (`next build` then `next start` on 5173), Chromium 1440×900:

| Suite | Cases | Result |
|---|---|---|
| `responsive.spec.ts`: 12 widths (320–2560) × 9 routes, overflow and layout checks | 108 | Passed |
| `functional.spec.ts`: navigation, forms, search, cart, empty and error states | 23 | Passed |
| `regressions.spec.ts`: one test per confirmed defect plus guards | 19 | Passed |
| `accessibility.spec.ts`: axe WCAG 2.2 AA, 10 routes × desktop and mobile | 20 | Passed, 0 violations |
| **Total** | **170** | **170 passed, 0 failed** |

Run logs: `/home/user/qa/out/full-run4-prod.log` (production), `full-run3.log` (dev). Type check: `npx tsc --noEmit` exits 0 (`out/tsc-run2.log`). Production build: exits 0 (`out/build-run2.log`).

**Baseline comparison (original commit `6c7ea3a`, warm server):**
- Regression and functional: 17 of 37 fail (`out/baseline-run3.log`). These cover QA-001 to QA-004 and QA-007, plus the search cap, empty state, cart controls and header count.
- Accessibility: 20 of 20 fail (`out/baseline-a11y-warm.log`). Causes: colour contrast on every route, plus image alt and button name.

Note: earlier baseline a11y failures were thought to come from a cold server. The warm re-run shows the same failures, so the cause is the code.

Known test limitations:
- The 170-case suite runs with Firebase unconfigured, so it exercises guest mode only.
- The QA-008 guard tests cover only the guest paths. The signed-in path was checked with `auth-race-probe.mjs`, which is kept in `/home/user/qa/`.
- Razorpay and Cloudinary are unreachable, so the payment step is untested end to end.

---

## 4. Responsiveness

- **Matrix:** 12 widths (320, 375, 390, 425, 768, 820, 1024, 1280, 1366, 1440, 1920, 2560) × 9 routes (home, search, product, cart with no items, about, policies, login, orders, 404), checking horizontal overflow and key element bounds. `/shipping` and a populated cart are not in this matrix. Shipping was checked at 375 in the early smoke pass, and the populated cart is covered only at 375 px by a QA-004 regression test. Populated-cart layout at other widths is not covered. Initial run 98 of 108 passed. After QA-004, QA-005 and QA-006 were fixed, all 108 pass.
- **Header:** the hamburger menu appears at 850 px and below. At 851 px and above the nav is inline. Checked visually at 390, 1024 and 1101 px. No overlap with the fixed header. See `test-results/qa-evidence/manual/`.
- **Touch targets:** not measured in a dedicated run. Icon buttons were checked for being inside the viewport only.
- **Mobile landscape (e.g. 844×390):** not run.

## 5. Accessibility (WCAG 2.2 AA)

**Automated (axe-core 4.13.0):** 20 of 20 pass on the current code, with zero violations on 10 routes at desktop and mobile widths. Baseline fails (QA-012).

**Manual checks:**
- **Keyboard focus and order:** tested on the home page. Tab moves through the header in visual order. Each focused link shows a 3 px solid outline. Passed for the home page only.
- **Focus-visible styles:** present for links and buttons (4 focus rules in `src/styles`). Not checked for every component.
- **Reduced motion:** one `prefers-reduced-motion` block in `app.scss`. Animations are in 3 files. Not verified in a browser with the setting enabled.
- **Zoom:** 200% and 400% zoom were not run as a browser test. The 320 px viewport (equivalent to 400% zoom on a 1280 px screen) passes the overflow checks.
- **Not verified:** screen reader output (NVDA, VoiceOver, TalkBack), colour-only state indication, form error announcements.

## 6. Functional coverage

Covered by automated tests (guest mode):
- Navigation between all public pages; 404 page for an unknown route.
- Search: query, sort, price filter (QA-003), empty results.
- Cart: add, quantity change, remove (QA-009), persistence (QA-001), corrupt-storage recovery, empty state.
- Product page: add-to-cart merge (QA-002), gallery controls.
- Login form: labels (QA-013).
- Policies tabs (QA-010).
- Admin routes redirect guests to `/login`.

Partly covered:
- **Signed-in checkout (QA-008):** the redirect race was reproduced and fixed. The signed-in flow was checked with a seeded Firebase user in a configured preview on 5175. The probe reached `/shipping` and showed "Shipping Address" after the fix.
- **Admin pages and order history with a real admin account:** not tested.

Not verified:
- Payment (Razorpay) end to end, and coupon handling.
- Pagination and infinite scroll (the catalogue is small in fixtures).
- Slow network and failed API behaviour: only a full API outage (`mockApi("down")`) is covered in the responsive matrix.
- Invalid and special-character form input beyond the login and shipping required-field checks.

## 7. Performance and stability

Production build, `perf.mjs`, 390×844 at 2× device pixel ratio, 2.5 s settle time, mocked API:

| Route | LCP (ms) | CLS | Long tasks | INP proxy (ms) | Console errors | Failed requests |
|---|---|---|---|---|---|---|
| `/` | 748 | 0 | 2 | 64 | 1 | 1 (environmental) |
| `/search` | 140 | 0 | 0 | 32 | 1 | 1 (environmental) |
| `/product/[id]` | 636 | 0 | 1 | 32 | 1 | 1 (environmental) |
| `/cart` | 132 | 0 | 1 | 32 | 1 | 1 (environmental) |
| `/about` | 132 | 0 | 0 | 32 | 1 | 1 (environmental) |
| `/login` | 144 | 0 | 1 | 32 | 1 | 1 (environmental) |

- **Environmental:** the only console error and failed request on every route was `/_vercel/insights/script.js` (404). This is Vercel analytics, which is absent locally. No application console errors were recorded.
- **Assets:** shipped JavaScript is about 1.35 MB raw, 426 KB gzipped, with the largest chunk at 230 KB raw. CSS is 63 KB raw, 12 KB gzipped. The per-request byte counts from `perf.mjs` read 0 and were not used.
- **Images:** see QA-016.
- **INP:** the proxy is a single synthetic tap, not a real interaction trace. It is not a reliable INP measurement.
- **Leaks and long sessions:** not measured.

## 8. Cross-browser

| Browser | Status |
|---|---|
| Chrome (Chromium 1440 desktop) | Tested. All automated suites pass. |
| Edge | **Not tested separately.** Edge is Chromium-based, so the Chromium results apply, but Edge-specific behaviour was not checked. |
| Firefox | **Not tested.** The Firefox download was blocked (no access to the Playwright CDN or GitHub asset hosts). |
| Safari / WebKit | **Not tested.** No WebKit build was reachable. Safari-specific risks include `100vh` sizing, `position: sticky` and `aspect-ratio`. |
| Mobile browsers (iOS Safari, Android Chrome) | Not tested. The mobile profile is a Chromium emulation only. |

## 9. Coverage gaps (not verified)

- Firefox, Safari/WebKit, Edge and mobile browsers.
- Authenticated pages with a real Firebase account: shipping payment, orders, admin dashboard.
- Razorpay, Cloudinary, MongoDB and Redis integrations (backend not run).
- Screen reader testing and manual reduced-motion checks.
- Zoom at 200% and 400% as browser tests.
- Mobile landscape viewports.
- Long-session memory leaks.

## 10. Evidence

- Automated logs: `/home/user/qa/out/` (`full-run4-prod.log`, `full-run3.log`, `baseline-run3.log`, `baseline-a11y-warm.log`, `build-run2.log`, `tsc-run2.log`, `perf-prod-run1.log`).
- Playwright artefacts (traces, failure screenshots): `test-results/playwright/` (git-ignored).
- Manual screenshots: `test-results/qa-evidence/manual/` (header at 390, 1024 and 1101 px; About page before and after, 390 and 1440; authenticated `/shipping`).
- Accessibility JSON: `test-results/qa-evidence/a11y/`.

## 11. Changed files (this pass)

- Source: `src/app/shipping/page.tsx` (QA-008), `src/components/CartItem.tsx` (QA-009, QA-007), `src/app/policies/page.tsx` (QA-010), `src/app/about/page.tsx` (QA-006, QA-011), `src/app/login/page.tsx` (QA-013), `src/app/product/[id]/page.tsx` (QA-014), `src/app/search/page.tsx` (QA-003), `src/redux/reducer/cartReducer.ts` and `src/components/ReduxProvider.tsx` (QA-001), `src/components/Review/ReviewCustomizedButtons.tsx` (QA-002), `src/components/Header.tsx` (no change), styles in `src/styles/` (QA-004, QA-005, QA-012).
- Tests: `playwright.config.ts`, `e2e/` (fixtures, responsive, functional, regressions, accessibility).
- Tooling: `.gitignore` (test output folders).
