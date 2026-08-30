import { ConnForm } from "@/conn/form";
import * as stylex from "@stylexjs/stylex";
import type { ReactElement } from "react";

const styles = stylex.create({
  main: {
    fontFamily: "system-ui, sans-serif",
    padding: "2rem",
  },
});

export function HomeMain(): ReactElement {
  return (
    <main {...stylex.props(styles.main)}>
      <ConnForm />
    </main>
  );
}
