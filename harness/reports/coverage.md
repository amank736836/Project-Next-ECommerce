# Test Coverage

**Coverage is tracked as mapping and execution separately.** Mapping percentages describe this harness inventory only; they are not code coverage. No Istanbul/NYC/coverage tool or source coverage run was found.

## Harness inventory and execution coverage

| Level | Identified / defined | Mapped or documented | Executed in RUN-20261007-01 | Notes |
|---|---:|---:|---:|---|
| Features | 9 identified | 9 documented (9/9) | 0 feature areas behavior-tested | Each feature has a README and focused docs. |
| Functional requirements | 17 identified | 17 mapped to feature, scenario and case (17/17) | 0/17 behavior requirements executed | 100% is requirements-to-test **mapping**, not verified implementation coverage. |
| Scenarios | 33 defined | 33 linked to case IDs | 5 run-level checks executed; 0 app scenarios | 28 application scenarios remain NOT_EXECUTED; 5 are tooling/harness checks. |
| Test cases | 33 defined | 28 app + 5 tooling/harness | 3 PASS, 2 FAIL, 0 BLOCKED, 28 NOT_RUN | Pass rate among five executed checks: 60%. |
| Automation | 5 automated checks/cases; 3 app cases partially represented by API smoke script | `TC-001`, `TC-002`, `TC-011` are PARTIAL; `TC-029`–`TC-033` are automated checks | App smoke script not run; 5 tooling/harness cases executed | 0 full automated application workflow tests. |
| API | 26 route files; 36 exported HTTP method handlers | 4 read-only API method probes in smoke script | 0 API behavior probes against running app | Script covers latest, categories, product search/all, invalid coupon. Counts are static repo/script counts. |
| UI | 25 App Router `page.tsx` routes | 4 public page response checks in smoke script | 0 browser/visual interactions | HTML status/content-type checks are not visual UI coverage. |
| Database | 6 Mongoose model files | DB scenario cases defined | 0 database tests | No test DB/seed framework. |
| Performance | No target/tool checked in | Scenarios proposed, thresholds not defined | 0 | `UNKNOWN / REQUIRES VALIDATION`. |
| Security/VAPT | 14 open source/tool findings; security cases defined | API abuse/IDOR/auth and audit scenarios documented | 0 runtime VAPT/API security tests | One dependency audit was actually run and returned findings; it is not VAPT. |

## Automation by application area

- **Feature tests:** 28 manually specified cases; 0 executed.
- **Partial script coverage:** TC-001 (home/latest), TC-002 (catalog API response), TC-011 (invalid coupon API response). The smoke script was not run; UI workflows remain manual.
- **Automated checks executed:** TC-029 lint (FAIL), TC-030 build (PASS), TC-031 npm audit (FAIL/findings), TC-032 smoke-runner syntax/guard (PASS), TC-033 relative-link check (PASS).
- **Coverage instrumentation:** none; percentage of source lines/branches is NOT AVAILABLE, not zero.

## Gaps

Prioritize a disposable integration environment and execute checkout, auth/authorization, ownership, stock, review and admin CRUD cases. Add automated unit/API coverage after API contracts are corrected. Set approved performance/accessibility/security targets before publishing compliance percentages.