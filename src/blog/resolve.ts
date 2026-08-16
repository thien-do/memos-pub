import type { GitContent } from "@/git/content";
import { getGitContent } from "@/git/content";

export async function resolveBlogTree(params: {
  owner: string;
  repo: string;
  segments: string[];
}): Promise<GitContent | null> {
  const { owner, repo, segments } = params;

  // The exact "bar" — file or folder — beats the auto "bar.md".
  const exact = await getGitContent({ owner, repo, segments });
  if (exact !== null) return exact;

  // Last is undefined on repo root, but exact get null means no repo
  const last = segments.at(-1);
  if (last === undefined) return null;

  // Only accept auto .md to a file
  const md = [...segments.slice(0, -1), `${last}.md`];
  const file = await getGitContent({ owner, repo, segments: md });
  if (file?.kind === "file") return file;

  return null;
}
