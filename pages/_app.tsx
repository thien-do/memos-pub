// "@/lib/app" is the practical CustomApp source but some imports must still
// be in this file to satisfy strict requirements from Next.js
// - https://nextjs.org/docs/messages/css-global
import "tailwindcss/tailwind.css";
import "@/lib/app/fonts/inter.css";

export { AppMain as default } from "@/lib/app";
