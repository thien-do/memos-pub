import localFont from "next/font/local";

const fontSourceSerifFace = localFont({
  src: [
    { path: "./base.woff2", style: "normal" },
    { path: "./italic.woff2", style: "italic" },
  ],
  weight: "200 900",
  display: "swap",
  variable: "--font-text",
  fallback: ["serif"],
  adjustFontFallback: "Times New Roman",
  preload: false,
});

export const fontSourceSerif = fontSourceSerifFace.variable;
