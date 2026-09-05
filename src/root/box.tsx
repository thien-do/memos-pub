import { Analytics } from "@vercel/analytics/next";
import type { ReactElement, ReactNode } from "react";
import { rootInter } from "./inter/main";
import "./global.css";

export function RootBox(props: { children: ReactNode }): ReactElement {
  const { children } = props;

  return (
    <html lang="en">
      <body className={rootInter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
