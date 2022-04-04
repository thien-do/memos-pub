import { GitHubBlogRequest } from "../github/type";

export interface MemberBlogRequest extends GitHubBlogRequest {
	/** e.g. "thien.do" */
	host: string;
}
