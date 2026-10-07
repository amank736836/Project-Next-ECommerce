# API Scenarios

Exercise Next Route Handlers without relying on browser-only validation. Use only a disposable database and synthetic identities.

| ID | API focus | Cases |
|---|---|---|
| SCN-001–SCN-004 | Public product latest/categories/all/details: response shape, filters, status, pagination, malformed input. | TC-001–TC-004 |
| SCN-005–SCN-008 | User profile create/read and admin authorization/ID spoofing. | TC-005–TC-008 |
| SCN-011–SCN-014 | Discount, Razorpay create/verify and order-create request contract. | TC-011–TC-014 |
| SCN-015–SCN-017 | Order list/detail/PUT/DELETE/POST status/ownership. | TC-015–TC-017 |
| SCN-018–SCN-022 | Review and admin product/user/coupon route methods and validation. | TC-018–TC-022 |
| SCN-023–SCN-024 | Dashboard responses/auth/cache freshness. | TC-023–TC-024 |
| SCN-026–SCN-028 | Required field/method/ID validation, sensitive reads/debug, regex input. | TC-026–TC-028 |

The current read-only API smoke script covers only public page/catalog and invalid-coupon response shape. It does not cover authenticated APIs or writes. It was not run because no test database/server was supplied.
