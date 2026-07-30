import { chromium } from "playwright";
const [,, url, out] = process.argv;
const b = await chromium.launch({ args: ["--use-gl=swiftshader","--enable-webgl","--ignore-gpu-blocklist"] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); // pas de reducedMotion
const p = await ctx.newPage();
await p.goto(url, { waitUntil: "networkidle" });
await p.waitForTimeout(5000);
await p.screenshot({ path: out });
await b.close();
console.log("hero shot →", out);
