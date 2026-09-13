import localFont from "next/font/local";

const fontSourceCodeFace = localFont({
  src: [
    { path: "./base.woff2", style: "normal" },
    { path: "./italic.woff2", style: "italic" },
  ],
  weight: "200 900",
  display: "swap",
  variable: "--font-code",
  fallback: ["monospace"],
  preload: false,
});

export const fontSourceCode = fontSourceCodeFace.variable;
