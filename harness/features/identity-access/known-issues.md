# FEAT-002 Known Issues

- [BUG-006](../../bugs/open/BUG-006.md)
- [BUG-007](../../bugs/open/BUG-007.md)
- [BUG-008](../../bugs/open/BUG-008.md)

Other validation gaps: The first registered user becomes admin; submitted identity fields are accepted without server-side Firebase token verification. `GET /api/user/[id]` has no caller ownership check and returns the user record. Privileged APIs trust query-string IDs. These are security review findings.

Execution evidence for these items is maintained separately in `test-results/` and `evidence/`.
