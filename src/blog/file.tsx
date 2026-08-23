import type { ReactElement } from "react";
import { MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";

export async function BlogFile(props: { text: string }): Promise<ReactElement> {
  const { text } = props;

  return <MarkdownAsync remarkPlugins={[remarkGfm]}>{text}</MarkdownAsync>;
}
