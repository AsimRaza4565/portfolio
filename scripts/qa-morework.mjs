import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "msedge", headless: true });
for (const w of [1440, 1024, 820, 768, 640, 390]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.evaluate(() => document.querySelector("#work")?.scrollIntoView());
  await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight * 0.85));
  await page.waitForTimeout(2000);
  const info = await page.evaluate(() => {
    const lis = [...document.querySelectorAll("ul.divide-y li, .divide-y > li")];
    const moreLis = lis.filter((li) => li.textContent?.includes("residue of solving"));
    const last = moreLis[moreLis.length - 1];
    const block = last?.closest("div.mt-16") ?? last?.parentElement?.parentElement;
    if (!block) return "not found";
    const rect = block.getBoundingClientRect();
    window.scrollTo(0, window.scrollY + rect.top - 200);
    return {
      items: moreLis.map((li) => {
        const r = li.getBoundingClientRect();
        return { h: Math.round(r.height), y: Math.round(r.y), text: li.textContent?.slice(0, 40) };
      }),
    };
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `qa/morework-${w}.png` });
  console.log(w, JSON.stringify(info));
  await ctx.close();
}
await b.close();
