# Synthetic Role Matrix

| Actor | Fixture identity | Intended verification |
|---|---|---|
| Anonymous | No ID/token | Public read only where documented; no profile/order/admin data. |
| Customer A | `HARNESS_TEST_USER_A` | Read/write own permitted resources only. |
| Customer B | `HARNESS_TEST_USER_B` | Must not access A’s order/review/profile by substituting IDs. |
| Admin | `HARNESS_TEST_ADMIN` | Admin features only after server-verified identity; a query ID alone is not proof. |

IDs above are placeholders, not Firebase UIDs or credentials. Provision accounts only in a test Firebase project and test database.
