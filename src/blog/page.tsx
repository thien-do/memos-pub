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
}): Promise<ReactElement> {
  const { owner, path } = props;

  const view = await getBlogView({ owner, path });
  if (view === null) notFound();

  await ensureBlogSlash(view);

  switch (view.kind) {
    case "file":
      return <MarkFile text={view.text} />;
    case "dir":
      return <BlogDir dir={view} />;
    case "owner":
      return <BlogOwner repos={view.repos} />;
  }
}
