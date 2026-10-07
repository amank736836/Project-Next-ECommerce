# Negative Scenarios

| ID | Negative condition | Expected secure/defined outcome | Case |
|---|---|---|---|
| SCN-004 | Malformed regex characters, invalid/negative/out-of-range page, unknown category. | Validation/controlled response; no unhandled 500 or excessive unbounded query. | TC-004 |
| SCN-007–SCN-008 | Missing/non-admin ID and attacker-supplied known admin ID. | Deny safely; server must bind role to verified caller identity. Current identity binding is not present in source. | TC-007–TC-008 |
| SCN-011 | Missing/unknown coupon and cart's current wrong URL/method. | Invalid code gives deterministic client feedback; route contract mismatch must be corrected before pass. | TC-011 |
| SCN-012–SCN-014 | Missing shipping/amount, declined/closed payment, bad signature, altered totals, product deleted/stock depleted. | Do not create a successful/partial paid order or decrement stock incorrectly. | TC-012–TC-014 |
| SCN-016 | Cancel shipped/delivered/non-owned order; repeat cancel. | Reject unauthorized/state-ineligible action; no unexpected deletion. | TC-016 |
| SCN-019 | Delete another user's review or submit invalid rating. | Deny/validate; aggregate remains unchanged. | TC-019 |
| SCN-020–SCN-022 | Non-admin CRUD, missing product fields/photo, duplicate coupon code, zero/negative amount. | Reject without orphan media or partial record. | TC-020–TC-022 |
| SCN-026–SCN-028 | Invalid Mongo IDs/body fields/methods, public sensitive reads/debug path, regex abuse. | Controlled error, no data disclosure/unauthorized effect, resource-safe request handling. | TC-026–TC-028 |

All application cases: NOT_EXECUTED.
