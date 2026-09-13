import localFont from "next/font/local";

const fontIaMonoFace = localFont({
  src: [
    { path: "./base.ttf", style: "normal" },
    { path: "./italic.ttf", style: "italic" },
  ],
  weight: "400 700",
  display: "swap",
  variable: "--font-code",
  fallback: ["monospace"],
  preload: false,
});

export const fontIaMono = fontIaMonoFace.variable;
