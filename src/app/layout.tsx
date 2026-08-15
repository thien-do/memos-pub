import type { ReactElement, ReactNode } from "react";

export const metadata = { title: "memos-pub-2026" };

export default function RootLayout(props: {
  children: ReactNode;
}): ReactElement {
  const { children } = props;

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
