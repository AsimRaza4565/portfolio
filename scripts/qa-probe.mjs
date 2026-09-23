import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "msedge", headless: true });
const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await page.waitForTimeout(4000);
const reduce = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
const transforms = await page.locator("h1").evaluate((el) =>
  [...el.querySelectorAll("span")].map((s) => `${getComputedStyle(s).transform} :: ${s.textContent.slice(0, 24)}`)
);
console.log("reducedMotion:", reduce);
console.log(transforms.join("\n"));
await page.screenshot({ path: "qa/probe-hero.png" });
await b.close();
