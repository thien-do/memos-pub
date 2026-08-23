import type { ReactElement } from "react";
import { defaultUrlTransform, MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import { dropMarkAutoMD } from "./url";

export async function MarkFile(props: { text: string }): Promise<ReactElement> {
  const { text } = props;

  return (
    <MarkdownAsync
      remarkPlugins={[remarkGfm]}
      urlTransform={(url, key) =>
        defaultUrlTransform(key === "href" ? dropMarkAutoMD(url) : url)
      }
    >
      {text}
    </MarkdownAsync>
  );
}
