# FEAT-004 Acceptance Criteria

Criteria below are test oracles inferred from visible code/UI contracts; any product-policy ambiguity must be confirmed before release.

- [ ] Invalid/missing address cannot start checkout.
- [ ] Server-generated amount is derived from trusted product/pricing data, not client totals.
- [ ] Bad signature is rejected and cannot create a successful order/payment.
- [ ] A valid sandbox payment produces exactly one consistent order/payment and stock update.
- [ ] Any failed step leaves no charged-but-untracked/partially decremented state.

**Execution status:** NOT_EXECUTED. See linked test cases and `TESTING_STATUS.md`.
