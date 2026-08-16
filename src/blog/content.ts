import type { GitContent } from "@/git/content";
import { getGitContent } from "@/git/content";
import type { GitRepo } from "@/git/repos";
import { getGitRepos } from "@/git/repos";
import { getBlogTree } from "./tree";

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
    getBlogTree({ owner, repo: owner, segments: path }),
    // Need an explicit check if head is a repo
    noHead ? null : getGitContent({ owner, repo: head, segments: [] }),
    // Content if head is a repo
    noHead ? null : getBlogTree({ owner, repo: head, segments: rest }),
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
