# Dependency Audit — 2026-10-07

**Command:** `npm audit --json`  
**Lockfile baseline:** `package-lock.json` at commit `d445d93`  
**Result:** npm audit returned findings (29 total). Audit is time-sensitive; rerun before release. Raw command summary is preserved under `evidence/logs/`.

## Severity counts

| Severity | Count |
|---|---:|
| Critical | 3 |
| High | 19 |
| Moderate | 6 |
| Low | 1 |
| **Total** | **29** |

## Critical advisories reported

- `next` (direct dependency; declared `16.1.7`): audit range `9.3.4-canary.0 - 16.3.2`; npm reported a compatible fix at `16.4.0` at audit time.
- `protobufjs` (transitive): reported range `<=7.6.4`.
- `websocket-driver` (transitive): reported range `<=0.7.4`.

## Direct packages flagged

| Package | Severity | Audit note |
|---|---|---|
| `next` | Critical | Current declaration is 16.1.7; audit reported a fix at 16.4.0. |
| `axios` | High | Direct dependency; audit reported an available fix. |
| `mongoose` | Moderate | Direct dependency; audit reported an available fix. |
| `eslint-config-next` | High | Development dependency; npm's suggested fix in this output was version 14.2.35 and marked semver-major. Do not blindly downgrade; inspect the full advisory and compatible supported version. |

The full output also flags transitive packages including `@grpc/grpc-js`, `@next/eslint-plugin-next`, `@protobufjs/utf8`, `ajv`, `baseline-browser-mapping`, `brace-expansion`, `braces`, `browserslist`, `fast-glob`, `flatted`, `follow-redirects`, `form-data`, `immutable`, `js-yaml`, `lodash`, `micromatch`, `nanoid`, `picomatch`, `postcss`, `sharp`, and `source-map-js`.

## Interpretation and next action

- Findings may include dev-only and transitive packages; audit output is not evidence that an exploit was executed or that every finding is reachable in production.
- Inspect `npm explain <package>` and advisory metadata, distinguish production dependency tree (`npm audit --omit=dev`) from all dependencies, assess Next advisories against deployed usage, then update dependencies in a separate reviewed application maintenance change.
- No package manifest/lockfile change was made for this harness request.
- The repository has no owner-approved vulnerability acceptance policy. TC-031 fails the harness review threshold (no critical/high findings), but a release risk owner must approve any exception.

**Evidence:** `evidence/logs/RUN-20261007-01-audit.log`  
**Status:** Findings present; remediation not performed.