// QA screenshot runner — drives headless Edge against the local dev server.
// Usage: node scripts/qa-screens.mjs [baseUrl]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3100";
const OUT = "qa";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "msedge", headless: true });

async function shoot(context, label, url, { sections = [], fullPage = false, extra } = {}) {
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200); // let load animations finish
  if (sections.length === 0) {
    await page.screenshot({ path: `${OUT}/${label}.png` });
  }
  for (const [name, sel] of sections) {
    if (sel === "bottom") {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    } else {
      await page.locator(sel).first().scrollIntoViewIfNeeded();
      await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: "start" }), sel);
    }
    await page.waitForTimeout(1800); // smooth-scroll + whileInView reveals
    await page.screenshot({ path: `${OUT}/${label}-${name}.png` });
  }
  if (fullPage) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/${label}-full.png`, fullPage: true });
  }
  if (extra) await extra(page);
  await page.close();
}

// ---------- Desktop ----------
const desktop = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
await shoot(desktop, "d-home", `${BASE}/`, {
  sections: [
    ["hero", "body"], // top of page
    ["work", "#work"],
    ["skills", "#skills"],
    ["experience", "#experience"],
    ["about", "#about"],
    ["writing", "#writing"],
    ["contact", "#contact"],
    ["footer", "bottom"],
  ],
});
await shoot(desktop, "d-case-jr", `${BASE}/projects/job-radar`, {
  sections: [
    ["top", "body"],
    ["mid", "main"],
    ["bottom", "bottom"],
  ],
});
await shoot(desktop, "d-case-prod", `${BASE}/projects/production-storefronts`, {
  sections: [
    ["top", "body"],
    ["bottom", "bottom"],
  ],
});
await shoot(desktop, "d-post", `${BASE}/writing/taming-inp`, {
  sections: [
    ["top", "body"],
    ["bottom", "bottom"],
  ],
});
await desktop.close();

// ---------- Mobile ----------
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
await shoot(mobile, "m-home", `${BASE}/`, {
  sections: [
    ["hero", "body"],
    ["work", "#work"],
    ["skills", "#skills"],
    ["experience", "#experience"],
    ["about", "#about"],
    ["writing", "#writing"],
    ["contact", "#contact"],
    ["footer", "bottom"],
  ],
  extra: async (page) => {
    // open the mobile menu
    const btn = page.getByRole("button", { name: /menu|open/i }).first();
    if (await btn.count()) {
      await btn.click();
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${OUT}/m-menu.png` });
    } else {
      console.log("mobile menu button not found");
    }
  },
});
await shoot(mobile, "m-case-jr", `${BASE}/projects/job-radar`, {
  sections: [
    ["top", "body"],
    ["mid", "main"],
  ],
});
await shoot(mobile, "m-post", `${BASE}/writing/taming-inp`, {
  sections: [["top", "body"], ["bottom", "bottom"]],
});
await mobile.close();

await browser.close();
console.log("done -> qa/");
