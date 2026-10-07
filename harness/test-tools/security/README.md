# Security Test Tooling

**Tool:** npm audit is available through npm; source review was performed for harness discovery. No SAST/DAST/VAPT scanner is configured or installed as a project tool.  
**Purpose:** Identify known npm advisories and provide a manual API trust-boundary test plan.  
**Installation:** `npm ci`; audit needs registry access.  
**Configuration:** `package-lock.json`; `npm audit --json`. Do not include credentials.  
**How to run:** `npm audit` or `npm audit --json`; test API findings only in an authorized isolated environment.  
**Expected output/results:** Advisory counts and affected package/fix details; current run reported 29 findings (including 3 critical and 19 high). See `reports/dependency-audit.md`.  
**Limitations:** npm audit covers dependencies only, not application vulnerabilities; no runtime VAPT was run.
