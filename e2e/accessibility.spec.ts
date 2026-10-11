import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { mockApi } from "./fixtures/mock-api";

// WCAG 2.2 A/AA rule set (axe tags). Results are written to test-results/ for the QA report.
const EVIDENCE = path.join(process.cwd(), "test-results", "qa-evidence", "a11y");

const CART_SEED = JSON.stringify([
  {
    productId: "p-bag",
    name: "Burnt Orange Canvas Tote",
    photos: [{ url: "/images/heads.png", public_id: "heads" }],
    price: 899,
    quantity: 1,
    stock: 4,
  },
]);

const PAGES: { label: string; route: string; seedCart?: boolean }[] = [
  { label: "home", route: "/" },
  { label: "search", route: "/search" },
  { label: "product", route: "/product/p-sweatshirt" },
  { label: "cart-empty", route: "/cart" },
  { label: "cart-with-item", route: "/cart", seedCart: true },
  { label: "about", route: "/about" },
  { label: "policies", route: "/policies" },
  { label: "login", route: "/login" },
  { label: "orders", route: "/orders" },
  { label: "not-found", route: "/does-not-exist" },
];

for (const [name, width, height] of [
  ["desktop", 1440, 900],
  ["mobile", 390, 844],
] as const) {
  test.describe(`axe WCAG 2.2 AA @ ${name}`, () => {
    test.use({ viewport: { width, height } });

    for (const { label, route, seedCart } of PAGES) {
      test(`${label}`, async ({ page }) => {
        test.setTimeout(120_000);
        mkdirSync(EVIDENCE, { recursive: true });
        await mockApi(page, "ok");
        if (seedCart) {
          await page.addInitScript((items) => window.localStorage.setItem("virtuostore-cart-items", items), CART_SEED);
        }
        await page.goto(route, { waitUntil: "load" });
        await page.waitForTimeout(800);

        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();

        const summary = results.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          help: v.help,
          nodes: v.nodes.length,
          targets: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
          summary: v.nodes.slice(0, 2).map((n) => (n.failureSummary || "").replace(/\s+/g, " ").slice(0, 220)),
        }));
        writeFileSync(path.join(EVIDENCE, `${label}__${name}.json`), JSON.stringify(summary, null, 2));
        test.info().annotations.push({ type: "axe", description: JSON.stringify(summary) });

        const blocking = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
        expect(
          blocking.map((v) => `${v.id} (${v.impact}) x${v.nodes.length}`),
          "critical/serious WCAG 2.2 AA violations",
        ).toEqual([]);
      });
    }
  });
}
