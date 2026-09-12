import { unstable_cache } from "next/cache";
import { getGit } from "./instance";
import { mapGitNotFoundToNull } from "./not-found";

export type GitRepo = {
  name: string;
  fork: boolean;
};

type GetFn = (params: { owner: string }) => Promise<GitRepo[] | null>;

const getStrict: GetFn = async (params) => {
  const { owner } = params;

  const git = getGit();

  const { data } = await git.rest.repos.listForUser({
    username: owner,
    type: "owner",
    per_page: 20,
    sort: "pushed",
  });

  const result = data.map((repo) => ({
    name: repo.name,
    fork: repo.fork ?? false,
  }));

  return result;
};

export const getGitRepos: GetFn = unstable_cache(
  mapGitNotFoundToNull(getStrict),
  ["git-repos"],
  { revalidate: 300 },
);
