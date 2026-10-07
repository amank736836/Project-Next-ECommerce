# Database Automation

No integration test runner, test database configuration, seed script or migration framework is checked in. Mongoose is the application ODM. Root `check_products.ts` is a read-only troubleshooting script but prints complete product documents, requires `MONGO_URI`/`MONGO_DB` and has no declared execution script; it was not run. `admin_and_check.ts` and `admin_and_check_inline.ts` mutate a hard-coded user's role and must not be used as tests.

Future DB tests should use a disposable database and verify model required/enum/unique constraints, stock consistency, rating aggregates and Redis invalidation. See scenario guide `../../test-scenarios/database.md`.
