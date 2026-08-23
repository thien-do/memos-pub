import type { GitContentEntry } from "@/git/content";
import { getGitContent } from "@/git/content";

export type BlogTree =
  | { kind: "file"; text: string }
  | {
      kind: "dir";
      entries: GitContentEntry[];
      readme: string | null;
    };

/**
 * Get content within a specific repo.
 * Include auto ".md" suffix and auto folder README.
 */
export async function getBlogTree(params: {
  owner: string;
  repo: string;
  segments: string[];
}): Promise<BlogTree | null> {
  const { owner, repo, segments } = params;

  // Auto ".md" fetch. An empty ".md" at root is wasted 404
  const last = segments.at(-1);
  const mdSegments = [...segments.slice(0, -1), `${last ?? ""}.md`];
  const readmeSegments = [...segments, "README.md"];

  const [exact, autoMd, autoReadme] = await Promise.all([
    getGitContent({ owner, repo, segments }),
    getGitContent({ owner, repo, segments: mdSegments }),
    getGitContent({ owner, repo, segments: readmeSegments }),
  ]);

  // The exact "bar" — file or folder — beats the auto "bar.md".
  if (exact !== null) {
    if (exact.kind === "file") return exact;
    return {
      kind: "dir",
      entries: exact.entries,
      readme: autoReadme?.kind === "file" ? autoReadme.text : null,
    };
  }

  // Only accept auto .md to a file
  if (autoMd?.kind === "file") return autoMd;

  return null;
}
