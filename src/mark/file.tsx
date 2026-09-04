import type { ReactElement } from "react";
import { defaultUrlTransform, MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./file.module.css";
import { dropMarkAutoMD } from "./url";

function transformUrl(url: string, key: string): string {
  const href = key === "href" ? dropMarkAutoMD(url) : url;
  // Keep the default important transform
  return defaultUrlTransform(href);
}

export async function MarkFile(props: { text: string }): Promise<ReactElement> {
  const { text } = props;

  return (
    <article className={styles.root}>
      <MarkdownAsync remarkPlugins={[remarkGfm]} urlTransform={transformUrl}>
        {text}
      </MarkdownAsync>
    </article>
  );
}
