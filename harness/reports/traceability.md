# Requirements-to-Tests Traceability

Traceability maps source-derived requirements to feature documentation, scenarios, test cases, automation, the latest run and evidence. Feature-case rows remain `NOT_EXECUTED`; only repository-tool checks have actual outcomes in `RUN-20261007-01`.

| Requirement | Feature | Scenario(s) | Test case(s) | Automated test | Execution result | Evidence |
|---|---|---|---|---|---|---|
| REQ-001 | FEAT-001 | SCN-001 | TC-001 | PARTIAL: public page/latest API smoke script; not run | NOT_EXECUTED | NOT_EXECUTED |
| REQ-002 | FEAT-001 | SCN-002, SCN-004, SCN-028 | TC-002, TC-004, TC-028 | PARTIAL: read-only product search API probe; filters/edge cases not automated; not run | NOT_EXECUTED | NOT_EXECUTED |
| REQ-003 | FEAT-001 | SCN-003 | TC-003 | None; MANUAL | NOT_EXECUTED | NOT_EXECUTED |
| REQ-004 | FEAT-002 | SCN-005, SCN-006 | TC-005, TC-006 | None; MANUAL | NOT_EXECUTED | NOT_EXECUTED |
| REQ-005 | FEAT-002 | SCN-007, SCN-008 | TC-007, TC-008 | None; MANUAL/API security | NOT_EXECUTED | NOT_EXECUTED |
| REQ-006 | FEAT-003 | SCN-009, SCN-010 | TC-009, TC-010 | None; MANUAL | NOT_EXECUTED | NOT_EXECUTED |
| REQ-007 | FEAT-003 | SCN-011 | TC-011 | PARTIAL: invalid-coupon API response probe; cart integration not automated; not run | NOT_EXECUTED | NOT_EXECUTED |
| REQ-008 | FEAT-004 | SCN-012 | TC-012 | None; MANUAL sandbox integration | NOT_EXECUTED | NOT_EXECUTED |
| REQ-009 | FEAT-004 | SCN-013 | TC-013 | None; MANUAL/API | NOT_EXECUTED | NOT_EXECUTED |
| REQ-010 | FEAT-005 | SCN-014 | TC-014; TC-012 end-to-end | None; MANUAL/database integration | NOT_EXECUTED | NOT_EXECUTED |
| REQ-011 | FEAT-005 | SCN-015, SCN-016, SCN-017 | TC-015, TC-016, TC-017 | None; MANUAL/API | NOT_EXECUTED | NOT_EXECUTED |
| REQ-012 | FEAT-006 | SCN-018, SCN-019 | TC-018, TC-019 | None; MANUAL/database | NOT_EXECUTED | NOT_EXECUTED |
| REQ-013 | FEAT-007 | SCN-020 | TC-020 | None; MANUAL/API + Cloudinary sandbox | NOT_EXECUTED | NOT_EXECUTED |
| REQ-014 | FEAT-007 | SCN-021 | TC-021 | None; MANUAL/security | NOT_EXECUTED | NOT_EXECUTED |
| REQ-015 | FEAT-007 | SCN-022 | TC-022 | None; MANUAL/database | NOT_EXECUTED | NOT_EXECUTED |
| REQ-016 | FEAT-008 | SCN-023, SCN-024 | TC-023, TC-024 | None; MANUAL/API/Redis | NOT_EXECUTED | NOT_EXECUTED |
| REQ-017 | FEAT-009 | SCN-025 | TC-025 | PARTIAL: page status/content type checks only; no browser behavior; not run | NOT_EXECUTED | NOT_EXECUTED |

## Cross-cutting scenarios and findings

| Coverage item | Scenario / case | Execution | Evidence |
|---|---|---|---|
| Required API fields/invalid IDs/methods | SCN-026 / TC-026 | NOT_EXECUTED | NOT_EXECUTED |
| Sensitive read/debug/CORS security | SCN-027 / TC-027 | NOT_EXECUTED | NOT_EXECUTED |
| Regex abuse/request-cost boundary | SCN-028 / TC-028 | NOT_EXECUTED | NOT_EXECUTED |
| ESLint quality check | SCN-029 / TC-029 | FAIL, RUN-20261007-01 | `evidence/logs/RUN-20261007-01-lint.log` |
| Production build check | SCN-030 / TC-030 | PASS, RUN-20261007-01 | `evidence/logs/RUN-20261007-01-build.log` |
| Dependency advisory scan | SCN-031 / TC-031 | FAIL/findings, RUN-20261007-01 | `reports/dependency-audit.md`, audit log |
| Harness smoke-script syntax and remote-target guard | SCN-032 / TC-032 | PASS (harness utility check), RUN-20261007-01 | `evidence/logs/RUN-20261007-01-smoke-syntax.log` and `smoke-guard.log` |
| Harness relative Markdown link validation | SCN-033 / TC-033 | PASS (documentation check), RUN-20261007-01 | `evidence/logs/RUN-20261007-01-links.log` |

All current IDs are assigned once in the canonical test cases. Evidence file links are relative to the `harness/` root in actual case/run records.