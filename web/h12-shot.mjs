import { chromium } from "playwright";
const b = await chromium.launch({ args:["--use-gl=swiftshader"] });
const p = await (await b.newContext({ viewport:{width:1440,height:900} })).newPage();
const errs=[]; p.on("console",m=>{if(m.type()==="error")errs.push(m.text())}); p.on("pageerror",e=>errs.push("PE:"+e.message));
await p.addInitScript(()=>{try{sessionStorage.setItem("introSeen","1")}catch(e){}});
await p.goto("http://localhost:3737/en",{waitUntil:"networkidle"});
await p.waitForTimeout(2000);
const base="/private/tmp/claude-501/-Volumes-DISQUE-SADY-13-SCHOOL-01-UX-UI-STAGE-TREEOSK-TREEOSK-DESIGN-SITE/e9bc403c-9a5d-41d9-8e3c-3b89cb08c9c5/scratchpad";
const about=await p.evaluate(()=>document.querySelector("#about")?.offsetTop||0);
// mid-expansion
await p.evaluate(y=>window.scrollTo(0,y+700), about);
await p.waitForTimeout(1200); await p.screenshot({path:`${base}/exp-mid.png`});
// near-full + text
await p.evaluate(y=>window.scrollTo(0,y+1700), about);
await p.waitForTimeout(1200); await p.screenshot({path:`${base}/exp-end.png`});
console.log("ERRORS:", errs.length?errs.slice(0,8).join(" | "):"none");
await b.close();
