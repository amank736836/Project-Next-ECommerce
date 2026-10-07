# Test Tools Inventory

The repository has build/lint tooling, but no test framework, coverage instrumentation, browser automation, API client collection, database integration test runner, load-test tool, or VAPT scanner. No new dependency was added for this harness; the API smoke script uses Node's built-in `fetch`.

| Tool | Present/used for | Configuration | Notes |
|---|---|---|---|
| npm + lockfile | Install, dev, production build, server start, ESLint | `package.json`, `package-lock.json` | `npm run lint` currently fails; build passes in recorded run. |
| Next.js / TypeScript | Production build and route compilation/type checking | `next.config.ts`, `tsconfig.json` | Build is not a functional test. |
| ESLint 9 / `eslint-config-next` | Static checks | `eslint.config.mjs`; `npm run lint` | 63 errors and 52 warnings in current baseline. |
| npm audit | Dependency advisory scan | `package-lock.json` | 29 advisories reported; see dependency report. |
| Node built-in fetch | Read-only public route smoke script | `automation/api/public-smoke.mjs` | No install required; requires local app and MongoDB for API checks. |
| Mongoose | Application data layer | `src/models`, `src/lib/db.ts` | No separate test DB/seed runner. Root helper scripts are not a safe test suite. |
| Manual browser | UI exploration | No checked-in browser config | No browser automation or saved browser evidence. |
| Cloudinary/Razorpay/Firebase | External app integrations | Environment variables | Sandbox integration tests not configured or run. |

## Tool details

- [Setup and safe environment](setup.md)
- [API](api/README.md)
- [UI](ui/README.md)
- [Database](database/README.md)
- [Performance](performance/README.md)
- [Security](security/README.md)

No tool should be described as “installed” unless listed in `package.json`/lockfile or in the harness itself.