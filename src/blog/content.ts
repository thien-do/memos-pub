import type { GitContent } from "@/git/content";
import { getGitContent } from "@/git/content";
import type { GitRepo } from "@/git/repos";
import { getGitRepos } from "@/git/repos";

type Content = {
  kind: "content";
  content: GitContent;
  // Where the tree is mounted in the URL: "" for profile (site root).
  linkBase: string;
};

type Repos = {
  kind: "repos";
  repos: GitRepo[];
};

export type BlogContent = Content | Repos;

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

  const [head, ...rest] = path;
  // This means the path itself is empty.
  // We are not yet sure (until isRepo) if head is a repo.
  const noHead = head === undefined;

  const [inProfile, isRepo, inRepo, repos] = await Promise.all([
    // Always try content in profile repo
    getTree({ owner, repo: owner, segments: path }),
    // Need an explicit check if head is a repo
    noHead ? null : getGitContent({ owner, repo: head, segments: [] }),
    // Content if head is a repo
    noHead ? null : getTree({ owner, repo: head, segments: rest }),
    // Root can fall back to repo list
    noHead ? getGitRepos({ owner }) : null,
  ]);

  // If head is repo, repo wins, even if content is empty
  if (isRepo !== null) {
    if (inRepo === null) return null;
    return { kind: "content", content: inRepo, linkBase: `/${head}` };
  }

  // If head is not repo, but profile repo found, profile wins
  if (inProfile !== null) {
    return { kind: "content", content: inProfile, linkBase: "" };
  }

  // Owner root without a profile repo: their repos, forks excluded
  if (repos !== null) {
    return { kind: "repos", repos: repos.filter((repo) => !repo.fork) };
  }

  return null;
}
