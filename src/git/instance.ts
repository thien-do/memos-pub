import { Octokit } from "octokit";
import { getEnvVar } from "@/kit/env";

export function getGit(): Octokit {
  const auth = getEnvVar("MEMOS_GITHUB_TOKEN");
  const git = new Octokit({ auth });
  return git;
}
