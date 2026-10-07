# Smoke Scenarios

Smoke checks verify the app can serve a minimal public path before deeper testing. No production data or writes are needed.

| ID | Steps / expected observation | Case | Status |
|---|---|---|---|
| SCN-001 | Open `/`; page returns 200 and the latest-products area is rendered with a stable loading, data, empty, or error state. Read-only API probe also checks `/api/product/latest` response shape. | TC-001 | NOT_EXECUTED against app; API script available. |
| SCN-002 | Open `/search`; page renders; read-only search endpoint returns a JSON product list and page count. | TC-002 | NOT_EXECUTED against app; API script available. |
| SCN-025 | Open `/about`, `/policies`, and `/search`; primary public links resolve; mobile navigation opens/closes. | TC-025 | NOT_EXECUTED. |
| SCN-030 | `npm run build` completes and produces the Next route manifest. | TC-030 | PASS in RUN-20261007-01. |
| SCN-032 | Smoke-runner source parses and refuses an unauthorized non-local target before making a request. | TC-032 | PASS in RUN-20261007-01; no application endpoint contacted. |
| SCN-033 | Harness relative Markdown links resolve to existing files. | TC-033 | PASS in RUN-20261007-01; utility checks local documentation links. |

Use [API smoke runner](../automation/api/public-smoke.mjs) with a local test app; it does not test Firebase, checkout, admin authorization, or visual correctness.