import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { getGitContent } from "@/git/content";

export async function BlogPage(props: {
  owner: string;
  path: string[];
}): Promise<ReactElement> {
  const { owner, path } = props;

  // Dot segments could escape the repo in the API URL.
  if (path.some((s) => s === "." || s === "..")) notFound();

  // The owner root shows the profile repo, the one named after them.
  const [repo = owner, ...segments] = path;

  const content = await getGitContent({ owner, repo, segments });
  if (content === null) notFound();

  if (content.kind === "file") {
    return (
      <main>
        <pre>{content.text}</pre>
      </main>
    );
  }

  return (
    <main>
      <h1>{owner}</h1>
      <p>/{path.join("/")}</p>
    </main>
  );
}
