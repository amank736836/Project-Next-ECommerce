import { expect, test, type Page } from "@playwright/test";
import { mockApi } from "./fixtures/mock-api";

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

async function open(page: Page, route: string, mode: "ok" | "down" | "empty" = "ok") {
  await mockApi(page, mode);
  await page.goto(route, { waitUntil: "load" });
}

// The header shows a live cart count as an element inside the cart link.
const cartLink = (page: Page) => page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: /^Cart/ });

test.describe("navigation and routing", () => {
  test.use({ viewport: DESKTOP });

  test("primary navigation routes to each section", async ({ page }) => {
    await open(page, "/");
    const nav = page.getByRole("navigation", { name: "Primary navigation" });

    await nav.getByRole("link", { name: /^Search/ }).click();
    await expect(page).toHaveURL(/\/search$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Find your next");

    await nav.getByRole("link", { name: /^About/ }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("About VirtuoStore");

    await nav.getByRole("link", { name: /^Policies/ }).click();
    await expect(page).toHaveURL(/\/policies$/);

    await nav.getByRole("link", { name: /^Login/ }).click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("browser back and forward restore previous pages", async ({ page }) => {
    await open(page, "/");
    await page.goto("/search");
    await page.goto("/about");
    await page.goBack();
    await expect(page).toHaveURL(/\/search$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await page.goForward();
    await expect(page).toHaveURL(/\/search$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Find your next");
  });

  test("unknown route renders the styled not-found page with a way home", async ({ page }) => {
    await open(page, "/this-page-does-not-exist");
    await expect(page.getByRole("heading", { name: /Page Not Found/i })).toBeVisible();
    const home = page.getByRole("link", { name: /home/i }).first();
    await expect(home).toBeVisible();
    await home.click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("home page", () => {
  test.use({ viewport: DESKTOP });

  test("shows latest products and filters by category", async ({ page }) => {
    await open(page, "/");
    const grid = page.locator(".latest-grid");
    await expect(grid.locator("article.productCard")).toHaveCount(6);

    const clothing = page.getByRole("button", { name: "Clothing", exact: true });
    await clothing.click();
    await expect(clothing).toHaveAttribute("aria-pressed", "true");
    await expect(grid.locator("article.productCard")).toHaveCount(3);

    await page.getByRole("button", { name: "All pieces" }).click();
    await expect(grid.locator("article.productCard")).toHaveCount(6);
  });

  test("shows the recovery state when the catalogue API fails", async ({ page }) => {
    await open(page, "/", "down");
    await expect(page.getByRole("status").filter({ hasText: "taking a little breather" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Browse the collection/ })).toBeVisible();
  });

  test("shows the empty state when there are no products", async ({ page }) => {
    await open(page, "/", "empty");
    await expect(page.getByRole("status").filter({ hasText: "on their way" })).toBeVisible();
  });
});

test.describe("search, sort and filter", () => {
  test.use({ viewport: DESKTOP });

  test("text search narrows the results and reports the count", async ({ page }) => {
    await open(page, "/search");
    await expect(page.locator(".searchProductList .productCard")).toHaveCount(6);
    await page.getByRole("searchbox").fill("tote");
    await expect(page.locator(".searchProductList .productCard")).toHaveCount(1);
    await expect(page.locator(".search-result-count")).toHaveText("1 piece");
  });

  test("a query with no matches shows an inline empty state", async ({ page }) => {
    await open(page, "/search");
    await page.getByRole("searchbox").fill("zzz-no-such-product");
    await expect(page.getByRole("status").filter({ hasText: "No pieces found" })).toBeVisible();
    await page.getByRole("button", { name: "Clear filters" }).first().click();
    await expect(page.locator(".searchProductList .productCard")).toHaveCount(6);
  });

  test("sorting by price low to high orders the cards", async ({ page }) => {
    await open(page, "/search");
    await page.getByLabel("Sort by").selectOption("asc");
    const prices = await page.locator(".productCard-price").allTextContents();
    const values = prices.map((text) => Number(text.replace(/[^\d]/g, "")));
    expect(values).toEqual([...values].sort((a, b) => a - b));
  });

  test("category filter limits results", async ({ page }) => {
    await open(page, "/search");
    await page.getByLabel("Category").selectOption("Shoes");
    await expect(page.locator(".searchProductList .productCard")).toHaveCount(1);
    await expect(page.locator(".productCard-name").first()).toContainText("Sneakers");
  });

  test("search failure shows an error state with retry", async ({ page }) => {
    await open(page, "/search", "down");
    await expect(page.getByRole("heading", { name: "We couldn’t load the collection." })).toBeVisible();
    await expect(page.getByRole("button", { name: /Try again/ })).toBeVisible();
  });
});

test.describe("product and cart", () => {
  test.use({ viewport: DESKTOP });

  test("a product card opens the product page", async ({ page }) => {
    await open(page, "/search");
    await page.getByRole("link", { name: "View Burnt Orange Canvas Tote details" }).click();
    await expect(page).toHaveURL(/\/product\/p-bag$/);
    await expect(page.getByRole("heading", { level: 1, name: "Burnt Orange Canvas Tote" })).toBeVisible();
    await expect(page.getByText("₹899")).toBeVisible();
  });

  test("sold-out product cannot be added to the cart from the card", async ({ page }) => {
    await open(page, "/search");
    const add = page.getByRole("button", { name: "Ivory Low-Top Sneakers is sold out" });
    await expect(add).toBeDisabled();
  });

  test("adding from a card updates the header cart count", async ({ page }) => {
    await open(page, "/search");
    await page.getByRole("button", { name: "Add Burnt Orange Canvas Tote to cart" }).click();
    await expect(cartLink(page)).toContainText("1");
    await page.goto("/cart");
    await expect(page.locator(".cartItem")).toHaveCount(1);
    await expect(page.locator(".cart aside")).toContainText("Subtotal: ₹899");
  });

  test("cart quantity controls and removal update totals", async ({ page }) => {
    await open(page, "/search");
    await page.getByRole("button", { name: "Add Oatmeal Crew-Neck Sweatshirt to cart" }).click();
    await page.goto("/cart");
    const item = page.locator(".cartItem").first();
    await item.locator("button").nth(1).click(); // "+"
    await expect(item.locator("p")).toHaveText("2");
    await expect(page.locator(".cart aside")).toContainText("Subtotal: ₹2998");
    await item.locator("button").nth(0).click(); // "-"
    await expect(item.locator("p")).toHaveText("1");
    await item.locator("button").last().click(); // trash
    await expect(page.locator(".cartItem")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "No Items Added" })).toBeVisible();
  });

  test("guest cart offers login instead of checkout", async ({ page }) => {
    await open(page, "/search");
    await page.getByRole("button", { name: "Add Burnt Orange Canvas Tote to cart" }).click();
    await page.goto("/cart");
    await page.getByRole("link", { name: "Login to Checkout" }).click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("shipping redirects back to the cart when it is empty", async ({ page }) => {
    await open(page, "/shipping");
    await expect(page).toHaveURL(/\/cart$/);
  });

  test("unknown product id does not crash the page", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await open(page, "/product/does-not-exist");
    await expect(page.locator(".productDetails")).toBeVisible();
    expect(errors).toEqual([]);
  });
});

test.describe("mobile navigation (390px)", () => {
  test.use({ viewport: MOBILE });

  test("hamburger opens the menu, updates aria-expanded, and closes after navigating", async ({ page }) => {
    await open(page, "/");
    const toggle = page.getByRole("button", { name: "Open navigation menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(page.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute("aria-expanded", "true");
    const menu = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "Search" }).click();
    await expect(page).toHaveURL(/\/search$/);
    await expect(menu).toBeHidden();
  });

  test("mobile filter drawer toggles on the search page", async ({ page }) => {
    await open(page, "/search");
    const filters = page.getByRole("button", { name: /filters/i }).first();
    await expect(filters).toHaveAttribute("aria-expanded", "false");
    await filters.click();
    await expect(filters).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#product-filters")).toBeVisible();
  });
});

test.describe("auth entry points", () => {
  test.use({ viewport: DESKTOP });

  test("login without Firebase configured explains sign-in is unavailable", async ({ page }) => {
    await open(page, "/login");
    await page.getByRole("button", { name: /Sign in with Google/ }).click();
    await expect(page.getByText("Sign-in is not configured in this environment")).toBeVisible();
  });

  test("admin area redirects unauthenticated visitors to login", async ({ page }) => {
    await open(page, "/admin/dashboard");
    await expect(page).toHaveURL(/\/login$/);
  });
});

test.describe("keyboard", () => {
  test.use({ viewport: DESKTOP });

  test("tab reaches the logo and nav links with a visible focus ring", async ({ page }) => {
    await open(page, "/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "VirtuoStore home" })).toBeFocused();
    const outline = await page.evaluate(() => getComputedStyle(document.activeElement as Element).outlineStyle);
    expect(outline).not.toBe("none");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: /^Home/ })).toBeFocused();
  });
});
