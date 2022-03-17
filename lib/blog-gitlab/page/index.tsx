import { BlogResponse } from "@/lib/blog/type";
import { BlogGitlabRequest } from "../type";

export interface BlogGitlabPageProps {
	request: BlogGitlabRequest;
	response: BlogResponse;
}

export const BlogGitlabPage = (props: BlogGitlabPageProps): JSX.Element => (
	<div>
		<div>{JSON.stringify(props.request)}</div>
		<div>{JSON.stringify(props.response)}</div>
	</div>
);
