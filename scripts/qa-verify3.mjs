import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "msedge", headless: true });

// Mobile: hero badge fits, proof marquee, more-work stacking
const m = await b.newContext({ viewport: { width: 390, height: 844 } });
const mp = await m.newPage();
await mp.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await mp.waitForTimeout(1500);
console.log("badge:", await mp.evaluate(() => {
  const el = [...document.querySelectorAll("span")].find(s => s.textContent?.includes("open to"));
  if (!el) return "NOT FOUND";
  const pill = el.closest("div");
  const r = pill.getBoundingClientRect();
  return { text: el.textContent, w: Math.round(r.width), fits: r.right <= innerWidth - 24 };
}));
await mp.evaluate(() => document.querySelector("#work")?.scrollIntoView());
await mp.waitForTimeout(2000);
await mp.evaluate(() => window.scrollBy(0, 2400));
await mp.waitForTimeout(1500);
console.log("morework mobile:", await mp.evaluate(() => {
  const li = [...document.querySelectorAll("li")].find(l => l.textContent?.includes("residue of solving"));
  if (!li) return "NOT FOUND";
  const cols = getComputedStyle(li).gridTemplateColumns;
  const spans = [...li.children].map(c => Math.round(c.getBoundingClientRect().left));
  return { cols, lefts: spans };
}));
await m.close();

// Desktop: proof marks, experience links, more-work grid
const d = await b.newContext({ viewport: { width: 1440, height: 900 } });
const dp = await d.newPage();
await dp.goto("http://localhost:3100/", { waitUntil: "networkidle" });
await dp.waitForTimeout(1500);
console.log("proof marks:", await dp.evaluate(() =>
  [...document.querySelectorAll('a[href*="foursightsolutions"], a[href*="codexspot"]')].map(a => a.textContent)
));
console.log("bfp gone:", await dp.evaluate(() => !document.body.textContent.includes("Build for Pakistan")));
await dp.evaluate(() => document.querySelector("#experience")?.scrollIntoView());
await dp.waitForTimeout(2000);
console.log("exp links:", await dp.evaluate(() =>
  [...document.querySelectorAll("#experience a[target='_blank']")].map(a => `${a.textContent} -> ${a.href}`)
));
await dp.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await dp.waitForTimeout(2000);
console.log("morework desktop:", await dp.evaluate(() => {
  const li = [...document.querySelectorAll("li")].find(l => l.textContent?.includes("residue of solving"));
  if (!li) return "NOT FOUND";
  const r = li.getBoundingClientRect();
  return { cols: getComputedStyle(li).gridTemplateColumns, lefts: [...li.children].map(c => Math.round(c.getBoundingClientRect().left)), w: Math.round(r.width) };
}));
await dp.screenshot({ path: "qa/verify-morework.png" });
await d.close();
await b.close();
