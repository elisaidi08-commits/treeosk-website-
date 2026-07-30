import { chromium } from "playwright";
const b = await chromium.launch({ args:["--use-gl=swiftshader"] });
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();
const errs=[]; p.on("console",m=>{if(m.type()==="error")errs.push(m.text())}); p.on("pageerror",e=>errs.push("PE:"+e.message));
// NE PAS set introSeen → l'intro joue
await p.goto("http://localhost:3737/en",{waitUntil:"domcontentloaded"});
const base="/private/tmp/claude-501/-Volumes-DISQUE-SADY-13-SCHOOL-01-UX-UI-STAGE-TREEOSK-TREEOSK-DESIGN-SITE/e9bc403c-9a5d-41d9-8e3c-3b89cb08c9c5/scratchpad";
await p.waitForTimeout(1200); await p.screenshot({path:`${base}/intro-a.png`});
await p.waitForTimeout(3200); await p.screenshot({path:`${base}/intro-b.png`}); // ~4.4s
await p.waitForTimeout(2200); await p.screenshot({path:`${base}/intro-c.png`}); // ~6.6s (logo)
console.log("ERRORS:", errs.length?errs.slice(0,6).join(" | "):"none");
await b.close();
