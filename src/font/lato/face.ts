import localFont from "next/font/local";
import fontLatoStyle from "./style.module.css";

const fontLatoFace = localFont({
  src: [
    { path: "./base.woff2", style: "normal" },
    { path: "./italic.woff2", style: "italic" },
  ],
  weight: "100 900",
  display: "swap",
  variable: "--font-text",
  fallback: ["sans-serif"],
  preload: false,
});

export const fontLato = `${fontLatoFace.variable} ${fontLatoStyle.text}`;
