import { chromium } from "playwright";
const [,, url, out] = process.argv;
const b = await chromium.launch({ args: ["--use-gl=swiftshader","--enable-webgl"] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: "domcontentloaded" });
await p.waitForTimeout(4300);
await p.screenshot({ path: out });
await b.close(); console.log("ok");
