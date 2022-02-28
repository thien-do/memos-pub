import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { markdownToHTML } from "../lib/markdown/html";
import { fetchSource } from "../lib/sources/fetch";

interface PageProps {
  markdown: string;
}

const Page: NextPage<PageProps> = (props) => {
  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: markdownToHTML(props.markdown) }}
    />
  );
};

export default Page;

interface PageParams extends NodeJS.Dict<string | string[]> {
  components: string[];
}

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async (
  context
) => {
  const components = context.params?.components;
  if (components === undefined) throw Error("params.components is not defined");
  const markdown = await fetchSource(components);
  return {
    props: { markdown },
    revalidate: 60, // seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});
