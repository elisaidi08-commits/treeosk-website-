import { chromium } from "playwright";
const b = await chromium.launch({ args:["--use-gl=swiftshader"] });
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();
const errs=[]; p.on("console",m=>{if(m.type()==="error")errs.push(m.text())}); p.on("pageerror",e=>errs.push("PE:"+e.message));
await p.addInitScript(()=>{try{sessionStorage.setItem("introSeen","1")}catch(e){}});
await p.goto("http://localhost:3737/en",{waitUntil:"networkidle"});
await p.waitForTimeout(1500);
const base="/private/tmp/claude-501/-Volumes-DISQUE-SADY-13-SCHOOL-01-UX-UI-STAGE-TREEOSK-TREEOSK-DESIGN-SITE/e9bc403c-9a5d-41d9-8e3c-3b89cb08c9c5/scratchpad";
await p.evaluate(()=>document.querySelector("#clients")?.scrollIntoView());
await p.waitForTimeout(1500); await p.screenshot({path:`${base}/acc-clients.png`});
// how it works: scroll into the pinned section a bit to fill progress bar
const how=await p.evaluate(()=>document.querySelector("#how")?.offsetTop||0);
await p.evaluate(y=>window.scrollTo(0,y+700), how);
await p.waitForTimeout(1600); await p.screenshot({path:`${base}/acc-how.png`});
console.log("ERRORS:", errs.length?errs.slice(0,6).join(" | "):"none");
await b.close();
