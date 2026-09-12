import { MarkFile } from "@/mark/file";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { BlogDir } from "./dir";
import { BlogOwner } from "./owner";
import { ensureBlogSlash } from "./slash";
import { getBlogView } from "./view";

export async function BlogPage(props: {
  owner: string;
  path: string[];
  form: string;
}): Promise<ReactElement> {
  const { owner, path, form } = props;
  if (form !== "root" && form !== "slash" && form !== "bare") notFound();

  const view = await getBlogView({ owner, path });
  if (view === null) notFound();

  ensureBlogSlash({ view, form, name: path.at(-1) ?? owner });

  switch (view.kind) {
    case "file":
      return <MarkFile text={view.text} />;
    case "dir":
      return <BlogDir dir={view} />;
    case "owner":
      return <BlogOwner repos={view.repos} />;
  }
}
