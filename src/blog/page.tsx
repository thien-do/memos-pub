import { MarkFile } from "@/mark/file";
import { notFound, redirect } from "next/navigation";
import type { ReactElement } from "react";
import { BlogDir } from "./dir";
import { BlogOwner } from "./owner";
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

  // Relative links require a trailing slash for directories and none for files.
  const segment = path.at(-1) ?? owner;

  switch (view.kind) {
    case "file":
      // We don't support custom domains pointing to specific files.
      if (form === "root") notFound();
      if (form === "slash") redirect(`../${segment}`);
      return <MarkFile text={view.text} />;
    case "dir":
      if (form === "bare") redirect(`./${segment}/`);
      return <BlogDir dir={view} />;
    case "owner":
      if (form === "bare") redirect(`./${segment}/`);
      return <BlogOwner repos={view.repos} />;
  }
}
