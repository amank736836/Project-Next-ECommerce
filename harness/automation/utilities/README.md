# Automation Utilities

The dependency-free `check-markdown-links.py` utility validates relative file links in harness Markdown; run it with `python3 harness/automation/utilities/check-markdown-links.py`. A read-only API smoke runner is under `../api/`. No app fixture factory, mock server, coverage tool, report merger or test-data seeder exists. Avoid retaining production records or secrets in this folder. If a future utility writes to MongoDB, require an explicit test-database guard and cleanup path.
