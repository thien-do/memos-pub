import localFont from "next/font/local";

export const rootInter = localFont({
  src: [
    { path: "./base.woff2", style: "normal" },
    { path: "./italic.woff2", style: "italic" },
  ],
  weight: "100 900",
  display: "swap",
});
