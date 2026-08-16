import { getGit } from "./instance";
import { mapGitNotFoundToNull } from "./not-found";

export type GitContentEntry = {
  name: string;
  path: string;
  type: "file" | "dir" | "symlink" | "submodule";
};

export type GitContent =
  | { kind: "file"; text: string }
  | { kind: "dir"; entries: GitContentEntry[] };

type GetFn = (params: {
  owner: string;
  repo: string;
  segments: string[];
}) => Promise<GitContent | null>;

const getStrict: GetFn = async (params) => {
  const { owner, repo, segments } = params;

  const path = segments.join("/");

  const git = getGit();
  const { data } = await git.rest.repos.getContent({ owner, repo, path });

  if (Array.isArray(data)) {
    const entries = data.map((entry): GitContentEntry => ({
      name: entry.name,
      path: entry.path,
      type: entry.type,
    }));
    return { kind: "dir", entries };
  }

  if (data.type === "file" && data.encoding === "base64") {
    const text = Buffer.from(data.content, "base64").toString("utf8");
    return { kind: "file", text };
  }

  return null;
};

export const getGitContent: GetFn = mapGitNotFoundToNull(getStrict);
