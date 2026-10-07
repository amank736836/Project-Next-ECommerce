# Script Inventory

The application scripts are defined in root `package.json`: `dev`, `build`, `start`, `lint`. This folder contains no duplicate wrapper around them.

Root TypeScript helper files: `check_products.ts` reads/prints product data; `admin_and_check.ts` and `admin_and_check_inline.ts` can change a specific user's role to admin. They are not test suites, are not wired to npm scripts, and were not executed. Treat the latter two as unsafe outside a disposable database.
