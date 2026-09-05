import type { Metadata } from "next";
import type { ReactElement } from "react";
import { getBlogMeta } from "@/blog/meta";
import { BlogPage } from "@/blog/page";

type Props = PageProps<"/blog/[owner]/[[...path]]">;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { owner, path } = await props.params;
  return getBlogMeta({ owner, path: path ?? [] });
}

export default async function Page(props: Props): Promise<ReactElement> {
  const { owner, path } = await props.params;

  return <BlogPage owner={owner} path={path ?? []} />;
}
