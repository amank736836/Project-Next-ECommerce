# Database Scenarios

Use a disposable Mongo database; seed synthetic data and clean it after each run. No live/production DB is permitted.

| ID | Data-layer check | Source / case |
|---|---|---|
| SCN-005 | User required fields, email uniqueness/validator, gender/role enum, first-user role bootstrap. | User model and `POST /api/user/new`; TC-005 |
| SCN-010 | Cart arithmetic is a client reducer; compare its output with expected synthetic inputs. Server-side order totals are not recomputed. | cartReducer; TC-010 / TC-014 |
| SCN-014–SCN-017 | Order schema required fields/status enum; stock mutation consistency; ownership and transition persistence. | Order/Product models and order routes; TC-014–TC-017 |
| SCN-018–SCN-019 | Review rating min/max and Product rating sum/count/average on create/update/delete. | Review/Product models/routes; TC-018–TC-019 |
| SCN-020–SCN-022 | Product fields, Coupon unique code/size bounds, admin mutations, Cloudinary references. | Models and handlers; TC-020–TC-022 |
| SCN-023–SCN-024 | Dashboard aggregate calculations and Redis cache invalidation after writes. | Dashboard routes/backend-features; TC-023–TC-024 |

No schema migration or seed runner exists. Database scenarios are NOT_EXECUTED; no test DB credentials were present.
