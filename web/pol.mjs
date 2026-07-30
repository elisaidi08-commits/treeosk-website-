import { chromium } from "playwright";
const b = await chromium.launch({ args:["--use-gl=swiftshader"] });
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
await ctx.addCookies([{name:"treeosk_intro",value:"1",url:"http://localhost:3737"}]);
const p = await ctx.newPage();
const errs=[]; p.on("console",m=>{if(m.type()==="error")errs.push(m.text())}); p.on("pageerror",e=>errs.push("PE:"+e.message));
await p.goto("http://localhost:3737/en",{waitUntil:"networkidle"});
await p.waitForTimeout(1500);
const base="/private/tmp/claude-501/-Volumes-DISQUE-SADY-13-SCHOOL-01-UX-UI-STAGE-TREEOSK-TREEOSK-DESIGN-SITE/e9bc403c-9a5d-41d9-8e3c-3b89cb08c9c5/scratchpad";
for (const [id,name] of [["#clients","pol-clients"],["#experiences","pol-exp"],["#how","pol-how"],["#cases","pol-cases"],["#about","pol-about"]]){
  await p.evaluate(s=>{const e=document.querySelector(s); if(e) window.scrollTo(0, e.offsetTop-30);}, id);
  await p.waitForTimeout(1300); await p.screenshot({path:`${base}/${name}.png`});
}
console.log("ERRORS:", errs.length?errs.slice(0,6).join(" | "):"none");
await b.close();
