import { chromium } from "playwright";
const [,, url, outBase] = process.argv;
const b = await chromium.launch({ args:["--use-gl=swiftshader"] });
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();
const errs = [];
p.on("console", m => { if (m.type()==="error") errs.push(m.text()); });
p.on("pageerror", e => errs.push("PAGEERR: "+e.message));
await p.addInitScript(() => { try{ sessionStorage.setItem("introSeen","1"); }catch(e){} });
await p.goto(url, { waitUntil:"networkidle" });
await p.waitForTimeout(1500);
// scroll positions (fraction of full scroll height) to capture
const total = await p.evaluate(() => document.body.scrollHeight);
const fracs = [0.18, 0.30, 0.42, 0.55, 0.70, 0.85];
for (let i=0;i<fracs.length;i++){
  await p.evaluate(y => window.scrollTo(0, y), Math.floor(total*fracs[i]));
  await p.waitForTimeout(1400);
  await p.screenshot({ path: `${outBase}-${i}.png` });
}
console.log("ERRORS:", errs.length ? errs.slice(0,8).join(" | ") : "none");
await b.close();
