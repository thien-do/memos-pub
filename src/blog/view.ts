import type { GitContent, GitContentEntry } from "@/git/content";
import { getGitContent } from "@/git/content";
import type { GitRepo } from "@/git/repos";
import { getGitRepos } from "@/git/repos";
import { getBlogTree } from "./tree";

export type BlogView =
  | { kind: "file"; text: string }
  | { kind: "dir"; entries: GitContentEntry[]; linkBase: string }
  | { kind: "owner"; repos: GitRepo[] };

function fromContent(params: {
  content: GitContent;
  linkBase: string;
}): BlogView {
  const { content, linkBase } = params;

  switch (content.kind) {
    case "file":
      return { kind: "file", text: content.text };
    case "dir":
      return { kind: "dir", entries: content.entries, linkBase };
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
    return fromContent({ content: inRepo, linkBase: `/${head}` });
  }

  // If head is not repo, but profile repo found, profile wins
  if (inProfile !== null) {
    return fromContent({ content: inProfile, linkBase: "" });
  }

  // Owner root without a profile repo: their repos, forks excluded
  if (repos !== null) {
    return { kind: "owner", repos: repos.filter((repo) => !repo.fork) };
  }

  return null;
}
