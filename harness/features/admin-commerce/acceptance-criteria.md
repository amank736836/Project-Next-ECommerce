# FEAT-007 Acceptance Criteria

Criteria below are test oracles inferred from visible code/UI contracts; any product-policy ambiguity must be confirmed before release.

- [ ] Unauthenticated/non-admin callers cannot perform CRUD, independent of client UI.
- [ ] Valid admin product create/edit/delete persists expected fields and media.
- [ ] Customer role change/delete is reflected after refresh and cannot self-escalate via request payload.
- [ ] Coupon uniqueness and amount/size/character rules behave consistently in UI and API.

**Execution status:** NOT_EXECUTED. See linked test cases and `TESTING_STATUS.md`.
