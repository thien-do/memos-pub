import { Octokit } from "octokit";

export function getGit(): Octokit {
  const token = process.env.GITHUB_TOKEN;
  if (token === undefined) throw new Error("GITHUB_TOKEN is not set");
  return new Octokit({ auth: token });
}
