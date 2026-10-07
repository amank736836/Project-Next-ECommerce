# Regression Scenarios

Run these after catalog, identity, checkout, model, cache, or shared-component changes. Current feature cases are not executed.

| ID | Regression invariant | Related case |
|---|---|---|
| SCN-003 | Product detail data/rating/images and stock-bounded cart controls remain connected. | TC-003 |
| SCN-006 | Firebase auth-state changes still hydrate/clear the app profile and navigation. | TC-006 |
| SCN-009 | Cart item quantities and cart count remain consistent after add/remove. | TC-009 |
| SCN-010 | Cart arithmetic remains consistent at subtotal/shipping/discount boundaries. | TC-010 |
| SCN-011 | Coupon request, response, state and displayed totals remain aligned. | TC-011 |
| SCN-012–SCN-014 | Checkout payment, signature, order fields, stock and persisted payment remain one consistent flow. | TC-012–TC-014 |
| SCN-016–SCN-017 | Cancellation and status transitions remain consistent between order API and UI. | TC-016–TC-017 |
| SCN-018–SCN-019 | Review CRUD and product aggregate counts stay synchronized. | TC-018–TC-019 |
| SCN-020–SCN-022 | Admin CRUD changes are visible after navigation/cache invalidation. | TC-020–TC-022 |
| SCN-023–SCN-024 | Dashboard values refresh after product/user/order changes and Redis is enabled. | TC-023–TC-024 |
| SCN-025 | Shared header routes and responsive behavior remain intact. | TC-025 |

Known route/cache defects are already recorded; a regression case must not be marked PASS until it is executed after a fix.