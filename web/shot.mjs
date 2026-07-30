import { chromium } from "playwright";

const [, , url, out, theme, w = "1440", h = "900", mode] = process.argv;
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: +w, height: +h },
  reducedMotion: "reduce", // évite que les scroll-triggers laissent des éléments cachés
});
const page = await ctx.newPage();
await page.addInitScript((t) => {
  try {
    localStorage.setItem("theme", t);
  } catch {}
}, theme);
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.screenshot({ path: out, fullPage: mode === "full" });
await browser.close();
console.log("shot →", out, theme, `${w}x${h}`, mode || "viewport");
