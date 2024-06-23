import { GitHubRequest } from "@/lib/github/type";

export interface BlogRequest extends GitHubRequest {
	/**
	 * Custom domain, or null if is blog is at a sub domain of memos-pub.thien.do
	 */
	domain: string | null;
}
