# API Test Tool

**Tool:** Node built-in `fetch` via `automation/api/public-smoke.mjs`  
**Purpose:** Read-only smoke checks for public pages/catalog endpoints and invalid coupon response.  
**Installation:** None beyond Node (baseline Node 22.22.3; built-in fetch is available).  
**Configuration:** `HARNESS_BASE_URL` defaults to `http://127.0.0.1:5173`; `HARNESS_ALLOW_REMOTE=1` is required for any non-local host. App API checks need an isolated MongoDB test database.  
**How to run:** `node harness/automation/api/public-smoke.mjs`  
**Expected output:** One PASS/FAIL per check and aggregate summary; exit 1 if a check fails, 2 for rejected configuration.  
**Results:** Copy output into `test-results/` and `evidence/logs/` only when actually run. Current state: NOT_EXECUTED.  
**Limitations:** No auth token, write methods, payment, review mutation, browser behavior, database side-effect verification or remote production access.
