import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { getBlogContent } from "./content";
import { BlogFile } from "./file";
import { BlogList } from "./list";

export async function BlogPage(props: {
  owner: string;
  path: string[];
}): Promise<ReactElement> {
  const { owner, path } = props;

  const blog = await getBlogContent({ owner, path });
  if (blog === null) notFound();

  // "content" is the only kind until the repo-list rung lands.
  const { content, linkBase } = blog;

  switch (content.kind) {
    case "dir":
      return <BlogList linkBase={linkBase} entries={content.entries} />;
    case "file":
      return <BlogFile text={content.text} />;
  }
}
