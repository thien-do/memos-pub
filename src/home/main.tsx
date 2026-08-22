import type { ReactElement } from "react";
import { HomeForm } from "./form";

export function HomeMain(): ReactElement {
  return (
    <main>
      <h1>Use your own domain</h1>
      <HomeForm />
    </main>
  );
}
