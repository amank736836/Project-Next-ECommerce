# Known Issues Summary

Current open findings are enumerated in [bugs/README.md](README.md) and individually tracked under `bugs/open/`.

## Release-critical/security findings

- Checkout currently has static request/response route mismatches: coupon validation (`BUG-001`), Razorpay order creation (`BUG-002`), order required totals (`BUG-003`), and missing payment persistence endpoint (`BUG-004`). No successful end-to-end purchase was executed.
- `GET /api/admin-fix-v3` has no authorization and returns a user record (`BUG-006`).
- Admin API roles are selected using caller-supplied IDs without Firebase token binding; user/order reads do not consistently enforce ownership (`BUG-007`, `BUG-008`).
- npm audit at the inspected lockfile reported 3 critical and 19 high advisories (`BUG-011`).

## Additional findings

- Review client/server create/response contract mismatch (`BUG-005`); coupon generator metadata is not persisted (`BUG-014`); cache invalidation key mismatch (`BUG-009`); raw Mongo regex input (`BUG-012`); wildcard CORS header plus credentials (`BUG-013`); lint baseline failure (`BUG-010`).
- Customer-visible policy copy and cart shipping formula conflict; intended shipping rule is `UNKNOWN / REQUIRES VALIDATION` (not currently assigned a bug ID pending product-owner decision).
- Root database helper scripts are not tests; two can promote a hard-coded account to admin. See `test-tools/setup.md` and `BUG-006`.

This is source review and tool output, not a live penetration test or runtime bug reproduction. Do not interpret missing evidence as absence of risk.