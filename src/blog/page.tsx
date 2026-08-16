import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { resolveBlogTree } from "./resolve";
import { BlogFile } from "./file";
import { BlogListing } from "./listing";

export async function BlogPage(props: {
  owner: string;
  path: string[];
}): Promise<ReactElement> {
  const { owner, path } = props;

  // Dot segments could escape the repo in the API URL.
  if (path.some((s) => s === "." || s === "..")) notFound();

  const [repo, ...segments] = path;
  if (repo === undefined) notFound();

  const content = await resolveBlogTree({ owner, repo, segments });
  if (content === null) notFound();

  if (content.kind === "file") {
    return (
      <main>
        <BlogFile text={content.text} />
      </main>
    );
  }

  return (
    <main>
      <BlogListing repo={repo} entries={content.entries} />
    </main>
  );
}
