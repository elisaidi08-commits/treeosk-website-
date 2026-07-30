import { chromium } from "playwright";
const [,, url, dir] = process.argv;
const b = await chromium.launch({ args:["--use-gl=swiftshader"] });
const ctx = await b.newContext({ viewport:{width:1440,height:900}, reducedMotion:"reduce" });
const p = await ctx.newPage();
await p.goto(url, { waitUntil:"networkidle" });
// scroll pour déclencher les whileInView, puis capturer chaque section
for (const [sel,name] of [["#how","how"],["#about","about"],["#contact","contact"]]) {
  await p.evaluate((s)=>document.querySelector(s)?.scrollIntoView({block:"start"}), sel);
  await p.waitForTimeout(1400);
  await p.screenshot({ path: `${dir}/sec-${name}.png` });
}
await b.close(); console.log("ok");
