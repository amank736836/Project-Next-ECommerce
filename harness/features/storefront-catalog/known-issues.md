# FEAT-001 Known Issues

No feature-specific static finding is recorded at this time. This is not proof of defect-free behavior.

Other validation gaps: SCN-004/TC-004 cover malformed search and pagination input. `GET /api/product/all` does not return the min/max/category fields declared by its client type; category is fetched separately and min/max fall back in UI. Search regex escaping and cache invalidation require validation.

Execution evidence for these items is maintained separately in `test-results/` and `evidence/`.
