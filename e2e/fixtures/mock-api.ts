import type { Page, Route } from "@playwright/test";
import { categories, type MockProduct, products } from "./products";

export type ApiMode = "ok" | "down" | "empty";

const json = (route: Route, status: number, body: unknown) =>
  route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });

/**
 * Serves the storefront's /api/* routes from in-memory fixtures so the UI can be
 * exercised without MongoDB, Redis, Cloudinary or Razorpay.
 *   ok    - realistic catalogue
 *   empty - catalogue with zero products
 *   down  - every API call fails with HTTP 500 (outage simulation)
 */
export async function mockApi(page: Page, mode: ApiMode = "ok", opts: { delayMs?: number } = {}) {
  await page.route("**/api/**", async (route) => {
    const url = new URL(route.request().url());
    const path = url.pathname;
    if (opts.delayMs) await new Promise((resolve) => setTimeout(resolve, opts.delayMs));

    if (mode === "down") return json(route, 500, { success: false, message: "Mock outage" });

    if (path === "/api/product/latest") {
      return json(route, 200, { success: true, message: "ok", products: mode === "empty" ? [] : products });
    }
    if (path === "/api/product/categories") {
      return json(route, 200, { success: true, message: "ok", categories: mode === "empty" ? [] : categories });
    }
    if (path === "/api/product/all") {
      const search = (url.searchParams.get("search") || "").toLowerCase();
      const category = url.searchParams.get("category") || "";
      const sort = url.searchParams.get("sort") || "";
      // Mirrors the real route: an absent price parameter means "no price filter".
      const priceParam = url.searchParams.get("price");
      const price = priceParam ? Number(priceParam) : Infinity;
      let list = mode === "empty" ? [] : products.filter((p) => p.name.toLowerCase().includes(search));
      if (category) list = list.filter((p) => p.category === category);
      list = list.filter((p) => p.price <= price);
      if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
      if (sort === "dsc") list = [...list].sort((a, b) => b.price - a.price);
      return json(route, 200, {
        success: true,
        message: "ok",
        products: list,
        totalPage: Math.max(1, Math.ceil(list.length / 8)),
      });
    }
    if (/^\/api\/product\/review\/[^/]+$/.test(path)) {
      return json(route, 200, { success: true, message: "ok", reviews: [], reviewButton: false });
    }
    const single = path.match(/^\/api\/product\/([^/]+)$/);
    if (single) {
      const found: MockProduct | undefined = products.find((p) => p._id === single[1]);
      return found
        ? json(route, 200, { success: true, message: "ok", product: found })
        : json(route, 404, { success: false, message: "Product Not Found" });
    }
    return json(route, 500, { success: false, message: `Mock: unhandled API route ${path}` });
  });
}
