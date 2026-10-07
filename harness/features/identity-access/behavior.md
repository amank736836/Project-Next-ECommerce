# FEAT-002 Behavior

Client calls signInWithPopup, sends user fields to `/api/user/new`, then Firebase auth-state listener fetches `/api/user/{uid}` and dispatches the DB profile. Admin layout redirects non-admins to `/login`; APIs independently load the ID supplied in query parameters.

## Source pointers

`src/app/login/page.tsx`, `src/components/ReduxProvider.tsx`, `src/components/Header.tsx`, `src/app/admin/layout.tsx`, `src/app/admin/customers/page.tsx`.

This description is static source analysis. Runtime behavior is not asserted unless a run record says otherwise.
