import * as stylex from "@stylexjs/stylex";
import type { ReactElement } from "react";
import { defaultUrlTransform, MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import { dropMarkAutoMD } from "./url";

const styles = stylex.create({
  root: {
    fontFamily: "system-ui, sans-serif",
    lineHeight: 1.6,
    maxWidth: "40rem",
    padding: "1.5rem",
  },
});

function transformUrl(url: string, key: string): string {
  const href = key === "href" ? dropMarkAutoMD(url) : url;
  // Keep the default important transform
  return defaultUrlTransform(href);
}

export async function MarkFile(props: { text: string }): Promise<ReactElement> {
  const { text } = props;

  return (
    <article {...stylex.props(styles.root)}>
      <MarkdownAsync remarkPlugins={[remarkGfm]} urlTransform={transformUrl}>
        {text}
      </MarkdownAsync>
    </article>
  );
}
