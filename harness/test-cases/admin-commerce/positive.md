# Admin Commerce — Positive Cases

## TC-020 — FEAT-007

**Test Case ID:** TC-020
**Feature:** FEAT-007
**Priority:** P1
**Type:** Functional / API / integration
**Preconditions:** Test admin identity and isolated MongoDB/Cloudinary test account; image assets are synthetic.

**Steps:**
1. Create product with all required fields and photo.
2. Read the new product from public and admin list routes.
3. Update fields/photo; inspect old and new Cloudinary asset state.
4. Delete the test product and verify DB/cache/media cleanup.

**Test Data:** `test-data/valid/product.json` plus a local non-sensitive test image; Cloudinary test folder only.

**Expected Result:** Admin-only CRUD persists intended values; category is normalized; media and DB/cache stay consistent; invalid input leaves no orphan record/file.

**Actual Result:** NOT_EXECUTED.

**Status:** NOT_RUN
**Automation:** MANUAL
**Evidence:** NOT_EXECUTED
**Related Requirement:** REQ-013
**Related Scenario:** SCN-020
**Related Bug:** BUG-007, BUG-009
**Last Executed:** NOT_EXECUTED
