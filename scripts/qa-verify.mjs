import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "msedge", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });

async function probe(url, checks) {
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  for (const [label, fn] of checks) {
    try { console.log(label, JSON.stringify(await page.evaluate(fn))); }
    catch (e) { console.log(label, "ERROR", e.message); }
  }
  await page.close();
}

await probe("http://localhost:3100/", [
  ["portrait:", () => { const i = document.querySelector('img[src*="Asim"]'); if (!i) return "MISSING"; const r = i.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), inViewport: r.top < innerHeight && r.right <= innerWidth && r.left >= 0 }; }],
  ["hOverflow:", () => document.documentElement.scrollWidth - document.documentElement.clientWidth],
]);

await probe("http://localhost:3100/projects/job-radar", [
  ["visual:", () => { const v = document.querySelector("main .mt-14, main .md\:mt-16"); const el = [...document.querySelectorAll("main > div > div")].find(d => d.querySelector("[aria-hidden='true'] .divide-y, img")); if (!el) return "NOT FOUND"; const r = el.getBoundingClientRect(); return { y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), fits: r.right <= innerWidth && r.left >= 0 }; }],
  ["hOverflow:", () => document.documentElement.scrollWidth - document.documentElement.clientWidth],
]);

await probe("http://localhost:3100/projects/production-storefronts", [
  ["visual:", () => { const el = [...document.querySelectorAll("main div")].find(d => d.textContent?.includes("21stcenturyequipment.com") && d.getAttribute("aria-hidden") === "true"); if (!el) return "NOT FOUND"; const r = el.getBoundingClientRect(); return { y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), fits: r.right <= innerWidth && r.left >= 0 }; }],
  ["hOverflow:", () => document.documentElement.scrollWidth - document.documentElement.clientWidth],
]);

await b.close();
