import { Octokit } from "octokit";

const octokit = new Octokit({});

export const getGitHubKit = (): Octokit => octokit;
