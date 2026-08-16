import type { GitContent } from "@/git/content";
import { getGitContent } from "@/git/content";

export type BlogContent = {
  kind: "content";
  content: GitContent;
  // Where the tree is mounted in the URL: "" for profile (site root).
  linkBase: string;
};

/**
 * Get content within a specific repo.
 * Include an auto ".md" suffix fetch.
 */
async function getTree(params: {
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

export async function getBlogContent(params: {
  owner: string;
  path: string[];
}): Promise<BlogContent | null> {
  const { owner, path } = params;

  // Dot segments could escape the repo in the API URL.
  if (path.some((s) => s === "." || s === "..")) return null;

  // Always try content in profile repo
  const promises = [getTree({ owner, repo: owner, segments: path })];

  // Head could be a repo, or the whole path is resolved for profile repo
  const [head, ...rest] = path;

  if (head !== undefined) {
    // "tree" doesn't separate if "rest" or "head" doesn't exist
    const existed = getGitContent({ owner, repo: head, segments: [] });
    const tree = getTree({ owner, repo: head, segments: rest });
    promises.push(existed, tree);
  }

  // Careful of the manual order!
  const results = await Promise.all(promises);
  const inProfile = results.at(0) ?? null;
  const isRepo = results.at(1) ?? null;
  const inRepo = results.at(2) ?? null;

  // If head is repo, it wins, even if the path is empty
  if (isRepo) {
    if (inRepo === null) return null;
    return { kind: "content", content: inRepo, linkBase: `/${head}` };
  }

  // If head is not repo, but profile repo found
  if (inProfile) {
    return { kind: "content", content: inProfile, linkBase: "" };
  }

  // @todo: List repos for owner — the root-only rung, the fourth candidate.
  return null;
}
