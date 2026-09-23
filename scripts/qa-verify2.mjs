import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "msedge", headless: true });
const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3100/projects/job-radar", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const r = await page.evaluate(() => {
  const el = [...document.querySelectorAll("main div")].find(
    (d) => d.getAttribute("aria-hidden") === "true" && d.textContent?.includes("today's digest"),
  );
  if (!el) return "NOT FOUND";
  const b = el.getBoundingClientRect();
  return { y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), fits: b.right <= innerWidth && b.left >= 0 };
});
console.log("job-radar visual:", JSON.stringify(r));
await b.close();
