import localFont from "next/font/local";

const fontIaQuattroFace = localFont({
  src: [
    { path: "./base.ttf", style: "normal" },
    { path: "./italic.ttf", style: "italic" },
  ],
  weight: "400 700",
  display: "swap",
  variable: "--font-text",
  fallback: ["sans-serif"],
  preload: false,
});

export const fontIaQuattro = fontIaQuattroFace.variable;
