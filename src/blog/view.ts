import type { Config } from "@/config";
import { loadConfig, parseConfig } from "@/config";
import { getGitContent } from "@/git/content";
import type { GitRepo } from "@/git/repos";
import { getGitRepos } from "@/git/repos";
import type { BlogTree } from "./tree";
import { getBlogTree } from "./tree";

interface Owner {
  kind: "owner";
  repos: GitRepo[];
}

export type BlogView = (BlogTree | Owner) & { config: Config };

interface ResolvedView {
  view: BlogTree | Owner;
  config?: ReturnType<typeof loadConfig>;
}

export async function getBlogView(params: {
  owner: string;
  path: string[];
}): Promise<BlogView | null> {
  const { owner, path } = params;

  // Dot segments could escape the repo in the API URL.
  if (path.some((s) => s === "." || s === "..")) return null;

  const [repo, ...segments] = path;
  const resolved =
    repo === undefined
      ? await resolveOwnerRoot({ owner })
      : await resolvePath({ owner, repo, segments });

  if (resolved === null) return null;

  return {
    ...resolved.view,
    config: parseConfig(await resolved.config),
  };
}

async function resolveOwnerRoot(params: {
  owner: string;
}): Promise<ResolvedView | null> {
  const { owner } = params;
  const config = loadConfig({ owner, repo: owner });
  const [profile, repos] = await Promise.all([
    getBlogTree({ owner, repo: owner, segments: [] }),
    getGitRepos({ owner }),
  ]);

  if (profile !== null) return { view: profile, config };
  if (repos === null) return null;

  return {
    view: { kind: "owner", repos: repos.filter((repo) => !repo.fork) },
  };
}

async function resolvePath(params: {
  owner: string;
  repo: string;
  segments: string[];
}): Promise<ResolvedView | null> {
  const { owner, repo, segments } = params;
  const profileConfig = loadConfig({ owner, repo: owner });
  const repoConfig =
    repo === owner ? profileConfig : loadConfig({ owner, repo });

  const [profile, repoRoot, content] = await Promise.all([
    getBlogTree({ owner, repo: owner, segments: [repo, ...segments] }),
    getGitContent({ owner, repo, segments: [] }),
    getBlogTree({ owner, repo, segments }),
  ]);

  // An existing explicit repo wins even when its requested page is missing.
  if (repoRoot !== null) {
    if (content === null) return null;
    return { view: content, config: repoConfig };
  }

  if (profile === null) return null;
  return { view: profile, config: profileConfig };
}
