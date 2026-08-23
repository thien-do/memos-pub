import type { ReactElement } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function BlogFile(props: { text: string }): ReactElement {
  const { text } = props;

  return <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>;
}
