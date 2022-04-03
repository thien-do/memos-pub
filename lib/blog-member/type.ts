import { BlogGitHubRequest } from "../blog-github/type";

export interface MemberBlogRequest extends BlogGitHubRequest {
	/** e.g. "thien.do" */
	host: string;
}
