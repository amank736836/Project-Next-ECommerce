import type { Page } from "@playwright/test";

export const VIEWPORTS = [
  { name: "mobile-320", width: 320, height: 568 },
  { name: "mobile-375", width: 375, height: 667 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-425", width: 425, height: 900 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-820", width: 820, height: 1180 },
  { name: "tablet-1024", width: 1024, height: 768 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "laptop-1366", width: 1366, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "ultrawide-2560", width: 2560, height: 1440 },
] as const;

export type OverflowReport = {
  viewport: number;
  documentOverflowPx: number;
  offenders: { tag: string; cls: string; left: number; right: number; text: string }[];
  offenderCount: number;
};

/**
 * Detects horizontal overflow both at the document level and per element.
 * An element is ignored when an ancestor clips it (overflow other than visible)
 * and that ancestor itself lies inside the viewport, since such content is
 * intentionally scrollable inside its own container.
 */
export async function measureOverflow(page: Page): Promise<OverflowReport> {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const sw = document.documentElement.scrollWidth;
    const clipping = (value: string) => ["hidden", "auto", "scroll", "clip"].includes(value);
    const offenders: { tag: string; cls: string; left: number; right: number; text: string }[] = [];
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("body *"))) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden" || cs.position === "fixed") continue;
      if (r.right <= vw + 1 && r.left >= -1) continue;
      let clipped = false;
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const ps = getComputedStyle(p);
        const pr = p.getBoundingClientRect();
        if (clipping(ps.overflowX) && pr.right <= vw + 1 && pr.left >= -1) {
          clipped = true;
          break;
        }
      }
      if (clipped) continue;
      offenders.push({
        tag: el.tagName.toLowerCase(),
        cls: typeof el.className === "string" ? el.className.slice(0, 60) : "",
        left: Math.round(r.left),
        right: Math.round(r.right),
        text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40),
      });
    }
    return { viewport: vw, documentOverflowPx: sw - vw, offenders: offenders.slice(0, 8), offenderCount: offenders.length };
  });
}
