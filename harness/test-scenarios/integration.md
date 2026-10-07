# Integration Scenarios

| ID | Boundary | Expected behavior | Case |
|---|---|---|---|
| SCN-005–SCN-006 | Firebase Auth → profile API → Redux/header. | Auth identity maps to the correct persisted profile and role. | TC-005–TC-006 |
| SCN-011 | Cart UI → coupon discount endpoint → reducer. | URL/method/response match and totals refresh; current contract mismatch is open. | TC-011 |
| SCN-012–SCN-014 | Browser → Razorpay → verify route → order/stock/payment records. | Trusted amount/signature, single consistent order, no partial side effects. | TC-012–TC-014 |
| SCN-015–SCN-017 | Order UI → API → Mongo/Redis. | Ownership and lifecycle changes persist and propagate to lists/admin views. | TC-015–TC-017 |
| SCN-018–SCN-019 | Review UI → review API → Review/Product aggregation. | Supported route, write permission, review document and aggregate stay consistent. | TC-018–TC-019 |
| SCN-020 | Admin product UI → multipart API → Cloudinary/Mongo/cache. | Upload/update/delete leaves DB/media/cache consistent. | TC-020 |
| SCN-021–SCN-022 | Admin customer/coupon UI → API → Mongo/cache. | Role/code changes persist and unauthorized requests fail. | TC-021–TC-022 |
| SCN-023–SCN-024 | Dashboard UI → analytics APIs → Mongo/Redis. | Calculations and invalidation are correct. | TC-023–TC-024 |

No external test integrations were configured in RUN-20261007-01; these scenarios were not executed.
