# FEAT-005 Known Issues

- [BUG-003](../../bugs/open/BUG-003.md)
- [BUG-008](../../bugs/open/BUG-008.md)
- [BUG-009](../../bugs/open/BUG-009.md)

Other validation gaps: GET order details and `/my` trust IDs without ownership proof (BUG-008). UI/API disagree on cancellation for Shipped orders. POST deletes rather than setting Cancelled. Stock updates are not transactional.

Execution evidence for these items is maintained separately in `test-results/` and `evidence/`.
