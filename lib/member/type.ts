import { GitHubRequest } from "../github/type";

export interface MemberRequest extends GitHubRequest {
	/** e.g. "thien.do" */
	host: string;
}
