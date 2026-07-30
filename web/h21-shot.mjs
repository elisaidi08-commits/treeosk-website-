import { chromium } from "playwright";
const b = await chromium.launch({ args:["--use-gl=swiftshader"] });
const p = await (await b.newContext({ viewport:{width:1440,height:900} })).newPage();
await p.goto("http://localhost:3737/en",{waitUntil:"networkidle"});
const base="/private/tmp/claude-501/-Volumes-DISQUE-SADY-13-SCHOOL-01-UX-UI-STAGE-TREEOSK-TREEOSK-DESIGN-SITE/e9bc403c-9a5d-41d9-8e3c-3b89cb08c9c5/scratchpad";
// after networkidle (hydrated), intro clock ~ starts; capture greeting + logo
await p.waitForTimeout(3800); await p.screenshot({path:`${base}/intro-mid.png`});
await p.waitForTimeout(2200); await p.screenshot({path:`${base}/intro-logo.png`}); // ~6s → logo
console.log("done");
await b.close();
