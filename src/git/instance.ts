import { Octokit } from "octokit";
import { getEnvVar } from "@/env";

export function getGit(): Octokit {
  return new Octokit({ auth: getEnvVar("MEMOS_GITHUB_TOKEN") });
}
