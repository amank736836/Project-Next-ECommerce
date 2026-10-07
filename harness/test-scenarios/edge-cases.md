# Edge-Case Scenarios

| ID | Data/boundary to exercise | Expected observation | Case |
|---|---|---|---|
| SCN-004 | Empty search, regex metacharacters, page 0/1/last/last+1/negative, no matches. | Stable pagination and safe query behavior. | TC-004 |
| SCN-010 | Empty cart; subtotal 1, 1000, 1001; discount 0/equal/above subtotal; zero-price item. | Reducer arithmetic follows owner-approved policy; current shipping rule conflict is documented. | TC-010 |
| SCN-013–SCN-014 | Missing signature field; changed one-byte signature; quantity 0/1/stock/stock+1; price/tax zero. | Invalid payment rejected; stock/amount invariants hold. | TC-013–TC-014 |
| SCN-016 | Processing, Shipped, Delivered, Cancelled, deleted order; repeated cancellation. | Only approved state transitions and idempotent outcomes. | TC-016 |
| SCN-018 | Rating 1, 5, invalid 0/6; first review, edit, delete last review. | Schema bounds and aggregate floor/count are correct. | TC-018 |
| SCN-022 | Coupon length 7/8/25/26; prefix+postfix at/over length; duplicate code; huge amount. | UI and server consistently validate; currently server validators are incomplete. | TC-022 |
| SCN-023–SCN-024 | Empty collections, zero last-month baseline, month/year boundary, cache cold/warm after write. | Defined metric shape, no NaN/stale results; validate cache keys. | TC-023–TC-024 |
| SCN-026–SCN-028 | Null/empty/oversized strings, malformed ObjectId, unexpected HTTP method, regex operators. | Controlled validation and bounded work. | TC-026–TC-028 |

Large-dataset and concurrency sizes have no repository-defined target; agree them before execution.
