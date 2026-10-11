import { mkdirSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { mockApi } from "./fixtures/mock-api";
import { measureOverflow, VIEWPORTS } from "./fixtures/layout";

// Evidence lands in test-results/ (git-ignored) so screenshots never enter the repo history.
const EVIDENCE = path.join(process.cwd(), "test-results", "qa-evidence", "responsive");

const ROUTES: { route: string; label: string }[] = [
  { route: "/", label: "home" },
  { route: "/search", label: "search" },
  { route: "/product/p-sweatshirt", label: "product" },
  { route: "/cart", label: "cart-empty" },
  { route: "/about", label: "about" },
  { route: "/policies", label: "policies" },
  { route: "/login", label: "login" },
  { route: "/orders", label: "orders" },
  { route: "/does-not-exist", label: "not-found" },
];

test.describe.configure({ mode: "parallel" });

for (const vp of VIEWPORTS) {
  for (const { route, label } of ROUTES) {
    test(`no horizontal overflow: ${label} @ ${vp.width}px`, async ({ page }) => {
      test.setTimeout(120_000);
      mkdirSync(EVIDENCE, { recursive: true });
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await mockApi(page, "ok");
      await page.goto(route, { waitUntil: "load" });
      await page.waitForLoadState("load");
      // Let entrance animations and the skeleton -> content swap settle.
      await page.waitForTimeout(1200);

      const report = await measureOverflow(page);
      await page.screenshot({
        path: path.join(EVIDENCE, `${label}__${vp.name}.png`),
        fullPage: true,
      });
      test.info().annotations.push({ type: "overflow", description: JSON.stringify(report) });

      expect(report.documentOverflowPx, `document scrollWidth exceeds viewport: ${JSON.stringify(report.offenders)}`).toBeLessThanOrEqual(0);
      expect(report.offenderCount, `elements exceed viewport: ${JSON.stringify(report.offenders)}`).toBe(0);
    });
  }
}
