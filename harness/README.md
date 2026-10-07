# Project Harness

This folder is the project’s source-grounded test and maintenance guide. It records what the code currently implements, the intended behavior visible in the UI/API contracts, testable acceptance criteria, known mismatches, how to reproduce checks, and what has actually been executed. It does **not** imply that an unexecuted scenario passed.

## Quick start

From the repository root:

```bash
npm ci
npm run lint
npm run build
```

Current baseline (execution `RUN-20261007-01`): `npm run build` passed; `npm run lint` failed with existing lint errors. See [Testing status](TESTING_STATUS.md) and the [execution record](test-results/latest/RUN-20261007-01.md). There is no `npm test` script and no unit, integration, or browser-test framework configured.

To run the read-only API smoke script, first start the app against a **disposable test database** with the required environment variables, then in another shell run:

```bash
npm run dev -- --hostname 0.0.0.0
HARNESS_BASE_URL=http://127.0.0.1:5173 node harness/automation/api/public-smoke.mjs
```

The script checks public pages and read-only catalog endpoints, plus the invalid-coupon response. It refuses non-local targets unless `HARNESS_ALLOW_REMOTE=1` is explicitly set. Do not point it or any tests at production. The API checks need a reachable MongoDB test database; `REDIS_URI` is optional in the application code. See [test setup](test-tools/setup.md).

## How the harness is organized

| Area | Purpose |
|---|---|
| [Project overview](PROJECT_OVERVIEW.md), [architecture](ARCHITECTURE.md) | What this repository contains and how its parts connect. |
| [Requirements](requirements/README.md), [features](features/README.md) | Source-derived requirements and feature-level behavior/known gaps. |
| [Testing strategy](TESTING_STRATEGY.md), [testing status](TESTING_STATUS.md) | How to test safely, existing tools, and the current verified baseline. |
| [Test scenarios](test-scenarios/README.md), [test cases](test-cases/README.md) | Scenario inventory and reproducible manual/automated cases. |
| [Test tools](test-tools/README.md), [automation](automation/README.md) | Installed project tools and harness scripts. |
| [Test data](test-data/README.md) | Synthetic, non-secret fixture definitions. |
| [Test results](test-results/README.md), [evidence](evidence/README.md) | Execution records and genuine logs/evidence. |
| [Bugs](bugs/README.md), [reports](reports/README.md) | Static-review findings, traceability, coverage, and release posture. |
| [AI testing guidance](ai/README.md) | Instructions for another agent using this harness. |

## IDs and result conventions

Use stable IDs: `REQ-xxx`, `FEAT-xxx`, `SCN-xxx`, `TC-xxx`, `BUG-xxx`, and `RUN-YYYYMMDD-NN`. Link requirements → feature → scenario → case → automation → run → evidence in [traceability](reports/traceability.md).

- `NOT_EXECUTED` means no execution evidence exists.
- Case status `NOT_RUN` is used for an unexecuted case; `PASS`, `FAIL`, and `BLOCKED` are reserved for actual executions/known blockers.
- A static code observation is not a runtime test. Static findings cite source paths and are explicitly labelled as such.
- Never store credentials or real customer data. Use an isolated test environment and placeholders such as `${MONGO_URI}`.

## Common maintenance tasks

- **Add a feature:** assign the next `FEAT-xxx` / `REQ-xxx` IDs, document it in `features/`, add requirement-to-test links, and update coverage/traceability.
- **Add a test:** assign a `SCN-xxx` and `TC-xxx`, use the [case template](test-cases/README.md), specify concrete setup/data/expected result, then record `NOT_EXECUTED` until it runs.
- **Record a bug:** assign the next `BUG-xxx`, use the [bug template](bugs/README.md), cite static/runtime evidence, and add or link a regression test where appropriate.
- **Record a run:** copy the [execution template](test-results/README.md) into `test-results/latest/`, preserve real logs/screenshots where practical, and update the summary, traceability, coverage, and release-readiness report.
- **Add evidence:** place only genuine outputs in `evidence/` and link them from the case and run.

## Safety notes

The repository contains database troubleshooting scripts that can change a hard-coded user’s role to `admin`, and a debug API route that clears a cache key and returns a user record. They were not run during harness creation. Do not run them against production; see [BUG-006](bugs/open/BUG-006.md) and [test setup](test-tools/setup.md).

The harness documents the repository as inspected on 2026-10-07 at commit `d445d93`. Update the audit as application code/configuration changes.