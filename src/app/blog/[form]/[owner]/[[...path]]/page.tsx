import type { Metadata } from "next";
import type { ReactElement } from "react";
import { getBlogMetadata } from "@/blog/metadata";
import { BlogPage } from "@/blog/page";
import { notFound } from "next/navigation";

type Props = PageProps<"/blog/[form]/[owner]/[[...path]]">;

export function generateStaticParams() {
  // Cache Components requires one result, even when blogs load on demand.
  return [{ form: "root", owner: "__placeholder__", path: [] }];
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { owner } = await props.params;

  return getBlogMetadata({ owner });
}

export default async function Page(props: Props): Promise<ReactElement> {
  const { owner, path, form } = await props.params;
  if (owner === "__placeholder__") notFound();
  if (form !== "root" && form !== "slash" && form !== "bare") notFound();

  return <BlogPage owner={owner} path={path ?? []} form={form} />;
}
