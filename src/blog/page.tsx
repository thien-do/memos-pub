import { MarkFile } from "@/mark/file";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { BlogDir } from "./dir";
import { BlogOwner } from "./owner";
import { ensureBlogSlash } from "./slash";
import { getBlogView } from "./view";
import type { BlogForm } from "./form";

export async function BlogPage(props: {
  owner: string;
  path: string[];
  form: BlogForm;
}): Promise<ReactElement> {
  const { owner, path, form } = props;

  const view = await getBlogView({ owner, path });
  if (view === null) notFound();

  const segment = path.at(-1) ?? owner;
  ensureBlogSlash({ view, form, segment });

  switch (view.kind) {
    case "file":
      return <MarkFile text={view.text} />;
    case "dir":
      return <BlogDir dir={view} />;
    case "owner":
      return <BlogOwner repos={view.repos} />;
  }
}
