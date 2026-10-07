# Identity and Access

**Feature:** FEAT-002
**Purpose:** Use Firebase Google sign-in to hydrate an app user profile and distinguish customer/admin UI capabilities.
**User:** Visitor; customer; administrator
**Entry Point:** `/login`; shared `ReduxProvider`; `/admin/*`; `/api/user/*`
**Dependencies:** Firebase client Auth, Redux user slice, MongoDB User model, Next API routes.
**Inputs:** Firebase UID, name, email, photo, gender and date of birth; admin/user ID parameters on API calls.
**Outputs:** User profile in Redux; login feedback/navigation; admin-only navigation/layout; API role decisions.
**Business Rules:** New profile requires gender and DOB. First database user is assigned admin; later new profiles are user. User schema allows roles admin/user and genders male/female.
**Expected Behavior:** A valid Google account loads its existing profile or creates one; profile data remains associated with that Firebase identity; only an authenticated admin can perform admin operations.
**Error Handling:** If Firebase config is absent, login/logout display an environment configuration toast. Profile load errors set userNotExist. API validation and identity binding need tests.
**Permissions:** Admin layout checks Redux role. API routes generally check a DB role for a caller-supplied query `id`; inspected handlers do not verify Firebase ID tokens or bind the ID to the caller.
**Related APIs:** `POST /api/user/new`, `GET /api/user/[id]`, `GET /api/user/all?id=...`, `PATCH|DELETE /api/user/[id]?id=...`.
**Related Database Tables:** User (string ID, name, email, photo, role, gender, DOB, timestamps, computed age).
**Related UI:** `src/app/login/page.tsx`, `src/components/ReduxProvider.tsx`, `src/components/Header.tsx`, `src/app/admin/layout.tsx`, `src/app/admin/customers/page.tsx`.
**Existing Tests:** No auth/API tests found. No Firebase test configuration supplied.
**Missing Tests:** Firebase token verification, role bootstrap safety, missing/invalid profile fields, duplicate users, owner/admin authorization and sign-out session lifecycle.

## Feature documents

- [Requirements](requirements.md)
- [Behavior and source observations](behavior.md)
- [Acceptance criteria](acceptance-criteria.md)
- [Test scenarios](test-scenarios.md)
- [Test cases](test-cases.md)
- [Test data](test-data.md)
- [Known issues](known-issues.md)

Canonical test definitions are kept in the root `harness/test-scenarios/` and `harness/test-cases/` trees. An execution result is not implied by this inventory.
