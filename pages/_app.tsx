// "@/lib/app" is the practical CustomApp source but some imports must still
// be in this file to satisfy strict requirements from Next.js
// - https://nextjs.org/docs/messages/css-global
import "tailwindcss/tailwind.css";
import "@/lib/app/fonts/inter/index.css";
import "@/lib/app/fonts/ia-writer-mono/index.css";

export { LayoutMain as default } from "@/lib/app/layout/layout";
