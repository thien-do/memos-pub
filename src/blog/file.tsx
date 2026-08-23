import type { ReactElement } from "react";
import { defaultUrlTransform, MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import { dropAutoMd } from "./md";

export async function BlogFile(props: { text: string }): Promise<ReactElement> {
  const { text } = props;

  return (
    <MarkdownAsync
      remarkPlugins={[remarkGfm]}
      urlTransform={(url, key) =>
        defaultUrlTransform(key === "href" ? dropAutoMd(url) : url)
      }
    >
      {text}
    </MarkdownAsync>
  );
}
