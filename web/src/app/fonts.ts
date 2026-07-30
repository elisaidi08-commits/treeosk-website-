import localFont from "next/font/local";
import { Inter } from "next/font/google";

// Base One — display uniquement (titres). Domenico Catapano · SIL OFL.
export const baseOne = localFont({
  src: [
    { path: "../fonts/BaseOne-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/BaseOne-Bold.otf", weight: "700", style: "normal" },
    { path: "../fonts/BaseOne-Heavy.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-base-one",
  display: "swap",
});

// Inter — body / UI.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
