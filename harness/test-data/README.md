# Test Data

All examples here are synthetic and intended as shape/reference data, not production seeds. They contain no passwords, tokens, API keys, actual customer details, or live provider IDs. Never load fixtures into production.

- `fixtures/`: fixture notes and schema-related sample shapes.
- `valid/`: syntactically plausible example product/user/coupon documents.
- `invalid/`: deliberately incomplete input for negative API validation.
- `edge-cases/`: numeric/status boundary inputs.
- `sample-data/`: usage guidance for composing isolated integration datasets.
- `large-data/`: no bulk fixture; safe test-volume guidance only.
- `authorization/`: role/ownership test matrix using fake identities.
- `performance/`: workload planning only; volume/latency thresholds are not approved.

For any real sandbox credential, use environment variables such as `${TEST_USER_EMAIL}` and `${MONGO_URI}`. Do not put resolved values in this folder or evidence.
