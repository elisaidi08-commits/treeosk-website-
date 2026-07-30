import { chromium } from "playwright";
const b = await chromium.launch({ args:["--use-gl=swiftshader"] });
const p = await (await b.newContext({ viewport:{width:1440,height:900} })).newPage();
// pas de cookie → l'intro joue
await p.goto("http://localhost:3737/en",{waitUntil:"networkidle"});
const base="/private/tmp/claude-501/-Volumes-DISQUE-SADY-13-SCHOOL-01-UX-UI-STAGE-TREEOSK-TREEOSK-DESIGN-SITE/e9bc403c-9a5d-41d9-8e3c-3b89cb08c9c5/scratchpad";
await p.waitForTimeout(2600); await p.screenshot({path:`${base}/introd-1.png`});
await p.waitForTimeout(3000); await p.screenshot({path:`${base}/introd-2.png`});
console.log("ok");
await b.close();
