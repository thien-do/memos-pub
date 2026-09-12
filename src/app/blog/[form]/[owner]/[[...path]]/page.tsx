import type { Metadata } from "next";
import type { ReactElement } from "react";
import { getBlogMetadata } from "@/blog/metadata";
import { BlogPage } from "@/blog/page";
import { BlogForm } from "@/blog/form";
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
  const parsedForm = BlogForm.safeParse(form);
  if (!parsedForm.success) notFound();

  return <BlogPage owner={owner} path={path ?? []} form={parsedForm.data} />;
}
