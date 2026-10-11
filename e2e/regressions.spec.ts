import { expect, test, type Page } from "@playwright/test";
import { mockApi } from "./fixtures/mock-api";
import { measureOverflow } from "./fixtures/layout";

// One test per confirmed defect from the QA audit (see docs/QA_REPORT.md).

const cartLink = (page: Page) =>
  page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: /^Cart/ });

test.describe("QA-001 cart survives a page reload", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test("items added from a product card are still in the cart after reload", async ({ page }) => {
    await mockApi(page, "ok");
    await page.goto("/search", { waitUntil: "load" });
    await page.getByRole("button", { name: "Add Burnt Orange Canvas Tote to cart" }).click();
    await expect(cartLink(page)).toContainText("1");

    await page.reload({ waitUntil: "load" });
    await expect(cartLink(page)).toContainText("1");
    await page.goto("/cart", { waitUntil: "load" });
    await expect(page.locator(".cartItem")).toHaveCount(1);
    await expect(page.locator(".cart aside")).toContainText("Subtotal: ₹899");
  });

  test("a corrupt stored cart is ignored instead of breaking the app", async ({ page }) => {
    await mockApi(page, "ok");
    await page.addInitScript(() => window.localStorage.setItem("virtuostore-cart-items", "{not json"));
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/cart", { waitUntil: "load" });
    await expect(page.getByRole("heading", { name: "No Items Added" })).toBeVisible();
    expect(errors).toEqual([]);
  });
});

test.describe("QA-002 product page add-to-cart merges quantities", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test("adding the same product again increases its quantity rather than resetting it", async ({ page }) => {
    await mockApi(page, "ok");
    await page.goto("/product/p-bag", { waitUntil: "load" });
    await page.getByRole("button", { name: "Add to Cart" }).click();
    await page.getByRole("button", { name: "Increase quantity" }).click();
    await page.getByRole("button", { name: "Add to Cart" }).click(); // now 1 + 2 = 3 requested in total
    await page.goto("/cart", { waitUntil: "load" });
    await expect(page.locator(".cartItem p").first()).toHaveText("3");
  });

  test("product page never lets the cart exceed available stock", async ({ page }) => {
    await mockApi(page, "ok");
    await page.goto("/product/p-bag", { waitUntil: "load" }); // stock 4
    for (let i = 0; i < 3; i++) await page.getByRole("button", { name: "Increase quantity" }).click();
    await page.getByRole("button", { name: "Add to Cart" }).click();
    await page.getByRole("button", { name: "Add to Cart" }).click();
    await page.goto("/cart", { waitUntil: "load" });
    await expect(page.locator(".cartItem p").first()).toHaveText("4");
  });
});

test.describe("QA-003 search does not hide products above ₹1,00,000 by default", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test("the expensive product is visible on first load", async ({ page }) => {
    await mockApi(page, "ok");
    await page.goto("/search", { waitUntil: "load" });
    await expect(page.locator(".searchProductList .productCard")).toHaveCount(6);
    await expect(page.getByRole("link", { name: /Extraordinarily Long Product Name/ }).first()).toBeVisible();
  });
});

test.describe("QA-004 cart summary and checkout stay usable on phones", () => {
  for (const width of [320, 375, 390]) {
    test(`empty cart has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 700 });
      await mockApi(page, "ok");
      await page.goto("/cart", { waitUntil: "load" });
      const report = await measureOverflow(page);
      expect(report.documentOverflowPx, JSON.stringify(report.offenders)).toBeLessThanOrEqual(0);
      expect(report.offenderCount, JSON.stringify(report.offenders)).toBe(0);
    });
  }

  test("cart with items keeps the checkout link fully inside a 375px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 700 });
    await mockApi(page, "ok");
    await page.goto("/search", { waitUntil: "load" });
    await page.getByRole("button", { name: "Add Oatmeal Crew-Neck Sweatshirt to cart" }).click();
    await page.goto("/cart", { waitUntil: "load" });
    await expect(page.locator(".cartItem")).toHaveCount(1);
    const checkout = page.getByRole("link", { name: "Login to Checkout" });
    const box = await checkout.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(375);
    expect(box!.width).toBeGreaterThan(120);
    const report = await measureOverflow(page);
    expect(report.documentOverflowPx, JSON.stringify(report.offenders)).toBeLessThanOrEqual(0);
  });
});

test.describe("QA-005 product page actions fit on phones", () => {
  for (const width of [320, 375, 390]) {
    test(`add/buy controls stay inside the ${width}px viewport`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await mockApi(page, "ok");
      await page.goto("/product/p-sweatshirt", { waitUntil: "load" });
      await expect(page.getByRole("button", { name: "Buy Now" })).toBeVisible();
      const report = await measureOverflow(page);
      expect(report.documentOverflowPx, JSON.stringify(report.offenders)).toBeLessThanOrEqual(0);
      expect(report.offenderCount, JSON.stringify(report.offenders)).toBe(0);
    });
  }
});

test.describe("QA-006 About page grid does not overflow at 320px", () => {
  test("feature list fits the narrowest phone", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await mockApi(page, "ok");
    await page.goto("/about", { waitUntil: "load" });
    const report = await measureOverflow(page);
    expect(report.documentOverflowPx, JSON.stringify(report.offenders)).toBeLessThanOrEqual(0);
    expect(report.offenderCount, JSON.stringify(report.offenders)).toBe(0);
  });
});

test.describe("QA-007 cart item controls are named for assistive technology", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test("quantity and remove buttons in the cart have accessible names", async ({ page }) => {
    await mockApi(page, "ok");
    await page.goto("/search", { waitUntil: "load" });
    await page.getByRole("button", { name: "Add Burnt Orange Canvas Tote to cart" }).click();
    await page.goto("/cart", { waitUntil: "load" });
    const item = page.locator(".cartItem").first();
    await expect(item.getByRole("button", { name: "Decrease quantity" })).toBeVisible();
    await expect(item.getByRole("button", { name: "Increase quantity" })).toBeVisible();
    await expect(item.getByRole("button", { name: "Remove Burnt Orange Canvas Tote from cart" })).toBeVisible();
  });
});

// QA-008: /shipping redirected based on user state before auth had resolved.
// Guest paths are testable in the default config (no Firebase). The signed-in
// path needs a configured Firebase user and is covered by the auth probe in QA notes.
test.describe("QA-008 shipping page redirect guards", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  const item = {
    productId: "p-bag",
    name: "Burnt Orange Canvas Tote",
    photos: [{ url: "/images/heads.png", public_id: "h" }],
    price: 899,
    quantity: 1,
    stock: 4,
  };

  test("guest with items in the cart is sent to /login and stays there", async ({ page }) => {
    await mockApi(page, "ok");
    await page.addInitScript((cart) => window.localStorage.setItem("virtuostore-cart-items", JSON.stringify(cart)), [item]);
    await page.goto("/shipping", { waitUntil: "load" });
    await expect(page).toHaveURL(/\/login$/, { timeout: 15_000 });
    await page.waitForTimeout(1500);
    await expect(page).toHaveURL(/\/login$/);
  });

  test("empty cart is sent to /cart", async ({ page }) => {
    await mockApi(page, "ok");
    await page.goto("/shipping", { waitUntil: "load" });
    await expect(page).toHaveURL(/\/cart$/, { timeout: 15_000 });
  });
});

// Verified, not a defect: the product-card add button caps at stock. Kept as a
// guard so a future change cannot silently allow over-selling from search.
test.describe("product card add-to-cart respects stock", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test("clicking add beyond stock stops at the stock level and shows a message", async ({ page }) => {
    await mockApi(page, "ok");
    await page.goto("/search", { waitUntil: "load" });
    const add = page.getByRole("button", { name: "Add Burnt Orange Canvas Tote to cart" });
    for (let i = 0; i < 4; i++) await add.click();
    await expect(cartLink(page)).toContainText("4");
    await add.click();
    await expect(page.getByText("reached the available stock")).toBeVisible();
    await expect(cartLink(page)).toContainText("4");
  });
});

// QA-009: double-clicking the "-" quantity button removed the whole line item
// (hidden onDoubleClick remove). Accidental deletion with no confirmation or
// keyboard equivalent; the explicit Remove button is the supported path.
test.describe("QA-009 cart quantity controls never remove an item by accident", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test("double-clicking decrease keeps the item in the cart", async ({ page }) => {
    await mockApi(page, "ok");
    await page.addInitScript(() =>
      window.localStorage.setItem(
        "virtuostore-cart-items",
        JSON.stringify([
          {
            productId: "p-bag",
            name: "Burnt Orange Canvas Tote",
            photos: [{ url: "/images/heads.png", public_id: "h" }],
            price: 899,
            quantity: 3,
            stock: 4,
          },
        ]),
      ),
    );
    await page.goto("/cart", { waitUntil: "load" });
    const item = page.locator(".cartItem");
    await expect(item).toHaveCount(1);
    await item.getByRole("button", { name: "Decrease quantity" }).dblclick();
    await expect(item).toHaveCount(1);
    await expect(item.locator("p")).toHaveText("1");
    await page.getByRole("button", { name: /^Remove .* from cart$/ }).click();
    await expect(page.locator(".cartItem")).toHaveCount(0);
  });
});

// QA-010: policy copy used markdown ** markers that rendered as literal asterisks.
test.describe("QA-010 policy pages render emphasis, not markdown", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test("no literal ** markers appear on any policy tab", async ({ page }) => {
    await mockApi(page, "ok");
    await page.goto("/policies", { waitUntil: "load" });
    const tabs = page.locator(".policy-tabs button");
    const count = await tabs.count();
    expect(count).toBeGreaterThan(1);
    for (let i = 0; i < count; i++) {
      await tabs.nth(i).click();
      const text = await page.locator(".policy-content").innerText();
      expect(text).not.toContain("**");
    }
  });
});
