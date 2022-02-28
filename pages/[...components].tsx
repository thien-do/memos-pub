import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { PostPage } from "../lib/post/page";
import { fetchSource } from "../lib/sources/fetch";

interface PageProps {
  html: string;
}

const Page: NextPage<PageProps> = (props) => {
  return <PostPage html={props.html} />;
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
  const html = await fetchSource(components);
  return {
    props: { html },
    revalidate: 60, // seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});
