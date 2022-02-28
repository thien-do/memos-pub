import type { NextPage, GetStaticProps, GetStaticPaths } from "next";

interface PageProps {
  text: string;
}

const Page: NextPage<PageProps> = (props) => {
  return <div>{props.text}</div>;
};

export default Page;

interface PageParams extends NodeJS.Dict<string | string[]> {
  /**
   * Something like:
   * - ["github.com", "thien-do", "notes", "blob", "master", "hello.md"]
   */
  path: string[];
}

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
  const res = await fetch(raw);
  const text = await res.text();

  return {
    props: { text },
    revalidate: 60, // seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});
