# Non-Functional Requirements and Validation Gaps

No formal NFR/SLO, accessibility standard, supported browser matrix, privacy retention policy, performance target, or security policy was found in the repository. Do not treat the proposed checks below as approved product requirements.

| Area | Repository evidence | Status / validation needed |
|---|---|---|
| Buildability | Next production build completed in `RUN-20261007-01`; strict TypeScript configured. | Build observed PASS for this commit only. Re-run after changes. |
| Static quality | ESLint configured and `npm run lint` exists. | Baseline fails with 63 errors / 52 warnings. Fix ownership/prioritization is UNKNOWN. |
| Dependency security | Lockfile exists; `npm audit --json` was run. | 29 findings (3 critical, 19 high, 6 moderate, 1 low); see `reports/dependency-audit.md`. No policy/exception process is checked in. |
| Authentication/security | Firebase Google client auth and role checks in UI/API. | No server-side Firebase token verification was found; admin API identity can be supplied as query ID. Security posture is UNKNOWN / REQUIRES VALIDATION. |
| API CORS | `next.config.ts` sends wildcard origin plus credentials for `/api/*`. | Intended production origins, credentials, CSRF/CORS policy are UNKNOWN / REQUIRES VALIDATION. |
| Privacy | User model includes name/email/photo/gender/DOB; order stores shipping data; analytics is enabled. | Retention, deletion, consent, data minimization, legal basis, and jurisdiction are UNKNOWN / REQUIRES VALIDATION. |
| Availability/resilience | MongoDB required for most APIs; Redis is optional; external Firebase/Cloudinary/Razorpay dependencies exist. | Availability target, timeout/retry/fallback policy, monitoring, backup/restore, disaster recovery are UNKNOWN / REQUIRES VALIDATION. |
| Performance/scalability | Product search applies a page limit (default 8); some chart reads scan/aggregate broad datasets. | No response-time, throughput, concurrency, dataset-size, memory, or query-time targets/tool are checked in. UNKNOWN / REQUIRES VALIDATION. |
| Accessibility/usability | Semantic landmarks/labels exist in some pages; no accessibility tooling/config is present. | WCAG target, automated audit, keyboard/screen-reader test status are UNKNOWN / REQUIRES VALIDATION. |
| Browser/device support | Responsive storefront/admin styles and a mobile navigation/sidebar are present. | Supported browser/device/viewport matrix and actual UI test results are UNKNOWN / REQUIRES VALIDATION. |
| Observability | Console logging, toast errors, Vercel Analytics dependency. | Structured server logs, log redaction, alerting, trace/correlation IDs and audit logs are UNKNOWN / REQUIRES VALIDATION. |
| Deployment | `next.config.ts`, npm build/start commands; no Docker/CI/deployment manifest. | Host/provider, environment separation, deployment target, release/rollback process and secret injection are UNKNOWN / REQUIRES VALIDATION. |

## Harness verification suggestions (not approved targets)

Establish owner-approved budgets before measuring: catalog/API latency, p95 checkout API latency, concurrent-user target, maximum product/media upload size, rate limiting, uptime, and supported accessibility level. Until then, performance/security/release readiness cannot be called compliant or ready.