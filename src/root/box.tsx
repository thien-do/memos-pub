import { fontPairs } from "@/font/pairs";
import { Analytics } from "@vercel/analytics/next";
import type { ReactElement, ReactNode } from "react";
import "./global.css";

export function RootBox(props: { children: ReactNode }): ReactElement {
  const { children } = props;

  return (
    <html lang="en" className={`dark ${fontPairs.lato}`}>
      <body>
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
