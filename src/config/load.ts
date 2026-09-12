import type { GitContent } from "@/git/content";
import { getGitContent } from "@/git/content";

export type ConfigSource = PromiseSettledResult<GitContent | null>;

export async function loadConfig(params: {
  owner: string;
  repo: string;
}): Promise<ConfigSource> {
  try {
    const value = await getGitContent({ ...params, segments: ["memos.json"] });
    return { status: "fulfilled", value };
  } catch (reason) {
    // An unused repository's config failure must not reject the page.
    return { status: "rejected", reason };
  }
}
