import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";

export const metadata: Metadata = {
  title: "memos.pub",
};

export default function RootLayout(props: {
  children: ReactNode;
}): ReactElement {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
