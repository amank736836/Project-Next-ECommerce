#!/usr/bin/env node

const defaultBaseUrl = "http://127.0.0.1:5173";
const baseUrl = new URL(process.env.HARNESS_BASE_URL || defaultBaseUrl);
const allowRemote = process.env.HARNESS_ALLOW_REMOTE === "1";
const localHosts = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);
const hostname = baseUrl.hostname.toLowerCase();
const isLocal = localHosts.has(hostname) || hostname.endsWith(".localhost");

if (!['http:', 'https:'].includes(baseUrl.protocol)) {
  console.error("HARNESS_BASE_URL must use http or https.");
  process.exit(2);
}

if (baseUrl.username || baseUrl.password) {
  console.error("Do not include credentials in HARNESS_BASE_URL.");
  process.exit(2);
}

if (!isLocal && !allowRemote) {
  console.error("Refusing non-local target. Set HARNESS_ALLOW_REMOTE=1 only for an authorized QA environment.");
  process.exit(2);
}

const invalidCoupon = `__HARNESS_INVALID_${Date.now()}_${Math.random().toString(36).slice(2)}__`;
const checks = [
  { name: "home page", path: "/", kind: "html" },
  { name: "search page", path: "/search", kind: "html" },
  { name: "about page", path: "/about", kind: "html" },
  { name: "policies page", path: "/policies", kind: "html" },
  { name: "latest products API", path: "/api/product/latest", kind: "json", validate: (body) => body?.success === true && Array.isArray(body.products) && body.products.length <= 5 },
  { name: "product categories API", path: "/api/product/categories", kind: "json", validate: (body) => body?.success === true && Array.isArray(body.categories) },
  { name: "product search API", path: "/api/product/all?search=__harness_smoke_no_match__&page=1&sort=asc", kind: "json", validate: (body) => body?.success === true && Array.isArray(body.products) && Number.isFinite(body.totalPage) },
  { name: "invalid coupon API response", path: `/api/payment/discount?coupon=${encodeURIComponent(invalidCoupon)}`, kind: "json-error", status: 400, validate: (body) => body?.success === false && typeof body.message === "string" },
];

let passed = 0;
let failed = 0;

for (const check of checks) {
  const url = new URL(check.path, baseUrl);
  try {
    const response = await fetch(url, { method: "GET", signal: AbortSignal.timeout(10_000) });
    const expectedStatus = check.status ?? 200;
    let valid = response.status === expectedStatus;

    if (check.kind === "html") {
      valid &&= (response.headers.get("content-type") || "").includes("text/html");
      await response.body?.cancel();
    } else {
      const body = await response.json().catch(() => null);
      valid &&= typeof check.validate === "function" && check.validate(body);
    }

    if (valid) {
      passed += 1;
      console.log(`PASS ${check.name} (${response.status})`);
    } else {
      failed += 1;
      console.error(`FAIL ${check.name}: expected HTTP ${expectedStatus} and ${check.kind} contract; got HTTP ${response.status}`);
    }
  } catch (error) {
    failed += 1;
    console.error(`FAIL ${check.name}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

console.log(`\nSmoke summary: ${passed} passed, ${failed} failed, ${checks.length} total. Target: ${baseUrl.origin}`);
if (failed > 0) process.exitCode = 1;
