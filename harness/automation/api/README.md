# API Automation

A dependency-free, read-only HTTP smoke check is available in [`public-smoke.mjs`](public-smoke.mjs). It checks public HTML responses and catalog JSON shapes, plus the expected invalid-coupon 400 response.

```bash
HARNESS_BASE_URL=http://127.0.0.1:5173 node harness/automation/api/public-smoke.mjs
```

Start the app with a disposable `MONGO_URI`/`MONGO_DB` first. The script never issues writes and rejects remote hosts by default; a remote override is only for an approved QA target. It was syntax-checked but not executed in the baseline. It does not validate protected routes or checkout because the source has known API contract/authentication gaps.
