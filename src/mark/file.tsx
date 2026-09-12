import { cacheLife } from "next/cache";
import type { ReactElement } from "react";
import { defaultUrlTransform, MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import { dropMarkAutoMD } from "./url";

function transformUrl(url: string, key: string): string {
  const href = key === "href" ? dropMarkAutoMD(url) : url;
  // Keep the default important transform
  return defaultUrlTransform(href);
}

export async function MarkFile(props: { text: string }): Promise<ReactElement> {
  "use cache: remote";
  cacheLife("days");
  const { text } = props;

  return (
    <MarkdownAsync remarkPlugins={[remarkGfm]} urlTransform={transformUrl}>
      {text}
    </MarkdownAsync>
  );
}
