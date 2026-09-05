import type { Metadata } from "next";
import type { ReactElement } from "react";
import { getBlogIcon } from "@/blog/icon";
import { BlogPage } from "@/blog/page";
import { getBlogTitle } from "@/blog/title";

type Props = PageProps<"/blog/[owner]/[[...path]]">;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { owner, path } = await props.params;
  return {
    title: await getBlogTitle({ owner, path: path ?? [] }),
    icons: { icon: getBlogIcon(owner) },
  };
}

export default async function Page(props: Props): Promise<ReactElement> {
  const { owner, path } = await props.params;

  return <BlogPage owner={owner} path={path ?? []} />;
}
