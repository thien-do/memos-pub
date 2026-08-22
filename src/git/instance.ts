import { Octokit } from "octokit";
import { getEnvVar } from "@/kit/env";

export function getGit(): Octokit {
  return new Octokit({ auth: getEnvVar("MEMOS_GITHUB_TOKEN") });
}
