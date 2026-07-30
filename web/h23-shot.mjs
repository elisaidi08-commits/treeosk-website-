import { chromium } from "playwright";
const b = await chromium.launch({ args:["--use-gl=swiftshader"] });
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
await ctx.addCookies([{name:"treeosk_intro",value:"1",url:"http://localhost:3737"}]);
const p = await ctx.newPage();
const errs=[]; p.on("console",m=>{if(m.type()==="error")errs.push(m.text())}); p.on("pageerror",e=>errs.push("PE:"+e.message));
await p.goto("http://localhost:3737/en",{waitUntil:"networkidle"});
await p.waitForTimeout(1500);
const base="/private/tmp/claude-501/-Volumes-DISQUE-SADY-13-SCHOOL-01-UX-UI-STAGE-TREEOSK-TREEOSK-DESIGN-SITE/e9bc403c-9a5d-41d9-8e3c-3b89cb08c9c5/scratchpad";
const cl = await p.evaluate(()=>{const e=document.querySelector("#clients"); return e? e.offsetTop+e.offsetHeight : 0;});
for (const [dy,name] of [[500,"tilt-a"],[1400,"tilt-b"],[2300,"tilt-c"]]){
  await p.evaluate(y=>window.scrollTo(0,y), cl+dy);
  await p.waitForTimeout(1000); await p.screenshot({path:`${base}/${name}.png`});
}
console.log("ERRORS:", errs.length?errs.slice(0,6).join(" | "):"none");
await b.close();
