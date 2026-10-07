# FEAT-008 Behavior

Dashboard endpoints query current/previous month and 6/12-month documents, count categories/status/users, construct chart payloads and cache JSON. Frontend maps payload to widgets, tables and Chart.js charts.

## Source pointers

Admin dashboard and chart pages; `src/components/admin/Charts/*`, `DashboardItems/*`, `Tables/DashboardTable.tsx`.

This description is static source analysis. Runtime behavior is not asserted unless a run record says otherwise.
