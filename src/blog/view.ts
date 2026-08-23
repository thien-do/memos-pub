import type { GitContentEntry } from "@/git/content";
import { getGitContent } from "@/git/content";
import type { GitRepo } from "@/git/repos";
import { getGitRepos } from "@/git/repos";
import type { BlogTree } from "./tree";
import { getBlogTree } from "./tree";

export type BlogViewDir = {
  kind: "dir";
  entries: GitContentEntry[];
  linkBase: string;
  readme: string | null;
};

export type BlogView =
  | { kind: "file"; text: string }
  | BlogViewDir
  | { kind: "owner"; repos: GitRepo[] };

function fromTree(params: { tree: BlogTree; linkBase: string }): BlogView {
  const { tree, linkBase } = params;

  switch (tree.kind) {
    case "file":
      return { kind: "file", text: tree.text };
    case "dir":
      return {
        kind: "dir",
        entries: tree.entries,
        linkBase,
        readme: tree.readme,
      };
  }
}

export async function getBlogView(params: {
  owner: string;
  path: string[];
}): Promise<BlogView | null> {
  const { owner, path } = params;

  // Dot segments could escape the repo in the API URL.
  if (path.some((s) => s === "." || s === "..")) return null;

  // Head could be a repo, or the whole path is resolved in profile repo
  const [head, ...rest] = path;
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
    return fromTree({ tree: inRepo, linkBase: `/${head}` });
  }

  // If head is not repo, but profile repo found, profile wins
  if (inProfile !== null) {
    return fromTree({ tree: inProfile, linkBase: "" });
  }

  // Owner root without a profile repo: their repos, forks excluded
  if (repos !== null) {
    return { kind: "owner", repos: repos.filter((repo) => !repo.fork) };
  }

  return null;
}
