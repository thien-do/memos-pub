import { ConnectFormBox } from "@/connect";
import type { ReactElement } from "react";

export function HomeMain(): ReactElement {
  return (
    <main>
      <h1>Memos.pub</h1>
      <h2>Config</h2>
      <h2>Custom domain</h2>
      <ConnectFormBox />
    </main>
  );
}
