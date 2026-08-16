import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { getBlogContent } from "./content";
import { BlogFile } from "./file";
import { BlogList } from "./list";
import { BlogRepos } from "./repos";

export async function BlogPage(props: {
  owner: string;
  path: string[];
}): Promise<ReactElement> {
  const { owner, path } = props;

  const blog = await getBlogContent({ owner, path });
  if (blog === null) notFound();

  if (blog.kind === "repos") return <BlogRepos repos={blog.repos} />;

  const { content, linkBase } = blog;
  switch (content.kind) {
    case "dir":
      return <BlogList linkBase={linkBase} entries={content.entries} />;
    case "file":
      return <BlogFile text={content.text} />;
  }
}
