# Database Test Tooling

**Tool:** Mongoose 9.1.6 in application code; no separate DB test runner.  
**Purpose:** MongoDB model persistence and API data access.  
**Installation:** Included through `npm ci`.  
**Configuration:** `MONGO_URI`, `MONGO_DB`; use a disposable database only. Optional `REDIS_URI` enables Redis caching.  
**How to run:** Start the application/API against the disposable database; for a future test suite, use isolated seed/cleanup code (none exists). Do not run admin promotion scripts.  
**Expected output/results:** Defined model/API checks and DB snapshots; no database test results exist for this baseline.  
**Limitations:** No fixture/migration/transaction integration test, no test DB credentials, no cleanup harness, and no runtime DB test executed.
