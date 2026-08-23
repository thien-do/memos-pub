import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { MarkFile } from "@/mark/file";
import { BlogDir } from "./dir";
import { BlogOwner } from "./owner";
import { getBlogView } from "./view";

export async function BlogPage(props: {
  owner: string;
  path: string[];
}): Promise<ReactElement> {
  const { owner, path } = props;

  const view = await getBlogView({ owner, path });
  if (view === null) notFound();

  switch (view.kind) {
    case "file":
      return <MarkFile text={view.text} />;
    case "dir":
      return <BlogDir view={view} />;
    case "owner":
      return <BlogOwner repos={view.repos} />;
  }
}
