import type { UrlTransform } from "@tanstack/markdown";
import { Markdown } from "@tanstack/markdown/react";
import { cacheLife } from "next/cache";
import type { ReactElement } from "react";
import { dropMarkAutoMD } from "./url";

const transformUrl: UrlTransform = (_url, kind, defaultUrl) =>
  kind === "link" ? dropMarkAutoMD(defaultUrl) : defaultUrl;

export async function MarkFile(props: { text: string }): Promise<ReactElement> {
  "use cache: remote";
  cacheLife("days");
  const { text } = props;

  return (
    <article>
      <Markdown urlTransform={transformUrl}>{text}</Markdown>
    </article>
  );
}
