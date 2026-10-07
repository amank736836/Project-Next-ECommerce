# Reusable AI Test Prompts

Prompts must be scoped to a feature, environment and evidence. Replace bracketed fields with approved details; never add credentials to a prompt.

## Source-grounded feature review

> Analyze `[FEAT-xxx]` using its feature docs and the current source. List only observed behavior, route/model dependencies, request/response contracts, validation, authorization and side effects. Cite file paths. Mark unknowns `UNKNOWN / REQUIRES VALIDATION`. Do not change application code. Recommend scenarios and regression links.

## New test case generation

> Using requirement `[REQ-xxx]`, scenario `[SCN-xxx]`, and the feature's source, propose concrete happy-path, negative and boundary cases. Use the standard fields and unique `TC-xxx` IDs. Inputs must be synthetic and secret-free. State preconditions, deterministic expected result, test type, automation feasibility, risks, and `NOT_EXECUTED` status. Do not claim runtime results.

## Safe execution plan

> For cases `[TC-xxx]`, identify prerequisites and side effects. Provide commands/steps, expected evidence and cleanup. Confirm target is a disposable local/QA environment. Do not call production endpoints or mutate shared DB/payment/Cloudinary data. If a prerequisite is absent, stop and report it without attempting another target.

## Bug triage

> Assess finding `[BUG-xxx]` against code and recorded evidence. Separate static observation from runtime reproduction; classify impact and priority with rationale; locate root cause only if supported; propose a regression case. Do not edit source or mark fixed/verified.

## Execution report

> Summarize `RUN-[id]` from the raw command output and recorded case results. Reconcile totals; distinguish PASS/FAIL/BLOCKED/NOT_RUN; link evidence. Do not infer passing behavior from build success or documentation. List critical blockers and gaps.

## Traceability/coverage audit

> Verify that every REQ maps to FEAT, SCN, TC, automation, RUN and evidence. Count IDs from the actual harness files. Report mapping coverage separately from execution coverage and code coverage. Do not invent percentages or test results.