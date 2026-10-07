# FEAT-007 Behavior

Admin layout gates screens on Redux user role. Admin forms submit multipart product data or coupon/user JSON. Handlers load a provided admin ID, mutate Mongo records and call cache invalidation. Product route uploads/deletes Cloudinary assets.

## Source pointers

`src/app/admin/products`, `product/*`, `customers`, `coupons`, `coupon/*`; tables under `src/components/admin/Tables`.

This description is static source analysis. Runtime behavior is not asserted unless a run record says otherwise.
