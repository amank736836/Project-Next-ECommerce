# Automation

## Existing automation

No unit-test framework or automated functional suite is configured in the application. This harness adds a dependency-free, read-only public API smoke script at [`api/public-smoke.mjs`](api/public-smoke.mjs) and a local Markdown link checker at [`utilities/check-markdown-links.py`](utilities/check-markdown-links.py). The API script uses Node's built-in `fetch`; it does not exercise login, admin authorization, writes, payments, Cloudinary, database mutations, browser rendering, or accessibility.

Run it only with the app connected to a disposable test database:

```bash
npm run dev -- --hostname 0.0.0.0
HARNESS_BASE_URL=http://127.0.0.1:5173 node harness/automation/api/public-smoke.mjs
```

It checks `/`, `/search`, `/about`, `/policies`, `GET /api/product/latest`, `/api/product/categories`, `/api/product/all`, and a randomized invalid coupon on `GET /api/payment/discount`. It rejects non-local base URLs unless `HARNESS_ALLOW_REMOTE=1` is set. The explicit override is for an authorized QA environment only; never use production.

The script's syntax and non-local-host guard were validated; it was **not executed against an app/database** because no app/database environment was supplied. Its endpoint smoke outcome is `NOT_EXECUTED`.

## Automation boundaries

- `npm run lint`, `npm run build`, and `npm audit` are existing automated tooling checks; results are recorded in `test-results/latest/`.
- The app has no current API write tests, UI browser automation, database fixture tests, performance/load tests, or VAPT automation.
- Do not add another framework without first agreeing runtime/version, CI and test-service ownership. Prefer the existing stack; use Node built-ins for small harness-only checks.

See [API](api/README.md), [UI](ui/README.md), [database](database/README.md), [utilities](utilities/README.md), and [script inventory](scripts/README.md).