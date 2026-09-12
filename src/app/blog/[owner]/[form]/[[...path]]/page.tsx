import type { Metadata } from "next";
import type { ReactElement } from "react";
import { getBlogMetadata } from "@/blog/metadata";
import { BlogPage } from "@/blog/page";

type Props = PageProps<"/blog/[owner]/[form]/[[...path]]">;

export function generateStaticParams() {
  return [{ owner: "thien-do", form: "root", path: [] }];
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { owner } = await props.params;

  return getBlogMetadata({ owner });
}

export default async function Page(props: Props): Promise<ReactElement> {
  const { owner, path, form } = await props.params;

  return <BlogPage owner={owner} path={path ?? []} form={form} />;
}
