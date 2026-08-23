import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { BlogDir } from "./dir";
import { BlogFile } from "./file";
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
      return <BlogFile text={view.text} />;
    case "dir":
      return (
        <BlogDir
          linkBase={view.linkBase}
          entries={view.entries}
          readme={view.readme}
        />
      );
    case "owner":
      return <BlogOwner repos={view.repos} />;
  }
}
