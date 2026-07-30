import { chromium } from "playwright";
const b = await chromium.launch({ args:["--use-gl=swiftshader"] });
const ctx = await b.newContext({ viewport:{width:1440,height:1000} });
await ctx.addCookies([{name:"treeosk_intro",value:"1",url:"http://localhost:3737"}]);
const p = await ctx.newPage();
await p.goto("http://localhost:3737/en",{waitUntil:"networkidle"});
await p.waitForTimeout(1500);
const base="/private/tmp/claude-501/-Volumes-DISQUE-SADY-13-SCHOOL-01-UX-UI-STAGE-TREEOSK-TREEOSK-DESIGN-SITE/e9bc403c-9a5d-41d9-8e3c-3b89cb08c9c5/scratchpad";
await p.evaluate(()=>{const e=document.querySelector("#about"); if(e) window.scrollTo(0, e.offsetTop-40);});
await p.waitForTimeout(1400); await p.screenshot({path:`${base}/pol-about2.png`});
// dark theme check: toggle via localStorage class
await p.evaluate(()=>{document.documentElement.classList.add("dark"); localStorage.setItem("theme","dark");});
await p.evaluate(()=>window.scrollTo(0,0));
await p.waitForTimeout(2500); await p.screenshot({path:`${base}/dark-hero.png`});
console.log("done");
await b.close();
