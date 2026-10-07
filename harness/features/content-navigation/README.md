# Navigation and Informational Pages

**Feature:** FEAT-009
**Purpose:** Provide shared storefront navigation and static About/Policies content.
**User:** Visitor; customer
**Entry Point:** Shared header; `/about`; `/policies`; root links.
**Dependencies:** Next Link/router; static React content and Sass styles.
**Inputs:** Current path, viewport size, selected policy tab.
**Outputs:** Desktop/mobile navigation, static explanatory policy sections, page content.
**Business Rules:** No backend policy enforcement is present in the informational pages; displayed policy text is content only.
**Expected Behavior:** All public navigation links resolve, current route state is indicated, mobile navigation opens/closes, and informational tabs render their content.
**Error Handling:** Next not-found page handles unknown routes; there is no content API or CMS.
**Permissions:** Public.
**Related APIs:** None specific; root page fetches latest products, while About/Policies are static.
**Related Database Tables:** None directly.
**Related UI:** `src/components/Header.tsx`, `src/app/about/page.tsx`, `src/app/policies/page.tsx`, `src/app/not-found.tsx`, `src/styles/*`.
**Existing Tests:** No UI/browser/accessibility tests found.
**Missing Tests:** Keyboard/mobile/screen-reader/browser regression, policy text approval, link verification and responsive visual coverage.

## Feature documents

- [Requirements](requirements.md)
- [Behavior and source observations](behavior.md)
- [Acceptance criteria](acceptance-criteria.md)
- [Test scenarios](test-scenarios.md)
- [Test cases](test-cases.md)
- [Test data](test-data.md)
- [Known issues](known-issues.md)

Canonical test definitions are kept in the root `harness/test-scenarios/` and `harness/test-cases/` trees. An execution result is not implied by this inventory.
