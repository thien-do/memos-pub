import type { ReactElement } from "react";

export function BlogFile(props: { text: string }): ReactElement {
  const { text } = props;

  return <pre>{text}</pre>;
}
