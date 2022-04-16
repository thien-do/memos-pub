import { GitHubRequest } from "../github/type";

export interface MemberBlogRequest extends GitHubRequest {
	/** e.g. "thien.do" */
	host: string;
}
