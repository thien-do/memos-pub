import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

interface PageProps {
  html: string;
}

const Page: NextPage<PageProps> = (props) => {
  return <div dangerouslySetInnerHTML={{ __html: props.html }} />;
};

export default Page;

interface PageParams extends NodeJS.Dict<string | string[]> {
  /**
   * Something like:
   * - ["github.com", "thien-do", "notes", "blob", "master", "hello.md"]
   */
  path: string[];
}

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify);

const toHTML = async (markdown: string): Promise<string> => {
  const file = await processor.process(markdown);
  const html = String(file);
  return html;
};

const getRaw = (url: string[]): string => {
  const [host, user, repo, _blob, branch, ...path] = url;
  if (host !== "github.com")
    throw Error(
      [
        `Not supported host "${host}".`,
        'Only support "github.com" for now.',
      ].join(" ")
    );
  return [
    "https://raw.githubusercontent.com",
    `${user}/${repo}/${branch}`,
    ...path,
  ].join("/");
};

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async (
  context
) => {
  const path = context.params?.path;
  if (path === undefined) throw Error("params.path is not defined");
  const raw = getRaw(path);
  const response = await fetch(raw);
  const markdown = await response.text();
  const html = await toHTML(markdown);

  return {
    props: { html },
    revalidate: 60, // seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});
