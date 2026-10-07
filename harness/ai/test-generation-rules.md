# AI Test Generation Rules

1. **Source first:** derive assertions from tracked UI/API/model/config/docs. If intent is unclear, write `UNKNOWN / REQUIRES VALIDATION` and request owner confirmation; do not invent a feature.
2. **Stable IDs:** allocate the next available `REQ-xxx`, `FEAT-xxx`, `SCN-xxx`, `TC-xxx`, `BUG-xxx`, `RUN-YYYYMMDD-NN`. Search the harness before assigning an ID.
3. **Concrete test design:** specify an actor, isolated preconditions, exact steps, synthetic data, measurable expected response/state, cleanup, type, priority, automation and evidence path. Avoid vague “check that it works.”
4. **No fake execution:** case definition is not execution. Use `Actual Result: NOT_EXECUTED`, `Status: NOT_RUN`, `Evidence: NOT_EXECUTED` until run evidence exists. Build success is not a functional pass.
5. **Accurate status:** `PASS` and `FAIL` require a test attempt and oracle; `BLOCKED` requires an actual attempt prevented by a prerequisite; unattempted cases remain `NOT_RUN` and `NOT_EXECUTED`.
6. **No secrets/PII:** use reserved `.invalid` emails, fake IDs, placeholders such as `${MONGO_URI}`, and sandbox provider credentials held outside Git. Never log tokens, payment signatures, addresses, real user documents, or environment dumps.
7. **Protect side effects:** use test DB/provider accounts; tests that write/delete users/products/orders, change roles, decrement inventory, upload/delete media, or charge/payment-create must be explicitly authorized and safely isolated.
8. **Security scope:** test authorization at server boundaries; do not exploit production, perform denial-of-service, brute force, enumerate real IDs, or make unauthorised changes. Record a potential vulnerability separately from a proven exploit.
9. **Regression discipline:** every confirmed bug should have a regression case where practical. Link the case from the bug, requirement and execution report. Keep the test failing until the actual fix is verified.
10. **Maintainable automation:** reuse npm/Next/Node tooling already present. Avoid introducing a framework for a one-off check. Keep scripts deterministic, read-only by default, guarded against remote targets and documented.
11. **Preserve provenance:** cite source file paths and exact run/log paths. Do not modify product code under a harness-only task. Review diffs for generated files and unrelated changes.
12. **Coverage honesty:** count what exists from files and run records. Distinguish requirements mapped, test cases defined, test cases executed, endpoint/UI paths covered, and instrumented code coverage. If a measurement is unavailable, state NOT AVAILABLE.
