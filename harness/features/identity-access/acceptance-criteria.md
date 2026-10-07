# FEAT-002 Acceptance Criteria

Criteria below are test oracles inferred from visible code/UI contracts; any product-policy ambiguity must be confirmed before release.

- [ ] A new user with required profile fields receives a profile and expected role in a disposable test DB.
- [ ] A returning user hydrates after reload without repeating onboarding.
- [ ] The server proves the caller identity and denies admin operations to non-admins and spoofed IDs.
- [ ] Missing Firebase config is surfaced without exposing secret values.

**Execution status:** NOT_EXECUTED. See linked test cases and `TESTING_STATUS.md`.
