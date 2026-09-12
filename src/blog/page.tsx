import { MarkFile } from "@/mark/file";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { BlogDir } from "./dir";
import { BlogOwner } from "./owner";
import { ensureBlogSlash } from "./slash";
import type { BlogView } from "./view";
import { getBlogView } from "./view";

function Content(props: { view: BlogView }): ReactElement {
  const { view } = props;

  switch (view.kind) {
    case "file":
      return <MarkFile text={view.text} />;
    case "dir":
      return <BlogDir dir={view} />;
    case "owner":
      return <BlogOwner repos={view.repos} />;
  }
}

export async function BlogPage(props: {
  owner: string;
  path: string[];
}): Promise<ReactElement> {
  const { owner, path } = props;

  const view = await getBlogView({ owner, path });
  if (view === null) notFound();

  await ensureBlogSlash(view);

  return (
    <div data-color={view.config.color}>
      <Content view={view} />
    </div>
  );
}
