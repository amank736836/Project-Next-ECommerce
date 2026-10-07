# Performance Scenarios

No performance targets or load-test tools are specified in the repository. Do not invent p95/throughput/SLO figures. Agree limits and a safe staging dataset first.

| ID | Proposed measurement | Case / caution |
|---|---|---|
| SCN-004 | Catalog query/page latency with realistic search terms, deep pages and no-match searches; inspect Mongo query cost. | TC-004; public read endpoint. |
| SCN-023 | Dashboard stats/chart cold vs warm cache with increasing order/user/product counts; record query and response time. | TC-023; no baseline/threshold. |
| SCN-024 | Redis hit/miss and mutation invalidation; observe stale-read interval. | TC-024; no TTL is set in helper. |
| SCN-028 | Rate/size bound for regex-like search inputs; concurrency only after authorization and dataset are safe. | TC-028; avoid denial-of-service testing on shared/production hosts. |
| — | Checkout latency, Cloudinary upload, concurrent stock contention, memory and API throughput. | Not represented by an executable case yet; UNKNOWN / REQUIRES VALIDATION. |

Tools such as k6/JMeter/Artillery are not present and were not added. Use an organization-approved load tool only after an owner-approved test plan exists.
