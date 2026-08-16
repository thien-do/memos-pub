import type { GitContent } from "@/git/content";
import { getGitContent } from "@/git/content";

/**
 * Get content within a specific repo.
 * Include an auto ".md" suffix fetch.
 */
export async function getBlogTree(params: {
  owner: string;
  repo: string;
  segments: string[];
}): Promise<GitContent | null> {
  const { owner, repo, segments } = params;

  // Auto ".md" fetch. An empty ".md" at root is wasted 404
  const last = segments.at(-1);
  const mdSegments = [...segments.slice(0, -1), `${last ?? ""}.md`];

  const [exact, auto] = await Promise.all([
    getGitContent({ owner, repo, segments }),
    getGitContent({ owner, repo, segments: mdSegments }),
  ]);

  // The exact "bar" — file or folder — beats the auto "bar.md".
  if (exact !== null) return exact;

  // Only accept auto .md to a file
  if (auto?.kind === "file") return auto;

  return null;
}
